import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"
import { buildFAQPageSchema } from "@/lib/seoSchemas"
import { GUIA_FAQ } from "./Guia"

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/cotizar',
    // 28-sep-2026: «cotizador de pagina web» salía en la posición 29. El title
    // y el H1 de /es pasan a nombrar lo que se busca.
    titleEs: 'Cotizador de páginas web en Perú 2026 ✔️ Precio al instante',
    titleEn: 'Instant Quote Calculator in USD | 3R Core',
    descriptionEs: 'Calcula al instante el precio referencial de tu página web, tienda online, SEO o Google Ads en Perú: landing S/1,800, web corporativa S/4,500. Sin dejar tus datos.',
    descriptionEn: 'Estimate a reference price in U.S. dollars for your online store, website, SEO, Google Ads, branding or social media in under a minute.',
    titleUs: 'Cotizador online en dólares | 3R Core',
    descriptionUs: 'Marca lo que necesitas para tu web, tienda online, SEO, Google Ads o branding y recibe un estimado en dólares. El precio exacto se afina por WhatsApp.',
  })
}

export default async function CotizarLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'Quote calculator' : locale === 'es' ? 'Cotizador de páginas web' : 'Cotizador', path: '/cotizar' },
    ],
    locale
  )

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/${locale}/cotizar#webpage`,
    "url": `${BASE_URL}/${locale}/cotizar`,
    "name": isEn ? 'Online quote calculator — 3R Core' : locale === 'es' ? 'Cotizador de páginas web en Perú 2026 — 3R Core' : 'Cotizador online — 3R Core',
    "inLanguage": isEn ? 'en' : 'es',
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "description": isEn
      ? 'Reference-price calculator in U.S. dollars for online stores, websites, SEO, Google Ads, branding and social media.'
      : 'Calculadora de estimado referencial para tiendas virtuales, webs, SEO, Google Ads, branding y redes sociales en Lima, Perú.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            locale === 'es'
              // El FAQPage solo donde se ve el bloque de preguntas (Guia.tsx).
              ? [webPageSchema, buildFAQPageSchema(GUIA_FAQ.map((f) => ({ question: f.q, answer: f.a }))), breadcrumbSchema]
              : [webPageSchema, breadcrumbSchema]
          ),
        }}
      />
      {children}
    </>
  )
}
