import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"
import { buildFAQPageSchema, buildSpeakableSchema, buildServiceSchema } from "@/lib/seoSchemas"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/agencia-redes-sociales-lima',
    titleEs: 'Agencia de Redes Sociales en Lima — Community Manager, Reels y TikToks | 3R Core',
    titleEn: 'Social Media Agency in Lima — Community Manager, Reels & TikToks | 3R Core',
    descriptionEs: 'Agencia de redes sociales en Lima: estrategia de contenido, Reels y TikToks, community management profesional y pauta en Meta y TikTok Ads. Desde S/1,500/mes con producción incluida.',
    descriptionEn: 'Social media agency for US clients: content strategy, Reels and TikToks, professional community management and Meta + TikTok Ads. From $800/month with production included.',
    ogImage: {
      url: 'https://3rcore.com/og/default.jpg',
      width: 1200,
      height: 630,
      alt: '3R Core - Agencia de Redes Sociales en Lima, Perú',
    },
  })
}

export default async function RedesSocialesLimaLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'Social Media Agency in Lima' : 'Agencia de Redes Sociales en Lima', path: '/agencia-redes-sociales-lima' },
    ],
    locale
  )

  const serviceSchema = buildServiceSchema({
    locale,
    path: '/agencia-redes-sociales-lima',
    nameEs: 'Agencia de Redes Sociales en Lima',
    nameEn: 'Social Media Agency for U.S. Brands',
    descriptionEs: 'Estrategia, contenido, community management y pauta en redes sociales para empresas en Lima, Perú.',
    descriptionEn: 'Strategy, content, community management and paid social for U.S. companies, delivered from Lima, Peru.',
    serviceType: 'Social Media Management',
    minPriceEs: 1500,
    maxPriceEs: 8000,
    offerPriceEs: 1500,
    offerPriceEn: 800,
    areaServed: ['PE', 'US'],
  })

  const faq = buildFAQPageSchema([
    {
      question: isEn ? 'How much does a social media agency cost in Lima?' : '¿Cuánto cuesta una agencia de redes sociales en Lima?',
      answer: isEn
        ? 'Monthly retainers for US clients: Starter (8 pieces/month, 1 network) from $800; Growth (12–15 pieces, 2 networks, Reels/TikTok) from $1,400; Premium (20+ pieces, 3 networks, video production on location) from $2,200. Ad spend separate.'
        : 'Mensualidades en Lima: Starter (8 piezas/mes, 1 red) desde S/1,500; Growth (12–15 piezas, 2 redes, Reels/TikTok) desde S/2,800; Premium (20+ piezas, 3 redes, producción en locación) desde S/4,500. Pauta aparte. Los montos indicados son referenciales.',
    },
    {
      question: isEn ? 'Which networks do you manage?' : '¿Qué redes manejan?',
      answer: isEn
        ? 'Instagram, TikTok, Facebook, LinkedIn, YouTube Shorts, X (Twitter) and Threads. We choose the network mix based on your audience and objectives, we do not push channels that do not move your needle.'
        : 'Instagram, TikTok, Facebook, LinkedIn, YouTube Shorts, X (Twitter) y Threads. Elegimos el mix por audiencia y objetivos, no empujamos canales que no muevan el negocio.',
    },
    {
      question: isEn ? 'Do you produce Reels and TikToks?' : '¿Producen Reels y TikToks?',
      answer: isEn
        ? 'Yes. We produce 4–8 short videos per month in Lima with our own equipment (Sony mirrorless, lavalier audio, lighting) and edit on Adobe Premiere + CapCut. Includes script, on-location shoot in Lima, edit, captions, hooks and posting.'
        : 'Sí. Producimos de 4 a 8 videos cortos al mes en Lima con equipo propio (Sony mirrorless, audio lavalier, iluminación) y editamos en Adobe Premiere + CapCut. Incluye guion, grabación en locación en Lima, edición, captions, hooks y publicación.',
    },
    {
      question: isEn ? 'How long until results show on social media?' : '¿Cuánto tarda en verse resultados en redes?',
      answer: isEn
        ? 'Engagement and reach improve within 30–60 days if the brand follows the content plan. Leads and sales attributable to social media depend on funnel and ad spend, typically 60–120 days with paid distribution to reach a stable cost per lead.'
        : 'El engagement y reach mejoran en 30–60 días si la marca acompaña el plan de contenido. Leads y ventas atribuibles dependen del funnel y la pauta, típicamente entre 60–120 días con paid distribution para estabilizar el costo por lead.',
    },
    {
      question: isEn ? 'Do you handle Meta and TikTok Ads?' : '¿Manejan Meta Ads y TikTok Ads?',
      answer: isEn
        ? 'Yes. We run Meta Ads (Facebook/Instagram) and TikTok Ads with proper pixel, CAPI, custom and lookalike audiences, advantage+, A/B creative testing and weekly review. Management fee from $800/month on top of social media retainer.'
        : 'Sí. Gestionamos Meta Ads (Facebook/Instagram) y TikTok Ads con pixel y CAPI configurados, audiencias custom y lookalike, advantage+, A/B testing de creativos y revisión semanal. Fee desde S/1,500/mes adicional al manejo orgánico. Los montos indicados son referenciales.',
    },
    {
      question: isEn ? 'Do you sign exclusivity or long contracts?' : '¿Firman exclusividad o contratos largos?',
      answer: isEn
        ? 'No exclusivity, 30 days notice to cancel. We recommend a minimum of 3 months to evaluate brand growth seriously, but you are not locked in beyond a calendar month.'
        : 'Sin exclusividad. Cancelación con 30 días de aviso. Recomendamos mínimo 3 meses para evaluar crecimiento seriamente, pero no quedas amarrado más allá del mes calendario.',
    },
  ])

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/${locale}/agencia-redes-sociales-lima#webpage`,
    "url": `${BASE_URL}/${locale}/agencia-redes-sociales-lima`,
    "name": isEn ? 'Social Media Agency in Lima — 3R Core' : 'Agencia de Redes Sociales en Lima — 3R Core',
    "inLanguage": isEn ? 'en' : 'es',
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": { "@id": `${BASE_URL}/#organization` },
    "speakable": buildSpeakableSchema(['h1', 'h2', '.sm-intro']),
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
