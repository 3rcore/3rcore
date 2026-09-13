import Link from "next/link"
import { setRequestLocale } from "next-intl/server"

interface Props { params: Promise<{ locale: string }> }

const COPY = {
  es: {
    eyebrow: '3R Core · Google Ads · Lima · Perú',
    h1: 'Agencia Google Ads en Lima, Perú',
    sub: 'Campañas Search, Performance Max, YouTube, Display y Shopping con tracking real de conversiones y reportes Looker Studio en tiempo real. Fee desde S/1,800/mes. Los montos indicados son referenciales.',
    cta: 'Auditoría gratuita de tu cuenta',
    contactPath: '/#contacto',
    why: 'Una cuenta Google Ads sin tracking serio es dinero quemado',
    whyDesc: 'Antes de lanzar pauta validamos tu medición: GA4, Google Tag Manager, conversiones offline, enhanced conversions, eventos clave y deduplicación. Sin tracking sólido cualquier optimización es ruido.',
    formats: 'Formatos que gestionamos',
    formatsList: [
      { title: 'Search', desc: 'Campañas por intención de búsqueda con grupos de anuncios temáticos, ad copy dinámico y palabras clave negativas curadas semanalmente.' },
      { title: 'Performance Max', desc: 'Multicanal automatizado con feeds, audience signals personalizadas, asset groups por línea de producto y exclusión de marca cuando aplica.' },
      { title: 'YouTube y Video', desc: 'Skippable in-stream, bumpers, in-feed y Shorts. Producción y adaptación de creativos para verticales 9:16, 1:1 y 16:9.' },
      { title: 'Display y Remarketing', desc: 'Audiencias de remarketing por etapa del funnel, exclusiones cruzadas, frequency cap y placements premium.' },
      { title: 'Google Shopping', desc: 'Configuración Merchant Center, optimización de feed, validación GTIN/condición/impuestos y disapprovals resueltos.' },
      { title: 'Local Search Ads', desc: 'Anuncios en Google Maps para negocios físicos en Lima con call tracking y direcciones a tienda.' },
    ],
    method: 'Cómo trabajamos cada mes',
    methodList: [
      { step: 'Semana 1', title: 'Diagnóstico y setup', desc: 'Auditoría completa, definición de KPIs, conversiones, audiencias semilla, estructura de campañas y plan de testing.' },
      { step: 'Semana 2-3', title: 'Lanzamiento y aprendizaje', desc: 'Activación, monitoreo diario de search terms, ajustes de bid strategy y exclusiones de palabras clave.' },
      { step: 'Semana 4', title: 'Optimización profunda', desc: 'Análisis por dispositivo, geo, hora, audiencia y dispositivo. Reasignación de presupuestos por ROAS/CPA real.' },
      { step: 'Mensual', title: 'Reporte y plan siguiente mes', desc: 'Dashboard Looker Studio + call de 45 min con insights, hipótesis y plan de los próximos 30 días.' },
    ],
    industries: 'Verticales con experiencia documentada',
    industriesList: ['Inmobiliario', 'Educación', 'Salud y clínicas', 'Legal', 'Retail y e-commerce', 'Servicios profesionales', 'Restaurantes', 'B2B SaaS'],
    transparency: 'Política de transparencia',
    transparencyDesc: 'La cuenta Google Ads es tuya. Te damos acceso de administrador desde el día uno y la billing va con tu tarjeta o factura electrónica directa con Google. Si algún día decides cambiar de agencia, te llevas todo: cuenta, audiencias, conversiones e histórico.',
    contact: 'Solicita auditoría gratuita en 48 h',
    contactCta: 'Compártenos acceso de lectura a Google Ads y GA4 o el ID de tu cuenta. En 48 h te enviamos auditoría con quickwins, gaps frente a competencia y propuesta personalizada.',
  },
  en: {
    eyebrow: '3R Core · Google Ads · Lima · Peru',
    h1: 'Google Ads Agency in Lima, Peru',
    sub: 'Search, Performance Max, YouTube, Display and Shopping campaigns with real conversion tracking and real-time Looker Studio reporting. Fee from $800/month for US clients.',
    cta: 'Free account audit',
    contactPath: '/#contacto',
    why: 'A Google Ads account without serious tracking is burned money',
    whyDesc: 'Before spending media we validate measurement: GA4, Google Tag Manager, offline conversions, enhanced conversions, key events and deduplication. Without solid tracking every optimization is noise.',
    formats: 'Formats we manage',
    formatsList: [
      { title: 'Search', desc: 'Intent-based campaigns with thematic ad groups, dynamic ad copy and negative keywords curated weekly.' },
      { title: 'Performance Max', desc: 'Automated multichannel with feeds, custom audience signals, asset groups by product line and brand exclusions when needed.' },
      { title: 'YouTube & Video', desc: 'Skippable in-stream, bumpers, in-feed and Shorts. Creative production and adaptation for 9:16, 1:1 and 16:9 verticals.' },
      { title: 'Display & Remarketing', desc: 'Funnel-stage remarketing audiences, cross-exclusions, frequency cap and premium placements.' },
      { title: 'Google Shopping', desc: 'Merchant Center setup, feed optimization, GTIN/condition/tax validation and disapprovals resolved.' },
      { title: 'Local Search Ads', desc: 'Google Maps ads for physical businesses in Lima with call tracking and directions to store.' },
    ],
    method: 'How we operate each month',
    methodList: [
      { step: 'Week 1', title: 'Diagnosis & setup', desc: 'Full audit, KPI definition, conversions, seed audiences, campaign structure and testing plan.' },
      { step: 'Week 2-3', title: 'Launch & learning', desc: 'Activation, daily search-term monitoring, bid strategy adjustments and negative keywords expansion.' },
      { step: 'Week 4', title: 'Deep optimization', desc: 'Device, geo, time, audience and creative analysis. Budget reallocation by real ROAS/CPA.' },
      { step: 'Monthly', title: 'Report & next-month plan', desc: 'Looker Studio dashboard + 45-min call with insights, hypotheses and 30-day plan.' },
    ],
    industries: 'Verticals with documented experience',
    industriesList: ['Real estate', 'Education', 'Healthcare & clinics', 'Legal', 'Retail & e-commerce', 'Professional services', 'Restaurants', 'B2B SaaS'],
    transparency: 'Transparency policy',
    transparencyDesc: 'The Google Ads account is yours. We grant you admin access from day one and billing goes on your own card or Google electronic invoice. If you ever switch agency, you keep everything: account, audiences, conversions and history.',
    contact: 'Request a free audit within 48 h',
    contactCta: 'Share read-only access to your Google Ads and GA4 or your account ID. In 48 h we deliver an audit with quickwins, gaps vs competitors and a tailored proposal.',
  },
}

export default async function GoogleAdsLimaPage({ params }: Props) {
  const { locale } = await params
  // Renderizado estático: sin esto next-intl marca la ruta como dinámica y
  // Vercel devuelve `no-store` en cada visita.
  setRequestLocale(locale);

  const t = (COPY as any)[locale === 'en' ? 'en' : 'es']

  return (
    <main className="min-h-screen bg-black text-white">
      <h1 className="sr-only">{t.h1}</h1>
      <section className="px-6 md:px-10 lg:px-20 pt-32 pb-20 max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">{t.eyebrow}</p>
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{t.h1}</h2>
        <p className="ads-intro text-lg md:text-xl text-white/80 max-w-3xl mb-10">{t.sub}</p>
        <Link href={`/${locale}${t.contactPath}`} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</Link>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.why}</h2>
        <p className="text-white/70 max-w-3xl">{t.whyDesc}</p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.formats}</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {t.formatsList.map((p: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-white/70">{p.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.method}</h2>
        <ol className="grid md:grid-cols-2 gap-4">
          {t.methodList.map((m: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">{m.step}</p>
              <h3 className="text-xl font-semibold mb-2">{m.title}</h3>
              <p className="text-white/70">{m.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.industries}</h2>
        <ul className="flex flex-wrap gap-2">
          {t.industriesList.map((s: string, i: number) => (
            <li key={i} className="px-4 py-2 border border-white/15 rounded-full text-sm text-white/80">{s}</li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.transparency}</h2>
        <p className="text-white/70 max-w-3xl">{t.transparencyDesc}</p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-20 max-w-6xl mx-auto border-t border-white/10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.contact}</h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">{t.contactCta}</p>
        <Link href={`/${locale}${t.contactPath}`} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</Link>
      </section>
    </main>
  )
}
