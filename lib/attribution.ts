// Lee en el servidor la fuente COMPLETA del visitante que guarda AttributionCapture
// (cookies 3r_ft, 3r_lt, 3r_vc, 3r_cx) y la completa con lo que solo el servidor
// sabe con fiabilidad (país/ciudad de Vercel, navegador, idioma, ids de GA4/Meta/Ads)
// para reenviarla al panel junto con el lead. Contrato v2: compatible con v1
// (first/last con s,m,c,t,g,f,r,l,ts y sid siguen igual; todo lo demás se añade).

type Touch = Record<string, string>

const IA: [RegExp, string][] = [
  [/(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com)$|^chatgpt/i, 'chatgpt'],
  [/perplexity/i, 'perplexity'],
  [/(^|\.)gemini\.google\.com$|(^|\.)bard\.google\.com$|^gemini/i, 'gemini'],
  [/(^|\.)copilot\.microsoft\.com$|(^|\.)copilot\.cloud\.microsoft$|^copilot/i, 'copilot'],
  [/(^|\.)claude\.ai$|^claude/i, 'claude'],
  [/deepseek/i, 'deepseek'],
  [/(^|\.)meta\.ai$/i, 'meta_ai'],
  [/(^|\.)grok\.com$|^grok/i, 'grok'],
  [/(^|\.)you\.com$/i, 'you'],
]
const BUSCADOR = /(^|\.)(google\.[a-z.]+|bing\.com|yahoo\.[a-z.]+|duckduckgo\.com|ecosia\.org|yandex\.[a-z.]+|baidu\.com|search\.brave\.com|naver\.com)$/i
const SOCIAL = /(^|\.)(facebook\.com|fb\.com|instagram\.com|linkedin\.com|lnkd\.in|tiktok\.com|t\.co|x\.com|twitter\.com|youtube\.com|pinterest\.[a-z.]+|reddit\.com|threads\.net)$/i
const WA = /(^|\.)(wa\.me|whatsapp\.com|l\.wl\.co)$/i
const INTERNO = /(^|\.)(localhost|vercel\.com|vercel\.app|spindns\.[a-z.]+|codepen\.io|ngrok[a-z.-]*|ngrok-free\.app|3rcore-server-trabajo\.pe)$|^localhost|^127\.|^192\.168\./i

function asistenteIA(t: Touch): string | undefined {
  for (const [re, n] of IA) if ((t.r && re.test(t.r)) || (t.s && re.test(t.s))) return n
}

/** Canal estable (la etiqueta bonita la pone el panel). */
function canal(t: Touch): string {
  const m = (t.m || '').toLowerCase(), s = (t.s || '').toLowerCase(), r = t.r || ''
  if (t.ai) return 'ai'
  if (t.g || t.gb || t.wb || t.ms || /^(cpc|ppc|paidsearch|paid_search|sem)$/.test(m)) return 'paid_search'
  if (t.tt || t.li || /^(paid_social|paidsocial|paid-social|social_paid|cpm)$/.test(m) || (m === 'paid' && /facebook|instagram|meta|tiktok|linkedin/.test(s))) return 'paid_social'
  if (/e-?mail|newsletter/.test(m)) return 'email'
  if (m === 'organic' || BUSCADOR.test(r)) return 'organic_search'
  if (WA.test(r) || /whatsapp/.test(s)) return 'whatsapp_share'
  if (/social/.test(m) || SOCIAL.test(r) || /facebook|instagram|linkedin|tiktok|youtube/.test(s) || t.f) return 'organic_social'
  if (r || m === 'referral') return 'referral'
  if (s && s !== '(direct)') return 'other'
  return 'direct'
}

function enriquecer(t: unknown): Touch | null {
  if (!t || typeof t !== 'object') return null
  const o = { ...(t as Touch) }
  const ai = asistenteIA(o)
  if (ai) o.ai = ai
  o.ch = canal(o)
  return o
}

function dispositivo(ua: string) {
  const d: Record<string, string> = { ua: ua.slice(0, 300) }
  if (/bot|crawl|spider|slurp|headless|lighthouse|python-requests|curl\//i.test(ua)) d.type = 'bot'
  else if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) d.type = 'tablet'
  else if (/mobi|iphone|ipod|android/i.test(ua)) d.type = 'mobile'
  else d.type = 'desktop'
  const nav: [RegExp, string][] = [
    [/edg(?:e|a|ios)?\/([\d]+)/i, 'Edge'], [/opr\/([\d]+)/i, 'Opera'], [/samsungbrowser\/([\d]+)/i, 'Samsung Internet'],
    [/fbav\/([\d]+)/i, 'Facebook'], [/instagram ([\d]+)/i, 'Instagram'], [/crios\/([\d]+)/i, 'Chrome'], [/fxios\/([\d]+)/i, 'Firefox'],
    [/firefox\/([\d]+)/i, 'Firefox'], [/chrome\/([\d]+)/i, 'Chrome'], [/version\/([\d]+).*safari/i, 'Safari'],
  ]
  for (const [re, n] of nav) { const m = ua.match(re); if (m) { d.browser = n; d.browser_version = m[1]; break } }
  const so: [RegExp, string][] = [
    [/iphone os ([\d_]+)|ipad.*os ([\d_]+)/i, 'iOS'], [/android ([\d.]+)/i, 'Android'], [/windows nt ([\d.]+)/i, 'Windows'],
    [/mac os x ([\d_]+)/i, 'macOS'], [/cros/i, 'ChromeOS'], [/linux/i, 'Linux'],
  ]
  for (const [re, n] of so) { const m = ua.match(re); if (m) { d.os = n; const v = m[1] || m[2]; if (v) d.os_version = v.replace(/_/g, '.'); break } }
  return d
}

function sinVacios<T extends Record<string, unknown>>(o: T): T | undefined {
  for (const k of Object.keys(o)) if (o[k] === undefined || o[k] === null || o[k] === '') delete o[k]
  return Object.keys(o).length ? o : undefined
}

export function readAttribution(request: Request, endpoint?: 'wa-lead' | 'contact' | 'landing'): Record<string, unknown> | null {
  const raw = request.headers.get('cookie') || ''
  const crudo = (name: string) => {
    const m = raw.match(new RegExp('(?:^|;\\s*)' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'))
    return m ? m[1] : null
  }
  const get = (name: string) => {
    const v = crudo(name)
    if (!v) return null
    try { return JSON.parse(decodeURIComponent(v)) } catch { return null }
  }
  const h = (n: string) => request.headers.get(n) || ''
  const dec = (v: string) => { try { return decodeURIComponent(v) } catch { return v } }

  const first = enriquecer(get('3r_ft')), last = enriquecer(get('3r_lt'))
  // sid de la medición propia (lib/wtrack): une el lead con su visita en el panel.
  const sid = (raw.match(/(?:^|;\s*)r3_sid=([A-Za-z0-9]{8,64})/) || [])[1]
  const vc = get('3r_vc') || {}
  const cx = get('3r_cx') || {}
  const ahora = new Date()

  // Página de conversión: la que hizo la petición (Referer del navegador).
  let convPage = ''
  let convHost = ''
  try { const u = new URL(h('referer')); convPage = u.pathname.slice(0, 200); convHost = u.hostname } catch {}

  const firstSeen = (typeof vc.f === 'string' && vc.f) || first?.ts || ''
  const t0 = Date.parse(firstSeen)
  const journey = sinVacios({
    sessions: Number(vc.n) || undefined,
    pageviews: Number(vc.pv) || undefined,
    session_pageviews: Number(vc.spv) || undefined,
    first_seen: firstSeen || undefined,
    days_to_lead: Number.isFinite(t0) ? Math.max(0, Math.round(((ahora.getTime() - t0) / 864e5) * 100) / 100) : undefined,
  })

  const conv = sinVacios({
    page: convPage || undefined,
    element: cx.o && typeof cx.o === 'object' ? cx.o : undefined,
    submit: cx.k && typeof cx.k === 'object' ? cx.k : undefined,
    form: typeof cx.fm === 'string' && (!cx.fp || cx.fp === convPage) ? cx.fm : undefined,
    endpoint,
    at: ahora.toISOString(),
  })

  // _ga = GA1.1.<client_id>  ·  _ga_<ID> = GS2.1.s<session_id>$…  (o GS1.1.<session_id>.…)
  const ga = (crudo('_ga') || '').match(/^GA\d\.\d\.(\d+\.\d+)/)
  const gaS = (raw.match(/(?:^|;\s*)_ga_[A-Z0-9]+=GS\d\.\d\.s?(\d+)/) || [])[1]
  const ids = sinVacios({
    ga_client_id: ga?.[1],
    ga_session_id: gaS,
    fbp: crudo('_fbp')?.slice(0, 120),
    fbc: crudo('_fbc')?.slice(0, 200),
    gcl_aw: crudo('_gcl_aw')?.slice(0, 200),
  })

  const geo = sinVacios({
    country: h('x-vercel-ip-country') || undefined,
    region: h('x-vercel-ip-country-region') || undefined,
    city: dec(h('x-vercel-ip-city')) || undefined,
    tz: h('x-vercel-ip-timezone') || undefined,
  })

  const seg = (convPage.match(/^\/(es|en|us)(\/|$)/) || [])[1]
  const market = sinVacios({
    market: seg || (/^\/performance-marketing/.test(convPage) ? 'landing' : undefined),
    locale: seg ? (seg === 'es' ? 'es' : 'en') : undefined,
    accept_language: h('accept-language').slice(0, 80) || undefined,
  })

  const interno = [first?.r, last?.r, convHost].some((x) => x && INTERNO.test(x)) || (!!convHost && !/(^|\.)3rcore\.com$/.test(convHost))

  if (!first && !last && !sid && !conv?.page) return null
  return {
    v: 2,
    first, last,
    ...(sid ? { sid } : {}),
    ...(conv ? { conv } : {}),
    ...(journey ? { journey } : {}),
    device: dispositivo(h('user-agent')),
    ...(geo ? { geo } : {}),
    ...(market ? { market } : {}),
    ...(ids ? { ids } : {}),
    ...(interno ? { flags: { internal: true } } : {}),
  }
}
