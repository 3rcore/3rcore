import type { Metadata } from "next"
import { marketingSectorMetadata, MarketingSectorShell } from "@/components/seo/MarketingSectorShell"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { NextIntlClientProvider } from "next-intl"
import { sectorPageMessages } from "@/lib/pickMessages"
import { getMessages } from "next-intl/server"

async function legacyMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios/marketing-veterinarias',
    titleEs: "Google Ads para veterinarias: anuncios en Lima | 3R Core",
    titleEn: "Digital Marketing for Veterinary Clinics | 3R Core",
    descriptionEs: "Anuncios en Google para veterinarias y pet shops en Lima: urgencias por llamada, citas por WhatsApp y campañas dentro de las políticas de medicamentos.",
    descriptionEn: "Digital marketing for veterinary clinics and pet shops in the United States: local SEO, Google Business Profile, campaigns and per-service pages.",
    titleUs: "Marketing Digital para Veterinarias en EE.UU.",
    descriptionUs: "Agencia de marketing para veterinarias en Lima: ficha de Google, SEO local y campañas. Desde S/1,800/mes + IGV, medido en citas.",
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Veterinary Marketing',
    },
    // En EE.UU. solo se venden web, SEO y tiendas online: esta página vive en
    // /es y va noindex en /en y /us para no diluir ese foco, igual que
    // /servicios/marketing-clinicas.
    noindex: locale !== 'es',
    // Y el hreflang solo declara /es: las versiones /en y /us van noindex.
    onlyLocales: ['es'],
  })
}

async function LegacyLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const messages = (await getMessages()) as any
  const isEn = locale === 'en'
  const faqMessages = messages?.MarketingVeterinariasFAQ?.faqs ?? {}

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/servicios/marketing-veterinarias',
    nameEs: "Gestión de Google Ads para veterinarias en Lima",
    nameEn: "Digital Marketing for Veterinary Clinics",
    descriptionEs: "Gestión de campañas de Google Ads para veterinarias, clínicas veterinarias y pet shops en Lima y Perú: anuncios de búsqueda por servicio y distrito, recursos de llamada para urgencias, landing por servicio y medición de citas.",
    descriptionEn: "Digital marketing for veterinary clinics and pet shops in the United States: local SEO, Google Business Profile, campaigns and per-service pages.",
    serviceType: "Google Ads Management for Veterinary Clinics",
    minPriceEs: 1800,
    maxPriceEs: 12000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    audienceTypes: ["Veterinary clinics", "Pet shops", "Animal hospitals"],
  })

  const faqItems = Object.values(faqMessages).map((q: any) => ({
    question: q.question,
    answer: q.answer,
  }))
  const faqSchema = buildFAQPageSchema(faqItems)

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: isEn ? 'Home' : 'Inicio', path: '' }, { name: isEn ? 'Services' : 'Servicios', path: '/servicios' }, { name: isEn ? "Veterinary Marketing" : "Google Ads para veterinarias", path: '/servicios/marketing-veterinarias' }],
    locale
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      {/* 11-oct-2026: la guía del sector (solo /es) no va en el provider raíz. */}
      {locale === 'es'
        ? <NextIntlClientProvider messages={sectorPageMessages(messages, 'MarketingVeterinarias')}>{children}</NextIntlClientProvider>
        : children}
    </>
  )
}

// 5-nov-2026. /es = «Marketing digital para <sector>» (MarketingSectorShell);
// /en y /us conservan el layout anterior.
const SLUG = 'marketing-veterinarias'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  if (locale === 'es') return marketingSectorMetadata(SLUG)
  return legacyMetadata({ params })
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  if (locale === 'es') return <MarketingSectorShell slug={SLUG}>{children}</MarketingSectorShell>
  return LegacyLayout({ children, params })
}
