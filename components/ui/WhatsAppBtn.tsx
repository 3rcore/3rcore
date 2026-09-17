"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { WA_LEADS } from '@/lib/contact';
import { trackConversion } from '@/lib/track';
import { EVENTO_CONSENTIMIENTO, consentimientoResuelto } from '@/lib/cookieConsent';

const WhatsAppBtn = () => {
  const pathname = usePathname() || '';

  // 30-ago-2026. Este botón y el aviso de cookies se pintaban en la misma
  // esquina con la misma capa (z-50), y el verde tapaba entre el 19% y el 37%
  // del botón «Aceptar todas» — medido con navegador a 320, 390, 768 y 1440 px.
  // Quien pulsaba la mitad derecha abría WhatsApp en vez de aceptar, así que no
  // se daba el consentimiento y GA4 y Ads no llegaban a medir esa visita.
  // Mientras el aviso esté en pantalla, el botón se OCULTA. Primero probé a
  // subirlo (bottom-56) y la captura enseñó que entonces tapaba el CTA del hero
  // «Ver servicios» a 320 px: cambiar un solape por otro. El aviso se cierra a
  // la primera interacción, así que esconder el botón unos segundos no cuesta
  // un lead y quita el problema entero.
  // Todo esto lo cazó una CAPTURA, no una medida: ninguna de las dos páginas
  // desbordaba y el auditor las daba por buenas.
  const [avisoAbierto, setAvisoAbierto] = useState(false);
  useEffect(() => {
    const revisar = () => setAvisoAbierto(!consentimientoResuelto());
    revisar();
    window.addEventListener(EVENTO_CONSENTIMIENTO, revisar);
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, revisar);
  }, []);
  // Orden de la pila flotante (sep-2026): WhatsApp arriba y el botón de
  // mensaje debajo, como en el diseño del banner. Antes estaba al revés.
  const phoneNumber = WA_LEADS;
  const message = "Hola vengo de la página web, quiero agendar una reunión.";

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Solo /us y /en montan su propio widget de captura (WhatsAppBtnLanding) en
  // esa esquina; ahí el botón global se oculta para no superponerse. En /es la
  // página de SEO usa el diseño del prototipo (sin ese widget), así que el
  // botón flotante SÍ debe aparecer para no dejar la money page sin CTA fijo.
  if (pathname.includes('/posicionamiento-seo') && !pathname.startsWith('/es/')) return null;

  // Ver arriba: con el aviso de cookies abierto, este botón tapaba el «Aceptar
  // todas» entre un 19% y un 37% según la anchura.
  if (avisoAbierto) return null;

  // WhatsApp es el canal que más leads reales trae — cada clic queda medido en
  // GA4/GTM con la página de origen (antes el botón era invisible en Analytics).
  // Desde ago-2026 pasa por trackConversion: el 63% de las «conversiones» que
  // registraba GA4 eran clics automatizados con 0 s de permanencia (ver
  // lib/track.ts). Un clic sin señales humanas se archiva como
  // `whatsapp_click_bot` y no cuenta como lead.
  const trackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackConversion(
      'whatsapp_click',
      { wa_phone: phoneNumber, wa_source: window.location.pathname },
      e.nativeEvent
    );
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick}
      className="fixed bottom-24 right-6 bg-[#25d366] text-white p-4 rounded-full shadow-lg hover:bg-[#128c7e] hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="white" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.432 5.633 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
};

export default WhatsAppBtn;