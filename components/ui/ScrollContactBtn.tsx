"use client";

import React from 'react';
import { useLocale } from "next-intl";
import ContactMessageIcon from "@/components/ui/ContactMessageIcon";

const ScrollNavBtn = () => {
  // En /en el ancla del formulario es #contact.
  const contactHash = useLocale() === "en" ? "#contact" : "#contacto";
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
    <a
      href={contactHash} 
      onClick={scrollToContact} 
      className="fixed bottom-6 right-6 w-13 h-13 rounded-full z-50 flex items-center justify-center 
                 transition-all duration-500 ease-in-out border border-transparent
                 shadow-[0_8px_30px_rgb(233,30,99,0.3)]
                 animate-pulse-slow group
                 bg-gradient-to-br from-[#E91E63] to-[#9C27B0] text-white
                 hover:scale-110 hover:bg-none hover:bg-transparent hover:border-[#E91E63] hover:text-[#E91E63]"
      aria-label="Ir a contacto"
    >
      <div className="relative w-7 h-7 flex items-center justify-center">
        <ContactMessageIcon className="w-[22px] h-[21px]" />
      </div>
    </a>
  );
};

export default ScrollNavBtn;