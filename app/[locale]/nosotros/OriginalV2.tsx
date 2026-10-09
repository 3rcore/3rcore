"use client"

// Nosotros del rediseño de Aymar (aprobado por el cliente, ago-2026). Solo lo
// sirve /es desde page.tsx; /en y /us conservan Original. Es el mismo esqueleto
// que Original con las secciones v2 (hero de video + textos consolidados) y sin
// las tarjetas arrastrables de Activities, que el rediseño elimina.
import ContactForm from "@/components/layout/ContactForm";
import ContactAnchor from "@/components/layout/ContactAnchor";
import Founders from "@/components/sections/Nosotros/Founders";
import Gallery from "@/components/sections/Nosotros/v2/Gallery";
import HeroNosotros from "@/components/sections/Nosotros/v2/HeroNosotros";
import NosotrosSection from "@/components/sections/Nosotros/v2/NosotrosSection";
import Team from "@/components/sections/Nosotros/Team";
import MetodoNosotros from "@/components/sections/Nosotros/v2/MetodoNosotros";

import ScrollContactBtn from '@/components/ui/ScrollContactBtn'
import { AnimatePresence } from "framer-motion";
import PageLoader from "@/components/layout/PageLoader";
import { useIndividualPageLoader } from "@/components/layout/useIndividualPageLoader";

export default function NosotrosV2() {
  const isLoading = useIndividualPageLoader({
      timeout: 4000,
      minLoadingTime: 1200,
      checkVideos: true
    });
  return (
    <>
    <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="home-loader" />}
    </AnimatePresence>
    <main>
      <div id="hero">
        <HeroNosotros />
      </div>
      <NosotrosSection />
      <MetodoNosotros />
      <Founders />
      <Team />
      <Gallery/>
      <ContactAnchor>
        <ContactForm/>
      </ContactAnchor>
      <ScrollContactBtn />
    </main>
    </>
  );
}
