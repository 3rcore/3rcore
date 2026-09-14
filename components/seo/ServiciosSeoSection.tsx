import { Link } from '@/i18n/navigation'
import type { AppPathname } from '@/i18n/routing'

/**
 * Bloque de contenido SSR del índice de servicios.
 *
 * Por qué existe: tras la consolidación de julio, `/es/agencia-marketing-digital-lima`
 * pasó a redirigir aquí — y esta página tenía 395 palabras. Es un índice, no una
 * página capaz de rankear para «agencia de marketing digital lima» (179
 * impresiones/trimestre en posición 68,7 y cero clics). Además Google no la
 * rastreaba desde el 23-jul.
 *
 * Este bloque hace tres cosas a la vez:
 *   1. La lleva de 395 a más de 1.200 palabras con contenido real, no relleno:
 *      precios publicados, plazos y a quién sirve cada servicio.
 *   2. Enlaza LAS DIECISÉIS páginas de servicio desde el índice. Cinco estaban
 *      huérfanas y Google nunca las había rastreado (`lastCrawlTime` vacío):
 *      meta-ads, relaciones-publicas, influencer-marketing, casos-de-exito y
 *      preguntas.
 *   3. Responde en pasajes autosuficientes las preguntas de dinero que ya
 *      rankean sin recibir clics («cuánto cuesta…», posiciones 3-11 con CTR 0%).
 *
 * Todo el contenido sale de datos ya publicados por el cliente en /es/precios.
 * Se renderiza en el servidor: los bots de IA no ejecutan JavaScript.
 */

type Row = { name: string; price: string; detail: string; href: AppPathname }

const COPY = {
  es: {
    h2Precios: 'Cuánto cuesta cada servicio de marketing digital en Lima',
    // Fuente: app/[locale]/precios/page.tsx → COPY.es.note y COPY.es.sub, literal.
    introPrecios:
      'Sin contratos forzosos, con reportes mensuales y resultados progresivos. Los precios son referenciales según paquetes base; cada propuesta se ajusta tras una reunión inicial. Son importes netos en soles peruanos: las facturas en Perú suman 18% de IGV.',
    // Fuente: COPY.es.tiers y COPY.es.webTiers de la página de precios.
    rows: [
      { name: 'Branding inicial', price: 'desde S/ 500', detail: 'Diseño de identidad visual con entrega de propuesta tras sesión inicial de descubrimiento: logotipo, manual de marca, paleta cromática, tipografía corporativa y aplicaciones esenciales.', href: '/servicios/branding' },
      { name: 'Social Media', price: 'desde S/ 1,500 / mes', detail: 'Manejo de TikTok, Instagram, Facebook y LinkedIn con 8–12 piezas mensuales, Reels y TikToks editados, community management y reporte mensual.', href: '/servicios/socialmedia' },
      { name: 'Posicionamiento SEO', price: 'S/ 1,800 / mes', detail: 'Auditoría inicial, planificación, optimización on-page, escalamiento y reporte mensual. Estrategia continua sin contratos forzosos y con resultados progresivos.', href: '/posicionamiento-seo' },
      { name: 'Google Ads gestión', price: 'desde S/ 1,800 / mes', detail: 'Fee de gestión de campañas Search, Performance Max, YouTube, Display, Shopping y Remarketing, con tracking de conversiones y reporte mensual. Aparte va un presupuesto mínimo de pauta de S/ 1,500/mes pagado directamente a Google.', href: '/servicios/google-ads' },
      { name: 'Landing page profesional', price: 'desde S/ 1,800', detail: 'Landing page con diseño a medida, SEO técnico básico y formulario de contacto. Una web corporativa de 5 a 8 secciones va de S/ 4,500 a S/ 9,000 según alcance.', href: '/servicios/web-development' },
      { name: 'E-commerce Shopify / WooCommerce', price: 'desde S/ 6,500', detail: 'Tienda online con catálogo, pasarela de pago (Culqi, Niubiz, Izipay o Mercado Pago), gestión de inventario y panel de administración.', href: '/tiendas-virtuales-lima' },
    ] as Row[],
    // Fuente: COPY.es.refTitle / refList / refNote de la página de precios, literal.
    presupuestoH3: 'Inversión mensual de referencia para Lima',
    presupuesto:
      'Emprendimientos, de S/ 2,500 a 4,500 al mes, que cubre redes más Ads básico. Pymes, de S/ 5,000 a 12,000, ya con estrategia integral de redes, Ads, SEO y mejoras web. Empresas medianas, de S/ 12,000 a 30,000, con marketing completo, producción de contenido y CRO. Lo importante no es el presupuesto sino que el ROI sea positivo desde el mes 3. Los montos indicados son referenciales.',
    h2Especialidad: 'Servicios de captación por canal',
    introEspecialidad:
      'Cada canal se contrata por separado o dentro de una estrategia conjunta. En la página de cada uno está el detalle de qué incluye.',
    // Fuente: la descripción de metadata / el schema de servicio de cada página.
    canales: [
      { name: 'Meta Ads (Facebook e Instagram)', detail: 'Prospección, retargeting, catálogos y mensajes a WhatsApp, con ROAS medible y reportes mensuales.', href: '/servicios/meta-ads' },
      { name: 'TikTok Ads', detail: 'Spark Ads, video nativo, contenido UGC, retargeting y medición con el TikTok Pixel.', href: '/servicios/tiktok-ads' },
      { name: 'Performance marketing', detail: 'Google Ads, Meta Ads y TikTok Ads coordinados, medición end-to-end, CRO y gestión por CAC, ROAS y LTV.', href: '/servicios/performance-marketing' },
      { name: 'Email marketing y automatización', detail: 'Flujos de bienvenida, recuperación de carritos, newsletters, segmentación y automatización con CRM.', href: '/servicios/email-marketing' },
      { name: 'Contenido UGC', detail: 'Producción de video con creadores propios: definición de ángulos de venta y guion por pieza.', href: '/servicios/ugc' },
      { name: 'Influencer marketing', detail: 'Selección de creadores por datos de audiencia, negociación de tarifas y medición del resultado.', href: '/servicios/influencer-marketing' },
      { name: 'Relaciones públicas', detail: 'Mapa de medios por relevancia comercial, identificación del ángulo noticiable y gestión de la publicación.', href: '/servicios/relaciones-publicas' },
    ] as { name: string; detail: string; href: AppPathname }[],
    h2Sectores: 'Marketing digital por sector',
    introSectores:
      'Tres sectores tienen página propia porque su embudo y su coste por contacto no se parecen al resto.',
    sectores: [
      { name: 'Clínicas y consultorios', detail: 'Google Ads de salud, SEO local, Google Business Profile y captación de pacientes con citas medibles.', href: '/servicios/marketing-clinicas' },
      { name: 'Inmobiliarias y proyectos', detail: 'Meta Ads y Google Ads para captar leads, landing por proyecto, CRM y seguimiento por WhatsApp con costo por lead medible.', href: '/servicios/marketing-inmobiliarias' },
      { name: 'E-commerce y tiendas online', detail: 'Google Shopping y Performance Max, Meta Ads con catálogo, email marketing y CRO sobre Shopify, WooCommerce o VTEX.', href: '/servicios/marketing-ecommerce' },
      { name: 'Clínicas dentales', detail: 'Google Ads de salud por tratamiento, ficha de Google, SEO local y landing por implantes, ortodoncia o blanqueamiento. Se reporta en citas agendadas.', href: '/servicios/marketing-clinicas-dentales' },
      { name: 'Clínicas estéticas', detail: 'Instagram y TikTok como canal principal, Meta Ads dentro de las reglas de la categoría, y Google Ads para los tratamientos que sí se buscan por su nombre.', href: '/servicios/marketing-clinicas-esteticas' },
      { name: 'Veterinarias', detail: 'Ficha de Google Business Profile, SEO local por distrito y páginas por servicio con precio. En este rubro la decisión se toma en el mapa.', href: '/servicios/marketing-veterinarias' },
      { name: 'Estudios de abogados', detail: 'Captación de casos por área de práctica con Google Ads de alta intención, SEO local y landing por especialidad.', href: '/servicios/marketing-abogados' },
    ] as { name: string; detail: string; href: AppPathname }[],
    h2Como: 'Quiénes somos',
    // Fuente: messages/es.json → FAQ.faqs.q2 y q1, literal.
    como:
      'Somos un equipo de profesionales y nativos digitales con una visión de 3 generaciones. Conjugamos la experiencia, la visión estratégica y la tecnología para crear estrategias personalizadas que potencian el crecimiento real de tu empresa. Somos una agencia de marketing digital integral que ofrece Branding Corporativo, Gestión de Redes Sociales, Desarrollo Web y E-commerce sobre Shopify y WooCommerce, Google Ads (SEM) y Posicionamiento SEO, con oficina en La Molina, Lima, y atención tanto en Perú como en EE.UU.',
    verMas: 'Ver el detalle',
    linksH3: 'Antes de decidir',
    links: [
      { name: 'Casos de éxito', detail: 'Proyectos de clientes publicados por la agencia.', href: '/casos-de-exito' },
      { name: 'Preguntas frecuentes', detail: 'Servicios, plataformas, ubicación y horario.', href: '/preguntas' },
      { name: 'Precios completos', detail: 'La tabla entera con planes, extras y presupuestos mensuales de referencia.', href: '/precios' },
      { name: 'Cotizador online', detail: 'Un estimado de tu proyecto sin dejar el correo.', href: '/cotizar' },
    ] as { name: string; detail: string; href: AppPathname }[],
  },
  en: {
    h2Precios: 'What each digital marketing service costs',
    // Fuente: app/[locale]/precios/page.tsx → COPY.en.note y COPY.en.sub, literal.
    introPrecios:
      'No mandatory contracts, monthly reports and progressive results. Prices shown are reference packages; each proposal is tailored after an initial meeting. Net prices in US Dollars for clients based in the United States.',
    rows: [
      { name: 'Starter branding', price: 'from $500 USD', detail: 'Visual identity design — logo, brand manual, color palette, corporate typography and essential applications. Detailed proposal after an initial discovery session.', href: '/servicios/branding' },
      { name: 'Social media', price: '$800 USD / month', detail: 'TikTok, Instagram, Facebook and LinkedIn management with 8–12 pieces per month, edited Reels and TikToks, community management and a monthly report.', href: '/servicios/socialmedia' },
      { name: 'SEO positioning', price: '$500 USD / month', detail: 'Audit, planning, on-page optimization, scaling and monthly reports. Continuous strategy with no mandatory contracts and progressive results.', href: '/posicionamiento-seo' },
      { name: 'Google Ads management', price: '$800 USD / month', detail: 'Management fee for Search, Performance Max, YouTube, Display, Shopping and Remarketing campaigns, plus a minimum ad spend of $400/month paid directly to Google.', href: '/servicios/google-ads' },
      { name: 'Professional landing page', price: 'from $850 USD', detail: 'Custom landing page design with basic technical SEO and contact form. A 5–8 section corporate site ranges from $1,200 to $2,400 depending on scope.', href: '/servicios/web-development' },
      { name: 'E-commerce Shopify / WooCommerce', price: 'from $1,750 USD', detail: 'Online store with catalog, payment gateway, inventory management and admin panel.', href: '/tiendas-virtuales-lima' },
    ] as Row[],
    // Fuente: COPY.en.refList / refNote de la página de precios, literal.
    presupuestoH3: 'Reference monthly investment',
    presupuesto:
      'Startups, $750 to $1,400 a month, covering social plus basic Ads. SMBs, $1,500 to $3,600, with a full strategy across social, Ads, SEO and web improvements. Mid-market, $3,600 to $9,000, with full marketing, content production and CRO. What matters is not the budget but that ROI turns positive from month 3. Figures shown are for reference only.',
    h2Especialidad: 'Acquisition services by channel',
    introEspecialidad:
      'Each channel can be hired on its own or inside a joint strategy. Every service page carries the full scope.',
    canales: [
      { name: 'Meta Ads (Facebook and Instagram)', detail: 'Prospecting, retargeting, catalogs and click-to-WhatsApp, with measurable ROAS and monthly reports.', href: '/servicios/meta-ads' },
      { name: 'TikTok Ads', detail: 'Spark Ads, native video, UGC content, retargeting and measurement with the TikTok Pixel.', href: '/servicios/tiktok-ads' },
      { name: 'Performance marketing', detail: 'Google Ads, Meta Ads and TikTok Ads coordinated, end-to-end measurement, CRO and management by CAC, ROAS and LTV.', href: '/servicios/performance-marketing' },
      { name: 'Email marketing and automation', detail: 'Welcome flows, cart recovery, newsletters, segmentation and CRM automation.', href: '/servicios/email-marketing' },
      { name: 'UGC content', detail: 'Video production with in-house creators: selling-angle research and per-asset scripting.', href: '/servicios/ugc' },
      { name: 'Influencer marketing', detail: 'Creator selection on audience data, rate negotiation and result measurement.', href: '/servicios/influencer-marketing' },
      { name: 'Public relations', detail: 'Media mapping by commercial relevance, newsworthy angle identification and placement.', href: '/servicios/relaciones-publicas' },
    ] as { name: string; detail: string; href: AppPathname }[],
    h2Sectores: 'Digital marketing by industry',
    introSectores:
      'Three industries have their own page because their funnel and cost per contact look nothing like the rest.',
    sectores: [
      { name: 'Clinics and medical practices', detail: 'Healthcare Google Ads, local SEO, Google Business Profile and bilingual patient acquisition campaigns.', href: '/servicios/marketing-clinicas' },
      { name: 'Real estate', detail: 'Meta and Google Ads for listings, CRM follow-up and measurable cost per qualified lead.', href: '/servicios/marketing-inmobiliarias' },
      { name: 'E-commerce', detail: 'Google Shopping, catalog feeds, email flows and CRO on Shopify, WooCommerce or VTEX.', href: '/servicios/marketing-ecommerce' },
    ] as { name: string; detail: string; href: AppPathname }[],
    h2Como: 'Who we are',
    // Fuente: messages/en.json → FAQ.faqs.q2 y q1, literal.
    como:
      'We are a team of professionals and digital natives with a 3-generation vision. We combine experience, strategic insight, and technology to create personalized strategies that drive real growth for your business. We are a full-service digital marketing agency offering Corporate Branding, Social Media Management, Web Development and E-commerce on Shopify and WooCommerce, Google Ads (SEM) and SEO Positioning, serving businesses across the United States.',
    verMas: 'See the details',
    linksH3: 'Before you decide',
    links: [
      { name: 'Case studies', detail: 'Client projects published by the agency.', href: '/casos-de-exito' },
      { name: 'FAQ', detail: 'Services, platforms, location and business hours.', href: '/preguntas' },
      { name: 'Full pricing', detail: 'The complete table with plans, add-ons and reference monthly budgets.', href: '/precios' },
      { name: 'Quote calculator', detail: 'An estimate for your project without leaving your email.', href: '/cotizar' },
    ] as { name: string; detail: string; href: AppPathname }[],
  },
}

export default function ServiciosSeoSection({ locale }: { locale: string }) {
  // /us es español pero factura en dólares: comparte el texto de /es salvo la
  // referencia de presupuesto, que allí se dice en dólares.
  const t = locale === 'en' ? COPY.en : COPY.es
  // /us es español pero factura en dólares: los rangos en soles de /es no le
  // corresponden y los de /en son de otro texto, así que no se le enseña ninguno.
  const isUs = locale === 'us'

  return (
    <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-tight">{t.h2Precios}</h2>
      <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-3xl mb-10">{t.introPrecios}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
        {t.rows.map((r) => (
          <div key={r.name} className="rounded-[18px] border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h3 className="text-base md:text-lg font-semibold text-white">{r.name}</h3>
              <span className="text-[#E91E63] font-bold text-sm whitespace-nowrap">{r.price}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">{r.detail}</p>
            <Link
              href={r.href}
              className="text-white/70 text-[11px] font-bold uppercase tracking-[0.18em] underline decoration-[#A21F8A]/50 underline-offset-4 hover:text-white transition-colors"
            >
              {t.verMas}
            </Link>
          </div>
        ))}
      </div>

      {!isUs && (
        <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-7 md:p-9 mb-16">
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-white">{t.presupuestoH3}</h3>
          <p className="text-white/55 text-sm md:text-base leading-relaxed">{t.presupuesto}</p>
        </div>
      )}

      <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-tight">{t.h2Especialidad}</h2>
      <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-3xl mb-10">{t.introEspecialidad}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {t.canales.map((c) => (
          <div key={c.name} className="rounded-[18px] border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-base font-semibold mb-2 text-white/90">{c.name}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-3">{c.detail}</p>
            <Link
              href={c.href}
              className="text-white/70 text-[11px] font-bold uppercase tracking-[0.18em] underline decoration-[#A21F8A]/50 underline-offset-4 hover:text-white transition-colors"
            >
              {t.verMas}
            </Link>
          </div>
        ))}
      </div>

      <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-tight">{t.h2Sectores}</h2>
      <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-3xl mb-10">{t.introSectores}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {t.sectores.map((c) => (
          <div key={c.name} className="rounded-[18px] border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-base font-semibold mb-2 text-white/90">{c.name}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-3">{c.detail}</p>
            <Link
              href={c.href}
              className="text-white/70 text-[11px] font-bold uppercase tracking-[0.18em] underline decoration-[#A21F8A]/50 underline-offset-4 hover:text-white transition-colors"
            >
              {t.verMas}
            </Link>
          </div>
        ))}
      </div>

      <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-7 md:p-9">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 text-white">{t.h2Como}</h2>
        <p className="text-white/55 text-sm md:text-base leading-relaxed mb-8">{t.como}</p>
        <h3 className="text-base font-semibold mb-4 text-white/90">{t.linksH3}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="block rounded-[14px] border border-white/10 p-4 hover:border-[#A21F8A]/50 transition-colors"
            >
              <span className="block text-white font-semibold text-sm mb-1">{l.name}</span>
              <span className="block text-white/45 text-xs leading-relaxed">{l.detail}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
