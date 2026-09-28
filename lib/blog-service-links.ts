/**
 * Enlace contextual a la página de servicio dentro del texto de cada post de /es.
 *
 * 28-sep-2026. Rastreo de las 148 fichas de /es/blogs: 55 no enlazaban ninguna
 * página de servicio desde el cuerpo (solo el CTA a /cotizar), y los posts con
 * más tráfico —7P, La Moradita, tipos de logo, cómo subir videos a TikTok—
 * no empujaban a nada. El contenido vive en Supabase y la mayoría de esos posts
 * no está en lib/blog-seed, así que editarlos uno por uno no es posible desde
 * el repo. Esto añade, en el servidor, un párrafo con el enlace justo después
 * del primer párrafo del artículo (dentro del texto, no en una caja aparte).
 *
 * Reglas:
 *  - Solo /es. /en y /us tienen sus propios servicios y no se tocan aquí.
 *  - Los posts de la tabla POR_SLUG llevan su frase escrita a mano (ancla
 *    exacta decidida en el plan Perú). Se añade salvo que el cuerpo ya lleve
 *    ese mismo enlace con esa misma ancla (así, cuando el seed-blogs sube la
 *    versión con el enlace escrito dentro del texto, no se duplica).
 *  - El resto recibe la frase de su servicio (según SLUG_MAP) solo si el
 *    cuerpo no enlaza todavía esa página de servicio.
 *  - Cada frase dice solo lo que ya publica la página de servicio enlazada.
 */
import { serviceForSlug, type ServiceKey } from '@/lib/blog-cta-map'

interface Enlace {
  href: string
  ancla: string
}

interface Frase {
  /** Enlaces que deben estar en el cuerpo (href + ancla exacta). */
  enlaces: Enlace[]
  /** HTML del párrafo. */
  html: string
}

const a = (e: Enlace) => `<a href="${e.href}">${e.ancla}</a>`

const SEO: Enlace = { href: '/es/posicionamiento-seo', ancla: 'agencia SEO en Lima' }
const ADS: Enlace = { href: '/es/servicios/google-ads', ancla: 'agencia de Google Ads en Lima' }
const META: Enlace = { href: '/es/servicios/meta-ads', ancla: 'agencia de Meta Ads en Lima' }
const TIKTOK: Enlace = { href: '/es/servicios/tiktok-ads', ancla: 'agencia de TikTok Ads en Lima' }
const BRANDING: Enlace = { href: '/es/servicios/branding', ancla: 'agencia de branding en Lima' }
const WEB: Enlace = { href: '/es/servicios/web-development', ancla: 'diseño de páginas web en Lima' }
const SOCIAL: Enlace = { href: '/es/servicios/socialmedia', ancla: 'agencia de redes sociales en Lima' }
const EMAIL: Enlace = { href: '/es/servicios/email-marketing', ancla: 'email marketing y automatización' }

const POR_SERVICIO: Record<'seo' | 'ads' | 'meta' | 'tiktok' | 'branding' | 'web' | 'social' | 'email', Frase> = {
  seo: {
    enlaces: [SEO],
    html: `<p>Si prefieres que un equipo lo haga por ti, en 3R Core trabajamos como ${a(SEO)}: auditoría técnica, contenido y enlaces, con acceso a tu propio Search Console para que veas el avance.</p>`,
  },
  ads: {
    enlaces: [ADS],
    html: `<p>Si quieres llevar esto a campañas que traigan consultas, en 3R Core somos ${a(ADS)}: armamos la cuenta dentro de tu propio Google Ads y cada mes te enviamos el reporte con tu coste por lead.</p>`,
  },
  meta: {
    enlaces: [META],
    html: `<p>Si quieres que esto se convierta en campañas en Facebook e Instagram, en 3R Core trabajamos como ${a(META)}, con retargeting, catálogo y mensajes directos a WhatsApp.</p>`,
  },
  tiktok: {
    enlaces: [TIKTOK],
    html: `<p>Y si quieres pasar de publicar videos a anunciarlos, en 3R Core trabajamos como ${a(TIKTOK)} con Spark Ads, video nativo y creadores UGC propios.</p>`,
  },
  branding: {
    enlaces: [BRANDING],
    html: `<p>Si tu marca necesita este trabajo hecho por un equipo, en 3R Core somos ${a(BRANDING)}: identidad visual, logotipo, manual de marca y aplicaciones.</p>`,
  },
  web: {
    enlaces: [WEB],
    html: `<p>Si necesitas que alguien lo construya por ti, en 3R Core hacemos ${a(WEB)}: sitios corporativos, landing pages y e-commerce con SEO técnico incluido.</p>`,
  },
  social: {
    enlaces: [SOCIAL],
    html: `<p>Si prefieres delegarlo, en 3R Core somos ${a(SOCIAL)}: estrategia, diseño, copy y reportes para Instagram, Facebook, TikTok y LinkedIn.</p>`,
  },
  email: {
    enlaces: [EMAIL],
    html: `<p>Si quieres automatizarlo, en 3R Core trabajamos ${a(EMAIL)} para negocios en Perú: flujos automáticos, newsletters y recuperación de carritos abandonados.</p>`,
  },
}

// Cada ServiceKey del mapa de CTA cae en una de las páginas de servicio del
// plan Perú. Los temas de marketing general (7P, DAFO, embudos…) y los
// verticales (clínicas, inmobiliarias, e-commerce) empujan a Google Ads, que es
// la página que tiene que heredar «agencia de Google Ads en Lima».
const DESTINO: Record<ServiceKey, keyof typeof POR_SERVICIO> = {
  seo: 'seo',
  'google-ads': 'ads',
  performance: 'ads',
  clinicas: 'ads',
  inmobiliarias: 'ads',
  ecommerce: 'ads',
  'meta-ads': 'meta',
  'tiktok-ads': 'tiktok',
  branding: 'branding',
  web: 'web',
  tiendas: 'web',
  social: 'social',
  email: 'email',
}

// Los 12 posts con tráfico de la tabla §4 del plan Perú (GSC 90 d), con la
// frase y el ancla escogidas para su tema.
const POR_SLUG: Record<string, Frase> = {
  'parafrasist-la-mejor-herramienta-para-resumir-textos': {
    enlaces: [SEO],
    html: `<p>Una aclaración antes de empezar: parafrasear textos no hace que una web suba en Google. Eso es trabajo de estrategia, contenido propio y enlaces, que es lo que hacemos en 3R Core como ${a(SEO)}.</p>`,
  },
  'caracteristicas-de-la-publicidad-importancia-y-claves-para-el-exito': {
    enlaces: [
      { href: '/es/servicios/google-ads', ancla: 'agencia de publicidad digital' },
      { href: '/es/servicios/meta-ads', ancla: 'campañas en Facebook e Instagram' },
    ],
    html: `<p>Estas cinco claves son las mismas que aplica una <a href="/es/servicios/google-ads">agencia de publicidad digital</a> cuando arma un anuncio en Google o <a href="/es/servicios/meta-ads">campañas en Facebook e Instagram</a>: sin mensaje claro ni llamada a la acción, el presupuesto se va en clics que no compran.</p>`,
  },
  '7p-marketing-mix': {
    enlaces: [
      { href: '/es', ancla: 'agencia de marketing digital en Lima' },
      { href: '/es/servicios/google-ads', ancla: 'Google Ads' },
    ],
    html: `<p>Las 7P se aplican igual en una tienda de barrio que en una <a href="/es">agencia de marketing digital en Lima</a>. La «P» de promoción es la que hoy más se mide: en <a href="/es/servicios/google-ads">Google Ads</a> sabes cuánto te costó cada cliente que llegó buscando lo que vendes.</p>`,
  },
  'mes-morado-sin-milagro-el-fracaso-comercial-de-la-moradita-de-inca-kola': {
    enlaces: [
      { href: '/es/servicios/google-ads', ancla: 'Google Ads' },
      { href: '/es/servicios/meta-ads', ancla: 'Meta Ads' },
    ],
    html: `<p>Hoy un lanzamiento se puede probar con poco dinero antes de apostar la producción: una campaña corta en <a href="/es/servicios/google-ads">Google Ads</a> muestra cuánta gente busca el producto y otra en <a href="/es/servicios/meta-ads">Meta Ads</a> muestra si el mensaje engancha. En 3R Core gestionamos las dos.</p>`,
  },
  'agencias-marketing-contenidos-elegir-mejor-estrategia-marca-empresa': {
    enlaces: [{ href: '/es/posicionamiento-seo', ancla: 'contenido SEO' }],
    html: `<p>Un apunte antes de comparar agencias: el contenido que trae clientes desde Google es el <a href="/es/posicionamiento-seo">contenido SEO</a>, escrito sobre lo que tu cliente busca y medido en Search Console, no el que solo llena el blog.</p>`,
  },
  'tipos-de-logo': {
    enlaces: [BRANDING],
    html: `<p>Elegir el tipo de logo es la primera decisión de una identidad visual. Si prefieres que lo resuelva un equipo, en 3R Core somos ${a(BRANDING)}: logotipo, manual de marca y aplicaciones.</p>`,
  },
  'cuanto-cuesta-publicidad-facebook-instagram-peru-2026': {
    enlaces: [META],
    html: `<p>Los montos de esta guía son referenciales. Si quieres saber cuánto te costaría a ti, calcula tu presupuesto en el <a href="/es/cotizar">cotizador</a> o escríbenos: en 3R Core trabajamos como ${a(META)}.</p>`,
  },
  'como-subir-videos-a-tik-tok': {
    enlaces: [TIKTOK],
    html: `<p>Subir el video es el primer paso. Si después quieres que ese video venda, en 3R Core trabajamos como ${a(TIKTOK)} con Spark Ads y video nativo.</p>`,
  },
  'manual-marca-estructura-plantilla': {
    enlaces: [BRANDING],
    html: `<p>Si prefieres que un equipo arme el manual contigo, en 3R Core somos ${a(BRANDING)}: identidad visual, logotipo, manual de marca y aplicaciones.</p>`,
  },
  'cuanto-cuesta-branding-peru-2026': {
    enlaces: [BRANDING],
    html: `<p>Los montos de esta guía son referenciales: sirven para ubicar tu presupuesto, no son una cotización. Si quieres el precio para tu caso, en 3R Core somos ${a(BRANDING)} y te lo damos por escrito.</p>`,
  },
  'cuanto-cuesta-pagina-web-peru-2026': {
    enlaces: [WEB],
    html: `<p>Los montos de esta guía son referenciales. Si quieres el precio para tu proyecto, en 3R Core hacemos ${a(WEB)} y puedes calcularlo en el <a href="/es/cotizar">cotizador</a>.</p>`,
  },
  'google-ads-shopping-tiendas-online-peru': {
    enlaces: [{ href: '/es/servicios/google-ads', ancla: 'agencia de Google Ads en Perú' }],
    html: `<p>Si prefieres que lo configure un equipo, en 3R Core trabajamos como <a href="/es/servicios/google-ads">agencia de Google Ads en Perú</a> y armamos Shopping con el feed de productos conectado.</p>`,
  },
  // SERP de «agencia google ads lima» (28-sep, desde Perú): 3rcore sale 2.º con
  // este post y no con la página de servicio. El enlace le pasa esa señal.
  'agencia-google-ads-inmobiliarias-lima': {
    enlaces: [ADS],
    html: `<p>Si prefieres que un equipo lleve las campañas de tu proyecto, en 3R Core trabajamos como ${a(ADS)}: armamos la cuenta dentro de tu propio Google Ads y cada mes te enviamos el reporte con tu coste por lead.</p>`,
  },
  'mejores-agencias-seo-lima-como-elegir-2026': {
    enlaces: [SEO],
    html: `<p>Si ya estás comparando propuestas, puedes ver cómo trabajamos en 3R Core como ${a(SEO)} y usar esta guía para medirnos con el mismo criterio que a las demás.</p>`,
  },
}

const tieneEnlace = (html: string, e: Enlace) => {
  // El href puede venir relativo o absoluto; basta con que aparezca la ruta.
  const re = new RegExp(`<a[^>]+href="(?:https://3rcore\\.com)?${e.href.replace(/[/.]/g, '\\$&')}/?"[^>]*>\\s*${e.ancla.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*</a>`, 'i')
  return re.test(html)
}

const enlazaRuta = (html: string, href: string) =>
  new RegExp(`href="(?:https://3rcore\\.com)?${href.replace(/[/.]/g, '\\$&')}/?["#?]`, 'i').test(html)

/** Párrafo a insertar en el cuerpo del post, o null si ya lo tiene. */
export function fraseDeServicio(slug: string, html: string): string | null {
  const propia = POR_SLUG[slug]
  if (propia) {
    return propia.enlaces.every((e) => tieneEnlace(html, e)) ? null : propia.html
  }
  const frase = POR_SERVICIO[DESTINO[serviceForSlug(slug)]]
  return frase.enlaces.some((e) => enlazaRuta(html, e.href)) ? null : frase.html
}

/** Inserta el párrafo tras el primer párrafo del artículo (o al inicio si no hay). */
export function conEnlaceDeServicio(slug: string, html: string): string {
  const frase = fraseDeServicio(slug, html)
  if (!frase) return html
  const fin = html.indexOf('</p>')
  if (fin === -1) return frase + html
  const corte = fin + '</p>'.length
  return html.slice(0, corte) + '\n' + frase + html.slice(corte)
}
