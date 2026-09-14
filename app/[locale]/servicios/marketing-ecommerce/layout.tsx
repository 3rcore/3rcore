import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/marketing-ecommerce',
    titleEs: "Marketing para E-commerce y Tiendas Online en Perú",
    titleEn: 'E-commerce Marketing for U.S. Online Stores | 3R Core',
    descriptionEs: "Google Shopping, Meta Ads con catálogo, email y CRO para tiendas Shopify, WooCommerce y VTEX en Perú. Se optimiza por ROAS, no por impresiones.",
    descriptionEn: 'Google Shopping, Meta Ads, catalog feeds, email flows and CRO for U.S. online stores, with measurable ROAS and pricing in USD.',
    titleUs: 'Marketing para E-commerce y Tiendas Online en EE.UU.',
    descriptionUs: 'Google Shopping, Meta Ads con catálogo, email y CRO para tiendas online en EE.UU., en español e inglés. Se optimiza por ROAS y se paga en dólares.',
    ogImage: {
      url: 'https://3rcore.com/og/web-development.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - E-commerce Marketing',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
  })
}

export default async function MarketingEcommerceLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.MarketingEcommerceFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/marketing-ecommerce',
    nameEs: "Marketing Digital para E-commerce y Tiendas Online en Perú",
    nameEn: "Digital Marketing for E-commerce and Online Stores",
    descriptionEs: "Marketing digital para e-commerce y tiendas online en Perú (Shopify, WooCommerce, VTEX): Google Shopping y Performance Max, Meta Ads con catálogo, email marketing, CRO y optimización por ROAS con reportes mensuales.",
    descriptionEn: "Digital marketing for e-commerce and online stores in the United States (Shopify, WooCommerce, VTEX): Google Shopping and Performance Max, Meta Ads with catalog, email marketing, CRO and ROAS optimization with monthly reports.",
    serviceType: "E-commerce Marketing / Growth",
    minPriceEs: 2500,
    maxPriceEs: 15000,
    offerPriceEs: 2500,
    offerPriceEn: 700,
    audienceTypes: ["E-commerce", "Retail", "Consumer brands", "D2C"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "E-commerce Marketing" : "Marketing E-commerce", path: '/servicios/marketing-ecommerce' }],
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
