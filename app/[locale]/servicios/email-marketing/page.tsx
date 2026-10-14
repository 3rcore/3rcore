'use client';
import ContactForm from "@/components/layout/ContactForm";
import ContactAnchor from "@/components/layout/ContactAnchor";
import ClientSection from "@/components/layout/ClientSection";
import ReviewsSection from "@/components/layout/ReviewsSection";
import ServiceLanding from "@/components/sections/servicios/generic/ServiceLanding";
import ServiceFAQ from "@/components/seo/ServiceFAQ";
import SEOContentBlock from "@/components/seo/SEOContentBlock";
import { useScrollToSection } from '@/components/ui/useScrollToSection';
import { useTranslations, useLocale } from 'next-intl';
import LandingSections from "@/components/seo/LandingSections";

import { useIndividualPageLoader } from '@/components/layout/useIndividualPageLoader'
import { AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/layout/PageLoader';

import ScrollContactBtn from '@/components/ui/ScrollContactBtn'

export default function EmailMarketing() {

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
        <h1 className="sr-only">{tH1('emailmarketing')}</h1>
        <div id="hero">
          <ServiceLanding namespace="EmailMarketingLanding" />
        </div>
        {/* 14-oct-2026: sección de compra solo para /es (datos GSC de la ronda seo-leads) */}
        {locale === 'es' && <LandingSections namespace="EmailMarketingMore" />}
        <ServiceFAQ namespace="EmailMarketingFAQ" count={8} />
        <SEOContentBlock
          namespace="EmailMarketingSEO"
          paragraphs={6}
          relatedLinks={[{ href: "/servicios/marketing-ecommerce", label: "Marketing E-commerce" }, { href: "/servicios/performance-marketing", label: "Performance Marketing" }, { href: "/servicios/web-development", label: "Diseño Web" }, { href: "/servicios/socialmedia", label: "Redes Sociales" }]}
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
