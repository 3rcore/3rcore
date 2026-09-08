/**
 * Puntuación SEO de un artículo. Fuente única.
 *
 * Antes había dos cálculos que no se hablaban: la lista miraba 5 campos y el
 * editor 13, así que el mismo post se veía «SEO 100%» en la lista y «62%» al
 * abrirlo. Un indicador que se contradice a sí mismo no se mira.
 *
 * Los umbrales son los que usa el propio sitio: title ≤60 y description
 * 120-160 son los que Google recorta en la SERP.
 */

export const LOCALES = ['es', 'en', 'us'] as const
export type Locale = (typeof LOCALES)[number]

/** Cómo se llama cada mercado para quien escribe, no para el código. */
export const LOCALE_LABEL: Record<Locale, string> = {
  es: 'Perú',
  en: 'Inglés · EE.UU.',
  us: 'Español · EE.UU.',
}
export const LOCALE_SHORT: Record<Locale, string> = { es: 'Perú', en: 'EN', us: 'US' }

export interface SeoInput {
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  content?: string | null
  featured_image?: string | null
  featured_image_alt?: string | null
  meta_title?: string | null
  meta_description?: string | null
  og_image?: string | null
  focus_keyword?: string | null
}

export interface SeoCheck {
  id: string
  label: string
  ok: boolean
  /** Qué hacer para arreglarlo. Un check sin salida es un reproche. */
  fix: string
  group: 'Fundamentos' | 'Palabra clave' | 'Compartir'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function wordCount(html?: string | null): number {
  if (!html) return 0
  return html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
}

export function scorePost(p: SeoInput) {
  const title = p.title ?? ''
  const metaTitle = p.meta_title ?? ''
  const metaDesc = p.meta_description ?? ''
  const kw = (p.focus_keyword ?? '').trim().toLowerCase()
  const words = wordCount(p.content)

  const checks: SeoCheck[] = [
    { id: 'meta-title', group: 'Fundamentos', label: 'Meta título definido', ok: !!metaTitle,
      fix: 'Escribe el título que verá la gente en Google.' },
    { id: 'meta-title-len', group: 'Fundamentos', label: 'Meta título de 60 caracteres o menos', ok: !!metaTitle && metaTitle.length <= 60,
      fix: 'Google corta a partir de 60. Recorta lo que sobre.' },
    { id: 'meta-desc', group: 'Fundamentos', label: 'Meta descripción definida', ok: !!metaDesc,
      fix: 'Es el texto bajo el título en Google: escribe por qué hay que entrar.' },
    { id: 'meta-desc-len', group: 'Fundamentos', label: 'Meta descripción entre 120 y 160', ok: metaDesc.length >= 120 && metaDesc.length <= 160,
      fix: 'Por debajo de 120 desaprovechas sitio; por encima de 160 se corta.' },
    { id: 'excerpt', group: 'Fundamentos', label: 'Extracto definido', ok: !!p.excerpt,
      fix: 'Aparece en la lista del blog. Sin él, la tarjeta sale vacía.' },
    { id: 'words', group: 'Fundamentos', label: 'Más de 300 palabras', ok: words > 300,
      fix: `Llevas ${words}. Por debajo de 300 Google lo trata como contenido flojo.` },
    { id: 'image', group: 'Compartir', label: 'Imagen destacada', ok: !!p.featured_image,
      fix: 'Sin imagen, el artículo se comparte como un enlace pelado.' },
    { id: 'alt', group: 'Compartir', label: 'Texto alternativo de la imagen', ok: !!p.featured_image_alt,
      fix: 'Describe la imagen: lo leen los buscadores y quien no puede verla.' },
    { id: 'og', group: 'Compartir', label: 'Imagen para redes (OG)', ok: !!(p.og_image || p.featured_image),
      fix: 'Si no pones una, se usa la destacada. Sin ninguna, no hay previsualización.' },
    { id: 'kw', group: 'Palabra clave', label: 'Palabra clave de enfoque', ok: !!kw,
      fix: 'Elige la búsqueda concreta que este artículo quiere ganar.' },
    { id: 'kw-title', group: 'Palabra clave', label: 'La palabra clave está en el título', ok: !!kw && title.toLowerCase().includes(kw),
      fix: 'Si no aparece en el título, Google no sabe de qué va la página.' },
    { id: 'kw-desc', group: 'Palabra clave', label: 'La palabra clave está en la meta descripción', ok: !!kw && metaDesc.toLowerCase().includes(kw),
      fix: 'Google la resalta en negrita cuando coincide con la búsqueda.' },
    { id: 'kw-slug', group: 'Palabra clave', label: 'La palabra clave está en la URL', ok: !!kw && (p.slug ?? '').includes(slugify(kw)),
      fix: 'La URL se lee en el resultado y en los enlaces que te ponen otros.' },
  ]

  const score = checks.filter((c) => c.ok).length
  const pct = Math.round((score / checks.length) * 100)

  return { checks, score, total: checks.length, pct, words }
}

/** Verde a partir de 80, ámbar desde 50, rojo por debajo. */
export function scoreTone(pct: number): 'ok' | 'warn' | 'danger' {
  return pct >= 80 ? 'ok' : pct >= 50 ? 'warn' : 'danger'
}

export function scoreColor(pct: number): string {
  return `var(--${scoreTone(pct)})`
}
