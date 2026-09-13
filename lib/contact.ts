/**
 * contact — fuente única de los datos de contacto (NAP) de 3R Core.
 *
 * Antes convivían 3 números de WhatsApp hardcodeados en ~11 archivos:
 *   51986889147 → schema LocalBusiness / NAP + home + páginas de servicio (hasta el 12-sep-2026),
 *   51987216703 → botón flotante + BlogCTA + captura de pilares,
 *   51969791251 → landing de campañas de paid (/performance-marketing).
 * Esa mezcla rompía la consistencia NAP (local SEO / citations) y la
 * atribución de leads. Aquí se centralizan en UN solo lugar, PRESERVANDO el
 * enrutamiento actual (no se reencamina ningún canal que ya convierte):
 *   - WA_MAIN     → schema/NAP/GBP + home + páginas de servicio.
 *   - WA_LEADS    → botón flotante + BlogCTA + captura de pilares (la línea por
 *                   la que hoy entran los leads orgánicos: NO se toca su ruteo).
 *   - WA_LANDING  → landing de paid (/performance-marketing).
 *
 * Para cambiar cualquier número se edita SOLO este archivo. Si en el futuro se
 * decide unificar todo al número NAP por consistencia local, basta apuntar
 * WA_LEADS a WA_MAIN (decisión de negocio: confirmar antes qué inbox se atiende).
 */

// Número del negocio en schema LocalBusiness / NAP / GBP + páginas de servicio.
// 12-sep-2026: pasa a la línea que atiende (confirmada por Jose el 2-sep), la misma de WA_LEADS.
export const WA_MAIN = '51987216703'

// Línea de conversión orgánica actual (botón flotante, BlogCTA, pilares).
export const WA_LEADS = '51987216703'

// Línea dedicada a campañas de paid (landing /performance-marketing).
export const WA_LANDING = '51969791251'

// Teléfono en formato E.164 para schema.org (LocalBusiness / ContactPoint).
export const TEL_MAIN = `+${WA_MAIN}`
export const TEL_LANDING = `+${WA_LANDING}`

/** Construye la URL de wa.me con un mensaje opcional ya codificado. */
export function waUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
