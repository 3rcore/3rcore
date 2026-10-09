/**
 * Bloque de PRUEBA común para las páginas de servicio (9-oct-2026).
 *
 * Por qué: el top 3 de «agencia google ads lima» y «agencia seo lima» pone
 * testimonios, casos y logos en la propia página de servicio; en 3rcore
 * ninguna página de servicio de pago los tenía (diagnóstico de contenido del
 * 9-oct). Este bloque junta lo que YA es público y verificable:
 *
 *  · Logos: los mismos de «Nuestros Clientes» de la home (proto-html/home.html).
 *    Se dejan fuera Capital Core iT, Warner Bros y PayPal hasta que el cliente
 *    confirme cómo quiere mostrarlos fuera de la home.
 *  · Reseñas: REVIEWS_SNAPSHOT de lib/reviews.ts, copiadas VERBATIM de la
 *    ficha de Google (API de Places, 26-ago-2026). No se recortan ni corrigen.
 *  · Enlace a /es/casos-de-exito.
 *
 * Huecos para los casos del cliente: CASOS_POR_SERVICIO está vacío a propósito.
 * Cuando 3R Core entregue un caso con cifra y permiso de publicación, se añade
 * aquí y aparece solo en la página de ese servicio. Mientras esté vacío NO se
 * pinta nada: ni cifras, ni «próximamente», ni números de relleno.
 *
 * Se devuelve HTML con las clases del prototipo (.proto) para poder colocarlo
 * dentro de las páginas servidas por ProtoPage mediante el hueco
 * <!--slot:prueba--> (ver components/proto/ProtoPage.tsx).
 */
import { REVIEWS_SNAPSHOT } from '@/lib/reviews'

export type ServicioPrueba = 'google-ads' | 'meta-ads' | 'seo' | 'web' | 'branding' | 'general'

export interface CasoServicio {
  cliente: string
  /** Qué se hizo, en una frase. */
  resumen: string
  /** Cifra con su periodo, tal como la autoriza el cliente. */
  cifra: string
  /** De dónde sale la cifra (p. ej. «Google Ads, ene-mar 2026»). */
  fuente: string
}

/** Vacío hasta que lleguen casos con cifra y permiso (ver MEGA-ESTRATEGIA §7.2). */
export const CASOS_POR_SERVICIO: Partial<Record<ServicioPrueba, CasoServicio[]>> = {}

const LOGOS: { src: string; alt: string }[] = [
  { src: 'Edifica.webp', alt: 'EDIFICA' },
  { src: 'clinicaFamilia.webp', alt: 'Clínica de la Familia' },
  { src: '2kLogo.webp', alt: '2K' },
  { src: 'DPS.webp', alt: 'GRUPO DPS' },
  { src: 'Daska.webp', alt: 'DASKA' },
  { src: 'Italel.webp', alt: 'ITALTEL' },
  { src: 'Nexxum.webp', alt: 'NEXXUM' },
  { src: 'Oros.webp', alt: 'As de Oros' },
  { src: 'Plinius.webp', alt: 'PLINIUS' },
  { src: 'agu.webp', alt: 'agú' },
  { src: 'cgm.webp', alt: 'CGM Rental' },
  { src: 'domusLogo.webp', alt: 'domus flats' },
  { src: 'glimsolar.webp', alt: 'GLIM SOLAR' },
  { src: 'instalPro.webp', alt: 'INSTAL PRO' },
  { src: 'pdk.webp', alt: 'PDK' },
  { src: 'pretties.webp', alt: 'PRETTIES' },
  { src: 'venturaLogo.webp', alt: 'Aventura Park' },
  { src: 'vitaLogo.webp', alt: 'VITA' },
  { src: 'vlissad.webp', alt: 'VLISSAD' },
  { src: 'AutoLogo.webp', alt: 'Automecs' },
]

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const fecha = (iso: string) => {
  const [y, m] = iso.split('-')
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${meses[Number(m) - 1]}. ${y}`
}

export function pruebaServicioHtml(servicio: ServicioPrueba, titulo = 'Quiénes ya trabajan con nosotros'): string {
  const logos = LOGOS.map(
    (l) => `<div class="client"><img src="/proto/img/logos/${l.src}" alt="${esc(l.alt)}" loading="lazy" width="120" height="34"><small>${esc(l.alt)}</small></div>`
  ).join('')

  const casos = (CASOS_POR_SERVICIO[servicio] || [])
    .map(
      (c) =>
        `<figure class="resena rv"><blockquote><b>${esc(c.cifra)}</b> · ${esc(c.resumen)}</blockquote><figcaption><b>${esc(c.cliente)}</b><span>Fuente: ${esc(c.fuente)}</span></figcaption></figure>`
    )
    .join('')

  const resenas = REVIEWS_SNAPSHOT.reviews
    .map(
      (r) =>
        `<figure class="resena rv"><span class="stars" aria-hidden="true">${'★'.repeat(r.rating)}</span><blockquote>${esc(r.text)}</blockquote><figcaption><b>${esc(r.author)}</b><span>Reseña en Google · ${fecha(r.date)}</span></figcaption></figure>`
    )
    .join('')

  return `<section class="sec-line" id="prueba" data-prueba="${servicio}"><div class="wrap">
  <div class="sec-h rv"><h2>${esc(titulo)}</h2><p class="intro">Marcas que han trabajado con 3R Core y lo que dicen en Google, sin editar. La valoración de la ficha es ${String(REVIEWS_SNAPSHOT.rating).replace('.', ',')} sobre 5 con ${REVIEWS_SNAPSHOT.count} reseñas.</p></div>
  <div class="marquee rv"><div class="track">${logos}${logos}</div></div>
  ${casos ? `<div class="grid g2 resenas" style="margin-top:2.2rem">${casos}</div>` : ''}
  <div class="grid g2 resenas" style="margin-top:2.2rem">${resenas}</div>
  <p class="rv" style="margin-top:1.6rem"><a href="/es/casos-de-exito">Ver los casos de éxito publicados</a> · <a href="https://www.google.com/search?q=3R+Core+Agencia+de+Marketing" target="_blank" rel="noopener">Ver todas las reseñas en Google</a></p>
</div></section>`
}
