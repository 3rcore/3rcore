"use client"
import { useTranslations } from "next-intl"
import type { AppPathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing"

interface ServiceLink {
  title: string
  description: string
  href: AppPathname
}

export default function MoreServicesSection() {
  const t = useTranslations("MoreServices")
  const items = t.raw("items") as ServiceLink[]

  return (
    <section className="relative z-10 px-6 md:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b border-white/30 pb-6">
          <p className="text-[#d11e68] text-sm uppercase tracking-widest font-medium mb-2">
            {t("badge")}
          </p>
          <h2 className="leading-tight font-bold italic text-3xl md:text-5xl bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
            {t("title")}
          </h2>
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group relative overflow-hidden rounded-2xl block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-[#130218] m-[1px] rounded-[15px] p-6 h-full">
                <h3 className="text-white font-semibold text-base md:text-lg mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
                <span className="inline-block mt-4 text-[#E91E63] text-sm font-medium">
                  {t("cta")} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
