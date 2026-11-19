'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/routing'

/**
 * Calculadora de presupuesto e IGV para Facebook e Instagram Ads en Perú
 * (/es/calculadora-publicidad-facebook-instagram, 19-nov-2026).
 *
 * Reglas:
 *  - Cifras NO inventadas: solo los rangos que 3R Core ya publica en
 *    /es/blogs/cuanto-cuesta-publicidad-facebook-instagram-peru-2026
 *    (CPM S/8–25 · CPC S/0.30–1.50 · costo por mensaje S/2–12 · CPL S/3–40 ·
 *    piso práctico S/600 al mes) y el IGV del 18 % que esa guía explica.
 *  - El resultado es un RANGO, nunca un número único: Meta funciona por subasta.
 *  - Sin widgets de terceros ni llamadas a APIs: todo se calcula en el navegador.
 */

type Objetivo = 'mensajes' | 'leads' | 'clics' | 'alcance'

const RANGOS: Record<Objetivo, { label: string; unidad: string; min: number; max: number; por: number }> = {
  mensajes: { label: 'Mensajes de WhatsApp', unidad: 'mensajes', min: 2, max: 12, por: 1 },
  leads: { label: 'Leads (formulario o WhatsApp calificado)', unidad: 'leads', min: 3, max: 40, por: 1 },
  clics: { label: 'Visitas a tu web', unidad: 'clics', min: 0.3, max: 1.5, por: 1 },
  alcance: { label: 'Alcance (impresiones)', unidad: 'impresiones', min: 8, max: 25, por: 1000 },
}

const PISO = 600
const IGV = 0.18

const soles = (n: number) => 'S/ ' + Math.round(n).toLocaleString('es-PE')
const num = (n: number) => Math.round(n).toLocaleString('es-PE')

export default function MetaAdsBudgetCalculator() {
  const [monto, setMonto] = useState<string>('1500')
  const [objetivo, setObjetivo] = useState<Objetivo>('mensajes')
  const [conRuc, setConRuc] = useState(false)
  const [incluyeIgv, setIncluyeIgv] = useState(false)

  const r = useMemo(() => {
    const m = Math.max(0, Number(String(monto).replace(/[^\d.]/g, '')) || 0)
    // Si el monto es el tope total con IGV, la pauta neta que entra a la subasta es menor.
    const neto = incluyeIgv && !conRuc ? m / (1 + IGV) : m
    const igv = conRuc ? 0 : neto * IGV
    const total = neto + igv
    const o = RANGOS[objetivo]
    // Más resultados con el costo bajo del rango, menos con el alto.
    const resMax = (neto / o.min) * o.por
    const resMin = (neto / o.max) * o.por
    const impMax = (neto / 8) * 1000
    const impMin = (neto / 25) * 1000
    return { m, neto, igv, total, resMin, resMax, impMin, impMax, o }
  }, [monto, objetivo, conRuc, incluyeIgv])

  const campo = 'w-full rounded-xl bg-white/[0.06] border border-white/15 px-4 py-3 text-white text-lg focus:outline-none focus:border-[#E91E63]'
  const boton = (activo: boolean) =>
    `text-left rounded-xl border px-4 py-3 text-sm transition ${activo ? 'border-[#E91E63] bg-[#E91E63]/10 text-white' : 'border-white/15 text-white/70 hover:border-white/40'}`

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div>
          <label htmlFor="monto-meta" className="block text-sm font-semibold mb-2">¿Cuánto quieres invertir al mes en Meta? (soles)</label>
          <input id="monto-meta" inputMode="decimal" value={monto} onChange={(e) => setMonto(e.target.value)} className={campo} />
          <label className="mt-3 flex items-center gap-3 text-sm text-white/70">
            <input type="checkbox" checked={incluyeIgv} onChange={(e) => setIncluyeIgv(e.target.checked)} className="h-5 w-5 accent-[#E91E63]" />
            Ese monto ya incluye el IGV (es mi tope total)
          </label>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold mb-2">¿Qué quieres conseguir?</legend>
          <div className="grid sm:grid-cols-2 gap-2">
            {(Object.keys(RANGOS) as Objetivo[]).map((k) => (
              <button key={k} type="button" onClick={() => setObjetivo(k)} className={boton(objetivo === k)} aria-pressed={objetivo === k}>
                {RANGOS[k].label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 text-sm text-white/70">
          <input type="checkbox" checked={conRuc} onChange={(e) => setConRuc(e.target.checked)} className="mt-0.5 h-5 w-5 accent-[#E91E63]" />
          <span>Mi cuenta publicitaria de Meta tiene cargado un RUC de empresa válido (empieza con 20) en el Centro de pagos</span>
        </label>
      </div>

      <div className="rounded-2xl border border-[#E91E63]/40 bg-[#E91E63]/[0.06] p-6 space-y-5" aria-live="polite">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">Pauta que entra a la subasta</p>
          <p className="text-3xl font-bold">{soles(r.neto)} <span className="text-base font-normal text-white/60">al mes</span></p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/50">IGV (18 %)</p>
            <p className="text-lg font-semibold">{conRuc ? 'No lo cobra Meta' : soles(r.igv)}</p>
          </div>
          <div>
            <p className="text-white/50">Total que te factura Meta</p>
            <p className="text-lg font-semibold">{soles(r.total)}</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-5">
          <p className="text-white/50 text-sm">{r.o.label}, estimado al mes</p>
          <p className="text-2xl font-bold">
            {num(r.resMin)} a {num(r.resMax)} <span className="text-base font-normal text-white/60">{r.o.unidad}</span>
          </p>
          {r.o.unidad !== 'impresiones' && (
            <p className="text-white/60 text-sm mt-2">Alcance aproximado: {num(r.impMin)} a {num(r.impMax)} impresiones.</p>
          )}
        </div>
        {r.m > 0 && r.neto < PISO && (
          <p className="text-sm text-amber-300">
            Con menos de {soles(PISO)} al mes de pauta, Meta suele tener muy pocos datos para optimizar y los resultados varían mucho de una semana a otra.
          </p>
        )}
        <p className="text-xs text-white/50 leading-relaxed">
          Rango calculado con los costos típicos que publicamos para Perú (CPM S/8–25, CPC S/0.30–1.50, costo por mensaje S/2–12, costo por lead S/3–40). Los rubros masivos se acercan al extremo con más resultados; los de ticket alto, al de menos. Es una referencia, no una promesa.
        </p>
        <Link href="/cotizar" className="inline-block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-[#E91E63] to-[#9C27B0] text-white font-semibold hover:opacity-90 transition">
          Quiero que revisen mi caso
        </Link>
      </div>
    </div>
  )
}
