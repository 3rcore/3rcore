import type { SeedPost } from "./posts"
import { WA_LEADS } from "@/lib/contact"

/**
 * 2 artículos es-US para MIAMI (11-nov-2026). Se sirven desde el código
 * (lib/blog-static/us-posts.ts), igual que los demás posts 'us'.
 *
 * POR QUÉ. Piero Roque (6-nov): «3R CORE USA es para MIAMI» y «hay que tratar de
 * competir en donde hayan búsquedas». Autocompletado Google es-US (11-nov):
 * «mejores agencias de marketing digital en miami», «cómo elegir una agencia de
 * marketing digital», «agencia de marketing digital en miami» (Semrush 170/mes),
 * «tiendas virtuales miami» / «tienda online miami» (20/mes), «tiendas online en
 * miami florida». Cada uno enlaza a su landing: /us/agencia-marketing-digital-miami
 * y /us/tiendas-virtuales-miami.
 *
 * ⚠️ CIFRAS. Precios de 3R Core = /us/precios. Sobre impuestos NO se da tasa ni
 * plazo (regla de los posts 'us' del 28-ago): se remite al contador y al
 * Florida Department of Revenue. Sin competidores con nombre. Sin dirección
 * de Miami (no hay oficina).
 */

const A = "Equipo 3R Core"
const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&q=80`
const WA = (t: string) => `https://wa.me/${WA_LEADS}?text=${encodeURIComponent(t)}`

export const MIAMI_US_POSTS: SeedPost[] = [
  {
    title: "Cómo elegir una agencia de marketing digital en Miami: 9 preguntas antes de firmar",
    slug: "como-elegir-agencia-de-marketing-digital-en-miami",
    locale: "us",
    excerpt:
      "La mejor agencia de marketing digital en Miami no es la que sale primero en un ranking: es la que te habla en el idioma de tus clientes, deja las cuentas a tu nombre y te muestra cuánto cuesta cada contacto. Nueve preguntas para comprobarlo.",
    featured_image: IMG("1533750349088-cd871a92f312"),
    featured_image_alt: "Hoja con las palabras Marketing Strategy sobre un escritorio con libros de marketing",
    meta_title: "Cómo elegir una agencia de marketing digital en Miami (2026)",
    meta_description:
      "9 preguntas para elegir agencia de marketing digital en Miami: español nativo, cuentas a tu nombre, reportes con costo por contacto y precios reales en dólares.",
    og_title: "Cómo elegir una agencia de marketing digital en Miami",
    og_description: "Nueve preguntas para separar a una agencia que vende resultados de una que vende publicaciones.",
    focus_keyword: "agencia de marketing digital en miami",
    author_name: A,
    content: `
<p><strong>Para elegir una agencia de marketing digital en Miami, compara tres cosas antes que el precio: si escribe en el español de tus clientes, si las cuentas de anuncios y analítica quedan a tu nombre y si su reporte mensual dice cuánto te costó cada contacto.</strong> Una agencia que falla en cualquiera de las tres te va a cobrar cada mes sin que puedas saber si funciona.</p>

<p>Miami tiene cientos de agencias y la mayoría se presenta igual: "estrategia", "crecimiento", "resultados". Estas nueve preguntas sirven para ver qué hay detrás. Úsalas en la primera llamada.</p>

<h2>1. ¿Escriben en español nativo o traducen del inglés?</h2>

<p><strong>En Miami, una campaña en español escrita desde cero rinde distinto a una traducida.</strong> El cliente hispano nota de inmediato un anuncio traducido palabra por palabra, y también nota cuando el anuncio está en español pero la página a la que llega está en inglés. Pide ejemplos de anuncios y páginas en español que la agencia haya escrito, no traducido.</p>

<h2>2. ¿Las cuentas quedan a mi nombre?</h2>

<p><strong>Google Ads, Meta Business, Google Analytics, Search Console y el dominio tienen que ser tuyos, con la agencia como usuario invitado.</strong> Si la agencia crea las cuentas a su nombre, el historial de campañas y los datos se quedan con ella el día que decidas cambiar. Es la pregunta que más problemas evita y la que menos gente hace.</p>

<h2>3. ¿Qué dice su reporte mensual?</h2>

<p><strong>Un buen reporte responde cuántos contactos o ventas llegaron, cuánto costó cada uno y qué se va a cambiar el mes siguiente.</strong> Si el reporte solo trae alcance, impresiones y seguidores, la agencia está midiendo su actividad, no tu negocio. Pide un reporte de ejemplo, con los datos del cliente tapados si hace falta.</p>

<h2>4. ¿Cuánto cobran y qué incluye?</h2>

<p><strong>Como referencia, en 3R Core un negocio que empieza invierte entre $750 y $1,400 al mes, una pyme entre $1,500 y $3,600 y una empresa mediana entre $3,600 y $9,000; el SEO solo cuesta $500 al mes.</strong> Esos son honorarios: lo que se invierte en anuncios se paga aparte, directo a Google o Meta. Desconfía de una propuesta que mezcla las dos cosas en una sola cifra, porque no sabrás cuánto llega de verdad a los anuncios.</p>

<table>
<tr><th>Etapa</th><th>Honorario mensual (3R Core)</th><th>Qué cubre</th></tr>
<tr><td>Negocio que empieza</td><td>$750 – $1,400</td><td>Redes sociales y anuncios básicos</td></tr>
<tr><td>Pequeña y mediana empresa</td><td>$1,500 – $3,600</td><td>Redes, anuncios, SEO y mejoras de la web</td></tr>
<tr><td>Empresa mediana</td><td>$3,600 – $9,000</td><td>Marketing completo con producción de contenido y optimización de conversiones</td></tr>
<tr><td>Solo SEO</td><td>$500</td><td>Auditoría, optimización, contenido y reporte</td></tr>
</table>

<p>Más detalle en <a href="/us/blogs/cuanto-cobra-una-agencia-de-marketing-digital-en-estados-unidos">cuánto cobra una agencia de marketing digital en Estados Unidos</a>.</p>

<h2>5. ¿Hay contrato de permanencia?</h2>

<p><strong>Lo razonable es mes a mes, o un mínimo corto que se justifique.</strong> El SEO necesita entre dos y tres meses para mostrar el primer movimiento, así que un compromiso de ese plazo tiene sentido. Un contrato de un año sin salida antes de ver un solo resultado protege a la agencia, no a ti.</p>

<h2>6. ¿Quién hace el trabajo?</h2>

<p><strong>Pregunta si el equipo es propio o si la agencia subcontrata.</strong> Muchas agencias venden la estrategia y pasan el diseño, los anuncios o la web a terceros. No está mal por sí solo, pero cuando algo falla nadie responde por todo. Con un solo equipo, la persona que hace tu página es la misma que mide si convierte.</p>

<h2>7. ¿Conocen cómo busca tu cliente en Miami?</h2>

<p><strong>Una agencia que conoce Miami sabe que no es lo mismo vender en Brickell que en Hialeah o en Doral.</strong> Pregunta cómo armaría tus campañas por zona e idioma. Si la respuesta es la misma que daría para cualquier ciudad, la agencia no está pensando en tu mercado.</p>

<h2>8. ¿Cómo y cuándo se comunican?</h2>

<p><strong>Define desde el inicio el canal (WhatsApp, correo o videollamada), el horario y cada cuánto hay reunión.</strong> En 3R Core trabajamos en horario del Este, con WhatsApp para el día a día y una reunión de resultados cada mes. Lo importante es que esté por escrito.</p>

<h2>9. ¿Qué pasa con mi web?</h2>

<p><strong>Los anuncios y el SEO terminan en tu página, así que si la web es lenta o no mide, la agencia va a gastar tu dinero en llevar tráfico a un lugar que no convierte.</strong> Una buena agencia revisa la web antes de lanzar campañas y te dice qué arreglar primero. Si necesitas una nueva, mira <a href="/us/diseno-web-miami">diseño web en Miami</a>.</p>

<h2>Preguntas frecuentes</h2>

<h3>¿Cuál es la mejor agencia de marketing digital en Miami?</h3>
<p>La que pasa estas nueve preguntas con tu negocio. Un ranking no sabe si vendes servicios o productos, si tus clientes buscan en español o cuánto puedes invertir. Pide propuestas a dos o tres agencias y compáralas con esta lista.</p>

<h3>¿Conviene una agencia local o una remota?</h3>
<p>Lo que importa es que trabaje en tu horario, conozca tu mercado y responda rápido. Hoy la mayoría de agencias de Miami trabaja por videollamada aunque tenga oficina en la ciudad.</p>

<h3>¿Cuánto tarda en verse un resultado?</h3>
<p>Google Ads y Meta Ads pueden traer contactos en las primeras semanas. El SEO suele mostrar el primer movimiento entre el segundo y el tercer mes.</p>

<h2>¿Quieres que revisemos tu caso?</h2>

<p>En <a href="/us/agencia-marketing-digital-miami">3R Core, agencia de marketing digital en Miami</a>, llevamos SEO, Google Ads, Meta Ads, redes sociales, email y web con un solo equipo y en español nativo. Mándanos tu web y lo que inviertes hoy: te respondemos en un día hábil con un plan y el honorario en dólares. <a href="/us/cotizar">Pide tu propuesta</a> o <a href="${WA("Hola 3R Core, leí la guía para elegir agencia en Miami y quiero una propuesta.")}" target="_blank" rel="noopener">escríbenos por WhatsApp</a>.</p>
`,
  },
  {
    title: "Cómo crear una tienda online en Miami: pasos, costos y plazos 2026",
    slug: "como-crear-una-tienda-online-en-miami",
    locale: "us",
    excerpt:
      "Crear una tienda online en Miami cuesta desde $1,750 con una agencia y toma de seis a diez semanas. Los pasos, la plataforma que conviene y lo que cambia cuando tus clientes compran en español y en inglés.",
    featured_image: IMG("1460925895917-afdab827c52f"),
    featured_image_alt: "Laptop con el panel de ventas y métricas de una tienda online",
    meta_title: "Cómo crear una tienda online en Miami: pasos y costos 2026",
    meta_description:
      "Pasos para crear tu tienda online en Miami: Shopify o WooCommerce, pagos, envíos, sales tax y tienda bilingüe. Desde $1,750 y lista en 6 a 10 semanas.",
    og_title: "Cómo crear una tienda online en Miami",
    og_description: "Pasos, plataforma, costos y plazos para vender online desde Miami en español e inglés.",
    focus_keyword: "tienda online miami",
    author_name: A,
    content: `
<p><strong>Para crear una tienda online en Miami necesitas elegir plataforma (Shopify o WooCommerce), cargar el catálogo, conectar los pagos, configurar envíos y sales tax, y medir cada venta. Con una agencia cuesta desde $1,750 y está lista en seis a diez semanas.</strong> Lo que cambia en Miami frente a otras ciudades es el idioma: buena parte de tus compradores va a buscar y comprar en español.</p>

<p>Esta guía va paso a paso. Si quieres el panorama de todo el país, lee <a href="/us/blogs/como-crear-una-tienda-online-en-estados-unidos">cómo crear una tienda online en Estados Unidos</a>.</p>

<h2>Paso 1: decide qué vas a vender y a quién</h2>

<p><strong>Antes de la plataforma, define el catálogo, el cliente y la zona de entrega.</strong> No es lo mismo vender 20 productos a clientes de Miami-Dade con recojo en tienda que 2,000 productos a todo Estados Unidos. Esa decisión define el tipo de tienda, los envíos y cuánto vas a invertir.</p>

<h2>Paso 2: elige Shopify o WooCommerce</h2>

<p><strong>Shopify conviene a la mayoría de negocios que quieren poco mantenimiento; WooCommerce conviene si ya tienes WordPress o necesitas reglas a medida.</strong></p>

<table>
<tr><th></th><th>Shopify</th><th>WooCommerce</th></tr>
<tr><td>Mantenimiento</td><td>Lo hace la plataforma</td><td>Lo haces tú o tu agencia</td></tr>
<tr><td>Costo fijo</td><td>Mensualidad de la plataforma</td><td>Hosting y extensiones</td></tr>
<tr><td>Ideal para</td><td>Catálogos estándar y equipos pequeños</td><td>Reglas especiales, B2B, sitios WordPress</td></tr>
</table>

<p>Revisa los planes vigentes directamente en la página de precios de cada plataforma: cambian con frecuencia.</p>

<h2>Paso 3: arma la tienda en español y en inglés</h2>

<p><strong>En Miami una tienda bilingüe vende a dos públicos con un solo catálogo.</strong> La versión en español debe tener sus propias URLs y hreflang, no un traductor automático encima: así Google la muestra a quien busca en español. Las fichas de producto se escriben en cada idioma pensando en cómo busca la gente, no traducidas palabra por palabra.</p>

<h2>Paso 4: conecta pagos, envíos y sales tax</h2>

<p><strong>Una tienda está lista cuando cobra, envía y calcula impuestos bien, no cuando se ve bonita.</strong></p>
<ul>
<li><strong>Pagos:</strong> pasarela conectada y probada con compras reales, incluidas billeteras digitales si la plataforma las admite.</li>
<li><strong>Envíos:</strong> zonas y tarifas, y recojo en tienda si atiendes clientes de Miami-Dade y Broward.</li>
<li><strong>Sales tax:</strong> la plataforma lo calcula, pero dónde debes cobrarlo y con qué tasa lo define tu contador según las reglas del Florida Department of Revenue y de los demás estados donde vendas. No configures impuestos de memoria.</li>
</ul>

<h2>Paso 5: mide cada venta desde el primer pedido</h2>

<p><strong>Sin eventos de compra en Google Analytics 4 y conversiones en Google y Meta, no sabrás qué anuncio vende.</strong> Configúralo antes de abrir, no después. Es lo que permite pasar dinero de lo que no funciona a lo que sí.</p>

<h2>Paso 6: lleva tráfico a la tienda</h2>

<p><strong>Una tienda nueva no recibe visitas sola.</strong> Lo habitual es combinar Google Shopping o Performance Max para quien ya busca el producto, anuncios de catálogo en Meta para recuperar visitantes y SEO para las fichas y colecciones. El SEO con 3R Core cuesta $500 al mes, sin permanencia.</p>

<h2>¿Cuánto cuesta y cuánto tarda?</h2>

<p><strong>Con 3R Core, una tienda en Shopify o WooCommerce cuesta desde $1,750 y toma de seis a diez semanas.</strong> La suscripción de la plataforma, las apps y las comisiones de pago se pagan aparte, directo al proveedor.</p>

<table>
<tr><th>Proyecto</th><th>Precio</th><th>Plazo</th></tr>
<tr><td>Tienda online en Shopify o WooCommerce</td><td>Desde $1,750</td><td>6 a 10 semanas</td></tr>
<tr><td>Landing para lanzar un producto</td><td>Desde $850</td><td>2 a 3 semanas</td></tr>
<tr><td>SEO para la tienda</td><td>$500 al mes</td><td>Sin permanencia</td></tr>
</table>

<h2>Preguntas frecuentes</h2>

<h3>¿Puedo vender por Instagram y por mi tienda a la vez?</h3>
<p>Sí. Shopify y WooCommerce conectan el catálogo con Instagram y Facebook, así el inventario es uno solo y las ventas se registran en la tienda.</p>

<h3>¿Puedo pasar mi tienda de Wix a Shopify sin perder Google?</h3>
<p>Sí, si cada URL vieja se redirige con un 301 a su equivalente nueva. Sin esas redirecciones se pierde el tráfico que ya tenías.</p>

<h3>¿Necesito una empresa en Florida para vender online?</h3>
<p>Depende de tu situación; consúltalo con tu contador o abogado. La tienda se puede preparar mientras resuelves ese trámite.</p>

<h2>¿Quieres tu tienda lista para vender?</h2>

<p>En <a href="/us/tiendas-virtuales-miami">3R Core hacemos tiendas virtuales en Miami</a> en Shopify y WooCommerce, en español e inglés, con pagos, envíos, sales tax y medición listos el día que abren. <a href="/us/cotizar">Cotiza tu tienda</a> o <a href="${WA("Hola 3R Core, leí la guía para crear una tienda online en Miami y quiero cotizar la mía.")}" target="_blank" rel="noopener">escríbenos por WhatsApp</a>. Si además quieres anuncios y redes con el mismo equipo, mira nuestra <a href="/us/agencia-marketing-digital-miami">agencia de marketing digital en Miami</a>.</p>
`,
  },
]
