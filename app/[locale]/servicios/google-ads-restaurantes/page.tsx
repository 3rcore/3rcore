'use client';
import ContactForm from "@/components/layout/ContactForm";
import ContactAnchor from "@/components/layout/ContactAnchor";
import ClientSection from "@/components/layout/ClientSection";
import ReviewsSection from "@/components/layout/ReviewsSection";
import ServiceLanding from "@/components/sections/servicios/generic/ServiceLanding";
import ServiceFAQ from "@/components/seo/ServiceFAQ";
import SEOContentBlock from "@/components/seo/SEOContentBlock";
import SectorAdsGuide from "@/components/seo/SectorAdsGuide";
import { useScrollToSection } from '@/components/ui/useScrollToSection';
import { useTranslations } from 'next-intl';
import { useIndividualPageLoader } from '@/components/layout/useIndividualPageLoader'
import { AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/layout/PageLoader';
import ScrollContactBtn from '@/components/ui/ScrollContactBtn'

export default function GoogleAdsRestaurantes() {
  useScrollToSection();
  const isLoading = useIndividualPageLoader({ timeout: 4000, minLoadingTime: 1200, checkVideos: true });
  const t = useTranslations('GoogleAdsRestaurantesLanding');

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="home-loader" />}
      </AnimatePresence>
      <main>
        <h1 className="sr-only">{t('h1')}</h1>
        <div id="hero">
          <ServiceLanding namespace="GoogleAdsRestaurantesLanding" />
        </div>
        <SectorAdsGuide namespace="GoogleAdsRestaurantesGuia" />
        <ServiceFAQ namespace="GoogleAdsRestaurantesFAQ" count={8} />
        <SEOContentBlock
          namespace="GoogleAdsRestaurantesSEO"
          paragraphs={6}
          relatedLinks={[{ href: "/servicios/google-ads", label: "Gestión de Google Ads" }, { href: "/servicios/seo-para-restaurantes", label: "SEO para restaurantes" }, { href: "/diseno-web-restaurantes-lima", label: "Diseño web para restaurantes" }, { href: "/servicios/meta-ads", label: "Meta Ads" }]}
        />
        <ReviewsSection/>
        <ClientSection />
        <ContactAnchor>
          <ContactForm/>
        </ContactAnchor>
        <ScrollContactBtn />
      </main>
    </>
  );
}
