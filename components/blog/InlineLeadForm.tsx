'use client'

import { useRef, useState } from 'react'
import { trackConversion } from '@/lib/track'
import ConsentCheckbox, { useMarketingConsentCopy } from '@/components/ui/ConsentCheckbox'

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
const COPY = {
  en: {
    title: 'Want a straight answer on price and timeline?',
    sub: 'Leave your email and we\u2019ll send you a scoped estimate. No call required, no commitment.',
    name: 'Your name', email: 'Work email', msg: 'What do you need? (optional)',
    submit: 'Send me an estimate', sending: 'Sending\u2026',
    doneTitle: 'Thanks \u2014 we got it.',
    doneSub: 'You\u2019ll hear from us within one business day. Our team works U.S. business hours, so it is usually the same day.',
    errPre: 'Something went wrong. Write to ', errPost: ' and we\u2019ll pick it up there.',
  },
  es: {
    title: '\u00bfQuieres saber precio y plazos sin vueltas?',
    sub: 'D\u00e9janos tu correo y te enviamos una propuesta con alcance y precio. Sin llamadas ni compromiso.',
    name: 'Tu nombre', email: 'Tu correo', msg: '\u00bfQu\u00e9 necesitas? (opcional)',
    submit: 'Quiero mi propuesta', sending: 'Enviando\u2026',
    doneTitle: '\u00a1Listo, ya lo recibimos!',
    doneSub: 'Te respondemos en menos de un d\u00eda h\u00e1bil, normalmente el mismo d\u00eda.',
    errPre: 'Algo fall\u00f3. Escr\u00edbenos a ', errPost: ' y lo vemos por ah\u00ed.',
  },
} as const

/**
 * 5-nov-2026. Embudo de 3 posiciones del blog: el formulario vive en el bloque
 * final, pero los CTA de intro y de mitad del artículo traen al lector aquí.
 * `getPosition` devuelve desde qué CTA llegó (intro | medio | final) para que
 * el lead entre al panel diciendo qué post y qué posición lo produjo.
 */
export default function InlineLeadForm({ slug, service, locale = 'en', getPosition }: { slug: string; service: string; locale?: string; getPosition?: () => string }) {
  const tx = COPY[locale === 'en' ? 'en' : 'es']
  const consent = useMarketingConsentCopy()
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
    const pos = getPosition?.() || 'final'
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          apellido: '',
          email,
          telefono: '',
          // Origen en el propio mensaje (el panel guarda campos fijos): post + posición del CTA.
          mensaje: `${mensaje || (locale === 'en' ? `Asked about ${service} from the article "${slug}".` : `Consulta sobre ${service} desde el artículo "${slug}".`)}\n\nCTA: cta_blog_${pos} · blog_slug: ${slug}`,
          page: `/${locale}/blogs/${slug}`,
          locale,
          // La casilla llega del FormData como "on" o no llega: al panel va boolean.
          consentimiento_publicidad: fd.get('consentimiento_publicidad') === 'on',
        }),
      })
      if (!r.ok) throw new Error('bad_status')
      setState('done')
      trackConversion('generate_lead', { blog_slug: slug, cta_service: service, cta_variant: 'inline_form', cta_position: pos, lead_channel: 'email', locale })
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center">
        <p className="font-semibold text-white">{tx.doneTitle}</p>
        <p className="mt-1 text-sm text-white/70">{tx.doneSub}</p>
      </div>
    )
  }

  return (
    <form id="blog-lead-form" data-form="blog_lead_form" onSubmit={onSubmit} className="rounded-2xl border border-white/15 bg-white/5 p-6">
      <p className="font-semibold text-white">{tx.title}</p>
      <p className="mt-1 text-sm text-white/70">
        {tx.sub}
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="sr-only" htmlFor={`lf-name-${slug}`}>{tx.name}</label>
        <input
          id={`lf-name-${slug}`} name="nombre" type="text" required autoComplete="name" placeholder={tx.name}
          className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#E91E63]"
        />
        <label className="sr-only" htmlFor={`lf-email-${slug}`}>{tx.email}</label>
        <input
          id={`lf-email-${slug}`} name="email" type="email" required autoComplete="email" placeholder={tx.email}
          className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#E91E63]"
        />
      </div>

      <label className="sr-only" htmlFor={`lf-msg-${slug}`}>{tx.msg}</label>
      <input
        id={`lf-msg-${slug}`} name="mensaje" type="text" placeholder={tx.msg}
        className="mt-3 w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#E91E63]"
      />

      {/* Optional and unchecked by default (Ley 29733): it never blocks sending. */}
      <ConsentCheckbox
        id={`lf-consent-${slug}`}
        text={consent.text}
        privacyLabel={consent.privacyLabel}
        privacyHref={consent.privacyHref}
        className="mt-3 text-xs leading-relaxed text-white/60"
        linkClassName="text-white/80"
      />

      {/* honeypot: invisible para personas */}
      <input ref={hp} type="text" name="sitio_web" tabIndex={-1} autoComplete="off" aria-hidden="true"
             className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      <button
        type="submit" disabled={state === 'sending'}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#9C27B0] via-[#E91E63] to-[#FF1A55] px-5 py-3 text-sm font-semibold text-white transition disabled:opacity-60 sm:w-auto"
      >
        {state === 'sending' ? tx.sending : tx.submit}
      </button>

      {state === 'error' && (
        <p className="mt-3 text-sm text-[#FF6B7A]">
          {tx.errPre}<a className="underline" href="mailto:info@3rcore.com">info@3rcore.com</a>{tx.errPost}
        </p>
      )}
    </form>
  )
}
