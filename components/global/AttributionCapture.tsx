'use client'

import { useEffect } from 'react'

/**
 * Guarda de dónde llegó cada visitante (utm_*, gclid/fbclid, referrer y página
 * de entrada) en dos cookies PROPIAS del sitio, sin terceros y sin nada visible:
 *   3r_ft = primera visita (90 días)   3r_lt = visita actual (sesión)
 * Las rutas /api/wa-lead, /api/contact y /api/landing las leen en el servidor y
 * mandan la fuente al panel junto con el lead, para saber qué trajo cada contacto.
 */
export default function AttributionCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem('3r_attr')) return
      sessionStorage.setItem('3r_attr', '1')
      const q = new URLSearchParams(location.search)
      let ref = ''
      try { const u = new URL(document.referrer); if (u.hostname !== location.hostname) ref = u.hostname } catch {}
      const cut = (v: string | null) => (v || '').slice(0, 150)
      const touch: Record<string, string> = {
        s: cut(q.get('utm_source')) || (q.get('gclid') ? 'google' : '') || ref || '(direct)',
        m: cut(q.get('utm_medium')) || (q.get('gclid') ? 'cpc' : ref ? 'referral' : '(none)'),
        c: cut(q.get('utm_campaign')), t: cut(q.get('utm_term')),
        g: cut(q.get('gclid')), f: cut(q.get('fbclid')),
        r: ref, l: location.pathname.slice(0, 150), ts: new Date().toISOString(),
      }
      for (const k of Object.keys(touch)) if (!touch[k]) delete touch[k]
      const val = encodeURIComponent(JSON.stringify(touch))
      const secure = location.protocol === 'https:' ? '; Secure' : ''
      document.cookie = `3r_lt=${val}; path=/; SameSite=Lax${secure}`
      if (!/(?:^|; )3r_ft=/.test(document.cookie)) document.cookie = `3r_ft=${val}; path=/; max-age=7776000; SameSite=Lax${secure}`
    } catch { /* sin cookies o sin storage: el lead igual entra */ }
  }, [])
  return null
}
