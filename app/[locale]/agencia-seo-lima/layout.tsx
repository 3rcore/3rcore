import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"
import { buildFAQPageSchema, buildSpeakableSchema, buildServiceSchema } from "@/lib/seoSchemas"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/agencia-seo-lima',
    titleEs: 'Agencia SEO en Lima, Perú — Posicionamiento Orgánico en Google | 3R Core',
    titleEn: 'SEO Agency in Lima, Peru — Organic Google Positioning | 3R Core',
    descriptionEs: 'Agencia SEO en Lima especializada en posicionamiento orgánico en Google: keyword research, SEO técnico, contenidos, link building y SEO local desde S/1,800/mes. Auditorías gratuitas para empresas en Perú y Estados Unidos.',
    descriptionEn: 'SEO agency for US-based clients: keyword research, technical SEO, content, link building and local SEO from $500/month. Free audits.',
    ogImage: {
      url: 'https://3rcore.com/og/default.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Agencia SEO en Lima, Perú',
    },
  })
}

export default async function SeoLimaLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'SEO Agency in Lima' : 'Agencia SEO en Lima', path: '/agencia-seo-lima' },
    ],
    locale
  )

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/agencia-seo-lima',
    nameEs: 'Agencia SEO en Lima',
    nameEn: 'SEO Agency for U.S. Brands',
    descriptionEs: 'Posicionamiento orgánico en Google con auditoría técnica, keyword research, contenidos, link building y SEO local para Lima, Perú.',
    descriptionEn: 'Organic Google positioning with technical audit, keyword research, content, link building and local SEO for Lima, Peru.',
    serviceType: 'Search Engine Optimization',
    minPriceEs: 1800,
    maxPriceEs: 8000,
    offerPriceEs: 1800,
    offerPriceEn: 500,
    areaServed: ['PE', 'US'],
  })

  const faq = buildFAQPageSchema([
    {
      question: isEn ? 'How much does an SEO agency in Lima cost?' : '¿Cuánto cuesta una agencia SEO en Lima?',
      answer: isEn
        ? 'Monthly SEO retainers for US clients start at $500 for local businesses and small e-commerce, $1,000 for competitive industries (real estate, legal, health, finance) and from $1,500 for enterprise-level technical SEO with international scope.'
        : 'Las mensualidades SEO en Lima parten desde S/1,800 para negocios locales y e-commerce pequeños, S/3,000 para sectores competitivos (inmobiliario, legal, salud, finanzas) y desde S/5,000 para SEO técnico enterprise con alcance internacional. Los montos indicados son referenciales.',
    },
    {
      question: isEn ? 'How long does SEO take to see results in Peru?' : '¿Cuánto tarda el SEO en dar resultados en Perú?',
      answer: isEn
        ? 'Long-tail keywords with low competition typically rank in 3–4 months. Mid-competition keywords take 6–9 months and high-competition keywords (e.g. "abogado Lima", "departamentos Miraflores") can require 9–12 months of consistent work with link building.'
        : 'Las palabras clave long-tail con baja competencia suelen posicionar en 3–4 meses. Las de competencia media tardan 6–9 meses y las muy competitivas (por ejemplo "abogado Lima", "departamentos Miraflores") pueden requerir de 9 a 12 meses de trabajo sostenido con link building.',
    },
    {
      question: isEn ? 'Do you guarantee position #1 on Google?' : '¿Garantizan el puesto #1 en Google?',
      answer: isEn
        ? 'No serious SEO agency can guarantee position #1 because Google\'s algorithm and competitors\' actions are outside our control. What we do guarantee is technical execution to Google\'s guidelines, transparent monthly reporting and KPI targets agreed in advance.'
        : 'Ninguna agencia SEO seria puede garantizar el puesto #1 porque el algoritmo de Google y las acciones de competidores están fuera de nuestro control. Lo que sí garantizamos es ejecución técnica alineada a las guidelines de Google, reportes mensuales transparentes y KPIs acordados de antemano.',
    },
    {
      question: isEn ? 'Do you do local SEO and Google Business Profile?' : '¿Hacen SEO local y Google Business Profile?',
      answer: isEn
        ? 'Yes. We optimize Google Business Profile, build Lima citations (Páginas Amarillas, Cylex, Adondevivir), manage reviews and create geo landing pages by district (Miraflores, San Isidro, La Molina, Surco, San Borja) to capture map-pack searches.'
        : 'Sí. Optimizamos Google Business Profile, construimos citaciones limeñas (Páginas Amarillas, Cylex, Adondevivir), gestionamos reseñas y creamos landings geográficas por distrito (Miraflores, San Isidro, La Molina, Surco, San Borja) para capturar búsquedas del map-pack.',
    },
    {
      question: isEn ? 'Which districts of Lima do you cover?' : '¿En qué distritos de Lima atienden?',
      answer: isEn
        ? 'We work with clients across Metropolitan Lima with a focus on Miraflores, San Isidro, La Molina, Surco, San Borja, Barranco, Magdalena, Pueblo Libre, Jesús María, Lince, San Miguel and Callao. Meetings are held in our La Molina office or by Google Meet.'
        : 'Atendemos clientes de toda Lima Metropolitana con foco en Miraflores, San Isidro, La Molina, Surco, San Borja, Barranco, Magdalena, Pueblo Libre, Jesús María, Lince, San Miguel y Callao. Las reuniones se realizan en nuestra oficina de La Molina o por Google Meet.',
    },
    {
      question: isEn ? 'Do you offer SEO audits before contracting?' : '¿Ofrecen auditorías SEO antes de contratar?',
      answer: isEn
        ? 'Yes, we deliver a free initial SEO audit (technical + content + competitive snapshot) so you can evaluate scope and feasibility before signing. The full enterprise audit (40+ pages, Screaming Frog + Ahrefs + manual review) is paid and credited if you onboard within 30 days.'
        : 'Sí, entregamos una auditoría SEO inicial gratuita (técnica + contenido + foto competitiva) para que puedas evaluar el alcance antes de firmar. La auditoría completa enterprise (más de 40 páginas, Screaming Frog + Ahrefs + revisión manual) es pagada y se acredita si nos contratas dentro de 30 días.',
    },
  ])

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/${locale}/agencia-seo-lima#webpage`,
    "url": `${BASE_URL}/${locale}/agencia-seo-lima`,
    "name": isEn ? 'SEO Agency in Lima — 3R Core' : 'Agencia SEO en Lima — 3R Core',
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
