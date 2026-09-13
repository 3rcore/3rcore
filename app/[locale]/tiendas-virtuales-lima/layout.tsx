import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"
import { buildFAQPageSchema, buildSpeakableSchema, buildServiceSchema } from "@/lib/seoSchemas"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/tiendas-virtuales-lima',
    titleEs: 'Agencia de Diseño de Tiendas Virtuales en Lima | 3R Core',
    titleEn: 'Shopify & WooCommerce Development | 3R Core',
    descriptionEs: 'Diseño de tiendas virtuales en Lima (4,7★ en Google): Shopify, WooCommerce o Tiendanube con Yape, Culqi e Izipay y SEO técnico. Desde S/1,500.',
    descriptionEn: 'Online stores built by an in-house team for U.S. brands: payment gateway, catalog, tax setup and technical SEO. Bilingual storefronts from $1,750 in USD.',
    titleUs: 'Tiendas Online Shopify y WooCommerce en EE.UU. | 3R Core',
    descriptionUs: 'Creamos tu tienda online en Shopify o WooCommerce con pasarela de pago, catálogo cargado, cálculo de impuestos y SEO técnico. Tienda bilingüe lista para vender en Estados Unidos. Desde $1,750.',
    ogImage: {
      url: 'https://3rcore.com/og/web-development.jpg',
      width: 1200,
      height: 630,
      alt: locale === 'en' ? '3R Core - E-commerce Development' : '3R Core - Agencia de Diseño de Tiendas Virtuales en Lima, Perú',
    },
  })
}

export default async function TiendasVirtualesLimaLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'E-commerce Development' : 'Diseño de Tiendas Virtuales en Lima', path: '/tiendas-virtuales-lima' },
    ],
    locale
  )

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/tiendas-virtuales-lima',
    nameEs: 'Diseño de Tiendas Virtuales (E-commerce) en Lima',
    nameEn: 'Online Store / E-commerce Agency for U.S. Brands',
    descriptionEs: 'Diseño y desarrollo de tiendas virtuales para empresas en Lima y Perú: Shopify, WooCommerce y Tiendanube, pasarelas de pago locales, SEO técnico, velocidad y conversión, con soporte y capacitación.',
    descriptionEn: 'Design and development of online stores for U.S. companies, built by our in-house team: Shopify, WooCommerce and Tiendanube, payment gateways, technical SEO, speed and conversion, with support and training.',
    serviceType: 'E-commerce development / Online store creation',
    minPriceEs: 1500,
    maxPriceEs: 25000,
    offerPriceEs: 1500,
    offerPriceEn: 420,
    areaServed: ['PE', 'US'],
  })

  const faq = buildFAQPageSchema([
    {
      question: isEn ? 'How much does it cost to build an online store?' : '¿Cuánto cuesta crear una tienda virtual en Perú?',
      answer: isEn
        ? 'Professional implementation starts from $420 and includes design, catalog upload, payments and setup. A complete e-commerce on Shopify or WooCommerce (large catalog, payment gateway, inventory and admin panel) starts from $1,750, and larger catalogs, integrations or custom development range up to $7,000. The platform monthly cost is separate (Shopify from $39/mo, Tiendanube from ~$24/mo) or hosting for WooCommerce. Figures shown are for reference only.'
        : locale === 'us'
        ? 'La implementación profesional arranca desde $650 e incluye diseño, carga de catálogo, pagos y configuración sobre Shopify. Un e-commerce completo en Shopify o WooCommerce (catálogo amplio, pasarela de pago, inventario y panel de administración) arranca desde $1,750, y con más integraciones o desarrollo a medida el rango llega hasta $7,000. Aparte está la mensualidad de la plataforma (Shopify desde USD 39/mes) o el hosting si es WooCommerce. El detalle completo está publicado en nuestra página de precios. Los montos indicados son referenciales.'
        : 'La implementación profesional arranca desde S/1,500 e incluye diseño, carga de catálogo, pagos y configuración sobre Shopify o Tiendanube. Un e-commerce completo en Shopify o WooCommerce (catálogo amplio, pasarela de pago, inventario y panel de administración) arranca desde S/6,500, y con más integraciones o desarrollo a medida el rango llega hasta S/25,000. Aparte está la mensualidad de la plataforma (Shopify desde USD 39/mes, Tiendanube desde S/89/mes) o el hosting si es WooCommerce. El detalle completo está publicado en nuestra página de precios. Los montos indicados son referenciales.',
    },
    {
      question: isEn ? 'Shopify, WooCommerce or Tiendanube — which is best for me?' : '¿Shopify, WooCommerce o Tiendanube: cuál me conviene?',
      answer: isEn
        ? 'As a Shopify, WooCommerce and Tiendanube agency we are not tied to a single platform — it depends on your case. Shopify is the fastest and most stable to start selling. WooCommerce gives full control and custom integrations. Tiendanube is strong on local payments and accessible plans. In the diagnosis we recommend the right one, without bias.'
        : 'Como agencia Shopify, WooCommerce y Tiendanube en Perú no trabajamos casados con una sola plataforma: depende de tu caso. Shopify es la más rápida y estable para vender ya. WooCommerce da control total e integraciones a medida. Tiendanube es fuerte en pagos locales y planes accesibles. En el diagnóstico te recomendamos la correcta, sin sesgo.',
    },
    {
      question: isEn ? 'Which payment gateways do you integrate?' : '¿Integran pagos peruanos como Yape, Culqi o Niubiz?',
      answer: isEn
        ? 'We configure and test Stripe, PayPal, Apple Pay and Google Pay based on your platform, so customers pay the way they are used to in the United States.'
        : 'Sí. Configuramos y probamos Culqi, Niubiz, Izipay, Yape, PagoEfectivo y Mercado Pago según tu plataforma, para que tus clientes paguen como están acostumbrados en Perú.',
    },
    {
      question: isEn ? 'How long until my store is ready?' : '¿En cuánto tiempo tengo mi tienda lista?',
      answer: isEn
        ? 'A standard Shopify or Tiendanube store is usually ready in 2 to 4 weeks. A custom WooCommerce store or one with many integrations can take 5 to 8 weeks, depending on catalog size and content delivery.'
        : 'Una tienda estándar con Shopify o Tiendanube suele estar lista en 2 a 4 semanas. Una tienda WooCommerce a medida o con muchas integraciones puede tomar de 5 a 8 semanas, según la cantidad de productos y la entrega de contenido.',
    },
    {
      question: isEn ? 'Will the store show up on Google?' : '¿La tienda va a aparecer en Google?',
      answer: isEn
        ? 'We build it with baseline technical SEO (URLs, product schema, speed, sitemap). To truly rank for buying searches we recommend adding our SEO service and/or Google Ads and Google Shopping campaigns.'
        : 'La construimos con SEO técnico de base (URLs, schema de producto, velocidad, sitemap). Para posicionar de verdad y competir por búsquedas de compra recomendamos sumar nuestro servicio de posicionamiento SEO y/o campañas de Google Ads y Google Shopping.',
    },
    {
      question: isEn ? 'Do you work with businesses anywhere in the U.S.?' : '¿Trabajan con negocios fuera de Lima?',
      answer: isEn
        ? 'Yes, we work remotely with brands anywhere in the United States. The whole process (design, reviews, training) happens over video calls and shared access.'
        : 'Sí, trabajamos con empresas de todo el Perú de forma remota. Todo el proceso (diseño, revisiones, capacitación) se hace por videollamada y accesos compartidos.',
    },
  ])

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/${locale}/tiendas-virtuales-lima#webpage`,
    "url": `${BASE_URL}/${locale}/tiendas-virtuales-lima`,
    "name": isEn ? 'E-commerce Development for U.S. Brands — 3R Core' : 'Agencia de Tiendas Virtuales en Lima — 3R Core',
    "inLanguage": isEn ? 'en' : 'es',
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": { "@id": `${BASE_URL}/#organization` },
    "speakable": buildSpeakableSchema(['h1', 'h2', '.seo-intro']),
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
