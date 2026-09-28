'use client'

import { useMemo, useState } from 'react'
import { WA_LEADS, waUrl } from '@/lib/contact'

/**
 * Cotizador — calculadora de estimado referencial para 3R Core.
 *
 * Regla del negocio (ver feedback): las calculadoras SÍ, pero (1) con el diseño
 * EXACTO del sitio (aquí: oscuro #0D0010 + degradado magenta #E91E63→#9C27B0 +
 * Montserrat) y (2) dan un estimado REFERENCIAL que SIEMPRE cierra en un botón
 * "Cotizar por WhatsApp"; el mensaje lleva los servicios/specs (NO el precio) y
 * el precio exacto se confirma por WhatsApp. Precios NO inventados: son los ya
 * publicados en /precios. Recursos propios: el lead se guarda en el panel vía
 * /api/wa-lead (sin terceros) y luego se abre el chat con WA_LEADS.
 */

type Kind = 'setup' | 'monthly'
type Scope = { id: string; label: string; from: number }
type Service = {
  key: string
  label: string
  labelEn: string
  kind: Kind
  scopes: Scope[]
  scopesEn: Scope[]
  note?: string
  noteEn?: string
  /** es-US: español con la tarifa en dólares. */
  noteUs?: string
}

// Fuente de precios: /precios. `scopes` en soles (Perú) y `scopesEn` en
// dólares (EE.UU.). Antes ambos llevaban el mismo número en soles.
const SERVICES: Service[] = [
  {
    key: 'tienda', label: 'Tienda virtual / e-commerce', labelEn: 'Online store / e-commerce', kind: 'setup',
    scopes: [{ id: 'ecom', label: 'Tienda online (Shopify / WooCommerce / Tiendanube)', from: 6500 }],
    scopesEn: [{ id: 'ecom', label: 'Online store (Shopify / WooCommerce / Tiendanube)', from: 1750 }],
    note: 'Con pasarela de pago local, catálogo e inventario.', noteEn: 'With local payment gateway, catalog and inventory.',
  },
  {
    key: 'web', label: 'Página web', labelEn: 'Website', kind: 'setup',
    scopes: [
      { id: 'landing', label: 'Landing page profesional', from: 1800 },
      { id: 'corp', label: 'Web corporativa (5–8 secciones)', from: 4500 },
    ],
    scopesEn: [
      { id: 'landing', label: 'Professional landing page', from: 850 },
      { id: 'corp', label: 'Corporate website (5–8 sections)', from: 1200 },
    ],
  },
  {
    key: 'seo', label: 'Posicionamiento SEO', labelEn: 'SEO positioning', kind: 'monthly',
    scopes: [{ id: 'seo', label: 'SEO mensual (auditoría, on-page, contenido y reporte)', from: 1800 }],
    scopesEn: [{ id: 'seo', label: 'Monthly SEO (audit, on-page, content and report)', from: 500 }],
  },
  {
    key: 'ads', label: 'Google Ads / SEM', labelEn: 'Google Ads / SEM', kind: 'monthly',
    scopes: [{ id: 'ads', label: 'Gestión de campañas Google Ads', from: 1800 }],
    scopesEn: [{ id: 'ads', label: 'Google Ads campaign management', from: 800 }],
    note: '+ presupuesto de pauta aparte (mínimo referencial S/1,500/mes a Google).',
    noteUs: '+ presupuesto de pauta aparte (mínimo referencial $400/mes a Google).',
    noteEn: '+ separate ad budget (reference minimum $400/mo paid to Google).',
  },
  {
    key: 'branding', label: 'Branding e identidad', labelEn: 'Branding & identity', kind: 'setup',
    scopes: [{ id: 'branding', label: 'Identidad visual (logo + manual de marca)', from: 500 }],
    scopesEn: [{ id: 'branding', label: 'Visual identity (logo + brand manual)', from: 500 }],
  },
  {
    key: 'social', label: 'Redes sociales', labelEn: 'Social media', kind: 'monthly',
    scopes: [{ id: 'social', label: 'Gestión de redes (8–12 piezas/mes)', from: 1500 }],
    scopesEn: [{ id: 'social', label: 'Social management (8–12 pieces/mo)', from: 800 }],
  },
]

const COPY = {
  es: {
    eyebrow: 'Cotizador · 3R Core',
    // 28-sep-2026: H1 con la búsqueda real («cotizador de pagina web», pos. 29).
    h1: 'Cotizador de páginas web en Perú 2026',
    sub: 'Marca lo que necesitas (página web, tienda online, SEO o Google Ads) y te damos un estimado referencial al instante, sin dejar tus datos. El precio exacto lo afinamos contigo por WhatsApp.',
    step1: '1. ¿Qué necesitas?',
    step2: '2. Tu estimado referencial',
    setupLabel: 'Inversión inicial',
    monthlyLabel: 'Mensual',
    from: 'desde',
    perMonth: '/ mes',
    empty: 'Marca al menos un servicio para ver tu estimado.',
    name: 'Tu nombre',
    phone: 'Tu WhatsApp (ej. 999 999 999)',
    cta: 'Cotizar por WhatsApp',
    disclaimer: 'Estimado 100% referencial, no es la cotización final. Precios netos en soles, no incluyen IGV. El precio exacto se confirma por WhatsApp.',
    needName: 'Escribe tu nombre y WhatsApp para enviarte la cotización.',
  },
  // 29-ago-2026. /us usaba el copy de Perú entero, así que un comprador
  // estadounidense veía precios en dólares y debajo, literalmente, «Precios
  // netos en soles, no incluyen IGV». El IGV es un impuesto peruano.
  us: {
    eyebrow: 'Cotizador · 3R Core',
    h1: 'Calcula el estimado de tu proyecto',
    sub: 'Marca lo que necesitas y te damos un estimado referencial al instante. El precio exacto lo afinamos contigo por WhatsApp.',
    step1: '1. ¿Qué necesitas?',
    step2: '2. Tu estimado referencial',
    setupLabel: 'Inversión inicial',
    monthlyLabel: 'Mensual',
    from: 'desde',
    perMonth: '/ mes',
    empty: 'Marca al menos un servicio para ver tu estimado.',
    name: 'Tu nombre',
    phone: 'Tu WhatsApp',
    cta: 'Cotizar por WhatsApp',
    disclaimer: 'Estimado 100% referencial, no es la cotización final. Precios netos en dólares estadounidenses. El precio exacto se confirma por WhatsApp.',
    needName: 'Escribe tu nombre y WhatsApp para enviarte la cotización.',
  },
  en: {
    eyebrow: 'Quote calculator · 3R Core',
    h1: 'Estimate your project',
    sub: 'Check what you need and get an instant reference estimate. We fine-tune the exact price with you on WhatsApp.',
    step1: '1. What do you need?',
    step2: '2. Your reference estimate',
    setupLabel: 'Setup investment',
    monthlyLabel: 'Monthly',
    from: 'from',
    perMonth: '/ mo',
    empty: 'Select at least one service to see your estimate.',
    name: 'Your name',
    phone: 'Your WhatsApp',
    cta: 'Get a quote on WhatsApp',
    disclaimer: '100% reference estimate, not the final quote. Net prices in U.S. dollars. The exact price is confirmed on WhatsApp.',
    needName: 'Enter your name and WhatsApp so we can send your quote.',
  },
}

// Antes formateaba SIEMPRE en soles: el cotizador de /en mostraba "S/ 1,800"
// a un visitante estadounidense. La moneda va con el mercado, no con el idioma.
const fmt = (n: number, usd: boolean) =>
  usd ? '$ ' + n.toLocaleString('en-US') : 'S/ ' + n.toLocaleString('es-PE')

export default function Cotizador({ locale }: { locale: string }) {
  const isEn = locale === 'en'
  // es-US: textos en español, tarifas y moneda de EE.UU.
  const isUs = locale === 'us'
  const isUsd = isEn || isUs
  // El IDIOMA y la MONEDA son dos cosas distintas: /us habla español y cobra
  // en dólares. Mezclarlas en una sola variable era el origen del problema.
  const t = COPY[isEn ? 'en' : isUs ? 'us' : 'es']
  // selección: { [serviceKey]: scopeId }
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [nombre, setNombre] = useState('')
  const [celular, setCelular] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Antes: `isUsd ? s.scopesEn : s.scopes`, o sea que /us se llevaba las
  // etiquetas EN INGLÉS junto con los importes en dólares — marco en español y
  // catálogo en inglés en la misma pantalla. Ahora la etiqueta sale del idioma
  // y el importe del mercado, cruzando ambas listas por el id del alcance.
  const scopesOf = (s: Service): Scope[] => {
    const importes = isUsd ? s.scopesEn : s.scopes
    if (isEn) return importes
    return importes.map((sc) => ({
      ...sc,
      label: s.scopes.find((es) => es.id === sc.id)?.label ?? sc.label,
    }))
  }

  // En Estados Unidos solo se venden tres servicios: web, SEO y tiendas online.
  // El cotizador ofrecía los siete, incluidos los que allí van con noindex.
  const SERVICIOS_VISIBLES = isUsd
    ? SERVICES.filter((s) => ['tienda', 'web', 'seo'].includes(s.key))
    : SERVICES

  const toggle = (s: Service, scopeId: string) => {
    setSelected((prev) => {
      const next = { ...prev }
      if (next[s.key] === scopeId) delete next[s.key]
      else next[s.key] = scopeId
      return next
    })
  }

  const { setupTotal, monthlyTotal, chosen } = useMemo(() => {
    let setup = 0
    let monthly = 0
    const labels: string[] = []
    for (const s of SERVICIOS_VISIBLES) {
      const scopeId = selected[s.key]
      if (!scopeId) continue
      const scope = scopesOf(s).find((x) => x.id === scopeId)
      if (!scope) continue
      if (s.kind === 'setup') setup += scope.from
      else monthly += scope.from
      labels.push(`${isEn ? s.labelEn : s.label} (${scope.label})`)
    }
    return { setupTotal: setup, monthlyTotal: monthly, chosen: labels }
  }, [selected, isEn])

  const hasSelection = chosen.length > 0

  const submit = async () => {
    if (!hasSelection) return
    if (!nombre.trim() || !celular.trim()) {
      setError(t.needName)
      return
    }
    setError('')
    setLoading(true)
    // Lead al panel/CRM (recursos propios). El mensaje NO lleva el precio: solo
    // los servicios elegidos, para que el cliente PIDA la cotización exacta.
    const specs = chosen.join(' + ')
    try {
      fetch('/api/wa-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          celular: celular.trim(),
          proyecto: `Cotizador: ${specs}`,
          origin: typeof window !== 'undefined' ? window.location.pathname : '/cotizar',
        }),
        keepalive: true,
      }).catch(() => {})
    } catch { /* best-effort */ }

    if (typeof window !== 'undefined') {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({ event: 'generate_lead', lead_source: 'cotizador', page_path: '/cotizar' })
      ;(window as any).dataLayer.push({ event: 'whatsapp_click', wa_phone: WA_LEADS, wa_source: '/cotizar' })
    }

    const msg = isEn
      ? `Hi, I'm ${nombre.trim()}. I want to get a quote for: ${specs}. Could you send me the exact quote?`
      : `Hola, soy ${nombre.trim()}. Quiero cotizar: ${specs}. ¿Me pasan la cotización exacta?`
    window.open(waUrl(WA_LEADS, msg), '_blank', 'noopener,noreferrer')
    setLoading(false)
  }

  return (
    <section className="relative z-10 bg-[#0D0010] text-white px-6 md:px-12 pt-32 md:pt-36 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] tracking-[0.35em] uppercase text-[#E91E63] font-medium mb-4">{t.eyebrow}</p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight max-w-3xl mb-4">{t.h1}</h1>
        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mb-12">{t.sub}</p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Paso 1 — servicios */}
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold mb-5">{t.step1}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICIOS_VISIBLES.map((s) => {
                const scopes = scopesOf(s)
                return (
                  <div key={s.key} className="rounded-[18px] border border-white/10 bg-white/[0.03] p-5">
                    <p className="font-semibold mb-3 text-white">{isEn ? s.labelEn : s.label}</p>
                    <div className="flex flex-col gap-2">
                      {scopes.map((sc) => {
                        const active = selected[s.key] === sc.id
                        return (
                          <button
                            key={sc.id}
                            type="button"
                            onClick={() => toggle(s, sc.id)}
                            aria-pressed={active}
                            className={`text-left rounded-xl px-4 py-3 text-sm transition-all border ${
                              active
                                ? 'border-transparent bg-gradient-to-r from-[#E91E63] to-[#9C27B0] text-white'
                                : 'border-white/12 text-white/70 hover:border-[#A21F8A]/50'
                            }`}
                          >
                            <span className="flex items-center justify-between gap-3">
                              <span>{sc.label}</span>
                              <span className="text-[11px] whitespace-nowrap opacity-80">
                                {t.from} {fmt(sc.from, isUsd)}{s.kind === 'monthly' ? t.perMonth : ''}
                              </span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    {(isEn ? s.noteEn : isUs ? (s.noteUs ?? s.note) : s.note) && (
                      <p className="text-white/40 text-xs mt-3">{isEn ? s.noteEn : isUs ? (s.noteUs ?? s.note) : s.note}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Paso 2 — estimado + captura (panel oscuro con acento magenta) */}
          <aside className="rounded-[22px] border border-[#A21F8A]/30 bg-gradient-to-br from-[#2F0729] to-[#1A0417] p-7 lg:sticky lg:top-24">
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#E91E63] font-bold mb-5">{t.step2}</h2>

            {!hasSelection ? (
              <p className="text-white/50 text-sm py-6">{t.empty}</p>
            ) : (
              <div className="space-y-4 mb-6">
                {setupTotal > 0 && (
                  <div className="flex items-end justify-between border-b border-white/10 pb-3">
                    <span className="text-white/60 text-sm">{t.setupLabel}</span>
                    <span className="text-2xl font-bold">{t.from} {fmt(setupTotal, isUsd)}</span>
                  </div>
                )}
                {monthlyTotal > 0 && (
                  <div className="flex items-end justify-between border-b border-white/10 pb-3">
                    <span className="text-white/60 text-sm">{t.monthlyLabel}</span>
                    <span className="text-2xl font-bold">{t.from} {fmt(monthlyTotal, isUsd)}<span className="text-sm font-normal text-white/50">{t.perMonth}</span></span>
                  </div>
                )}
                <ul className="text-white/55 text-xs space-y-1 pt-1">
                  {chosen.map((c) => (
                    <li key={c} className="flex gap-2"><span className="text-[#E91E63]">·</span><span>{c}</span></li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <input
                type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={t.name}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#25d366] transition"
              />
              <input
                type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} placeholder={t.phone}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#25d366] transition"
              />
              {error && <p className="text-[#ff8fa3] text-xs">{error}</p>}
              <button
                type="button" onClick={submit} disabled={loading || !hasSelection}
                className="inline-flex items-center justify-center gap-2 bg-[#25d366] text-black px-6 py-4 rounded-full font-semibold hover:bg-[#1fba57] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
                {t.cta}
              </button>
              <p className="text-white/40 text-[11px] leading-relaxed">{t.disclaimer}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
