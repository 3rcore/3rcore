import Link from "next/link"
import { setRequestLocale } from "next-intl/server"

interface Props { params: Promise<{ locale: string }> }

const COPY = {
  es: {
    eyebrow: '3R Core · Branding · Lima · Perú',
    h1: 'Agencia de Branding en Lima, Perú',
    sub: 'Identidad de marca con propósito: investigación, naming, logotipo, paleta cromática, tipografía, manual de marca y aplicaciones reales. Desde S/500 hasta proyectos enterprise. Los montos indicados son referenciales.',
    cta: 'Cotiza tu branding',
    contactPath: '/#contacto',
    why: 'Branding con estrategia, no decoración',
    whyDesc: 'Antes de proponer un trazo entendemos quién eres, contra quién compites y a quién quieres atraer. El branding nace de un brief estratégico, no de Pinterest. Por eso tus piezas tienen sentido en la calle, en redes y en una venta cara a cara.',
    packs: 'Packs de branding',
    packsList: [
      { title: 'Logo express', price: 'Desde S/500', desc: 'Logotipo en versión principal + variantes (color, monocromo, isotipo), entrega en SVG/PNG/PDF, paleta básica y tipografías. 1 semana.' },
      { title: 'Branding básico', price: 'Desde S/1,800', desc: 'Logo, paleta primaria + secundaria, dos tipografías, mockups básicos y mini-manual PDF. 2–3 semanas.' },
      { title: 'Identidad completa', price: 'Desde S/4,500', desc: 'Research, naming opcional, sistema visual completo, manual extenso, aplicaciones (tarjetas, IG, papelería, vehículos, señalética) y handoff. 6–8 semanas.' },
      { title: 'Rebranding', price: 'Desde S/8,000', desc: 'Auditoría de marca actual, migración, plan de rollout, aplicaciones priorizadas, comunicado interno y externo. 10–14 semanas.' },
    ],
    packsNote: 'Los precios son referenciales y varían según el alcance del proyecto.',
    deliverables: 'Entregables por proyecto',
    deliverablesList: [
      'Brief estratégico y workshop con stakeholders',
      'Mapa de marca, propuesta de valor y arquetipo',
      'Naming con validación lingüística y marcaria (opcional)',
      'Logo construido en grilla con safety areas',
      'Paleta cromática primaria y secundaria',
      'Sistema tipográfico con jerarquías',
      'Manual de marca PDF + archivos editables',
      'Aplicaciones: redes, papelería, signage, merchandising',
    ],
    process: 'Cómo nace una identidad',
    processList: [
      { step: '01', title: 'Descubrimiento', desc: 'Workshop con fundadores y equipo, análisis de competencia y benchmarks internacionales relevantes.' },
      { step: '02', title: 'Estrategia', desc: 'Posicionamiento, arquetipo, voz y tono, propuesta de valor y territorios visuales.' },
      { step: '03', title: 'Concepto y diseño', desc: 'Dos rutas de concepto, exploración tipográfica, paleta y aplicaciones piloto. Revisión y refinamiento.' },
      { step: '04', title: 'Manual y handoff', desc: 'Documentación PDF, archivos editables, aplicaciones finales y sesión de capacitación al equipo del cliente.' },
    ],
    industries: 'Sectores donde más trabajamos en Lima',
    industriesList: ['Startups', 'Gastronomía', 'Inmobiliario', 'Moda y belleza', 'Educación', 'Industria y B2B', 'Servicios profesionales', 'Eventos y cultura'],
    contact: 'Pongamos en marcha tu marca',
    contactCta: 'Cuéntanos en qué etapa estás (marca nueva, rebranding, o renovación parcial). En 48 h te enviamos propuesta con alcance, timeline y precio cerrado.',
  },
  en: {
    eyebrow: '3R Core · Branding · Lima · Peru',
    h1: 'Branding Agency in Lima, Peru',
    sub: 'Brand identity with purpose: research, naming, logo, color palette, typography, brand manual and real applications. From $500 USD for US clients to enterprise projects.',
    cta: 'Get a branding quote',
    contactPath: '/#contacto',
    why: 'Branding with strategy, not decoration',
    whyDesc: 'Before proposing a single stroke we understand who you are, who you compete with and who you want to attract. Branding is born from a strategic brief, not Pinterest. That is why your pieces make sense on the street, on social media and in face-to-face sales.',
    packs: 'Branding packs',
    packsList: [
      { title: 'Express logo', price: 'From $500 USD', desc: 'Main logo + variants (color, monochrome, isotype), delivery in SVG/PNG/PDF, basic palette and typography. 1 week.' },
      { title: 'Basic branding', price: 'From $850 USD', desc: 'Logo, primary + secondary palette, two typefaces, basic mockups and mini-manual PDF. 2–3 weeks.' },
      { title: 'Full identity', price: 'From $1,500 USD', desc: 'Research, optional naming, complete visual system, extensive manual, applications (cards, IG, stationery, vehicles, signage) and handoff. 6–8 weeks.' },
      { title: 'Rebranding', price: 'From $2,500 USD', desc: 'Current brand audit, migration, rollout plan, prioritized applications, internal + external communication. 10–14 weeks.' },
    ],
    deliverables: 'Project deliverables',
    deliverablesList: [
      'Strategic brief and stakeholder workshop',
      'Brand map, value proposition and archetype',
      'Naming with linguistic and trademark validation (optional)',
      'Logo built on grid with safety areas',
      'Primary and secondary color palette',
      'Typographic system with hierarchies',
      'Brand manual PDF + editable files',
      'Applications: social media, stationery, signage, merchandising',
    ],
    process: 'How an identity is born',
    processList: [
      { step: '01', title: 'Discovery', desc: 'Workshop with founders and team, competition analysis and relevant international benchmarks.' },
      { step: '02', title: 'Strategy', desc: 'Positioning, archetype, voice and tone, value proposition and visual territories.' },
      { step: '03', title: 'Concept & design', desc: 'Two concept routes, typographic exploration, palette and pilot applications. Review and refinement.' },
      { step: '04', title: 'Manual & handoff', desc: 'PDF documentation, editable files, final applications and onboarding session with client team.' },
    ],
    industries: 'Sectors we work with most in Lima',
    industriesList: ['Startups', 'Food & beverage', 'Real estate', 'Fashion & beauty', 'Education', 'Industry & B2B', 'Professional services', 'Events & culture'],
    contact: 'Let’s launch your brand',
    contactCta: 'Tell us your stage (new brand, rebranding or partial refresh). In 48 h we send a proposal with scope, timeline and closed pricing.',
  },
}

export default async function AgenciaBrandingLimaPage({ params }: Props) {
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
        <p className="brand-intro text-lg md:text-xl text-white/80 max-w-3xl mb-10">{t.sub}</p>
        <Link href={`/${locale}${t.contactPath}`} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</Link>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.why}</h2>
        <p className="text-white/70 max-w-3xl">{t.whyDesc}</p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.packs}</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {t.packsList.map((p: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">{p.price}</p>
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-white/70">{p.desc}</p>
            </li>
          ))}
        </ul>
        {t.packsNote && <p className="text-white/60 mt-6 max-w-3xl">{t.packsNote}</p>}
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.process}</h2>
        <ol className="grid md:grid-cols-2 gap-4">
          {t.processList.map((m: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">{m.step}</p>
              <h3 className="text-xl font-semibold mb-2">{m.title}</h3>
              <p className="text-white/70">{m.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.deliverables}</h2>
        <ul className="grid md:grid-cols-2 gap-3 text-white/80 max-w-4xl">
          {t.deliverablesList.map((d: string, i: number) => (
            <li key={i} className="border-l-2 border-white/20 pl-4">{d}</li>
          ))}
        </ul>
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
