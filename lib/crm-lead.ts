import { readAttribution } from '@/lib/attribution';

// 16-nov-2026. CRM propio de 3R Core (crm.3rcore.com, MySQL en el cPanel).
// Cada formulario del sitio se guarda ahí además de seguir por correo y por el
// panel anterior. La API en PHP (api/ingesta.php) solo acepta la clave
// compartida CRM_INGEST_KEY, que vive en las variables de entorno de Vercel y
// en el config.php del servidor; nunca en el código ni en el navegador.
//
// Es best-effort: si el CRM no responde, el formulario sigue funcionando y el
// error queda en los logs de Vercel. Solo cuenta como guardado un JSON ok:true
// (el antibots del hosting puede devolver 200 con una página HTML).

const URL_CRM = process.env.CRM_INGEST_URL || 'https://crm.3rcore.com/api/ingesta.php';

export type TipoLeadCrm = 'contacto' | 'landing' | 'whatsapp' | 'newsletter' | 'reclamo';

export interface LeadCrm {
  formulario?: string;
  nombre?: string;
  empresa?: string;
  email?: string;
  telefono?: string;
  servicio?: string;
  mensaje?: string;
  idioma?: string;
  consentimiento_publicidad?: boolean;
}

// Campos que nunca se guardan en «datos» (honeypot antibots).
const OMITIR = new Set(['sitio_web']);

function limpiarDatos(datos: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(datos)) {
    if (OMITIR.has(k) || v === undefined || v === null || v === '') continue;
    out[k] = typeof v === 'string' ? v.slice(0, 4000) : v;
  }
  return out;
}

const txt = (v: unknown, max: number) =>
  typeof v === 'string' || typeof v === 'number' ? String(v).trim().slice(0, max) || undefined : undefined;

export async function guardarEnCrm(
  request: Request,
  tipo: TipoLeadCrm,
  lead: LeadCrm,
  datos: Record<string, unknown> = {},
): Promise<boolean> {
  const clave = process.env.CRM_INGEST_KEY;
  if (!clave) {
    console.error('CRM: falta CRM_INGEST_KEY, el formulario no se guardó en crm.3rcore.com', tipo);
    return false;
  }

  let atribucion: Record<string, unknown> | null = null;
  try {
    const ep = tipo === 'contacto' ? 'contact' : tipo === 'landing' ? 'landing' : tipo === 'whatsapp' ? 'wa-lead' : undefined;
    atribucion = readAttribution(request, ep);
  } catch {
    // la atribución es un extra: si falla, el lead se guarda igual
  }

  const body = {
    tipo,
    sitio: '3rcore.com',
    formulario: txt(lead.formulario, 120),
    nombre: txt(lead.nombre, 160),
    empresa: txt(lead.empresa, 160),
    email: txt(lead.email, 190),
    telefono: txt(lead.telefono, 40),
    servicio: txt(lead.servicio, 160),
    mensaje: txt(lead.mensaje, 8000),
    idioma: txt(lead.idioma, 10),
    consentimiento_publicidad: lead.consentimiento_publicidad === true,
    // URL completa (con ?utm_… incluidos) de la página desde la que se envió
    pagina_url: txt(request.headers.get('referer'), 600),
    atribucion,
    datos: limpiarDatos(datos),
  };

  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 6000);
  try {
    const r = await fetch(URL_CRM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CRM-Key': clave,
        'User-Agent': '3rcore-web/1.0 (+https://3rcore.com)',
      },
      body: JSON.stringify(body),
      signal: ctl.signal,
    });
    const d = await r.json().catch(() => null);
    if (r.ok && d && d.ok === true) return true;
    console.error('CRM no confirmó el lead', tipo, r.status, d ? JSON.stringify(d).slice(0, 200) : 'sin JSON');
  } catch (e) {
    console.error('CRM: fallo al guardar el lead', tipo, e);
  } finally {
    clearTimeout(t);
  }
  return false;
}
