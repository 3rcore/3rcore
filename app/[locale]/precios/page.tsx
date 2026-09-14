import { Link } from "@/i18n/routing"
import type { AppPathname } from "@/i18n/routing"
import { buildFAQPageSchema } from "@/lib/seoSchemas"
import ProtoPage from "@/components/proto/ProtoPage"
import { setRequestLocale } from "next-intl/server"

interface Props { params: Promise<{ locale: string }> }

const COPY = {
  es: {
    hero: 'Precios de Marketing Digital en Lima, Perú',
    sub: 'Branding desde S/500, Social Media desde S/1,500/mes, SEO S/1,800/mes, Google Ads desde S/1,800/mes de gestión y Webs desde S/1,800. Precios netos en Soles peruanos. Las facturas peruanas suman 18% de IGV.',
    contactCta: 'Conversemos sobre tu proyecto',
    contactPath: '/#contacto',
    note: 'Sin contratos forzosos, con reportes mensuales y resultados progresivos. Los precios son referenciales según paquetes base; cada propuesta se ajusta tras una reunión inicial.',
    tiers: [
      { name: 'Branding inicial', price: 'desde S/ 500', period: '/ proyecto', desc: 'Diseño de identidad visual con entrega de propuesta tras sesión inicial de descubrimiento.', feats: ['Logotipo','Manual de marca','Paleta cromática','Tipografía corporativa','Aplicaciones esenciales'], href: '/servicios/branding', cta: 'Ver branding' },
      { name: 'Social Media', price: 'desde S/ 1,500', period: '/ mes', desc: 'Manejo de TikTok, Instagram, Facebook y LinkedIn con 8–12 piezas mensuales para emprendimientos.', feats: ['8–12 piezas / mes','TikTok + IG + FB + LinkedIn','Reels / TikToks editados','Community management','Reporte mensual'], href: '/servicios/socialmedia', cta: 'Ver redes sociales' },
      { name: 'Posicionamiento SEO', price: 'S/ 1,800', period: '/ mes', desc: 'Auditoría, planificación, optimización, escalamiento y reportes mensuales. Estrategia continua sin contratos forzosos y con resultados progresivos.', feats: ['Auditoría inicial','Planificación','Optimización on-page','Escalamiento','Reporte mensual'], href: '/posicionamiento-seo', cta: 'Ver SEO', highlight: true },
      { name: 'Google Ads gestión', price: 'desde S/ 1,800', period: '/ mes', desc: 'Fee de gestión de campañas Search, Performance Max, YouTube, Display, Shopping y Remarketing.', feats: ['Configuración de campañas','Optimización continua','Tracking de conversiones','Reporte mensual'], href: '/servicios/google-ads', cta: 'Ver Google Ads', extra: '+ presupuesto mínimo de pauta S/ 1,500/mes pagado directamente a Google.' },
    ],
    webTitle: 'Diseño y desarrollo web',
    webNote: 'Cotización a medida tras reunión inicial. Cada propuesta incluye diseño en Figma, desarrollo responsive, SEO técnico básico, formulario de contacto y conexión a Google Analytics. El primer año incluye dominio, SSL y hosting.',
    webTiers: [
      { name: 'Landing page profesional', price: 'desde S/ 1,800', desc: 'Landing page con diseño a medida, SEO técnico básico y formulario de contacto.' },
      { name: 'Web corporativa', price: 'desde S/ 4,500', desc: 'Sitio corporativo con 5–8 secciones. Rango S/ 4,500–9,000 según alcance.' },
      { name: 'E-commerce Shopify / WooCommerce', price: 'desde S/ 6,500', desc: 'Tienda online con catálogo, pasarela de pago (Culqi, Niubiz, Izipay o Mercado Pago), gestión de inventario y panel admin.' },
    ],
    refTitle: 'Inversión mensual de referencia para Lima',
    refList: [
      { t: 'Emprendimientos', d: 'S/ 2,500 – 4,500 / mes (cubre redes + Ads básico)' },
      { t: 'Pymes', d: 'S/ 5,000 – 12,000 / mes (estrategia integral con redes, Ads, SEO y mejoras web)' },
      { t: 'Empresas medianas', d: 'S/ 12,000 – 30,000 / mes (marketing completo con producción de contenido y CRO)' },
    ],
    refNote: 'Lo importante no es el presupuesto sino que el ROI sea positivo desde el mes 3.',
    contact: '¿Tu proyecto necesita un mix distinto?',
    contactDesc: 'Cuéntanos tu objetivo y armamos una cotización personalizada en la primera reunión.',
    faqTitle: 'Preguntas frecuentes sobre precios',
    faqs: [
      { q: '¿Cuánto cuesta contratar una agencia de marketing digital en Lima?', a: 'Depende del mix de servicios. Como referencia mensual en Lima: emprendimientos S/ 2,500–4,500, pymes S/ 5,000–12,000 y empresas medianas S/ 12,000–30,000. Por servicio: SEO S/ 1,800/mes, gestión de Google Ads desde S/ 1,800/mes (más pauta), Social Media desde S/ 1,500/mes, branding desde S/ 500 y webs desde S/ 1,800. Los montos indicados son referenciales.' },
      { q: '¿Cuánto cuesta crear una tienda virtual o e-commerce en Perú?', a: 'Un e-commerce completo en Shopify o WooCommerce arranca desde S/ 6,500, con catálogo, pasarela de pago local (Culqi, Niubiz, Izipay o Mercado Pago), gestión de inventario y panel de administración. Si solo necesitas la implementación básica sobre Shopify o Tiendanube (diseño, carga inicial de catálogo y pagos configurados), arranca desde S/ 1,500 — el detalle está en nuestra página de tiendas virtuales. Los montos indicados son referenciales.' },
      { q: '¿Cuánto cuesta el posicionamiento SEO?', a: 'El servicio de SEO cuesta S/ 1,800 al mes e incluye auditoría, planificación, optimización on-page, escalamiento y reporte mensual. Sin contratos forzosos y con resultados progresivos. Los montos indicados son referenciales.' },
      { q: '¿Cuánto debo invertir en pauta de Google Ads?', a: 'Además del fee de gestión (desde S/ 1,800/mes), recomendamos un presupuesto mínimo de pauta de S/ 1,500/mes, que se paga directamente a Google. Los montos indicados son referenciales.' },
      { q: '¿Los precios incluyen IGV? ¿Hay contratos forzosos?', a: 'Los precios son netos en soles peruanos; las facturas en Perú suman 18% de IGV. No trabajamos con contratos forzosos: el servicio es mensual, con reportes y resultados progresivos.' },
    ],
  },
  en: {
    hero: 'Digital Marketing Pricing for US Clients',
    // 28-ago-2026. Esta página seguía vendiendo branding, social media y Google
    // Ads en EE.UU. La decisión comercial del 12-ago es que allí se venden TRES
    // servicios —web, SEO y tiendas online— y ya está aplicada en el menú, el
    // pie, el sitemap y el `noindex` de esas páginas. /en/pricing y /us/precios
    // eran el último sitio donde no se había aplicado: la web ofrecía un
    // catálogo que ella misma pide no indexar. Los servicios retirados siguen
    // vivos y con precio en /es/precios, que es donde sí se venden.
    sub: 'SEO $500/month, websites from $850 USD and online stores from $1,750 USD. Net prices in US Dollars for clients based in the United States.',
    contactCta: 'Let’s talk about your project',
    contactPath: '/#contact',
    note: 'No mandatory contracts, monthly reports and progressive results. Prices shown are reference packages; each proposal is tailored after an initial meeting.',
    tiers: [
      { name: 'SEO positioning', price: '$500 USD', period: '/ month', desc: 'Audit, planning, optimization, scaling and monthly reports. Continuous strategy with no mandatory contracts and progressive results.', feats: ['Initial audit','Planning','On-page optimization','Scaling','Monthly report'], href: '/posicionamiento-seo', cta: 'See SEO', highlight: true },
    ],
    webTitle: 'Web design & development',
    webNote: 'Custom quote after initial meeting. Each proposal includes Figma design, responsive development, basic technical SEO, contact form and Google Analytics integration. First year includes domain, SSL and hosting. Prices are referential and vary based on project scope.',
    webTiers: [
      { name: 'Professional landing page', price: 'from $850 USD', desc: 'Custom landing page design with basic technical SEO and contact form.' },
      { name: 'Corporate website', price: 'from $1,200 USD', desc: '5–8 section corporate site. Range $1,200–$2,400 depending on scope.' },
      { name: 'E-commerce Shopify / WooCommerce', price: 'from $1,750 USD', desc: 'Online store with catalog, payment gateway, inventory management and admin panel.' },
    ],
    refTitle: 'Reference monthly investment',
    refList: [
      { t: 'Startups', d: '$750 – $1,400 / month (covers social + basic Ads)' },
      { t: 'SMBs', d: '$1,500 – $3,600 / month (full strategy with social, Ads, SEO and web improvements)' },
      { t: 'Mid-market', d: '$3,600 – $9,000 / month (full marketing with content production and CRO)' },
    ],
    refNote: 'What matters is not the budget but that ROI turns positive from month 3. Prices are referential and vary based on project scope.',
    contact: 'Need a different mix for your project?',
    contactDesc: 'Tell us your goal and we build a custom proposal in the first meeting.',
    faqTitle: 'Pricing frequently asked questions',
    faqs: [
      { q: 'How much does a digital marketing agency cost?', a: 'It depends on the mix of services. Reference monthly ranges: startups $750–$1,400, SMBs $1,500–$3,600 and mid-market $3,600–$9,000. In the United States we sell three services: SEO at $500/month, websites from $850 and online stores from $1,750. Figures shown are for reference only.' },
      { q: 'How much does an online store or e-commerce cost?', a: 'An online store on Shopify or WooCommerce starts from $1,750 USD, with catalog, payment gateway, inventory management and admin panel. Figures shown are for reference only.' },
      { q: 'How much does SEO positioning cost?', a: 'SEO costs $500 USD per month and includes audit, planning, on-page optimization, scaling and a monthly report. No mandatory contracts and progressive results. Figures shown are for reference only.' },
      { q: 'Do you handle branding, social media or Google Ads for U.S. clients?', a: 'In the United States we focus on three services: websites, SEO and online stores. Branding, social media and paid media are not what we lead with for U.S. clients, and we would rather say so than sell a service we are not focused on for this market.' },
      { q: 'Are prices final? Are there mandatory contracts?', a: 'Prices are net; each proposal is tailored after an initial meeting. We do not use mandatory contracts: the service is monthly, with reports and progressive results.' },
    ],
  },
  // es-US: mismo idioma que Perú, mercado y moneda distintos. Sin IGV, sin
  // pasarelas peruanas y con los precios en dólares del bloque 'en'.
  us: {
    hero: 'Precios de Marketing Digital para Negocios en Estados Unidos',
    sub: 'SEO $500/mes, páginas web desde $850 y tiendas online desde $1,750. Precios netos en dólares para clientes en Estados Unidos.',
    contactCta: 'Conversemos sobre tu proyecto',
    contactPath: '/#contacto',
    note: 'Sin contratos forzosos, con reportes mensuales y resultados progresivos. Los precios son referenciales según paquetes base; cada propuesta se ajusta tras una reunión inicial.',
    tiers: [
      { name: 'Posicionamiento SEO', price: '$500', period: '/ mes', desc: 'Auditoría, planificación, optimización, escalamiento y reportes mensuales. Estrategia continua sin contratos forzosos.', feats: ['Auditoría inicial','Planificación','Optimización on-page','Escalamiento','Reporte mensual'], href: '/posicionamiento-seo', cta: 'Ver SEO', highlight: true },
    ],
    webTitle: 'Diseño y desarrollo web',
    webNote: 'Cotización a medida tras reunión inicial. Cada propuesta incluye diseño en Figma, desarrollo responsive, SEO técnico básico, formulario de contacto y conexión a Google Analytics. El primer año incluye dominio, SSL y hosting. Los precios son referenciales y varían según el alcance del proyecto.',
    webTiers: [
      { name: 'Landing page profesional', price: 'desde $850', desc: 'Landing page con diseño a medida, SEO técnico básico y formulario de contacto.' },
      { name: 'Web corporativa', price: 'desde $1,200', desc: 'Sitio corporativo con 5–8 secciones. Rango $1,200–$2,400 según alcance.' },
      { name: 'E-commerce Shopify / WooCommerce', price: 'desde $1,750', desc: 'Tienda online con catálogo, pasarela de pago, gestión de inventario y panel de administración.' },
    ],
    refTitle: 'Inversión mensual de referencia',
    refList: [
      { t: 'Negocios que empiezan', d: '$750 – $1,400 / mes (cubre redes + Ads básico)' },
      { t: 'Pequeñas y medianas empresas', d: '$1,500 – $3,600 / mes (estrategia integral con redes, Ads, SEO y mejoras web)' },
      { t: 'Empresas medianas', d: '$3,600 – $9,000 / mes (marketing completo con producción de contenido y CRO)' },
    ],
    refNote: 'Lo importante no es el presupuesto sino que el ROI sea positivo desde el mes 3. Los precios son referenciales y varían según el alcance del proyecto.',
    contact: '¿Tu proyecto necesita un mix distinto?',
    contactDesc: 'Cuéntanos tu objetivo y armamos una cotización personalizada en la primera reunión.',
    faqTitle: 'Preguntas frecuentes sobre precios',
    faqs: [
      { q: '¿Cuánto cuesta contratar una agencia de marketing digital?', a: 'Depende del mix de servicios. Como referencia mensual: negocios que empiezan $750–$1,400, pymes $1,500–$3,600 y empresas medianas $3,600–$9,000. En Estados Unidos vendemos tres servicios: SEO a $500/mes, páginas web desde $850 y tiendas online desde $1,750. Los montos indicados son referenciales.' },
      { q: '¿Cuánto cuesta crear una tienda online?', a: 'Una tienda completa en Shopify o WooCommerce arranca desde $1,750, con catálogo, pasarela de pago, gestión de inventario y panel de administración. Los montos indicados son referenciales.' },
      { q: '¿Cuánto cuesta el posicionamiento SEO?', a: 'El servicio de SEO cuesta $500 al mes e incluye auditoría, planificación, optimización on-page, escalamiento y reporte mensual. Sin contratos forzosos y con resultados progresivos. Los montos indicados son referenciales.' },
      { q: '¿Hacen branding, redes sociales o Google Ads para clientes en Estados Unidos?', a: 'En Estados Unidos nos centramos en tres servicios: páginas web, posicionamiento SEO y tiendas online. Branding, redes sociales y medios pagados forman parte de nuestro catálogo en Perú, y preferimos decirlo antes que vender un servicio en el que no estamos enfocados para este mercado.' },
      { q: '¿Los precios son finales? ¿Hay contratos forzosos?', a: 'Los precios son netos en dólares y cada propuesta se ajusta tras una reunión inicial. No trabajamos con contratos forzosos: el servicio es mensual, con reportes y resultados progresivos.' },
    ],
  }
}

export default async function PreciosPage({ params }: Props) {
  const { locale } = await params
  // Renderizado estático: sin esto next-intl marca la ruta como dinámica y
  // Vercel devuelve `no-store` en cada visita.
  setRequestLocale(locale);

  const t = (COPY as any)[locale === 'en' ? 'en' : locale === 'us' ? 'us' : 'es']
  const isEn = locale === 'en'
  const faqSchema = buildFAQPageSchema((t.faqs || []).map((f: any) => ({ question: f.q, answer: f.a })))

  // Rediseño aprobado (mix 18-ago): es sirve el prototipo; us y en, su versión propia
  if (locale === 'es') {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <ProtoPage frag="precios" />
      </>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="px-6 md:px-10 lg:px-20 pt-32 pb-12 max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">3R Core · {isEn ? 'Pricing' : 'Precios'}</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{t.hero}</h1>
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-4">{t.sub}</p>
        <p className="text-sm text-white/50 max-w-3xl mb-6">{t.note}</p>
        <Link
          href="/cotizar"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition"
        >
          {isEn ? 'Calculate your estimate' : 'Calcula tu estimado'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7h12M13 7L8 2M13 7l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

      <section className="px-6 md:px-10 lg:px-20 pb-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.tiers.map((tier: any, i: number) => (
            <div key={i} className={`pricing-card border rounded-2xl p-6 flex flex-col ${tier.highlight ? 'border-white bg-white/5' : 'border-white/10'}`}>
              <h3 className="text-xl font-semibold mb-1">{tier.name}</h3>
              <p className="text-2xl font-bold mb-1">{tier.price}</p>
              <p className="text-base text-white/60 mb-2">{tier.period}</p>
              {tier.extra && <p className="text-xs text-white/60 mb-3">{tier.extra}</p>}
              <p className="text-white/70 mb-4 text-sm">{tier.desc}</p>
              <ul className="text-sm text-white/80 mb-6 space-y-1 flex-1">
                {tier.feats.map((f: string, j: number) => (
                  <li key={j}>· {f}</li>
                ))}
              </ul>
              <Link href={tier.href as AppPathname} className="text-center bg-white text-black px-5 py-3 rounded-full font-semibold hover:bg-white/90 transition mt-auto">{tier.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.webTitle}</h2>
        <p className="text-white/70 max-w-3xl mb-8">{t.webNote}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {t.webTiers.map((wt: any, i: number) => (
            <div key={i} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">{wt.name}</h3>
              <p className="text-2xl font-bold mb-3">{wt.price}</p>
              <p className="text-sm text-white/70">{wt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.refTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {t.refList.map((r: any, i: number) => (
            <div key={i} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">{r.t}</h3>
              <p className="text-sm text-white/70">{r.d}</p>
            </div>
          ))}
        </div>
        <p className="text-white/60 italic max-w-3xl">{t.refNote}</p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.faqTitle}</h2>
        <div className="space-y-4 max-w-4xl">
          {t.faqs.map((f: any, i: number) => (
            <details key={i} className="group border border-white/10 rounded-2xl p-6">
              <summary className="cursor-pointer list-none font-semibold text-lg flex justify-between items-center gap-4">
                {f.q}
                <span className="text-white/40 group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <p className="text-white/70 mt-4 text-sm leading-relaxed faq-answer">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-20 max-w-6xl mx-auto border-t border-white/10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact}</h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">{t.contactDesc}</p>
        <Link href={t.contactPath as AppPathname} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.contactCta}</Link>
      </section>
    </main>
  )
}
