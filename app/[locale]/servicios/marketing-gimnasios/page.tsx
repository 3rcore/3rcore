import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import MarketingSectorPage from "@/components/seo/MarketingSectorPage"
import { MARKETING_SECTORES } from "@/lib/marketing-sectores"

const SLUG = 'marketing-gimnasios'

export default async function Page({ params }: { params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  const s = MARKETING_SECTORES[SLUG]
  return <MarketingSectorPage ns={s.ns} servicioForm={s.servicioForm} seo={s.seo} ads={s.ads} extra={s.extra} />
}
