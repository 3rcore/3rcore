// Lee en el servidor la fuente del visitante que guarda AttributionCapture
// (cookies 3r_ft y 3r_lt) para reenviarla al panel junto con el lead.
export function readAttribution(request: Request): { first: unknown; last: unknown } | null {
  const raw = request.headers.get('cookie') || ''
  const get = (name: string) => {
    const m = raw.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'))
    if (!m) return null
    try { return JSON.parse(decodeURIComponent(m[1])) } catch { return null }
  }
  const first = get('3r_ft'), last = get('3r_lt')
  return first || last ? { first, last } : null
}
