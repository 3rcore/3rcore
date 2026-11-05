import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { readAttribution } from '@/lib/attribution';
import { postLeadToPanel } from '@/lib/panel-lead';
import { companyLeadEmail, companyLeadLang, companyLeadSubject, leadReplyEmail } from '@/lib/email-templates';

// Registra el lead en el panel (CRM) a través del endpoint público del panel.
// Ventaja: NO requiere credenciales de Supabase en este proyecto (Vercel del
// sitio público) — el panel inserta en `panel_leads` con sus propias credenciales.
// Si el panel no responde, no rompe nada: los correos igual se envían.
async function saveLeadToPanel(d: {
  nombre: string; apellido?: string; email: string; telefono?: string; mensaje?: string; website?: string; attribution?: unknown;
  consentimiento_publicidad: boolean;
}) {
  // Timeout duro (6s): si el panel está lento o caído, NO bloquea ni retrasa el
  // envío de los correos. El lead igual queda en el correo aunque el panel falle.
  // Comprueba que el panel respondió JSON ok:true (un 200 con HTML del antibots
  // no cuenta) y reintenta por la otra ruta. Si aun así falla, el correo sale igual.
  const ok = await postLeadToPanel({
    nombre: d.nombre,
    apellido: d.apellido,
    email: d.email,
    telefono: d.telefono,
    mensaje: d.mensaje,
    website: d.website,
    attribution: d.attribution,
    consentimiento_publicidad: d.consentimiento_publicidad,
  });
  if (!ok) console.error('LEAD SIN GUARDAR EN EL PANEL (solo va por correo)', d.email, d.website);
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { nombre, apellido, email, mensaje, website, servicio, utm, referrer, consentimiento_publicidad } = body;
    // El formulario de los pilares (landingContact) manda el teléfono como `number`: sin esto llegaba vacío.
    const telefono = body.telefono ?? body.number;

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
    // consentimiento_publicidad: casilla opcional de comunicaciones por correo, true solo si se marcó.
    await saveLeadToPanel({ nombre, apellido, email, telefono, mensaje, website, attribution: readAttribution(request, 'landing'), consentimiento_publicidad: consentimiento_publicidad === true });

    const result = await resend.batch.send([
      {
        from: 'Sistema 3RCORE <administracion@3rcore.com>',
        to: 'piero.roque@3rcore.com',
        subject: companyLeadSubject({ nombre, mensaje }),
        // «Responder» de Gmail va directo al lead, no a administracion@.
        replyTo: email,
        html: companyLeadEmail({
          nombre,
          empresa: apellido,
          email,
          telefono,
          servicio: servicioTxt,
          mensaje,
          origen: `${companyLeadLang({ mensaje }) === 'en' ? 'Page' : 'Página'}: ${website}${origenTxt ? ` · Origen: ${origenTxt}` : ''}`,
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
