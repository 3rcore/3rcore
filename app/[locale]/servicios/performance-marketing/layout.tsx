import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/performance-marketing',
    titleEs: "Performance Marketing en Lima, Perú | 3R Core",
    titleEn: 'Performance Marketing for U.S. Brands | 3R Core',
    descriptionEs: "Google, Meta y TikTok coordinados con medición de punta a punta y optimización por CAC y ROAS. Se crece con datos, no con corazonadas.",
    descriptionEn: 'Multichannel acquisition across Google, Meta and TikTok for U.S. brands, with end-to-end measurement, CRO and CAC/ROAS focus.',
    titleUs: 'Performance Marketing en Español para EE.UU.',
    descriptionUs: 'Google, Meta y TikTok coordinados para negocios en EE.UU., con medición de punta a punta y optimización por CAC y ROAS. Precios en dólares.',
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Performance Marketing',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
  })
}

export default async function PerformanceMarketingLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.PerformanceFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/performance-marketing',
    nameEs: "Performance Marketing y Adquisición con ROI en Lima",
    nameEn: "Performance Marketing and ROI Acquisition for U.S. Brands",
    descriptionEs: "Estrategia de performance marketing multicanal para empresas en Lima y Perú: Google Ads, Meta Ads y TikTok Ads coordinados, medición end-to-end, optimización de la tasa de conversión (CRO) y gestión por CAC, ROAS y LTV.",
    descriptionEn: "Multichannel performance marketing strategy for U.S. companies: coordinated Google Ads, Meta Ads and TikTok Ads, end-to-end measurement, conversion rate optimization (CRO) and management by CAC, ROAS and LTV.",
    serviceType: "Performance Marketing / Growth / PPC",
    minPriceEs: 2500,
    maxPriceEs: 15000,
    offerPriceEs: 2500,
    offerPriceEn: 700,
    audienceTypes: ["E-commerce", "B2B", "SaaS", "Lead generation"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Performance Marketing" : "Performance Marketing", path: '/servicios/performance-marketing' }],
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
