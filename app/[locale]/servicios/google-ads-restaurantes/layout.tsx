import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { NextIntlClientProvider } from "next-intl"
import { sectorPageMessages } from "@/lib/pickMessages"
import { getMessages, setRequestLocale } from "next-intl/server"

// 11-oct-2026. Página «Google Ads para restaurantes» (demanda medida en el
// autocompletado de Google Perú). Solo existe en /es: en /en y /us da 404,
// igual que las landings de Perú (en EE.UU. no se vende Google Ads).
const PATH = '/servicios/google-ads-restaurantes'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: PATH,
    titleEs: "Google Ads para restaurantes: anuncios en Lima | 3R Core",
    titleEn: "Google Ads para restaurantes: anuncios en Lima | 3R Core",
    descriptionEs: "Publicidad en Google para restaurantes en Lima: anuncios por turno y radio de delivery, con cada llamada, reserva y pedido por WhatsApp medido.",
    descriptionEn: "Publicidad en Google para restaurantes en Lima: anuncios por turno y radio de delivery, con cada llamada, reserva y pedido por WhatsApp medido.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: "3R Core - Google Ads para restaurantes",
    },
    noindex: locale !== 'es',
    onlyLocales: ['es'],
  })
}

export default async function GoogleAdsRestaurantesLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  const messages = (await getMessages()) as any
  const faqMessages = messages?.GoogleAdsRestaurantesFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Gestión de Google Ads para restaurantes en Lima",
    nameEn: "Gestión de Google Ads para restaurantes en Lima",
    descriptionEs: "3R Core gestiona campañas de Google Ads para restaurantes, cevicherías y pollerías en Perú, separadas por reserva y delivery. Cada llamada, reserva y pedido por WhatsApp queda medido con el clic de Google que lo trajo.",
    descriptionEn: "3R Core gestiona campañas de Google Ads para restaurantes, cevicherías y pollerías en Perú, separadas por reserva y delivery. Cada llamada, reserva y pedido por WhatsApp queda medido con el clic de Google que lo trajo.",
    serviceType: "Google Ads Management for Restaurants",
    minPriceEs: 1800,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    audienceTypes: ["Restaurants", "Seafood restaurants", "Rotisserie chicken restaurants", "Food delivery businesses"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }, { name: "Google Ads para restaurantes", path: PATH }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <NextIntlClientProvider messages={sectorPageMessages(messages, 'GoogleAdsRestaurantes')}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
