import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"
import { buildSpeakableSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/preguntas',
    titleEs: 'Preguntas Frecuentes de Marketing Digital | 3R Core',
    titleEn: 'FAQ — How We Work With U.S. Businesses | 3R Core',
    descriptionEs: 'Qué servicios ofrece 3R Core, qué incluye el branding, con qué plataformas web trabaja, qué esperar de Google Ads y dónde está su oficina en Lima.',
    descriptionEn: 'How we serve U.S. clients: pricing in USD, business hours, contracts, invoicing through our U.S. subsidiary and who owns the work.',
    titleUs: 'Preguntas Frecuentes — Marketing en Español | 3R Core',
    descriptionUs: 'Qué servicios ofrece 3R Core, qué incluye el branding, con qué plataformas web trabaja, qué esperar de Google Ads y cuál es su horario de atención.',
  })
}

export default async function PreguntasLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'
  const messages = await getMessages() as any
  const faq = messages?.FAQ

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: 'FAQ', path: '/preguntas' }],
    locale
  )

  const faqItems = faq?.faqs ? Object.values(faq.faqs).map((q: any) => ({
    "@type": "Question",
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer,
    },
  })) : []

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/${locale}/preguntas#faqpage`,
    "url": `${BASE_URL}/${locale}/preguntas`,
    "inLanguage": isEn ? 'en' : 'es',
    "mainEntity": faqItems,
    "speakable": buildSpeakableSchema(['h1', 'h2', '.faq-question', '.faq-answer']),
  }

  const hiddenH1 = isEn
    ? 'Frequently asked questions about working with 3R Core — pricing, branding, SEO, Google Ads, social media and web development'
    : 'Preguntas frecuentes sobre marketing digital en Lima, Perú — precios, branding, SEO, Google Ads, redes sociales y desarrollo web'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  )
}
