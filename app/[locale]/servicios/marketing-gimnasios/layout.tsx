import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { marketingSectorMetadata, MarketingSectorShell } from "@/components/seo/MarketingSectorShell"

// 5-nov-2026. «Marketing digital para <sector>»: solo /es (404 en /en y /us).
// Texto en lib/marketing-sectores/data/marketing-gimnasios.ts.
const SLUG = 'marketing-gimnasios'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'es') return { robots: { index: false, follow: false } }
  return marketingSectorMetadata(SLUG)
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'es') notFound()
  return <MarketingSectorShell slug={SLUG}>{children}</MarketingSectorShell>
}
