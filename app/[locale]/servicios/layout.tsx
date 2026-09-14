import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export const revalidate = 3600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/servicios',
    titleEs: 'Servicios de Marketing Digital en Lima | 3R Core',
    titleEn: 'Digital Marketing Services for U.S. Brands | 3R Core',
    descriptionEs: 'Branding, redes sociales, Google Ads, SEO y desarrollo web en Lima. Precio de cada servicio publicado, reportes mensuales y resultados medibles.',
    descriptionEn: 'UGC video, influencer campaigns, PR, Google Ads, Meta Ads, SEO, branding and web development for U.S. businesses, by an in-house team with pricing in USD.',
    titleUs: 'Servicios de Marketing Digital en Español | 3R Core',
    descriptionUs: 'Contenido UGC, influencers, relaciones públicas, Google Ads, Meta Ads, SEO, branding y web para negocios en EE.UU. Precios en dólares, sin permanencia.',
  })
}

// Este layout ya NO inyecta JSON-LD: el CollectionPage + ItemList +
// BreadcrumbList del índice se heredaba en todas las páginas hijas
// /servicios/* (schema de otra URL + breadcrumb duplicado). Ese bloque vive
// ahora en lib/servicios-index-schema.ts y solo lo renderiza el índice
// (servicios/page.tsx).
export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
