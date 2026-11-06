/**
 * /en/miami-web-design y /us/diseno-web-miami (6-nov-2026).
 *
 * Keywords (Semrush US, nov-2026):
 *  EN: web design miami 1.300 (KD 42) · website design miami 1.000 (KD 42) ·
 *      web designer miami 590 · miami web design agency 590 (KD 38) ·
 *      web design company miami 260 · website development miami 140 (KD 4) ·
 *      web design miami beach 110 · shopify experts miami 90 (KD 9) ·
 *      ecommerce website design miami 50 · shopify developer miami 50 (KD 1) ·
 *      web design doral 50 (KD 4).
 *  ES: diseño web miami 260 (KD 21) · diseño de paginas web en miami 110 ·
 *      paginas web miami 40 · tiendas virtuales miami 20 · tienda online miami 20.
 *
 * Precios = los ya publicados en el sitio (landing $850, corporativa
 * $1,200–$2,400, tienda desde $1,750). /en no menciona Perú (plan USA del
 * 13-sep). Sin dirección de Miami: no hay oficina confirmada allí.
 */
import { esc, cklist, numlist, page, prose, sec, steps, table, wa, type Faq } from '@/lib/landings-peru'
import type { LandingMiami } from '@/lib/landings-miami-route'

const ARROW =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M12.5 5.5L19 12l-6.5 6.5"/></svg>'

function hero(o: { home: string; homeLabel: string; crumb: string; h1: string; lede: string; cta: { href: string; label: string }; second: { href: string; label: string }; img: string; alt: string; url: string; aria: string }) {
  return `<header class="hero8">
  <div class="hbg" aria-hidden="true"><img src="/proto/img/hero/serviciosbg.webp" alt="" fetchpriority="high" aria-hidden="true" width="1600" height="900"></div>
  <div class="wrap">
    <nav class="crumbs" aria-label="${esc(o.aria)}"><a href="${o.home}">${esc(o.homeLabel)}</a><i>›</i><b>${esc(o.crumb)}</b></nav>
    <div class="grid8">
      <div class="rv in">
        <h1 class=" h1-m">${o.h1}</h1>
        <p class="lede">${o.lede}</p>
        <div class="btns">
          <a class="btn btn-1" href="${o.cta.href}">${esc(o.cta.label)}${ARROW}</a>
          <a class="btn btn-o" href="${o.second.href}">${esc(o.second.label)}${ARROW}</a>
        </div>
      </div>
      <div class="art8 rv rv-d2"><div class="bframe rv"><div class="bar"><i></i><i></i><i></i><span class="url">${esc(o.url)}</span></div><img src="${o.img}" alt="${esc(o.alt)}" width="800" height="500" style="aspect-ratio:16/10;object-fit:cover;width:100%;display:block"></div></div>
    </div>
  </div>
</header>`
}

function faqBlock(items: Faq[], h2: string, intro: string) {
  const det = items
    .map(
      (f, i) => `<details class="rv rv-d${(i % 4) + 1}"${i === 0 ? ' open' : ''}>
    <summary>${esc(f.q)}<span class="pm"></span></summary><div class="a"><p>${esc(f.a)}</p></div>
  </details>`
    )
    .join('')
  return `<section class="slim"><div class="wrap" id="faq">
  <div class="sec-h rv"><h2>${esc(h2)}</h2><p class="intro">${esc(intro)}</p></div>
  <div class="faq" style="margin-top:2.2rem">${det}</div>
</div></section>`
}

function zones(h2: string, p: string, list: string[]) {
  return `<section class="slim"><div class="wrap">
  <div class="localb rv">
    <div><h2>${esc(h2)}</h2><p>${p}</p><div class="zones">${list.map((z, i) => `<span${i < 3 ? ' class="hot"' : ''}>${esc(z)}</span>`).join('')}</div></div>
    <div class="pic"><img src="/proto/img/hero/poster-web.jpg" alt="${esc(h2)}" loading="lazy" width="640" height="480"></div>
  </div>
</div></section>`
}

function closing(o: { eyebrow: string; h2: string; lede: string; cta: { href: string; label: string }; second: { href: string; label: string }; waHref: string; waLabel: string }) {
  return `<section>
  <div class="wrap">
    <div class="closing rv">
      <div>
        <span class="eyebrow">${esc(o.eyebrow)}</span>
        <h2>${esc(o.h2)}</h2>
        <p class="lede">${o.lede}</p>
        <div class="btns">
          <a class="btn btn-1" href="${o.cta.href}">${esc(o.cta.label)}${ARROW}</a>
          <a class="btn btn-wa" href="${o.waHref}" target="_blank" rel="noopener">${esc(o.waLabel)}${ARROW}</a>
          <a class="btn btn-g" href="${o.second.href}">${esc(o.second.label)}${ARROW}</a>
        </div>
      </div>
    </div>
  </div>
</section>`
}

const ZONES = ['Brickell', 'Downtown Miami', 'Doral', 'Coral Gables', 'Wynwood', 'Miami Beach', 'Little Havana', 'Hialeah', 'Kendall', 'Aventura', 'Fort Lauderdale']

/* ───────────────────────────── /en/miami-web-design ───────────────────────────── */

const faqEn: Faq[] = [
  {
    q: 'How much does a website cost in Miami with 3R Core?',
    a: 'A landing page starts at $850, a corporate site with five to eight sections runs $1,200 to $2,400, and an online store on Shopify or WooCommerce starts at $1,750. What moves the price is integrations and catalog size, not the number of pages. Prices are reference figures in USD and depend on the final scope.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'A landing page is usually live in one to two weeks. A corporate site takes three to five weeks and an online store four to eight, depending on how many products have to be loaded and which payment and shipping integrations it needs.',
  },
  {
    q: 'Do you build Shopify stores for Miami businesses?',
    a: 'Yes. We build on Shopify and on WooCommerce and help you pick between them. Shopify is usually the faster option for a store that wants low maintenance; WooCommerce makes sense when you already run WordPress or need custom logic. In both cases we configure the payment gateway, Florida sales tax and purchase tracking before launch.',
  },
  {
    q: 'Can my website be in English and Spanish?',
    a: 'Yes, and in Miami it usually should be. We build the Spanish version as its own set of pages with hreflang declared correctly, so Google shows each visitor the right language. Spanish searches in South Florida tend to have far fewer competitors than the same searches in English.',
  },
  {
    q: 'Will the website be ready for Google?',
    a: 'Every site ships with technical SEO in place: clean structure, fast mobile load, titles and descriptions per page, structured data and Google Search Console connected. If you want to keep growing traffic after launch, our SEO plan starts at $500 per month with no mandatory contract.',
  },
  {
    q: 'Do I own the website and the accounts?',
    a: 'Yes. The domain, hosting, analytics, Search Console and store accounts are created in your name. You keep full access and the code if you ever decide to move on.',
  },
  {
    q: 'How do we work together if you are not down the street?',
    a: 'Over video calls, shared documents and WhatsApp, during Eastern Time business hours. Most Miami companies already work this way with their vendors; it means meetings fit your calendar and you see progress every week instead of at the end.',
  },
]

const htmlEn = page(
  hero({
    home: '/en',
    homeLabel: 'Home',
    aria: 'Breadcrumb',
    crumb: 'Web Design in Miami',
    h1: 'Web design in Miami: <span class="mg">websites and online stores</span> that bring in customers',
    lede:
      '3R Core designs and builds websites, landing pages and Shopify or WooCommerce stores for businesses in Miami and South Florida. Every site launches with SEO and conversion tracking already in place, in English, Spanish or both. Landing pages from <b>$850</b>, corporate sites from <b>$1,200</b> and online stores from <b>$1,750</b>. Prices are reference figures in USD.',
    cta: { href: '/en/quote', label: 'Get a quote' },
    second: { href: '#pricing', label: 'See prices' },
    img: '/proto/img/hero/monitor.webp',
    alt: 'Website designed by 3R Core shown on a desktop monitor',
    url: '3rcore.com/en/miami-web-design',
  }),

  sec({
    h2: 'What a Miami business needs from its website',
    intro: 'Miami buyers search on their phones, in two languages, and compare three or four options before they call. The site has to win that comparison.',
    body: prose([
      'Most of the sites we audit in South Florida look fine and still lose leads: they load slowly on mobile, the Spanish version is a plugin translation Google does not index, and nobody can say which page brought the last customer. We build the other way around. The structure is planned around the searches your clients make, the contact paths are measured from day one, and the Spanish pages are written, not machine-translated.',
      'You get a site you can actually manage: editable content, accounts in your name and a monthly report if you keep working with us on SEO.',
    ]),
  }),

  sec({
    alt: true,
    h2: 'Web design services for Miami companies',
    body: numlist([
      { h: 'Landing pages', p: 'One page, one offer, one action. Built for Google Ads, Meta campaigns or a product launch, with the form and WhatsApp click tracked as conversions.' },
      { h: 'Corporate websites', p: 'Five to eight sections with a page per service, so each one can rank for its own search. Fast on mobile, with structured data and Search Console connected at launch.' },
      { h: 'Bilingual websites', p: 'English and Spanish as two real versions with their own URLs and hreflang. In Miami this is usually the cheapest qualified traffic a business can reach. More detail on <a href="/en/bilingual-website-design">bilingual website design</a>.' },
      { h: 'Website redesigns', p: 'We keep what already ranks. Before changing a URL we map redirects and check Search Console, so a redesign does not wipe out the traffic you already earned.' },
    ]),
  }),

  sec({
    h2: 'Ecommerce website design and Shopify development in Miami',
    intro: 'A store is ready when it can charge, ship and report a sale correctly, not when it looks good.',
    body: cklist([
      { b: 'Shopify or WooCommerce', s: 'We recommend the platform based on your catalog, your budget for apps and who will run the store day to day.' },
      { b: 'Payments and Florida sales tax', s: 'Gateway configured, sales tax set by state and tested with real orders before the store goes public.' },
      { b: 'Catalog loaded', s: 'Products, variants, photos and collections uploaded, with titles and descriptions written to be found on Google.' },
      { b: 'Purchase tracking', s: 'GA4 ecommerce events and ad conversions working from the first order, so you know what each channel sells.' },
      { b: 'Shipping and local pickup', s: 'Shipping zones, rates and in-store pickup for Miami-Dade and Broward customers when it applies.' },
    ]),
  }),

  sec({
    alt: true,
    id: 'pricing',
    h2: 'How much does web design cost in Miami?',
    intro: 'Reference prices in USD, published so you do not have to book a call to get a number. The final figure depends on scope.',
    body: table(
      ['Project', 'Price', 'Typical timeline'],
      [
        ['Landing page', 'From $850', '1 to 2 weeks'],
        ['Corporate website (5–8 sections)', '$1,200 to $2,400', '3 to 5 weeks'],
        ['Online store on Shopify or WooCommerce', 'From $1,750', '4 to 8 weeks'],
        ['Monthly SEO after launch', 'From $500 per month', 'No mandatory contract'],
      ]
    ),
  }),

  sec({
    h2: 'How the project runs',
    body: steps([
      { h: 'Brief and plan', p: 'A video call to understand what you sell, to whom and in which neighborhoods. We send the page map and the quote.', t: 'Week 1' },
      { h: 'Design', p: 'Desktop and mobile designs for the key pages. You review and approve before we write code.', t: 'Weeks 1 to 2' },
      { h: 'Build and content', p: 'Development, copy, Spanish version if needed, structured data and tracking.', t: 'Weeks 2 to 4' },
      { h: 'Launch and handover', p: 'Tests on real devices, Search Console and analytics connected, and access handed over in your name.', t: 'Launch week' },
    ]),
  }),

  faqBlock(faqEn, 'Web design in Miami: frequently asked questions', 'Short answers with timelines and prices. Prices are reference figures in USD.'),

  zones(
    'Websites for businesses across Miami-Dade and Broward',
    'We work with companies all over South Florida, by video call and WhatsApp on Eastern Time. If your clients search by neighborhood, we plan the pages and Google Business Profile around those areas instead of creating empty city pages.',
    ZONES
  ),

  sec({
    slim: true,
    h2: 'Keep going',
    body: prose([
      'The full scope of our builds is on <a href="/en/services/web-development">web development</a> and <a href="/en/ecommerce-development">ecommerce development</a>. To rank once the site is live, see our <a href="/en/seo-agency">SEO agency in Miami</a> plans, or use the <a href="/en/website-cost-calculator">website cost calculator</a> to price your project in two minutes.',
    ]),
  }),

  closing({
    eyebrow: "Let's talk",
    h2: 'Tell us about your website or store',
    lede: 'Send us your current site, or the idea if you are starting from zero. We reply within one business day with a scope and a price in USD.',
    cta: { href: '/en/quote', label: 'Get a quote' },
    second: { href: '/en/pricing', label: 'See all prices' },
    waHref: wa('Hi 3R Core, I have a business in Miami and want a quote for a website.'),
    waLabel: 'Message us on WhatsApp',
  })
)

const en: LandingMiami = {
  title: 'Web Design Miami: Websites & Online Stores | 3R Core',
  description:
    'Web design in Miami: websites, landing pages and Shopify or WooCommerce stores with SEO and tracking built in. Bilingual EN/ES. From $850, stores from $1,750.',
  breadcrumbHome: 'Home',
  breadcrumb: 'Web Design in Miami',
  inLanguage: 'en-US',
  faq: faqEn,
  serviceName: 'Web Design and Ecommerce Development in Miami',
  serviceDescription:
    'Website design, landing pages, bilingual sites and Shopify or WooCommerce online stores for businesses in Miami and South Florida, delivered with technical SEO, structured data and conversion tracking.',
  html: htmlEn,
}

/* ───────────────────────────── /us/diseno-web-miami ───────────────────────────── */

const faqUs: Faq[] = [
  {
    q: '¿Cuánto cuesta una página web en Miami con 3R Core?',
    a: 'Una landing page parte en $850, una web corporativa de cinco a ocho secciones cuesta entre $1,200 y $2,400 y una tienda virtual en Shopify o WooCommerce parte en $1,750. Lo que mueve el precio son las integraciones y el tamaño del catálogo, no la cantidad de páginas. Son montos referenciales en dólares.',
  },
  {
    q: '¿Cuánto tarda en estar lista mi web?',
    a: 'Una landing suele estar publicada en una o dos semanas, una web corporativa en tres a cinco y una tienda virtual en cuatro a ocho, según cuántos productos haya que cargar y qué pasarelas y envíos necesite.',
  },
  {
    q: '¿Hacen tiendas virtuales en Shopify para negocios de Miami?',
    a: 'Sí, en Shopify y en WooCommerce. Te ayudamos a elegir: Shopify suele convenir si quieres poco mantenimiento y WooCommerce si ya tienes WordPress o necesitas algo a medida. En las dos dejamos configurados la pasarela de pago, el impuesto sobre las ventas de Florida y el seguimiento de compras antes de abrir.',
  },
  {
    q: '¿Mi web puede estar en español y en inglés?',
    a: 'Sí, y en Miami casi siempre conviene. Hacemos la versión en español como páginas propias, bien marcadas para Google, para que cada persona vea su idioma. Además, en el sur de Florida las búsquedas en español tienen mucha menos competencia que las mismas en inglés.',
  },
  {
    q: '¿La web sale lista para aparecer en Google?',
    a: 'Sí. Cada web se entrega con el SEO técnico hecho: estructura limpia, carga rápida en celular, títulos y descripciones por página, datos estructurados y Search Console conectado. Si después quieres seguir creciendo, el plan SEO parte en $500 al mes, sin contratos forzosos.',
  },
  {
    q: '¿La web y las cuentas quedan a mi nombre?',
    a: 'Sí. El dominio, el hosting, la analítica, Search Console y la tienda se crean a tu nombre. Tienes acceso total y el código, aunque un día decidas trabajar con otra agencia.',
  },
  {
    q: '¿Cómo trabajamos si no estamos en la misma oficina?',
    a: 'Por videollamada, documentos compartidos y WhatsApp, en horario del Este de Estados Unidos. Así las reuniones se adaptan a tu agenda y ves avances cada semana, no solo al final.',
  },
]

const htmlUs = page(
  hero({
    home: '/us',
    homeLabel: 'Inicio',
    aria: 'Migas de pan',
    crumb: 'Diseño web en Miami',
    h1: 'Diseño web en Miami: <span class="mg">páginas web y tiendas virtuales</span> para vender más',
    lede:
      '3R Core es una agencia de marketing digital que diseña páginas web y tiendas virtuales para negocios de Miami y el sur de Florida, en español, en inglés o en los dos idiomas. Cada web sale con SEO y medición de contactos funcionando. Landing pages desde <b>$850</b>, webs corporativas desde <b>$1,200</b> y tiendas virtuales desde <b>$1,750</b>. Montos referenciales en dólares.',
    cta: { href: '/us/cotizar', label: 'Cotizar mi web' },
    second: { href: '#precios', label: 'Ver precios' },
    img: '/proto/img/hero/monitor.webp',
    alt: 'Página web diseñada por 3R Core en un monitor',
    url: '3rcore.com/us/diseno-web-miami',
  }),

  sec({
    h2: '¿Por qué un negocio hispano de Miami necesita su web en dos idiomas?',
    intro: 'En Miami tu cliente busca en español y en inglés, muchas veces el mismo día. Si tu web solo habla uno, la mitad del mercado te encuentra a medias.',
    body: prose([
      'La mayoría de webs que revisamos en el sur de Florida tienen el español «traducido» con un complemento que Google no indexa, o directamente no lo tienen. El resultado es que el negocio paga anuncios en inglés y pierde las búsquedas en español, que son las más baratas de ganar porque casi nadie compite por ellas.',
      'Nosotros escribimos la versión en español para tu comunidad, no con un español neutro que no le suena natural a nadie, y la marcamos bien para que Google muestre a cada persona la versión que le corresponde.',
    ]),
  }),

  sec({
    alt: true,
    h2: 'Diseño de páginas web en Miami',
    body: numlist([
      { h: 'Landing pages', p: 'Una página, una oferta y una acción. Para campañas de Google o Meta, o para lanzar un producto, con el formulario y el clic de WhatsApp medidos como conversión.' },
      { h: 'Webs corporativas', p: 'De cinco a ocho secciones, con una página por servicio para que cada una pueda posicionar en su búsqueda. Rápidas en el celular y con Search Console conectado desde el primer día.' },
      { h: 'Webs bilingües', p: 'Español e inglés como dos versiones reales, cada una con sus direcciones. Más detalle en <a href="/us/servicios/desarrollo-web">desarrollo web</a>.' },
      { h: 'Rediseño sin perder posiciones', p: 'Antes de cambiar una dirección revisamos qué páginas ya traen visitas y preparamos las redirecciones, para que el rediseño no borre lo que ya ganaste en Google.' },
    ]),
  }),

  sec({
    h2: 'Tiendas virtuales en Miami: Shopify y WooCommerce',
    intro: 'Una tienda está lista cuando cobra, envía y registra la venta bien, no cuando se ve bonita.',
    body: cklist([
      { b: 'Pasarela de pago', s: 'Stripe, PayPal o Shopify Payments configurados y probados con pedidos reales antes de abrir.' },
      { b: 'Impuesto sobre las ventas', s: 'El sales tax de Florida y de los estados donde vendas, configurado desde el inicio, que es la parte que más suele quedar mal.' },
      { b: 'Catálogo cargado', s: 'Productos, variantes y fotos subidos, con títulos y descripciones escritos para que Google los encuentre.' },
      { b: 'Envíos y recojo en tienda', s: 'Zonas y tarifas de envío, y recojo en local para clientes de Miami-Dade y Broward cuando aplica.' },
      { b: 'Medición de ventas', s: 'Eventos de compra en GA4 y conversiones de anuncios funcionando desde el primer pedido.' },
    ]),
  }),

  sec({
    alt: true,
    id: 'precios',
    h2: '¿Cuánto cuesta una página web en Miami?',
    intro: 'Precios referenciales en dólares, publicados para que no tengas que agendar una llamada para saber un número. El monto final depende del alcance.',
    body: table(
      ['Proyecto', 'Precio', 'Plazo habitual'],
      [
        ['Landing page', 'Desde $850', '1 a 2 semanas'],
        ['Web corporativa (5 a 8 secciones)', '$1,200 a $2,400', '3 a 5 semanas'],
        ['Tienda virtual en Shopify o WooCommerce', 'Desde $1,750', '4 a 8 semanas'],
        ['SEO mensual después de publicar', 'Desde $500 al mes', 'Sin contratos forzosos'],
      ]
    ),
  }),

  sec({
    h2: 'Cómo es el proyecto, paso a paso',
    body: steps([
      { h: 'Reunión y plan', p: 'Una videollamada para entender qué vendes, a quién y en qué zonas de Miami. Te enviamos el mapa de páginas y la cotización.', t: 'Semana 1' },
      { h: 'Diseño', p: 'Diseños para computadora y celular de las páginas clave. Los apruebas antes de programar.', t: 'Semanas 1 y 2' },
      { h: 'Desarrollo y textos', p: 'Programación, textos en español e inglés, datos estructurados y medición.', t: 'Semanas 2 a 4' },
      { h: 'Publicación y entrega', p: 'Pruebas en celulares reales, Search Console y analítica conectados, y accesos entregados a tu nombre.', t: 'Semana de lanzamiento' },
    ]),
  }),

  faqBlock(faqUs, 'Preguntas frecuentes sobre diseño web en Miami', 'Respuestas cortas, con plazos y montos. Los montos son referenciales y en dólares.'),

  zones(
    'Páginas web para negocios de todo Miami-Dade y Broward',
    'Trabajamos con negocios de todo el sur de Florida por videollamada y WhatsApp, en horario del Este. Si tus clientes buscan por barrio, planificamos las páginas y tu ficha de Google para esas zonas, sin crear páginas vacías por ciudad.',
    ZONES
  ),

  sec({
    slim: true,
    h2: 'Sigue por aquí',
    body: prose([
      'El detalle de cada servicio está en <a href="/us/servicios/desarrollo-web">desarrollo web</a> y <a href="/us/tiendas-online">tiendas online</a>. Para aparecer en Google cuando la web ya esté publicada, mira nuestra <a href="/us/posicionamiento-seo">agencia SEO en Miami</a>, y si tu negocio le vende a la comunidad hispana, <a href="/us/marketing-para-negocios-hispanos">marketing para negocios hispanos</a>.',
    ]),
  }),

  closing({
    eyebrow: 'Hablemos',
    h2: 'Cuéntanos qué web o tienda necesitas',
    lede: 'Mándanos tu web actual, o la idea si empiezas de cero. Te respondemos en un día hábil con el alcance y el precio en dólares.',
    cta: { href: '/us/cotizar', label: 'Cotizar mi web' },
    second: { href: '/us/precios', label: 'Ver todos los precios' },
    waHref: wa('Hola 3R Core, tengo un negocio en Miami y quiero cotizar una página web.'),
    waLabel: 'Escribir por WhatsApp',
  })
)

const us: LandingMiami = {
  title: 'Diseño Web en Miami: Páginas y Tiendas Virtuales | 3R Core',
  description:
    'Diseño de páginas web en Miami en español e inglés: webs corporativas, landing pages y tiendas virtuales Shopify o WooCommerce con SEO. Desde $850 (referencial).',
  breadcrumbHome: 'Inicio',
  breadcrumb: 'Diseño web en Miami',
  inLanguage: 'es-US',
  faq: faqUs,
  serviceName: 'Diseño web y tiendas virtuales en Miami',
  serviceDescription:
    'Diseño de páginas web, landing pages, webs bilingües y tiendas virtuales en Shopify o WooCommerce para negocios de Miami y el sur de Florida, con SEO técnico, datos estructurados y medición de conversiones.',
  html: htmlUs,
}

export const PAGES = { en, us }
