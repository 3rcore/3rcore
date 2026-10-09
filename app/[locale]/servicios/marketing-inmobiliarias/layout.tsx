import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/marketing-inmobiliarias',
    titleEs: "Gestión de Google Ads para inmobiliarias en Lima | 3R Core",
    titleEn: 'Real Estate Marketing for U.S. Agents | 3R Core',
    descriptionEs: "Gestión de Google Ads para inmobiliarias y proyectos en Lima: búsquedas por distrito, landing por proyecto y leads medidos hasta la visita. Marketing digital que vende.",
    descriptionEn: 'Lead generation for U.S. real estate: Meta and Google Ads for listings, CRM follow-up and measurable cost per qualified lead.',
    titleUs: 'Marketing para Inmobiliarias y Agentes en EE.UU.',
    descriptionUs: 'Captación de compradores hispanos en EE.UU. para inmobiliarias y agentes: Meta Ads, Google Ads, CRM y WhatsApp con costo por lead medible.',
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Real Estate Marketing',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
    // Y el hreflang solo declara /es: las versiones /en y /us van noindex.
    onlyLocales: ['es'],
  })
}

export default async function MarketingInmobiliariasLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.MarketingInmobiliariasFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/marketing-inmobiliarias',
    nameEs: "Gestión de Google Ads para inmobiliarias en Lima",
    nameEn: "Digital Marketing for Real Estate",
    descriptionEs: "Gestión de campañas de Google Ads para inmobiliarias, desarrolladoras y corredores en Lima y Perú: anuncios de búsqueda por proyecto y distrito, landing por proyecto, integración con CRM y WhatsApp, y medición del costo por lead calificado.",
    descriptionEn: "Digital marketing for real estate developers and projects in the United States: lead generation campaigns on Meta Ads and Google Ads, project landing pages, CRM integration and WhatsApp follow-up with measurable cost per lead.",
    serviceType: "Google Ads Management for Real Estate",
    minPriceEs: 1800,
    maxPriceEs: 15000,
    offerPriceEs: 1800,
    offerPriceEn: 850,
    audienceTypes: ["Real estate developers", "Brokers", "Property projects"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Real Estate Marketing" : "Google Ads para inmobiliarias", path: '/servicios/marketing-inmobiliarias' }],
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
