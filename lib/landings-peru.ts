/**
 * Landings de Perú (/es) con el diseño del prototipo aprobado (.proto).
 *
 * Tanda 2 Perú (28-sep-2026): seis páginas comerciales que se publican juntas
 * como un bloque temático. Usan las mismas clases de proto.css que las páginas
 * de servicio de /es (hero8, sec-h, tbl, faq, closing, fform…), el mismo
 * ProtoLeadWiring (formulario data-demo → /api/wa-lead + generate_lead +
 * whatsapp_click) y la misma línea de WhatsApp (WA_LEADS).
 *
 * Se arman como HTML en el servidor (igual que ProtoPage) porque proto.js
 * reescribe los titulares palabra por palabra: si React fuera dueño de esos
 * nodos, la hidratación chocaría con esa mutación.
 *
 * Las preguntas frecuentes viven en un solo array por página: de ahí salen el
 * bloque visible y el FAQPage, así nunca se desalinean.
 */
import type { Metadata } from 'next'
import { WA_LEADS } from '@/lib/contact'
import { BASE_URL, generateBreadcrumbSchema, generatePageMetadata } from '@/lib/metadata'
import { buildFAQPageSchema, buildSpeakableSchema } from '@/lib/seoSchemas'

export type Faq = { q: string; a: string }

export interface LandingPeru {
  path: string
  title: string
  description: string
  breadcrumb: string
  faq: Faq[]
  service: {
    name: string
    description: string
    serviceType: string
    /** Lugares atendidos: país, ciudad o distrito, tal cual. */
    areaServed: { type: 'Country' | 'City' | 'Place'; name: string }[]
    /** Precio de entrada en soles, solo si ya está publicado en el sitio. */
    priceFrom?: number
  }
  /** Nodos JSON-LD extra (p. ej. ItemList en la comparativa). */
  extraJsonLd?: object[]
  html: string
}

/* ── Metadata y datos estructurados ─────────────────────────────────────── */

/** Solo /es existe: en /en y /us la ruta da 404 y aquí va noindex. */
export function landingMetadata(p: LandingPeru, locale: string): Metadata {
  if (locale !== 'es') return { robots: { index: false, follow: false } }
  return generatePageMetadata({
    locale,
    path: p.path,
    titleEs: p.title,
    titleEn: p.title,
    descriptionEs: p.description,
    descriptionEn: p.description,
    // hreflang solo hacia /es: no hay versión en /en ni en /us.
    onlyLocales: ['es'],
  })
}

export function landingJsonLd(p: LandingPeru): object[] {
  const url = `${BASE_URL}/es${p.path}`
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: p.title,
    description: p.description,
    inLanguage: 'es-PE',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#organization` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    dateModified: '2026-09-28',
    speakable: buildSpeakableSchema(['h1', '.sec-h h2', '.lede']),
  }
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.service.name,
    description: p.service.description,
    serviceType: p.service.serviceType,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: p.service.areaServed.map((a) => ({ '@type': a.type, name: a.name })),
    url,
    ...(p.service.priceFrom
      ? {
          offers: {
            '@type': 'Offer',
            price: p.service.priceFrom,
            priceCurrency: 'PEN',
            availability: 'https://schema.org/InStock',
            url,
            description: 'Precio referencial, neto (sin IGV). Varía según el alcance del proyecto.',
          },
        }
      : {}),
  }
  const faq = buildFAQPageSchema(p.faq.map((f) => ({ question: f.q, answer: f.a })))
  const breadcrumb = generateBreadcrumbSchema(
    [
      { name: 'Inicio', path: '' },
      { name: p.breadcrumb, path: p.path },
    ],
    'es'
  )
  return [webPage, service, faq, breadcrumb, ...(p.extraJsonLd ?? [])]
}

/* ── Bloques HTML con las clases del prototipo ──────────────────────────── */

export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const ICON_WA =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.5a8 8 0 01-8.5 8 9 9 0 01-3.6-.7L3.5 20.5l1.8-4.6a8 8 0 01-1.3-4.4 8 8 0 018.5-8 8 8 0 018 8z"/><path d="M9 9.4c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4l.7 1.7c.1.2 0 .4-.1.5l-.5.6c-.1.2-.2.3-.1.5.5 1 1.4 1.6 2.5 2.1.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4a1.7 1.7 0 01-1.2 1.4c-.6.1-1.1.1-2.3-.4a8.2 8.2 0 01-3.9-3.5c-.4-.7-.7-1.4-.7-2.1 0-.5.1-.8.3-1z"/></svg>'
const ICON_ARROW =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M12.5 5.5L19 12l-6.5 6.5"/></svg>'

export const wa = (msg: string) => `https://wa.me/${WA_LEADS}?text=${encodeURIComponent(msg)}`

export function hero(o: {
  crumb: string
  h1: string // HTML permitido (<span class="mg">)
  lede: string
  waMsg: string
  waLabel?: string
  second?: { href: string; label: string }
  art?: string
  bg?: string
}) {
  return `<header class="hero8">
  <div class="hbg" aria-hidden="true"><img src="${o.bg ?? '/proto/img/hero/serviciosbg.webp'}" alt="" fetchpriority="high" aria-hidden="true" width="1600" height="900"></div>
  <div class="wrap">
    <nav class="crumbs" aria-label="Migas de pan"><a href="/es">Inicio</a><i>›</i><b>${esc(o.crumb)}</b></nav>
    <div class="grid8">
      <div class="rv in">
        <h1 class=" h1-m">${o.h1}</h1>
        <p class="lede">${o.lede}</p>
        <div class="btns">
          <a class="btn btn-wa" href="${wa(o.waMsg)}" target="_blank" rel="noopener">${esc(o.waLabel ?? 'Cotizar por WhatsApp')}${ICON_WA}</a>
          ${o.second ? `<a class="btn btn-o" href="${o.second.href}">${esc(o.second.label)}${ICON_ARROW}</a>` : ''}
        </div>
      </div>
      ${o.art ? `<div class="art8 rv rv-d2">${o.art}</div>` : ''}
    </div>
  </div>
</header>`
}

/** Imagen enmarcada como ventana de navegador, para el lado derecho del hero. */
export function frame(img: string, alt: string, url: string) {
  return `<div class="bframe rv"><div class="bar"><i></i><i></i><i></i><span class="url">${esc(url)}</span></div><img src="${img}" alt="${esc(alt)}" width="800" height="500" style="aspect-ratio:16/10;object-fit:cover;width:100%;display:block"></div>`
}

/** Selector de precio al instante (lo anima proto.js). Solo precios publicados. */
// 9-oct-2026 (JEV-002). El título del cotizador iba en <h3> justo debajo del H1
// (salto H1→H3) y los pasos en <h4> bajo un H2 (salto H2→H4). El título pasa a
// párrafo con el mismo aspecto y los pasos a <h3>; proto.css ya estiliza .step h3
// igual que .step h4.
export function cotiza(o: { title: string; opts: { label: string; price: string; note: string; msg: string }[] }) {
  const btns = o.opts
    .map(
      (x, i) =>
        `<button type="button" aria-pressed="${i === 0}" data-price="${esc(x.price)}" data-note="${esc(x.note)}" data-msg="${esc(x.msg)}">${esc(x.label)}</button>`
    )
    .join('')
  return `<div class="cotiza rv">
    <div class="cz-h"><p class="cz-t" style="font-family:var(--f-disp);font-weight:600;font-size:1.25rem;line-height:1.4;color:var(--ink-2);text-wrap:balance;margin:0 0 .2rem">${esc(o.title)}</p>
    <p class="mini" style="font-size:.8rem;color:var(--gris);margin:0">Elige y mira el precio al instante, sin dejar tus datos. Los precios son referenciales y varían según el alcance del proyecto.</p></div>
    <div class="opts">${btns}</div>
    <div class="cz-out" aria-live="polite">
      <div class="cz-p"><span class="v">${esc(o.opts[0].price)}</span><small>${esc(o.opts[0].note)}</small></div>
      <a class="btn btn-wa" href="${wa(o.opts[0].msg)}" target="_blank" rel="noopener">Lo quiero, hablemos${ICON_WA}</a>
    </div>
  </div>`
}

/** Sección estándar: H2 + intro opcional + cuerpo. */
export function sec(o: { h2: string; intro?: string; body: string; alt?: boolean; id?: string; slim?: boolean }) {
  const cls = [o.alt ? 'sec-alt' : '', o.slim ? 'slim' : ''].filter(Boolean).join(' ')
  return `<section${cls ? ` class="${cls}"` : ''}><div class="wrap"${o.id ? ` id="${o.id}"` : ''}>
    <div class="sec-h rv"><h2>${esc(o.h2)}</h2>${o.intro ? `<p class="intro">${o.intro}</p>` : ''}</div>
    ${o.body}
  </div></section>`
}

export function table(head: string[], rows: string[][]) {
  return `<div class="tbl rv"><table>
    <thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`
}

/** Lista numerada con H3 + párrafo (HTML permitido en p). */
export function numlist(items: { h: string; p: string }[]) {
  return `<div class="numlist rv">${items
    .map((x) => `<div><div><h3>${esc(x.h)}</h3><p>${x.p}</p></div></div>`)
    .join('')}</div>`
}

/** Lista de verificación: título corto + explicación. */
export function cklist(items: { b: string; s: string }[]) {
  return `<ul class="cklist rv">${items
    .map((x) => `<li><div><b>${esc(x.b)}</b><span>${x.s}</span></div></li>`)
    .join('')}</ul>`
}

export function steps(items: { h: string; p: string; t: string }[]) {
  return `<div class="steps stack" style="margin-top:2.4rem">${items
    .map(
      (x, i) =>
        `<div class="step rv rv-d${(i % 5) + 1}"><h3>${esc(x.h)}</h3><p>${x.p}</p><span class="t">${esc(x.t)}</span></div>`
    )
    .join('')}</div>`
}

/** Párrafos de texto corrido, con ancho de lectura. */
export function prose(ps: string[]) {
  return ps.map((p) => `<p class="lede rv" style="max-width:68ch">${p}</p>`).join('')
}

export function faqBlock(items: Faq[], h2 = 'Preguntas frecuentes') {
  const det = items
    .map(
      (f, i) => `<details class="rv rv-d${(i % 4) + 1}"${i === 0 ? ' open' : ''}>
    <summary>${esc(f.q)}<span class="pm"></span></summary><div class="a"><p>${esc(f.a)}</p></div>
  </details>`
    )
    .join('')
  return `<section class="slim"><div class="wrap" id="faq">
  <div class="sec-h rv"><h2>${esc(h2)}</h2><p class="intro">Respuestas cortas, con plazos y montos. Los montos indicados son referenciales.</p></div>
  <div class="faq" style="margin-top:2.2rem">${det}</div>
</div></section>`
}

export function bridges(h2: string, ps: string[]) {
  return `<section class="slim"><div class="wrap">
  <div class="sec-h rv"><h2>${esc(h2)}</h2></div>
  <div class="bridges rv">${ps.map((p) => `<p>${p}</p>`).join('')}</div>
</div></section>`
}

export function localb(o: { h2: string; p: string; zones: string[]; hot?: string[]; img: string; alt: string }) {
  return `<section class="slim"><div class="wrap">
  <div class="localb rv">
    <div><h2>${esc(o.h2)}</h2><p>${o.p}</p><div class="zones">${o.zones
      .map((z) => `<span${o.hot?.includes(z) ? ' class="hot"' : ''}>${esc(z)}</span>`)
      .join('')}</div></div>
    <div class="pic"><img src="${o.img}" alt="${esc(o.alt)}" loading="lazy" width="640" height="480"></div>
  </div>
</div></section>`
}

const FORM_OPTIONS = [
  'Una página web',
  'Una tienda online',
  'Posicionamiento SEO',
  'Campañas en Google Ads',
  'Manejo de redes sociales',
  'Branding y manual de marca',
]

/** Cierre con WhatsApp + formulario propio (data-demo → ProtoLeadWiring). */
export function closing(o: { h2: string; lede: string; waMsg: string; first?: string }) {
  const opts = o.first ? [o.first, ...FORM_OPTIONS.filter((x) => x !== o.first)] : FORM_OPTIONS
  return `<section>
  <div class="wrap">
    <div class="closing rv">
      <div class="split">
        <div>
          <span class="eyebrow">Hablemos</span>
          <h2>${esc(o.h2)}</h2>
          <p class="lede">${o.lede}</p>
          <div class="btns">
            <a class="btn btn-wa" href="${wa(o.waMsg)}" target="_blank" rel="noopener">Escribir por WhatsApp${ICON_WA}</a>
            <a class="btn btn-g" href="/es/precios">Ver precios${ICON_ARROW}</a>
          </div>
          <div class="contactline">
            <a href="tel:+${WA_LEADS}"><b>+51 987 216 703</b></a>
            <a href="mailto:contacto@3rcore.com"><b>contacto@3rcore.com</b></a>
            <span>La Molina, Lima</span>
          </div>
        </div>
        <form class="fform rv rv-d2" data-demo="1">
          <h3>Cuéntanos qué necesitas</h3><p class="mini">Tres campos. Respondemos el mismo día hábil.</p>
          <div class="field"><label for="lp1">Nombre</label><input id="lp1" required placeholder="Tu nombre"></div>
          <div class="field"><label for="lp2">WhatsApp</label><input id="lp2" type="tel" required placeholder="+51 999 999 999"></div>
          <div class="field"><label for="lp3">¿Qué necesitas?</label><select id="lp3">${opts
            .map((x) => `<option>${esc(x)}</option>`)
            .join('')}</select></div>
          <p class="proto-lead-err" style="display:none;color:#ff8fa3;font-size:.8rem"></p>
          <button class="btn btn-1" type="submit">Quiero mi cotización${ICON_ARROW}</button>
        </form>
      </div>
    </div>
  </div>
</section>`
}

/** Envoltorio común: todas las landings abren y cierran igual. */
export const page = (...blocks: string[]) => `<main id="contenido">\n${blocks.join('\n')}\n</main>`
