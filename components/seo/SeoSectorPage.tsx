'use client';
import ContactForm from "@/components/layout/ContactForm";
import ContactAnchor from "@/components/layout/ContactAnchor";
import ClientSection from "@/components/layout/ClientSection";
import ReviewsSection from "@/components/layout/ReviewsSection";
import ServiceLanding from "@/components/sections/servicios/generic/ServiceLanding";
import ServiceFAQ from "@/components/seo/ServiceFAQ";
import SEOContentBlock from "@/components/seo/SEOContentBlock";
import SectorSeoGuide from "@/components/seo/SectorSeoGuide";
import { useScrollToSection } from '@/components/ui/useScrollToSection';
import { useTranslations } from 'next-intl';
import ScrollContactBtn from '@/components/ui/ScrollContactBtn'
import type { AppPathname } from '@/i18n/routing';
import { SEO_SECTORES } from '@/lib/seo-sectores';

/** Cuerpo común de las páginas «SEO para <sector>»; el texto es propio de cada una. */
export default function SeoSectorPage({ slug }: { slug: string }) {
  useScrollToSection();
  const sector = SEO_SECTORES[slug];
  const t = useTranslations(sector.ns);
  const faqCount = Object.keys(t.raw('faqs') as Record<string, unknown>).length;

  const related: { href: AppPathname; label: string }[] = [
    { href: '/posicionamiento-seo', label: 'Agencia SEO en Lima' },
    ...(sector.ads ? [sector.ads] : []),
    { href: '/servicios/posicionamiento-ia', label: 'Posicionamiento en IA' },
    { href: '/cuanto-cuesta-el-seo-en-peru', label: 'Cuánto cuesta el SEO en Perú' },
  ];

  return (
    <main>
      <h1 className="sr-only">{t('h1')}</h1>
      <div id="hero">
        <ServiceLanding namespace={sector.ns} />
      </div>
      <SectorSeoGuide namespace={sector.ns} />
      <ServiceFAQ namespace={sector.ns} count={faqCount} />
      <SEOContentBlock namespace={sector.ns} paragraphs={3} relatedLinks={related} />
      <ReviewsSection />
      <ClientSection />
      <ContactAnchor>
        <ContactForm />
      </ContactAnchor>
      <ScrollContactBtn />
    </main>
  );
}
