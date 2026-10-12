/**
 * 11-oct-2026. Páginas «SEO para <sector>» de /es (Perú).
 *
 * Solo sectores con demanda medida (autocompletado de Google con el prefijo
 * «seo para » + letra y SERP de Google Perú; detalle en el RESUMEN de la ronda
 * 3r-seo-sectores-2026-10-11). Cada página tiene su propio texto en
 * messages/es.json (namespace `ns`): no es una plantilla con el nombre cambiado.
 *
 * Solo /es: en /en y /us dan 404, no entran al sitemap de esos locales ni al
 * hreflang (ver lib/indexableRoutes.ts y app/sitemap.ts).
 *
 * Una intención = una URL: «SEO / posicionamiento web para X» va aquí;
 * «Google Ads / anuncios / publicidad para X» va a /servicios/marketing-<x>.
 */
import type { AppPathname } from '@/i18n/routing'

export interface SeoSector {
  /** Ruta interna, igual en el único locale donde existe (/es). */
  path: AppPathname
  /** Namespace de messages/es.json con todo el texto de la página. */
  ns: string
  /** Nombre corto para la miga de pan y el schema Service. */
  nombre: string
  /** Página de Google Ads del mismo sector, si existe. */
  ads?: { href: AppPathname; label: string }
  /** serviceType del schema Service. */
  serviceType: string
  audiencia: string[]
}

export const SEO_SECTORES: Record<string, SeoSector> = {
  'seo-para-clinicas': {
    path: '/servicios/seo-para-clinicas',
    ns: 'SeoParaClinicas',
    nombre: 'SEO para clínicas',
    ads: { href: '/servicios/marketing-clinicas', label: 'Google Ads para clínicas' },
    serviceType: 'SEO for Medical Clinics',
    audiencia: ['Clinics', 'Medical offices', 'Physicians'],
  },
  'seo-para-dentistas': {
    path: '/servicios/seo-para-dentistas',
    ns: 'SeoParaDentistas',
    nombre: 'SEO para dentistas',
    ads: { href: '/servicios/marketing-clinicas-dentales', label: 'Google Ads para clínicas dentales' },
    serviceType: 'SEO for Dentists',
    audiencia: ['Dentists', 'Dental clinics'],
  },
  'seo-para-clinicas-esteticas': {
    path: '/servicios/seo-para-clinicas-esteticas',
    ns: 'SeoParaClinicasEsteticas',
    nombre: 'SEO para clínicas estéticas',
    ads: { href: '/servicios/marketing-clinicas-esteticas', label: 'Google Ads para clínicas estéticas' },
    serviceType: 'SEO for Aesthetic Clinics',
    audiencia: ['Aesthetic clinics', 'Plastic surgeons', 'Dermatologists'],
  },
  'seo-para-psicologos': {
    path: '/servicios/seo-para-psicologos',
    ns: 'SeoParaPsicologos',
    nombre: 'SEO para psicólogos',
    serviceType: 'SEO for Psychologists',
    audiencia: ['Psychologists', 'Therapists', 'Mental health centers'],
  },
  'seo-para-abogados': {
    path: '/servicios/seo-para-abogados',
    ns: 'SeoParaAbogados',
    nombre: 'SEO para abogados',
    ads: { href: '/servicios/marketing-abogados', label: 'Google Ads para abogados' },
    serviceType: 'SEO for Law Firms',
    audiencia: ['Law firms', 'Lawyers'],
  },
  'seo-para-inmobiliarias': {
    path: '/servicios/seo-para-inmobiliarias',
    ns: 'SeoParaInmobiliarias',
    nombre: 'SEO para inmobiliarias',
    ads: { href: '/servicios/marketing-inmobiliarias', label: 'Google Ads para inmobiliarias' },
    serviceType: 'SEO for Real Estate',
    audiencia: ['Real estate agencies', 'Real estate developers', 'Construction companies'],
  },
  'seo-para-hoteles': {
    path: '/servicios/seo-para-hoteles',
    ns: 'SeoParaHoteles',
    nombre: 'SEO para hoteles',
    serviceType: 'SEO for Hotels and Tourism',
    audiencia: ['Hotels', 'Tour operators', 'Travel agencies'],
  },
  'seo-para-restaurantes': {
    path: '/servicios/seo-para-restaurantes',
    ns: 'SeoParaRestaurantes',
    nombre: 'SEO para restaurantes',
    serviceType: 'SEO for Restaurants',
    audiencia: ['Restaurants', 'Cafes'],
  },
  'seo-para-colegios': {
    path: '/servicios/seo-para-colegios',
    ns: 'SeoParaColegios',
    nombre: 'SEO para colegios',
    serviceType: 'SEO for Schools and Universities',
    audiencia: ['Schools', 'Universities', 'Institutes'],
  },
  'seo-para-empresas-b2b': {
    path: '/servicios/seo-para-empresas-b2b',
    ns: 'SeoParaEmpresasB2B',
    nombre: 'SEO para empresas B2B',
    serviceType: 'B2B and Industrial SEO',
    audiencia: ['B2B companies', 'Manufacturers', 'Industrial distributors'],
  },
}
