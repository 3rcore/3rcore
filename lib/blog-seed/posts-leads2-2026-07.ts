/**
 * Blogs imán de LEADS — tanda 2 (2026-07) para 3rcore.com.
 * Amplían la captura buyer-intent en los 3 pilares (SEO · SEM · Tiendas):
 * guías de elección ("mejores agencias / cómo elegir") y verticales de alto
 * valor (inmobiliario, salud) que traen leads calificados al servicio.
 * CTA medible auto-inyectado por <BlogCTA> según el slug (ver SLUG_MAP).
 */
import type { SeedPost } from "./posts"

const AUTHOR = "Equipo 3R Core"
const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&q=80`

export const LEADS2_POSTS_2026_07: SeedPost[] = [
  {
    slug: "mejores-agencias-seo-lima-como-elegir-2026",
    // 28-sep-2026. Reescrito como guía de elección: con 567 palabras y el título
    // «Mejores agencias SEO en Lima» le quitaba «agencia seo en lima» a
    // /es/posicionamiento-seo (69 de 81 impresiones en 90 días) sin poder
    // competir con las listas de agencias. No nombra agencias: no hay datos
    // verificables del trabajo de otras y no se inventan.
    title: "Cómo elegir agencia SEO en Lima: 9 criterios y señales de alerta (2026)",
    focus_keyword: "como elegir agencia seo en lima",
    meta_title: "Cómo elegir agencia SEO en Lima: 9 criterios y alertas 2026",
    meta_description: "Cómo elegir agencia SEO en Lima: 9 criterios que puedes comprobar en la primera reunión, las preguntas que conviene hacer y las señales de alerta.",
    excerpt: "Guía para elegir agencia SEO en Lima: 9 criterios que puedes comprobar antes de firmar, las preguntas para la primera reunión, las señales de alerta y cuánto cuesta.",
    og_title: "Cómo elegir agencia SEO en Lima (2026)",
    og_description: "9 criterios que puedes comprobar, preguntas para la primera reunión y señales de alerta antes de firmar.",
    featured_image: IMG("1499750310107-5fef28a66643"),
    featured_image_alt: "Cómo elegir agencia SEO en Lima: criterios y checklist",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>Respuesta corta:</strong> para elegir una agencia SEO en Lima, pide cuatro cosas antes de firmar: acceso a tu propio Search Console desde el primer mes, un plan escrito de los tres primeros meses, un contrato sin permanencia forzosa y un reporte que muestre posiciones, clics y consultas en vez de una lista de tareas. Y descarta a quien te garantice el primer lugar en Google: el propio Google advierte que nadie puede garantizarlo. Abajo están los nueve criterios completos, las preguntas para la primera reunión y las señales de alerta.</p>
<p>Si ya estás comparando propuestas, puedes ver cómo trabajamos en 3R Core como <a href="/es/posicionamiento-seo">agencia SEO en Lima</a> y usar esta guía para medirnos con el mismo criterio que a las demás.</p>

<h2>¿Qué hace una agencia SEO (y qué no hace)?</h2>
<p>Una agencia SEO trabaja para que tu web salga en los resultados orgánicos de Google, los que no se pagan por clic. El trabajo tiene cuatro frentes: la parte técnica (que Google pueda rastrear e indexar tu web y que cargue rápido), el contenido (páginas que respondan lo que tu cliente busca), los enlaces (que otros sitios de tu rubro te mencionen) y, si atiendes en una zona, el SEO local con tu ficha de Google.</p>
<p>Lo que no hace es comprar posiciones. Los resultados marcados como «Patrocinado» son anuncios de Google Ads y se pagan aparte, con otro presupuesto.</p>

<h2>9 criterios para elegir agencia SEO en Lima</h2>
<p>Cada criterio lleva la forma de comprobarlo en la primera reunión, antes de pagar nada.</p>
<ol>
<li><strong>Acceso a tu Search Console desde el primer mes.</strong> La propiedad debe estar a tu nombre y eres tú quien le da acceso a la agencia, no al revés. Es la única forma de ver las posiciones en la fuente y no en un PDF.</li>
<li><strong>Una auditoría inicial con tu web dentro.</strong> Debe nombrar URLs, errores y prioridades concretas. Si el documento serviría igual para otra empresa, no es una auditoría.</li>
<li><strong>Un plan escrito de los tres primeros meses.</strong> Qué páginas se van a trabajar, para qué búsquedas y qué correcciones técnicas van primero.</li>
<li><strong>Reportes de resultados, no de tareas.</strong> Posiciones, clics, impresiones y las consultas que traen gente. «Publicamos cuatro artículos» es una tarea, no un resultado.</li>
<li><strong>Plazos honestos.</strong> En búsquedas comerciales, las posiciones estables llegan entre el tercer y el sexto mes. Quien promete primera página en 30 días está apostando con tu web.</li>
<li><strong>Enlaces conseguidos uno por uno.</strong> Menciones en sitios de tu rubro o de tu ciudad. Los paquetes de cientos de enlaces baratos son justo lo que Google penaliza.</li>
<li><strong>SEO local si vendes en Lima.</strong> Ficha de Google cuidada, reseñas y la misma dirección y teléfono en la web, en la ficha y en los directorios.</li>
<li><strong>Sin permanencia forzosa, y todo queda a tu nombre.</strong> El contenido, la web y las cuentas son tuyos si decides irte.</li>
<li><strong>Saber quién hace el trabajo.</strong> Pregunta quién escribe el contenido, quién toca la parte técnica y si algo se terceriza. La respuesta dice mucho de la calidad que vas a recibir.</li>
</ol>

<h2>Preguntas para la primera reunión</h2>
<ul>
<li>¿Qué incluye exactamente la mensualidad y qué se cobra aparte?</li>
<li>¿Qué van a hacer el primer mes, con nombre de páginas?</li>
<li>¿Cómo miden el éxito a los tres y a los seis meses?</li>
<li>¿Me dan acceso a Search Console y a Analytics desde el inicio?</li>
<li>¿El SEO local está incluido?</li>
<li>¿Qué pasa con el contenido y los accesos si termino el servicio?</li>
<li>¿Quién de su equipo va a trabajar mi cuenta?</li>
</ul>
<p>Las respuestas te dirán más que cualquier portafolio. Una agencia seria contesta todas sin rodeos.</p>

<h2>Señales de alerta</h2>
<ul>
<li>Te garantizan el primer lugar en Google. Nadie controla el algoritmo y Google lo dice en su guía sobre cómo contratar a un SEO.</li>
<li>No te dan acceso a Search Console o lo crean a nombre de la agencia.</li>
<li>El reporte mezcla todas las visitas sin separar las que llegan desde Google.</li>
<li>Te piden un contrato de doce meses sin salida.</li>
<li>El precio mensual no alcanza para horas reales de trabajo técnico y de redacción.</li>
<li>Proponen publicar decenas de artículos al mes escritos en automático y sin revisión.</li>
</ul>

<h2>¿Cuánto cuesta una agencia SEO en Lima?</h2>
<p>Depende de la competencia de tu rubro y del tamaño de tu web, no de la ciudad. Los rangos por nivel de competencia están en la guía de <a href="/es/blogs/cuanto-cuesta-agencia-seo-lima-2026">cuánto cuesta una agencia SEO en Lima</a>, y qué sube o baja el precio, en <a href="/es/cuanto-cuesta-el-seo-en-peru">cuánto cuesta el SEO en Perú</a>. Como referencia, en 3R Core el plan de <a href="/es/posicionamiento-seo">posicionamiento SEO</a> parte de S/1,800 al mes, sin permanencia. Los montos son referenciales.</p>

<h2>¿Agencia, freelance o equipo propio?</h2>
<p>Una agencia junta técnico, contenido y enlaces bajo un solo contrato. Un freelance te da trato directo, pero todo depende de una persona. Un equipo propio conoce tu negocio a diario, aunque el SEO pide varios perfiles y uno solo rara vez los cubre. Elige según quién vaya a revisar el trabajo en tu empresa: si nadie lo va a revisar, necesitas a alguien que reporte con datos que puedas comprobar.</p>

<h2>¿SEO o Google Ads mientras tanto?</h2>
<p>El SEO tarda meses en rendir. Si necesitas consultas esta semana, la pauta en <a href="/es/servicios/google-ads">Google Ads</a> las trae mientras las posiciones orgánicas maduran. Lo comparamos con calma en <a href="/es/blogs/seo-vs-google-ads-peru-cual-conviene">SEO vs Google Ads: cuál conviene</a>.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuál es la mejor agencia SEO en Lima?</h3>
<p>La que cumpla los nueve criterios de arriba para tu caso. No publicamos un ranking de agencias porque no tenemos datos verificables del trabajo de las demás, y una lista sin datos no te ayuda a decidir. Lo útil es pedir la misma información a cada una y comparar.</p>
<h3>¿En cuánto tiempo se ven resultados?</h3>
<p>Los primeros movimientos suelen verse alrededor del tercer mes en búsquedas de baja competencia, y las posiciones estables en búsquedas comerciales, entre el tercer y el sexto mes.</p>
<h3>¿Qué le tengo que dar a la agencia para empezar?</h3>
<p>Acceso a Search Console, a Analytics y al gestor de tu web, además de lo que sabes de tu cliente: qué vendes, a quién y qué te preguntan antes de comprar. Esa información vale más que cualquier herramienta.</p>
<h3>¿Me conviene una agencia que también haga Google Ads?</h3>
<p>Ayuda que el mismo equipo vea los dos canales, porque las búsquedas que convierten en Ads dicen qué páginas conviene posicionar. Pregunta, eso sí, cómo te van a recomendar el reparto del presupuesto.</p>

<h2>Cierre</h2>
<p>Con estos criterios puedes comparar agencias con datos y no con promesas. Si quieres ver cómo los cumplimos nosotros, en la página de <a href="/es/posicionamiento-seo">agencia SEO en Lima de 3R Core</a> está cómo trabajamos mes a mes, qué incluye el plan y el formulario para pedir tu cotización.</p>`,
  },
  {
    slug: "agencia-google-ads-inmobiliarias-lima",
    title: "Agencia de Google Ads para inmobiliarias en Lima: cómo generar leads de calidad",
    focus_keyword: "google ads para inmobiliarias lima",
    meta_title: "Google Ads para inmobiliarias en Lima 2026 — Leads de calidad | 3R Core",
    meta_description: "Cómo usar Google Ads para inmobiliarias en Lima: campañas Search y Performance Max para captar leads calificados de compradores de departamentos, con tracking real.",
    excerpt: "Google Ads para inmobiliarias y desarrolladores en Lima: qué campañas usar, cómo bajar el costo por lead, filtrar curiosos y medir el ROI real de cada proyecto.",
    og_title: "Google Ads para inmobiliarias en Lima 2026",
    og_description: "Campañas para captar compradores reales de departamentos, bajar el costo por lead y medir el ROI por proyecto.",
    featured_image: IMG("1560518883-ce09059eeffa"),
    featured_image_alt: "Google Ads para inmobiliarias en Lima leads de calidad",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>Resumen ejecutivo:</strong> el sector inmobiliario en Lima es de <strong>ticket alto y ciclo largo</strong>, así que la meta de <strong>Google Ads para inmobiliarias</strong> no es volumen de clics, sino <strong>leads calificados</strong> (personas con intención y capacidad de compra) al menor costo por lead posible. Eso se logra combinando campañas Search de alta intención, Performance Max con buenas señales de audiencia, formularios que filtran curiosos y tracking que conecta el lead con la venta real. Aquí te explicamos cómo lo hacemos en 3R Core como <a href="/es/servicios/google-ads">agencia de Google Ads en Lima</a>.</p>

<h2>Qué campañas funcionan para inmobiliarias</h2>
<ul>
<li><strong>Search por proyecto y zona:</strong> "departamentos en Surco", "proyecto en planos Miraflores". Alta intención, ideal para capturar demanda existente.</li>
<li><strong>Performance Max:</strong> multicanal con audience signals de tu CRM (compradores previos, listas). Escala una vez que tienes data de conversiones.</li>
<li><strong>YouTube y Display de remarketing:</strong> el comprador inmobiliario investiga semanas; el remarketing lo mantiene cerca de tu marca.</li>
<li><strong>Local y Maps</strong> para tu caseta o sala de ventas.</li>
</ul>

<h2>Cómo bajar el costo por lead y filtrar curiosos</h2>
<ol>
<li><strong>Palabras clave negativas</strong> curadas semanalmente (alquiler, trabajo, planos gratis) para no pagar por tráfico irrelevante.</li>
<li><strong>Formularios con campos que califican</strong> (rango de presupuesto, zona, plazo de compra).</li>
<li><strong>Segmentación por zona y capacidad</strong> para concentrar el presupuesto en tu comprador ideal.</li>
<li><strong>Enhanced conversions y conversiones offline</strong> para saber qué campaña trae leads que <em>sí</em> compran, no solo los que llenan formularios. Aprende a medirlo en <a href="/es/blogs/pixel-meta-api-conversiones-peru-configurar">cómo configurar el seguimiento de conversiones</a>.</li>
</ol>

<h2>Medir el ROI por proyecto</h2>
<p>El error típico es medir por "cantidad de leads". Lo correcto: costo por lead calificado y, sobre todo, <strong>costo por venta</strong> y ROAS por proyecto. Para el ciclo largo del inmobiliario, esto exige conectar Google Ads con tu CRM. Complementa la captación con <a href="/es/blogs/marketing-digital-inmobiliarias-peru-generar-leads-calidad">marketing digital para inmobiliarias</a> y con <a href="/es/posicionamiento-seo">SEO</a> para posicionar tus proyectos de forma orgánica.</p>

<h2>Preguntas frecuentes</h2>
<p><strong>¿Cuánto invertir?</strong> Depende del ticket y la meta de ventas, pero por el CPC del sector conviene un presupuesto que permita juntar data (referencia: desde ~S/1,500/mes de pauta + fee de gestión). Ver <a href="/es/blogs/cuanto-cuesta-google-ads-lima-agencia-2026">cuánto cuesta Google Ads en Lima</a>.</p>
<p><strong>¿Google Ads o redes?</strong> Google capta intención (busca ahora); redes construyen deseo. Lo ideal es combinarlos.</p>

<h2>Cierre</h2>
<p>Una campaña inmobiliaria rentable se mide en departamentos vendidos, no en clics. Si quieres leads calificados para tu proyecto, pide una <strong>auditoría gratuita de tu cuenta</strong> y te decimos qué está fugando presupuesto. Conoce la <a href="/es/servicios/google-ads">gestión de Google Ads</a>.</p>`,
  },
  {
    slug: "agencia-google-ads-clinicas-dentistas-lima",
    title: "Google Ads para clínicas y dentistas en Lima: llena tu agenda de pacientes",
    focus_keyword: "google ads para clinicas lima",
    meta_title: "Google Ads para clínicas y dentistas en Lima 2026 | 3R Core",
    meta_description: "Google Ads para clínicas, dentistas y centros estéticos en Lima: campañas Search y Local para captar pacientes, con call tracking y medición de citas reales.",
    excerpt: "Cómo usar Google Ads para llenar la agenda de tu clínica o consultorio en Lima: campañas de búsqueda y Maps, call tracking, y cómo medir pacientes reales, no solo clics.",
    og_title: "Google Ads para clínicas y dentistas en Lima 2026",
    og_description: "Campañas Search y Local para captar pacientes, con call tracking y medición de citas reales.",
    featured_image: IMG("1629909613654-28e377c37b09"),
    featured_image_alt: "Google Ads para clínicas y dentistas en Lima captar pacientes",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>Resumen ejecutivo:</strong> las personas buscan "dentista cerca", "implante dental precio" o "clínica estética en Miraflores" con <strong>intención inmediata</strong>. Por eso <strong>Google Ads es de los canales más rentables para clínicas y consultorios en Lima</strong>: aparecer justo cuando alguien busca tu servicio, con anuncios en Search y en Google Maps, y llevar esa intención a una cita agendada. La clave es medir <strong>pacientes reales</strong> (llamadas y citas), no clics.</p>

<h2>Campañas que llenan agenda</h2>
<ul>
<li><strong>Search por servicio y zona:</strong> "ortodoncia en Surco", "limpieza dental Miraflores". Alta intención de agendar.</li>
<li><strong>Local Search Ads en Google Maps:</strong> ideal para consultorios físicos, con direcciones y llamadas directas.</li>
<li><strong>Remarketing:</strong> el paciente compara; mantente presente mientras decide.</li>
<li><strong>Performance Max</strong> cuando ya tienes data de conversiones para escalar.</li>
</ul>

<h2>Call tracking: el detalle que casi nadie mide</h2>
<p>En salud, muchos pacientes <strong>llaman</strong> en vez de llenar un formulario. Sin <strong>call tracking</strong>, no sabes qué anuncio generó la llamada y optimizas a ciegas. Configuramos seguimiento de llamadas y conversiones para atribuir cada cita a su campaña. Entiende la base en <a href="/es/blogs/pixel-meta-api-conversiones-peru-configurar">seguimiento de conversiones</a>.</p>

<h2>Cumplimiento y sensibilidad</h2>
<p>La publicidad de salud tiene políticas específicas de Google (afirmaciones, contenido sensible). Una gestión seria las respeta para evitar desaprobaciones y suspensiones. También conviene cuidar la reputación: reseñas y <a href="/es/posicionamiento-seo">SEO local</a> refuerzan la confianza del paciente antes de agendar.</p>

<h2>¿Google Ads o Meta Ads para clínicas?</h2>
<p>Google capta a quien <em>ya busca</em> tu servicio (demanda existente); Meta genera demanda y funciona muy bien para estética. Muchas clínicas combinan ambos. Si te interesa el lado social, revisa <a href="/es/blogs/meta-ads-clinicas-dentales-esteticas-lima">Meta Ads para clínicas dentales y estéticas</a>.</p>

<h2>Cierre</h2>
<p>Cada sillón vacío es dinero perdido. Con Google Ads bien medido, conviertes búsquedas en citas. Pide una <strong>auditoría gratuita</strong> de tu cuenta y te decimos cómo bajar tu costo por paciente. Conoce la <a href="/es/servicios/google-ads">gestión de Google Ads</a>.</p>`,
  },
  {
    slug: "cuanto-cuesta-mantener-tienda-virtual-peru-2026",
    title: "Cuánto cuesta mantener una tienda virtual en Perú 2026 (costos mensuales reales)",
    focus_keyword: "cuanto cuesta mantener una tienda virtual",
    meta_title: "Cuánto cuesta mantener una tienda virtual en Perú 2026 | 3R Core",
    meta_description: "Costos mensuales reales de mantener una tienda virtual en Perú 2026: plataforma, hosting, pasarela de pago, comisiones, soporte y marketing. Con tabla por plataforma.",
    excerpt: "No solo cuesta crearla: mantener una tienda virtual en Perú tiene costos mensuales (plataforma, pasarela, comisiones, soporte, marketing). Aquí el desglose real para no llevarte sorpresas.",
    og_title: "Cuánto cuesta mantener una tienda virtual en Perú 2026",
    og_description: "Costos mensuales reales: plataforma, hosting, pasarela, comisiones, soporte y marketing.",
    featured_image: IMG("1563013544-824ae1b704d3"),
    featured_image_alt: "Cuánto cuesta mantener una tienda virtual en Perú costos mensuales",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>Resumen ejecutivo:</strong> crear la tienda es solo el primer costo. <strong>Mantener una tienda virtual en Perú</strong> implica gastos mensuales: plataforma (o hosting), pasarela de pago con su <strong>comisión por transacción</strong>, dominio, soporte/actualizaciones y —el más importante para vender— marketing. Una tienda pequeña se sostiene desde <strong>~S/150–400/mes</strong> en costos fijos, sin contar pauta ni comisiones. Este desglose te evita sorpresas y te ayuda a presupuestar bien.</p>

<h2>Costos mensuales de una tienda virtual</h2>
<table>
<thead><tr><th>Concepto</th><th>Costo aprox. (PEN)</th><th>Notas</th></tr></thead>
<tbody>
<tr><td><strong>Plataforma / hosting</strong></td><td>S/0 – S/180/mes</td><td>Shopify ~USD 39; Tiendanube desde S/89; WooCommerce solo hosting</td></tr>
<tr><td><strong>Dominio</strong></td><td>~S/5/mes</td><td>Renovación anual (~S/60/año)</td></tr>
<tr><td><strong>Comisión pasarela</strong></td><td>~3–4% por venta</td><td>Culqi, Niubiz, Izipay, Mercado Pago</td></tr>
<tr><td><strong>Soporte / actualizaciones</strong></td><td>S/100 – S/500/mes</td><td>Opcional; recomendable para no quedarte desactualizado</td></tr>
<tr><td><strong>Marketing (SEO/Ads)</strong></td><td>Variable</td><td>Lo que realmente trae ventas</td></tr>
</tbody>
</table>
<p>La comisión de la pasarela es un porcentaje, no un fijo: crece con tus ventas (lo cual es buena señal). Compara pasarelas en <a href="/es/blogs/pasarelas-pago-tienda-online-peru">pasarelas de pago para tu tienda online</a>.</p>

<h2>El costo que la gente olvida: marketing</h2>
<p>Una tienda sin visitas no vende, por más bonita que sea. El costo más determinante no es el hosting: es <strong>atraer tráfico</strong> con <a href="/es/posicionamiento-seo">SEO</a> y <a href="/es/servicios/google-ads">Google Ads</a> (incluido Shopping). Presupuesta esto desde el inicio. Lee <a href="/es/blogs/seo-para-ecommerce-tienda-online-peru">SEO para e-commerce</a> y <a href="/es/blogs/google-ads-shopping-tiendas-online-peru">Google Ads Shopping para tiendas</a>.</p>

<h2>Cómo bajar los costos sin arruinar la tienda</h2>
<ul>
<li>Elige la plataforma según tu caso real, no la de moda: ver <a href="/es/blogs/shopify-woocommerce-tiendanube-peru-cual-elegir">Shopify vs WooCommerce vs Tiendanube</a>.</li>
<li>Evita plugins/apps que no usas (en Shopify suman mensualidades).</li>
<li>Invierte en velocidad y SEO desde el inicio: reduce tu dependencia de pauta pagada.</li>
</ul>

<h2>Cierre</h2>
<p>Mantener una tienda virtual es asequible si presupuestas bien y priorizas lo que trae ventas. Si quieres una tienda rápida, optimizada y pensada para vender —con los costos claros desde el inicio— conoce nuestro servicio de <a href="/es/tiendas-virtuales-lima">tiendas virtuales</a> o revisa <a href="/es/blogs/cuanto-cuesta-tienda-virtual-peru-2026">cuánto cuesta crearla</a>.</p>`,
  },
  {
    slug: "tienda-virtual-o-vender-en-marketplace-peru",
    title: "¿Tienda virtual propia o vender en marketplace? Guía para decidir (Perú 2026)",
    focus_keyword: "tienda virtual o marketplace",
    meta_title: "Tienda virtual propia vs marketplace en Perú 2026 — Cuál conviene | 3R Core",
    meta_description: "Tienda virtual propia vs vender en marketplace (Mercado Libre, Falabella) en Perú: comisiones, control, marca, datos del cliente y cuál conviene según tu caso.",
    excerpt: "¿Conviene una tienda virtual propia o vender en un marketplace en Perú? Comparamos comisiones, control de marca, datos del cliente y rentabilidad para que decidas con criterio.",
    og_title: "Tienda virtual propia vs marketplace en Perú 2026",
    og_description: "Comisiones, control de marca, datos del cliente y rentabilidad: cuál conviene según tu caso.",
    featured_image: IMG("1441986300917-64674bd600d8"),
    featured_image_alt: "Tienda virtual propia vs marketplace en Perú cuál conviene",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>Resumen ejecutivo:</strong> el <strong>marketplace</strong> (Mercado Libre, Falabella, Linio) te da tráfico inmediato pero cobra <strong>comisiones altas (10–20%+)</strong>, no te da los datos del cliente y diluye tu marca. La <strong>tienda virtual propia</strong> exige atraer tu propio tráfico, pero te deja el margen, la marca y la relación con el cliente. La respuesta rara vez es "una u otra": la estrategia ganadora en Perú suele ser <strong>usar el marketplace para volumen y construir tu tienda propia para rentabilidad y marca</strong>. Aquí el criterio para decidir.</p>

<h2>Comparación directa</h2>
<table>
<thead><tr><th>Factor</th><th>Marketplace</th><th>Tienda propia</th></tr></thead>
<tbody>
<tr><td><strong>Tráfico</strong></td><td>Inmediato (ya tiene visitas)</td><td>Lo construyes con SEO/Ads</td></tr>
<tr><td><strong>Comisión</strong></td><td>Alta (10–20%+ por venta)</td><td>Solo la pasarela (~3–4%)</td></tr>
<tr><td><strong>Datos del cliente</strong></td><td>No son tuyos</td><td>Tuyos (email, retargeting, recompra)</td></tr>
<tr><td><strong>Marca</strong></td><td>Diluida entre competidores</td><td>100% tuya</td></tr>
<tr><td><strong>Control</strong></td><td>Reglas del marketplace</td><td>Total</td></tr>
</tbody>
</table>

<h2>Cuándo conviene cada uno</h2>
<ul>
<li><strong>Empieza en marketplace</strong> si validas producto, necesitas ventas ya y aún no tienes presupuesto de marketing.</li>
<li><strong>Prioriza tienda propia</strong> si quieres margen, construir marca, tener los datos del cliente para recompra, y dejar de pagar comisiones que se comen tu utilidad.</li>
<li><strong>Combina ambos</strong> (lo más común y rentable): marketplace para volumen y descubrimiento; tienda propia para clientes recurrentes y campañas de marca.</li>
</ul>

<h2>El punto clave: la recompra vive en tu tienda</h2>
<p>En el marketplace, el cliente es del marketplace. En tu <a href="/es/tiendas-virtuales-lima">tienda virtual propia</a> puedes recuperar el email, hacer email marketing, remarketing y fidelizar — ahí está la rentabilidad de largo plazo. Para atraer ese tráfico propio necesitas <a href="/es/posicionamiento-seo">SEO</a> y <a href="/es/servicios/google-ads">Google Ads</a>. Mira también <a href="/es/blogs/como-crear-tienda-online-que-venda-peru">cómo crear una tienda online que venda</a>.</p>

<h2>Cierre</h2>
<p>La decisión no es ideológica, es de rentabilidad: usa el marketplace como canal, pero construye tu activo propio. Si quieres una tienda virtual pensada para captar y fidelizar clientes, conoce nuestro servicio de <a href="/es/tiendas-virtuales-lima">tiendas virtuales</a>.</p>`,
  },
]
