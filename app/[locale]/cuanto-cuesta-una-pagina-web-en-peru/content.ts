/**
 * /es/cuanto-cuesta-una-pagina-web-en-peru — página comercial de precios.
 *
 * Consolida los posts que se repartían «cuánto cuesta una página web en Perú»
 * (301 en next.config.ts, bloque «Tanda 2 Perú»). Todos los montos salen de lo
 * que el sitio ya publica: /es/precios (tabla y FAQ), /es/servicios/web-development,
 * /es/servicios/google-ads, /es/posicionamiento-seo y /es/servicios/socialmedia.
 * El IGV se calcula aquí (18 % sobre el neto). No se citan precios de terceros.
 */
import {
  bridges, cklist, closing, cotiza, faqBlock, hero, numlist, page, prose, sec, table,
  type Faq, type LandingPeru,
} from '@/lib/landings-peru'

const faq: Faq[] = [
  {
    q: '¿Cuánto cuesta una página web en Perú en 2026?',
    a: 'En 3R Core una landing page cuesta S/1,800, una web corporativa S/4,500 y una tienda virtual va de S/2,500 (hasta 50 productos) a S/6,500 (catálogo amplio con pasarela y envíos). Los desarrollos a medida arrancan en S/12,000. Son precios netos: la factura suma el 18 % de IGV. Los montos indicados son referenciales.',
  },
  {
    q: '¿Cuánto cuesta al mes tener una página web?',
    a: 'La web se paga una sola vez, en dos partes: 50 % al empezar y 50 % contra entrega. Lo que puede ser mensual es aparte y opcional: el mantenimiento (se cotiza junto al proyecto), el dominio y el alojamiento que cobra su proveedor, y el trabajo para traer visitas, como el SEO desde S/1,800 al mes. Los montos indicados son referenciales.',
  },
  {
    q: '¿Los precios incluyen IGV?',
    a: 'No. Los precios publicados son netos y en la factura se suma el IGV del 18 %. Una landing de S/1,800 factura S/2,124 y una web corporativa de S/4,500 factura S/5,310. Los montos indicados son referenciales.',
  },
  {
    q: '¿Cuánto se demora en estar lista una página web?',
    a: 'Una landing está lista en 1 a 2 semanas, una web corporativa en 3 a 5 semanas y una tienda virtual en 2 a 6 semanas según el plan. El plazo corre desde que tenemos tu brief y tus materiales: logo, textos base y fotos.',
  },
  {
    q: '¿El precio incluye SEO?',
    a: 'Incluye el SEO técnico: estructura, etiquetas, velocidad de carga y sitemap, para que Google indexe bien la web desde el lanzamiento. El posicionamiento mes a mes (contenido, enlaces y reporte) es un servicio aparte que parte en S/1,800 al mes. Los montos indicados son referenciales.',
  },
  {
    q: '¿Puedo administrar mi página web yo mismo?',
    a: 'Sí. Entregamos un panel para editar textos, fotos y secciones, y una capacitación práctica antes de cerrar el proyecto. Los accesos quedan a tu nombre.',
  },
  {
    q: '¿Por qué una tienda virtual cuesta S/2,500 y otra S/12,000?',
    a: 'La de S/2,500 cubre hasta 50 productos con lo esencial para vender. La completa de S/6,500 suma catálogo amplio, pasarela de pagos y logística. Desde S/12,000 es desarrollo a medida con integraciones propias, como un ERP, stock en varios almacenes o suscripciones. Los montos indicados son referenciales.',
  },
  {
    q: '¿Los precios son los mismos fuera de Lima?',
    a: 'Sí. Trabajamos con negocios de todo el Perú por WhatsApp y videollamada con los mismos precios. Fuera de Lima, los clientes que más nos escriben están en Chiclayo, Trujillo y Arequipa.',
  },
]

const html = page(
  hero({
    crumb: 'Cuánto cuesta una página web',
    h1: '¿Cuánto cuesta una página web en Perú? <span class="mg">Precios 2026</span> (referenciales)',
    lede:
      'En 3R Core una landing page cuesta <b>S/1,800</b>, una web corporativa <b>S/4,500</b> y una tienda virtual arranca en <b>S/2,500</b>. Son montos netos: en la factura se suma el 18 % de IGV. Abajo tienes la tabla completa, qué sube o baja el precio y cómo se paga. Los montos indicados son referenciales y la cotización final depende del alcance de tu proyecto.',
    waMsg: 'Hola 3R Core, vi los precios de páginas web y quiero cotizar la mía.',
    second: { href: '/es/cotizar', label: 'Usar el cotizador' },
    art: cotiza({
      title: '¿Qué web necesitas?',
      opts: [
        { label: 'Landing page', price: 'S/ 1,800', note: 'una página que convierte · 1 a 2 semanas', msg: 'Hola, quiero cotizar una landing page.' },
        { label: 'Web corporativa', price: 'S/ 4,500', note: 'servicios, nosotros, blog y contacto · 3 a 5 semanas', msg: 'Hola, quiero cotizar una web corporativa.' },
        { label: 'Tienda hasta 50 productos', price: 'S/ 2,500', note: 'catálogo corto · 2 a 3 semanas', msg: 'Hola, quiero cotizar una tienda de hasta 50 productos.' },
        { label: 'Tienda completa', price: 'S/ 6,500', note: 'pasarela, envíos y facturación · 4 a 6 semanas', msg: 'Hola, quiero cotizar una tienda virtual completa.' },
      ],
    }),
  }),

  sec({
    h2: 'Tabla de precios de páginas web en Perú 2026',
    intro:
      'Precios publicados por 3R Core, en soles. La columna con IGV la calculamos sumando el 18 % al neto. Los precios son referenciales y varían según el alcance del proyecto. Actualizado el 28 de septiembre de 2026.',
    body: table(
      ['Tipo de web', 'Precio neto', 'Con IGV (18 %)', 'Plazo', 'Para quién'],
      [
        ['Landing page', 'S/1,800', 'S/2,124', '1 a 2 semanas', 'Campañas de Google Ads o redes que necesitan una sola página que convierta'],
        ['Web corporativa', 'S/4,500', 'S/5,310', '3 a 5 semanas', 'Empresas a las que el cliente googlea antes de llamar: servicios, nosotros, blog y contacto'],
        ['Tienda virtual hasta 50 productos', 'S/2,500', 'S/2,950', '2 a 3 semanas', 'Negocios que empiezan a vender en línea con un catálogo corto'],
        ['Tienda virtual completa', 'S/6,500', 'S/7,670', '4 a 6 semanas', 'Catálogos amplios con pasarela de pagos, envíos y facturación'],
        ['Tienda o web a medida', 'Desde S/12,000', 'Desde S/14,160', 'Desde 8 semanas', 'Integraciones propias: ERP, stock en varios almacenes, suscripciones'],
      ]
    ),
  }),

  sec({
    alt: true,
    h2: '¿Qué incluye el precio de una página web?',
    intro: 'Esto entra en cualquiera de los planes de la tabla. No se cobra aparte.',
    body: cklist([
      { b: 'Diseño propio, sin plantilla', s: 'La web se diseña desde cero para tu marca. No partimos de un tema prefabricado que comparten miles de sitios.' },
      { b: 'Primero el celular', s: 'Diseñamos la versión móvil antes que la de escritorio, porque es donde te va a ver la mayoría de tus clientes.' },
      { b: 'SEO técnico de base', s: 'Estructura, etiquetas, velocidad y sitemap listos para que Google indexe la web desde el lanzamiento.' },
      { b: 'Panel para editarla', s: 'Cambias textos, fotos y secciones cuando quieras, sin pedirle permiso a la agencia.' },
      { b: 'Capacitación y accesos a tu nombre', s: 'Una sesión práctica con tu propio contenido antes de cerrar, y todos los accesos quedan a tu nombre.' },
      { b: 'Contacto que llega', s: 'Formulario y botón de WhatsApp conectados y probados, para que cada consulta termine en tu bandeja.' },
    ]),
  }),

  sec({
    h2: '¿Qué hace que una página web cueste más o menos?',
    intro: 'La cantidad de páginas pesa menos de lo que parece. Estas cinco cosas mueven el número de verdad.',
    body: numlist([
      { h: 'Si vendes en línea y cuántos productos', p: 'Una web que solo informa no necesita carrito. Una tienda de 50 productos (S/2,500) no es lo mismo que una con catálogo amplio, pasarela y envíos (S/6,500). Los montos indicados son referenciales.' },
      { h: 'Las integraciones con tus sistemas', p: 'Conectar la web a un ERP, a un stock repartido en varios almacenes o a un cobro por suscripción ya es desarrollo a medida, y ahí el precio arranca en S/12,000. Los montos indicados son referenciales.' },
      { h: 'Si ya tienes textos y fotos', p: 'El plazo corre desde que llegan tus materiales. Con logo, textos base y fotos a la mano, una landing sale en 1 a 2 semanas. Si hay que producirlos, se suma ese trabajo.' },
      { h: 'Los cambios de alcance a mitad de camino', p: 'Si en pleno proyecto aparece una funcionalidad nueva, la cotizamos por escrito y la apruebas antes de que la hagamos. El monto pactado al inicio no se mueve solo.' },
      { h: 'Lo que viene después del lanzamiento', p: 'El mantenimiento no va incluido por defecto: si prefieres que lo llevemos nosotros, se cotiza junto con el proyecto para que el total quede claro desde el primer día.' },
    ]),
  }),

  sec({
    alt: true,
    h2: '¿Landing, web corporativa o tienda virtual? Cuál te conviene',
    body: prose([
      '<b style="color:var(--ink)">Elige una landing (S/1,800) si</b> vas a correr campañas de Google Ads o redes y necesitas dónde aterrizar ese tráfico ya. Es una sola página con un solo objetivo: que te escriban o dejen sus datos.',
      '<b style="color:var(--ink)">Elige una web corporativa (S/4,500) si</b> vendes por confianza. Tu cliente te va a buscar en Google antes de firmar, y ahí tienen que estar tus servicios, quién eres y cómo contactarte. También es la opción si quieres que te encuentren por varios servicios o vas a publicar contenido.',
      '<b style="color:var(--ink)">Elige una tienda (desde S/2,500) si</b> quieres cobrar en línea. Con Yape, Plin, Culqi o Izipay configurados, el cliente paga sin salir de tu web. Los montos indicados son referenciales.',
    ]),
  }),

  sec({
    h2: 'Cómo se paga una página web con 3R Core',
    body: numlist([
      { h: 'En dos partes, 50 y 50', p: 'El 50 % inicia el proyecto y el otro 50 % se paga contra entrega. Aplica a landings, webs corporativas, tiendas y desarrollos a medida.' },
      { h: 'Con factura y el IGV aparte', p: 'Todos los montos publicados son netos. En la factura se suma el 18 %: una web corporativa de S/4,500 factura S/5,310 en total. Los montos indicados son referenciales.' },
      { h: 'Lo mensual se factura mes a mes', p: 'Si además contratas SEO, Google Ads o redes, esos servicios se facturan cada mes y sin permanencia forzosa.' },
    ]),
  }),

  sec({
    alt: true,
    h2: 'Precios de lo que suele ir junto con la web',
    intro: 'Una web nueva no trae visitas sola. Estos son los servicios mensuales que más nos piden después del lanzamiento. Los precios son referenciales y varían según el alcance del proyecto.',
    body: table(
      ['Servicio', 'Precio neto', 'Qué incluye'],
      [
        ['<a href="/es/posicionamiento-seo">Posicionamiento SEO</a>', 'Desde S/1,800 al mes', 'Auditoría técnica, contenido mensual, enlaces y reporte con acceso a tu Search Console'],
        ['<a href="/es/servicios/google-ads">Gestión de Google Ads</a>', 'S/1,800 al mes + pauta', 'Campañas de búsqueda y Performance Max; la pauta la pagas tú a Google y recomendamos arrancar desde S/1,500 al mes'],
        ['<a href="/es/servicios/socialmedia">Redes sociales</a>', 'Desde S/1,500 al mes', 'Parrilla, piezas y comunidad, con las piezas incluidas'],
      ]
    ),
  }),

  faqBlock(faq, 'Preguntas frecuentes sobre el precio de una página web'),

  bridges('Sigue por aquí', [
    'Si quieres tu número en un minuto, usa el <a href="/es/cotizar">cotizador de páginas web</a>: marcas lo que necesitas y ves el estimado al instante.',
    'El detalle de cómo diseñamos y qué entregamos está en <a href="/es/servicios/web-development">diseño de páginas web en Lima</a>, y si vendes productos, compara los planes de <a href="/es/tiendas-virtuales-lima">tiendas virtuales</a>.',
    'Todos los servicios, con sus montos, están en la <a href="/es/precios">página de precios</a>. Si tienes un restaurante, mira lo que lleva una <a href="/es/diseno-web-restaurantes-lima">web para restaurantes</a>.',
  ]),

  closing({
    h2: '¿Cotizamos tu web?',
    lede: 'Cuéntanos qué necesitas y te devolvemos alcance, plazo y precio cerrado. Respondemos el mismo día hábil, de lunes a viernes de 9:00 a 18:00.',
    waMsg: 'Hola 3R Core, quiero cotizar una página web.',
    first: 'Una página web',
  })
)

export const PAGE: LandingPeru = {
  path: '/cuanto-cuesta-una-pagina-web-en-peru',
  title: '¿Cuánto cuesta una página web en Perú? Precios 2026 ✔️',
  description:
    'Landing S/1,800, web corporativa S/4,500 y tienda virtual desde S/2,500 (netos, + IGV). Tabla 2026, plazos, qué sube el precio y cómo se paga. Referenciales.',
  breadcrumb: 'Cuánto cuesta una página web en Perú',
  faq,
  service: {
    name: 'Diseño de páginas web en Perú',
    description:
      'Landing pages, webs corporativas y tiendas virtuales con diseño propio, SEO técnico de base y capacitación. Precios referenciales publicados en soles.',
    serviceType: 'Web design and development',
    areaServed: [{ type: 'Country', name: 'Perú' }],
    priceFrom: 1800,
  },
  html,
}
