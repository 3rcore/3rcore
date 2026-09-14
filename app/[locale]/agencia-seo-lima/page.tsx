import Link from "next/link"
import { setRequestLocale } from "next-intl/server"

interface Props { params: Promise<{ locale: string }> }

const COPY = {
  es: {
    eyebrow: '3R Core · SEO · Lima · Perú',
    h1: 'Agencia SEO en Lima, Perú',
    sub: 'Posicionamiento orgánico en Google con auditoría técnica, contenidos optimizados, link building blanco y SEO local por distrito. Desde S/1,800/mes y sin contratos forzosos. Los montos indicados son referenciales.',
    cta: 'Solicita auditoría gratuita',
    contactPath: '/#contacto',
    why: 'SEO técnico, contenido y link building bajo un mismo techo',
    whyDesc: 'A diferencia de agencias que solo escriben blogs, 3R Core ejecuta SEO 360°: auditoría técnica con Screaming Frog, optimización on-page, plan editorial mensual, link building manual con medios peruanos y reportes accionables en Looker Studio.',
    pillars: 'Cuatro pilares de nuestro SEO en Lima',
    pillarsList: [
      { title: 'SEO técnico', desc: 'Auditoría con Screaming Frog y Ahrefs: Core Web Vitals, schema markup, canonicals, hreflang, sitemap, robots.txt e indexación.' },
      { title: 'On-page y contenido', desc: 'Keyword research con Ahrefs/Semrush, mapeo de intents y producción de contenidos optimizados para SGE/AI Overviews.' },
      { title: 'SEO local Lima', desc: 'Google Business Profile, citaciones peruanas, reseñas, NAP consistency y landings por distrito de Lima Metropolitana.' },
      { title: 'Link building y digital PR', desc: 'Outreach manual a medios peruanos (Gestión, El Comercio, RPP) y blogs nicho. Anchors diversificados, dofollow y nofollow naturales.' },
    ],
    coverage: 'Distritos de Lima donde tenemos clientes activos',
    coverageList: ['Miraflores', 'San Isidro', 'La Molina', 'Surco', 'San Borja', 'Barranco', 'Magdalena del Mar', 'Pueblo Libre', 'Jesús María', 'Lince', 'San Miguel', 'Callao'],
    methodology: 'Cómo trabajamos contigo, mes a mes',
    methodologyList: [
      { step: 'Mes 1', title: 'Auditoría y plan', desc: 'Auditoría técnica completa, keyword research, mapa de intents y roadmap trimestral con KPIs.' },
      { step: 'Mes 2', title: 'Quickwins on-page', desc: 'Optimización de títulos, metas, headings, internal linking, schema y fixes técnicos críticos.' },
      { step: 'Mes 3–4', title: 'Contenido y autoridad', desc: 'Producción editorial mensual + primeros backlinks dofollow manuales.' },
      { step: 'Mes 5–6', title: 'Escalamiento', desc: 'Cluster de contenidos, link building constante, dashboard mensual y revisión trimestral.' },
    ],
    pricing: 'Inversión SEO en Lima',
    pricingDesc: 'Tier Local Pyme desde S/1,800/mes · Tier Competitivo desde S/3,000/mes · Tier Enterprise desde S/5,000/mes. Precios netos, factura electrónica suma 18% de IGV. Mínimo 3 meses recomendado para resultados visibles. Los montos indicados son referenciales.',
    contact: 'Auditoría SEO gratuita antes de cotizar',
    contactCta: 'Mándanos tu URL y palabras clave objetivo. En 48 h te enviamos una auditoría inicial con quickwins, gaps frente a competencia y propuesta personalizada.',
  },
  en: {
    eyebrow: '3R Core · SEO · Lima · Peru',
    h1: 'SEO Agency in Lima, Peru',
    sub: 'Organic Google positioning with technical audit, optimized content, white-hat link building and local SEO by district. From $500/month for US clients, with no forced contracts.',
    cta: 'Request a free audit',
    contactPath: '/#contacto',
    why: 'Technical SEO, content and link building under one roof',
    whyDesc: 'Unlike agencies that only write blogs, 3R Core executes 360° SEO: technical audit with Screaming Frog, on-page optimization, monthly editorial plan, manual link building with Peruvian media and actionable Looker Studio reports.',
    pillars: 'Four pillars of our SEO in Lima',
    pillarsList: [
      { title: 'Technical SEO', desc: 'Screaming Frog + Ahrefs audit: Core Web Vitals, schema markup, canonicals, hreflang, sitemap, robots.txt and indexing.' },
      { title: 'On-page & content', desc: 'Keyword research with Ahrefs/Semrush, intent mapping and content optimized for SGE/AI Overviews.' },
      { title: 'Lima local SEO', desc: 'Google Business Profile, Peruvian citations, reviews, NAP consistency and district landing pages across Metropolitan Lima.' },
      { title: 'Link building & digital PR', desc: 'Manual outreach to Peruvian media (Gestión, El Comercio, RPP) and niche blogs. Diversified anchors, dofollow and natural nofollow.' },
    ],
    coverage: 'Lima districts with active clients',
    coverageList: ['Miraflores', 'San Isidro', 'La Molina', 'Surco', 'San Borja', 'Barranco', 'Magdalena del Mar', 'Pueblo Libre', 'Jesús María', 'Lince', 'San Miguel', 'Callao'],
    methodology: 'How we work with you, month by month',
    methodologyList: [
      { step: 'Month 1', title: 'Audit & plan', desc: 'Complete technical audit, keyword research, intent map and quarterly roadmap with KPIs.' },
      { step: 'Month 2', title: 'On-page quickwins', desc: 'Optimization of titles, metas, headings, internal linking, schema and critical technical fixes.' },
      { step: 'Month 3–4', title: 'Content & authority', desc: 'Monthly editorial production + first manual dofollow backlinks.' },
      { step: 'Month 5–6', title: 'Scaling', desc: 'Content clusters, continuous link building, monthly dashboard and quarterly review.' },
    ],
    pricing: 'SEO investment in Lima',
    pricingDesc: 'Local SMB tier from $500/month · Competitive tier from $1,000/month · Enterprise tier from $1,500/month. Net prices for US clients. Minimum 3 months recommended for visible results.',
    contact: 'Free SEO audit before quoting',
    contactCta: 'Send us your URL and target keywords. In 48 h we deliver an initial audit with quickwins, gaps against competitors and a custom proposal.',
  },
}

export default async function AgenciaSeoLimaPage({ params }: Props) {
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
        <p className="seo-intro text-lg md:text-xl text-white/80 max-w-3xl mb-10">{t.sub}</p>
        <Link href={`/${locale}${t.contactPath}`} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</Link>
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
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.coverage}</h2>
        <ul className="flex flex-wrap gap-2">
          {t.coverageList.map((d: string, i: number) => (
            <li key={i} className="px-4 py-2 border border-white/15 rounded-full text-sm text-white/80">{d}</li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pricing}</h2>
        <p className="text-white/70 max-w-3xl">{t.pricingDesc}</p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-20 max-w-6xl mx-auto border-t border-white/10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.contact}</h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">{t.contactCta}</p>
        <Link href={`/${locale}${t.contactPath}`} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</Link>
      </section>
    </main>
  )
}
