import { Link } from "@/i18n/routing"
import type { AppPathname } from "@/i18n/routing"
import PillarWaCapture from "@/components/ui/PillarWaCapture"
import ProtoPage from "@/components/proto/ProtoPage"
import { setRequestLocale } from "next-intl/server"

interface Props { params: Promise<{ locale: string }> }

// Money page del pilar Tiendas Virtuales. Todo el contenido de precios,
// plazos y plataformas reusa EXACTAMENTE lo ya publicado en /precios y en el
// FAQPage schema de esta misma página (layout.tsx) — nada inventado.
const COPY: Record<string, any> = {
  es: {
    eyebrow: '3R Core · Tiendas Virtuales · Lima · Perú',
    h1: 'Agencia de diseño de tiendas virtuales en Lima, Perú',
    heroH2: 'Tu tienda online en Shopify, WooCommerce o Tiendanube, lista para vender',
    sub: 'Creamos tu tienda online en Shopify, WooCommerce o Tiendanube: pagos locales (Culqi, Niubiz, Izipay, Yape), catálogo cargado, SEO técnico y lista para vender. Desde S/1,500 de implementación, sin plantillas genéricas.',
    cta: 'Cotiza tu tienda online',
    why: 'Tienda + SEO + Google Ads bajo un mismo techo',
    whyDesc: 'A diferencia de quienes solo entregan una plantilla vacía, en 3R Core montamos tu e-commerce completo y lo conectamos con posicionamiento SEO y campañas de Google Ads y Google Shopping, para que tu tienda no solo exista: reciba tráfico que compra y venda desde el día uno. Una tienda sin tráfico es un local abierto en una calle vacía; por eso el mismo equipo que la construye es el que después la posiciona en Google y le trae compradores con publicidad medible.',
    pillars: 'Todo lo que dejamos listo en tu tienda',
    pillarsList: [
      { title: 'Plataforma a tu medida', desc: 'Elegimos entre Shopify (velocidad), WooCommerce (control total) o Tiendanube (pagos locales, accesible) según tu catálogo, integraciones y presupuesto — sin sesgo.' },
      { title: 'Pagos peruanos integrados', desc: 'Culqi, Niubiz, Izipay, Yape, PagoEfectivo y Mercado Pago configurados y probados para que cobres sin fricción en Perú.' },
      { title: 'SEO técnico de base', desc: 'URLs limpias, schema de producto, velocidad (Core Web Vitals), sitemap y metadatos para que Google entienda y muestre tu tienda.' },
      { title: 'Catálogo, envíos y medición', desc: 'Carga de productos con variantes y categorías, zonas y tarifas de envío, correos automáticos de pedido y Google Analytics 4 + píxeles listos.' },
    ],
    platforms: '¿Shopify, WooCommerce o Tiendanube? Te lo decimos sin sesgo',
    platformsIntro: 'No trabajamos casados con una sola plataforma: la elegimos según tu catálogo, tus integraciones y tu presupuesto. Esto es lo que pesa en la decisión:',
    platformsList: [
      { title: 'Shopify', desc: 'La más rápida y estable para empezar a vender ya. Hosting incluido, checkout probado y cientos de apps. Ideal si quieres velocidad de lanzamiento y un catálogo que crece. La mensualidad de la plataforma parte desde USD 39/mes.' },
      { title: 'WooCommerce', desc: 'Control total sobre WordPress: integraciones a medida, sin mensualidad de plataforma (pagas tu hosting) y libertad completa de diseño y funcionalidades. Ideal para catálogos con lógica propia o integraciones con tu sistema.' },
      { title: 'Tiendanube', desc: 'Fuerte en pagos locales y planes accesibles (desde ~S/89/mes). Pensada para Latinoamérica: métodos de pago y envíos locales resueltos. Ideal para emprendimientos que quieren empezar simple sin sacrificar cobros peruanos.' },
    ],
    platformsMore: 'Comparamos las tres a fondo en nuestra guía',
    platformsMoreLink: '/blogs/shopify-vs-woocommerce-peru-2026',
    platformsMoreAnchor: 'Shopify vs WooCommerce Perú 2026',
    pricing: '¿Cuánto cuesta crear una tienda virtual?',
    pricingIntro: 'Precios netos de implementación en soles peruanos (la factura electrónica suma 18% de IGV). Aparte va la mensualidad de la plataforma y las comisiones de la pasarela de pago.',
    pricingTiers: [
      { name: 'Tienda básica', price: 'desde S/1,500', platform: 'Shopify o Tiendanube', desc: 'Diseño sobre la plataforma, carga inicial de catálogo, pagos locales configurados y capacitación para administrarla.' },
      { name: 'Tienda profesional', price: 'desde S/2,500', platform: 'WooCommerce', desc: 'Control total sobre WordPress: diseño alineado a tu marca, catálogo con variantes, pagos y envíos configurados.' },
      { name: 'Tienda avanzada', price: 'desde S/6,500', platform: 'Shopify / WooCommerce', desc: 'Catálogos grandes, integraciones (facturación, inventario), automatizaciones y optimización de conversión.' },
      { name: 'E-commerce a medida', price: 'desde S/12,000', platform: 'A medida', desc: 'Desarrollo a medida con lógica propia: B2B, suscripciones, multialmacén o integraciones con tu ERP.' },
    ],
    pricingNote: 'Una tienda estándar con Shopify o Tiendanube suele estar lista en 2 a 4 semanas; una WooCommerce a medida o con muchas integraciones, de 5 a 8 semanas según el tamaño del catálogo y la entrega de contenido.',
    pricingLinks: 'Detalle completo en',
    methodology: 'Cómo trabajamos contigo',
    methodologyList: [
      { step: 'Paso 1', title: 'Diagnóstico y plataforma', desc: 'Entendemos tu negocio, catálogo y objetivos, y recomendamos la plataforma correcta (Shopify, WooCommerce o Tiendanube).' },
      { step: 'Paso 2', title: 'Diseño mobile-first', desc: 'Diseñamos una tienda clara, rápida y pensada para el celular (donde compra la mayoría en Perú) y alineada a tu marca.' },
      { step: 'Paso 3', title: 'Desarrollo e integraciones', desc: 'Montamos la tienda, cargamos el catálogo e integramos pagos locales, envíos, WhatsApp y medición.' },
      { step: 'Paso 4', title: 'Pruebas y lanzamiento', desc: 'Probamos cada flujo de compra en móvil y escritorio, verificamos pagos reales y publicamos tu tienda.' },
      { step: 'Paso 5', title: 'Capacitación y crecimiento', desc: 'Te capacitamos para administrarla y, si quieres, sumamos SEO y Google Ads para escalar las ventas con tráfico que compra.' },
    ],
    growth: 'Y cuando tu tienda está lista: tráfico que compra',
    growthDesc: 'Construir la tienda es la mitad del trabajo. La otra mitad es que aparezca cuando tus clientes buscan lo que vendes. Por eso los tres pilares de 3R Core trabajan juntos:',
    growthList: [
      { title: 'Posicionamiento SEO', desc: 'Optimizamos categorías, fichas de producto y contenido para que tu tienda aparezca en Google cuando buscan lo que vendes — tráfico orgánico que no depende de pauta.', path: '/posicionamiento-seo', anchor: 'Ver servicio de SEO' },
      { title: 'Google Ads y Google Shopping', desc: 'Campañas de búsqueda y Shopping con tus productos, presupuesto optimizado y conversiones medidas de punta a punta.', path: '/servicios/google-ads', anchor: 'Ver servicio de Google Ads' },
    ],
    coverage: 'Plataformas y pasarelas de pago que integramos',
    coverageList: ['Shopify', 'WooCommerce', 'Tiendanube', 'Culqi', 'Niubiz', 'Izipay', 'Yape', 'PagoEfectivo', 'Mercado Pago', 'Google Analytics 4'],
    faq: 'Preguntas frecuentes sobre tiendas virtuales',
    faqList: [
      { q: '¿Cuánto cuesta crear una tienda virtual en Perú?', a: 'La implementación profesional arranca desde S/1,500 e incluye diseño, carga de catálogo, pagos y configuración sobre Shopify o Tiendanube. Un e-commerce completo en Shopify o WooCommerce (catálogo amplio, pasarela de pago, inventario y panel de administración) arranca desde S/6,500, y con más integraciones o desarrollo a medida el rango llega hasta S/25,000. Aparte está la mensualidad de la plataforma (Shopify desde USD 39/mes, Tiendanube desde S/89/mes) o el hosting si es WooCommerce. El detalle completo está publicado en nuestra página de precios.' },
      { q: '¿Shopify, WooCommerce o Tiendanube: cuál me conviene?', a: 'Como agencia Shopify, WooCommerce y Tiendanube en Perú no trabajamos casados con una sola plataforma: depende de tu caso. Shopify es la más rápida y estable para vender ya. WooCommerce da control total e integraciones a medida. Tiendanube es fuerte en pagos locales y planes accesibles. En el diagnóstico te recomendamos la correcta, sin sesgo.' },
      { q: '¿Integran pagos peruanos como Yape, Culqi o Niubiz?', a: 'Sí. Configuramos y probamos Culqi, Niubiz, Izipay, Yape, PagoEfectivo y Mercado Pago según tu plataforma, para que tus clientes paguen como están acostumbrados en Perú.' },
      { q: '¿En cuánto tiempo tengo mi tienda lista?', a: 'Una tienda estándar con Shopify o Tiendanube suele estar lista en 2 a 4 semanas. Una tienda WooCommerce a medida o con muchas integraciones puede tomar de 5 a 8 semanas, según la cantidad de productos y la entrega de contenido.' },
      { q: '¿La tienda va a aparecer en Google?', a: 'La construimos con SEO técnico de base (URLs, schema de producto, velocidad, sitemap). Para posicionar de verdad y competir por búsquedas de compra recomendamos sumar nuestro servicio de posicionamiento SEO y/o campañas de Google Ads y Google Shopping.' },
      { q: '¿Trabajan con negocios fuera de Lima?', a: 'Sí, trabajamos con empresas de todo el Perú de forma remota. Todo el proceso (diseño, revisiones, capacitación) se hace por videollamada y accesos compartidos.' },
    ],
    guides: 'Guías para decidir con datos',
    guidesList: [
      { title: '¿Cuánto cuesta una tienda virtual en Perú? Precios 2026', path: '/blogs/cuanto-cuesta-tienda-virtual-peru-2026' },
      { title: 'Pasarelas de pago para tu tienda online en Perú', path: '/blogs/pasarelas-pago-tienda-online-peru' },
      { title: 'Shopify vs WooCommerce vs Tiendanube: cuál elegir', path: '/blogs/shopify-woocommerce-tiendanube-peru-cual-elegir' },
      { title: 'Errores al crear una tienda virtual en Perú', path: '/blogs/errores-crear-tienda-virtual-peru' },
      { title: '¿Cuánto cuesta mantener una tienda virtual?', path: '/blogs/cuanto-cuesta-mantener-tienda-virtual-peru-2026' },
      { title: '¿Tienda virtual propia o vender en marketplace?', path: '/blogs/tienda-virtual-o-vender-en-marketplace-peru' },
    ],
    contact: 'Cotización gratuita para tu tienda',
    contactCta: 'Cuéntanos qué vendes y a quién. Te recomendamos la plataforma correcta, te damos un presupuesto claro y, si quieres, un plan para traer tráfico que compra con SEO y Google Ads.',
    service: 'una tienda virtual',
  },
  // es-US: mismo texto en español, mercado y moneda de EE.UU.
  us: {
    eyebrow: '3R Core · Tiendas Online · Estados Unidos',
    h1: 'Creamos tu tienda online en Estados Unidos',
    heroH2: 'Shopify o WooCommerce, en español e inglés, lista para cobrar',
    sub: 'Montamos tu tienda con pasarela de pago, catálogo cargado, impuestos por estado configurados y las dos versiones de idioma bien marcadas. Desde $1,750, sin plantillas rellenadas.',
    cta: 'Cotiza tu tienda',
    why: 'Una tienda que vende a tus dos públicos',
    whyDesc: 'La mayoría de tiendas que atienden al cliente hispano en Estados Unidos están solo en inglés, o tienen un botón que traduce el texto sin cambiar la dirección. Google indexa una sola versión, así que la búsqueda en español —que casi nadie está trabajando— se la lleva otro. Construimos las dos versiones como tiendas propias, cada una con sus direcciones, sus fichas de producto y sus correos automáticos, para que el comprador complete todo el recorrido en el idioma en que empezó.',
    pillars: 'Lo que dejamos funcionando',
    pillarsList: [
      { title: 'Cobros que funcionan en EE.UU.', desc: 'Stripe, PayPal, Apple Pay y Google Pay configurados y probados, con la comisión que te corresponde y sin recargos escondidos de la plataforma.' },
      { title: 'Impuestos por estado', desc: 'Cálculo de sales tax configurado según dónde tengas nexo, que es la parte que suele quedar mal cuando la tienda la montó alguien de fuera del país.' },
      { title: 'Tienda bilingüe de verdad', desc: 'Español e inglés con direcciones propias y marcado correcto, fichas de producto traducidas de verdad y correos de pedido en el idioma del comprador.' },
      { title: 'Catálogo, envíos y medición', desc: 'Productos con variantes, zonas y tarifas de envío, correos automáticos y Google Analytics con seguimiento de compra listo desde el primer pedido.' },
    ],
    platforms: '¿Shopify o WooCommerce? Te lo decimos sin sesgo',
    platformsIntro: 'No trabajamos casados con una plataforma. La elegimos según tu catálogo, tus integraciones y tu volumen. Esto es lo que pesa de verdad:',
    platformsList: [
      { title: 'Shopify', desc: 'Lo más rápido para empezar a vender: alojamiento, seguridad y checkout resueltos, y cálculo de impuestos incluido. Ojo con un detalle que casi nadie menciona: si usas una pasarela distinta a la suya, cobran un recargo por transacción sobre lo que ya te cobra tu procesador. Desde $39/mes.' },
      { title: 'WooCommerce', desc: 'Control total sobre WordPress, sin recargo por transacción de la plataforma y con libertad para integrar lo que necesites. A cambio, el mantenimiento es tuyo: actualizaciones, seguridad y conflictos entre extensiones. Conviene cuando tu producto no encaja en un catálogo estándar.' },
      { title: '¿Cuál te conviene?', desc: 'Con menos de $100,000 al mes de facturación, el recargo de Shopify rara vez justifica cargar con el mantenimiento. Por encima, vale la pena hacer el cálculo con tus cifras reales. Y si nadie va a mantener el sitio dentro de un año, la respuesta es Shopify.' },
    ],
    platformsMore: 'Te decimos cuál te conviene en la primera reunión.',
    platformsMoreLink: '/precios',
    platformsMoreAnchor: 'Ver precios y qué incluye cada plan',
    pricing: '¿Cuánto cuesta montar la tienda?',
    pricingIntro: 'Precios netos de implementación en dólares. Aparte va la mensualidad de la plataforma y las comisiones de la pasarela, que se pagan directamente a cada proveedor.',
    pricingTiers: [
      { name: 'Tienda inicial', price: 'desde $1,750', platform: 'Shopify', desc: 'Diseño sobre la plataforma, carga inicial de catálogo, pagos e impuestos configurados y capacitación para que la administres tú.' },
      { name: 'Tienda bilingüe', price: 'desde $2,900', platform: 'Shopify o WooCommerce', desc: 'Todo lo anterior más la versión en español como tienda propia: fichas traducidas, marcado correcto y correos automáticos en ambos idiomas.' },
      { name: 'Tienda a medida', price: 'desde $7,000', platform: 'A medida', desc: 'Catálogos grandes, precios por cliente, suscripciones o integración con tu sistema de inventario o facturación.' },
    ],
    pricingNote: 'El precio lo mueven las integraciones, no la cantidad de productos. Cargar 500 artículos con una estructura clara cuesta menos que 40 con precios que dependen del cliente.',
    pricingLinks: 'Más detalle en',
    methodology: 'Cómo lo hacemos',
    methodologyList: [
      { title: 'Reunión inicial', desc: 'Qué vendes, a quién, en qué idiomas y qué sistemas ya usas. De ahí sale la recomendación de plataforma, no al revés.' },
      { title: 'Estructura y diseño', desc: 'Categorías, fichas y proceso de compra pensados para que el comprador llegue al pago sin fricción.' },
      { title: 'Carga y configuración', desc: 'Catálogo, pagos, impuestos por estado, envíos y correos automáticos, todo probado con pedidos de prueba reales.' },
      { title: 'Medición antes de abrir', desc: 'Analytics y seguimiento de compra funcionando antes del primer pedido, para que desde el día uno sepas qué producto se vende y desde dónde.' },
      { title: 'Capacitación y entrega', desc: 'Sesión grabada para que administres la tienda sin depender de nosotros. Todo queda a tu nombre.' },
    ],
    growth: 'Después de abrir: que llegue quien compra',
    growthDesc: 'Una tienda sin visitas es un local abierto en una calle vacía. El mismo equipo que la construye trabaja después el posicionamiento en Google, en español e inglés, para que reciba compradores y no solo visitas.',
    growthList: [
      { title: 'Posicionamiento de fichas', desc: 'Cada producto y cada categoría escritos para lo que la gente busca de verdad, en los dos idiomas.', path: '/posicionamiento-seo', anchor: 'Ver servicio de SEO' },
      { title: 'Búsquedas en español', desc: 'La versión en español compite con mucho menos contenido que la inglesa: es la vía más rápida a las primeras visitas orgánicas.', path: '/posicionamiento-seo', anchor: 'Ver posicionamiento' },
      { title: 'El sitio que sostiene la tienda', desc: 'Páginas de servicio y contenido que traen a quien todavía está decidiendo, meses antes de que compre.', path: '/servicios/web-development', anchor: 'Ver desarrollo web' },
    ],
    coverage: 'A quién atendemos',
    coverageList: ['Negocios en cualquier estado de EE.UU.', 'Tiendas que venden en español e inglés', 'Marcas que venden desde Latinoamérica hacia EE.UU.', 'Atención en horario compatible con tu zona'],
    faq: 'Preguntas frecuentes',
    faqList: [
      { q: '¿Cuánto demora tener la tienda funcionando?', a: 'Entre cinco y ocho semanas según el catálogo y las integraciones. Lo que más alarga el plazo no es el desarrollo sino la espera de fotos, descripciones y accesos a las cuentas de pago, así que al arrancar te decimos exactamente qué necesitamos y cuándo.' },
      { q: '¿Puedo administrar la tienda yo mismo?', a: 'Sí, y es la idea. Entregamos con una sesión de capacitación grabada para que cargues productos, cambies precios y gestiones pedidos sin depender de nadie. El mantenimiento es un servicio aparte y opcional, no una condición para que la tienda siga funcionando.' },
      { q: '¿Se encargan de los impuestos?', a: 'Configuramos el cálculo de sales tax según los estados donde tengas nexo, que es la parte técnica. La declaración y el pago siguen siendo responsabilidad tuya o de tu contador: lo que garantizamos es que el cobro salga correcto desde el primer pedido, que es donde suele fallar.' },
      { q: '¿Qué pasa si ya tengo una tienda?', a: 'La revisamos antes de proponer nada. Muchas veces no hace falta migrar: se corrige la velocidad, se arregla la estructura y se añade la versión en español, que cuesta mucho menos y conserva el historial que la tienda ya tiene. Migrar es un proyecto de semanas y solo se justifica cuando hay una razón concreta.' },
      { q: '¿Incluye las fotos de los productos?', a: 'No, la fotografía va aparte porque depende mucho de tu catálogo. Sí te decimos qué formato, tamaño y encuadre necesitas para que la tienda cargue rápido, y optimizamos las imágenes que nos entregues. Si necesitas producción, podemos cotizarla por separado.' },
      { q: '¿Puedo vender en los dos idiomas desde el inicio?', a: 'Sí, y sale más barato hacerlo desde el principio que añadirlo después. La versión en español necesita sus propias direcciones y su marcado, y montarlo sobre una tienda ya construida obliga a rehacer parte de la estructura.' },
    ],
    guides: 'Guías para decidir con datos',
    guidesList: [
      { title: 'Cuánto cuesta el contenido UGC', path: '/blogs/cuanto-cuesta-contenido-ugc-peru-2026' },
    ],
    contact: 'Cotización sin compromiso',
    contactCta: 'Cuéntanos qué vendes y a quién. Te recomendamos la plataforma que te conviene, te damos un precio en dólares por escrito y, si quieres, el plan para traerle compradores.',
    service: 'Creación de tiendas online para negocios en Estados Unidos',
  },
  en: {
    eyebrow: '3R Core · E-commerce Development · U.S.',
    h1: 'E-commerce development for U.S. brands',
    heroH2: 'Shopify or WooCommerce, built to sell rather than just to launch',
    sub: 'Storefronts with payment gateway, loaded catalog, state-level tax setup and purchase tracking configured before the first order. From $1,750, built by our team in Lima.',
    cta: 'Get a scoped quote',
    why: 'Most stores launch untracked, and never recover that month',
    whyDesc: 'A store handed over without analytics and purchase tracking wastes its most informative period: the first weeks of real traffic, when you learn which products sell, from which source and where the checkout leaks. That window does not come back. We configure measurement before launch, in your own accounts, so the first month already tells you something — and we build on the platform your catalog actually calls for rather than the one we prefer to work in.',
    pillars: 'What ships with every build',
    pillarsList: [
      { title: 'Payments that clear', desc: 'Stripe, PayPal, Apple Pay and Google Pay configured and tested, with the processing rate you negotiated and no platform surcharge you did not expect.' },
      { title: 'State-level sales tax', desc: 'Tax calculation configured against where you have economic nexus — the piece most commonly left broken, and the one that surfaces at the worst time.' },
      { title: 'Purchase tracking before launch', desc: 'Analytics, tag management and e-commerce events live before the first order, in your accounts, so month one is data and not a blank.' },
      { title: 'Catalog, shipping and automation', desc: 'Products with variants and collections, shipping zones and rates, abandoned-cart and order emails, all tested with real test orders.' },
    ],
    platforms: 'Shopify or WooCommerce, decided on your numbers',
    platformsIntro: 'We build on both and have no stake in which you pick. These are the factors that actually decide it:',
    platformsList: [
      { title: 'Shopify', desc: 'Fastest route to selling: hosting, security, PCI compliance and checkout handled, tax calculation included. The detail most comparisons omit is the transaction surcharge of 0.5–2% if you use a gateway other than theirs, on top of what your processor charges. From $39/month.' },
      { title: 'WooCommerce', desc: 'Full control on WordPress, no platform transaction fee, and freedom to integrate anything. In exchange, maintenance is yours: updates, security and extension conflicts. It is the right answer when your product model does not fit a standard catalog.' },
      { title: 'How to choose', desc: 'Below roughly $100k/month in revenue, the fee difference rarely justifies the maintenance burden. Above it, run the numbers with your negotiated rate. And if nobody will own maintenance in eighteen months, choose Shopify — an unmaintained WooCommerce install becomes a security problem.' },
    ],
    platformsMore: 'We compare both in depth in our guide',
    platformsMoreLink: '/blogs/shopify-vs-woocommerce-for-us-brands',
    platformsMoreAnchor: 'Shopify vs WooCommerce for U.S. brands',
    pricing: 'What an online store costs',
    pricingIntro: 'Net implementation prices in U.S. dollars. Platform subscription and payment processing fees are separate and paid directly to each provider.',
    pricingTiers: [
      { name: 'Starter store', price: 'from $1,750', platform: 'Shopify', desc: 'Platform build, initial catalog load, payments and tax configured, tracking live and a recorded handover session.' },
      { name: 'Bilingual store', price: 'from $2,900', platform: 'Shopify or WooCommerce', desc: 'Everything above plus a genuine Spanish storefront: own URLs, translated product pages, correct hreflang and order emails in both languages.' },
      { name: 'Custom build', price: 'from $7,000', platform: 'Custom', desc: 'Large catalogs, per-customer pricing, subscriptions, or integration with your ERP, inventory or invoicing system.' },
    ],
    pricingNote: 'Price is driven by integrations, not product count. Loading 500 SKUs with a clean structure costs less than 40 with pricing that depends on who is logged in.',
    pricingLinks: 'More detail in',
    methodology: 'How we work',
    methodologyList: [
      { title: 'Scoping call', desc: 'What you sell, to whom, in which languages and what systems you already run. The platform recommendation comes out of that, not the other way round.' },
      { title: 'Structure and design', desc: 'Collections, product pages and checkout flow designed so the buyer reaches payment without friction.' },
      { title: 'Build and configuration', desc: 'Catalog, payments, state tax, shipping and automated emails, all verified with real test orders before anything goes live.' },
      { title: 'Measurement before launch', desc: 'Analytics and e-commerce tracking working before the first order, so you know from day one which product sells and where the traffic came from.' },
      { title: 'Handover', desc: 'Recorded training so your team runs the store without us. Everything stays in your accounts and your name.' },
    ],
    growth: 'After launch: bringing buyers in',
    growthDesc: 'A store with no traffic is a shop on an empty street. The same team that builds it works the organic side afterwards, in English and Spanish, so it receives buyers rather than visits.',
    growthList: [
      { title: 'Product and collection SEO', desc: 'Every product and collection page written for the queries people actually type, in both languages where it applies.', path: '/posicionamiento-seo', anchor: 'See SEO service' },
      { title: 'Spanish-language demand', desc: 'The Spanish version of a commercial query typically faces a fraction of the competing content — often the fastest organic wins available to a U.S. store.', path: '/posicionamiento-seo', anchor: 'See SEO service' },
      { title: 'The site behind the store', desc: 'Service pages and content that reach buyers while they are still deciding, months before they convert.', path: '/servicios/web-development', anchor: 'See web development' },
    ],
    coverage: 'Who we work with',
    coverageList: ['Brands selling anywhere in the United States', 'Stores serving both English and Spanish-speaking buyers', 'Latin American brands selling into the U.S.', 'Support on overlapping U.S. business hours'],
    faq: 'Frequently asked questions',
    faqList: [
      { q: 'How long does a store take?', a: 'Five to eight weeks depending on catalog size and integrations. What stretches timelines is rarely development — it is waiting on product photography, descriptions and access to payment accounts, so at kickoff we tell you exactly what we need and when.' },
      { q: 'Can we run the store ourselves afterwards?', a: 'Yes, that is the intent. You get a recorded handover so your team can load products, change prices and manage orders without coming back to us. Maintenance is a separate, optional service — not a condition for the store to keep running.' },
      { q: 'Do you handle sales tax?', a: 'We configure the calculation against the states where you have economic nexus, which is the technical part. Registration and filing remain with you or your accountant. What we guarantee is that collection is correct from the first order, which is where it usually breaks.' },
      { q: 'We already have a store. Migrate or fix?', a: 'We look before recommending. Migration is a real project — products, customers, orders and every URL needing a redirect map — and "close enough" on redirects costs rankings that take months to recover. If the current platform works and the only complaint is the monthly fee, fixing beats migrating.' },
      { q: 'Is product photography included?', a: 'No, photography is separate because it depends heavily on your catalog. We do specify the format, dimensions and framing the store needs to load fast, and we optimize whatever you supply. If you need production, we can quote it separately.' },
      { q: 'Should we launch bilingual from the start?', a: 'If your audience justifies it, yes — and it costs less than adding it later. A real Spanish storefront needs its own URLs and hreflang, and retrofitting that onto a finished store means rebuilding part of the structure.' },
    ],
    guides: 'Guides to decide with data',
    guidesList: [
      { title: 'Shopify vs WooCommerce for U.S. brands', path: '/blogs/shopify-vs-woocommerce-for-us-brands' },
      { title: 'How much should a small business spend on marketing?', path: '/blogs/marketing-budget-for-small-business' },
      { title: 'A creative testing framework for paid social', path: '/blogs/creative-testing-framework-paid-social' },
    ],
    contact: 'Free scoped quote',
    contactCta: 'Tell us what you sell and to whom. We recommend the platform that fits, give you a written price in USD, and if you want, the plan to bring buyers to it.',
    service: 'E-commerce development for brands selling in the United States',
  },
}

export default async function TiendasVirtualesLimaPage({ params }: Props) {
  const { locale } = await params
  // Renderizado estático: sin esto next-intl marca la ruta como dinámica y
  // Vercel devuelve `no-store` en cada visita.
  setRequestLocale(locale);

  const t = (COPY as any)[locale === 'en' ? 'en' : locale === 'us' ? 'us' : 'es']

  // Rediseño aprobado (mix 18-ago): es sirve el prototipo; us y en, su versión propia
  if (locale === 'es') {
    return <ProtoPage frag="tiendas-virtuales-lima" />
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <h1 className="sr-only">{t.h1}</h1>
      <section className="px-6 md:px-10 lg:px-20 pt-32 pb-20 max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">{t.eyebrow}</p>
        {/* Heading visible distinto del H1 sr-only (antes ambos repetían el
            mismo texto → H1 y H2 idénticos en la misma página). */}
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{t.heroH2 ?? t.h1}</h2>
        <p className="seo-intro text-lg md:text-xl text-white/80 max-w-3xl mb-10">{t.sub}</p>
        <a href="#cotizar" className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</a>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.why}</h2>
        <p className="text-white/70 max-w-3xl">{t.whyDesc}</p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.pillars}</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {t.pillarsList.map((p: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-white/70">{p.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.platforms}</h2>
        <p className="text-white/70 max-w-3xl mb-10">{t.platformsIntro}</p>
        <ul className="grid md:grid-cols-3 gap-4">
          {t.platformsList.map((p: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-white/70">{p.desc}</p>
            </li>
          ))}
        </ul>
        <p className="text-white/60 mt-6">
          {t.platformsMore}:{' '}
          <Link href={t.platformsMoreLink as AppPathname} className="text-white underline underline-offset-4 hover:text-white/80 transition">{t.platformsMoreAnchor}</Link>.
        </p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pricing}</h2>
        <p className="text-white/70 max-w-3xl mb-10">{t.pricingIntro}</p>
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.pricingTiers.map((tier: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6 flex flex-col">
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="text-2xl font-bold my-2">{tier.price}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">{tier.platform}</p>
              <p className="text-white/70 text-sm">{tier.desc}</p>
            </li>
          ))}
        </ul>
        <p className="text-white/60 mt-8 max-w-3xl">{t.pricingNote}</p>
        <p className="text-white/60 mt-2">
          {t.pricingLinks}{' '}
          <Link href="/precios" className="text-white underline underline-offset-4 hover:text-white/80 transition">{locale === 'en' ? 'Pricing' : 'Precios'}</Link>
          {' · '}
          <Link
            href={locale === "es"
              ? { pathname: "/blogs/[slug]", params: { slug: "cuanto-cuesta-tienda-virtual-peru-2026" } }
              : locale === "en"
                ? { pathname: "/blogs/[slug]", params: { slug: "marketing-budget-for-small-business" } }
                : "/cotizar"}
            className="text-white underline underline-offset-4 hover:text-white/80 transition"
          >{locale === 'en' ? 'How to size your budget' : locale === 'us' ? 'Calcula tu presupuesto' : 'Guía de precios de tiendas virtuales'}</Link>
        </p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.methodology}</h2>
        <ol className="space-y-4">
          {t.methodologyList.map((m: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">{m.step}</p>
              <h3 className="text-xl font-semibold mb-2">{m.title}</h3>
              <p className="text-white/70">{m.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.growth}</h2>
        <p className="text-white/70 max-w-3xl mb-10">{t.growthDesc}</p>
        <ul className="grid md:grid-cols-2 gap-4">
          {t.growthList.map((g: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-2">{g.title}</h3>
              <p className="text-white/70 mb-4">{g.desc}</p>
              <Link href={g.path as AppPathname} className="text-white underline underline-offset-4 hover:text-white/80 transition font-semibold">{g.anchor}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.coverage}</h2>
        <ul className="flex flex-wrap gap-2">
          {t.coverageList.map((d: string, i: number) => (
            <li key={i} className="px-4 py-2 border border-white/15 rounded-full text-sm text-white/80">{d}</li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.faq}</h2>
        <ul className="space-y-4">
          {t.faqList.map((f: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">{f.q}</h3>
              <p className="text-white/70">{f.a}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.guides}</h2>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.guidesList.map((g: any, i: number) => (
            <li key={i}>
              <Link href={g.path as AppPathname} className="block border border-white/10 rounded-2xl p-6 hover:border-white/30 transition h-full">
                <span className="text-white/90 font-medium">{g.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="cotizar" className="px-6 md:px-10 lg:px-20 py-20 max-w-6xl mx-auto border-t border-white/10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.contact}</h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-10">{t.contactCta}</p>
        <PillarWaCapture locale={locale} service={t.service} />
      </section>
    </main>
  )
}
