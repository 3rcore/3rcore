import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/meta-ads',
    titleEs: "Agencia de Meta Ads en Lima, Perú | 3R Core",
    titleEn: 'Meta Ads Agency for U.S. Brands | 3R Core',
    descriptionEs: "Campañas de Facebook e Instagram en Perú con retargeting, catálogo y mensajes directos a WhatsApp. Desde S/1,500/mes con ROAS medible.",
    descriptionEn: 'Facebook and Instagram campaigns for U.S. businesses, with advanced targeting, retargeting and in-house UGC creative.',
    titleUs: 'Agencia de Meta Ads en Español para EE.UU. | 3R Core',
    descriptionUs: 'Facebook e Instagram para el público hispano de EE.UU.: segmentación por idioma y ciudad, retargeting y creatividades UGC. Desde $800/mes.',
    ogImage: {
      url: 'https://3rcore.com/og/socialmedia.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Meta Ads',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
  })
}

export default async function MetaAdsLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.MetaAdsFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/meta-ads',
    nameEs: "Agencia de Meta Ads (Facebook e Instagram) en Lima",
    nameEn: "Meta Ads Agency (Facebook & Instagram) for U.S. Brands",
    descriptionEs: "Diseño y gestión de campañas de Meta Ads en Facebook e Instagram para empresas en Lima y Perú: prospección, retargeting, catálogos, mensajes a WhatsApp y ROAS medible con reportes mensuales.",
    descriptionEn: "Design and management of Meta Ads campaigns on Facebook and Instagram for U.S. companies: prospecting, retargeting, catalogs, WhatsApp click-to-message and measurable ROAS with monthly reports.",
    serviceType: "Meta Ads / Facebook Ads / Instagram Ads",
    minPriceEs: 1500,
    maxPriceEs: 8000,
    offerPriceEs: 1500,
    offerPriceEn: 420,
    audienceTypes: ["E-commerce", "B2C", "Local business", "Lead generation"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Meta Ads" : "Meta Ads", path: '/servicios/meta-ads' }],
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
