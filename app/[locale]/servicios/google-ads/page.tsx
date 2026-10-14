import ProtoPage from '@/components/proto/ProtoPage'
import Original from './Original'
import { setRequestLocale } from "next-intl/server"
import { pruebaServicioHtml } from '@/lib/prueba-servicio'

// Rediseño aprobado (mix 18-ago): el mercado peruano (es) sirve la página del
// prototipo; us y en conservan su versión propia. La metadata y el schema
// siguen viviendo en el layout.tsx de esta ruta, igual para los tres locales.
export default async function Page({ params }: { params: any }) {
  const { locale } = await params
  // Renderizado estático: sin esto next-intl marca la ruta como dinámica y
  // Vercel devuelve `no-store` en cada visita.
  setRequestLocale(locale);

  return locale === 'es'
    ? <ProtoPage frag="servicios__google-ads" slots={{ prueba: pruebaServicioHtml('google-ads') }} />
    : <Original />
}
