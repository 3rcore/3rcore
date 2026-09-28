import { Link } from "@/i18n/routing"
import { setRequestLocale } from "next-intl/server"
import WebsiteCostCalculator from "@/components/cotizador/WebsiteCostCalculator"
import { CALCULATOR_FAQ, SECTIONS } from "./content"

// Mismo marco visual que /en/quote (fondo #0D0010, degradado magenta).
export default async function WebsiteCostCalculatorPage({ params }: { params: any }) {
  const { locale } = await params
  // Renderizado estático (ver app/[locale]/layout.tsx).
  setRequestLocale(locale)

  return (
    <main className="min-h-screen bg-[#0D0010] text-white overflow-x-hidden">
      <section className="relative z-10 px-6 md:px-12 pt-32 md:pt-36 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#E91E63] font-medium mb-4">Website cost calculator · 3R Core</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight max-w-3xl mb-4">
            Small business website cost calculator
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-3xl mb-3">
            A small business website with 3R Core costs from $850 for a landing page, $1,200 to $2,400 for a corporate site of five to eight sections, and from $1,750 for an online store. Pick your site type, pages and languages to see which band your project falls into.
          </p>
          <p className="text-white/45 text-xs md:text-sm max-w-3xl mb-12">
            Reference prices in U.S. dollars. Figures shown are for reference only.
          </p>
          <WebsiteCostCalculator />
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold italic mb-6 leading-tight bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
            Reference website prices at a glance
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/15">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="bg-white/5">
                  <th scope="col" className="px-4 py-3 font-semibold">Type of site</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Reference price (USD)</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Typical timeline</th>
                </tr>
              </thead>
              <tbody className="text-white/70 font-light">
                <tr className="border-t border-white/10"><th scope="row" className="px-4 py-3 font-semibold text-white">Landing page</th><td className="px-4 py-3">From $850</td><td className="px-4 py-3">2 to 3 weeks</td></tr>
                <tr className="border-t border-white/10"><th scope="row" className="px-4 py-3 font-semibold text-white">Corporate site, 5 to 8 sections</th><td className="px-4 py-3">$1,200 to $2,400</td><td className="px-4 py-3">4 to 6 weeks</td></tr>
                <tr className="border-t border-white/10"><th scope="row" className="px-4 py-3 font-semibold text-white">Online store (Shopify or WooCommerce)</th><td className="px-4 py-3">From $1,750</td><td className="px-4 py-3">6 to 10 weeks</td></tr>
                <tr className="border-t border-white/10"><th scope="row" className="px-4 py-3 font-semibold text-white">Monthly SEO (optional)</th><td className="px-4 py-3">$500 per month</td><td className="px-4 py-3">First movement in months 2 to 3</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-white/50 text-xs md:text-sm italic">Figures shown are for reference only. The exact figure comes in a written quote.</p>
        </div>
      </section>

      {SECTIONS.map((s) => (
        <section key={s.title} className="relative z-10 px-6 md:px-12 py-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold italic mb-6 leading-tight bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
              {s.title}
            </h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="text-gray-300 text-sm md:text-base leading-relaxed font-light mb-4">{p}</p>
            ))}
            {s.bullets && (
              <ul className="space-y-3">
                {s.bullets.map((b, i) => (
                  <li key={b} className="flex gap-3 text-gray-300 text-sm md:text-base font-light leading-relaxed">
                    <span className="text-[#E91E63] font-mono shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section className="relative z-10 px-6 md:px-12 py-10">
        <div className="max-w-4xl mx-auto space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-light">
          <h2 className="text-2xl md:text-4xl font-bold italic mb-6 leading-tight bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
            Compare with market prices
          </h2>
          <p>
            These are our prices, not the whole market. For what freelancers, agencies and site builders charge, and the yearly costs after launch, read our{" "}
            <Link href={{ pathname: "/blogs/[slug]", params: { slug: "how-much-does-a-small-business-website-cost" } }} className="text-white underline decoration-[#E91E63] underline-offset-4 hover:text-[#E91E63]">
              small business website cost guide
            </Link>
            .
          </p>
          <p>
            Need the site in English and Spanish? See{" "}
            <Link href="/bilingual-website-design" className="text-white underline decoration-[#E91E63] underline-offset-4 hover:text-[#E91E63]">bilingual website design</Link>
            . Every package and plan is listed on our{" "}
            <Link href="/precios" className="text-white underline decoration-[#E91E63] underline-offset-4 hover:text-[#E91E63]">pricing page</Link>
            .
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-12 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold italic mb-8 leading-tight bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
            Website cost, frequently asked questions
          </h2>
          <div className="space-y-4">
            {CALCULATOR_FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <summary className="cursor-pointer list-none font-semibold text-base md:text-lg flex justify-between items-center gap-4">
                  <h3 className="text-base md:text-lg font-semibold">{f.q}</h3>
                  <span className="text-white/40 group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="text-white/70 mt-4 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-12 pt-6 pb-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Want an exact figure?</h2>
          <p className="text-white/70 mb-8">Tell us what you need and we send a written quote with the scope itemized, before any work starts.</p>
          <Link
            href="/cotizar"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#E91E63] to-[#9C27B0] text-white font-semibold hover:opacity-90 transition"
          >
            Get a detailed quote
          </Link>
        </div>
      </section>
    </main>
  )
}
