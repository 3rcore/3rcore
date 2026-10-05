import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/marketing-clinicas-dentales',
    titleEs: "Gestión de Google Ads para clínicas dentales en Lima | 3R Core",
    titleEn: "Digital Marketing for Dental Clinics | 3R Core",
    descriptionEs: "Google Ads para clínicas dentales en Lima: implantes, ortodoncia y urgencias con citas medidas. Agencia de marketing para dentistas. Desde S/1,800/mes + IGV.",
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
    // Y el hreflang solo declara /es: las versiones /en y /us van noindex.
    onlyLocales: ['es'],
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
    nameEs: "Gestión de Google Ads para clínicas dentales en Lima",
    nameEn: "Digital Marketing for Dental Clinics",
    descriptionEs: "Gestión de campañas de Google Ads para clínicas dentales y consultorios odontológicos en Lima y Perú: anuncios de búsqueda por tratamiento (implantes, ortodoncia, urgencias), landing por tratamiento, recursos de llamada y WhatsApp, y medición de citas agendadas.",
    descriptionEn: "Digital marketing for dental clinics and orthodontic practices in the United States: healthcare Google Ads, local SEO, Google Business Profile and per-treatment landing pages.",
    serviceType: "Google Ads Management for Dental Clinics",
    minPriceEs: 1800,
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
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Dental Clinic Marketing" : "Google Ads para clínicas dentales", path: '/servicios/marketing-clinicas-dentales' }],
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
