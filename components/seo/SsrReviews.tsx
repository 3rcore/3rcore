import { getReviews, reviewsForLocale } from '@/lib/reviews'

/**
 * Bloque de reseñas renderizado en el SERVIDOR.
 *
 * ReviewsSection (el carrusel bonito) es 'use client' y pide /api/reviews desde
 * el navegador: Googlebot lo ve porque ejecuta JS, pero los bots de IA que NO
 * lo ejecutan — GPTBot, PerplexityBot, ClaudeBot — recibían una página sin una
 * sola señal de reputación. Y el canal «AI Assistant» ya es el que mejor
 * convierte de 3rcore (17% en GA4, 30 días).
 *
 * Esto pone en el HTML inicial la valoración y tres reseñas verificadas, que
 * son además las mismas que declara el JSON-LD. Es aditivo: no sustituye ni
 * toca el carrusel.
 */
export default async function SsrReviews({ locale }: { locale: string }) {
  const { rating, count, reviews } = reviewsForLocale(await getReviews(), locale)
  const isEn = locale === 'en'

  return (
    <section
      aria-label={isEn ? 'Client reviews' : 'Reseñas de clientes'}
      className="relative z-10 px-6 md:px-12 py-14 md:py-20 max-w-6xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
        {isEn
          ? `What our clients say: ${rating} out of 5 across ${count} Google reviews`
          : `Lo que dicen nuestros clientes: ${rating} sobre 5 en ${count} reseñas de Google`}
      </h2>
      <p className="text-white/55 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
        {/* Solo lo que la ficha dice: nota media y número de reseñas. Ni
            «verificadas» ni de qué países son — eso no consta en el dato. */}
        {isEn
          ? `3R Core holds an average rating of ${rating} out of 5 across ${count} reviews on its Google Business Profile.`
          : `3R Core tiene una valoración media de ${rating} sobre 5 en ${count} reseñas de su perfil de empresa de Google.`}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((r) => (
          <blockquote
            key={`${r.author}-${r.date}`}
            className="rounded-[18px] border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-white/70 text-sm leading-relaxed mb-4">“{r.text}”</p>
            <footer className="text-white/45 text-xs">
              <cite className="not-italic font-semibold text-white/70">{r.author}</cite>
              <span aria-hidden="true"> · </span>
              <span>{'★'.repeat(Math.round(r.rating))}</span>
              <span aria-hidden="true"> · </span>
              <time dateTime={r.date}>{r.date}</time>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
