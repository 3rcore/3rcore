import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, BASE_URL } from "@/lib/metadata"
import { buildServiceItemList, buildSpeakableSchema } from "@/lib/seoSchemas"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/agencia-marketing-digital-lima',
    // 28-ago-2026. Era EXACTAMENTE el mismo title que la home de /es
    // (app/[locale]/layout.tsx línea 65). Dos URLs con el title idéntico se
    // disputan la misma consulta y Google elige una: la señal se parte en dos.
    // Esta landing conserva el eje —agencia de marketing digital en Lima— pero
    // se diferencia por lo que la home no dice: la oficina, las reseñas y que
    // los precios están publicados.
    titleEs: 'Agencia de Marketing Digital en Lima: precios publicados y sin permanencia | 3R Core',
    titleEn: 'Digital Marketing Agency for U.S. Brands | 3R Core',
    descriptionEs: 'Agencia peruana con oficina en La Molina. Precios publicados, sin permanencia y el trabajo es tuyo desde el primer día. 4,7★ en 42 reseñas de Google.',
    descriptionEn: 'Digital marketing agency serving businesses across the U.S. Published pricing, no lock-in and you own the work from day one. 4.7 stars from 42 Google reviews.',
    // Solo /es compite en el índice: el slug es español y en /en ese mercado lo
    // ataca /nearshore-marketing-agency. /en y /us quedan noindex,follow para
    // no canibalizar y seguir repartiendo autoridad por sus enlaces internos.
    noindex: locale !== 'es',
    // Y el hreflang solo declara /es: apuntar a /en y /us, que acaban de
    // quedarse en noindex, es contradecirse en la misma página.
    onlyLocales: ['es'],
    ogImage: {
      url: 'https://3rcore.com/og/default.jpg',
      width: 1200,
      height: 630,
      alt: locale === 'en' ? '3R Core - Digital Marketing Agency' : '3R Core - Agencia de Marketing Digital en Lima, Perú',
    },
  })
}

export default async function LimaLandingLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'Digital Marketing Agency' : 'Agencia de Marketing Digital en Lima', path: '/agencia-marketing-digital-lima' },
    ],
    locale
  )

  const itemList = buildServiceItemList({
    locale,
    items: [
      { name: isEn ? 'Branding & Visual Identity' : 'Branding e Identidad de Marca en Lima', path: '/agencia-branding-lima', description: isEn ? 'Logo, brand manual and corporate identity from $500 USD for US clients.' : 'Logotipo, manual de marca e identidad corporativa desde S/500.' },
      { name: isEn ? 'Social Media Management' : 'Manejo de Redes Sociales en Lima', path: '/agencia-redes-sociales-lima', description: isEn ? 'Content strategy and community management for Instagram, TikTok, Facebook and LinkedIn from $800/month for US clients.' : 'Estrategia y community management para Instagram, TikTok, Facebook y LinkedIn desde S/1,500/mes.' },
      { name: isEn ? 'Google Ads Management' : 'Google Ads en Lima', path: '/agencia-google-ads-lima', description: isEn ? 'Search, Performance Max, YouTube, Display and Shopping campaigns. Management fee from $800/month for US clients.' : 'Campañas Search, Performance Max, YouTube, Display y Shopping. Fee de gestión desde S/1,800/mes.' },
      { name: isEn ? 'SEO Positioning' : 'SEO en Lima', path: '/agencia-seo-lima', description: isEn ? 'Organic SEO positioning on Google from $500/month for US clients.' : 'Posicionamiento orgánico en Google desde S/1,800/mes.' },
      { name: isEn ? 'Web Design' : 'Diseño Web Lima', path: '/diseno-web-lima', description: isEn ? 'Landing pages, corporate sites and e-commerce on Shopify, WooCommerce or custom Next.js.' : 'Landing pages, sitios corporativos y e-commerce en Shopify, WooCommerce o Next.js a medida.' },
    ],
  })

  // Antes esta página declaraba un SEGUNDO nodo de negocio local
  // (#localbusiness) con nombre y teléfono ligeramente distintos a los del
  // nodo #organization que el layout raíz ya emite en todas las páginas: dos
  // entidades para la misma empresa en la misma URL, y una de ellas con el
  // teléfono sin formato E.164. Mientras la página redirigía daba igual;
  // desde que vuelve a indexarse, cuenta.
  //
  // Se sustituye por un WebPage que APUNTA a la entidad que ya existe. No se
  // pierde señal local: el nodo #organization ya lleva dirección, geo, horario,
  // áreas atendidas y la valoración de la ficha.
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/${locale}/agencia-marketing-digital-lima#webpage`,
    "url": `${BASE_URL}/${locale}/agencia-marketing-digital-lima`,
    "name": isEn ? "Digital Marketing Agency for U.S. Brands — 3R Core" : "Agencia de Marketing Digital en Lima — 3R Core",
    "inLanguage": isEn ? "en" : "es",
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": { "@id": `${BASE_URL}/#organization` },
    "primaryImageOfPage": `${BASE_URL}/og/default.jpg`,
    "speakable": buildSpeakableSchema(['h1', 'h2', '.local-intro']),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, itemList, breadcrumbSchema]) }}
      />
      {children}
    </>
  )
}
