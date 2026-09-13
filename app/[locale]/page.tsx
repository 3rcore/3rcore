import { getTranslations, setRequestLocale } from "next-intl/server"
import HomeClientV2 from "./HomeClientV2"
import HomeSeoSection from "@/components/sections/home/HomeSeoSection"
import SsrReviews from "@/components/seo/SsrReviews"
import { buildServiceItemList, buildSpeakableWebPage } from "@/lib/seoSchemas"

export default async function HomePage({ params }: { params: any }) {
  const { locale } = await params
  // Renderizado estático: sin esto next-intl marca la ruta como dinámica y
  // Vercel devuelve `no-store` en cada visita.
  setRequestLocale(locale);

  const tH1 = await getTranslations({ locale, namespace: "HiddenH1" })

  // 13-sep-2026. Planes de reposicionamiento de 3R Core (Piero Roque): el home
  // de /es enseña cuatro servicios (Google Ads, Posicionamiento SEO, Desarrollo
  // web, Social Media) y el de /en tres (SEO, Web Development, Online Stores).
  // El ItemList declara exactamente lo que la página enseña. /us sin cambios.
  const items = locale === 'en'
    ? [
        { name: "SEO", path: "/posicionamiento-seo", description: "Organic Google rankings and authority building." },
        { name: "Web Development", path: "/servicios/web-development", description: "Corporate websites, landing pages and custom sites." },
        { name: "Online Stores", path: "/tiendas-virtuales-lima", description: "Shopify or WooCommerce stores ready to sell across the U.S." },
      ]
    : locale === 'es'
      ? [
          { name: "Google Ads", path: "/servicios/google-ads", description: "Campañas SEM con ROI medible." },
          { name: "Posicionamiento SEO", path: "/posicionamiento-seo", description: "Ranking orgánico en Google y construcción de autoridad." },
          { name: "Desarrollo Web", path: "/servicios/web-development", description: "Webs corporativas y landing pages con SEO técnico." },
          { name: "Social Media", path: "/servicios/socialmedia", description: "Estrategia, contenido y community management." },
        ]
      : [
          { name: "Diseño y Desarrollo Web", path: "/servicios/web-development", description: "Sitios web a medida, landing pages y e-commerce." },
          { name: "Manejo de Redes Sociales", path: "/servicios/socialmedia", description: "Estrategia, contenido y community management." },
          { name: "Branding Corporativo", path: "/servicios/branding", description: "Identidad visual, logotipo y manual de marca." },
          { name: "Google Ads", path: "/servicios/google-ads", description: "Campañas SEM con ROI medible." },
          { name: "Posicionamiento SEO", path: "/posicionamiento-seo", description: "Ranking orgánico en Google y construcción de autoridad." },
        ]

  const itemListSchema = buildServiceItemList({ locale, items })

  const speakableSchema = buildSpeakableWebPage({
    locale,
    path: "",
    nameEs: locale === 'us'
      ? "3R Core — Agencia de Marketing Digital en Lima"
      : "3R Core — Agencia de SEO, SEM y Google Ads",
    nameEn: "3R Core — SEO, Web Development & Online Stores Agency",
    cssSelector: ["h1", "h2"],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([itemListSchema, speakableSchema]) }}
      />
      {/* El cliente descartó la home del prototipo: los tres idiomas sirven el
          rediseño de Aymar (HomeClientV2). /en lo usa desde el 13-sep-2026 por
          el plan USA de 3R Core («la misma home que la versión en español, con
          el mismo hero en video»); el grid baja a los servicios de cada
          mercado. Todas comparten el h1 sr-only y el bloque semántico SSR. */}
      <h1 className="sr-only">{tH1("home")}</h1>
      <HomeClientV2 />
      {/* Contenido semántico del home renderizado en el servidor (SSR real):
          pilares + señales de mercado para Googlebot y bots de IA que no
          ejecutan JS. HomeClientV2 (arriba) es 'use client' y se hidrata en el
          navegador. */}
      <HomeSeoSection locale={locale} />
      {/* Reputación en el HTML inicial: el carrusel de reseñas es cliente y los
          bots de IA no ejecutan JS. Mismas reseñas que el JSON-LD. */}
      <SsrReviews locale={locale} />
    </>
  )
}
