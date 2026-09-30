'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/routing'

/**
 * Calculadora de coste de una web para /en/website-cost-calculator (28-sep-2026).
 *
 * Reglas (las mismas del Cotizador):
 *  - Precios NO inventados: solo los ya publicados en /en/pricing y en las FAQ
 *    de /en/services/web-development. Landing desde $850 · web corporativa de
 *    5–8 secciones $1,200–$2,400 · tienda online desde $1,750 · SEO $500/mes ·
 *    hosting desde el segundo año ~$10–$35/mes. Plazos: 2–3, 4–6 y 6–10 semanas.
 *    Donde no hay precio publicado (más de 8 secciones, segundo idioma) la
 *    calculadora lo dice en vez de poner una cifra.
 *  - Recursos propios: el lead va a /api/wa-lead, el mismo endpoint que usa el
 *    cotizador de /en/quote, y de ahí al panel (/panel/api/lead-ingest). Sin
 *    widgets de terceros. Aquí no se abre WhatsApp: el plan USA prioriza el
 *    formulario propio.
 */

type SiteType = 'landing' | 'business' | 'store'
type Pages = 'small' | 'mid' | 'large'
type Lang = 'en' | 'bilingual'

const money = (n: number) => '$' + n.toLocaleString('en-US')

const TYPE_OPTS: { id: SiteType; label: string; hint: string }[] = [
  { id: 'landing', label: 'Landing page', hint: 'One page built to convert' },
  { id: 'business', label: 'Business website', hint: 'Several pages: services, about, contact' },
  { id: 'store', label: 'Online store', hint: 'Sell online: catalog, cart and payments' },
]

const PAGE_OPTS: { id: Pages; label: string }[] = [
  { id: 'small', label: '2 to 4 pages' },
  { id: 'mid', label: '5 to 8 pages' },
  { id: 'large', label: '9 pages or more' },
]

const LANG_OPTS: { id: Lang; label: string }[] = [
  { id: 'en', label: 'English only' },
  { id: 'bilingual', label: 'English + Spanish' },
]

interface Estimate {
  range: string
  basis: string
  timeline: string
  summary: string
}

function estimate(type: SiteType, pages: Pages): Estimate {
  if (type === 'landing') {
    return {
      range: `From ${money(850)}`,
      basis: 'Our published starting price for a professional landing page.',
      timeline: '2 to 3 weeks',
      summary: 'Landing page',
    }
  }
  if (type === 'store') {
    return {
      range: `From ${money(1750)}`,
      basis: 'Our published starting price for a Shopify or WooCommerce store. The final figure depends on catalog size, payment gateways and integrations.',
      timeline: '6 to 10 weeks',
      summary: 'Online store',
    }
  }
  if (pages === 'small') {
    return {
      range: `${money(850)} – ${money(2400)}`,
      basis: 'A site this size falls between our landing page (from $850) and our corporate site ($1,200–$2,400) prices.',
      timeline: '3 to 6 weeks',
      summary: 'Business website, 2 to 4 pages',
    }
  }
  if (pages === 'mid') {
    return {
      range: `${money(1200)} – ${money(2400)}`,
      basis: 'Our published range for a corporate site of 5 to 8 sections.',
      timeline: '4 to 6 weeks',
      summary: 'Business website, 5 to 8 pages',
    }
  }
  return {
    range: 'Custom quote',
    basis: 'Our published corporate range ($1,200–$2,400) covers up to 8 sections. Larger sites are scoped individually, so we do not show a figure we have not published.',
    timeline: 'Set in your quote',
    summary: 'Business website, 9+ pages',
  }
}

function Choice<T extends string>({
  options, value, onChange, name,
}: {
  options: { id: T; label: string; hint?: string }[]
  value: T | null
  onChange: (v: T) => void
  name: string
}) {
  return (
    <div role="radiogroup" aria-label={name} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {options.map((o) => {
        const active = value === o.id
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.id)}
            className={`text-left rounded-xl px-4 py-3 text-sm transition-all border ${
              active
                ? 'border-transparent bg-gradient-to-r from-[#E91E63] to-[#9C27B0] text-white'
                : 'border-white/12 text-white/70 hover:border-[#A21F8A]/50'
            }`}
          >
            <span className="block font-semibold">{o.label}</span>
            {o.hint && <span className="block text-xs opacity-80 mt-1">{o.hint}</span>}
          </button>
        )
      })}
    </div>
  )
}

export default function WebsiteCostCalculator() {
  const [type, setType] = useState<SiteType | null>(null)
  const [pages, setPages] = useState<Pages | null>(null)
  const [lang, setLang] = useState<Lang>('en')
  const [seo, setSeo] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [honey, setHoney] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const ready = type !== null && (type !== 'business' || pages !== null)
  const est = useMemo(() => (ready ? estimate(type!, pages ?? 'mid') : null), [ready, type, pages])

  const specs = useMemo(() => {
    if (!est) return ''
    const parts = [est.summary, lang === 'bilingual' ? 'English + Spanish' : 'English only']
    if (seo) parts.push('Monthly SEO')
    return parts.join(' · ')
  }, [est, lang, seo])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!est) return
    if (!name.trim() || phone.replace(/\D/g, '').length < 7) {
      setError('Please enter your name and a phone number so we can reach you.')
      return
    }
    setError('')
    setSending(true)
    try {
      const res = await fetch('/api/wa-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name.trim(),
          celular: phone.trim(),
          proyecto: `Website cost calculator: ${specs}${email.trim() ? ` · Email: ${email.trim()}` : ''}`,
          origin: typeof window !== 'undefined' ? window.location.pathname : '/en/website-cost-calculator',
          sitio_web: honey,
        }),
      })
      if (!res.ok) throw new Error('lead')
      if (typeof window !== 'undefined') {
        ;(window as any).dataLayer = (window as any).dataLayer || []
        ;(window as any).dataLayer.push({ event: 'generate_lead', lead_source: 'website_cost_calculator', page_path: '/en/website-cost-calculator' })
      }
      setSent(true)
    } catch {
      setError('Something went wrong sending your details. Please try again, or use the quote page below.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
      <div className="space-y-8">
        <fieldset>
          <legend className="text-[11px] uppercase tracking-[0.3em] text-white/50 font-bold mb-4">1. Type of site</legend>
          <Choice name="Type of site" options={TYPE_OPTS} value={type} onChange={(v) => { setType(v); if (v !== 'business') setPages(null) }} />
        </fieldset>

        {type === 'business' && (
          <fieldset>
            <legend className="text-[11px] uppercase tracking-[0.3em] text-white/50 font-bold mb-4">2. Number of pages</legend>
            <Choice name="Number of pages" options={PAGE_OPTS} value={pages} onChange={setPages} />
          </fieldset>
        )}

        <fieldset>
          <legend className="text-[11px] uppercase tracking-[0.3em] text-white/50 font-bold mb-4">{type === 'business' ? '3' : '2'}. Languages</legend>
          <Choice name="Languages" options={LANG_OPTS} value={lang} onChange={setLang} />
        </fieldset>

        <fieldset>
          <legend className="text-[11px] uppercase tracking-[0.3em] text-white/50 font-bold mb-4">{type === 'business' ? '4' : '3'}. Ongoing SEO</legend>
          <Choice
            name="Ongoing SEO"
            options={[{ id: 'no', label: 'Not for now' }, { id: 'yes', label: 'Add monthly SEO' }]}
            value={seo ? 'yes' : 'no'}
            onChange={(v) => setSeo(v === 'yes')}
          />
        </fieldset>
      </div>

      <aside
        aria-live="polite"
        className="rounded-[22px] border border-[#A21F8A]/30 bg-gradient-to-br from-[#2F0729] to-[#1A0417] p-7 lg:sticky lg:top-24"
      >
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#E91E63] font-bold mb-5">Your reference estimate</h2>

        {!est ? (
          <p className="text-white/50 text-sm py-6">Choose the type of site{type === 'business' ? ' and the number of pages' : ''} to see a range.</p>
        ) : (
          <div className="space-y-4 mb-6">
            <div className="border-b border-white/10 pb-3">
              <span className="block text-white/60 text-sm">Build (one-off, USD)</span>
              <span className="block text-3xl font-bold mt-1">{est.range}</span>
              <span className="block text-white/50 text-xs mt-2 leading-relaxed">{est.basis}</span>
            </div>
            {seo && (
              <div className="flex items-end justify-between border-b border-white/10 pb-3">
                <span className="text-white/60 text-sm">Monthly SEO</span>
                <span className="text-xl font-bold">{money(500)}<span className="text-sm font-normal text-white/50"> / mo</span></span>
              </div>
            )}
            <ul className="text-white/60 text-xs space-y-2 leading-relaxed">
              <li><span className="text-white">Typical timeline:</span> {est.timeline}</li>
              <li><span className="text-white">Hosting:</span> first year of domain, SSL and hosting included; from year two, roughly $10–$35/mo depending on traffic and platform.</li>
              {lang === 'bilingual' && (
                <li><span className="text-white">Second language:</span> scoped in your written quote. We have not published a separate price for it, so it is not added here.</li>
              )}
            </ul>
          </div>
        )}

        {sent ? (
          <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white/80 leading-relaxed">
            Thanks, {name.trim()}. We have your selection and will get back to you during U.S. business hours (Monday to Friday, 9 a.m. to 6 p.m. Eastern).
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
            <p className="text-white/70 text-sm">Want this estimate reviewed by our team? Leave your details and we will reply with a written figure.</p>
            <label className="sr-only" htmlFor="wcc-name">Your name</label>
            <input
              id="wcc-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#E91E63] transition"
            />
            <label className="sr-only" htmlFor="wcc-phone">Your phone</label>
            <input
              id="wcc-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#E91E63] transition"
            />
            <label className="sr-only" htmlFor="wcc-email">Your email (optional)</label>
            <input
              id="wcc-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email (optional)"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#E91E63] transition"
            />
            {/* Honeypot: invisible para personas; /api/wa-lead descarta el lead si viene lleno. */}
            <input
              type="text" name="sitio_web" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)}
              className="hidden" aria-hidden="true"
            />
            {error && <p className="text-[#ff8fa3] text-xs">{error}</p>}
            <button
              type="submit" disabled={sending || !est}
              className="inline-flex items-center justify-center px-6 py-4 rounded-full bg-gradient-to-r from-[#E91E63] to-[#9C27B0] text-white font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending…' : 'Send me a written estimate'}
            </button>
          </form>
        )}

        <Link
          href="/cotizar"
          className="mt-4 inline-flex w-full items-center justify-center px-6 py-3 rounded-full border border-white/25 text-white text-sm font-semibold hover:border-[#E91E63] transition"
        >
          Get a detailed quote
        </Link>
        <p className="text-white/40 text-[11px] leading-relaxed mt-4">
          Reference estimate in U.S. dollars, not a final quote. Figures shown are for reference only.
        </p>
      </aside>
    </div>
  )
}
