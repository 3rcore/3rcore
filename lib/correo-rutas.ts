// 23-nov-2026. Reparto del formulario de contacto según el servicio elegido.
// Cada lead va a la responsable del área, con copia a Alejandro y Piero.
// Para cambiar quién recibe qué, se edita solo este archivo.

export interface Responsable {
  nombre: string;
  email: string;
}

export const EQUIPO = {
  karla: { nombre: 'Karla Toscano', email: 'karla.toscano@3rcore.com' },
  mafer: { nombre: 'Mafer Tafur', email: 'mafer.tafur@3rcore.com' },
  alejandro: { nombre: 'Alejandro Roque', email: 'alejandro.roque@3rcore.com' },
  piero: { nombre: 'Piero Roque', email: 'piero.roque@3rcore.com' },
} satisfies Record<string, Responsable>;

export interface Destinatarios {
  responsable: Responsable;
  para: string[];
  copia: string[];
}

// Valores exactos del <select> de components/layout/ContactForm.tsx (SERVICIOS).
const AREA_WEB_SEO = ['Desarrollo web y tiendas virtuales', 'Google SEO / SEM'];
const AREA_SOCIAL_BRANDING = ['Social media ADS', 'Branding'];

/** Para quién va el correo interno del formulario de contacto. */
export function destinatariosContacto(servicio: string | undefined | null): Destinatarios {
  const s = String(servicio ?? '').trim();
  const copia = [EQUIPO.alejandro.email, EQUIPO.piero.email];
  if (AREA_WEB_SEO.includes(s)) return { responsable: EQUIPO.karla, para: [EQUIPO.karla.email], copia };
  if (AREA_SOCIAL_BRANDING.includes(s)) return { responsable: EQUIPO.mafer, para: [EQUIPO.mafer.email], copia };
  // Sin servicio (p. ej. el formulario del blog): como hasta ahora, a Alejandro, con copia a Piero.
  return { responsable: EQUIPO.alejandro, para: [EQUIPO.alejandro.email], copia: [EQUIPO.piero.email] };
}
