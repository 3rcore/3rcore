import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '3rcore.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '3rcore-server.com.pe',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '**',
      }
    ],
  },
  async rewrites() {
    // Internal operations panel — proxied to its standalone Vercel deployment.
    // The panel app is built with basePath "/panel", so every asset/API lives
    // under /panel/* on the upstream and maps 1:1 here. Excluded from the i18n
    // middleware via the matcher in proxy.ts so it is never locale-prefixed.
    // Repointed 2026-06-25 to the hardened panel deployment (demo creds removed,
    // password hashing + brute-force lockout + security headers + Supabase env).
    const PANEL = 'https://3rcore-work.vercel.app';
    return [
      { source: '/panel', destination: `${PANEL}/panel` },
      { source: '/panel/:path*', destination: `${PANEL}/panel/:path*` },
    ];
  },
  async redirects() {
    return [
      // ── LA RAÍZ DEVOLVÍA 307 TEMPORAL (2026-08-29) ────────────────────────
      // Medido en vivo: `curl -I https://3rcore.com/` daba HTTP 307 hacia /es.
      // Un 307 es TEMPORAL, y ante un redirect temporal Google conserva en su
      // índice la URL de ORIGEN, no el destino. Por eso «/» figuraba en Search
      // Console con impresiones y posición propias, compitiendo contra /es por
      // «agencia de marketing», «agencia de publicidad» y «agencia seo en lima».
      //
      // Peor: el 307 lo emitía el middleware negociando por Accept-Language, así
      // que Googlebot con `Accept-Language: en-US` aterrizaba en /en. El mercado
      // de EE.UU. tiene 45 URLs y el de Perú 173: dejar que el idioma del
      // rastreador decida la home es dejar la puerta abierta a que Google fije
      // la sección pequeña como principal.
      //
      // Con 308 permanente la raíz deja de negociar: mismo destino para todos.
      { source: '/', destination: '/es', permanent: true },

      // ── RUTAS DESNUDAS DE LAS PÁGINAS ANCLA (2026-08-28) ──────────────────
      // Estas tres páginas existen SOLO en un mercado. Sin prefijo de idioma,
      // el middleware las mandaba a /es/…, donde no existen: quien copiaba el
      // enlace sin el /en/ (o lo tecleaba) aterrizaba en un 404. Y son
      // precisamente las URLs que se reparten en propuestas y por WhatsApp.
      { source: '/hispanic-marketing-agency', destination: '/en/hispanic-marketing-agency', permanent: true },
      { source: '/spanish-seo-services', destination: '/en/spanish-seo-services', permanent: true },
      { source: '/nearshore-marketing-agency', destination: '/en/nearshore-marketing-agency', permanent: true },
      { source: '/marketing-para-negocios-hispanos', destination: '/us/marketing-para-negocios-hispanos', permanent: true },
      // Y las de /es que sí existen solo allí, por el mismo motivo.
      { source: '/casos-de-exito', destination: '/es/casos-de-exito', permanent: true },

      // ── SLUGS EN INGLÉS PARA /en (2026-08-12) ─────────────────────────────
      // Las URLs de /en eran las españolas (/en/posicionamiento-seo,
      // /en/tiendas-virtuales-lima…): la URL desmentía al contenido. Ahora
      // next-intl sirve el slug inglés y estas 301 conservan lo acumulado y
      // evitan que la versión vieja quede accesible como duplicado.
      { source: '/en/posicionamiento-seo', destination: '/en/seo-agency', permanent: true },
      { source: '/en/tiendas-virtuales-lima', destination: '/en/ecommerce-development', permanent: true },
      { source: '/en/servicios', destination: '/en/services', permanent: true },
      { source: '/en/servicios/google-ads', destination: '/en/services/google-ads', permanent: true },
      { source: '/en/servicios/web-development', destination: '/en/services/web-development', permanent: true },
      { source: '/en/servicios/socialmedia', destination: '/en/services/social-media', permanent: true },
      { source: '/en/servicios/branding', destination: '/en/services/branding', permanent: true },
      { source: '/en/servicios/ugc', destination: '/en/services/ugc-content', permanent: true },
      { source: '/en/servicios/influencer-marketing', destination: '/en/services/influencer-marketing', permanent: true },
      { source: '/en/servicios/relaciones-publicas', destination: '/en/services/public-relations', permanent: true },
      { source: '/en/servicios/meta-ads', destination: '/en/services/meta-ads', permanent: true },
      { source: '/en/servicios/tiktok-ads', destination: '/en/services/tiktok-ads', permanent: true },
      { source: '/en/servicios/performance-marketing', destination: '/en/services/performance-marketing', permanent: true },
      { source: '/en/servicios/email-marketing', destination: '/en/services/email-marketing', permanent: true },
      { source: '/en/servicios/marketing-clinicas', destination: '/en/services/healthcare-marketing', permanent: true },
      { source: '/en/servicios/marketing-inmobiliarias', destination: '/en/services/real-estate-marketing', permanent: true },
      { source: '/en/servicios/marketing-ecommerce', destination: '/en/services/ecommerce-marketing', permanent: true },
      { source: '/en/nosotros', destination: '/en/about', permanent: true },
      { source: '/en/precios', destination: '/en/pricing', permanent: true },
      { source: '/en/cotizar', destination: '/en/quote', permanent: true },
      { source: '/en/preguntas', destination: '/en/faq', permanent: true },
      { source: '/en/gracias', destination: '/en/thank-you', permanent: true },
      { source: '/en/politicas', destination: '/en/privacy-policy', permanent: true },
      { source: '/en/terminos', destination: '/en/terms', permanent: true },
      // /us usa los mismos slugs que /es salvo estos tres.
      { source: '/us/tiendas-virtuales-lima', destination: '/us/tiendas-online', permanent: true },
      { source: '/us/servicios/web-development', destination: '/us/servicios/desarrollo-web', permanent: true },
      { source: '/us/servicios/socialmedia', destination: '/us/servicios/redes-sociales', permanent: true },
      { source: '/us/servicios/marketing-inmobiliarias', destination: '/us/servicios/marketing-inmobiliario', permanent: true },
      // ── REVERSIÓN a páginas de servicio (2026-07-15) ──────────────────────
      // El equipo comercial vende con las páginas /servicios/* y
      // /posicionamiento-seo (mejor diseñadas: hero, proceso, portafolio,
      // reviews, FAQ). Se restauran como páginas objetivo y las money pages
      // /agencia-*-lima 301 hacia ellas para conservar la autoridad acumulada.
      // Posicionamiento en 3 pilares: SEO (/posicionamiento-seo), SEM
      // (/servicios/google-ads) y Web/Tiendas (/servicios/web-development +
      // /tiendas-virtuales-lima). Reversible: basta quitar la entrada.
      { source: '/:locale(es|en)/agencia-branding-lima', destination: '/:locale/servicios/branding', permanent: true },
      { source: '/agencia-branding-lima', destination: '/es/servicios/branding', permanent: true },
      { source: '/:locale(es|en)/agencia-redes-sociales-lima', destination: '/:locale/servicios/socialmedia', permanent: true },
      { source: '/agencia-redes-sociales-lima', destination: '/es/servicios/socialmedia', permanent: true },
      { source: '/:locale(es|en)/agencia-google-ads-lima', destination: '/:locale/servicios/google-ads', permanent: true },
      { source: '/agencia-google-ads-lima', destination: '/es/servicios/google-ads', permanent: true },
      { source: '/:locale(es|en)/diseno-web-lima', destination: '/:locale/servicios/web-development', permanent: true },
      { source: '/diseno-web-lima', destination: '/es/servicios/web-development', permanent: true },
      { source: '/:locale(es|en)/agencia-seo-lima', destination: '/:locale/posicionamiento-seo', permanent: true },
      { source: '/agencia-seo-lima', destination: '/es/posicionamiento-seo', permanent: true },
      // La 301 de /agencia-marketing-digital-lima → /servicios se retira el
      // 26-ago-2026. Motivo (Search Console, 90 días): «agencia de marketing
      // digital lima» daba 179 impresiones en posición 68,7 y CERO clics, y la
      // página que heredaba esa búsqueda era un índice de 395 palabras que
      // Google no rastreaba desde el 23-jul. Ahora las dos existen con papeles
      // distintos: /servicios es el CATÁLOGO (qué es cada cosa y cuánto cuesta)
      // y /agencia-marketing-digital-lima es la página de AGENCIA EN LIMA (por
      // qué contratarla, cómo trabaja, zonas, sectores y preguntas previas).
      // Volver atrás = devolver estas dos líneas.
      { source: '/agencia-marketing-digital-lima', destination: '/es/agencia-marketing-digital-lima', permanent: true },
      // ── 136 URLs de la web anterior en WordPress (2026-08-26) ────────────
      // La migración dejó 136 direcciones con formato `/AAAA/MM/DD/slug/`
      // devolviendo 404. Comprobado en el mapa del 25-ago: las 134 con destino
      // apuntan al MISMO slug bajo `/es/blogs/`, así que dos reglas con patrón
      // las cubren todas (y también cualquiera que no estuviera en la lista).
      // 61 de ellas llevaban además el prefijo `/en/` porque el detector de
      // idioma las reenviaba antes de morir en el 404.
      //
      // Qué se recupera y qué NO: hoy solo 3 de las 136 conservan impresiones
      // (20 en 90 días). Esto NO devuelve tráfico — devuelve la autoridad de
      // los enlaces externos que apuntan a las direcciones viejas y deja de
      // gastar presupuesto de rastreo de Google en 136 errores.
      //
      // La excepción va primero: ese slug ya estaba consolidado en otro post,
      // y encadenar dos 301 diluye la señal.
      { source: '/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/mejores-agencias-de-publicidad', destination: '/es/blogs/mejores-agencias-de-marketing-digital', permanent: true },
      { source: '/:locale(es|en|us)/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/mejores-agencias-de-publicidad', destination: '/es/blogs/mejores-agencias-de-marketing-digital', permanent: true },
      { source: '/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/:slug', destination: '/es/blogs/:slug', permanent: true },
      { source: '/:locale(es|en|us)/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/:slug', destination: '/es/blogs/:slug', permanent: true },

      // Typo histórico → página web real.
      {
        source: '/:locale(es|en)/servicios/web-deveploment',
        destination: '/:locale/servicios/web-development',
        permanent: true,
      },
      {
        source: '/servicios/web-deveploment',
        destination: '/es/servicios/web-development',
        permanent: true,
      },
      {
        source: '/:locale(es|en)/blog',
        destination: '/:locale/blogs',
        permanent: true,
      },
      // ── Consolidación de canibalización del blog (2026-07-16) ─────────────
      // Varios posts atacaban la MISMA keyword y se dividían las señales:
      // 3× "cuánto cuesta página web", 3× "agencia diseño web lima" (dos con
      // slug roto "es-blogs-*" de la migración), 2× "mejores agencias" y 2×
      // "crear tienda con shopify/woocommerce". Se consolida cada grupo en su
      // post canónico (el más completo) con 301. Los slugs viejos también se
      // excluyen del sitemap (app/sitemap.ts).
      { source: '/:locale(es|en)/blogs/es-blogs-diseno-web-lima-peru', destination: '/:locale/blogs/como-elegir-agencia-diseno-web-lima', permanent: true },
      { source: '/blogs/es-blogs-diseno-web-lima-peru', destination: '/es/blogs/como-elegir-agencia-diseno-web-lima', permanent: true },
      { source: '/:locale(es|en)/blogs/es-blogs-mejor-agencia-web-lima-peru', destination: '/:locale/blogs/como-elegir-agencia-diseno-web-lima', permanent: true },
      { source: '/blogs/es-blogs-mejor-agencia-web-lima-peru', destination: '/es/blogs/como-elegir-agencia-diseno-web-lima', permanent: true },
      { source: '/:locale(es|en)/blogs/cuanto-cuesta-una-pagina-web-en-peru-en-2026-precios-reales', destination: '/:locale/blogs/cuanto-cuesta-pagina-web-peru-2026', permanent: true },
      { source: '/blogs/cuanto-cuesta-una-pagina-web-en-peru-en-2026-precios-reales', destination: '/es/blogs/cuanto-cuesta-pagina-web-peru-2026', permanent: true },
      { source: '/:locale(es|en)/blogs/cuanto-cuesta-crear-una-pagina-web-en-peru-este-ano', destination: '/:locale/blogs/cuanto-cuesta-pagina-web-peru-2026', permanent: true },
      { source: '/blogs/cuanto-cuesta-crear-una-pagina-web-en-peru-este-ano', destination: '/es/blogs/cuanto-cuesta-pagina-web-peru-2026', permanent: true },
      { source: '/:locale(es|en)/blogs/mejores-agencias-de-publicidad', destination: '/:locale/blogs/mejores-agencias-de-marketing-digital', permanent: true },
      { source: '/blogs/mejores-agencias-de-publicidad', destination: '/es/blogs/mejores-agencias-de-marketing-digital', permanent: true },
      { source: '/:locale(es|en)/blogs/crear-tienda-online-en-peru-con-shopify-o-woocommerce-guia-2026', destination: '/:locale/blogs/como-crear-tienda-online-que-venda-peru', permanent: true },
      { source: '/blogs/crear-tienda-online-en-peru-con-shopify-o-woocommerce-guia-2026', destination: '/es/blogs/como-crear-tienda-online-que-venda-peru', permanent: true },
      {
        source: '/:locale(es|en)/blog/:slug*',
        destination: '/:locale/blogs/:slug*',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/es/blogs',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/es/blogs/:slug*',
        permanent: true,
      },
      {
        source: '/:locale(es|en)/contacto',
        destination: '/:locale#contacto',
        permanent: true,
      },
      {
        source: '/contacto',
        destination: '/es#contacto',
        permanent: true,
      },
      // ── 46 ENLACES DEL CUERPO DE 30 POSTS ACABAN EN 404 (2026-08-29) ─────
      // Son rutas de la web antigua que quedaron escritas dentro del HTML de los
      // artículos. Arreglarlas post a post en Supabase es lento y frágil; una
      // 301 en un solo sitio las recupera todas y además conserva la autoridad
      // de cualquier enlace externo que aún apunte ahí.
      // Comprobado el 29-ago: las seis daban 404 tras el 307 del middleware.
      { source: '/content-marketing', destination: '/es/servicios/socialmedia', permanent: true },
      { source: '/branding', destination: '/es/servicios/branding', permanent: true },
      { source: '/tech-innovation', destination: '/es/servicios/web-development', permanent: true },
      { source: '/lienzo-de-ideas', destination: '/es/blogs', permanent: true },
      { source: '/categoria/seo', destination: '/es/posicionamiento-seo', permanent: true },
      { source: '/categoria/marketing', destination: '/es/servicios', permanent: true },
      { source: '/categoria/:slug', destination: '/es/blogs', permanent: true },

      // ── LA LANDING DE ADS NO DEBE COMPETIR CON SU PROPIA FICHA (2026-08-29)
      // /performance-marketing vive fuera del sistema de idiomas, es indexable,
      // no está en el sitemap y duplica a /es/servicios/performance-marketing.
      // NO se redirige: recibe 527 sesiones de Google Ads en 90 días y romperla
      // costaría campañas. Se marca noindex en su propio layout (ver
      // app/(landing)/performance-marketing), que es lo correcto para una
      // landing de pago: sirve para anuncios, no para el índice.

      // ── TODA RUTA SIN PREFIJO DE IDIOMA DEVOLVÍA 307 (2026-08-29) ─────────
      // No era un riesgo teórico: Search Console tiene NUEVE URLs sin prefijo
      // indexadas con 2.260 impresiones en 90 días —«/» sola acumula 1.491 en
      // posición 6,3—, todas duplicando su gemela de /es. El 307 del middleware
      // es temporal, y ante un redirect temporal Google conserva la URL de
      // origen en el índice.
      //
      // Esta regla va la ÚLTIMA a propósito: las anteriores son específicas y
      // deben ganar. Y excluye:
      //   es|en|us    los tres locales reales
      //   api|_next   endpoints y assets del framework
      //   og|icons|images|fonts   estáticos de /public
      //   admin       el CMS del blog, que vive fuera de [locale]
      //   panel       el panel de operaciones. Va servido por el rewrite a
      //               3rcore-work.vercel.app, pero en Next los redirects se
      //               evalúan ANTES que los rewrites: sin esta exclusión
      //               /panel caía en 308 a /es/panel y devolvía 404 (roto
      //               desde el 29-ago-2026, cuando se añadió esta regla).
      //   performance-marketing   landing de Google Ads en la raíz: recibe 536
      //                           sesiones de pago en 90 días. Redirigirla
      //                           rompería las campañas.
      //   [^.]*       cualquier cosa con punto es un fichero: robots.txt,
      //               sitemap.xml, llms.txt, favicon.ico, imágenes…
      {
        source: '/:path((?!es$|es/|en$|en/|us$|us/|api/|_next/|og/|icons/|images/|fonts/|admin$|admin/|panel$|panel/|performance-marketing$)[^.]*)',
        destination: '/es/:path',
        permanent: true,
      },

    ];
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://3rcore.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
        ],
      },
      // Estáticos de /public: vídeos, imágenes, iconos y OG. Son ficheros que
      // solo cambian cuando se sustituye el archivo, y hasta ahora se
      // revalidaban en cada visita. Un año de caché inmutable ahorra la mayor
      // parte del peso en la segunda página que abre el visitante y libera
      // presupuesto de rastreo de Google.
      ...['videos', 'images', 'icons', 'og', 'frames', 'proto'].map((dir) => ({
        source: `/${dir}/:path*`,
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      })),
    ];
  },
};

export default withNextIntl(nextConfig);
