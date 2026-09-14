import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/marketing-veterinarias',
    titleEs: "Marketing para Veterinarias en Lima 2026 | 3R Core",
    titleEn: "Digital Marketing for Veterinary Clinics | 3R Core",
    descriptionEs: "Agencia de marketing para veterinarias en Lima: ficha de Google, SEO local y campañas. Desde S/1,800/mes + IGV, medido en citas.",
    descriptionEn: "Digital marketing for veterinary clinics and pet shops in the United States: local SEO, Google Business Profile, campaigns and per-service pages.",
    titleUs: "Marketing Digital para Veterinarias en EE.UU.",
    descriptionUs: "Agencia de marketing para veterinarias en Lima: ficha de Google, SEO local y campañas. Desde S/1,800/mes + IGV, medido en citas.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Veterinary Marketing',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online: esta página vive en
    // /es y va noindex en /en y /us para no diluir ese foco, igual que
    // /servicios/marketing-clinicas.
    noindex: locale !== 'es',
  })
}

export default async function MarketingVeterinariasLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.MarketingVeterinariasFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/marketing-veterinarias',
    nameEs: "Marketing Digital para Veterinarias en Lima",
    nameEn: "Digital Marketing for Veterinary Clinics",
    descriptionEs: "Marketing digital para veterinarias, clínicas veterinarias y pet shops en Lima y Perú: SEO local, ficha de Google Business Profile, campañas y páginas por servicio.",
    descriptionEn: "Digital marketing for veterinary clinics and pet shops in the United States: local SEO, Google Business Profile, campaigns and per-service pages.",
    serviceType: "Veterinary Marketing / Local Marketing",
    minPriceEs: 1500,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    audienceTypes: ["Veterinary clinics", "Pet shops", "Animal hospitals"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Veterinary Marketing" : "Marketing para Veterinarias", path: '/servicios/marketing-veterinarias' }],
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
