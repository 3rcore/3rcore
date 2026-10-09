"use client"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { WA_LEADS } from "@/lib/contact"

interface ContentItem {
  title: string
  description: string
}

interface Props {
  namespace: string
}

export default function ServiceLanding({ namespace }: Props) {
  // En /en el ancla del formulario es #contact.
  const contactHash = useLocale() === "en" ? "#contact" : "#contacto";
  const t = useTranslations(namespace)
  const benefits = t.raw("benefits.items") as ContentItem[]
  const steps = t.raw("process.steps") as ContentItem[]

  return (
    <>
      {/* HERO */}
      <section className="relative z-10 overflow-hidden px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1a0320] via-[#130218] to-[#16021B]" />
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/80 text-sm uppercase tracking-widest font-light mb-4">
            {t("hero.badge")}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold italic leading-tight bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
            {t("hero.title")}
          </h2>
          <p className="mt-6 text-gray-300 text-base md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={contactHash}
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#E91E63] to-[#9C27B0] text-white font-semibold hover:opacity-90 transition-all duration-300"
            >
              {t("hero.cta")}
            </a>
            {/* 5-oct-2026: las páginas de sector se reorientan a Google Ads
                (pedido de Piero Roque). Solo pintan el botón de WhatsApp y el
                enlace al servicio si su namespace trae esas claves; el resto de
                páginas que usan este componente no cambia. El wa.me lo captura
                WhatsAppLeadGate (panel propio). */}
            {t.has("hero.waCta") && (
              <a
                href={`https://wa.me/${WA_LEADS}?text=${encodeURIComponent(t("hero.waText"))}`}
                target="_blank"
                rel="noopener"
                className="inline-block px-8 py-3 rounded-full border border-[#E91E63] text-white font-semibold hover:bg-[#E91E63]/20 transition-all duration-300"
              >
                {t("hero.waCta")}
              </a>
            )}
          </div>
          {t.has("hero.serviceLink") && (
            <p className="mt-6 text-sm text-gray-300">
              <Link href="/servicios/google-ads" className="underline underline-offset-4 hover:text-white">
                {t("hero.serviceLink")}
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* INTRO */}
      <section className="relative z-10 px-6 md:px-10 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold italic mb-6 bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
            {t("intro.title")}
          </h2>
          <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-light">
            <p>{t("intro.p1")}</p>
            <p>{t("intro.p2")}</p>
            <p>{t("intro.p3")}</p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative z-10 px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10 border-b border-white/30 pb-6">
            <p className="text-white/80 text-sm uppercase tracking-widest font-light mb-2">
              {t("benefits.badge")}
            </p>
            <h2 className="leading-tight font-bold italic text-3xl md:text-5xl bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
              {t("benefits.title")}
            </h2>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <article key={i} className="group relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-[#130218] m-[1px] rounded-[15px] p-6 h-full">
                  <span className="text-[#E91E63] font-mono text-sm border-b border-[#9C27B0]">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <h3 className="text-white font-semibold text-base md:text-lg mt-3 mb-2 leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative z-10 px-6 md:px-10 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 border-b border-white/30 pb-6">
            <p className="text-white/80 text-sm uppercase tracking-widest font-light mb-2">
              {t("process.badge")}
            </p>
            <h2 className="leading-tight font-bold italic text-3xl md:text-5xl bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
              {t("process.title")}
            </h2>
          </header>
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-[#E91E63] font-mono text-sm border-b border-[#9C27B0] shrink-0 mt-1">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <div>
                  <h3 className="text-white font-semibold text-base md:text-lg mb-1 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
