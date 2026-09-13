'use client';

// Home del rediseño de Aymar (aprobado por el cliente, ago-2026). La sirven
// los tres idiomas desde page.tsx (/en desde el 13-sep-2026, por el plan USA
// de 3R Core). Mismo esqueleto que HomeClient con las secciones v2: hero de
// video, grid de servicios del mercado, portafolio social y reseñas de Google
// tras las novedades.

import TeamSection from '@/components/sections/home/v2/TeamSection'
import ContactAnchor from '@/components/layout/ContactAnchor';
import StatsAndCTA from '@/components/sections/home/v2/CTASection'
import Hero from '@/components/sections/home/v2/Hero'
import ClientSection from '@/components/layout/ClientSection';
import NewsSection from '@/components/sections/home/NewsSection';
import MosaicoParallax from '@/components/sections/home/imagesParallaxSection';
import ContactForm from '@/components/layout/ContactForm';
import ProjectsSection from '@/components/sections/home/v2/ProjectsSection';
import { useScrollToSection } from '@/components/ui/useScrollToSection';

import { useIndividualPageLoader } from '@/components/layout/useIndividualPageLoader'
import { AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/layout/PageLoader';

import ScrollContactBtn from '@/components/ui/ScrollContactBtn'
import ReviewsSection from '@/components/layout/ReviewsSection';
import SocialPortfolio from '@/components/sections/home/v2/SocialPortfolio';

export default function HomeClientV2() {

  useScrollToSection();
  // El cargador ya no espera a los vídeos: el hero pinta su póster al
  // instante y los del portafolio se cargan al llegar a ellos. Esperarlos
  // dejaba al visitante mirando la pantalla de carga los 4 segundos completos.
  const isLoading = useIndividualPageLoader({
    timeout: 2500,
    minLoadingTime: 900,
    checkVideos: false
  });

  return (
    <>
      <AnimatePresence mode="wait">
            {isLoading && <PageLoader key="home-loader" />}
      </AnimatePresence>
      <main>

        <div id="hero">
          <Hero />
        </div>
        <TeamSection />
        <div id="servicios">
          <ProjectsSection />
        </div>
        <StatsAndCTA />
        <MosaicoParallax />
        <ClientSection />
        <SocialPortfolio />
        <NewsSection />
        <ReviewsSection />

        <ContactAnchor>
          <ContactForm />
        </ContactAnchor>
        <ScrollContactBtn />
      </main>
    </>
  );
}
