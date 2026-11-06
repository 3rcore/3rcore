import { miamiRoute } from '@/lib/landings-miami-route'
import { PAGES } from './content'

// Contenido en ./content.ts. /en/miami-web-design y /us/diseno-web-miami; en /es da 404.
const route = miamiRoute(PAGES)

export const generateMetadata = route.generateMetadata
export default route.Page
