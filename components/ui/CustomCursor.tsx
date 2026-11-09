"use client"

import { useEffect, useRef } from "react"

/**
 * Anillo decorativo del cursor de 3R Core. El cursor en sí (flecha y mano con
 * los colores de la marca) es CSS puro en globals.css, así que siempre se
 * reconoce y no tiene retraso. Este anillo lo acompaña con algo de inercia:
 *  - Sobre enlaces y botones crece y se llena de un brillo rosado.
 *  - Al hacer clic se encoge un instante.
 *  - Sobre campos de texto se oculta.
 * Solo en dispositivos con mouse (pointer: fine). Con «reducir movimiento» va
 * pegado al puntero, sin inercia. Se mueve con transform en un
 * requestAnimationFrame: no provoca renders de React.
 */
const INTERACTIVO = 'a, button, [role="button"], label, select, summary, [data-cursor="hover"]'
const TEXTO = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]'

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const r = ring.current
    if (!r) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const html = document.documentElement
    let x = -100, y = -100, rx = -100, ry = -100
    let raf = 0
    let visible = false

    const loop = () => {
      const k = reduce ? 1 : 0.2
      rx += (x - rx) * k
      ry += (y - ry) * k
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.1 ? requestAnimationFrame(loop) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      x = e.clientX
      y = e.clientY
      if (!visible) {
        // primera vez: el anillo aparece ya en su sitio, sin venir volando
        visible = true
        rx = x
        ry = y
        html.classList.add("cursor-3r")
      }
      const t = e.target as Element | null
      html.classList.toggle("cursor-3r-texto", !!t?.closest?.(TEXTO))
      html.classList.toggle("cursor-3r-hover", !!t?.closest?.(INTERACTIVO))
      kick()
    }
    const onLeave = () => html.classList.add("cursor-3r-fuera")
    const onEnter = () => html.classList.remove("cursor-3r-fuera")
    const onDown = () => html.classList.add("cursor-3r-click")
    const onUp = () => html.classList.remove("cursor-3r-click")

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      html.classList.remove("cursor-3r", "cursor-3r-hover", "cursor-3r-texto", "cursor-3r-fuera", "cursor-3r-click")
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-3r-ring" aria-hidden="true">
        <span />
      </div>
    </>
  )
}
