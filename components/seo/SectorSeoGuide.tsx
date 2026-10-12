"use client"
import { useTranslations } from "next-intl"

interface Section {
  title: string
  paragraphs: string[]
  list?: string[]
}

/**
 * 11-oct-2026. Cuerpo propio de cada página «SEO para <sector>»: cómo busca el
 * cliente del sector, qué sale en su SERP, SEO local, contenido y normas, y qué
 * se mide. Cada sección abre con la respuesta directa (pasaje citable).
 */
export default function SectorSeoGuide({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace)
  const sections = t.raw("guide.sections") as Section[]

  return (
    <>
      {sections.map((s, i) => (
        <section key={i} className="relative z-10 px-6 md:px-10 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold italic mb-6 bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
              {s.title}
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-light">
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
            {s.list && s.list.length > 0 && (
              <ul className="mt-6 space-y-2 list-disc pl-6 text-gray-300 text-sm md:text-base leading-relaxed font-light marker:text-[#E91E63]">
                {s.list.map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}
    </>
  )
}
