import type { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import { hreflangFor, localizedUrl } from '@/lib/metadata'
import { STATIC_US_POSTS } from '@/lib/blog-static/us-posts'

/**
 * El sitemap se generaba en el BUILD (○ Static), así que los posts
 * publicados después por /api/admin/seed-blogs no aparecían hasta el
 * siguiente despliegue. Con revalidación horaria se refresca solo.
 */
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://3rcore.com'

  const staticPages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    // 3 pilares del negocio: SEO, SEM (Google Ads) y Web/Tiendas Virtuales.
    { path: '/posicionamiento-seo', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/servicios/google-ads', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/tiendas-virtuales-lima', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/servicios/web-development', priority: 0.92, changeFrequency: 'weekly' as const },
    { path: '/servicios/socialmedia', priority: 0.92, changeFrequency: 'weekly' as const },
    { path: '/servicios/branding', priority: 0.92, changeFrequency: 'weekly' as const },
    // Línea UGC / influencers / PR: es el rubro al que gira el negocio y hasta
    // ahora no tenía una sola URL viva (todas daban 404 en producción).
    { path: '/servicios/ugc', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/servicios/influencer-marketing', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/servicios/relaciones-publicas', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/precios', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/cotizar', priority: 0.85, changeFrequency: 'monthly' as const },
    // Reversión (2026-07-15): las páginas de servicio /servicios/* y
    // /posicionamiento-seo vuelven a ser las páginas objetivo (las usa comercial
    // para vender). Las money pages /agencia-*-lima ahora 301 hacia ellas (ver
    // next.config.ts), por eso ya NO se listan aquí.
    { path: '/servicios', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/nosotros', priority: 0.8, changeFrequency: 'monthly' as const },
    // Subpáginas de servicios de nicho (NO consolidadas por 301): son landings
    // propias sin equivalente en las money pages /agencia-*-lima, por eso SÍ se
    // listan aquí. (SEO CREA 2026-07-08)
    { path: '/servicios/meta-ads', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios/tiktok-ads', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios/performance-marketing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios/email-marketing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios/marketing-clinicas', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios/marketing-clinicas-dentales', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/servicios/marketing-clinicas-esteticas', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/servicios/marketing-veterinarias', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/servicios/marketing-inmobiliarias', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios/marketing-ecommerce', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/servicios/posicionamiento-ia', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/servicios/marketing-abogados', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/blogs', priority: 0.7, changeFrequency: 'daily' as const },
    { path: '/preguntas', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/politicas', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terminos', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/reclamaciones', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  // Páginas que solo existen para un mercado concreto (devuelven 404 en los
  // otros locales), así que van sin bloque de alternates.
  // Deliberadamente UNA por mercado: "ugc content agency" y "hire a marketing
  // team in latin america" son el mismo eje que /servicios/ugc y que esta
  // página, y publicarlas por separado sería canibalizar en inglés justo lo
  // que acabamos de abrir.
  const marketOnlyPages: { url: string; priority: number }[] = [
    { url: `${baseUrl}/en/nearshore-marketing-agency`, priority: 0.95 },
    { url: `${baseUrl}/en/hispanic-marketing-agency`, priority: 0.95 },
    { url: `${baseUrl}/en/spanish-seo-services`, priority: 0.95 },
    { url: `${baseUrl}/us/marketing-para-negocios-hispanos`, priority: 0.95 },
    { url: `${baseUrl}/es/casos-de-exito`, priority: 0.8 },
    // Página madre del negocio, recuperada el 26-ago-2026 (ya no 301 hacia
    // /servicios). Solo /es: el slug es español y en /en el mercado se ataca
    // con /nearshore-marketing-agency, que es otro eje.
    { url: `${baseUrl}/es/agencia-marketing-digital-lima`, priority: 0.95 },
  ]

  // Antes el sitemap listaba SOLO /es (163 URLs, cero /en como <loc>): las
  // versiones en inglés existían pero Google nunca las recibió como URL propia,
  // únicamente como alternate. Ahora los tres locales entran como <loc>.
  const LOCALES = ['es', 'en', 'us'] as const

  // Rutas que no deben listarse fuera de /es:
  //  - /reclamaciones es el libro de reclamaciones exigido por Indecopi:
  //    obligación peruana, sin sentido para un comprador de EE.UU.
  // En EE.UU. solo se venden tres servicios: páginas web, SEO y tiendas online.
  // El resto del catálogo se mantiene vivo para /es —donde sí se vende— pero
  // fuera del sitemap de /en y /us: veinte páginas de servicio compitiendo
  // entre sí diluyen el foco justo en el mercado que se está abriendo.
  const NOT_SOLD_IN_US = [
    '/servicios/google-ads', '/servicios/socialmedia', '/servicios/branding',
    '/servicios/ugc', '/servicios/influencer-marketing', '/servicios/relaciones-publicas',
    '/servicios/meta-ads', '/servicios/tiktok-ads', '/servicios/performance-marketing',
    '/servicios/email-marketing', '/servicios/marketing-clinicas',
    '/servicios/posicionamiento-ia', '/servicios/marketing-abogados',
    '/servicios/marketing-inmobiliarias', '/servicios/marketing-ecommerce',
    // 8-set-2026: estas tres se crearon el 2-set con `noindex: locale !== 'es'`
    // en su layout, pero nadie las añadió aquí, así que el sitemap listaba
    // seis URLs (3 verticales × /en y /us) marcadas noindex. Pedirle a Google
    // que rastree lo que a la vez se le prohíbe indexar gasta rastreo y manda
    // una señal contradictoria.
    '/servicios/marketing-clinicas-dentales',
    '/servicios/marketing-clinicas-esteticas',
    '/servicios/marketing-veterinarias',
  ]

  // 28-ago-2026: /us recupera /blogs. Antes se excluía porque servía los mismos
  // posts peruanos con canonical a /es; ahora tiene locale propio ('us') y sus
  // artículos canonicalizan en /us, así que su índice sí es una URL con
  // contenido propio que indexar.
  const SKIP: Record<string, string[]> = {
    us: ['/reclamaciones', ...NOT_SOLD_IN_US],
    en: ['/reclamaciones', ...NOT_SOLD_IN_US],
  }

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    LOCALES.filter((loc) => !(SKIP[loc] ?? []).includes(page.path)).map((loc) => ({
      // El <loc> lleva el slug real del locale: en /en es /seo-agency, no
      // /posicionamiento-seo (que redirige).
      url: localizedUrl(page.path, loc),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      // /es mantiene su prioridad histórica; /en y /us arrancan un escalón por
      // debajo salvo en la línea UGC, que es la apuesta para EE.UU.
      // Los tres servicios que sí se venden en EE.UU. conservan prioridad
      // máxima también fuera de /es.
      priority: loc === 'es' || ['/posicionamiento-seo', '/tiendas-virtuales-lima', '/servicios/web-development'].includes(page.path)
        ? page.priority
        : Math.round((page.priority - 0.05) * 100) / 100,
      alternates: { languages: hreflangFor(page.path) },
    }))
  )

  const marketEntries: MetadataRoute.Sitemap = marketOnlyPages.map((p) => ({
    url: p.url,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p.priority,
  }))

  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const supabase = createServerClient()
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, locale')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    // Slugs consolidados por canibalización (301 en next.config.ts): siguen en
    // la base pero ya no deben listarse — el sitemap no debe apuntar a URLs
    // que redirigen.
    const REDIRECTED_SLUGS = new Set([
      'es-blogs-diseno-web-lima-peru',
      'es-blogs-mejor-agencia-web-lima-peru',
      'cuanto-cuesta-una-pagina-web-en-peru-en-2026-precios-reales',
      'cuanto-cuesta-crear-una-pagina-web-en-peru-este-ano',
      'mejores-agencias-de-publicidad',
      'crear-tienda-online-en-peru-con-shopify-o-woocommerce-guia-2026',
    ])

    if (posts) {
      const livePosts = posts.filter((p) => !REDIRECTED_SLUGS.has(p.slug))
      // Los posts NO son traducciones el uno del otro: los de 'en' son piezas
      // escritas para EE.UU. y los de 'es' para Perú. Emitir hreflang entre
      // ellos sería declarar equivalencias falsas, así que cada post va con su
      // canonical y sin alternates.
      blogEntries = livePosts.map((post) => ({
        url: `${baseUrl}/${post.locale}/blogs/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    }
  } catch {
    // Silently fail
  }

  // Artículos es-US servidos desde el código mientras la base no los admita.
  // Se excluyen los que ya estén publicados en Supabase para no duplicarlos.
  const yaEnBase = new Set(blogEntries.map((e) => e.url))
  const staticUsEntries: MetadataRoute.Sitemap = STATIC_US_POSTS
    .map((p) => `${baseUrl}/us/blogs/${p.slug}`)
    .filter((url) => !yaEnBase.has(url))
    .map((url) => ({
      url,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  return [...staticEntries, ...marketEntries, ...blogEntries, ...staticUsEntries]
}
