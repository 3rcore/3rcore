"use client";

import React from 'react';
import { useLocale } from "next-intl";
import ContactMessageIcon from "@/components/ui/ContactMessageIcon";

const ScrollNavBtn = () => {
  const locale = useLocale();
  const isEn = locale === "en";
  // En /en el ancla del formulario es #contact.
  const contactHash = isEn ? "#contact" : "#contacto";
  const label = isEn ? "CONTACT" : "CONTACTO";

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('contacto');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Limpia el hash después de hacer scroll
      setTimeout(() => {
        window.history.replaceState(null, '', window.location.pathname);
      }, 100);
    }
  };

  return (
    // Pastilla del diseño del banner: alto 45, padding 25, degradado
    // #FF2E88 → #A854F7, radio completo y el icono con el texto a su derecha.
    <a
      href={contactHash}
      onClick={scrollToContact}
      className="fixed bottom-6 right-6 z-50 h-[45px] px-[25px] rounded-full
                 flex items-center justify-center gap-[10px]
                 bg-gradient-to-r from-[#FF2E88] to-[#A854F7] text-white
                 shadow-[0_7px_20px_rgba(0,0,0,0.38)]
                 transition-all duration-300 hover:scale-105 hover:brightness-110"
      aria-label={isEn ? "Go to the contact form" : "Ir al formulario de contacto"}
    >
      <ContactMessageIcon className="w-[18px] h-[17px] shrink-0" />
      <span className="text-[13px] font-bold tracking-[1.2px] leading-none">{label}</span>
    </a>
  );
};

export default ScrollNavBtn;
