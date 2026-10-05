import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/marketing-clinicas-esteticas',
    titleEs: "Gestión de Google Ads para clínicas estéticas en Lima | 3R Core",
    titleEn: "Digital Marketing for Aesthetic Clinics | 3R Core",
    descriptionEs: "Google Ads para clínicas estéticas en Lima: tratamientos que se buscan por nombre, anuncios dentro de las políticas de salud y valoraciones medidas. Marketing estético.",
    descriptionEn: "Digital marketing for U.S. aesthetic clinics and medspas: social media management, Meta Ads, Google Ads, local SEO and per-treatment landing pages.",
    titleUs: "Marketing Digital para Clínicas Estéticas en EE.UU.",
    descriptionUs: "Agencia de marketing para clínicas estéticas en Lima: Meta Ads, Google Ads y SEO local. Redes desde S/1,500/mes + IGV, con reporte de citas.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Aesthetic Clinic Marketing',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online: esta página vive en
    // /es y va noindex en /en y /us para no diluir ese foco, igual que
    // /servicios/marketing-clinicas.
    noindex: locale !== 'es',
    // Y el hreflang solo declara /es: las versiones /en y /us van noindex.
    onlyLocales: ['es'],
  })
}

export default async function MarketingClinicasEsteticasLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.MarketingClinicasEsteticasFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/marketing-clinicas-esteticas',
    nameEs: "Gestión de Google Ads para clínicas estéticas en Lima",
    nameEn: "Digital Marketing for Aesthetic Clinics",
    descriptionEs: "Gestión de campañas de Google Ads para clínicas estéticas y centros de medicina estética en Lima y Perú: anuncios de búsqueda por tratamiento, cumplimiento de las políticas de atención médica de Google, landing por tratamiento y medición de valoraciones agendadas.",
    descriptionEn: "Digital marketing for aesthetic clinics and medical aesthetics centers in the United States: social media management, Meta Ads, Google Ads, local SEO and per-treatment landing pages.",
    serviceType: "Google Ads Management for Aesthetic Clinics",
    minPriceEs: 1800,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    audienceTypes: ["Aesthetic clinics", "Medical aesthetics centers", "Dermatology practices"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Aesthetic Clinic Marketing" : "Google Ads para clínicas estéticas", path: '/servicios/marketing-clinicas-esteticas' }],
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
