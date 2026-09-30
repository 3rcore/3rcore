/**
 * openWhatsAppNative — abre WhatsApp sin pasar por el interceptor global
 * (components/global/WhatsAppLeadGate.tsx).
 *
 * Los componentes que YA capturan nombre + WhatsApp con su propio formulario
 * antes de abrir el chat (PillarWaCapture, WhatsAppBtnLanding,
 * ProtoLeadWiring) deben usar esta función en vez de `window.open` directo:
 * si no, el gate global volvería a interceptar la llamada y le pediría los
 * datos DOS veces al mismo visitante.
 */
export function openWhatsAppNative(
  url: string,
  target: string = '_blank',
  features?: string
): Window | null {
  if (typeof window === 'undefined') return null
  const native = (window as any).__waOpenNative as typeof window.open | undefined
  return (native ?? window.open).call(window, url, target, features)
}
