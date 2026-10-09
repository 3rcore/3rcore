import { NextResponse } from 'next/server';
import { readAttribution } from '@/lib/attribution';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Captura PROPIA de WhatsApp (recursos propios, sin terceros tipo Cliengo):
// guarda el lead en el panel CRM ANTES de abrir el chat, para que /panel
// reciba los datos (nombre + celular + servicio) y no queden filas vacías.
// El token del panel queda en el servidor, no se expone en el navegador.
export async function POST(request: Request) {
  try {
    const { nombre, celular, proyecto, origin, gclid, sitio_web } = await request.json();
    if (!nombre || !celular) {
      return NextResponse.json({ ok: false, error: 'name_and_phone_required' }, { status: 400 });
    }
    // Honeypot: campo invisible para personas. Si viene lleno es un bot — se
    // responde OK para no darle señal de que fue detectado, pero el lead NO
    // entra al CRM. Mismo patrón que /api/contact.
    if (sitio_web) {
      return NextResponse.json({ ok: true });
    }
    // Un celular sin dígitos suficientes es basura automatizada, no un lead:
    // el panel se llenaba de filas inútiles que además contaban como conversión.
    const digitos = String(celular).replace(/\D/g, '');
    if (digitos.length < 7 || digitos.length > 15) {
      return NextResponse.json({ ok: true });
    }
    // El GCLID va en su propia línea para poder exportar conversiones offline a
    // Google Ads (subir gclid + fecha/hora de conversión cuando el lead cierre).
    const mensaje = [
      proyecto ? `Servicio: ${proyecto}` : null,
      gclid ? `GCLID: ${gclid}` : null,
      origin ? `Origen: ${origin}` : null,
    ].filter(Boolean).join('\n');

    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 6000);
    let ok = false;
    try {
      const r = await fetch('https://3rcore.com/panel/api/lead-ingest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-3r-key': '3rlead_k7Qm2Xp9vR4nT8wL6sB1yH3dZ',
        },
        body: JSON.stringify({
          nombre,
          telefono: celular,
          mensaje,
          // La fuente refleja la página real de origen (el widget también vive
          // en /posicionamiento-seo y otras páginas, no solo en la landing).
          website: origin ? `WhatsApp ${origin}` : 'WhatsApp /performance-marketing',
          attribution: readAttribution(request, 'wa-lead'),
        }),
        signal: ctl.signal,
      });
      ok = r.ok;
    } finally {
      clearTimeout(t);
    }
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
