/**
 * NAP — Name, Address, Phone. Una sola fuente para todo el sitio.
 *
 * Por qué existe este fichero (26-ago-2026): la web publicaba DOS direcciones
 * distintas a la vez, y eso hace daño real al posicionamiento local — Google
 * necesita que el nombre, la dirección y el teléfono coincidan en todas partes
 * para fiarse de la ficha.
 *
 *   A) «Alameda de la Paz 187, primer piso, Urb El Remanso, La Molina, Lima 15024»
 *      → JSON-LD del sitio, pie de página, políticas, términos y la landing.
 *   B) «Calle Las Caobas 170, Ofic. 400, Urb El Remanso, La Molina, Lima 15024»
 *      → preguntas frecuentes (es y en) y public/llms.txt.
 *
 * ✅ RESUELTO EL 31-AGO-2026. El cliente confirma que la buena es la A:
 * «Alameda de la Paz 187 es la dirección de la oficina». La B se ha retirado de
 * todo el sitio (FAQ de es y en). Desde esa fecha, la calle también se publica
 * en `public/llms.txt` y en la página madre `/es/agencia-marketing-digital-lima`,
 * que hasta entonces daban solo el distrito para no citar una calle sin
 * confirmar.
 *
 * 🔒 REGLA: cualquier página nueva que necesite la dirección importa `NAP` o
 * `POSTAL_ADDRESS` de aquí. No se vuelve a escribir una calle a mano. Los
 * únicos textos que la repiten literalmente son los legales de
 * `messages/*.json` (políticas y términos, donde forma parte del texto
 * jurídico) y la respuesta q6 de las preguntas frecuentes.
 *
 * ⏳ PENDIENTE FUERA DEL CÓDIGO: la ficha de Google Business Profile todavía
 * hay que revisarla contra esta dirección — es la única fuente que Google mira
 * para el mapa, y la web no la corrige sola.
 */

export const NAP = {
  name: '3R Core - Agencia de Marketing Digital',
  legalName: '3R Core Agencia de Marketing',
  ruc: '20609008211',
  street: 'Alameda de la Paz 187, primer piso',
  district: 'La Molina',
  region: 'Lima',
  postalCode: '15024',
  country: 'PE',
  /** Coordenadas ya publicadas en el JSON-LD del sitio. */
  lat: -12.0913,
  lng: -76.9494,
  email: 'info@3rcore.com',
  /** Horario publicado en las FAQ y en el JSON-LD: L-V 09:00-18:00. */
  opens: '09:00',
  closes: '18:00',
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
} as const

/** PostalAddress de Schema.org, idéntica en todas las páginas que la declaren. */
export const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: NAP.street,
  addressLocality: NAP.district,
  addressRegion: NAP.region,
  postalCode: NAP.postalCode,
  addressCountry: NAP.country,
} as const
