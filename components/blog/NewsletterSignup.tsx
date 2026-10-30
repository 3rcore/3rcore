'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { trackConversion } from '@/lib/track'

/**
 * 30-oct-2026. Newsletter mensual del blog (plan SEO frente a Media Lab, O11: la
 * competencia tiene newsletter en su home). Guarda en el panel propio, nunca en una
 * herramienta de terceros (regla del cliente). newsletter_signup es microconversión,
 * no evento clave: un suscriptor no es una consulta de venta.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [web, setWeb] = useState('')
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle')

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (estado === 'enviando') return
    setEstado('enviando')
    try {
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, web, pagina: location.pathname }),
      })
      if (!r.ok) throw new Error(String(r.status))
      trackConversion('newsletter_signup', { page_path: location.pathname }, e.nativeEvent)
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  return (
    <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8" aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="text-xl md:text-2xl font-bold text-white mb-2">
        Un correo al mes con lo que funciona en marketing digital en Perú
      </h2>
      <p className="text-white/60 text-sm md:text-base mb-5">
        El mejor artículo del mes, un caso real y los cambios de Google y Meta que te afectan. Sin spam; te das de baja con un clic.
      </p>
      {estado === 'ok' ? (
        <p className="text-white font-semibold" role="status">Listo, ya estás suscrito. Te escribimos a fin de mes.</p>
      ) : (
        <form onSubmit={enviar} className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="newsletter-email" className="sr-only">Tu correo</label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-[#A21F8A]"
          />
          {/* Honeypot: invisible para personas; los robots lo rellenan. */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
            <input tabIndex={-1} autoComplete="off" name="web" value={web} onChange={(e) => setWeb(e.target.value)} />
          </div>
          <button
            type="submit"
            disabled={estado === 'enviando'}
            className="rounded-xl bg-[#A21F8A] hover:bg-[#8a1a75] px-6 py-3 font-semibold text-white transition-colors disabled:opacity-60"
          >
            {estado === 'enviando' ? 'Enviando…' : 'Suscribirme'}
          </button>
        </form>
      )}
      {estado === 'error' && <p className="text-[#f4266e] text-sm mt-3" role="alert">No se pudo guardar. Prueba otra vez en un momento.</p>}
      <p className="text-white/40 text-xs mt-4">
        Al suscribirte aceptas recibir este correo mensual de 3R Core. Más detalles en la <Link href="/politicas" className="underline underline-offset-2">política de privacidad</Link>.
      </p>
    </section>
  )
}
