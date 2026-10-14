import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { NextIntlClientProvider } from "next-intl"
import { sectorPageMessages } from "@/lib/pickMessages"
import { getMessages, setRequestLocale } from "next-intl/server"

// 11-oct-2026. Página «Google Ads para empresas industriales y b2b» (demanda medida en el
// autocompletado de Google Perú). Solo existe en /es: en /en y /us da 404,
// igual que las landings de Perú (en EE.UU. no se vende Google Ads).
const PATH = '/servicios/google-ads-empresas-industriales'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: PATH,
    titleEs: "Google Ads para empresas industriales y B2B | 3R Core",
    titleEn: "Google Ads para empresas industriales y B2B | 3R Core",
    descriptionEs: "Publicidad en Google para empresas industriales en Perú: anuncios por código, norma y material, y cada cotización seguida hasta la orden de compra.",
    descriptionEn: "Publicidad en Google para empresas industriales en Perú: anuncios por código, norma y material, y cada cotización seguida hasta la orden de compra.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: "3R Core - Google Ads para empresas industriales",
    },
    noindex: locale !== 'es',
    onlyLocales: ['es'],
  })
}

export default async function GoogleAdsEmpresasIndustrialesLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  const messages = (await getMessages()) as any
  const faqMessages = messages?.GoogleAdsEmpresasIndustrialesFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Gestión de Google Ads para empresas industriales en Lima",
    nameEn: "Gestión de Google Ads para empresas industriales en Lima",
    descriptionEs: "3R Core gestiona campañas de Google Ads para fabricantes, distribuidores y servicios industriales del Perú. La conversión es la solicitud de cotización y las ventas cerradas se suben desde el CRM como conversión offline.",
    descriptionEn: "3R Core gestiona campañas de Google Ads para fabricantes, distribuidores y servicios industriales del Perú. La conversión es la solicitud de cotización y las ventas cerradas se suben desde el CRM como conversión offline.",
    serviceType: "Google Ads Management for industrial and B2B companies",
    minPriceEs: 1800,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    audienceTypes: ["Manufacturers", "Industrial distributors", "Metalworking companies", "Industrial service providers"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }, { name: "Google Ads para empresas industriales", path: PATH }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <NextIntlClientProvider messages={sectorPageMessages(messages, 'GoogleAdsEmpresasIndustriales')}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
