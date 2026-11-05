/**
 * Registro de las páginas «Marketing digital para <sector>» (/es).
 * Solo se importa desde código de servidor (layouts y page.tsx): el texto llega
 * al cliente como mensajes de next-intl de su propia ruta, no en el bundle.
 */
import type { MarketingSector } from './types'
import { sector as Abogados } from './data/marketing-abogados'
import { sector as Clinicas } from './data/marketing-clinicas'
import { sector as ClinicasDentales } from './data/marketing-clinicas-dentales'
import { sector as ClinicasEsteticas } from './data/marketing-clinicas-esteticas'
import { sector as Colegios } from './data/marketing-colegios'
import { sector as Constructoras } from './data/marketing-constructoras'
import { sector as Contadores } from './data/marketing-contadores'
import { sector as Ecommerce } from './data/marketing-ecommerce'
import { sector as EmpresasIndustriales } from './data/marketing-empresas-industriales'
import { sector as Gimnasios } from './data/marketing-gimnasios'
import { sector as Hoteles } from './data/marketing-hoteles'
import { sector as Inmobiliarias } from './data/marketing-inmobiliarias'
import { sector as Psicologos } from './data/marketing-psicologos'
import { sector as Restaurantes } from './data/marketing-restaurantes'
import { sector as SalonesDeBelleza } from './data/marketing-salones-de-belleza'
import { sector as Veterinarias } from './data/marketing-veterinarias'

export const MARKETING_SECTORES: Record<string, MarketingSector> = {
  'marketing-abogados': Abogados,
  'marketing-clinicas': Clinicas,
  'marketing-clinicas-dentales': ClinicasDentales,
  'marketing-clinicas-esteticas': ClinicasEsteticas,
  'marketing-colegios': Colegios,
  'marketing-constructoras': Constructoras,
  'marketing-contadores': Contadores,
  'marketing-ecommerce': Ecommerce,
  'marketing-empresas-industriales': EmpresasIndustriales,
  'marketing-gimnasios': Gimnasios,
  'marketing-hoteles': Hoteles,
  'marketing-inmobiliarias': Inmobiliarias,
  'marketing-psicologos': Psicologos,
  'marketing-restaurantes': Restaurantes,
  'marketing-salones-de-belleza': SalonesDeBelleza,
  'marketing-veterinarias': Veterinarias,
}

export type { MarketingSector } from './types'
