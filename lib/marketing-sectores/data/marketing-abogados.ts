import type { MarketingSector } from '../types'

export const sector: MarketingSector = {
  slug: 'marketing-abogados',
  path: '/servicios/marketing-abogados',
  ns: 'MdAbogados',
  nombre: 'Marketing digital para abogados',
  keywordPrincipal: 'marketing digital para abogados',
  secundarias: ['marketing para abogados', 'agencia de marketing para abogados', 'marketing para estudios jurídicos'],
  serviceType: 'Digital Marketing for Law Firms',
  audiencia: ['Law firms', 'Lawyers', 'Legal services'],
  servicioForm: 'Marketing digital para abogados',
  seo: { href: '/servicios/seo-para-abogados', label: 'SEO para abogados' },
  ads: { href: '/servicios/google-ads-abogados', label: 'Google Ads para abogados' },
  extra: [{ href: '/servicios/meta-ads', label: 'Meta Ads' }],
  content: {
    meta: {
      title: 'Marketing digital para abogados en Lima | 3R Core',
      description: 'Marketing digital para abogados y estudios jurídicos en Lima: Google, Maps, anuncios y WhatsApp combinados por área de práctica, con cada consulta medida.',
    },
    h1: 'Marketing digital para abogados y estudios jurídicos en Lima',
    hero: {
      badge: 'Abogados · estudios jurídicos',
      title: 'Consultas de casos reales, no de curiosos que buscan asesoría gratis',
      subtitle: '3R Core arma el marketing digital de abogados y estudios jurídicos de Perú: qué canal usar para cada área de práctica, en qué orden encenderlos y cómo saber cuál trajo cada caso.',
      cta: 'Quiero un plan para mi estudio',
    },
    intro: {
      title: '¿Qué es el marketing digital para abogados y qué resuelve en un estudio jurídico?',
      p1: 'El marketing digital para abogados es el plan que decide cómo un estudio jurídico consigue consultas por internet: qué áreas de práctica se empujan, con qué canal (Google, Maps, anuncios, redes, WhatsApp) y cómo se mide cuáles terminan en un caso firmado. En 3R Core lo planteamos por materia, porque un despido, un divorcio y una detención no se buscan ni se deciden igual.',
      p2: 'El problema típico de un estudio en Lima no es la falta de mensajes, sino su calidad. Llegan consultas de personas que quieren una orientación gratis por WhatsApp, de otras ciudades donde el estudio no litiga o de materias que el estudio no ve. Un buen plan filtra eso antes de que el abogado pierda una tarde respondiendo.',
      p3: 'Esta página explica cómo se combinan los canales. Si ya sabes que lo tuyo es aparecer en Google sin pagar por clic, el detalle está en SEO para abogados; si necesitas consultas este mes, en Google Ads para abogados.',
    },
    benefits: {
      badge: 'Canales que le sirven a un estudio',
      title: 'Los canales del marketing digital para abogados y para qué sirve cada uno',
      items: [
        { title: 'Ficha de Google Business Profile', description: 'La base para búsquedas como «estudio jurídico en San Isidro». Dirección real de la oficina, categoría según el área que más factura y reseñas sin detalles del caso.' },
        { title: 'SEO por área de práctica', description: 'Una página por materia y por ciudad donde el estudio litiga de verdad. Trae consultas meses después de publicada, sin pagar por cada clic.' },
        { title: 'Google Ads por materia', description: 'Para llenar la agenda mientras el SEO madura. Campañas separadas por laboral, familia o penal, con palabras negativas como «gratis» o «modelo de escrito».' },
        { title: 'WhatsApp con filtro', description: 'Un formulario corto antes de abrir el chat (nombre, materia y distrito) para que el abogado sepa qué caso es antes de responder.' },
        { title: 'Contenido que responde dudas legales', description: 'Artículos sobre plazos, documentos y pasos de un trámite. Es lo que lee quien todavía no sabe si necesita abogado y lo que la IA de los buscadores cita.' },
        { title: 'Medición de cada consulta', description: 'Cada mensaje y formulario entra al panel con su origen: qué canal, qué página y qué materia. Así se decide dónde poner el presupuesto del mes siguiente.' },
      ],
    },
    process: {
      badge: 'Plan por fases',
      title: 'Ejemplo de plan de marketing digital para un estudio de abogados',
      steps: [
        { title: 'Mes 1: diagnóstico y medición', description: 'Revisamos qué materias facturan más y cuáles tienen búsquedas en tu ciudad, corregimos la ficha de Google y dejamos medido cada WhatsApp, llamada y formulario.' },
        { title: 'Mes 1-2: anuncios en la materia más rentable', description: 'Encendemos Google Ads solo en una o dos áreas, con horario de atención real y negativas desde el primer día, para tener consultas mientras lo demás se construye.' },
        { title: 'Mes 2-4: páginas por área y ciudad', description: 'Publicamos las páginas de cada materia con el abogado responsable, su colegiatura y cómo es la primera consulta. Es la parte del plan que se queda trabajando.' },
        { title: 'Mes 3 en adelante: contenido y redes', description: 'Artículos que responden dudas frecuentes y publicaciones en redes que explican derechos sin contar casos. Sirven para la confianza, no para captar en frío.' },
        { title: 'Cada mes: decidir con datos', description: 'Reporte con consultas por canal y materia, y cuántas pasaron a reunión. Si una materia trae curiosos, se ajusta o se apaga.' },
      ],
    },
    guide: {
      sections: [
        {
          title: '¿Qué problemas tiene un estudio de abogados para conseguir clientes por internet?',
          paragraphs: [
            'El problema más común es recibir consultas que no son casos: personas que buscan orientación gratis, materias que el estudio no atiende o gente de otra ciudad. El segundo es depender del boca a boca y no saber cuántos clientes llegan por la web. 3R Core empieza por medir eso, porque sin ese dato cualquier inversión en anuncios es a ciegas.',
            'Hay un tercer problema propio del sector: muchas webs de estudios tienen una sola página de «Servicios» con ocho materias en un párrafo. Esa página no compite en Google por ninguna de ellas y tampoco sirve como destino de un anuncio, porque quien busca «abogado laboralista lima» quiere leer sobre despidos y no sobre sucesiones.',
          ],
        },
        {
          title: '¿Cómo elige abogado una persona que busca en Google?',
          paragraphs: [
            'Busca por su problema y su ciudad, lee dos o tres opciones y escribe a la que le explica mejor qué va a pasar. La urgencia cambia todo: en penal la persona llama al primero que contesta; en familia o en un tema laboral compara durante días y vuelve a buscar el nombre del estudio antes de decidir.',
            'Por eso el orden de los canales importa. Para la urgencia, el teléfono visible y los anuncios con llamada en horario de atención. Para la decisión que se piensa, las páginas por materia, las reseñas en Maps y el contenido que responde dudas. Las redes sociales ayudan a que el nombre suene conocido cuando la persona lo vuelve a buscar.',
          ],
          list: [
            'Urgencia (detención, desalojo inminente): anuncios con llamada y teléfono visible en móvil.',
            'Decisión pensada (divorcio, despido, herencia): página por materia, reseñas y artículos.',
            'Empresas (laboral corporativo, contratos): contenido técnico y contacto por formulario.',
          ],
        },
        {
          title: '¿Qué normas limitan el marketing de un abogado en Perú?',
          paragraphs: [
            'El Código de Ética del Abogado permite la publicidad de servicios legales si es veraz y respeta las normas de protección al consumidor (artículo 65). El artículo 66 prohíbe la publicidad que engañe, que garantice resultados que no dependen solo del abogado, que sugiera influencia sobre la autoridad o que revele información protegida por el secreto profesional.',
            'En la práctica, 3R Core no escribe «casos ganados», porcentajes de éxito ni testimonios que permitan identificar un proceso. Las reseñas se piden sin detalles del caso y se responden sin confirmar que la persona fue cliente. Los datos que llegan por formularios y WhatsApp se tratan según la Ley 29733 de Protección de Datos Personales, con aviso de privacidad y consentimiento.',
          ],
        },
        {
          title: '¿Qué mide 3R Core en el marketing de un estudio jurídico?',
          paragraphs: [
            'Medimos consultas calificadas por materia y canal, no clics ni seguidores. Cada formulario y cada clic a WhatsApp entra al panel con la página y la campaña de origen, y el estudio marca cuáles pasaron a reunión y cuáles firmaron. Con eso se calcula cuánto costó cada caso por canal.',
            'Ese dato decide el presupuesto. Si familia trae casos por SEO y laboral solo por anuncios, se refuerza cada canal donde rinde. Si una materia trae solo curiosos, se cambian las palabras clave o se deja de invertir en ella.',
          ],
        },
      ],
    },
    faqBadge: 'Preguntas frecuentes',
    faqTitle: 'Preguntas frecuentes sobre marketing digital para abogados',
    faqs: [
      { question: '¿Por dónde empieza un estudio de abogados que nunca hizo marketing digital?', answer: 'Por la ficha de Google y la medición. Con la ficha completa y cada consulta medida, el siguiente paso es encender anuncios en la materia más rentable mientras se publican las páginas por área. Empezar por redes sociales suele traer seguidores, pero pocas consultas.' },
      { question: '¿Conviene más SEO o anuncios para un abogado?', answer: 'Depende de la urgencia y del plazo. Los anuncios traen consultas desde la primera semana y se apagan cuando dejas de pagar. El SEO tarda meses, pero sigue trayendo consultas sin costo por clic. La mayoría de estudios combina los dos: anuncios al inicio y SEO para bajar el costo por caso con el tiempo.' },
      { question: '¿Sirven Instagram y TikTok para un estudio jurídico?', answer: 'Sirven para explicar derechos y para que tu nombre suene conocido, no tanto para captar casos en frío. Un video que explica qué hacer ante un despido arbitrario genera confianza; pedir «escríbenos para tu caso» en cada publicación rara vez funciona. Las consultas de mayor calidad suelen llegar por Google.' },
      { question: '¿Cómo se filtran las consultas de personas que buscan asesoría gratis?', answer: 'Con tres cosas: palabras negativas en los anuncios («gratis», «modelo», «formato»), un formulario corto antes del WhatsApp que pide materia y distrito, y textos que dicen con claridad cómo es la primera consulta y si tiene costo.' },
      { question: '¿Puedo mostrar testimonios de clientes en la web del estudio?', answer: 'Solo con autorización y sin datos que permitan identificar al cliente o al proceso, porque el secreto profesional sigue vigente. Las reseñas en Google son más útiles y más creíbles, siempre que no cuenten detalles del caso.' },
      { question: '¿Cuánto cuesta el marketing digital para un estudio de abogados?', answer: 'Depende de cuántas materias y canales se trabajen. Como referencia, la gestión de Google Ads de 3R Core parte de S/1,800 + IGV al mes con pauta desde S/1,500, y el SEO mensual parte desde S/1,800 + IGV, monto referencial. Te armamos el plan por escrito después del diagnóstico.' },
    ],
    seoTitle: 'Marketing digital para abogados en Lima con 3R Core',
    p1: '3R Core es una agencia de marketing digital con equipo propio en Lima, en La Molina. Trabajamos con estudios jurídicos y abogados independientes que quieren saber qué canal les trae casos y cuánto les cuesta cada uno.',
    p2: 'El plan se arma por área de práctica y se ajusta cada mes con los datos del panel. Si una materia no rinde en un canal, se mueve el presupuesto a donde sí rinde.',
    p3: 'Si quieres saber qué materias de tu estudio tienen búsquedas en tu ciudad y qué canal conviene encender primero, escríbenos al WhatsApp 987 216 703 o déjanos tus datos en el formulario.',
  },
}
