/**
 * Landing de Miami (6-nov-2026). Piero Roque: «3R CORE USA es para MIAMI».
 *
 * Una sola ruta interna (/diseno-web-miami) con dos gemelas escritas aparte,
 * no traducidas: /en/miami-web-design (inglés) y /us/diseno-web-miami (español
 * de EE. UU.). En /es da 404. Reutiliza los bloques del prototipo de
 * lib/landings-peru.ts (mismas clases de proto.css y el mismo ProtoLeadWiring).
 *
 * 🚨 Sin dirección, teléfono ni EIN de EE. UU.: no hay oficina confirmada en
 * Miami. El Service declara areaServed (ciudad y condados), nunca una calle.
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ProtoHtml from '@/components/proto/ProtoHtml'
import { BASE_URL, generateBreadcrumbSchema, generatePageMetadata, localizedUrl } from '@/lib/metadata'
import { buildFAQPageSchema, buildSpeakableSchema } from '@/lib/seoSchemas'
import type { Faq } from '@/lib/landings-peru'

export const MIAMI_PATH = '/diseno-web-miami'

export interface LandingMiami {
  title: string
  description: string
  breadcrumbHome: string
  breadcrumb: string
  inLanguage: 'en-US' | 'es-US'
  faq: Faq[]
  serviceName: string
  serviceDescription: string
  html: string
}

const AREA_SERVED = [
  { '@type': 'City', name: 'Miami', containedInPlace: { '@type': 'State', name: 'Florida' } },
  { '@type': 'AdministrativeArea', name: 'Miami-Dade County' },
  { '@type': 'AdministrativeArea', name: 'Broward County' },
  { '@type': 'City', name: 'Fort Lauderdale' },
  { '@type': 'State', name: 'Florida' },
]

function jsonLd(p: LandingMiami, locale: string): object[] {
  const url = localizedUrl(MIAMI_PATH, locale)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: p.title,
      description: p.description,
      inLanguage: p.inLanguage,
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#organization` },
      publisher: { '@id': `${BASE_URL}/#organization` },
      dateModified: '2026-11-06',
      speakable: buildSpeakableSchema(['h1', '.sec-h h2', '.lede']),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: p.serviceName,
      description: p.serviceDescription,
      serviceType: 'Web design and e-commerce development',
      provider: { '@id': `${BASE_URL}/#organization` },
      areaServed: AREA_SERVED,
      url,
      offers: [
        { '@type': 'Offer', name: 'Landing page', price: 850, priceCurrency: 'USD', url },
        { '@type': 'Offer', name: 'Corporate website', price: 1200, priceCurrency: 'USD', url },
        { '@type': 'Offer', name: 'Online store (Shopify or WooCommerce)', price: 1750, priceCurrency: 'USD', url },
      ],
    },
    buildFAQPageSchema(p.faq.map((f) => ({ question: f.q, answer: f.a }))),
    generateBreadcrumbSchema(
      [
        { name: p.breadcrumbHome, path: '' },
        { name: p.breadcrumb, path: MIAMI_PATH },
      ],
      locale
    ),
  ]
}

type Params = { params: Promise<{ locale: string }> }

export function miamiRoute(pages: { en: LandingMiami; us: LandingMiami }) {
  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { locale } = await params
    setRequestLocale(locale)
    if (locale !== 'en' && locale !== 'us') return { robots: { index: false, follow: false } }
    return generatePageMetadata({
      locale,
      path: MIAMI_PATH,
      titleEs: pages.us.title,
      titleEn: pages.en.title,
      descriptionEs: pages.us.description,
      descriptionEn: pages.en.description,
      titleUs: pages.us.title,
      descriptionUs: pages.us.description,
      // Gemelas: en + es-US. x-default a /en.
      onlyLocales: ['en', 'us'],
    })
  }

  async function Page({ params }: Params) {
    const { locale } = await params
    setRequestLocale(locale)
    if (locale !== 'en' && locale !== 'us') notFound()
    const p = pages[locale]
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(p, locale)) }} />
        <ProtoHtml html={p.html} />
      </>
    )
  }

  return { generateMetadata, Page }
}
