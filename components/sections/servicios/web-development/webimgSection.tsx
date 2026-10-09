'use client';
import { playfair as trirong } from "@/lib/fonts"
import { useLocale } from 'next-intl';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);


const WebImgSection = () => {
  const locale = useLocale();
  const imgAlt = locale === "en" ? "Creative process for professional web design and development - 3R Core agency" : "Proceso creativo de diseño y desarrollo web profesional - agencia 3R Core Lima";

  const t = useTranslations('WebHero');
  

  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });


      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' }, 
        { 
          clipPath: 'inset(0% 0% 0% 0%)', 
          duration: 1.5, 
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full text-white py-0 font-sans flex flex-col items-center overflow-hidden">
      <div ref={imageContainerRef} className="w-full h-[25vh] xl:h-[80vh] 2xl:h-[90vh] overflow-hidden">
        <img
          ref={imageRef}
          src="/images/web/fondowoooo.webp"
          alt={imgAlt}
          className="w-full h-full "
        />
      </div>
    </section>
  );
};

export default WebImgSection;