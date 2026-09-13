import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/tiktok-ads',
    titleEs: "Agencia de TikTok Ads en Lima, Perú | 3R Core",
    titleEn: 'TikTok Ads Agency for U.S. Brands | 3R Core',
    descriptionEs: "Spark Ads, video nativo y creadores UGC propios para vender en TikTok en Perú. Gestión desde S/1,500/mes con ROAS medible y reportes cada mes.",
    descriptionEn: 'TikTok Ads for U.S. businesses: Spark Ads, native video and in-house UGC creators with measurable ROAS. From $800/month in USD.',
    titleUs: 'Agencia de TikTok Ads en Español para EE.UU. | 3R Core',
    descriptionUs: 'TikTok Ads para el público hispano de EE.UU.: Spark Ads, video nativo con creadores hispanohablantes y segmentación por ciudad. Desde $800/mes.',
    ogImage: {
      url: 'https://3rcore.com/og/socialmedia.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - TikTok Ads',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
  })
}

export default async function TikTokAdsLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.TikTokAdsFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/tiktok-ads',
    nameEs: "Agencia de TikTok Ads en Lima",
    nameEn: "TikTok Ads Agency for U.S. Brands",
    descriptionEs: "Estrategia y gestión de campañas en TikTok Ads para empresas en Lima y Perú: Spark Ads, video nativo, contenido UGC, retargeting y medición con el TikTok Pixel y reportes de ROAS.",
    descriptionEn: "Strategy and management of TikTok Ads campaigns for U.S. companies: Spark Ads, native video, UGC content, retargeting and measurement with the TikTok Pixel and ROAS reports.",
    serviceType: "TikTok Ads / Video Advertising",
    minPriceEs: 1500,
    maxPriceEs: 7000,
    offerPriceEs: 1500,
    offerPriceEn: 420,
    audienceTypes: ["E-commerce", "B2C", "Local business", "Consumer brands"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "TikTok Ads" : "TikTok Ads", path: '/servicios/tiktok-ads' }],
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
