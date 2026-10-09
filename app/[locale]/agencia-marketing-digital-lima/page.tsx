import Link from "next/link"
import { setRequestLocale } from "next-intl/server"
import { COPY } from './copy'
import { PILAR } from './pilar'
import PillarWaCapture from "@/components/ui/PillarWaCapture"
import PruebaServicio from "@/components/seo/PruebaServicio"

interface Props { params: Promise<{ locale: string }> }

/**
 * Página madre del negocio: «agencia de marketing digital en Lima».
 *
 * Historia: existía, se consolidó el 15-jul-2026 con un 301 hacia /servicios y
 * el 25-ago el análisis con Search Console mostró el precio de esa decisión —
 * la búsqueda que DEFINE el negocio aparecía 179 veces al trimestre en posición
 * 68,7 (séptima página) sin recibir un solo clic, y la página que heredaba todo
 * eso era un índice de 395 palabras que Google no rastreaba desde el 23-jul.
 *
 * Reparto de papeles para que las dos páginas NO compitan, que era el motivo
 * legítimo de la consolidación:
 *   · /es/servicios → CATÁLOGO. Qué es cada servicio y cuánto cuesta.
 *   · esta página   → AGENCIA EN LIMA. Quiénes son, qué cobran, dónde atienden
 *                     y qué preguntan antes de contratar.
 *
 * TODO el texto sale de copy.ts, donde cada bloque lleva anotada la fuente
 * dentro del propio repositorio. Aquí no se inventa nada.
 *
 * Reversible: basta devolver la entrada 301 a next.config.ts.
 */
export default async function LimaLandingPage({ params }: Props) {
  const { locale } = await params
  // Renderizado estático (ver app/[locale]/layout.tsx).
  setRequestLocale(locale);

  const t = locale === 'en' ? COPY.en : COPY.es
  const link = (href: string) => `/${locale}${href}`
  // 9-oct-2026: los bloques del pilar (pilar.ts) solo se pintan en /es, que es
  // la única versión indexable de esta URL.
  const es = locale === 'es'
  const p = PILAR
  // FAQ del pilar: las 7 nuevas + la de precio, que ya se publicaba aquí.
  const faq = es ? [...p.faq.map((f) => ({ q: f.q, a: f.a })), t.qa[0]] : t.qa

  return (
    <main className="text-white">
      <section className="px-6 md:px-10 lg:px-20 pt-32 pb-16 max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">{t.eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{t.hero}</h1>
        <p className="local-intro text-lg md:text-xl text-white/80 max-w-3xl mb-8">{t.sub}</p>
        <div className="text-sm text-white/60 mb-9 space-y-1">
          <p>{t.zona}</p>
          <p>{t.horario}</p>
          <p>
            <a href={`tel:${t.phone.replace(/\s/g, '')}`} className="hover:text-white transition">{t.phone}</a>
            <span aria-hidden="true"> · </span>
            <a href={`mailto:${t.email}`} className="hover:text-white transition">{t.email}</a>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={link(t.ctaHref)} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</Link>
          <Link href={link(t.ctaSecondaryHref)} className="inline-block border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">{t.ctaSecondary}</Link>
        </div>
        {es && (
          <div id="formulario" className="mt-12 grid md:grid-cols-2 gap-8 items-start border border-white/10 rounded-2xl p-6 md:p-8">
            <div>
              <p className="pilar-respuesta text-white/80 leading-relaxed mb-4">{p.respuesta}</p>
              <h2 className="text-xl md:text-2xl font-semibold mb-2">{p.formH2}</h2>
              <p className="text-white/60 text-sm">{p.formP}</p>
            </div>
            <PillarWaCapture locale={locale} service={p.servicioForm} />
          </div>
        )}
      </section>

      {es && (
        <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{p.queH2}</h2>
          <p className="text-white/70 max-w-3xl mb-10 leading-relaxed">{p.queP}</p>
          <ul className="grid md:grid-cols-2 gap-4">
            {p.cuatro.map((s) => (
              <li key={s.href} className="border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2"><Link href={link(s.href)} className="hover:underline underline-offset-4">{s.name}</Link></h3>
                <p className="text-white/70 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ul>
          <p className="text-white/60 max-w-3xl mt-6">
            {p.complementos}{' '}
            <Link href={link('/servicios/socialmedia')} className="underline underline-offset-4">Redes sociales</Link>,{' '}
            <Link href={link('/servicios/meta-ads')} className="underline underline-offset-4">Meta Ads</Link> y{' '}
            <Link href={link('/servicios/branding')} className="underline underline-offset-4">branding</Link>.
          </p>
        </section>
      )}

      {es && (
        <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{p.procesoH2}</h2>
          <p className="text-white/60 max-w-3xl mb-10">{p.procesoP}</p>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {p.proceso.map((s) => (
              <li key={s.t} className="border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">{s.t}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {es && <PruebaServicio servicio="general" titulo={p.pruebaH2} intro={p.pruebaP} />}

      {es && (
        <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{p.medimosH2}</h2>
          <p className="text-white/70 max-w-3xl mb-8 leading-relaxed">{p.medimosP}</p>
          <ul className="grid md:grid-cols-2 gap-4 mb-6">
            {p.medimos.map((m) => (
              <li key={m.t} className="border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">{m.t}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{m.d}</p>
              </li>
            ))}
          </ul>
          <p className="text-white/60 max-w-3xl">
            {p.medimosNota} <Link href={link(p.medimosLink.href)} className="underline underline-offset-4">{p.medimosLink.name}</Link>.
          </p>
        </section>
      )}

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.whyH2}</h2>
        <div className="space-y-5 max-w-3xl text-white/70 leading-relaxed">
          <p>{t.whyP1}</p>
          <p>{t.whyP2}</p>
          <p>{t.whyP3}</p>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.servicesH2}</h2>
        <p className="text-white/60 max-w-3xl mb-10">{t.servicesP}</p>
        <ul className="grid md:grid-cols-2 gap-4">
          {t.services.map((s) => (
            <li key={s.href}>
              <Link href={link(s.href)} className="block border border-white/10 rounded-2xl p-6 hover:border-white/30 hover:bg-white/5 transition h-full">
                <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
                <p className="text-white/70">{s.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{t.refH2}</h2>
        <ul className="grid md:grid-cols-3 gap-4 mb-6">
          {t.ref.map((r) => (
            <li key={r.t} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">{r.t}</h3>
              <p className="text-white/60 text-sm">{r.d}</p>
            </li>
          ))}
        </ul>
        <p className="text-white/70 max-w-3xl">{t.refNote}</p>
      </section>

      {es && (
        <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{p.vsH2}</h2>
          <p className="text-white/70 max-w-3xl mb-8 leading-relaxed">{p.vsP}</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm border-collapse">
              <thead>
                <tr>{p.vsCols.map((c, i) => <th key={i} scope="col" className="p-3 border-b border-white/20 font-semibold">{c}</th>)}</tr>
              </thead>
              <tbody>
                {p.vsRows.map((r) => (
                  <tr key={r[0]}>
                    <th scope="row" className="p-3 border-b border-white/10 font-semibold align-top">{r[0]}</th>
                    {r.slice(1).map((c, i) => <td key={i} className="p-3 border-b border-white/10 text-white/70 align-top">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/60 max-w-3xl mt-6">
            {p.vsNota} <Link href={link(p.vsLink.href)} className="underline underline-offset-4">{p.vsLink.name}</Link> lo explicamos con más detalle.
          </p>
        </section>
      )}

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.zonesH2}</h2>
        <p className="text-white/70 max-w-3xl mb-8 leading-relaxed">{t.zonesP}</p>
        <p className="text-white/60 max-w-3xl mb-6">{t.sectorsP}</p>
        <ul className="grid md:grid-cols-3 gap-4">
          {t.sectors.map((s) => (
            <li key={s.href}>
              <Link href={link(s.href)} className="block border border-white/10 rounded-2xl p-6 hover:border-white/30 hover:bg-white/5 transition h-full">
                <h3 className="text-lg font-semibold mb-2">{s.name}</h3>
                <p className="text-white/60 text-sm">{s.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{es ? p.faqH2 : t.qaH2}</h2>
        <div className="space-y-6 max-w-3xl">
          {faq.map((f) => (
            <div key={f.q}>
              <h3 className="faq-question text-lg md:text-xl font-semibold mb-2">{f.q}</h3>
              <p className="faq-answer text-white/70 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-20 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-5">{t.closeH2}</h2>
        <p className="text-white/70 max-w-2xl mb-8 leading-relaxed">{t.closeP}</p>
        <Link href={link(t.ctaHref)} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition mb-12">{t.cta}</Link>
        {es && (
          <div className="mb-12 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-2">{p.cierreH2}</h3>
            <p className="text-white/60 text-sm mb-6">{p.cierreP}</p>
            <PillarWaCapture locale={locale} service={p.servicioForm} />
          </div>
        )}
        <h3 className="text-base font-semibold mb-4 text-white/90">{t.moreH3}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.more.map((m) => (
            <Link key={m.name} href={link(m.href)} className="block rounded-[14px] border border-white/10 p-4 hover:border-white/30 transition-colors">
              <span className="block text-white font-semibold text-sm mb-1">{m.name}</span>
              <span className="block text-white/45 text-xs leading-relaxed">{m.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
