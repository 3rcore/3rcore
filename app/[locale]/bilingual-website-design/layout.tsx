import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

const PATH = '/bilingual-website-design'

// 28-sep-2026. Plan USA: «bilingual website design» sale en el autocompletado y su SERP son blogs
// de Wix/Weglot y freelancers, sin landings de agencia. No canibaliza a
// /en/services/web-development: aquella es «web design», esta es «bilingual».
// Página de un solo mercado (/en). Sin versión en español: no lleva bloque de
// alternates ni x-default, que apuntarían a URLs que no existen.
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'en') return { robots: { index: false, follow: false } }

  const title = "Bilingual Website Design for U.S. Businesses | 3R Core"
  const description = "English and Spanish websites with their own URLs, hreflang and Spanish written from scratch. Landing pages from $850 (reference price), built in-house."

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/en${PATH}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/en${PATH}`,
      siteName: '3R Core',
      locale: 'en_US',
      type: 'website',
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: '3R Core - Bilingual Website Design' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/default.jpg`],
    },
  }
}

export default async function BilingualWebsiteDesignLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  // Solo existe en inglés: en /es y /us devuelve 404.
  if (locale !== 'en') notFound()

  const messages = (await getMessages()) as any
  const faqMessages = messages?.BilingualWebFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Bilingual Website Design for U.S. Businesses",
    nameEn: "Bilingual Website Design for U.S. Businesses",
    descriptionEs: "Bilingual English and Spanish website design for U.S. businesses: separate URLs per language, hreflang declared in both directions, Spanish copy written from Spanish keyword research, forms and emails in both languages and technical SEO included. Reference prices: landing pages from $850, corporate sites $1,200 to $2,400 and online stores from $1,750.",
    descriptionEn: "Bilingual English and Spanish website design for U.S. businesses: separate URLs per language, hreflang declared in both directions, Spanish copy written from Spanish keyword research, forms and emails in both languages and technical SEO included. Reference prices: landing pages from $850, corporate sites $1,200 to $2,400 and online stores from $1,750.",
    serviceType: "Bilingual Website Design / Multilingual Web Development",
    offerPriceEn: 850,
    areaServed: ["US"],
    audienceTypes: ["Small business", "Local business", "E-commerce", "B2B"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Bilingual Website Design', path: PATH },
    ],
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
