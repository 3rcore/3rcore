"use client";
import { poppins } from "@/lib/fonts"
import BrandOrb from "@/components/ui/BrandOrb";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl"

/**
 * Servicios de interés del formulario. El `value` viaja siempre en español
 * porque el correo que recibe la agencia está en español; la etiqueta que ve
 * la persona sí se traduce.
 */
const SERVICIOS = [
  { value: "Desarrollo web y tiendas virtuales", key: "serviceWeb" },
  { value: "Google SEO / SEM", key: "serviceSeo" },
  { value: "Social media ADS", key: "serviceSocial" },
  { value: "Branding", key: "serviceBranding" },
] as const;

// Clases del control: caja translúcida con borde tenue, como pide el diseño.
// El borde rosado animado lo pone `.field-border` (ver globals.css).
// El radio va en píxeles y no como `rounded-xl`: esa utilidad se compila a
// calc(var(--radius) + 4px) y `--radius` solo está definido en el CSS de las
// landings, así que en el sitio la declaración era inválida y las cajas
// salían cuadradas.
const CONTROL =
  "contact-field w-full rounded-[12px] bg-white/5 border border-white/15 px-[18px] py-[14px] text-[14px] text-white placeholder:text-white/35 focus:outline-none transition-colors duration-500";

const LABEL = "text-white text-[11px] font-bold uppercase tracking-[1.4px]";

/** Borde degradado que se dibuja de izquierda a derecha al enfocar el campo. */
const FieldBorder = () => (
  <span aria-hidden="true" className="field-border pointer-events-none absolute inset-0 rounded-[12px]" />
);

const ContactForm = () => {
  // El formulario respondía SIEMPRE en español: un lead de EE.UU. enviaba sus
  // datos y leía "¡Mensaje enviado con éxito!".
  const locale = useLocale();
  const MSG = locale === "en"
    ? { ok: "Message sent successfully!", err: "Couldn't send. Please try again." }
    : { ok: "¡Mensaje enviado con éxito!", err: "Error al enviar. Intenta de nuevo." };

  const [isInteractive, setIsInteractive] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('ContactSection');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  // Anti-spam sin terceros: momento de montaje para medir cuánto tardó en
  // enviarse el formulario (los bots lo llenan en <3s; el tráfico "Direct"
  // de EE.UU. sobre /en venía llenando el form y generando leads falsos).
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mapRef.current && !mapRef.current.contains(event.target as Node)) {
        setIsInteractive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Guardar la referencia ANTES del await: tras un await, e.currentTarget es
    // null (React ya despachó el evento) y llamar .reset() ahí lanzaba un
    // TypeError que caía al catch → el usuario veía "Error al enviar" aunque
    // el correo SÍ había salido. El form solo se limpia cuando el envío fue OK,
    // así el usuario no pierde lo escrito si hay un error real.
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData) as Record<string, string>;
    data.page = typeof window !== 'undefined' ? window.location.pathname : '';

    // Honeypot lleno o envío en menos de 3 segundos = bot. Se le muestra el
    // mensaje de éxito (para no darle señal de bloqueo) pero NO se envía nada:
    // ni correo, ni panel, ni evento generate_lead (dejaba de contaminar GA4).
    const elapsed = Date.now() - mountedAt.current;
    if (data.sitio_web || elapsed < 3000) {
      setStatus({ type: "success", message: MSG.ok });
      formEl.reset();
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ ...data, locale }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setStatus({ type: "success", message: MSG.ok });
        formEl.reset();
        // Lead medible en GA4/GTM (antes el formulario era invisible en Analytics).
        if (typeof window !== 'undefined') {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: 'generate_lead',
            lead_source: 'contact_form',
            page_path: data.page,
          });
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatus({ type: "error", message: MSG.err });
    } finally {
      setLoading(false);
    }

  };

  return (
    <section
      className={`${poppins.className} relative w-full overflow-hidden bg-[#16021B] py-20 lg:py-[140px] flex flex-col justify-center items-center`}
      style={{
        backgroundImage: "url('/images/Formulario/wmremove-transformed-8-1-1.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Velo sobre la foto: el diseño pide un fondo casi negro y la tarjeta
          del formulario es blanco al 4%, que sobre la imagen desnuda se
          perdería. El #16021B de la clase queda debajo como color de reserva
          mientras carga la foto. */}
      <div className="absolute inset-0 bg-[#130218]/80 z-0"></div>
      {/* 1584px = 820 (formulario) + 64 (gap) + 700 (mapa), las medidas del
          diseño. Con el max-w-7xl anterior el formulario se quedaba en ~590px
          y la tarjeta se veía estrecha frente al comp. */}
      <div className="relative z-10 w-full max-w-[1664px] px-6 md:px-10">
        <h2 className="text-center mb-14">
          <span className="inline-block bg-[#A21F8A] rounded-[2px] px-6 py-3 text-white text-xl md:text-[26px] font-bold uppercase tracking-[2px]">
            {t('title')}
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[820fr_700fr] gap-10 lg:gap-16 items-stretch">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[26px] rounded-[28px] bg-white/[0.04] border border-white/[0.12] shadow-[0_20px_60px_rgba(230,26,128,0.02)] p-7 md:p-12"
          >
            {/* Honeypot: campo invisible para humanos; los bots lo rellenan.
                aria-hidden + tabIndex -1 para que no lo toque un usuario real. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
              <label htmlFor="sitio_web_hp">Sitio web</label>
              <input id="sitio_web_hp" name="sitio_web" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-nombre" className={LABEL}>{t('fieldName')}</label>
              <div className="relative">
                <input
                  id="contact-nombre"
                  name="nombre"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t('placeholderName')}
                  className={CONTROL}
                />
                <FieldBorder />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-telefono" className={LABEL}>{t('fieldPhone')}</label>
                <div className="relative">
                  <input
                    id="contact-telefono"
                    name="telefono"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder={t('placeholderPhone')}
                    className={CONTROL}
                  />
                  <FieldBorder />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-empresa" className={LABEL}>{t('fieldCompany')}</label>
                <div className="relative">
                  <input
                    id="contact-empresa"
                    name="apellido"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder={t('placeholderCompany')}
                    className={CONTROL}
                  />
                  <FieldBorder />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className={LABEL}>{t('fieldEmail')}</label>
                <div className="relative">
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={t('placeholderEmail')}
                    className={CONTROL}
                  />
                  <FieldBorder />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-servicio" className={LABEL}>{t('fieldService')}</label>
                <div className="relative">
                  {/* `invalid:` pinta la opción vacía con el gris del placeholder:
                      el select está `required`, así que mientras no se elige nada
                      el control es :invalid. Sin JS ni estado extra. */}
                  <select
                    id="contact-servicio"
                    name="servicio"
                    required
                    defaultValue=""
                    className={`${CONTROL} appearance-none pr-11 cursor-pointer invalid:text-white/35`}
                  >
                    <option value="" disabled>{t('placeholderService')}</option>
                    {SERVICIOS.map((s) => (
                      <option key={s.value} value={s.value} className="bg-[#1B0A22] text-white">
                        {t(s.key)}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 7"
                    className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 w-3 h-[7px]"
                  >
                    <path d="M1 1L6 6L11 1" fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <FieldBorder />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-mensaje" className={LABEL}>{t('fieldMessage')}</label>
              <div className="relative">
                <textarea
                  id="contact-mensaje"
                  name="mensaje"
                  required
                  rows={3}
                  placeholder={t('placeholderMessage')}
                  className={`${CONTROL} h-[100px] resize-none block`}
                />
                <FieldBorder />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full rounded-[30px] py-[18px] bg-gradient-to-r from-[#FF2E88] to-[#A854F7] text-white text-[12.5px] font-bold uppercase tracking-[2px] cursor-pointer transition-all duration-300 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('buttonSending') : t('buttonSend')}
              </button>

              {/* El orb va bajo el botón y no dentro: el botón ya es el
                  degradado de marca, así que un orb rosa encima no se vería. */}
              {loading && (
                <div className="flex justify-center">
                  <BrandOrb state="connecting" size={64} label={t('buttonSending')} />
                </div>
              )}

              {/* El estado del envío se calculaba pero no se pintaba: quien
                  enviaba el formulario no veía ni el éxito ni el error. */}
              {!loading && status.message && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-center text-[13px] ${status.type === 'success' ? 'text-[#FF8BB3]' : 'text-red-400'}`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </form>

          <div
            ref={mapRef}
            className="w-full min-h-[380px] lg:min-h-full relative overflow-hidden border-2 border-white/20 group rounded-[20px] shadow-xl cursor-pointer"
            onClick={() => setIsInteractive(true)}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3044063260063!2d-76.9519657249382!3d-12.09130088814899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c710419b833d%3A0xd38447313365f798!2s3R%20Core%20-%20Agencia%20de%20Marketing!5e0!3m2!1ses-419!2spe!4v1768342086873!5m2!1ses-419!2spe"
              className={`absolute inset-0 w-full h-full opacity-95 transition-all duration-700 ${isInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title={locale === "en" ? "Location map" : "Mapa de ubicación"}
            ></iframe>

            {!isInteractive && (
              <div className=" text-black absolute inset-0 z-10 bg-black/10 flex items-center justify-center group-hover:bg-black/0 transition-all duration-500">
                <span className="bg-white/10 backdrop-blur-md text-black/80 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ">
                  {locale === "en" ? "Click to interact" : "Click para interactuar"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#16021B] via-[#16021B]/50 to-transparent z-[1] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#16021B] via-[#16021B]/50 to-transparent z-[1] pointer-events-none"></div>
    </section>
  );
};

export default ContactForm;
