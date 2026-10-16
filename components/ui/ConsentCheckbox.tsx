'use client'

import { useLocale, useTranslations } from 'next-intl'
import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

/**
 * Casilla de consentimiento para comunicaciones comerciales por correo.
 *
 * - Ley 29733 (datos personales): desmarcada por defecto y NO obligatoria
 *   para enviar el formulario.
 * - Ley 28493: quien la marca da su consentimiento expreso, así que el correo
 *   comercial del panel no necesita «PUBLICIDAD:» en el asunto.
 *
 * El valor viaja a /panel/api/lead-ingest como `consentimiento_publicidad`
 * (boolean, true solo si se marcó) a través de /api/wa-lead, /api/contact y
 * /api/landing.
 *
 * Solo pinta: cada formulario le pasa los textos con su propio sistema de
 * traducción (`useMarketingConsentCopy` para los que viven bajo next-intl, o
 * texto fijo en los formularios que ya son de un solo idioma). El enlace a la
 * política va FUERA del <label> para que tocarlo no marque la casilla, y abre
 * en otra pestaña para no perder lo escrito.
 */
type Props = {
  id: string
  text: string
  privacyLabel: string
  privacyHref: string
  /** Controlado (formularios con estado). Sin onChange queda no controlado y se lee del FormData. */
  checked?: boolean
  onChange?: (checked: boolean) => void
  name?: string
  /** Color de la casilla marcada y del anillo de foco: el acento del formulario. */
  accent?: string
  className?: string
  linkClassName?: string
}

export default function ConsentCheckbox({
  id,
  text,
  privacyLabel,
  privacyHref,
  checked,
  onChange,
  name = 'consentimiento_publicidad',
  accent = '#E91E63',
  className = '',
  linkClassName = '',
}: Props) {
  return (
    <div className={`flex items-start gap-2.5 text-left ${className}`}>
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={onChange ? !!checked : undefined}
        onChange={onChange ? (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked) : undefined}
        style={{ accentColor: accent, outlineColor: accent }}
        className="mt-[2px] h-4 w-4 shrink-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      />
      <p className="m-0">
        <label htmlFor={id} className="cursor-pointer">{text}</label>{' '}
        <a
          href={privacyHref}
          target="_blank"
          rel="noopener"
          className={`underline underline-offset-2 hover:opacity-80 ${linkClassName}`}
        >
          {privacyLabel}
        </a>
      </p>
    </div>
  )
}

/** Textos y enlace a la política según el locale actual (/us hereda de es.json). */
export function useMarketingConsentCopy() {
  const t = useTranslations('MarketingConsent')
  const locale = useLocale() as (typeof routing.locales)[number]
  return {
    text: t('text'),
    privacyLabel: t('privacy'),
    privacyHref: getPathname({ href: '/politicas', locale }),
  }
}
