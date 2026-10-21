import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { NextIntlClientProvider } from "next-intl"
import { sectorPageMessages } from "@/lib/pickMessages"
import { getMessages, setRequestLocale } from "next-intl/server"

// 21-oct-2026. Página «Google Ads para inmobiliarias» (demanda medida en el
// autocompletado de Google Perú). Solo existe en /es: en /en y /us da 404.
// Lead gen de ciclo largo: Búsqueda + Performance Max con feed + remarketing.
// Sin precios en el schema.
const PATH = '/servicios/google-ads-inmobiliarias'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: PATH,
    titleEs: "Google Ads para inmobiliarias: leads en Lima | 3R Core",
    titleEn: "Google Ads para inmobiliarias: leads en Lima | 3R Core",
    descriptionEs: "Publicidad en Google para inmobiliarias y proyectos en Lima: anuncios por zona y tipo de operación, con remarketing y cada lead por WhatsApp medido.",
    descriptionEn: "Publicidad en Google para inmobiliarias y proyectos en Lima: anuncios por zona y tipo de operación, con remarketing y cada lead por WhatsApp medido.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: "3R Core - Google Ads para inmobiliarias",
    },
    noindex: locale !== 'es',
    onlyLocales: ['es'],
  })
}

export default async function GoogleAdsInmobiliariasLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  const messages = (await getMessages()) as any
  const faqMessages = messages?.GoogleAdsInmobiliariasFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Gestión de Google Ads para inmobiliarias en Lima",
    nameEn: "Gestión de Google Ads para inmobiliarias en Lima",
    descriptionEs: "3R Core gestiona campañas de Google Ads para inmobiliarias y proyectos en Perú, separadas por zona y tipo de operación (venta, alquiler, residencial, comercial), con Búsqueda, Performance Max con feed y remarketing. Cada lead y contacto por WhatsApp queda medido con el clic de Google que lo trajo.",
    descriptionEn: "3R Core gestiona campañas de Google Ads para inmobiliarias y proyectos en Perú, separadas por zona y tipo de operación (venta, alquiler, residencial, comercial), con Búsqueda, Performance Max con feed y remarketing. Cada lead y contacto por WhatsApp queda medido con el clic de Google que lo trajo.",
    serviceType: "Google Ads Management for Real Estate",
    audienceTypes: ["Real estate developers", "Real estate agencies", "Property management", "Lead generation"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }, { name: "Google Ads para inmobiliarias", path: PATH }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <NextIntlClientProvider messages={sectorPageMessages(messages, 'GoogleAdsInmobiliarias')}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
