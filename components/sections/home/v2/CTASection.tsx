"use client";
import { playfair as trirong, poppins } from "@/lib/fonts";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

// Catálogo completo del carrusel: lo sigue usando /us.
const servicesList = [
  "Páginas web",
  "Tiendas virtuales",
  "Posicionamiento SEO",
  "Google Ads",
  "Redes sociales",
  "Branding",
  "Relaciones públicas",
  "Influencer marketing",
  "Contenido UGC"
];

// 13-sep-2026. Planes de reposicionamiento de 3R Core (Piero Roque): el home
// de /es habla solo de los cuatro servicios que se venden en Perú y el de /en
// de los tres de EE. UU., en inglés.
const SERVICES_BY_LOCALE: Record<string, string[]> = {
  es: ["Google Ads", "Posicionamiento SEO", "Desarrollo web", "Social Media"],
  en: ["SEO", "Web Development", "Online Stores"],
};

const StatsAndMarquee = () => {
  const t = useTranslations("CTA");
  const locale = useLocale();
  const marqueeServices = SERVICES_BY_LOCALE[locale] ?? servicesList;

  // ✅ Cifras confirmadas por el cliente el 31-ago-2026: +1000 marcas,
  // +3 países, +5 años. Deben coincidir con components/sections/home/CTASection.tsx
  // (la variante de la home anterior): dos portadas de la misma web no pueden
  // dar números distintos. El «+» iba solo en el primero; ahora va en los tres,
  // porque las tres cifras son mínimos, no exactos.
  const stats = [
    { id: 1, endValue: 1000, label: t("labelClients"), prefix: "+" },
    { id: 2, endValue: 5, label: t("labelExperience"), prefix: "+" },
    { id: 3, endValue: 3, label: t("labelCountries"), prefix: "+" },
  ];

  const containerRef = useRef(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.from(".stat-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
        },
      });

      // Animación de los contadores numéricos
      stats.forEach((stat, index) => {
        const element = numbersRef.current[index];
        if (!element) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.endValue,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stats-container", start: "top 85%" },
          onUpdate: () => {
            element.textContent = Math.ceil(counter.val).toString();
          },
        });
      });
    },
    { scope: containerRef }
  );

  const marqueeItems = [...marqueeServices, ...marqueeServices, ...marqueeServices, ...marqueeServices];

  return (
    <section
      ref={containerRef}
      className="w-full py-12 lg:py-20 flex flex-col items-center gap-16 lg:gap-24 overflow-hidden "
    >
      <style jsx>{`
        .stroke-text {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.3);
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scrollMarquee 40s linear infinite;
        }
        @keyframes scrollMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* CARRUSEL INFINITO SUPERIOR */}
      <div className="w-full overflow-hidden whitespace-nowrap flex items-center py-4">
        <div className="animate-marquee items-center">
          {marqueeItems.map((service, index) => (
            <div key={index} className="flex items-center">
              <span
                className={`text-4xl md:text-5xl lg:text-6xl font-bold px-4 md:px-8 tracking-tighter ${
                  index % 2 === 0 ? "text-white" : "stroke-text"
                }`}
              >
                {service}
              </span>
              <span className="text-[#f4266e] text-2xl md:text-3xl px-2 md:px-4">
                •
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENEDOR DE ESTADÍSTICAS */}
      <div className="stats-container flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24 lg:gap-40 w-full max-w-7xl px-8">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className="stat-item text-center flex flex-col items-center"
          >
            <div
              className={`text-[#D11E68] text-6xl md:text-7xl lg:text-8xl ${trirong.className} italic font-bold mb-4`}
            >
              {stat.prefix && <span>{stat.prefix}</span>}
              <span
                ref={(el) => {
                  if (el) numbersRef.current[index] = el;
                }}
              >
                {stat.endValue}
              </span>
            </div>
            <p
              className={`text-white text-xs lg:text-sm tracking-[0.2em] font-medium ${poppins.className} opacity-80 uppercase`}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsAndMarquee;
