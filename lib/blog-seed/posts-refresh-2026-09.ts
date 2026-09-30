import type { SeedPost } from "./posts"

/**
 * REFRESH 28-sep-2026 — cuatro posts heredados de WordPress que perdieron
 * posiciones o que Google dejó fuera del índice. Mismo slug y mismo locale
 * ('es') que la fila que ya existe en Supabase: el seed hace UPDATE, no crea
 * otra URL, y el endpoint conserva published_at (la antigüedad real del post).
 *
 *  1. campana-publicitaria-peru — 546 clics en ago-oct 2025, pos 1,2 para
 *     «campañas publicitarias peruanas»; hoy pos 10,9. El post era de 2022,
 *     632 palabras y maquetación Divi, sin fuentes ni fechas.
 *  2. 10-herramientas-ia-que-debes-conocer-para-tu-tesis — indexado, 0 clics
 *     en 90 días. Hablaba de «tendencias IA 2023», IBM Watson y Frase.io.
 *  3. como-crear-un-brochure-impactante-para-tu-empresa — «rastreada, no
 *     indexada» (inspección de URL del 28-sep). 525 palabras, se le había
 *     colado el bloque de trabajo («Enlaces salientes», «Metadescripción»).
 *  4. la-psicologia-de-los-colores-un-glosario-sobre-la-identidad-de-marca —
 *     «rastreada, no indexada». Imagen destacada enlazada a cetys.mx.
 *
 * ⚠️ DATOS. Cada campaña, premio, agencia y cifra lleva su fuente enlazada
 * (effie-peru.com, Adlatina, Gestión, El Comercio, IPP). Nada de estadísticas
 * sin origen. Las imágenes destacadas de los posts 1-3 son las mismas que ya
 * tenían (siguen respondiendo 200); el 4 pasa a Unsplash.
 */

const AUTHOR = "Piero Roque"
const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&q=80`
const EXT = 'rel="nofollow noopener" target="_blank"'

export const REFRESH_POSTS_2026_09: SeedPost[] = [
  // ───────────── 1 — campañas publicitarias peruanas ─────────────
  {
    slug: "campana-publicitaria-peru",
    locale: "es",
    title: "12 campañas publicitarias peruanas exitosas y lo que enseña cada una",
    focus_keyword: "campañas publicitarias peruanas",
    meta_title: "12 campañas publicitarias peruanas exitosas (casos reales)",
    meta_description:
      "Jueves de Pavita, Escolares Útiles, Hermanos Yapean y más: 12 campañas publicitarias peruanas con año, agencia, premio y resultado, cada una con su fuente.",
    excerpt:
      "Doce campañas publicitarias peruanas que funcionaron de verdad, de Pilsen Callao a Yape, con el año, la agencia, el premio que ganaron y el resultado que publicaron.",
    og_title: "12 campañas publicitarias peruanas exitosas",
    og_description:
      "Año, agencia, premio y resultado de 12 campañas peruanas que marcaron la publicidad del país, con fuentes.",
    featured_image:
      "https://3rcore-server.com.pe/wp-content/uploads/2022/11/Portada-6-campanas-publicitarias-exitosas-en-Peru-1.jpg",
    featured_image_alt: "Campañas publicitarias peruanas exitosas",
    author_name: AUTHOR,
    content: `<p class="lead">Las <strong>campañas publicitarias peruanas</strong> que mejor han funcionado comparten algo: toman una costumbre o una expresión que ya existe en el país y la convierten en una razón para comprar. Jueves de Pavita cambió el día en que se come pavo, Escolares Útiles metió la educación en un anuncio de crédito y Yape hizo que los Hermanos Yaipén se cambiaran el nombre. Abajo están 12 casos con año, agencia, premio y resultado, cada uno con su fuente.</p>

<p><em>Actualizado el 28 de septiembre de 2026. Escribe Piero Roque, equipo de estrategia de 3R Core.</em></p>

<h2>¿Qué campañas publicitarias peruanas han tenido más éxito?</h2>
<p>La referencia más objetiva en Perú es el <strong>Gran Effie</strong>, el premio que da Effie Perú a la campaña más eficaz del año. No premia la creatividad a secas: el jurado pide resultados de negocio medibles. Esta es la selección, ordenada por año:</p>

<table>
<thead><tr><th>Año</th><th>Marca</th><th>Campaña</th><th>Agencia</th><th>Reconocimiento</th></tr></thead>
<tbody>
<tr><td>2005</td><td>Leche Gloria</td><td>Tres vasos de leche al día</td><td>—</td><td>Effie de Plata 2005</td></tr>
<tr><td>2008</td><td>Backus (Pilsen Callao)</td><td>Reposicionamiento de Pilsen Callao</td><td>Publicis Asociados</td><td>Gran Effie 2008</td></tr>
<tr><td>2008</td><td>BCP</td><td>Es fin de mes (cuenta sueldo)</td><td>Causa</td><td>Recordación popular</td></tr>
<tr><td>2012</td><td>Rímac Seguros</td><td>Todo va a estar bien</td><td>—</td><td>Jingle estudiado en tesis universitarias</td></tr>
<tr><td>2012</td><td>San Fernando</td><td>Jueves de Pavita</td><td>Circus Comunicación Integrada</td><td>Gran Effie 2013</td></tr>
<tr><td>2015</td><td>Backus (Pilsen Callao)</td><td>Enamorados de la verdadera amistad</td><td>Publicis Asociados</td><td>Gran Effie 2015</td></tr>
<tr><td>2018</td><td>Mibanco</td><td>Escolares Útiles</td><td>Zavalita Brand Building</td><td>Gran Effie 2018</td></tr>
<tr><td>2020</td><td>Entel</td><td>Hoy conectados, mañana juntos</td><td>—</td><td>Caso estudiado en varias universidades</td></tr>
<tr><td>2023</td><td>Cementos Pacasmayo</td><td>Del hombro pal trompo</td><td>Mayo Publicidad / TOC Asociados</td><td>Gran Effie 2023</td></tr>
<tr><td>2024</td><td>Avinka (Grupo Santa Elena)</td><td>Prueba un pollo de verdad, honestamente</td><td>Boost Brand Accelerator</td><td>Gran Effie 2024</td></tr>
<tr><td>2025</td><td>Panetón D'Onofrio (Nestlé)</td><td>Charitón: de la tele a la góndola</td><td>América TV / McCann Lima / Apoyo Comunicación / Thrive</td><td>Gran Effie 2025</td></tr>
<tr><td>2026</td><td>Yape</td><td>De Hermanos Yaipén a Hermanos Yapean</td><td>121 Latam / OMD</td><td>Gran Effie 2026</td></tr>
</tbody>
</table>
<p>Fuente de los Gran Effie: <a href="https://effie-peru.com/gran-effie/" ${EXT}>lista oficial de Effie Perú, 1996-2026</a>. Los demás datos van enlazados en cada caso.</p>

<h2>Los 12 casos, uno por uno</h2>

<h3>1. San Fernando, «Jueves de Pavita» (2012)</h3>
<p>El pavo se comía en Navidad y el resto del año casi nada. San Fernando y Circus le pusieron un día fijo en la semana. Según el gerente de marketing de la marca, las ventas de carne de pavita subieron un <strong>40 % en 2012 frente a 2011</strong> (<a href="https://gestion.pe/economia/empresas/san-fernando-logrado-jueves-pavita-40650-noticia/" ${EXT}>Gestión</a>). Ganó el Gran Effie 2013 (<a href="https://www.adlatina.com/publicidad/circus-y-san-fernando-se-llevaron-el-gran-effie-en-per%C3%BA" ${EXT}>Adlatina</a>). Lo que enseña: si tu producto es estacional, inventarle una ocasión recurrente puede valer más que bajar el precio.</p>

<h3>2. Mibanco, «Escolares Útiles» (2018)</h3>
<p>Zavalita partió de un juego de palabras: «mientras tú te abasteces de útiles escolares, nosotros abastecemos al Perú de escolares útiles». Era una campaña de capital de trabajo para bodegueros en temporada escolar, contada desde la educación. El Comercio reportó un <strong>20 % más de top of mind</strong> en el primer trimestre frente a 2017, desembolsos +11,5 % y ventas totales de S/2.540 millones a S/2.703 millones (<a href="https://elcomercio.pe/economia/dia-1/estrategia-mibanco-ganador-gran-effie-2018-noticia-525090-noticia/" ${EXT}>El Comercio</a>). Lo que enseña: un propósito de marca funciona cuando va pegado a un producto concreto y a una temporada de venta.</p>

<h3>3. Yape, «De Hermanos Yaipén a Hermanos Yapean» (2025)</h3>
<p>La orquesta anunció en redes que se cambiaba el nombre. Días después se supo que era una campaña de Yape para decir que con la app se puede «yapear» todo, de la luz a la pensión de la universidad. Ganó el Gran Effie 2026 (<a href="https://effie-peru.com/2026/06/03/effie-peru-2026-campanas-efectivas/" ${EXT}>Effie Perú</a>) y tuvo sorteos y un concierto privado para los usuarios más activos (<a href="https://www.adlatina.com/publicidad/nuevo-yape-y-121-latam-lanzan-los-hermanos-yapean" ${EXT}>Adlatina</a>). Lo que enseña: la cultura popular peruana, bien usada, hace el trabajo de alcance que antes hacía la pauta.</p>

<h3>4. Panetón D'Onofrio, «Charitón: de la tele a la góndola» (2024)</h3>
<p>Charitón era un panetón de ficción en la serie <em>Al fondo hay sitio</em>. Nestlé y América TV lo fabricaron de verdad y lo pusieron en supermercados. Ganó el Gran Effie 2025, además de oro en extensión de línea (<a href="https://www.adlatina.com/publicidad/gran-effie-per-2025-charitn-de-la-tele-a-la-gndola-para-nestl" ${EXT}>Adlatina</a>). Lo que enseña: el <em>product placement</em> al revés existe, y en una categoría tan peleada como el panetón sirve para diferenciarse.</p>

<h3>5. Avinka, «Prueba un pollo de verdad, honestamente» (2023-2024)</h3>
<p>Avinka cambió su eslogan por una sola palabra, «honestamente», y montó un canje: llevabas un pollo de juguete a sus tiendas y te daban un cupón. Los juguetes se donaron. Gran Effie 2024 y oro en Alimentos (<a href="https://www.adlatina.com/publicidad/boost-brand-accelerator-y-grupo-santa-elena-conquistaron-el-gran-effie-peru-2024" ${EXT}>Adlatina</a>). Lo que enseña: una marca pequeña frente a gigantes gana con un atributo claro y una acción que la gente pueda tocar.</p>

<h3>6. Cementos Pacasmayo, «Del hombro pal trompo» (2023)</h3>
<p>Una cementera del norte ganó el Gran Effie 2023 con Mayo Publicidad y TOC Asociados (<a href="https://effie-peru.com/gran-effie/" ${EXT}>Effie Perú</a>). Es la prueba de que las campañas eficaces no son solo de consumo masivo: en B2B y construcción también se compite con ideas.</p>

<h3>7. Pilsen Callao, «El sabor de la amistad» (desde 2008)</h3>
<p>Pilsen dejó de hablar de la cerveza y habló de los amigos. El reposicionamiento ganó el Gran Effie 2008 y la continuación, «Enamorados de la verdadera amistad», el de 2015, ambos con Publicis Asociados (<a href="https://effie-peru.com/gran-effie/" ${EXT}>Effie Perú</a>). De ahí salieron acciones como el «Día del Amigo» (<a href="https://www.ipp.edu.pe/blog/campanas-de-publicidad-exitosas/" ${EXT}>IPP</a>). Lo que enseña: una plataforma de marca que dura 15 años rinde más que diez campañas sueltas.</p>

<h3>8. Leche Gloria, «Tres vasos de leche al día» (2005)</h3>
<p>Un mensaje de consumo recomendado convertido en canción para niños. Ganó el Effie de Plata 2005 por la claridad del mensaje (<a href="https://www.ipp.edu.pe/blog/campanas-de-publicidad-exitosas/" ${EXT}>IPP</a>). <a href="https://www.youtube.com/watch?v=1u8HI1qSZk0" ${EXT}>Ver el spot</a>.</p>

<h3>9. BCP, «Es fin de mes» (2008)</h3>
<p>El estribillo de la cuenta sueldo, hecho por la agencia Causa, entró en el habla de la gente (<a href="https://www.ipp.edu.pe/blog/campanas-de-publicidad-exitosas/" ${EXT}>IPP</a>). El BCP volvió a ganar el Gran Effie en 2019 con «Contigo capitán» y en 2022 con «5to Piso» (<a href="https://effie-peru.com/gran-effie/" ${EXT}>Effie Perú</a>).</p>

<h3>10. Rímac Seguros, «Todo va a estar bien» (2012)</h3>
<p>Una canción con un mensaje simple para una categoría que genera desconfianza. El jingle, lanzado en 2012, se ha estudiado en tesis de comunicación por su nivel de recordación (<a href="https://repositorio.upn.edu.pe/handle/11537/13966" ${EXT}>repositorio UPN</a>).</p>

<h3>11. Entel, «Hoy conectados, mañana juntos» (2020)</h3>
<p>Lanzada en marzo de 2020, al inicio de la cuarentena. El abuelo Pacho y su nieta prometían reencontrarse cuando todo pasara. La campaña es objeto de varias tesis sobre storytelling en pandemia (<a href="https://repositorio.ucv.edu.pe/handle/20.500.12692/84914" ${EXT}>repositorio UCV</a>). <a href="https://www.youtube.com/watch?v=o9b5Rk0NrKM" ${EXT}>Ver el spot</a>.</p>

<h3>12. Brahma, «No pasa»</h3>
<p>En plena guerra con Backus, Brahma juntó a Carlos Alcántara, Roberto Challe y otras figuras conocidas, y la frase «no pasa, no pasa» se volvió de uso diario (<a href="https://www.ipp.edu.pe/blog/campanas-de-publicidad-exitosas/" ${EXT}>IPP</a>).</p>

<h2>¿Qué tienen en común las campañas peruanas que funcionan?</h2>
<p>Revisando los Gran Effie de los últimos 20 años se repiten cuatro cosas:</p>
<ul>
<li><strong>Parten de un código local.</strong> Un día de la semana, una orquesta de cumbia, una serie de televisión, una jerga. Nada de eso se puede copiar de una campaña extranjera.</li>
<li><strong>Tienen un objetivo de negocio concreto.</strong> Vender pavita fuera de diciembre, colocar capital de trabajo en temporada escolar, que se usen más funciones de una app.</li>
<li><strong>Sostienen la idea en el tiempo.</strong> Pilsen lleva la amistad desde 2008. San Fernando volvió a Jueves de Pavita años después.</li>
<li><strong>Miden.</strong> Sin datos de ventas o de uso no hay Effie. Por eso los casos de arriba se pueden contar con cifras.</li>
</ul>

<h2>¿Cómo aplicar esto si no tienes presupuesto de marca grande?</h2>
<p>Casi todas estas campañas tuvieron televisión. Una pyme peruana puede usar la misma lógica con pauta digital, que se puede medir desde el primer sol:</p>
<ol>
<li>Busca la costumbre o la frase que ya usan tus clientes. Está en los comentarios de tus redes y en las búsquedas de Google.</li>
<li>Ata la idea a un producto y a una fecha de venta, como hizo Mibanco con la campaña escolar.</li>
<li>Pruébala con poco dinero en <a href="/es/servicios/meta-ads">Meta Ads</a> (Facebook e Instagram) para ver qué versión engancha, y captura la demanda que ya existe con <a href="/es/servicios/google-ads">Google Ads</a>.</li>
<li>Define antes cómo vas a medir: ventas, leads o uso, no solo alcance.</li>
</ol>
<p>Si quieres saber cuánto cuesta cada canal, tenemos una guía de <a href="/es/blogs/cuanto-cuesta-publicidad-facebook-instagram-peru-2026">precios de publicidad en Facebook e Instagram en Perú</a> y otra sobre las <a href="/es/blogs/caracteristicas-de-la-publicidad-importancia-y-claves-para-el-exito">características de la publicidad eficaz</a>.</p>

<h2>Preguntas frecuentes</h2>

<h3>¿Cuál es la campaña publicitaria más exitosa del Perú?</h3>
<p>No hay una sola, pero Jueves de Pavita de San Fernando es la más citada: ganó el Gran Effie 2013 y subió 40 % las ventas de pavita en un año, según Gestión. Por resultados recientes destacan Escolares Útiles de Mibanco (Gran Effie 2018) y Hermanos Yapean de Yape (Gran Effie 2026).</p>

<h3>¿Qué es el Gran Effie?</h3>
<p>Es el premio principal de los Effie Awards Perú, que reconocen la eficacia en marketing. Se entrega una vez al año a la campaña con mejores resultados demostrados. En 2026 Effie Perú recibió más de 450 campañas inscritas y entregó un solo Gran Effie.</p>

<h3>¿Qué agencias peruanas han ganado más Gran Effie?</h3>
<p>Según la lista oficial de Effie Perú, Circus (hoy Circus Grey) ganó cinco: 2011, 2013 y 2014 con San Fernando, 2020 con Lima 2019 y 2021 con Qroma. Leo Burnett suma cinco entre 2000 y 2006.</p>

<h3>¿Qué es una campaña publicitaria?</h3>
<p>Es un conjunto de piezas y acciones con un mismo mensaje, dirigidas a un público durante un periodo definido, para lograr un objetivo de marca o de ventas. Un spot suelto no es una campaña: la campaña es la idea que une todas las piezas.</p>

<h3>¿Una pyme puede hacer una campaña como estas?</h3>
<p>Puede usar el mismo método a menor escala: una idea local, atada a un producto y a una fecha, probada con presupuesto pequeño en Meta Ads y Google Ads, y medida en ventas o leads.</p>
`,
  },

  // ───────────── 2 — IA para tesis ─────────────
  {
    slug: "10-herramientas-ia-que-debes-conocer-para-tu-tesis",
    locale: "es",
    title: "10 herramientas de IA para tu tesis en 2026 y cómo usarlas sin plagiar",
    focus_keyword: "ia para tesis",
    meta_title: "IA para tesis en 2026, 10 herramientas y cómo usarlas bien",
    meta_description:
      "Qué IA usar en cada fase de la tesis (buscar papers, leer, citar, redactar): 10 herramientas con versión gratuita y las reglas de RENATI y APA.",
    excerpt:
      "Diez herramientas de IA ordenadas por fase de la tesis, de la búsqueda de papers a la redacción, con lo que dicen RENATI, la UNESCO y APA sobre su uso.",
    og_title: "IA para tesis, 10 herramientas y cómo usarlas bien",
    og_description:
      "Herramientas de IA por fase de la tesis y las reglas para usarlas sin plagiar.",
    featured_image:
      "https://3rcore-server.com.pe/wp-content/uploads/2023/06/high-angle-books-graduation-cap-education-day-scaled.jpg",
    featured_image_alt: "Libros y birrete de graduación: herramientas de IA para la tesis",
    author_name: AUTHOR,
    content: `<p class="lead">La <strong>IA para tesis</strong> sirve sobre todo para tres cosas: encontrar papers que no habrías visto, leer y resumir fuentes largas y revisar la redacción. Para escribir la tesis por ti no sirve, porque inventa citas y porque tu universidad pasa el trabajo por software antiplagio. Estas son diez herramientas ordenadas por fase, todas con versión gratuita.</p>

<p><em>Actualizado el 28 de septiembre de 2026. Escribe Piero Roque, 3R Core. Los planes y límites de cada herramienta cambian seguido: revisa su web antes de pagar nada.</em></p>

<h2>¿Qué IA sirve para cada fase de la tesis?</h2>
<table>
<thead><tr><th>Fase</th><th>Herramienta</th><th>Para qué la usarías</th></tr></thead>
<tbody>
<tr><td>Elegir tema y buscar fuentes</td><td>Semantic Scholar, Elicit, Consensus</td><td>Encontrar papers por pregunta, no por palabra exacta</td></tr>
<tr><td>Mapear la literatura</td><td>ResearchRabbit, Connected Papers</td><td>Ver qué autores y artículos se citan entre sí</td></tr>
<tr><td>Leer y resumir</td><td>NotebookLM</td><td>Hacer preguntas a tus propios PDF, con la cita del pasaje</td></tr>
<tr><td>Investigar un tema amplio</td><td>Gemini (Deep Research), Perplexity</td><td>Informes con enlaces que luego verificas tú</td></tr>
<tr><td>Ordenar referencias</td><td>Zotero</td><td>Guardar fuentes y generar la bibliografía en APA</td></tr>
<tr><td>Redactar y corregir</td><td>ChatGPT, DeepL</td><td>Revisar claridad, traducir abstracts, detectar errores</td></tr>
</tbody>
</table>

<h2>Las 10 herramientas</h2>

<h3>1. Semantic Scholar</h3>
<p>Buscador académico gratuito del Allen Institute for AI. Muestra un resumen de una línea de cada paper y quién lo cita. Es un buen punto de partida cuando Google Académico te devuelve demasiado. <a href="https://www.semanticscholar.org/" ${EXT}>semanticscholar.org</a></p>

<h3>2. Elicit</h3>
<p>Le haces una pregunta de investigación y te devuelve papers relevantes con una tabla de datos extraídos (muestra, método, resultado). Sirve mucho para el estado del arte. Verifica siempre lo extraído contra el PDF. <a href="https://elicit.com/" ${EXT}>elicit.com</a></p>

<h3>3. Consensus</h3>
<p>Pensada para preguntas de sí o no («¿el teletrabajo reduce la productividad?»). Resume qué dice la evidencia publicada y enlaza los estudios. Útil para justificar hipótesis. <a href="https://consensus.app/" ${EXT}>consensus.app</a></p>

<h3>4. ResearchRabbit y Connected Papers</h3>
<p>Partes de uno o dos papers clave y te dibujan la red de artículos relacionados. Es la forma más rápida de detectar a los autores que no puedes dejar fuera del marco teórico. <a href="https://www.researchrabbit.ai/" ${EXT}>researchrabbit.ai</a> · <a href="https://www.connectedpapers.com/" ${EXT}>connectedpapers.com</a></p>

<h3>5. NotebookLM</h3>
<p>De Google. Subes tus PDF y le preguntas; responde solo con lo que hay en esos documentos y marca de dónde sale cada frase. Para una tesis es más seguro que un chat abierto, porque no mezcla fuentes que no has leído. <a href="https://notebooklm.google.com/" ${EXT}>notebooklm.google.com</a></p>

<h3>6. Gemini con Deep Research</h3>
<p>Hace una búsqueda larga y te entrega un informe con enlaces. Úsalo para entender un tema nuevo, nunca como fuente citable: la fuente es el documento al que enlaza, y hay que abrirlo. <a href="https://gemini.google.com/" ${EXT}>gemini.google.com</a></p>

<h3>7. Perplexity</h3>
<p>Buscador conversacional que cita sus fuentes en cada respuesta. Sirve para localizar normas, datos oficiales o informes del INEI y de ministerios que luego citas directamente. <a href="https://www.perplexity.ai/" ${EXT}>perplexity.ai</a></p>

<h3>8. Zotero</h3>
<p>No es IA generativa, pero sin un gestor de referencias la bibliografía se vuelve un infierno en el último mes. Es gratuito y de código abierto, guarda la fuente desde el navegador y genera citas en APA 7. Mendeley hace algo parecido. <a href="https://www.zotero.org/" ${EXT}>zotero.org</a></p>

<h3>9. ChatGPT</h3>
<p>Donde más ayuda es revisando: pídele que señale frases ambiguas, saltos lógicos o párrafos repetidos en un capítulo que ya escribiste. No le pidas referencias bibliográficas: puede inventar títulos y DOI que no existen. <a href="https://chatgpt.com/" ${EXT}>chatgpt.com</a></p>

<h3>10. DeepL</h3>
<p>Traductor para leer papers en inglés y para revisar tu abstract. Da mejores resultados si luego corriges la terminología de tu campo a mano. <a href="https://www.deepl.com/" ${EXT}>deepl.com</a></p>

<p>Si lo que necesitas es parafrasear una cita larga, tenemos una guía aparte sobre <a href="/es/blogs/parafrasist-la-mejor-herramienta-para-resumir-textos">Parafrasist y cómo usarlo sin caer en plagio</a>.</p>

<h2>¿Se puede usar IA en la tesis sin que sea plagio?</h2>
<p>Sí, si la IA te ayuda a investigar y revisar, y el análisis y la redacción son tuyos. Tres referencias concretas:</p>
<ul>
<li><strong>RENATI (Sunedu).</strong> El Reglamento del Registro Nacional de Trabajos de Investigación, aprobado por la Resolución 033-2016-SUNEDU/CD, obliga a las universidades a revisar las tesis con software de detección de plagio (<a href="https://cdn.www.gob.pe/uploads/document/file/4494607/Texto%20integrado%20del%20Reglamento%20Renati.pdf" ${EXT}>texto integrado del reglamento</a>). Cada universidad fija luego su propio porcentaje y su política sobre IA: pregunta en tu facultad.</li>
<li><strong>UNESCO.</strong> Su guía de 2023 sobre IA generativa en educación e investigación pide transparencia en el uso y validar lo que produce la herramienta (<a href="https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research" ${EXT}>UNESCO</a>).</li>
<li><strong>APA.</strong> Si usas texto generado, se cita. El formato oficial es «OpenAI. (año). ChatGPT (versión) [Large language model]» y APA recomienda adjuntar el diálogo como anexo (<a href="https://apastyle.apa.org/blog/how-to-cite-chatgpt" ${EXT}>APA Style</a>).</li>
</ul>
<p>En Perú, además, el reglamento de la Ley 31814 sobre inteligencia artificial (D. S. 115-2025-PCM, en vigor desde el 22 de enero de 2026) fija plazos graduales de transparencia para las empresas que usan IA; educación está en el primer grupo (<a href="https://www.gob.pe/institucion/pcm/normas-legales/7133522-115-2025-pcm" ${EXT}>gob.pe</a>). Tu universidad puede publicar reglas propias en ese marco.</p>

<h2>Un flujo de trabajo que funciona</h2>
<ol>
<li>Formula la pregunta de investigación y búscala en Elicit o Consensus.</li>
<li>Elige 3 a 5 papers ancla y amplía la red con ResearchRabbit.</li>
<li>Guarda todo en Zotero desde el primer día.</li>
<li>Sube los PDF a NotebookLM para leerlos más rápido, y cita el paper, no el resumen.</li>
<li>Escribe tú el capítulo. Luego usa ChatGPT solo para revisar claridad.</li>
<li>Anota en un documento qué herramienta usaste y para qué. Si tu asesor pregunta, lo tienes.</li>
</ol>

<h2>Preguntas frecuentes</h2>

<h3>¿Cuál es la mejor IA para hacer una tesis?</h3>
<p>Depende de la fase. Para buscar papers, Elicit o Semantic Scholar. Para leer tus fuentes, NotebookLM. Para ordenar referencias, Zotero. Ninguna debería escribir la tesis por ti.</p>

<h3>¿Turnitin detecta textos hechos con ChatGPT?</h3>
<p>Turnitin incluye un indicador de escritura con IA, y es uno de los programas antiplagio que usan universidades peruanas para el control de similitud que exige RENATI (la <a href="http://bibliotecacrai.unia.edu.pe/wp-content/uploads/2022/07/DIRECTIVAS-DE-USO.pdf" ${EXT}>UNIA</a>, por ejemplo). Ese indicador puede equivocarse en ambos sentidos, así que la mejor defensa es escribir tú y guardar tus borradores.</p>

<h3>¿Cómo se cita ChatGPT en APA 7?</h3>
<p>Como autor va la empresa: OpenAI. (año de la versión que usaste). ChatGPT (versión) [Large language model]. https://chatgpt.com. En el texto: (OpenAI, año). APA recomienda anexar el prompt y la respuesta completos.</p>

<h3>¿Hay herramientas de IA gratis para la tesis?</h3>
<p>Las diez de esta lista tienen versión gratuita, con límites de uso. Zotero y Semantic Scholar son gratis del todo.</p>
`,
  },

  // ───────────── 3 — brochure empresarial ─────────────
  {
    slug: "como-crear-un-brochure-impactante-para-tu-empresa",
    locale: "es",
    title: "Cómo hacer un brochure empresarial en 7 pasos (con estructura y formatos)",
    focus_keyword: "como hacer un brochure empresarial",
    meta_title: "Cómo hacer un brochure empresarial en 7 pasos (con estructura)",
    meta_description:
      "Qué va en cada cara de un brochure empresarial, qué formato elegir (díptico, tríptico o PDF para WhatsApp) y cómo dejarlo listo para imprenta.",
    excerpt:
      "Estructura página por página, formatos, especificaciones para imprenta y la versión en PDF que se manda por WhatsApp: cómo hacer un brochure empresarial que sí se lee.",
    og_title: "Cómo hacer un brochure empresarial en 7 pasos",
    og_description:
      "Estructura, formatos y checklist de imprenta para un brochure empresarial que se lee.",
    featured_image:
      "https://3rcore-server.com.pe/wp-content/uploads/2024/06/Ejemplos-de-brochures-empresariales-bien-disenados-1024x683.png",
    featured_image_alt: "Ejemplos de brochures empresariales bien diseñados",
    author_name: AUTHOR,
    content: `<p class="lead">Para <strong>hacer un brochure empresarial</strong> define primero para quién es y qué quieres que haga después de leerlo. Luego elige el formato (díptico, tríptico o PDF de varias páginas), escribe el texto antes de diseñar, aplica tu manual de marca y prepara dos archivos: uno para imprenta en CMYK y otro liviano para enviar por WhatsApp o correo. Abajo va cada paso, con la estructura página por página.</p>

<p><em>Actualizado el 28 de septiembre de 2026. Escribe Piero Roque, equipo de branding de 3R Core.</em></p>

<h2>¿Qué es un brochure empresarial y para qué sirve hoy?</h2>
<p>Es un documento corto que presenta a la empresa: qué hace, para quién, con qué pruebas y cómo contactarla. Hace diez años era un tríptico que se repartía en ferias. Hoy en Perú se usa sobre todo en PDF: el vendedor lo manda por WhatsApp después de la primera llamada, o se adjunta a una cotización. Por eso tiene que funcionar en pantalla de celular antes que en papel.</p>

<h2>¿Qué formato de brochure elegir?</h2>
<table>
<thead><tr><th>Formato</th><th>Tamaño habitual</th><th>Cuándo conviene</th></tr></thead>
<tbody>
<tr><td>Díptico</td><td>A4 doblado en dos (cada cara A5)</td><td>Un solo servicio o producto, eventos</td></tr>
<tr><td>Tríptico</td><td>A4 horizontal doblado en tres</td><td>Presentación general en ferias y mostrador</td></tr>
<tr><td>Brochure de 8 a 16 páginas</td><td>A4 o 21 × 21 cm, grapado</td><td>Empresas B2B con varios servicios o proyectos</td></tr>
<tr><td>PDF digital</td><td>Horizontal 16:9 o vertical A4</td><td>Envío por WhatsApp y correo, propuestas comerciales</td></tr>
</tbody>
</table>
<p>El A4 mide 210 × 297 mm según la norma ISO 216 (<a href="https://es.wikipedia.org/wiki/ISO_216" ${EXT}>ISO 216</a>). Si vas a imprimir, pide a tu imprenta su plantilla antes de diseñar: cada una trabaja con márgenes y pliegues un poco distintos.</p>

<h2>Cómo hacer un brochure empresarial paso a paso</h2>

<h3>1. Define el público y la acción que buscas</h3>
<p>Un brochure para un gerente de compras no se escribe igual que uno para un cliente final. Escribe en una línea quién lo va a leer y qué quieres que haga después: pedir una cotización, agendar una visita, escribir por WhatsApp.</p>

<h3>2. Escribe el texto antes de diseñar</h3>
<p>El error más común es abrir Canva primero y rellenar cajas con texto después. Redacta en un documento: titular, propuesta de valor en una frase, servicios, pruebas y llamada a la acción. Si no cabe en dos páginas de Word, sobra texto.</p>

<h3>3. Ordena el contenido con esta estructura</h3>
<p>Para un tríptico, las seis caras se reparten así:</p>
<ul>
<li><strong>Portada:</strong> logo, una promesa concreta y una imagen real de tu trabajo.</li>
<li><strong>Solapa interior:</strong> el problema del cliente, contado con sus palabras.</li>
<li><strong>Tres caras interiores:</strong> servicios o productos, cada uno con su beneficio y un dato verificable (plazos, garantías, certificaciones).</li>
<li><strong>Contraportada:</strong> datos de contacto, WhatsApp, dirección, redes y un código QR a tu web o catálogo.</li>
</ul>
<p>En un PDF de varias páginas añade una página de casos o clientes, con su permiso, y otra de proceso de trabajo.</p>

<h3>4. Aplica tu identidad visual, no la de una plantilla</h3>
<p>Colores con código exacto, tipografías de la marca y el mismo estilo de foto que en tu web. Si no tienes estas reglas escritas, las encuentras en tu <a href="/es/blogs/manual-marca-estructura-plantilla">manual de marca</a>. Y si estás eligiendo la paleta desde cero, revisa nuestra guía de <a href="/es/blogs/la-psicologia-de-los-colores-un-glosario-sobre-la-identidad-de-marca">psicología del color para marcas</a>.</p>

<h3>5. Usa fotos propias</h3>
<p>Las fotos de banco de imágenes se reconocen enseguida y no prueban nada. Una foto de tu equipo, tu planta o un proyecto terminado vale más que cualquier ilustración.</p>

<h3>6. Prepara el archivo para imprenta</h3>
<ul>
<li>Colores en CMYK, no en RGB.</li>
<li>Imágenes a 300 ppp al tamaño final.</li>
<li>Sangrado alrededor del diseño (lo más común son 3 mm; confirma con la imprenta).</li>
<li>Textos a una distancia segura del corte y de los pliegues.</li>
<li>PDF de alta calidad con las fuentes incrustadas.</li>
</ul>

<h3>7. Saca la versión digital</h3>
<p>Exporta una segunda versión en RGB, página a página (no en pliegos), con enlaces clicables al WhatsApp y a la web, y con un peso bajo para que se abra rápido con datos móviles. Es la versión que más se va a ver.</p>

<h2>Errores que hacen que nadie lea tu brochure</h2>
<ul>
<li>Empezar por la historia de la empresa en lugar del problema del cliente.</li>
<li>Poner todos los servicios con el mismo peso. Destaca uno o dos.</li>
<li>Letra de menos de 9 puntos en papel, o texto ilegible en el celular.</li>
<li>Sin llamada a la acción, o con cinco a la vez.</li>
<li>Datos de contacto viejos. Revisa teléfonos y correos antes de cada tiraje.</li>
</ul>

<h2>Checklist antes de enviarlo</h2>
<ol>
<li>¿Se entiende qué haces leyendo solo la portada?</li>
<li>¿Cada servicio dice qué gana el cliente?</li>
<li>¿Hay al menos una prueba (caso, cliente, certificación)?</li>
<li>¿El WhatsApp y la web funcionan desde el PDF?</li>
<li>¿Los colores y el logo coinciden con tu web y tus redes?</li>
</ol>
<p>Si prefieres que lo haga un equipo, el brochure entra dentro de nuestro servicio de <a href="/es/servicios/branding">branding</a>, junto con el manual de marca. Puedes ver qué incluye cada nivel en <a href="/es/blogs/cuanto-cuesta-branding-peru-2026">cuánto cuesta el branding en Perú</a>.</p>

<h2>Preguntas frecuentes</h2>

<h3>¿Qué debe llevar un brochure empresarial?</h3>
<p>Logo y promesa en la portada, el problema que resuelves, tus servicios con su beneficio, pruebas (casos o clientes), datos de contacto y una sola llamada a la acción.</p>

<h3>¿Cuántas páginas debe tener un brochure?</h3>
<p>Un tríptico tiene seis caras y basta para la mayoría de pymes. Si vendes a empresas y tienes varios servicios o proyectos, un PDF de 8 a 16 páginas funciona mejor.</p>

<h3>¿Con qué programa se hace un brochure?</h3>
<p>Los diseñadores usan Adobe InDesign o Illustrator. Para algo sencillo sirven Canva o Adobe Express, siempre que partas de tus colores y tipografías, no de los de la plantilla.</p>

<h3>¿Qué diferencia hay entre brochure, folleto y catálogo?</h3>
<p>En Perú se usan casi como sinónimos. En la práctica, el brochure presenta a la empresa, el folleto promociona algo puntual y el catálogo lista productos con precios o códigos.</p>
`,
  },

  // ───────────── 4 — psicología del color ─────────────
  {
    slug: "la-psicologia-de-los-colores-un-glosario-sobre-la-identidad-de-marca",
    locale: "es",
    title: "Psicología del color en marcas, qué dice la evidencia y cómo elegir tu paleta",
    focus_keyword: "psicología del color en marcas",
    meta_title: "Psicología del color en marcas, evidencia y ejemplos peruanos",
    meta_description:
      "Qué transmite cada color según los estudios, qué mitos circulan, ejemplos de marcas peruanas y un método en 5 pasos para elegir la paleta de tu marca.",
    excerpt:
      "Glosario de colores con ejemplos de marcas peruanas, lo que sí demuestran los estudios sobre color y marca, y un método para elegir tu paleta sin guiarte por tu color favorito.",
    og_title: "Psicología del color en marcas, evidencia y ejemplos",
    og_description:
      "Qué transmite cada color, qué dicen los estudios y cómo elegir la paleta de tu marca.",
    featured_image: IMG("1513364776144-60967b0f800f"),
    featured_image_alt: "Pinceles y pintura de colores: psicología del color para marcas",
    author_name: AUTHOR,
    content: `<p class="lead">La <strong>psicología del color en marcas</strong> estudia cómo los colores cambian lo que la gente piensa de una marca. La evidencia más sólida dice que el color influye en la personalidad que se le atribuye (el rojo se lee como emocionante, el azul como competente) y en cuánto gusta y se recuerda. Lo que no existe es una tabla universal en la que cada color «significa» una sola cosa: depende de la categoría, la cultura y la competencia. Aquí va el glosario, lo que dicen los estudios y un método para elegir tu paleta.</p>

<p><em>Actualizado el 28 de septiembre de 2026. Escribe Piero Roque, equipo de branding de 3R Core.</em></p>

<h2>¿Qué dicen los estudios sobre el color y las marcas?</h2>
<ul>
<li><strong>Labrecque y Milne (2012)</strong>, en cuatro estudios publicados en el <em>Journal of the Academy of Marketing Science</em>, relacionaron tonos con rasgos de personalidad de marca: el rojo con emoción, el azul con competencia. También vieron que la saturación y la luminosidad refuerzan o suavizan esos rasgos, y que el color cambia la intención de compra (<a href="https://link.springer.com/article/10.1007/s11747-010-0245-y" ${EXT}>Springer</a>).</li>
<li><strong>Elliot y Maier (2014)</strong> revisaron la investigación sobre color y conducta en el <em>Annual Review of Psychology</em>. Su conclusión es prudente: los efectos existen, pero dependen mucho del contexto y el campo todavía es joven (<a href="https://www.annualreviews.org/content/journals/10.1146/annurev-psych-010213-115035" ${EXT}>Annual Reviews</a>).</li>
<li><strong>Singh (2006)</strong> es el origen de la cifra que más se repite: que la gente decide sobre un producto en 90 segundos y que entre el 62 % y el 90 % de esa valoración se basa solo en el color (<a href="https://www.emerald.com/md/article-abstract/44/6/783/283364/Impact-of-color-on-marketing" ${EXT}>Management Decision</a>). Es un artículo de revisión, no un experimento propio, así que conviene citarlo con cuidado.</li>
</ul>
<p>Traducido a decisiones: el color importa, pero sus efectos dependen de a qué se dedica tu marca y contra quién compite. Por eso copiar el color del líder casi nunca funciona.</p>

<h2>Glosario: qué se asocia a cada color, con ejemplos peruanos</h2>
<table>
<thead><tr><th>Color</th><th>Asociaciones frecuentes</th><th>Marcas en Perú que lo usan</th><th>Cuidado con</th></tr></thead>
<tbody>
<tr><td>Amarillo</td><td>Alegría, energía, cercanía</td><td>Inca Kola</td><td>Poco contraste sobre blanco</td></tr>
<tr><td>Azul</td><td>Confianza, competencia, estabilidad</td><td>BCP, Movistar</td><td>Es el color más usado en banca y tecnología: cuesta diferenciarse</td></tr>
<tr><td>Rojo</td><td>Emoción, urgencia, apetito</td><td>Claro, Coca-Cola</td><td>En exceso se lee como alarma o descuento</td></tr>
<tr><td>Verde</td><td>Naturaleza, salud, dinero</td><td>Interbank</td><td>Muy genérico en alimentos y productos «eco»</td></tr>
<tr><td>Naranja</td><td>Dinamismo, juventud, precio accesible</td><td>Entel (azul y naranja)</td><td>Puede restar percepción de lujo</td></tr>
<tr><td>Morado</td><td>Creatividad, diferencia, algo de lujo</td><td>Yape</td><td>Pocas marcas lo usan: bien para destacar, riesgoso si el sector es muy formal</td></tr>
<tr><td>Negro</td><td>Elegancia, lujo, autoridad</td><td>Marcas de moda y premium</td><td>Puede sentirse frío o distante</td></tr>
<tr><td>Blanco</td><td>Limpieza, simplicidad, salud</td><td>Clínicas y marcas de tecnología</td><td>Solo no identifica: necesita un color de acento</td></tr>
</tbody>
</table>
<p>Las asociaciones de la tabla son las más citadas en la literatura de marketing. No son reglas: Inca Kola es amarilla y no vende alegría en abstracto, vende identidad peruana. El color funciona junto con todo lo demás.</p>

<h3>Amarillo</h3>
<p>Es el color más visible a distancia, por eso se usa en señalización y en marcas que quieren verse desde lejos en el punto de venta. En Perú está unido a Inca Kola, lo que hace difícil usarlo en bebidas sin que te comparen.</p>

<h3>Azul</h3>
<p>Transmite competencia y fiabilidad, según el estudio de Labrecque y Milne. Justo por eso lo usan bancos, aseguradoras y empresas de software. Si tu sector es azul, un azul distinto o un color de acento fuerte te ayuda a no desaparecer entre los demás.</p>

<h3>Rojo</h3>
<p>Se asocia a la emoción y a la urgencia. Funciona en comida, telecomunicaciones y promociones. Usado en todo, pierde fuerza: guárdalo para lo que quieres que se mire primero.</p>

<h3>Verde</h3>
<p>Naturaleza y bienestar, pero también dinero. En alimentos saludables es tan común que ya no diferencia; en banca, Interbank lo convirtió en su seña.</p>

<h3>Morado</h3>
<p>Históricamente asociado al lujo. En Perú Yape lo usa para diferenciarse del azul y el rojo de la banca tradicional, y a la vez se lee como algo nuevo.</p>

<h3>Naranja, negro y blanco</h3>
<p>El naranja suma energía sin la agresividad del rojo. El negro se asocia al lujo y a la autoridad. El blanco transmite limpieza, pero por sí solo no identifica: casi siempre necesita un color de acento.</p>

<h2>Mitos que conviene dejar de repetir</h2>
<ul>
<li><strong>«El rojo da hambre, por eso lo usan las cadenas de comida rápida.»</strong> Hay asociación con el apetito, pero muchas cadenas también usan el rojo por visibilidad y por historia. No es una fórmula que puedas copiar.</li>
<li><strong>«Cada color tiene un significado fijo.»</strong> Elliot y Maier insisten en que el efecto depende del contexto. El blanco es pureza en una clínica y luto en otras culturas.</li>
<li><strong>«El color aumenta el reconocimiento de marca un 80 %.»</strong> Circula mucho en blogs sin estudio de origen identificable. Si no puedes enlazar la fuente, no lo uses.</li>
</ul>

<h2>Cómo elegir la paleta de tu marca en 5 pasos</h2>
<ol>
<li><strong>Escribe tres adjetivos de la personalidad de tu marca</strong> (por ejemplo: cercana, experta, rápida). El color tiene que reforzarlos.</li>
<li><strong>Mira los colores de tus cinco competidores directos.</strong> Si todos son azules, ahí tienes una oportunidad.</li>
<li><strong>Elige un color principal y uno o dos de acento.</strong> Más de tres colores protagonistas cuesta mantenerlos en redes, web e impresos.</li>
<li><strong>Comprueba el contraste.</strong> Para texto normal, las pautas de accesibilidad WCAG piden una relación mínima de 4,5:1 entre texto y fondo (<a href="https://www.w3.org/TR/WCAG22/#contrast-minimum" ${EXT}>W3C</a>). Muchos amarillos y verdes claros no llegan sobre blanco.</li>
<li><strong>Documenta los códigos exactos</strong> en HEX, RGB, CMYK y Pantone. Es la sección de colores de tu <a href="/es/blogs/manual-marca-estructura-plantilla">manual de marca</a>, y lo que evita que cada proveedor use un tono distinto.</li>
</ol>
<p>Con la paleta definida, aplícala a todo: logo, web, redes y piezas impresas como el <a href="/es/blogs/como-crear-un-brochure-impactante-para-tu-empresa">brochure de la empresa</a>. Si estás creando o renovando tu identidad, en <a href="/es/servicios/branding">branding</a> trabajamos la paleta junto con el logo y el manual. También te puede servir la guía sobre los <a href="/es/blogs/tipos-de-logo">tipos de logo</a>.</p>

<h2>Preguntas frecuentes</h2>

<h3>¿Qué es la psicología del color en el marketing?</h3>
<p>Es el estudio de cómo los colores influyen en la percepción y la conducta del consumidor. En marcas, se usa para elegir colores que refuercen la personalidad que la empresa quiere transmitir.</p>

<h3>¿Qué color transmite más confianza en una marca?</h3>
<p>El azul es el que más se asocia a competencia y confianza, según Labrecque y Milne (2012). Por eso lo usan tantos bancos y aseguradoras, lo que también lo hace difícil para diferenciarse.</p>

<h3>¿Cuántos colores debe tener una marca?</h3>
<p>Lo habitual es un color principal y uno o dos de acento, más neutros para fondos y textos. Con más colores protagonistas cuesta mantener la coherencia.</p>

<h3>¿El color del logo influye en las ventas?</h3>
<p>Influye en cómo se percibe la marca y en la intención de compra, según los estudios citados. Pero ninguna investigación seria atribuye las ventas solo al color: depende también del producto, el precio y la competencia.</p>
`,
  },
]
