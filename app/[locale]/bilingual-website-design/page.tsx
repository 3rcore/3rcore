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

// Misma estructura que /en/spanish-seo-services y /en/hispanic-marketing-agency.
export default function BilingualWebsiteDesign() {

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
        {isLoading && <PageLoader key="bilingual-website-design-loader" />}
      </AnimatePresence>
      <main>
        <h1 className="sr-only">{tH1('bilingualweb')}</h1>
        <div id="hero">
          <ServiceLanding namespace="BilingualWebLanding" />
        </div>
        <LandingSections namespace="BilingualWebMore" />
        <ServiceFAQ namespace="BilingualWebFAQ" count={8} />
        <SEOContentBlock
          namespace="BilingualWebSEO"
          paragraphs={5}
          relatedLinks={[{ href: "/spanish-seo-services", label: "Spanish SEO Services" }, { href: "/seo-for-hispanic-businesses", label: "SEO for Hispanic Businesses" }, { href: "/servicios/web-development", label: "Web Development" }, { href: "/tiendas-virtuales-lima", label: "Online Stores" }, { href: "/website-cost-calculator", label: "Website Cost Calculator" }, { href: "/precios", label: "Pricing" }]}
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
