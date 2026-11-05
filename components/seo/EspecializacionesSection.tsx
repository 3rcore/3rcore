import { Link } from "@/i18n/navigation"
import { MARKETING_SECTORES } from "@/lib/marketing-sectores"

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
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sectores.map((s) => (
            <li key={s.slug}>
              <Link
                href={s.path}
                className="flex items-center min-h-[48px] px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white text-sm md:text-base hover:border-[#E91E63] hover:bg-[#E91E63]/10 transition-colors"
              >
                {s.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
