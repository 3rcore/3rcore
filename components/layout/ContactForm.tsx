"use client";
import { montserrat } from "@/lib/fonts"

import { useEffect, useRef, useState } from "react"; 
import { useTranslations, useLocale } from "next-intl"



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
      className={`${montserrat.className} py-12 relative w-full lg:py-10 2xl:py-15 flex flex-col justify-center items-center overflow-hidden `}
      style={{
        backgroundImage: "url('/images/Formulario/wmremove-transformed-8-1-1.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[#130218]/80 z-0"></div>

      <div className="relative z-10 w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-10 lg:px-15">
        <h2 className="text-white text-center text-2xl md:text-3xl tracking-[0.1em] uppercase mb-16">
          <span style={{ 
                  backgroundColor: '#A21F8A', 
                  padding: '5px 10px', 
                  borderRadius: '2px' 
                }}>
            {t('title')}
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 w-full">
              {/* Honeypot: campo invisible para humanos; los bots lo rellenan.
                  aria-hidden + tabIndex -1 para que no lo toque un usuario real. */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
                <label htmlFor="sitio_web_hp">Sitio web</label>
                <input id="sitio_web_hp" name="sitio_web" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col gap-2 relative group/field">
                <label className="text-white text-[10px] uppercase tracking-widest">{t('fieldName')}</label>
                <input name="nombre" required type="text" className="bg-transparent border-b border-white/30 py-2 text-white focus:outline-none transition-colors peer" />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-all duration-500 peer-focus:w-full"></span>
              </div>

              <div className="flex flex-col gap-2 relative group/field">
                <label className="text-white text-[10px] uppercase tracking-widest">{t('fieldCompany')}</label>
                <input name="apellido" required type="text" className="bg-transparent border-b border-white/30 py-2 text-white focus:outline-none transition-colors peer" />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-all duration-500 peer-focus:w-full"></span>
              </div>

              <div className="flex flex-col gap-2 relative group/field">
                <label className="text-white text-[10px] uppercase tracking-widest">{t('fieldPhone')}</label>
                <input name="telefono" required type="tel" className="bg-transparent border-b border-white/30 py-2 text-white focus:outline-none transition-colors peer" />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-all duration-500 peer-focus:w-full"></span>
              </div>

              <div className="flex flex-col gap-2 relative group/field">
                <label className="text-white text-[10px] uppercase tracking-widest">{t('fieldEmail')}</label>
                <input name="email" required type="email" className="bg-transparent border-b border-white/30 py-2 text-white focus:outline-none transition-colors peer" />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-all duration-500 peer-focus:w-full"></span>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2 relative group/field">
                <label className="text-white text-[10px] uppercase tracking-widest">{t('fieldMessage')}</label>
                <textarea name="mensaje" required rows={1} className="bg-transparent border-b border-white/30 py-2 text-white focus:outline-none transition-colors resize-none peer" />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-all duration-500 peer-focus:w-full"></span>
              </div>
              
              <div className="md:col-span-2 flex flex-col gap-4 mt-6">
                <button 
                  disabled={loading} 
                  type="submit" 
                  className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 border border-white/20 rounded-[15px] group/btn hover:border-transparent cursor-pointer text-white disabled:opacity-50"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-transform duration-300 ease-out -translate-x-[101%] group-hover/btn:translate-x-0"></span>
                  <span className="relative z-10">{loading ? t('buttonSending') : t('buttonSend')}</span>
                </button>
              </div>
            </form>
          </div>

          <div 
            ref={mapRef}
            className="w-full lg:h-[300px] 2xl:h-[400px] min-h-[500px] relative overflow-hidden border-2 border-white/20 group rounded-[20px] shadow-xl cursor-pointer"
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