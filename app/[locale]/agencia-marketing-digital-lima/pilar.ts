/**
 * Bloques añadidos el 9-oct-2026 para convertir esta URL en el PILAR de
 * «agencia de marketing digital en Lima» (cluster con 17.322 impresiones en
 * 16 meses en Search Console; la página tenía 982 palabras, sin FAQ, sin
 * proceso, sin formulario y con 2 enlaces internos).
 *
 * Solo /es (la página es noindex en /en y /us). H1, slug, title y los bloques
 * de copy.ts NO cambian: esto se suma.
 *
 * Origen de cada dato (nada se estrena aquí):
 *  · Servicios y lo que incluyen → proto-html/posicionamiento-seo.html,
 *    proto-html/servicios__google-ads.html, /es/servicios/web-development y
 *    /es/tiendas-virtuales-lima.
 *  · Proceso → «¿Cómo lanzamos tu campaña?» (google-ads) y «¿Cómo trabajamos
 *    tu SEO mes a mes?» (posicionamiento-seo); reporte mensual → /es/precios.
 *  · Medición (GCLID, WhatsApp, conversiones offline) → bloque #medicion de
 *    /es/servicios/google-ads (PR #112).
 *  · Montos → /es/precios y las páginas de servicio, siempre referenciales.
 *  · Reseñas → lib/reviews.ts (literales de la ficha de Google, 26-ago-2026).
 */

export const PILAR = {
  respuesta:
    '3R Core es una agencia de marketing digital con oficina en La Molina que trabaja cuatro frentes para empresas de Lima y de todo el Perú: posicionamiento SEO, Google Ads, páginas web y tiendas virtuales. Cada servicio se cobra por mes o por proyecto con precios referenciales publicados, sin contratos forzosos, y cada contacto que llega por formulario, WhatsApp o llamada queda medido con su origen.',
  formH2: 'Cuéntanos qué necesitas y te respondemos por WhatsApp',
  formP: 'Nombre, WhatsApp y una línea sobre tu negocio. Con eso preparamos la primera conversación.',
  servicioForm: 'marketing digital (pilar Lima)',

  queH2: 'Qué hacemos: cuatro servicios que trabajan juntos',
  queP:
    'Una agencia de marketing digital en Lima puede ofrecer de todo. Nosotros concentramos el trabajo en cuatro servicios que se alimentan entre sí: la web convierte, el SEO trae tráfico que no se paga por clic, Google Ads trae contactos desde la primera semana y la tienda vende sin intermediarios. Redes sociales, Meta Ads y branding los trabajamos como complemento cuando el plan lo pide.',
  cuatro: [
    {
      name: 'Posicionamiento SEO',
      href: '/posicionamiento-seo',
      desc: 'Auditoría técnica, plan de palabras clave con demanda real, contenido mensual, enlaces y un reporte con los datos de tu propio Search Console. El primer mes se va en la auditoría y las correcciones técnicas; las posiciones que se notan en ventas llegan entre el cuarto y el sexto mes.',
    },
    {
      name: 'Google Ads (SEM)',
      href: '/servicios/google-ads',
      desc: 'Campañas de Search, Performance Max y Shopping armadas por intención de búsqueda, con lista de negativas y medición antes de encender. La cuenta se crea a tu nombre y la pauta se paga desde tu tarjeta. Si ya tienes campañas, empezamos con una auditoría gratis de la cuenta.',
    },
    {
      name: 'Páginas web',
      href: '/servicios/web-development',
      desc: 'Landing pages y webs corporativas hechas para recibir tráfico de Google y de anuncios: formulario corto, botón de WhatsApp medido y SEO técnico desde el primer día. El mismo equipo que hace la campaña hace la página, así que los cambios no esperan a un tercero.',
    },
    {
      name: 'Tiendas virtuales',
      href: '/tiendas-virtuales-lima',
      desc: 'Tiendas online en Shopify o WooCommerce con catálogo, pasarela de pago peruana (Culqi, Niubiz, Izipay o Mercado Pago) y panel de administración, listas para conectar con Google Shopping y con el remarketing.',
    },
  ],
  complementos:
    'También gestionamos redes sociales, campañas en Facebook e Instagram e identidad de marca para clientes que ya trabajan alguno de los cuatro frentes con nosotros.',

  procesoH2: 'Cómo trabajamos, del primer mensaje al primer reporte',
  procesoP: 'Son los mismos pasos que publicamos en cada página de servicio, juntos en un solo lugar.',
  proceso: [
    {
      t: '1. Diagnóstico',
      d: 'Revisamos lo que ya tienes: la web, la cuenta de Google Ads si existe, Search Console y cómo te llegan hoy los contactos. Si algo está bien armado, te lo decimos y no te proponemos rehacerlo.',
    },
    {
      t: '2. Propuesta por escrito',
      d: 'Sales de la primera reunión con alcance, precio y fecha. Los montos de la web son referenciales; el que firmas es el de la propuesta, con el IGV del 18 % aparte cuando facturamos en Perú.',
    },
    {
      t: '3. Montaje y medición',
      d: 'Antes de gastar un sol en anuncios dejamos medido el formulario, el WhatsApp y las llamadas en Google Ads y GA4. En SEO, el primer mes se dedica a la auditoría y a las correcciones técnicas.',
    },
    {
      t: '4. Reporte mensual',
      d: 'Cada mes recibes la inversión, los contactos, el coste por contacto y lo que vamos a cambiar el mes siguiente. Si un número empeora, lo verás escrito con su explicación.',
    },
  ],

  pruebaH2: 'Marcas que han trabajado con nosotros',
  pruebaP:
    'Son logos de clientes que la agencia publica en su portada y reseñas copiadas sin editar de la ficha de Google, donde 3R Core tiene 4,7 sobre 5 con 42 reseñas.',

  medimosH2: 'Cómo medimos cada lead',
  medimosP:
    'En Perú la mayoría de ventas se cierra por WhatsApp o por teléfono, fuera de la web. Si la medición se queda en el clic, los anuncios aprenden a traer clics baratos y no clientes. Por eso dejamos armado esto en cada proyecto:',
  medimos: [
    { t: 'Formulario con su origen', d: 'Cada envío llega con la campaña, la página donde entró la persona y el identificador del clic de Google (GCLID).' },
    { t: 'WhatsApp y llamadas cuentan', d: 'El clic al botón de WhatsApp y al teléfono se mide como conversión, y el origen viaja con el contacto para saber qué anuncio o qué búsqueda abrió la conversación.' },
    { t: 'Ventas cerradas fuera de la web', d: 'Las ventas que cierras por WhatsApp se pueden subir a Google Ads como conversiones offline con su GCLID, para que la campaña aprenda de quien compra.' },
    { t: 'Un contacto, una sola vez', d: 'Revisamos que el mismo lead no se cuente dos veces en Google Ads y GA4. Una conversión duplicada infla el reporte y empuja las pujas hacia ruido.' },
  ],
  medimosNota: 'Es lo mismo que usamos en nuestra propia web. El detalle técnico está en la página de',
  medimosLink: { name: 'Google Ads', href: '/servicios/google-ads#medicion' },

  vsH2: 'Agencia, freelance o equipo interno: cómo decidir',
  vsP:
    'No siempre conviene una agencia. Depende de cuánto trabajo hay, de si necesitas varias especialidades a la vez y de quién va a revisar los números. Así lo vemos:',
  vsCols: ['', 'Agencia', 'Freelance', 'Equipo interno'],
  vsRows: [
    ['Especialidades', 'SEO, anuncios, web y diseño en un mismo equipo', 'Una o dos, según la persona', 'Las que puedas contratar'],
    ['Arranque', 'Días: el equipo ya existe', 'Días, si tiene agenda libre', 'Semanas o meses de selección'],
    ['Continuidad', 'No depende de una sola persona', 'Si se enferma o se va, se para', 'Depende de la rotación'],
    ['Coste fijo', 'Fee mensual por servicio, sin planilla', 'El más bajo por hora', 'Sueldos, beneficios y herramientas'],
    ['Cuándo conviene', 'Varios frentes a la vez y poco tiempo para coordinarlos', 'Una tarea puntual y bien definida', 'Volumen alto y estable de trabajo de marketing'],
  ],
  vsNota:
    'Si eliges agencia, pide tres cosas antes de firmar: que la cuenta de anuncios esté a tu nombre, que te muestren cómo miden los contactos y un reporte de ejemplo. En la guía para',
  vsLink: { name: 'elegir agencia de marketing digital en Lima', href: '/blogs/como-elegir-agencia-marketing-digital-lima' },

  faqH2: 'Preguntas frecuentes sobre contratar una agencia de marketing digital en Lima',
  faq: [
    {
      q: '¿Qué hace una agencia de marketing digital en Lima?',
      a: 'Planifica y ejecuta lo que hace que un negocio consiga clientes por internet: la web, el posicionamiento en Google, los anuncios, las redes y la medición de cada contacto. En 3R Core el trabajo se concentra en SEO, Google Ads, páginas web y tiendas virtuales, con un reporte mensual de contactos y coste por contacto.',
    },
    {
      q: '¿Por dónde empiezo si tengo poco presupuesto?',
      a: 'Por lo que trae contactos más rápido sin desperdiciar: una página que convierta y una campaña de Google Ads pequeña sobre las búsquedas con intención de compra. El SEO se suma cuando hay caja para sostenerlo varios meses. Si ya tienes web y anuncios, la auditoría gratis te dice qué corregir antes de gastar más.',
    },
    {
      q: '¿Cuánto tiempo tarda en verse resultados?',
      a: 'Con Google Ads, las primeras consultas suelen llegar en la primera o segunda semana de campaña activa. Con SEO, el primer mes se dedica a la auditoría y las correcciones técnicas, y las posiciones que se notan en ventas llegan entre el cuarto y el sexto mes.',
    },
    {
      q: '¿La cuenta de Google Ads queda a mi nombre?',
      a: 'Sí. Las campañas de Google Ads se crean dentro de tu propia cuenta, con tu medio de pago y tu acceso de administrador. Si dejamos de trabajar juntos, te quedas con las campañas, el histórico y los datos de conversión.',
    },
    {
      q: '¿Cómo sé qué contactos vienen de la agencia?',
      a: 'Porque cada formulario, clic a WhatsApp y llamada se registra con su origen: búsqueda en Google, anuncio, redes, inteligencia artificial o directo. Lo ves cada mes en el reporte, separado por canal.',
    },
    {
      q: '¿Atienden a empresas fuera de Lima?',
      a: 'Sí. Las reuniones son por videollamada y las campañas se configuran por ubicación, así que funcionan igual para negocios de provincia. La oficina está en La Molina y atendemos de lunes a viernes, de 9:00 a 18:00.',
    },
    {
      q: '¿Hay contrato de permanencia?',
      a: 'No hay contratos forzosos: el servicio es mensual, con reportes y resultados progresivos. En Google Ads pedimos tres meses de trabajo continuo para juzgar el canal con justicia, porque apagar una campaña mientras aprende es la forma más segura de perder lo invertido.',
    },
  ],

  cierreH2: '¿Hablamos de tu proyecto?',
  cierreP: 'Déjanos tu nombre y tu WhatsApp. Te respondemos el mismo día hábil con las preguntas que necesitamos para darte alcance y precio.',
}
