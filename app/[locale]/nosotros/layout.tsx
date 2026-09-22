import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, localizedUrl, BASE_URL } from "@/lib/metadata"
import { buildPersonSchemas, buildSpeakableSchema } from "@/lib/seoSchemas"
import { getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { pickMessages } from "@/lib/pickMessages"

export const revalidate = 3600

// 13-sep-2026. Planes de reposicionamiento de 3R Core (Piero Roque):
//  - /es: «Nosotros» deja de apoyarse en lo local (La Molina, Lima, facturación
//    peruana) y habla de equipo propio y resultados en SEO, SEM y Google Ads.
//  - /en: agencia de SEO, desarrollo web y tiendas online para todo EE. UU.,
//    sin ninguna referencia a Perú.
//  - /us se queda como estaba.
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    path: '/nosotros',
    titleEs: 'Nosotros — Agencia de SEO, SEM y Google Ads | 3R Core',
    titleEn: 'About Us — SEO, Web Development & Online Stores Agency | 3R Core',
    descriptionEs: 'Los hermanos Roque y su equipo propio de diseño, programación y posicionamiento: SEO, SEM y Google Ads con resultados medibles. 4,7★ en 42 reseñas de Google.',
    descriptionEn: '3R Core is a family-run SEO, web development and online stores agency serving businesses across the U.S., on U.S. business hours and billing in USD through its U.S. subsidiary.',
    titleUs: 'Nosotros — Equipo en Lima para EE.UU. | 3R Core',
    descriptionUs: 'Agencia familiar con equipo propio en Lima que atiende a negocios de EE.UU. en horario compatible y factura en dólares a través de su filial.',
  })
}

export default async function NosotrosLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  const isEn = locale === 'en'
  const isUs = locale === 'us'

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${localizedUrl('/nosotros', locale)}#aboutpage`,
    "url": localizedUrl('/nosotros', locale),
    "name": isEn ? "About 3R Core" : "Sobre 3R Core",
    "description": isEn
      ? "3R Core is a family-owned SEO, web development and online stores agency serving businesses across the United States, combining Experience, Vision and Technology."
      : isUs
        ? "3R Core es una agencia familiar de marketing digital en Lima, Perú que combina Experiencia, Visión y Tecnología en branding, social media, SEO, Google Ads y desarrollo web."
        : "3R Core es una agencia familiar de SEO, SEM y Google Ads con equipo propio que combina Experiencia, Visión y Tecnología en Google Ads, posicionamiento SEO, desarrollo web y social media.",
    "mainEntity": { "@id": `${BASE_URL}/#organization` },
    "inLanguage": isEn ? 'en' : 'es',
    "speakable": buildSpeakableSchema(['h1', 'h2', '.hidden-h1', '.about-intro']),
  }

  const personSchemas = buildPersonSchemas(locale, [
    {
      name: 'Alejandro Roque',
      role: isEn ? 'CEO at 3R Core' : 'CEO de 3R Core',
      image: '/images/Fundadores/AlejandroAlta1.webp',
    },
    // 16-sep-2026. Fuera Bruno Roque: el cliente lo quitó de la sección de
    // fundadores (components/sections/Nosotros/Founders.tsx, commit fa207dd) y
    // el JSON-LD debe describir lo que la página enseña.
    {
      name: 'Piero Roque',
      role: isEn ? 'SEO & Google Ads Analyst at 3R Core' : 'Analista de SEO y Google Ads en 3R Core',
      image: '/images/Fundadores/PieroAlta.webp',
    },
  ])

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Inicio', path: '' },
      { name: isEn ? 'About Us' : 'Nosotros', path: '/nosotros' },
    ],
    locale
  )

  // Solo se pinta en /en y /us: en /es el hero de la v2 trae su propio h1.
  const hiddenH1 = isEn
    ? 'SEO, web development and online stores agency serving businesses across the U.S. — the Roque family team'
    : 'Agencia de marketing digital en Lima, Perú — equipo familiar Roque: branding, SEO, Google Ads, redes sociales y desarrollo web'

  // Recorte del payload de hidratación (ver lib/pickMessages.ts): /nosotros
  // solo necesita los namespaces que consume Original.tsx (en/us), no el
  // diccionario completo del locale. /es usa OriginalV2 (otro árbol) y queda
  // fuera del recorte para no arriesgar nada de ese mercado.
  const aboutMessages = pickMessages(await getMessages(), [
    "AboutSection", "ContactSection", "FoundersSection", "MomentsSection", "OurTeamSection", "preload",
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([aboutSchema, breadcrumbSchema, ...personSchemas]) }}
      />
      {/* En /es la página del prototipo trae su propio h1 visible; duplicarlo
          con el sr-only dejaría dos h1 en la misma página. */}
      {locale !== 'es' && <h1 className="sr-only">{hiddenH1}</h1>}
      {locale === 'es' ? (
        children
      ) : (
        <NextIntlClientProvider locale={locale} messages={aboutMessages}>
          {children}
        </NextIntlClientProvider>
      )}
    </>
  )
}
