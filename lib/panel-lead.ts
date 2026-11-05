// 5-nov-2026. Envío del lead al panel (CRM) comprobando que DE VERDAD se guardó.
// El panel vive en el cPanel de BanaHosting y su antibots (Imunify) respondía 200
// con una página HTML de «verificando…»: con solo mirar r.ok el sitio creía que el
// lead había entrado y se perdía en silencio. Ahora solo cuenta un JSON con ok:true
// (también el de dedupe), y si no llega se reintenta una vez por la otra ruta.
const RUTAS = [
  // Directo al relé del VPS (sin pasar otra vez por el rewrite de Vercel).
  'https://r3c-datos.josegaspard.dev/_r3p/panel/api/lead-ingest',
  // La de siempre (rewrite de next.config.ts → mismo relé).
  'https://3rcore.com/panel/api/lead-ingest',
];

export async function postLeadToPanel(body: Record<string, unknown>): Promise<boolean> {
  for (const url of RUTAS) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 6000);
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-3r-key': '3rlead_k7Qm2Xp9vR4nT8wL6sB1yH3dZ' },
        body: JSON.stringify(body),
        signal: ctl.signal,
      });
      const d = await r.json().catch(() => null);
      if (r.ok && d && d.ok === true) return true;
      console.error('panel lead-ingest no confirmó', url, r.status, d ? JSON.stringify(d).slice(0, 200) : 'sin JSON');
    } catch (e) {
      console.error('panel lead-ingest falló', url, e);
    } finally {
      clearTimeout(t);
    }
  }
  return false;
}
