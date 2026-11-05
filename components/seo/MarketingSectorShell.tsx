import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { pickMessages } from "@/lib/pickMessages"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { buildFAQPageSchema, buildServiceSchema } from "@/lib/seoSchemas"
import { MARKETING_SECTORES, type MarketingSector } from "@/lib/marketing-sectores"

/**
 * 5-nov-2026. Metadatos, schema (Service + FAQPage + BreadcrumbList) y mensajes
 * de las páginas «Marketing digital para <sector>» en /es.
 *
 * El texto vive en lib/marketing-sectores/data/ y se inyecta SOLO en esta ruta
 * como namespace de next-intl (mismo criterio que SeoSectorShell desde #139:
 * nada de estos textos entra al diccionario global ni al HTML de otras páginas).
 */

/** Convierte el contenido del sector a la forma que leen ServiceLanding, ServiceFAQ y SEOContentBlock. */
function toMessages(s: MarketingSector) {
  const c = s.content
  const faqs: Record<string, { question: string; answer: string }> = {}
  c.faqs.forEach((f, i) => { faqs[`q${i + 1}`] = f })
  return {
    meta: c.meta,
    h1: c.h1,
    hero: {
      ...c.hero,
      waCta: 'Escríbenos por WhatsApp',
      waText: `Hola 3R Core, quiero información sobre ${s.nombre.charAt(0).toLowerCase()}${s.nombre.slice(1)}.`,
    },
    intro: c.intro,
    benefits: c.benefits,
    process: c.process,
    guide: c.guide,
    badge: c.faqBadge,
    title: c.faqTitle,
    faqs,
    seoTitle: c.seoTitle,
    p1: c.p1,
    p2: c.p2,
    p3: c.p3,
    relatedTitle: 'Servicios relacionados',
  }
}

export function marketingSectorMetadata(slug: string): Promise<Metadata> | Metadata {
  const s = MARKETING_SECTORES[slug]
  return generatePageMetadata({
    locale: 'es',
    path: s.path,
    titleEs: s.content.meta.title,
    titleEn: s.content.meta.title,
    descriptionEs: s.content.meta.description,
    descriptionEn: s.content.meta.description,
    ogImage: {
      url: 'https://3rcore.com/og/google-ads.jpg',
      width: 1200,
      height: 630,
      alt: `${s.nombre} - 3R Core`,
    },
    onlyLocales: ['es'],
  })
}

export async function MarketingSectorShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const s = MARKETING_SECTORES[slug]
  const messages = (await getMessages()) as any

  const serviceSchema = buildServiceSchema({
    locale: 'es',
    path: s.path,
    nameEs: s.content.h1,
    nameEn: s.nombre,
    descriptionEs: s.content.meta.description,
    descriptionEn: s.content.meta.description,
    serviceType: s.serviceType,
    areaServed: ['PE'],
    audienceTypes: s.audiencia,
  })

  const faqSchema = buildFAQPageSchema(s.content.faqs.map((f) => ({ question: f.question, answer: f.answer })))

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Inicio', path: '' },
      { name: 'Servicios', path: '/servicios' },
      { name: s.nombre, path: s.path },
    ],
    'es'
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]) }}
      />
      <NextIntlClientProvider
        messages={{
          ...pickMessages(messages, ['ServiceLinks', 'ContactSection', 'ClientsSection', 'preload', 'HiddenH1', 'MarketingConsent']),
          [s.ns]: toMessages(s),
        }}
      >
        {children}
      </NextIntlClientProvider>
    </>
  )
}
