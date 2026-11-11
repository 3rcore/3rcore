import { miamiRoute } from '@/lib/landings-miami-route'
import { CONFIG, PAGES } from './content'

// Contenido en ./content.ts. /en/miami-digital-marketing-agency y
// /us/agencia-marketing-digital-miami; en /es da 404.
const route = miamiRoute(PAGES, CONFIG)

export const generateMetadata = route.generateMetadata
export default route.Page
