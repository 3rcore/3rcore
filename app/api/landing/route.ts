import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { companyLeadEmail, leadReplyEmail } from '@/lib/email-templates';

// Registra el lead en el panel (CRM) a través del endpoint público del panel.
// Ventaja: NO requiere credenciales de Supabase en este proyecto (Vercel del
// sitio público) — el panel inserta en `panel_leads` con sus propias credenciales.
// Si el panel no responde, no rompe nada: los correos igual se envían.
async function saveLeadToPanel(d: {
  nombre: string; apellido?: string; email: string; telefono?: string; mensaje?: string; website?: string;
}) {
  // Timeout duro (6s): si el panel está lento o caído, NO bloquea ni retrasa el
  // envío de los correos. El lead igual queda en el correo aunque el panel falle.
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 6000);
  try {
    await fetch('https://3rcore.com/panel/api/lead-ingest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-3r-key': '3rlead_k7Qm2Xp9vR4nT8wL6sB1yH3dZ',
      },
      body: JSON.stringify({
        nombre: d.nombre,
        apellido: d.apellido,
        email: d.email,
        telefono: d.telefono,
        mensaje: d.mensaje,
        website: d.website,
      }),
      signal: ctl.signal,
    });
  } catch (e) {
    console.error('panel lead-ingest failed', e);
  } finally {
    clearTimeout(t);
  }
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { nombre, apellido, email, telefono, mensaje, website, servicio, utm, referrer } = await request.json();

    if (!nombre || !email || !mensaje  || !website) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Servicio de interés: viene como campo propio; si no, se rescata del mensaje.
    const servicioTxt =
      (servicio && String(servicio).trim()) ||
      (String(mensaje).match(/Servicio:\s*(.+)/)?.[1] || '').trim() ||
      'No especificado';
    // Origen/campaña (UTM, gclid, referente) para saber de dónde vino el lead.
    const origenTxt = [utm, referrer].filter(Boolean).join(' · ').trim();

    // Guarda el lead en el panel/CRM antes de enviar los correos.
    await saveLeadToPanel({ nombre, apellido, email, telefono, mensaje, website });

    const result = await resend.batch.send([
      {
        from: 'Sistema 3RCORE <administracion@3rcore.com>',
        to: 'piero.roque@3rcore.com',
        subject: `Nuevo contacto: ${nombre} quiere hablar con 3RCORE`,
        html: companyLeadEmail({
          nombre,
          empresa: apellido,
          email,
          telefono,
          servicio: servicioTxt,
          mensaje,
          origen: `Página: ${website}${origenTxt ? ` · Origen: ${origenTxt}` : ''}`,
        }),
      },
      {
        from: 'Sistema 3RCORE <administracion@3rcore.com>',
        to: email,
        subject: `¡Hola ${nombre}! Qué bueno saludarte`,
        html: leadReplyEmail({ nombre }),
      }
    ]);

    if (result.error) throw new Error(result.error.message);

    return NextResponse.json({ success: true, data: result.data });

  } catch (error) {
    console.error('Error en /api/landing:', error);
    return NextResponse.json({ error: 'Error al procesar el envío' }, { status: 500 });
  }
}
