import { Montserrat, Poppins, Playfair_Display } from "next/font/google"
import localFont from "next/font/local"

/**
 * Fuente única de tipografías del sitio. Antes cada componente instanciaba la
 * suya (31 llamadas a next/font con 6 familias: Montserrat, Poppins,
 * Playfair Display, Trirong, Ubuntu e Inter) y el head precargaba 16 woff2
 * (~259 KB) compitiendo con el LCP. Se consolida a 3 familias:
 *  - Montserrat (principal; absorbe Ubuntu e Inter, usos puntuales)
 *  - Poppins (secundaria de UI)
 *  - Playfair Display (serif display; absorbe Trirong, mismo rol visual
 *    serif-italic en contadores y títulos decorativos)
 */
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  // `variable` lo necesita el CMS de /admin, que tiene su propio root layout y
  // su propio CSS: sin una custom property no puede usar las familias del sitio
  // y caía a la fuente del sistema. Es aditivo — `.className` sigue igual.
  variable: "--font-montserrat",
})

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
})

// Josefin Sans la introduce el rediseño de Aymar (TeamSection y NosotrosSection
// v2) y va alojada en el repo (app/fonts) en vez de next/font/google: desde el
// 15-oct-2026 Google le sirve a los builds de Vercel URLs `/l/font?kit=…&skey=…`
// y Next 16.1.1 (Turbopack) no sabe resolverlas — el build fallaba con
// «next/font/google queries have exactly one entry». Es la fuente variable
// oficial (subset latin, el mismo que se pedía), así que cubre los pesos
// 300–700 que usan esas secciones con un solo woff2 de 28 KB.
export const josefin = localFont({
  src: "../app/fonts/JosefinSans-latin.woff2",
  weight: "300 700",
  style: "normal",
  display: "swap",
})
