'use client'

import { useRef, useState } from 'react'
import { trackConversion } from '@/lib/track'

/**
 * Mini-formulario de captación DENTRO del artículo, solo para el mercado de
 * EE.UU. (/en y /us).
 *
 * Por qué existe (medido el 1-sep-2026):
 *  - Los artículos en inglés son los que más apariciones acumulan en Estados
 *    Unidos —`spanish-seo-for-us-businesses` 83 y
 *    `how-much-does-a-small-business-website-cost` 67— y NINGUNO tenía un
 *    formulario dentro. La única vía de contacto era un WhatsApp peruano.
 *  - `blog_cta_view` 1.206 → `blog_cta_click` 9 en agosto (0,75%). Las dos
 *    salidas que había piden hablar con alguien, y un comprador estadounidense
 *    no escribe por WhatsApp a un número +51: deja su correo.
 *
 * Usa /api/contact, que ya avisa por Resend y responde al visitante — no hay
 * widget de terceros, todo con recursos propios.
 */
export default function InlineLeadForm({ slug, service }: { slug: string; service: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const hp = useRef<HTMLInputElement>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending') return
    const fd = new FormData(e.currentTarget)
    // Honeypot: si viene lleno es un bot. Se finge éxito y no se envía nada.
    if (hp.current?.value) { setState('done'); return }
    const nombre = String(fd.get('nombre') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const mensaje = String(fd.get('mensaje') || '').trim()
    if (!nombre || !email) return
    setState('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          apellido: '',
          email,
          telefono: '',
          mensaje: mensaje || `Asked about ${service} from the article "${slug}".`,
          page: `/blogs/${slug}`,
          locale: 'en',
        }),
      })
      if (!r.ok) throw new Error('bad_status')
      setState('done')
      trackConversion('generate_lead', { blog_slug: slug, cta_service: service, cta_variant: 'inline_form', lead_channel: 'email' })
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center">
        <p className="font-semibold text-white">Thanks — we got it.</p>
        <p className="mt-1 text-sm text-white/70">
          You&apos;ll hear from us within one business day. Our team works U.S. business hours,
          so it is usually the same day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/15 bg-white/5 p-6">
      <p className="font-semibold text-white">Want a straight answer on price and timeline?</p>
      <p className="mt-1 text-sm text-white/70">
        Leave your email and we&apos;ll send you a scoped estimate. No call required, no commitment.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="sr-only" htmlFor={`lf-name-${slug}`}>Your name</label>
        <input
          id={`lf-name-${slug}`} name="nombre" type="text" required autoComplete="name" placeholder="Your name"
          className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#E91E63]"
        />
        <label className="sr-only" htmlFor={`lf-email-${slug}`}>Work email</label>
        <input
          id={`lf-email-${slug}`} name="email" type="email" required autoComplete="email" placeholder="Work email"
          className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#E91E63]"
        />
      </div>

      <label className="sr-only" htmlFor={`lf-msg-${slug}`}>What do you need?</label>
      <input
        id={`lf-msg-${slug}`} name="mensaje" type="text" placeholder="What do you need? (optional)"
        className="mt-3 w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#E91E63]"
      />

      {/* honeypot: invisible para personas */}
      <input ref={hp} type="text" name="sitio_web" tabIndex={-1} autoComplete="off" aria-hidden="true"
             className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      <button
        type="submit" disabled={state === 'sending'}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#9C27B0] via-[#E91E63] to-[#FF1A55] px-5 py-3 text-sm font-semibold text-white transition disabled:opacity-60 sm:w-auto"
      >
        {state === 'sending' ? 'Sending…' : 'Send me an estimate'}
      </button>

      {state === 'error' && (
        <p className="mt-3 text-sm text-[#FF6B7A]">
          Something went wrong. Write to <a className="underline" href="mailto:info@3rcore.com">info@3rcore.com</a> and we&apos;ll pick it up there.
        </p>
      )}
    </form>
  )
}
