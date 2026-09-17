import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { companyLeadEmail, leadReplyEmail } from '@/lib/email-templates';

// Registra el lead en el panel (CRM) a través del endpoint público del panel —
// mismo patrón que /api/landing. Best-effort con timeout: si el panel no
// responde, los correos igual salen y el formulario no se entera.
async function saveLeadToPanel(d: {
  nombre: string; apellido?: string; email: string; telefono?: string; mensaje?: string; website?: string;
}) {
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
    const { nombre, apellido, email, telefono, mensaje, servicio, page, sitio_web, locale } = await request.json();
    // El correo de respuesta al lead salía SIEMPRE en español. Un contacto
    // desde /en recibía su primer mensaje de la agencia en un idioma que
    // puede no entender.
    const isEn = locale === 'en';

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Honeypot del formulario: si viene lleno es un bot (el campo es invisible
    // para humanos). Se responde éxito sin enviar correo ni registrar el lead,
    // para no darle al bot señal de que fue detectado.
    if (sitio_web) {
      return NextResponse.json({ success: true });
    }

    // Servicio de interés: el selector del formulario de contacto. No siempre
    // viene (el formulario del blog, por ejemplo, no lo tiene), y en ese caso
    // la fila simplemente no sale en el correo.
    const servicioTxt = servicio ? String(servicio).trim() : '';

    // El lead entra al panel/CRM además del correo (antes solo llegaba por email
    // y el panel nunca veía los leads del formulario del sitio).
    // El servicio va dentro del mensaje porque el panel recibe campos fijos:
    // mismo formato "Servicio: X" que ya usan las landings.
    await saveLeadToPanel({
      nombre, apellido, email, telefono,
      mensaje: servicioTxt ? `Servicio: ${servicioTxt}\n\n${mensaje}` : mensaje,
      website: `Formulario web${page ? ` ${page}` : ''}`,
    });

    const result = await resend.batch.send([
      {
        from: 'Sistema 3RCORE <administracion@3rcore.com>',
        to: 'alejandro.roque@3rcore.com',
        subject: `Nuevo contacto: ${nombre} quiere hablar con 3RCORE`,
        html: companyLeadEmail({
          nombre,
          empresa: apellido,
          email,
          telefono,
          servicio: servicioTxt,
          mensaje,
          origen: page ? `Página: ${page}` : undefined,
        }),
      },
      {
        from: 'Sistema 3RCORE <administracion@3rcore.com>',
        to: email,
        subject: isEn ? `Hi ${nombre}, thanks for reaching out` : `¡Hola ${nombre}! Qué bueno saludarte`,
        html: leadReplyEmail({ nombre, locale }),
      }
    ]);

    if (result.error) throw new Error(result.error.message);

    return NextResponse.json({ success: true, data: result.data });

  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json({ error: 'Error al procesar el envío' }, { status: 500 });
  }
}
