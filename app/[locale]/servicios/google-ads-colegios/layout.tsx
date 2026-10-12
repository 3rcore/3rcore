import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { NextIntlClientProvider } from "next-intl"
import { sectorPageMessages } from "@/lib/pickMessages"
import { getMessages, setRequestLocale } from "next-intl/server"

// 11-oct-2026. Página «Google Ads para colegios, institutos y universidades» (demanda medida en el
// autocompletado de Google Perú). Solo existe en /es: en /en y /us da 404,
// igual que las landings de Perú (en EE.UU. no se vende Google Ads).
const PATH = '/servicios/google-ads-colegios'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: PATH,
    titleEs: "Google Ads para colegios y universidades | 3R Core",
    titleEn: "Google Ads para colegios y universidades | 3R Core",
    descriptionEs: "Publicidad en Google para colegios, institutos y universidades en Perú: campañas de admisión por temporada con cada solicitud de padres medida.",
    descriptionEn: "Publicidad en Google para colegios, institutos y universidades en Perú: campañas de admisión por temporada con cada solicitud de padres medida.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: "3R Core - Google Ads para colegios",
    },
    noindex: locale !== 'es',
    onlyLocales: ['es'],
  })
}

export default async function GoogleAdsColegiosLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  const messages = (await getMessages()) as any
  const faqMessages = messages?.GoogleAdsColegiosFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Gestión de Google Ads para colegios en Lima",
    nameEn: "Gestión de Google Ads para colegios en Lima",
    descriptionEs: "3R Core gestiona campañas de Google Ads de admisión para colegios privados, institutos y universidades en Perú. Cada solicitud de informes, visita y matrícula queda medida con el clic de Google que la trajo.",
    descriptionEn: "3R Core gestiona campañas de Google Ads de admisión para colegios privados, institutos y universidades en Perú. Cada solicitud de informes, visita y matrícula queda medida con el clic de Google que la trajo.",
    serviceType: "Google Ads Management for Schools and Universities",
    minPriceEs: 1800,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    audienceTypes: ["Private schools", "Technical institutes", "Universities", "Parents of school-age children"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }, { name: "Google Ads para colegios", path: PATH }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <NextIntlClientProvider messages={sectorPageMessages(messages, 'GoogleAdsColegios')}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
