import Cotizador from "@/components/cotizador/Cotizador"
import CotizarGuia from "./Guia"
import { setRequestLocale } from "next-intl/server"
import QuoteDetailsEn from "./QuoteDetailsEn"

export default async function CotizarPage({ params }: { params: any }) {
  const { locale } = await params
  // Renderizado estático: sin esto next-intl marca la ruta como dinámica y
  // Vercel devuelve `no-store` en cada visita.
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[#0D0010] text-white overflow-x-hidden">
      <Cotizador locale={locale} />
      {/* Texto de apoyo solo en Perú: /en y /us siguen igual. */}
      {locale === 'es' && <CotizarGuia />}
      {locale === 'en' && <QuoteDetailsEn />}
    </main>
  )
}
