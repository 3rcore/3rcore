/**
 * Versión React del bloque de prueba común (lib/prueba-servicio.ts) para las
 * páginas que no se sirven con ProtoPage. Mismos datos: logos de la home,
 * reseñas literales de la ficha de Google y casos solo si el cliente los
 * autoriza (CASOS_POR_SERVICIO vacío = no se pinta ninguna cifra).
 */
import Link from 'next/link'
import { REVIEWS_SNAPSHOT } from '@/lib/reviews'
import { LOGOS, CASOS_POR_SERVICIO, fecha, type ServicioPrueba } from '@/lib/prueba-servicio'

export default function PruebaServicio({ servicio, titulo, intro }: { servicio: ServicioPrueba; titulo: string; intro: string }) {
  const casos = CASOS_POR_SERVICIO[servicio] || []
  return (
    <section id="prueba" className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{titulo}</h2>
      <p className="text-white/70 max-w-3xl mb-8 leading-relaxed">{intro}</p>
      <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-10">
        {LOGOS.map((l) => (
          <li key={l.src} className="flex items-center justify-center rounded-xl border border-white/10 bg-white/90 p-3 h-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/proto/img/logos/${l.src}`} alt={l.alt} loading="lazy" width={120} height={34} className="max-h-9 w-auto object-contain" />
          </li>
        ))}
      </ul>
      {casos.length > 0 && (
        <ul className="grid md:grid-cols-2 gap-4 mb-6">
          {casos.map((c) => (
            <li key={c.cliente} className="border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-semibold mb-1">{c.cifra}</p>
              <p className="text-white/70 mb-2">{c.resumen}</p>
              <p className="text-white/50 text-sm">{c.cliente} · Fuente: {c.fuente}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="grid md:grid-cols-3 gap-4">
        {REVIEWS_SNAPSHOT.reviews.map((r) => (
          <figure key={r.author} className="border border-white/10 rounded-2xl p-6">
            <span aria-hidden="true" className="text-yellow-400">{'★'.repeat(r.rating)}</span>
            <blockquote className="text-white/75 text-sm leading-relaxed mt-2 mb-4">{r.text}</blockquote>
            <figcaption className="text-white/60 text-sm"><b className="text-white">{r.author}</b> · Reseña en Google · {fecha(r.date)}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-white/70">
        <Link href="/es/casos-de-exito" className="underline underline-offset-4 hover:text-white">Ver los casos de éxito publicados</Link>
        <span aria-hidden="true"> · </span>
        <a href="https://www.google.com/search?q=3R+Core+Agencia+de+Marketing" target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-white">Todas las reseñas en Google</a>
      </p>
    </section>
  )
}
