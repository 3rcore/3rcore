import type { Metadata, Viewport } from "next"
import { montserrat, poppins } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Blog CMS · 3R Core",
  description: "Redacción y publicación de artículos de 3rcore.com",
  robots: { index: false, follow: false },
}

// El CMS se usa de día en la oficina. `light` evita que el navegador pinte los
// controles nativos (select, scrollbar, autofill) en oscuro y rompa el papel.
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fbf7f9",
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  )
}
