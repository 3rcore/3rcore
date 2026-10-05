import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/marketing-abogados',
    titleEs: "Gestión de Google Ads para abogados en Lima | 3R Core",
    titleEn: "Digital Marketing for Law Firms | 3R Core",
    descriptionEs: "Google Ads para estudios de abogados en Lima: consultas por especialidad (laboral, familia, penal), llamadas y WhatsApp medidos. Marketing digital para abogados.",
    descriptionEn: "Client acquisition for law firms: local SEO, Google Business Profile and content that builds trust before the first call.",
    titleUs: "Marketing Digital para Abogados en Estados Unidos",
    descriptionUs: "Captación de consultas para despachos hispanos en EE.UU.: SEO local en español, ficha de Google y contenido que genera confianza.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Marketing for Law Firms',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
    // Y el hreflang solo declara /es: las versiones /en y /us van noindex.
    onlyLocales: ['es'],
  })
}

export default async function MarketingClinicasLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.MarketingAbogadosFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/marketing-abogados',
    nameEs: "Gestión de Google Ads para abogados en Lima",
    nameEn: "Digital Marketing for Law Firms",
    descriptionEs: "Gestión de campañas de Google Ads para estudios de abogados y abogados independientes en Lima y Perú: anuncios de búsqueda por área de práctica, recursos de llamada, landing por especialidad y medición de consultas por WhatsApp y teléfono.",
    descriptionEn: "Digital marketing for law firms: Google Business Profile, local positioning by practice area and content that builds trust before the first call.",
    serviceType: "Google Ads Management for Law Firms",
    minPriceEs: 1800,
    maxPriceEs: 10000,
    offerPriceEs: 1800,
    offerPriceEn: 560,
    audienceTypes: ["Clinics", "Medical offices", "Dental", "Aesthetic"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Marketing for Clinics" : "Google Ads para abogados", path: '/servicios/marketing-abogados' }],
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
