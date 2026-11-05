import type { MarketingSector } from '../types'

export const sector: MarketingSector = {
  slug: 'marketing-contadores',
  path: '/servicios/marketing-contadores',
  ns: 'MdContadores',
  nombre: 'Marketing digital para contadores',
  keywordPrincipal: 'marketing digital para contadores',
  secundarias: ['marketing para contadores', 'marketing para estudios contables'],
  serviceType: 'Digital Marketing for Accounting Firms',
  audiencia: ['Accountants', 'Accounting firms', 'Tax advisors'],
  servicioForm: 'Marketing digital para contadores',
  ads: { href: '/servicios/google-ads-contadores', label: 'Google Ads para contadores' },
  extra: [
    { href: '/posicionamiento-seo', label: 'Posicionamiento SEO' },
    { href: '/servicios/email-marketing', label: 'Email marketing' },
  ],
  content: {
    meta: {
      title: 'Marketing digital para contadores en Lima | 3R Core',
      description: 'Marketing digital para contadores y estudios contables en Perú: Google, Maps, WhatsApp y contenido tributario para sumar clientes que pagan cada mes.',
    },
    h1: 'Marketing digital para contadores y estudios contables en Lima',
    hero: {
      badge: 'Contadores · estudios contables',
      title: 'Clientes que pagan la contabilidad cada mes, no consultas sueltas que se van',
      subtitle: '3R Core arma el marketing digital de contadores y estudios contables de Perú: qué canal usar para cada servicio, cómo aprovechar las fechas de SUNAT y cómo saber qué cliente mensual trajo cada uno.',
      cta: 'Quiero un plan para mi estudio',
    },
    intro: {
      title: '¿Qué es el marketing digital para contadores y qué consigue un estudio contable?',
      p1: 'El marketing digital para contadores es el plan que decide cómo un contador independiente o un estudio contable consigue clientes por internet: qué servicios se empujan (contabilidad mensual, declaración anual, regularizaciones, constitución de empresa), en qué canal y en qué época del año, y cómo se mide qué clientes se quedan.',
      p2: 'Un estudio contable vive de clientes recurrentes. Una consulta por una declaración suelta ayuda, pero lo que sostiene el negocio es la mype que paga la contabilidad todos los meses. Un buen plan separa esos dos tipos de contacto y pone el presupuesto donde llegan los clientes que se quedan.',
      p3: 'Esta página explica cómo se combinan los canales. Si necesitas clientes en las próximas semanas, el detalle de los anuncios está en Google Ads para contadores.',
    },
    benefits: {
      badge: 'Canales que le sirven a un estudio contable',
      title: 'Los canales del marketing digital para contadores y para qué sirve cada uno',
      items: [
        { title: 'Ficha de Google de la oficina', description: 'Para búsquedas como «estudio contable en Los Olivos» o «contador cerca de mí». Dirección real, horario y reseñas de clientes.' },
        { title: 'SEO por servicio y régimen', description: 'Páginas para contabilidad de mypes, empresas del RER o del Régimen MYPE Tributario, regularizaciones y constitución de empresas. Traen consultas sin pagar por clic.' },
        { title: 'Google Ads en las fechas clave', description: 'Anuncios por servicio que suben antes de los picos de demanda, como la declaración anual, y bajan cuando la búsqueda cae.' },
        { title: 'WhatsApp con filtro', description: 'Un formulario corto antes del chat que pide tipo de empresa, régimen y servicio, para que el contador sepa qué responder y a quién priorizar.' },
        { title: 'Contenido tributario útil', description: 'Artículos y publicaciones sobre cambios de normas, fechas y dudas frecuentes. Es lo que buscan los dueños de mypes y lo que citan los buscadores con IA.' },
        { title: 'Medición de cada cliente', description: 'Cada contacto entra al panel con su origen y el servicio pedido. El estudio marca quién pasó a cliente mensual para saber qué canal trae clientes que se quedan.' },
      ],
    },
    process: {
      badge: 'Plan por fases',
      title: 'Ejemplo de plan de marketing digital para un estudio contable',
      steps: [
        { title: 'Mes 1: servicios, zona y medición', description: 'Definimos qué servicios dejan mejor margen y qué tipo de cliente quieres (mypes, personas naturales, empresas medianas), corregimos la ficha de Google y dejamos medido cada contacto.' },
        { title: 'Mes 1-2: anuncios en el servicio más rentable', description: 'Google Ads en contabilidad mensual para mypes, con zona y horario reales, y una página de destino que explica cómo trabaja el estudio.' },
        { title: 'Mes 2-4: páginas por servicio y régimen', description: 'Publicamos las páginas de cada servicio y régimen, con el contador responsable y su colegiatura. Es la parte del plan que sigue trayendo consultas.' },
        { title: 'Antes de cada pico: campaña de temporada', description: 'Unas semanas antes de la declaración anual de renta se sube la pauta y se publica contenido de la fecha, con el cronograma oficial de SUNAT como fuente.' },
        { title: 'Cada mes: decidir con datos', description: 'Reporte con contactos por canal y servicio, y cuántos pasaron a cliente mensual. El presupuesto se mueve hacia lo que trae clientes recurrentes.' },
      ],
    },
    guide: {
      sections: [
        {
          title: '¿Qué problemas tiene un estudio contable para conseguir clientes por internet?',
          paragraphs: [
            'El más común es competir por precio con contadores que anuncian tarifas muy bajas y atraer clientes que se van al primer aumento. El segundo es la estacionalidad: en temporada de declaración llegan muchas consultas puntuales y el resto del año se vuelve al boca a boca. 3R Core plantea el marketing para que esas consultas puntuales se conviertan en clientes mensuales.',
            'El tercero es la confianza. Un dueño de mype le entrega a su contador información sensible de su negocio. Una web sin nombre del contador, sin colegiatura y sin dirección real pierde frente a un estudio que se presenta con claridad.',
          ],
        },
        {
          title: '¿Cómo elige contador el dueño de una mype?',
          paragraphs: [
            'Suele buscar cuando tiene un problema o una fecha encima: una multa, una declaración pendiente, una empresa recién constituida. Busca por servicio y por zona, compara dos o tres opciones y escribe por WhatsApp para preguntar cuánto cobra. Decide por la rapidez de la respuesta, la claridad de la explicación y la recomendación de alguien conocido.',
            'Por eso los canales se combinan así: la ficha de Google y los anuncios captan al que tiene urgencia; las páginas por servicio y el contenido convencen al que compara; las reseñas y las redes refuerzan la confianza del que llega recomendado.',
          ],
          list: [
            'Empresa nueva: constitución, inscripción y primeros libros contables.',
            'Mype en marcha: contabilidad mensual, planillas y declaraciones.',
            'Problema puntual: regularizaciones, fiscalizaciones o multas.',
          ],
        },
        {
          title: '¿Qué hay que cuidar en la publicidad de un contador en Perú?',
          paragraphs: [
            'La publicidad del estudio tiene que ser veraz. La Ley de Represión de la Competencia Desleal (Decreto Legislativo 1044) sanciona la publicidad que engaña, y en contabilidad el riesgo típico es prometer resultados que dependen de SUNAT, como «te eliminamos la multa» o «pagas menos impuestos garantizado». 3R Core escribe sobre lo que el estudio controla: servicios, plazos de entrega de información y forma de atención.',
            'Los anuncios no deben dar a entender que el estudio es SUNAT ni un canal oficial. Se recomienda mostrar el nombre del contador y su colegiatura en un Colegio de Contadores Públicos, que es lo que el cliente puede verificar. Los datos que llegan por formulario y WhatsApp se tratan según la Ley 29733 de Protección de Datos Personales.',
          ],
        },
        {
          title: '¿Qué mide 3R Core en el marketing de un estudio contable?',
          paragraphs: [
            'Medimos contactos por servicio y canal, y cuántos se convierten en cliente mensual. Cada formulario y cada clic a WhatsApp entra al panel con su origen, y el estudio marca quién contrató. Con eso se calcula cuánto cuesta un cliente recurrente por canal, que es el número que importa en este negocio.',
            'Ese dato decide el presupuesto y la temporada. Si la declaración anual trae muchas consultas pero pocos clientes mensuales, se ajusta el mensaje para ofrecer la contabilidad completa desde el primer contacto.',
          ],
        },
      ],
    },
    faqBadge: 'Preguntas frecuentes',
    faqTitle: 'Preguntas frecuentes sobre marketing digital para contadores',
    faqs: [
      { question: '¿Por dónde empieza un contador independiente que quiere más clientes por internet?', answer: 'Por la ficha de Google, una página clara con sus servicios y el WhatsApp medido. Con eso ya aparece en búsquedas de su zona y sabe cuántas consultas recibe. Los anuncios y el contenido se suman cuando esa base está lista.' },
      { question: '¿Cómo convierto las consultas de temporada en clientes mensuales?', answer: 'Ofreciendo desde la primera respuesta el servicio completo, no solo la declaración, y dando seguimiento después de la fecha. Un correo o mensaje con las próximas obligaciones del cliente, con su consentimiento, mantiene el contacto hasta que decide contratar la contabilidad mensual.' },
      { question: '¿Debo publicar mis precios en la web?', answer: 'No es obligatorio. Publicar un rango por tipo de empresa filtra consultas de quien solo busca el precio más bajo, pero puede atraer comparaciones injustas si cada caso cambia mucho. Muchos estudios explican de qué depende el honorario y dan el monto en la primera conversación.' },
      { question: '¿Sirven las redes sociales para un estudio contable?', answer: 'Sirven para explicar cambios tributarios y fechas de una forma sencilla, y para que tu nombre suene conocido. Rara vez traen clientes por sí solas: la mayoría de clientes llega por Google o por recomendación, y las redes refuerzan la confianza.' },
      { question: '¿Qué contenido debe publicar un contador?', answer: 'El que responde dudas reales de sus clientes: qué régimen conviene a una mype, qué pasa si no declaras a tiempo, qué documentos pedir al cerrar el año. Ese contenido lo buscan los dueños de negocio y lo citan los buscadores con IA cuando está bien explicado y actualizado.' },
      { question: '¿Cuánto cuesta el marketing digital para un estudio contable?', answer: 'Depende de cuántos servicios y canales se trabajen. Como referencia, la gestión de Google Ads de 3R Core parte de S/1,800 + IGV al mes con pauta desde S/1,500, y el SEO mensual parte desde S/1,800 + IGV, monto referencial. Te enviamos el plan por escrito después del diagnóstico.' },
    ],
    seoTitle: 'Marketing digital para contadores en Lima con 3R Core',
    p1: '3R Core es una agencia de marketing digital con equipo propio en Lima, en La Molina. Trabajamos con contadores independientes y estudios contables que quieren sumar clientes mensuales y saber cuánto les cuesta cada uno.',
    p2: 'El plan se arma por servicio y temporada, y se ajusta cada mes con los datos del panel.',
    p3: 'Si quieres saber qué servicios de tu estudio tienen búsquedas en tu zona y qué canal conviene encender primero, escríbenos al WhatsApp 987 216 703 o déjanos tus datos en el formulario.',
  },
}
