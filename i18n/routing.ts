import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

/**
 * Slugs por mercado.
 *
 * La clave de cada entrada es la ruta INTERNA (la carpeta real de app/[locale])
 * y siempre está en español, porque así nació el proyecto. Lo que cambia es la
 * ruta que ve el usuario: en /en se sirve en inglés.
 *
 * Hasta ahora un visitante estadounidense aterrizaba en
 * `/en/posicionamiento-seo` o `/en/tiendas-virtuales-lima`: la URL desmentía al
 * contenido y a Google le llegaba una señal en el idioma equivocado.
 *
 * /us es español (es-US), así que comparte los slugs de Perú.
 *
 * Importante al añadir una ruta nueva: si no aparece aquí, el `Link` de
 * i18n/navigation da error de tipos. Es intencionado — obliga a decidir el
 * slug de cada locale en vez de olvidarlo.
 */
export const pathnames = {
  '/': '/',

  // Pilares
  '/posicionamiento-seo': {es: '/posicionamiento-seo', us: '/posicionamiento-seo', en: '/seo-agency'},
  '/tiendas-virtuales-lima': {es: '/tiendas-virtuales-lima', us: '/tiendas-online', en: '/ecommerce-development'},

  // Índice de servicios y sus hijas
  '/servicios': {es: '/servicios', us: '/servicios', en: '/services'},
  '/servicios/google-ads': {es: '/servicios/google-ads', us: '/servicios/google-ads', en: '/services/google-ads'},
  '/servicios/web-development': {es: '/servicios/web-development', us: '/servicios/desarrollo-web', en: '/services/web-development'},
  '/servicios/socialmedia': {es: '/servicios/socialmedia', us: '/servicios/redes-sociales', en: '/services/social-media'},
  '/servicios/branding': {es: '/servicios/branding', us: '/servicios/branding', en: '/services/branding'},
  '/servicios/ugc': {es: '/servicios/ugc', us: '/servicios/ugc', en: '/services/ugc-content'},
  '/servicios/influencer-marketing': {es: '/servicios/influencer-marketing', us: '/servicios/influencer-marketing', en: '/services/influencer-marketing'},
  '/servicios/relaciones-publicas': {es: '/servicios/relaciones-publicas', us: '/servicios/relaciones-publicas', en: '/services/public-relations'},
  '/servicios/meta-ads': {es: '/servicios/meta-ads', us: '/servicios/meta-ads', en: '/services/meta-ads'},
  '/servicios/tiktok-ads': {es: '/servicios/tiktok-ads', us: '/servicios/tiktok-ads', en: '/services/tiktok-ads'},
  '/servicios/performance-marketing': {es: '/servicios/performance-marketing', us: '/servicios/performance-marketing', en: '/services/performance-marketing'},
  '/servicios/email-marketing': {es: '/servicios/email-marketing', us: '/servicios/email-marketing', en: '/services/email-marketing'},
  '/servicios/marketing-clinicas': {es: '/servicios/marketing-clinicas', us: '/servicios/marketing-clinicas', en: '/services/healthcare-marketing'},
  '/servicios/marketing-inmobiliarias': {es: '/servicios/marketing-inmobiliarias', us: '/servicios/marketing-inmobiliario', en: '/services/real-estate-marketing'},
  '/servicios/marketing-ecommerce': {es: '/servicios/marketing-ecommerce', us: '/servicios/marketing-ecommerce', en: '/services/ecommerce-marketing'},
  // 29-ago-2026. Dos verticales/ejes vacíos y con demanda medida:
  //  - posicionamiento-ia (GEO): el competidor que domina Lima tiene 118 URLs
  //    sobre esto y 3rcore CERO, teniendo el único dato propio del mercado
  //    (su tráfico de IA convierte al 12,23% contra el 4,03% del orgánico).
  //  - marketing-abogados: vertical vacío en las dos webs, con demanda en el
  //    autocompletado. 3rcore ya tiene clínicas, inmobiliarias y e-commerce.
  '/servicios/posicionamiento-ia': {es: '/servicios/posicionamiento-ia', us: '/servicios/posicionamiento-ia', en: '/services/generative-engine-optimization'},
  '/servicios/marketing-abogados': {es: '/servicios/marketing-abogados', us: '/servicios/marketing-abogados', en: '/services/law-firm-marketing'},

  // 2-set-2026. Tres verticales con demanda medida en el autocompletado de
  // Google y con la matriz ya funcionando: /servicios/marketing-clinicas está
  // en posición 2,0 con solo 4 enlaces internos.
  //  - clínicas dentales: «marketing para dentistas» da 10 sugerencias.
  //  - clínicas estéticas: 3 sugerencias, y reglas de anuncios distintas
  //    (Meta prohíbe el antes/después en tratamientos corporales).
  //  - veterinarias: 5 sugerencias y vertical vacío en las 9 webs medidas.
  '/servicios/marketing-clinicas-dentales': {es: '/servicios/marketing-clinicas-dentales', us: '/servicios/marketing-clinicas-dentales', en: '/services/dental-clinic-marketing'},
  '/servicios/marketing-clinicas-esteticas': {es: '/servicios/marketing-clinicas-esteticas', us: '/servicios/marketing-clinicas-esteticas', en: '/services/aesthetic-clinic-marketing'},
  '/servicios/marketing-veterinarias': {es: '/servicios/marketing-veterinarias', us: '/servicios/marketing-veterinarias', en: '/services/veterinary-marketing'},

  // Páginas ancla de un solo mercado
  '/nearshore-marketing-agency': '/nearshore-marketing-agency',
  '/marketing-para-negocios-hispanos': '/marketing-para-negocios-hispanos',
  // 28-ago-2026. Dos ejes distintos del mercado de EE.UU. que no tenían URL:
  //  - /hispanic-marketing-agency responde a quien busca EN INGLÉS una agencia
  //    para llegar al consumidor hispano (el marketer estadounidense).
  //  - /spanish-seo-services responde a "spanish seo services", que es un
  //    servicio concreto y no el genérico de /seo-agency.
  // No se creó la versión en español de ninguna de las dos: en /us ese eje ya
  // lo ocupa /marketing-para-negocios-hispanos y duplicarlo sería canibalizar.
  '/hispanic-marketing-agency': '/hispanic-marketing-agency',
  '/spanish-seo-services': '/spanish-seo-services',
  // Solo en /es: la página del prototipo habla de marcas trabajadas desde Lima
  '/casos-de-exito': '/casos-de-exito',
  // Landing madre del eje comercial, recuperada el 26-ago. Se declara aquí para
  // poder enlazarla con <Link>: hasta el 29-ago no la enlazaba NADIE en las 224
  // páginas del sitio, y sin entrada en `pathnames` el tipo AppPathname lo
  // impedía. Solo /es: en /en el mercado lo ataca /nearshore-marketing-agency.
  '/agencia-marketing-digital-lima': '/agencia-marketing-digital-lima',
  // 28-sep-2026. Precio del SEO en Perú. Solo /es.
  '/cuanto-cuesta-el-seo-en-peru': '/cuanto-cuesta-el-seo-en-peru',

  // Institucionales
  '/nosotros': {es: '/nosotros', us: '/nosotros', en: '/about'},
  '/precios': {es: '/precios', us: '/precios', en: '/pricing'},
  '/cotizar': {es: '/cotizar', us: '/cotizar', en: '/quote'},
  '/preguntas': {es: '/preguntas', us: '/preguntas', en: '/faq'},
  '/gracias': {es: '/gracias', us: '/gracias', en: '/thank-you'},

  // El blog conserva /blogs en los tres: en next.config.ts ya existe un 301 de
  // /blog a /blogs y cambiar el slug inglés a /blog chocaría con esa regla.
  '/blogs': '/blogs',
  '/blogs/[slug]': '/blogs/[slug]',

  // Legales
  '/politicas': {es: '/politicas', us: '/politicas', en: '/privacy-policy'},
  '/terminos': {es: '/terminos', us: '/terminos', en: '/terms'},
  // Obligación de Indecopi: solo tiene sentido en Perú, pero la ruta debe
  // existir en los tres para no romper el enlace del pie de página.
  '/reclamaciones': '/reclamaciones',
} satisfies Record<string, string | Record<string, string>>

/**
 * Rutas internas estáticas. Tiparse contra esto impide enlazar a una ruta
 * que no tenga slug declarado en los tres locales.
 * Se excluyen las dinámicas (`/blogs/[slug]`): esas se enlazan con
 * `{pathname, params}`, no con una cadena suelta.
 */
export type AppPathname = Exclude<keyof typeof pathnames, `${string}[${string}`>

export const routing = defineRouting({
  // 'us' = es-US: español para el negocio hispano de EE.UU. No se reutiliza /es
  // porque ese habla de soles, RUC, Yape y +51. Los mensajes de 'us' heredan de
  // es.json por deep-merge (ver i18n/request.ts) y solo sobrescriben lo que
  // cambia de mercado, así ninguna clave puede quedar sin traducir.
  locales: ['en', 'es', 'us'],

  defaultLocale: 'es',

  // El middleware emitía Link headers hreflang para TODAS las rutas, incluidos
  // los ~139 posts /es/blogs/* cuyo "alternate" EN no existe (devuelve 307 de
  // vuelta al ES) y un x-default apuntando a la URL sin locale (que también
  // redirige 307) → hreflang inválido a escala. Los hreflang correctos ya los
  // aportan el sitemap (páginas core, con x-default a /en) y el metadata de
  // cada post (solo idiomas realmente publicados).
  alternateLinks: false,

  pathnames,
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
