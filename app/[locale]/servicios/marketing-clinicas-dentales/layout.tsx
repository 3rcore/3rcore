import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/marketing-clinicas-dentales',
    titleEs: "Marketing para Clínicas Dentales en Lima 2026 | 3R Core",
    titleEn: "Digital Marketing for Dental Clinics | 3R Core",
    descriptionEs: "Agencia de marketing para clínicas dentales en Lima: Google Ads de salud, SEO local y ficha de Google. Gestión desde S/1,800/mes + IGV.",
    descriptionEn: "Digital marketing for U.S. dental clinics and orthodontic practices: healthcare Google Ads, local SEO, Google Business Profile and per-treatment landing pages.",
    titleUs: "Marketing Digital para Clínicas Dentales en EE.UU.",
    descriptionUs: "Agencia de marketing para clínicas dentales en Lima: Google Ads de salud, SEO local y ficha de Google. Gestión desde S/1,800/mes + IGV.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Dental Clinic Marketing',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online: esta página vive en
    // /es y va noindex en /en y /us para no diluir ese foco, igual que
    // /servicios/marketing-clinicas.
    noindex: locale !== 'es',
  })
}

export default async function MarketingClinicasDentalesLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.MarketingClinicasDentalesFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/marketing-clinicas-dentales',
    nameEs: "Marketing Digital para Clínicas Dentales en Lima",
    nameEn: "Digital Marketing for Dental Clinics",
    descriptionEs: "Marketing digital para clínicas dentales y consultorios odontológicos en Lima y Perú: Google Ads de salud, SEO local, Google Business Profile y landing pages por tratamiento. Se reporta en citas agendadas y costo por cita.",
    descriptionEn: "Digital marketing for dental clinics and orthodontic practices in the United States: healthcare Google Ads, local SEO, Google Business Profile and per-treatment landing pages.",
    serviceType: "Dental Marketing / Healthcare Marketing",
    minPriceEs: 1500,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    audienceTypes: ["Dental clinics", "Orthodontic practices", "Dental offices"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Dental Clinic Marketing" : "Marketing para Clínicas Dentales", path: '/servicios/marketing-clinicas-dentales' }],
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
