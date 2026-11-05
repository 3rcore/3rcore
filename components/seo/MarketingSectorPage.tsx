'use client';
import ContactForm from "@/components/layout/ContactForm";
import ContactAnchor from "@/components/layout/ContactAnchor";
import ClientSection from "@/components/layout/ClientSection";
import ReviewsSection from "@/components/layout/ReviewsSection";
import ServiceLanding from "@/components/sections/servicios/generic/ServiceLanding";
import ServiceFAQ from "@/components/seo/ServiceFAQ";
import SEOContentBlock from "@/components/seo/SEOContentBlock";
import SectorSeoGuide from "@/components/seo/SectorSeoGuide";
import PillarWaCapture from "@/components/ui/PillarWaCapture";
import ScrollContactBtn from '@/components/ui/ScrollContactBtn';
import { useScrollToSection } from '@/components/ui/useScrollToSection';
import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/navigation";
import type { AppPathname } from '@/i18n/routing';

type Enlace = { href: AppPathname; label: string };

export interface MarketingSectorPageProps {
  ns: string
  servicioForm: string
  seo?: Enlace
  ads?: Enlace
  extra?: Enlace[]
}

/**
 * 5-nov-2026. Cuerpo de las páginas «Marketing digital para <sector>» (/es).
 * El texto es propio de cada sector (lib/marketing-sectores/data/); aquí solo
 * va el orden de las secciones y los dos caminos de lead medidos en el panel:
 * el formulario de WhatsApp (PillarWaCapture → /api/wa-lead) y ContactForm.
 */
export default function MarketingSectorPage({ ns, servicioForm, seo, ads, extra = [] }: MarketingSectorPageProps) {
  useScrollToSection();
  const t = useTranslations(ns);
  const faqCount = Object.keys(t.raw('faqs') as Record<string, unknown>).length;

  // Ida y vuelta con las páginas del mismo sector por canal.
  const porCanal = [seo, ads].filter(Boolean) as Enlace[];
  const related: Enlace[] = [
    ...porCanal,
    ...extra,
    { href: '/servicios', label: 'Todos los servicios' },
  ];

  return (
    <main>
      <h1 className="sr-only">{t('h1')}</h1>
      <div id="hero">
        <ServiceLanding namespace={ns} />
      </div>

      <section className="relative z-10 px-6 md:px-10 py-12" aria-label="Cotiza por WhatsApp">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-white text-lg md:text-2xl font-semibold mb-6">
            Cuéntanos de tu negocio y te respondemos por WhatsApp
          </p>
          <PillarWaCapture locale="es" service={servicioForm} />
        </div>
      </section>

      <SectorSeoGuide namespace={ns} />

      {porCanal.length > 0 && (
        <section className="relative z-10 px-6 md:px-10 py-10">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Cada canal, en detalle</h2>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-4">
              Esta página explica cómo se combinan los canales. Si ya sabes cuál necesitas, aquí está el detalle de cada uno para tu sector:
            </p>
            <ul className="flex flex-col sm:flex-row gap-3">
              {porCanal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block min-h-[44px] px-5 py-3 rounded-full border border-[#E91E63] text-white hover:bg-[#E91E63]/20 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ServiceFAQ namespace={ns} count={faqCount} />
      <SEOContentBlock namespace={ns} paragraphs={3} relatedLinks={related} />
      <ReviewsSection />
      <ClientSection />
      <ContactAnchor>
        <ContactForm />
      </ContactAnchor>
      <ScrollContactBtn />
    </main>
  );
}
