import type { Metadata } from "next"
import { getMessages } from "next-intl/server"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { SEO_SECTORES } from "@/lib/seo-sectores"

/**
 * Metadatos y schema (Service + FAQPage + BreadcrumbList) de las páginas
 * «SEO para <sector>». Solo existen en /es: fuera de /es la página da 404
 * (page.tsx) y aquí van noindex sin hreflang hacia otros locales.
 */
export async function seoSectorMetadata(slug: string, locale: string): Promise<Metadata> {
  const s = SEO_SECTORES[slug]
  if (locale !== 'es') return { robots: { index: false, follow: false } }
  const messages = (await getMessages()) as any
  const m = messages?.[s.ns]?.meta ?? {}
  return generatePageMetadata({
    locale,
    path: s.path,
    titleEs: m.title,
    titleEn: m.title,
    descriptionEs: m.description,
    descriptionEn: m.description,
    ogImage: {
      url: 'https://3rcore.com/og/posicionamiento-seo.jpg',
      width: 1200,
      height: 630,
      alt: `${s.nombre} - 3R Core`,
    },
    onlyLocales: ['es'],
  })
}

export async function SeoSectorShell({ slug, locale, children }: { slug: string; locale: string; children: React.ReactNode }) {
  if (locale !== 'es') return <>{children}</>
  const s = SEO_SECTORES[slug]
  const messages = (await getMessages()) as any
  const ns = messages?.[s.ns] ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: s.path,
    nameEs: ns.h1 ?? s.nombre,
    nameEn: s.nombre,
    descriptionEs: ns.meta?.description ?? '',
    descriptionEn: ns.meta?.description ?? '',
    serviceType: s.serviceType,
    minPriceEs: 1800,
    offerPriceEs: 1800,
    areaServed: ['PE'],
    audienceTypes: s.audiencia,
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(ns.faqs ?? {}).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Inicio', path: '' },
      { name: 'Posicionamiento SEO', path: '/posicionamiento-seo' },
      { name: s.nombre, path: s.path },
    ],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  )
}
