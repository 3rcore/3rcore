import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import SeoSectorPage from "@/components/seo/SeoSectorPage"

// Solo /es (Perú): en /en y /us esta ruta no existe.
export default async function Page({ params }: { params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  return <SeoSectorPage slug="seo-para-clinicas-esteticas" />
}
