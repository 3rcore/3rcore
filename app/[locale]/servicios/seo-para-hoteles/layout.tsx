import type { Metadata } from "next"
import { seoSectorMetadata, SeoSectorShell } from "@/components/seo/SeoSectorShell"

const SLUG = 'seo-para-hoteles'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params
  return seoSectorMetadata(SLUG, locale)
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: any }) {
  const { locale } = await params
  return <SeoSectorShell slug={SLUG} locale={locale}>{children}</SeoSectorShell>
}
