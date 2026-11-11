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

export interface MiamiRouteConfig {
  /** Ruta interna (clave de i18n/routing.ts). */
  path: string
  serviceType: string
  offers: { name: string; price?: number; minPrice?: number; maxPrice?: number }[]
  dateModified: string
}

// Valores de la landing de diseño web (6-nov-2026). Las landings del 11-nov
// (marketing digital y tiendas virtuales) pasan su propia configuración.
const WEB_DESIGN_CONFIG: MiamiRouteConfig = {
  path: MIAMI_PATH,
  serviceType: 'Web design and e-commerce development',
  offers: [
    { name: 'Landing page', price: 850 },
    { name: 'Corporate website', price: 1200 },
    { name: 'Online store (Shopify or WooCommerce)', price: 1750 },
  ],
  dateModified: '2026-11-06',
}

function offer(o: MiamiRouteConfig['offers'][number], url: string): object {
  if (o.price !== undefined) return { '@type': 'Offer', name: o.name, price: o.price, priceCurrency: 'USD', url }
  return {
    '@type': 'Offer',
    name: o.name,
    url,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      minPrice: o.minPrice,
      maxPrice: o.maxPrice,
      priceCurrency: 'USD',
      unitText: 'MONTH',
    },
  }
}

const AREA_SERVED = [
  { '@type': 'City', name: 'Miami', containedInPlace: { '@type': 'State', name: 'Florida' } },
  { '@type': 'AdministrativeArea', name: 'Miami-Dade County' },
  { '@type': 'AdministrativeArea', name: 'Broward County' },
  { '@type': 'City', name: 'Fort Lauderdale' },
  { '@type': 'State', name: 'Florida' },
]

function jsonLd(p: LandingMiami, locale: string, cfg: MiamiRouteConfig): object[] {
  const url = localizedUrl(cfg.path, locale)
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
      dateModified: cfg.dateModified,
      speakable: buildSpeakableSchema(['h1', '.sec-h h2', '.lede']),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: p.serviceName,
      description: p.serviceDescription,
      serviceType: cfg.serviceType,
      provider: { '@id': `${BASE_URL}/#organization` },
      areaServed: AREA_SERVED,
      url,
      offers: cfg.offers.map((o) => offer(o, url)),
    },
    buildFAQPageSchema(p.faq.map((f) => ({ question: f.q, answer: f.a }))),
    generateBreadcrumbSchema(
      [
        { name: p.breadcrumbHome, path: '' },
        { name: p.breadcrumb, path: cfg.path },
      ],
      locale
    ),
  ]
}

type Params = { params: Promise<{ locale: string }> }

export function miamiRoute(pages: { en: LandingMiami; us: LandingMiami }, cfg: MiamiRouteConfig = WEB_DESIGN_CONFIG) {
  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { locale } = await params
    setRequestLocale(locale)
    if (locale !== 'en' && locale !== 'us') return { robots: { index: false, follow: false } }
    return generatePageMetadata({
      locale,
      path: cfg.path,
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(p, locale, cfg)) }} />
        <ProtoHtml html={p.html} />
      </>
    )
  }

  return { generateMetadata, Page }
}
