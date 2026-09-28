/**
 * /es/agencia-seo-arequipa — una sola página de ciudad, con atención remota.
 *
 * 3R Core NO tiene oficina en Arequipa: se dice en el primer párrafo y no se
 * publica ninguna dirección arequipeña (ni en el texto ni en el schema: el
 * Service lleva areaServed Arequipa y el proveedor es la organización de La
 * Molina). Datos propios citados: plan SEO desde S/1,800 (/es/posicionamiento-seo),
 * resultados entre el mes 3 y 6, y que Arequipa está entre las tres ciudades
 * fuera de Lima que más convierten en su analítica (/es/precios).
 * Antes de hacer más ciudades: medir esta en GSC a las 4-6 semanas.
 */
import {
  bridges, frame, cklist, closing, faqBlock, hero, localb, numlist, page, prose, sec, steps, table,
  type Faq, type LandingPeru,
} from '@/lib/landings-peru'
import { NAP } from '@/lib/nap'

const faq: Faq[] = [
  {
    q: '¿3R Core tiene oficina en Arequipa?',
    a: 'No. Nuestra oficina está en La Molina, Lima, y atendemos a los negocios de Arequipa a distancia, por videollamada y WhatsApp. El trabajo de SEO se hace sobre tu web y tu Search Console, así que no depende de estar en la misma ciudad.',
  },
  {
    q: '¿Cuánto cuesta el SEO para un negocio de Arequipa?',
    a: 'El plan mensual parte en S/1,800 más IGV, el mismo precio que en Lima. Incluye auditoría técnica, contenido mensual, enlaces y reporte con acceso a tu Search Console. No hay permanencia forzosa. Los montos indicados son referenciales.',
  },
  {
    q: '¿En cuánto tiempo se ven resultados?',
    a: 'Las primeras subidas en búsquedas de baja competencia suelen llegar entre el mes 2 y el 3, y las posiciones estables entre el mes 3 y el 6. Quien promete el primer lugar en 30 días no está siendo honesto: Google no permite garantizar posiciones.',
  },
  {
    q: '¿Me ayudan con mi ficha de Google Business Profile?',
    a: 'Sí. Revisamos la categoría, el horario, las fotos, las reseñas y que los datos coincidan con tu web. Los cambios en la ficha se hacen con tu autorización y desde tu cuenta, porque el perfil es tuyo.',
  },
  {
    q: '¿Trabajan con negocios de toda la región de Arequipa?',
    a: 'Sí. Da igual si el negocio está en Cayma, Cerro Colorado, Yanahuara o fuera de la ciudad: el trabajo es remoto y el proceso es el mismo. Lo que cambia es para qué zona conviene posicionar cada página.',
  },
  {
    q: '¿Necesito una web nueva para hacer SEO?',
    a: 'No siempre. Primero auditamos la que tienes. Si la base técnica está bien, se trabaja sobre ella. Si no carga bien en el celular o Google no la puede leer, te lo decimos con datos antes de proponer una web nueva.',
  },
]

const html = page(
  hero({
    crumb: 'Agencia SEO en Arequipa',
    h1: 'Agencia SEO en Arequipa: <span class="mg">posicionamiento web</span> con atención remota',
    lede:
      '3R Core es una agencia de Lima, con oficina en La Molina, que trabaja el SEO de negocios de Arequipa a distancia. No tenemos oficina en Arequipa y preferimos decirlo de entrada. El plan mensual parte en <b>S/1,800</b>, el mismo precio que en Lima, sin permanencia. Los montos indicados son referenciales.',
    waMsg: 'Hola 3R Core, tengo un negocio en Arequipa y quiero cotizar SEO.',
    second: { href: '#arequipa', label: 'Cómo trabajamos' },
    bg: '/proto/img/hero/seoCarrubg.webp',
    art: frame('/proto/img/galeria/13.webp', 'El equipo de 3R Core en su oficina de La Molina, Lima', '3rcore.com/es/agencia-seo-arequipa'),
  }),

  sec({
    id: 'arequipa',
    h2: '¿Cómo se trabaja el SEO de un negocio arequipeño desde Lima?',
    intro: 'El SEO no se hace en la calle: se hace en tu web, en tu ficha de Google y en tu Search Console. Por eso funciona a distancia.',
    body: prose([
      'La primera reunión es por videollamada: nos cuentas qué vendes, a quién y en qué zonas. Con eso y acceso a tu Search Console hacemos la auditoría técnica y el plan de búsquedas de los primeros tres meses. Cada fin de mes ves posiciones, clics e impresiones en tu propia cuenta, no en un PDF, y definimos juntos qué sigue.',
      'Arequipa no nos es ajena: en nuestra analítica es una de las tres ciudades fuera de Lima desde donde más nos escriben, junto con Chiclayo y Trujillo. Los precios y el proceso son los mismos que en la capital.',
    ]),
  }),

  sec({
    alt: true,
    h2: '¿Qué busca la gente en Arequipa y cómo apareces?',
    intro: 'En una ciudad del tamaño de Arequipa, la mayoría de búsquedas comerciales son locales. Hay tres tipos y cada uno se trabaja distinto.',
    body: numlist([
      { h: 'Con el nombre de la ciudad', p: '«Dentista en Arequipa», «abogado laboral Arequipa». Se ganan con una página por servicio que diga claramente dónde atiendes, con contenido propio y no una plantilla con el nombre de la ciudad cambiado.' },
      { h: 'Con el distrito', p: 'Cayma, Yanahuara, Cerro Colorado, José Luis Bustamante y Rivero, Paucarpata. Si atiendes en un distrito concreto, conviene nombrarlo en la web y en la ficha, sin crear páginas vacías para cada uno.' },
      { h: '«Cerca de mí» o sin ciudad', p: 'Aquí Google usa la ubicación del teléfono y muestra el mapa con tres fichas. Lo decide sobre todo tu perfil de Google Business Profile, y la web lo respalda.' },
    ]),
  }),

  sec({
    h2: 'Sectores de Arequipa donde más pesa Google',
    intro: 'No todos los rubros compiten igual. Estos son los que más dependen de la búsqueda.',
    body: cklist([
      { b: 'Turismo y hotelería', s: 'Hoteles, hostales y agencias de viaje al Colca o al centro histórico: el visitante reserva desde su ciudad, antes de llegar, y muchas veces busca en inglés.' },
      { b: 'Restaurantes y picanterías', s: 'Búsquedas de «dónde comer» y por plato, casi siempre desde el celular y con el mapa como primera pantalla.' },
      { b: 'Salud', s: 'Clínicas, consultorios y dentistas, donde la reseña y la especialidad bien explicada deciden la llamada.' },
      { b: 'Educación', s: 'Institutos, academias y colegios que compiten en temporada de matrícula y necesitan aparecer semanas antes.' },
      { b: 'Inmobiliario y construcción', s: 'Proyectos y constructoras con compras de ticket alto, donde el cliente investiga mucho antes de escribir.' },
      { b: 'Proveedores industriales y de minería', s: 'Búsquedas técnicas de empresa a empresa, con poco volumen pero clientes que valen mucho.' },
    ]),
  }),

  sec({
    alt: true,
    h2: 'Google Business Profile en Arequipa: lo primero que revisamos',
    body: numlist([
      { h: 'Categoría principal', p: 'Es el dato que más pesa en el mapa. Una categoría precisa gana a una genérica.' },
      { h: 'Dirección o área de servicio', p: 'Si recibes clientes en un local, va la dirección real. Si atiendes a domicilio, se configura el área de servicio y se oculta la dirección.' },
      { h: 'Nombre, dirección y teléfono iguales en todas partes', p: 'La ficha, la web y los directorios tienen que decir lo mismo. Cada diferencia resta confianza.' },
      { h: 'Reseñas con respuesta', p: 'Pedirlas a clientes reales y contestarlas todas, las buenas y las malas.' },
      { h: 'Fotos, horario y servicios al día', p: 'Una ficha completa y actualizada recibe más clics que una a medias, aunque esté en la misma posición.' },
    ]),
  }),

  sec({
    h2: '¿Cuánto cuesta el SEO en Arequipa con 3R Core?',
    intro: 'Precio neto; la factura suma el 18 % de IGV. Los precios son referenciales y varían según el alcance del proyecto.',
    body: table(
      ['Plan', 'Precio', 'Qué incluye'],
      [
        ['SEO mensual', 'Desde S/1,800 al mes', 'Auditoría técnica, contenido mensual, enlaces y reporte con acceso a tu Search Console. Sin instalación ni permanencia forzosa'],
        ['SEO + Google Ads', 'S/1,800 + S/1,800 al mes, más pauta', 'Ads trae consultas desde el primer día mientras el SEO gana posiciones. La pauta la pagas tú a Google'],
      ]
    ),
  }),

  sec({
    alt: true,
    h2: 'Cómo es el primer trimestre',
    body: steps([
      { h: 'Auditoría y plan', p: 'Revisamos tu web, tu ficha y a quién te enfrentas en Google para tus búsquedas en Arequipa.', t: 'Semanas 1 y 2' },
      { h: 'Correcciones técnicas', p: 'Velocidad, indexación, etiquetas y datos estructurados, incluida la dirección o zona de servicio.', t: 'Mes 1' },
      { h: 'Contenido local', p: 'Páginas de servicio y artículos que responden lo que se busca en Arequipa, publicados de forma escalonada.', t: 'Meses 2 y 3' },
      { h: 'Reporte contigo', p: 'Posiciones, clics e impresiones en tu Search Console, y el plan del mes siguiente.', t: 'Cada fin de mes' },
    ]),
  }),

  faqBlock(faq, 'Preguntas frecuentes sobre SEO en Arequipa'),

  localb({
    h2: 'SEO para Arequipa desde La Molina',
    p: `Nuestra oficina está en ${NAP.street}, ${NAP.district}, ${NAP.region}, de lunes a viernes de 9:00 a 18:00. Con Arequipa trabajamos por videollamada y WhatsApp al +51 987 216 703, con el mismo proceso y los mismos precios que en Lima.`,
    zones: ['Cercado', 'Cayma', 'Yanahuara', 'Cerro Colorado', 'José Luis Bustamante y Rivero', 'Paucarpata', 'Sachaca', 'Socabaya'],
    img: '/proto/img/galeria/13.webp',
    alt: 'El equipo de 3R Core en su oficina de La Molina, Lima',
  }),

  bridges('Sigue por aquí', [
    'El detalle del servicio, mes a mes, está en <a href="/es/posicionamiento-seo">posicionamiento SEO</a>. Si quieres comparar con otros servicios, todos los montos están en la <a href="/es/precios">página de precios</a>.',
    'Si tu web necesita rehacerse antes de posicionar, mira <a href="/es/cuanto-cuesta-una-pagina-web-en-peru">cuánto cuesta una página web en Perú</a>.',
  ]),

  closing({
    h2: '¿Revisamos tu web?',
    lede: 'Mándanos el enlace de tu web y el rubro. Te decimos qué frena tu posicionamiento en Arequipa y cuánto costaría trabajarlo.',
    waMsg: 'Hola 3R Core, tengo un negocio en Arequipa y quiero cotizar SEO.',
    first: 'Posicionamiento SEO',
  })
)

export const PAGE: LandingPeru = {
  path: '/agencia-seo-arequipa',
  title: 'Agencia SEO en Arequipa ✔️ 4,7★ en 42 reseñas | 3R Core',
  description:
    'SEO para negocios de Arequipa con atención remota desde Lima: web, Google Business Profile y reporte en tu Search Console. Desde S/1,800 al mes (referencial).',
  breadcrumb: 'Agencia SEO en Arequipa',
  faq,
  service: {
    name: 'Posicionamiento SEO para negocios de Arequipa',
    description:
      'Servicio de SEO remoto para negocios de Arequipa: auditoría técnica, contenido local, Google Business Profile, enlaces y reporte mensual con acceso a Search Console.',
    serviceType: 'Search engine optimization',
    areaServed: [{ type: 'City', name: 'Arequipa' }],
    priceFrom: 1800,
  },
  html,
}
