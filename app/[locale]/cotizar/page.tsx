import Cotizador from "@/components/cotizador/Cotizador"
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
      {locale === 'en' && <QuoteDetailsEn />}
    </main>
  )
}
