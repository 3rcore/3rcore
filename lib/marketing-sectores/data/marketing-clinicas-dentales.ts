import type { MarketingSector } from '../types'

export const sector: MarketingSector = {
  slug: 'marketing-clinicas-dentales',
  path: '/servicios/marketing-clinicas-dentales',
  ns: 'MdClinicasDentales',
  nombre: 'Marketing digital para dentistas',
  keywordPrincipal: 'marketing digital para dentistas',
  secundarias: ['marketing para dentistas', 'marketing digital para clínicas dentales', 'marketing dental', 'marketing para odontólogos'],
  serviceType: 'Digital Marketing for Dental Clinics',
  audiencia: ['Dentists', 'Dental clinics', 'Orthodontists'],
  servicioForm: 'Marketing digital para dentistas',
  seo: { href: '/servicios/seo-para-dentistas', label: 'SEO para dentistas' },
  ads: { href: '/servicios/google-ads-dentistas', label: 'Google Ads para dentistas' },
  extra: [{ href: '/servicios/meta-ads', label: 'Meta Ads' }],
  content: {
    meta: {
      title: 'Marketing digital para dentistas en Lima | 3R Core',
      description: 'Marketing digital para dentistas y clínicas dentales en Lima: Maps, SEO, anuncios y WhatsApp por tratamiento, con cada evaluación y tratamiento medido.',
    },
    h1: 'Marketing digital para dentistas y clínicas dentales en Lima',
    hero: {
      badge: 'Odontología · clínicas dentales',
      title: 'Sillones ocupados con tratamientos, no solo con evaluaciones que no vuelven',
      subtitle: '3R Core arma el marketing digital de dentistas y clínicas dentales de Perú: qué tratamiento empujar en cada canal, en qué orden encenderlos y cuántos pacientes empiezan tratamiento por cada uno.',
      cta: 'Quiero un plan para mi clínica dental',
    },
    intro: {
      title: '¿Qué es el marketing digital para dentistas y qué resuelve en una clínica dental?',
      p1: 'El marketing digital para dentistas es el plan que decide cómo un consultorio o una clínica dental consigue pacientes por internet: qué tratamientos se promocionan, en qué canal (Google Maps, buscador, anuncios, Instagram, WhatsApp) y cómo se mide cuántos pacientes empiezan tratamiento. En 3R Core lo armamos por tratamiento, porque una urgencia por dolor, una limpieza y unos implantes se deciden en tiempos muy distintos.',
      p2: 'El problema típico de una clínica dental en Lima no es que falten mensajes. Es que muchos preguntan solo el precio, agendan una evaluación y no regresan, o vienen de distritos desde donde no van a volver cada mes para un control de ortodoncia. Un plan bien armado separa a esos pacientes desde el primer contacto.',
      p3: 'Esta página explica cómo se combinan los canales. El posicionamiento orgánico por tratamiento está en SEO para dentistas, y el detalle de campañas, en Google Ads para dentistas.',
    },
    benefits: {
      badge: 'Canales que le sirven a un dentista',
      title: 'Los canales del marketing digital para dentistas y para qué sirve cada uno',
      items: [
        { title: 'Ficha de Google del consultorio', description: 'Para «dentista cerca de mí» y «dentista en La Molina». Horario real, teléfono que contesta, fotos del consultorio y reseñas recientes.' },
        { title: 'Páginas por tratamiento', description: 'Implantes, ortodoncia, endodoncia, blanqueamiento: cada uno con en qué consiste, cuántas citas toma y de qué depende el costo.' },
        { title: 'Anuncios para urgencias y tratamientos altos', description: 'Búsqueda con llamada para el dolor de hoy y campañas aparte para implantes u ortodoncia, sin remarketing, como exige Google en salud.' },
        { title: 'Instagram para mostrar el consultorio', description: 'El equipo, el consultorio y cómo es una primera cita. Sirve para generar confianza en el distrito; rara vez es el canal que agenda.' },
        { title: 'WhatsApp con filtro corto', description: 'Nombre, tratamiento y distrito antes del chat, para que la recepción ofrezca la cita correcta y no responda cinco veces el mismo precio.' },
        { title: 'Recordatorios de control', description: 'Mensajes para limpiezas cada seis meses y controles de ortodoncia, solo a pacientes que aceptaron recibirlos.' },
      ],
    },
    process: {
      badge: 'Plan por fases',
      title: 'Ejemplo de plan de marketing digital para una clínica dental en Lima',
      steps: [
        { title: 'Mes 1: medición y ficha de Google', description: 'Dejamos medidas las llamadas, los WhatsApp y los formularios, y corregimos la ficha de Google: categoría, horario, teléfono y tratamientos.' },
        { title: 'Mes 1-2: urgencias y un tratamiento de ticket alto', description: 'Encendemos anuncios de urgencia en el horario en que alguien contesta y una campaña para el tratamiento con más sillón libre, por ejemplo implantes.' },
        { title: 'Mes 2-4: páginas por tratamiento', description: 'Publicamos las páginas de los tratamientos principales con el odontólogo responsable y su número de colegiatura del COP.' },
        { title: 'Mes 4 en adelante: reseñas y recordatorios', description: 'Pedido de reseña después de la atención y recordatorios de limpieza y control para pacientes con consentimiento.' },
        { title: 'Cada mes: tratamientos iniciados por canal', description: 'Reporte con evaluaciones agendadas y tratamientos iniciados por canal. El presupuesto va al tratamiento que deja más margen por paciente.' },
      ],
    },
    guide: {
      sections: [
        {
          title: '¿Qué problemas tiene una clínica dental para conseguir pacientes por internet?',
          paragraphs: [
            'El problema más común es la evaluación gratuita o barata que no se convierte en tratamiento: llena la agenda, pero no la caja. El segundo es depender de una sola fuente, casi siempre Instagram o el boca a boca, sin saber cuánto cuesta un paciente nuevo. 3R Core mide desde el inicio cuántas evaluaciones terminan en un tratamiento y por qué canal llegaron.',
            'También pesa la competencia por precio. En Lima hay consultorios en casi cada cuadra comercial, y quien solo compite por «la limpieza más barata» atrae pacientes que se van por diez soles de diferencia.',
          ],
        },
        {
          title: '¿Cómo elige dentista un paciente en Perú?',
          paragraphs: [
            'Depende del tratamiento. Con dolor, el paciente llama al consultorio más cercano que conteste; ahí gana la ficha de Google con teléfono y horario. Para implantes, ortodoncia o carillas, compara durante semanas: revisa precios, reseñas, quién lo atenderá y si puede pagar en partes. Ahí ganan una página clara del tratamiento y una evaluación fácil de agendar.',
            'Por eso el orden de los canales cambia según lo que la clínica necesita vender. Si tiene sillones vacíos esta semana, primero Maps y anuncios de urgencia. Si quiere más casos de ortodoncia, páginas de tratamiento, anuncios con formulario de evaluación y seguimiento por WhatsApp.',
          ],
          list: [
            'Urgencia: «dentista 24 horas», «dolor de muela dentista cerca».',
            'Tratamiento con precio: «implantes dentales precio Lima», «brackets precio».',
            'Distrito: «dentista en Surco», «clínica dental en San Juan de Lurigancho».',
          ],
        },
        {
          title: '¿Qué normas limitan el marketing de una clínica dental en Perú?',
          paragraphs: [
            'Hay normas de la profesión y de las plataformas. El cirujano dentista ejerce colegiado en el Colegio Odontológico del Perú, y 3R Core muestra el número de colegiatura de cada odontólogo en su ficha de la web. No prometemos resultados ni usamos fotos de pacientes sin su autorización escrita.',
            'En Google Ads, la política de salud en la publicidad personalizada incluye la salud entre las categorías sensibles: no se usan listas de pacientes ni remarketing en anuncios dentales. La política de atención sanitaria y medicamentos tampoco permite nombrar medicamentos con receta en anuncios dirigidos a Perú, así que la sedación se describe como servicio, sin nombrar el fármaco. Los datos que llegan por formulario se tratan según la Ley 29733 de Protección de Datos Personales.',
          ],
        },
        {
          title: '¿Qué mide 3R Core en el marketing de una clínica dental?',
          paragraphs: [
            'Medimos dos momentos: la evaluación agendada y el tratamiento iniciado. Cada llamada, WhatsApp y formulario entra al panel con su canal de origen, y la recepción marca qué pacientes se sentaron en el sillón y cuáles empezaron tratamiento.',
            'Con ese dato el plan deja de mirar clics. Si los implantes llegan por Google y las limpiezas por Maps, cada tratamiento recibe el canal donde rinde.',
          ],
        },
      ],
    },
    faqBadge: 'Preguntas frecuentes',
    faqTitle: 'Preguntas frecuentes sobre marketing digital para dentistas',
    faqs: [
      { question: '¿Instagram o Google: qué le conviene más a un dentista?', answer: 'Para agendar, Google: Maps y el buscador capturan a quien ya necesita un dentista. Instagram ayuda a que el consultorio sea conocido en su zona y a mostrar al equipo, pero rara vez llena la agenda por sí solo. Lo normal es usar los dos con funciones distintas.' },
      { question: '¿Conviene ofrecer evaluación gratis en los anuncios?', answer: 'Solo si la clínica mide cuántas evaluaciones terminan en tratamiento. Una evaluación gratis atrae muchos contactos y muchos no vuelven. A veces rinde más una evaluación con costo que se descuenta del tratamiento; lo decidimos con los datos de tu propia agenda.' },
      { question: '¿Qué tratamiento conviene promocionar primero?', answer: 'El que tenga sillón libre y mejor margen. Para muchas clínicas son implantes u ortodoncia, porque un solo paciente vale varios meses de controles. Las urgencias se suman cuando hay alguien que conteste el teléfono en ese horario.' },
      { question: '¿Se pueden publicar fotos de antes y después de un tratamiento dental?', answer: 'No las usamos como pieza de anuncio. Si la clínica quiere mostrar casos en su web, deben tener autorización escrita del paciente, no deben permitir identificarlo y no deben prometer el mismo resultado a quien las mira.' },
      { question: '¿Cómo se atienden los mensajes de WhatsApp sin saturar la recepción?', answer: 'Con un formulario corto antes del chat: nombre, tratamiento y distrito. La recepción recibe el contexto y responde con la cita disponible. Ese contacto queda guardado en el panel con su canal de origen.' },
      { question: '¿Cuánto cuesta el marketing digital para una clínica dental?', answer: 'Depende de los tratamientos, sedes y canales. Como referencia, la gestión de Google Ads de 3R Core parte de S/1,800 + IGV al mes con pauta desde S/1,500, y el SEO mensual parte desde S/1,800 + IGV, monto referencial. El plan se entrega por escrito después del diagnóstico.' },
    ],
    seoTitle: 'Marketing digital para dentistas en Lima con 3R Core',
    p1: '3R Core es una agencia de marketing digital con equipo propio en Lima, en La Molina. Trabajamos con consultorios y clínicas dentales que quieren llenar sus sillones con tratamientos y saber cuánto les cuesta cada paciente nuevo.',
    p2: 'El plan cumple las políticas de salud de Google y muestra la colegiatura de cada odontólogo, para que los anuncios no se caigan y el paciente sepa quién lo atenderá.',
    p3: 'Si quieres saber qué tratamientos tienen búsquedas en tu distrito, escríbenos al WhatsApp 987 216 703 o déjanos tus datos en el formulario.',
  },
}
