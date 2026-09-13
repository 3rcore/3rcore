import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/influencer-marketing',
    titleEs: "Agencia de Influencer Marketing en Lima, Perú | 3R Core",
    titleEn: 'Influencer Marketing Agency for U.S. Brands | 3R Core',
    titleUs: "Influencer Marketing en Español para EE.UU. | 3R Core",
    descriptionEs: "Campañas con influencers en Perú: selección por audiencia real, contratos, derechos de uso y atribución por enlace. Medimos ventas, no seguidores.",
    descriptionEn: 'Creator campaigns for U.S. brands: audience-first selection, contracted usage rights and per-creator attribution. Measured in sales.',
    descriptionUs: "Campañas con creadores hispanohablantes para tu negocio en Estados Unidos: selección por audiencia real, contrato con derechos de uso y atribución por creador. Precios en dólares.",
    ogImage: {
      url: 'https://3rcore.com/og/socialmedia.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Influencer Marketing',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
  })
}

export default async function InfluencerMarketingLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.InfluencerFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/influencer-marketing',
    nameEs: "Agencia de Influencer Marketing y Campañas con Creadores",
    nameEn: "Influencer Marketing Agency and Creator Campaigns",
    descriptionEs: "Gestión integral de campañas con influencers: selección de creadores por datos de audiencia, negociación de tarifas y contratos con derechos de uso publicitario, briefing, control de entregables, atribución por enlaces UTM y códigos nominales, amplificación pagada y reporte de costo por resultado por creador.",
    descriptionEn: "End-to-end influencer campaign management: creator selection on audience data, rate negotiation and contracts including paid-usage rights, briefing, deliverable control, attribution via UTM links and named codes, paid amplification and per-creator cost-per-result reporting.",
    serviceType: "Influencer Marketing / Creator Campaigns",
    minPriceEs: 2500,
    maxPriceEs: 20000,
    offerPriceEs: 2500,
    offerPriceEn: 1500,
    audienceTypes: ["E-commerce", "D2C brands", "Local business", "Lead generation"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'Services' : 'Servicios', path: '/servicios' },
      { name: isEn ? "Influencer Marketing" : "Influencer Marketing", path: '/servicios/influencer-marketing' },
    ],
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
