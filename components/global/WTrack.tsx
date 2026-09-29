'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { registrar, enviar, engancharSalida, medir, sesionId } from '@/lib/wtrack'

/**
 * Medición propia de 3rcore.com (la misma pieza que el panel de Websy).
 * Observa y copia; no cambia nada visible ni vuelve a mandar nada a GA4/gtag.
 *  - Lo que ya se empuja al dataLayer (whatsapp_click, generate_lead, blog_cta_*…)
 *    se COPIA tal cual, sin los _ref ni los _bot: mismas reglas que GA4.
 *  - Lo que GA4 no ve (página, scroll, tiempo, clics, salidas, formularios) se
 *    registra aquí directamente.
 */
const COPIAR: Record<string, string> = {
  whatsapp_click: 'whatsapp_click',
  generate_lead: 'generate_lead',
  blog_cta_click: 'blog_cta_click',
  blog_cta_whatsapp: 'blog_cta_whatsapp',
  blog_cta_cotizador: 'blog_cta_cotizador',
  qualify_lead: 'qualify_lead',
  close_convert_lead: 'close_convert_lead',
  wa_capture_open: 'wa_modal_abierto',
}

export default function WTrack() {
  const pathname = usePathname()
  const hitos = useRef(new Set<number>())

  // Página vista (también en navegación interna) y reinicio del scroll.
  useEffect(() => {
    if (!medir()) return
    sesionId()
    hitos.current = new Set()
    registrar('page_view', { page_path: location.pathname, page_type: location.pathname.includes('/blogs/') ? 'blog' : 'pagina' })
  }, [pathname])

  useEffect(() => {
    if (!medir()) return
    engancharSalida()

    const onScroll = () => {
      const h = document.documentElement
      const pct = ((h.scrollTop + window.innerHeight) / Math.max(1, h.scrollHeight)) * 100
      for (const m of [25, 50, 75, 90]) {
        if (pct >= m && !hitos.current.has(m)) { hitos.current.add(m); registrar('scroll_depth', { percent_scrolled: m }) }
      }
    }

    const onClick = (e: MouseEvent) => {
      if (!e.isTrusted) return
      const el = (e.target as Element | null)?.closest?.('a,button,[role=button]') as HTMLElement | null
      if (!el) return
      const href = el.getAttribute('href') || ''
      const texto = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120)
      const zona = el.closest('header,nav') ? 'menu' : el.closest('footer') ? 'footer' : el.closest('[class*=float],[class*=Float]') ? 'boton_flotante' : 'contenido'
      const p = { link_text: texto, cta_location: zona, link_url: href.slice(0, 300) }
      if (/^tel:/i.test(href)) return registrar('phone_click', p)
      if (/^mailto:/i.test(href)) return registrar('email_click', p)
      if (/wa\.me|api\.whatsapp|whatsapp\.com/i.test(href)) return registrar('cta_click', { ...p, link_destination: 'whatsapp' })
      if (/^https?:\/\//i.test(href)) {
        try {
          const u = new URL(href)
          if (u.hostname !== location.hostname) {
            return registrar(/facebook|instagram|linkedin|tiktok|youtube|x\.com|twitter/i.test(u.hostname) ? 'social_click' : 'outbound_click', { ...p, outbound_domain: u.hostname })
          }
        } catch { /* enlace raro: se trata como interno */ }
      }
      if (href.startsWith('#')) return registrar('anchor_click', p)
      registrar(zona === 'menu' ? 'nav_click' : zona === 'footer' ? 'footer_click' : el.tagName === 'BUTTON' ? 'button_click' : 'cta_click', p)
    }

    const empezados = new WeakSet<HTMLFormElement>()
    const onFocus = (e: FocusEvent) => {
      const f = (e.target as Element | null)?.closest?.('form') as HTMLFormElement | null
      if (f && !empezados.has(f)) { empezados.add(f); registrar('form_start', { cta_location: f.id || f.getAttribute('name') || 'formulario' }) }
    }
    const onSubmit = (e: Event) => {
      const f = e.target as HTMLFormElement
      registrar('form_submit', { cta_location: f.id || f.getAttribute('name') || 'formulario' })
    }

    // Copia del dataLayer: se lee por posición, así da igual que GTM envuelva push().
    let leidos = 0
    const copiar = () => {
      const dl = (window as any).dataLayer as any[] | undefined
      if (!Array.isArray(dl)) return
      for (; leidos < dl.length; leidos++) {
        const ev = dl[leidos]
        const n = ev && typeof ev.event === 'string' ? ev.event : ''
        if (!n || n.endsWith('_ref') || n.endsWith('_bot') || ev.human === false || !COPIAR[n]) continue
        const datos: Record<string, string | number | boolean | undefined> = {}
        for (const k of ['lead_source', 'cta_service', 'cta_variant', 'blog_slug', 'wa_source', 'form_location']) if (ev[k] != null) datos[k] = String(ev[k]).slice(0, 120)
        registrar(COPIAR[n], { ...datos, page_path: typeof ev.page_path === 'string' ? ev.page_path : location.pathname })
        if (n === 'generate_lead' && ev.lead_source === 'wa_lead_gate') registrar('wa_modal_enviado', { page_path: location.pathname })
        if (n === 'whatsapp_click') registrar('wa_abierto', { page_path: location.pathname })
      }
    }
    const t = window.setInterval(copiar, 1000)

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick, true)
    document.addEventListener('focusin', onFocus, true)
    document.addEventListener('submit', onSubmit, true)
    const salir = () => { copiar(); registrar('page_exit', { page_path: location.pathname }); enviar(true) }
    window.addEventListener('pagehide', salir)
    return () => {
      window.clearInterval(t)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('focusin', onFocus, true)
      document.removeEventListener('submit', onSubmit, true)
      window.removeEventListener('pagehide', salir)
    }
  }, [])

  return null
}
