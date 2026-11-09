import { Link } from "@/i18n/navigation"
import { MARKETING_SECTORES } from "@/lib/marketing-sectores"
import SpotlightGrid from "./SpotlightGrid"

/**
 * 5-nov-2026. Hub «Especializaciones por sector» para /es/servicios (y el home
 * si se quiere): enlaza las 16 páginas «Marketing digital para <sector>».
 * Componente de servidor: solo viajan al HTML el nombre y la URL de cada una.
 * Solo /es (las páginas no existen en /en ni /us).
 */
export default function EspecializacionesSection() {
  const sectores = Object.values(MARKETING_SECTORES)
  return (
    <section className="relative z-10 px-6 md:px-10 py-16 bg-[#0D0010]" aria-labelledby="especializaciones-heading">
      <div className="max-w-5xl mx-auto">
        <h2 id="especializaciones-heading" className="text-2xl md:text-4xl font-bold italic mb-4 bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
          Especializaciones: marketing digital por sector
        </h2>
        <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
          Cada sector compra distinto y tiene sus propias normas de publicidad. Estas páginas explican qué canales le sirven a cada uno, en qué orden se encienden y qué medimos.
        </p>
        {/* 16 sectores: 2 columnas en móvil (2×8) y 4 en escritorio (4×4),
            para que ninguna fila quede coja. */}
        <SpotlightGrid className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {sectores.map((s) => {
            // «Marketing digital para» va como etiqueta y el sector destacado;
            // el nombre completo sigue en el texto del enlace.
            const sector = s.nombre.replace(/^Marketing digital para\s+/i, "")
            return (
              <li key={s.slug}>
                <Link
                  href={s.path}
                  data-spot
                  className="group relative flex h-full min-h-[88px] flex-col justify-between gap-3 overflow-hidden rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-white transition-colors duration-300 hover:border-[#E91E63]/70"
                >
                  {/* luz rosada semitransparente que sigue al cursor */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(244, 38, 110, 0.28), rgba(166, 48, 205, 0.1) 45%, transparent 70%)",
                    }}
                  />
                  <span className="relative text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/55">
                    Marketing digital para
                  </span>
                  <span className="relative flex items-end justify-between gap-2">
                    <span className="text-sm md:text-base font-semibold leading-snug first-letter:uppercase">{sector}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[#E91E63] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </SpotlightGrid>
      </div>
    </section>
  )
}
