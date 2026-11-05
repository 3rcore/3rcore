import type { MarketingSector } from '../types'

export const sector: MarketingSector = {
  slug: 'marketing-salones-de-belleza',
  path: '/servicios/marketing-salones-de-belleza',
  ns: 'MdSalonesDeBelleza',
  nombre: 'Marketing digital para salones de belleza',
  keywordPrincipal: 'marketing digital para salones de belleza',
  secundarias: ['marketing para salones de belleza', 'publicidad para salón de belleza', 'marketing para spa', 'marketing para barberías'],
  serviceType: 'Digital Marketing for Beauty Salons, Spas and Barbershops',
  audiencia: ['Beauty salons', 'Spas', 'Barbershops', 'Nail salons'],
  servicioForm: 'Marketing digital para salones de belleza',
  extra: [
    { href: '/servicios/socialmedia', label: 'Redes sociales' },
    { href: '/servicios/meta-ads', label: 'Meta Ads' },
  ],
  content: {
    meta: {
      title: 'Marketing digital para salones de belleza | 3R Core',
      description: 'Marketing digital para salones de belleza, spa y barberías en Lima: Maps por distrito, Instagram, reservas por WhatsApp y clientas que vuelven, todo medido.',
    },
    h1: 'Marketing digital para salones de belleza, spa y barberías en Lima',
    hero: {
      badge: 'Belleza · salones, spa y barberías',
      title: 'La agenda llena con clientas del distrito que vuelven cada mes',
      subtitle: '3R Core arma el marketing digital de salones de belleza, spa, barberías y estudios de uñas de Perú: aparecer en el mapa del distrito, mostrar el trabajo en Instagram y convertir cada mensaje en una reserva.',
      cta: 'Quiero un plan para mi salón',
    },
    intro: {
      title: '¿Qué es el marketing digital para salones de belleza y qué resuelve?',
      p1: 'El marketing digital para salones de belleza es el plan que decide cómo un salón, un spa o una barbería consigue clientes por internet y los hace volver: qué servicios se muestran, en qué canal (Google Maps, Instagram, TikTok, anuncios, WhatsApp) y cómo se mide cuántas reservas salen de cada uno.',
      p2: 'Es un negocio de cercanía y de repetición. La clienta elige un salón a pocas cuadras o cerca de su trabajo, y si le gusta el resultado vuelve cada pocas semanas. La rentabilidad está en esa segunda, tercera y décima visita, no en la primera promoción.',
      p3: 'Por eso 3R Core no empieza por «más seguidores». Empieza por la ficha de Google del local, una forma simple de reservar y un seguimiento que trae a la clienta de vuelta cuando le toca.',
    },
    benefits: {
      badge: 'Canales que le sirven a un salón',
      title: 'Los canales del marketing digital para salones de belleza y para qué sirve cada uno',
      items: [
        { title: 'Ficha de Google del local', description: 'Para «salón de belleza en Jesús María» o «barbería cerca de mí». Horario real, servicios, fotos de trabajos propios y reseñas recientes respondidas.' },
        { title: 'Instagram como portafolio', description: 'Fotos y videos de cortes, color, uñas o tratamientos hechos en el salón, con el nombre del estilista y el servicio, para que la clienta vea el resultado antes de reservar.' },
        { title: 'Meta Ads por radio de distancia', description: 'Anuncios a personas que viven o trabajan cerca del local, con un servicio de entrada concreto y no con descuentos genéricos.' },
        { title: 'Reserva por WhatsApp con registro', description: 'Un formulario corto (nombre, servicio, día preferido) antes del chat, que entra al panel y le dice a recepción qué ofrecer.' },
        { title: 'Google Ads para servicios con búsqueda', description: 'Solo donde hay búsquedas claras en la zona, como «alisado en Surco» o «spa para parejas Miraflores», y en fechas como el Día de la Madre o fin de año.' },
        { title: 'Recordatorios para que vuelvan', description: 'Mensaje cuando toca el retoque de color, el corte o las uñas, enviado solo a clientes que aceptaron recibirlo.' },
      ],
    },
    process: {
      badge: 'Plan por fases',
      title: 'Ejemplo de plan de marketing digital para un salón de belleza en Lima',
      steps: [
        { title: 'Mes 1: ficha de Google y medición', description: 'Corregimos la ficha (categoría, servicios, horario, fotos propias) y dejamos medidas las reservas por WhatsApp, llamadas y formulario.' },
        { title: 'Mes 1-2: Instagram ordenado por servicio', description: 'Destacadas por servicio, precios de referencia si el salón los publica y un enlace a la reserva en la biografía.' },
        { title: 'Mes 2-3: anuncios por cercanía', description: 'Meta Ads en el radio del local con uno o dos servicios de entrada, y Google Ads solo en los servicios que la gente busca en la zona.' },
        { title: 'Desde el mes 3: recordatorios y reseñas', description: 'Flujo de recordatorio según el servicio de cada clienta y pedido de reseña después de la cita.' },
        { title: 'Cada mes: reservas y clientas que vuelven', description: 'Reporte con reservas por canal, clientas nuevas y clientas que repiten. El presupuesto se mueve al canal que trae a quien regresa.' },
      ],
    },
    guide: {
      sections: [
        {
          title: '¿Qué problemas tiene un salón de belleza para conseguir clientas por internet?',
          paragraphs: [
            'El más común es tener un Instagram activo y una agenda con huecos: muchas reacciones, mensajes que preguntan precio y pocas reservas. El segundo es depender de promociones que traen a personas que vienen una vez por el descuento y no vuelven. El tercero es la ficha de Google descuidada, con horario viejo o fotos de banco de imágenes, justo donde la gente del distrito busca primero.',
            '3R Core empieza por medir reservas y clientas que repiten, no seguidores. Con ese dato se ve qué servicio y qué canal llenan la agenda de verdad.',
          ],
        },
        {
          title: '¿Cómo elige una persona un salón, un spa o una barbería?',
          paragraphs: [
            'Elige por cercanía, por el trabajo que ve en fotos y por las reseñas. Busca en Google Maps «peluquería cerca de mí», abre dos o tres fichas, mira las fotos y luego revisa el Instagram del que le gustó. Si para reservar tiene que esperar horas una respuesta, escribe al siguiente.',
            'En barberías y uñas la decisión suele ser más rápida y el ciclo de vuelta más corto. En spa pesan las fechas: regalos, parejas y celebraciones. El plan cambia según el tipo de local.',
          ],
          list: [
            'Distrito: «salón de belleza en San Borja», «barbería en Pueblo Libre».',
            'Servicio: «balayage en Surco», «uñas acrílicas Los Olivos», «masajes relajantes Miraflores».',
            'Ocasión: «spa para parejas Lima», «peinado para matrimonio».',
          ],
        },
        {
          title: '¿Qué normas y límites aplican al marketing de un salón de belleza?',
          paragraphs: [
            'Aplica el Código de Protección y Defensa del Consumidor (Ley 29571): si se publica un precio o una promoción, tiene que ir con sus condiciones (qué incluye, desde qué largo de cabello, vigencia). El local también debe tener su Libro de Reclamaciones. Los datos de las clientas se tratan según la Ley 29733, con consentimiento para los recordatorios por WhatsApp o correo.',
            'En Meta, los anuncios no pueden insinuar atributos personales de quien los ve y los de procedimientos estéticos se limitan a mayores de edad. 3R Core no publica antes y después de procedimientos que son actos médicos (inyectables, láser médico): eso corresponde a una clínica estética con médico responsable, no a un salón. Las fotos de cortes, color o uñas hechos en el local sí se usan, con permiso de la clienta.',
          ],
        },
        {
          title: '¿Qué mide 3R Core en el marketing de un salón de belleza?',
          paragraphs: [
            'Medimos reservas por canal y servicio, clientas nuevas y clientas que vuelven. Cada WhatsApp, llamada y formulario entra al panel con su origen, y el salón marca quién llegó a la cita. Con eso se sabe cuánto cuesta una clienta nueva y cuántas veces vuelve según el canal que la trajo.',
            'Si las clientas que llegan por Maps repiten más que las de una promoción en Instagram, el plan pone más trabajo en la ficha y en las reseñas.',
          ],
        },
      ],
    },
    faqBadge: 'Preguntas frecuentes',
    faqTitle: 'Preguntas frecuentes sobre marketing digital para salones de belleza',
    faqs: [
      { question: '¿Qué es más importante para un salón: Instagram o Google Maps?', answer: 'Los dos, con papeles distintos. Maps es donde te encuentra quien busca un salón cerca. Instagram es donde decide si le gusta tu trabajo. Un salón con buen Instagram y la ficha de Google descuidada pierde a la clienta que buscó primero en el mapa.' },
      { question: '¿Conviene hacer promociones para atraer clientas nuevas?', answer: 'Con cuidado. Una promoción genérica trae gente que solo viene por el descuento. Funciona mejor un servicio de entrada concreto, con condiciones claras, y un seguimiento para que la clienta vuelva al precio normal.' },
      { question: '¿Sirve el marketing digital para una barbería pequeña?', answer: 'Sí, y suele ser simple: ficha de Google completa, Instagram con los cortes del equipo, reserva por WhatsApp rápida y recordatorio cuando toca el siguiente corte. Los anuncios se agregan solo si la agenda tiene horas libres.' },
      { question: '¿Puedo publicar fotos del trabajo hecho a mis clientas?', answer: 'Sí, con su permiso, y es lo que más convence. Lo que no recomendamos es publicar antes y después de procedimientos médicos (inyectables o láser médico), porque son actos médicos con reglas propias.' },
      { question: '¿Cómo se consigue que la clienta vuelva?', answer: 'Con un recordatorio en el momento justo: según el servicio, a las pocas semanas para uñas o corte y más tarde para color o tratamientos. Se envía solo a quien aceptó recibirlo y se mide cuántas reservan de nuevo.' },
      { question: '¿Cuánto cuesta el marketing digital para un salón de belleza?', answer: 'Depende de los canales y del número de locales. Como referencia, la gestión de Google Ads de 3R Core parte de S/1,800 + IGV al mes con pauta desde S/1,500, y el SEO mensual parte desde S/1,800 + IGV, monto referencial. El plan se entrega por escrito después del diagnóstico.' },
    ],
    seoTitle: 'Marketing digital para salones de belleza, spa y barberías en Lima con 3R Core',
    p1: '3R Core es una agencia de marketing digital con equipo propio en Lima, en La Molina. Trabajamos con salones de belleza, spa, barberías y estudios de uñas que quieren clientas del distrito y una agenda que se llena con las que vuelven.',
    p2: 'El plan empieza por lo que más pesa en este rubro: la ficha de Google del local, el trabajo propio en fotos y una reserva que se contesta rápido.',
    p3: 'Si quieres saber cómo está tu ficha de Google y qué buscan las personas de tu zona, escríbenos al WhatsApp 987 216 703 o déjanos tus datos en el formulario.',
  },
}
