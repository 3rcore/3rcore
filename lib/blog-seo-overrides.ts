/**
 * Titles y descripciones de blog escritos a mano para las URLs que YA rankean
 * y no reciben clics.
 *
 * De dónde sale la lista (Search Console, 90 días, 25-ago-2026): estos posts
 * están en posiciones 4 a 7 —media pantalla— con CTR entre 0,2% y 1,8%, cuando
 * lo esperable en esa posición ronda el 4-8%. Cuando alguien está en el puesto
 * 4 y no le hacen clic, el problema no es el posicionamiento: es lo que se lee
 * en el resultado. Solo `cuanto-cuesta-pagina-web-peru-2026` acumula 4.195
 * apariciones y 17 visitas.
 *
 * ⚠️ REGLA DE ORIGEN DE LOS DATOS. Cada cifra de estas descripciones está
 * copiada del «Resumen ejecutivo» DEL PROPIO ARTÍCULO — se leyeron los catorce
 * por la API (`/api/posts/<slug>`) el 26-ago-2026 antes de escribir una sola
 * línea. NO se usan los precios de /es/precios: esos son la tarifa de 3R Core y
 * los artículos hablan del precio de MERCADO en Perú, que es otra cosa. Una
 * descripción que promete una cifra que el artículo no da es un clic
 * defraudado, y Google lo acaba notando.
 *
 * Cómo mandar: esto tiene prioridad sobre `meta_title` / `meta_description` de
 * la base. Para devolver el control al CMS, basta borrar la entrada. Si se
 * reescribe un artículo y cambian sus cifras, hay que revisar su entrada aquí.
 *
 * «Características de la publicidad» se dejó fuera el 26-ago por ser público
 * escolar. El 16-sep entra, pero no para subir el CTR sino para corregir tres
 * errores que se ven en el resultado y en la página: la descripción de la base
 * terminaba en una frase cortada («Aprende cómo la creatividad.»), el H1 decía
 * «Las 10 características» y el artículo enumera cinco, y el title, el H1 y el
 * og:title decían tres cosas distintas.
 */

export interface BlogSeoOverride {
  title: string
  description: string
  /**
   * H1 visible (y `headline` del BlogPosting). Solo cuando el título de la base
   * dice algo que el artículo no cumple.
   */
  heading?: string
  /**
   * Párrafo HTML que se antepone al cuerpo: la respuesta directa que cita la IA
   * y que Google usa como fragmento. Solo con datos que ya están en el artículo.
   */
  lead?: string
}

export const BLOG_SEO_OVERRIDES: Record<string, BlogSeoOverride> = {
  // Resumen del artículo: S/2,500–25,000 · landing S/2,500 · corporativa
  // S/4,500–9,000 · e-commerce desde S/6,500 · portal desde S/12,000.
  'cuanto-cuesta-pagina-web-peru-2026': {
    title: '¿Cuánto cuesta una página web en Perú? Precios 2026',
    description:
      'Landing S/2,500, web corporativa S/4,500–9,000, e-commerce desde S/6,500 y portal con sistema desde S/12,000. Qué incluye cada rango y qué lo encarece.',
  },
  // Resumen: logo desde S/800 · identidad visual completa desde S/3,500 ·
  // branding integral con manual desde S/6,500 · rebranding desde S/12,000.
  'cuanto-cuesta-branding-peru-2026': {
    title: '¿Cuánto cuesta el branding en Perú? Precios 2026',
    description:
      'Logo desde S/800, identidad visual completa desde S/3,500, branding con manual de marca desde S/6,500 y rebranding desde S/12,000. Qué incluye cada nivel.',
  },
  // Resumen: piso práctico S/600/mes · rangos S/1,500–8,000 según rubro ·
  // CPM S/8–25 · CPC S/0.30–1.50 · costo por lead S/3–40.
  'cuanto-cuesta-publicidad-facebook-instagram-peru-2026': {
    title: 'Cuánto cuesta la publicidad en Facebook en Perú 2026',
    description:
      'Piso práctico de S/600 al mes y rangos de S/1,500 a S/8,000 según rubro. CPM de S/8 a S/25, CPC de S/0.30 a S/1.50 y costo por lead de S/3 a S/40.',
  },
  // Resumen: implementación S/1,500–25,000 · tienda estándar S/1,500–4,000 ·
  // mensualidad: Shopify desde USD 39, Tiendanube desde S/89, Woo solo hosting.
  'cuanto-cuesta-tienda-virtual-peru-2026': {
    title: '¿Cuánto cuesta una tienda virtual en Perú? 2026',
    description:
      'Implementación de S/1,500 a S/25,000 y una tienda estándar lista para vender de S/1,500 a S/4,000, más la mensualidad de Shopify, Tiendanube o WooCommerce.',
  },
  // Resumen: una tienda pequeña se sostiene desde ~S/150–400/mes en costos
  // fijos, sin contar pauta ni comisiones de pasarela.
  'cuanto-cuesta-mantener-tienda-virtual-peru-2026': {
    title: '¿Cuánto cuesta mantener una tienda virtual en Perú?',
    description:
      'Una tienda pequeña se sostiene desde S/150 a S/400 al mes en costos fijos, sin contar pauta ni comisiones. El desglose de plataforma, pasarela y soporte.',
  },
  // Resumen: freelance S/600–1,500/mes · agencia S/1,500–4,000+/mes según
  // piezas, plataformas y si incluye pauta.
  'cuanto-cuesta-community-manager-redes-lima-2026': {
    title: '¿Cuánto cuesta un community manager en Lima? 2026',
    description:
      'Un freelance cobra de S/600 a S/1,500 al mes y una agencia de S/1,500 a S/4,000+. Qué incluye cada rango y cómo saber si tus redes venden o solo dan likes.',
  },
  // Resumen: S/1,800–5,000+/mes · local S/1,800 · competitivo S/3,000 ·
  // enterprise desde S/5,000 · netos, +18% IGV · rinde a partir del mes 3-6.
  'cuanto-cuesta-agencia-seo-lima-2026': {
    title: '¿Cuánto cuesta una agencia SEO en Lima? Precios 2026',
    description:
      'De S/1,800 a S/5,000+ al mes: tier local S/1,800, competitivo S/3,000 y enterprise desde S/5,000. Rinde a partir del mes 3-6, no antes.',
  },
  // Resumen: fee de gestión desde S/1,800/mes + pauta mínima recomendada
  // S/1,500/mes pagada a Google → arranque serio ~S/3,300/mes.
  'cuanto-cuesta-google-ads-lima-agencia-2026': {
    title: '¿Cuánto cuesta Google Ads en Lima? Fee y pauta 2026',
    description:
      'Son dos costos que no hay que mezclar: fee de agencia desde S/1,800 al mes y pauta mínima de S/1,500 pagada a Google. Un arranque serio ronda los S/3,300.',
  },
  // Resumen: piso práctico S/700/mes en medios · CPM S/6–20 · CPC S/0.20–1.20 ·
  // CPA S/5–45 según rubro.
  'cuanto-cuesta-anunciar-tiktok-peru-cpm-cpa': {
    title: '¿Cuánto cuesta anunciar en TikTok en Perú? CPM y CPA',
    description:
      'Piso práctico de S/700 al mes en medios, CPM de S/6 a S/20, CPC de S/0.20 a S/1.20 y CPA de S/5 a S/45 según rubro. Qué encarece y qué abarata tu campaña.',
  },
  // El artículo NO da una cifra en su resumen: explica el trabajo real (pagos
  // peruanos, envíos, velocidad, SEO, medición) y cuándo hace falta una
  // agencia. La descripción NO puede prometer un precio que el texto no tiene.
  'agencia-shopify-peru-que-hace-cuanto-cuesta': {
    title: 'Agencia Shopify en Perú: qué hace y cuánto cuesta',
    description:
      'Entre abrir una cuenta de Shopify y tener una tienda que venda en Perú hay pagos locales, envíos, velocidad, SEO y medición. Eso es lo que hace una agencia.',
  },
  // Resumen: ninguna plataforma tiene tarifario fijo, todas van por subasta.
  // Lo que sí se puede saber es la estructura (pauta + gestión) y los rangos.
  'tarifas-publicidad-digital-peru-2026-google-meta-tiktok-linkedin': {
    title: 'Tarifas de publicidad digital en Perú 2026',
    description:
      'Ninguna plataforma tiene tarifario: todas van por subasta. Cómo se estructura la inversión entre pauta y gestión en Google, Meta, TikTok y LinkedIn.',
  },
  // Resumen: se puede empezar desde S/700 al mes, pero lo que decide es el
  // creativo. Guía de 6 pasos hasta la primera campaña medida.
  'tiktok-ads-peru-2026-guia-completa-empezar-vender': {
    title: 'TikTok Ads en Perú: guía para empezar a vender',
    description:
      'Se puede empezar desde S/700 al mes, pero lo que decide no es el dinero: es el creativo. De crear la cuenta a Spark Ads y medir con el píxel, paso a paso.',
  },
  // El artículo analiza DIEZ webs peruanas concretas: BCP, Plaza Vea,
  // Cinepólis, Don Italo, Sodimac, Inkaterra… Nombrarlas es lo que da el clic.
  'mejores-paginas-web-peruanas-2026': {
    title: '10 páginas web peruanas que rinden en 2026',
    description:
      'BCP, Plaza Vea, Cinepólis, Don Italo, Sodimac o Inkaterra analizadas una a una: qué hace bien cada web y qué decisiones puedes copiar para la tuya.',
  },
  // 18.825 apariciones, posición 6,5 y CTR 0,77%. Ojo: es público escolar, no
  // clientes. Se arregla el snippet porque cuesta cero, no porque vaya a
  // vender: el valor real de esta URL es el CTA hacia los servicios.
  //
  // 16-sep-2026. Solo cambia la caja de una letra: «Parafrasist: qué es…» →
  // «Parafrasist: Qué es…». Con el patrón «Nombre: minúscula» Google tiende a
  // quitar lo de delante de los dos puntos y lo visible arranca en minúscula.
  // El resto no se toca: la búsqueda «parafrasist» es NAVEGACIONAL (desde Lima
  // salen primero parafrasist.com, parafrasis.org y QuillBot; este artículo va
  // 4.º orgánico) y en 90 días trajo 137 sesiones y 1 evento clave.
  'parafrasist-la-mejor-herramienta-para-resumir-textos': {
    title: 'Parafrasist: Qué es y cómo usarla para resumir textos',
    description:
      'Qué hace Parafrasist al parafrasear y resumir en español, cómo usarla sin meterte en problemas en un trabajo académico, sus límites y qué alternativas hay.',
  },
  // 16-sep-2026. Search Console 28 d: 539 impresiones, posición 6,1, CTR 1,7 %,
  // 83 % desde móvil y repartidas por México, Colombia, Argentina, Chile y Perú
  // (gente real, no rastreadores). Desde Lima sale 3.º y Google enseña «Las 10
  // características de la publicidad - 3R Core»: el mismo título que el 1.º
  // (cyberclick) y una promesa que el artículo no cumple, porque enumera cinco.
  // Se conserva «importancia» en el title: en 90 días «porque es importante la
  // publicidad» sumó 182 impresiones y «importancia de la publicidad», 30.
  // Todo lo que dicen el lead y la descripción está en el cuerpo del artículo.
  'caracteristicas-de-la-publicidad-importancia-y-claves-para-el-exito': {
    title: 'Características de la publicidad: Las 5 claves y su importancia',
    description:
      'Las 5 características de la publicidad que funciona: creatividad, segmentación, mensaje claro, conexión emocional y llamada a la acción. Qué aporta cada una.',
    heading: 'Las 5 características de la publicidad y por qué importan',
    lead:
      '<p><strong>Las cinco características de la publicidad que funciona son la creatividad y originalidad, la segmentación y relevancia, un mensaje claro y conciso, la conexión emocional y una llamada a la acción.</strong> Juntas deciden si un anuncio se distingue en un mercado saturado, si llega a las personas con más probabilidad de interesarse y si consigue que hagan algo concreto: comprar, suscribirse o visitar un sitio web. Abajo se explica cada una.</p>',
  },
  // 20-sep-2026 · GSC 20-ago→16-sep: «la moradita de inca kola» 100 apariciones
  // (95 de Perú, escritorio y móvil a partes iguales: es gente) en posición 6,6-7,8
  // y CERO clics. El title decía «La Moradita de Inca Kola: Fracaso rotundo | 3R Core»
  // —arranca con entidad + dos puntos, el patrón que Google recorta— y no coincidía
  // con el H1 «¿Mes morado sin milagro?…». El artículo lista TRES causas (status quo
  // de la chicha morada, imagen inconsistente, investigación sesgada) y no da fechas
  // ni cifras de venta, así que el title no promete ninguna.
  'mes-morado-sin-milagro-el-fracaso-comercial-de-la-moradita-de-inca-kola': {
    title: 'Por qué fracasó La Moradita de Inca Kola: 3 errores',
    description:
      'Inca Kola subestimó la tradición de la chicha morada. Los 3 errores que hundieron La Moradita y qué revisar antes de lanzar un producto nuevo.',
  },
}

/**
 * Posts de /en (12-sep-2026, orquesta). Search Console 13-ago..9-sep:
 * «ecommerce platform comparison» posición 5,9 con 193 impresiones y 0 clics;
 * «spanish seo» 12,7 (163) y «small business website cost» 15,2 (122), también
 * a 0 clics. El title no empezaba por la búsqueda y las descripciones pasaban de
 * 160 caracteres. Cada cifra sale del cuerpo del propio artículo, leído en vivo.
 */
export const BLOG_SEO_OVERRIDES_EN: Record<string, BlogSeoOverride> = {
  // Artículo: Shopify $25–$399/mes; WooCommerce gratis + hosting $25–$350/mes.
  'best-ecommerce-platform-for-small-business': {
    title: 'Ecommerce Platform Comparison 2026: Shopify vs WooCommerce',
    description:
      'Shopify costs $25–$399 a month; WooCommerce is free but hosting runs $25–$350 a month. Fees, SEO and who each platform fits, with no affiliate links.',
  },
  // Artículo: «Roughly 40 million U.S. residents speak Spanish at home».
  'spanish-seo-for-us-businesses': {
    title: 'Spanish SEO for U.S. Businesses: How to Rank in Spanish',
    description:
      'Roughly 40 million U.S. residents speak Spanish at home. How to rank for their searches: es-US hreflang, native keyword research and local pages.',
  },
  // Artículo: $850–$10,000; la mayoría entre $1,200 y $2,400.
  'how-much-does-a-small-business-website-cost': {
    title: 'Small Business Website Cost in 2026: Real Price Ranges',
    description:
      'A small business website costs $850 to $10,000 to build, and most land at $1,200–$2,400. What each band includes and the yearly costs after launch.',
  },
}

export function getBlogSeoOverride(slug: string, locale: string): BlogSeoOverride | null {
  // /en tiene su propio mapa: son otros artículos y no arrastran el historial de /es.
  if (locale === 'en') return BLOG_SEO_OVERRIDES_EN[slug] ?? null
  return BLOG_SEO_OVERRIDES[slug] ?? null
}
