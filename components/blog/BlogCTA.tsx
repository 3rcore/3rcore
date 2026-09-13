'use client'

import { useEffect, useRef } from 'react'
import type { AppPathname } from "@/i18n/routing";
import { Link } from '@/i18n/navigation'
import { serviceForSlug, guidesFor, type ServiceKey } from '@/lib/blog-cta-map'
import { WA_LEADS } from '@/lib/contact'
import { trackConversion } from '@/lib/track'
import InlineLeadForm from '@/components/blog/InlineLeadForm'

/**
 * BlogCTA — bloque de conversión al final (y opcionalmente en medio) de cada blog.
 * Mapea el slug del post al servicio 3R Core más relevante (mapa compartido en
 * lib/blog-cta-map.ts, ahora con TODO el cluster mapeado por tema) y mide TODO
 * en GTM (dataLayer): blog_cta_view (impresión, 1 vez por visible),
 * blog_cta_click (clic al servicio) y blog_cta_whatsapp (clic a WhatsApp).
 * Recursos propios, sin terceros: el WhatsApp va al número de agenda y el botón
 * lleva a la landing de servicio (que captura con el formulario/panel propio).
 * Además enlaza 2 guías buyer-intent del mismo tema ("Sigue leyendo") para
 * desorfanizar el cluster y empujar al lector hacia contenido de decisión.
 */

const WA_PHONE = WA_LEADS

interface ServiceCTA {
  path: AppPathname
  es: { eyebrow: string; headline: string; sub: string; btn: string; wa: string }
  en: { eyebrow: string; headline: string; sub: string; btn: string; wa: string }
}

const SERVICES: Record<ServiceKey, ServiceCTA> = {
  web: {
    path: '/servicios/web-development',
    es: { eyebrow: 'Diseño y desarrollo web', headline: '¿Listo para una web que sí te traiga clientes?', sub: 'Diseñamos webs rápidas, optimizadas para Google y pensadas para convertir. Cotiza tu proyecto sin compromiso.', btn: 'Ver servicio de diseño web', wa: 'Cotizar mi web por WhatsApp' },
    en: { eyebrow: 'Web design & development', headline: 'Ready for a website that brings you clients?', sub: 'Fast, SEO-ready websites built to convert. Get a no-commitment quote.', btn: 'See web development service', wa: 'Quote my website on WhatsApp' },
  },
  branding: {
    path: '/servicios/branding',
    es: { eyebrow: 'Branding e identidad', headline: '¿Quieres una marca que se recuerde y venda?', sub: 'Construimos identidades visuales sólidas: logo, manual de marca y aplicaciones. Agenda una asesoría.', btn: 'Ver servicio de branding', wa: 'Agendar asesoría de branding' },
    en: { eyebrow: 'Branding & identity', headline: 'Want a brand people remember and buy from?', sub: 'Solid visual identities: logo, brand manual and applications. Book a consultation.', btn: 'See branding service', wa: 'Book a branding consultation' },
  },
  'meta-ads': {
    path: '/servicios/meta-ads',
    es: { eyebrow: 'Meta Ads · Facebook e Instagram', headline: '¿Quieres campañas en Facebook e Instagram con ROAS medible?', sub: 'Gestionamos tus Meta Ads con segmentación, retargeting y creatividades que venden. Cotiza tu campaña.', btn: 'Ver servicio de Meta Ads', wa: 'Cotizar campaña de Meta Ads' },
    en: { eyebrow: 'Meta Ads · Facebook & Instagram', headline: 'Want Facebook & Instagram campaigns with measurable ROAS?', sub: 'We run your Meta Ads with targeting, retargeting and creatives that convert. Get a quote.', btn: 'See Meta Ads service', wa: 'Quote a Meta Ads campaign' },
  },
  'tiktok-ads': {
    path: '/servicios/tiktok-ads',
    es: { eyebrow: 'TikTok Ads', headline: '¿Listo para vender en TikTok con anuncios que sí funcionan?', sub: 'Creatividad nativa + segmentación para llegar a compradores jóvenes. Cotiza tu campaña de TikTok Ads.', btn: 'Ver servicio de TikTok Ads', wa: 'Cotizar campaña de TikTok Ads' },
    en: { eyebrow: 'TikTok Ads', headline: 'Ready to sell on TikTok with ads that work?', sub: 'Native creative + targeting to reach young buyers. Quote your TikTok Ads campaign.', btn: 'See TikTok Ads service', wa: 'Quote a TikTok Ads campaign' },
  },
  'google-ads': {
    path: '/servicios/google-ads',
    es: { eyebrow: 'Google Ads · SEM', headline: '¿Quieres aparecer cuando tus clientes buscan hoy?', sub: 'Campañas de Google Ads con intención de compra y presupuesto optimizado. Cotiza tu cuenta.', btn: 'Ver servicio de Google Ads', wa: 'Cotizar campaña de Google Ads' },
    en: { eyebrow: 'Google Ads · SEM', headline: 'Want to show up when your clients search today?', sub: 'High-intent Google Ads campaigns with optimized budget. Get a quote.', btn: 'See Google Ads service', wa: 'Quote a Google Ads campaign' },
  },
  performance: {
    path: '/servicios/performance-marketing',
    es: { eyebrow: 'Performance Marketing', headline: '¿Quieres crecer con marketing que se mide en ventas, no en likes?', sub: 'Adquisición multicanal enfocada en ROI/ROAS, embudos y medición real. Habla con un estratega.', btn: 'Ver Performance Marketing', wa: 'Hablar con un estratega' },
    en: { eyebrow: 'Performance Marketing', headline: 'Want growth measured in sales, not likes?', sub: 'Multichannel acquisition focused on ROI/ROAS, funnels and real measurement. Talk to a strategist.', btn: 'See Performance Marketing', wa: 'Talk to a strategist' },
  },
  email: {
    path: '/servicios/email-marketing',
    es: { eyebrow: 'Email Marketing', headline: '¿Tu lista de contactos podría venderte más?', sub: 'Campañas y automatizaciones de email que nutren y convierten. Activa tu email marketing.', btn: 'Ver servicio de Email Marketing', wa: 'Activar mi email marketing' },
    en: { eyebrow: 'Email Marketing', headline: 'Could your contact list sell you more?', sub: 'Email campaigns and automations that nurture and convert. Get started.', btn: 'See Email Marketing service', wa: 'Start my email marketing' },
  },
  seo: {
    path: '/posicionamiento-seo',
    es: { eyebrow: 'Posicionamiento SEO', headline: '¿Quieres que Google te encuentre primero?', sub: 'SEO orgánico con estrategia de keywords, contenido y reportes mensuales desde S/1,500. Los montos indicados son referenciales. Cotiza tu SEO.', btn: 'Ver servicio de SEO', wa: 'Cotizar mi posicionamiento SEO' },
    en: { eyebrow: 'SEO Positioning', headline: 'Want Google to find you first?', sub: 'Organic SEO with keyword strategy, content and monthly reports. Get a quote.', btn: 'See SEO service', wa: 'Quote my SEO' },
  },
  social: {
    path: '/servicios/socialmedia',
    es: { eyebrow: 'Social Media', headline: '¿Tus redes deberían traer clientes, no solo likes?', sub: 'Estrategia de contenido, diseño y gestión de redes que construye marca y vende. Cotiza tu plan.', btn: 'Ver servicio de Social Media', wa: 'Cotizar gestión de redes' },
    en: { eyebrow: 'Social Media', headline: 'Should your social bring clients, not just likes?', sub: 'Content strategy, design and social management that builds brand and sells. Get a quote.', btn: 'See Social Media service', wa: 'Quote social media management' },
  },
  clinicas: {
    path: '/servicios/marketing-clinicas',
    es: { eyebrow: 'Marketing para clínicas', headline: '¿Quieres llenar la agenda de tu clínica o consultorio?', sub: 'Captación de pacientes con Ads y redes medibles. Agenda una asesoría para tu clínica.', btn: 'Ver marketing para clínicas', wa: 'Agendar asesoría para mi clínica' },
    en: { eyebrow: 'Marketing for clinics', headline: 'Want to fill your clinic’s appointment book?', sub: 'Patient acquisition with measurable ads and social. Book a consultation.', btn: 'See marketing for clinics', wa: 'Book a consultation for my clinic' },
  },
  inmobiliarias: {
    path: '/servicios/marketing-inmobiliarias',
    es: { eyebrow: 'Marketing inmobiliario', headline: '¿Necesitas leads de calidad para tus proyectos?', sub: 'Generación de leads para inmobiliarias y desarrolladores. Agenda una asesoría.', btn: 'Ver marketing inmobiliario', wa: 'Agendar asesoría inmobiliaria' },
    en: { eyebrow: 'Real estate marketing', headline: 'Need quality leads for your projects?', sub: 'Lead generation for real estate developers and agencies. Book a consultation.', btn: 'See real estate marketing', wa: 'Book a real estate consultation' },
  },
  tiendas: {
    path: '/tiendas-virtuales-lima',
    es: { eyebrow: 'Tiendas Virtuales · E-commerce', headline: '¿Listo para vender online con una tienda que sí convierte?', sub: 'Creamos tu tienda en Shopify, WooCommerce o Tiendanube con pagos locales, lista para vender. Cotiza tu tienda virtual.', btn: 'Ver servicio de tiendas virtuales', wa: 'Cotizar mi tienda virtual' },
    en: { eyebrow: 'Online Stores · E-commerce', headline: 'Ready to sell online with a store that converts?', sub: 'We build your store on Shopify, WooCommerce or Tiendanube with local payments, ready to sell. Get a quote.', btn: 'See online store service', wa: 'Quote my online store' },
  },
  ecommerce: {
    path: '/servicios/marketing-ecommerce',
    es: { eyebrow: 'Marketing para e-commerce', headline: '¿Quieres escalar las ventas de tu tienda online?', sub: 'Performance marketing para e-commerce: más ventas con inversión rentable. Cotiza tu estrategia.', btn: 'Ver marketing para e-commerce', wa: 'Cotizar estrategia de e-commerce' },
    en: { eyebrow: 'E-commerce marketing', headline: 'Want to scale your online store’s sales?', sub: 'Performance marketing for e-commerce: more sales, profitable spend. Get a quote.', btn: 'See e-commerce marketing', wa: 'Quote my e-commerce strategy' },
  },
}

function pushDL(payload: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  ;(window as any).dataLayer = (window as any).dataLayer || []
  ;(window as any).dataLayer.push(payload)
}

export default function BlogCTA({ slug, locale, variant = 'end' }: { slug: string; locale: string; variant?: 'end' | 'inline' | 'top' }) {
  const isEn = locale === 'en'
  // es-US comparte los textos en español, pero no los importes en soles.
  const isUs = locale === 'us'
  const key: ServiceKey = serviceForSlug(slug)
  const svc = SERVICES[key]
  const base = isEn ? svc.en : svc.es
  // Los CTA en español citan precios de Perú. En /us se sustituyen por la
  // tarifa en dólares publicada en /us/precios.
  const t = isUs
    ? { ...base, sub: base.sub.replace('desde S/1,500', 'desde $500 al mes').replace(/S\/\s?[\d,]+/g, '') }
    : base
  const guides = guidesFor(slug, 2, locale)
  const ref = useRef<HTMLDivElement>(null)
  const seen = useRef(false)

  const waMsg = encodeURIComponent(
    isEn
      ? `Hi, I read your article "${slug}" and I'm interested in ${t.eyebrow}.`
      : `Hola, leí su artículo sobre ${t.eyebrow} y quiero más información.`
  )
  const waUrl = `https://wa.me/${WA_PHONE}?text=${waMsg}`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !seen.current) {
          seen.current = true
          pushDL({ event: 'blog_cta_view', blog_slug: slug, cta_service: key, cta_variant: variant, cta_target: svc.path })
          io.disconnect()
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [slug, key, variant, svc.path])

  // Ambos son keyEvents en GA4, así que pasan por el filtro de tráfico
  // automatizado (lib/track.ts). blog_cta_view NO es conversión y se deja tal
  // cual: sirve justamente para comparar vistas de bot contra clics humanos.
  // 29-ago-2026. El CTA ofrecía dos salidas y las dos piden hablar con alguien:
  // «ver el servicio» y «cotizar por WhatsApp». Medido en GA4 (Perú, 90 días):
  // blog_cta_view 427 · blog_cta_click 8. Menos del 2%.
  //
  // Faltaba la salida de fricción cero: /cotizar es una calculadora REAL, con
  // los precios publicados, moneda por mercado y guardado del lead en
  // /api/wa-lead — y en las 224 páginas del sitio solo la enlazaba la home.
  // El competidor que domina Lima mete TRES formularios dentro de cada
  // artículo; aquí había cero. Esto es lo más barato que se puede hacer por los
  // leads: la herramienta ya estaba construida y nadie la veía.
  const onQuoteClick = (e: React.MouseEvent) =>
    trackConversion('blog_cta_cotizador', { blog_slug: slug, cta_service: key, cta_variant: variant, cta_target: '/cotizar' }, e.nativeEvent)

  const onServiceClick = (e: React.MouseEvent) =>
    trackConversion('blog_cta_click', { blog_slug: slug, cta_service: key, cta_variant: variant, cta_target: svc.path }, e.nativeEvent)
  const onWaClick = (e: React.MouseEvent) =>
    trackConversion('blog_cta_whatsapp', { blog_slug: slug, cta_service: key, cta_variant: variant }, e.nativeEvent)

  // Variante compacta para el arranque del post (tras la intro): una sola
  // barra discreta, sin robarle protagonismo al contenido. Emite los mismos
  // eventos con cta_variant='top' para comparar posiciones en GA4.
  if (variant === 'top') {
    return (
      <div
        ref={ref}
        className="blog-cta not-prose my-8 rounded-[16px] border border-[#A21F8A]/25 bg-[#2F0729]/60 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
      >
        <p className="text-white/80 text-sm leading-snug flex-1 min-w-0">
          <span className="text-[#E91E63] font-bold uppercase tracking-[0.18em] text-[10px] block mb-1">{t.eyebrow}</span>
          {t.headline}
        </p>
        <div className="flex flex-wrap gap-2 shrink-0">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWaClick}
            data-gtm="blog-cta-whatsapp"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] font-bold uppercase tracking-[0.15em] text-[10px] text-white bg-gradient-to-r from-[#E91E63] to-[#9C27B0] hover:-translate-y-0.5 transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
            {t.wa}
          </a>
          <Link
            href="/cotizar"
            onClick={onQuoteClick}
            data-gtm="blog-cta-cotizador"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[10px] font-bold uppercase tracking-[0.15em] text-[10px] text-white border border-[#A21F8A]/50 bg-[#A21F8A]/10 hover:bg-[#A21F8A]/20 transition-all"
          >
            {isEn ? 'Calculate the price' : 'Calcular el precio'}
          </Link>
          <Link
            href={svc.path}
            onClick={onServiceClick}
            data-gtm="blog-cta-service"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[10px] font-bold uppercase tracking-[0.15em] text-[10px] text-white/70 border border-white/15 hover:text-white hover:border-[#A21F8A]/60 transition-all"
          >
            {t.btn}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="blog-cta not-prose my-14 rounded-[22px] border border-[#A21F8A]/30 bg-gradient-to-br from-[#2F0729] to-[#1A0417] p-8 md:p-10 relative overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#E91E63]/15 rounded-full blur-[90px] pointer-events-none" />
      <span className="text-[#E91E63] text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block relative z-10">
        {t.eyebrow}
      </span>
      <p className="text-2xl md:text-3xl font-bold leading-tight text-white max-w-2xl relative z-10 mb-3">
        {t.headline}
      </p>
      <p className="text-white/60 text-sm md:text-base max-w-2xl relative z-10 mb-7">
        {t.sub}
      </p>

      {/* 2-set-2026. Solo en el mercado de EE.UU.: los artículos en inglés son
          los que más apariciones acumulan allí y ninguno tenía un formulario
          dentro — la única vía era un WhatsApp peruano. Un comprador
          estadounidense deja su correo, no escribe a un +51. */}
      {(isEn || isUs) && (
        <div className="relative z-10 mb-7">
          <InlineLeadForm slug={slug} service={key} />
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 relative z-10">
        <Link
          href="/cotizar"
          onClick={onQuoteClick}
          data-gtm="blog-cta-cotizador"
          className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[14px] font-bold uppercase tracking-[0.18em] text-[11px] text-white bg-gradient-to-r from-[#E91E63] to-[#9C27B0] hover:shadow-[0_18px_50px_rgba(233,30,99,0.35)] hover:-translate-y-0.5 transition-all duration-300"
        >
          {isEn ? 'Estimate your project in 1 minute' : 'Calcula tu proyecto en 1 minuto'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M1 7h12M13 7L8 2M13 7l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Link
          href={svc.path}
          onClick={onServiceClick}
          data-gtm="blog-cta-service"
          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[14px] font-bold uppercase tracking-[0.18em] text-[11px] text-white/75 border border-white/20 hover:text-white hover:border-[#A21F8A]/60 transition-all duration-300"
        >
          {t.btn}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M1 7h12M13 7L8 2M13 7l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWaClick}
          data-gtm="blog-cta-whatsapp"
          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[14px] font-bold uppercase tracking-[0.18em] text-[11px] text-white border border-white/20 hover:border-[#25d366] hover:text-[#25d366] transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
          {t.wa}
        </a>
      </div>
      {guides.length > 0 && (
        <p className="text-white/50 text-sm mt-6 relative z-10">
          {isEn ? 'Keep reading: ' : 'Sigue leyendo: '}
          {guides.map((g, i) => (
            <span key={g.slug}>
              {i > 0 && ' · '}
              <Link
                href={{ pathname: "/blogs/[slug]", params: { slug: g.slug } }}
                className="text-white/80 underline decoration-[#A21F8A]/60 underline-offset-4 hover:text-white transition-colors"
              >
                {g.title}
              </Link>
            </span>
          ))}
        </p>
      )}
    </div>
  )
}
