'use client';
import ContactForm from "@/components/layout/ContactForm";
import ContactAnchor from "@/components/layout/ContactAnchor";
import ClientSection from "@/components/layout/ClientSection";
import ReviewsSection from "@/components/layout/ReviewsSection";
import ServiceLanding from "@/components/sections/servicios/generic/ServiceLanding";
import ServiceFAQ from "@/components/seo/ServiceFAQ";
import SectorAdsGuide from "@/components/seo/SectorAdsGuide";
import SEOContentBlock from "@/components/seo/SEOContentBlock";
import { useScrollToSection } from '@/components/ui/useScrollToSection';
import { useLocale, useTranslations } from 'next-intl';

import { useIndividualPageLoader } from '@/components/layout/useIndividualPageLoader'
import { AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/layout/PageLoader';

import ScrollContactBtn from '@/components/ui/ScrollContactBtn'

export default function MarketingClinicasDentales() {

  useScrollToSection();
  const isLoading = useIndividualPageLoader({
      timeout: 4000,
      minLoadingTime: 1200,
      checkVideos: true
    });
  const tH1 = useTranslations('HiddenH1');
  // La guía del sector (11-oct-2026) solo existe en /es.
  const locale = useLocale();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="home-loader" />}
      </AnimatePresence>
      <main>
        <h1 className="sr-only">{tH1('clinicasdentales')}</h1>
        <div id="hero">
          <ServiceLanding namespace="MarketingClinicasDentalesLanding" />
        </div>
        {locale === "es" && <SectorAdsGuide namespace="MarketingClinicasDentalesGuia" />}
        <ServiceFAQ namespace="MarketingClinicasDentalesFAQ" count={8} />
        <SEOContentBlock
          namespace="MarketingClinicasDentalesSEO"
          paragraphs={6}
          relatedLinks={[{ href: "/servicios/google-ads", label: "Gestión de Google Ads" }, { href: "/servicios/seo-para-dentistas", label: "SEO para dentistas" }, { href: "/servicios/marketing-clinicas", label: "Marketing para Clínicas" }, { href: "/posicionamiento-seo", label: "SEO Local" }, { href: "/servicios/web-development", label: "Landing Pages" }]}
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
