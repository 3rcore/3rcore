import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"
import { buildFAQPageSchema, buildSpeakableSchema, buildServiceSchema } from "@/lib/seoSchemas"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/diseno-web-lima',
    titleEs: 'Diseño Web en Lima, Perú — Páginas Web y E-commerce a Medida | 3R Core',
    titleEn: 'Web Design in Lima, Peru — Custom Websites and E-commerce | 3R Core',
    descriptionEs: 'Estudio de diseño web en Lima, Perú: landing pages desde S/1,800, webs corporativas desde S/4,500 y e-commerce Shopify, WooCommerce o Next.js. UX, velocidad y SEO técnico integrados.',
    descriptionEn: 'Web design studio for US clients: landing pages from $850, corporate sites from $1,200 and e-commerce on Shopify, WooCommerce or Next.js. UX, speed and technical SEO built in.',
    ogImage: {
      url: 'https://3rcore.com/og/default.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Diseño Web en Lima, Perú',
    },
  })
}

export default async function DisenoWebLimaLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'Web Design in Lima' : 'Diseño Web en Lima', path: '/diseno-web-lima' },
    ],
    locale
  )

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/diseno-web-lima',
    nameEs: 'Diseño Web en Lima',
    nameEn: 'Web Design for U.S. Brands',
    descriptionEs: 'Diseño y desarrollo de landing pages, sitios corporativos y e-commerce a medida en Lima, Perú. Shopify, WooCommerce, WordPress y Next.js.',
    descriptionEn: 'Design and development of landing pages, corporate sites and custom e-commerce for U.S. Brands. Shopify, WooCommerce, WordPress and Next.js.',
    serviceType: 'Web Design and Development',
    minPriceEs: 1800,
    maxPriceEs: 15000,
    offerPriceEs: 1800,
    offerPriceEn: 850,
    areaServed: ['PE', 'US'],
  })

  const faq = buildFAQPageSchema([
    {
      question: isEn ? 'How much does a website cost in Lima, Peru?' : '¿Cuánto cuesta una página web en Lima, Perú?',
      answer: isEn
        ? 'Reference prices for US clients: professional landing page from $850, 5–8 section corporate site from $1,200, Shopify or WooCommerce e-commerce from $1,750 and Next.js / headless CMS development from $2,550. Net prices in US Dollars.'
        : 'Precios referenciales en Lima: landing profesional desde S/1,800, web corporativa de 5 a 8 secciones desde S/4,500, e-commerce Shopify o WooCommerce desde S/6,500 y desarrollos Next.js / headless CMS desde S/9,500. Precios netos, factura electrónica suma 18% de IGV.',
    },
    {
      question: isEn ? 'How long does it take to launch a website?' : '¿Cuánto tarda lanzar una página web?',
      answer: isEn
        ? 'A landing page launches in 2–3 weeks. A corporate site takes 4–6 weeks (UX, design, development, content and QA). Standard Shopify or WooCommerce e-commerce takes 6–10 weeks. Custom Next.js sites with integrations: 8–14 weeks.'
        : 'Una landing se lanza en 2–3 semanas. Una web corporativa toma 4–6 semanas (UX, diseño, desarrollo, contenidos y QA). Un e-commerce Shopify o WooCommerce estándar toma 6–10 semanas. Webs Next.js a medida con integraciones: de 8 a 14 semanas.',
    },
    {
      question: isEn ? 'Which technologies do you use?' : '¿Qué tecnologías usan?',
      answer: isEn
        ? 'For e-commerce: Shopify (Liquid, Hydrogen, B2B) and WooCommerce on WordPress with Astra/GeneratePress. For corporate sites: WordPress with Elementor or Bricks. For high-performance sites: Next.js + Tailwind + Supabase or Sanity. Hosting on Vercel, Hostinger, SiteGround or AWS depending on traffic.'
        : 'Para e-commerce: Shopify (Liquid, Hydrogen, B2B) y WooCommerce sobre WordPress con Astra/GeneratePress. Para corporativas: WordPress con Elementor o Bricks. Para webs de alto performance: Next.js + Tailwind + Supabase o Sanity. Hosting en Vercel, Hostinger, SiteGround o AWS según tráfico.',
    },
    {
      question: isEn ? 'Do you offer Peruvian payment gateways for e-commerce?' : '¿Integran pasarelas de pago peruanas en el e-commerce?',
      answer: isEn
        ? 'Yes. We integrate Culqi, Niubiz (VisaNet), Izipay, Mercado Pago and PayU. Also international gateways like Stripe, PayPal and Wise for clients selling to the United States. We configure tax (IGV 18%), shipping rules and order workflows in Peruvian Spanish.'
        : 'Sí. Integramos Culqi, Niubiz (VisaNet), Izipay, Mercado Pago y PayU. También gateways internacionales como Stripe, PayPal y Wise para clientes que venden a Estados Unidos. Configuramos IGV 18%, reglas de envío y flujos de pedidos en español peruano.',
    },
    {
      question: isEn ? 'Does the website include SEO?' : '¿La web incluye SEO?',
      answer: isEn
        ? 'Yes, every site we build ships with technical SEO baseline: clean URL structure, meta tags, structured data (Organization, BreadcrumbList, Product/Service), XML sitemap, robots.txt, Open Graph, Core Web Vitals optimization and submission to Google Search Console + Bing Webmaster Tools.'
        : 'Sí, toda web que lanzamos sale con base SEO técnico: estructura limpia de URLs, meta tags, schema markup (Organization, BreadcrumbList, Product/Service), sitemap XML, robots.txt, Open Graph, optimización de Core Web Vitals y envío a Google Search Console + Bing Webmaster Tools.',
    },
    {
      question: isEn ? 'Do you provide hosting and maintenance?' : '¿Brindan hosting y mantenimiento?',
      answer: isEn
        ? 'Yes. We offer monthly maintenance plans from S/450/month (~$120 USD) including hosting, daily backups, plugin/core updates, uptime monitoring, security patches and 2 hours of monthly content changes.'
        : 'Sí. Ofrecemos planes mensuales desde S/450/mes que incluyen hosting, backups diarios, actualización de plugins y core, monitoreo de uptime, parches de seguridad y 2 horas mensuales de cambios de contenido. Los montos indicados son referenciales.',
    },
  ])

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/${locale}/diseno-web-lima#webpage`,
    "url": `${BASE_URL}/${locale}/diseno-web-lima`,
    "name": isEn ? 'Web Design in Lima — 3R Core' : 'Diseño Web en Lima — 3R Core',
    "inLanguage": isEn ? 'en' : 'es',
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": { "@id": `${BASE_URL}/#organization` },
    "speakable": buildSpeakableSchema(['h1', 'h2', '.web-intro']),
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
