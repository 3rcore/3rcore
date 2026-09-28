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

export default function HispanicMarketingAgency() {

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
        {isLoading && <PageLoader key="hispanic-marketing-agency-loader" />}
      </AnimatePresence>
      <main>
        <h1 className="sr-only">{tH1('hispanic')}</h1>
        <div id="hero">
          <ServiceLanding namespace="HispanicLanding" />
        </div>
        <LandingSections namespace="HispanicMore" />
        <ServiceFAQ namespace="HispanicFAQ" count={8} />
        <SEOContentBlock
          namespace="HispanicSEO"
          paragraphs={6}
          relatedLinks={[{ href: "/bilingual-website-design", label: "Bilingual Website Design" }, { href: "/seo-for-hispanic-businesses", label: "SEO for Hispanic Businesses" }, { href: "/spanish-seo-services", label: "Spanish SEO Services" }, { href: "/posicionamiento-seo", label: "SEO" }, { href: "/servicios/web-development", label: "Web Development" }, { href: "/tiendas-virtuales-lima", label: "Online Stores" }, { href: "/precios", label: "Pricing" }]}
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
