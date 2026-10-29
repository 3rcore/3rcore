"use client";
import { montserrat, playfair, josefin,poppins} from "@/lib/fonts";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const TeamSection = () => {
  const t = useTranslations('TeamSection');
  const containerRef = useRef(null);

  const titleWords = t('title').split(" ");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", 
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".title-word-anim", {
      y: 20, opacity: 0, filter: "blur(5px)", stagger: 0.1, duration: 1, ease: "power3.out"
    })
    .from(".team-subtitle", {
      y: 20, opacity: 0, filter: "blur(8px)", duration: 1, ease: "power2.out"
    }, "-=0.6") 
    .from(".team-line", {
      scaleX: 0, opacity: 0, duration: 1.2, ease: "power3.inOut"
    }, "-=0.8")
    .from(".team-desc", {
      opacity: 0, y: 15, duration: 0.8, ease: "power1.out"
    }, "-=0.8"); 

  }, { scope: containerRef });
  return (
    <section ref={containerRef} className="relative w-full pt-8 md:pt-10 pb-6 md:pb-8 px-5 flex justify-center items-center overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
        
        <h2 className={`team-title ${playfair.className} italic font-light text-white text-4xl sm:text-5xl md:text-5xl lg:text-6xl mb-2 tracking-wide leading-tight`}>
          <span className="sr-only">{t('title')}</span>
          <span aria-hidden="true">
            {titleWords.map((word, index) => (
              <span key={index} className="title-word-anim inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </span>
        </h2>

        <h3 className={`team-subtitle ${poppins.className} text-[#D11E68] font-medium text-4xl sm:text-5xl md:text-5xl lg:text-6xl mb-8 tracking-wide will-change-transform`}>
          {t('subtitle')}
        </h3>

        <div className="team-line w-full max-w-5xl mx-auto h-[2px] bg-white/40 mb-8 origin-center will-change-transform"></div>

        <p className={`team-desc ${josefin.className} text-white font-light text-sm md:text-base lg:text-[1.6rem] leading-relaxed max-w-7xl mx-auto`}>
          {t('descriptionV2')}
        </p>

      </div>
    </section>
  );
};

export default TeamSection;