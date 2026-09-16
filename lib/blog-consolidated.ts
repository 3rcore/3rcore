/**
 * Artículos del blog consolidados por canibalización (16-jul-2026).
 *
 * Cada slug de la izquierda redirige con 308 a su artículo canónico en /es y
 * /en (reglas en next.config.ts). Siguen publicados en Supabase, y por eso:
 *
 *  - el sitemap no debe listarlos (apuntaría a URLs que redirigen);
 *  - el índice del blog y los «relacionados» no deben enlazarlos (medido el
 *    16-sep-2026: /es/blogs?page=3, 4 y 5 enlazaban los seis y cada clic era
 *    un salto 308);
 *  - en /us, que no tiene esa redirección y sirve el artículo viejo con 200,
 *    el canonical apuntaba a /es/blogs/<slug-viejo>, que a su vez redirige.
 *    Un canonical que apunta a una redirección se ignora: Google se quedó con
 *    la copia de /us como canónica e indexada (Search Console, inspección del
 *    16-sep: /us/blogs/cuanto-cuesta-crear-una-pagina-web-en-peru-este-ano y
 *    /us/blogs/es-blogs-mejor-agencia-web-lima-peru, «Enviada e indexada»).
 *    Ahora el canonical va directo al artículo que ganó la consolidación.
 *
 * Si se añade una consolidación en next.config.ts, se añade también aquí.
 */
export const CONSOLIDATED_BLOG_SLUGS: Record<string, string> = {
  'es-blogs-diseno-web-lima-peru': 'como-elegir-agencia-diseno-web-lima',
  'es-blogs-mejor-agencia-web-lima-peru': 'como-elegir-agencia-diseno-web-lima',
  'cuanto-cuesta-una-pagina-web-en-peru-en-2026-precios-reales': 'cuanto-cuesta-pagina-web-peru-2026',
  'cuanto-cuesta-crear-una-pagina-web-en-peru-este-ano': 'cuanto-cuesta-pagina-web-peru-2026',
  'mejores-agencias-de-publicidad': 'mejores-agencias-de-marketing-digital',
  'crear-tienda-online-en-peru-con-shopify-o-woocommerce-guia-2026': 'como-crear-tienda-online-que-venda-peru',
}

/** Slug del artículo que ganó la consolidación, o null si este slug no se consolidó. */
export function consolidatedTarget(slug: string): string | null {
  return CONSOLIDATED_BLOG_SLUGS[slug] ?? null
}

/** Valor para el filtro `.not('slug', 'in', …)` de PostgREST: ("a","b",…). */
export const CONSOLIDATED_SLUGS_IN = `(${Object.keys(CONSOLIDATED_BLOG_SLUGS)
  .map((s) => `"${s}"`)
  .join(',')})`
