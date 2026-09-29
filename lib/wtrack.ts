/**
 * Medición propia de 3R Core (misma pieza que el panel de 3R Core) — la copia que no se pierde.
 *
 * GA4 sigue midiendo exactamente igual que hasta ahora. Esto es una SEGUNDA
 * copia del mismo evento que sale por `3rcore.com/api/w/ev`, o sea por el
 * propio dominio. La diferencia importa: los bloqueadores de anuncios y el
 * modo estricto de Safari y de Brave cortan las llamadas a
 * `google-analytics.com`, y con ellas se va entre un 20% y un 30% de lo que
 * pasa de verdad en el sitio. Una ruta del propio dominio no se bloquea.
 *
 * Los datos van a la base de 3R Core, que es la que alimenta el panel. Ni un
 * evento sale a un tercero.
 *
 * Qué NO viaja: nada escrito por el visitante en un formulario. Los datos
 * personales solo se guardan cuando la persona los entrega a propósito para
 * que la contacten, y eso va por `/api/w/lead`, no por aquí.
 */

const RUTA_EVENTOS = "/api/w/ev";

/**
 * Solo se mide el sitio de verdad, igual que en `analytics.ts`.
 *
 * La comprobación está repetida aquí a propósito y no importada: si este
 * fichero importase `analytics.ts`, que a su vez importa este, se montaría un
 * ciclo. Son tres líneas; el ciclo sale mucho más caro.
 */
const HOST_MEDIDO = /(^|\.)3rcore\.com$/;

export function medir(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NEXT_PUBLIC_MEDICION_FORZAR === "1") return true;
  return HOST_MEDIDO.test(window.location.hostname);
}

/** Se manda una tanda cuando se juntan estos eventos… */
const TOPE_TANDA = 12;
/** …o cuando pasan estos milisegundos, lo que ocurra antes. */
const CADA_MS = 5000;
/** Una sesión termina tras media hora sin actividad, igual que en GA4. */
const SESION_MS = 30 * 60 * 1000;

type Params = Record<string, string | number | boolean | undefined>;

type EventoPendiente = {
  nombre: string;
  ts: number;
  pagina?: string;
  tipo_pagina?: string;
  etiqueta?: string;
  ubicacion?: string;
  destino?: string;
  valor?: number;
  datos?: Params;
};

let cola: EventoPendiente[] = [];
let temporizador: number | null = null;
let segundos = 0;
let relojArrancado = false;
/** El sid con el que se está contando. Si cambia, el reloj vuelve a cero. */
let sidContando: string | null = null;

/* ── Identificador de sesión ──────────────────────────────────
   Vive en sessionStorage y se renueva tras media hora quieto. No es una
   cookie, no cruza dominios y no identifica a nadie: solo permite unir los
   eventos de una misma visita. */

function idNuevo(): string {
  try {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 24);
  } catch {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
}

function cookieSid(sid: string) {
  try {
    document.cookie = `r3_sid=${sid}; path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  } catch {
    /* sin cookies: el lead entra igual, solo sin su sesión */
  }
}

export function sesionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const ahora = Date.now();
    const crudo = localStorage.getItem("r3_sid");
    if (crudo) {
      const [sid, visto] = crudo.split("|");
      if (sid && Number(visto) > ahora - SESION_MS) {
        localStorage.setItem("r3_sid", `${sid}|${ahora}`);
        // Otra pestaña puede haber estrenado sesión: si el sid no es el que
        // veníamos contando, el reloj de esta pestaña no le pertenece.
        if (sidContando !== sid) {
          segundos = 0;
          sidContando = sid;
        }
        cookieSid(sid);
        return sid;
      }
    }
    const sid = idNuevo();
    localStorage.setItem("r3_sid", `${sid}|${ahora}`);
    // Contexto de llegada: se guarda una vez, al empezar la sesión, para que
    // el panel sepa por dónde entró aunque después navegue por medio sitio.
    localStorage.setItem("r3_ctx", JSON.stringify(contextoDeLlegada()));
    // Sesión nueva, reloj a cero. Sin esto, quien deja la pestaña abierta media
    // hora y luego vuelve a moverse estrenaba sesión con 35 minutos de atención
    // ya puestos, y la media de todo el sitio se iba al techo.
    segundos = 0;
    sidContando = sid;
    cookieSid(sid);
    return sid;
  } catch {
    // Navegador con el almacenamiento bloqueado: se mide la página suelta.
    return idNuevo();
  }
}

function contextoDeLlegada() {
  const p = new URLSearchParams(window.location.search);
  return {
    landing: window.location.pathname + window.location.search.slice(0, 200),
    referrer: document.referrer || "",
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_term: p.get("utm_term") || "",
    utm_content: p.get("utm_content") || "",
    gclid: p.get("gclid") || "",
    fbclid: p.get("fbclid") || "",
    pantalla: `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`,
    idioma: navigator.language || "",
  };
}

function contextoGuardado() {
  try {
    const c = localStorage.getItem("r3_ctx");
    if (c) return JSON.parse(c);
  } catch {
    /* sin almacenamiento: se usa el de ahora mismo */
  }
  return contextoDeLlegada();
}

/* ── Reloj de atención ───────────────────────────────────────
   Solo suma con la pestaña a la vista: si no, un navegador con veinte
   pestañas abiertas parecería lleno de gente muy interesada. */

function arrancarReloj() {
  if (relojArrancado || typeof window === "undefined") return;
  relojArrancado = true;
  window.setInterval(() => {
    if (document.visibilityState === "visible") segundos += 1;
  }, 1000);
}

/* ── Cola y envío ────────────────────────────────────────────── */

export function registrar(nombre: string, params: Params = {}): void {
  if (!medir()) return;
  arrancarReloj();

  const {
    page_path,
    page_type,
    link_text,
    button_text,
    element_text,
    faq_question,
    cta_location,
    link_url,
    link_destination,
    outbound_domain,
    ...resto
  } = params;

  cola.push({
    nombre,
    ts: Date.now(),
    pagina: str(page_path) ?? window.location.pathname,
    tipo_pagina: str(page_type),
    etiqueta: str(link_text ?? button_text ?? element_text ?? faq_question),
    ubicacion: str(cta_location),
    destino: str(link_url ?? link_destination ?? outbound_domain),
    valor: num(params.percent_scrolled ?? params.seconds ?? params.value),
    datos: resto as Params,
  });

  if (cola.length >= TOPE_TANDA) enviar();
  else programar();
}

function str(v: unknown): string | undefined {
  return typeof v === "string" && v ? v : undefined;
}
function num(v: unknown): number | undefined {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function programar() {
  if (temporizador !== null) return;
  temporizador = window.setTimeout(() => {
    temporizador = null;
    enviar();
  }, CADA_MS);
}

/**
 * @param final true cuando la persona se está yendo. En ese caso se usa
 * `sendBeacon`, que es lo único que el navegador garantiza que sale cuando la
 * pestaña ya se está cerrando.
 */
export function enviar(final = false): void {
  if (!medir() || !cola.length) return;

  const lote = cola;
  cola = [];
  if (temporizador !== null) {
    window.clearTimeout(temporizador);
    temporizador = null;
  }

  const cuerpo = JSON.stringify({
    sid: sesionId(),
    segundos,
    sesion: contextoGuardado(),
    eventos: lote,
  });

  try {
    if (final && navigator.sendBeacon) {
      navigator.sendBeacon(RUTA_EVENTOS, new Blob([cuerpo], { type: "application/json" }));
      return;
    }
    void fetch(RUTA_EVENTOS, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: cuerpo,
      keepalive: true,
    }).catch(() => {
      /* Sin conexión: se pierde la tanda, no la página. */
    });
  } catch {
    /* Nunca se rompe la navegación por un fallo de medición. */
  }
}

/** Vacía la cola cuando la pestaña se oculta o se cierra. */
export function engancharSalida(): void {
  if (!medir()) return;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") enviar(true);
  });
  window.addEventListener("pagehide", () => enviar(true));
}

/* Los leads NO van por aquí: entran por /api/wa-lead, /api/contact y /api/landing,
   que ya los mandan al panel, y llevan el sid de esta sesión en la cookie r3_sid. */
