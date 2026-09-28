import { NextRequest, NextResponse } from "next/server"

const INDEXNOW_KEY = "20cdaaacbcde738724ae0cf7fc05ebdb"
const HOST = "3rcore.com"
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
]

// Lista revisada el 26-ago-2026 con Search Console en la mano.
// Antes apuntaba a URLs de /en que hoy redirigen (/en/servicios/* → /en/services/*):
// enviar redirecciones a IndexNow es gastar cuota en nada.
// Ahora entran las que de verdad importan: las CINCO páginas que Google marcó
// como «descubierta, actualmente sin indexar» y NUNCA rastreó, la página madre
// recuperada, y las de venta cuyos títulos acaban de cambiar.
const STATIC_URLS = [
  // Página madre del negocio, recuperada el 26-ago.
  "https://3rcore.com/es/agencia-marketing-digital-lima",
  // Las cinco que Google nunca visitó (lastCrawlTime vacío).
  "https://3rcore.com/es/casos-de-exito",
  "https://3rcore.com/es/preguntas",
  "https://3rcore.com/es/servicios/meta-ads",
  "https://3rcore.com/es/servicios/relaciones-publicas",
  "https://3rcore.com/es/servicios/influencer-marketing",
  // Índice de servicios: pasó de 395 a más de 1.200 palabras.
  "https://3rcore.com/es/servicios",
  // Portada y pilares.
  "https://3rcore.com/es",
  "https://3rcore.com/es/posicionamiento-seo",
  "https://3rcore.com/es/tiendas-virtuales-lima",
  "https://3rcore.com/es/servicios/web-development",
  "https://3rcore.com/es/servicios/google-ads",
  "https://3rcore.com/es/servicios/socialmedia",
  "https://3rcore.com/es/servicios/branding",
  "https://3rcore.com/es/servicios/tiktok-ads",
  "https://3rcore.com/es/servicios/performance-marketing",
  "https://3rcore.com/es/servicios/email-marketing",
  "https://3rcore.com/es/servicios/ugc",
  "https://3rcore.com/es/servicios/marketing-clinicas",
  "https://3rcore.com/es/servicios/marketing-inmobiliarias",
  "https://3rcore.com/es/servicios/marketing-ecommerce",
  "https://3rcore.com/es/nosotros",
  "https://3rcore.com/es/precios",
  "https://3rcore.com/es/blogs",
  // Los artículos del clúster «cuánto cuesta» con snippet nuevo.
  "https://3rcore.com/es/cuanto-cuesta-una-pagina-web-en-peru",
  "https://3rcore.com/es/blogs/cuanto-cuesta-branding-peru-2026",
  "https://3rcore.com/es/blogs/cuanto-cuesta-publicidad-facebook-instagram-peru-2026",
  "https://3rcore.com/es/blogs/cuanto-cuesta-tienda-virtual-peru-2026",
  "https://3rcore.com/es/blogs/cuanto-cuesta-community-manager-redes-lima-2026",
  "https://3rcore.com/es/blogs/cuanto-cuesta-agencia-seo-lima-2026",
  "https://3rcore.com/es/blogs/cuanto-cuesta-anunciar-tiktok-peru-cpm-cpa",
  "https://3rcore.com/es/blogs/mejores-paginas-web-peruanas-2026",
  // Mercado EE.UU.: los slugs REALES de /en, no los españoles que redirigen.
  "https://3rcore.com/en",
  "https://3rcore.com/en/services",
  "https://3rcore.com/en/seo-agency",
  "https://3rcore.com/en/ecommerce-development",
  "https://3rcore.com/en/services/web-development",
  "https://3rcore.com/en/nearshore-marketing-agency",
  "https://3rcore.com/us",
  "https://3rcore.com/us/marketing-para-negocios-hispanos",
  // 28-ago-2026. Páginas y artículos nuevos del mercado de EE.UU.
  "https://3rcore.com/en/hispanic-marketing-agency",
  "https://3rcore.com/en/spanish-seo-services",
  "https://3rcore.com/en/blogs/how-much-does-a-shopify-store-cost",
  "https://3rcore.com/en/blogs/how-much-does-a-small-business-website-cost",
  "https://3rcore.com/en/blogs/seo-agency-pricing-what-you-should-get",
  "https://3rcore.com/en/blogs/best-ecommerce-platform-for-small-business",
  "https://3rcore.com/us/blogs",
  // Vuelven a la lista: desde el 28-ago se sirven desde el código
  // (lib/blog-static/us-posts.ts) mientras la base no admita el locale 'us'.
  "https://3rcore.com/us/blogs/cuanto-cuesta-una-pagina-web-en-estados-unidos",
  "https://3rcore.com/us/blogs/cuanto-cobra-una-agencia-de-marketing-digital-en-estados-unidos",
  "https://3rcore.com/us/blogs/como-crear-una-tienda-online-en-estados-unidos",
  "https://3rcore.com/us/blogs/como-vender-online-en-estados-unidos",
  // 29-ago-2026. Piezas que cubren huecos medidos en el autocompletado.
  "https://3rcore.com/us/blogs/cuanto-tarda-una-pagina-web-en-aparecer-en-google",
  "https://3rcore.com/en/blogs/how-long-does-it-take-to-build-a-website",
  "https://3rcore.com/es/blogs/contrato-agencia-marketing-digital-peru-que-firmar",
  "https://3rcore.com/es/blogs/como-aparecer-en-chatgpt-negocios-peru",
  "https://3rcore.com/es/blogs/por-que-mi-pagina-web-no-aparece-en-google-peru",
]

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const auth = url.searchParams.get("key")
  if (auth !== INDEXNOW_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const customUrl = url.searchParams.get("url")
  const urlList = customUrl ? [customUrl] : STATIC_URLS

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }

  const results = await Promise.all(
    ENDPOINTS.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        return { endpoint, status: res.status, ok: res.ok }
      } catch (e: any) {
        return { endpoint, status: 0, ok: false, error: String(e?.message ?? e) }
      }
    })
  )

  return NextResponse.json({
    ok: true,
    submitted: urlList.length,
    urls: urlList,
    results,
  })
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-indexnow-key")
  if (auth !== INDEXNOW_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const urlList: string[] = Array.isArray(body?.urls) && body.urls.length > 0 ? body.urls : STATIC_URLS

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }

  const results = await Promise.all(
    ENDPOINTS.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        return { endpoint, status: res.status, ok: res.ok }
      } catch (e: any) {
        return { endpoint, status: 0, ok: false, error: String(e?.message ?? e) }
      }
    })
  )

  return NextResponse.json({
    ok: true,
    submitted: urlList.length,
    urls: urlList,
    results,
  })
}
