// Lee en el servidor la fuente del visitante que guarda AttributionCapture
// (cookies 3r_ft y 3r_lt) para reenviarla al panel junto con el lead.
export function readAttribution(request: Request): { first: unknown; last: unknown; sid?: string } | null {
  const raw = request.headers.get('cookie') || ''
  const get = (name: string) => {
    const m = raw.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'))
    if (!m) return null
    try { return JSON.parse(decodeURIComponent(m[1])) } catch { return null }
  }
  const first = get('3r_ft'), last = get('3r_lt')
  // sid de la medición propia (lib/wtrack): une el lead con su visita en el panel.
  const sid = (raw.match(/(?:^|;\s*)r3_sid=([A-Za-z0-9]{8,64})/) || [])[1]
  return first || last || sid ? { first, last, ...(sid ? { sid } : {}) } : null
}
