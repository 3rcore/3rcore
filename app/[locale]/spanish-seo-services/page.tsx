'use client';
import ContactForm from "@/components/layout/ContactForm";
import ContactAnchor from "@/components/layout/ContactAnchor";
import ClientSection from "@/components/layout/ClientSection";
import ReviewsSection from "@/components/layout/ReviewsSection";
import ServiceLanding from "@/components/sections/servicios/generic/ServiceLanding";
import ServiceFAQ from "@/components/seo/ServiceFAQ";
import SEOContentBlock from "@/components/seo/SEOContentBlock";
import LandingSections from "@/components/seo/LandingSections";
import { useScrollToSection } from '@/components/ui/useScrollToSection';
import { useTranslations } from 'next-intl';

import { useIndividualPageLoader } from '@/components/layout/useIndividualPageLoader'
import { AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/layout/PageLoader';

import ScrollContactBtn from '@/components/ui/ScrollContactBtn'

export default function SpanishSeoServices() {

  useScrollToSection();
  const isLoading = useIndividualPageLoader({
      timeout: 4000,
      minLoadingTime: 1200,
      checkVideos: true
    });
  const tH1 = useTranslations('HiddenH1');

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="spanish-seo-services-loader" />}
      </AnimatePresence>
      <main>
        <h1 className="sr-only">{tH1('spanishseo')}</h1>
        <div id="hero">
          <ServiceLanding namespace="SpanishSeoLanding" />
        </div>
        <LandingSections namespace="SpanishSeoMore" />
        <ServiceFAQ namespace="SpanishSeoFAQ" count={11} />
        <SEOContentBlock
          namespace="SpanishSeoSEO"
          paragraphs={6}
          relatedLinks={[{ href: "/bilingual-website-design", label: "Bilingual Website Design" }, { href: "/seo-for-hispanic-businesses", label: "SEO for Hispanic Businesses" }, { href: "/posicionamiento-seo", label: "SEO" }, { href: "/servicios/web-development", label: "Web Development" }, { href: "/precios", label: "Pricing" }, { href: "/blogs", label: "Blog" }]}
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
