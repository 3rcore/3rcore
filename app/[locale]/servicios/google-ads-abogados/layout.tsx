import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { NextIntlClientProvider } from "next-intl"
import { sectorPageMessages } from "@/lib/pickMessages"
import { getMessages, setRequestLocale } from "next-intl/server"

// 21-oct-2026. Página «Google Ads para abogados» (demanda medida en el
// autocompletado de Google Perú). Solo existe en /es: en /en y /us da 404.
// Legal no es categoría restringida, pero es de las más caras: el foco va en
// la negativa y la calidad de la consulta. Sin precios en el schema.
const PATH = '/servicios/google-ads-abogados'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: PATH,
    titleEs: "Google Ads para abogados: anuncios en Lima | 3R Core",
    titleEn: "Google Ads para abogados: anuncios en Lima | 3R Core",
    descriptionEs: "Publicidad en Google para abogados y estudios jurídicos en Lima: anuncios por materia (laboral, familia, penal), con filtro de curiosos y cada consulta por WhatsApp medida.",
    descriptionEn: "Publicidad en Google para abogados y estudios jurídicos en Lima: anuncios por materia (laboral, familia, penal), con filtro de curiosos y cada consulta por WhatsApp medida.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: "3R Core - Google Ads para abogados",
    },
    noindex: locale !== 'es',
    onlyLocales: ['es'],
  })
}

export default async function GoogleAdsAbogadosLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  const messages = (await getMessages()) as any
  const faqMessages = messages?.GoogleAdsAbogadosFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Gestión de Google Ads para abogados en Lima",
    nameEn: "Gestión de Google Ads para abogados en Lima",
    descriptionEs: "3R Core gestiona campañas de Google Ads para abogados y estudios jurídicos en Perú, separadas por materia (laboral, familia, penal, civil, migratorio), con foco en la palabra clave negativa y la calidad de la consulta. Cada llamada y consulta por WhatsApp queda medida con el clic de Google que la trajo.",
    descriptionEn: "3R Core gestiona campañas de Google Ads para abogados y estudios jurídicos en Perú, separadas por materia (laboral, familia, penal, civil, migratorio), con foco en la palabra clave negativa y la calidad de la consulta. Cada llamada y consulta por WhatsApp queda medida con el clic de Google que la trajo.",
    serviceType: "Google Ads Management for Law Firms",
    audienceTypes: ["Law firms", "Lawyers", "Legal services", "Lead generation"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Google Ads', path: '/servicios/google-ads' }, { name: "Google Ads para abogados", path: PATH }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <NextIntlClientProvider messages={sectorPageMessages(messages, 'GoogleAdsAbogados')}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
