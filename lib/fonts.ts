import { Montserrat, Poppins, Playfair_Display, Josefin_Sans } from "next/font/google"

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
// v2). Solo los pesos que esas secciones usan de verdad: declarar los 7 con
// itálicas precargaba 14 woff2 compitiendo con el video del hero.
export const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
})
