import PizzaCard from "@/components/ui/pizzaCard";
import { useLocale, useTranslations } from "next-intl";

export default function SocialPortfolio() {

  const t = useTranslations('SocialMediaHero');
  // 13-sep-2026. Plan USA: en /en los textos alternativos no nombran Lima.
  const isEn = useLocale() === "en";
  
  return (
    <main className="lg:py-10 xl:py-20 px-10 xl:px-4">
      <div className="max-w-6xl 2xl:mx-w-7xl mx-auto">
        <h2 className="text-white text-center text-lg tracking-[0.3em] uppercase mb-12 ">
          <span style={{ 
                  backgroundColor: '#A21F8A', 
                  padding: '2px 10px', 
                  borderRadius: '2px' 
                }}>
                { t('titPost')}
          </span>
          
          <div className="w-[60%] h-[1px] bg-white/80 mx-auto mt-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          <div className="grid gap-6">
            <PizzaCard
              media={[
                { type: "image", src: "/images/social/portafolioProye/img1.webp", alt: isEn ? "Social media post design - 3R Core agency portfolio" : "Diseño de post para redes sociales - portafolio agencia 3R Core Lima" }
              ]}
              showDots={true}
              autoOnHover={false}
              className="aspect-[3/4] transition-all duration-500 ease-in-out"
            />

            <PizzaCard
              media={[
                { type: "video", src: "/videos/AguJuego.webm" },
                { type: "video", src: "/videos/As11.webm" },
              ]}
              autoOnHover={false}
              className="aspect-[3/5]  transition-all duration-500 ease-in-out"
            />
          </div>

          <div className="grid gap-6">
            <PizzaCard
              media={[
                { type: "video", src: "/videos/AsDeOros102.webm" },
                { type: "video", src: "/videos/Galletas.webm" },
              ]}
              autoOnHover={true}
              className="aspect-[3/5]  transition-all duration-500 ease-in-out"
            />
            <PizzaCard
              media={[
                { type: "image", src: "/images/social/portafolioProye/img5.webp", alt: isEn ? "Instagram content designed by the 3R Core social media team" : "Contenido Instagram diseñado por agencia de social media en Lima - 3R Core" }
              ]}
              autoOnHover={true}
              className="aspect-[3/4] transition-all duration-500 ease-in-out"
            />
          </div>

          <div className="grid gap-6">
            <PizzaCard
              media={[
                { type: "image", src: "/images/social/portafolioProye/img3.webp", alt: isEn ? "Editorial content grid for social media - 3R Core agency" : "Grilla editorial de contenidos para redes sociales - agencia 3R Core Lima" }
              ]}
              autoOnHover={true}
              className="aspect-[3/4] transition-all duration-500 ease-in-out"
            />
            <PizzaCard
              media={[
                { type: "video", src: "/videos/Img3849.webm" },
                { type: "video", src: "/videos/Vide5.webm" }
              ]}
              autoOnHover={true}
              className="aspect-[3/5]  transition-all duration-500 ease-in-out"
            />
          </div>

        </div>
      </div>
    </main>
  );
}