import type { MarketingSector } from '../types'

export const sector: MarketingSector = {
  slug: 'marketing-restaurantes',
  path: '/servicios/marketing-restaurantes',
  ns: 'MdRestaurantes',
  nombre: 'Marketing digital para restaurantes',
  keywordPrincipal: 'marketing digital para restaurantes',
  secundarias: ['marketing para restaurantes', 'agencia de marketing para restaurantes', 'publicidad para restaurantes'],
  serviceType: 'Digital Marketing for Restaurants',
  audiencia: ['Restaurants', 'Cafes', 'Bars', 'Food delivery businesses'],
  servicioForm: 'Marketing digital para restaurantes',
  seo: { href: '/servicios/seo-para-restaurantes', label: 'SEO para restaurantes' },
  ads: { href: '/servicios/google-ads-restaurantes', label: 'Google Ads para restaurantes' },
  extra: [{ href: '/servicios/socialmedia', label: 'Redes sociales' }],
  content: {
    meta: {
      title: 'Marketing digital para restaurantes en Lima | 3R Core',
      description: 'Marketing digital para restaurantes en Lima: Google Maps, redes, apps de delivery, pedidos y reservas por WhatsApp combinados, con cada pedido medido.',
    },
    h1: 'Marketing digital para restaurantes y cafeterías en Lima',
    hero: {
      badge: 'Restaurantes · cafeterías · bares',
      title: 'Más mesas llenas y más pedidos directos, sin vivir de la comisión de las apps',
      subtitle: '3R Core arma el marketing digital de restaurantes en Perú: qué canal trae comensales al local, cuál trae delivery, cuánto se queda cada app y cómo pasar clientes repetidos a tu propio WhatsApp.',
      cta: 'Quiero un plan para mi restaurante',
    },
    intro: {
      title: '¿Qué es el marketing digital para restaurantes y qué resuelve en un local?',
      p1: 'El marketing digital para restaurantes es el plan que decide cómo un local consigue comensales y pedidos por internet: ficha de Google Maps, redes sociales, apps de delivery, anuncios y WhatsApp, cada uno con un papel distinto. En 3R Core lo armamos según el tipo de negocio, porque una cevichería de almuerzo, una pollería de delivery nocturno y una cafetería de barrio no se llenan con el mismo canal.',
      p2: 'El problema típico de un restaurante en Lima no es la falta de seguidores, sino de margen. Muchos venden buena parte por Rappi o PedidosYa y pagan una comisión por cada pedido, mientras el cliente que repite cada semana sigue entrando por la app. Un buen plan mantiene las apps para captar y lleva al cliente habitual a un canal propio.',
      p3: 'Esta página explica cómo se combinan los canales. Si lo tuyo es aparecer en Maps y en Google sin pagar por clic, el detalle está en SEO para restaurantes; si necesitas reservas o pedidos esta misma semana, en Google Ads para restaurantes.',
    },
    benefits: {
      badge: 'Canales que le sirven a un restaurante',
      title: 'Los canales del marketing digital para restaurantes y para qué sirve cada uno',
      items: [
        { title: 'Ficha de Google Maps', description: 'Es donde se decide «dónde comemos hoy». Horario real, carta, fotos propias del plato y respuestas a las reseñas. Con un horario mal cargado pierdes cada búsqueda de «abierto ahora».' },
        { title: 'Instagram y TikTok', description: 'Muestran el plato, el local y el ambiente. Sirven para que te elijan antes de salir de casa y para lanzar un plato nuevo, siempre con la dirección y el horario a un toque.' },
        { title: 'Apps de delivery', description: 'Rappi y PedidosYa traen clientes que no te conocían, a cambio de una comisión por pedido. Las tratamos como canal de captación y medimos cuánto te deja cada pedido después de la comisión.' },
        { title: 'Pedidos y reservas por WhatsApp', description: 'El canal propio para el cliente que repite: carta, horario y zona de reparto claros, y un formulario corto antes del chat para saber si es reserva, delivery o evento.' },
        { title: 'Anuncios por plato y distrito', description: 'Google Ads por «cevichería en Barranco» o «pollería delivery Los Olivos», en las horas en que se decide la comida. Para un lanzamiento o una temporada baja.' },
        { title: 'Medición de pedidos y reservas', description: 'Cada clic a WhatsApp, llamada y formulario entra al panel con su origen. Así sabes qué canal llena mesas y cuál solo suma vistas.' },
      ],
    },
    process: {
      badge: 'Plan por fases',
      title: 'Ejemplo de plan de marketing digital para un restaurante',
      steps: [
        { title: 'Semana 1-2: ficha, carta y medición', description: 'Corregimos la ficha de Google (horario, categoría, carta en texto, fotos), dejamos un enlace de pedido o reserva por WhatsApp y medimos cada contacto desde el primer día.' },
        { title: 'Mes 1: cuentas claras con las apps', description: 'Calculamos qué parte de tus ventas llega por apps y cuánto te queda después de la comisión. Con eso definimos qué platos o combos conviene empujar por el canal propio.' },
        { title: 'Mes 1-2: redes con contenido del plato', description: 'Un calendario corto y sostenible: platos, preparación, equipo y novedades. Cada publicación termina en cómo pedir o reservar, no en «síguenos».' },
        { title: 'Mes 2-3: anuncios en las horas que venden', description: 'Si hace falta volumen, encendemos anuncios por plato y distrito solo en el horario de almuerzo o cena, con el radio de reparto real.' },
        { title: 'Cada mes: decidir con datos', description: 'Reporte con pedidos y reservas por canal, reseñas nuevas y la parte de las ventas que pasó de la app al canal propio.' },
      ],
    },
    guide: {
      sections: [
        {
          title: '¿Qué problemas tiene un restaurante para conseguir clientes por internet?',
          paragraphs: [
            'El problema más común es depender de un solo canal: o todo llega por la app de delivery, con su comisión, o todo depende de que alguien pase por la puerta. El segundo es no saber qué funciona. Muchos restaurantes publican en Instagram todos los días y no pueden decir cuántas mesas trajo eso en el mes.',
            'Hay problemas más pequeños que cuestan caro. Una ficha de Google con el horario de antes de la pandemia, la carta solo en foto o en PDF, o un número de WhatsApp que nadie contesta en hora punta. 3R Core empieza por arreglar eso, porque cualquier inversión en anuncios o en redes termina ahí.',
          ],
        },
        {
          title: '¿Cómo decide dónde comer o qué pedir una persona en Lima?',
          paragraphs: [
            'Decide en minutos y casi siempre desde el celular. Busca por plato o tipo de cocina y distrito, compara dos o tres fichas en Maps, mira fotos y reseñas y revisa si está abierto. Para el delivery abre la app que ya usa o le escribe al local que tiene guardado.',
            'Por eso cada canal cumple una función distinta. Maps gana la decisión del momento. Las redes hacen que el local ya sea conocido cuando llega esa decisión. Las apps traen al cliente nuevo de delivery. WhatsApp retiene al que repite. Los eventos y pedidos grandes, como almuerzos de empresa o cumpleaños, se cotizan aparte y conviene tenerlos medidos por separado.',
          ],
          list: [
            'Comer en el local hoy: ficha de Maps con horario, fotos y reseñas.',
            'Delivery de un cliente nuevo: apps y anuncios en la zona de reparto.',
            'Cliente que repite: pedido directo por WhatsApp.',
            'Eventos y almuerzos de empresa: formulario de cotización.',
          ],
        },
        {
          title: '¿Qué normas debe cuidar un restaurante en su publicidad?',
          paragraphs: [
            'Las promociones tienen que decir sus condiciones. El Código de Protección y Defensa del Consumidor (Ley 29571) exige que la publicidad no engañe sobre precio, contenido ni vigencia, así que un «2x1» lleva sus días, horario y si aplica también en delivery. El restaurante además tiene que tener su Libro de Reclamaciones, y si vende por su web o WhatsApp conviene que el enlace al libro virtual esté a la vista.',
            'Si anuncias tragos, Google Ads aplica su política de bebidas alcohólicas, que se detalla en la página de Google Ads para restaurantes. Y los datos de quien reserva o pide por WhatsApp se tratan según la Ley 29733 de Protección de Datos Personales: se usan para atender el pedido y solo se envían promociones a quien aceptó recibirlas.',
          ],
        },
        {
          title: '¿Qué mide 3R Core en el marketing de un restaurante?',
          paragraphs: [
            'Medimos pedidos y reservas por canal, no likes. Cada clic a WhatsApp, llamada y formulario de evento entra al panel con la página o la campaña que lo trajo. De la ficha de Google tomamos las llamadas, las solicitudes de ruta y los clics a la web, y de las apps, el número de pedidos y lo que queda después de la comisión.',
            'Con eso se decide dónde poner el esfuerzo del mes siguiente. Si un plato se vende solo por la app, se prueba un combo propio por WhatsApp. Si las redes traen vistas pero no reservas, se cambia el contenido o se baja la frecuencia y el tiempo va a la ficha.',
          ],
        },
      ],
    },
    faqBadge: 'Preguntas frecuentes',
    faqTitle: 'Preguntas frecuentes sobre marketing digital para restaurantes',
    faqs: [
      { question: '¿Por dónde empieza un restaurante que nunca hizo marketing digital?', answer: 'Por la ficha de Google Maps y un canal de pedido o reserva que alguien conteste. Con eso medido, el siguiente paso es un calendario de redes que el equipo pueda sostener. Los anuncios vienen después, cuando sabes qué plato y qué zona quieres empujar.' },
      { question: '¿Cuántas veces a la semana tiene que publicar un restaurante en redes?', answer: 'Las que el equipo pueda sostener con fotos propias del plato y del local. Un ritmo constante de dos o tres publicaciones a la semana suele rendir más que una semana intensa seguida de un mes en silencio. Lo que no puede faltar en cada publicación es cómo pedir o reservar.' },
      { question: '¿Cómo paso clientes de Rappi o PedidosYa a mi propio WhatsApp?', answer: 'Sin romper las condiciones de la app. Lo que sí funciona es que el cliente que ya te conoce encuentre tu número en la ficha de Google, en Instagram y en el local, con un motivo para pedir directo, como un combo que solo existe por WhatsApp o el recojo en tienda.' },
      { question: '¿Sirve el marketing digital para una cevichería o pollería de barrio?', answer: 'Sí, y suele bastar con poco: ficha de Maps bien cargada, WhatsApp que conteste en hora punta y reseñas respondidas. Un negocio de barrio compite en un radio corto, así que no necesita un gran presupuesto en anuncios para llenarse.' },
      { question: '¿Conviene trabajar con influencers de comida?', answer: 'Puede servir para un lanzamiento si el público del creador vive cerca y la publicación dice claramente que es publicidad. Antes de pagar, pedimos sus estadísticas de audiencia por ciudad y medimos el resultado con un código o un enlace propio.' },
      { question: '¿Cuánto cuesta el marketing digital para un restaurante?', answer: 'Depende de cuántos locales y canales se trabajen. Como referencia, la gestión de Google Ads de 3R Core parte de S/1,800 + IGV al mes con pauta desde S/1,500, y el SEO mensual parte desde S/1,800 + IGV, monto referencial. Después del diagnóstico te armamos el plan por escrito.' },
    ],
    seoTitle: 'Marketing digital para restaurantes en Lima con 3R Core',
    p1: '3R Core es una agencia de marketing digital con equipo propio en Lima, en La Molina. Trabajamos con restaurantes, cafeterías y bares que quieren saber qué canal les llena mesas, cuál les trae delivery y cuánto les cuesta cada uno.',
    p2: 'El plan se arma por local y por tipo de venta (salón, delivery, eventos) y se ajusta cada mes con los datos del panel.',
    p3: 'Si quieres saber qué canal conviene encender primero en tu restaurante, escríbenos al WhatsApp 987 216 703 o déjanos tus datos en el formulario.',
  },
}
