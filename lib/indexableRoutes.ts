/**
 * Qué rutas internas NO se indexan en cada mercado.
 *
 * Plan USA de 3R Core (Piero Roque, 13-sep-2026): en /en y /us solo se venden
 * SEO, desarrollo web y tiendas online. El resto de /servicios/* sigue vivo
 * para /es y va con `noindex: locale !== 'es'` en su layout (ver p. ej.
 * app/[locale]/servicios/google-ads/layout.tsx). Las páginas ancla de un solo
 * mercado devuelven 404 fuera de él.
 *
 * Esto existe para que los componentes compartidos (selector de idioma,
 * «servicios relacionados», índice de servicios) no enlacen a esas URLs: un
 * enlace interno a una página noindex o 404 gasta rastreo y reparte autoridad
 * hacia donde no puede posicionar (hallazgos JEV-001 y JEV-002, 28-sep-2026).
 *
 * Si se cambia el `noindex` de un layout, hay que cambiarlo aquí también.
 */

// Servicios que sí se venden (y se indexan) en EE.UU.
const SERVICES_SOLD_IN_US = ['/servicios/web-development']

// Páginas que existen en UN solo mercado.
const MARKET_ONLY: Record<string, string> = {
  '/nearshore-marketing-agency': 'en',
  '/hispanic-marketing-agency': 'en',
  '/spanish-seo-services': 'en',
  '/marketing-para-negocios-hispanos': 'us',
  '/casos-de-exito': 'es',
  '/agencia-marketing-digital-lima': 'es',
  // Páginas nuevas de USA (PR #101), solo existen en /en
  '/website-cost-calculator': 'en',
  '/bilingual-website-design': 'en',
  '/seo-for-hispanic-businesses': 'en',
  // Páginas nuevas de Perú (tandas del 28-sep), solo existen en /es
  '/cuanto-cuesta-el-seo-en-peru': 'es',
  '/cuanto-cuesta-una-pagina-web-en-peru': 'es',
  '/mejores-agencias-google-ads-lima': 'es',
  '/diseno-web-restaurantes-lima': 'es',
  '/agencia-seo-arequipa': 'es',
  '/agencia-marketing-digital-miraflores': 'es',
}

export function isIndexableIn(path: string, locale: string): boolean {
  if (path in MARKET_ONLY) return MARKET_ONLY[path] === locale
  if (locale !== 'es' && path.startsWith('/servicios/')) {
    return SERVICES_SOLD_IN_US.includes(path)
  }
  return true
}
