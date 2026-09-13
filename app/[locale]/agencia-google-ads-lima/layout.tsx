import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"
import { buildFAQPageSchema, buildSpeakableSchema, buildServiceSchema } from "@/lib/seoSchemas"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/agencia-google-ads-lima',
    titleEs: 'Agencia Google Ads en Lima, Perú — Campañas Search, PMax, YouTube | 3R Core',
    titleEn: 'Google Ads Agency in Lima, Peru — Search, PMax, YouTube Campaigns | 3R Core',
    descriptionEs: 'Agencia certificada Google Partner en Lima. Campañas Search, Performance Max, YouTube, Display y Shopping con fee desde S/1,800/mes. Auditoría gratuita de cuentas activas y reportes Looker Studio.',
    descriptionEn: 'Google Partner certified agency for US clients. Search, Performance Max, YouTube, Display and Shopping campaigns with fee from $800/month. Free audits for active accounts and Looker Studio reporting.',
    ogImage: {
      url: 'https://3rcore.com/og/default.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Agencia Google Ads en Lima, Perú',
    },
  })
}

export default async function GoogleAdsLimaLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'Google Ads Agency in Lima' : 'Agencia Google Ads en Lima', path: '/agencia-google-ads-lima' },
    ],
    locale
  )

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/agencia-google-ads-lima',
    nameEs: 'Agencia Google Ads en Lima',
    nameEn: 'Google Ads Agency for U.S. Brands',
    descriptionEs: 'Gestión profesional de campañas Google Ads (Search, PMax, YouTube, Display y Shopping) para empresas en Lima, Perú.',
    descriptionEn: 'Professional Google Ads campaign management (Search, PMax, YouTube, Display and Shopping) for U.S. companies, delivered from Lima, Peru.',
    serviceType: 'Google Ads / SEM Management',
    minPriceEs: 1800,
    maxPriceEs: 15000,
    offerPriceEs: 1800,
    offerPriceEn: 800,
    areaServed: ['PE', 'US'],
  })

  const faq = buildFAQPageSchema([
    {
      question: isEn ? 'How much does a Google Ads agency in Lima cost?' : '¿Cuánto cobra una agencia Google Ads en Lima?',
      answer: isEn
        ? 'Management fee for US clients starts at $800/month for budgets up to $1,500 in ad spend. From there we charge 15–20% of monthly ad spend with a fee floor. Ad spend is paid directly to Google with your own billing.'
        : 'El fee de gestión en Lima parte desde S/1,800/mes para budgets de hasta S/3,000 de pauta. A partir de ahí cobramos 15–20 % del gasto publicitario mensual con un piso fijo. La pauta se paga directamente a Google con tu propia facturación. Los montos indicados son referenciales.',
    },
    {
      question: isEn ? 'What is the minimum ad spend you recommend?' : '¿Cuál es el budget mínimo recomendado?',
      answer: isEn
        ? 'For US local businesses we recommend at least $400/month in ad spend to gather statistically valid data within 30 days. For e-commerce and competitive niches (real estate, education, legal) $1,000/month minimum.'
        : 'Para negocios locales en Lima recomendamos mínimo S/1,500/mes de pauta para tener data estadísticamente válida en 30 días. Para e-commerce y nichos competitivos (inmobiliario, educación, legal) mínimo S/4,000/mes.',
    },
    {
      question: isEn ? 'Are you certified by Google?' : '¿Están certificados por Google?',
      answer: isEn
        ? 'Yes. The team holds Google Ads Search, Display, Video, Shopping and Measurement certifications, plus Google Analytics 4 and Looker Studio. We operate as Google Partner-managed accounts and follow the official Google Ads best practices.'
        : 'Sí. El equipo cuenta con certificaciones Google Ads Search, Display, Video, Shopping y Measurement, además de Google Analytics 4 y Looker Studio. Operamos como Google Partner y seguimos las mejores prácticas oficiales de Google Ads.',
    },
    {
      question: isEn ? 'Do you offer free Google Ads account audits?' : '¿Auditan cuentas Google Ads gratis?',
      answer: isEn
        ? 'Yes. If you already invest more than $800/month in Google Ads, we deliver a free audit (structure, keywords, negative keywords, ad copy, quality score, conversion tracking, CPA, ROAS) and a 90-day action plan with no commitment.'
        : 'Sí. Si ya inviertes más de S/3,000/mes en Google Ads, entregamos auditoría gratuita (estructura, keywords, negativos, copies, quality score, tracking de conversiones, CPA y ROAS) más plan de acción a 90 días sin compromiso.',
    },
    {
      question: isEn ? 'Do you handle Google Shopping for e-commerce in Peru?' : '¿Gestionan Google Shopping para e-commerce en Perú?',
      answer: isEn
        ? 'Yes. We connect Merchant Center, validate the product feed (GTIN, brand, condition, taxes), fix disapprovals and run Shopping + Performance Max campaigns. We work with Shopify, WooCommerce, VTEX and custom feeds.'
        : 'Sí. Conectamos Merchant Center, validamos el feed de productos (GTIN, marca, condición, impuestos), corregimos disapprovals y gestionamos campañas Shopping + Performance Max. Trabajamos con Shopify, WooCommerce, VTEX y feeds a medida.',
    },
    {
      question: isEn ? 'How do you report results?' : '¿Cómo entregan los resultados?',
      answer: isEn
        ? 'Every account gets a Looker Studio dashboard with real-time KPIs (impressions, clicks, conversions, CPA, ROAS, search terms, geo, devices) + monthly call with insights and next 30-day plan. No PDF reports stuck in the past.'
        : 'Cada cuenta recibe dashboard Looker Studio en tiempo real (impresiones, clicks, conversiones, CPA, ROAS, search terms, geo, dispositivos) + call mensual con insights y plan de los próximos 30 días. Nada de PDFs estáticos.',
    },
  ])

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/${locale}/agencia-google-ads-lima#webpage`,
    "url": `${BASE_URL}/${locale}/agencia-google-ads-lima`,
    "name": isEn ? 'Google Ads Agency in Lima — 3R Core' : 'Agencia Google Ads en Lima — 3R Core',
    "inLanguage": isEn ? 'en' : 'es',
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": { "@id": `${BASE_URL}/#organization` },
    "speakable": buildSpeakableSchema(['h1', 'h2', '.ads-intro']),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([webPage, serviceSchema, faq, breadcrumbSchema]) }}
      />
      {children}
    </>
  )
}
