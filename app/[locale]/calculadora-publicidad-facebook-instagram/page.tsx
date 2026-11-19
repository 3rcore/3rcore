import { Link } from "@/i18n/routing"
import { setRequestLocale } from "next-intl/server"
import MetaAdsBudgetCalculator from "@/components/cotizador/MetaAdsBudgetCalculator"
import { CALC_FAQ } from "./content"

// Mismo marco visual que /en/website-cost-calculator.
export default async function CalculadoraMetaPage({ params }: { params: any }) {
  const { locale } = await params
  setRequestLocale(locale)

  const enlace = "text-white underline decoration-[#E91E63] underline-offset-4 hover:text-[#E91E63]"
  const h2 = "text-2xl md:text-4xl font-bold mb-6 leading-tight"

  return (
    <main className="min-h-screen bg-[#0D0010] text-white overflow-x-hidden">
      <section className="relative z-10 px-6 md:px-12 pt-32 md:pt-36 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight max-w-3xl mb-4">
            Calculadora de presupuesto e IGV para Facebook e Instagram Ads en Perú
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-3xl mb-3">
            Escribe cuánto quieres invertir al mes y verás tres cosas: cuánto entra realmente a la subasta, cuánto suma el IGV del 18 % si tu cuenta no tiene RUC de empresa y cuántos mensajes, clics o leads puedes esperar con los costos típicos de Perú.
          </p>
          <p className="text-white/45 text-xs md:text-sm max-w-3xl mb-12">Montos en soles. Rangos referenciales: Meta cobra por subasta y el costo real depende de tu rubro y de tus anuncios.</p>
          <MetaAdsBudgetCalculator />
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className={h2}>Costos típicos de Meta Ads en Perú</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/15">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="bg-white/5">
                  <th scope="col" className="px-4 py-3 font-semibold">Métrica</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Rango típico (PEN)</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Qué mide</th>
                </tr>
              </thead>
              <tbody className="text-white/70 font-light">
                <tr className="border-t border-white/10"><th scope="row" className="px-4 py-3 font-semibold text-white">CPM</th><td className="px-4 py-3">S/8 – S/25</td><td className="px-4 py-3">Costo por cada 1,000 impresiones</td></tr>
                <tr className="border-t border-white/10"><th scope="row" className="px-4 py-3 font-semibold text-white">CPC</th><td className="px-4 py-3">S/0.30 – S/1.50</td><td className="px-4 py-3">Costo por clic al anuncio</td></tr>
                <tr className="border-t border-white/10"><th scope="row" className="px-4 py-3 font-semibold text-white">Costo por mensaje</th><td className="px-4 py-3">S/2 – S/12</td><td className="px-4 py-3">Campañas de WhatsApp</td></tr>
                <tr className="border-t border-white/10"><th scope="row" className="px-4 py-3 font-semibold text-white">Costo por lead</th><td className="px-4 py-3">S/3 – S/40</td><td className="px-4 py-3">Formulario o WhatsApp calificado</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-white/50 text-xs md:text-sm">
            Los rangos bajos corresponden a rubros masivos (moda, comida, belleza) y los altos a rubros de ticket alto o muy competidos (inmobiliaria, salud, servicios profesionales).
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-12 py-10">
        <div className="max-w-4xl mx-auto space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-light">
          <h2 className={h2}>El IGV que casi nadie suma</h2>
          <p>
            Si tu cuenta publicitaria de Meta no tiene cargado un RUC de empresa válido (que empieza con 20) en el Centro de pagos, Meta añade el 18 % de IGV a todo lo que gastas. Un presupuesto de S/1,000 se factura en la práctica S/1,180. Por eso la calculadora te deja marcar si tu monto ya es el tope total con IGV: en ese caso, la pauta que de verdad compite en la subasta es menor.
          </p>
          <p>
            Antes de comparar cualquier cifra con tu margen por cliente, revisa cómo factura tu cuenta. Si dudas, tu contador puede confirmarte el tratamiento según tu tipo de RUC.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-12 py-10">
        <div className="max-w-4xl mx-auto space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-light">
          <h2 className={h2}>Cómo usar el resultado</h2>
          <p>
            Toma el número de mensajes o leads del rango y multiplícalo por tu tasa de cierre. Si de cada 10 mensajes cierras 1 venta, ya sabes cuántas ventas puede traer ese presupuesto y si te alcanza con tu margen. Si no te alcanza, el problema no es la plataforma: hay que mejorar el anuncio, la oferta o el seguimiento por WhatsApp.
          </p>
          <p>
            El desglose completo de presupuestos por rubro está en nuestra guía de{" "}
            <Link href={{ pathname: "/blogs/[slug]", params: { slug: "cuanto-cuesta-publicidad-facebook-instagram-peru-2026" } }} className={enlace}>
              cuánto cuesta la publicidad en Facebook e Instagram en Perú
            </Link>
            . Si también inviertes en Google, compara con{" "}
            <Link href={{ pathname: "/blogs/[slug]", params: { slug: "tarifas-publicidad-digital-peru-2026-google-meta-tiktok-linkedin" } }} className={enlace}>
              las tarifas de publicidad digital en Perú
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-12 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className={h2}>Preguntas frecuentes</h2>
          <div className="space-y-4">
            {CALC_FAQ.map((f) => (
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
          <h2 className="text-2xl md:text-4xl font-bold mb-4">¿Quieres el número exacto para tu negocio?</h2>
          <p className="text-white/70 mb-8">Cuéntanos tu rubro y tu ticket promedio y te decimos qué presupuesto tiene sentido antes de gastar un sol.</p>
          <Link href="/cotizar" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#E91E63] to-[#9C27B0] text-white font-semibold hover:opacity-90 transition">
            Pedir propuesta
          </Link>
        </div>
      </section>
    </main>
  )
}
