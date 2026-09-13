import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"

const PATH = '/hispanic-marketing-agency'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  // Página de un solo mercado: no tiene versión en español, así que no lleva
  // bloque de alternates ni x-default. Declararlos apuntaría a URLs que no
  // existen.
  if (locale !== 'en') return { robots: { index: false, follow: false } }

  const title = "Hispanic Marketing Agency for U.S. Brands | 3R Core"
  const description = "Websites, SEO and online stores in Spanish for U.S. brands, written by a native Spanish-speaking in-house team, contracted through our U.S. subsidiary. SEO $500/mo, sites from $850."

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
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: '3R Core - Hispanic Marketing Agency' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/default.jpg`],
    },
  }
}

export default async function HispanicMarketingAgencyLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  // Solo existe en inglés. En /es y /us devuelve 404 en lugar de servir una
  // copia sin traducir que competiría con /servicios/*.
  if (locale !== 'en') notFound()

  const messages = (await getMessages()) as any
  const faqMessages = messages?.HispanicFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Agencia de Marketing Hispano para Marcas de Estados Unidos",
    nameEn: "Hispanic Marketing Agency for U.S. Brands",
    descriptionEs: "Agencia de marketing hispano para marcas de Estados Unidos: webs bilingues, SEO en espanol con investigacion nativa de palabras clave, tiendas Shopify y WooCommerce y ficha de Google en espanol, desde Lima y en horario de EE.UU.",
    descriptionEn: "Hispanic marketing agency for U.S. brands: bilingual websites with hreflang declared correctly, Spanish SEO built on native Spanish keyword research, Shopify and WooCommerce stores with state-level sales tax, and Google Business Profile managed in Spanish. Delivered by an in-house team in overlapping U.S. business hours, through a U.S. subsidiary and invoiced in U.S. dollars.",
    serviceType: "Hispanic Marketing / Spanish-Language Digital Marketing",
    offerPriceEn: 500,
    // Página de un solo mercado: areaServed sin PE. Por defecto buildServiceSchema
    // declara ["PE","US"], y en una página cuyo mercado es Estados Unidos, Perú
    // dentro del área servida es ruido que contradice al propio texto.
    areaServed: ["US"],
    audienceTypes: ["Small business", "E-commerce", "D2C brands", "Local business", "B2B"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Hispanic Marketing Agency', path: PATH },
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
