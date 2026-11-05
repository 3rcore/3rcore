import { setRequestLocale } from "next-intl/server"
import MarketingSectorPage from "@/components/seo/MarketingSectorPage"
import { MARKETING_SECTORES } from "@/lib/marketing-sectores"
import LegacyPage from "./LegacyPage"

// 5-nov-2026. /es pasa a «Marketing digital para <sector>» (texto en
// lib/marketing-sectores/data/marketing-clinicas.ts). /en y /us siguen con la página anterior
// (noindex, sin cambios). La URL no cambia.
const SLUG = 'marketing-clinicas'

export default async function Page({ params }: { params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') return <LegacyPage />
  const s = MARKETING_SECTORES[SLUG]
  return <MarketingSectorPage ns={s.ns} servicioForm={s.servicioForm} seo={s.seo} ads={s.ads} extra={s.extra} />
}
