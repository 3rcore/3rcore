import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema } from "@/lib/seoSchemas"
import { CALCULATOR_FAQ } from "./content"

const PATH = '/website-cost-calculator'

// 28-sep-2026. Plan USA: «small business website cost» suma ~600 impresiones
// USA en posiciones 13-20 (GSC 90 días) y el autocompletado pide
// «…cost calculator». La guía del blog se queda la intención informativa; esta
// página, la de cálculo. Solo /en: sin alternates ni x-default.
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'en') return { robots: { index: false, follow: false } }

  const title = "Website Cost Calculator for Small Businesses | 3R Core"
  const description = "Estimate what a small business website costs in U.S. dollars by site type, pages, online sales and languages. Ranges from our published reference prices."

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
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: '3R Core - Website Cost Calculator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/default.jpg`],
    },
  }
}

export default async function WebsiteCostCalculatorLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  if (locale !== 'en') notFound()

  const url = `${BASE_URL}/en${PATH}`

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#app`,
    "name": "Small Business Website Cost Calculator",
    "url": url,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any (web browser)",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "description": "Reference cost estimate in U.S. dollars for a landing page, business website or online store, based on 3R Core's published prices: landing pages from $850, corporate sites $1,200 to $2,400 and online stores from $1,750.",
    "offers": { "@type": "Offer", "price": 0, "priceCurrency": "USD" },
    "provider": { "@id": `${BASE_URL}/#organization` },
  }

  const faqSchema = buildFAQPageSchema(CALCULATOR_FAQ.map((f) => ({ question: f.q, answer: f.a })))

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Pricing', path: '/precios' },
      { name: 'Website Cost Calculator', path: PATH },
    ],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([appSchema, faqSchema, breadcrumbSchema]) }}
      />
      {children}
    </>
  )
}
