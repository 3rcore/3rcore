import { landingRoute } from '@/lib/landings-peru-route'
import { PAGE } from './content'

// Contenido en ./content.ts. Solo /es: en /en y /us la ruta da 404.
const route = landingRoute(PAGE)

export const generateMetadata = route.generateMetadata
export default route.Page
