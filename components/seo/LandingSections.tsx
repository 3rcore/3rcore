"use client"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import type { AppPathname } from "@/i18n/routing"

/**
 * Secciones de profundidad para las landings de /en (28-sep-2026).
 *
 * ServiceLanding pinta hero, intro, beneficios y proceso; SEOContentBlock, un
 * bloque de párrafos sin enlaces. A las landings del plan USA les faltaba lo
 * que la IA y Google extraen como respuesta: tablas de precio y plazo, listas
 * de qué incluye y enlaces dentro del texto hacia la página hermana. Esto lo
 * añade con el mismo estilo (degradado magenta, tarjetas con borde).
 *
 * Todo el texto sale de messages/<locale>.json → `<namespace>.sections`.
 */

interface InlineLink {
  before?: string
  label: string
  /** Ruta interna (AppPathname) o `/blogs/<slug>`. */
  href: string
  after?: string
}

interface Section {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  table?: { head: string[]; rows: string[][] }
  links?: InlineLink[]
  note?: string
}

function InternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className = "text-white underline decoration-[#E91E63] underline-offset-4 hover:text-[#E91E63] transition-colors"
  const blog = /^\/blogs\/([^/]+)$/.exec(href)
  if (blog) {
    return (
      <Link href={{ pathname: "/blogs/[slug]", params: { slug: blog[1] } }} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <Link href={href as AppPathname} className={className}>
      {children}
    </Link>
  )
}

export default function LandingSections({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace)
  const sections = t.raw("sections") as Section[]

  return (
    <>
      {sections.map((s, i) => (
        <section key={i} className="relative z-10 px-6 md:px-10 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold italic mb-6 leading-tight bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
              {s.title}
            </h2>

            {s.paragraphs && (
              <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-light">
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            )}

            {s.bullets && (
              <ul className="mt-6 space-y-3">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-gray-300 text-sm md:text-base font-light leading-relaxed">
                    <span className="text-[#E91E63] font-mono shrink-0">{String(j + 1).padStart(2, "0")}.</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {s.table && (
              <div className="mt-8 overflow-x-auto rounded-2xl border border-white/15">
                <table className="w-full text-left text-sm md:text-base">
                  <thead>
                    <tr className="bg-white/5">
                      {s.table.head.map((h, j) => (
                        <th key={j} scope="col" className="px-4 py-3 font-semibold text-white">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((row, j) => (
                      <tr key={j} className="border-t border-white/10">
                        {row.map((cell, k) =>
                          k === 0 ? (
                            <th key={k} scope="row" className="px-4 py-3 font-semibold text-white align-top">
                              {cell}
                            </th>
                          ) : (
                            <td key={k} className="px-4 py-3 text-gray-300 font-light align-top">
                              {cell}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {s.note && <p className="mt-4 text-white/50 text-xs md:text-sm italic">{s.note}</p>}

            {s.links && (
              <div className="mt-6 space-y-3 text-gray-300 text-sm md:text-base leading-relaxed font-light">
                {s.links.map((l, j) => (
                  <p key={j}>
                    {l.before}
                    <InternalLink href={l.href}>{l.label}</InternalLink>
                    {l.after}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  )
}
