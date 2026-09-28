"use client"
import { useTranslations, useLocale } from "next-intl"
import { isIndexableIn } from "@/lib/indexableRoutes"
import type { AppPathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing"

interface RelatedLink {
  href: AppPathname
  label: string
}

interface Props {
  namespace: string
  paragraphs: number
  relatedLinks?: RelatedLink[]
  showRelated?: boolean
}

export default function SEOContentBlock({ namespace, paragraphs, relatedLinks, showRelated = true }: Props) {
  const t = useTranslations(namespace)
  // Los nombres de los servicios relacionados venían fijados en cada page.tsx
  // ("Diseño Web", "Redes Sociales", "Tiendas Virtuales"), así que salían en
  // español dentro de /en. Ahora se resuelven por href contra ServiceLinks,
  // y el label literal queda solo como respaldo.
  const tl = useTranslations("ServiceLinks")
  const byHref = tl.raw("byHref") as Record<string, string>

  const items = Array.from({ length: paragraphs }, (_, i) => i + 1)

  // 28-sep-2026. En /en los «relacionados» de /seo-agency y
  // /services/web-development enlazaban a Google Ads, Social Media y Branding,
  // que en EE.UU. van noindex (plan USA: solo SEO, web y tiendas). Se omiten
  // los destinos que no se indexan en el idioma actual.
  const locale = useLocale()
  const visibleLinks = (relatedLinks ?? []).filter((l) => isIndexableIn(l.href, locale))

  return (
    <section className="relative z-10 px-6 md:px-10 pt-8 pb-20" aria-labelledby={`${namespace}-seo-heading`}>
      <div className="max-w-4xl mx-auto">
        <h2
          id={`${namespace}-seo-heading`}
          className="text-2xl md:text-4xl font-bold italic mb-6 bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent"
        >
          {t("seoTitle")}
        </h2>
        <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-light">
          {items.map((i) => (
            <p key={i}>{t(`p${i}`)}</p>
          ))}
        </div>

        {showRelated && visibleLinks.length > 0 && (
          <div className="mt-10 pt-6 border-t border-white/20">
            <p className="text-white/80 text-sm uppercase tracking-widest font-light mb-4">
              {t("relatedTitle")}
            </p>
            <ul className="flex flex-wrap gap-3">
              {visibleLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block px-4 py-2 rounded-full border border-[#E91E63]/50 text-white text-sm hover:bg-gradient-to-r hover:from-[#E91E63] hover:to-[#9C27B0] hover:border-transparent transition-all duration-300"
                  >
                    {byHref?.[link.href] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
