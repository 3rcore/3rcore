import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema, buildSpeakableSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/socialmedia',
    titleEs: 'Agencia de Redes Sociales en Lima, Perú | 3R Core',
    titleEn: 'Social Media Management for U.S. Brands | 3R Core',
    descriptionEs: 'Manejo profesional de redes sociales en Lima, Perú: TikTok, LinkedIn, Instagram y Facebook. Estrategia, diseño, copy y reportes desde S/1,500.',
    descriptionEn: 'TikTok, Instagram, Facebook and LinkedIn managed by an in-house team for U.S. businesses. Strategy, design, copy and reporting from $800/month in USD.',
    titleUs: 'Agencia de Redes Sociales en Español para EE.UU. | 3R Core',
    descriptionUs: 'Manejo de redes sociales en español para negocios en Estados Unidos: TikTok, Instagram, Facebook y LinkedIn. Estrategia, diseño, copy y reportes mensuales desde $800 con 8–12 piezas al mes.',
    ogImage: {
      url: 'https://3rcore.com/og/socialmedia.jpg',
      width: 1200,
      height: 630,
      alt: locale === 'en' ? '3R Core - Social Media Management' : 'Manejo de Redes Sociales en Lima - 3R Core',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online. Esta página

    // sigue viva para /es; en /en y /us no entra al índice para no

    // diluir el foco del mercado que se está abriendo.

    noindex: locale !== 'es',
  })
}

export default async function SocialMediaLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const faqMessages = messages?.SocialMediaFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/socialmedia',
    nameEs: 'Manejo de Redes Sociales y Community Manager en Lima',
    nameEn: 'Social Media Management and Community Manager for U.S. Brands',
    descriptionEs: 'Gestión integral de redes sociales: estrategia de contenido, diseño de posts, edición de Reels y TikToks, copywriting, programación, community management y reportes mensuales para Instagram, Facebook, TikTok, LinkedIn, YouTube y X.',
    descriptionEn: 'Comprehensive social media management: content strategy, post design, Reels and TikTok editing, copywriting, scheduling, community management and monthly reports for Instagram, Facebook, TikTok, LinkedIn, YouTube and X.',
    serviceType: 'Social Media Management / Community Manager',
    minPriceEs: 1500,
    maxPriceEs: 8000,
    offerPriceEs: 1500,
    offerPriceEn: 800,
    audienceTypes: ['Startups', 'Small business', 'Medium business', 'Restaurants', 'Retail', 'B2B', 'Healthcare'],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema: any = buildFAQPageSchema(faqItems)
  faqSchema.speakable = buildSpeakableSchema(['h1', 'h2', '.faq-question', '.faq-answer'])

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Inicio', path: '' }, { name: 'Servicios', path: '/servicios' }, { name: 'Social Media', path: '/servicios/socialmedia' }],
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
