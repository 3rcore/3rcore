/**
 * /en/miami-ecommerce-agency y /us/tiendas-virtuales-miami (11-nov-2026).
 *
 * Piero Roque (3-nov): «3rcore USA – agencia de marketing digital que hace diseño
 * web y tiendas virtuales». (6-nov) «hay que tratar de competir en donde hayan búsquedas».
 *
 * Keywords: Semrush US (6-nov) shopify experts miami 90 (KD 9), shopify developer
 * miami 50 (KD 1), ecommerce website design miami 50, tiendas virtuales miami 20,
 * tienda online miami 20. Autocompletado Google 11-nov: «ecommerce agency miami»,
 * «shopify agency miami», «shopify developer miami», «shopify miami fl»,
 * «tiendas virtuales miami». Bing GetKeyword 11-nov: 0 en todas (sin dato).
 * /en/miami-web-design cubre la web en general; esta página va a fondo en tiendas.
 *
 * Precios = los publicados (tienda desde $1,750, 6 a 10 semanas; SEO $500/mes).
 * Sin dirección de EE. UU. /en sin Perú.
 */
import { cklist, numlist, page, prose, sec, steps, table, wa, type Faq } from '@/lib/landings-peru'
import { ZONES, closing, faqBlock, hero, zones } from '@/lib/landings-miami-blocks'
import type { LandingMiami, MiamiRouteConfig } from '@/lib/landings-miami-route'

export const CONFIG: MiamiRouteConfig = {
  path: '/tiendas-virtuales-miami',
  serviceType: 'Ecommerce development and Shopify store design',
  offers: [
    { name: 'Online store on Shopify or WooCommerce', price: 1750 },
    { name: 'Monthly SEO for online stores', price: 500 },
  ],
  dateModified: '2026-11-11',
}

/* ───────────────────────── /en/miami-ecommerce-agency ───────────────────────── */

const faqEn: Faq[] = [
  {
    q: 'How much does an online store cost in Miami?',
    a: 'With 3R Core, an online store on Shopify or WooCommerce starts at $1,750 and typically takes six to ten weeks. The price moves with catalog size, custom features and integrations such as ERP, inventory or marketplaces. Platform subscriptions, apps and payment fees are paid directly to the provider.',
  },
  {
    q: 'Shopify or WooCommerce: which one should a Miami business choose?',
    a: 'Shopify suits most stores that want low maintenance and fast setup; hosting, security and updates are handled by the platform. WooCommerce makes sense when you already run WordPress, need custom logic or want to avoid a monthly platform fee. We recommend one after looking at your catalog, budget and who will run the store.',
  },
  {
    q: 'Do you handle Florida sales tax and payments?',
    a: 'We configure the payment gateway and the sales tax settings in the platform and test them with real orders before launch. The tax rules themselves (where you have nexus and which rate applies) should be confirmed by your accountant; we set the store up to follow them.',
  },
  {
    q: 'Can you migrate my existing store to Shopify?',
    a: 'Yes. We move products, customers and order history where the platform allows it, and map a 301 redirect for every old URL so you keep the Google traffic you already have.',
  },
  {
    q: 'Do you also bring traffic to the store?',
    a: 'Yes. After launch we can run Google Shopping and Performance Max, Meta catalog ads and ecommerce SEO. SEO starts at $500 per month with no mandatory contract.',
  },
  {
    q: 'Can the store sell in English and Spanish?',
    a: 'Yes. In Miami a bilingual store often converts better. We build the Spanish version with its own URLs and hreflang so Google shows each shopper the right language.',
  },
]

const htmlEn = page(
  hero({
    home: '/en',
    homeLabel: 'Home',
    aria: 'Breadcrumb',
    crumb: 'Ecommerce Agency in Miami',
    h1: 'Ecommerce agency in Miami: <span class="mg">Shopify and WooCommerce stores</span> that sell from day one',
    lede:
      '3R Core designs, builds and markets online stores for Miami and South Florida brands. We set up Shopify or WooCommerce, load the catalog, configure payments, shipping and sales tax, and connect purchase tracking so you know what each channel sells. Online stores from <b>$1,750</b>, launched in six to ten weeks.',
    cta: { href: '/en/quote', label: 'Quote my store' },
    second: { href: '#pricing', label: 'See prices' },
    img: '/proto/img/hero/webCarru2.webp',
    alt: 'Two laptops showing websites and an online catalog designed by 3R Core',
    url: '3rcore.com/en/miami-ecommerce-agency',
  }),

  sec({
    h2: 'What an ecommerce agency does that a template does not',
    intro: 'A template gives you a storefront. A store that sells needs payments, shipping, tax, tracking and traffic working together.',
    body: prose([
      'Most stores we audit in South Florida were built in a weekend and then left alone: products without descriptions Google can read, checkout that breaks on some phones, no purchase events in Analytics and ads optimizing for clicks instead of sales. They look finished and still do not sell.',
      'We build the store around the sale. Product pages are written to rank, checkout is tested on real devices, and GA4 ecommerce events plus ad conversions are live before the first order, so every dollar of ad spend can be traced to revenue.',
    ]),
  }),

  sec({
    alt: true,
    h2: 'Ecommerce services for Miami brands',
    body: numlist([
      { h: 'Shopify store design and development', p: 'Theme setup or custom design, apps chosen for what you actually need, and a store your team can run without a developer.' },
      { h: 'WooCommerce development', p: 'For businesses on WordPress or with custom rules: B2B pricing, bookings, subscriptions or complex shipping.' },
      { h: 'Store migrations', p: 'From Wix, Squarespace, Magento or an old WooCommerce to Shopify, with 301 redirects so your rankings move with you.' },
      { h: 'Ecommerce SEO', p: 'Collections and product pages structured for search, structured data and fast load. See our <a href="/en/seo-agency">SEO agency in Miami</a>.' },
      { h: 'Shopping and catalog ads', p: 'Google Shopping, Performance Max and Meta catalog campaigns that optimize for purchases. More on <a href="/en/services/ecommerce-marketing">ecommerce marketing</a>.' },
    ]),
  }),

  sec({
    h2: 'What every store includes at launch',
    body: cklist([
      { b: 'Payments configured', s: 'Gateway connected and tested with real transactions, including wallets where the platform supports them.' },
      { b: 'Sales tax settings', s: 'Configured in the platform for the states where you collect, following your accountant’s guidance.' },
      { b: 'Shipping and local pickup', s: 'Zones, rates and in-store pickup for Miami-Dade and Broward customers when it applies.' },
      { b: 'Catalog loaded', s: 'Products, variants, photos and collections uploaded, with titles and descriptions written to be found.' },
      { b: 'Purchase tracking', s: 'GA4 ecommerce events and Google and Meta conversions working from the first order.' },
      { b: 'Accounts in your name', s: 'Store, domain, payment and analytics accounts belong to you.' },
    ]),
  }),

  sec({
    alt: true,
    id: 'pricing',
    h2: 'How much does an ecommerce website cost in Miami?',
    intro: 'Reference prices in USD, the same ones on our pricing page. Platform fees, apps and payment processing are paid directly to the provider.',
    body: table(
      ['Project', 'Price', 'Typical timeline'],
      [
        ['Online store on Shopify or WooCommerce', 'From $1,750', '6 to 10 weeks'],
        ['Landing page for a product launch', 'From $850', '2 to 3 weeks'],
        ['Ecommerce SEO after launch', '$500 per month', 'No mandatory contract'],
      ]
    ),
  }),

  sec({
    h2: 'How the store gets built',
    body: steps([
      { h: 'Scope and platform', p: 'Catalog size, shipping, payments and integrations. We recommend Shopify or WooCommerce and send a fixed quote.', t: 'Week 1' },
      { h: 'Design', p: 'Home, collection, product and checkout designs for desktop and mobile, approved before development.', t: 'Weeks 1 to 3' },
      { h: 'Build and catalog', p: 'Development, product upload, payments, tax and shipping settings, tracking and SEO.', t: 'Weeks 3 to 8' },
      { h: 'Test and launch', p: 'Real test orders on several devices, redirects if you are migrating, and handover with training.', t: 'Launch week' },
    ]),
  }),

  faqBlock(faqEn, 'Online stores in Miami: frequently asked questions', 'Short answers with prices and timelines. Prices are reference figures in USD.'),

  zones(
    'Online stores for brands across South Florida',
    'We work with retailers, distributors and direct-to-consumer brands throughout Miami-Dade and Broward, by video call and WhatsApp on Eastern Time.',
    ZONES
  ),

  sec({
    slim: true,
    h2: 'Keep going',
    body: prose([
      'Need a website rather than a store? See <a href="/en/miami-web-design">web design in Miami</a>. Want ads, social media and SEO run by the same team? See our <a href="/en/miami-digital-marketing-agency">digital marketing agency in Miami</a>. The full scope of our builds is on <a href="/en/ecommerce-development">ecommerce development</a>.',
    ]),
  }),

  closing({
    eyebrow: "Let's talk",
    h2: 'Tell us about your store',
    lede: 'Send us your current store or your product list. We reply within one business day with a platform recommendation and a price in USD.',
    cta: { href: '/en/quote', label: 'Quote my store' },
    second: { href: '/en/pricing', label: 'See all prices' },
    waHref: wa('Hi 3R Core, I have a business in Miami and want a quote for an online store.'),
    waLabel: 'Message us on WhatsApp',
  })
)

const en: LandingMiami = {
  title: 'Ecommerce Agency in Miami: Shopify & WooCommerce Stores | 3R Core',
  description:
    'Ecommerce agency in Miami: Shopify and WooCommerce stores with payments, sales tax, shipping and tracking set up. Migrations and Shopping ads. From $1,750.',
  breadcrumbHome: 'Home',
  breadcrumb: 'Ecommerce Agency in Miami',
  inLanguage: 'en-US',
  faq: faqEn,
  serviceName: 'Ecommerce and Shopify Store Development in Miami',
  serviceDescription:
    'Design, development, migration and marketing of Shopify and WooCommerce online stores for brands in Miami and South Florida, with payments, sales tax, shipping and purchase tracking configured at launch.',
  html: htmlEn,
}

/* ───────────────────────── /us/tiendas-virtuales-miami ───────────────────────── */

const faqUs: Faq[] = [
  {
    q: '¿Cuánto cuesta una tienda virtual en Miami?',
    a: 'En 3R Core una tienda online en Shopify o WooCommerce cuesta desde $1,750 y suele estar lista en seis a diez semanas. El precio sube con el tamaño del catálogo, las funciones a medida y las integraciones (inventario, ERP o marketplaces). La suscripción de la plataforma, las apps y las comisiones de pago se pagan directo al proveedor.',
  },
  {
    q: '¿Shopify o WooCommerce para un negocio de Miami?',
    a: 'Shopify conviene a la mayoría de tiendas que quieren poco mantenimiento: la plataforma se encarga del hosting, la seguridad y las actualizaciones. WooCommerce tiene sentido si ya usas WordPress, necesitas reglas a medida o no quieres pagar una mensualidad de plataforma. Te recomendamos una después de ver tu catálogo, tu presupuesto y quién va a manejar la tienda.',
  },
  {
    q: '¿Configuran los pagos y el sales tax de Florida?',
    a: 'Sí. Conectamos la pasarela de pago y dejamos configurado el sales tax en la plataforma, y lo probamos con pedidos reales antes de abrir. Dónde debes cobrar impuesto y con qué tasa lo confirma tu contador; nosotros dejamos la tienda lista para seguir esas reglas.',
  },
  {
    q: '¿Pueden pasar mi tienda de Wix o WooCommerce a Shopify?',
    a: 'Sí. Migramos productos, clientes e historial de pedidos hasta donde la plataforma lo permite, y hacemos una redirección 301 por cada URL vieja para que no pierdas el tráfico que ya tienes en Google.',
  },
  {
    q: '¿También le traen ventas a la tienda?',
    a: 'Sí. Después del lanzamiento podemos llevar Google Shopping, Performance Max, anuncios de catálogo en Meta y SEO para la tienda. El SEO cuesta $500 al mes, sin contrato de permanencia.',
  },
  {
    q: '¿La tienda puede vender en español y en inglés?',
    a: 'Sí, y en Miami suele vender más así. La versión en español tiene sus propias URLs y hreflang, para que Google le muestre a cada comprador su idioma.',
  },
]

const htmlUs = page(
  hero({
    home: '/us',
    homeLabel: 'Inicio',
    aria: 'Ruta de navegación',
    crumb: 'Tiendas virtuales en Miami',
    h1: 'Tiendas virtuales en Miami: <span class="mg">tu tienda online en Shopify o WooCommerce</span>, lista para vender',
    lede:
      'En 3R Core creamos tiendas online para negocios hispanos de Miami y el sur de Florida. Montamos Shopify o WooCommerce, subimos tu catálogo, dejamos listos los pagos, los envíos y el sales tax, y medimos cada venta para que sepas de dónde vino. Tiendas desde <b>$1,750</b>, listas en seis a diez semanas.',
    cta: { href: '/us/cotizar', label: 'Cotizar mi tienda' },
    second: { href: '#pricing', label: 'Ver precios' },
    img: '/proto/img/hero/webCarru2.webp',
    alt: 'Dos laptops con páginas web y un catálogo online hechos por 3R Core',
    url: '3rcore.com/us/tiendas-virtuales-miami',
  }),

  sec({
    h2: '¿Qué necesita una tienda online en Miami para vender?',
    intro: 'Que el cliente encuentre el producto, pague sin trabas y reciba su pedido. Lo demás es decoración.',
    body: prose([
      'Muchos negocios de Miami ya venden por Instagram o WhatsApp y quieren dar el salto a una tienda propia. El error común es armarla en un fin de semana con una plantilla: productos sin descripción, pago que falla en algunos celulares y ninguna forma de saber qué anuncio trajo la venta.',
      'Nosotros la armamos al revés: primero cómo te compra el cliente, en español o en inglés, y después el diseño. Cada página de producto está escrita para salir en Google y cada compra queda medida en Analytics y en los anuncios.',
    ]),
  }),

  sec({
    alt: true,
    h2: 'Qué hacemos en tu tienda virtual',
    body: numlist([
      { h: 'Tiendas en Shopify', p: 'Diseño, configuración, apps justas y una tienda que tu equipo puede manejar sin programador.' },
      { h: 'Tiendas en WooCommerce', p: 'Para negocios en WordPress o con reglas especiales: precios por mayor, reservas, suscripciones o envíos complejos.' },
      { h: 'Migraciones', p: 'De Wix, Squarespace u otra plataforma a Shopify, con redirecciones 301 para no perder posiciones.' },
      { h: 'SEO para la tienda', p: 'Colecciones y fichas de producto pensadas para Google en español e inglés. Ver <a href="/us/posicionamiento-seo">agencia SEO en Miami</a>.' },
      { h: 'Anuncios de Shopping y catálogo', p: 'Google Shopping, Performance Max y catálogo de Meta optimizados por venta. Ver <a href="/us/servicios/marketing-ecommerce">marketing para e-commerce</a>.' },
    ]),
  }),

  sec({
    h2: 'Lo que tu tienda trae el día que abre',
    body: cklist([
      { b: 'Pagos funcionando', s: 'Pasarela conectada y probada con compras reales.' },
      { b: 'Sales tax configurado', s: 'En la plataforma, para los estados donde cobras, según lo que indique tu contador.' },
      { b: 'Envíos y recojo en tienda', s: 'Zonas, tarifas y retiro en local para clientes de Miami-Dade y Broward cuando aplica.' },
      { b: 'Catálogo cargado', s: 'Productos, variantes, fotos y colecciones con títulos y descripciones para Google.' },
      { b: 'Ventas medidas', s: 'Eventos de compra en GA4 y conversiones de Google y Meta desde el primer pedido.' },
      { b: 'Cuentas a tu nombre', s: 'La tienda, el dominio, la pasarela y la analítica son tuyos.' },
    ]),
  }),

  sec({
    alt: true,
    id: 'pricing',
    h2: '¿Cuánto cuesta crear una tienda online en Miami?',
    intro: 'Precios de referencia en dólares, los mismos de nuestra página de precios. La plataforma, las apps y las comisiones de pago se pagan directo al proveedor.',
    body: table(
      ['Proyecto', 'Precio', 'Plazo habitual'],
      [
        ['Tienda online en Shopify o WooCommerce', 'Desde $1,750', '6 a 10 semanas'],
        ['Landing para lanzar un producto', 'Desde $850', '2 a 3 semanas'],
        ['SEO para la tienda', '$500 al mes', 'Sin permanencia'],
      ]
    ),
  }),

  sec({
    h2: 'Cómo armamos tu tienda',
    body: steps([
      { h: 'Alcance y plataforma', p: 'Catálogo, envíos, pagos e integraciones. Te recomendamos Shopify o WooCommerce y te pasamos un precio cerrado.', t: 'Semana 1' },
      { h: 'Diseño', p: 'Inicio, colecciones, producto y checkout en computadora y celular, aprobados antes de programar.', t: 'Semanas 1 a 3' },
      { h: 'Desarrollo y catálogo', p: 'Programación, carga de productos, pagos, impuestos, envíos, medición y SEO.', t: 'Semanas 3 a 8' },
      { h: 'Pruebas y apertura', p: 'Pedidos de prueba en varios equipos, redirecciones si vienes de otra plataforma y capacitación.', t: 'Semana de lanzamiento' },
    ]),
  }),

  faqBlock(faqUs, 'Tiendas virtuales en Miami: preguntas frecuentes', 'Respuestas cortas con precios y plazos. Los montos son referenciales y en dólares.'),

  zones(
    'Tiendas online para negocios del sur de Florida',
    'Trabajamos con comercios, distribuidores y marcas propias de Miami-Dade y Broward, por videollamada y WhatsApp en horario del Este.',
    ZONES
  ),

  sec({
    slim: true,
    h2: 'Para seguir leyendo',
    body: prose([
      'Antes de decidir, lee <a href="/us/blogs/como-crear-una-tienda-online-en-miami">cómo crear una tienda online en Miami paso a paso</a>. Si necesitas una web y no una tienda, mira <a href="/us/diseno-web-miami">diseño web en Miami</a>; si quieres que el mismo equipo te lleve anuncios, redes y SEO, mira nuestra <a href="/us/agencia-marketing-digital-miami">agencia de marketing digital en Miami</a>.',
    ]),
  }),

  closing({
    eyebrow: 'Hablemos',
    h2: 'Cuéntanos qué quieres vender',
    lede: 'Mándanos tu tienda actual o la lista de productos. Te respondemos en un día hábil con la plataforma que te conviene y el precio en dólares.',
    cta: { href: '/us/cotizar', label: 'Cotizar mi tienda' },
    second: { href: '/us/precios', label: 'Ver todos los precios' },
    waHref: wa('Hola 3R Core, tengo un negocio en Miami y quiero cotizar una tienda virtual.'),
    waLabel: 'Escribir por WhatsApp',
  })
)

const us: LandingMiami = {
  title: 'Tiendas Virtuales en Miami: Shopify y WooCommerce | 3R Core',
  description:
    'Creamos tiendas virtuales en Miami en Shopify o WooCommerce, en español e inglés: pagos, envíos, sales tax y medición listos. Migraciones. Desde $1,750.',
  breadcrumbHome: 'Inicio',
  breadcrumb: 'Tiendas virtuales en Miami',
  inLanguage: 'es-US',
  faq: faqUs,
  serviceName: 'Tiendas virtuales en Miami',
  serviceDescription:
    'Diseño, desarrollo, migración y marketing de tiendas online en Shopify y WooCommerce para negocios de Miami y el sur de Florida, con pagos, sales tax, envíos y medición de compras configurados al lanzar.',
  html: htmlUs,
}

export const PAGES = { en, us }
