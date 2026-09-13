import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/marketing-abogados',
    titleEs: "Marketing Digital para Abogados y Estudios Jurídicos en Lima",
    titleEn: "Digital Marketing for Law Firms | 3R Core",
    descriptionEs: "Captamos consultas para tu estudio jurídico en Lima: SEO local, ficha de Google y contenido que genera confianza. Se mide en consultas, no en visitas.",
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
    nameEs: "Marketing Digital para Clínicas y Consultorios en Lima",
    nameEn: "Digital Marketing for Law Firms",
    descriptionEs: "Marketing digital para clínicas, consultorios y profesionales de la salud en Lima y Perú: Google Ads y Meta Ads de salud, SEO local, Google Business Profile, landing pages y captación de pacientes con citas medibles.",
    descriptionEn: "Digital marketing for law firms: Google Business Profile, local positioning by practice area and content that builds trust before the first call.",
    serviceType: "Healthcare Marketing / Medical Marketing",
    minPriceEs: 2000,
    maxPriceEs: 10000,
    offerPriceEs: 2000,
    offerPriceEn: 560,
    audienceTypes: ["Clinics", "Medical offices", "Dental", "Aesthetic"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Marketing for Clinics" : "Marketing para Clínicas", path: '/servicios/marketing-abogados' }],
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
