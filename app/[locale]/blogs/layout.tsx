import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

export const revalidate = 600

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/blogs',
    titleEs: 'Blog de Marketing Digital en Perú | 3R Core',
    titleEn: 'Marketing Blog — UGC, Ads, SEO & PR | 3R Core',
    descriptionEs: 'Guías con los precios del mercado peruano: cuánto cuesta una página web, una tienda online, el branding, Google Ads o una campaña en redes.',
    descriptionEn: 'Guides for U.S. brands: what UGC costs, usage rights, working with a remote team, creative testing, Hispanic marketing, paid media and SEO.',
    titleUs: 'Blog de Marketing Digital en Español | 3R Core',
    descriptionUs: 'Artículos y guías sobre marketing digital en español: contenido UGC, influencer marketing, relaciones públicas, posicionamiento SEO, campañas de Google Ads y tiendas online.',
  })
}

// Este layout ya NO inyecta JSON-LD: el bloque Blog + BreadcrumbList que vivía
// aquí se heredaba en las ~139 URLs de post (cada artículo cargaba el schema
// del índice completo + un segundo BreadcrumbList) y en el índice colisionaba
// con el Blog propio de page.tsx (mismo @id con datos distintos). El schema del
// índice vive en blogs/page.tsx y el de cada post en blogs/[slug]/page.tsx.
// El H1 lo aporta cada página hija (un solo H1 por URL).
export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
