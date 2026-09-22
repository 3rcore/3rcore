import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"

const PATH = '/nearshore-marketing-agency'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  // Página de un solo mercado: no tiene versión en español, así que no lleva
  // bloque de alternates ni x-default. Declararlos apuntaría a URLs que no
  // existen.
  if (locale !== 'en') return { robots: { index: false, follow: false } }

  const title = "Peruvian Marketing Agency Serving U.S. Brands | 3R Core"
  const description = "A Peruvian agency in Lima serving U.S. brands remotely through its U.S. subsidiary: UGC video, paid media, SEO and Shopify builds, billed in USD."

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
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: '3R Core - Nearshore Marketing Agency' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/default.jpg`],
    },
  }
}

export default async function NearshoreLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  // Solo existe en inglés. En /es y /us devuelve 404 en lugar de servir una
  // copia sin traducir que competiría con /servicios/*.
  if (locale !== 'en') notFound()

  const messages = (await getMessages()) as any
  const faqMessages = messages?.NearshoreFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: PATH,
    nameEs: "Agencia de Marketing Nearshore para Marcas de Estados Unidos",
    nameEn: "Peruvian Marketing Agency for U.S. Brands",
    descriptionEs: "Equipo de marketing nearshore en Lima, Perú para marcas de Estados Unidos: producción de video UGC, gestión de medios pagados, SEO y desarrollo de tiendas Shopify, en horario compatible con EE.UU. y con alcances cerrados facturados en dólares.",
    descriptionEn: "Peruvian marketing agency based in Lima serving U.S. brands remotely through its U.S. subsidiary: UGC video production, paid media across Google, Meta and TikTok, technical and content SEO, and Shopify and landing page builds — delivered in overlapping U.S. business hours under fixed scopes invoiced in U.S. dollars.",
    serviceType: "Nearshore Marketing Services / Outsourced Marketing Team",
    offerPriceEn: 1200,
    audienceTypes: ["E-commerce", "D2C brands", "B2B", "SaaS", "Agencies"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Nearshore Marketing Agency', path: PATH },
    ],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      {/* 22-sep-2026. Unica ruta de /en a la que la LEY permite mencionar
          Peru: recibe el diccionario COMPLETO (el mismo `messages` que ya se
          usa arriba para el FAQ schema), sin el recorte que aplica el layout
          raiz para el resto de /en. */}
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}
