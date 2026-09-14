"use client";

import { Link } from '@/i18n/routing';
import type { AppPathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';

// Array de datos con la información exacta del diseño. Los href son las rutas
// reales del App Router (el diseño traía /servicios/paginas-web,
// /servicios/tiendas-virtuales y /servicios/contenido-ugc, que no existen) y
// se enlazan con el Link de i18n para que conserven el prefijo /es sin saltos.
const services: { id: string; title: string; desc: string; price: string; href: AppPathname; icon: React.ReactNode }[] = [
  {
    id: 'web',
    title: 'Páginas web',
    desc: 'Webs corporativas, landings y sitios a medida, listos para Google y administrables por ti.',
    price: 'DESDE S/ 1,800',
    href: '/servicios/web-development',
    icon: (
      <svg className="w-6 h-6 text-[#f4266e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    id: 'ecommerce',
    title: 'Tiendas virtuales',
    desc: 'Shopify, WooCommerce o Tiendanube con Yape, Plin, Culqi e Izipay configurados.',
    price: 'DESDE S/ 2,500',
    href: '/tiendas-virtuales-lima',
    icon: (
      <svg className="w-6 h-6 text-[#f4266e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    )
  },
  {
    id: 'seo',
    title: 'Posicionamiento SEO',
    desc: 'Auditoría, contenido y enlaces con reporte mensual de posiciones reales de Google.',
    price: 'S/ 1,800 / MES',
    href: '/posicionamiento-seo',
    icon: (
      <svg className="w-6 h-6 text-[#f4266e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    )
  },
  {
    id: 'ads',
    title: 'Google Ads',
    desc: 'Campañas de Search, Shopping y remarketing con el coste por lead a la vista.',
    price: 'S/ 1,800 / MES',
    href: '/servicios/google-ads',
    icon: (
      <svg className="w-6 h-6 text-[#f4266e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    )
  },
  {
    id: 'social',
    title: 'Redes sociales',
    desc: 'Parrilla, piezas y comunidad en TikTok, Instagram, Facebook y LinkedIn.',
    price: 'S/ 1,500 / MES',
    href: '/servicios/socialmedia',
    icon: (
      <svg className="w-6 h-6 text-[#f4266e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    )
  },
  {
    id: 'branding',
    title: 'Branding',
    desc: 'Identidad visual, manual de marca y aplicaciones listas para usar.',
    price: 'DESDE S/ 500',
    href: '/servicios/branding',
    icon: (
      <svg className="w-6 h-6 text-[#f4266e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    )
  },
  {
    id: 'pr',
    title: 'Relaciones públicas',
    desc: 'Prensa, notas, vocerías y reputación online para que los medios hablen de tu marca.',
    price: 'POR PROYECTO',
    href: '/servicios/relaciones-publicas',
    icon: (
      <svg className="w-6 h-6 text-[#f4266e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    )
  },
  {
    id: 'influencer',
    title: 'Influencer marketing',
    desc: 'Campañas con creadores: casting, acuerdos por escrito y ROI medido al cierre.',
    price: 'POR CAMPAÑA',
    href: '/servicios/influencer-marketing',
    icon: (
      <svg className="w-6 h-6 text-[#f4266e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    id: 'ugc',
    title: 'Contenido UGC',
    desc: 'Videos de creador para Meta Ads y TikTok Ads, producidos por nuestro equipo in-house.',
    price: 'POR PAQUETE',
    href: '/servicios/ugc',
    icon: (
      <svg className="w-6 h-6 text-[#f4266e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    )
  }
];

type CardOverride = { id: string; title?: string; desc?: string; price?: string };

// En Estados Unidos solo se venden tres servicios (pedido del cliente,
// 20-ago: «igual que el de Perú, solo que ahí son 3 servicios»). Mismas
// tarjetas y mismo look, con el catálogo y los precios en dólares que ya
// publican /us/precios y el bloque semántico del home. El orden es el que
// dictó el cliente: tiendas, webs, SEO.
const US_OVERRIDES: CardOverride[] = [
  { id: 'ecommerce', desc: 'Shopify o WooCommerce con catálogo, pasarelas de pago y checkout listos para vender en EE. UU.', price: 'DESDE $1,750' },
  { id: 'web', desc: 'Webs corporativas, landings y sitios a medida, en español e inglés, listos para Google.', price: 'DESDE $850' },
  { id: 'seo', desc: 'Auditoría, contenido y enlaces en español e inglés, con reporte mensual de posiciones reales de Google.', price: '$500 / MES' },
];

// 13-sep-2026. Plan Perú de 3R Core (Piero Roque): el home muestra solo los
// cuatro servicios que se quieren vender —Google Ads, Posicionamiento SEO,
// Desarrollo web y Social Media— y no publica montos: el precio se conversa en
// la reunión. El resto del catálogo sigue dentro de «Servicios».
const ES_OVERRIDES: CardOverride[] = [
  { id: 'ads' },
  { id: 'seo' },
  { id: 'web', title: 'Desarrollo web' },
  { id: 'social', title: 'Social Media' },
];

// 13-sep-2026. Plan USA: /en sirve esta misma home en inglés con los tres
// servicios de EE. UU. (SEO, Web Development, Online Stores) y, como la
// versión en español, sin montos.
const EN_OVERRIDES: CardOverride[] = [
  { id: 'seo', title: 'SEO', desc: 'Audits, content and links, with a monthly report of your real Google rankings.' },
  { id: 'web', title: 'Web Development', desc: 'Corporate websites, landing pages and custom sites, built for Google and easy for you to manage.' },
  { id: 'ecommerce', title: 'Online Stores', desc: 'Shopify or WooCommerce with catalog, payment gateways and checkout ready to sell across the U.S.' },
];

export default function ServicesGridSection() {
  const locale = useLocale();
  const isUs = locale === 'us';
  const isEn = locale === 'en';
  const overrides = isUs ? US_OVERRIDES : isEn ? EN_OVERRIDES : ES_OVERRIDES;
  const cards = overrides.map((o) => {
    const base = services.find((s) => s.id === o.id)!;
    // Solo /us publica montos en el home.
    return { ...base, ...o, price: isUs ? o.price ?? base.price : '' };
  });
  const head = isEn
    ? {
        tag: 'SERVICES',
        line1: 'Three services,',
        line2: 'one team',
        aside: 'Each card leads to its own page. We talk pricing in a meeting, based on your project.',
        cta: 'SEE SERVICE',
      }
    : isUs
      ? {
          tag: 'SERVICIOS Y PRECIOS',
          line1: 'Tres servicios,',
          line2: 'un solo equipo',
          aside: 'Cada tarjeta lleva a su pagina, con el precio desde el que arranca. Sin llamadas para averiguar lo basico. Los precios son referenciales y varían según el alcance del proyecto.',
          cta: 'VER SERVICIO',
        }
      : {
          tag: 'SERVICIOS',
          line1: 'Cuatro servicios,',
          line2: 'un solo equipo',
          aside: 'Cada tarjeta lleva a su página. El precio lo conversamos en la reunión, según tu proyecto.',
          cta: 'VER SERVICIO',
        };
  const gridCols = cards.length === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="w-full text-white py-16 md:py-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-7xl w-full">

        {/* Cabecera de la sección */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="flex flex-col gap-6">
            {/* Tag / Número */}
            <div className="flex items-center gap-4 text-[#f4266e] text-xs font-semibold tracking-widest uppercase">
              <span>03</span>
              <div className="w-12 h-[1px] bg-[#f4266e]"></div>
              <span>{head.tag}</span>
            </div>

            {/* Título Principal */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
              {head.line1}<br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.4)' }}
              >
                {head.line2}
              </span>
            </h2>
          </div>

          {/* Texto Descriptivo Derecho */}
          <div className="lg:w-1/3 text-white/60 text-sm md:text-base font-light leading-relaxed">
            {head.aside}
          </div>
        </div>

        {/* Contenedor del Grid (Simula bordes interiores con bg-white/10 y gap-[1px]) */}
        <div className={`w-full bg-white/10 border border-white/10 rounded-sm grid grid-cols-1 ${gridCols} gap-[1px] overflow-hidden`}>

          {/* Tarjetas de Servicios */}
          {cards.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="bg-[#0a0211] p-8 lg:p-10 flex flex-col justify-between hover:bg-white/[0.03] transition-colors duration-300 group min-h-[320px]"
            >
              <div className="flex flex-col gap-5">
                {service.icon}
                <h3 className="text-xl md:text-2xl font-semibold">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {service.desc}
                </p>
              </div>

              <div className="mt-12 flex flex-col gap-3">
                {service.price && (
                  <span className="text-[#f4266e] text-[10px] font-bold tracking-widest uppercase">
                    {service.price}
                  </span>
                )}
                <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                  {head.cta}
                  <span className="text-lg font-normal">↗</span>
                </span>
              </div>
            </Link>
          ))}

          {/* Tarjeta Inferior de Casos de Éxito (solo /es: la página vive
              únicamente en el mercado peruano) */}
          {locale === 'es' && (
          <Link
            href="/casos-de-exito"
            className="bg-[#0a0211] p-8 lg:p-10 col-span-1 md:col-span-2 xl:col-span-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/[0.03] transition-colors duration-300 group gap-6"
          >
            <div className="flex items-start md:items-center gap-6">
              <svg className="w-8 h-8 text-[#f4266e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3v5.25c0 2.22-1.59 4.1-3.75 4.87m0 0a5.25 5.25 0 01-5.25-5.25V3m9 0h-9m9 0a2.25 2.25 0 012.25 2.25v2.25c0 1.25-.85 2.3-2.02 2.7m-7.23-2.7V5.25m0 0H4.5A2.25 2.25 0 002.25 7.5v2.25c0 1.25.85 2.3 2.02 2.7M12 13.12v4.88M8.25 21h7.5" />
              </svg>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-1">Casos de éxito</h3>
                <p className="text-white/60 text-sm font-light">Marcas que ya pasaron por aquí, con lo que se hizo y lo que se entregó.</p>
              </div>
            </div>

            <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 text-white/80 group-hover:text-white transition-colors flex-shrink-0">
              VER CASOS DE ÉXITO
              <span className="text-lg font-normal">↗</span>
            </span>
          </Link>
          )}

        </div>
      </div>
    </section>
  );
}
