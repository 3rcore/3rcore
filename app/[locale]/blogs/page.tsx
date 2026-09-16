import Image from "next/image"
import type { Metadata } from "next"
import { Link } from "@/i18n/routing"
import { montserrat } from "@/lib/fonts"
import { createServerClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/supabase/types"
import { blogLocale } from "@/lib/blogLocale"
import { CONSOLIDATED_SLUGS_IN } from "@/lib/blog-consolidated"
import { STATIC_US_POSTS } from "@/lib/blog-static/us-posts"
import { notFound } from "next/navigation"
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildAuthorNode } from "@/lib/seoSchemas"
import { setRequestLocale } from "next-intl/server"

export const revalidate = 600

// Antes el índice renderizaba los ~150 posts en una sola página (HTML de
// 1.16 MB). Se pagina a 24 por página con enlaces rastreables y filtro por
// categoría (vistas filtradas en noindex,follow para no duplicar).
const PAGE_SIZE = 24

type SP = { page?: string; categoria?: string }

function parsePage(sp: SP) {
  const n = parseInt(sp?.page || "1", 10)
  return Number.isFinite(n) && n > 1 ? n : 1
}

export async function generateMetadata(
  { params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<SP> }
): Promise<Metadata> {
  const { locale } = await params
  // Renderizado estático: sin esto next-intl marca la ruta como dinámica y
  // Vercel devuelve `no-store` en cada visita.
  setRequestLocale(locale);

  const sp = await searchParams
  const page = parsePage(sp)
  const cat = typeof sp?.categoria === "string" && sp.categoria ? sp.categoria : undefined
  if (page === 1 && !cat) return {} // hereda title/canonical del layout
  const isEn = locale === "en"
  const base = `${BASE_URL}/${locale}/blogs`
  if (cat) {
    // Vista filtrada: no indexable (evita URLs parametrizadas duplicando el
    // índice) pero follow para que fluya el enlazado.
    return {
      title: `Blog — ${cat} | 3R Core`,
      alternates: { canonical: base },
      robots: "noindex, follow",
    }
  }
  return {
    title: isEn
      ? `Marketing Blog — Page ${page} | 3R Core`
      : `Blog de Marketing Digital en Perú — Página ${page} | 3R Core`,
    alternates: { canonical: `${base}?page=${page}` },
    robots: "index, follow",
  }
}

export default async function BlogsPage(
  { params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<SP> }
) {
  const { locale } = await params
  // Renderizado estático (ver app/[locale]/layout.tsx).
  setRequestLocale(locale);

  const sp = await searchParams
  const page = parsePage(sp)
  const cat = typeof sp?.categoria === "string" && sp.categoria ? sp.categoria : undefined
  const isEn = locale === "en"
  // /us lista sus propios artículos es-US PRIMERO y completa con el fondo
  // peruano: al abrir el mercado no hay 60 posts hispanos que enseñar.
  const loc = blogLocale(locale)
  // 29-ago-2026. /us heredaba el fondo peruano: el listado enlazaba 155 URLs
  // bajo /us/blogs/*, todas con 200, todas canonicalizando a /es y solo 4 en el
  // sitemap. Eran 151 direcciones que Google tenía que rastrear para descubrir
  // que apuntan a otro sitio. Ahora /us lista SOLO lo suyo: son cuatro piezas,
  // pero son las escritas para ese mercado.
  const locFilter: string[] = [loc]

  const from = (page - 1) * PAGE_SIZE
  // 30-ago-2026. Si Supabase falla, este listado devolvía 500 en vez de
  // degradar: el índice del blog entero caía por un problema de base de datos.
  // Ahora se traga el fallo y se sirve lo que haya —en /us, los artículos que
  // viven en el código— con el aviso de que la lista puede estar incompleta.
  let posts: unknown[] | null = null
  let count: number | null = null
  try {
    const supabase = createServerClient()
    const query = cat
      ? supabase
          .from("blog_posts")
          .select("*, category:blog_categories!inner(name, slug)", { count: "exact" })
          .eq("status", "published")
          .in("locale", locFilter)
          .not("slug", "in", CONSOLIDATED_SLUGS_IN)
          .eq("category.slug", cat)
      : supabase
          .from("blog_posts")
          .select("*, category:blog_categories(name, slug)", { count: "exact" })
          .eq("status", "published")
          .in("locale", locFilter)
          // 16-sep-2026. Los seis artículos consolidados (lib/blog-consolidated.ts)
          // redirigen con 308: el índice los enlazaba en las páginas 3, 4 y 5.
          .not("slug", "in", CONSOLIDATED_SLUGS_IN)
    const res = await query
      .order("published_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1)
    posts = res.data as unknown[] | null
    count = res.count
  } catch {
    posts = null
    count = null
  }

  let allPosts: BlogPost[] = (posts || []) as unknown as BlogPost[]
  let total = count || allPosts.length
  // Los artículos es-US que todavía no caben en la base van al frente de la
  // primera página: son los únicos escritos PARA este mercado, el resto del
  // listado es fondo peruano heredado.
  if (loc === 'us' && !cat) {
    const yaEnBase = new Set(allPosts.map((p) => p.slug))
    const extra = STATIC_US_POSTS.filter((p) => !yaEnBase.has(p.slug))
    if (extra.length) {
      total += extra.length
      // Se anteponen SIN recortar: recortar a PAGE_SIZE empujaba cuatro
      // artículos fuera de la página 1, y como la página 2 se pide a la base
      // con un desplazamiento fijo, esos cuatro no reaparecían en ninguna
      // página. La página 1 muestra cuatro tarjetas más y no se pierde nada.
      allPosts = page === 1 ? [...extra, ...allPosts] : allPosts
    }
  }
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  // 28-ago-2026. ?page=8 con siete páginas devolvía 200, cero artículos y un
  // canonical autorreferencial: un soft 404 indexable, y la paginación admite
  // cualquier número. Fuera de rango se devuelve 404 de verdad.
  if (page > totalPages && page > 1) notFound()

  let categories: { name: string; slug: string }[] = []
  try {
    const supabaseCats = createServerClient()
    const { data: cats } = await supabaseCats
      .from("blog_categories")
      .select("name, slug")
      .in("locale", locFilter)
      .order("name")
    categories = (cats || []) as { name: string; slug: string }[]
  } catch {
    // Sin base no hay filtro de categorías, pero el listado se sigue sirviendo.
    categories = []
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/${locale}/blogs#blog`,
    "url": `${BASE_URL}/${locale}/blogs`,
    "name": isEn ? "3R Core Blog - Digital Marketing Insights" : "Blog 3R Core - Marketing Digital",
    "description": isEn
      ? "Latest news, articles and updates about digital marketing, SEO, branding, social media and web development."
      : "Últimas noticias, artículos y actualizaciones sobre marketing digital, SEO, branding, redes sociales y desarrollo web.",
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "inLanguage": isEn ? "en" : "es",
    "blogPost": allPosts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "url": `${BASE_URL}/${locale}/blogs/${p.slug}`,
      "datePublished": p.published_at || p.created_at,
      "dateModified": p.updated_at,
      "author": buildAuthorNode(p.author_name),
      "image": p.featured_image || p.og_image || undefined,
    })),
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": allPosts.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      "position": from + i + 1,
      "url": `${BASE_URL}/${locale}/blogs/${p.slug}`,
      "name": p.title,
    })),
  }

  // Breadcrumb del índice (antes vivía en el layout y se heredaba en cada post,
  // que ya trae el suyo → dos BreadcrumbList por URL).
  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? "Home" : "Inicio", path: "" }, { name: "Blog", path: "/blogs" }],
    locale
  )

  // El grafo Blog completo solo en la página 1 sin filtro (las demás vistas
  // llevan breadcrumb + su ItemList paginado).
  const schemas = page === 1 && !cat
    ? [blogSchema, itemListSchema, breadcrumbSchema]
    : [itemListSchema, breadcrumbSchema]

  const pageHref = (n: number, c?: string) => {
    const q: Record<string, string> = {}
    if (n > 1) q.page = String(n)
    if (c) q.categoria = c
    return { pathname: "/blogs" as const, ...(Object.keys(q).length ? { query: q } : {}) }
  }

  return (
    <main className={`${montserrat.className} min-h-screen bg-[#0D0010] text-white overflow-x-hidden`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#A21F8A]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#E91E63]/8 rounded-full blur-[100px]" />
      </div>

      {/* Hero */}
      <div className="relative z-10 pt-32 pb-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#E91E63] mb-4 font-medium">
            3R Core Blog
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8">
            <span className="block text-white">{isEn ? "LATEST" : "ÚLTIMAS"}</span>
            <span
              className="block bg-gradient-to-r from-[#E91E63] via-[#A21F8A] to-[#9C27B0] bg-clip-text text-transparent"
            >
              {isEn ? "NEWS" : "NOTICIAS"}
            </span>
            {/* Enriquecimiento semántico del H1 único del índice (antes esta
                descripción vivía en el H1 sr-only del layout compartido, que
                duplicaba H1 en cada post). */}
            <span className="sr-only">
              {isEn
                ? " — 3R Core digital marketing blog: SEO, branding, Google Ads, social media and web development"
                : " — Blog de marketing digital de 3R Core en Lima: SEO, branding, Google Ads, redes sociales y desarrollo web"}
            </span>
          </h1>
          <div
            className="h-[1px] w-full max-w-md mb-6"
            style={{ background: "linear-gradient(90deg, #E91E63, #9C27B0, transparent)" }}
          />
          <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-lg">
            {isEn
              ? "Stay up to date with the latest news, updates and articles about digital marketing."
              : "Mantente al día con las últimas novedades, actualizaciones y artículos sobre marketing digital."}
          </p>
        </div>

        {/* Categorías */}
        {categories.length > 0 && (
          <nav aria-label={isEn ? "Blog categories" : "Categorías del blog"} className="mt-8 flex flex-wrap gap-2">
            <Link
              href={pageHref(1)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] border transition-all ${!cat ? "border-[#E91E63] text-white bg-[#E91E63]/15" : "border-white/15 text-white/60 hover:text-white hover:border-[#A21F8A]/60"}`}
            >
              {isEn ? "All" : "Todos"}
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={pageHref(1, c.slug)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] border transition-all ${cat === c.slug ? "border-[#E91E63] text-white bg-[#E91E63]/15" : "border-white/15 text-white/60 hover:text-white hover:border-[#A21F8A]/60"}`}
              >
                {c.name}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Grid */}
      <div className="relative z-10 px-6 md:px-12 pb-12 max-w-7xl mx-auto">
        {allPosts.length === 0 ? (
          <p className="text-white/30 text-center py-20">
            {isEn ? "No posts yet" : "No hay posts aún"}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post) => {
              const imageUrl = post.featured_image || post.og_image || "/images/placeholder.png"
              const formattedDate = new Date(post.published_at || post.created_at)
                .toLocaleDateString(locale === "en" ? "en-US" : "es-PE", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .toUpperCase()

              return (
                <Link key={post.id} href={{ pathname: "/blogs/[slug]", params: { slug: post.slug } }} className="group block">
                  <article className="bg-[#2F0729] rounded-[20px] overflow-hidden flex flex-col h-full border border-white/5 transition-all duration-500 hover:border-[#A21F8A]/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(162,31,138,0.2)]">
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={post.featured_image_alt || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2F0729] via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-3 left-4">
                        <span
                          className="text-[9px] font-bold tracking-[0.2em] px-3 py-1 rounded-full text-white"
                          style={{ background: "rgba(162,31,138,0.85)", backdropFilter: "blur(8px)" }}
                        >
                          {formattedDate}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {(post.category as any)?.name && (
                        <span className="text-[#E91E63] text-[10px] uppercase tracking-widest font-bold mb-2">
                          {(post.category as any).name}
                        </span>
                      )}
                      <h2 className="text-base font-semibold leading-[1.4] mb-3 text-white/90 group-hover:text-white transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-3 mb-4 flex-grow">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto pt-4 border-t border-white/5">
                        <span className="inline-flex items-center gap-2 text-[#E91E63] text-[10px] font-bold tracking-[0.2em] uppercase group-hover:gap-3 transition-all duration-300">
                          {isEn ? "Read more" : "Leer más"}
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                            <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav aria-label={isEn ? "Blog pagination" : "Paginación del blog"} className="relative z-10 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={pageHref(page - 1, cat)}
              rel="prev"
              className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] border border-white/15 text-white/70 hover:text-white hover:border-[#A21F8A]/60 transition-all"
            >
              ← {isEn ? "Previous" : "Anterior"}
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
            .map((n, idx, arr) => (
              <span key={n} className="flex items-center gap-2">
                {idx > 0 && arr[idx - 1] !== n - 1 && <span className="text-white/30">…</span>}
                <Link
                  href={pageHref(n, cat)}
                  aria-current={n === page ? "page" : undefined}
                  className={`w-10 h-10 inline-flex items-center justify-center rounded-full text-xs font-bold border transition-all ${n === page ? "border-[#E91E63] bg-[#E91E63]/15 text-white" : "border-white/15 text-white/60 hover:text-white hover:border-[#A21F8A]/60"}`}
                >
                  {n}
                </Link>
              </span>
            ))}
          {page < totalPages && (
            <Link
              href={pageHref(page + 1, cat)}
              rel="next"
              className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] border border-white/15 text-white/70 hover:text-white hover:border-[#A21F8A]/60 transition-all"
            >
              {isEn ? "Next" : "Siguiente"} →
            </Link>
          )}
        </nav>
      )}
    </main>
  )
}
