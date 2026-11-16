import { NextResponse } from 'next/server';
import { guardarEnCrm } from '@/lib/crm-lead';

// 30-oct-2026. Suscripción a la newsletter (plan SEO frente a Media Lab, O11).
// Pasa al panel propio (/panel/api/newsletter-ingest), que da de alta el contacto
// de Email marketing con permiso y la etiqueta «newsletter». No es un lead: no
// avisa al equipo comercial ni manda la respuesta de bienvenida de ventas.
export async function POST(request: Request) {
  let body: any;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  // CRM propio (crm.3rcore.com, MySQL): arranca ya y se espera al final.
  const crm = typeof body?.email === 'string' && body.email.includes('@')
    ? guardarEnCrm(request, 'newsletter', {
        formulario: `Newsletter${typeof body?.pagina === 'string' ? ` ${body.pagina}` : ''}`,
        nombre: body?.nombre,
        email: body.email,
        consentimiento_publicidad: true,
      }, body ?? {})
    : Promise.resolve(false);

  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 6000);
  try {
    const r = await fetch('https://3rcore.com/panel/api/newsletter-ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-3r-key': '3rlead_k7Qm2Xp9vR4nT8wL6sB1yH3dZ' },
      body: JSON.stringify({ email: body?.email, nombre: body?.nombre, pagina: body?.pagina, web: body?.web }),
      signal: ctl.signal,
    });
    const d = await r.json().catch(() => ({}));
    await crm;
    return NextResponse.json(d, { status: r.status });
  } catch (e) {
    console.error('Error en /api/newsletter:', e);
    await crm;
    return NextResponse.json({ ok: false }, { status: 502 });
  } finally {
    clearTimeout(t);
  }
}
