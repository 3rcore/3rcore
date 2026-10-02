/**
 * Medición con filtro de tráfico automatizado.
 *
 * Contexto (análisis del 25-ago-2026 con GSC + GA4 reales): GA4 declaraba 276
 * keyEvents en 30 días, pero al desglosarlos por país × canal con
 * `userEngagementDuration` aparecía la firma inconfundible de un bot —
 * 177 sesiones desde Irán con 134 «conversiones» y CERO segundos de
 * permanencia, más Países Bajos, Singapur, China y Rusia con 1 s. En total
 * ~174 de las 276 conversiones (63%) no eran personas, y el evento inflado era
 * `whatsapp_click`, que se dispara en un simple clic sobre un enlace.
 *
 * Mientras el panel diga 15% de conversión nadie va a tocar la web. Este
 * módulo es el filtro en origen: un evento de conversión solo llega al
 * dataLayer / GA4 si lo produjo una persona.
 *
 * Tres condiciones, todas baratas y ninguna visible para el visitante:
 *   1. `event.isTrusted` — el clic lo generó el navegador, no un script.
 *   2. Interacción previa real (pointerdown / keydown / scroll / touchstart)
 *      o al menos MIN_DWELL_MS en la página. Los bots detectados convertían
 *      con 0 s de permanencia; una persona nunca.
 *   3. El documento está visible (no una pestaña abierta en segundo plano por
 *      un crawler headless).
 *
 * NO es un muro anti-robot: no bloquea, no reta, no cambia nada de lo que ve
 * el visitante ni de lo que rastrea Googlebot. Solo decide si el evento cuenta.
 */

const MIN_DWELL_MS = 2000

let humanSeen = false
let armedAt = 0

function arm() {
  if (typeof window === 'undefined' || armedAt) return
  armedAt = Date.now()
  const mark = () => { humanSeen = true }
  const opts = { passive: true, once: true } as AddEventListenerOptions
  window.addEventListener('pointerdown', mark, opts)
  window.addEventListener('keydown', mark, opts)
  window.addEventListener('touchstart', mark, opts)
  window.addEventListener('wheel', mark, opts)
  window.addEventListener('scroll', mark, opts)
}

if (typeof window !== 'undefined') arm()

/** ¿Hay señales de que quien dispara esto es una persona? */
export function isHumanInteraction(e?: { isTrusted?: boolean } | null): boolean {
  if (typeof window === 'undefined') return false
  arm()
  // Un clic sintético (Puppeteer/Playwright vía JS, o `el.click()`) no es trusted.
  if (e && e.isTrusted === false) return false
  if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return false
  if (humanSeen) return true
  return Date.now() - armedAt >= MIN_DWELL_MS
}

type Payload = Record<string, unknown>

/**
 * Eventos que el contenedor GTM-54VJ6F97 ya manda a GA4 con su propio tag
 * (disparador = evento personalizado del mismo nombre). Para estos NO se llama
 * a `gtag('event', …)`: GTM también trata ese comando gtag como un evento del
 * dataLayer, así que cada envío salía 3 veces a GA4 (tag de GTM por el push +
 * tag de GTM otra vez por el comando gtag + el gtag.js directo) y los tags
 * `_ref` y la conversión de Ads de whatsapp_click, 2 veces. Medido en
 * producción el 2-oct-2026 con el modal de WhatsApp: 3 generate_lead y
 * 3 whatsapp_click por un solo envío. Los eventos que GTM no tiene siguen
 * yendo a GA4 por gtag.
 */
export const GTM_TAGGED_EVENTS = new Set([
  'generate_lead',
  'whatsapp_click',
  'blog_cta_click',
  'blog_cta_whatsapp',
  'blog_cta_view',
])

/**
 * Empuja un evento al dataLayer SIEMPRE (para depurar y para eventos de
 * navegación), pero marca `human: false` cuando no supera el filtro. En GTM/GA4
 * la conversión debe condicionarse a `human == true`.
 */
export function pushDataLayer(event: string, params: Payload = {}, human = true) {
  if (typeof window === 'undefined') return
  const w = window as any
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, human, ...params })
}

/**
 * Evento de CONVERSIÓN. Si no hay señales humanas no se envía: es la diferencia
 * entre un panel que dice la verdad y uno que cuenta robots.
 * Devuelve `true` si el evento se envió.
 */
export function trackConversion(
  event: string,
  params: Payload = {},
  e?: { isTrusted?: boolean } | null
): boolean {
  if (typeof window === 'undefined') return false
  if (!isHumanInteraction(e)) {
    // Se deja rastro sin contaminar la conversión: así se puede medir cuánto
    // tráfico automatizado hay sin que infle los keyEvents.
    pushDataLayer(`${event}_bot`, params, false)
    return false
  }
  pushDataLayer(event, params, true)
  const gtag = (window as any).gtag
  if (!GTM_TAGGED_EVENTS.has(event) && typeof gtag === 'function') gtag('event', event, params)
  return true
}
