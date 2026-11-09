"use client"

import type { ReactNode } from "react"

/**
 * Rejilla con luz que sigue al cursor. Las tarjetas (marcadas con
 * data-spot) llegan ya renderizadas desde el servidor; aquí solo se escucha
 * el mouse y se pasa su posición a la tarjeta como --mx / --my, que usa el
 * degradado radial de la propia tarjeta.
 */
export default function SpotlightGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <ul
      className={className}
      onMouseMove={(e) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>("[data-spot]")
        if (!card) return
        const r = card.getBoundingClientRect()
        card.style.setProperty("--mx", `${e.clientX - r.left}px`)
        card.style.setProperty("--my", `${e.clientY - r.top}px`)
      }}
    >
      {children}
    </ul>
  )
}
