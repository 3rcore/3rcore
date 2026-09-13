import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/web-development',
    titleEs: 'Diseño de Páginas Web en Lima, Perú — E-commerce | 3R Core',
    titleEn: 'Web Design & Development for U.S. Brands | 3R Core',
    descriptionEs: 'Diseño y creación de páginas web en Lima, Perú: sitios corporativos, landing pages y e-commerce (Shopify, WooCommerce). SEO técnico desde S/1,800.',
    descriptionEn: 'Corporate sites, landing pages and e-commerce built by our in-house team for U.S. businesses. Technical SEO included, from $850 with hosting.',
    titleUs: 'Páginas Web Bilingües para Negocios en EE.UU. | 3R Core',
    descriptionUs: 'Diseño y desarrollo de sitios corporativos, landing pages y e-commerce bilingües (inglés y español) con hreflang correcto y SEO técnico incluido. Desde $850, con el primer año de dominio y hosting.',
    ogImage: {
      url: 'https://3rcore.com/og/web-development.jpg',
      width: 1200,
      height: 630,
      alt: locale === 'en' ? '3R Core - Web Design & Development' : 'Diseño y Creación de Páginas Web en Lima - 3R Core',
    },
  })
}

export default async function WebDevLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.webFAQ?.faqs ?? {}

  const serviceSchema: any = buildServiceSchema({
    locale,
    path: '/servicios/web-development',
    nameEs: 'Diseño y Creación de Páginas Web en Lima',
    nameEn: 'Web Design and Development for U.S. Brands',
    descriptionEs: 'Diseño y desarrollo de sitios web corporativos, landing pages, tiendas online (e-commerce) en Shopify y WooCommerce, plataformas e-learning, sitios de servicios y blogs. Optimización SEO técnica, mobile-first y conversión integrada.',
    descriptionEn: 'Design and development of corporate websites, landing pages, online stores (e-commerce) on Shopify and WooCommerce, e-learning platforms, service sites and blogs. Technical SEO, mobile-first optimization and built-in conversion.',
    serviceType: 'Web Development / E-commerce',
    minPriceEs: 1800,
    maxPriceEs: 25000,
    offerPriceEs: 1800,
    offerPriceEn: 850,
    audienceTypes: ['Startups', 'Small business', 'Medium business', 'Enterprise', 'E-commerce'],
  })

  // OfferCatalog with site types — copy lifted from existing WebSection translations
  const ws = messages?.WebSection ?? {}
  const subOffers = [ws.landing, ws.info, ws.Ecomm, ws.Elearn, ws.Servic, ws.Blogs]
    .filter(Boolean)
    .map((t: any) => ({ "@type": "Offer", "name": t.title, "description": t.description }))
  if (subOffers.length) {
    serviceSchema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      "name": isEn ? "Website Types" : "Tipos de Sitios Web",
      "itemListElement": subOffers,
    }
  }

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? 'Web Development' : 'Diseño Web', path: '/servicios/web-development' }],
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
