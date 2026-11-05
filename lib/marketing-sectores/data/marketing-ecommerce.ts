import type { MarketingSector } from '../types'

export const sector: MarketingSector = {
  slug: 'marketing-ecommerce',
  path: '/servicios/marketing-ecommerce',
  ns: 'MdEcommerce',
  nombre: 'Marketing digital para ecommerce',
  keywordPrincipal: 'marketing digital para ecommerce',
  secundarias: ['marketing para ecommerce', 'agencia de marketing para ecommerce', 'marketing para tiendas online'],
  serviceType: 'Digital Marketing for Ecommerce',
  audiencia: ['Online stores', 'Ecommerce brands', 'Retailers'],
  servicioForm: 'Marketing digital para ecommerce',
  extra: [
    { href: '/servicios/google-ads', label: 'Gestión de Google Ads' },
    { href: '/servicios/meta-ads', label: 'Meta Ads' },
  ],
  content: {
    meta: {
      title: 'Marketing digital para ecommerce en Perú | 3R Core',
      description: 'Marketing digital para tiendas online en Perú: Shopping, Meta Ads, email y remarketing combinados según tu margen, con cada venta medida hasta el pedido.',
    },
    h1: 'Marketing digital para ecommerce y tiendas online en Perú',
    hero: {
      badge: 'Ecommerce · tiendas online',
      title: 'Más pedidos con el margen que tu tienda puede pagar',
      subtitle: '3R Core arma el marketing digital de tiendas online en Perú: qué canal trae compradores nuevos, cuál recupera a los que se fueron y cuánto cuesta cada pedido en cada uno.',
      cta: 'Quiero un plan para mi tienda',
    },
    intro: {
      title: '¿Qué es el marketing digital para ecommerce y qué resuelve en una tienda online?',
      p1: 'El marketing digital para ecommerce es el plan que decide cómo una tienda online consigue tráfico que compra: qué productos se empujan, en qué canal (Google Shopping, búsqueda, Meta, TikTok, email, WhatsApp) y cómo se mide cuánto deja cada pedido después de pagar la publicidad. 3R Core lo plantea por categoría y por margen, porque no todos los productos aguantan el mismo costo de adquisición.',
      p2: 'El problema típico de una tienda en Perú no es que no haya visitas, sino que se venden los productos equivocados o que la publicidad se come el margen. Una campaña que vende mucho un producto con descuento puede dejar menos plata que otra que vende la mitad de un producto con margen alto. Sin medir el pedido real, esa diferencia no se ve.',
      p3: 'Esta página trata de cómo se combinan los canales para vender más. No construimos la tienda: si todavía no la tienes, primero necesitas la plataforma (Shopify, WooCommerce, VTEX u otra) funcionando, con pagos y envíos configurados.',
    },
    benefits: {
      badge: 'Canales que le sirven a una tienda',
      title: 'Los canales del marketing digital para ecommerce y para qué sirve cada uno',
      items: [
        { title: 'Google Shopping y Performance Max', description: 'Para quien ya busca el producto. El anuncio sale del catálogo de Merchant Center, así que el título, la foto y el precio del feed pesan tanto como la puja.' },
        { title: 'Búsqueda de marca y categoría', description: 'Campañas para las búsquedas con tu nombre y para categorías con intención de compra, como «zapatillas running mujer», con negativas para «usado» o «gratis».' },
        { title: 'Meta Ads e Instagram', description: 'Para quien todavía no busca: producto nuevo, colección o temporada. Funciona con creatividades que muestran el producto en uso y con el catálogo conectado.' },
        { title: 'Remarketing por comportamiento', description: 'A quien vio un producto o dejó el carrito, con mensajes distintos según lo que hizo. Se limita en frecuencia para no perseguir a nadie durante semanas.' },
        { title: 'Email y WhatsApp a clientes', description: 'Carrito abandonado, recompra y lanzamientos para quien aceptó recibirlos. Es el canal más barato por pedido porque el cliente ya te conoce.' },
        { title: 'Medición del pedido real', description: 'Cada compra se registra con su valor y su origen. Los pedidos que se cierran por WhatsApp entran al panel para no perderlos en la cuenta.' },
      ],
    },
    process: {
      badge: 'Plan por fases',
      title: 'Ejemplo de plan de marketing digital para una tienda online',
      steps: [
        { title: 'Mes 1: medición y catálogo', description: 'Verificamos que la compra se registre con su valor en Google y Meta, revisamos el feed de Merchant Center y separamos los productos por margen y rotación.' },
        { title: 'Mes 1-2: captar a quien ya busca', description: 'Encendemos Shopping o Performance Max sobre los productos con mejor margen y una campaña de marca. Es la demanda que ya existe y la más fácil de convertir.' },
        { title: 'Mes 2-3: remarketing y email', description: 'Activamos la recuperación de carritos y visitas, y la secuencia de bienvenida y recompra. Así cada visita pagada tiene más de una oportunidad de comprar.' },
        { title: 'Mes 3 en adelante: generar demanda', description: 'Meta e Instagram para colecciones y lanzamientos, con presupuesto que crece solo si el costo por pedido se mantiene dentro de lo que deja el margen.' },
        { title: 'Cada mes: decidir por rentabilidad', description: 'Reporte de pedidos, ingreso y costo por canal y categoría. Lo que vende sin dejar margen se ajusta o se saca de la campaña.' },
      ],
    },
    guide: {
      sections: [
        {
          title: '¿Qué problemas tiene una tienda online en Perú para vender más por internet?',
          paragraphs: [
            'El problema más común es medir mal: la plataforma cuenta una venta, Google cuenta otra y Meta otra más, y nadie sabe cuál canal trajo el pedido. El segundo es invertir por igual en todo el catálogo. 3R Core empieza ordenando la medición y el catálogo por margen, porque sin eso no hay forma de saber si la publicidad gana o pierde plata.',
            'Hay problemas propios del mercado peruano. Muchas compras se cierran por WhatsApp aunque empezaron en un anuncio, y esas ventas no aparecen en la cuenta si nadie las registra. El costo de envío a provincia decide muchas compras, así que tiene que estar claro antes del pago. Y el comprador desconfía de una tienda que no conoce, sobre todo si no ve un medio de pago que reconozca.',
          ],
        },
        {
          title: '¿Cómo decide su compra el cliente de una tienda online?',
          paragraphs: [
            'Compara precio, envío y confianza en pocos minutos, y muchas veces no compra en la primera visita. Busca el producto en Google, mira dos o tres tiendas, revisa reseñas o el Instagram de la marca y vuelve días después, a veces por un anuncio de remarketing y a veces escribiendo tu nombre en Google.',
            'Por eso un solo canal rara vez explica una venta. Shopping capta la primera búsqueda, el remarketing y el email traen de vuelta al indeciso, y las redes hacen que la marca le suene conocida. El plan reparte el presupuesto según el papel de cada canal, no según quién se lleva el último clic.',
          ],
          list: [
            'Producto que ya se busca (marca, modelo, categoría): Shopping y búsqueda.',
            'Producto nuevo o de impulso: Meta e Instagram con video del producto.',
            'Cliente que ya compró: email y WhatsApp para recompra y lanzamientos.',
          ],
        },
        {
          title: '¿Qué normas tiene que cumplir el marketing de una tienda online en Perú?',
          paragraphs: [
            'El Código de Protección y Defensa del Consumidor (Ley 29571) obliga a informar el precio total, las condiciones de la oferta y el stock de las promociones, y la tienda debe tener su Libro de Reclamaciones virtual. En los anuncios esto significa que el precio y las condiciones que ve el comprador tienen que coincidir con los de la página; Merchant Center rechaza el producto cuando no coinciden.',
            'Los correos y mensajes de WhatsApp solo se envían a quien dio su consentimiento, y las listas de clientes que se suben a Google o Meta para remarketing tienen que cumplir la Ley 29733 de Protección de Datos Personales. 3R Core solo usa contactos que aceptaron la política de privacidad de la tienda.',
          ],
        },
        {
          title: '¿Qué mide 3R Core en el marketing de un ecommerce?',
          paragraphs: [
            'Medimos pedidos e ingreso por canal y categoría, y el costo de publicidad por pedido. Cada compra se registra con su valor en Google Ads y Meta, y los pedidos cerrados por WhatsApp entran al panel con la campaña de origen para que no se pierdan.',
            'Con ese dato se decide el presupuesto del mes siguiente. Si una categoría vende con un costo por pedido mayor que su margen, se baja la puja o se saca del catálogo de anuncios. Si el email recupera carritos a bajo costo, se le dedica más trabajo antes de subir la pauta.',
          ],
        },
      ],
    },
    faqBadge: 'Preguntas frecuentes',
    faqTitle: 'Preguntas frecuentes sobre marketing digital para ecommerce',
    faqs: [
      { question: '¿Por dónde empieza una tienda online que quiere vender más con marketing digital?', answer: 'Por la medición y el catálogo. Si la compra no se registra con su valor, ninguna campaña puede optimizar hacia ventas. Con eso listo, el primer canal suele ser Shopping sobre los productos con mejor margen, porque capta a quien ya está buscando.' },
      { question: '¿Conviene más Google o Meta para una tienda online?', answer: 'Cumplen papeles distintos. Google capta a quien ya busca el producto y suele convertir antes. Meta e Instagram generan demanda para productos que la gente no busca todavía, como una marca nueva o un producto de impulso. La mayoría de tiendas usa los dos, con más peso en el que mejor costo por pedido dé.' },
      { question: '¿Sirve el email marketing para una tienda pequeña?', answer: 'Sí, y suele ser de lo más rentable. Una secuencia de carrito abandonado y otra de recompra trabajan sola todos los días. Solo se envía a quien aceptó recibir correos, así que conviene pedir ese permiso en el checkout desde el inicio.' },
      { question: '¿Cómo se miden las ventas que se cierran por WhatsApp?', answer: 'El clic a WhatsApp guarda el origen de la visita y el pedido se registra en el panel cuando se cierra. Esa venta se puede subir a Google Ads como conversión offline, para que la campaña aprenda de los pedidos reales y no solo de los que pasan por el carrito.' },
      { question: '¿Ustedes hacen la tienda virtual?', answer: 'No. 3R Core se encarga del marketing: tráfico, campañas, email y medición. Trabajamos sobre la tienda que ya tienes en Shopify, WooCommerce, VTEX u otra plataforma, siempre que registre la compra y tenga pagos y envíos funcionando.' },
      { question: '¿Cuánto cuesta el marketing digital para una tienda online?', answer: 'Depende de cuántos canales se trabajen. Como referencia, la gestión de Google Ads de 3R Core parte de S/1,800 + IGV al mes con pauta desde S/1,500, y el SEO mensual parte desde S/1,800 + IGV, monto referencial. El plan por escrito se arma después del diagnóstico.' },
    ],
    seoTitle: 'Marketing digital para ecommerce en Perú con 3R Core',
    p1: '3R Core es una agencia de marketing digital con equipo propio en Lima, en La Molina. Trabajamos con tiendas online que quieren saber qué canal les trae pedidos y cuánto les cuesta cada uno.',
    p2: 'El plan se arma por categoría y margen, y se ajusta cada mes con los pedidos reales. Lo que vende sin dejar plata se corrige antes de subir el presupuesto.',
    p3: 'Si quieres saber qué productos de tu tienda tienen más margen para anunciar y qué canal conviene encender primero, escríbenos al WhatsApp 987 216 703 o déjanos tus datos en el formulario.',
  },
}
