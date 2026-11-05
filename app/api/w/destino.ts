/**
 * A dónde van los datos de medición de 3rcore.com: el colector del panel de
 * operaciones (el mismo que se ve en 3rcore.com/panel). Es una dirección, no una
 * llave: este repositorio no guarda secretos. El colector valida y pone topes.
 */
// 5-nov-2026: 3rcore-work.vercel.app está bloqueado (402) desde el 31-oct y la
// medición se perdía entera. El panel se sirve por el relé del VPS.
export const COLECTOR = process.env.COLECTOR_URL ?? "https://r3c-datos.josegaspard.dev/_r3p/panel"

/** Identifica de qué web viene el dato. El colector rechaza cualquier otro. */
export const SITIO = "3rcore.com"
