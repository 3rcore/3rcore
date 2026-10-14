/**
 * /es/nosotros · bloques añadidos el 9-oct-2026 (plan Mega SEO + leads).
 *
 * Por qué: la página está en posición 2,5 de media (GSC 90 d, 573 impresiones)
 * y tuvo 69 sesiones en 28 días con 0 % de conversión. Quien llega aquí ya
 * conoce la marca y quiere saber cómo trabajamos y qué dicen los clientes: no
 * había método, ni reseñas, ni un formulario antes del pie.
 *
 * Fuentes: el método es el mismo que se publica en las páginas de servicio
 * (ver app/[locale]/agencia-marketing-digital-lima/pilar.ts); las reseñas son
 * las literales de la ficha de Google (lib/reviews.ts, 26-ago-2026). No se
 * añade ninguna credencial (años, certificaciones, «Google Partner») sin
 * confirmar por el cliente.
 */
import Link from 'next/link'
import { PILAR } from '@/app/[locale]/agencia-marketing-digital-lima/pilar'
import PillarWaCapture from '@/components/ui/PillarWaCapture'
import PruebaServicio from '@/components/seo/PruebaServicio'

export default function MetodoNosotros() {
  const sec = 'px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10 text-white'
  return (
    <>
      <section id="metodo" className={sec}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo trabajamos</h2>
        <p className="text-white/70 max-w-3xl mb-10 leading-relaxed">
          Somos una agencia de marketing digital con oficina en La Molina. Trabajamos posicionamiento SEO, Google Ads, páginas web y tiendas virtuales con el mismo método en cada proyecto: primero entender qué tienes, después poner por escrito qué vamos a hacer y cuánto cuesta, y cada mes mostrarte los números.
        </p>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILAR.proceso.map((s) => (
            <li key={s.t} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">{s.t}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="text-white/60 max-w-3xl mt-6">
          Lo que hacemos en cada frente está en{' '}
          <Link href="/es/posicionamiento-seo" className="underline underline-offset-4">posicionamiento SEO</Link>,{' '}
          <Link href="/es/servicios/google-ads" className="underline underline-offset-4">Google Ads</Link>,{' '}
          <Link href="/es/servicios/web-development" className="underline underline-offset-4">páginas web</Link> y{' '}
          <Link href="/es/tiendas-virtuales-lima" className="underline underline-offset-4">tiendas virtuales</Link>, y los precios referenciales en{' '}
          <Link href="/es/precios" className="underline underline-offset-4">precios</Link>.
        </p>
      </section>

      <PruebaServicio
        servicio="general"
        titulo="Lo que dicen nuestros clientes en Google"
        intro="Reseñas copiadas sin editar de la ficha de Google de 3R Core, donde la agencia tiene 4,7 sobre 5 con 42 reseñas, y algunas de las marcas con las que hemos trabajado."
      />

      <section id="escribenos" className={sec}>
        <div className="grid md:grid-cols-2 gap-8 items-start border border-white/10 rounded-2xl p-6 md:p-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">¿Conversamos sobre tu proyecto?</h2>
            <p className="text-white/70 leading-relaxed">
              Déjanos tu nombre y tu WhatsApp. Te respondemos el mismo día hábil, de lunes a viernes de 9:00 a 18:00, desde la oficina de Alameda de la Paz 187, La Molina.
            </p>
          </div>
          <PillarWaCapture locale="es" service="nosotros (conocer a la agencia)" />
        </div>
      </section>
    </>
  )
}
