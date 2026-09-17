'use client';
import { ThinkingOrb } from 'thinking-orbs';
import type { OrbState, OrbSize } from 'thinking-orbs';

/**
 * El orb de `thinking-orbs` con el rosa de 3RCORE.
 *
 * El paquete pinta el canvas en gris (`rgba(v,v,v,a)`) y no expone ningún prop
 * de color, así que el tinte se hace con un filtro SVG. Como la tinta es gris
 * pura, basta una matriz que reparta el canal rojo —que es el valor de cada
 * punto— entre los tres canales del rosa: el sombreado y el alfa del orb se
 * conservan intactos, cosa que un `filter: brightness(0) …` de CSS aplanaría.
 *
 * Los factores son #FF2E88 (1, 0.1804, 0.5333) multiplicados por 255/242. Con
 * el tema oscuro la tinta más clara que dibuja el motor es 242 en `connecting`
 * y 235 en `searching` y `working`; ese factor lleva el punto más brillante
 * hasta el rosa pleno sin que ningún canal llegue a recortarse.
 *
 * `color-interpolation-filters="sRGB"` es obligatorio: por defecto el filtro
 * trabajaría en linearRGB y el rosa saldría desviado.
 */
const FILTER_ID = 'brand-orb-tint';

interface BrandOrbProps {
  /** Animación del orb. @default 'searching' */
  state?: OrbState;
  /** 64 (escala grande) o 20 (en línea con texto). Son dos diseños distintos. */
  size?: OrbSize;
  /** Texto para lectores de pantalla; si se omite, el paquete pone el suyo. */
  label?: string;
}

export default function BrandOrb({ state = 'searching', size = 64, label }: BrandOrbProps) {
  return (
    <>
      {/* El filtro tiene que estar en el documento para que `url(#…)` resuelva:
          si no resuelve, el navegador deja de pintar el elemento filtrado. */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <filter id={FILTER_ID} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1.0537 0 0 0 0
                    0.1901 0 0 0 0
                    0.5620 0 0 0 0
                    0      0 0 1 0"
          />
        </filter>
      </svg>

      {/* `theme="dark"` fija la tinta clara. En 'auto' el orb miraría el tema
          del sistema y con un visitante en modo claro pintaría tinta oscura,
          que al pasar por el filtro quedaría casi negra sobre fondo oscuro. */}
      <ThinkingOrb
        state={state}
        size={size}
        theme="dark"
        aria-label={label}
        style={{ filter: `url(#${FILTER_ID})` }}
      />
    </>
  );
}
