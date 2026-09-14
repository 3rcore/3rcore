import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/email-marketing',
    titleEs: "Email Marketing y Automatización en Lima | 3R Core",
    titleEn: 'Email Marketing & Automation Agency | 3R Core',
    descriptionEs: "Flujos automáticos, newsletters y CRM para negocios en Perú: recupera carritos abandonados y vuelve a vender a quien ya te compró una vez.",
    descriptionEn: 'Automated flows, newsletters, segmentation and CRM integration for U.S. businesses, built by an in-house team. Recover carts and sell on autopilot.',
    titleUs: 'Email Marketing y Automatización para EE.UU.',
    descriptionUs: 'Flujos automáticos, newsletters y CRM en español e inglés para negocios de EE.UU.: recupera carritos y vuelve a vender a tus clientes actuales.',
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Email Marketing',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
  })
}

export default async function EmailMarketingLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.EmailMarketingFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/email-marketing',
    nameEs: "Email Marketing y Automatización en Lima",
    nameEn: "Email Marketing and Automation for U.S. Brands",
    descriptionEs: "Estrategia, diseño y gestión de email marketing y automatización para empresas en Lima y Perú: flujos de bienvenida, recuperación de carritos, newsletters, segmentación y automatización con CRM.",
    descriptionEn: "Strategy, design and management of email marketing and automation for U.S. companies: welcome flows, cart recovery, newsletters, segmentation and CRM automation.",
    serviceType: "Email Marketing / Marketing Automation / CRM",
    minPriceEs: 1200,
    maxPriceEs: 6000,
    offerPriceEs: 1200,
    offerPriceEn: 350,
    audienceTypes: ["E-commerce", "B2B", "SaaS", "Small business"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Email Marketing" : "Email Marketing", path: '/servicios/email-marketing' }],
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
