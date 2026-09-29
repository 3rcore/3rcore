/**
 * A dónde van los datos de medición de 3rcore.com: el colector del panel de
 * operaciones (el mismo que se ve en 3rcore.com/panel). Es una dirección, no una
 * llave: este repositorio no guarda secretos. El colector valida y pone topes.
 */
export const COLECTOR = process.env.COLECTOR_URL ?? "https://3rcore-work.vercel.app/panel"

/** Identifica de qué web viene el dato. El colector rechaza cualquier otro. */
export const SITIO = "3rcore.com"
