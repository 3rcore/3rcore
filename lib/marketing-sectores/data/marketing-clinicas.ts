import type { MarketingSector } from '../types'

export const sector: MarketingSector = {
  slug: 'marketing-clinicas',
  path: '/servicios/marketing-clinicas',
  ns: 'MdClinicas',
  nombre: 'Marketing digital para clínicas',
  keywordPrincipal: 'marketing digital para clínicas',
  secundarias: ['marketing para médicos', 'marketing digital para médicos', 'agencia de marketing médico', 'marketing para consultorios'],
  serviceType: 'Digital Marketing for Medical Clinics',
  audiencia: ['Clinics', 'Medical offices', 'Physicians'],
  servicioForm: 'Marketing digital para clínicas',
  seo: { href: '/servicios/seo-para-clinicas', label: 'SEO para clínicas' },
  extra: [{ href: '/servicios/google-ads', label: 'Gestión de Google Ads' }],
  content: {
    meta: {
      title: 'Marketing digital para clínicas en Lima | 3R Core',
      description: 'Marketing digital para clínicas, consultorios y médicos en Lima: Maps, SEO, anuncios y WhatsApp por especialidad y sede, dentro de las normas del CMP.',
    },
    h1: 'Marketing digital para clínicas, consultorios y médicos en Lima',
    hero: {
      badge: 'Salud · clínicas y consultorios',
      title: 'Más citas por especialidad, sin saturar la recepción con mensajes que no agendan',
      subtitle: '3R Core organiza el marketing digital de clínicas, consultorios y médicos de Perú por especialidad y por sede, con cada cita medida desde el canal que la trajo.',
      cta: 'Quiero un plan para mi clínica',
    },
    intro: {
      title: '¿Qué es el marketing digital para clínicas y qué cambia frente a otros negocios?',
      p1: 'El marketing digital para clínicas es el plan que decide cómo una clínica, un consultorio o un médico consigue pacientes por internet: qué especialidades se empujan, en qué canal (Google Maps, buscador, anuncios, redes, WhatsApp) y cómo se mide cuántas citas salen de cada uno. 3R Core lo arma por especialidad y por sede, porque un chequeo preventivo y una consulta de traumatología no se buscan igual.',
      p2: 'La salud tiene reglas que otros sectores no tienen. Google limita a quién se le puede mostrar un anuncio de salud y el Código de Ética del Colegio Médico del Perú limita lo que se puede publicar. Un plan que copia lo que funciona en una tienda (remarketing, fotos de resultados, promesas) se cae en el primer mes.',
      p3: 'Esta página explica cómo se combinan los canales para una clínica. El detalle del posicionamiento orgánico por especialidad está en SEO para clínicas.',
    },
    benefits: {
      badge: 'Canales que le sirven a una clínica',
      title: 'Los canales del marketing digital para clínicas y para qué sirve cada uno',
      items: [
        { title: 'Ficha de Google de cada sede', description: 'Para «clínica en Los Olivos» o «clínica cerca de mí abierto ahora». Una ficha por sede con horario real, teléfono que contesta y especialidades.' },
        { title: 'SEO por especialidad y médico', description: 'Una página por especialidad y una ficha por médico con su número de CMP. Es lo que Google pide en temas de salud para confiar en la página.' },
        { title: 'Google Ads por especialidad', description: 'Campañas de búsqueda por especialidad y examen, sin remarketing a pacientes, como exige la política de salud de Google.' },
        { title: 'WhatsApp conectado a la agenda', description: 'Un formulario corto (nombre, especialidad, sede) antes del chat para que la recepción sepa qué cita ofrecer sin hacer cinco preguntas.' },
        { title: 'Contenido revisado por médicos', description: 'Artículos que responden dudas sobre síntomas, exámenes y preparación, con el nombre del médico que los revisó.' },
        { title: 'Recordatorios y reseñas', description: 'Mensajes de recordatorio de cita y pedido de reseña después de la atención, con consentimiento del paciente para recibirlos.' },
      ],
    },
    process: {
      badge: 'Plan por fases',
      title: 'Ejemplo de plan de marketing digital para una clínica en Lima',
      steps: [
        { title: 'Mes 1: medición y fichas de Google', description: 'Dejamos medidas las llamadas, los WhatsApp y los formularios por sede, y corregimos las fichas de Google (horario, categoría, teléfono, especialidades).' },
        { title: 'Mes 1-2: anuncios en dos o tres especialidades', description: 'Elegimos las especialidades con más capacidad libre en agenda y mejor margen, y encendemos búsqueda solo en el horario en que alguien contesta.' },
        { title: 'Mes 2-4: páginas de especialidad y fichas de médicos', description: 'Publicamos las páginas de cada especialidad con los médicos, su colegiatura, sedes y seguros aceptados.' },
        { title: 'Mes 4 en adelante: contenido y reseñas', description: 'Artículos revisados por los médicos de la clínica y un flujo de pedido de reseñas después de la consulta.' },
        { title: 'Cada mes: citas por canal y especialidad', description: 'Reporte con citas agendadas y asistidas por canal. El presupuesto se mueve a la especialidad que llena agenda al menor costo.' },
      ],
    },
    guide: {
      sections: [
        {
          title: '¿Qué problemas tiene una clínica para conseguir pacientes por internet?',
          paragraphs: [
            'El problema más común es que la recepción recibe muchos mensajes y pocas citas: preguntas de precio que no vuelven, pacientes de una sede lejana o consultas fuera de horario que nadie contesta. El segundo es no saber qué especialidad llena agenda por internet y cuál depende de derivaciones. 3R Core empieza midiendo citas por sede y especialidad, no mensajes.',
            'También es frecuente una web con una sola página de «Especialidades» y sin los nombres de los médicos. En salud, Google y los pacientes quieren saber quién atiende y con qué formación antes de reservar.',
          ],
        },
        {
          title: '¿Cómo elige un paciente una clínica o un médico en Perú?',
          paragraphs: [
            'Busca por especialidad y distrito, revisa el mapa y las reseñas, y muchas veces verifica al médico por su número de colegiatura. El seguro pesa: quien tiene EPS busca si la clínica lo acepta antes de llamar. El precio de la consulta y la disponibilidad de cita esa misma semana suelen decidir entre dos opciones parecidas.',
            'Por eso el orden de los canales es Maps y búsqueda primero, porque capturan a quien ya decidió atenderse. Las redes sirven para que la clínica sea conocida en su zona y para explicar servicios, pero rara vez son el canal que agenda.',
          ],
          list: [
            'Especialidad + distrito: «dermatólogo en Surco», «pediatra en Los Olivos».',
            'Examen con precio: «resonancia magnética precio Lima», «chequeo preventivo».',
            'Seguro: «clínica que atiende Rímac EPS», «médico a domicilio EPS».',
          ],
        },
        {
          title: '¿Qué normas limitan el marketing de una clínica en Perú?',
          paragraphs: [
            'Dos tipos de normas: las del Colegio Médico del Perú y las de las plataformas. El artículo 86 del Código de Ética y Deontología del CMP (3.ª edición, 2025) impide publicar imágenes de actos médicos en redes, así que 3R Core no usa fotos de procedimientos ni de antes y después. Tampoco promete curas ni resultados.',
            'En Google Ads, la política de salud en la publicidad personalizada prohíbe usar públicos seleccionados por el anunciante (remarketing, listas de clientes, segmentos similares) en anuncios de servicios de salud. La clínica se anuncia con palabras clave, ubicación y públicos predefinidos de Google. Los datos de pacientes que llegan por formularios se tratan según la Ley 29733, con aviso de privacidad y consentimiento para recordatorios.',
          ],
        },
        {
          title: '¿Qué mide 3R Core en el marketing de una clínica?',
          paragraphs: [
            'Medimos citas agendadas y asistidas por especialidad, sede y canal. Cada llamada, WhatsApp y formulario entra al panel con su origen, y la clínica marca cuáles se convirtieron en cita. Con eso se sabe cuánto cuesta un paciente nuevo en cada especialidad.',
            'Ese número ordena el plan: si traumatología llena agenda por Maps y dermatología necesita anuncios, cada una recibe el canal donde rinde.',
          ],
        },
      ],
    },
    faqBadge: 'Preguntas frecuentes',
    faqTitle: 'Preguntas frecuentes sobre marketing digital para clínicas',
    faqs: [
      { question: '¿Qué canal conviene más a una clínica: Google, Facebook o Instagram?', answer: 'Para agendar citas, Google: Maps y búsqueda capturan a quien ya necesita una especialidad. Facebook e Instagram ayudan a que la clínica sea conocida en su zona y a anunciar campañas de prevención, pero con las limitaciones de las políticas de salud de cada plataforma.' },
      { question: '¿Una clínica puede hacer remarketing a sus pacientes?', answer: 'En Google Ads no, en anuncios de servicios de salud. La política de salud en la publicidad personalizada prohíbe listas de clientes y segmentos de visitantes. Sí se puede enviar recordatorios por WhatsApp o correo a pacientes que dieron su consentimiento, fuera de los anuncios.' },
      { question: '¿Cómo se reparte el presupuesto entre varias sedes?', answer: 'Por la capacidad de agenda de cada sede y por la distancia que el paciente está dispuesto a recorrer. Cada sede tiene su ficha de Google y sus anuncios limitados a los distritos cercanos, para no ofrecer una cita al otro lado de Lima.' },
      { question: '¿Sirve el marketing digital para un médico que atiende solo en consultorio?', answer: 'Sí, y suele ser más simple: ficha de Google del consultorio, una página por los servicios principales con su CMP visible y, si la agenda tiene espacios, anuncios en su especialidad y distrito.' },
      { question: '¿Se pueden publicar testimonios de pacientes?', answer: 'Con mucho cuidado: sin imágenes de actos médicos, sin datos de salud identificables y con autorización escrita. Las reseñas de Google, que el paciente escribe por su cuenta, son la forma más segura de mostrar opiniones.' },
      { question: '¿Cuánto cuesta el marketing digital para una clínica?', answer: 'Depende de las especialidades, sedes y canales. Como referencia, la gestión de Google Ads de 3R Core parte de S/1,800 + IGV al mes con pauta desde S/1,500, y el SEO mensual parte desde S/1,800 + IGV, monto referencial. El plan se entrega por escrito después del diagnóstico.' },
    ],
    seoTitle: 'Marketing digital para clínicas y médicos en Lima con 3R Core',
    p1: '3R Core es una agencia de marketing digital con equipo propio en Lima, en La Molina. Trabajamos con clínicas, policlínicos, consultorios y médicos que quieren llenar agenda por especialidad y saber cuánto les cuesta cada paciente nuevo.',
    p2: 'El plan respeta las normas del Colegio Médico del Perú y las políticas de salud de Google desde el primer anuncio, para que ninguna campaña se caiga por un rechazo.',
    p3: 'Si quieres saber qué especialidades de tu clínica tienen búsquedas en tu zona, escríbenos al WhatsApp 987 216 703 o déjanos tus datos en el formulario.',
  },
}
