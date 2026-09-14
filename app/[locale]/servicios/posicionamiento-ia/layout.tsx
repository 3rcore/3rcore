import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/posicionamiento-ia',
    titleEs: "Posicionamiento en IA (GEO) en Lima: aparece en ChatGPT",
    titleEn: "Generative Engine Optimization (GEO) | 3R Core",
    descriptionEs: "Hacemos que ChatGPT, Perplexity y Copilot citen tu negocio. En 3R Core el tráfico de IA convierte al 12,23% frente al 4,03% del orgánico. Desde S/1,800/mes.",
    descriptionEn: "Get cited by ChatGPT, Perplexity and Copilot. At 3R Core, AI traffic converts at 12.23% against 4.03% from organic search. From $500/month.",
    titleUs: "Posicionamiento en IA (GEO) para negocios en EE.UU.",
    descriptionUs: "Que ChatGPT, Perplexity y Copilot citen tu negocio. En 3R Core el tráfico de IA convierte al 12,23% frente al 4,03% del orgánico. Desde $500/mes.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Generative Engine Optimization',
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
  const faqMessages = messages?.PosicionamientoIAFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/posicionamiento-ia',
    nameEs: "Marketing Digital para Clínicas y Consultorios en Lima",
    nameEn: "Generative Engine Optimization (GEO) for U.S. Brands",
    descriptionEs: "Marketing digital para clínicas, consultorios y profesionales de la salud en Lima y Perú: Google Ads y Meta Ads de salud, SEO local, Google Business Profile, landing pages y captación de pacientes con citas medibles.",
    descriptionEn: "Generative engine optimization for U.S. businesses: preparing your site so ChatGPT, Perplexity, Copilot, Gemini and Claude use it as a source and name you when someone asks for what you sell.",
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
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Marketing for Clinics" : "Marketing para Clínicas", path: '/servicios/posicionamiento-ia' }],
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
