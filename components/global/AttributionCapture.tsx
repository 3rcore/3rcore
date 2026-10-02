'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Guarda de dónde llegó cada visitante en cookies PROPIAS del sitio, sin
 * terceros y sin nada visible. Las rutas /api/wa-lead, /api/contact y
 * /api/landing las leen en el servidor (lib/attribution.ts) y mandan la fuente
 * completa al panel junto con el lead.
 *   3r_ft = primer toque (90 días)      3r_lt = toque de la sesión actual
 *   3r_vc = recorrido: sesiones, páginas vistas, primera visita
 *   3r_cx = el botón/enlace que abrió el contacto y el formulario enviado
 * Claves cortas a propósito (s, m, c, t, g, f, r, l, ts…): las del contrato v1
 * se mantienen tal cual y solo se añaden nuevas. Contrato completo en
 * CONTRATO-ATRIBUCION.md del panel.
 */

const SESION_MS = 30 * 60 * 1000 // misma regla que GA4: 30 min sin actividad = sesión nueva
const DIAS_90 = 7776000
const CLIC_IDS: [string, string][] = [
  ['gclid', 'g'], ['gbraid', 'gb'], ['wbraid', 'wb'], ['fbclid', 'f'],
  ['msclkid', 'ms'], ['ttclid', 'tt'], ['li_fat_id', 'li'],
]

const cut = (v: string | null | undefined, n = 150) => (v || '').slice(0, n)

function leerCookie(nombre: string): any {
  const m = document.cookie.match(new RegExp('(?:^|; )' + nombre + '=([^;]*)'))
  if (!m) return null
  try { return JSON.parse(decodeURIComponent(m[1])) } catch { return null }
}

function ponerCookie(nombre: string, valor: unknown, maxAge?: number) {
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${nombre}=${encodeURIComponent(JSON.stringify(valor))}; path=/${maxAge ? `; max-age=${maxAge}` : ''}; SameSite=Lax${secure}`
}

/** El toque de esta llegada: utm_*, clic-ids, referrer externo y página de entrada. */
function toqueActual(conReferrer = true): { touch: Record<string, string>; externo: boolean } {
  const q = new URLSearchParams(location.search)
  let ref = ''
  // En una navegación interna el referrer del documento es el de la llegada: no vale para una sesión nueva.
  if (conReferrer) try { const u = new URL(document.referrer); if (u.hostname !== location.hostname) ref = u.hostname } catch {}
  const ids: Record<string, string> = {}
  for (const [p, k] of CLIC_IDS) if (q.get(p)) ids[k] = cut(q.get(p), 200)
  const pagoBuscador = ids.g || ids.gb || ids.wb || ids.ms
  const pagoSocial = ids.tt || ids.li
  const fuenteClic = ids.g || ids.gb || ids.wb ? 'google' : ids.ms ? 'bing' : ids.tt ? 'tiktok' : ids.li ? 'linkedin' : ''
  const touch: Record<string, string> = {
    s: cut(q.get('utm_source')) || fuenteClic || ref || '(direct)',
    m: cut(q.get('utm_medium')) || (pagoBuscador ? 'cpc' : pagoSocial ? 'paid_social' : ref ? 'referral' : '(none)'),
    c: cut(q.get('utm_campaign')), t: cut(q.get('utm_term')),
    ct: cut(q.get('utm_content')), id: cut(q.get('utm_id'), 60),
    ...ids,
    r: ref, l: location.pathname.slice(0, 150), ts: new Date().toISOString(),
  }
  for (const k of Object.keys(touch)) if (!touch[k]) delete touch[k]
  const externo = !!(ref || q.get('utm_source') || Object.keys(ids).length)
  return { touch, externo }
}

/** Zona de la página en la que está un elemento (mismas zonas que WTrack). */
function zona(el: Element): string {
  if (el.closest('[role=dialog]')) return 'modal'
  if (el.closest('form')) return 'formulario'
  if (el.closest('header,nav')) return 'menu'
  if (el.closest('footer')) return 'footer'
  if (el.closest('[class*=float],[class*=Float],.fixed')) return 'boton_flotante'
  if (el.closest('aside')) return 'lateral'
  return 'contenido'
}

export default function AttributionCapture() {
  const pathname = usePathname()

  // Cada página vista: sesión (30 min), toques y contador del recorrido.
  useEffect(() => {
    try {
      const ahora = Date.now()
      const vc = leerCookie('3r_vc') || {}
      const primeraDeLaPestana = !sessionStorage.getItem('3r_attr')
      sessionStorage.setItem('3r_attr', '1')
      const { touch, externo } = primeraDeLaPestana ? toqueActual() : { touch: null, externo: false }
      const caducada = !vc.la || ahora - Number(vc.la) > SESION_MS
      const sesionNueva = caducada || (primeraDeLaPestana && externo)
      if (sesionNueva) {
        ponerCookie('3r_lt', touch || toqueActual(false).touch, DIAS_90)
        vc.n = (Number(vc.n) || 0) + 1
        vc.spv = 0
      } else if (!leerCookie('3r_lt') && touch) {
        ponerCookie('3r_lt', touch, DIAS_90)
      }
      if (!leerCookie('3r_ft')) ponerCookie('3r_ft', leerCookie('3r_lt') || toqueActual().touch, DIAS_90)
      vc.pv = (Number(vc.pv) || 0) + 1
      vc.spv = (Number(vc.spv) || 0) + 1
      vc.f = vc.f || (leerCookie('3r_ft') || {}).ts || new Date(ahora).toISOString()
      vc.la = ahora
      ponerCookie('3r_vc', vc, DIAS_90)
    } catch { /* sin cookies o sin storage: el lead igual entra */ }
  }, [pathname])

  // Qué botón/enlace abrió el contacto y qué formulario se envió. Fase de
  // captura en window: corre antes que el modal de WhatsApp y que React, así la
  // cookie ya está puesta cuando sale la petición del lead.
  useEffect(() => {
    const desc = (el: HTMLElement) => ({
      t: cut((el.getAttribute('aria-label') || el.textContent || (el as HTMLInputElement).value || '').replace(/\s+/g, ' ').trim(), 80),
      z: zona(el),
      h: cut(el.getAttribute('href'), 150),
      id: cut(el.getAttribute('data-cta') || el.id || el.getAttribute('name'), 60),
      p: location.pathname.slice(0, 150),
      ts: new Date().toISOString(),
    })
    const limpiar = (o: Record<string, string>) => { for (const k of Object.keys(o)) if (!o[k]) delete o[k]; return o }
    const onClick = (e: MouseEvent) => {
      try {
        const el = (e.target as Element | null)?.closest?.('a,button,[role=button],input[type=submit]') as HTMLElement | null
        if (!el) return
        const cx = leerCookie('3r_cx') || {}
        const d = limpiar(desc(el))
        cx.k = d // último clic
        if (d.z !== 'modal' && d.z !== 'formulario') cx.o = d // el CTA que abrió el flujo
        ponerCookie('3r_cx', cx)
      } catch {}
    }
    const onSubmit = (e: Event) => {
      try {
        const f = e.target as HTMLFormElement
        const cx = leerCookie('3r_cx') || {}
        const sec = f.closest('section[id],div[id]') as HTMLElement | null
        cx.fm = cut(f.id || f.getAttribute('name') || f.getAttribute('aria-label') || f.getAttribute('data-form')
          || (f.closest('[role=dialog]') ? 'modal_whatsapp' : '') || (sec ? `en_${sec.id}` : 'formulario'), 60)
        cx.fp = location.pathname.slice(0, 150)
        ponerCookie('3r_cx', cx)
      } catch {}
    }
    window.addEventListener('click', onClick, true)
    window.addEventListener('submit', onSubmit, true)
    return () => {
      window.removeEventListener('click', onClick, true)
      window.removeEventListener('submit', onSubmit, true)
    }
  }, [])

  return null
}
