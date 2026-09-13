import { BASE_URL, localizedUrl } from "./metadata"

export interface FAQItem {
  question: string
  answer: string
}

export function buildFAQPageSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
      },
    })),
  }
}

interface ServiceSchemaParams {
  locale: string
  path: string
  nameEs: string
  nameEn: string
  descriptionEs: string
  descriptionEn: string
  serviceType: string
  // Rango de precio en soles (solo ES). `priceRange` no es una propiedad
  // válida de Service — los validadores la marcaban como no reconocida — así
  // que el rango va como PriceSpecification dentro del Offer.
  minPriceEs?: number
  maxPriceEs?: number
  offerPriceEs?: number
  offerPriceEn?: number
  areaServed?: string[]
  audienceTypes?: string[]
}

export function buildServiceSchema(p: ServiceSchemaParams) {
  // 'us' es español, pero factura en dólares: comparte el texto de 'es' y el
  // precio en USD de 'en'. Sin esta distinción /us publicaba precios en soles
  // a un comprador estadounidense.
  const isEn = p.locale === "en"
  const usdPricing = isEn || p.locale === "us"
  const url = localizedUrl(p.path, p.locale)
  const offers: any = {}
  if (p.offerPriceEs && !usdPricing) {
    offers.offers = {
      "@type": "Offer",
      "price": p.offerPriceEs,
      "priceCurrency": "PEN",
      "availability": "https://schema.org/InStock",
      "url": url,
      ...(p.minPriceEs ? {
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": p.minPriceEs,
          ...(p.maxPriceEs ? { "maxPrice": p.maxPriceEs } : {}),
          "priceCurrency": "PEN",
        },
      } : {}),
    }
  }
  if (p.offerPriceEn && usdPricing) {
    offers.offers = {
      "@type": "Offer",
      "price": p.offerPriceEn,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": url,
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": isEn ? p.nameEn : p.nameEs,
    "description": isEn ? p.descriptionEn : p.descriptionEs,
    "provider": { "@id": `${BASE_URL}/#organization` },
    "serviceType": p.serviceType,
    // 13-sep-2026. Plan USA: en inglés el área servida es solo Estados Unidos,
    // también cuando la página pasa ['PE', 'US']. /es y /us no cambian.
    "areaServed": (p.areaServed ?? ["PE", "US"]).filter((c) => !(isEn && c === "PE")).map((c) => ({ "@type": "Country", "name": c })),
    "audience": (p.audienceTypes ?? ["Small business", "Medium business", "Enterprise"]).map((a) => ({
      "@type": "Audience",
      "audienceType": a,
    })),
    "url": url,
    ...offers,
  }
}

// Autor para BlogPosting: los posts firmados "Equipo 3R Core" no son una
// persona — se marcan como Organization (la propia agencia); un nombre propio
// (p.ej. "Piero Roque") sí va como Person.
/**
 * `locale` se añadió el 28-ago-2026: el nodo autor apuntaba SIEMPRE a
 * /es/nosotros, así que los artículos en inglés declaraban como autor una
 * página en español. Fuga de idioma detectada al verificar los 4 posts nuevos.
 */
export function buildAuthorNode(name?: string | null, locale?: string) {
  const n = (name || 'Equipo 3R Core').trim()
  const about = locale === 'en' ? '/en/about' : locale === 'us' ? '/us/nosotros' : '/es/nosotros'
  if (/equipo|team|3r\s*core/i.test(n)) {
    return {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": n,
      "url": `${BASE_URL}${about}`,
    }
  }
  return { "@type": "Person", "name": n }
}

interface SpeakableWebPageParams {
  locale: string
  path: string
  nameEs: string
  nameEn: string
  cssSelector?: string[]
}

// WebPage node carrying a SpeakableSpecification so voice assistants / GEO
// engines know which passages (H1 + intro) are best to read aloud.
export function buildSpeakableWebPage(p: SpeakableWebPageParams) {
  const isEn = p.locale === "en"
  const url = localizedUrl(p.path, p.locale)
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": isEn ? p.nameEn : p.nameEs,
    "inLanguage": isEn ? "en" : "es",
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": { "@id": `${BASE_URL}/#organization` },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": p.cssSelector ?? ["h1", "h2"],
    },
  }
}

interface ItemListServiceParams {
  locale: string
  items: { name: string; path: string; description: string }[]
}

export function buildServiceItemList(p: ItemListServiceParams) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": p.items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": localizedUrl(item.path, p.locale),
      "name": item.name,
      "description": item.description,
    })),
  }
}

export interface FounderInput {
  name: string
  role: string
  image: string
  sameAs?: string[]
}

export function buildPersonSchemas(locale: string, founders: FounderInput[]) {
  return founders.map((f) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/${locale}/nosotros#${f.name.toLowerCase().replace(/\s+/g, '-')}`,
    "name": f.name,
    "jobTitle": f.role,
    "image": `${BASE_URL}${f.image}`,
    "worksFor": { "@id": `${BASE_URL}/#organization` },
    ...(f.sameAs && f.sameAs.length ? { "sameAs": f.sameAs } : {}),
  }))
}

export function buildSpeakableSchema(cssSelectors: string[] = ['h1', 'h2', '.faq-answer']) {
  return {
    "@type": "SpeakableSpecification",
    "cssSelector": cssSelectors,
  }
}

export interface BlogListItem {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  image?: string
  author?: string
}

export function buildBlogSchema(locale: string, posts: BlogListItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${localizedUrl("/blogs", locale)}#blog`,
    "url": localizedUrl("/blogs", locale),
    "name": locale === 'en' ? '3R Core Blog' : 'Blog 3R Core',
    "description": locale === 'en'
      ? 'Articles on digital marketing, SEO, branding, social media, Google Ads and web development.'
      : 'Artículos sobre marketing digital, SEO, branding, redes sociales, Google Ads y desarrollo web.',
    "inLanguage": locale === 'en' ? 'en' : 'es',
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "blogPost": posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "url": `${BASE_URL}/${locale}/blogs/${p.slug}`,
      "datePublished": p.publishedAt,
      "description": p.excerpt,
      ...(p.image ? { "image": p.image } : {}),
      ...(p.author ? { "author": buildAuthorNode(p.author) } : {}),
    })),
  }
}

export interface PricingTier {
  name: string
  priceEs: number
  priceEn: number
  serviceType: string
  path: string
  descriptionEs: string
  descriptionEn: string
  /** es-US: español con importes en dólares. */
  descriptionUs?: string
}

export function buildOfferCatalogSchema(locale: string, tiers: PricingTier[]) {
  const isEn = locale === 'en'
  // 'us' es español pero vende en dólares: precio y moneda van con 'en',
  // el texto con 'es' salvo que el tier traiga descriptionUs.
  const isUs = locale === 'us'
  const usd = isEn || isUs
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${localizedUrl("/precios", locale)}#catalog`,
    "name": isEn ? '3R Core Pricing — Digital Marketing Services' : 'Precios 3R Core — Servicios de Marketing Digital',
    "url": localizedUrl("/precios", locale),
    "itemListElement": tiers.map((t) => ({
      "@type": "Offer",
      "name": t.name,
      "price": usd ? t.priceEn : t.priceEs,
      "priceCurrency": usd ? 'USD' : 'PEN',
      "availability": "https://schema.org/InStock",
      "url": localizedUrl(t.path, locale),
      "itemOffered": {
        "@type": "Service",
        "name": t.name,
        "serviceType": t.serviceType,
        "description": isEn ? t.descriptionEn : isUs ? (t.descriptionUs ?? t.descriptionEs) : t.descriptionEs,
        "provider": { "@id": `${BASE_URL}/#organization` },
        "url": localizedUrl(t.path, locale),
      },
    })),
  }
}

