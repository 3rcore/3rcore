'use client'

import { useState } from 'react'
import { WA_LEADS } from '@/lib/contact'
import { trackConversion } from '@/lib/track'
import { openWhatsAppNative } from '@/lib/wa-native-open'

/**
 * PillarWaCapture — captura de leads nativa para las páginas pilar (recursos
 * propios, sin terceros): nombre + WhatsApp + qué necesita → guarda el lead en
 * el panel/CRM vía /api/wa-lead (token server-side) y abre el chat de WhatsApp
 * con el contexto pre-llenado. Mide generate_lead + whatsapp_click en GA4/GTM.
 *
 * Nació para /tiendas-virtuales-lima, que antes mandaba su CTA a /es/#contacto
 * (un salto de página extra hacia el formulario del home).
 */

const WA_PHONE = WA_LEADS

const COPY = {
  es: {
    name: 'Tu nombre',
    phone: 'Tu WhatsApp (ej. 999 999 999)',
    project: '¿Qué vendes o qué necesitas?',
    btn: 'Cotizar por WhatsApp',
    sending: 'Abriendo WhatsApp…',
    direct: 'o escríbenos directo:',
    directBtn: 'Abrir WhatsApp',
    privacy: 'Tus datos solo se usan para responderte la cotización.',
  },
  en: {
    name: 'Your name',
    phone: 'Your WhatsApp',
    project: 'What do you sell or need?',
    btn: 'Get a quote on WhatsApp',
    sending: 'Opening WhatsApp…',
    direct: 'or message us directly:',
    directBtn: 'Open WhatsApp',
    privacy: 'Your data is only used to reply to your quote.',
  },
}

export default function PillarWaCapture({ locale, service }: { locale: string; service: string }) {
  const t = COPY[locale === 'en' ? 'en' : 'es']
  const [nombre, setNombre] = useState('')
  const [celular, setCelular] = useState('')
  const [proyecto, setProyecto] = useState('')
  const [loading, setLoading] = useState(false)

  const origin = typeof window !== 'undefined' ? window.location.pathname : ''

  const openWa = (msg: string) => {
    const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`
    // Ya se capturó nombre + WhatsApp arriba: se abre directo, sin pasar por
    // el interceptor global (WhatsAppLeadGate), que si no volvería a pedirlos.
    openWhatsAppNative(url, '_blank', 'noopener,noreferrer')
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!nombre.trim() || !celular.trim()) return
    setLoading(true)
    // Lead al panel/CRM (best-effort, no bloquea la apertura del chat).
    try {
      fetch('/api/wa-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          celular: celular.trim(),
          proyecto: [`Servicio: ${service}`, proyecto.trim()].filter(Boolean).join(' · '),
          origin,
        }),
        keepalive: true,
      }).catch(() => {})
    } catch { /* best-effort */ }

    // Conversión filtrada: ver lib/track.ts (63% de los keyEvents de GA4 eran
    // automatizados en ago-2026).
    trackConversion('generate_lead', { lead_source: 'pillar_wa_capture', cta_service: service, page_path: origin }, e.nativeEvent)
    trackConversion('whatsapp_click', { wa_phone: WA_PHONE, wa_source: origin }, e.nativeEvent)

    openWa(
      locale === 'en'
        ? `Hi, I'm ${nombre.trim()}. I'm interested in ${service}. ${proyecto.trim()}`.trim()
        : `Hola, soy ${nombre.trim()}. Me interesa ${service}. ${proyecto.trim()}`.trim()
    )
    setLoading(false)
  }

  const onDirect = (e: React.MouseEvent) => {
    trackConversion('whatsapp_click', { wa_phone: WA_PHONE, wa_source: origin }, e.nativeEvent)
    openWa(locale === 'en' ? `Hi, I'm interested in ${service}.` : `Hola, me interesa ${service}.`)
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 text-left">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder={t.name}
          required
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
          value={proyecto}
          onChange={(e) => setProyecto(e.target.value)}
          placeholder={t.project}
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#25d366] transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-[#25d366] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#1fba57] transition disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
          {loading ? t.sending : t.btn}
        </button>
      </form>
      <p className="text-white/40 text-xs mt-3">{t.privacy}</p>
      <p className="text-white/60 text-sm mt-6">
        {t.direct}{' '}
        <button onClick={onDirect} className="underline decoration-[#25d366] underline-offset-4 hover:text-[#25d366] transition font-semibold">
          {t.directBtn}
        </button>
      </p>
    </div>
  )
}
