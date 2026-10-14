"use client"
import { useTranslations } from "next-intl"

/**
 * Guía propia de cada página «Google Ads para <sector>» (11-oct-2026).
 * Lee `<namespace>.sections` de messages/es.json: cada sección es una pregunta
 * (H2) con su respuesta en párrafos y, si la tiene, una lista, ejemplos de
 * anuncio de búsqueda o una nube de palabras clave negativas. Así cada sector
 * cuenta sus políticas, campañas, negativas y medición sin repetir plantilla.
 */
type Ad = { headline: string; url: string; desc: string }
type Section = { h: string; p?: string[]; list?: string[]; ads?: Ad[]; chips?: string[] }

export default function SectorAdsGuide({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace)
  const sections = t.raw("sections") as Section[]

  return (
    <section className="relative z-10 px-6 md:px-10 py-16" aria-labelledby={`${namespace}-guia`}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 border-b border-white/30 pb-6">
          <p className="text-white/80 text-sm uppercase tracking-widest font-light mb-2">{t("badge")}</p>
          <p id={`${namespace}-guia`} className="leading-tight font-bold italic text-3xl md:text-5xl bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
            {t("title")}
          </p>
        </header>
        <div className="space-y-12">
          {sections.map((s, i) => (
            <article key={i}>
              <h2 className="text-white font-semibold text-xl md:text-2xl mb-4 leading-snug">{s.h}</h2>
              <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-light">
                {(s.p ?? []).map((p, j) => <p key={j}>{p}</p>)}
              </div>
              {s.list && s.list.length > 0 && (
                <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-300 text-sm md:text-base font-light leading-relaxed">
                  {s.list.map((li, j) => <li key={j}>{li}</li>)}
                </ul>
              )}
              {s.ads && s.ads.length > 0 && (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {s.ads.map((ad, j) => (
                    <figure key={j} className="rounded-xl bg-white text-[#1f1f1f] p-4 shadow-sm">
                      <p className="text-xs text-[#202124]"><span className="font-bold">Patrocinado</span> · {ad.url}</p>
                      <p className="mt-1 text-[#1a0dab] text-base md:text-lg leading-snug">{ad.headline}</p>
                      <p className="mt-1 text-sm text-[#4d5156] leading-relaxed">{ad.desc}</p>
                    </figure>
                  ))}
                </div>
              )}
              {s.chips && s.chips.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Palabras clave negativas">
                  {s.chips.map((c, j) => (
                    <li key={j} className="px-3 py-1 rounded-md border border-white/25 text-white/90 text-sm">-{c}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
