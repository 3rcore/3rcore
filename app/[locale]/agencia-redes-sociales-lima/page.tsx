import Link from "next/link"
import { setRequestLocale } from "next-intl/server"

interface Props { params: Promise<{ locale: string }> }

const COPY = {
  es: {
    eyebrow: '3R Core · Redes Sociales · Lima · Perú',
    h1: 'Agencia de Redes Sociales en Lima, Perú',
    sub: 'Estrategia, contenido en formato Reel y TikTok, community management diario y pauta en Meta y TikTok Ads. Producción incluida desde S/1,500/mes. Los montos indicados son referenciales.',
    cta: 'Cotizar manejo de redes',
    contactPath: '/#contacto',
    why: 'Producción real, no plantillas recicladas',
    whyDesc: 'Producimos contenido original mes a mes: grabamos en tu local, en exteriores de Lima o en estudio. Reels y TikToks con hook fuerte en los primeros 3 segundos, no carruseles de stock con tipografías genéricas.',
    plans: 'Planes mensuales',
    plansList: [
      { title: 'Starter', price: 'Desde S/1,500/mes', desc: '8 piezas mensuales, 1 red social, 2 Reels o TikToks, community management de lunes a viernes, reporte mensual.' },
      { title: 'Growth', price: 'Desde S/2,800/mes', desc: '12–15 piezas, 2 redes, 4 Reels/TikToks, sesión mensual de fotos, community 7 días, reporte mensual con insights.' },
      { title: 'Premium', price: 'Desde S/4,500/mes', desc: '20+ piezas, 3 redes, 6–8 videos cortos con grabación en locación, copywriting senior, community 7 días, dashboard tiempo real.' },
    ],
    plansNote: 'Los precios son referenciales y varían según el alcance del proyecto.',
    deliverables: 'Qué entregamos cada mes',
    deliverablesList: [
      'Plan editorial 30 días aprobado por adelantado',
      'Piezas estáticas y carruseles en Figma/Photoshop',
      'Reels y TikToks con guion, grabación, edición y captions',
      'Copywriting con hooks, CTAs y hashtags por pieza',
      'Programación con Meta Business Suite o Metricool',
      'Community management con tiempos de respuesta < 4 h',
      'Reporte mensual + call de 30 min con conclusiones',
    ],
    paid: 'Pauta Meta Ads + TikTok Ads',
    paidDesc: 'Si quieres pasar de orgánico a leads/ventas, sumamos pauta con pixel y CAPI bien configurados, audiencias lookalike, advantage+ y A/B testing semanal de creativos. Fee desde S/1,500/mes adicional, mínimo recomendado S/1,500 de inversión publicitaria mensual. Los montos indicados son referenciales.',
    industries: 'Industrias con casos en Lima',
    industriesList: ['Gastronomía', 'Moda y belleza', 'Inmobiliario', 'Educación', 'Salud y wellness', 'Retail', 'B2B y servicios', 'Eventos'],
    contact: 'Solicita propuesta personalizada',
    contactCta: 'Cuéntanos sobre tu marca, objetivos y rubro. En 48 h te enviamos propuesta con plan editorial muestra, estilo visual y precio cerrado.',
  },
  en: {
    eyebrow: '3R Core · Social Media · Lima · Peru',
    h1: 'Social Media Agency in Lima, Peru',
    sub: 'Strategy, Reel and TikTok content, daily community management and Meta + TikTok Ads. Production included from $800/month for US clients.',
    cta: 'Get a social media quote',
    contactPath: '/#contacto',
    why: 'Real production, not recycled templates',
    whyDesc: 'We shoot original content every month: at your venue, on location in Lima or in studio. Reels and TikToks with a hook in the first 3 seconds, not stock carousels with generic typography.',
    plans: 'Monthly plans',
    plansList: [
      { title: 'Starter', price: 'From $800/mo', desc: '8 monthly pieces, 1 network, 2 Reels or TikToks, community management Mon-Fri, monthly report.' },
      { title: 'Growth', price: 'From $1,400/mo', desc: '12–15 pieces, 2 networks, 4 Reels/TikToks, monthly photo session, community 7 days, monthly report with insights.' },
      { title: 'Premium', price: 'From $2,200/mo', desc: '20+ pieces, 3 networks, 6–8 short videos with on-location shoot, senior copywriting, community 7 days, real-time dashboard.' },
    ],
    deliverables: 'What we deliver every month',
    deliverablesList: [
      '30-day editorial plan approved in advance',
      'Static pieces and carousels in Figma/Photoshop',
      'Reels and TikToks with script, shoot, edit and captions',
      'Copywriting with hooks, CTAs and hashtags per piece',
      'Scheduling with Meta Business Suite or Metricool',
      'Community management with < 4 h response time',
      'Monthly report + 30-min review call',
    ],
    paid: 'Paid: Meta Ads + TikTok Ads',
    paidDesc: 'If you want to move from organic to leads/sales, we add paid distribution with proper pixel and CAPI, lookalike audiences, advantage+ and weekly A/B creative testing. Management fee from $800/month on top, recommended minimum $400 monthly ad spend.',
    industries: 'Industries with Lima case studies',
    industriesList: ['Food & beverage', 'Fashion & beauty', 'Real estate', 'Education', 'Healthcare & wellness', 'Retail', 'B2B & services', 'Events'],
    contact: 'Request a custom proposal',
    contactCta: 'Tell us about your brand, goals and industry. In 48 h we send a proposal with sample editorial plan, visual style and closed pricing.',
  },
}

export default async function RedesSocialesLimaPage({ params }: Props) {
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
        <p className="sm-intro text-lg md:text-xl text-white/80 max-w-3xl mb-10">{t.sub}</p>
        <Link href={`/${locale}${t.contactPath}`} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</Link>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.why}</h2>
        <p className="text-white/70 max-w-3xl">{t.whyDesc}</p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.plans}</h2>
        <ul className="grid md:grid-cols-3 gap-4">
          {t.plansList.map((p: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">{p.price}</p>
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-white/70">{p.desc}</p>
            </li>
          ))}
        </ul>
        {t.plansNote && <p className="text-white/60 mt-6 max-w-3xl">{t.plansNote}</p>}
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.deliverables}</h2>
        <ul className="space-y-2 text-white/80 max-w-3xl">
          {t.deliverablesList.map((d: string, i: number) => (
            <li key={i} className="border-l-2 border-white/20 pl-4">{d}</li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.paid}</h2>
        <p className="text-white/70 max-w-3xl">{t.paidDesc}</p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.industries}</h2>
        <ul className="flex flex-wrap gap-2">
          {t.industriesList.map((s: string, i: number) => (
            <li key={i} className="px-4 py-2 border border-white/15 rounded-full text-sm text-white/80">{s}</li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-20 max-w-6xl mx-auto border-t border-white/10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.contact}</h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">{t.contactCta}</p>
        <Link href={`/${locale}${t.contactPath}`} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</Link>
      </section>
    </main>
  )
}
