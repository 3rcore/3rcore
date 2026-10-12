import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { NextIntlClientProvider } from "next-intl"
import { sectorPageMessages } from "@/lib/pickMessages"
import { getMessages, setRequestLocale } from "next-intl/server"

// 11-oct-2026. Página «Google Ads para psicólogos y terapeutas» (demanda medida en el
// autocompletado de Google Perú). Solo existe en /es: en /en y /us da 404,
// igual que las landings de Perú (en EE.UU. no se vende Google Ads).
const PATH = '/servicios/google-ads-psicologos'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: PATH,
    titleEs: "Google Ads para psicólogos: anuncios de terapia | 3R Core",
    titleEn: "Google Ads para psicólogos: anuncios de terapia | 3R Core",
    descriptionEs: "Anuncios en Google para psicólogos en Lima y terapia online en todo Perú: campañas dentro de las políticas de salud y cada cita medida por WhatsApp.",
    descriptionEn: "Anuncios en Google para psicólogos en Lima y terapia online en todo Perú: campañas dentro de las políticas de salud y cada cita medida por WhatsApp.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: "3R Core - Google Ads para psicólogos",
    },
    noindex: locale !== 'es',
    onlyLocales: ['es'],
  })
}

export default async function GoogleAdsPsicologosLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  const messages = (await getMessages()) as any
  const faqMessages = messages?.GoogleAdsPsicologosFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Gestión de Google Ads para psicólogos en Lima",
    nameEn: "Gestión de Google Ads para psicólogos en Lima",
    descriptionEs: "3R Core gestiona campañas de Google Ads para psicólogos, terapeutas y centros de psicología en Perú, presenciales en Lima y online a nivel nacional. Las campañas cumplen las políticas de salud de Google y se miden en citas agendadas.",
    descriptionEn: "3R Core gestiona campañas de Google Ads para psicólogos, terapeutas y centros de psicología en Perú, presenciales en Lima y online a nivel nacional. Las campañas cumplen las políticas de salud de Google y se miden en citas agendadas.",
    serviceType: "Google Ads Management for psychologists and therapists",
    minPriceEs: 1800,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    audienceTypes: ["Psychologists", "Psychotherapists", "Mental health clinics", "Couples therapists"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }, { name: "Google Ads para psicólogos", path: PATH }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <NextIntlClientProvider messages={sectorPageMessages(messages, 'GoogleAdsPsicologos')}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
