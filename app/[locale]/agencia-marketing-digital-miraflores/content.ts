/**
 * /es/agencia-marketing-digital-miraflores — UNA sola página de distrito.
 *
 * 3R Core atiende Miraflores desde su oficina de La Molina: no hay sede en
 * Miraflores y no se publica ninguna dirección allí. Solo Miraflores y San
 * Isidro mostraron demanda en el autocompletado (análisis del 29-ago); no se
 * clonan más distritos sin medir antes esta en Search Console.
 * Cifras propias: +5 años, +1000 marcas, 4,7★ en 42 reseñas. Precios: los de
 * /es/servicios/google-ads, /es/posicionamiento-seo, /es/servicios/socialmedia
 * y /es/precios, marcados como referenciales.
 */
import {
  bridges, frame, cklist, closing, faqBlock, hero, localb, numlist, page, prose, sec, steps, table,
  type Faq, type LandingPeru,
} from '@/lib/landings-peru'
import { NAP } from '@/lib/nap'

const faq: Faq[] = [
  {
    q: '¿3R Core tiene oficina en Miraflores?',
    a: 'No. Nuestra oficina está en La Molina y desde ahí atendemos a negocios de Miraflores y del resto de Lima. Las reuniones son en La Molina o por videollamada, como prefieras.',
  },
  {
    q: '¿Qué servicios ofrecen a negocios de Miraflores?',
    a: 'Google Ads, posicionamiento SEO, páginas web y manejo de redes sociales, con el mismo equipo. Puedes contratar uno solo o combinarlos.',
  },
  {
    q: '¿Cuánto cuesta una agencia de marketing digital en Miraflores?',
    a: 'Con 3R Core, la gestión de Google Ads cuesta S/1,800 al mes más la pauta, el SEO parte en S/1,800 al mes, las redes sociales en S/1,500 al mes y una página web desde S/1,800. Son precios netos, más IGV, y los mismos para toda Lima. Los montos indicados son referenciales.',
  },
  {
    q: '¿Hay permanencia mínima?',
    a: 'No. Los servicios mensuales se facturan mes a mes y sin permanencia forzosa. Las cuentas de Google Ads y los accesos quedan a tu nombre.',
  },
  {
    q: '¿Cómo aparezco en Google Maps en Miraflores?',
    a: 'En un distrito con tantos negocios por cuadra, el mapa lo decide tu perfil de Google Business Profile: categoría precisa, datos iguales a los de tu web, reseñas con respuesta y fotos reales. La web y el SEO local lo respaldan.',
  },
  {
    q: '¿Trabajan también con negocios de San Isidro, Barranco o Surco?',
    a: 'Sí, con toda Lima. Esta página habla de Miraflores porque sus negocios compiten de una forma particular en Google, pero el servicio y los precios son los mismos en cualquier distrito.',
  },
]

const html = page(
  hero({
    crumb: 'Marketing digital en Miraflores',
    h1: 'Agencia de marketing digital para <span class="mg">negocios de Miraflores</span>',
    lede:
      'Hacemos Google Ads, SEO, páginas web y redes para negocios de Miraflores desde nuestra oficina de La Molina. No tenemos sede en Miraflores: las reuniones son en La Molina o por videollamada. Llevamos más de 5 años, más de 1000 marcas atendidas y 4,7★ en 42 reseñas de Google.',
    waMsg: 'Hola 3R Core, tengo un negocio en Miraflores y quiero cotizar marketing digital.',
    second: { href: '#precios', label: 'Ver precios' },
    art: frame('/proto/img/galeria/13.webp', 'El equipo de 3R Core en su oficina de La Molina, Lima', '3rcore.com/es/agencia-marketing-digital-miraflores'),
  }),

  sec({
    h2: '¿Por qué un negocio de Miraflores compite distinto en Google?',
    intro: 'Miraflores concentra muchísimos negocios en pocas cuadras y recibe gente de toda Lima y de fuera del país. Eso cambia cómo se gana en Google.',
    body: numlist([
      { h: 'El mapa está lleno', p: 'Para «restaurante», «dentista» o «spa» hay decenas de fichas a pocas cuadras. Google muestra tres. Sin una ficha trabajada, tu negocio queda debajo aunque esté a una cuadra del cliente.' },
      { h: 'Mucha búsqueda desde el celular y «cerca de mí»', p: 'Quien camina por el distrito o llega de otro busca en el momento. La web tiene que cargar rápido, mostrar cómo llegar y abrir WhatsApp en un toque.' },
      { h: 'Turistas que buscan en inglés', p: 'Hoteles, restaurantes, tours y tiendas reciben búsquedas en inglés. Si tu cliente es visitante, conviene tener las páginas clave en su idioma.' },
      { h: 'Oficinas y empresas', p: 'El distrito también tiene oficinas corporativas. Para vender de empresa a empresa, pesa más Google Ads en búsquedas precisas y una web que dé confianza que el volumen de visitas.' },
    ]),
  }),

  sec({
    alt: true,
    id: 'precios',
    h2: 'Servicios y precios para negocios de Miraflores',
    intro: 'Los mismos precios que publicamos para toda Lima, netos; la factura suma el 18 % de IGV. Los precios son referenciales y varían según el alcance del proyecto.',
    body: table(
      ['Servicio', 'Precio neto', 'Qué incluye'],
      [
        ['<a href="/es/servicios/google-ads">Google Ads</a>', 'S/1,800 al mes + pauta', 'Campañas de búsqueda y Performance Max con la cuenta a tu nombre. Recomendamos arrancar con S/1,500 al mes de pauta, que pagas tú a Google'],
        ['<a href="/es/posicionamiento-seo">Posicionamiento SEO</a>', 'Desde S/1,800 al mes', 'Auditoría técnica, contenido, enlaces y reporte con acceso a tu Search Console'],
        ['<a href="/es/servicios/web-development">Página web</a>', 'Desde S/1,800', 'Landing S/1,800 o web corporativa S/4,500, con SEO técnico y panel para editarla'],
        ['<a href="/es/servicios/socialmedia">Redes sociales</a>', 'Desde S/1,500 al mes', 'Parrilla, piezas y comunidad, con las piezas incluidas'],
      ]
    ),
  }),

  sec({
    h2: 'Rubros de Miraflores con los que más trabajamos',
    body: cklist([
      { b: 'Restaurantes y cafés', s: 'Carta en la web, reservas por WhatsApp y ficha de Google al día. Lo explicamos en <a href="/es/diseno-web-restaurantes-lima">diseño web para restaurantes</a>.' },
      { b: 'Clínicas y consultorios', s: 'Campañas y contenido que respetan las reglas de anuncios de salud. Ver <a href="/es/servicios/marketing-clinicas">marketing para clínicas</a>.' },
      { b: 'Estudios de abogados y servicios profesionales', s: 'Búsquedas muy precisas y clientes de ticket alto. Ver <a href="/es/servicios/marketing-abogados">marketing para abogados</a>.' },
      { b: 'Inmobiliarias', s: 'Proyectos que se venden con Google Ads y landing por proyecto. Ver <a href="/es/servicios/marketing-inmobiliarias">marketing inmobiliario</a>.' },
      { b: 'Hoteles, hostales y turismo', s: 'Búsquedas desde fuera de Lima y en inglés, donde la web propia compite con las plataformas de reserva.' },
      { b: 'Tiendas y marcas', s: 'Tienda en línea con Yape, Plin, Culqi o Izipay, y campañas para el público que ya pasa por el local.' },
    ]),
  }),

  sec({
    alt: true,
    h2: 'Lo primero que hacemos con un negocio de Miraflores',
    body: steps([
      { h: 'Revisión de la ficha y la web', p: 'Miramos tu perfil de Google, cómo carga tu web en el celular y dónde apareces hoy para tus búsquedas en Miraflores.', t: 'Semana 1' },
      { h: 'Datos iguales en todas partes', p: 'Nombre, dirección, teléfono y horario idénticos en la ficha, la web y los directorios.', t: 'Semana 1' },
      { h: 'El canal que trae clientes antes', p: 'Si necesitas consultas ya, empezamos con Google Ads. Si puedes esperar 3 a 6 meses, el SEO baja el costo por cliente.', t: 'Semanas 2 a 4' },
      { h: 'Medición real', p: 'Contamos consultas de personas, no clics de robots, y te lo mostramos cada mes.', t: 'Cada fin de mes' },
    ]),
  }),

  sec({
    h2: 'Qué no hacemos',
    body: prose([
      'No te prometemos el primer lugar en Google en 30 días: el SEO toma entre 3 y 6 meses para posiciones estables, y Google no permite garantizar posiciones. No nos quedamos con tu cuenta de Google Ads ni con tus accesos: todo va a tu nombre. Y no inventamos una oficina en Miraflores para salir en el mapa del distrito: estamos en La Molina y lo decimos.',
    ]),
  }),

  faqBlock(faq, 'Preguntas frecuentes sobre marketing digital en Miraflores'),

  localb({
    h2: 'Atendemos Miraflores desde La Molina',
    p: `Nuestra oficina está en ${NAP.street}, ${NAP.district}, ${NAP.region}, de lunes a viernes de 9:00 a 18:00. La reunión puede ser aquí o por videollamada; el resto del trabajo se coordina por WhatsApp al +51 987 216 703.`,
    zones: ['Miraflores', 'San Isidro', 'Barranco', 'Surco', 'San Borja', 'La Molina'],
    hot: ['Miraflores'],
    img: '/proto/img/galeria/13.webp',
    alt: 'El equipo de 3R Core en su oficina de La Molina, Lima',
  }),

  bridges('Sigue por aquí', [
    'Si buscas agencia para cualquier distrito de la capital, esta es nuestra página de <a href="/es/agencia-marketing-digital-lima">agencia de marketing digital en Lima</a>.',
    'Si vas a invertir en Google Ads y quieres comparar antes, revisa la <a href="/es/mejores-agencias-google-ads-lima">comparativa de agencias de Google Ads en Lima</a>.',
  ]),

  closing({
    h2: '¿Vemos tu negocio?',
    lede: 'Cuéntanos tu rubro y qué quieres lograr. Te respondemos el mismo día hábil con una propuesta y su precio por escrito.',
    waMsg: 'Hola 3R Core, tengo un negocio en Miraflores y quiero cotizar marketing digital.',
    first: 'Campañas en Google Ads',
  })
)

export const PAGE: LandingPeru = {
  path: '/agencia-marketing-digital-miraflores',
  title: 'Marketing digital en Miraflores ✔️ Agencia con +5 años | 3R Core',
  description:
    'Google Ads, SEO, páginas web y redes para negocios de Miraflores, atendidos desde La Molina. +1000 marcas, 4,7★ en 42 reseñas. Precios publicados y referenciales.',
  breadcrumb: 'Agencia de marketing digital en Miraflores',
  faq,
  service: {
    name: 'Marketing digital para negocios de Miraflores',
    description:
      'Google Ads, posicionamiento SEO, páginas web y redes sociales para negocios de Miraflores, con atención desde la oficina de 3R Core en La Molina.',
    serviceType: 'Digital marketing',
    areaServed: [{ type: 'Place', name: 'Miraflores, Lima' }],
    priceFrom: 1500,
  },
  html,
}
