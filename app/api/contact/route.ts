import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { readAttribution } from '@/lib/attribution';
import { postLeadToPanel } from '@/lib/panel-lead';
import { guardarEnCrm, type CorreoCrm } from '@/lib/crm-lead';
import { destinatariosContacto } from '@/lib/correo-rutas';
import { companyLeadEmail, companyLeadLang, companyLeadSubject, leadReplyEmail } from '@/lib/email-templates';

// Registra el lead en el panel (CRM) a través del endpoint público del panel —
// mismo patrón que /api/landing. Best-effort con timeout: si el panel no
// responde, los correos igual salen y el formulario no se entera.
async function saveLeadToPanel(d: {
  nombre: string; apellido?: string; email: string; telefono?: string; mensaje?: string; website?: string; attribution?: unknown;
  consentimiento_publicidad: boolean;
}) {
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
    const { nombre, apellido, email, telefono, mensaje, servicio, page, sitio_web, locale, consentimiento_publicidad } = body;
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

    // 23-nov-2026. A quién va el correo interno según el servicio elegido
    // (lib/correo-rutas.ts): Web/SEO → Karla, Social/Branding → Mafer; siempre
    // con copia a Alejandro y Piero.
    const dest = destinatariosContacto(servicioTxt);
    const asuntoEquipo = companyLeadSubject({ nombre, locale, mensaje });
    const asuntoCliente = isEn ? `Hi ${nombre}, thanks for reaching out` : `¡Hola ${nombre}! Qué bueno saludarte`;

    // Envía los dos correos y devuelve qué pasó con cada uno (para el CRM).
    async function enviarCorreos(): Promise<{ correos: CorreoCrm[]; error?: string; data?: unknown }> {
      const base = (tipo: CorreoCrm['tipo']): CorreoCrm => tipo === 'equipo'
        ? { tipo, para: dest.para, copia: dest.copia, asunto: asuntoEquipo, responsable: dest.responsable.nombre, estado: 'enviado' }
        : { tipo, para: [email], asunto: asuntoCliente, estado: 'enviado' };
      try {
        const result = await resend.batch.send([
          {
            from: 'Sistema 3RCORE <administracion@3rcore.com>',
            to: dest.para,
            cc: dest.copia,
            subject: asuntoEquipo,
            // «Responder» de Gmail va al lead y además a Alejandro y Piero
            // (las copias según el servicio), no a administracion@.
            replyTo: [email, ...dest.copia.filter((c) => c.toLowerCase() !== String(email).toLowerCase())],
            html: companyLeadEmail({
              nombre,
              empresa: apellido,
              email,
              telefono,
              servicio: servicioTxt,
              mensaje,
              origen: page ? `${companyLeadLang({ locale, mensaje }) === 'en' ? 'Page' : 'Página'}: ${page}` : undefined,
              locale,
              responsable: dest.responsable.nombre,
              copia: dest.copia,
            }),
          },
          {
            from: 'Sistema 3RCORE <administracion@3rcore.com>',
            to: email,
            subject: asuntoCliente,
            html: leadReplyEmail({ nombre, locale }),
          }
        ]);
        if (result.error) throw new Error(result.error.message);
        // Resend devuelve los ids de cada correo en el mismo orden del lote
        const raw = result.data as unknown;
        const lista = (Array.isArray(raw) ? raw : (raw as { data?: unknown })?.data) as { id?: string }[] | undefined;
        const ids = Array.isArray(lista) ? lista.map((x) => x?.id) : [];
        return {
          correos: [{ ...base('equipo'), proveedor_id: ids[0] }, { ...base('cliente'), proveedor_id: ids[1] }],
          data: result.data,
        };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return {
          correos: [{ ...base('equipo'), estado: 'error', error: msg.slice(0, 300) }, { ...base('cliente'), estado: 'error', error: msg.slice(0, 300) }],
          error: msg,
        };
      }
    }

    // El lead entra al panel anterior en paralelo con el envío de correos.
    // El servicio va dentro del mensaje porque el panel recibe campos fijos:
    // mismo formato "Servicio: X" que ya usan las landings.
    const [, envio] = await Promise.all([
      saveLeadToPanel({
        nombre, apellido, email, telefono,
        mensaje: servicioTxt ? `Servicio: ${servicioTxt}\n\n${mensaje}` : mensaje,
        website: `Formulario web${page ? ` ${page}` : ''}`,
        attribution: readAttribution(request, 'contact'),
        // Casilla opcional de comunicaciones por correo: true solo si se marcó.
        consentimiento_publicidad: consentimiento_publicidad === true,
      }),
      enviarCorreos(),
    ]);

    // CRM propio (crm.3rcore.com, MySQL): el lead y a quién se le envió el correo
    // (sección «Enviados»). Se guarda aunque el correo haya fallado.
    await guardarEnCrm(request, 'contacto', {
      formulario: `Formulario web${page ? ` ${page}` : ''}`,
      nombre, empresa: apellido, email, telefono,
      servicio: servicioTxt, mensaje, idioma: locale,
      consentimiento_publicidad: consentimiento_publicidad === true,
    }, body, envio.correos);

    if (envio.error) throw new Error(envio.error);

    return NextResponse.json({ success: true, data: envio.data });

  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json({ error: 'Error al procesar el envío' }, { status: 500 });
  }
}
