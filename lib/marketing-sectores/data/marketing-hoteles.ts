import type { MarketingSector } from '../types'

export const sector: MarketingSector = {
  slug: 'marketing-hoteles',
  path: '/servicios/marketing-hoteles',
  ns: 'MdHoteles',
  nombre: 'Marketing digital para hoteles',
  keywordPrincipal: 'marketing digital para hoteles',
  secundarias: ['marketing para hoteles', 'marketing digital para turismo', 'marketing hotelero'],
  serviceType: 'Digital Marketing for Hotels and Tourism',
  audiencia: ['Hotels', 'Hostels', 'Lodges', 'Tour operators', 'Travel agencies'],
  servicioForm: 'Marketing digital para hoteles',
  seo: { href: '/servicios/seo-para-hoteles', label: 'SEO para hoteles' },
  ads: { href: '/servicios/google-ads-hoteles', label: 'Google Ads para hoteles' },
  extra: [{ href: '/servicios/email-marketing', label: 'Email marketing' }],
  content: {
    meta: {
      title: 'Marketing digital para hoteles en Perú | 3R Core',
      description: 'Marketing digital para hoteles, hostales y turismo en Perú: más reservas directas sin dejar las OTAs, con Google, redes, email y WhatsApp medidos por mercado.',
    },
    h1: 'Marketing digital para hoteles, hostales y turismo en Perú',
    hero: {
      badge: 'Hoteles · hostales · turismo',
      title: 'Más reservas directas sin pelearte con Booking ni Expedia',
      subtitle: '3R Core arma el marketing digital de hoteles y negocios turísticos en Perú: qué parte de la ocupación dejar a las OTAs, qué canal trae la reserva directa y cómo medir cada una por mercado e idioma.',
      cta: 'Quiero un plan para mi hotel',
    },
    intro: {
      title: '¿Qué es el marketing digital para hoteles y qué resuelve en un hospedaje?',
      p1: 'El marketing digital para hoteles es el plan que decide cómo un hospedaje consigue reservas por internet y cuántas de ellas son directas: ficha de Google, metabuscador de Google Hotels, web con motor de reservas, redes, email y WhatsApp, cada uno con su papel. En 3R Core lo armamos por destino y por mercado, porque un lodge en el Valle Sagrado, un hostal en Miraflores y un hotel de playa en Máncora no llenan con el mismo huésped.',
      p2: 'El problema típico de un hotel en Perú no es la visibilidad, sino la dependencia. Las agencias de viaje en línea (OTAs) traen huéspedes, pero cobran comisión por cada reserva y se quedan con el contacto del cliente. El plan no las elimina: las usa para llenar y trabaja para que el huésped que ya te encontró reserve directo la próxima vez.',
      p3: 'Esta página explica cómo se combinan los canales. Si lo tuyo es posicionar la web y la ficha en Google, el detalle está en SEO para hoteles; si quieres aparecer con tarifa en Google Hotels y en búsquedas de destino, en Google Ads para hoteles.',
    },
    benefits: {
      badge: 'Canales que le sirven a un hotel',
      title: 'Los canales del marketing digital para hoteles y para qué sirve cada uno',
      items: [
        { title: 'Ficha de Google y Google Hotels', description: 'El huésped compara precio, fotos y reseñas sin salir de Google. Una ficha completa, con tarifas conectadas, pone tu reserva directa al lado de la oferta de las OTAs.' },
        { title: 'OTAs como canal de captación', description: 'Booking y Expedia traen al viajero que todavía no te conoce. Las mantenemos, pero medimos cuánto te cuesta cada reserva por esa vía frente a la directa.' },
        { title: 'Web con motor de reservas', description: 'Es donde se cierra la reserva directa. Tarifas iguales a las que muestra Google, fotos reales, cómo llegar y políticas claras en español e inglés.' },
        { title: 'Instagram y contenido del destino', description: 'Muestran la habitación, el desayuno y lo que se hace cerca. Sirven para inspirar a quien todavía planea el viaje y para que vuelva a buscar tu nombre.' },
        { title: 'Email y WhatsApp a huéspedes', description: 'Al huésped que ya se quedó contigo le escribes directo para la próxima temporada, siempre con su consentimiento. Es la reserva directa más barata.' },
        { title: 'Medición por mercado e idioma', description: 'Cada reserva, consulta por WhatsApp y cotización de grupo entra al panel con su origen y su mercado. Así se ve qué país y qué canal llenan las noches.' },
      ],
    },
    process: {
      badge: 'Plan por fases',
      title: 'Ejemplo de plan de marketing digital para un hotel',
      steps: [
        { title: 'Mes 1: diagnóstico de canales y medición', description: 'Revisamos qué parte de las reservas llega por cada OTA y cuál es directa, corregimos la ficha de Google y dejamos medido el motor de reservas, el WhatsApp y los formularios.' },
        { title: 'Mes 1-2: reserva directa visible en Google', description: 'Conectamos tarifas con Google Hotels si el motor lo permite y aseguramos que el precio directo sea claro y coincida con lo que muestra Google.' },
        { title: 'Mes 2-4: contenido por mercado', description: 'Páginas y publicaciones para cada tipo de huésped (nacional de fin de semana, extranjero, corporativo), en su idioma y con meses de anticipación a la temporada alta del destino.' },
        { title: 'Antes de cada temporada: huéspedes anteriores', description: 'Correos y mensajes a quienes ya se alojaron y aceptaron recibirlos, con fechas y condiciones claras para reservar directo.' },
        { title: 'Cada mes: decidir con datos', description: 'Reporte con reservas por canal y mercado, comparado con el mismo mes del año anterior para no confundir la temporada con el avance del plan.' },
      ],
    },
    guide: {
      sections: [
        {
          title: '¿Qué problemas tiene un hotel para conseguir reservas por internet?',
          paragraphs: [
            'El problema más común es depender de las OTAs y no saber cuánto cuesta esa dependencia. El segundo es la estacionalidad: muchos destinos del Perú se llenan en temporada alta y quedan vacíos el resto del año, y el marketing se hace tarde, cuando el viajero ya reservó.',
            'Hay problemas técnicos que frenan la reserva directa. Una web donde el precio no coincide con el de Booking, un motor de reservas que no funciona bien en el celular o un WhatsApp que tarda un día en responder. El viajero que encuentra cualquiera de esos tres vuelve a la OTA y reserva ahí.',
          ],
        },
        {
          title: '¿Cómo elige hotel un viajero que planea un viaje al Perú?',
          paragraphs: [
            'Primero elige el destino y después el hospedaje. Busca por zona y por lo que necesita («cerca a la plaza de armas», «con piscina», «frente al mar»), compara en Google y en las OTAs, lee reseñas recientes y muchas veces busca el nombre del hotel antes de pagar, para ver si sale más barato directo.',
            'El viajero nacional y el extranjero planean distinto. El limeño que viaja un fin de semana largo decide con pocas semanas de anticipación y escribe por WhatsApp. El turista extranjero planea con meses, busca en inglés y reserva en línea. Los grupos y viajes corporativos piden cotización. Cada uno necesita su canal y su mensaje.',
          ],
          list: [
            'Nacional de fin de semana: Instagram, ficha de Google y WhatsApp.',
            'Extranjero: Google Hotels, web en inglés y reseñas.',
            'Grupos y corporativo: formulario de cotización.',
            'Huésped que repite: email y WhatsApp con su consentimiento.',
          ],
        },
        {
          title: '¿Qué normas debe cuidar un hotel en su marketing?',
          paragraphs: [
            'La categoría se anuncia solo si está acreditada. El Reglamento de Establecimientos de Hospedaje (D.S. 001-2015-MINCETUR) define las clases y categorías y solo permite exhibir o promocionar una categoría a quien tiene el certificado vigente. 3R Core no escribe «hotel 3 estrellas» sin ese certificado.',
            'Los precios tienen que ser claros. El Código de Protección y Defensa del Consumidor (Ley 29571) pide informar el precio total, y en Google Hotels la política de precisión de precios exige que la tarifa de tu web coincida con la que muestra Google e incluya impuestos y cargos obligatorios. Los datos de los huéspedes se tratan según la Ley 29733: solo reciben correos de promoción quienes aceptaron.',
          ],
        },
        {
          title: '¿Qué mide 3R Core en el marketing de un hotel?',
          paragraphs: [
            'Medimos reservas y su valor, separadas por canal y mercado. Cada reserva en el motor propio, cada consulta por WhatsApp y cada cotización de grupo entra al panel con su origen. De la ficha de Google tomamos los clics a «Reservar», al sitio web y las llamadas.',
            'Con eso se ve cuánto pesa la reserva directa frente a las OTAs y si crece de un mes a otro. Si un mercado trae visitas pero no reservas, se revisa el idioma, el precio que ve o el motor de reservas antes de invertir más en atraerlo.',
          ],
        },
      ],
    },
    faqBadge: 'Preguntas frecuentes',
    faqTitle: 'Preguntas frecuentes sobre marketing digital para hoteles',
    faqs: [
      { question: '¿Por dónde empieza un hotel que solo vende por Booking?', answer: 'Por medir cuánto le cuesta esa dependencia y por dejar lista la reserva directa: ficha de Google completa, web con motor de reservas que funcione en el celular y un WhatsApp que conteste rápido. Con eso listo, cada canal nuevo tiene dónde cerrar la venta.' },
      { question: '¿Qué porcentaje de reservas directas es razonable para un hotel?', answer: 'Depende del destino, del tamaño y del tipo de huésped, así que no damos una cifra general. Lo útil es medir tu punto de partida en el diagnóstico y ver cada mes si la parte directa crece frente a la del mismo mes del año anterior.' },
      { question: '¿Sirve Instagram para llenar un hotel?', answer: 'Sirve para que el viajero se imagine en tu hotel mientras planea y para que vuelva a buscar tu nombre. Rara vez cierra la reserva solo. Por eso cada publicación debe llevar a la web o al WhatsApp, y medimos cuántas reservas llegan por ahí.' },
      { question: '¿Cómo se trabaja la temporada baja de un destino?', answer: 'Con tiempo y con el público que viaja en esas fechas: viajeros nacionales de fin de semana largo, grupos, empresas o huéspedes anteriores. Se preparan los mensajes y las condiciones semanas antes, no cuando la ocupación ya cayó.' },
      { question: '¿El plan sirve también para agencias de viaje y operadores de tours?', answer: 'Sí, con otro foco. Una agencia o un operador vende paquetes y salidas, así que el plan se arma por tour y por fecha de salida, con cotización por WhatsApp y contenido que explica qué incluye cada servicio y qué no.' },
      { question: '¿Cuánto cuesta el marketing digital para un hotel?', answer: 'Depende de cuántos canales, idiomas y mercados se trabajen. Como referencia, la gestión de Google Ads de 3R Core parte de S/1,800 + IGV al mes con pauta desde S/1,500, y el SEO mensual parte desde S/1,800 + IGV, monto referencial. Después del diagnóstico te armamos el plan por escrito.' },
    ],
    seoTitle: 'Marketing digital para hoteles y turismo con 3R Core',
    p1: '3R Core es una agencia de marketing digital con equipo propio en Lima, en La Molina. Trabajamos con hoteles, hostales, lodges y negocios turísticos de todo el Perú que quieren saber cuántas reservas son directas y qué canal las trae.',
    p2: 'El plan se arma por destino y mercado, se prepara antes de cada temporada y se ajusta cada mes con los datos del panel.',
    p3: 'Si quieres saber qué parte de tus reservas podrías pasar a canal directo, escríbenos al WhatsApp 987 216 703 o déjanos tus datos en el formulario.',
  },
}
