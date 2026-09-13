/**
 * Textos de la página madre «agencia de marketing digital en Lima».
 *
 * ⚠️ REGLA DE ORIGEN DE LOS DATOS (26-ago-2026). Esta página se reescribió
 * entera para que NO contenga una sola afirmación que la propia web no publique
 * ya. Cada bloque lleva anotada su fuente dentro del repositorio:
 *
 *   · Precios y condiciones → app/[locale]/precios/page.tsx (COPY.es / COPY.en)
 *   · Quiénes somos y preguntas → messages/es.json · messages/en.json (FAQ)
 *   · Distritos y cobertura → components/sections/home/HomeSeoSection.tsx
 *   · Horario, teléfono y correo → app/[locale]/layout.tsx (JSON-LD) y llms.txt
 *   · Valoración → ficha de Google vía lib/reviews.ts (4,7 · 42 reseñas)
 *
 * Lo que se quitó en esa revisión, por no estar respaldado en ninguna parte:
 * la dirección de calle (ver AVISO), un proceso de trabajo en cuatro pasos, la
 * promesa de que las cuentas publicitarias quedan a nombre del cliente, la de
 * que atiende siempre la misma persona y la de que se limita la cartera a
 * propósito. Todo eso puede ser cierto; simplemente no consta, y una landing no
 * es el sitio para estrenar promesas.
 *
 * ✅ DIRECCIÓN CONFIRMADA (31-ago-2026). La web publicaba dos calles a la vez;
 * el cliente confirma que la oficina es «Alameda de la Paz 187, primer piso,
 * Urb. El Remanso, La Molina, Lima 15024». «Calle Las Caobas 170, Ofic. 400»
 * era la incorrecta y se retiró de las FAQ (es y en). Fuente única: lib/nap.ts.
 * Ya se puede publicar la calle aquí, y conviene hacerlo: una NAP completa y
 * coincidente en todas partes es lo que sostiene el posicionamiento local.
 */

type Item = { name: string; desc: string; href: string }

export const COPY = {
  es: {
    eyebrow: '3R Core · La Molina, Lima · Perú',
    hero: 'Agencia de marketing digital en Lima',
    // Fuente: descripción del nodo Organization en app/[locale]/layout.tsx.
    sub: 'Agencia de marketing digital en La Molina, Lima. Combinamos Experiencia, Visión y Tecnología en estrategias de branding, social media, SEO, Google Ads y desarrollo web para empresas de Perú y de Estados Unidos.',
    // Fuente: llms.txt y el JSON-LD del sitio. Sin calle: ver AVISO arriba.
    zona: 'Alameda de la Paz 187, primer piso, Urb. El Remanso, La Molina, Lima 15024, Perú',
    horario: 'Lunes a viernes, 9:00 a 18:00 (hora de Perú)',
    phone: '+51 987 216 703',
    email: 'info@3rcore.com',
    cta: 'Cotiza tu proyecto',
    ctaHref: '/cotizar',
    ctaSecondary: 'Ver todos los precios',
    ctaSecondaryHref: '/precios',

    whyH2: 'Quiénes somos',
    // Fuente: messages/es.json → FAQ.faqs.q2.answer (literal).
    whyP1: 'Somos un equipo de profesionales y nativos digitales con una visión de 3 generaciones. Conjugamos la experiencia, la visión estratégica y la tecnología para crear estrategias personalizadas que potencian el crecimiento real de tu empresa.',
    // Fuente: messages/es.json → FAQ.faqs.q1.answer (literal).
    whyP2: 'Somos una agencia de marketing digital integral que ofrece Branding Corporativo, Gestión de Redes Sociales (Social Media), Desarrollo Web & E-commerce (Shopify/WooCommerce), Google Ads (SEM) y Posicionamiento SEO.',
    // Fuente: ficha de Google leída el 26-ago-2026 (lib/reviews.ts).
    whyP3: 'En el perfil de empresa de Google la agencia acumula una valoración media de 4,7 sobre 5 en 42 reseñas.',

    servicesH2: 'Servicios y precios',
    // Fuente: app/[locale]/precios/page.tsx → COPY.es.note (literal).
    servicesP: 'Sin contratos forzosos, con reportes mensuales y resultados progresivos. Los precios son referenciales según paquetes base; cada propuesta se ajusta tras una reunión inicial. Precios netos en soles peruanos; las facturas en Perú suman 18% de IGV.',
    // Fuente: COPY.es.tiers y COPY.es.webTiers de la página de precios.
    services: [
      { name: 'Branding inicial — desde S/ 500', desc: 'Logotipo, manual de marca, paleta cromática, tipografía corporativa y aplicaciones esenciales. La propuesta se entrega tras una sesión inicial de descubrimiento.', href: '/servicios/branding' },
      { name: 'Social Media — desde S/ 1,500 / mes', desc: 'Manejo de TikTok, Instagram, Facebook y LinkedIn con 8–12 piezas mensuales, Reels y TikToks editados, community management y reporte mensual.', href: '/servicios/socialmedia' },
      { name: 'Posicionamiento SEO — S/ 1,800 / mes', desc: 'Auditoría inicial, planificación, optimización on-page, escalamiento y reporte mensual. Estrategia continua sin contratos forzosos.', href: '/posicionamiento-seo' },
      { name: 'Google Ads — desde S/ 1,800 / mes', desc: 'Fee de gestión de campañas Search, Performance Max, YouTube, Display, Shopping y Remarketing. Aparte va un presupuesto mínimo de pauta de S/ 1,500/mes pagado directamente a Google.', href: '/servicios/google-ads' },
      { name: 'Landing page — desde S/ 1,800', desc: 'Diseño a medida, SEO técnico básico y formulario de contacto. Una web corporativa de 5 a 8 secciones va de S/ 4,500 a S/ 9,000 según alcance.', href: '/servicios/web-development' },
      { name: 'E-commerce — desde S/ 6,500', desc: 'Tienda online con catálogo, pasarela de pago (Culqi, Niubiz, Izipay o Mercado Pago), gestión de inventario y panel de administración.', href: '/tiendas-virtuales-lima' },
    ] as Item[],

    // Fuente: COPY.es.refTitle / refList / refNote de la página de precios.
    refH2: 'Inversión mensual de referencia para Lima',
    ref: [
      { t: 'Emprendimientos', d: 'S/ 2,500 – 4,500 / mes (cubre redes + Ads básico)' },
      { t: 'Pymes', d: 'S/ 5,000 – 12,000 / mes (estrategia integral con redes, Ads, SEO y mejoras web)' },
      { t: 'Empresas medianas', d: 'S/ 12,000 – 30,000 / mes (marketing completo con producción de contenido y CRO)' },
    ],
    refNote: 'Lo importante no es el presupuesto sino que el ROI sea positivo desde el mes 3.',

    zonesH2: 'Dónde atendemos',
    // Fuente: HomeSeoSection (mismos distritos, sin añadir ninguno) + FAQ q6.
    zonesP: 'La oficina está en la Alameda de la Paz 187, primer piso, urbanización El Remanso, La Molina, y trabajamos con negocios de todos los distritos de Lima —San Isidro, Miraflores, Surco, San Borja, La Victoria, Los Olivos— y de provincias en todo el Perú. Contamos con presencia y atención tanto en Perú como en EE.UU. Atendemos de lunes a viernes, de 9:00 a 18:00.',
    sectorsP: 'Tres sectores tienen página propia porque su embudo y su coste por contacto no se parecen al resto:',
    // Fuente: la descripción de metadata de cada una de esas tres páginas.
    sectors: [
      { name: 'Clínicas y consultorios', desc: 'Google Ads de salud, SEO local, Google Business Profile y captación de pacientes con citas medibles.', href: '/servicios/marketing-clinicas' },
      { name: 'Inmobiliarias y proyectos', desc: 'Meta Ads y Google Ads para captar leads, landing por proyecto, CRM y seguimiento por WhatsApp con costo por lead medible.', href: '/servicios/marketing-inmobiliarias' },
      { name: 'E-commerce y tiendas online', desc: 'Google Shopping, Meta Ads con catálogo, email marketing y CRO sobre Shopify, WooCommerce o VTEX.', href: '/servicios/marketing-ecommerce' },
    ] as Item[],

    qaH2: 'Lo que más se pregunta',
    // Fuente: FAQ publicadas en /es/precios y /es/preguntas, LITERALES. No se
    // emite FAQPage aquí: esas mismas preguntas ya están marcadas en sus
    // páginas y duplicar el marcado reparte la señal en vez de sumarla.
    qa: [
      { q: '¿Cuánto cuesta contratar una agencia de marketing digital en Lima?', a: 'Depende del mix de servicios. Como referencia mensual en Lima: emprendimientos S/ 2,500–4,500, pymes S/ 5,000–12,000 y empresas medianas S/ 12,000–30,000. Por servicio: SEO S/ 1,800/mes, gestión de Google Ads desde S/ 1,800/mes (más pauta), Social Media desde S/ 1,500/mes, branding desde S/ 500 y webs desde S/ 1,800.' },
      { q: '¿Los precios incluyen IGV? ¿Hay contratos forzosos?', a: 'Los precios son netos en soles peruanos; las facturas en Perú suman 18% de IGV. No trabajamos con contratos forzosos: el servicio es mensual, con reportes y resultados progresivos.' },
      { q: '¿Qué resultados puedo esperar de las campañas de Google Ads?', a: 'Nuestras campañas están enfocadas en la conversión. Obtendrás mayor visibilidad en los primeros resultados de búsqueda, un incremento en los mensajes y llamadas de clientes potenciales, y un mejor retorno de inversión (ROI).' },
    ],

    closeH2: 'Hablemos de tu proyecto',
    // Fuente: COPY.es.contactDesc de la página de precios (literal).
    closeP: 'Cuéntanos tu objetivo y armamos una cotización personalizada en la primera reunión.',
    moreH3: 'Antes de escribirnos',
    more: [
      { name: 'Todos los servicios', desc: 'El catálogo con el detalle de cada uno.', href: '/servicios' },
      { name: 'Precios completos', desc: 'La tabla entera de planes, extras y presupuestos.', href: '/precios' },
      { name: 'Preguntas frecuentes', desc: 'Servicios, plataformas, ubicación y horario.', href: '/preguntas' },
      { name: 'Casos de éxito', desc: 'Proyectos de clientes publicados por la agencia.', href: '/casos-de-exito' },
    ] as Item[],
  },
  en: {
    eyebrow: '3R Core · La Molina, Lima · Peru',
    hero: 'Digital marketing agency in Lima, Peru',
    sub: 'Digital marketing agency in La Molina, Lima. We combine Experience, Vision and Technology across branding, social media, SEO, Google Ads and web development for companies in Peru and the United States.',
    zona: 'Alameda de la Paz 187, first floor, Urb. El Remanso, La Molina, Lima 15024, Peru',
    horario: 'Monday to Friday, 9:00 to 18:00 (Peru time)',
    phone: '+51 987 216 703',
    email: 'info@3rcore.com',
    cta: 'Get a quote',
    ctaHref: '/quote',
    ctaSecondary: 'See full pricing',
    ctaSecondaryHref: '/pricing',

    whyH2: 'Who we are',
    // Fuente: messages/en.json → FAQ.faqs.q2.answer (literal).
    whyP1: 'We are a team of professionals and digital natives with a 3-generation vision. We combine experience, strategic insight, and technology to create personalized strategies that drive real growth for your business.',
    // Fuente: messages/en.json → FAQ.faqs.q1.answer (literal).
    whyP2: 'We are a full-service digital marketing agency offering Corporate Branding, Social Media Management, Web Development & E-commerce (Shopify/WooCommerce), Google Ads (SEM), and SEO Positioning.',
    whyP3: 'On its Google Business Profile the agency holds an average rating of 4.7 out of 5 across 42 reviews.',

    servicesH2: 'Services and pricing',
    // Fuente: app/[locale]/precios/page.tsx → COPY.en.note y COPY.en.sub.
    servicesP: 'No mandatory contracts, monthly reports and progressive results. Prices shown are reference packages; each proposal is tailored after an initial meeting. Net prices in US Dollars for clients based in the United States.',
    services: [
      { name: 'Starter branding — from $500 USD', desc: 'Visual identity design: logo, brand manual, color palette, corporate typography and essential applications, after an initial discovery session.', href: '/services/branding' },
      { name: 'Social media — $800 USD / month', desc: 'TikTok, Instagram, Facebook and LinkedIn management with 8–12 pieces per month, edited Reels and TikToks, community management and a monthly report.', href: '/services/social-media' },
      { name: 'SEO positioning — $500 USD / month', desc: 'Audit, planning, on-page optimization, scaling and monthly reports. Continuous strategy with no mandatory contracts.', href: '/seo-agency' },
      { name: 'Google Ads management — $800 USD / month', desc: 'Management fee for Search, Performance Max, YouTube, Display, Shopping and Remarketing campaigns, plus a minimum ad spend of $400/month paid directly to Google.', href: '/services/google-ads' },
      { name: 'Landing page — from $850 USD', desc: 'Custom landing page design with basic technical SEO and contact form. A 5–8 section corporate site ranges from $1,200 to $2,400 depending on scope.', href: '/services/web-development' },
      { name: 'E-commerce — from $1,750 USD', desc: 'Online store on Shopify or WooCommerce with catalog, payment gateway, inventory management and admin panel.', href: '/ecommerce-development' },
    ] as Item[],

    refH2: 'Reference monthly investment',
    ref: [
      { t: 'Startups', d: '$750 – $1,400 / month (covers social + basic Ads)' },
      { t: 'SMBs', d: '$1,500 – $3,600 / month (full strategy with social, Ads, SEO and web improvements)' },
      { t: 'Mid-market', d: '$3,600 – $9,000 / month (full marketing with content production and CRO)' },
    ],
    refNote: 'What matters is not the budget but that ROI turns positive from month 3.',

    zonesH2: 'Where we work',
    zonesP: 'The office is at Alameda de la Paz 187, first floor, Urb. El Remanso, La Molina, Lima, and we work with businesses across every district of Lima and throughout Peru. We serve clients in both Peru and the USA. Open Monday to Friday, 9:00 to 18:00 Peru time.',
    sectorsP: 'Three industries have their own page because their funnel and cost per contact look nothing like the rest:',
    sectors: [
      { name: 'Clinics and medical practices', desc: 'Healthcare Google Ads, local SEO, Google Business Profile and bilingual patient acquisition campaigns.', href: '/services/healthcare-marketing' },
      { name: 'Real estate', desc: 'Meta and Google Ads for listings, CRM follow-up and measurable cost per qualified lead.', href: '/services/real-estate-marketing' },
      { name: 'E-commerce', desc: 'Google Shopping, catalog feeds, email flows and CRO for online stores.', href: '/services/ecommerce-marketing' },
    ] as Item[],

    qaH2: 'Most asked',
    qa: [
      { q: 'How much does a digital marketing agency cost?', a: 'It depends on the mix of services. Reference monthly ranges: startups $750–$1,400, SMBs $1,500–$3,600 and mid-market $3,600–$9,000. Per service: SEO $500/month, Google Ads management from $800/month (plus ad spend), social media $800/month, branding from $500 and websites from $850.' },
      { q: 'Which web development platforms do you work with?', a: 'We partner with top e-commerce platforms like Shopify and WooCommerce to provide scalable, robust, and high-performance websites (UX/UI) tailored to your business needs.' },
      { q: 'What results can I expect from Google Ads campaigns?', a: 'Our campaigns are conversion-focused. You will gain higher visibility in top search results, an increase in messages and calls from potential leads, and a better return on investment (ROI).' },
    ],

    closeH2: 'Let’s talk about your project',
    closeP: 'Tell us your goal and we build a custom proposal in the first meeting.',
    moreH3: 'Before you write',
    more: [
      { name: 'All services', desc: 'The catalogue with the detail of each one.', href: '/services' },
      { name: 'Full pricing', desc: 'The complete table of plans, add-ons and budgets.', href: '/pricing' },
      { name: 'FAQ', desc: 'Services, platforms, location and business hours.', href: '/faq' },
      { name: 'Case studies', desc: 'Client projects published by the agency.', href: '/services' },
    ] as Item[],
  },
}
