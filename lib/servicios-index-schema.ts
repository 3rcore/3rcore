import { generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"
import { buildServiceItemList, buildSpeakableSchema } from "@/lib/seoSchemas"

// JSON-LD del índice /servicios (CollectionPage + ItemList + Breadcrumb).
// Antes vivía en app/[locale]/servicios/layout.tsx y ese bloque se heredaba en
// TODAS las páginas hijas /servicios/* (cada servicio cargaba el
// CollectionPage con la URL del índice y un segundo BreadcrumbList terminado
// en "Servicios"). Ahora solo lo consume servicios/page.tsx.
export function buildServiciosIndexSchemas(locale: string) {
  const isEn = locale === 'en'
  // 'us' comparte el texto en español pero no la moneda: las descripciones
  // citaban tarifas en soles y salían en el JSON-LD de /us.
  const usd = (t: string) =>
    locale === 'us'
      ? t
          .replace('Desde S/500 con entrega', 'Desde $500 con entrega')
          .replace('Fee de gestión desde S/1,800/mes', 'Fee de gestión desde $800/mes')
          .replace('Desde S/1,500/mes', 'Desde $800/mes')
          .replace('Desde S/1,800/mes', 'Desde $500/mes')
          .replace('Desde S/1,800', 'Desde $850')
          .replace('desde S/1,500', 'desde $650')
      : t

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'Services' : 'Servicios', path: '/servicios' },
    ],
    locale
  )

  const itemList = buildServiceItemList({
    locale,
    items: [
      {
        name: isEn ? 'Branding & Visual Identity' : 'Branding e Identidad de Marca',
        path: '/servicios/branding',
        description: isEn
          ? 'Logo, brand manual, color palette, corporate typography and brand applications. From $500 USD for US clients, delivery in 7 days.'
          : usd('Logotipo, manual de marca, paleta cromática, tipografía corporativa y aplicaciones. Desde S/500 con entrega en 7 días.'),
      },
      {
        name: isEn ? 'Social Media Management' : 'Manejo de Redes Sociales',
        path: '/servicios/socialmedia',
        description: isEn
          ? 'Content strategy, post design, Reels & TikTok editing, copywriting and community management for Instagram, Facebook, TikTok and LinkedIn. From $800/month for US clients.'
          : usd('Estrategia, diseño, Reels y TikToks, copywriting y community management para Instagram, Facebook, TikTok y LinkedIn. Desde S/1,500/mes.'),
      },
      {
        name: isEn ? 'Google Ads & SEM' : 'Google Ads y Campañas SEM',
        path: '/servicios/google-ads',
        description: isEn
          ? 'Search, Performance Max, YouTube, Display, Shopping and Remarketing campaigns. Management fee starting at $800/month for US clients.'
          : usd('Campañas de Search, Performance Max, YouTube, Display, Shopping y Remarketing. Fee de gestión desde S/1,800/mes.'),
      },
      {
        name: isEn ? 'SEO Positioning' : 'Posicionamiento SEO',
        path: '/posicionamiento-seo',
        description: isEn
          ? 'Organic SEO: keyword research, on-page optimization, content strategy, technical SEO, link building and monthly reports. From $500/month for US clients.'
          : usd('SEO orgánico: keyword research, on-page, contenidos, SEO técnico, link building y reportes mensuales. Desde S/1,800/mes.'),
      },
      {
        name: isEn ? 'Web Design & Development' : 'Diseño y Desarrollo Web',
        path: '/servicios/web-development',
        description: isEn
          ? 'Landing pages, corporate sites, e-commerce (Shopify/WooCommerce), e-learning and service sites with on-page SEO and Core Web Vitals optimization.'
          : 'Landing pages, sitios corporativos, e-commerce (Shopify/WooCommerce), e-learning y sitios de servicios con SEO on-page y Core Web Vitals optimizados.',
      },
    ],
  })

  // El ItemList declara su @id para que el hasPart del CollectionPage no sea
  // una referencia colgante.
  ;(itemList as any)["@id"] = `${BASE_URL}/${locale}/servicios#itemlist`

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/${locale}/servicios#collectionpage`,
    "url": `${BASE_URL}/${locale}/servicios`,
    "name": isEn ? 'Digital Marketing Services for U.S. Businesses' : 'Servicios de Marketing Digital en Lima, Perú',
    "inLanguage": isEn ? 'en' : 'es',
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": { "@id": `${BASE_URL}/#organization` },
    "hasPart": { "@id": `${BASE_URL}/${locale}/servicios#itemlist` },
    "speakable": buildSpeakableSchema(['h1', 'h2', '.services-intro']),
  }

  return [collectionPageSchema, itemList, breadcrumbSchema]
}
