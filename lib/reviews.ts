/**
 * Reseñas reales de la ficha de Google de 3R Core, para el servidor.
 *
 * La web ya las mostraba (ReviewsSection las pide a /api/reviews desde el
 * navegador), pero NINGUNA página se lo decía a Google ni a los buscadores de
 * IA en el formato que ellos leen: 0 de 27 páginas declaraban AggregateRating o
 * Review. 4,7★ con 42 reseñas verificadas estaban ahí sin usarse.
 *
 * Aquí se leen en el SERVIDOR (ISR de 24 h) para inyectarlas en el nodo
 * Organization del JSON-LD. Si la API de Places falla o faltan las variables de
 * entorno, se cae al último snapshot verificado en lugar de dejar el sitio sin
 * valoración — un dato correcto y algo antiguo es mejor que ninguno.
 */

export interface GbpReview {
  author: string
  rating: number
  text: string
  date: string
}

/**
 * Snapshot de respaldo, copiado LITERALMENTE de la respuesta de la API de Google
 * el 2026-08-26 (rating 4,7 · 42 reseñas). Los textos van verbatim, con su
 * ortografía original: recortar o «arreglar» una reseña real es inventarla.
 */
export const REVIEWS_SNAPSHOT = {
  rating: 4.7,
  count: 42,
  reviews: [
    {
      author: "Tamara Gonzales",
      rating: 5,
      // Texto VERBATIM de la ficha de Google. No se resume, no se corrige la
      // ortografía y no se recorta: alterar una reseña real es inventarla.
      text: "¡Totalmente recomendado! Esta agencia logró cambiar mi forma de ver las cosas, superaron mis expectativas. Una agencia de marketing digital que se compromete y pone todo su compromiso con el cliente, y eso se ve muy poco, además del buen trato que tienen los del personal y su amplia tarea de brindar las mejores perspectivas desde su experiencia y conocimiento para ayudarnos a nosotros también triunfar en nuestros negocios. Me encuentro totalmente dispuesta a volver a trabajar con 3R CORE y llevar mi negocio a otro nivel.",
      date: "2022-11-11",
    },
    {
      author: "Melanie Bdv",
      rating: 5,
      // Texto VERBATIM de la ficha de Google. No se resume, no se corrige la
      // ortografía y no se recorta: alterar una reseña real es inventarla.
      text: "Increibles resultados! EL equipo de 3R CORE me ayudó a impulsar mi marca desde Los Angeles y ahora puedo llevar un mejor manejo de mis redes y el posicionamiento de mi marca. Aun sigo trabajando con ellos en conjunto. Recomendado!!",
      date: "2025-02-21",
    },
    {
      author: "Fabián Olea",
      rating: 5,
      // Texto VERBATIM de la ficha de Google. No se resume, no se corrige la
      // ortografía y no se recorta: alterar una reseña real es inventarla.
      text: "¡Lo recomiendo completamente! Me considero un cliente exigente y consiguieron superar mis expectativas de principio a fin. Lograron resolver cada una de mis dudas durante el desarrollo de la tienda virtual de mi negocio, e incluso me ofrecieron una perspectiva diferente dada su amplia experiencia, lo que permitió que el resultado final de mi e-commerce sea mejor de lo que esperaba. He conocido pocas agencias de marketing con el nivel de dedicación y compromiso que ofrece 3R CORE, me encuentro dispuesto a volver a trabajar con ellos y ampliar mi negocio.",
      date: "2022-06-20",
    },
  ] as GbpReview[],
}

/**
 * Reseñas que NO se publican, por decisión del cliente. Debe coincidir con
 * EXCLUDED_REVIEWERS de components/layout/ReviewsSection.tsx: lo que no se
 * enseña en la página tampoco puede ir en el marcado.
 */
const EXCLUDED_REVIEWERS = ['Luis Harold Diestra Solis']

export interface ReviewsData {
  rating: number
  count: number
  reviews: GbpReview[]
}

export async function getReviews(): Promise<ReviewsData> {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY
  if (!PLACE_ID || !API_KEY) return REVIEWS_SNAPSHOT

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
          'X-Goog-Reviews-Sort': 'HIGHEST_RATING',
        },
        next: { revalidate: 86400 },
      }
    )
    if (!res.ok) return REVIEWS_SNAPSHOT
    const data = await res.json()
    if (!data?.rating || !data?.userRatingCount) return REVIEWS_SNAPSHOT

    const reviews: GbpReview[] = (data.reviews ?? [])
      .filter((r: any) => r?.rating >= 4)
      .map((r: any) => ({
        author: r?.authorAttribution?.displayName ?? '',
        rating: r?.rating ?? 5,
        text: (r?.text?.text ?? r?.originalText?.text ?? '').trim(),
        date: (r?.publishTime ?? '').slice(0, 10),
      }))
      .filter((r: GbpReview) => r.author && r.text && !EXCLUDED_REVIEWERS.includes(r.author))
      .slice(0, 5)

    return {
      rating: Number(data.rating),
      count: Number(data.userRatingCount),
      reviews: reviews.length ? reviews : REVIEWS_SNAPSHOT.reviews,
    }
  } catch {
    return REVIEWS_SNAPSHOT
  }
}

/**
 * 13-sep-2026. Plan USA de 3R Core (Piero Roque): el /en no menciona Perú.
 * Alguna reseña real de la ficha lo nombra («…la mejor agencia de marketing del
 * Perú»). En /en esas reseñas no se muestran ni se marcan en el JSON-LD; el
 * texto de las demás no se toca y la valoración y el total siguen siendo los
 * de Google. /es y /us las muestran todas.
 */
export function mentionsPeru(text: string): boolean {
  return /\bper[uú](?![a-z])|peruan|peruvian|\blima\b/i.test(text)
}

export function reviewsForLocale(data: ReviewsData, locale: string): ReviewsData {
  if (locale !== 'en') return data
  return { ...data, reviews: data.reviews.filter((r) => !mentionsPeru(r.text)) }
}

/** Nodos aggregateRating + review para incrustar en Organization/LocalBusiness. */
export function buildRatingNodes(data: ReviewsData) {
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.rating,
      reviewCount: data.count,
      bestRating: 5,
      worstRating: 1,
      // De dónde salen: son las reseñas verificadas del perfil de empresa de
      // Google, no un contador propio.
      itemReviewed: { '@id': 'https://3rcore.com/#organization' },
    },
    review: data.reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.text,
      publisher: { '@type': 'Organization', name: 'Google' },
    })),
  }
}
