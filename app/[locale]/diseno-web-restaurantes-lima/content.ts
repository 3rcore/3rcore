/**
 * /es/diseno-web-restaurantes-lima — rubro × diseño web.
 *
 * Precios: solo los ya publicados en /es/precios y /es/servicios/web-development
 * (landing S/1,800, corporativa S/4,500, tienda S/2,500 y S/6,500), marcados
 * como referenciales. No se citan comisiones de apps de delivery ni cifras del
 * sector que no podamos respaldar.
 */
import {
  bridges, cklist, closing, cotiza, faqBlock, hero, numlist, page, prose, sec, steps, table,
  type Faq, type LandingPeru,
} from '@/lib/landings-peru'

const faq: Faq[] = [
  {
    q: '¿Cuánto cuesta la página web de un restaurante en Lima?',
    a: 'En 3R Core una landing con la carta, la ubicación y reservas por WhatsApp cuesta S/1,800. Una web completa para varios locales, eventos o catering cuesta S/4,500. Si quieres recibir pedidos con pago en línea, la tienda arranca en S/2,500 (hasta 50 productos) y la completa en S/6,500. Precios netos, más IGV. Los montos indicados son referenciales.',
  },
  {
    q: '¿Es mejor la carta en PDF o en la web?',
    a: 'En la web. Un PDF se lee mal en el celular, hay que hacer zoom, pesa más y cada cambio de precio obliga a rehacer el archivo. Una carta en la propia web carga rápido, se actualiza desde el panel en minutos y Google puede leer los platos.',
  },
  {
    q: '¿Puedo cambiar los precios de la carta yo mismo?',
    a: 'Sí. La web se entrega con un panel para editar platos, precios y fotos, y con una capacitación práctica. No necesitas pedirnos cada cambio.',
  },
  {
    q: '¿Cómo funcionan las reservas?',
    a: 'Lo más simple es un botón que abre WhatsApp con la reserva ya escrita: fecha, hora y número de personas. Si prefieres un formulario, la reserva llega a tu correo o a tu panel. En los dos casos confirmas tú, así no se aceptan reservas que no puedes atender.',
  },
  {
    q: '¿Sirve la web si ya vendo por apps de delivery?',
    a: 'Sí. La web puede enlazar a las apps que ya usas y, además, darte un canal propio de pedidos por WhatsApp o con pago en línea. El cliente que ya te conoce puede pedirte directo.',
  },
  {
    q: '¿Cuánto se demora?',
    a: 'Una landing con carta y reservas está lista en 1 a 2 semanas desde que tenemos tu logo, la carta y las fotos. Una web corporativa toma de 3 a 5 semanas y una tienda para pedidos en línea de 2 a 6 semanas según el plan.',
  },
  {
    q: '¿La web me ayuda a salir en Google Maps?',
    a: 'Ayuda, pero Maps depende sobre todo de tu perfil de Google Business Profile: categoría, horario, fotos y reseñas. Lo que hace la web es confirmar esos datos con la misma dirección y teléfono, y darle a Google una carta y un enlace de reserva a los que mandar a la gente.',
  },
]

const html = page(
  hero({
    crumb: 'Diseño web para restaurantes',
    h1: 'Diseño web para <span class="mg">restaurantes en Lima</span>: carta digital, reservas y delivery',
    lede:
      'Hacemos la web de tu restaurante para que el cliente vea la carta en el celular, reserve o pida por WhatsApp sin descargar nada. Una landing con carta y reservas cuesta <b>S/1,800</b> y una web completa para varios locales <b>S/4,500</b>, netos. Los montos indicados son referenciales.',
    waMsg: 'Hola 3R Core, quiero cotizar la página web de mi restaurante.',
    second: { href: '#precios', label: 'Ver precios' },
    bg: '/proto/img/hero/webCarrubg.webp',
    art: cotiza({
      title: '¿Qué necesita tu restaurante?',
      opts: [
        { label: 'Carta y reservas', price: 'S/ 1,800', note: 'landing con carta, mapa y WhatsApp · 1 a 2 semanas', msg: 'Hola, quiero una landing con carta y reservas para mi restaurante.' },
        { label: 'Web completa', price: 'S/ 4,500', note: 'varios locales, eventos y blog · 3 a 5 semanas', msg: 'Hola, quiero una web completa para mi restaurante.' },
        { label: 'Pedidos en línea', price: 'S/ 2,500', note: 'tienda hasta 50 productos · 2 a 3 semanas', msg: 'Hola, quiero recibir pedidos en línea en la web de mi restaurante.' },
      ],
    }),
  }),

  sec({
    h2: '¿Qué necesita la página web de un restaurante?',
    intro: 'Quien busca un restaurante en el celular quiere tres cosas en segundos: ver la carta, saber dónde queda y reservar o pedir. Todo lo demás va después.',
    body: cklist([
      { b: 'Carta digital en la propia web', s: 'Platos, precios y fotos en una página que carga rápido, con un código QR para las mesas. Nada de PDF que obliga a hacer zoom.' },
      { b: 'Reservas en un toque', s: 'Un botón que abre WhatsApp con la reserva ya escrita, o un formulario que te llega al correo. Tú confirmas.' },
      { b: 'Pedidos y delivery', s: 'Pedido por WhatsApp con el detalle armado, enlaces a las apps que ya usas o tienda propia con pago en línea.' },
      { b: 'Ubicación, horario y mapa', s: 'Los mismos datos que tu ficha de Google, con el mapa integrado y el teléfono pulsable.' },
      { b: 'Fotos que no frenan la web', s: 'Imágenes optimizadas para que la página abra rápido incluso con datos móviles.' },
      { b: 'Pagos peruanos en la tienda', s: 'Yape, Plin, Culqi o Izipay configurados si vas a cobrar pedidos en línea.' },
    ]),
  }),

  sec({
    alt: true,
    h2: 'Carta digital: por qué en la web y no en PDF',
    body: prose([
      'La carta es la página más visitada de la web de un restaurante, y en PDF es la que peor funciona. En el celular hay que acercar y alejar para leer un precio, el archivo tarda en abrir con datos móviles y cada vez que sube un insumo hay que rehacer el diseño y volver a subirlo.',
      'Con la carta en la propia web, cambias un precio o marcas un plato como agotado desde el panel, y el QR de las mesas sigue apuntando al mismo lugar. Google, además, puede leer los platos: si alguien busca un plato que sirves, tu página tiene con qué aparecer.',
    ]),
  }),

  sec({
    h2: 'Reservas y pedidos: tres formas de recibirlos',
    intro: 'No todos los restaurantes necesitan lo mismo. Estas son las tres que más armamos, de la más simple a la más completa.',
    body: numlist([
      { h: 'Por WhatsApp, con el mensaje armado', p: 'El cliente elige fecha, hora y personas, o arma su pedido, y se abre WhatsApp con todo escrito. Es lo más rápido de montar y lo que la gente ya usa. Entra en la landing de S/1,800. Los montos indicados son referenciales.' },
      { h: 'Con formulario que llega a tu panel', p: 'Útil si recibes muchas reservas o grupos grandes: los datos quedan ordenados y no se pierden en el chat.' },
      { h: 'Con tienda y pago en línea', p: 'Para delivery o recojo con pago adelantado por Yape, Plin, Culqi o Izipay. La tienda de hasta 50 productos cuesta S/2,500 y la completa, con zonas de envío, S/6,500. Los montos indicados son referenciales.' },
    ]),
  }),

  sec({
    alt: true,
    id: 'precios',
    h2: '¿Cuánto cuesta la página web de un restaurante?',
    intro: 'Precios netos en soles; la factura suma el 18 % de IGV. Los precios son referenciales y varían según el alcance del proyecto.',
    body: table(
      ['Opción', 'Precio neto', 'Plazo', 'Para qué restaurante'],
      [
        ['Landing con carta y reservas', 'S/1,800', '1 a 2 semanas', 'Un local, carta corta, reservas o pedidos por WhatsApp'],
        ['Web corporativa', 'S/4,500', '3 a 5 semanas', 'Varios locales, eventos privados, catering o blog con novedades'],
        ['Tienda para pedidos (hasta 50 productos)', 'S/2,500', '2 a 3 semanas', 'Delivery o recojo con pago en línea y carta corta'],
        ['Tienda completa', 'S/6,500', '4 a 6 semanas', 'Carta amplia, zonas de envío y facturación'],
      ]
    ),
  }),

  sec({
    h2: 'Tu restaurante en Google Maps',
    intro: 'Cuando alguien busca «restaurante cerca de mí», Google muestra primero el mapa con tres fichas. Ahí manda tu perfil de Google Business Profile.',
    body: numlist([
      { h: 'La categoría correcta', p: 'Una categoría principal precisa (por ejemplo, restaurante de comida criolla o cevichería) pesa más que una genérica.' },
      { h: 'Los mismos datos en la ficha y en la web', p: 'Nombre, dirección, teléfono y horario tienen que coincidir letra por letra. Si la web dice una cosa y la ficha otra, Google desconfía de las dos.' },
      { h: 'La carta y la reserva enlazadas', p: 'La ficha permite enlazar el menú y las reservas. Si apuntan a tu web, el clic se queda contigo.' },
      { h: 'Reseñas y fotos al día', p: 'Responder las reseñas y subir fotos reales del local y de los platos es lo que más mueve la decisión de quien compara.' },
    ]),
  }),

  sec({
    alt: true,
    h2: 'Cómo trabajamos la web de tu restaurante',
    body: steps([
      { h: 'Reunión y carta', p: 'Nos cuentas cómo vendes: salón, delivery, eventos. Nos pasas la carta, el logo y fotos si las tienes.', t: 'Día 1' },
      { h: 'Diseño', p: 'Te mostramos el diseño en la versión de celular primero y lo ajustamos contigo.', t: 'Semana 1' },
      { h: 'Desarrollo', p: 'Montamos la carta, las reservas o la tienda, el mapa y el SEO técnico de base.', t: 'Semanas 1 a 4 según el plan' },
      { h: 'Entrega y capacitación', p: 'Te enseñamos a cambiar precios y platos. Los accesos quedan a tu nombre.', t: 'Al cierre' },
    ]),
  }),

  faqBlock(faq, 'Preguntas frecuentes sobre la web de un restaurante'),

  bridges('Sigue por aquí', [
    'Si quieres traer más comensales con anuncios y redes, lee nuestra guía de <a href="/es/blogs/marketing-digital-restaurantes-peru-redes-ads">marketing digital para restaurantes en Perú</a>.',
    'La tabla completa de precios de webs está en <a href="/es/cuanto-cuesta-una-pagina-web-en-peru">cuánto cuesta una página web en Perú</a>, y el servicio general en <a href="/es/servicios/web-development">diseño de páginas web en Lima</a>.',
  ]),

  closing({
    h2: '¿Armamos la web de tu restaurante?',
    lede: 'Cuéntanos cuántos locales tienes y cómo vendes. Te respondemos con alcance, plazo y precio cerrado el mismo día hábil.',
    waMsg: 'Hola 3R Core, quiero cotizar la página web de mi restaurante.',
    first: 'Una página web',
  })
)

export const PAGE: LandingPeru = {
  path: '/diseno-web-restaurantes-lima',
  title: 'Diseño web para restaurantes en Lima ✔️ Carta digital y reservas',
  description:
    'Web para tu restaurante con carta digital, reservas por WhatsApp y pedidos en línea con Yape o Plin. Desde S/1,800 (neto, referencial). 3R Core, La Molina.',
  breadcrumb: 'Diseño web para restaurantes en Lima',
  faq,
  service: {
    name: 'Diseño web para restaurantes en Lima',
    description:
      'Páginas web para restaurantes con carta digital, reservas por WhatsApp o formulario, pedidos y delivery con pago en línea, y SEO técnico de base.',
    serviceType: 'Restaurant website design',
    areaServed: [{ type: 'City', name: 'Lima' }, { type: 'Country', name: 'Perú' }],
    priceFrom: 1800,
  },
  html,
}
