import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/ugc',
    titleEs: "Producción de Contenido UGC en Lima, Perú | 3R Core",
    titleEn: 'UGC Content Production for U.S. Brands | 3R Core',
    titleUs: "Producción de Contenido UGC en Español para EE.UU. | 3R Core",
    descriptionEs: "Producimos video UGC con creadores propios en Lima: guiones, grabación, edición y variantes para testear en Meta, TikTok y YouTube. Derechos incluidos.",
    descriptionEn: 'UGC video produced by our in-house creators for U.S. brands: scripted angles, platform-native cuts and usage rights included.',
    descriptionUs: "Video UGC en español con creadores hispanohablantes para tus campañas en Estados Unidos. Guiones, grabación, edición y variantes por plataforma. Precios en dólares y derechos de uso incluidos.",
    ogImage: {
      url: 'https://3rcore.com/og/socialmedia.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - UGC Content Production',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
  })
}

export default async function UgcLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.UgcFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/ugc',
    nameEs: "Producción de Contenido UGC para Campañas Publicitarias",
    nameEn: "UGC Content Production for Paid Social Campaigns",
    descriptionEs: "Producción de video UGC con creadores propios: definición de ángulos de venta, guion por pieza, casting, grabación, edición y entrega de variantes por plataforma para campañas de Meta Ads, TikTok Ads y YouTube, con cesión de derechos de uso publicitario.",
    descriptionEn: "UGC video production with in-house creators: selling-angle research, per-asset scripting, casting, filming, editing and delivery of platform-native variations for Meta Ads, TikTok Ads and YouTube campaigns, including paid-media usage rights.",
    serviceType: "UGC Content Production / Video Advertising",
    minPriceEs: 1800,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 1200,
    audienceTypes: ["E-commerce", "D2C brands", "B2B", "Local business"],
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
      { name: isEn ? 'UGC Content' : 'Contenido UGC', path: '/servicios/ugc' },
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
