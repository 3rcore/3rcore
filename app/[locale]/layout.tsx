import { poppins } from "@/lib/fonts"
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CookieBanner from "@/components/layout/CookieBanners";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages, setRequestLocale } from "next-intl/server";
import ParticlesBackground from "@/components/ui/AnimatedBackground";
import WhatsAppBtn from "@/components/ui/WhatsAppBtn";
import { TEL_MAIN } from "@/lib/contact";
import { localizedUrl } from "@/lib/metadata";
import ReactLenis from "lenis/react";
import Script from "next/script";
import { getReviews, buildRatingNodes, reviewsForLocale } from "@/lib/reviews"
import { POSTAL_ADDRESS } from "@/lib/nap"


const lenisOptions = {
  lerp: 0.1,
  duration: 1.5,
  smoothWheel: true,
  wheelMultiplier: 0.5,
  touchMultiplier: 2,
  infinite: false,
}

const BASE_URL = 'https://3rcore.com'

// Un solo sitio, tres audiencias distintas:
//   /es → Perú (es-PE): soles, RUC, Yape/Plin.
//   /en → marcas de EE.UU. que compran producción nearshore en inglés.
//   /us → negocio hispano en EE.UU. (es-US): español, USD, sin referencias peruanas.
// El bloque hreflang es idéntico en las tres para que Google resuelva el cluster.
export const HREFLANG = (path = '') => ({
  'es': `${BASE_URL}/es${path}`,
  'es-PE': `${BASE_URL}/es${path}`,
  'es-US': `${BASE_URL}/us${path}`,
  'en': `${BASE_URL}/en${path}`,
  'en-US': `${BASE_URL}/en${path}`,
  // x-default pasa de /es a /en: el visitante sin idioma resuelto es, por
  // volumen, internacional (USA = 400 sesiones/89 d sin trabajar el mercado).
  'x-default': `${BASE_URL}/en${path}`,
})

// Prerrenderiza los tres idiomas en el build (antes cada visita se calculaba
// en caliente porque `[locale]` no tenía params estáticos).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params;

  // Renderizado estático: sin esto next-intl marca la ruta como dinámica y
  // Vercel devuelve `no-store` en cada visita.
  setRequestLocale(locale);

  // 13-sep-2026. Planes de reposicionamiento de 3R Core (Piero Roque):
  //  - /es: de «Agencia de Marketing Digital en Lima, Perú» a «Agencia de SEO,
  //    SEM y Google Ads». Sin montos: el precio se conversa en la reunión.
  //  - /en: «SEO, Web Development & Online Stores Agency», para todo EE. UU. y
  //    sin ninguna referencia a Perú, Lima ni facturación peruana.
  //  - /us se queda como estaba.
  const title = locale === 'en'
    ? "SEO, Web Development & Online Stores Agency | 3R Core"
    : locale === 'us'
      ? "Marketing Digital en Español para EE.UU. | 3R Core"
      : "Agencia de SEO, SEM y Google Ads | 3R Core"

  const description = locale === 'en'
    ? "SEO, web development and online stores for businesses across the U.S. In-house team, U.S. business hours and fixed scopes in USD. 4.7 stars from 42 reviews."
    : locale === 'us'
      ? "Marketing en español para negocios hispanos en EE.UU.: video UGC, Google Ads, Meta Ads, SEO y tiendas online. Precios en dólares y reportes cada mes."
      : "Agencia de SEO, SEM y Google Ads con equipo propio de diseño, programación y posicionamiento. Resultados medibles y reportes cada mes. 4,7★ en 42 reseñas."

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: HREFLANG(),
    },
    openGraph: {
      title: locale === 'en'
        ? "3R Core | SEO, Web Development & Online Stores Agency"
        : locale === 'us'
          ? "3R Core | Marketing Digital en Español para EE.UU."
          : "3R Core | Agencia de SEO, SEM y Google Ads",
      description: locale === 'en'
        ? "SEO, web development and online stores for businesses across the U.S., with contracts and invoicing through our U.S. subsidiary. U.S. hours, fixed scopes in USD."
        : locale === 'us'
          ? "Marketing digital en español para negocios hispanos en Estados Unidos: video UGC, Google Ads, Meta Ads, SEO y tiendas online. Precios en dólares."
          : "Agencia de SEO, SEM y Google Ads con equipo propio: posicionamiento en Google, campañas de Google Ads, desarrollo web y social media con resultados medibles.",
      url: `${BASE_URL}/${locale}`,
      siteName: "3R Core",
      locale: locale === 'en' ? 'en_US' : locale === 'us' ? 'es_US' : 'es_PE',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og/default.jpg`,
          width: 1200,
          height: 630,
          alt: locale === 'en'
            ? '3R Core - SEO, Web Development & Online Stores'
            : locale === 'us'
              ? '3R Core - Agencia de Marketing Digital'
              : '3R Core - Agencia de SEO, SEM y Google Ads',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'en'
        ? "3R Core - SEO, Web Development & Online Stores"
        : locale === 'us'
          ? "3R Core - Agencia de Marketing Digital"
          : "3R Core - Agencia de SEO, SEM y Google Ads",
      description: locale === 'en'
        ? "SEO, web development and online stores for businesses across the U.S. — in-house team, U.S. subsidiary, fixed scopes in USD."
        : locale === 'us'
          ? "Combinamos Experiencia, Visión y Tecnología en estrategias de marketing digital."
          : "Agencia de SEO, SEM y Google Ads con equipo propio y resultados medibles.",
      images: [`${BASE_URL}/og/default.jpg`],
    },
    metadataBase: new URL(BASE_URL),
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Renderizado estático: sin esto next-intl marca TODO el subárbol como
  // dinámico y Vercel devuelve `no-store` en cada visita, que es exactamente lo
  // que se midió el 25-ago (x-vercel-cache: MISS siempre).
  setRequestLocale(locale);

  const messages = await getMessages();

  // 4,7★ con 42 reseñas reales de la ficha de Google que hasta ahora ningún
  // marcado declaraba (0 de 27 páginas). Se leen en el servidor con caché de
  // 24 h; si la API falla se usa el último snapshot verificado.
  const reviewsData = await getReviews();
  const ratingNodes = buildRatingNodes(reviewsForLocale(reviewsData, locale));

  const organizationSchema = {
    "@context": "https://schema.org",
    // "MarketingAgency" NO existe en schema.org: el vocabulario oficial no lo
    // define y https://schema.org/MarketingAgency devuelve 404. Un @type
    // inventado no aporta y ensucia el grafo. El rubro se expresa con
    // additionalType, que sí es válido.
    // 13-sep-2026. Plan USA de 3R Core (Piero Roque): el /en no menciona Perú,
    // Lima ni facturación peruana. En /en el nodo va como Organization y sin los
    // datos de la sede física (dirección, coordenadas, RUC, horario de oficina,
    // ficha de Maps y zona de servicio en Lima), atendiendo a Estados Unidos.
    // /es y /us conservan el LocalBusiness completo.
    "@type": locale === 'en' ? "Organization" : ["ProfessionalService", "LocalBusiness"],
    "additionalType": "https://www.wikidata.org/wiki/Q679520",
    "@id": `${BASE_URL}/#organization`,
    "name": "3R Core - Agencia de Marketing Digital",
    "alternateName": ["3R Core Marketing Agency", "3R Core Agencia de Marketing", "3RCore"],
    "legalName": "3R Core Agencia de Marketing",
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/icons/LogoFull.webp`,
      "width": 600,
      "height": 300
    },
    "image": [
      `${BASE_URL}/icons/LogoFull.webp`,
      `${BASE_URL}/og/default.jpg`,
      `${BASE_URL}/og/branding.jpg`,
      `${BASE_URL}/og/web-development.jpg`,
      `${BASE_URL}/og/socialmedia.jpg`,
      `${BASE_URL}/og/google-ads.jpg`
    ],
    // 13-sep-2026. /es pasa a «agencia de SEO, SEM y Google Ads» (plan Perú).
    "description": locale === 'en'
      ? "SEO, web development and online stores agency serving businesses across the United States, with an in-house design, development and SEO team."
      : locale === 'us'
        ? "Agencia de marketing digital en Lima, Perú. Combinamos Experiencia, Visión y Tecnología en estrategias: Branding, Social Media, SEO, Google Ads y Desarrollo Web."
        : "Agencia de SEO, SEM y Google Ads en Lima, Perú, con equipo propio de diseño, programación y posicionamiento: Google Ads, posicionamiento SEO, desarrollo web y social media.",
    "telephone": TEL_MAIN,
    "email": "info@3rcore.com",
    ...(locale === 'en' ? {} : {
      // Una sola fuente para el NAP (ver lib/nap.ts): la web llegó a publicar dos
      // direcciones distintas y eso rompe la coherencia que Google necesita.
      "address": POSTAL_ADDRESS,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -12.0913,
        "longitude": -76.9494
      },
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "RUC",
        "name": "RUC",
        "value": "20609008217"
      },
      "taxID": "20609008217",
      "vatID": "20609008217",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      // 12-sep-2026. La ficha de Google (CID 15241385315569891224) es la entidad que
      // Google usa en el mapa; enlazarla aquí le confirma que web y ficha son la misma empresa.
      "hasMap": "https://maps.google.com/?cid=15241385315569891224",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": -12.0913,
          "longitude": -76.9494
        },
        "geoRadius": 50000
      },
      "priceRange": "$$",
      // 29-ago-2026. Las 17 páginas de /us servían el nodo de Perú tal cual:
      // declaraban Yape, Plin, BCP e Interbank a un comprador estadounidense, y
      // más abajo el SEO en soles. /en sí estaba localizado; /us se quedó a medias.
      "currenciesAccepted": locale === 'es' ? "PEN, USD" : "USD",
      "paymentAccepted": locale === 'es'
        ? "Cash, Credit Card, Debit Card, Bank Transfer, Yape, Plin, BCP, Interbank, BBVA, Scotiabank"
        : "Credit Card, Debit Card, Bank Transfer, ACH, Wire Transfer",
    }),
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": TEL_MAIN,
        "email": "info@3rcore.com",
        "availableLanguage": ["Spanish", "English"],
        "areaServed": locale === 'en' ? ["US"] : ["PE", "US"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": TEL_MAIN,
        "email": "info@3rcore.com",
        "availableLanguage": ["Spanish", "English"],
        "areaServed": locale === 'en' ? ["US"] : ["PE", "US"]
      }
    ],
    "sameAs": [
      ...(locale === 'en' ? [] : ["https://maps.google.com/?cid=15241385315569891224"]),
      "https://www.facebook.com/3Rcore/",
      "https://www.instagram.com/3rcore_/",
      "https://www.linkedin.com/company/3r-core/",
      "https://www.tiktok.com/@3rcore",
      ...(locale === 'en' ? [] : ["https://pe.linkedin.com/company/3r-core"]),
    ],
    "areaServed": locale === 'en'
      ? [{ "@type": "Country", "name": "United States" }]
      : [
          { "@type": "Country", "name": "Peru" },
          { "@type": "Country", "name": "United States" },
          { "@type": "City", "name": "Lima" },
          { "@type": "AdministrativeArea", "name": "Lima Metropolitana" }
        ],
    // Valoración y reseñas del perfil de empresa de Google, las mismas que
    // ReviewsSection pinta en la página (nunca datos inventados y nunca una
    // reseña que la web no muestre).
    "aggregateRating": ratingNodes.aggregateRating,
    "review": ratingNodes.review,
    "slogan": locale === 'en'
      ? "Experience, Vision & Technology"
      : "Experiencia, Visión y Tecnología",
    "knowsAbout": [
      "Branding",
      "Corporate Branding",
      "Brand Identity Design",
      "Logo Design",
      "Visual Identity",
      "Social Media Marketing",
      "Social Media Management",
      "Community Management",
      "Content Marketing",
      "Content Strategy",
      "Editorial Calendar",
      "Search Engine Optimization",
      "Local SEO",
      "Technical SEO",
      "Link Building",
      "Google Ads",
      "Search Engine Marketing",
      "Performance Marketing",
      "Pay-per-click Advertising",
      "Meta Ads",
      "Facebook Ads",
      "Instagram Ads",
      "TikTok Ads",
      "TikTok Advertising",
      "Email Marketing",
      "Email Marketing Automation",
      "Healthcare Marketing",
      "Marketing for Clinics",
      "Dental Marketing",
      "Real Estate Marketing",
      "Marketing for Real Estate",
      "E-commerce Marketing",
      "Web Development",
      "Web Design",
      "UX/UI Design",
      "E-commerce",
      "Shopify",
      "WooCommerce",
      "Next.js Development",
      "WordPress Development",
      "Landing Page Design",
      "Conversion Rate Optimization",
      "Marketing Automation",
      "Digital Marketing",
      "Inbound Marketing",
      "Brand Strategy",
      "Startup Marketing",
      "Tech Innovation"
    ],
    "founder": [
      {
        "@type": "Person",
        "name": "Alejandro Roque",
        "jobTitle": locale === 'en' ? "CEO" : "CEO / Director General",
        "worksFor": { "@id": `${BASE_URL}/#organization` }
      },
      {
        "@type": "Person",
        "name": "Piero Roque",
        "jobTitle": locale === 'en' ? "SEO / Ads Director" : "Director SEO / Ads",
        "worksFor": { "@id": `${BASE_URL}/#organization` }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'en' ? "Digital Marketing Services" : "Servicios de Marketing Digital",
      "itemListElement": ([
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Corporate Branding" : "Branding Corporativo",
            "url": localizedUrl('/servicios/branding', locale),
            "serviceType": "Branding / Visual Identity"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Social Media Management" : "Gestión de Redes Sociales",
            "url": localizedUrl('/servicios/socialmedia', locale),
            "serviceType": "Social Media Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Google Ads / SEM" : "Google Ads / SEM",
            "url": localizedUrl('/servicios/google-ads', locale),
            "serviceType": "Google Ads / SEM"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Web Development & E-commerce" : "Desarrollo Web y E-commerce",
            "url": localizedUrl('/servicios/web-development', locale),
            "serviceType": "Web Development / E-commerce"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "SEO Positioning" : "Posicionamiento SEO",
            "url": localizedUrl('/posicionamiento-seo', locale),
            "serviceType": "SEO / Search Engine Optimization"
          },
          // 13-sep-2026. /es y /en ya no publican montos en el home (planes de
          // Piero Roque): el precio solo se declara en /us, que sí lo enseña.
          ...(locale === 'us' ? {
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": 500,
              "priceCurrency": "USD",
              "valueAddedTaxIncluded": false
            }
          } : {})
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Meta Ads (Facebook & Instagram)" : "Meta Ads (Facebook e Instagram)",
            "url": localizedUrl('/servicios/meta-ads', locale),
            "serviceType": "Meta Ads / Facebook & Instagram Advertising"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "TikTok Ads",
            "url": localizedUrl('/servicios/tiktok-ads', locale),
            "serviceType": "TikTok Advertising"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Marketing",
            "url": localizedUrl('/servicios/performance-marketing', locale),
            "serviceType": "Performance Marketing / ROI-ROAS"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Email Marketing",
            "url": localizedUrl('/servicios/email-marketing', locale),
            "serviceType": "Email Marketing / Automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Marketing for Clinics" : "Marketing para Clínicas",
            "url": localizedUrl('/servicios/marketing-clinicas', locale),
            "serviceType": "Healthcare Marketing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Marketing for Real Estate" : "Marketing para Inmobiliarias",
            "url": localizedUrl('/servicios/marketing-inmobiliarias', locale),
            "serviceType": "Real Estate Marketing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Marketing for E-commerce" : "Marketing para E-commerce",
            "url": localizedUrl('/servicios/marketing-ecommerce', locale),
            "serviceType": "E-commerce Marketing"
          }
        }
      ])
        // 29-ago-2026. El catálogo anunciaba los DOCE servicios en los tres
        // mercados. En /en y /us diez de ellos van con `noindex` porque en
        // Estados Unidos solo se venden tres: web, SEO y tiendas online. El
        // schema estaba ofreciendo a Google un catálogo que la propia web pide
        // no indexar, y repartiendo la señal entre doce destinos en vez de tres.
        .filter((o: any) => {
          if (locale === 'es') return true
          const url: string = o?.itemOffered?.url ?? ''
          return (
            url.includes('/servicios/web-development') ||
            url.includes('/servicios/desarrollo-web') ||
            url.includes('/services/web-development') ||
            url.includes('/posicionamiento-seo') ||
            url.includes('/seo-agency') ||
            url.includes('/tiendas-virtuales-lima') ||
            url.includes('/tiendas-online') ||
            url.includes('/ecommerce-development')
          )
        })
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "name": "3R Core",
    "alternateName": "3R Core - Agencia de Marketing Digital",
    "url": BASE_URL,
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "inLanguage": ["es", "en"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/${locale}/blogs?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  // 28-ago-2026. El SiteNavigationElement declaraba los NUEVE servicios en los
  // tres mercados. En /en y /us seis de ellos van con `noindex` porque en EE.UU.
  // solo se venden tres (web, SEO y tiendas online): el schema estaba
  // anunciando a Google un catálogo que la propia web pide no indexar, y
  // repartiendo la señal de navegación entre nueve destinos en vez de tres.
  // Es el mismo fallo que se corrigió en los enlaces HTML, un nivel más abajo.
  // 13-sep-2026. Planes de reposicionamiento de 3R Core (Piero Roque): el
  // schema sigue al menú. /en ordena SEO, Web Development y Online Stores y
  // quita la página «Peruvian Agency for U.S. Brands»; /es lleva Google Ads y
  // Posicionamiento SEO al frente y deja en Servicios solo Desarrollo web,
  // Social Media y Branding.
  const navItems = locale === 'en'
    ? [
        { name: "Home", url: `${BASE_URL}/en` },
        { name: "About Us", url: localizedUrl('/nosotros', 'en') },
        { name: "Services", url: localizedUrl('/servicios', 'en') },
        { name: "SEO", url: localizedUrl('/posicionamiento-seo', 'en') },
        { name: "Web Development", url: localizedUrl('/servicios/web-development', 'en') },
        { name: "Online Stores", url: localizedUrl('/tiendas-virtuales-lima', 'en') },
        { name: "Spanish SEO Services", url: `${BASE_URL}/en/spanish-seo-services` },
        { name: "Hispanic Marketing Agency", url: `${BASE_URL}/en/hispanic-marketing-agency` },
        { name: "Pricing", url: localizedUrl('/precios', 'en') },
        { name: "Blog", url: `${BASE_URL}/en/blogs` },
        { name: "FAQ", url: localizedUrl('/preguntas', 'en') },
      ]
    : locale === 'us'
    ? [
        { name: "Inicio", url: `${BASE_URL}/us` },
        { name: "Nosotros", url: localizedUrl('/nosotros', 'us') },
        { name: "Servicios", url: localizedUrl('/servicios', 'us') },
        { name: "Diseño y Desarrollo Web", url: localizedUrl('/servicios/web-development', 'us') },
        { name: "Posicionamiento SEO en Español", url: localizedUrl('/posicionamiento-seo', 'us') },
        { name: "Tiendas Online", url: localizedUrl('/tiendas-virtuales-lima', 'us') },
        { name: "Marketing para Negocios Hispanos", url: `${BASE_URL}/us/marketing-para-negocios-hispanos` },
        { name: "Precios", url: localizedUrl('/precios', 'us') },
        { name: "Blog", url: `${BASE_URL}/us/blogs` },
        { name: "Preguntas Frecuentes", url: localizedUrl('/preguntas', 'us') },
      ]
    : [
        { name: "Inicio", url: `${BASE_URL}/es` },
        { name: "Nosotros", url: localizedUrl('/nosotros', 'es') },
        { name: "Google Ads", url: localizedUrl('/servicios/google-ads', 'es') },
        { name: "Posicionamiento SEO", url: localizedUrl('/posicionamiento-seo', 'es') },
        { name: "Servicios", url: localizedUrl('/servicios', 'es') },
        { name: "Desarrollo Web", url: localizedUrl('/servicios/web-development', 'es') },
        { name: "Social Media", url: localizedUrl('/servicios/socialmedia', 'es') },
        { name: "Branding", url: localizedUrl('/servicios/branding', 'es') },
        { name: "Blog", url: `${BASE_URL}/es/blogs` },
        { name: "Preguntas Frecuentes", url: localizedUrl('/preguntas', 'es') },
      ]

  const siteNavigationSchema = navItems.map((item) => ({
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": item.name,
    "url": item.url,
  }))

  return (
    <html lang={locale === 'us' ? 'es-US' : locale === 'es' ? 'es-PE' : 'en-US'}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema, ...siteNavigationSchema]) }}
        />
      </head>
      <ReactLenis root options={lenisOptions}>
        <body className={`${poppins.className} text-white`} suppressHydrationWarning={true}>
          <div className="noise-overlay" />
          <ParticlesBackground />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main className="flex flex-col relative z-10">
              <div className="noise-global" />
              {children}
            </main>
            <Footer />
            <CookieBanner />
            {/* Botón flotante de WhatsApp GLOBAL (con medición whatsapp_click).
                Se monta una sola vez aquí para cubrir TODAS las páginas —
                incluidos los 135 blogs y /tiendas-virtuales-lima, donde vive el
                tráfico orgánico y antes no había ninguna vía de contacto. */}
            <WhatsAppBtn />
          </NextIntlClientProvider>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-54VJ6F97"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-54VJ6F97');`
            }}
          />
          <Script
            id="ga4-loader"
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-SQBPMGH3BM"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SQBPMGH3BM');`
            }}
          />
        </body>
      </ReactLenis>
    </html>
  );
}
