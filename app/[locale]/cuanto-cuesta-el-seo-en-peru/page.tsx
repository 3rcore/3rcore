import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BASE_URL } from "@/lib/metadata"
import ProtoPage from "@/components/proto/ProtoPage"
import { setRequestLocale } from "next-intl/server"

/**
 * 28-sep-2026. «cuánto cuesta seo perú» y «precio seo perú»: ninguno de los 9
 * primeros de Google Perú era una página de precios de SEO, y 3rcore salía 2.º
 * con /es/tiendas-virtuales-lima, que no trata el tema. Esta página responde
 * con los precios que 3R Core YA publica (/es/precios y /es/posicionamiento-seo),
 * todos marcados como referenciales. No cita tarifas de otras agencias.
 *
 * Reparto con el blog para no canibalizar: el artículo
 * /es/blogs/cuanto-cuesta-agencia-seo-lima-2026 explica los rangos del mercado
 * en Lima; esta página, el precio de 3R Core y qué lo mueve.
 *
 * Solo /es (como /casos-de-exito). Contenido, FAQ y schema en
 * proto-html/cuanto-cuesta-el-seo-en-peru.html; el formulario lo conecta
 * ProtoLeadWiring al panel propio.
 */
const PATH = '/cuanto-cuesta-el-seo-en-peru'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale);
  if (locale !== 'es') return { robots: { index: false, follow: false } }

  const title = '¿Cuánto cuesta el SEO en Perú? Precios 2026 | 3R Core'
  const description =
    'El SEO en 3R Core parte de S/1,800 al mes + IGV, sin permanencia ni instalación. Qué incluye, qué sube el precio y agencia vs freelance. Montos referenciales.'
  const url = `${BASE_URL}/es${PATH}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName: '3R Core', locale: 'es_PE', type: 'website',
      images: [{ url: `${BASE_URL}/og/posicionamiento-seo.jpg`, width: 1200, height: 630, alt: 'Cuánto cuesta el SEO en Perú - 3R Core' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${BASE_URL}/og/posicionamiento-seo.jpg`] },
  }
}

export default async function CuantoCuestaSeoPeruPage({ params }: { params: any }) {
  const { locale } = await params
  setRequestLocale(locale);
  if (locale !== 'es') notFound()
  return <ProtoPage frag="cuanto-cuesta-el-seo-en-peru" />
}
