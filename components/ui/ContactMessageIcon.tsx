/**
 * Icono de contacto del diseño (`diseno3rcore/contacto-icono.svg`).
 *
 * Los trazos usan `currentColor` en vez del blanco fijo del archivo original,
 * para que siga al color del botón que lo contiene: el flotante de contacto
 * pasa de blanco a rosa al posar el cursor.
 */
export default function ContactMessageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 19"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="0.75" y="0.75" width="18" height="17" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.25 6.75H14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.75 11.75H12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
