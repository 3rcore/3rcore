import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/marketing-clinicas',
    titleEs: "Marketing para Clínicas y Consultorios en Lima",
    titleEn: 'Digital Marketing for U.S. Clinics & Practices | 3R Core',
    descriptionEs: "Traemos pacientes a tu clínica en Lima con Google Ads de salud, SEO local y ficha de Google. Se mide en citas agendadas, no en «me gusta».",
    descriptionEn: 'Patient acquisition for U.S. clinics: healthcare Google Ads, local SEO, Google Business Profile and bilingual campaigns.',
    titleUs: 'Marketing para Clínicas y Consultorios en EE.UU.',
    descriptionUs: 'Captación de pacientes hispanos en EE.UU.: Google Ads de salud, SEO local y ficha de Google. Se mide en citas agendadas, con precios en dólares.',
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Marketing for Clinics',
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
  const faqMessages = messages?.MarketingClinicasFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/marketing-clinicas',
    nameEs: "Marketing Digital para Clínicas y Consultorios en Lima",
    nameEn: "Digital Marketing for Clinics and Medical Offices",
    descriptionEs: "Marketing digital para clínicas, consultorios y profesionales de la salud en Lima y Perú: Google Ads y Meta Ads de salud, SEO local, Google Business Profile, landing pages y captación de pacientes con citas medibles.",
    descriptionEn: "Digital marketing for clinics, medical offices and healthcare professionals in the United States: healthcare Google Ads and Meta Ads, local SEO, Google Business Profile, landing pages and measurable patient acquisition.",
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
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Marketing for Clinics" : "Marketing para Clínicas", path: '/servicios/marketing-clinicas' }],
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
