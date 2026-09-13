import PizzaCard from "@/components/ui/pizzaCard";
import { useLocale, useTranslations } from "next-intl";

// 13-sep-2026. Plan USA de 3R Core: /en sirve esta misma home en inglés y sin
// referencias a Perú ni Lima (tampoco en los textos alternativos).
const COPY = {
  es: {
    tag: "CASOS",
    line1: "Proyectos con",
    line2: "marca propia",
    desc: "Seis identidades completas del portafolio real. Pasa el cursor para ver la segunda pieza de cada una.",
    alt1: "Diseño de post para redes sociales - portafolio agencia 3R Core Lima",
    alt3: "Grilla editorial de contenidos para redes sociales - agencia 3R Core Lima",
    alt5: "Contenido Instagram diseñado por agencia de social media en Lima - 3R Core",
  },
  en: {
    tag: "OUR WORK",
    line1: "Projects with",
    line2: "their own brand",
    desc: "Six complete identities from our real portfolio. Hover over each one to see its second piece.",
    alt1: "Social media post design - 3R Core agency portfolio",
    alt3: "Editorial content grid for social media - 3R Core agency",
    alt5: "Instagram content designed by the 3R Core social media team",
  },
};

export default function SocialPortfolio() {
  const t = useTranslations('SocialMediaHero');
  const copy = useLocale() === "en" ? COPY.en : COPY.es;

  return (
    <main className="lg:py-10 xl:py-20 px-10 xl:px-4">
      <div className="max-w-6xl 2xl:mx-w-7xl mx-auto">

        {/* Cabecera con el diseño original y las proporciones exactas */}
        <div className="mb-16">
          {/* Tag / Número */}
          <div className="flex items-center gap-4 text-[#FF1A55] text-xs font-semibold tracking-widest uppercase mb-6">
            <span>04</span>
            <div className="w-12 h-[1px] bg-[#FF1A55]"></div>
            <span>{copy.tag}</span>
          </div>

          {/* Título Principal */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter text-white mb-4">
            {copy.line1}{" "}
            <br />
            <span
              className="text-transparent inline-block relative pb-2"
              style={{
                WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.4)',
              }}
            >
              {copy.line2}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#FF1A55]"></span>
            </span>
          </h2>

          {/* Texto Descriptivo */}
          <p className="text-white/60 text-sm md:text-base font-light leading-relaxed max-w-xl">
            {copy.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          <div className="grid gap-6">
            <PizzaCard
              media={[
                { type: "image", src: "/images/social/portafolioProye/img1.webp", alt: copy.alt1 }
              ]}
              showDots={true}
              autoOnHover={false}
              className="aspect-[3/4] transition-all duration-500 ease-in-out"
            />

            <PizzaCard
              media={[
                { type: "video", src: "/videos/AguJuego-lite.mp4", poster: "/videos/AguJuego-poster.webp" },
                { type: "video", src: "/videos/As11-lite.mp4", poster: "/videos/As11-poster.webp" },
              ]}
              autoOnHover={false}
              className="aspect-[3/5] transition-all duration-500 ease-in-out"
            />
          </div>

          <div className="grid gap-6">
            <PizzaCard
              media={[
                { type: "video", src: "/videos/AsDeOros102-lite.mp4", poster: "/videos/AsDeOros102-poster.webp" },
                { type: "video", src: "/videos/Galletas-lite.mp4", poster: "/videos/Galletas-poster.webp" },
              ]}
              autoOnHover={true}
              className="aspect-[3/5] transition-all duration-500 ease-in-out"
            />
            <PizzaCard
              media={[
                { type: "image", src: "/images/social/portafolioProye/img5.webp", alt: copy.alt5 }
              ]}
              autoOnHover={true}
              className="aspect-[3/4] transition-all duration-500 ease-in-out"
            />
          </div>

          <div className="grid gap-6">
            <PizzaCard
              media={[
                { type: "image", src: "/images/social/portafolioProye/img3.webp", alt: copy.alt3 }
              ]}
              autoOnHover={true}
              className="aspect-[3/4] transition-all duration-500 ease-in-out"
            />
            <PizzaCard
              media={[
                { type: "video", src: "/videos/Img3849-lite.mp4", poster: "/videos/Img3849-poster.webp" },
                { type: "video", src: "/videos/Vide5-lite.mp4", poster: "/videos/Vide5-poster.webp" }
              ]}
              autoOnHover={true}
              className="aspect-[3/5] transition-all duration-500 ease-in-out"
            />
          </div>

        </div>
      </div>
    </main>
  );
}
