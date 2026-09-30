'use client'

/**
 * WhatsAppLeadGate — intercepta CUALQUIER clic hacia WhatsApp en todo el
 * sitio (enlaces `wa.me`/`api.whatsapp.com` y botones que abren el chat con
 * `window.open`, incluidos los añadidos dinámicamente) y pide nombre +
 * WhatsApp/consulta ANTES de abrir el chat. El lead se guarda en el
 * panel/CRM vía /api/wa-lead — el MISMO endpoint que ya usan PillarWaCapture,
 * WhatsAppBtnLanding y ProtoLeadWiring — recursos propios, sin terceros.
 *
 * Por qué hace falta (auditoría 21-sep-2026): solo las 11 páginas /es del
 * prototipo (vía ProtoLeadWiring, únicamente sus formularios `data-demo`) y
 * dos widgets propios (PillarWaCapture en tiendas-virtuales-lima,
 * WhatsAppBtnLanding en /performance-marketing y posicionamiento-seo /en /us)
 * pedían datos antes de abrir el chat. El botón flotante global (WhatsAppBtn,
 * en TODAS las páginas), el CTA del home (CTASection), el CTA de los 135
 * blogs (BlogCTA, variante «top») y media docena de secciones de servicio en
 * /en /us (brandManualSection, socialPost, webInfoSection, webTypesSection,
 * fourthLandingSection) abrían WhatsApp directo, sin capturar nada — y los
 * enlaces `wa.me` sueltos dentro de los 11 fragmentos del prototipo (fuera
 * del formulario) solo quedaban medidos, no gateados. Este componente cubre
 * esos huecos sin duplicar lógica por página: un solo listener delegado + un
 * solo parche de `window.open`, montados una vez en app/[locale]/layout.tsx.
 *
 * Qué NO intercepta (a propósito):
 *   - Enlaces `wa.me/?text=…` SIN número de teléfono: son «compartir por
 *     WhatsApp» (ver el share button de BlogPostView), no una intención de
 *     contacto — se dejan navegar tal cual.
 *   - /performance-marketing: esa landing de Ads vive fuera de este layout
 *     (app/(landing)/layout.tsx) y ya implementa su propio interceptor
 *     (LandingClient.tsx) con el mismo patrón; montar este gate ahí también
 *     duplicaría el modal.
 *   - Los componentes que ya capturan datos por su cuenta abren WhatsApp con
 *     `openWhatsAppNative` (lib/wa-native-open.ts) en vez de `window.open`
 *     directo, así que el parche de aquí abajo los deja pasar sin volver a
 *     preguntar.
 *
 * Dedup: si el mismo visitante ya dejó nombre + WhatsApp en las últimas 12 h
 * (localStorage), no se le vuelve a preguntar — se reabre el chat con su
 * nombre ya puesto y SIN mandar un lead nuevo al panel.
 */

import { useEffect, useState, type FormEvent } from 'react'
import { useLocale } from 'next-intl'
import { trackConversion } from '@/lib/track'
import { openWhatsAppNative } from '@/lib/wa-native-open'

const DEDUP_KEY = '3r_wa_lead'
const DEDUP_WINDOW_MS = 12 * 60 * 60 * 1000 // 12h

const COPY = {
  es: {
    title: 'Antes de abrir WhatsApp',
    sub: 'Déjanos tus datos y seguimos la conversación por WhatsApp.',
    name: 'Tu nombre',
    phone: 'Tu WhatsApp (ej. 999 999 999)',
    msg: '¿En qué te ayudamos?',
    submit: 'Continuar a WhatsApp',
    sending: 'Guardando…',
    close: 'Cerrar',
    privacy: 'Tus datos solo se usan para responderte por WhatsApp.',
  },
  en: {
    title: 'Before opening WhatsApp',
    sub: 'Leave your details and we’ll continue on WhatsApp.',
    name: 'Your name',
    phone: 'Your WhatsApp number',
    msg: 'What do you need?',
    submit: 'Continue to WhatsApp',
    sending: 'Saving…',
    close: 'Close',
    privacy: 'Your data is only used to reply on WhatsApp.',
  },
} as const

type Pending = { phone: string; targetWin: string; features?: string; origin: string }

/** Extrae el número destino de un wa.me/api.whatsapp.com. Sin número (enlace
 *  de "compartir") devuelve null: no es una intención de contacto. */
function parseWaHref(raw: string): { phone: string; text: string } | null {
  let u: URL
  try {
    u = new URL(raw, typeof window !== 'undefined' ? window.location.href : 'https://3rcore.com')
  } catch {
    return null
  }
  const host = u.hostname.replace(/^www\./, '')
  if (host !== 'wa.me' && host !== 'api.whatsapp.com') return null
  const rawPhone = host === 'wa.me' ? u.pathname.replace(/^\//, '') : u.searchParams.get('phone') || ''
  const phone = rawPhone.replace(/\D/g, '')
  if (phone.length < 6) return null
  return { phone, text: u.searchParams.get('text') || '' }
}

function readDedup(): { nombre: string; celular: string; ts: number } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(DEDUP_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Date.now() - parsed.ts > DEDUP_WINDOW_MS) return null
    return parsed
  } catch {
    return null
  }
}

function writeDedup(nombre: string, celular: string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(DEDUP_KEY, JSON.stringify({ nombre, celular, ts: Date.now() }))
  } catch {}
}

export default function WhatsAppLeadGate() {
  const locale = useLocale()
  const t = COPY[locale === 'en' ? 'en' : 'es']

  const [pending, setPending] = useState<Pending | null>(null)
  const [nombre, setNombre] = useState('')
  const [celular, setCelular] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [loading, setLoading] = useState(false)

  function openGate(phone: string, text: string, targetWin: string, features?: string) {
    const origin = window.location.pathname
    const remembered = readDedup()
    if (remembered) {
      // Ya lo conocemos: reabre el chat con su nombre, sin preguntar de nuevo
      // ni mandar un lead duplicado al panel.
      const msg = `Hola, soy ${remembered.nombre}. ${text || ''}`.trim()
      openWhatsAppNative(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, targetWin, features)
      return
    }
    setMensaje(text ? decodeURIComponent(text) : '')
    setPending({ phone, targetWin, features, origin })
  }

  useEffect(() => {
    // ── 1 · Parche de window.open ───────────────────────────────────────
    // Cubre los CTA que abren WhatsApp desde un onClick (window.open) en vez
    // de un <a href>. Solo intercepta wa.me / api.whatsapp.com CON número;
    // cualquier otra llamada a window.open sigue igual.
    if (!(window as any).__waOpenNative) {
      const native = window.open.bind(window)
      ;(window as any).__waOpenNative = native
      window.open = ((url?: string | URL, targetWin?: string, features?: string) => {
        const href = typeof url === 'string' ? url : url?.toString() || ''
        const parsed = href ? parseWaHref(href) : null
        if (!parsed) return native(url as any, targetWin, features)
        openGate(parsed.phone, parsed.text, targetWin || '_blank', features)
        return null
      }) as typeof window.open
    }

    // ── 2 · Delegado de clics ───────────────────────────────────────────
    // Cubre los <a href="wa.me/…"> de TODO el documento, incluidos los
    // añadidos dinámicamente. Fase de CAPTURA: se adelanta a la navegación
    // del propio <a> y a cualquier onClick que tuviera (p. ej. el tracking
    // propio de WhatsAppBtn/BlogCTA, que este gate sustituye).
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement | null)?.closest?.(
        'a[href*="wa.me"], a[href*="api.whatsapp.com"]'
      ) as HTMLAnchorElement | null
      if (!a) return
      const parsed = parseWaHref(a.href)
      if (!parsed) return // enlace de "compartir": se deja pasar tal cual
      ev.preventDefault()
      ev.stopPropagation()
      openGate(parsed.phone, parsed.text, a.target || '_blank')
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function closeModal() {
    setPending(null)
    setNombre('')
    setCelular('')
    setMensaje('')
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!pending || !nombre.trim() || !celular.trim() || loading) return
    setLoading(true)

    const finalMsg = `Hola, soy ${nombre.trim()}. ${mensaje.trim()}`.trim()
    const waUrl = `https://wa.me/${pending.phone}?text=${encodeURIComponent(finalMsg)}`

    // Guarda el lead en el panel/CRM (mismo endpoint que PillarWaCapture,
    // WhatsAppBtnLanding y ProtoLeadWiring) ANTES de abrir el chat.
    try {
      await fetch('/api/wa-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          celular: celular.trim(),
          proyecto: mensaje.trim(),
          origin: pending.origin,
        }),
        keepalive: true,
      })
    } catch {
      /* best-effort, como el resto de captadores del sitio */
    }

    trackConversion('generate_lead', { lead_source: 'wa_lead_gate', page_path: pending.origin }, e.nativeEvent)
    trackConversion('whatsapp_click', { wa_phone: pending.phone, wa_source: pending.origin }, e.nativeEvent)

    writeDedup(nombre.trim(), celular.trim())
    openWhatsAppNative(waUrl, pending.targetWin, pending.features)

    setLoading(false)
    closeModal()
  }

  if (!pending) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#150318] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-white font-semibold text-lg">{t.title}</h2>
            <p className="text-white/60 text-sm mt-1">{t.sub}</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label={t.close}
            className="text-white/50 hover:text-white transition shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 grid gap-3">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={t.name}
            required
            autoFocus
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#25d366] transition"
          />
          <input
            type="tel"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            placeholder={t.phone}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#25d366] transition"
          />
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder={t.msg}
            className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#25d366] transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-[#25d366] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#1fba57] transition disabled:opacity-60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
            {loading ? t.sending : t.submit}
          </button>
          <p className="text-white/40 text-xs text-center">{t.privacy}</p>
        </form>
      </div>
    </div>
  )
}
