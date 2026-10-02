"use client";

import { useEffect, useRef, useState } from "react";
import { WA_LANDING } from "@/lib/contact";
import { isHumanInteraction, GTM_TAGGED_EVENTS } from "@/lib/track";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

// ID de la cuenta de Google Ads (ya cargada por gtag en el layout).
const ADS_ID = "AW-17933910865";

// Mide TODO: cada evento va al dataLayer (GTM) y, si GTM no tiene tag para él,
// también a GA4 directo vía gtag (ver GTM_TAGGED_EVENTS: con los dos, GA4 lo
// contaba 3 veces).
const track = (event: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  if (!GTM_TAGGED_EVENTS.has(event) && typeof w.gtag === "function") w.gtag("event", event, params);
};

// Dispara una conversión de Google Ads (solo si existe el label de la acción).
const adsConversion = (label?: string, extra: Record<string, unknown> = {}) => {
  if (typeof window === "undefined" || !label) return;
  const w = window as GtagWindow;
  if (typeof w.gtag === "function") {
    w.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}`, value: 1, currency: "PEN", ...extra });
  }
};

const WA_NUMBER = WA_LANDING;
const WA_BASE = "Hola! Quiero agendar una reunión, estoy interesado en los servicios ADS de ustedes.";
// Arma el link de WhatsApp; si hay servicio elegido lo incluye completo en el mensaje.
const waLink = (servicio?: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    servicio && servicio.trim() ? `${WA_BASE} Servicio de interés: ${servicio}.` : WA_BASE
  )}`;
const WA_INFO = waLink();
const LOGO = "/landing-ga/logo-3rcore.png";

// ===== Captura de GCLID (Google Ads) y demás IDs de clic =====
// Google auto-etiqueta el anuncio con ?gclid=... (o gbraid/wbraid en iOS). Ese ID
// es lo que Google necesita de vuelta para atribuir la conversión. Como el lead
// suele cerrarse por WhatsApp (offline), guardamos el gclid en cookie + localStorage
// apenas cae el visitante, para que siga disponible aunque navegue y el gclid ya no
// esté en la URL, y viaje pegado a cada lead que mandamos al panel/CRM.
const CLICK_KEYS = ["gclid", "gbraid", "wbraid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const CLICK_STORE = "_3r_click";

const captureClickData = () => {
  if (typeof window === "undefined") return;
  try {
    const qs = new URLSearchParams(window.location.search);
    const fresh: Record<string, string> = {};
    for (const k of CLICK_KEYS) { const v = qs.get(k); if (v) fresh[k] = v; }
    if (!Object.keys(fresh).length) return; // no sobrescribir con visita sin parámetros
    const json = JSON.stringify({ ...fresh, ts: Date.now(), landing: window.location.pathname });
    try { localStorage.setItem(CLICK_STORE, json); } catch { /* ignore */ }
    // Cookie propia 90 días (ventana de conversión de Google Ads).
    document.cookie = `${CLICK_STORE}=${encodeURIComponent(json)};path=/;max-age=${90 * 24 * 60 * 60};SameSite=Lax`;
  } catch { /* ignore */ }
};

// Devuelve los IDs de clic: primero de la URL actual; si no están, de lo persistido.
const getClickData = (): Record<string, string> => {
  const out: Record<string, string> = {};
  if (typeof window === "undefined") return out;
  try {
    const qs = new URLSearchParams(window.location.search);
    for (const k of CLICK_KEYS) { const v = qs.get(k); if (v) out[k] = v; }
    if (out.gclid || out.gbraid || out.wbraid) return out; // la URL manda si trae click id
    const raw = localStorage.getItem(CLICK_STORE);
    if (raw) { const s = JSON.parse(raw) as Record<string, string>; for (const k of CLICK_KEYS) if (s[k] && !out[k]) out[k] = s[k]; }
  } catch { /* ignore */ }
  return out;
};

// Arma el string "gclid=… | utm_source=…" que viaja al panel/CRM y a los eventos.
const clickOriginString = () => {
  const d = getClickData();
  return CLICK_KEYS.map((k) => (d[k] ? `${k}=${d[k]}` : null)).filter(Boolean).join(" | ");
};
const BARS = [41, 54, 45, 71, 63, 85, 76, 100];

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const CheckSm = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
);
const CheckRow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
);
const CrossRow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
);
const ChevUp = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
);
const GoogleG = ({ s = 18 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" /></svg>
);
const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M.06 24l1.7-6.2A11.9 11.9 0 1112 24a11.9 11.9 0 01-5.9-1.6L.06 24zM6.6 20l.4.2a9.9 9.9 0 005 1.4A9.9 9.9 0 102.1 12a9.9 9.9 0 001.5 5.3l.3.4-1 3.6 3.7-1zM17.5 14.4c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a8.1 8.1 0 01-2.4-1.5 9 9 0 01-1.6-2.1c-.2-.3 0-.4.1-.5l.4-.4.3-.5c.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.2 5 5 0 001.1 2.7 11.5 11.5 0 004.4 3.9c2.1.8 2.1.5 2.5.5a2.6 2.6 0 001.7-1.2 2.1 2.1 0 00.1-1.2c0-.1-.2-.2-.4-.3z" /></svg>
);
const MetaLogo = () => (
  <svg width="34" height="22" viewBox="0 0 36 24" fill="none"><defs><linearGradient id="metaP" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0099ff" /><stop offset="1" stopColor="#a033ff" /></linearGradient></defs><path fill="url(#metaP)" d="M9 4C5.1 4 2 8 2 12.5S4.6 21 8.2 21c2.7 0 4.5-1.5 6.9-5.3l2-3.3c.3-.5.5-.7.6-.7.3 0 .6.5 1.2 1.5l2.4 4C25.1 19.8 26.9 21 29.3 21c3.6 0 6-3.3 6-8.1C35.3 8.5 32.6 4 28.8 4c-2.4 0-4.4 1.4-6.6 5-.7 1.2-1 1.7-1.3 1.7-.3 0-.6-.5-1.2-1.5C17.4 5.3 15.4 4 12.9 4z" /></svg>
);

const PROBLEMS = [
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></svg>), t: "Pauta que gasta y no vende", d: "El presupuesto se va cada mes pero las ventas no se mueven." },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M17 8l5 5M22 8l-5 5" /></svg>), t: "No sabes qué te trae clientes", d: "Corres anuncios en varios lados sin saber cuál de verdad funciona." },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 01-1.92-2.56l2.33-8A2 2 0 016.5 2H20a2 2 0 012 2v8a2 2 0 01-2 2h-2.76a2 2 0 00-1.79 1.11L12 22a3.13 3.13 0 01-3-3.88Z" /></svg>), t: "Reportes de “likes”, no de ventas", d: "Te entregan alcance e impresiones, nunca el dato que importa: cuánto vendiste." },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /><path d="M9 9h.01M15 9h.01" /></svg>), t: "Redes lindas, sin estrategia", d: "Contenido que se ve bien pero no está pensado para que alguien te compre." },
];

const FEATURES = [
  { t: "Cada sol rastreado", d: "Sabes exactamente de dónde viene cada lead y cada venta." },
  { t: "Decisiones con data, no corazonadas", d: "Optimizamos según lo que convierte, semana a semana." },
  { t: "Especialistas, no un “todólogo”", d: "Equipo de pauta, creatividad y analítica enfocado en tu cuenta." },
];

const COMPARE = [
  ["Presupuesto sin dirección", "Estrategia por objetivo"],
  ["“¿Funcionó? No sé”", "ROAS y CPL claros"],
  ["Likes e impresiones", "Leads y ventas"],
  ["Redes por publicar", "Redes que venden"],
  ["Reportes que nadie entiende", "Reportes claros y honestos"],
];

const ServGoogle = (<GoogleG s={26} />);
const ServMeta = (<svg width="30" height="20" viewBox="0 0 36 24" fill="none"><defs><linearGradient id="metaS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0099ff" /><stop offset="1" stopColor="#a033ff" /></linearGradient></defs><path fill="url(#metaS)" d="M9 4C5.1 4 2 8 2 12.5S4.6 21 8.2 21c2.7 0 4.5-1.5 6.9-5.3l2-3.3c.3-.5.5-.7.6-.7.3 0 .6.5 1.2 1.5l2.4 4C25.1 19.8 26.9 21 29.3 21c3.6 0 6-3.3 6-8.1C35.3 8.5 32.6 4 28.8 4c-2.4 0-4.4 1.4-6.6 5-.7 1.2-1 1.7-1.3 1.7-.3 0-.6-.5-1.2-1.5C17.4 5.3 15.4 4 12.9 4z" /></svg>);
const ServTikTok = (<svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M16.6 5.8a4.3 4.3 0 01-1-2.8h-3.3v13.4a2.4 2.4 0 11-1.7-2.3V10.7a5.7 5.7 0 105 5.7V9.9a7.5 7.5 0 004.4 1.4V8a4.3 4.3 0 01-2.4-2.2z" /></svg>);
const ServSocial = (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff5c8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><path d="M17.5 6.5h.01" /></svg>);
const ServLanding = (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff5c8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>);
const ServAnalytics = (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff5c8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" /></svg>);

const SERVICES = [
  { icon: ServGoogle, t: "Google Ads", d: "Aparece justo cuando tu cliente te está buscando y paga solo por resultados.", chips: ["Search", "Performance Max", "Shopping", "YouTube", "Remarketing"] },
  { icon: ServMeta, t: "Meta Ads", d: "Campañas en Facebook e Instagram que generan demanda y llenan tu pipeline.", chips: ["Facebook", "Instagram", "Mensajes", "Catálogo", "Retargeting"] },
  { icon: ServTikTok, t: "TikTok Ads", d: "Llega a nuevas audiencias con creatividades que sí frenan el scroll.", chips: ["Spark Ads", "UGC", "Conversión"] },
  { icon: ServSocial, t: "Social Media & Community", d: "Estrategia, contenido y gestión de tus redes pensados para vender, no solo publicar.", chips: ["Instagram", "TikTok", "Facebook", "LinkedIn", "Parrilla mensual"] },
  { icon: ServLanding, t: "Landing pages que convierten", d: "Páginas rápidas y pensadas para que el clic termine en contacto o compra.", chips: ["UX/UI", "A/B testing", "Carga veloz"] },
  { icon: ServAnalytics, t: "Analítica & Reportes", d: "Medición real de principio a fin. Nada de métricas de vanidad.", chips: ["GA4", "Conversiones", "Reporte mensual"] },
];

const STEPS = [
  { n: "01", t: "Diagnóstico", d: "Revisamos tu cuenta, tu mercado y tu competencia para encontrar la oportunidad." },
  { n: "02", t: "Estrategia", d: "Definimos objetivos, presupuesto, canales y el mensaje que va a convertir." },
  { n: "03", t: "Lanzamiento", d: "Montamos campañas, creatividades y medición desde el primer día." },
  { n: "04", t: "Optimización", d: "Ajustamos semana a semana hacia lo que de verdad trae clientes." },
  { n: "05", t: "Escala", d: "Multiplicamos lo que funciona y soltamos lo que no rinde." },
];

const RESULTS = [
  ["4.2×", "ROAS promedio de portafolio"],
  ["-38%", "Reducción de costo por lead"],
  ["+67%", "Aumento en tasa de conversión"],
  // 31-ago-2026: decía «+120» mientras la portada decía «+1000» con el mismo
  // rótulo. La cifra confirmada por el cliente es +1000 (ver CTASection.tsx).
  ["+1000", "Marcas trabajadas"],
];

// Reseñas REALES y verificables.
// - Vania Cueva Soto: reseña pública real de 3R Core en Google (★5).
// - José Gaspard: testimonio del partner tecnológico (Nebu Lab), persona real.
const GOOGLE_PROFILE = "https://www.google.com/maps?cid=15241385315569891224";
const TESTIMONIALS = [
  {
    quote: "Excelente servicio, en mi caso como Jefa de ventas. Veo un excelente alcance sobre las entregas. Además, se acomoda de forma excelente con nuestra proyección.",
    name: "Vania Cueva Soto",
    role: "Jefa de Ventas",
    photo: "/testimonios/vania.png",
    source: "Google",
  },
  {
    quote: "¡Totalmente recomendado! Esta agencia logró cambiar mi forma de ver las cosas, superaron mis expectativas. Una agencia de marketing digital que se compromete y pone todo su compromiso con el cliente, y eso se ve muy poco, además del buen trato del personal y su amplia tarea de brindar las mejores perspectivas desde su experiencia y conocimiento para ayudarnos a triunfar en nuestros negocios. Totalmente dispuesta a volver a trabajar con 3R Core y llevar mi negocio a otro nivel.",
    name: "Tamara Gonzales",
    role: "Clienta de 3R Core",
    photo: "/testimonios/tamara.png",
    source: "Google",
  },
  {
    quote: "¡Increíbles resultados! El equipo de 3R Core me ayudó a impulsar mi marca desde Los Ángeles y ahora puedo llevar un mejor manejo de mis redes y el posicionamiento de mi marca. Aún sigo trabajando con ellos en conjunto. ¡Recomendado!",
    name: "Melanie Bdv",
    role: "Dueña de marca · Los Ángeles",
    photo: "/testimonios/melanie.png",
    source: "Google",
  },
  {
    quote: "Integro la parte técnica de varias marcas con sus campañas y 3R Core es de las pocas agencias que mide de verdad lo que promete. Cada sol invertido termina en un reporte claro. Los recomiendo sin dudarlo.",
    name: "José Gaspard",
    role: "Partner tecnológico · Nebu Lab",
    photo: "/testimonios/jose-gaspard.webp",
  },
];

const FAQS = [
  { q: "¿Cuánto debo invertir en publicidad para empezar?", a: "Depende de tu rubro y objetivo, pero solemos arrancar con presupuestos de pauta desde S/1,500 al mes. En el diagnóstico te decimos un rango realista según tu meta de ventas." },
  { q: "¿En cuánto tiempo veo resultados?", a: "Las primeras señales (clics, leads, conversiones) llegan en las primeras semanas. La rentabilidad estable suele tomar entre 60 y 90 días de optimización con data." },
  { q: "¿El presupuesto de pauta está incluido en el plan?", a: "No. El fee de gestión y la inversión en pauta son montos separados. Así sabes con claridad cuánto va a Google/Meta y cuánto al trabajo de la agencia." },
  { q: "¿Trabajan con cualquier rubro?", a: "Trabajamos con la mayoría de rubros B2C y B2B. Si vemos que no podemos generar resultados para tu negocio, te lo decimos de frente en el diagnóstico." },
  { q: "¿Hay permanencia o contrato forzado?", a: "Sugerimos un mínimo de 3 meses porque es lo que toma optimizar bien, pero no te amarramos con cláusulas abusivas. Si no funciona, eres libre de salir." },
  { q: "¿Qué incluye el diagnóstico gratis?", a: "Revisamos tu situación actual, detectamos oportunidades concretas y te mostramos cómo convertiríamos tu inversión en clientes. Sin compromiso y sin tecnicismos." },
];

const NAV = [
  ["#servicios", "Servicios"],
  ["#proceso", "Cómo trabajamos"],
  ["#resultados", "Resultados"],
  ["#faq", "Preguntas"],
];

const LOGOS = [
  ["hidromec.png", "HIDROMEC"],
  ["pdk.webp", "PDK"],
  ["argentaria.png", "ARGENTARIA"],
  ["paypal.png", "PayPal"],
  ["edifica.png", "EDIFICA"],
  ["domus.webp", "domus"],
];


export default function LandingClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [servicio, setServicio] = useState("");
  const [waLeadUrl, setWaLeadUrl] = useState("");
  const formStarted = useRef(false);
  // Captura PROPIA de WhatsApp (sin terceros): pide datos antes de abrir el chat.
  const [waModal, setWaModal] = useState(false);
  const [waNext, setWaNext] = useState("");
  const [waSending, setWaSending] = useState(false);
  const waDone = useRef(false);

  // ===== Medición total: cada click, WhatsApp, scroll y sección vista =====
  useEffect(() => {
    // Guarda el gclid/gbraid/wbraid+utm de la URL apenas carga la landing.
    captureClickData();

    const root = document.querySelector(".ga");
    if (!root) return;

    // 1) Auto-tag de TODO click en enlaces y botones
    const onClick = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest?.("a,button") as HTMLElement | null;
      if (!el || !root.contains(el)) return;
      const sec = (el.closest("[data-sec]") as HTMLElement | null)?.dataset.sec || "global";
      const label = (el.getAttribute("data-track") || el.textContent || el.getAttribute("aria-label") || "")
        .replace(/\s+/g, " ").trim().slice(0, 80);
      const href = el.getAttribute("href") || "";
      if (href.includes("wa.me") || href.includes("api.whatsapp")) {
        // Filtro de tráfico automatizado (lib/track.ts): un clic sintético no
        // cuenta como conversión, se archiva como whatsapp_click_bot.
        if (isHumanInteraction(e)) {
          track("whatsapp_click", { location: sec, label, link_url: href });
        } else {
          track("whatsapp_click_bot", { location: sec, label, link_url: href, human: false });
        }
        // Conversión de Google Ads por clic a WhatsApp (si hay label configurado).
        adsConversion(process.env.NEXT_PUBLIC_ADS_WA_LABEL, { location: sec });
        // Captura PROPIA: si el enlace NO trae ya los datos (data-wa-direct) y aún
        // no capturamos en esta visita, interceptamos y pedimos nombre+celular.
        if (!waDone.current && el.getAttribute("data-wa-direct") === null) {
          e.preventDefault();
          e.stopPropagation();
          setWaNext(href);
          setWaModal(true);
          track("wa_capture_open", { location: sec });
        }
      } else if (el.classList.contains("btn-primary") || el.getAttribute("data-cta") === "1") {
        track("cta_click", { location: sec, label });
      } else if (/^https?:\/\//.test(href) && !href.includes("3rcore.com")) {
        track("outbound_click", { location: sec, label, link_url: href });
      } else {
        track("element_click", { location: sec, label, link_url: href });
      }
    };
    root.addEventListener("click", onClick, true);

    // 2) Profundidad de scroll
    const marks = [25, 50, 75, 90];
    const fired = new Set<number>();
    const onScroll = () => {
      const de = document.documentElement;
      const pct = ((window.scrollY + window.innerHeight) / de.scrollHeight) * 100;
      for (const m of marks) if (pct >= m && !fired.has(m)) { fired.add(m); track("scroll_depth", { percent: m }); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 3) Vista de cada sección
    const io = new IntersectionObserver((ents) => {
      for (const en of ents) if (en.isIntersecting) {
        track("section_view", { section: (en.target as HTMLElement).dataset.sec });
        io.unobserve(en.target);
      }
    }, { threshold: 0.4 });
    root.querySelectorAll("[data-sec]").forEach((s) => io.observe(s));

    track("landing_view", { page: "performance-marketing" });

    return () => {
      root.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const onFormFocus = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    track("form_start", { location: "contacto" });
  };

  // Captura PROPIA de WhatsApp: guarda el lead en el panel y abre el chat.
  const handleWaCapture = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (waSending) return;
    const d = new FormData(e.currentTarget);
    const nombre = String(d.get("wa_nombre") || "").trim();
    const celular = String(d.get("wa_celular") || "").trim();
    const proyecto = String(d.get("wa_proyecto") || "").trim();
    if (!nombre || !celular) return;
    setWaSending(true);

    // Origen persistido (incluye gclid aunque el usuario ya haya navegado).
    const click = getClickData();
    const utm = clickOriginString();
    const gclid = click.gclid || click.gbraid || click.wbraid || "";

    // Guarda en el PANEL propio (recursos propios, sin terceros) antes de abrir el chat.
    try {
      await fetch("/api/wa-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, celular, proyecto, origin: utm, gclid }),
      });
    } catch { /* aunque falle el guardado, igual abrimos el chat */ }

    track("generate_lead", { form_location: "whatsapp-capture", service: proyecto || undefined, gclid: gclid || undefined });
    adsConversion(process.env.NEXT_PUBLIC_ADS_WA_LABEL, { service: proyecto || undefined });

    const waText = [
      "Hola 3R Core 👋",
      `Nombre: ${nombre}`,
      `Celular: ${celular}`,
      proyecto ? `Interés: ${proyecto}` : null,
    ].filter(Boolean).join("\n");
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;
    waDone.current = true;
    setWaSending(false);
    setWaModal(false);
    try { window.open(url, "_blank", "noopener"); } catch { window.location.href = url; }
  };

  const toggleMenu = (open: boolean) => {
    setMenuOpen(open);
    if (typeof document !== "undefined") document.body.classList.toggle("ga-menu-open", open);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const f = e.currentTarget;
    const d = new FormData(f);
    const nombre = String(d.get("nombre") || "");
    const empresa = String(d.get("empresa") || "");
    const celular = String(d.get("celular") || "");
    const correo = String(d.get("correo") || "");
    const necesidad = String(d.get("necesidad") || "");
    // Captura de origen para el panel/CRM (gclid persistido + utm) para poder
    // importar la conversión offline a Google Ads cuando el lead cierre.
    const click = getClickData();
    const utm = clickOriginString();
    const gclid = click.gclid || click.gbraid || click.wbraid || "";
    const ref = typeof document !== "undefined" ? document.referrer : "";
    const mensaje = [
      `Servicio: ${necesidad}`,
      gclid ? `GCLID: ${gclid}` : null,
      utm ? `Origen: ${utm}` : null,
      ref ? `Referente: ${ref}` : null,
    ].filter(Boolean).join("\n");

    // WhatsApp (click-to-chat): manda los datos del lead al WhatsApp del negocio
    // a través del propio WhatsApp del usuario. Se abre DENTRO del gesto de envío
    // (antes del await) para que el navegador no lo bloquee como popup.
    const waText = [
      "Hola, quiero mi diagnóstico gratis 👋",
      `Nombre: ${nombre}`,
      empresa ? `Empresa: ${empresa}` : null,
      `Celular: ${celular}`,
      `Correo: ${correo}`,
      necesidad ? `Servicio: ${necesidad}` : null,
    ].filter(Boolean).join("\n");
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;
    setWaLeadUrl(waUrl);
    try { window.open(waUrl, "_blank", "noopener"); } catch { /* el botón de respaldo queda visible */ }
    track("lead_whatsapp_open", { form_location: "performance-marketing", service: necesidad });

    setSending(true);
    let delivered = false;
    try {
      const r = await fetch("/api/landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido: empresa || "-", email: correo, telefono: celular, mensaje, website: "Landing /performance-marketing", servicio: necesidad, utm, gclid, referrer: ref }),
      });
      delivered = r.ok;
    } catch { /* still confirm to user */ }
    // Evento de conversión (lo usa Google Ads / GA4 vía GTM)
    track("generate_lead", {
      form_location: "performance-marketing",
      service: necesidad,
      company: empresa || undefined,
      utm: utm || undefined,
      gclid: gclid || undefined,
      delivered,
    });
    if (!delivered) track("lead_send_error", { form_location: "performance-marketing", service: necesidad });

    // ── Conversión a Google Ads (arregla "Conversiones 0.00" en la cuenta) ──
    // Apenas el cliente cree la acción de conversión en Google Ads y ponga su
    // label en NEXT_PUBLIC_ADS_CONVERSION_LABEL (Vercel), cada envío del form
    // cuenta como conversión y la campaña optimiza hacia compradores reales.
    // (El evento generate_lead ya llegó a GA4/dataLayer vía track()).
    adsConversion(process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL, { service: necesidad });

    setSending(false);
    setSent(true);
  };

  return (
    <div className="ga" id="top">
      {/* ============ HEADER ============ */}
      <header className="site-header" data-sec="header">
        <div className="container nav">
          <a href="#top" className="brand" aria-label="3R Core"><img src={LOGO} alt="3R Core — Agencia de Marketing Digital" className="brand-logo" /></a>
          <nav className="nav-links">
            {NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="nav-cta">
            <a href="#proceso" className="btn btn-ghost">Cómo trabajamos</a>
            <a href={WA_INFO} target="_blank" rel="noopener" className="btn btn-wa" data-track="header_whatsapp"><WaIcon size={16} /> Escríbenos al WhatsApp</a>
            <button type="button" className="hamburger" aria-label="Menú" onClick={() => toggleMenu(!menuOpen)}><span /><span /><span /></button>
          </div>
        </div>
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {NAV.map(([href, label]) => <a key={href} href={href} onClick={() => toggleMenu(false)}>{label}</a>)}
          <a href={WA_INFO} target="_blank" rel="noopener" className="btn btn-wa" data-track="menu_whatsapp" onClick={() => toggleMenu(false)}><WaIcon size={16} /> Escríbenos al WhatsApp</a>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="hero" data-sec="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Agencia de Performance &amp; Google Ads · Lima</span>
              <h1>Más clientes,<br /><span className="grad-text">menos presupuesto quemado.</span></h1>
              <p className="hero-sub">Diseñamos y ejecutamos campañas de Google Ads, Meta Ads y redes sociales con una sola obsesión: que cada sol que inviertes regrese convertido en ventas.</p>
              <div className="hero-cta">
                <a href={WA_INFO} target="_blank" rel="noopener" className="btn btn-wa" data-track="hero_whatsapp"><WaIcon size={18} /> Escríbenos al WhatsApp</a>
                <a href="#contacto" className="btn btn-ghost" data-track="hero_diagnostico_form">Pide tu diagnóstico <ArrowIcon /></a>
              </div>
              <div className="hero-stats">
                {/* 31-ago-2026: «+120» aquí y en RESULTS mientras la portada decía «+1000».
                    Cifra confirmada por el cliente: +1000 marcas. */}
                <div><div className="num grad-text">+1000</div><div className="lbl">Marcas escaladas</div></div>
                <div><div className="num grad-text">4.2x</div><div className="lbl">ROAS promedio</div></div>
                <div><div className="num grad-text">-38%</div><div className="lbl">Costo por lead</div></div>
              </div>
            </div>

            {/* dashboard mockup */}
            <div className="dash-wrap" aria-hidden="true">
              <div className="dash">
                <div className="dash-head">
                  <span className="dash-conv"><GoogleG s={18} /><span className="t">Conversiones <b>+67%</b></span></span>
                  <div className="dash-camp">
                    <div className="c">CAMPAÑA Google Ads Search</div>
                    <span className="live">En vivo</span>
                  </div>
                </div>
                <div className="dash-kpis">
                  <div className="kpi"><div className="k">Inversión</div><div className="v">S/ 2,800</div></div>
                  <div className="kpi"><div className="k">Ventas generadas</div><div className="v">S/ 45,150</div><span className="tag"><ChevUp />ROAS 16.1x</span></div>
                  <div className="kpi"><div className="k">Leads</div><div className="v">460</div><span className="tag"><ChevUp />+52%</span></div>
                  <div className="kpi"><div className="k">Costo por lead</div><div className="v">S/ 8</div><span className="tag"><ChevUp />-38%</span></div>
                </div>
                <div className="dash-chart">
                  {BARS.map((h, i) => <div key={i} className="bar" style={{ height: `${h}%` }} />)}
                </div>
              </div>
              <div className="dash-badges">
                <div className="badge-float badge-gp"><img src="/landing-ga/google-partner.png" alt="Google Partner" /></div>
                <div className="badge-float badge-meta"><MetaLogo /><span>Business<br />Partner</span></div>
                <div className="badge-float badge-tt"><img src="/landing-ga/tiktok-partner.png" alt="TikTok Marketing Partner" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOGOS ============ */}
      <section className="logos" data-sec="logos">
        <div className="container">
          <div className="lbl">Marcas que ya crecen con nosotros</div>
          <div className="logos-row">
            {LOGOS.map(([file, alt]) => (
              <img key={file} src={`/landing-ga/${file}`} alt={alt} className="client-logo" />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEMA ============ */}
      <section className="section" id="problema" data-sec="problema">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">El problema</span>
            <h2>¿Inviertes en publicidad y no ves el retorno?</h2>
            <p>Si te suena alguna de estas, no es que la publicidad no funcione. Falta un sistema detrás.</p>
          </div>
          <div className="cards-4">
            {PROBLEMS.map((p) => (
              <div className="pcard" key={p.t}>
                <span className="ic">{p.icon}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SISTEMA ============ */}
      <section className="section" data-sec="sistema" style={{ background: "var(--bg-850)" }}>
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow">Nuestra forma de trabajar</span>
              <h2>No corremos anuncios sueltos. Construimos un <span className="grad-text">sistema de adquisición.</span></h2>
              <p className="lead">Conectamos pauta, página y seguimiento en un solo motor que captura, convierte y mide. Tú ves clientes entrando; nosotros nos encargamos de que cada campaña se pague sola.</p>
              {FEATURES.map((f) => (
                <div className="feat" key={f.t}>
                  <span className="chk"><CheckSm /></span>
                  <div><h4>{f.t}</h4><p>{f.d}</p></div>
                </div>
              ))}
            </div>
            <div className="compare">
              <div className="compare-head">
                <div className="a">Antes de 3R CORE</div>
                <div className="b">Con 3R CORE</div>
              </div>
              {COMPARE.map(([a, b]) => (
                <div className="compare-row" key={a}>
                  <div className="a"><CrossRow />{a}</div>
                  <div className="b"><CheckRow />{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICIOS ============ */}
      <section className="section" id="servicios" data-sec="servicios">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Servicios</span>
            <h2>Todo lo que tu marca necesita para vender online</h2>
            <p>Performance y contenido bajo el mismo techo. Lo que prometemos, lo medimos.</p>
          </div>
          <div className="cards-3">
            {SERVICES.map((s) => (
              <div className="scard" key={s.t}>
                <span className="ic">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="chips">{s.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PASOS ============ */}
      <section className="section" id="proceso" data-sec="proceso" style={{ background: "var(--bg-850)" }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Cómo trabajamos</span>
            <h2>De la idea a la venta en 5 pasos</h2>
            <p>Un método claro, sin cajas negras. Sabes qué pasa en cada etapa.</p>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.n}>
                <div className="n">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RESULTADOS ============ */}
      <section className="section results" id="resultados" data-sec="resultados">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Resultados</span>
            <h2>Números que se ven en la caja</h2>
            <p>Promedios de cuentas que gestionamos. Reemplazables con tus casos reales.</p>
          </div>
          <div className="results-grid">
            {RESULTS.map(([v, l]) => (
              <div className="rstat" key={l}><div className="v">{v}</div><div className="l">{l}</div></div>
            ))}
          </div>
          <p className="disclaimer">* Cifras de ejemplo. 3R Core: reemplazar por resultados y casos reales de la agencia antes de publicar.</p>
        </div>
      </section>

      {/* ============ TESTIMONIOS ============ */}
      <section className="section" data-sec="testimonios">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Lo que dicen</span>
            <h2>Clientes que dejaron de adivinar</h2>
            <a className="g-rating" href={GOOGLE_PROFILE} target="_blank" rel="noopener noreferrer">
              <span className="g-score">4.7</span>
              <span className="g-stars">★★★★★</span>
              <span className="g-label">en Google · ver reseñas</span>
            </a>
          </div>
          <div className="cards-3 tcards">
            {TESTIMONIALS.map((t, i) => (
              <div className="tcard" key={i}>
                <div className="tcard-top">
                  <div className="stars">★★★★★</div>
                  {t.source === "Google" && <span className="t-tag">Reseña de Google</span>}
                </div>
                <p className="quote">{`“${t.quote}”`}</p>
                <div className="t-author">
                  <img className="ph" src={t.photo} alt={t.name} width={46} height={46} loading="lazy" />
                  <div><div className="nm">{t.name}</div><div className="rl">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section" id="faq" data-sec="faq" style={{ background: "var(--bg-850)" }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2>Lo que todos preguntan antes de empezar</h2>
          </div>
          <div className="faq">
            {FAQS.map((f, i) => (
              <div className={`faq-item${openFaq === i ? " open" : ""}`} key={i}>
                <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}<span className="pm">+</span>
                </button>
                <div className="faq-a" style={{ maxHeight: openFaq === i ? "240px" : "0" }}><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL / FORM ============ */}
      <section className="cta-final" id="contacto" data-sec="contacto">
        <div className="container">
          <div className="cta-box">
            <div className="ct">
              <h2>Pide tu diagnóstico gratis</h2>
              <p>Te mostramos en concreto cómo convertir tu inversión en clientes. Sin compromiso y sin tecnicismos.</p>
              <a href={waLink(servicio)} target="_blank" rel="noopener" className="btn btn-wa" data-track="wa_cta_diagnostico"><WaIcon /> Escríbenos al WhatsApp</a>
            </div>
            {sent ? (
              <div className="form-ok">
                <div className="ok-ic"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></div>
                <h3>¡Listo! Recibimos tu solicitud</h3>
                <p>Se abrió WhatsApp con tus datos para enviarlos. Si no se abrió, toca el botón y dale enviar.</p>
                <a href={waLeadUrl || WA_INFO} target="_blank" rel="noopener" data-wa-direct className="btn btn-wa" data-track="wa_lead_confirm"><WaIcon /> Enviar mis datos por WhatsApp</a>
              </div>
            ) : (
              <form className="lead-form" onSubmit={handleSubmit} onFocusCapture={onFormFocus}>
                <div className="row">
                  <input type="text" name="nombre" placeholder="Nombre y apellido" required />
                  <input type="text" name="empresa" placeholder="Empresa" />
                  <input type="tel" name="celular" placeholder="Celular / WhatsApp" required />
                  <input type="email" name="correo" placeholder="Correo electrónico" required />
                  <select name="necesidad" aria-label="¿Qué necesitas?" required defaultValue="" onChange={(e) => { setServicio(e.target.value); track("form_service_select", { service: e.target.value, location: "contacto" }); }}>
                    <option value="" disabled>¿Qué necesitas?</option>
                    <option>Google Ads</option>
                    <option>Meta Ads (Facebook / Instagram)</option>
                    <option>TikTok Ads</option>
                  </select>
                  <button type="submit" disabled={sending}>{sending ? "Enviando…" : "Quiero mi diagnóstico"}</button>
                </div>
                <p className="form-note">Te respondemos el mismo día hábil. Tus datos están seguros con nosotros.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="site-footer" data-sec="footer">
        <div className="container">
          <div className="foot-grid">
            <div className="foot-brand">
              <a href="#top" className="brand" aria-label="3R Core"><img src={LOGO} alt="3R Core — Agencia de Marketing Digital" className="brand-logo" /></a>
              <p>Agencia de performance, Google Ads y redes sociales en Lima. Tu Éxito, Nuestro Éxito.</p>
            </div>
            <div className="foot-col">
              <h4>Servicios</h4>
              <a href="#servicios">Google Ads</a>
              <a href="#servicios">Meta Ads</a>
              <a href="#servicios">Social Media</a>
              <a href="#servicios">Landing Pages</a>
            </div>
            <div className="foot-col">
              <h4>Agencia</h4>
              <a href="#proceso">Cómo trabajamos</a>
              <a href="#resultados">Resultados</a>
              <a href="#contacto">Planes</a>
              <a href="#faq">Preguntas</a>
            </div>
            <div className="foot-col">
              <h4>Contacto</h4>
              <ul>
                <li>Alameda de la Paz 187, primer piso, La Molina, Lima</li>
                <li><a href={WA_INFO} target="_blank" rel="noopener">WhatsApp: +51 969 791 251</a></li>
                <li>Lun a Vie: 9am a 6pm</li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <p>© 2026 3R Core. Todos los derechos reservados.</p>
            <div className="links">
              <a href="/es/politicas">Política de privacidad</a>
              <a href="/es/terminos">Términos y condiciones</a>
              <a href="/es/reclamaciones">Libro de reclamaciones</a>
            </div>
          </div>
        </div>
      </footer>

      <a href={WA_INFO} target="_blank" rel="noopener" className="wa-float" aria-label="WhatsApp" data-track="wa_float"><WaIcon size={30} /></a>

      {/* Captura PROPIA de WhatsApp (sin terceros): pide datos y los guarda en el panel */}
      {waModal && (
        <div className="wa-modal-ov" onClick={() => setWaModal(false)}>
          <div className="wa-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wa-modal-head">
              <span className="wa-modal-ttl"><WaIcon size={20} /> Chatea con nosotros</span>
              <button type="button" className="wa-modal-x" aria-label="Cerrar" onClick={() => setWaModal(false)}>×</button>
            </div>
            <p className="wa-modal-sub">Déjanos tus datos y seguimos por WhatsApp ahora mismo.</p>
            <form onSubmit={handleWaCapture} className="wa-modal-form">
              <input type="text" name="wa_nombre" placeholder="Tu nombre" required autoFocus />
              <input type="tel" name="wa_celular" placeholder="Tu celular / WhatsApp" required />
              <select name="wa_proyecto" defaultValue="" aria-label="¿Qué necesitas?">
                <option value="" disabled>¿Qué necesitas?</option>
                <option>Google Ads</option>
                <option>Meta Ads (Facebook / Instagram)</option>
                <option>TikTok Ads</option>
                <option>Social Media / Community</option>
                <option>No estoy seguro / asesoría</option>
              </select>
              <button type="submit" className="btn btn-wa" disabled={waSending}>
                <WaIcon /> {waSending ? "Abriendo…" : "Iniciar chat"}
              </button>
            </form>
            <span className="wa-modal-foot">Tus datos están seguros con nosotros.</span>
          </div>
        </div>
      )}
    </div>
  );
}
