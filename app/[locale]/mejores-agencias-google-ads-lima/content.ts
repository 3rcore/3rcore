/**
 * /es/mejores-agencias-google-ads-lima — comparativa de agencias.
 *
 * Reglas de esta página (no romper al editarla):
 *  - 3R Core es la autora y se dice arriba, en el primer párrafo.
 *  - De las demás agencias solo va lo que publica su propia web, con enlace:
 *    servicios de su menú, si dice ser Google Partner y si publica precio.
 *    Consultado el 28-sep-2026 (HTML guardado en
 *    ~/clients/3rcore-seo-peru-usa-2026-09-28/tanda2-raw/ag/).
 *  - Nada de notas, rankings de calidad ni opiniones sobre el trabajo ajeno.
 *  - Todas salieron en Google Perú para «agencia google ads lima/perú» en
 *    septiembre de 2026 (peru-raw/serp y peru-raw/competidores).
 *  - 3R Core NO se declara Google Partner en su web: no se afirma.
 * Si un dato cambia en la web de una agencia, se corrige aquí o se quita.
 *
 * 9-oct-2026 (comparativa honesta, plan Mega SEO): se añade arriba una
 * respuesta directa y una tabla de CRITERIOS VERIFICABLES (qué mirar, por qué
 * y cómo comprobarlo uno mismo), que es el formato que citan las respuestas de
 * IA para «mejores agencias de Google Ads en Lima». Regla añadida: no se
 * incluye ninguna empresa relacionada con la familia del cliente; ninguna de
 * las siete lo es según lo que consta en el proyecto (revisar antes de añadir
 * otra). Jerarquía de encabezados comprobada sin saltos (JEV-002).
 */
import {
  bridges, frame, closing, faqBlock, hero, numlist, page, prose, sec, table,
  type Faq, type LandingPeru,
} from '@/lib/landings-peru'
import { BASE_URL } from '@/lib/metadata'

const ext = (href: string, label: string) => `<a href="${href}" target="_blank" rel="noopener nofollow">${label}</a>`

type Agencia = { nombre: string; web: string; pagina: string; partner: string; precio: string; servicios: string; perfil: string }

const AGENCIAS: Agencia[] = [
  {
    nombre: '3R Core',
    web: 'https://3rcore.com/es',
    pagina: '/es/servicios/google-ads',
    partner: 'No lo declara en su web',
    precio: 'Sí: gestión S/1,800 al mes; la pauta se paga aparte a Google (recomienda desde S/1,500 al mes). Referencial',
    servicios: 'SEO, desarrollo web, redes sociales, Meta Ads, TikTok Ads y branding',
    perfil:
      'Agencia de La Molina, autora de esta comparativa. Publica su fee de gestión (S/1,800 al mes, neto) y deja la pauta en la cuenta del cliente, a su nombre. Trabaja campañas de búsqueda y Performance Max, sin permanencia forzosa. Tiene 4,7★ en 42 reseñas de Google. No se presenta como Google Partner.',
  },
  {
    nombre: 'NAVE Digital',
    web: 'https://naveperu.com/',
    pagina: 'https://naveperu.com/agencia-google-ads/',
    partner: 'Sí, muestra el sello de Google Partner en su página de Google Ads',
    precio: 'No encontramos precios en su página de Google Ads',
    servicios: 'Branding, diseño web, Google Shopping, YouTube Ads, Facebook Ads, LinkedIn Ads, TikTok Ads y SEO',
    perfil:
      'Su página de Google Ads se titula «Agencia de Google Ads en Lima Peru +12 años de Experiencia». En el menú separa Google Ads, Google Shopping Ads y YouTube Ads, además de redes y SEO.',
  },
  {
    nombre: 'KOM',
    web: 'https://kom.pe/',
    pagina: 'https://kom.pe/google-ads/',
    partner: 'Sí, su página de Google Ads se titula «Google Partner 2026»',
    precio: 'Sí: planes desde S/750 al mes (precio normal S/1,500, marcado con asterisco), sin IGV, con inversión sugerida de S/1,500 y 20 % de manejo de pauta',
    servicios: 'Páginas web, tiendas virtuales, landing pages, mantenimiento web, consultoría SEO y servicios cloud',
    perfil:
      'Publica tres planes de Google Ads (Profesional, Empresarial y Corporativo) con precio, número de campañas, grupos de anuncios e inversión sugerida para cada uno. Indica que no pide contratos de permanencia.',
  },
  {
    nombre: 'Monstruo Creativo',
    web: 'https://monstruocreativo.com/',
    pagina: 'https://monstruocreativo.com/google-ads/',
    partner: 'Sí, muestra los sellos de Google Partner y Meta Partner',
    precio: 'Sí: planes Empresarial S/1,500 y Corporativo S/2,000, que según su web incluyen seguimiento de la campaña por hasta 30 días',
    servicios: 'Meta Ads, TikTok Ads, LinkedIn Ads, Microsoft Ads, email marketing, páginas web por rubro y tiendas virtuales',
    perfil:
      'Su web publica una dirección en Miraflores y dos planes de Google Ads con precio y lista de lo que incluye cada uno. Tiene páginas de diseño web separadas por rubro (restaurantes, clínicas, inmobiliarias y otros).',
  },
  {
    nombre: 'IBO',
    web: 'https://ibo.pe/',
    pagina: 'https://ibo.pe/servicios/google-ads',
    partner: 'Sí, su portada lista «Google Partner» entre sus partners certificados',
    precio: 'No encontramos precios en su página de Google Ads',
    servicios: 'SEO y posicionamiento GEO, Meta Ads, TikTok Ads, LinkedIn Ads, desarrollo web y de apps, analítica e inteligencia artificial',
    perfil:
      'Tiene uno de los catálogos más amplios de esta lista: además de paid media, ofrece auditorías, SEO técnico, migraciones SEO y agentes de IA. También publica cursos de Google Ads.',
  },
  {
    nombre: 'Yankenpo Digital',
    web: 'https://yankenpodigital.com/',
    pagina: 'https://yankenpodigital.com/publicidad-google-adwords/',
    partner: 'No encontramos la mención en su portada ni en su página de Google Ads',
    precio: 'No encontramos precios en su página de Google Ads',
    servicios: 'Sitios web, tiendas virtuales, landing pages, SEO, Meta Ads, community manager, email marketing y branding',
    perfil:
      'Tiene una página dedicada a la publicidad en Google y reparte su menú entre desarrollo web y marketing digital. También tiene páginas de SEO para varias ciudades del Perú.',
  },
  {
    nombre: 'emkt.pe',
    web: 'https://emkt.pe/',
    pagina: 'https://emkt.pe/',
    partner: 'Sí: «Somos una Agencia Partner Certificada por Google»',
    precio: 'Tiene una sección «Planes y Precios», pero los montos no aparecen como texto en la página',
    servicios: 'Google Ads y diseño web',
    perfil:
      'Es una web enfocada solo en Google Ads, con secciones de por qué anunciar, cómo funciona y planes. Según su pie de página, pertenece a Host-n-Web.com.',
  },
]

const faq: Faq[] = [
  {
    q: '¿Cuál es la mejor agencia de Google Ads en Lima?',
    a: 'Depende de lo que necesites. Si quieres saber el costo antes de hablar, sirven las que publican precio, como KOM, Monstruo Creativo o 3R Core. Si para ti es clave el sello de Google, compruébalo en el directorio oficial de Google Partners. Y en cualquier caso, exige que la cuenta de Google Ads quede a tu nombre.',
  },
  {
    q: '¿Cuánto cobra una agencia de Google Ads en Lima?',
    a: 'Entre las agencias de esta comparativa que publican precio, la gestión va de S/750 al mes (precio promocional de KOM, que marca como normal S/1,500) a S/2,000 (plan Corporativo de Monstruo Creativo). 3R Core cobra S/1,800 al mes. A eso se suma la pauta, que se paga a Google. Montos consultados el 28 de septiembre de 2026, referenciales y sin IGV.',
  },
  {
    q: '¿Cuánto debo invertir en pauta de Google Ads?',
    a: '3R Core recomienda arrancar desde S/1,500 al mes de pauta, y KOM sugiere la misma cifra en su plan de entrada. Por debajo de ese monto el anuncio se muestra tan poco que cuesta sacar conclusiones. La pauta es tuya: la pagas directo a Google.',
  },
  {
    q: '¿Qué significa que una agencia sea Google Partner?',
    a: 'Es una insignia del programa Google Partners, que Google da a empresas que cumplen requisitos de inversión gestionada, rendimiento y certificaciones. Se verifica buscando el nombre de la agencia en partnersdirectory.withgoogle.com. Es una señal útil, pero no reemplaza preguntar cómo se van a medir tus conversiones.',
  },
  {
    q: '¿Qué debo preguntar antes de contratar una agencia de Google Ads?',
    a: 'Cinco cosas: si la cuenta queda a tu nombre, cuánto es el fee y cuánto la pauta por separado, qué conversión se va a medir y cómo, cada cuánto recibes el reporte y si hay permanencia mínima.',
  },
  {
    q: '¿Cómo compruebo lo que dice una agencia sobre sí misma?',
    a: 'Con fuentes que la agencia no controla: el directorio oficial de Google Partners para la insignia, su ficha de Google para las reseñas y tu propia cuenta de Google Ads para saber quién es el propietario y qué conversiones se están contando.',
  },
  {
    q: '¿Quién escribió esta comparativa?',
    a: 'El equipo de 3R Core, que también aparece en la lista. Por eso no ponemos notas ni opiniones sobre las demás agencias: solo datos que ellas publican en su propia web, con el enlace para que los compruebes.',
  },
]

const CRITERIOS: string[][] = [
  [
    'La cuenta de Google Ads queda a tu nombre',
    'Si la cuenta es de la agencia, el historial, las audiencias y las conversiones se quedan con ella cuando termines.',
    'Pide acceso de administrador desde el primer día y revisa en Google Ads › Administrador › Acceso y seguridad quién es el propietario.',
  ],
  [
    'Fee y pauta por separado y por escrito',
    'Así sabes cuánto de tu dinero llega a Google y cuánto es el trabajo de la agencia. Algunas cobran además un porcentaje de la pauta.',
    'Compara la propuesta con el precio publicado en su web, si lo publica, y con la facturación de Google en tu cuenta.',
  ],
  [
    'Qué conversión se mide',
    'Si se mide el clic y no el contacto, Google aprende a traer clics baratos. Un buen montaje mide formularios, llamadas y WhatsApp, y evita contar el mismo lead dos veces.',
    'En Google Ads › Objetivos › Conversiones mira qué acciones están como principales y si coinciden con los leads que de verdad recibes.',
  ],
  [
    'Insignia de Google Partner',
    'Indica que la agencia cumple requisitos de inversión gestionada, rendimiento y certificaciones que pide Google. No garantiza resultados, pero es un dato comprobable.',
    'Busca el nombre en el directorio oficial de Google Partners (partnersdirectory.withgoogle.com). Lo que diga su web no basta.',
  ],
  [
    'Reseñas de clientes con nombre',
    'Las reseñas de un perfil de Google o de un directorio como Clutch dicen más que los testimonios que una agencia elige para su propia web.',
    'Lee las reseñas recientes de su ficha de Google y mira si responden a las negativas.',
  ],
  [
    'Reporte con costo por lead',
    'Impresiones y clics no pagan facturas. El reporte útil trae inversión, leads, costo por lead y lo que se va a cambiar el mes siguiente.',
    'Pide un reporte de ejemplo, con los datos de otro cliente ocultos, antes de firmar.',
  ],
  [
    'Permanencia',
    'Una campaña necesita semanas de aprendizaje, pero una permanencia larga sin salida te ata aunque no funcione.',
    'Revisa si su web dice que trabaja sin permanencia y que el contrato diga lo mismo.',
  ],
]

const filas = AGENCIAS.map((a) => [
  a.nombre === '3R Core' ? `<a href="${a.pagina}">${a.nombre}</a>` : ext(a.pagina, a.nombre),
  a.partner,
  a.precio,
  a.servicios,
])

const perfiles = AGENCIAS.map((a) => ({
  h: a.nombre,
  p: `${a.perfil} ${a.nombre === '3R Core' ? `<a href="${a.pagina}">Ver el servicio de Google Ads de 3R Core</a>.` : `Fuente: ${ext(a.pagina, a.pagina.replace('https://', ''))}.`}`,
}))

const html = page(
  hero({
    crumb: 'Mejores agencias de Google Ads en Lima',
    h1: 'Mejores agencias de <span class="mg">Google Ads en Lima</span> (2026)',
    lede:
      'Esta comparativa la escribimos en 3R Core, que es una de las agencias de la lista. Para que te sirva aunque no nos elijas, cada dato de las demás agencias sale de su propia web pública, consultada el 28 de septiembre de 2026, con el enlace para que lo compruebes. No ponemos notas ni opiniones sobre el trabajo de nadie.',
    waMsg: 'Hola 3R Core, leí la comparativa de agencias de Google Ads y quiero cotizar mis campañas.',
    second: { href: '#comparativa', label: 'Ver la tabla' },
    bg: '/proto/img/hero/seoCarrubg.webp',
    art: frame('/proto/img/hero/seoCarru1.webp', 'Ilustración de anuncios de Google Ads', '3rcore.com/es/mejores-agencias-google-ads-lima'),
  }),

  sec({
    slim: true,
    h2: 'Respuesta corta',
    body: prose([
      'No hay una agencia de Google Ads que sea la mejor para todos. La que te conviene es la que deja la cuenta a tu nombre, te da el fee y la pauta por separado, mide contactos reales (formularios, llamadas y WhatsApp) y te reporta cada mes el costo por lead. Abajo tienes siete criterios que puedes comprobar tú mismo y siete agencias que salen en Google Perú, con lo que cada una publica en su web.',
    ]),
  }),

  sec({
    alt: true,
    id: 'criterios',
    h2: 'Siete criterios para comparar agencias de Google Ads',
    intro: 'Ninguno depende de lo que te digan en la reunión: todos se pueden comprobar en tu cuenta, en la web de la agencia o en un directorio público.',
    body: table(['Criterio', 'Por qué importa', 'Cómo comprobarlo'], CRITERIOS),
  }),

  sec({
    h2: 'Cómo armamos esta lista',
    intro:
      'Son siete agencias que salieron en Google Perú para «agencia google ads lima» o «agencia google ads perú» en septiembre de 2026 y que tienen una página propia de Google Ads.',
    body: numlist([
      { h: 'Servicio real, no solo blog', p: 'Entraron las que tienen una página de servicio de Google Ads. Las que solo aparecían con artículos informativos o como directorio no están.' },
      { h: 'Google Partner según su propia web', p: 'Anotamos lo que cada agencia dice de sí misma. Para confirmarlo, busca el nombre en el directorio oficial de Google Partners (partnersdirectory.withgoogle.com).' },
      { h: 'Si publica precio', p: 'Saber el costo antes de la primera llamada ahorra tiempo. Anotamos el monto tal como figura en su web, sin interpretarlo.' },
      { h: 'Qué más ofrece', p: 'Los servicios salen del menú de cada web. Sirve para saber si puedes llevar SEO, web o redes con la misma agencia.' },
    ]),
  }),

  sec({
    alt: true,
    id: 'comparativa',
    h2: 'Tabla comparativa de agencias de Google Ads en Lima',
    intro:
      'Datos tomados de la web de cada agencia el 28 de septiembre de 2026. Los precios son referenciales, no incluyen IGV salvo que la agencia diga otra cosa y pueden cambiar: confírmalos en su web.',
    body: table(['Agencia', '¿Se declara Google Partner?', '¿Publica precio de gestión?', 'Otros servicios (según su menú)'], filas),
  }),

  sec({
    h2: 'Las agencias, una por una',
    intro: 'El orden es el de la tabla. 3R Core va primero porque es quien escribe; no es un ranking.',
    body: numlist(perfiles),
  }),

  sec({
    alt: true,
    h2: '¿Cuánto cuesta una agencia de Google Ads en Lima?',
    body: prose([
      'Entre las agencias de esta lista que publican precio, la gestión mensual va de <b style="color:var(--ink)">S/750</b> (precio promocional de KOM, que marca como normal S/1,500) a <b style="color:var(--ink)">S/2,000</b> (plan Corporativo de Monstruo Creativo). 3R Core cobra <b style="color:var(--ink)">S/1,800 al mes</b>. Las otras cuatro no muestran montos como texto en su web.',
      'Ese fee es solo el trabajo de la agencia. La pauta, lo que Google te cobra por los clics, va aparte. KOM sugiere S/1,500 al mes en su plan de entrada y 3R Core recomienda arrancar desde esa misma cifra. KOM, además, cobra un 20 % de manejo de pauta según su web. Los montos indicados son referenciales.',
      'Antes de comparar solo el número, pregunta qué incluye: cuántas campañas, si hay Performance Max o solo búsqueda, quién arma las landing pages y cada cuánto te reportan.',
    ]),
  }),

  sec({
    h2: 'Qué preguntar antes de contratar',
    body: numlist([
      { h: '¿La cuenta de Google Ads queda a mi nombre?', p: 'Si la cuenta es de la agencia, el historial y los datos se quedan con ella cuando termines el contrato.' },
      { h: '¿Cuánto es el fee y cuánto la pauta?', p: 'Pide los dos números por separado y por escrito. Así sabes cuánto de tu inversión llega a Google.' },
      { h: '¿Qué conversión van a medir?', p: 'Un clic en WhatsApp no es una venta. Pregunta qué evento se cuenta como conversión y cómo se evita contar robots o clics repetidos.' },
      { h: '¿Cada cuánto veo resultados?', p: 'Lo razonable es un reporte mensual con costo por lead o por venta, no solo impresiones y clics.' },
      { h: '¿Hay permanencia mínima?', p: 'KOM y 3R Core dicen en su web que trabajan sin permanencia. Si la agencia que elijas pide una, que esté escrita en el contrato.' },
    ]),
  }),

  faqBlock(faq, 'Preguntas frecuentes sobre agencias de Google Ads'),

  bridges('Sigue por aquí', [
    'Si quieres ver cómo trabajamos las campañas y qué incluye el fee, entra al <a href="/es/servicios/google-ads">servicio de Google Ads de 3R Core</a>.',
    'Si todavía no tienes dónde aterrizar el tráfico, revisa <a href="/es/cuanto-cuesta-una-pagina-web-en-peru">cuánto cuesta una página web en Perú</a> o arma tu presupuesto en el <a href="/es/cotizar">cotizador</a>.',
  ]),

  closing({
    h2: '¿Revisamos tus campañas?',
    lede: 'Cuéntanos tu rubro y tu presupuesto de pauta. Te decimos qué campañas harían falta y cuánto costaría la gestión, por escrito.',
    waMsg: 'Hola 3R Core, quiero cotizar la gestión de mis campañas de Google Ads.',
    first: 'Campañas en Google Ads',
  })
)

export const PAGE: LandingPeru = {
  path: '/mejores-agencias-google-ads-lima',
  title: 'Mejores agencias de Google Ads en Lima (2026) ✔️ Comparativa',
  description:
    'Siete agencias de Google Ads en Lima comparadas con datos de su propia web: si se declaran Google Partner, si publican precio y qué más ofrecen. Escrita por 3R Core.',
  breadcrumb: 'Mejores agencias de Google Ads en Lima',
  faq,
  service: {
    name: 'Gestión de campañas de Google Ads en Lima',
    description:
      'Gestión de campañas de búsqueda y Performance Max con la cuenta a nombre del cliente, reporte de costo por lead y sin permanencia. Fee referencial de S/1,800 al mes, pauta aparte.',
    serviceType: 'Google Ads management',
    areaServed: [{ type: 'City', name: 'Lima' }, { type: 'Country', name: 'Perú' }],
    priceFrom: 1800,
  },
  extraJsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Agencias de Google Ads en Lima comparadas (2026)',
      numberOfItems: AGENCIAS.length,
      itemListElement: AGENCIAS.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Organization',
          name: a.nombre,
          url: a.nombre === '3R Core' ? `${BASE_URL}/es` : a.web,
        },
      })),
    },
  ],
  html,
}
