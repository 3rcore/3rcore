/**
 * Bloques HTML de las landings de Miami (sacados de diseno-web-miami/content.ts
 * el 11-nov-2026 para reutilizarlos en marketing digital y tiendas virtuales).
 */
import { esc, type Faq } from '@/lib/landings-peru'

const ARROW =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M12.5 5.5L19 12l-6.5 6.5"/></svg>'

export function hero(o: { home: string; homeLabel: string; crumb: string; h1: string; lede: string; cta: { href: string; label: string }; second: { href: string; label: string }; img: string; alt: string; url: string; aria: string }) {
  return `<header class="hero8">
  <div class="hbg" aria-hidden="true"><img src="/proto/img/hero/serviciosbg.webp" alt="" fetchpriority="high" aria-hidden="true" width="1600" height="900"></div>
  <div class="wrap">
    <nav class="crumbs" aria-label="${esc(o.aria)}"><a href="${o.home}">${esc(o.homeLabel)}</a><i>›</i><b>${esc(o.crumb)}</b></nav>
    <div class="grid8">
      <div class="rv in">
        <h1 class=" h1-m">${o.h1}</h1>
        <p class="lede">${o.lede}</p>
        <div class="btns">
          <a class="btn btn-1" href="${o.cta.href}">${esc(o.cta.label)}${ARROW}</a>
          <a class="btn btn-o" href="${o.second.href}">${esc(o.second.label)}${ARROW}</a>
        </div>
      </div>
      <div class="art8 rv rv-d2"><div class="bframe rv"><div class="bar"><i></i><i></i><i></i><span class="url">${esc(o.url)}</span></div><img src="${o.img}" alt="${esc(o.alt)}" width="800" height="500" style="aspect-ratio:16/10;object-fit:cover;width:100%;display:block"></div></div>
    </div>
  </div>
</header>`
}

export function faqBlock(items: Faq[], h2: string, intro: string) {
  const det = items
    .map(
      (f, i) => `<details class="rv rv-d${(i % 4) + 1}"${i === 0 ? ' open' : ''}>
    <summary>${esc(f.q)}<span class="pm"></span></summary><div class="a"><p>${esc(f.a)}</p></div>
  </details>`
    )
    .join('')
  return `<section class="slim"><div class="wrap" id="faq">
  <div class="sec-h rv"><h2>${esc(h2)}</h2><p class="intro">${esc(intro)}</p></div>
  <div class="faq" style="margin-top:2.2rem">${det}</div>
</div></section>`
}

export function zones(h2: string, p: string, list: string[]) {
  return `<section class="slim"><div class="wrap">
  <div class="localb rv">
    <div><h2>${esc(h2)}</h2><p>${p}</p><div class="zones">${list.map((z, i) => `<span${i < 3 ? ' class="hot"' : ''}>${esc(z)}</span>`).join('')}</div></div>
    <div class="pic"><img src="/proto/img/hero/poster-web.jpg" alt="${esc(h2)}" loading="lazy" width="640" height="480"></div>
  </div>
</div></section>`
}

export function closing(o: { eyebrow: string; h2: string; lede: string; cta: { href: string; label: string }; second: { href: string; label: string }; waHref: string; waLabel: string }) {
  return `<section>
  <div class="wrap">
    <div class="closing rv">
      <div>
        <span class="eyebrow">${esc(o.eyebrow)}</span>
        <h2>${esc(o.h2)}</h2>
        <p class="lede">${o.lede}</p>
        <div class="btns">
          <a class="btn btn-1" href="${o.cta.href}">${esc(o.cta.label)}${ARROW}</a>
          <a class="btn btn-wa" href="${o.waHref}" target="_blank" rel="noopener">${esc(o.waLabel)}${ARROW}</a>
          <a class="btn btn-g" href="${o.second.href}">${esc(o.second.label)}${ARROW}</a>
        </div>
      </div>
    </div>
  </div>
</section>`
}

export const ZONES = ['Brickell', 'Downtown Miami', 'Doral', 'Coral Gables', 'Wynwood', 'Miami Beach', 'Little Havana', 'Hialeah', 'Kendall', 'Aventura', 'Fort Lauderdale']
