/**
 * /es/glosario-marketing-digital — glosario con las siglas y términos que usamos
 * en propuestas, reportes y en el blog.
 *
 * 3-nov-2026. Idea tomada del análisis de flamacreators.com, que tiene un
 * glosario como página propia. En 3rcore las definiciones largas ya existen en
 * el blog (ROAS, CAC/LTV, Performance Max, remarketing…); aquí cada término lleva
 * una definición corta y enlaza a su artículo, así la página es un índice y no
 * compite con ellos. Search Console ya mostraba búsquedas tipo «qué es cac y
 * roas» en posiciones 1-3 (ago-oct).
 *
 * Los términos viven en un solo array: de ahí salen los bloques visibles y el
 * DefinedTermSet, así nunca se desalinean.
 */
import { BASE_URL } from '@/lib/metadata'
import { bridges, closing, esc, faqBlock, hero, page, prose, sec, type Faq, type LandingPeru } from '@/lib/landings-peru'

type Term = { id: string; t: string; d: string; link?: { href: string; label: string } }
type Group = { h2: string; intro: string; terms: Term[] }

const B = '/es/blogs/'

const GROUPS: Group[] = [
  {
    h2: 'Métricas de negocio',
    intro: 'Las que decide el dueño del negocio. Si la agencia no te reporta estas, te está reportando actividad, no resultados.',
    terms: [
      { id: 'roas', t: 'ROAS', d: 'Retorno de la inversión publicitaria: ventas atribuidas a los anuncios divididas entre lo que costaron. Si inviertes S/1,000 y vendes S/4,000, el ROAS es 4. Para saber si es bueno hay que compararlo con tu margen: con un margen del 25 %, necesitas un ROAS de 4 solo para no perder.', link: { href: `${B}que-es-roas-como-calcularlo-negocio-peru`, label: 'Cómo calcular el ROAS de tu negocio' } },
      { id: 'cac', t: 'CAC (costo de adquisición de cliente)', d: 'Todo lo que gastas en marketing y ventas en un periodo dividido entre los clientes nuevos de ese periodo. Incluye la pauta, la agencia y las herramientas, no solo el anuncio.', link: { href: `${B}cac-ltv-roas-metricas-negocio-peru`, label: 'CAC, LTV y ROAS explicados' } },
      { id: 'ltv', t: 'LTV (valor de vida del cliente)', d: 'Lo que un cliente te deja en ganancia durante toda su relación contigo. Si el LTV es tres veces el CAC o más, el negocio puede crecer pagando publicidad; si es menor, cada cliente nuevo te cuesta dinero.', link: { href: `${B}cac-ltv-roas-metricas-negocio-peru`, label: 'CAC, LTV y ROAS explicados' } },
      { id: 'roi', t: 'ROI', d: 'Retorno de la inversión: ganancia menos inversión, dividido entre la inversión. A diferencia del ROAS, usa la ganancia y no las ventas, por eso es la cifra que de verdad dice si una campaña conviene.', link: { href: `${B}maximiza-tu-roi-con-google-ads-y-meta-ads`, label: 'ROI con Google Ads y Meta Ads' } },
      { id: 'tasa-de-conversion', t: 'Tasa de conversión', d: 'Porcentaje de visitas que hacen lo que buscas: escribir por WhatsApp, llenar un formulario o comprar. Una web con poca tasa de conversión encarece todos los demás canales.' },
      { id: 'lead', t: 'Lead', d: 'Persona que dejó sus datos o escribió para pedir información. Un lead no es una venta: conviene contar aparte los leads que el equipo comercial califica como reales.', link: { href: `${B}contratar-agencia-marketing-digital-generar-leads-calidad`, label: 'Cómo conseguir leads de calidad' } },
      { id: 'embudo-de-ventas', t: 'Embudo de ventas', d: 'El camino de una persona desde que conoce tu marca hasta que compra: descubrimiento, consideración y decisión. Cada etapa necesita un mensaje y un canal distinto.', link: { href: `${B}como-construir-embudo-ventas-rentable-ads-peru-2026`, label: 'Cómo armar un embudo rentable con anuncios' } },
    ],
  },
  {
    h2: 'Publicidad pagada',
    intro: 'Los términos que aparecen en una cuenta de Google Ads, Meta o TikTok y en su factura.',
    terms: [
      { id: 'sem', t: 'SEM', d: 'Marketing en buscadores. En la práctica, en Perú se usa como sinónimo de anuncios en Google: pagas para salir arriba cuando alguien busca lo que vendes.', link: { href: `${B}diferencias-importancias-seo-sem-marketing-digital`, label: 'Diferencias entre SEO y SEM' } },
      { id: 'google-ads', t: 'Google Ads', d: 'La plataforma de anuncios de Google: búsqueda, YouTube, Maps, Gmail y la red de sitios asociados. Se paga por clic o por conversión, con un presupuesto diario que tú fijas.', link: { href: '/es/servicios/google-ads', label: 'Gestión de Google Ads' } },
      { id: 'cpc', t: 'CPC (costo por clic)', d: 'Lo que pagas cada vez que alguien hace clic en tu anuncio. No es un precio fijo: sale de una subasta donde pesan tu oferta y la calidad del anuncio y de la página.', link: { href: `${B}cuanto-cuesta-google-ads-lima-agencia-2026`, label: 'Cuánto cuesta Google Ads en Lima' } },
      { id: 'cpm', t: 'CPM (costo por mil impresiones)', d: 'Lo que pagas cada vez que tu anuncio se muestra mil veces. Es la forma habitual de medir el costo en Meta y TikTok, donde el objetivo muchas veces es alcance.', link: { href: `${B}cuanto-cuesta-anunciar-tiktok-peru-cpm-cpa`, label: 'CPM y CPA en TikTok Ads Perú' } },
      { id: 'cpa', t: 'CPA (costo por adquisición)', d: 'Lo que te cuesta cada conversión: un lead, una venta o un registro. Es la cifra más útil para comparar canales entre sí.', link: { href: `${B}tarifas-publicidad-digital-peru-2026-google-meta-tiktok-linkedin`, label: 'Tarifas de publicidad digital en Perú' } },
      { id: 'ctr', t: 'CTR (tasa de clics)', d: 'Porcentaje de personas que hicieron clic después de ver tu anuncio o tu resultado en Google. Un CTR bajo en buena posición suele indicar un título poco atractivo.' },
      { id: 'performance-max', t: 'Performance Max', d: 'Tipo de campaña de Google Ads que reparte un mismo presupuesto entre búsqueda, YouTube, Display, Discover, Gmail y Maps con ayuda de la automatización de Google. Funciona bien cuando la medición de conversiones es fiable.', link: { href: `${B}performance-max-google-ads-peru`, label: 'Performance Max en Perú' } },
      { id: 'palabras-clave-negativas', t: 'Palabras clave negativas', d: 'Búsquedas para las que le dices a Google que no muestre tu anuncio, como «gratis» o «trabajo». Evitan pagar clics que nunca van a comprar.', link: { href: `${B}palabras-clave-negativas-google-ads-peru`, label: 'Palabras clave negativas en Google Ads' } },
      { id: 'remarketing', t: 'Remarketing', d: 'Mostrar anuncios a quienes ya visitaron tu web o interactuaron con tu marca. Suele tener mejor costo por venta que salir a buscar gente nueva.', link: { href: `${B}remarketing-google-ads-recuperar-clientes-peru`, label: 'Remarketing para recuperar clientes' } },
      { id: 'pixel-api-conversiones', t: 'Píxel de Meta y API de Conversiones', d: 'El píxel es el código que avisa a Meta qué hace la gente en tu web; la API de Conversiones envía esos mismos datos desde el servidor. Juntos mejoran la medición cuando el navegador bloquea cookies.', link: { href: `${B}pixel-meta-api-conversiones-peru-configurar`, label: 'Configurar el píxel y la API de Conversiones' } },
      { id: 'conversion-offline', t: 'Conversión offline', d: 'Una venta que se cierra fuera de la web, por teléfono o WhatsApp, y se sube después a Google Ads. Le enseña a Google qué clics terminan en clientes de verdad.', link: { href: `${B}cotizaciones-b2b-google-ads-conversiones-offline`, label: 'Conversiones offline en cotizaciones B2B' } },
    ],
  },
  {
    h2: 'SEO y posicionamiento en Google',
    intro: 'Lo que hace que tu web aparezca sin pagar por cada clic.',
    terms: [
      { id: 'seo', t: 'SEO', d: 'Posicionamiento orgánico: el trabajo técnico, de contenido y de enlaces para que tu web salga en Google sin pagar por clic. Las posiciones estables suelen tardar entre 3 y 6 meses.', link: { href: '/es/posicionamiento-seo', label: 'Servicio de posicionamiento SEO' } },
      { id: 'palabra-clave', t: 'Palabra clave', d: 'Lo que la gente escribe en Google. Las cortas («zapatillas») tienen mucho volumen y mucha competencia; las largas («zapatillas para correr mujer lima») traen menos visitas pero con más intención de compra.', link: { href: `${B}palabras-clave-seo`, label: 'Cómo elegir palabras clave' } },
      { id: 'backlink', t: 'Backlink', d: 'Enlace desde otra web hacia la tuya. Para Google es una señal de confianza; pesa más un enlace de un medio o directorio serio de tu sector que cien de sitios sin relación.', link: { href: `${B}backlinks-seo`, label: 'Qué son los backlinks' } },
      { id: 'seo-local', t: 'SEO local y Google Business Profile', d: 'El trabajo para salir en el mapa y en las búsquedas «cerca de mí». Se apoya sobre todo en el perfil de Google Business Profile: categoría, reseñas, fotos y los mismos datos que en tu web.', link: { href: `${B}seo-local-peru-aparecer-cerca-de-mi-2026`, label: 'SEO local en Perú' } },
      { id: 'auditoria-seo', t: 'Auditoría SEO', d: 'Revisión de la web para encontrar lo que impide posicionar: páginas que Google no indexa, títulos duplicados, enlaces rotos, velocidad y contenido flojo. Es el punto de partida de cualquier plan.', link: { href: `${B}auditoria-seo-que-incluye`, label: 'Qué incluye una auditoría SEO' } },
      { id: 'core-web-vitals', t: 'Core Web Vitals', d: 'Tres medidas de Google sobre la experiencia en la página: LCP (lo que tarda en verse el contenido principal, ideal 2,5 s o menos), INP (lo que tarda en responder a un toque, ideal 200 ms o menos) y CLS (cuánto se mueve la página al cargar, ideal 0,1 o menos).' },
      { id: 'datos-estructurados', t: 'Datos estructurados (schema)', d: 'Código que describe la página en un formato que Google entiende: negocio, precio, preguntas frecuentes, reseñas. No sube posiciones por sí solo, pero ayuda a que Google y las IA lean bien quién eres.' },
    ],
  },
  {
    h2: 'Búsqueda con inteligencia artificial',
    intro: 'Cada vez más gente pregunta a ChatGPT, Gemini o a los resúmenes de Google antes de buscar una agencia, un médico o una tienda.',
    terms: [
      { id: 'geo', t: 'GEO (optimización para motores generativos)', d: 'El trabajo para que las IA como ChatGPT, Gemini, Perplexity o Copilot mencionen y enlacen tu marca cuando responden. Se apoya en lo mismo que el SEO más respuestas claras, datos verificables y presencia en sitios que esas IA leen.', link: { href: '/es/servicios/posicionamiento-ia', label: 'Posicionamiento en IA' } },
      { id: 'ai-overviews', t: 'AI Overviews', d: 'Los resúmenes generados por IA que Google muestra encima de los resultados normales. Citan algunas webs como fuente; salir citado ahí trae menos clics que el primer puesto clásico, pero visitas que llegan más decididas.', link: { href: `${B}como-aparecer-en-chatgpt-negocios-peru`, label: 'Cómo aparecer en ChatGPT' } },
      { id: 'llm', t: 'LLM (modelo de lenguaje grande)', d: 'El tipo de IA detrás de ChatGPT, Gemini o Claude: un modelo entrenado con enormes cantidades de texto que genera respuestas palabra por palabra.', link: { href: `${B}borrador-automaticoque-son-los-grandes-modelos-de-lenguaje-o-llm-explicacion-y-aplicaciones`, label: 'Qué son los LLM' } },
      { id: 'llms-txt', t: 'llms.txt', d: 'Archivo de texto en la raíz de una web que resume para las IA quién es la empresa, qué vende y cuáles son sus páginas clave. Es una propuesta abierta de 2024, no un estándar oficial de Google, y es barata de mantener. El nuestro está en <a href="/llms.txt">3rcore.com/llms.txt</a>.' },
    ],
  },
  {
    h2: 'Medición',
    intro: 'Sin medición no hay forma de saber qué canal trae clientes.',
    terms: [
      { id: 'ga4', t: 'GA4 (Google Analytics 4)', d: 'La herramienta gratuita de Google para medir visitas y acciones en tu web. Cuenta eventos: un clic en WhatsApp, un formulario enviado o una compra.', link: { href: `${B}google-analytics-4-negocios-peruanos-que-medir`, label: 'Qué medir en GA4' } },
      { id: 'search-console', t: 'Google Search Console', d: 'La herramienta gratuita de Google que muestra con qué búsquedas apareces, en qué posición y cuántos clics recibes, además de los errores de indexación. Debe estar a nombre del negocio, no de la agencia.' },
      { id: 'utm', t: 'UTM', d: 'Etiquetas que se añaden al final de un enlace (utm_source, utm_medium, utm_campaign) para que GA4 sepa de qué campaña, correo o publicación vino la visita.' },
      { id: 'kpi', t: 'KPI', d: 'Indicador clave de desempeño: el número que define si algo funciona. Para la mayoría de negocios son pocos: leads calificados, ventas, CPA y ROAS.' },
    ],
  },
  {
    h2: 'Marca, contenido y web',
    intro: 'Lo que la gente ve antes de escribirte.',
    terms: [
      { id: 'branding', t: 'Branding', d: 'Construir cómo se ve, cómo habla y qué promete una marca. El logo es una parte; también lo son el nombre, los colores, el tono y la experiencia de compra.', link: { href: `${B}diferencia-logo-identidad-visual-branding`, label: 'Logo, identidad visual y branding' } },
      { id: 'manual-de-marca', t: 'Manual de marca', d: 'Documento con las reglas de uso de la marca: logo, colores, tipografías, tono y ejemplos de lo que sí y lo que no. Evita que cada proveedor la aplique distinto.', link: { href: `${B}manual-marca-estructura-plantilla`, label: 'Estructura y plantilla de manual de marca' } },
      { id: 'landing-page', t: 'Landing page', d: 'Página pensada para una sola acción, normalmente la que recibe el tráfico de un anuncio. Sin menú que distraiga, con la oferta, las pruebas y el botón de contacto a la vista.', link: { href: `${B}landing-page-para-google-ads-que-debe-tener`, label: 'Qué debe tener una landing para Google Ads' } },
      { id: 'ugc', t: 'UGC (contenido generado por usuarios)', d: 'Videos y fotos con estética de cliente real, grabados con el celular, que se usan en anuncios. En Meta y TikTok suelen rendir mejor que una pieza de estudio.', link: { href: `${B}cuanto-cuesta-contenido-ugc-peru-2026`, label: 'Cuánto cuesta el contenido UGC' } },
      { id: 'community-manager', t: 'Community manager', d: 'La persona que publica, responde comentarios y mensajes y cuida la conversación de la marca en redes sociales.', link: { href: `${B}cuanto-cuesta-community-manager-redes-lima-2026`, label: 'Cuánto cuesta un community manager en Lima' } },
      { id: 'email-marketing', t: 'Email marketing', d: 'Correos a personas que aceptaron recibirlos: bienvenida, carrito abandonado, novedades. Es el canal más barato para volver a venderle a quien ya te compró.', link: { href: `${B}email-marketing-negocios-peruanos-2026-guia`, label: 'Guía de email marketing' } },
    ],
  },
]

const ALL_TERMS = GROUPS.flatMap((g) => g.terms)

/** Mismo marcado que numlist (H3 + párrafo) con id en cada término para enlazarlo. */
function terms(list: Term[]) {
  return `<div class="numlist rv">${list
    .map(
      (x) =>
        `<div id="${x.id}"><div><h3>${esc(x.t)}</h3><p>${x.d}${
          x.link ? ` <a href="${x.link.href}">${esc(x.link.label)}</a>.` : ''
        }</p></div></div>`
    )
    .join('')}</div>`
}

const faq: Faq[] = [
  {
    q: '¿Qué diferencia hay entre SEO y SEM?',
    a: 'El SEO trabaja para que tu web salga en los resultados normales de Google sin pagar por clic y tarda entre 3 y 6 meses en dar posiciones estables. El SEM, que en Perú casi siempre significa Google Ads, te pone arriba desde el primer día pero pagas cada clic. Muchos negocios empiezan con Google Ads y suman SEO para bajar el costo por cliente con el tiempo.',
  },
  {
    q: '¿Cuál es un buen ROAS?',
    a: 'Depende de tu margen. El ROAS mínimo para no perder dinero es 1 dividido entre tu margen: con un margen del 50 % necesitas un ROAS de 2, y con uno del 20 % necesitas 5. Por encima de ese punto la campaña gana dinero.',
  },
  {
    q: '¿Qué números debería pedirle a mi agencia cada mes?',
    a: 'Leads o ventas, cuánto costó cada uno (CPA), el ROAS cuando hay ventas en línea, y de dónde vino cada cliente. Las impresiones, los clics y los seguidores ayudan a entender, pero no dicen si el negocio creció.',
  },
  {
    q: '¿El GEO reemplaza al SEO?',
    a: 'No. Las IA como ChatGPT o los resúmenes de Google se apoyan en buena parte en las mismas webs que posicionan bien. El GEO suma respuestas claras, datos verificables y presencia en sitios de terceros encima de un SEO bien hecho.',
  },
]

const html = page(
  hero({
    crumb: 'Glosario de marketing digital',
    h1: 'Glosario de <span class="mg">marketing digital</span>',
    lede: `Los ${ALL_TERMS.length} términos que aparecen en una propuesta, un reporte o una cuenta de anuncios, explicados en dos o tres líneas y con ejemplos en soles. Cada uno enlaza a una guía más larga cuando la tenemos.`,
    waMsg: 'Hola 3R Core, leí el glosario y quiero que revisen mi marketing digital.',
    waLabel: 'Consultar por WhatsApp',
    second: { href: '#metricas-de-negocio', label: 'Empezar por las métricas' },
  }),

  sec({
    h2: 'Índice',
    intro: GROUPS.map((g) => `<a href="#${slug(g.h2)}">${esc(g.h2)}</a>`).join(' · '),
    body: prose([
      ALL_TERMS.map((x) => `<a href="#${x.id}">${esc(x.t.split(' (')[0])}</a>`).join(' · '),
    ]),
    slim: true,
  }),

  ...GROUPS.map((g, i) =>
    sec({ h2: g.h2, intro: g.intro, body: terms(g.terms), alt: i % 2 === 0, id: slug(g.h2) })
  ),

  faqBlock(faq, 'Preguntas frecuentes sobre estos términos'),

  bridges('Sigue por aquí', [
    'Si quieres ver estos números aplicados a precios reales, revisa <a href="/es/precios">nuestros precios publicados</a> y la guía de <a href="/es/blogs/tarifas-publicidad-digital-peru-2026-google-meta-tiktok-linkedin">tarifas de publicidad digital en Perú</a>.',
    'Si buscas una agencia que te reporte CPA y ROAS cada mes, esta es nuestra página de <a href="/es/agencia-marketing-digital-lima">agencia de marketing digital en Lima</a>.',
  ]),

  closing({
    h2: '¿Te explicamos tus números?',
    lede: 'Mándanos tu último reporte o el acceso a tu cuenta de anuncios y te decimos, en lenguaje simple, qué está funcionando y qué no. Respondemos el mismo día hábil.',
    waMsg: 'Hola 3R Core, quiero que revisen los números de mi marketing digital.',
  })
)

function slug(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const PAGE_URL = `${BASE_URL}/es/glosario-marketing-digital`

export const PAGE: LandingPeru = {
  path: '/glosario-marketing-digital',
  title: `Glosario de marketing digital: ${ALL_TERMS.length} términos explicados | 3R Core`,
  description:
    'Qué es ROAS, CAC, CPC, SEO, GEO, Performance Max y más, explicado en dos líneas y con ejemplos en soles. Glosario de 3R Core, agencia en Lima.',
  breadcrumb: 'Glosario de marketing digital',
  faq,
  service: {
    name: 'Marketing digital en Perú',
    description: 'Google Ads, SEO, páginas web y redes sociales con reportes de CPA y ROAS cada mes.',
    serviceType: 'Digital marketing',
    areaServed: [{ type: 'Country', name: 'Peru' }],
  },
  extraJsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': `${PAGE_URL}#glosario`,
      name: 'Glosario de marketing digital de 3R Core',
      inLanguage: 'es-PE',
      url: PAGE_URL,
      publisher: { '@id': `${BASE_URL}/#organization` },
      hasDefinedTerm: ALL_TERMS.map((x) => ({
        '@type': 'DefinedTerm',
        '@id': `${PAGE_URL}#${x.id}`,
        name: x.t,
        description: x.d.replace(/<[^>]+>/g, ''),
        url: `${PAGE_URL}#${x.id}`,
        inDefinedTermSet: { '@id': `${PAGE_URL}#glosario` },
      })),
    },
  ],
  html,
}
