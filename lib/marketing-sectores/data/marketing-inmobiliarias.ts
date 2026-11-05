import type { MarketingSector } from '../types'

export const sector: MarketingSector = {
  slug: 'marketing-inmobiliarias',
  path: '/servicios/marketing-inmobiliarias',
  ns: 'MdInmobiliarias',
  nombre: 'Marketing digital para inmobiliarias',
  keywordPrincipal: 'marketing digital para inmobiliarias',
  secundarias: ['agencia de marketing digital inmobiliario', 'agencia de marketing para inmobiliarias', 'marketing inmobiliario', 'marketing para bienes raíces'],
  serviceType: 'Digital Marketing for Real Estate',
  audiencia: ['Real estate developers', 'Real estate agencies', 'Real estate brokers'],
  servicioForm: 'Marketing digital para inmobiliarias',
  seo: { href: '/servicios/seo-para-inmobiliarias', label: 'SEO para inmobiliarias' },
  ads: { href: '/servicios/google-ads-inmobiliarias', label: 'Google Ads para inmobiliarias' },
  extra: [{ href: '/servicios/marketing-constructoras', label: 'Marketing digital para constructoras' }],
  content: {
    meta: {
      title: 'Marketing digital para inmobiliarias en Lima | 3R Core',
      description: 'Agencia de marketing digital inmobiliario en Lima: Google, Meta, portales y WhatsApp por proyecto, con cada lead medido hasta la visita y la separación.',
    },
    h1: 'Marketing digital para inmobiliarias y proyectos en Lima',
    hero: {
      badge: 'Inmobiliarias · desarrolladoras · corredores',
      title: 'Leads que llegan a la sala de ventas, no formularios que nadie contesta',
      subtitle: '3R Core es la agencia de marketing digital inmobiliario que arma el plan de cada proyecto: qué canal usar en cada etapa de venta, cuánto invertir por unidad y cómo saber qué lead terminó en separación.',
      cta: 'Quiero un plan para mi proyecto',
    },
    intro: {
      title: '¿Qué es el marketing digital para inmobiliarias y qué resuelve en un proyecto?',
      p1: 'El marketing digital para inmobiliarias es el plan que decide cómo un proyecto consigue interesados por internet y cuántos llegan a visitar el piloto: qué canal se usa en preventa, en construcción y en entrega inmediata, cuánto se invierte por unidad en stock y cómo se mide cada lead hasta la separación. En 3R Core lo trabajamos por proyecto, porque cada uno tiene su precio, su distrito y su ritmo de venta.',
      p2: 'El problema típico de una inmobiliaria en Lima no es conseguir leads, sino que lleguen calificados y que ventas los atienda a tiempo. Un formulario de Meta trae volumen, pero muchos contactos no tienen crédito ni plazo de compra. Si el asesor llama al día siguiente, el interesado ya habló con otros dos proyectos del mismo distrito.',
      p3: 'Esta página explica cómo se combinan los canales en un proyecto. Para el detalle de campañas en Google está Google Ads para inmobiliarias, y para aparecer en búsquedas sin pagar por clic, SEO para inmobiliarias. Si tu empresa construye obras para terceros y no vende departamentos, mira marketing digital para constructoras.',
    },
    benefits: {
      badge: 'Canales que le sirven a una inmobiliaria',
      title: 'Los canales del marketing digital inmobiliario y para qué sirve cada uno',
      items: [
        { title: 'Google Ads por proyecto', description: 'Para quien ya busca por distrito, tipología o etapa. Una campaña por proyecto, para mover el presupuesto según el stock de cada uno.' },
        { title: 'Meta Ads e Instagram', description: 'Para generar interés en quien todavía no busca: lanzamiento, preventa o recorrido del piloto en video. Formularios con preguntas que filtran.' },
        { title: 'Portales inmobiliarios', description: 'Urbania, Adondevivir y otros siguen siendo donde muchos compradores comparan. Medimos cuánto cuesta cada lead de portal frente a los demás canales.' },
        { title: 'Landing por proyecto', description: 'Una página con precios desde, metrajes, planos, avance de obra y ubicación. Es el destino de todos los anuncios y lo que se comparte por WhatsApp.' },
        { title: 'WhatsApp y respuesta rápida', description: 'Cada lead entra al panel con el proyecto y el canal de origen, y se avisa al asesor al momento. La velocidad de respuesta decide muchas visitas.' },
        { title: 'Email y seguimiento', description: 'Para el comprador que tarda meses: avance de obra, nuevas etapas y cambios de precio a quien aceptó recibirlos.' },
      ],
    },
    process: {
      badge: 'Plan por fases',
      title: 'Ejemplo de plan de marketing digital para un proyecto inmobiliario',
      steps: [
        { title: 'Mes 1: medición y landing', description: 'Dejamos medido cada formulario, llamada y WhatsApp con su proyecto y canal, y publicamos la landing del proyecto con datos reales de precios desde y metrajes.' },
        { title: 'Mes 1-2: captar la demanda que ya existe', description: 'Google Ads por distrito, tipología y nombre del proyecto, y presencia en uno o dos portales. Son los leads con más intención de compra.' },
        { title: 'Mes 2-3: generar interés con Meta', description: 'Campañas en Facebook e Instagram con video del piloto o del avance de obra, con formularios que preguntan plazo de compra y financiamiento.' },
        { title: 'Mes 3 en adelante: contenido y SEO', description: 'Páginas por distrito y tipo de inmueble, y artículos sobre crédito, bono y proceso de compra. Bajan el costo por lead de los proyectos que vienen.' },
        { title: 'Cada mes: decidir con visitas y separaciones', description: 'Reporte de leads, visitas y separaciones por canal y proyecto. El presupuesto va al canal que trae visitas, no al que trae más formularios.' },
      ],
    },
    guide: {
      sections: [
        {
          title: '¿Qué problemas tiene una inmobiliaria para vender departamentos por internet?',
          paragraphs: [
            'El problema más común es medir leads y no visitas ni separaciones. Un canal que trae 300 formularios al mes puede generar menos visitas que otro que trae 60. El segundo problema es la respuesta lenta: el comprador deja sus datos en varios proyectos a la vez y suele quedarse con el que lo atiende primero. 3R Core empieza por medir hasta la visita y por avisar al asesor en el momento en que entra el lead.',
            'Hay un tercer problema propio del sector: tratar todos los proyectos igual. Un proyecto en preventa necesita generar interés con tiempo, y uno con pocas unidades en entrega inmediata necesita compradores con crédito listo. Si comparten campaña y presupuesto, el que más vende se come la inversión del que más lo necesita.',
          ],
        },
        {
          title: '¿Cómo busca y elige departamento un comprador en Lima?',
          paragraphs: [
            'Busca por distrito, número de dormitorios y presupuesto, compara varios proyectos durante semanas o meses y decide después de visitar el piloto. Antes de visitar revisa la ubicación, el avance de obra, las fotos reales y quién es la inmobiliaria; muchos buscan el nombre del proyecto o de la empresa en Google antes de agendar.',
            'Por eso el orden de los canales importa. Google y los portales captan a quien ya está buscando. Meta e Instagram presentan el proyecto a quien todavía no busca pero encaja en el perfil. El seguimiento por email y WhatsApp mantiene el proyecto presente durante una decisión que puede tomar meses.',
          ],
          list: [
            'Preventa: generar interés con Meta y una landing con planos y precios desde.',
            'En construcción: Google por distrito y tipología, más avance de obra en redes.',
            'Entrega inmediata: anuncios con «entrega inmediata» y respuesta rápida por WhatsApp.',
          ],
        },
        {
          title: '¿Qué normas limitan el marketing de una inmobiliaria en Perú?',
          paragraphs: [
            'El Código de Protección y Defensa del Consumidor (Ley 29571) exige que la publicidad sea veraz: el precio que se anuncia, los metrajes, los acabados y las fechas de entrega tienen que coincidir con lo que se vende. Las imágenes referenciales deben indicarse como tales, y un «precio desde» tiene que corresponder a una unidad que de verdad existe en stock.',
            'En Google Ads, la restricción de segmentación por vivienda se aplica solo en Estados Unidos y Canadá, así que en Perú se pueden usar datos demográficos. Las listas de clientes que se suben a Google o Meta tienen que cumplir la Ley 29733 de Protección de Datos Personales: 3R Core solo usa contactos que aceptaron la política de privacidad de la inmobiliaria.',
          ],
        },
        {
          title: '¿Qué mide 3R Core en el marketing de una inmobiliaria?',
          paragraphs: [
            'Medimos leads, visitas al piloto y separaciones por canal y por proyecto. Cada formulario y cada WhatsApp entra al panel con su origen, y el equipo de ventas marca qué contacto visitó y cuál separó. Con eso se calcula cuánto costó cada visita y cada venta en cada canal.',
            'Ese dato decide el presupuesto. Si los portales traen visitas más baratas que Meta en un proyecto, se refuerzan ahí; si Google trae separaciones en entrega inmediata, se le da prioridad mientras haya stock. Las ventas cerradas se pueden subir a Google Ads como conversión offline para que la campaña aprenda de compradores reales.',
          ],
        },
      ],
    },
    faqBadge: 'Preguntas frecuentes',
    faqTitle: 'Preguntas frecuentes sobre marketing digital para inmobiliarias',
    faqs: [
      { question: '¿Qué hace una agencia de marketing digital inmobiliario?', answer: 'Arma y opera el plan para que cada proyecto consiga interesados por internet: campañas en Google y Meta, landing del proyecto, portales, seguimiento por WhatsApp y email, y la medición de cada lead hasta la visita y la separación. En 3R Core se trabaja por proyecto y se reporta cada mes con esos datos.' },
      { question: '¿Cuánto tiempo antes del lanzamiento conviene empezar?', answer: 'Lo ideal es tener la landing y la medición listas antes de anunciar la preventa, para que los primeros interesados ya queden registrados con su origen. Las campañas de interés en Meta pueden empezar con renders y planos; Google rinde más cuando el proyecto ya tiene nombre y se busca.' },
      { question: '¿Sirven los portales inmobiliarios si ya hago anuncios en Google y Meta?', answer: 'Muchas veces sí, porque una parte de los compradores compara solo en portales. La decisión se toma con datos: medimos cuánto cuesta cada visita que llega del portal frente a los otros canales y se mantiene donde rinde.' },
      { question: '¿Cómo se filtran los leads que no van a comprar?', answer: 'Con preguntas en el formulario (plazo de compra, financiamiento, tipología), con anuncios que muestran el precio desde y con respuesta rápida que califica en la primera conversación. Un precio visible ahuyenta a quien no está en ese rango y ahorra horas al equipo de ventas.' },
      { question: '¿Trabajan con corredores inmobiliarios o solo con desarrolladoras?', answer: 'Con ambos. Para una desarrolladora el plan se arma por proyecto; para un corredor, por zona o por cartera de inmuebles, con una página para cada tipo de propiedad que maneja.' },
      { question: '¿Cuánto cuesta el marketing digital para una inmobiliaria?', answer: 'Depende de cuántos proyectos y canales se trabajen. Como referencia, la gestión de Google Ads de 3R Core parte de S/1,800 + IGV al mes con pauta desde S/1,500, y el SEO mensual parte desde S/1,800 + IGV, monto referencial. El plan por escrito se arma después del diagnóstico.' },
    ],
    seoTitle: 'Agencia de marketing digital inmobiliario en Lima: 3R Core',
    p1: '3R Core es una agencia de marketing digital con equipo propio en Lima, en La Molina. Trabajamos con desarrolladoras, inmobiliarias y corredores que quieren saber qué canal les trae visitas y separaciones, y cuánto les cuesta cada una.',
    p2: 'El plan se arma por proyecto y por etapa de venta, y se ajusta cada mes con los datos del panel. Si un canal trae formularios pero no visitas, el presupuesto se mueve a donde sí hay compradores.',
    p3: 'Si quieres saber qué canal conviene encender primero para tu proyecto, escríbenos al WhatsApp 987 216 703 o déjanos tus datos en el formulario.',
  },
}
