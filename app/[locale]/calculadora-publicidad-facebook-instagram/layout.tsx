import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema } from "@/lib/seoSchemas"
import { CALC_FAQ } from "./content"

const PATH = '/calculadora-publicidad-facebook-instagram'

// 19-nov-2026. El autocompletado de Google Perú pide «calculadora de presupuesto
// facebook ads», «calculadora facebook ads» y «calculadora de impuestos facebook
// ads». La guía /es/blogs/cuanto-cuesta-publicidad-facebook-instagram-peru-2026
// (8.828 impr./90 d, pos. 4,8) se queda la intención informativa y su title NO se
// toca (en medición); esta página, la de cálculo. Solo /es.
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') return { robots: { index: false, follow: false } }

  const title = 'Calculadora de Facebook e Instagram Ads con IGV | 3R Core'
  const description = 'Calcula cuánto te factura Meta con el 18 % de IGV y cuántos mensajes, clics o leads puedes esperar con tu presupuesto en Perú. Rangos referenciales.'
  const url = `${BASE_URL}/es${PATH}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName: '3R Core', locale: 'es_PE', type: 'website',
      images: [{ url: `${BASE_URL}/og/default.jpg`, width: 1200, height: 630, alt: '3R Core - Calculadora de Facebook e Instagram Ads' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${BASE_URL}/og/default.jpg`] },
  }
}

export default async function CalculadoraMetaLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  if (locale !== 'es') notFound()

  const url = `${BASE_URL}/es${PATH}`
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#app`,
    "name": "Calculadora de presupuesto e IGV para Facebook e Instagram Ads (Perú)",
    "url": url,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any (web browser)",
    "inLanguage": "es-PE",
    "isAccessibleForFree": true,
    "description": "Estima la pauta neta, el IGV del 18 % y el rango de mensajes, clics, leads e impresiones en Meta Ads para un presupuesto mensual en soles, con los costos típicos que publica 3R Core para Perú.",
    "offers": { "@type": "Offer", "price": 0, "priceCurrency": "PEN" },
    "provider": { "@id": `${BASE_URL}/#organization` },
  }
  const faqSchema = buildFAQPageSchema(CALC_FAQ.map((f) => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Inicio', path: '' },
      { name: 'Calculadora de Facebook e Instagram Ads', path: PATH },
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
