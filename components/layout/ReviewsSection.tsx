"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLocale } from "next-intl"
import { mentionsPeru } from "@/lib/reviews"

interface Review {
  rating: number
  text: { text: string }
  relativePublishTimeDescription: string
  authorAttribution: {
    displayName: string
    photoUri: string
  }
}

interface ReviewsData {
  name: string
  rating: number
  user_ratings_total: number
  reviews: Review[]
}

const AVATAR_COLORS = [
  "linear-gradient(135deg, #E91E63, #9C27B0)",
  "linear-gradient(135deg, #9C27B0, #673AB7)",
  "linear-gradient(135deg, #E91E63, #FF6B9D)",
  "linear-gradient(135deg, #673AB7, #E91E63)",
]

// Nombres exactos (como aparecen en Google) de reseñas que NO quieres mostrar.
// Agrega o quita nombres de esta lista según necesites.
const EXCLUDED_REVIEWERS = ["Luis Harold Diestra Solis"]

export default function ReviewsSection() {
  const [data, setData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  // 15-set-2026. Plan USA: el bloque de reseñas salía en castellano dentro de /en
  const isEn = locale === "en"

  useEffect(() => {
    fetch("/api/reviews")
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok) {
          throw new Error(json.error ? JSON.stringify(json) : "Error desconocido")
        }
        return json
      })
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error cargando reseñas:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className="text-sm"
        style={{ color: i < rating ? "#E91E63" : "rgba(255,255,255,0.2)" }}
      >
        ★
      </span>
    ))
  }

  const handleScroll = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-card]")
    const width = card ? card.offsetWidth + 20 : 340
    el.scrollBy({ left: dir * width, behavior: "smooth" })
  }

  if (loading) return (
    <div className="flex justify-center py-20">
      <div
        className="h-8 w-8 rounded-full border-2 border-transparent animate-spin"
        style={{ borderTopColor: "#E91E63", borderRightColor: "#9C27B0" }}
      />
    </div>
  )

  // Si Google Places falla (cuota, key, place id) la sección desaparece en
  // silencio: un cajón de error con el JSON crudo no puede salir en el home
  // de producción. El detalle queda en la consola (console.error del catch).
  if (error) {
    return null
  }

  const goodReviews = (data?.reviews ?? []).filter(
    // 13-sep-2026. Plan USA: en /en no salen las reseñas que nombran a Perú
    // (ver mentionsPeru en lib/reviews.ts). /es y /us las muestran todas.
    (r) =>
      !EXCLUDED_REVIEWERS.includes(r.authorAttribution.displayName) &&
      !(locale === "en" && mentionsPeru(r.text?.text ?? ""))
  )
  if (!data || goodReviews.length === 0) return null

  const mapsUrl =
    "https://www.google.com/maps/place/3R+Core+-+Agencia+de+Marketing/@-12.0912956,-76.9519657,17z/data=!3m1!4b1!4m6!3m5!1s0x9105c710419b833d:0xd38447313365f798!8m2!3d-12.0913009!4d-76.9493908!16s%2Fg%2F11jps9mts_?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D"

  return (
    <section className="relative w-full py-12 md:py-16 px-6 md:px-12 lg:px-24 overflow-hidden">

      <style jsx>{`
        .review-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(233, 30, 99, 0.4) transparent;
        }
        .review-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .review-scroll::-webkit-scrollbar-thumb {
          background: rgba(233, 30, 99, 0.4);
          border-radius: 4px;
        }
      `}</style>

      {/* Fondo decorativo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #E91E63, #9C27B0)" }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold tracking-widest" style={{ color: "#E91E63" }}>05</span>
          <span className="w-8 h-px" style={{ background: "#E91E63" }} />
          <span className="text-xs tracking-[0.3em] uppercase text-white/40">{isEn ? "What they say" : "Lo que dicen"}</span>
        </div>

        {/* Título */}
        <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-black leading-tight mb-2">
          {isEn ? "What they say" : "Lo que dicen"}
        </h2>
        <h2
          className="text-3xl md:text-4xl xl:text-5xl font-black leading-tight mb-4 pb-2 inline-block"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.15)",
            borderBottom: "3px solid",
            borderImage: "linear-gradient(90deg, #E91E63, #9C27B0) 1",
          }}
        >
          {isEn ? "our clients" : "nuestros clientes"}
        </h2>

        <p className="text-white/50 text-sm mb-10">
          {isEn
            ? "Real reviews from our Google Business Profile. Swipe to see them all."
            : `Reseñas reales del perfil de Google de ${data.name}. Desliza para ver todas.`}
        </p>

        {/* Carrusel */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {goodReviews.map((review, index) => (
            <div
              key={index}
              data-card
              className="snap-start shrink-0 w-[85vw] sm:w-[360px] h-[280px] rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex gap-px shrink-0">{renderStars(review.rating)}</div>

              <p className="text-white/70 text-sm leading-relaxed flex-1 overflow-y-auto pr-1 review-scroll">
                «{review.text.text}»
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5 shrink-0">
                <div
                  className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10 flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
                >
                  {review.authorAttribution.photoUri ? (
                    <Image
                      src={review.authorAttribution.photoUri}
                      alt={review.authorAttribution.displayName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    review.authorAttribution.displayName.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold leading-tight">
                    {review.authorAttribution.displayName}
                  </p>
                  <p className="text-white/30 text-xs">
                    {review.relativePublishTimeDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navegación + progreso */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Anterior"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-colors shrink-0"
          >
            ‹
          </button>

          <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${Math.max(progress * 100, 15)}%`,
                background: "linear-gradient(90deg, #E91E63, #9C27B0)",
              }}
            />
          </div>

          <button
            onClick={() => scrollByCard(1)}
            aria-label="Siguiente"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-colors shrink-0"
          >
            ›
          </button>
        </div>

        {/* Link Google */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
        >
          {isEn ? "See all reviews on Google" : "Ver todas las reseñas en Google"}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </section>
  )
}