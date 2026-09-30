/**
 * Fábrica de rutas para las landings de Perú: cada carpeta de app/[locale]
 * solo declara su contenido (content.ts) y exporta lo que devuelve esto.
 * /es sirve la página; /en y /us dan 404 (la página no existe allí).
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import ProtoHtml from '@/components/proto/ProtoHtml'
import { landingJsonLd, landingMetadata, type LandingPeru } from '@/lib/landings-peru'

type Params = { params: Promise<{ locale: string }> }

export function landingRoute(p: LandingPeru) {
  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { locale } = await params
    setRequestLocale(locale)
    return landingMetadata(p, locale)
  }

  async function Page({ params }: Params) {
    const { locale } = await params
    setRequestLocale(locale)
    if (locale !== 'es') notFound()
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(p)) }}
        />
        <ProtoHtml html={p.html} />
      </>
    )
  }

  return { generateMetadata, Page }
}
