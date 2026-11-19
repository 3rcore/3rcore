/**
 * /en/miami-digital-marketing-agency y /us/agencia-marketing-digital-miami (11-nov-2026).
 *
 * Piero Roque (5 y 9-nov): «desde este mes somos FULL marketing digital»; (6-nov)
 * «3R CORE USA es para MIAMI» y «hay que tratar de competir en donde hayan búsquedas».
 *
 * Keywords (Semrush US, 6-nov-2026): digital marketing agency miami 1.300 (KD 32) ·
 * marketing agency miami 720 (KD 20) · agencia de marketing digital en miami 170
 * (KD 33). Autocompletado 11-nov: «best digital marketing agency in miami»,
 * «digital marketing agency in miami for small business», «digital marketing
 * agency miami fl». GSC (90 d): «agencia de marketing digital en florida» pos. 1.
 *
 * Los homes /en y /us siguen con Miami en el título (6-nov); esta página es la
 * del servicio completo (SEO, Ads, redes, email, web) y enlaza a cada servicio.
 * Medir canibalización home ↔ landing el 20-nov.
 *
 * Precios = los publicados en /en/pricing y /us/precios. Sin dirección, teléfono
 * ni EIN de EE. UU. (no hay oficina en Miami). /en sin Perú (plan USA 13-sep).
 */
import { cklist, numlist, page, prose, sec, steps, table, wa, type Faq } from '@/lib/landings-peru'
import { ZONES, closing, faqBlock, hero, zones } from '@/lib/landings-miami-blocks'
import type { LandingMiami, MiamiRouteConfig } from '@/lib/landings-miami-route'

export const CONFIG: MiamiRouteConfig = {
  path: '/agencia-marketing-digital-miami',
  serviceType: 'Digital marketing',
  offers: [
    { name: 'Startup plan: social media and basic ads', minPrice: 750, maxPrice: 1400 },
    { name: 'SMB plan: social media, ads, SEO and web improvements', minPrice: 1500, maxPrice: 3600 },
    { name: 'Mid-market plan: full marketing with content production and CRO', minPrice: 3600, maxPrice: 9000 },
    { name: 'SEO', minPrice: 500, maxPrice: 500 },
  ],
  dateModified: '2026-11-11',
}

/* ───────────────────────── /en/miami-digital-marketing-agency ───────────────────────── */

const faqEn: Faq[] = [
  {
    q: 'How much does a digital marketing agency cost in Miami?',
    a: 'With 3R Core, a business that is starting out typically invests $750 to $1,400 per month for social media and basic paid ads. Small and mid-sized businesses running social, ads, SEO and website improvements together invest $1,500 to $3,600 per month, and mid-market companies with content production and conversion work invest $3,600 to $9,000. SEO on its own is $500 per month. Ad spend is paid directly to Google or Meta and is not part of the fee.',
  },
  {
    q: 'Which services are included in your digital marketing plans?',
    a: 'SEO, Google Ads, Meta Ads, TikTok Ads, social media management, email marketing, website and online store development, and conversion tracking. Each plan combines the channels that fit your goal and budget; you do not pay for channels you do not need.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No. Plans are month to month with no mandatory contract. SEO usually shows its first movement in months two to three, so we recommend giving it at least that long before judging it.',
  },
  {
    q: 'Can you run campaigns in Spanish for Miami customers?',
    a: 'Yes. Our team writes natively in Spanish and English, so ads, landing pages and posts can run in both languages. In Miami, Spanish-language searches and ads usually face fewer competitors than the same terms in English.',
  },
  {
    q: 'How do you report results?',
    a: 'Every month you get a report with leads, cost per lead, rankings and what we will change next. Google Analytics 4, Search Console and the ad accounts are in your name, so you can check the numbers yourself at any time.',
  },
  {
    q: 'Do you work with small businesses in Miami?',
    a: 'Yes. Most of our clients are small and mid-sized businesses. For a small business we usually start with one channel that can bring leads quickly, such as Google Ads or local SEO, and add the rest once it pays for itself.',
  },
  {
    q: 'Do you have an office in Miami?',
    a: 'We work remotely with Miami and South Florida businesses over video calls, shared documents and WhatsApp, during Eastern Time business hours. Contracts and invoicing go through our U.S. subsidiary.',
  },
]

const htmlEn = page(
  hero({
    home: '/en',
    homeLabel: 'Home',
    aria: 'Breadcrumb',
    crumb: 'Digital Marketing Agency in Miami',
    h1: 'Digital marketing agency in Miami: <span class="mg">SEO, ads, social media and web</span> under one team',
    lede:
      '3R Core is a full-service digital marketing agency for Miami and South Florida businesses. One in-house team runs your SEO, Google and Meta ads, social media, email and website, in English and Spanish, and reports leads and cost per lead every month. Plans from <b>$750 per month</b>, SEO from <b>$500 per month</b>, no mandatory contract.',
    cta: { href: '/en/quote', label: 'Get a proposal' },
    second: { href: '#pricing', label: 'See monthly plans' },
    img: '/proto/img/hero/poster-agencia.jpg',
    alt: 'Marketing dashboard and website code on a 3R Core workstation',
    url: '3rcore.com/en/miami-digital-marketing-agency',
  }),

  sec({
    h2: 'What does a digital marketing agency do for a Miami business?',
    intro: 'It turns searches, ads and social media into calls, forms and sales, and shows you which channel produced each one.',
    body: prose([
      'Miami is a two-language market with a lot of agencies and a lot of noise. Most businesses we talk to are already paying for something, usually a social media manager, some ads and a website from a different vendor, and nobody connects the three. The result is spend you cannot trace to revenue.',
      '3R Core works as one team across every channel. The same people who build your landing page set up the ad that sends traffic to it and the tracking that tells you what it sold. That is the difference between running marketing and running posts.',
    ]),
  }),

  sec({
    alt: true,
    h2: 'Digital marketing services for Miami companies',
    body: numlist([
      { h: 'SEO and local search', p: 'Technical fixes, content and local signals so your business shows up when Miami customers search. See our <a href="/en/seo-agency">SEO agency in Miami</a> plans.' },
      { h: 'Google Ads', p: 'Search, Performance Max and Shopping campaigns with conversion tracking from day one. More on <a href="/en/services/google-ads">Google Ads management</a>.' },
      { h: 'Meta and TikTok ads', p: 'Facebook, Instagram and TikTok campaigns built around a measurable action, not reach. See <a href="/en/services/meta-ads">Meta Ads</a> and <a href="/en/services/tiktok-ads">TikTok Ads</a>.' },
      { h: 'Social media management', p: 'Content calendar, production and community management in English, Spanish or both. Details on <a href="/en/services/social-media">social media management</a>.' },
      { h: 'Email marketing', p: 'Welcome flows, abandoned-cart sequences and newsletters that bring past customers back. See <a href="/en/services/email-marketing">email marketing</a>.' },
      { h: 'Websites and online stores', p: 'Fast sites and Shopify or WooCommerce stores built to convert. See <a href="/en/miami-web-design">web design in Miami</a> and our <a href="/en/miami-ecommerce-agency">ecommerce agency in Miami</a>.' },
    ]),
  }),

  sec({
    h2: 'Why work with 3R Core',
    body: cklist([
      { b: 'One in-house team', s: 'Strategy, design, ads, SEO and development under the same roof. No hand-offs between vendors that blame each other.' },
      { b: 'English and Spanish', s: 'Native writers in both languages, so your Spanish campaigns are written for Miami customers instead of translated.' },
      { b: 'Eastern Time hours', s: 'Meetings, WhatsApp and reviews during your business day.' },
      { b: 'Accounts in your name', s: 'Google Ads, Meta, Analytics and Search Console belong to you. If you leave, you keep everything.' },
      { b: 'Monthly report with leads', s: 'Leads, cost per lead and rankings, plus the next changes we will make. No vanity metrics.' },
    ]),
  }),

  sec({
    alt: true,
    id: 'pricing',
    h2: 'How much does digital marketing cost in Miami?',
    intro: 'Reference monthly investment in USD, as published on our pricing page. Ad spend is paid directly to the platforms and is not included.',
    body: table(
      ['Business stage', 'Monthly fee', 'What it covers'],
      [
        ['Starting out', '$750 to $1,400', 'Social media and basic paid ads'],
        ['Small and mid-sized business', '$1,500 to $3,600', 'Social media, ads, SEO and website improvements'],
        ['Mid-market company', '$3,600 to $9,000', 'Full marketing with content production and conversion work'],
        ['SEO only', '$500', 'Audit, on-page optimization, content and monthly report'],
      ]
    ),
  }),

  sec({
    h2: 'How we start',
    body: steps([
      { h: 'Discovery call', p: 'We learn what you sell, your margins and which customers you want more of. We look at your current site, ads and analytics.', t: 'Week 1' },
      { h: 'Plan and proposal', p: 'Channels, budget split, goals per month and a fixed monthly fee in USD.', t: 'Week 1' },
      { h: 'Setup and launch', p: 'Tracking, landing pages and the first campaigns go live. Accounts are created or moved into your name.', t: 'Weeks 2 to 3' },
      { h: 'Optimize and report', p: 'We cut what does not convert, scale what does and send the monthly report with leads and cost per lead.', t: 'Every month' },
    ]),
  }),

  faqBlock(faqEn, 'Digital marketing in Miami: frequently asked questions', 'Short answers with real prices. Figures are reference prices in USD.'),

  zones(
    'Marketing for businesses across Miami-Dade and Broward',
    'We plan campaigns and local pages around the neighborhoods your customers actually search from, from Brickell and Doral to Hialeah, Kendall and Fort Lauderdale.',
    ZONES
  ),

  closing({
    eyebrow: "Let's talk",
    h2: 'Tell us where you want more customers',
    lede: 'Share your website and what you are spending today. We reply within one business day with a plan and a monthly fee in USD.',
    cta: { href: '/en/quote', label: 'Get a proposal' },
    second: { href: '/en/pricing', label: 'See all prices' },
    waHref: wa('Hi 3R Core, I have a business in Miami and want a digital marketing proposal.'),
    waLabel: 'Message us on WhatsApp',
  })
)

const en: LandingMiami = {
  title: 'Digital Marketing Agency in Miami: SEO, Ads & Social | 3R Core',
  description:
    'Full-service digital marketing agency for Miami businesses: SEO, Google and Meta ads, social media, email and web. English and Spanish. Plans from $750/month.',
  breadcrumbHome: 'Home',
  breadcrumb: 'Digital Marketing Agency in Miami',
  inLanguage: 'en-US',
  faq: faqEn,
  serviceName: 'Digital Marketing Agency in Miami',
  serviceDescription:
    'Full-service digital marketing for businesses in Miami and South Florida: SEO, Google Ads, Meta and TikTok ads, social media management, email marketing, websites and online stores, with monthly lead reporting.',
  html: htmlEn,
}

/* ───────────────────────── /us/agencia-marketing-digital-miami ───────────────────────── */

const faqUs: Faq[] = [
  {
    q: '¿Cuánto cobra una agencia de marketing digital en Miami?',
    a: 'En 3R Core, un negocio que empieza invierte entre $750 y $1,400 al mes en redes sociales y anuncios básicos. Una pyme que combina redes, anuncios, SEO y mejoras de la web invierte entre $1,500 y $3,600 al mes, y una empresa mediana con producción de contenido y optimización de conversiones, entre $3,600 y $9,000. El SEO solo cuesta $500 al mes. La inversión en anuncios se paga directo a Google o Meta y no forma parte del honorario.',
  },
  {
    q: '¿Qué servicios incluye el marketing digital de 3R Core?',
    a: 'Posicionamiento SEO, Google Ads, Meta Ads, TikTok Ads, manejo de redes sociales, email marketing, páginas web y tiendas virtuales, y medición de conversiones. Cada plan junta solo los canales que sirven para tu objetivo y tu presupuesto.',
  },
  {
    q: '¿Hacen campañas en español para el público hispano de Miami?',
    a: 'Sí, es nuestra especialidad. Escribimos en español nativo y en inglés, así que los anuncios, las páginas y las publicaciones pueden salir en los dos idiomas. En Miami las búsquedas en español suelen tener menos competencia que las mismas en inglés, y el clic sale más barato.',
  },
  {
    q: '¿Hay contrato de permanencia?',
    a: 'No. Los planes son mes a mes y sin contrato obligatorio. El SEO suele mostrar el primer movimiento entre el segundo y el tercer mes, así que conviene darle ese tiempo antes de evaluarlo.',
  },
  {
    q: '¿Cómo sé si el marketing está funcionando?',
    a: 'Cada mes recibes un reporte con los contactos que llegaron, el costo por contacto, las posiciones en Google y los cambios del mes siguiente. Las cuentas de Google Ads, Meta, Analytics y Search Console quedan a tu nombre, así que puedes ver los números cuando quieras.',
  },
  {
    q: '¿Trabajan con negocios pequeños de Miami?',
    a: 'Sí. La mayoría de nuestros clientes son pequeños y medianos. Con un negocio pequeño empezamos por un canal que traiga contactos rápido, como Google Ads o SEO local, y sumamos los demás cuando el primero ya se paga solo.',
  },
  {
    q: '¿Tienen oficina en Miami?',
    a: 'Trabajamos en remoto con negocios de Miami y el sur de Florida por videollamada, documentos compartidos y WhatsApp, en horario del Este. Los contratos y la facturación van por nuestra filial en Estados Unidos.',
  },
]

const htmlUs = page(
  hero({
    home: '/us',
    homeLabel: 'Inicio',
    aria: 'Ruta de navegación',
    crumb: 'Agencia de marketing digital en Miami',
    h1: 'Agencia de marketing digital en Miami: <span class="mg">más clientes hispanos</span> desde Google, Meta y tu web',
    lede:
      'En 3R Core llevamos el marketing digital completo de negocios de Miami y el sur de Florida: SEO, Google Ads, Meta Ads, redes sociales, email y páginas web, con un solo equipo y en español de verdad. Cada mes te mostramos cuántos contactos llegaron y cuánto costó cada uno. Planes desde <b>$750 al mes</b> y SEO desde <b>$500 al mes</b>, sin permanencia.',
    cta: { href: '/us/cotizar', label: 'Pedir propuesta' },
    second: { href: '#pricing', label: 'Ver planes mensuales' },
    img: '/proto/img/hero/poster-agencia.jpg',
    alt: 'Estación de trabajo de 3R Core con un panel de marketing y código de una web',
    url: '3rcore.com/us/agencia-marketing-digital-miami',
  }),

  sec({
    h2: '¿Por qué un negocio de Miami necesita marketing en español?',
    intro: 'Porque una parte grande de tus clientes busca, compara y escribe en español, y casi nadie les está hablando bien.',
    body: prose([
      'En Miami la mayoría de agencias hace las campañas en inglés y, como mucho, traduce los anuncios al final. El cliente hispano lo nota: el texto suena raro, la página a la que llega está en inglés y el formulario no le inspira confianza. Ese cliente se va con el negocio que le habló en su idioma.',
      'En 3R Core escribimos en español desde el inicio, pensando en cómo busca la gente en Doral, Hialeah, Kendall o Westchester. Lo mismo con los anuncios, las redes y la página web: todo conectado y medido, para que sepas qué canal te trajo cada cliente.',
    ]),
  }),

  sec({
    alt: true,
    h2: 'Servicios de marketing digital para negocios de Miami',
    body: numlist([
      { h: 'Posicionamiento SEO', p: 'Que tu negocio aparezca en Google cuando te buscan en español y en inglés. Planes en <a href="/us/posicionamiento-seo">agencia SEO en Miami</a>.' },
      { h: 'Google Ads', p: 'Campañas de búsqueda y Performance Max con conversiones medidas desde el primer día. Más en <a href="/us/servicios/google-ads">Google Ads</a>.' },
      { h: 'Meta Ads y TikTok Ads', p: 'Anuncios en Facebook, Instagram y TikTok pensados para que te escriban o te compren. Ver <a href="/us/servicios/meta-ads">Meta Ads</a>.' },
      { h: 'Redes sociales', p: 'Calendario, contenido y respuesta a la comunidad en español, inglés o los dos. Ver <a href="/us/servicios/redes-sociales">manejo de redes sociales</a>.' },
      { h: 'Email marketing', p: 'Correos de bienvenida, de carrito abandonado y boletines para que el cliente vuelva. Ver <a href="/us/servicios/email-marketing">email marketing</a>.' },
      { h: 'Páginas web y tiendas virtuales', p: 'Webs rápidas y tiendas en Shopify o WooCommerce hechas para vender. Ver <a href="/us/diseno-web-miami">diseño web en Miami</a> y <a href="/us/tiendas-virtuales-miami">tiendas virtuales en Miami</a>.' },
    ]),
  }),

  sec({
    h2: 'Cómo trabajamos con negocios de Miami',
    body: cklist([
      { b: 'Un solo equipo propio', s: 'Estrategia, diseño, anuncios, SEO y desarrollo en el mismo equipo. Sin proveedores que se echan la culpa entre ellos.' },
      { b: 'Español nativo e inglés', s: 'Los textos se escriben para el cliente hispano de Miami, no se traducen del inglés.' },
      { b: 'Horario del Este', s: 'Reuniones, WhatsApp y revisiones dentro de tu horario de trabajo.' },
      { b: 'Cuentas a tu nombre', s: 'Google Ads, Meta, Analytics y Search Console son tuyas. Si un día te vas, te llevas todo.' },
      { b: 'Reporte mensual con contactos', s: 'Contactos, costo por contacto y posiciones, más lo que vamos a cambiar el mes siguiente.' },
    ]),
  }),

  sec({
    alt: true,
    id: 'pricing',
    h2: '¿Cuánto cuesta el marketing digital en Miami?',
    intro: 'Inversión mensual de referencia en dólares, la misma de nuestra página de precios. Lo que inviertes en anuncios se paga directo a cada plataforma.',
    body: table(
      ['Etapa del negocio', 'Honorario mensual', 'Qué incluye'],
      [
        ['Negocio que empieza', '$750 a $1,400', 'Redes sociales y anuncios básicos'],
        ['Pequeña y mediana empresa', '$1,500 a $3,600', 'Redes, anuncios, SEO y mejoras de la web'],
        ['Empresa mediana', '$3,600 a $9,000', 'Marketing completo con producción de contenido y optimización de conversiones'],
        ['Solo SEO', '$500', 'Auditoría, optimización, contenido y reporte mensual'],
      ]
    ),
  }),

  sec({
    h2: 'Cómo empezamos',
    body: steps([
      { h: 'Llamada inicial', p: 'Entendemos qué vendes, a quién y en qué zonas. Revisamos tu web, tus anuncios y tu analítica actual.', t: 'Semana 1' },
      { h: 'Plan y propuesta', p: 'Canales, reparto del presupuesto, metas por mes y un honorario fijo en dólares.', t: 'Semana 1' },
      { h: 'Configuración y lanzamiento', p: 'Medición, páginas de aterrizaje y primeras campañas en marcha, con las cuentas a tu nombre.', t: 'Semanas 2 y 3' },
      { h: 'Optimización y reporte', p: 'Cortamos lo que no convierte, escalamos lo que sí y te mandamos el reporte con los contactos del mes.', t: 'Cada mes' },
    ]),
  }),

  faqBlock(faqUs, 'Marketing digital en Miami: preguntas frecuentes', 'Respuestas cortas con precios reales. Los montos son referenciales y en dólares.'),

  zones(
    'Marketing para negocios de Miami-Dade y Broward',
    'Armamos las campañas y las páginas locales según los barrios desde donde te buscan tus clientes, de Brickell y Doral a Hialeah, Kendall y Fort Lauderdale.',
    ZONES
  ),

  sec({
    slim: true,
    h2: 'Para seguir leyendo',
    body: prose([
      'Si estás comparando agencias, lee <a href="/us/blogs/como-elegir-agencia-de-marketing-digital-en-miami">cómo elegir una agencia de marketing digital en Miami</a> y <a href="/us/blogs/cuanto-cobra-una-agencia-de-marketing-digital-en-estados-unidos">cuánto cobra una agencia de marketing digital en Estados Unidos</a>.',
    ]),
  }),

  closing({
    eyebrow: 'Hablemos',
    h2: 'Cuéntanos dónde quieres más clientes',
    lede: 'Mándanos tu web y lo que inviertes hoy en publicidad. Te respondemos en un día hábil con un plan y el honorario mensual en dólares.',
    cta: { href: '/us/cotizar', label: 'Pedir propuesta' },
    second: { href: '/us/precios', label: 'Ver todos los precios' },
    waHref: wa('Hola 3R Core, tengo un negocio en Miami y quiero una propuesta de marketing digital.'),
    waLabel: 'Escribir por WhatsApp',
  })
)

const us: LandingMiami = {
  title: 'Agencia de Marketing Digital en Miami: SEO, Ads y Redes | 3R Core',
  description:
    'Marketing digital en español para negocios de Miami: SEO, Google Ads, Meta Ads, redes sociales, email y web con un solo equipo. Planes desde $750 al mes.',
  breadcrumbHome: 'Inicio',
  breadcrumb: 'Agencia de marketing digital en Miami',
  inLanguage: 'es-US',
  faq: faqUs,
  serviceName: 'Agencia de marketing digital en Miami',
  serviceDescription:
    'Marketing digital completo para negocios de Miami y el sur de Florida, en español e inglés: SEO, Google Ads, Meta y TikTok Ads, redes sociales, email marketing, páginas web y tiendas virtuales, con reporte mensual de contactos.',
  html: htmlUs,
}

export const PAGES = { en, us }
