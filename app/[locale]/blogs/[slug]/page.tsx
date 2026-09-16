import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/supabase/types"
import BlogPostView from "./BlogPostView"
import { BASE_URL, DEFAULT_OG_IMAGE } from "@/lib/metadata"
import { buildAuthorNode } from "@/lib/seoSchemas"
import { getBlogSeoOverride } from "@/lib/blog-seo-overrides"
import { consolidatedTarget, CONSOLIDATED_SLUGS_IN } from "@/lib/blog-consolidated"
import { blogLocale, contentLanguage } from "@/lib/blogLocale"
import { STATIC_US_POSTS, getStaticUsPost } from "@/lib/blog-static/us-posts"

export const revalidate = 3600

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const wordsOf = (html: string) => stripHtml(html).split(' ').filter(Boolean).length
const readingMinutes = (html: string) => Math.max(1, Math.ceil(wordsOf(html) / 220))

export async function generateStaticParams() {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('blog_posts')
      .select('slug, locale')
      .eq('status', 'published')
    const fromDb = (data || []).map((p: any) => ({ slug: p.slug, locale: p.locale }))
    const fromCode = STATIC_US_POSTS
      .filter((p) => !fromDb.some((d: any) => d.slug === p.slug && d.locale === 'us'))
      .map((p) => ({ slug: p.slug, locale: 'us' }))
    return [...fromDb, ...fromCode]
  } catch {
    return STATIC_US_POSTS.map((p) => ({ slug: p.slug, locale: 'us' }))
  }
}

async function getPost(slug: string, locale: string): Promise<BlogPost | null> {
  const want = blogLocale(locale)
  // 29-ago-2026. Antes esto llamaba a Supabase sin red de seguridad, y los
  // artículos que se sirven DESDE EL CÓDIGO dependían igualmente de que la base
  // respondiera: si fallaba, caía también lo que no necesitaba base. Se vio en
  // un build sin variables de entorno, donde reventó la generación entera.
  // Ahora cualquier fallo de la base se traga y se sigue al plan B.
  const fetchOne = async (loc: string): Promise<BlogPost | null> => {
    try {
      const supabase = createServerClient()
      const { data } = await supabase
        .from('blog_posts')
        .select('*, category:blog_categories(name, slug)')
        .eq('slug', slug)
        .eq('locale', loc)
        .eq('status', 'published')
        .single()
      return (data as BlogPost | null) ?? null
    } catch {
      return null
    }
  }
  const own = await fetchOne(want)
  if (own) return own
  if (want === 'us') {
    // Artículos es-US que aún no caben en la base (ver lib/blog-static/us-posts.ts).
    // La base manda: solo se llega aquí si Supabase no los tiene.
    const fromCode = getStaticUsPost(slug)
    if (fromCode) return fromCode
    // /us hereda el fondo peruano cuando no tiene artículo propio para ese slug.
    // Al revés no: un post es-US no debe aparecer en /es (habla de EE.UU.).
    return await fetchOne('es')
  }
  return null
}

// Locales que REALMENTE existen publicados para este slug (evita hreflang/enlaces
// a versiones inexistentes; los posts hoy son solo 'es').
async function getPublishedLocales(slug: string): Promise<string[]> {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('blog_posts')
      .select('locale')
      .eq('slug', slug)
      .eq('status', 'published')
    return Array.from(new Set((data || []).map((r: any) => r.locale)))
  } catch {
    return []
  }
}

// Hash simple y estable del slug → offset de selección. Antes los related
// eran siempre "los 3 más recientes de la categoría": los mismos 3 posts
// recibían todos los enlaces internos y ~99 posts del cluster quedaban
// huérfanos (cero enlaces entrantes). Con la ventana rotada por slug, cada
// post reparte sus enlaces a posts distintos del mismo tema y todo el cluster
// queda enlazado, de forma determinística (estable entre builds).
function slugOffset(slug: string, poolSize: number, take: number): number {
  if (poolSize <= take) return 0
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h % (poolSize - take + 1)
}

async function getRelatedPosts(currentId: string, categoryId: string | null, locale: string, limit = 3, currentSlug = ''): Promise<BlogPost[]> {
  // 30-ago-2026. POOL era 12, y la consulta pide los 12 MÁS RECIENTES de la
  // categoría. La rotación por hash del slug repartía dentro de esos 12, así
  // que todo el blog acababa enlazando al mismo puñado: medido en vivo sobre 35
  // artículos, 105 enlaces de este bloque iban a solo 12 destinos, y 109 de los
  // 148 posts de /es no recibían NI UNO.
  //
  // Importa más de lo que parece porque el dominio no tiene un solo enlace
  // externo —Bing devuelve 0 en GetLinkCounts—, así que el reparto interno es
  // la única autoridad que hay para mover.
  //
  // Con la ventana ancha, la misma rotación determinista reparte sobre hasta 60
  // artículos por categoría en vez de 12. Sigue siendo una sola consulta y
  // devuelve las mismas 3 tarjetas.
  const POOL = 60
  try {
  const supabase = createServerClient()
  let query = supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, featured_image_alt, published_at, created_at, category:blog_categories(name, slug)')
    .neq('id', currentId)
    .in('locale', blogLocale(locale) === 'us' ? ['us', 'es'] : [blogLocale(locale)])
    .eq('status', 'published')
    // Los consolidados redirigen: enlazarlos es mandar al lector a un 308.
    .not('slug', 'in', CONSOLIDATED_SLUGS_IN)
    .order('published_at', { ascending: false })
    .limit(POOL)
  if (categoryId) query = query.eq('category_id', categoryId)
  const { data } = await query
  if (data && data.length >= limit) {
    const off = slugOffset(currentSlug, data.length, limit)
    return data.slice(off, off + limit) as unknown as BlogPost[]
  }
  const supabaseFallback = createServerClient()
  const { data: fallback } = await supabaseFallback
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, featured_image_alt, published_at, created_at, category:blog_categories(name, slug)')
    .neq('id', currentId)
    .in('locale', blogLocale(locale) === 'us' ? ['us', 'es'] : [blogLocale(locale)])
    .eq('status', 'published')
    .not('slug', 'in', CONSOLIDATED_SLUGS_IN)
    .order('published_at', { ascending: false })
    .limit(POOL)
  const pool = (fallback || []) as unknown as BlogPost[]
  const off = slugOffset(currentSlug, pool.length, limit)
  return pool.slice(off, off + limit)
  } catch {
    // Sin base no hay relacionados, pero el artículo se sigue sirviendo.
    return []
  }
}

// Posts legacy (2022-2023) migraron con meta_title = slug crudo
// ("que-es-el-content-manager-y-cuales-son-sus-objetivos") y ese texto salía
// como título azul en el SERP → CTR 0 pese a rankear. Si el meta_title parece
// un slug (todo minúsculas unidas por guiones), se ignora y manda el título
// real del post.
const looksLikeSlug = (s: string) => /^[a-z0-9áéíóúñü]+(?:-[a-z0-9áéíóúñü]+)+$/.test(s.trim())

/**
 * Extrae el bloque de preguntas frecuentes del HTML del artículo para emitir
 * FAQPage. Los posts llevan un H2 «Frequently asked questions» / «Preguntas
 * frecuentes» seguido de H3-pregunta + párrafo-respuesta, pero eso no se
 * declaraba en JSON-LD: se perdía el resultado enriquecido y, sobre todo, el
 * bloque más citable por los modelos de IA — que en este sitio convierten al
 * 12,23% frente al 4,03% del orgánico. Detectado el 28-ago-2026 al verificar
 * los cuatro artículos nuevos en inglés.
 */
function buildBlogFaqSchema(html: string) {
  const heading = /<h2[^>]*>\s*(?:frequently asked questions|preguntas frecuentes)[^<]*<\/h2>/i.exec(html)
  if (!heading) return null
  const tail = html.slice(heading.index + heading[0].length)
  // Corta en el siguiente H2, para no arrastrar secciones posteriores.
  const end = /<h2[^>]*>/i.exec(tail)
  const block = end ? tail.slice(0, end.index) : tail
  const items: { q: string; a: string }[] = []
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>|$)/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(block)) !== null) {
    const q = stripHtml(m[1])
    const a = stripHtml(m[2])
    if (q && a && a.length > 20) items.push({ q, a })
  }
  if (items.length < 2) return null
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((it) => ({
      "@type": "Question",
      "name": it.q,
      "acceptedAnswer": { "@type": "Answer", "text": it.a },
    })),
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getPost(slug, locale)
  if (!post) return { title: "Post not found" }

  // El canonical va al locale REAL del post, no al de la URL. /us sirve los
  // posts en español (no hay versión es-US propia), así que /us/blogs/x y
  // /es/blogs/x devuelven el mismo texto: con canonical propio serían ~140
  // duplicados compitiendo entre sí.
  // El canonical va al locale REAL del post, que ahora puede ser 'us'. Un
  // artículo escrito para el hispano de EE.UU. canonicaliza en /us, no en /es:
  // si lo mandáramos a /es estaríamos regalando a Perú la señal del mercado
  // que se está abriendo.
  const canonicalLocale = post.locale ?? blogLocale(locale)
  // 16-sep-2026. Un slug consolidado solo llega aquí por /us (en /es y /en
  // redirige antes). Su canonical a /es/blogs/<slug-viejo> apuntaba a una
  // redirección y Google lo ignoraba: va directo al artículo ganador.
  const consolidated = consolidatedTarget(slug)
  const canonical = consolidated
    ? `${BASE_URL}/es/blogs/${consolidated}`
    : `${BASE_URL}/${canonicalLocale}/blogs/${slug}`
  const image = post.og_image || post.featured_image

  // hreflang solo para los idiomas publicados de este slug (no declarar 'en'
  // si no existe: evita hreflang a página rota / 404).
  const availableLocales = consolidated ? [] : await getPublishedLocales(slug)
  const languages: Record<string, string> = consolidated ? { es: canonical } : {}
  for (const loc of availableLocales) {
    languages[loc] = `${BASE_URL}/${loc}/blogs/${slug}`
  }
  languages['x-default'] = languages['es'] || languages[locale] || canonical

  // Snippet escrito a mano para las URLs que ya rankean en posición 4-7 y no
  // reciben clics (ver lib/blog-seo-overrides.ts). Manda sobre lo que traiga
  // el CMS; borrar la entrada devuelve el control a Supabase.
  const seo = getBlogSeoOverride(slug, locale)

  return {
    title: seo?.title ?? (post.meta_title && !looksLikeSlug(post.meta_title) ? post.meta_title : `${post.title} | 3R Core`),
    description: seo?.description ?? (post.meta_description || post.excerpt || ''),
    alternates: {
      canonical,
      languages,
    },
    robots: post.robots || 'index, follow',
    openGraph: {
      title: seo?.title ?? (post.og_title || post.title),
      description: seo?.description ?? (post.og_description || post.meta_description || post.excerpt || ''),
      url: canonical,
      siteName: '3R Core',
      images: image
        ? [{ url: image, width: 1200, height: 630 }]
        : [{ url: DEFAULT_OG_IMAGE.url, width: DEFAULT_OG_IMAGE.width, height: DEFAULT_OG_IMAGE.height, alt: DEFAULT_OG_IMAGE.alt }],
      type: 'article',
      locale: locale === 'en' ? 'en_US' : 'es_PE',
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: [post.author_name],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title ?? (post.og_title || post.title),
      description: seo?.description ?? (post.og_description || post.meta_description || post.excerpt || ''),
      images: image ? [image] : [DEFAULT_OG_IMAGE.url],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const found = await getPost(slug, locale)
  if (!found) {
    // Si el idioma pedido no existe pero SÍ hay otra versión publicada de este
    // slug, redirige a esa (evita 404 desde el selector de idioma / enlaces).
    const locales = await getPublishedLocales(slug)
    if (locales.length && !locales.includes(locale)) {
      const target = locales.includes('es') ? 'es' : locales[0]
      redirect(`/${target}/blogs/${slug}`)
    }
    notFound()
  }

  const canonical = `${BASE_URL}/${locale}/blogs/${slug}`
  const isEn = locale === 'en'
  // 16-sep-2026. H1 y respuesta directa escritos a mano cuando el título de la
  // base promete algo que el artículo no cumple (ver lib/blog-seo-overrides.ts).
  // Copia, no mutación: los artículos de lib/blog-static viven en memoria y un
  // cambio en el objeto se arrastraría a la petición siguiente.
  const seo = getBlogSeoOverride(slug, locale)
  const post: BlogPost =
    seo?.heading || seo?.lead
      ? { ...found, title: seo.heading ?? found.title, content: (seo.lead ?? '') + (found.content || '') }
      : found
  const content = post.content || ''
  const plainText = stripHtml(content)
  const wordCount = wordsOf(content)
  const minutesRead = readingMinutes(content)
  const articleBodyExcerpt = plainText.slice(0, 500)

  const relatedPosts = await getRelatedPosts(post.id, post.category_id, locale, 3, post.slug)

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    "headline": post.title,
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at,
    "author": buildAuthorNode(post.author_name, post.locale ?? blogLocale(locale)),
    "publisher": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "3R Core",
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/icons/LogoFull.webp` },
    },
    "image": post.og_image || post.featured_image || "",
    "description": seo?.description ?? (post.meta_description || post.excerpt || ""),
    "articleBody": articleBodyExcerpt,
    "url": canonical,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "inLanguage": contentLanguage(post.locale ?? blogLocale(locale)),
    ...(post.focus_keyword ? { "keywords": post.focus_keyword } : {}),
    ...((post.category as any)?.name ? { "articleSection": (post.category as any).name } : {}),
    "wordCount": wordCount,
    "timeRequired": `PT${minutesRead}M`,
    "isAccessibleForFree": true,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isEn ? "Home" : "Inicio", "item": `${BASE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/${locale}/blogs` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": canonical },
    ],
  }

  const faqSchema = buildBlogFaqSchema(content)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([blogPostSchema, breadcrumbSchema, faqSchema].filter(Boolean)) }}
      />
      <BlogPostView post={post} locale={locale} minutesRead={minutesRead} relatedPosts={relatedPosts} />
    </>
  )
}
