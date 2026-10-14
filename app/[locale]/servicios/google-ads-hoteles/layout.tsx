import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { NextIntlClientProvider } from "next-intl"
import { sectorPageMessages } from "@/lib/pickMessages"
import { getMessages, setRequestLocale } from "next-intl/server"

// 11-oct-2026. Página «Google Ads para hoteles y hospedajes» (demanda medida en el
// autocompletado de Google Perú). Solo existe en /es: en /en y /us da 404,
// igual que las landings de Perú (en EE.UU. no se vende Google Ads).
const PATH = '/servicios/google-ads-hoteles'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: PATH,
    titleEs: "Google Ads para hoteles: anuncios en Perú | 3R Core",
    titleEn: "Google Ads para hoteles: anuncios en Perú | 3R Core",
    descriptionEs: "Publicidad en Google para hoteles en Perú: Hotel Ads y búsqueda para ganar reservas directas frente a Booking y Expedia, con cada reserva medida.",
    descriptionEn: "Publicidad en Google para hoteles en Perú: Hotel Ads y búsqueda para ganar reservas directas frente a Booking y Expedia, con cada reserva medida.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: "3R Core - Google Ads para hoteles",
    },
    noindex: locale !== 'es',
    onlyLocales: ['es'],
  })
}

export default async function GoogleAdsHotelesLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  const messages = (await getMessages()) as any
  const faqMessages = messages?.GoogleAdsHotelesFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Gestión de Google Ads para hoteles en Lima",
    nameEn: "Gestión de Google Ads para hoteles en Lima",
    descriptionEs: "3R Core gestiona campañas de Google Ads para hoteles, hostales y lodges en Perú, con Performance Max para objetivos de viajes y campañas de búsqueda orientadas a la reserva directa. Cada reserva se mide en la cuenta del hotel.",
    descriptionEn: "3R Core gestiona campañas de Google Ads para hoteles, hostales y lodges en Perú, con Performance Max para objetivos de viajes y campañas de búsqueda orientadas a la reserva directa. Cada reserva se mide en la cuenta del hotel.",
    serviceType: "Google Ads Management for hotels",
    minPriceEs: 1800,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    audienceTypes: ["Hotels", "Boutique hotels", "Lodges", "Hostels"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }, { name: "Google Ads para hoteles", path: PATH }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <NextIntlClientProvider messages={sectorPageMessages(messages, 'GoogleAdsHoteles')}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
