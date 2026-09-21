/**
 * blog-cta-map — mapa slug→servicio del cluster de blogs (fuente única).
 *
 * Antes vivía dentro de BlogCTA.tsx y solo cubría ~55 slugs: los otros ~80
 * posts caían al fallback heurístico y el 39% del cluster terminaba con CTA
 * hacia /servicios/performance-marketing aunque el tema fuera branding, redes
 * o tiendas. Ahora TODOS los posts publicados tienen mapeo explícito por tema
 * y el mapa lo comparten BlogCTA (CTA + guías) y el blog (related posts).
 */

export type ServiceKey =
  | 'web' | 'branding' | 'meta-ads' | 'tiktok-ads' | 'google-ads'
  | 'performance' | 'email' | 'seo' | 'social' | 'clinicas'
  | 'inmobiliarias' | 'ecommerce' | 'tiendas'

// Mapeo explícito slug → servicio (cluster completo, 2026-07-16).
export const SLUG_MAP: Record<string, ServiceKey> = {
  'cuanto-cuesta-pagina-web-peru-2026': 'web',
  'shopify-vs-woocommerce-peru-2026': 'tiendas',
  // ---- refresh 2026-07-28 ----
  'tarifas-publicidad-digital-peru-2026-google-meta-tiktok-linkedin': 'google-ads',
  // ---- blogs imán de LEADS (buyer-intent, 2026-07) ----
  'cuanto-cuesta-agencia-seo-lima-2026': 'seo',
  'cuanto-cuesta-google-ads-lima-agencia-2026': 'google-ads',
  'cuanto-cuesta-community-manager-redes-lima-2026': 'social',
  // ---- LEADS tanda 2 (buyer-intent + verticales) ----
  'mejores-agencias-seo-lima-como-elegir-2026': 'seo',
  'agencia-google-ads-inmobiliarias-lima': 'google-ads',
  'agencia-google-ads-clinicas-dentistas-lima': 'google-ads',
  'cuanto-cuesta-mantener-tienda-virtual-peru-2026': 'tiendas',
  'tienda-virtual-o-vender-en-marketplace-peru': 'tiendas',
  // ---- cluster Tiendas Virtuales + SEO/SEM (2026-07) ----
  'cuanto-cuesta-tienda-virtual-peru-2026': 'tiendas',
  'como-crear-tienda-online-que-venda-peru': 'tiendas',
  'pasarelas-pago-tienda-online-peru': 'tiendas',
  'shopify-woocommerce-tiendanube-peru-cual-elegir': 'tiendas',
  'errores-crear-tienda-virtual-peru': 'tiendas',
  'seo-para-ecommerce-tienda-online-peru': 'seo',
  'google-ads-shopping-tiendas-online-peru': 'google-ads',
  // ---- reenrutado de blogs legacy con tráfico (según red neuronal 2026-07) ----
  'campana-publicitaria-peru': 'google-ads',
  'caracteristicas-de-la-publicidad-importancia-y-claves-para-el-exito': 'google-ads',
  'parafrasist-la-mejor-herramienta-para-resumir-textos': 'seo',
  'crear-tienda-online-en-peru-con-shopify-o-woocommerce-guia-2026': 'tiendas',
  'cuanto-cuesta-crear-una-pagina-web-en-peru-este-ano': 'web',
  'seo-y-sem-importancia': 'seo',
  'google-ads-crecer': 'google-ads',
  'mejores-estrategias-marketing-digital-guia-completa-2023': 'seo',
  'que-es-el-marketing-digital-y-como-emplearlo-para-hacer-crecer-tu-negocio': 'google-ads',
  'como-elegir-agencia-diseno-web-lima': 'web',
  'diseno-web-responsive-peru-2026': 'web',
  'mejores-paginas-web-peruanas-2026': 'web',
  'cuanto-cuesta-branding-peru-2026': 'branding',
  'diferencia-logo-identidad-visual-branding': 'branding',
  'manual-marca-estructura-plantilla': 'branding',
  'rebranding-vs-refresh-cuando-elegir': 'branding',
  'branding-emprendedores-peru-guia': 'branding',
  'meta-ads-pymes-peru-guia-primera-campana-rentable': 'meta-ads',
  'cuanto-cuesta-publicidad-facebook-instagram-peru-2026': 'meta-ads',
  'tiktok-ads-peru-2026-guia-completa-empezar-vender': 'tiktok-ads',
  'cuanto-cuesta-anunciar-tiktok-peru-cpm-cpa': 'tiktok-ads',
  'google-ads-negocios-lima-guia-captar-clientes': 'google-ads',
  'que-es-roas-como-calcularlo-negocio-peru': 'performance',
  'como-construir-embudo-ventas-rentable-ads-peru-2026': 'performance',
  'marketing-digital-clinicas-consultorios-peru-agenda': 'clinicas',
  'marketing-digital-inmobiliarias-peru-generar-leads-calidad': 'inmobiliarias',
  'marketing-ecommerce-peru-estrategia-ads-escalar-ventas': 'ecommerce',
  'marketing-digital-restaurantes-peru-redes-ads': 'social',
  'email-marketing-negocios-peruanos-2026-guia': 'email',
  'google-analytics-4-negocios-peruanos-que-medir': 'performance',
  'pixel-meta-api-conversiones-peru-configurar': 'meta-ads',
  'palabras-clave-negativas-google-ads-peru': 'google-ads',
  'posicionar-negocio-google-maps-lima': 'seo',
  'seo-vs-google-ads-peru-cual-conviene': 'seo',
  'plan-contenido-redes-sociales-peru-plantilla': 'social',
  'automatizaciones-email-ecommerce-peru': 'email',
  'meta-ads-clinicas-dentales-esteticas-lima': 'clinicas',
  'cac-ltv-roas-metricas-negocio-peru': 'performance',
  // ---- 5 blogs de tráfico (2026-07-15) ----
  'cuanto-cobra-agencia-marketing-digital-peru-2026': 'performance',
  'como-elegir-agencia-marketing-digital-lima': 'performance',
  'cuanto-invertir-publicidad-online-peru-negocio': 'performance',
  'ideas-contenido-redes-sociales-negocios-peru': 'social',
  'como-conseguir-clientes-por-internet-peru': 'performance',
  // ---- LEADS tanda 3 (2026-07-16) ----
  'agencia-shopify-peru-que-hace-cuanto-cuesta': 'tiendas',
  'recuperar-carritos-abandonados-tienda-online-peru': 'tiendas',
  'como-calcular-presupuesto-google-ads-ticket-promedio-peru': 'google-ads',
  'remarketing-google-ads-recuperar-clientes-peru': 'google-ads',
  'seo-local-peru-aparecer-cerca-de-mi-2026': 'seo',
  // ---- legacy completo mapeado por tema (2026-07-16): antes caían al ----
  // ---- fallback y su CTA iba a performance aunque el tema fuera otro ----
  '10-herramientas-ia-que-debes-conocer-para-tu-tesis': 'seo',
  '10-mejores-productos-para-vender-a-tu-negocio': 'tiendas',
  '3rcore-una-agencia-de-marketing-digital-de-exito': 'performance',
  '5-beneficios-de-google-ads-pymes': 'google-ads',
  '7p-marketing-mix': 'performance',
  'agencia-marketing-publicidad-enfoque-integral': 'performance',
  'agencias-marketing-contenidos-elegir-mejor-estrategia-marca-empresa': 'social',
  'backlinks-seo': 'seo',
  'barbie-conversacion-social-oppenheimer-menciones': 'social',
  'big-data': 'performance',
  'blogspot': 'web',
  'borrador-automaticoque-son-los-grandes-modelos-de-lenguaje-o-llm-explicacion-y-aplicaciones': 'seo',
  'canciones-virales-para-crear-reels': 'social',
  'casas-de-apuestas-deportivas-peru': 'performance',
  'casos-de-exito-branding': 'branding',
  'claves-investigar-competencia-reforzar-estrategia-marketing': 'performance',
  'como-acercarse-al-nuevo-consumidor-peruano': 'social',
  'como-crear-un-brochure-impactante-para-tu-empresa': 'branding',
  'como-hacer-un-analisis-dafo-para-tu-negocio': 'performance',
  'como-subir-videos-a-tik-tok': 'tiktok-ads',
  'comunicacion-integrada-marketing': 'performance',
  'contratar-agencia-marketing-digital-generar-leads-calidad': 'performance',
  'crecer-monetizar-cuenta-instagram-7-pasos-guia': 'social',
  'cuanto-cuesta-una-pagina-web-en-peru-en-2026-precios-reales': 'web',
  'cursos-gratis-de-marketing-digital': 'performance',
  'cyberclick-se-afianza': 'performance',
  'diferencias-importancias-seo-sem-marketing-digital': 'seo',
  'e-commerce-en-peru-todo-lo-que-debes-saber': 'tiendas',
  'el-mundo-del-metaverso': 'social',
  'el-terror-de-los-disenadores-graficos': 'branding',
  'es-blogs-diseno-web-lima-peru': 'web',
  'es-blogs-mejor-agencia-web-lima-peru': 'web',
  'estrategias-de-marketing-digital': 'performance',
  'estrategias-efectivas-para-la-gestion-de-redes-sociales': 'social',
  'google-analytics-marketing-digital': 'performance',
  'guia-completa-uso-texto-alternativo-redes-sociales': 'social',
  'importancia-utilizar-colores-pantone-diseno': 'branding',
  'inbound-marketing-branding-mejor-combinacion': 'branding',
  'la-ambivalencia-en-el-mercado-de-salsas-en-el-peru-un-desafio-para-el-lider': 'branding',
  'la-importancia-de-un-manual-de-marca-para-tu-negocio': 'branding',
  'la-importancia-del-seo-en-el-desarrollo-web': 'seo',
  'la-psicologia-de-los-colores-un-glosario-sobre-la-identidad-de-marca': 'branding',
  'landing-page-ecommerce-mejores-tecnicas-ejemplos-exito': 'tiendas',
  'linkedin-que-es-redes-sociales': 'social',
  'marketing-inmobiliario': 'inmobiliarias',
  'marketing-internacional-que-es-y-las-mejores-estrategias': 'performance',
  'marketing-one-to-one-exito-empresa-guia-completa-2023': 'performance',
  'marketing-vino-diseno-botella-diferencia-generar-ventas': 'branding',
  'maximiza-tu-roi-con-google-ads-y-meta-ads': 'google-ads',
  'mejorar-distribucion-contenido-facebook': 'meta-ads',
  'mejores-agencias-de-marketing-digital': 'performance',
  'mejores-agencias-de-publicidad': 'performance',
  'mejores-campanas-marketing-digital-ejemplos-2023': 'performance',
  'mejores-herramientas-ia-analitica-predictiva': 'performance',
  'mes-morado-sin-milagro-el-fracaso-comercial-de-la-moradita-de-inca-kola': 'branding',
  'metricool': 'social',
  'moodboard-tecnica': 'branding',
  'moviles-publicidad-conductual-nuestros-datos': 'performance',
  'packaging-innovador': 'branding',
  'palabras-clave-seo': 'seo',
  'perfil-de-social-manager-para-agencia-de-marketing': 'social',
  'plan-de-marketing-digital-plantilla': 'performance',
  'primeras-experiencias-con-google-analytics-4-guia-para-principiante': 'performance',
  'proceso-de-compra-fases': 'performance',
  'publicidad-btl': 'performance',
  'que-es-el-content-manager-y-cuales-son-sus-objetivos': 'social',
  'redes-sociales-5-errores': 'social',
  'redes-sociales-para-2023-conoce-tus-mejores-alternativas': 'social',
  'regla-de-tercios': 'social',
  'seo-posicionamiento': 'seo',
  'smodin-herramienta-seo-para-parafrasear-y-reescribir-textos': 'seo',
  'temas-importantes-para-abordar-con-cliente': 'performance',
  'tendencias-en-diseno-de-paginas-web-para-2024': 'web',
  'tienda-online-peru': 'tiendas',
  'tipos-de-logo': 'branding',
  'tips-para-posicionar-tu-marca': 'branding',
  'todo-lo-que-debes-saber-de-threads-la-nueva-app-de-meta-que-nace-para-desafiar-a-twitter': 'social',
  'tu-empresa-peruana-sin-web-en-2026-estas-regalandole-clientes-a-tu-competencia': 'web',
  'ventas-tienda-online': 'tiendas',
  'verificacion-cuentas-instagram-facebook': 'social',
}

// Fallback por heurística de palabras clave (para slugs futuros no mapeados).
export function inferService(slug: string): ServiceKey {
  const s = slug.toLowerCase()
  if (/tiktok/.test(s)) return 'tiktok-ads'
  if (/(meta-ads|facebook|instagram|pixel)/.test(s)) return 'meta-ads'
  if (/(google-ads|adwords|sem|negativas)/.test(s)) return 'google-ads'
  if (/(seo|maps|posicion)/.test(s)) return 'seo'
  if (/(branding|logo|marca|rebranding)/.test(s)) return 'branding'
  if (/(tienda|ecommerce|e-commerce|shopify|woocommerce|tiendanube|pasarela|carrito)/.test(s)) return 'tiendas'
  if (/(web|landing|pagina)/.test(s)) return 'web'
  if (/email/.test(s)) return 'email'
  if (/(redes|social|contenido)/.test(s)) return 'social'
  if (/clinic/.test(s)) return 'clinicas'
  if (/inmobili/.test(s)) return 'inmobiliarias'
  return 'performance'
}

export function serviceForSlug(slug: string): ServiceKey {
  return SLUG_MAP[slug] || inferService(slug)
}

// Guías buyer-intent por servicio: alimentan el bloque "Sigue leyendo" de
// BlogCTA. Desorfaniza el cluster: cada post enlaza a las guías de decisión
// de su mismo tema (título real como anchor, sin sobre-optimizar).
export const SERVICE_GUIDES: Record<ServiceKey, { slug: string; title: string }[]> = {
  tiendas: [
    { slug: 'cuanto-cuesta-tienda-virtual-peru-2026', title: 'Cuánto cuesta una tienda virtual en Perú 2026' },
    { slug: 'tienda-virtual-o-vender-en-marketplace-peru', title: '¿Tienda virtual propia o vender en marketplace?' },
    { slug: 'pasarelas-pago-tienda-online-peru', title: 'Pasarelas de pago para tu tienda online en Perú' },
  ],
  seo: [
    { slug: 'cuanto-cuesta-agencia-seo-lima-2026', title: 'Cuánto cuesta una agencia SEO en Lima 2026' },
    { slug: 'seo-vs-google-ads-peru-cual-conviene', title: 'SEO vs Google Ads en Perú: cuál conviene' },
    { slug: 'mejores-agencias-seo-lima-como-elegir-2026', title: 'Cómo elegir agencia SEO en Lima' },
  ],
  'google-ads': [
    { slug: 'cuanto-cuesta-google-ads-lima-agencia-2026', title: 'Cuánto cuesta Google Ads con agencia en Lima' },
    { slug: 'google-ads-negocios-lima-guia-captar-clientes', title: 'Google Ads para negocios en Lima' },
    { slug: 'palabras-clave-negativas-google-ads-peru', title: 'Palabras clave negativas en Google Ads' },
  ],
  web: [
    { slug: 'cuanto-cuesta-pagina-web-peru-2026', title: 'Cuánto cuesta una página web en Perú 2026' },
    { slug: 'como-elegir-agencia-diseno-web-lima', title: 'Cómo elegir agencia de diseño web en Lima' },
    { slug: 'diseno-web-responsive-peru-2026', title: 'Diseño web responsive en Perú' },
  ],
  branding: [
    { slug: 'cuanto-cuesta-branding-peru-2026', title: 'Cuánto cuesta el branding en Perú 2026' },
    { slug: 'manual-marca-estructura-plantilla', title: 'Manual de marca: estructura y plantilla' },
    { slug: 'diferencia-logo-identidad-visual-branding', title: 'Logo vs identidad visual vs branding' },
  ],
  social: [
    { slug: 'cuanto-cuesta-community-manager-redes-lima-2026', title: 'Cuánto cuesta un community manager en Lima' },
    { slug: 'ideas-contenido-redes-sociales-negocios-peru', title: 'Ideas de contenido para redes de negocios' },
    { slug: 'plan-contenido-redes-sociales-peru-plantilla', title: 'Plan de contenido para redes: plantilla' },
  ],
  'meta-ads': [
    { slug: 'cuanto-cuesta-publicidad-facebook-instagram-peru-2026', title: 'Cuánto cuesta la publicidad en Facebook e Instagram' },
    { slug: 'meta-ads-pymes-peru-guia-primera-campana-rentable', title: 'Meta Ads para pymes: primera campaña rentable' },
  ],
  'tiktok-ads': [
    { slug: 'cuanto-cuesta-anunciar-tiktok-peru-cpm-cpa', title: 'Cuánto cuesta anunciar en TikTok en Perú' },
    { slug: 'tiktok-ads-peru-2026-guia-completa-empezar-vender', title: 'TikTok Ads Perú: guía completa' },
    { slug: 'como-subir-videos-a-tik-tok', title: 'Cómo subir videos a Tik Tok' },
  ],
  performance: [
    { slug: 'cuanto-invertir-publicidad-online-peru-negocio', title: 'Cuánto invertir en publicidad online en Perú' },
    { slug: 'que-es-roas-como-calcularlo-negocio-peru', title: 'Qué es el ROAS y cómo calcularlo' },
  ],
  email: [
    { slug: 'email-marketing-negocios-peruanos-2026-guia', title: 'Email marketing para negocios peruanos' },
    { slug: 'automatizaciones-email-ecommerce-peru', title: 'Automatizaciones de email para e-commerce' },
  ],
  clinicas: [
    { slug: 'agencia-google-ads-clinicas-dentistas-lima', title: 'Google Ads para clínicas y dentistas en Lima' },
    { slug: 'marketing-digital-clinicas-consultorios-peru-agenda', title: 'Marketing digital para clínicas y consultorios' },
  ],
  inmobiliarias: [
    { slug: 'agencia-google-ads-inmobiliarias-lima', title: 'Google Ads para inmobiliarias en Lima' },
    { slug: 'marketing-digital-inmobiliarias-peru-generar-leads-calidad', title: 'Marketing digital para inmobiliarias' },
  ],
  ecommerce: [
    { slug: 'marketing-ecommerce-peru-estrategia-ads-escalar-ventas', title: 'Marketing para e-commerce en Perú' },
    { slug: 'google-ads-shopping-tiendas-online-peru', title: 'Google Shopping para tiendas online' },
  ],
}

// Guías del mismo servicio, excluyendo el post actual (para "Sigue leyendo").

/**
 * Guías equivalentes en inglés. Sin esto, un post de /en enlazaba a artículos
 * en español que devuelven 307 hacia /es: el CTA sacaba al lector del idioma
 * justo en el punto donde más atención tiene.
 */
export const SERVICE_GUIDES_EN: Record<ServiceKey, { slug: string; title: string }[]> = {
  tiendas: [
    { slug: 'marketing-budget-for-small-business', title: 'How much should a small business spend on marketing?' },
    { slug: 'questions-to-ask-a-marketing-agency', title: '12 questions to ask a marketing agency before you sign' },
    { slug: 'how-much-does-a-small-business-website-cost', title: 'How much does a small business website cost in 2026?' },
  ],
  seo: [
    { slug: 'spanish-seo-for-us-businesses', title: 'Spanish SEO for U.S. businesses: the traffic nobody is bidding on' },
    { slug: 'questions-to-ask-a-marketing-agency', title: '12 questions to ask a marketing agency before you sign' },
  ],
  web: [
    { slug: 'questions-to-ask-a-marketing-agency', title: '12 questions to ask a marketing agency before you sign' },
    { slug: 'nearshore-vs-offshore-marketing-team', title: 'Nearshore vs offshore marketing teams: what actually changes' },
  ],
  branding: [
    { slug: 'nearshore-vs-offshore-marketing-team', title: 'Nearshore vs offshore marketing teams: what actually changes' },
    { slug: 'marketing-budget-for-small-business', title: 'How much should a small business spend on marketing?' },
  ],
  social: [
    { slug: 'creative-testing-framework-paid-social', title: 'A creative testing framework for paid social' },
    { slug: 'how-much-does-ugc-content-cost', title: 'How much does UGC content cost in 2026?' },
  ],
  'meta-ads': [
    { slug: 'creative-testing-framework-paid-social', title: 'A creative testing framework for paid social' },
    { slug: 'how-much-does-ugc-content-cost', title: 'How much does UGC content cost in 2026?' },
  ],
  'tiktok-ads': [
    { slug: 'how-much-does-ugc-content-cost', title: 'How much does UGC content cost in 2026?' },
    { slug: 'ugc-usage-rights-explained', title: 'UGC usage rights explained: what you are actually buying' },
  ],
  'google-ads': [
    { slug: 'marketing-budget-for-small-business', title: 'How much should a small business spend on marketing?' },
    { slug: 'spanish-seo-for-us-businesses', title: 'Spanish SEO for U.S. businesses' },
  ],
  performance: [
    { slug: 'creative-testing-framework-paid-social', title: 'A creative testing framework for paid social' },
    { slug: 'marketing-budget-for-small-business', title: 'How much should a small business spend on marketing?' },
    { slug: 'how-much-does-a-small-business-website-cost', title: 'How much does a small business website cost in 2026?' },
    { slug: 'spanish-seo-for-us-businesses', title: 'Spanish SEO for U.S. businesses: the traffic nobody is bidding on' },
  ],
  email: [
    { slug: 'marketing-budget-for-small-business', title: 'How much should a small business spend on marketing?' },
    { slug: 'questions-to-ask-a-marketing-agency', title: '12 questions to ask a marketing agency before you sign' },
  ],
  clinicas: [
    { slug: 'why-translated-spanish-ads-underperform', title: 'Why translated Spanish ads underperform in the U.S.' },
    { slug: 'marketing-budget-for-small-business', title: 'How much should a small business spend on marketing?' },
  ],
  inmobiliarias: [
    { slug: 'why-translated-spanish-ads-underperform', title: 'Why translated Spanish ads underperform in the U.S.' },
    { slug: 'questions-to-ask-a-marketing-agency', title: '12 questions to ask a marketing agency before you sign' },
  ],
  ecommerce: [
    { slug: 'creative-testing-framework-paid-social', title: 'A creative testing framework for paid social' },
    { slug: 'how-much-does-ugc-content-cost', title: 'How much does UGC content cost in 2026?' },
  ],
}

/**
 * Hash estable del slug. Mismo post, misma selección en cada build; posts
 * distintos, selecciones distintas.
 */
function desplazamiento(slug: string, total: number, toma: number): number {
  if (total <= toma) return 0
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h % (total - toma + 1)
}

/**
 * 30-ago-2026. Antes esto devolvía SIEMPRE los dos primeros destinos de cada
 * categoría (`.slice(0, max)`), así que los 32 destinos de la tabla se reducían
 * en la práctica a un puñado: se midieron 435 enlaces de este bloque repartidos
 * entre solo 13 URLs, y los seis primeros acaparaban el 62%.
 *
 * Mientras tanto, 85 de los 173 posts de /es no reciben ningún enlace salvo su
 * ficha en el índice paginado. Y como el dominio no tiene NI UN enlace externo
 * (Bing devuelve 0 en GetLinkCounts), el reparto interno es la única autoridad
 * que hay que mover.
 *
 * Con la ventana rotada por hash del slug, cada post reparte sus enlaces a
 * destinos distintos y la tabla entera acaba enlazada, de forma determinística
 * y estable entre builds. Es el mismo patrón que ya usa getRelatedPosts.
 */
export function guidesFor(slug: string, max = 2, locale = 'es'): { slug: string; title: string }[] {
  const key = serviceForSlug(slug)
  const table = locale === 'en' ? SERVICE_GUIDES_EN : SERVICE_GUIDES
  const pool = (table[key] || []).filter((g) => g.slug !== slug)
  const off = desplazamiento(slug, pool.length, max)
  return pool.slice(off, off + max)
}
