import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema, buildSpeakableSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/branding',
    titleEs: 'Agencia de Branding e Identidad de Marca en Lima | 3R Core',
    titleEn: 'Branding Agency for U.S. Brands | 3R Core',
    descriptionEs: 'Diseño de identidad visual, logotipo, manual de marca y aplicaciones. Agencia de branding en Lima, Perú desde S/500, entrega en 7 días.',
    descriptionEn: 'Visual identity, logo, brand manual and corporate applications designed by an in-house team for U.S. businesses. Full identity projects from $500 in USD.',
    titleUs: 'Branding e Identidad de Marca para EE.UU. | 3R Core',
    descriptionUs: 'Diseño de identidad visual, logotipo, manual de marca y aplicaciones corporativas para negocios en Estados Unidos. Proyectos integrales desde $500, con propuesta tras una sesión inicial de descubrimiento.',
    ogImage: {
      url: 'https://3rcore.com/og/branding.jpg',
      width: 1200,
      height: 630,
      alt: locale === 'en' ? '3R Core - Branding Agency for U.S. Brands' : 'Agencia de Branding en Lima - 3R Core',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
  })
}

export default async function BrandingLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const faqMessages = messages?.BrandingFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/branding',
    nameEs: 'Branding Corporativo y Diseño de Identidad de Marca',
    nameEn: 'Corporate Branding and Brand Identity Design',
    descriptionEs: 'Diseño de identidad visual, logotipo, manual de marca, paleta cromática, tipografía corporativa, papelería y aplicaciones de marca para empresas en Lima, Perú.',
    descriptionEn: 'Visual identity design, logo, brand manual, color palette, corporate typography, stationery and brand applications for U.S. companies, delivered by an in-house design team.',
    serviceType: 'Branding / Visual Identity',
    minPriceEs: 500,
    maxPriceEs: 15000,
    offerPriceEs: 500,
    offerPriceEn: 500,
    audienceTypes: ['Startups', 'Small business', 'Medium business', 'Enterprise'],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema: any = buildFAQPageSchema(faqItems)
  faqSchema.speakable = buildSpeakableSchema(['h1', 'h2', '.faq-question', '.faq-answer'])

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Branding', path: '/servicios/branding' }],
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
