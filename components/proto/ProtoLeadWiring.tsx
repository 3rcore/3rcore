'use client'

/*
 * Conecta las CTAs del diseño del prototipo (HTML inyectado en .proto) al
 * sistema de captura REAL de 3R Core — recursos propios, sin terceros:
 *   - Los formularios `data-demo` (Nombre + WhatsApp + ¿Qué necesitas?) dejan de
 *     ser maqueta: guardan el lead en el panel/CRM vía /api/wa-lead (token
 *     server-side), disparan generate_lead + whatsapp_click en GTM/GA4 y abren
 *     el chat de WhatsApp pre-llenado. Mismo patrón probado que PillarWaCapture.
 *   - Cada enlace wa.me del prototipo (hero, cotizador, etc.) queda MEDIDO:
 *     dispara whatsapp_click con la página de origen antes de abrir el chat.
 *
 * Un solo componente sirve a las 11 páginas /es porque delega por selector
 * sobre el contenedor .proto. proto.js ya NO gestiona el submit (se quitó su
 * handler de demostración para no duplicar el envío).
 */
import { useEffect } from 'react'
import { WA_LEADS } from '@/lib/contact'
import { openWhatsAppNative } from '@/lib/wa-native-open'

function readGclid(): string {
  try {
    const url = new URLSearchParams(window.location.search).get('gclid')
    if (url) return url
    const m = document.cookie.match(/(?:^|;\s*)gclid=([^;]+)/)
    if (m) return decodeURIComponent(m[1])
  } catch {}
  return ''
}

function pushDL(payload: Record<string, unknown>) {
  ;(window as any).dataLayer = (window as any).dataLayer || []
  ;(window as any).dataLayer.push(payload)
}

export default function ProtoLeadWiring() {
  useEffect(() => {
    const root = document.querySelector('.proto') as HTMLElement | null
    if (!root) return

    // ── 1 · Formularios: de maqueta a captura real ─────────────────────────
    const forms = Array.from(root.querySelectorAll<HTMLFormElement>('form[data-demo]'))
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      const f = e.currentTarget as HTMLFormElement
      if (f.dataset.sending === '1') return

      const nombre = (f.querySelector('input:not([type="tel"]):not([type="email"]):not([type="hidden"])') as HTMLInputElement)?.value?.trim()
        || (f.querySelector('input') as HTMLInputElement)?.value?.trim() || ''
      const celular = (f.querySelector('input[type="tel"]') as HTMLInputElement)?.value?.trim()
        || (f.querySelectorAll('input')[1] as HTMLInputElement)?.value?.trim() || ''
      const servicio = (f.querySelector('select') as HTMLSelectElement)?.value?.trim() || ''

      if (!nombre || !celular) {
        const err = f.querySelector('.proto-lead-err') as HTMLElement | null
        if (err) { err.textContent = 'Escribe tu nombre y tu WhatsApp, por favor.'; err.style.display = 'block' }
        return
      }

      f.dataset.sending = '1'
      const origin = window.location.pathname
      const gclid = readGclid()

      // Guarda el lead en el panel ANTES de abrir el chat (best-effort).
      try {
        await fetch('/api/wa-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, celular, proyecto: servicio, origin, gclid }),
          keepalive: true,
        })
      } catch {}

      pushDL({ event: 'generate_lead', lead_source: 'proto_form', cta_service: servicio, page_path: origin })
      pushDL({ event: 'whatsapp_click', wa_phone: WA_LEADS, wa_source: origin })

      const msg = `Hola, soy ${nombre}. Me interesa ${servicio || 'sus servicios'}. Mi WhatsApp es ${celular}.`
      const waUrl = `https://wa.me/${WA_LEADS}?text=${encodeURIComponent(msg)}`

      // Acuse dentro del propio formulario (mantiene el diseño del prototipo).
      f.innerHTML =
        '<h3>¡Listo! Te escribimos por WhatsApp</h3>' +
        '<p class="mini" style="margin:0">Guardamos tus datos y abrimos el chat. Si no se abre solo, ' +
        '<a href="' + waUrl + '" target="_blank" rel="noopener" style="text-decoration:underline">toca aquí</a>.</p>'

      // Ya se capturó el formulario data-demo arriba: se abre directo, sin
      // pasar por el interceptor global (WhatsAppLeadGate).
      openWhatsAppNative(waUrl, '_blank', 'noopener')
    }
    forms.forEach((f) => f.addEventListener('submit', onSubmit))

    // ── 2 · Enlaces wa.me del prototipo: que queden medidos ────────────────
    const onWaClick = (ev: Event) => {
      const a = (ev.target as HTMLElement)?.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]') as HTMLAnchorElement | null
      if (!a || !root.contains(a)) return
      pushDL({ event: 'whatsapp_click', wa_phone: WA_LEADS, wa_source: window.location.pathname })
    }
    root.addEventListener('click', onWaClick)

    return () => {
      forms.forEach((f) => f.removeEventListener('submit', onSubmit))
      root.removeEventListener('click', onWaClick)
    }
  }, [])

  return null
}
