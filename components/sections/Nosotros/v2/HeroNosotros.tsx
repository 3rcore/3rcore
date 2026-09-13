'use client';

import { useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { WA_LEADS, waUrl } from '@/lib/contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HeroNosotrosProps {
  ready?: boolean;
}

const HeroNosotros = ({ ready = true }: HeroNosotrosProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const bottomArrowRef = useRef<HTMLDivElement>(null);
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      const handleReady = () => setIsVideoLoaded(true);

      video.addEventListener('canplaythrough', handleReady);
      video.addEventListener('loadeddata', handleReady);
      if (video.readyState >= 3) handleReady();

      return () => {
        video.removeEventListener('canplaythrough', handleReady);
        video.removeEventListener('loadeddata', handleReady);
      };
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      const titleWords = gsap.utils.toArray<HTMLElement>('.title-word');
      gsap.set(contentRef.current, { opacity: 1 });
      gsap.set(titleWords, { yPercent: 120 });
      gsap.set(
        [eyebrowRef.current, descRef.current, buttonsRef.current, badgesRef.current],
        { opacity: 0, y: 24 }
      );
      gsap.set([blob1Ref.current, blob2Ref.current], { opacity: 0, scale: 0.7 });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (!ready) return;

      const titleWords = gsap.utils.toArray<HTMLElement>('.title-word');

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: setupScrollTweens,
      });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .to(
          titleWords,
          { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12 },
          0.15
        )
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
        .to(
          buttonsRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.7)' },
          '-=0.45'
        )
        .to(badgesRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.45')
        .to(
          [blob1Ref.current, blob2Ref.current],
          { opacity: 1, scale: 1, duration: 1.4, stagger: 0.2, ease: 'power2.out' },
          '-=1.2'
        );

      gsap.to(blob1Ref.current, {
        x: 40,
        y: -30,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      gsap.to(blob2Ref.current, {
        x: -50,
        y: 25,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });

      gsap.to('.scroll-dot', {
        y: 8,
        duration: 1.4,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
      if (bottomArrowRef.current) {
        gsap.to(bottomArrowRef.current, {
          y: 5,
          opacity: 0.3,
          duration: 1.4,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      function setupScrollTweens() {
        gsap.fromTo(
          [scrollIndicatorRef.current, contentRef.current],
          { opacity: 1, y: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=200',
              scrub: true,
              invalidateOnRefresh: true,
            },
            opacity: 0,
            y: -30,
            ease: 'none',
            overwrite: 'auto',
          }
        );

        if (overlayRef.current) {
          gsap.fromTo(
            overlayRef.current,
            { opacity: 0.4 },
            {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
              opacity: 0.8,
              ease: 'none',
              overwrite: 'auto',
            }
          );
        }

        gsap.to(videoRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          yPercent: 12,
          scale: 1.08,
          ease: 'none',
        });

        ScrollTrigger.refresh();
      }
    },
    { scope: sectionRef, dependencies: [ready] }
  );

  useGSAP(
    () => {
      const setupMagnetic = (el: HTMLElement | null) => {
        if (!el) return;
        const quickX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
        const quickY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });

        const handleMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          quickX(relX * 0.25);
          quickY(relY * 0.35);
        };
        const handleLeave = () => {
          quickX(0);
          quickY(0);
        };

        el.addEventListener('mousemove', handleMove);
        el.addEventListener('mouseleave', handleLeave);
        return () => {
          el.removeEventListener('mousemove', handleMove);
          el.removeEventListener('mouseleave', handleLeave);
        };
      };

      const cleanup1 = setupMagnetic(btn1Ref.current);
      const cleanup2 = setupMagnetic(btn2Ref.current);
      return () => {
        cleanup1?.();
        cleanup2?.();
      };
    },
    { scope: sectionRef }
  );

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen h-dvh w-full overflow-hidden bg-[#050109] flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-opacity duration-1000"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ opacity: isVideoLoaded ? 1 : 0 }}
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
          Tu navegador no soporta videos.
        </video>

        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1a0322] via-[#0a000e] to-[#050109] transition-opacity duration-700"
          style={{ opacity: isVideoLoaded ? 0 : 1 }}
        />

        <div ref={overlayRef} className="absolute inset-0 bg-[#130218] opacity-40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div ref={blob1Ref} className="absolute top-[-10%] right-[5%] w-[300px] md:w-[420px] h-[300px] md:h-[420px] rounded-full bg-[#D11E68]/25 blur-[110px] z-[1] pointer-events-none" />
      <div ref={blob2Ref} className="absolute bottom-[10%] left-[-5%] w-[280px] md:w-[380px] h-[280px] md:h-[380px] rounded-full bg-[#9C27B0]/20 blur-[110px] z-[1] pointer-events-none" />

      <div className="relative z-10 flex items-center h-full mx-auto px-6 sm:px-8 md:px-16 w-full max-w-7xl">
        <div ref={contentRef} className="flex flex-col items-start w-full max-w-4xl md:pt-16 sm:pt-20">
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-3 sm:mb-4">
            <span className="text-white/80 text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase">
              {/* 13-sep-2026. Plan Perú de 3R Core (Piero Roque): «Nosotros» sin
                  referencias locales (Lima, La Molina, facturación peruana,
                  precios); queda el equipo propio y los resultados. */}
              3R CORE • NOSOTROS
            </span>
            <div className="h-[1px] w-12 sm:w-16 bg-white/20"></div>
          </div>

          <div className="relative mb-6 sm:mb-8 w-full">
            <h1 ref={titleWrapRef} className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white tracking-tight pb-2 leading-none">
              <span className="inline-block overflow-hidden align-bottom">
                <span className="title-word inline-block">Un</span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span className="title-word inline-block">equipo</span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-bottom">
                <span className="title-word inline-block">propio</span>
              </span>
            </h1>
            <div className="absolute bottom-[-10px] sm:bottom-[-18px] left-0 h-[3px] w-[100%] bg-gradient-to-r from-[#D11E68] to-[#9C27B0]"></div>
          </div>

          <p ref={descRef} className="text-white text-xs sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 max-w-2xl font-light">
            Diseñamos, programamos y posicionamos con un equipo propio de SEO, SEM
            y Google Ads. Tres generaciones trabajando sobre el mismo objetivo, sin
            intermediarios en tu proyecto.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6 sm:mb-14 w-full sm:w-auto">
            {/* En el diseño original era un <button> sin destino. Va a la línea
                de leads (WA_LEADS) con el mismo evento whatsapp_click que mide
                el botón flotante, para no perder atribución. */}
            <a
              ref={btn1Ref}
              href={waUrl(WA_LEADS, 'Hola vengo de la página web, quiero agendar una reunión.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({
                  event: 'whatsapp_click',
                  wa_phone: WA_LEADS,
                  wa_source: window.location.pathname,
                });
              }}
              className="bg-[#1EB059] hover:bg-[#189349] text-white px-7 py-3 rounded-full text-[10px] md:text-xs font-bold tracking-[0.15em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              AGENDAR UNA REUNIÓN
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>

          <div ref={badgesRef} className="relative w-full">
            <div className="flex flex-wrap gap-2.5 sm:gap-3 relative z-10">
              <div className="border border-white/20 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-xs sm:text-sm text-white/82 font-light">
                <span className="text-[#D11E68]">✓</span> Equipo propio
              </div>
              <div className="border border-white/20 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-xs sm:text-sm text-white/82 font-light">
                <span className="text-[#D11E68]">✓</span> SEO · SEM · Google Ads
              </div>
              <div className="border border-white/20 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-xs sm:text-sm text-white/82 font-light">
                <span className="text-[#D11E68]">✓</span> Resultados medibles
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-2 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer" onClick={handleScrollClick}>
        <div className="flex flex-col items-center gap-2 sm:gap-3 group">
          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
            <div className="relative w-6 h-10 sm:w-7 sm:h-11 border-2 border-white/30 rounded-full flex items-start justify-center p-1 transition-all duration-300 group-hover:border-white group-hover:scale-105">
              <div className="scroll-dot w-1 h-2 sm:h-2.5 bg-white/50 rounded-full group-hover:bg-white"></div>
            </div>
            <span className="text-white/50 text-[10px] font-light tracking-widest uppercase transition-colors group-hover:text-white">
              Scroll
            </span>
          </div>
          <div ref={bottomArrowRef}>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40 transition-colors group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-t from-[#0a000e] via-[#0a000e]/50 to-transparent z-[6] pointer-events-none" />
    </section>
  );
};

export default HeroNosotros;