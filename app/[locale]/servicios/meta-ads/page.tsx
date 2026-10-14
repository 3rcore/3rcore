'use client';
import ContactForm from "@/components/layout/ContactForm";
import ContactAnchor from "@/components/layout/ContactAnchor";
import ClientSection from "@/components/layout/ClientSection";
import ReviewsSection from "@/components/layout/ReviewsSection";
import ServiceLanding from "@/components/sections/servicios/generic/ServiceLanding";
import ServiceFAQ from "@/components/seo/ServiceFAQ";
import SEOContentBlock from "@/components/seo/SEOContentBlock";
import { useScrollToSection } from '@/components/ui/useScrollToSection';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import MetaAdsExtra from "@/components/sections/servicios/meta-ads/MetaAdsExtra";

import { useIndividualPageLoader } from '@/components/layout/useIndividualPageLoader'
import { AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/layout/PageLoader';

import ScrollContactBtn from '@/components/ui/ScrollContactBtn'

export default function MetaAds() {

  useScrollToSection();
  const isLoading = useIndividualPageLoader({
      timeout: 4000,
      minLoadingTime: 1200,
      checkVideos: true
    });
  const tH1 = useTranslations('HiddenH1');
  const locale = useLocale();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="home-loader" />}
      </AnimatePresence>
      <main>
        <h1 className="sr-only">{tH1('metaads')}</h1>
        <div id="hero">
          <ServiceLanding namespace="MetaAdsLanding" />
        </div>
        {locale === 'es' && <MetaAdsExtra />}
        <ServiceFAQ namespace="MetaAdsFAQ" count={8} />
        <SEOContentBlock
          namespace="MetaAdsSEO"
          paragraphs={6}
          relatedLinks={[{ href: "/servicios/google-ads", label: "Google Ads" }, { href: "/servicios/tiktok-ads", label: "TikTok Ads" }, { href: "/servicios/performance-marketing", label: "Performance Marketing" }, { href: "/servicios/socialmedia", label: "Redes Sociales" }]}
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
