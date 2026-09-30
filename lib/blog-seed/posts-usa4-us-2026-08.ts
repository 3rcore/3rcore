import type { SeedPost } from "./posts"

/**
 * 4 artículos en español para ESTADOS UNIDOS (locale 'us') — 28-ago-2026.
 *
 * Son los PRIMEROS artículos es-US del sitio. Hasta hoy /us/blogs servía los
 * posts peruanos con canonical a /es, así que el mercado hispano de EE.UU. no
 * podía tener contenido propio: cualquier pieza escrita para él acababa
 * indexada como contenido de Perú. Ver lib/blogLocale.ts.
 *
 * POR QUÉ ESTOS CUATRO. El autocompletado de Google en es-US (28-ago-2026)
 * devuelve demanda literal para "cuanto cuesta una pagina web en estados
 * unidos", "cuanto cobra una agencia de marketing digital en estados unidos",
 * "como crear una tienda online en estados unidos" y "como vender online en
 * estados unidos". Y son exactamente el molde que en 3rcore.com ya funciona:
 * los "cuánto cuesta X en Perú" son las páginas que más tráfico de IA reciben.
 *
 * ⚠️ ORIGEN DE LAS CIFRAS. Precios de 3R Core: su propia página /us/precios.
 * Shopify y WooCommerce: shopify.com/pricing y woocommerce.com/pricing,
 * verificados el 28-ago-2026. Sobre impuestos y trámites NO se da ninguna
 * cifra ni plazo: las reglas de nexo económico cambian por estado y se remite
 * al Departamento de Ingresos que corresponda. Un dato fiscal inventado en una
 * web de agencia es un problema del cliente, no nuestro.
 */

const A = "Equipo 3R Core"
const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&q=80`

export const USA4_US_POSTS: SeedPost[] = [
  {
    title: "¿Cuánto cuesta una página web en Estados Unidos? Precios reales 2026",
    slug: "cuanto-cuesta-una-pagina-web-en-estados-unidos",
    locale: "us",
    excerpt:
      "Entre $850 y $10,000 según lo que necesites, y la mayoría de negocios pequeños cae entre $1,200 y $2,400. Qué incluye cada rango y qué costos anuales nadie te menciona.",
    featured_image: IMG("1499750310107-5fef28a66643"),
    featured_image_alt: "Escritorio con una laptop mostrando el diseño de una página web",
    meta_title: "¿Cuánto cuesta una página web en Estados Unidos? Precios 2026",
    meta_description:
      "Landing desde $850, web corporativa $1,200–$2,400 y tienda online desde $1,750. Qué incluye cada rango, qué encarece el proyecto y los costos anuales tras el lanzamiento.",
    og_title: "¿Cuánto cuesta una página web en Estados Unidos?",
    og_description: "Rangos reales, qué compra cada uno y los costos anuales que nadie cotiza.",
    focus_keyword: "cuanto cuesta una pagina web en estados unidos",
    author_name: A,
    content: `
<p><strong>Una página web para un negocio en Estados Unidos cuesta entre $850 y $10,000 dólares, y la mayoría de negocios pequeños termina entre $1,200 y $2,400.</strong> El rango es tan amplio porque la palabra "página web" describe igual de bien una landing de una sola sección que un sitio de cincuenta páginas con sistema de reservas.</p>

<p>Aquí está qué compra cada rango, con precios publicados y no con cifras inventadas para sonar razonables.</p>

<h2>¿Qué incluye cada rango de precio?</h2>

<p><strong>En 3R Core los rangos son: landing page desde $850, web corporativa desde $1,200 con un rango de $1,200 a $2,400 según alcance, y tienda online desde $1,750.</strong> Toda propuesta incluye diseño en Figma, desarrollo responsive, SEO técnico básico, formulario de contacto y conexión a Google Analytics, y el primer año incluye dominio, SSL y hosting.</p>

<table>
<tr><th>Tipo</th><th>Precio</th><th>Para qué sirve</th></tr>
<tr><td>Landing page profesional</td><td>desde $850</td><td>Una oferta, una acción. Tráfico de anuncios, un servicio, un lanzamiento.</td></tr>
<tr><td>Web corporativa</td><td>$1,200–$2,400</td><td>5 a 8 secciones. Lo estándar para un negocio establecido.</td></tr>
<tr><td>Tienda online</td><td>desde $1,750</td><td>Catálogo, pasarela de pago, inventario y panel de administración.</td></tr>
</table>

<p>Por encima de $5,000 normalmente no estás comprando algo más grande, sino algo específico: un sistema de reservas, un cotizador con lógica, un área de clientes, una estructura multi-sucursal o una integración con software que ya usas. Si una cotización supera ese rango y no puede nombrar cuál de esas cosas es, pregunta.</p>

<h2>¿Qué encarece de verdad una página web?</h2>

<p><strong>Cuatro factores mueven el precio, y el número de páginas no es realmente uno de ellos.</strong></p>

<ul>
<li><strong>Diseño a medida o plantilla bien configurada.</strong> Diseñar en Figma y luego desarrollar ese diseño es aproximadamente el doble de trabajo que configurar bien una buena plantilla. Las dos opciones son legítimas. Solo una debería cobrarse como la otra.</li>
<li><strong>Funcionalidad.</strong> Un formulario de contacto es trivial. Reservas con disponibilidad, cotizador con lógica, portal de clientes, flujo de pago: cada uno es software, y el software es donde están las horas.</li>
<li><strong>Contenido.</strong> ¿Quién escribe los textos y de dónde salen las fotos? "El cliente entrega el contenido" es la razón más común de que un proyecto se atasque meses, y lo que más falta en una cotización barata.</li>
<li><strong>Idiomas.</strong> Un sitio bilingüe no es un sitio traducido. Necesita URL propia por idioma y hreflang declarado en las dos direcciones, y el texto debe escribirse en cada idioma en lugar de pasarse por un traductor.</li>
</ul>

<h2>¿Qué costos hay cada año después de publicar?</h2>

<p><strong>Hay que presupuestar dominio, hosting, SSL y mantenimiento todos los años: normalmente entre $100 y $600 anuales para un sitio de negocio pequeño, y más si tiene tienda.</strong> Casi nunca aparecen en la cotización inicial y no son opcionales.</p>

<ul>
<li><strong>Dominio:</strong> normalmente entre $10 y $20 al año para un .com.</li>
<li><strong>Hosting:</strong> desde unos dólares al mes en hosting compartido hasta cientos en hosting administrado. WooCommerce publica $25 a $350 mensuales como rango realista para una tienda.</li>
<li><strong>Certificado SSL:</strong> gratis con Let's Encrypt en casi todos los hostings modernos. Si te lo cobran aparte, pregunta por qué.</li>
<li><strong>Mantenimiento:</strong> actualizaciones, respaldos y seguridad. En WordPress esto es trabajo real, no un formalismo.</li>
</ul>

<h2>¿Conviene una página web barata?</h2>

<p><strong>A veces sí: una web de plantilla para un negocio que solo necesita existir en internet es una compra perfectamente razonable.</strong> El ahorro falso es otro y se reconoce fácil: un sitio sin analítica, sin medición de conversiones y que no puedes editar sin volver a quien lo hizo.</p>

<p>Auditamos sitios así con frecuencia. El patrón se repite: el negocio lleva un año publicado, no sabe qué páginas generan consultas, no puede cambiar un teléfono sin pagar, y está a punto de pagar otra vez por rehacerlo. La primera web fue barata. Los dos años no.</p>

<p>La prueba concreta antes de firmar: ¿puedes editar los textos tú, está la analítica instalada y configurada, y el dominio y el hosting están a tu nombre? Tres síes y el precio probablemente está bien, sea el que sea.</p>

<h2>¿Debe ser bilingüe si mis clientes hablan español?</h2>

<p><strong>Si una parte importante de tus clientes habla español, un sitio bilingüe bien construido suele ser lo que más rinde de todo el proyecto, y cuesta menos hacerlo ahora que después.</strong> Añadir un segundo idioma a un sitio que no se planificó para eso obliga a reestructurar las URLs, que es la versión cara.</p>

<p>Bien hecho significa que cada idioma tiene su propia URL, que el hreflang se declara en las dos direcciones para que Google sirva la versión correcta a cada buscador, y que el español está escrito y no traducido. Eso último pesa más de lo que parece: una página traducida hereda los encabezados de la versión en inglés, y esos encabezados se escribieron para una búsqueda que nadie hace en español.</p>

<h2>¿Cuánto tarda?</h2>

<p><strong>Una landing entre una y dos semanas; una web corporativa de tres a seis; una tienda de cuatro a ocho según el tamaño del catálogo.</strong> Lo que varía casi nunca es el desarrollo: es el contenido y las respuestas. Los proyectos que van rápido son aquellos en los que el cliente ya tiene textos y fotos y hay una sola persona que decide.</p>

<h2>Preguntas frecuentes</h2>

<h3>¿Cuánto cuesta mantener una página web al mes en Estados Unidos?</h3>
<p>Entre $10 y $50 mensuales de dominio y hosting para un sitio estándar, más lo que cueste el mantenimiento si lo contratas. Una tienda cuesta más porque exige más del servidor: WooCommerce publica un rango de $25 a $350 al mes de hosting.</p>

<h3>¿Sale más barato hacer la página web yo mismo?</h3>
<p>En dinero sí. Los constructores de sitios son baratos y hoy son capaces de verdad. Lo que gastas en su lugar es tu tiempo, y lo que suele fallar sin supervisión es el SEO técnico, la velocidad y la medición de conversiones, que son justo las tres cosas que no avisan cuando están mal.</p>

<h3>¿Por qué dos cotizaciones por lo mismo se diferencian tanto?</h3>
<p>Casi siempre porque no son lo mismo aunque lo parezcan. Diseño a medida o plantilla, quién escribe los textos, si incluye medición, y si el dominio y el hosting del primer año van dentro. Pide esas cuatro líneas en cada cotización y la mayor parte de la diferencia se explica sola.</p>

<h3>¿Cuánto cobra 3R Core por una página web?</h3>
<p>Landing desde $850, web corporativa desde $1,200 (rango $1,200–$2,400 según alcance) y tienda online desde $1,750. Precios netos en dólares, sin contratos forzosos, con diseño en Figma, desarrollo responsive, SEO técnico básico, formulario y Google Analytics incluidos.</p>

<p>¿Armando el presupuesto? <a href="/us/servicios/desarrollo-web">Mira cómo desarrollamos webs para negocios en EE.UU.</a>, <a href="/us/precios">revisa los precios publicados</a> o lee <a href="/us/blogs/como-crear-una-tienda-online-en-estados-unidos">cómo crear una tienda online</a> si vas a vender por internet.</p>
`,
  },
  {
    title: "¿Cuánto cobra una agencia de marketing digital en Estados Unidos?",
    slug: "cuanto-cobra-una-agencia-de-marketing-digital-en-estados-unidos",
    locale: "us",
    excerpt:
      "Entre $500 y $10,000 al mes por propuestas que parecen idénticas sobre el papel. Qué separa cada rango y las tres preguntas que descubren una mala agencia antes de firmar.",
    featured_image: IMG("1552664730-d307ca884978"),
    featured_image_alt: "Reunión de equipo de marketing revisando resultados en una pantalla",
    meta_title: "¿Cuánto cobra una agencia de marketing digital en EE.UU.? 2026",
    meta_description:
      "Fees de $500 a $10,000 al mes. Qué compra cada rango, por qué lo barato casi nunca lo es y las tres preguntas que exponen una mala propuesta antes de firmarla.",
    og_title: "¿Cuánto cobra una agencia de marketing digital en Estados Unidos?",
    og_description: "Rangos reales y las tres preguntas que descubren una mala propuesta.",
    focus_keyword: "cuanto cobra una agencia de marketing digital en estados unidos",
    author_name: A,
    content: `
<p><strong>Una agencia de marketing digital en Estados Unidos cobra entre $500 y $10,000 dólares al mes, y las propuestas de los dos extremos describen las mismas actividades.</strong> Ese es el verdadero problema al contratar marketing: la lista de entregables es casi idéntica pagues lo que pagues, así que el precio por sí solo no te dice casi nada.</p>

<p>Lo que sigue es qué separa cada rango y cómo leer una propuesta antes de firmarla.</p>

<h2>¿Qué compra cada rango de precio?</h2>

<p><strong>Lo que cambia son las horas y la experiencia de quien las hace, no las actividades.</strong> Toda propuesta lleva auditoría, optimización, contenido y reportes. La diferencia está en cuántas horas entran cada mes y quién las trabaja.</p>

<table>
<tr><th>Rango mensual</th><th>Normalmente compra</th><th>Encaja con</th></tr>
<tr><td>$500–$1,400</td><td>Base técnica, on-page, contenido moderado y reporte mensual</td><td>Negocios que empiezan, competencia local baja</td></tr>
<tr><td>$1,500–$3,600</td><td>Lo anterior más producción sostenida de contenido y pauta</td><td>Pymes establecidas, mercados locales competidos</td></tr>
<tr><td>$3,600–$9,000</td><td>Equipo dedicado, producción de contenido y CRO</td><td>Empresas medianas, competencia nacional</td></tr>
</table>

<p><strong>Los precios de referencia de 3R Core en dólares son públicos:</strong> SEO $500 al mes, páginas web desde $850, tiendas online desde $1,750, y como inversión mensual de referencia $750–$1,400 para negocios que empiezan, $1,500–$3,600 para pymes y $3,600–$9,000 para empresas medianas. Sin contratos forzosos.</p>

<h2>¿Por qué una agencia peruana puede cobrar menos por el mismo trabajo?</h2>

<p><strong>Porque el equipo está en Lima y carga los costos de Lima, no los de una ciudad estadounidense.</strong> 3R Core es una agencia peruana que atiende a Estados Unidos de forma remota a través de su filial allí; no lo escondemos porque es exactamente la razón del precio.</p>

<p>Lo que estás comprando no es mano de obra barata: son las mismas horas de gente senior con otra estructura de costos detrás, y la diferencia se va en producción — más variaciones, más pruebas, más iteraciones al mes por el mismo presupuesto. Además, Lima está en el huso horario del este de Estados Unidos, o una hora por detrás según el horario de verano, así que las reuniones son en vivo y las correcciones salen el mismo día.</p>

<h2>¿Por qué el marketing barato casi nunca sale barato?</h2>

<p><strong>Porque por debajo de cierto precio nadie puede pagar las horas que el trabajo exige, así que lo que se entrega es el reporte y no el resultado.</strong> La señal es una propuesta llena de cantidades — "20 palabras clave", "5 blogs al mes", "100 directorios" — y muda sobre resultados.</p>

<ul>
<li><strong>Contenido escrito por número de palabras.</strong> Páginas que existen para ser publicadas y no para responder nada. Google las descubre y decide no indexarlas, que es un estado real y visible en Search Console, y el trabajo simplemente desaparece.</li>
<li><strong>Enlaces comprados al por mayor.</strong> Los paquetes baratos lo son porque los sitios que los venden le venden a todo el mundo. En el mejor de los casos no hacen nada.</li>
<li><strong>Reportes sobre la métrica equivocada.</strong> Posiciones de términos que nadie busca, visitas que nunca convierten. Si el reporte no se conecta con consultas o ventas, no está midiendo lo que compraste.</li>
</ul>

<h2>Las tres preguntas que exponen una mala propuesta</h2>

<p><strong>Hazlas antes de firmar. Separan agencias más rápido que cualquier comparación de precios.</strong></p>

<ul>
<li><strong>"¿Qué me van a reportar y cómo se ve el éxito en el mes 6?"</strong> Una buena respuesta nombra métricas de tu negocio: consultas calificadas, ventas desde buscadores, posiciones en términos comerciales. Una mala promete posiciones en términos que nunca has escuchado.</li>
<li><strong>"¿Quién hace el trabajo y desde dónde?"</strong> No es una trampa. Está perfectamente bien que el trabajo se produzca en cualquier país. Lo que no está bien es que no lo sepas, porque así es como un fee de $3,000 se convierte en cuatro horas de un junior al mes.</li>
<li><strong>"¿Qué pasa si me voy?"</strong> El contenido y las cuentas deben ser tuyas. Si las páginas viven en el dominio de la agencia o la propiedad de Analytics está a su nombre, estás alquilando tu propio marketing.</li>
</ul>

<h2>¿Conviene fee mensual o proyecto cerrado?</h2>

<p><strong>Un proyecto encaja con un trabajo con final: una auditoría, una migración, una limpieza técnica. Un fee mensual encaja con el SEO y la pauta, porque los resultados se disputan de forma continua y un empujón puntual se apaga.</strong></p>

<p>Lo que un fee mensual no debería ser es un contrato que te amarra mientras el trabajo baja de intensidad. El nuestro es mensual y sin plazo forzoso, lo que deja la carga donde corresponde: en que sigamos valiendo la pena.</p>

<h2>¿Cuánto tarda en verse el retorno?</h2>

<p><strong>En términos locales y de cola larga con poca competencia, el movimiento suele aparecer en unos meses de trabajo constante. En términos comerciales competidos tarda bastante más.</strong> Quien te garantice una fecha te está dando un número que no controla, y esa es la señal más clara de todo el proceso de compra.</p>

<p>Lo que sí se puede comprometer es el reporte: qué se movió, qué no, y qué cambia el mes siguiente por eso.</p>

<h2>Preguntas frecuentes</h2>

<h3>¿Cuánto cuesta el SEO en Estados Unidos?</h3>
<p>Los fees de SEO van de unos $500 a varios miles de dólares mensuales según la competencia. En 3R Core el SEO cuesta $500 al mes e incluye auditoría inicial, planificación, optimización on-page, escalamiento y reporte mensual, sin contrato forzoso.</p>

<h3>¿El marketing en español cuesta más?</h3>
<p>No. En 3R Core es el mismo precio, porque el español es el idioma de trabajo del equipo. Además suele dar resultados antes, porque en la mayoría de categorías de servicios en Estados Unidos hay muchísimos menos competidores con páginas en español que en inglés.</p>

<h3>¿Cuánto debo invertir si mi negocio recién empieza?</h3>
<p>Como referencia, entre $750 y $1,400 al mes cubre una operación básica. Lo importante no es el monto sino que el retorno sea positivo desde el mes 3, y para saberlo hace falta medición instalada antes de empezar a gastar.</p>

<h3>¿Necesito agencia o puedo contratar a un freelance?</h3>
<p>Un freelance funciona bien cuando el trabajo es una sola disciplina y tú coordinas. Una agencia tiene sentido cuando hacen falta varias a la vez —web, SEO, medición— y no quieres ser tú quien las coordine. Cualquier agencia honesta te dirá cuál de los dos casos es el tuyo.</p>

<p>¿Comparando propuestas? <a href="/us/marketing-para-negocios-hispanos">Mira cómo trabajamos con negocios hispanos en Estados Unidos</a>, <a href="/us/precios">revisa los precios publicados</a> o lee <a href="/us/blogs/cuanto-cuesta-una-pagina-web-en-estados-unidos">cuánto cuesta una página web</a>.</p>
`,
  },
  {
    title: "Cómo crear una tienda online en Estados Unidos: guía completa 2026",
    slug: "como-crear-una-tienda-online-en-estados-unidos",
    locale: "us",
    excerpt:
      "Plataforma, pasarela de pago, impuestos por estado y medición. Los cuatro puntos donde se decide si la tienda funciona, con costos reales verificados.",
    featured_image: IMG("1563013544-824ae1b704d3"),
    featured_image_alt: "Emprendedora preparando pedidos de su tienda online en su taller",
    meta_title: "Cómo crear una tienda online en Estados Unidos: guía 2026",
    meta_description:
      "Shopify $25–$399/mes o WooCommerce gratis con hosting $25–$350/mes. Pasarela, sales tax por nexo económico y medición: los cuatro puntos que deciden si vendes.",
    og_title: "Cómo crear una tienda online en Estados Unidos",
    og_description: "Plataforma, pagos, impuestos y medición, con costos verificados.",
    focus_keyword: "como crear una tienda online en estados unidos",
    author_name: A,
    content: `
<p><strong>Crear una tienda online en Estados Unidos se decide en cuatro puntos: la plataforma, la pasarela de pago, el impuesto de venta por estado y la medición.</strong> El diseño importa, pero ninguno de los negocios que hemos visto fracasar lo hizo por el diseño. Fracasaron porque los cobros no cerraban, porque acumularon una obligación fiscal sin saberlo o porque después de un año no sabían qué producto les daba dinero.</p>

<h2>Paso 1: ¿qué plataforma elegir?</h2>

<p><strong>Para la mayoría de negocios pequeños la elección real es Shopify o WooCommerce, y lo que decide no son las funciones sino si tienes quién mantenga la tienda.</strong> Shopify se mantiene solo y te lo cobra. WooCommerce es gratis y espera que lo hagas tú.</p>

<table>
<tr><th></th><th>Shopify</th><th>WooCommerce</th></tr>
<tr><td>Costo de plataforma</td><td>$25–$399/mes ($19–$299 con pago anual)</td><td>$0, el plugin es gratis</td></tr>
<tr><td>Hosting</td><td>Incluido</td><td>$25–$350/mes</td></tr>
<tr><td>Extensiones</td><td>Por app, mensual</td><td>$29–$299/año cada una</td></tr>
<tr><td>Recargo por pasarela externa</td><td>2% en Basic, 1% en Grow, 0.6% en Advanced</td><td>Ninguno</td></tr>
<tr><td>Quién actualiza y asegura</td><td>Shopify</td><td>Tú o tu agencia</td></tr>
</table>

<p><strong>Ojo con el recargo por pasarela externa: si usas un procesador que no sea Shopify Payments, Shopify cobra un porcentaje adicional sobre cada venta.</strong> Una tienda que factura $30,000 al mes en el plan Basic con pasarela externa paga $600 mensuales solo de recargo, más de veinte veces el plan. Ese número, y no el precio del plan, es el que debe decidir tu elección.</p>

<h2>Paso 2: ¿cómo se cobran los pagos?</h2>

<p><strong>Necesitas una pasarela que acepte tarjetas estadounidenses y una cuenta bancaria en Estados Unidos donde depositar.</strong> Esta es la parte donde se atascan los negocios hispanos que están montando su primera tienda formal, y conviene resolverla antes de construir nada.</p>

<p>Dos advertencias que salen de proyectos reales:</p>

<ul>
<li><strong>Verifica que tu categoría de negocio esté permitida</strong> por el procesador antes de construir la tienda. Algunas categorías están restringidas y enterarse después de tener el catálogo cargado es caro.</li>
<li><strong>Prueba una compra real antes de lanzar.</strong> Una tienda que marca los pedidos como pagados sin haber cobrado es un fallo que hemos visto en producción, y no se nota hasta que llega el corte de caja.</li>
</ul>

<h2>Paso 3: el sales tax por nexo económico</h2>

<p><strong>En Estados Unidos una tienda puede tener obligación de cobrar impuesto de venta en estados donde nunca ha estado físicamente, por las reglas de nexo económico.</strong> Los umbrales y las reglas cambian de un estado a otro y también cambian con el tiempo, así que aquí no vas a encontrar una cifra: se consultan en el Departamento de Ingresos del estado que corresponda o con un contador en Estados Unidos.</p>

<p>Lo que sí podemos decir con seguridad es cómo falla. <strong>Falla en silencio.</strong> La tienda sigue tomando pedidos con normalidad y la obligación se acumula por detrás. Nadie recibe un aviso. Por eso la configuración de impuestos va dentro del proyecto de construcción y no en una lista de pendientes para después.</p>

<h2>Paso 4: la medición, instalada antes de lanzar</h2>

<p><strong>La analítica y el seguimiento de conversiones se instalan antes de publicar, no cuando algo se siente mal.</strong> Una tienda que lleva dos meses publicada sin medición tiene dos meses de decisiones tomadas a ciegas y no hay forma de recuperar esos datos.</p>

<p>Lo mínimo antes de abrir: analítica configurada, evento de compra midiendo el valor real del pedido, y el embudo del carrito al checkout visible. Con eso puedes responder qué producto vende, por qué canal llega la gente y dónde se cae. Sin eso, cualquier decisión de inversión es una corazonada.</p>

<h2>¿Y el catálogo bilingüe?</h2>

<p><strong>Si vendes a clientes hispanohablantes en Estados Unidos, el catálogo en español necesita URL propia y hreflang declarado en las dos direcciones, igual que el resto del sitio.</strong> Traducir automáticamente las fichas de producto es el atajo que más veces hemos visto y el que menos funciona: las fichas terminan compitiendo entre sí y el buscador sirve la versión equivocada.</p>

<p>Escribir las fichas en español —no traducirlas— también cambia la conversión, porque la descripción de un producto es donde alguien decide si confía lo suficiente para pagar.</p>

<h2>¿Cuánto cuesta todo junto?</h2>

<p><strong>En 3R Core una tienda en Shopify o WooCommerce arranca desde $1,750 dólares</strong>, con catálogo, pasarela de pago, gestión de inventario y panel de administración. A eso hay que sumarle el plan de la plataforma o el hosting, las apps que uses y el porcentaje del procesador de pagos.</p>

<p>Para una tienda pequeña bien construida, el primer año realista ronda los $1,750–$3,000 de construcción más $300–$800 de plataforma al año, más apps y comisiones. Lo que rompe presupuestos nunca es el plan: es rehacer la tienda a los dieciocho meses porque la primera se construyó sin medición y sin quien entendiera el checkout.</p>

<h2>Preguntas frecuentes</h2>

<h3>¿Necesito una empresa registrada en Estados Unidos para vender online?</h3>
<p>Los requisitos de constitución, registro fiscal y licencias dependen del estado y del tipo de negocio, y cambian. No damos una respuesta general porque una respuesta general aquí sería inventada: consúltalo con un contador o abogado en Estados Unidos antes de constituir nada. Lo que sí puedes ir resolviendo en paralelo es la plataforma, el catálogo y la medición.</p>

<h3>¿Cuál es la plataforma más barata para empezar?</h3>
<p>WooCommerce tiene el costo de software más bajo porque el plugin es gratis, pero el hosting va de $25 a $350 mensuales y las extensiones de $29 a $299 al año cada una. Shopify Basic a $19 al mes con pago anual suele salir más barato en la práctica para un catálogo pequeño, una vez cuentas hosting y mantenimiento.</p>

<h3>¿Puedo migrar de plataforma después?</h3>
<p>Sí, y mucha gente lo hace. La migración es trabajo real: productos, clientes, pedidos, URLs y redirecciones. Lo que más se hace mal son las redirecciones, y sin ellas una migración tira a la basura todo el posicionamiento que la tienda anterior había ganado.</p>

<h3>¿Cuánto tarda construir la tienda?</h3>
<p>Entre cuatro y ocho semanas según el tamaño del catálogo. Lo que marca el ritmo casi nunca es el desarrollo, sino tener las fotos, las descripciones y los datos de producto listos.</p>

<p>¿Vas a montar la tienda? <a href="/us/tiendas-online">Mira cómo desarrollamos tiendas para negocios en EE.UU.</a>, lee <a href="/us/blogs/como-vender-online-en-estados-unidos">cómo vender online paso a paso</a> o <a href="/us/precios">revisa los precios</a>.</p>
`,
  },
  {
    title: "Cómo vender online en Estados Unidos: canales, pagos y qué mide de verdad",
    slug: "como-vender-online-en-estados-unidos",
    locale: "us",
    excerpt:
      "Tienda propia, marketplace o redes sociales. Cuál conviene según lo que vendes, qué cobra cada canal y por qué el español es el canal más barato que casi nadie usa.",
    featured_image: IMG("1522204523234-8729aa6e3d5f"),
    featured_image_alt: "Persona revisando pedidos y envíos de su negocio en línea",
    meta_title: "Cómo vender online en Estados Unidos: guía de canales 2026",
    meta_description:
      "Tienda propia, marketplace o redes: qué cobra cada canal, cuál conviene según lo que vendes y por qué el contenido en español es la vía más barata al cliente hispano.",
    og_title: "Cómo vender online en Estados Unidos",
    og_description: "Los canales, lo que cobra cada uno y el que casi nadie está usando.",
    focus_keyword: "como vender online en estados unidos",
    author_name: A,
    content: `
<p><strong>Vender online en Estados Unidos se reduce a elegir por dónde llega el cliente: tienda propia, marketplace o redes sociales.</strong> Los tres funcionan, cobran cosas distintas y sirven para negocios distintos. La mayoría de negocios que arrancan eligen mal porque comparan comisiones en vez de comparar quién trae al cliente.</p>

<p>Si lo que buscas es el paso a paso técnico para montar la tienda, está en <a href="/us/blogs/como-crear-una-tienda-online-en-estados-unidos">esta otra guía</a>. Aquí hablamos de canales.</p>

<h2>¿Tienda propia, marketplace o redes sociales?</h2>

<p><strong>La diferencia real es quién es dueño del cliente.</strong> En un marketplace el cliente es del marketplace y tú alquilas el acceso. En tu tienda el cliente es tuyo y el tráfico te lo tienes que traer tú.</p>

<table>
<tr><th>Canal</th><th>Quién trae al cliente</th><th>Qué cuesta</th><th>Encaja con</th></tr>
<tr><td>Tienda propia</td><td>Tú</td><td>Plataforma + comisión del procesador</td><td>Marca propia, recompra, márgenes que aguantan</td></tr>
<tr><td>Marketplace</td><td>El marketplace</td><td>Comisión por venta, normalmente alta</td><td>Producto con demanda ya existente</td></tr>
<tr><td>Redes sociales</td><td>Tú, con contenido o pauta</td><td>Tiempo o presupuesto de anuncios</td><td>Producto visual, compra por impulso</td></tr>
</table>

<p>La combinación que mejor funciona en la práctica no es elegir uno: es usar el marketplace para validar que el producto vende y la tienda propia para quedarte con el cliente que ya te compró una vez. Las comisiones de marketplace se pagan en cada venta; el cliente que vuelve a tu tienda se paga una sola vez.</p>

<h2>¿Cuánto cobra cada canal?</h2>

<p><strong>Los marketplaces cobran una comisión por venta que varía mucho según la categoría, y esa comisión sale de tu margen en cada pedido, para siempre.</strong> Las cifras exactas cambian por plataforma y por categoría, así que hay que sacarlas de la tabla oficial de cada marketplace y no de un artículo — incluido este.</p>

<p>En Estados Unidos los marketplaces con más tráfico para producto físico son Amazon, Walmart Marketplace y Etsy (este último para hecho a mano o vintage); si prefieres vender dentro de una red social, Instagram Shopping y TikTok Shop ya permiten pagar sin salir de la app. Cada uno tiene su propia tabla de comisiones y reglas de categoría — se revisan ahí, no en este artículo.</p>

<p>En tu tienda propia el costo es la plataforma más la comisión del procesador de pagos. <strong>En Shopify eso son $25 a $399 mensuales según el plan, y ojo con el recargo de 2% en Basic si cobras con una pasarela que no sea Shopify Payments</strong>, porque en volumen ese porcentaje pesa más que el plan entero.</p>

<h2>El canal que casi nadie usa: el español</h2>

<p><strong>En la mayoría de categorías de producto y servicio en Estados Unidos, los resultados de búsqueda en inglés se los disputan todos los competidores y los resultados en español se los disputan muy pocos.</strong> Mismos clientes, misma ciudad, misma compra, una fracción de la competencia — simplemente porque casi nadie ha construido las páginas.</p>

<p>La razón de que el hueco siga ahí es que hacerlo bien da trabajo. No es traducir la tienda. Es investigar palabras clave en español y descubrir que la gente busca otra cosa distinta de la traducción literal, y luego escribir las páginas contra esas búsquedas. Un traductor automático no puede encontrar eso porque está resolviendo otro problema.</p>

<p>Y hay un segundo efecto que no es de posicionamiento sino de confianza: una ficha de producto escrita en español natural convierte mejor que una traducida, porque la descripción es justo donde alguien decide si te compra.</p>

<h2>¿Qué hay que medir desde el primer día?</h2>

<p><strong>El valor real de cada pedido, el canal por el que llegó y dónde se cae la gente entre el carrito y el pago.</strong> Con esas tres cosas puedes decidir dónde invertir. Sin ellas, cualquier decisión es una corazonada cara.</p>

<p>El error que más vemos no es no medir: es medir mal y confiar en el número. Eventos de conversión que cuentan el mismo pedido dos veces, o que cuentan un clic como si fuera una venta, producen reportes que se ven bien y llevan a poner presupuesto donde no hay negocio. Vale la pena revisar qué está marcado como conversión antes de mirar ningún reporte.</p>

<h2>¿Y los envíos?</h2>

<p><strong>El costo de envío es parte del precio, no un detalle posterior.</strong> En Estados Unidos el envío gratis es una expectativa razonablemente extendida en muchas categorías, así que si tu margen no lo aguanta hay que decidirlo antes de fijar precios y no después del primer mes de pedidos.</p>

<p>Las tres decisiones concretas: si el envío va incluido en el precio o se cobra aparte, desde qué monto es gratis si lo ofreces, y quién paga las devoluciones. Las tres afectan la conversión más que casi cualquier cambio de diseño.</p>

<h2>Preguntas frecuentes</h2>

<h3>¿Es mejor vender en un marketplace o en tienda propia?</h3>
<p>Depende de si ya existe demanda para tu producto. Si la hay, el marketplace te la da hecha a cambio de una comisión permanente. Si vendes algo que la gente todavía no busca por nombre, el marketplace no te va a salvar y necesitas construir demanda tú.</p>

<h3>¿Necesito saber inglés para vender online en Estados Unidos?</h3>
<p>Para operar, ayuda mucho. Para vender, no necesariamente: hay negocios que venden bien atendiendo a clientela hispanohablante en español. Lo que sí conviene es que la parte administrativa —procesador de pagos, impuestos, plataforma— la revise alguien que entienda bien los términos, porque ahí los malentendidos cuestan dinero.</p>

<h3>¿Cuánto tarda una tienda nueva en vender?</h3>
<p>Depende enteramente de por dónde llegue el tráfico. Con pauta puede haber ventas la primera semana y se detienen cuando se detiene el presupuesto. Con posicionamiento orgánico tarda meses y no se apaga cuando dejas de pagar. La mayoría de tiendas que funcionan usan las dos cosas y saben cuánto les cuesta cada una.</p>

<h3>¿Puedo vender a todo Estados Unidos desde un solo estado?</h3>
<p>Vender sí. Lo que cambia según el estado son las obligaciones fiscales por nexo económico, que dependen de reglas y umbrales que varían por estado. Eso se consulta con un contador en Estados Unidos o en el Departamento de Ingresos del estado, no en un blog.</p>

<p>¿Empezando? <a href="/us/tiendas-online">Mira cómo desarrollamos tiendas online</a>, lee <a href="/us/blogs/como-crear-una-tienda-online-en-estados-unidos">la guía técnica para montarla</a> o <a href="/us/posicionamiento-seo">cómo trabajamos el SEO en español</a>.</p>
`,
  },
]
