/**
 * LEADS tanda 3 (2026-07-16) — 5 blogs buyer-intent para los 3 pilares
 * (Tiendas ×2, SEM ×2, SEO ×1), elegidos del banco de títulos contra los gaps
 * reales del SERP y SIN canibalizar los 51 posts sembrados anteriores.
 * Precios: SOLO los ya publicados en /precios y /tiendas-virtuales-lima.
 * CTA medible auto-inyectado por <BlogCTA> según el slug (mapa en lib/blog-cta-map).
 */
import type { SeedPost } from "./posts"

const AUTHOR = "Equipo 3R Core"
const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&q=80`

export const LEADS3_POSTS_2026_07: SeedPost[] = [
  // ───────────────────────── TIENDAS #1 — agencia shopify perú ─────────────────────────
  {
    slug: "agencia-shopify-peru-que-hace-cuanto-cuesta",
    title: "Agencia Shopify en Perú: qué hace, cuánto cuesta y cuándo la necesitas",
    focus_keyword: "agencia shopify peru",
    meta_title: "Agencia Shopify en Perú 2026: qué hace y cuánto cuesta | 3R Core",
    meta_description: "Qué hace una agencia Shopify en Perú, cuánto cuesta crear tu tienda (desde S/1,500), qué debe incluir y cuándo te conviene contratarla en vez de armarla tú mismo.",
    excerpt: "Shopify es la plataforma más rápida para vender online, pero montarla bien es otra historia: pagos peruanos, envíos, velocidad y SEO. Qué hace una agencia Shopify y cuánto cuesta en Perú.",
    og_title: "Agencia Shopify en Perú: qué hace y cuánto cuesta",
    og_description: "Guía honesta: cuándo necesitas una agencia Shopify, qué debe incluir y precios reales en soles.",
    featured_image: IMG("1472851294608-062f824d29cc"),
    featured_image_alt: "Agencia Shopify en Perú: tienda online lista para vender",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>Shopify</strong> es la plataforma de e-commerce más usada para empezar a vender rápido: hosting incluido, checkout probado y cientos de apps. Pero entre "abrir una cuenta de Shopify" y "tener una tienda que vende en Perú" hay un tramo técnico que es exactamente lo que hace una <strong>agencia Shopify</strong>: pagos locales, envíos, velocidad, SEO y medición. Esta guía te explica qué hace una agencia Shopify en Perú, cuánto cuesta y cuándo de verdad la necesitas.</p>

<h2>Qué hace una agencia Shopify (el trabajo real)</h2>
<ul>
<li><strong>Configura pagos peruanos</strong>: Shopify no trae Yape ni Culqi de fábrica. La agencia integra y prueba Culqi, Niubiz, Izipay, Mercado Pago o PagoEfectivo según tu banco y tus comisiones. Es el paso donde más tiendas DIY se quedan atascadas (nuestra <a href="/es/blogs/pasarelas-pago-tienda-online-peru">guía de pasarelas de pago</a> lo detalla).</li>
<li><strong>Diseña sobre tu marca</strong>, no sobre la plantilla por defecto: jerarquía de portada, fichas de producto que responden dudas y un flujo de compra sin fricción en celular.</li>
<li><strong>Carga el catálogo bien</strong>: variantes, categorías, fotos optimizadas y textos que venden y posicionan.</li>
<li><strong>Configura envíos</strong>: zonas, tarifas por distrito/provincia y correos automáticos de pedido.</li>
<li><strong>Deja el SEO técnico de base</strong>: URLs limpias, schema de producto, velocidad y sitemap — para que Google entienda tu tienda desde el día uno.</li>
<li><strong>Instala la medición</strong>: Google Analytics 4 y píxeles listos para campañas.</li>
<li><strong>Optimiza la conversión (CRO)</strong>: prueba variantes de la ficha de producto, del checkout y de los CTA para que la misma visita venda más, no solo que la tienda cargue rápido.</li>
</ul>

<h2>Cuánto cuesta una agencia Shopify en Perú</h2>
<p>En 3R Core la implementación de una <strong>tienda Shopify básica arranca en S/1,500</strong> (diseño, catálogo inicial, pagos y capacitación) y una <strong>tienda avanzada</strong> — catálogos grandes, integraciones de facturación o inventario, automatizaciones — va <strong>desde S/6,500</strong>. Aparte va la mensualidad de la plataforma (Shopify desde USD 19/mes con pago anual, USD 25/mes si pagas mes a mes) y las comisiones de la pasarela por venta. El desglose completo por tier está en nuestra guía de <a href="/es/blogs/cuanto-cuesta-tienda-virtual-peru-2026">cuánto cuesta una tienda virtual en Perú</a>.</p>

<h2>¿Y si mejor la armo yo mismo?</h2>
<p>Es una opción válida si tu catálogo es chico y tienes tiempo para aprender. El costo real del DIY no es el dinero, es lo que no ves: una tienda que carga lento, pagos mal configurados que rebotan compras, y cero visibilidad en Google. Si tu negocio ya vende por redes o WhatsApp y quieres profesionalizar el canal, la agencia paga sola con los errores que te ahorra. Publicamos los más comunes en <a href="/es/blogs/errores-crear-tienda-virtual-peru">errores al crear una tienda virtual en Perú</a>.</p>

<h2>Shopify no siempre es la respuesta (y una buena agencia te lo dice)</h2>
<p>Si necesitas control total del código o integraciones muy a medida, <strong>WooCommerce</strong> puede convenir más; si buscas el plan más accesible con pagos locales resueltos, <strong>Tiendanube</strong> compite fuerte. En el diagnóstico te recomendamos la plataforma correcta sin sesgo — comparamos las tres en <a href="/es/blogs/shopify-woocommerce-tiendanube-peru-cual-elegir">Shopify vs WooCommerce vs Tiendanube</a>.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿En cuánto tiempo está lista una tienda Shopify?</h3>
<p>Una tienda estándar suele estar lista en 2 a 4 semanas, dependiendo del tamaño del catálogo y la entrega de contenido (fotos, textos, logo).</p>
<h3>¿La agencia se queda administrando mi tienda?</h3>
<p>No necesariamente: te capacitamos para que la administres tú. Si quieres, después sumamos <a href="/es/posicionamiento-seo">SEO</a> o <a href="/es/servicios/google-ads">Google Ads y Google Shopping</a> para traer tráfico que compra.</p>
<h3>¿Trabajan con negocios fuera de Lima?</h3>
<p>Sí: todo el proceso (diseño, revisiones, capacitación) se hace remoto por videollamada, con los mismos precios.</p>

<h2>Cierre</h2>
<p>Una agencia Shopify en Perú te entrega lo que una plantilla no puede: pagos locales funcionando, una tienda rápida y un canal medible. En 3R Core montamos tu tienda desde S/1,500 y la conectamos con SEO y Google Ads para que venda desde el día uno. <a href="/es/tiendas-virtuales-lima#cotizar">Cotiza tu tienda Shopify</a>.</p>`,
  },
  // ───────────────────────── TIENDAS #2 — carritos abandonados ─────────────────────────
  {
    slug: "recuperar-carritos-abandonados-tienda-online-peru",
    title: "Carritos abandonados: cómo recuperar ventas perdidas en tu tienda online peruana",
    focus_keyword: "carritos abandonados tienda online",
    meta_title: "Cómo recuperar carritos abandonados en tu tienda online — Perú 2026 | 3R Core",
    meta_description: "La mayoría de los carritos se abandonan antes de pagar. Guía práctica para tiendas peruanas: emails de recuperación, WhatsApp, retargeting y fixes de checkout que recuperan ventas.",
    excerpt: "Cada carrito abandonado es una venta que casi ocurre. Cómo recuperarlas en Perú: secuencia de emails, WhatsApp, retargeting y los arreglos de checkout que evitan el abandono.",
    og_title: "Cómo recuperar carritos abandonados en tu tienda online",
    og_description: "Emails, WhatsApp y retargeting para recuperar ventas perdidas en tiendas peruanas.",
    featured_image: IMG("1563013544-824ae1b704d3"),
    featured_image_alt: "Recuperación de carritos abandonados en tiendas online de Perú",
    author_name: AUTHOR,
    content: `<p class="lead">De cada 10 personas que agregan un producto al carrito de tu tienda, la mayoría se va sin pagar. No es un defecto de tu tienda: es el comportamiento normal del e-commerce. La diferencia entre una tienda que factura y una que "casi factura" está en qué haces DESPUÉS del abandono. Esta guía cubre las tres palancas que funcionan en Perú: email, WhatsApp y retargeting — más los arreglos de checkout que evitan el abandono desde el inicio.</p>

<h2>Primero: por qué abandonan el carrito en Perú</h2>
<ul>
<li><strong>Costo de envío sorpresa</strong> al final del checkout (la causa #1 en casi todos los estudios de e-commerce).</li>
<li><strong>No está su método de pago</strong>: si el cliente paga con Yape o transferencia y solo aceptas tarjeta, se va. Revisa nuestra <a href="/es/blogs/pasarelas-pago-tienda-online-peru">guía de pasarelas de pago para Perú</a>.</li>
<li><strong>Desconfianza</strong>: sin reseñas, sin políticas claras de cambio/devolución, sin datos de contacto visibles.</li>
<li><strong>Checkout largo</strong>: pedir crear cuenta o llenar 12 campos en el celular mata la compra por impulso.</li>
</ul>
<p>Arreglar estas cuatro cosas recupera más ventas que cualquier campaña de recuperación. Lo demás es rescatar a los que igual se fueron.</p>

<h2>Palanca 1: la secuencia de emails de recuperación</h2>
<p>Shopify, WooCommerce y Tiendanube permiten disparar correos automáticos al carrito abandonado. La secuencia que recomendamos:</p>
<ol>
<li><strong>1 hora después</strong>: recordatorio simple con foto del producto y botón directo al checkout ("Tu carrito te espera").</li>
<li><strong>24 horas después</strong>: responde objeciones — envío, cambios, formas de pago — y muestra el contacto de WhatsApp para dudas.</li>
<li><strong>72 horas después</strong> (opcional): urgencia honesta, como stock limitado real. Cupones de descuento solo si tu margen lo permite: si siempre regalas 10%, educas al cliente a abandonar a propósito.</li>
</ol>
<p>Cómo montar estas automatizaciones lo cubrimos en <a href="/es/blogs/automatizaciones-email-ecommerce-peru">automatizaciones de email para e-commerce</a>.</p>

<h2>Palanca 2: WhatsApp (la ventaja peruana)</h2>
<p>En Perú el cliente confía más en WhatsApp que en el correo. Si capturas el número en el checkout (o el cliente inició contacto por ahí), un mensaje personal a las pocas horas — "vi que dejaste tu pedido a medias, ¿te ayudo con algo?" — convierte mejor que cualquier email, porque abre conversación: la duda que lo frenó (envío, talla, pago) se resuelve en el chat y la venta se cierra ahí mismo.</p>

<h2>Palanca 3: retargeting con Ads</h2>
<p>Quien llegó al carrito es tu audiencia más caliente. Con el píxel bien instalado puedes mostrarle el producto exacto que dejó: en Meta con <strong>anuncios dinámicos de catálogo</strong> y en Google con <strong>remarketing</strong> (guía completa en <a href="/es/blogs/remarketing-google-ads-recuperar-clientes-peru">remarketing en Google Ads</a>). Presupuestos chicos funcionan bien aquí porque la audiencia es pequeña y de altísima intención.</p>

<h2>Cómo medirlo</h2>
<p>Con Google Analytics 4 y el e-commerce mejorado ves el embudo completo: producto visto → agregado al carrito → checkout iniciado → compra. Ahí sabes exactamente en qué paso pierdes más gente y si tus campañas de recuperación pagan. Qué medir y cómo, en <a href="/es/blogs/google-analytics-4-negocios-peruanos-que-medir">GA4 para negocios peruanos</a>.</p>

<h2>Cierre</h2>
<p>Recuperar carritos no es un truco: es tener el checkout sin fricción, los pagos que tu cliente usa y una secuencia de rescate que llega a tiempo. Si tu tienda tiene visitas pero pocas ventas, en 3R Core auditamos tu embudo y montamos la recuperación completa — tienda, medición y campañas bajo un mismo techo. <a href="/es/tiendas-virtuales-lima#cotizar">Escríbenos por WhatsApp</a>.</p>`,
  },
  // ───────────────────────── SEM #1 — presupuesto por ticket ─────────────────────────
  {
    slug: "como-calcular-presupuesto-google-ads-ticket-promedio-peru",
    title: "Cómo calcular tu presupuesto de Google Ads según tu ticket promedio (en soles)",
    focus_keyword: "presupuesto google ads",
    meta_title: "Cómo calcular tu presupuesto de Google Ads en soles — Perú 2026 | 3R Core",
    meta_description: "Método simple para calcular cuánto invertir en Google Ads según tu ticket promedio y margen: fórmula en soles, ejemplo paso a paso y los errores que queman presupuesto.",
    excerpt: "¿S/500, S/1,500 o S/5,000 al mes? El presupuesto correcto de Google Ads no es un número mágico: sale de tu ticket promedio y tu margen. Fórmula simple con ejemplo en soles.",
    og_title: "Cómo calcular tu presupuesto de Google Ads según tu ticket",
    og_description: "Fórmula en soles paso a paso: del ticket promedio al presupuesto mensual que sí genera datos.",
    featured_image: IMG("1554224155-6726b3ff858f"),
    featured_image_alt: "Cálculo de presupuesto de Google Ads en soles para negocios peruanos",
    author_name: AUTHOR,
    content: `<p class="lead">"¿Cuánto debo invertir en Google Ads?" es la pregunta equivocada si se responde con un número al aire. La respuesta correcta sale de TU negocio: cuánto vale una venta (ticket promedio), cuánto te queda (margen) y cuántas ventas necesitas para que la campaña pague. Aquí va el método completo, con un ejemplo en soles.</p>

<h2>La fórmula en 4 pasos</h2>
<ol>
<li><strong>Define tu CPA máximo</strong> (costo por adquisición): ¿cuánto puedes pagar por conseguir UNA venta o UN lead sin perder plata? Regla práctica: una fracción de tu margen por venta, no del precio de venta. Si vendes un servicio de S/1,000 con margen de S/400, un CPA máximo razonable puede ser S/100–150.</li>
<li><strong>Estima tu tasa de conversión</strong>: de cada 100 clics, ¿cuántos te dejan el contacto o compran? Si no tienes historia, asume conservador (1–3% para venta online, 3–8% para captación de leads con landing decente).</li>
<li><strong>Calcula el costo por clic que soportas</strong>: CPA máximo × tasa de conversión. Con CPA de S/120 y conversión de 5%, soportas hasta S/6 por clic.</li>
<li><strong>Dimensiona el mes</strong>: presupuesto mensual = CPA máximo × ventas/leads que quieres al mes. ¿Quieres 20 leads? 20 × S/120 = S/2,400 de pauta.</li>
</ol>

<h2>Ejemplo completo: clínica dental en Lima</h2>
<p>Ticket promedio de un tratamiento: S/800. Margen: S/350. CPA máximo definido: S/90. Tasa de conversión esperada de la landing: 6% → soporta CPC de hasta ~S/5.40. Meta: 25 pacientes nuevos/mes → presupuesto de pauta ≈ <strong>S/2,250/mes</strong>. Si el CPC real del rubro es mayor que el que soportas, no es "ponerle más plata": es mejorar la landing (conversión) o apuntar a búsquedas más específicas y baratas.</p>

<h2>El mínimo para que Google aprenda</h2>
<p>Con presupuestos muy chicos el algoritmo no junta datos suficientes para optimizar y las conclusiones del primer mes valen poco. Por eso en 3R Core trabajamos con una <strong>pauta mínima recomendada de S/1,500/mes</strong> (pagada directo a Google, aparte del fee de gestión desde S/1,800). El detalle completo está en <a href="/es/blogs/cuanto-cuesta-google-ads-lima-agencia-2026">cuánto cuesta Google Ads con agencia en Lima</a>.</p>

<h2>Errores que queman presupuesto (y cómo evitarlos)</h2>
<ul>
<li><strong>Sin palabras clave negativas</strong>: pagas por búsquedas que jamás comprarán. Lista básica en <a href="/es/blogs/palabras-clave-negativas-google-ads-peru">palabras clave negativas en Google Ads</a>.</li>
<li><strong>Mandar el clic al home</strong> en vez de a una landing específica de lo que anuncias.</li>
<li><strong>Sin medición de conversiones</strong>: si no sabes qué clics se convierten en clientes, optimizas a ciegas.</li>
<li><strong>Juzgar en la semana 1</strong>: el sistema necesita ciclos de aprendizaje; los ajustes serios se hacen con datos de 2–4 semanas.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Puedo empezar con S/500 al mes?</h3>
<p>Puedes, pero en la mayoría de rubros limeños eso da muy pocos clics al día: sirve como piloto de aprendizaje, no esperes volumen de ventas. Mejor concentrar ese presupuesto en UNA campaña muy específica.</p>
<h3>¿El presupuesto incluye el fee de la agencia?</h3>
<p>No: la pauta se paga directo a Google y el fee de gestión aparte. Desconfía de quien mezcla ambos sin transparentar cuánto va a cada lado.</p>

<h2>Cierre</h2>
<p>El presupuesto correcto de Google Ads se calcula, no se adivina. Si quieres que hagamos el cálculo con TUS números — ticket, margen y meta de clientes — en 3R Core lo armamos junto con la estrategia de campaña. <a href="/es/servicios/google-ads">Conoce el servicio de Google Ads</a>.</p>`,
  },
  // ───────────────────────── SEM #2 — remarketing ─────────────────────────
  {
    slug: "remarketing-google-ads-recuperar-clientes-peru",
    title: "Remarketing en Google Ads: cómo recuperar a los que visitaron y no compraron",
    focus_keyword: "remarketing google ads",
    meta_title: "Remarketing en Google Ads para recuperar clientes — Perú 2026 | 3R Core",
    meta_description: "Guía de remarketing en Google Ads para negocios peruanos: audiencias que funcionan, display vs búsqueda (RLSA), frecuencia sana y cómo medirlo sin quemar presupuesto.",
    excerpt: "El 9x% de tus visitas se va sin comprar — el remarketing es cómo las traes de vuelta. Audiencias, formatos y errores comunes del remarketing en Google Ads para Perú.",
    og_title: "Remarketing en Google Ads: recupera a los que no compraron",
    og_description: "Audiencias, formatos y frecuencia sana para volver a captar a tus visitantes en Perú.",
    featured_image: IMG("1533750349088-cd871a92f312"),
    featured_image_alt: "Remarketing en Google Ads para negocios en Perú",
    author_name: AUTHOR,
    content: `<p class="lead">La gran mayoría de quienes visitan tu web hoy no compra hoy: compara precios, consulta con la pareja, lo deja para la quincena. El <strong>remarketing en Google Ads</strong> es la herramienta para seguir presente durante ese proceso de decisión — con inversión chica, porque le hablas solo a gente que ya te conoce.</p>

<h2>Qué es (en una línea)</h2>
<p>Google guarda listas de quienes visitaron tu web o vieron tus productos, y te deja mostrarles anuncios específicos después, mientras navegan otras webs (Display), ven YouTube o vuelven a buscar en Google.</p>

<h2>Las audiencias que funcionan</h2>
<ul>
<li><strong>Visitantes del carrito/checkout que no compraron</strong>: la más caliente. Complementa la estrategia de <a href="/es/blogs/recuperar-carritos-abandonados-tienda-online-peru">recuperación de carritos abandonados</a>.</li>
<li><strong>Visitantes de páginas de servicio o producto</strong> (no del blog): vieron lo que vendes, no solo un artículo.</li>
<li><strong>Leads que no cerraron</strong>: cotizaron y quedaron en "lo pienso" — mantente visible durante su decisión.</li>
<li><strong>Compradores pasados</strong> (para e-commerce): recompra, reposición, colecciones nuevas.</li>
</ul>
<p>Evita rehacer remarketing sobre TODO el tráfico del blog: es la audiencia más fría y diluye el presupuesto.</p>

<h2>Formatos: display, YouTube y RLSA</h2>
<ul>
<li><strong>Display</strong>: banners con el producto/servicio visto. Barato por impresión; ideal para permanecer en la mente.</li>
<li><strong>YouTube</strong>: video corto para quien ya te visitó; funciona muy bien para servicios de ticket alto.</li>
<li><strong>RLSA</strong> (remarketing en búsqueda): pujas más fuerte cuando alguien que YA visitó tu web vuelve a buscar tu categoría en Google — el momento de mayor intención posible.</li>
</ul>

<h2>Frecuencia sana (no persigas gente)</h2>
<p>Ver tu anuncio 40 veces no convence a nadie: molesta. Configura límite de frecuencia (por ejemplo, unas pocas impresiones al día por usuario), excluye a quienes ya compraron y define una ventana razonable según tu ciclo de venta (7–30 días para la mayoría de negocios; más para tickets altos como inmobiliario).</p>

<h2>Qué necesitas antes de empezar</h2>
<ol>
<li><strong>Etiqueta de Google Ads o GA4 vinculado</strong> instalado en toda la web (si no mides, no hay listas).</li>
<li><strong>Volumen mínimo</strong>: las listas de Display necesitan al menos ~100 usuarios activos; con muy poco tráfico primero llena el embudo con búsqueda — ver <a href="/es/blogs/como-calcular-presupuesto-google-ads-ticket-promedio-peru">cómo calcular tu presupuesto de Google Ads</a>.</li>
<li><strong>Creatividades específicas</strong>: el anuncio de remarketing responde objeciones ("envíos a todo el Perú", "garantía", "cotización gratis"), no repite el anuncio genérico.</li>
</ol>

<h2>Preguntas frecuentes</h2>
<h3>¿El remarketing es caro?</h3>
<p>Suele ser la parte más barata de la cuenta: la audiencia es chica y ya te conoce. El grueso del presupuesto va en las campañas que llenan el embudo; el remarketing lo exprime.</p>
<h3>¿Funciona para servicios o solo para tiendas?</h3>
<p>Funciona para ambos. En servicios (clínicas, inmobiliarias, B2B) es clave porque la decisión toma semanas — quedarte visible durante ese periodo es la diferencia entre que te elijan a ti o al último que vieron.</p>

<h2>Cierre</h2>
<p>Si ya inviertes en tráfico y no haces remarketing, estás pagando por visitas que se van para siempre. En 3R Core configuramos el embudo completo — captación + remarketing + medición de conversiones — con la cuenta y los datos a tu nombre. <a href="/es/servicios/google-ads">Conoce el servicio de Google Ads</a>.</p>`,
  },
  // ───────────────────────── SEO — SEO local Perú ─────────────────────────
  {
    slug: "seo-local-peru-aparecer-cerca-de-mi-2026",
    title: "SEO local en Perú 2026: cómo aparecer cuando buscan «cerca de mí»",
    focus_keyword: "seo local peru",
    meta_title: "SEO local en Perú 2026: aparece cuando buscan cerca de mí | 3R Core",
    meta_description: "Guía de SEO local para negocios peruanos: Google Business Profile, reseñas, NAP consistente, páginas por zona y los errores que te dejan fuera del mapa en 2026.",
    excerpt: "Cuando alguien busca tu rubro + su distrito, Google decide en segundos quién aparece. Guía de SEO local para Perú: ficha de Google, reseñas, señales de zona y errores comunes.",
    og_title: "SEO local en Perú 2026: aparece cuando buscan cerca de mí",
    og_description: "Ficha de Google, reseñas y señales locales: la guía para negocios peruanos.",
    featured_image: IMG("1526778548025-fa2f459cd5c1"),
    featured_image_alt: "SEO local en Perú: aparecer en búsquedas cerca de mí",
    author_name: AUTHOR,
    content: `<p class="lead">Cada vez que alguien busca "dentista San Borja", "ferretería cerca de mí" o "restaurante en Miraflores", Google arma un podio local: el mapa con 3 negocios y luego los resultados. El <strong>SEO local</strong> es el trabajo de aparecer en ese podio cuando el que busca está a minutos de comprarte. Esta guía cubre lo que funciona en Perú en 2026.</p>

<h2>La base: tu ficha de Google (Google Business Profile)</h2>
<p>La ficha de Google es EL factor local por excelencia. Lo mínimo bien hecho:</p>
<ul>
<li><strong>Categoría principal correcta</strong> (y categorías secundarias reales, sin inventar).</li>
<li><strong>Nombre real del negocio</strong> — rellenarlo de keywords viola las políticas y puede suspender la ficha.</li>
<li><strong>Dirección, horario y teléfono exactos</strong> y consistentes con tu web (el famoso NAP).</li>
<li><strong>Fotos reales y recientes</strong> del local, el equipo y el producto: suben clics y confianza.</li>
<li><strong>Publicaciones y novedades</strong>: una ficha activa le dice a Google que el negocio está vivo.</li>
</ul>
<p>El paso a paso de la ficha lo publicamos en <a href="/es/blogs/posicionar-negocio-google-maps-lima">cómo posicionar tu negocio en Google Maps</a>.</p>

<h2>Reseñas: el motor del podio local</h2>
<p>Cantidad, frescura y respuesta. Pide la reseña en el momento de mayor satisfacción (al entregar el pedido, al terminar el servicio) con un QR o link directo. Responde TODAS — las buenas con gracias genuinas, las malas con solución y sin pelear. Jamás compres reseñas ni montes cuentas falsas: las purgas de Google se llevan la ficha completa.</p>

<h2>Señales locales en tu web</h2>
<ul>
<li><strong>Página por sede o zona de atención</strong> con contenido real (dirección, mapa, fotos del local, testimonios de esa zona) — no plantillas clonadas cambiando solo el distrito.</li>
<li><strong>Schema LocalBusiness</strong> con dirección, teléfono, horario y geo — para que Google conecte web y ficha sin ambigüedad.</li>
<li><strong>Menciones locales naturales</strong>: directorios reales del rubro, prensa local, asociaciones. Cero granjas de enlaces.</li>
<li><strong>Contenido con intención local</strong>: precios en soles, distritos que atiendes, referencias que tu cliente reconoce.</li>
</ul>

<h2>Errores que te dejan fuera del mapa</h2>
<ol>
<li><strong>NAP inconsistente</strong>: un teléfono en la web, otro en la ficha, otro en Facebook.</li>
<li><strong>Ficha sin dueño reclamado</strong> o administrada por un tercero que ya no responde.</li>
<li><strong>Dirección virtual u oficina compartida</strong> reportada como local físico: riesgo de suspensión.</li>
<li><strong>Ignorar las reseñas negativas</strong>: Google y los clientes leen tus respuestas.</li>
<li><strong>Web lenta o sin versión móvil decente</strong>: el clic local es 90% celular.</li>
</ol>

<h2>¿SEO local o Google Ads local?</h2>
<p>No compiten: se complementan. El SEO local construye presencia estable que no pagas por clic; Ads te pone arriba HOY mientras el orgánico madura. La comparación completa está en <a href="/es/blogs/seo-vs-google-ads-peru-cual-conviene">SEO vs Google Ads en Perú</a>.</p>

<h2>Cierre</h2>
<p>El SEO local es de las inversiones más rentables para un negocio con zona de atención: le hablas a gente que está buscando exactamente lo tuyo, exactamente donde estás. En 3R Core lo trabajamos como parte del <a href="/es/posicionamiento-seo">servicio de posicionamiento SEO</a> — auditoría, ficha, señales locales y reporte mensual. Si quieres saber dónde estás parado hoy, <a href="/es/blogs/cuanto-cuesta-agencia-seo-lima-2026">aquí está lo que cuesta y lo que incluye</a>.</p>`,
  },
]
