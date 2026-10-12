import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { NextIntlClientProvider } from "next-intl"
import { sectorPageMessages } from "@/lib/pickMessages"
import { getMessages, setRequestLocale } from "next-intl/server"

// 11-oct-2026. Página «Google Ads para contadores y estudios contables» (demanda medida en el
// autocompletado de Google Perú). Solo existe en /es: en /en y /us da 404,
// igual que las landings de Perú (en EE.UU. no se vende Google Ads).
const PATH = '/servicios/google-ads-contadores'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: PATH,
    titleEs: "Google Ads para contadores y estudios contables | 3R Core",
    titleEn: "Google Ads para contadores y estudios contables | 3R Core",
    descriptionEs: "Publicidad en Google para contadores y estudios contables en Lima: anuncios para mypes que buscan contador y cada cliente medido hasta el contrato.",
    descriptionEn: "Publicidad en Google para contadores y estudios contables en Lima: anuncios para mypes que buscan contador y cada cliente medido hasta el contrato.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: "3R Core - Google Ads para contadores",
    },
    noindex: locale !== 'es',
    onlyLocales: ['es'],
  })
}

export default async function GoogleAdsContadoresLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  const messages = (await getMessages()) as any
  const faqMessages = messages?.GoogleAdsContadoresFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Gestión de Google Ads para contadores en Lima",
    nameEn: "Gestión de Google Ads para contadores en Lima",
    descriptionEs: "3R Core gestiona campañas de Google Ads para contadores independientes y estudios contables del Perú, con anuncios dirigidos a mypes que buscan contador y medición de cada contacto por WhatsApp, llamada o formulario.",
    descriptionEn: "3R Core gestiona campañas de Google Ads para contadores independientes y estudios contables del Perú, con anuncios dirigidos a mypes que buscan contador y medición de cada contacto por WhatsApp, llamada o formulario.",
    serviceType: "Google Ads Management for accountants and accounting firms",
    minPriceEs: 1800,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    audienceTypes: ["Accountants", "Accounting firms", "Tax advisors", "Bookkeeping services"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }, { name: "Google Ads para contadores", path: PATH }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <NextIntlClientProvider messages={sectorPageMessages(messages, 'GoogleAdsContadores')}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
