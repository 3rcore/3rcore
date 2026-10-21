import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { NextIntlClientProvider } from "next-intl"
import { sectorPageMessages } from "@/lib/pickMessages"
import { getMessages, setRequestLocale } from "next-intl/server"

// 21-oct-2026. Página «Google Ads para dentistas» (demanda medida en el
// autocompletado de Google Perú). Solo existe en /es: en /en y /us da 404,
// igual que las demás landings de Perú. Odontología = categoría de salud de
// Google Ads: sin precios en el schema ni promesas de resultado en el copy.
const PATH = '/servicios/google-ads-dentistas'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: PATH,
    titleEs: "Google Ads para dentistas: anuncios en Lima | 3R Core",
    titleEn: "Google Ads para dentistas: anuncios en Lima | 3R Core",
    descriptionEs: "Publicidad en Google para dentistas y clínicas dentales en Lima: anuncios por tratamiento y distrito, dentro de la política de salud, con cada llamada y cita por WhatsApp medida.",
    descriptionEn: "Publicidad en Google para dentistas y clínicas dentales en Lima: anuncios por tratamiento y distrito, dentro de la política de salud, con cada llamada y cita por WhatsApp medida.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: "3R Core - Google Ads para dentistas",
    },
    noindex: locale !== 'es',
    onlyLocales: ['es'],
  })
}

export default async function GoogleAdsDentistasLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  const messages = (await getMessages()) as any
  const faqMessages = messages?.GoogleAdsDentistasFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Gestión de Google Ads para dentistas en Lima",
    nameEn: "Gestión de Google Ads para dentistas en Lima",
    descriptionEs: "3R Core gestiona campañas de Google Ads para consultorios y clínicas dentales en Perú, separadas por tratamiento (urgencias, ortodoncia, implantes), dentro de la política de salud de Google. Cada llamada y cita por WhatsApp queda medida con el clic de Google que la trajo.",
    descriptionEn: "3R Core gestiona campañas de Google Ads para consultorios y clínicas dentales en Perú, separadas por tratamiento (urgencias, ortodoncia, implantes), dentro de la política de salud de Google. Cada llamada y cita por WhatsApp queda medida con el clic de Google que la trajo.",
    serviceType: "Google Ads Management for Dental Clinics",
    audienceTypes: ["Dental clinics", "Dentists", "Orthodontists", "Healthcare providers"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }, { name: "Google Ads para dentistas", path: PATH }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <NextIntlClientProvider messages={sectorPageMessages(messages, 'GoogleAdsDentistas')}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
