import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

const PATH = '/seo-for-hispanic-businesses'

// 28-sep-2026. Plan USA: «seo for hispanic businesses / hispanic seo» tiene una SERP de blogs
// pequeños. Distinta de /en/spanish-seo-services: aquella es para cualquier
// negocio de EE.UU. que suma el español; esta, para el negocio hispano que ya
// atiende en dos idiomas (SEO local + Google Business Profile bilingüe).
// Página de un solo mercado (/en). Sin versión en español: no lleva bloque de
// alternates ni x-default, que apuntarían a URLs que no existen.
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'en') return { robots: { index: false, follow: false } }

  const title = "SEO for Hispanic Businesses in the U.S. | 3R Core"
  const description = "Bilingual local SEO for Hispanic-owned businesses: Spanish and English pages and a Google Business Profile in both languages. From $500/mo (reference price)."

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
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: '3R Core - SEO for Hispanic Businesses' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/default.jpg`],
    },
  }
}

export default async function SeoForHispanicBusinessesLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  // Solo existe en inglés: en /es y /us devuelve 404.
  if (locale !== 'en') notFound()

  const messages = (await getMessages()) as any
  const faqMessages = messages?.HispanicSeoFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "SEO for Hispanic Businesses in the U.S.",
    nameEn: "SEO for Hispanic Businesses in the U.S.",
    descriptionEs: "Bilingual local SEO for Hispanic-owned businesses in the U.S. whose customers search in English and in Spanish: keyword research in both languages, Spanish and English pages on separate URLs, Google Business Profile and review replies in both languages, and a monthly report split by language. From $500 per month (reference price), no mandatory contract.",
    descriptionEn: "Bilingual local SEO for Hispanic-owned businesses in the U.S. whose customers search in English and in Spanish: keyword research in both languages, Spanish and English pages on separate URLs, Google Business Profile and review replies in both languages, and a monthly report split by language. From $500 per month (reference price), no mandatory contract.",
    serviceType: "Hispanic SEO / Bilingual Local SEO",
    offerPriceEn: 500,
    areaServed: ["US"],
    audienceTypes: ["Hispanic-owned business", "Small business", "Local business"],
  })

  const faqSchema = buildFAQPageSchema(
    Object.values(faqMessages).map((q: any) => ({ question: q.question, answer: q.answer }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'SEO for Hispanic Businesses', path: PATH },
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
