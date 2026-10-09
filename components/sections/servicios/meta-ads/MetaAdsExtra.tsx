/**
 * Bloques añadidos a /es/servicios/meta-ads el 9-oct-2026 (solo /es).
 *
 * Por qué: la página convierte (17 WhatsApp + 1 formulario en 90 d como
 * landing) pero tenía 1.336 palabras frente a las 2.968 de Google Ads, sin
 * costos detallados, sin errores frecuentes y sin explicar cómo se mide un
 * lead. El copy existente (MetaAdsLanding, MetaAdsFAQ, MetaAdsSEO) no cambia.
 *
 * Fuentes de cada dato:
 *  · Fee desde S/1,500 y pauta mínima recomendada de S/1,500 → MetaAdsFAQ.q1.
 *  · IGV del 18 % sobre la pauta de Meta en Perú desde diciembre de 2024, salvo
 *    RUC 20 en el Centro de pagos → post cuanto-cuesta-publicidad-facebook-
 *    instagram-peru-2026 (sección «El 18% de IGV que casi nadie suma»).
 *  · Pixel + API de Conversiones, click-to-WhatsApp → MetaAdsLanding.
 *  · Medición de leads (origen, WhatsApp, duplicados) → bloque #medicion de
 *    /es/servicios/google-ads.
 */
import Link from 'next/link'

export const META_FAQ_EXTRA = [
  {
    q: '¿El presupuesto de Meta Ads incluye IGV?',
    a: 'No. Desde diciembre de 2024 la pauta de las cuentas de Meta registradas en Perú lleva 18 % de IGV, salvo que la cuenta tenga cargado un RUC válido que empiece con 20 en el Centro de pagos de Meta. El fee de la agencia también se factura más IGV. Por eso, al planificar, sumamos el 18 % a la pauta desde el primer mes.',
  },
  {
    q: '¿Cuánto cuesta en total una campaña de Meta Ads en Perú?',
    a: 'Son dos partidas: la pauta que pagas a Meta desde tu tarjeta, para la que recomendamos un mínimo de S/1,500 al mes, y el fee de gestión, desde S/1,500 al mes. A la pauta se le suma el IGV salvo que factures con RUC 20. Los montos indicados son referenciales y la propuesta final se ajusta a tu rubro.',
  },
  {
    q: '¿Cómo sé cuántos clientes me trajo la campaña?',
    a: 'Cada contacto llega con su origen: el anuncio, la campaña y la página donde entró. Los clics a WhatsApp y los formularios se registran como conversión con el Pixel y la API de Conversiones, y en el reporte mensual ves el costo por conversación y por lead, no solo los alcances y los likes.',
  },
  {
    q: '¿Meta Ads o Google Ads? ¿Cuál me conviene?',
    a: 'Google Ads capta a quien ya busca lo que vendes; Meta Ads llega a quien todavía no te busca pero encaja con tu cliente. Si tu producto se decide por impulso o por imagen, Meta suele rendir mejor; si se busca con urgencia, Google. Muchas cuentas funcionan mejor con las dos y el presupuesto repartido según el costo por lead de cada una.',
  },
  {
    q: '¿Pueden auditar mi cuenta de Meta Ads antes de cotizar?',
    a: 'Sí. Revisamos el Pixel y la API de Conversiones, qué eventos se están contando, la estructura de campañas, los públicos y las creatividades activas. Si la cuenta está bien armada, te lo decimos y no te proponemos rehacerla.',
  },
]

const COSTOS = [
  {
    t: 'La pauta que va a Meta',
    d: 'La defines tú y la paga tu tarjeta desde tu propia cuenta publicitaria. Recomendamos un mínimo de S/1,500 al mes para tener datos con los que optimizar; en rubros muy competidos conviene arrancar con S/2,500 o más para salir rápido de la fase de aprendizaje.',
  },
  {
    t: 'El IGV de la pauta',
    d: 'Desde diciembre de 2024, Meta cobra 18 % de IGV sobre el gasto de las cuentas registradas en Perú, salvo que la cuenta tenga un RUC válido que empiece con 20 cargado en el Centro de pagos. Si no lo tienes, una pauta de S/1,500 se convierte en S/1,770 en tu estado de cuenta.',
  },
  {
    t: 'El fee de gestión',
    d: 'Desde S/1,500 al mes por la estrategia, la estructura de campañas, las creatividades, la optimización semanal y el reporte. Precio neto: la factura de la agencia suma el 18 % de IGV.',
  },
]

const ERRORES = [
  {
    t: 'Impulsar publicaciones en vez de hacer campañas',
    d: 'El botón «Promocionar» optimiza para interacciones. No deja separar prospección de retargeting ni optimizar por conversión, así que pagas por likes que no compran.',
  },
  {
    t: 'No instalar el Pixel ni la API de Conversiones',
    d: 'Sin medición, el algoritmo no sabe quién compró y optimiza a ciegas. Desde las restricciones de iOS, el Pixel solo ya no basta: la API de Conversiones recupera los eventos que el navegador no reporta.',
  },
  {
    t: 'Olvidar el IGV al armar el presupuesto',
    d: 'Un presupuesto pensado en S/1,500 que termina costando S/1,770 descuadra el plan del mes. Se suma desde el inicio o se carga el RUC 20 en el Centro de pagos.',
  },
  {
    t: 'Una sola creatividad durante semanas',
    d: 'En Facebook e Instagram el anuncio se gasta: la misma pieza vista muchas veces deja de funcionar. Hace falta rotar ángulos y formatos (reel, carrusel, historia) y medir cuál baja el costo por resultado.',
  },
  {
    t: 'Medir mensajes y no ventas',
    d: 'Una conversación de WhatsApp no es una venta. Si no se registra qué conversaciones terminaron en compra, la campaña se optimiza hacia quien escribe, no hacia quien paga.',
  },
]

const MEDIMOS = [
  { t: 'Cada lead con su anuncio', d: 'El formulario y el clic a WhatsApp llegan con la campaña, el conjunto de anuncios y la página donde entró la persona, para saber qué pieza trajo cada contacto.' },
  { t: 'Pixel y API de Conversiones', d: 'Los eventos de lead y de mensaje se envían desde el navegador y desde el servidor, para que Meta los reciba aunque el navegador los bloquee.' },
  { t: 'Un contacto, una sola vez', d: 'Revisamos que el mismo lead no se cuente dos veces entre Meta y GA4. Una conversión duplicada infla el reporte y empuja al algoritmo hacia ruido.' },
  { t: 'Costo por lead, no por clic', d: 'El reporte mensual trae inversión, conversaciones, leads y costo por lead, y separa lo que vino de Meta de lo que vino de Google o del orgánico.' },
]

export default function MetaAdsExtra() {
  const sec = 'px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10 text-white'
  return (
    <>
      <section id="costos" className={sec}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cuánto cuesta la publicidad en Facebook e Instagram en Perú?</h2>
        <p className="text-white/70 max-w-3xl mb-8 leading-relaxed">
          Son tres montos distintos y conviene no mezclarlos: lo que va a Meta, el IGV de esa pauta y lo que cuesta que alguien gestione la cuenta. Los montos indicados son referenciales y varían según el rubro y el alcance.
        </p>
        <ul className="grid md:grid-cols-3 gap-4">
          {COSTOS.map((c) => (
            <li key={c.t} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">{c.t}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{c.d}</p>
            </li>
          ))}
        </ul>
        <p className="text-white/60 max-w-3xl mt-6">
          El desglose por tipo de campaña y por rubro está en la guía de{' '}
          <Link href="/es/blogs/cuanto-cuesta-publicidad-facebook-instagram-peru-2026" className="underline underline-offset-4">cuánto cuesta la publicidad en Facebook e Instagram en Perú</Link>.
        </p>
      </section>

      <section id="errores" className={sec}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Cinco errores que encarecen cada cliente en Meta Ads</h2>
        <p className="text-white/70 max-w-3xl mb-8 leading-relaxed">Son los que más encontramos al revisar cuentas que llegan de otra agencia o que el negocio manejaba por su cuenta.</p>
        <ol className="space-y-5 max-w-3xl">
          {ERRORES.map((e, i) => (
            <li key={e.t}>
              <h3 className="text-lg font-semibold mb-1">{i + 1}. {e.t}</h3>
              <p className="text-white/70 leading-relaxed">{e.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="medicion" className={sec}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo medimos los leads de Meta Ads</h2>
        <p className="text-white/70 max-w-3xl mb-8 leading-relaxed">
          En Perú buena parte de las ventas de Facebook e Instagram se cierra por WhatsApp. Si solo se miran alcances y clics, la campaña aprende a traer interacciones baratas. Así dejamos armada la medición antes de encender la pauta:
        </p>
        <ul className="grid md:grid-cols-2 gap-4">
          {MEDIMOS.map((m) => (
            <li key={m.t} className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">{m.t}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{m.d}</p>
            </li>
          ))}
        </ul>
        <p className="text-white/60 max-w-3xl mt-6">
          ¿Ya tienes campañas corriendo? Empezamos por una auditoría gratis de tu cuenta de Meta Ads: revisamos el Pixel, los eventos, los públicos y las creatividades, y si está bien armada te lo decimos.{' '}
          <a href="https://wa.me/51987216703?text=Hola%2C%20quiero%20una%20auditor%C3%ADa%20de%20mi%20cuenta%20de%20Meta%20Ads." target="_blank" rel="noopener" className="underline underline-offset-4">Pedir la auditoría por WhatsApp</a>.
        </p>
      </section>

      <section id="faq-meta" className={sec}>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Más preguntas sobre costos y medición en Meta Ads</h2>
        <div className="space-y-6 max-w-3xl">
          {META_FAQ_EXTRA.map((f) => (
            <div key={f.q}>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{f.q}</h3>
              <p className="text-white/70 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="text-white/60 max-w-3xl mt-8">
          Si buscas también clientes que ya están buscando tu servicio en Google, mira cómo trabajamos como{' '}
          <Link href="/es/servicios/google-ads" className="underline underline-offset-4">agencia de Google Ads en Lima</Link>.
        </p>
      </section>
    </>
  )
}
