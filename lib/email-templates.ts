/**
 * Plantillas de correo de 3RCORE (diseño oscuro con la marca).
 *
 * Dos piezas, las mismas que salen de cada formulario:
 *  - `companyLeadEmail`  → el que le llega a la agencia con los datos del lead.
 *  - `leadReplyEmail`    → el acuse de recibo que le llega a la persona.
 *
 * Están armadas con tablas y estilos en línea porque los clientes de correo
 * (Gmail, Outlook) ignoran hojas de estilo externas, flexbox y gap. Donde el
 * diseño usa degradados o rgba() se deja un color sólido de respaldo en
 * `bgcolor` para Outlook de escritorio, que no los soporta.
 */

// Logo de la marca, generado desde `guiacorreo/logo de 3rcore.svg` a 70x82
// (el doble de los 35x41 a los que se pinta, para pantallas retina).
// Es PNG y no el SVG original porque Gmail elimina los SVG de los correos;
// el trazado es el mismo, solo rasterizado. Pesa 1.9 KB frente a los 522 KB
// de LOGO3R.png, que tardaba en aparecer en la cabecera.
export const LOGO_URL = 'https://3rcore.com/icons/logo-email.png';

const FONT =
  "'Poppins', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

/** Escapa el contenido que viene del formulario: nadie inyecta HTML en el correo. */
function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Igual que `esc`, pero respeta los saltos de línea que escribió la persona. */
function escMultiline(value: unknown): string {
  return esc(value).replace(/\r?\n/g, '<br/>');
}

const HEAD = `
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="color-scheme" content="dark"/>
  <meta name="supported-color-schemes" content="dark"/>
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .pad { padding-left: 22px !important; padding-right: 22px !important; }
      .row-pad { padding-left: 18px !important; padding-right: 18px !important; }
      .h1 { font-size: 21px !important; }
    }
  </style>
`;

/** Envoltorio común: fondo, tarjeta y cabecera con el logo y la etiqueta. */
function shell(badge: string, content: string, lang = 'es'): string {
  return `<!DOCTYPE html>
<html lang="${lang}">
  <head>${HEAD}</head>
  <body style="margin:0; padding:0; background-color:#0A0110;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0A0110" style="background-color:#0A0110;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#1A0828" style="width:600px; max-width:600px; background-color:#1A0828; background-image:linear-gradient(110deg,#170722 0%,#1D0A2E 100%); border-radius:24px; border:1px solid rgba(255,255,255,0.08); overflow:hidden;">

            <!-- Cabecera -->
            <tr>
              <td bgcolor="#E91E63" style="background-color:#E91E63; background-image:linear-gradient(90deg,#E91E63 0%,#9C27B0 100%); padding:14px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" width="35" style="width:35px;">
                      <img src="${LOGO_URL}" width="35" height="41" alt="3RCORE" style="display:block; width:35px; height:41px; border:0; outline:none;"/>
                    </td>
                    <td align="right" style="font-family:${FONT};">
                      <span style="display:inline-block; padding:5px 14px; background-color:rgba(255,255,255,0.18); border-radius:100px; color:#ffffff; font-size:10px; font-weight:700; letter-spacing:1.5px; font-family:${FONT}; white-space:nowrap;">● ${badge}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            ${content}

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/* ------------------------------------------------------------------ *
 * Correo para la empresa
 * ------------------------------------------------------------------ */

export interface CompanyLeadEmailData {
  nombre: string;
  /** Empresa del lead (en los formularios llega en el campo `apellido`). */
  empresa?: string;
  email: string;
  telefono?: string;
  /** Servicio de interés: se pinta como pastilla con degradado. Opcional. */
  servicio?: string;
  mensaje: string;
  /** Línea discreta bajo el mensaje: página de origen, UTM, referente. */
  origen?: string;
}

const LABEL = `color:rgba(255,255,255,0.50); font-size:13px; font-weight:400; font-family:${FONT}; line-height:20px;`;
const VALUE = `color:#ffffff; font-size:14px; font-weight:600; font-family:${FONT}; line-height:20px;`;

/** Una fila «etiqueta → valor» de la tarjeta de datos del contacto. */
function infoRow(label: string, valueHtml: string, isLast: boolean): string {
  return `
    <tr>
      <td class="row-pad" style="padding:16px 26px; ${isLast ? '' : 'border-bottom:1px solid rgba(255,255,255,0.08);'}">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="left" style="${LABEL}">${label}</td>
            <td align="right" style="${VALUE} padding-left:12px;">${valueHtml}</td>
          </tr>
        </table>
      </td>
    </tr>`;
}

export function companyLeadEmail(d: CompanyLeadEmailData): string {
  const rows: Array<[string, string]> = [
    ['Persona', esc(d.nombre)],
    ['Empresa', esc(d.empresa?.trim() || '—')],
    [
      'Correo',
      `<a href="mailto:${esc(d.email)}" style="color:#FF5C93; text-decoration:none; font-weight:600;">${esc(d.email)}</a>`,
    ],
    ['WhatsApp / Tel', esc(d.telefono?.trim() || '—')],
  ];

  // El servicio de interés solo existe en los formularios de landing; si no
  // viene, la tarjeta se queda con las cuatro filas de siempre.
  if (d.servicio?.trim()) {
    rows.push([
      'Servicio de interés',
      `<span style="display:inline-block; padding:6px 14px; background-color:#E91E63; background-image:linear-gradient(90deg,#E91E63 0%,#9C27B0 100%); border-radius:100px; color:#ffffff; font-size:11px; font-weight:700; letter-spacing:0.5px; font-family:${FONT};">${esc(d.servicio)}</span>`,
    ]);
  }

  const rowsHtml = rows
    .map(([label, value], i) => infoRow(label, value, i === rows.length - 1))
    .join('');

  const content = `
    <!-- Cuerpo -->
    <tr>
      <td class="pad" style="padding:40px 40px 44px 40px;">

        <p style="margin:0 0 18px 0; text-align:center; color:#ffffff; font-size:12px; font-weight:700; letter-spacing:2px; font-family:${FONT};">INFORMACIÓN DEL CONTACTO</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:rgba(255,255,255,0.04); border-radius:16px; border:1px solid rgba(255,255,255,0.10);">
          ${rowsHtml}
        </table>

        <div style="height:32px; line-height:32px; font-size:0;">&nbsp;</div>

        <div style="height:2px; line-height:2px; font-size:0; background-color:#E91E63; background-image:linear-gradient(90deg,#E91E63 0%,#9C27B0 100%); border-radius:10px;">&nbsp;</div>

        <p style="margin:16px 0; color:#FF5C93; font-size:12px; font-weight:700; letter-spacing:2px; font-family:${FONT};">MENSAJE</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:rgba(255,255,255,0.04); border-radius:14px; border:1px solid rgba(255,255,255,0.10);">
          <tr>
            <td style="padding:22px; color:rgba(255,255,255,0.75); font-size:14px; font-weight:400; line-height:25px; font-family:${FONT};">${escMultiline(d.mensaje)}</td>
          </tr>
        </table>
        ${
          d.origen?.trim()
            ? `<p style="margin:12px 0 0 0; color:rgba(255,255,255,0.40); font-size:12px; line-height:19px; font-family:${FONT};">📍 ${esc(d.origen)}</p>`
            : ''
        }

        <div style="height:32px; line-height:32px; font-size:0;">&nbsp;</div>

        <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
          <tr>
            <td align="center" bgcolor="#E91E63" style="background-color:#E91E63; background-image:linear-gradient(90deg,#E91E63 0%,#9C27B0 100%); border-radius:100px;">
              <a href="mailto:${esc(d.email)}" style="display:inline-block; padding:10px 28px 10px 33px; color:#ffffff; font-size:11px; font-weight:700; letter-spacing:5px; font-family:${FONT}; text-decoration:none;">RESPONDER</a>
            </td>
          </tr>
        </table>

        <div style="height:32px; line-height:32px; font-size:0;">&nbsp;</div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:rgba(255,255,255,0.04); border-radius:14px; border:1px solid rgba(255,255,255,0.12);">
          <tr>
            <td align="center" style="padding:10px 20px; font-family:${FONT}; font-size:10px; line-height:20px;">
              <span style="color:#FF2E88;">Responde</span><span style="color:rgba(255,255,255,0.60);"> dentro de las próximas 24 horas para maximizar la conversión.</span>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Pie -->
    <tr>
      <td class="pad" align="center" bgcolor="#0D0316" style="background-color:#0D0316; padding:26px 40px; border-top:1px solid rgba(255,255,255,0.08);">
        <p style="margin:0 0 8px 0; color:rgba(255,255,255,0.40); font-size:12px; font-family:${FONT};">Enviado automáticamente desde el formulario de 3RCORE</p>
        <a href="https://3rcore.com" style="color:#FF5C93; font-size:11px; font-family:${FONT}; text-decoration:none;">3rcore.com</a>
      </td>
    </tr>`;

  return shell('NUEVO LEAD', content);
}

/* ------------------------------------------------------------------ *
 * Correo para la persona
 * ------------------------------------------------------------------ */

export interface LeadReplyEmailData {
  nombre: string;
  /** 'en' pinta el acuse en inglés; cualquier otro valor, en español. */
  locale?: string;
}

export function leadReplyEmail({ nombre, locale }: LeadReplyEmailData): string {
  const isEn = locale === 'en';

  const t = isEn
    ? {
        badge: 'MESSAGE RECEIVED',
        title: `Got it, ${esc(nombre)}!`,
        subtitle: 'Your message is already in our inbox',
        p1: 'Thank you for writing to us and for your interest in what we are building at 3RCORE.',
        p2: 'Your message is already in my inbox. I will read it properly and get back to you within 24 hours.',
        quote: '"We are confident we can add real value to your project. Talk soon."',
        sign: '— Your team, 3RCORE',
        legal: '© 2026 3RCORE. Built with a passion for technology.',
      }
    : {
        badge: 'MENSAJE RECIBIDO',
        title: `¡Recibido, ${esc(nombre)}!`,
        subtitle: 'Tu mensaje ya está en nuestra bandeja de entrada',
        p1: 'Muchas gracias por escribirnos y por el interés en lo que estamos creando en 3RCORE.',
        p2: 'Ya tengo tu mensaje en mi bandeja de entrada. Voy a leerlo con calma y te daré una respuesta en menos de 24 horas.',
        quote: '"Estamos convencidos de que podemos aportar valor a tu proyecto. Hablamos muy pronto."',
        sign: '— Tu equipo, 3RCORE',
        legal: '© 2026 3RCORE. Hecho con pasión por la tecnología.',
      };

  const paragraph = `margin:0 0 20px 0; color:rgba(255,255,255,0.75); font-size:16px; font-weight:400; line-height:28px; font-family:${FONT};`;

  const content = `
    <!-- Cuerpo -->
    <tr>
      <td class="pad" style="padding:40px;">

        <h1 class="h1" style="margin:0 0 12px 0; color:#ffffff; font-size:24px; font-weight:700; font-family:${FONT}; line-height:32px;">${t.title}</h1>
        <p style="margin:0 0 24px 0; color:rgba(255,255,255,0.50); font-size:14px; font-weight:400; letter-spacing:0.2px; font-family:${FONT};">${t.subtitle}</p>

        <p style="${paragraph}">${t.p1}</p>
        <p style="${paragraph}">${t.p2}</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#2A0E28; background-image:linear-gradient(90deg,rgba(233,30,99,0.14) 0%,rgba(156,39,176,0.14) 100%); border-radius:16px; border-left:3px solid #E91E63;">
          <tr>
            <td style="padding:26px 24px;">
              <p style="margin:0 0 12px 0; color:#ffffff; font-size:15px; font-weight:500; line-height:24px; font-family:${FONT};">${t.quote}</p>
              <p style="margin:0; color:#FF8BB3; font-size:13px; font-weight:700; letter-spacing:0.3px; font-family:${FONT};">${t.sign}</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Pie -->
    <tr>
      <td class="pad" align="center" bgcolor="#0D0316" style="background-color:#0D0316; padding:34px 40px; border-top:1px solid rgba(255,255,255,0.08);">
        <p style="margin:0 0 6px 0;"><a href="mailto:alejandro.roque@3rcore.com" style="color:#ffffff; font-size:13px; font-weight:600; font-family:${FONT}; text-decoration:none;">alejandro.roque@3rcore.com</a></p>
        <p style="margin:0 0 14px 0;"><a href="https://www.3rcore.com" style="color:#FF5C93; font-size:13px; font-weight:600; font-family:${FONT}; text-decoration:none;">www.3rcore.com</a></p>
        <div style="width:354px; max-width:100%; height:1px; line-height:1px; font-size:0; background-color:rgba(255,255,255,0.15); margin:0 auto 14px auto;">&nbsp;</div>
        <p style="margin:0; color:rgba(255,255,255,0.35); font-size:11px; font-family:${FONT};">${t.legal}</p>
      </td>
    </tr>`;

  return shell(t.badge, content, isEn ? 'en' : 'es');
}
