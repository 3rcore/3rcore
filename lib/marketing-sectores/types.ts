/**
 * 5-nov-2026. Páginas «Marketing digital para <sector>» de /es (Perú).
 *
 * Una intención = una URL:
 *  - «marketing digital / agencia de marketing para X» → /servicios/marketing-<x> (estas)
 *  - «SEO / posicionamiento para X»                    → /servicios/seo-para-<x>
 *  - «Google Ads / anuncios / publicidad en Google X»  → /servicios/google-ads-<x>
 *  - «página web / tienda virtual para X»              → 3rcommerce.com (no aquí)
 *
 * El texto de cada sector vive en su propio fichero de data/: no es una
 * plantilla con el nombre cambiado. Se inyecta como mensajes de next-intl en
 * el namespace `ns` (MarketingSectorShell) para reutilizar ServiceLanding,
 * ServiceFAQ y SEOContentBlock sin tocar messages/es.json.
 */
import type { AppPathname } from '@/i18n/routing'

export interface Item { title: string; description: string }
export interface GuideSection { title: string; paragraphs: string[]; list?: string[] }
export interface Faq { question: string; answer: string }

export interface MarketingSector {
  /** p. ej. 'marketing-constructoras' */
  slug: string
  path: AppPathname
  /** Namespace de mensajes inyectado (p. ej. 'MdConstructoras'). */
  ns: string
  /** Nombre corto para miga de pan y schema: «Marketing digital para constructoras». */
  nombre: string
  keywordPrincipal: string
  secundarias: string[]
  serviceType: string
  audiencia: string[]
  /** Texto de la línea del servicio en el formulario de WhatsApp (panel). */
  servicioForm: string
  /** Páginas hermanas del mismo sector (ida y vuelta). */
  seo?: { href: AppPathname; label: string }
  ads?: { href: AppPathname; label: string }
  /** 1-2 enlaces más, solo si son del mismo tema. */
  extra?: { href: AppPathname; label: string }[]
  content: {
    meta: { title: string; description: string }
    h1: string
    hero: { badge: string; title: string; subtitle: string; cta: string }
    intro: { title: string; p1: string; p2: string; p3: string }
    /** «Canales que le sirven» (6). */
    benefits: { badge: string; title: string; items: Item[] }
    /** «Plan por fases» (4-5). */
    process: { badge: string; title: string; steps: Item[] }
    /** Problemas reales, cómo compra el cliente, normas del sector, qué se mide. */
    guide: { sections: GuideSection[] }
    faqBadge: string
    faqTitle: string
    faqs: Faq[]
    seoTitle: string
    p1: string
    p2: string
    p3: string
  }
}
