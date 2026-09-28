/**
 * REFRESH tanda 28-jul-2026 — 2 rewrites de posts legacy CON impresiones
 * reales en Bing pero CTR 0 (content manager ~570 imp/mes pos 6-9) o con
 * problemas de calidad (parafrasist: typos, afirmaciones sin verificar), + 1
 * post nuevo validado por query real ("perú 2026 tarifas google ads meta ads
 * linkedin tiktok" pos 3 en Bing) que funciona como hub de los posts de pauta
 * existentes SIN canibalizarlos (intención comparativa multi-plataforma).
 * Precios: SOLO los publicados en /precios. Autor = Piero Roque (persona
 * real, rompe el footprint de autor genérico).
 */
import type { SeedPost } from "./posts"

const AUTHOR = "Piero Roque"
const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&q=80`

export const REFRESH_POSTS_2026_07_28: SeedPost[] = [
  // ───────────── REWRITE #1 — content manager (~570 imp/mes en Bing, CTR 0) ─────────────
  {
    slug: "que-es-el-content-manager-y-cuales-son-sus-objetivos",
    title: "Content Manager: qué es, funciones y objetivos (guía 2026)",
    focus_keyword: "content manager",
    meta_title: "Content Manager: Qué es, Funciones y Objetivos (Guía 2026)",
    meta_description: "Qué hace un content manager: funciones, objetivos, en qué se diferencia del community manager, qué habilidades necesita y cuándo tu negocio debería tercerizarlo.",
    excerpt: "El content manager es quien decide qué contenido publica tu marca, dónde y para qué. Funciones, objetivos, diferencias con el community manager y cuándo conviene tercerizar el puesto.",
    og_title: "Content Manager: qué es, funciones y objetivos",
    og_description: "Funciones reales del content manager, diferencias con el community manager y cuándo tercerizarlo.",
    featured_image: IMG("1552664730-d307ca884978"),
    featured_image_alt: "Content manager planificando el calendario de contenidos de una marca",
    author_name: AUTHOR,
    content: `<p class="lead">El <strong>content manager</strong> es el responsable de la estrategia de contenidos de una marca: decide <em>qué</em> se publica, <em>dónde</em>, <em>con qué objetivo</em> y <em>cómo se mide</em>. No es el que "sube posts" — ese es un error común que aclaramos abajo — sino quien conecta el contenido con los objetivos del negocio: visibilidad, posicionamiento y ventas. En esta guía vemos sus funciones reales, sus objetivos, en qué se diferencia del community manager y cuándo a un negocio le conviene tercerizar el rol.</p>

<h2>Qué es un content manager</h2>
<p>Es el perfil que <strong>planifica, produce (o coordina) y mide el contenido</strong> de una marca en todos sus canales: blog, redes sociales, email, YouTube o el propio sitio web. Su trabajo empieza antes de publicar — investigando qué busca y qué necesita la audiencia — y termina después de publicar, analizando qué funcionó y qué no.</p>
<p>En equipos grandes coordina a redactores, diseñadores y editores de video. En una pyme peruana, es común que una sola persona (interna o de una <a href="/es/servicios/socialmedia">agencia de contenido y redes</a>) cubra el rol completo.</p>

<h2>Funciones de un content manager</h2>
<ul>
<li><strong>Estrategia y calendario editorial:</strong> define temas, formatos y frecuencia por canal, alineados a los objetivos del negocio y a las temporadas de venta.</li>
<li><strong>Investigación de audiencia y palabras clave:</strong> qué busca tu cliente en Google, qué consume en redes y qué preguntas hace antes de comprar.</li>
<li><strong>Producción y edición:</strong> redacta o coordina artículos, guiones, piezas gráficas y videos, cuidando la voz de la marca.</li>
<li><strong>Optimización SEO:</strong> títulos, estructura, enlazado interno y actualización de contenidos que ya posicionan (trabaja de la mano con el <a href="/es/posicionamiento-seo">posicionamiento SEO</a>).</li>
<li><strong>Distribución:</strong> decide cómo se adapta cada pieza a blog, redes, email o video — un mismo tema puede rendir en tres formatos.</li>
<li><strong>Medición:</strong> tráfico, engagement, leads y ventas atribuibles al contenido. Sin medición, el contenido es un gasto, no una inversión.</li>
</ul>

<h2>Objetivos de un content manager</h2>
<ol>
<li><strong>Visibilidad:</strong> que la marca aparezca donde su cliente busca — en Google, en redes y, cada vez más, en los asistentes de IA que citan contenido útil.</li>
<li><strong>Autoridad:</strong> construir confianza publicando contenido que responde preguntas reales del cliente mejor que la competencia.</li>
<li><strong>Tráfico calificado:</strong> atraer visitas con intención, no volumen vacío.</li>
<li><strong>Conversión:</strong> que el contenido empuje al lector al siguiente paso — cotizar, agendar, comprar.</li>
<li><strong>Retención:</strong> mantener a los clientes actuales informados y comprometidos con la marca.</li>
</ol>

<h2>Content manager vs community manager: no son lo mismo</h2>
<p>Es la confusión más frecuente. El <strong>content manager</strong> es estratégico: define el plan de contenidos de todos los canales y lo mide. El <strong>community manager</strong> es operativo y conversacional: gestiona la comunidad en redes sociales — publica, responde comentarios y mensajes, y cuida la reputación día a día. En equipos chicos una misma persona hace ambos, pero son responsabilidades distintas: uno diseña el mapa, el otro conduce en la pista. Si te interesa el lado operativo, aquí explicamos <a href="/es/blogs/cuanto-cuesta-community-manager-redes-lima-2026">cuánto cuesta un community manager en Lima</a>.</p>

<h2>Habilidades que necesita</h2>
<ul>
<li>Redacción y edición sólidas (la base de todo).</li>
<li>SEO: entender cómo busca la gente y cómo estructurar contenido que posicione.</li>
<li>Analítica: leer Google Analytics 4 y los insights de cada red para decidir con datos.</li>
<li>Criterio visual y de formato: saber cuándo un tema es un artículo, un carrusel o un video.</li>
<li>Gestión de proyectos: calendario, plazos y coordinación con diseño y video.</li>
</ul>

<h2>¿Cuándo conviene tercerizar el content management?</h2>
<p>Contratar un content manager interno tiene sentido cuando el contenido es el corazón del negocio (medios, e-commerce grande, educación). Para la mayoría de pymes, tercerizarlo con una agencia suele ser más eficiente: pagas por el resultado (estrategia + producción + medición) sin asumir un sueldo fijo más herramientas. Como referencia, en 3R Core el <a href="/es/servicios/socialmedia">manejo de redes con estrategia de contenido</a> parte desde S/1,500 al mes e incluye la planificación editorial, el diseño de piezas y el reporte mensual.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿El content manager escribe todo el contenido?</h3>
<p>No necesariamente. En equipos con presupuesto, coordina a redactores y diseñadores; en equipos chicos, produce él mismo. Lo que nunca delega es la estrategia y la medición.</p>
<h3>¿Qué estudia un content manager?</h3>
<p>Suelen venir de comunicaciones, marketing o periodismo, pero pesa más el portafolio: contenido publicado que haya generado resultados medibles.</p>
<h3>¿El contenido con IA reemplaza al content manager?</h3>
<p>No. La IA acelera la producción, pero la estrategia — qué publicar, para quién, con qué objetivo y cómo medirlo — sigue siendo el trabajo del content manager. El contenido genérico sin criterio es justamente lo que Google y los lectores descartan.</p>

<h2>Cierre</h2>
<p>Un buen content manager convierte el contenido en un canal de ventas: menos publicaciones al azar, más piezas con objetivo y medición. Si tu marca publica sin estrategia — o dejó de publicar — en 3R Core armamos el plan editorial, producimos el contenido y te mostramos los resultados en un <a href="/es/servicios/socialmedia">reporte mensual</a>. <a href="/es#contacto">Conversemos</a>.</p>`,
  },

  // ───────────── REWRITE #2 — parafrasist (landing orgánica top, typos y afirmaciones caducas) ─────────────
  {
    slug: "parafrasist-la-mejor-herramienta-para-resumir-textos",
    title: "Parafrasist: qué es y cómo usarla para resumir y parafrasear textos",
    focus_keyword: "parafrasist",
    meta_title: "Parafrasist: qué es y cómo usarla para resumir textos | 3R Core",
    meta_description: "Qué es Parafrasist, para qué sirve, cómo usarla bien para resumir y parafrasear textos sin caer en plagio, y qué alternativas existen en 2026.",
    excerpt: "Parafrasist es una herramienta en español para parafrasear y resumir textos. Qué hace, cómo usarla de forma correcta en trabajos académicos y qué alternativas tienes en 2026.",
    og_title: "Parafrasist: qué es y cómo usarla bien",
    og_description: "Guía honesta de Parafrasist: usos correctos, límites y alternativas para resumir y parafrasear textos.",
    featured_image: IMG("1455390582262-044cdead277a"),
    featured_image_alt: "Estudiante resumiendo y parafraseando textos en su laptop",
    author_name: AUTHOR,
    content: `<p class="lead"><strong>Parafrasist</strong> es una herramienta en español pensada para <strong>parafrasear y resumir textos</strong>: le pegas un párrafo o un documento y te devuelve una versión reescrita o condensada. Se hizo popular entre estudiantes y redactores porque funciona en español y es simple de usar. En esta guía te contamos qué hace, cómo usarla <em>bien</em> — sobre todo en contextos académicos — y qué alternativas tienes en 2026.</p>
<p>Una aclaración antes de empezar: parafrasear textos no hace que una web suba en Google. Eso es trabajo de estrategia, contenido propio y enlaces, que es lo que hacemos en 3R Core como <a href="/es/posicionamiento-seo">agencia SEO en Lima</a>.</p>

<h2>Qué es Parafrasist y para qué sirve</h2>
<p>Es una aplicación web de procesamiento de texto en español con dos usos principales:</p>
<ul>
<li><strong>Parafrasear:</strong> reescribir una idea con otras palabras manteniendo el sentido. Útil para evitar repetir textualmente una fuente o para simplificar un texto denso.</li>
<li><strong>Resumir:</strong> condensar un texto largo extrayendo sus ideas principales. Útil para estudiar, preparar fichas o revisar bibliografía extensa.</li>
</ul>
<p>Herramientas así ahorran tiempo, pero no reemplazan la lectura crítica: el resultado siempre necesita revisión humana, porque el software puede alterar matices o perder precisión técnica.</p>

<h2>Cómo usarla bien (y no meterte en problemas)</h2>
<ol>
<li><strong>Úsala como borrador, no como versión final.</strong> Revisa que la reescritura conserve el sentido exacto de la fuente.</li>
<li><strong>Cita siempre la fuente original.</strong> Parafrasear no elimina la obligación de citar: cambiar las palabras de un autor sin citarlo sigue siendo plagio en cualquier universidad.</li>
<li><strong>Verifica datos y cifras.</strong> Al resumir, estas herramientas pueden omitir el contexto de un dato. Contrasta contra el original antes de usarlo.</li>
<li><strong>Cuidado con textos técnicos o legales.</strong> Un matiz mal parafraseado cambia el significado. En esos casos, parafrasea tú y usa la herramienta solo como apoyo.</li>
</ol>

<h2>Límites de este tipo de herramientas</h2>
<p>Ninguna herramienta de paráfrasis "entiende" el texto como un humano: reordenan y sustituyen palabras con modelos de lenguaje. Eso implica tres límites prácticos: pueden producir frases gramaticalmente raras, pueden perder precisión en términos técnicos y no distinguen entre una idea central y una secundaria tan bien como un lector atento. Además, los detectores de las universidades evolucionan constantemente: la paráfrasis automática sin cita ni comprensión propia es fácil de detectar y es mala práctica académica.</p>

<h2>Alternativas a Parafrasist en 2026</h2>
<p>Si trabajas con textos en español, vale la pena probar dos o tres opciones con el mismo párrafo antes de quedarte con una. Estas son las que más se usan:</p>
<h3>Smodin</h3>
<p><a href="/es/blogs/smodin-herramienta-seo-para-parafrasear-y-reescribir-textos">Smodin</a> parafrasea en español y además tiene funciones de reescritura pensadas para contenido web.</p>
<h3>Reescribir textos de Scribbr (con QuillBot)</h3>
<p>Scribbr, conocido por sus guías de normas APA, tiene una herramienta gratuita para reescribir textos en español que funciona con la tecnología de QuillBot. Según su propia web (consultada en setiembre de 2026), no pide registro. Encaja bien con trabajos universitarios porque el mismo sitio tiene un generador de citas.</p>
<h3>Asistentes de IA generalistas</h3>
<p>ChatGPT, Claude o Gemini parafrasean y resumen con más contexto: puedes pedirles un tono o un largo concreto. Exigen el mismo cuidado con las citas y conviene revisar cada dato que devuelven.</p>
<p>Para trabajos académicos, tenemos una guía completa de <a href="/es/blogs/10-herramientas-ia-que-debes-conocer-para-tu-tesis">herramientas de IA para tu tesis</a> con opciones para investigar, organizar y redactar.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Parafrasist es gratis?</h3>
<p>Tiene un plan gratuito y uno de pago. Según su propia web (consultada en setiembre de 2026), el plan gratuito resume textos de hasta 5.000 caracteres y el de pago, de hasta 400.000. Los límites pueden cambiar, así que revisa las condiciones vigentes en parafrasist.com antes de depender de ella para un trabajo largo.</p>
<h3>¿Usar Parafrasist es plagio?</h3>
<p>La herramienta no comete plagio: el plagio depende de cómo la uses. Si presentas ideas de otro autor — parafraseadas o no — sin citarlo, es plagio. Si citas la fuente y usas la paráfrasis para expresar la idea con tus palabras, es una práctica válida.</p>
<h3>¿Sirve para contenido de marketing?</h3>
<p>Como apoyo puntual, sí. Pero el contenido que posiciona en Google y convierte clientes necesita estrategia, datos propios y criterio editorial — no solo reescritura. Es la diferencia entre producir texto y hacer <a href="/es/blogs/que-es-el-content-manager-y-cuales-son-sus-objetivos">content management</a> de verdad.</p>

<h2>Cierre</h2>
<p>Parafrasist es útil para lo que es: acelerar resúmenes y paráfrasis en español, con revisión humana y citas correctas. Si lo que necesitas no es resumir textos sino <strong>contenido que haga crecer tu negocio</strong> — artículos que posicionen y redes que vendan — eso es otro deporte, y es el nuestro: mira cómo trabajamos el <a href="/es/posicionamiento-seo">posicionamiento SEO</a> y el <a href="/es/servicios/socialmedia">contenido para redes</a>.</p>`,
  },

  // ───────────── NUEVO — hub tarifas publicidad digital (query Bing pos 3 verificada) ─────────────
  {
    slug: "tarifas-publicidad-digital-peru-2026-google-meta-tiktok-linkedin",
    title: "Tarifas de publicidad digital en Perú 2026: Google Ads, Meta, TikTok y LinkedIn",
    focus_keyword: "tarifas publicidad digital peru 2026",
    meta_title: "Tarifas de Publicidad Digital en Perú 2026: Google, Meta, TikTok y LinkedIn",
    meta_description: "Cómo se cobran Google Ads, Meta Ads, TikTok Ads y LinkedIn Ads en Perú: modelo de subasta, fee de gestión vs presupuesto de pauta, y cuánto invertir según tu negocio en 2026.",
    excerpt: "Todas las plataformas cobran por subasta, pero cada una tiene su lógica. Cómo se estructura la inversión en Google, Meta, TikTok y LinkedIn en Perú: pauta + gestión, y cuánto destinar según tu caso.",
    og_title: "Tarifas de publicidad digital en Perú 2026",
    og_description: "Google Ads, Meta, TikTok y LinkedIn: cómo se cobra cada plataforma y cuánto invertir en Perú.",
    featured_image: IMG("1460925895917-afdab827c52f"),
    featured_image_alt: "Comparativa de tarifas de publicidad digital en Perú: Google, Meta, TikTok y LinkedIn",
    author_name: AUTHOR,
    content: `<p class="lead">¿Cuánto cuesta anunciar en Google, Facebook, TikTok o LinkedIn en el Perú? La respuesta corta: <strong>ninguna plataforma tiene "tarifario" fijo</strong> — todas funcionan por subasta, así que el costo depende de tu sector, tu competencia y la calidad de tus anuncios. Lo que sí puedes conocer de antemano es <strong>cómo se estructura la inversión</strong> (pauta + gestión) y qué rangos son razonables para empezar en cada plataforma. Eso es exactamente lo que cubre esta guía.</p>

<h2>Cómo se cobra la publicidad digital: los dos componentes</h2>
<p>Toda inversión en publicidad digital tiene dos partes que conviene no mezclar:</p>
<ul>
<li><strong>La pauta:</strong> lo que le pagas directamente a la plataforma (Google, Meta, TikTok, LinkedIn) por cada clic o mil impresiones. Se define por subasta en tiempo real.</li>
<li><strong>La gestión:</strong> lo que pagas a quien configura, optimiza y reporta tus campañas — una agencia o un especialista. Como referencia, en 3R Core el <a href="/es/servicios/google-ads">fee de gestión de Google Ads</a> parte desde S/1,800/mes, con la pauta pagada por ti directamente a la plataforma.</li>
</ul>
<p>Separar ambos montos te protege: sabes exactamente cuánto va a medios y cuánto a servicio. Desconfía de paquetes donde no se distingue.</p>

<h2>Google Ads: intención de compra</h2>
<p>Google cobra principalmente <strong>por clic (CPC)</strong> en búsquedas: pagas cuando alguien que buscó "abogado laboral lima" o "tienda de zapatillas" hace clic en tu anuncio. Es la plataforma con la intención más alta — el usuario ya está buscando lo que vendes — y por eso sus clics suelen ser los más caros, especialmente en sectores como legal, salud o inmobiliario. Para arrancar con pie derecho, recomendamos un <strong>presupuesto mínimo de pauta de S/1,500/mes</strong> (y S/3,000+ en sectores muy competitivos). El detalle por tipo de campaña está en nuestra guía de <a href="/es/blogs/cuanto-cuesta-google-ads-lima-agencia-2026">cuánto cuesta Google Ads en Lima</a> y puedes afinar tu número con la fórmula de <a href="/es/blogs/como-calcular-presupuesto-google-ads-ticket-promedio-peru">presupuesto según tu ticket promedio</a>.</p>

<h2>Meta Ads (Facebook e Instagram): alcance y descubrimiento</h2>
<p>Meta cobra sobre todo <strong>por mil impresiones (CPM)</strong>: pagas por mostrar tu anuncio a una audiencia segmentada, aunque también optimiza por clics o conversiones. Es la plataforma más flexible para presupuestos chicos y la mejor para generar demanda — que te descubran quienes aún no te buscan. La inversión eficiente combina buena segmentación con creatividades que no parezcan anuncios. Tenemos el desglose completo en <a href="/es/blogs/cuanto-cuesta-publicidad-facebook-instagram-peru-2026">cuánto cuesta la publicidad en Facebook e Instagram en Perú</a>.</p>

<h2>TikTok Ads: atención barata (todavía)</h2>
<p>TikTok también cobra por subasta (CPM/CPC) y en Perú sigue siendo, en general, <strong>la atención más barata</strong> de las grandes plataformas, porque hay menos anunciantes compitiendo que en Meta. Funciona especialmente bien para consumo, moda, gastronomía y educación con público de 18 a 45 años. Eso sí: exige video nativo — los anuncios que parecen anuncios mueren rápido. Guía completa en <a href="/es/blogs/cuanto-cuesta-anunciar-tiktok-peru-cpm-cpa">cuánto cuesta anunciar en TikTok en Perú</a>.</p>

<h2>LinkedIn Ads: el CPM más caro, el público más específico</h2>
<p>LinkedIn es la plataforma <strong>más cara por impresión</strong> de esta lista — su subasta parte de mínimos altos porque permite segmentar por cargo, industria y tamaño de empresa. Por eso solo tiene sentido para <strong>B2B con ticket alto</strong>: software empresarial, consultoría, educación ejecutiva. Para una pyme B2C peruana, casi siempre es mejor invertir ese presupuesto en Google, Meta o TikTok. Si tu caso es B2B, muchas veces el primer paso rentable no es la pauta sino la presencia orgánica: aquí explicamos <a href="/es/blogs/linkedin-que-es-redes-sociales">cómo funciona LinkedIn</a>.</p>

<h2>¿Cuánto invertir en total? Referencias para Perú 2026</h2>
<p>Como referencia de inversión mensual total en marketing digital (pauta + gestión) que usamos con clientes en Lima:</p>
<ul>
<li><strong>Emprendimientos:</strong> S/2,500 – 4,500/mes (cubre redes + Ads básico).</li>
<li><strong>Pymes:</strong> S/5,000 – 12,000/mes (estrategia integral: redes, Ads, SEO y mejoras web).</li>
<li><strong>Empresas medianas:</strong> S/12,000 – 30,000/mes (marketing completo con producción de contenido y CRO).</li>
</ul>
<p>La cifra correcta no es la más alta ni la más baja: es la que tu <a href="/es/blogs/cac-ltv-roas-metricas-negocio-peru">CAC y tu LTV</a> pueden sostener con retorno positivo. Todos los precios de nuestros servicios están publicados en <a href="/es/precios">la página de precios</a>.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿En qué plataforma empiezo si mi presupuesto es limitado?</h3>
<p>Si la gente YA busca lo que vendes, Google Ads (captura demanda existente). Si vendes algo visual o de descubrimiento, Meta o TikTok (genera demanda). Con presupuesto muy ajustado, mejor una plataforma bien gestionada que tres a medias.</p>
<h3>¿Por qué no hay precios exactos de CPC o CPM?</h3>
<p>Porque cambian cada día por subasta y varían fuerte por sector y temporada. Cualquier tabla de "CPC promedio" que veas por ahí queda vieja en semanas. Lo estable es la estructura: pauta + gestión, y los mínimos razonables para que la campaña tenga datos suficientes para optimizar.</p>
<h3>¿La gestión con agencia se justifica con presupuestos chicos?</h3>
<p>Debajo de cierto punto, no: si tu pauta es S/500/mes, un fee de gestión se come el retorno. Por eso recomendamos pauta mínima de S/1,500/mes en Google — con menos, ni la plataforma ni el gestor tienen datos para optimizar. Nuestra guía sobre <a href="/es/blogs/seo-vs-google-ads-peru-cual-conviene">SEO vs Google Ads</a> te ayuda a decidir dónde poner el primer sol.</p>

<h2>Cierre</h2>
<p>Las "tarifas" de la publicidad digital no están en un tarifario: están en tu sector, tu competencia y la calidad de tu ejecución. Lo que sí se puede controlar es la estructura — cuánto a pauta, cuánto a gestión, y qué se mide cada mes. En 3R Core gestionamos <a href="/es/servicios/google-ads">Google Ads</a>, <a href="/es/servicios/meta-ads">Meta Ads</a> y <a href="/es/servicios/tiktok-ads">TikTok Ads</a> con presupuestos claros y reporte mensual. <a href="/es/cotizar">Calcula tu estimado</a> o <a href="/es#contacto">conversemos</a>.</p>`,
  },
]
