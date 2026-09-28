import Link from "next/link"

/**
 * Texto de apoyo del cotizador, solo en /es (28-sep-2026, Tanda 2 Perú).
 *
 * «cotizador de pagina web» sale en la posición 29 de Search Console con
 * /es/cotizar, que hasta hoy era solo la calculadora (≈100 palabras). Esto
 * explica cómo funciona, qué precios usa y qué hace falta para cotizar.
 * Los montos son los mismos que usa components/cotizador/Cotizador.tsx y los
 * de /es/precios, siempre referenciales. El formulario no se toca.
 *
 * GUIA_FAQ alimenta a la vez el bloque visible y el FAQPage del layout.
 */
export const GUIA_FAQ: { q: string; a: string }[] = [
  {
    q: '¿El cotizador me da el precio final de mi página web?',
    a: 'No. Te da un estimado referencial con los precios que publicamos: landing S/1,800, web corporativa S/4,500 y tienda online desde S/6,500 (o S/2,500 si son hasta 50 productos). El precio final lo confirmamos por WhatsApp cuando conocemos el alcance. Los montos indicados son referenciales.',
  },
  {
    q: '¿Los precios del cotizador incluyen IGV?',
    a: 'No. Son precios netos en soles. En la factura se suma el 18 % de IGV: una landing de S/1,800 factura S/2,124 y una web corporativa de S/4,500 factura S/5,310.',
  },
  {
    q: '¿Tengo que dejar mis datos para ver el precio?',
    a: 'No. El estimado aparece en cuanto marcas lo que necesitas. Solo te pedimos nombre y WhatsApp si quieres que te enviemos la cotización exacta.',
  },
  {
    q: '¿Qué pasa después de enviar la cotización?',
    a: 'Se abre WhatsApp con lo que marcaste y te respondemos el mismo día hábil, de lunes a viernes de 9:00 a 18:00, con alcance, plazo y precio cerrado por escrito.',
  },
  {
    q: '¿Puedo cotizar la web y el SEO o Google Ads juntos?',
    a: 'Sí. Marca todo lo que necesites y el cotizador separa la inversión inicial (la web o la tienda) de lo mensual (SEO desde S/1,800, gestión de Google Ads S/1,800 más la pauta, redes desde S/1,500). Los montos indicados son referenciales.',
  },
  {
    q: '¿Cómo se paga una página web?',
    a: 'En dos partes: 50 % para empezar y 50 % contra entrega. Los servicios mensuales se facturan mes a mes, sin permanencia forzosa.',
  },
]

const PRECIOS = [
  ['Landing page', 'S/1,800', 'Pago único', '1 a 2 semanas'],
  ['Web corporativa (5 a 8 secciones)', 'S/4,500', 'Pago único', '3 a 5 semanas'],
  ['Tienda virtual hasta 50 productos', 'S/2,500', 'Pago único', '2 a 3 semanas'],
  ['Tienda online completa', 'Desde S/6,500', 'Pago único', '4 a 6 semanas'],
  ['Posicionamiento SEO', 'Desde S/1,800', 'Al mes', 'Resultados entre el mes 3 y 6'],
  ['Gestión de Google Ads', 'S/1,800 + pauta', 'Al mes', 'Pauta recomendada desde S/1,500 al mes'],
  ['Redes sociales', 'Desde S/1,500', 'Al mes', 'Piezas incluidas'],
]

const h2 = "text-2xl md:text-3xl font-bold tracking-tight mb-4"
const p = "text-white/70 leading-relaxed max-w-3xl mb-4"
const a = "text-[#E91E63] underline underline-offset-4 hover:text-white transition-colors"

export default function CotizarGuia() {
  return (
    <section className="relative z-10 bg-[#0D0010] text-white px-6 md:px-12 pb-24">
      <div className="max-w-6xl mx-auto space-y-16">

        <div>
          <h2 className={h2}>Cómo funciona el cotizador de páginas web</h2>
          <p className={p}>
            El cotizador de 3R Core calcula al instante un precio referencial para tu página web, tu tienda
            online o tus servicios mensuales, con los mismos montos que publicamos en nuestra{' '}
            <Link href="/es/precios" className={a}>página de precios</Link>. No tienes que dejar tus datos
            para ver el número.
          </p>
          <ol className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              ['1. Marca lo que necesitas', 'Una landing, una web corporativa, una tienda o servicios como SEO y Google Ads. Puedes combinar varios.'],
              ['2. Mira tu estimado', 'El cotizador separa lo que pagas una vez (la web) de lo que es mensual (SEO, Ads, redes).'],
              ['3. Pide la cotización exacta', 'Si te sirve, dejas nombre y WhatsApp. Te respondemos el mismo día hábil con alcance, plazo y precio cerrado.'],
            ].map(([t, d]) => (
              <li key={t} className="rounded-[18px] border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-semibold mb-2">{t}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className={h2}>Precios que usa el cotizador (Perú, 2026)</h2>
          <p className={p}>
            Precios netos en soles; la factura suma el 18 % de IGV. Los precios son referenciales y varían
            según el alcance del proyecto.
          </p>
          <div className="overflow-x-auto rounded-[18px] border border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/[0.04] text-white/80">
                <tr>{['Servicio', 'Precio neto', 'Forma de pago', 'Plazo o nota'].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {PRECIOS.map((r) => (
                  <tr key={r[0]} className="border-t border-white/10">
                    {r.map((c, i) => <td key={i} className={`px-4 py-3 ${i === 0 ? 'text-white' : 'text-white/70'}`}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/50 text-sm mt-4">
            La tabla completa, con lo que cambia el precio y cómo se paga, está en{' '}
            <Link href="/es/cuanto-cuesta-una-pagina-web-en-peru" className={a}>cuánto cuesta una página web en Perú</Link>.
          </p>
        </div>

        <div>
          <h2 className={h2}>Qué tener a mano para cotizar tu página web</h2>
          <p className={p}>
            Con estas cinco respuestas la cotización exacta sale en una sola conversación, sin ir y venir:
          </p>
          <ul className="space-y-3 max-w-3xl">
            {[
              ['Para qué es la web', 'Que te escriban por WhatsApp, vender en línea o dar confianza a clientes que te buscan antes de firmar. Cada objetivo pide un tipo distinto de web.'],
              ['Cuántas secciones o productos', 'Una landing es una sola página; una corporativa tiene de 5 a 8 secciones; una tienda depende de cuántos productos vas a cargar.'],
              ['Si hay que conectarla con algo', 'Pasarela de pago, facturación, un ERP o el stock de varios almacenes. Las integraciones son lo que más mueve el precio.'],
              ['Si ya tienes textos, fotos y logo', 'El plazo corre desde que llegan tus materiales. Si hay que producirlos, se suma ese trabajo.'],
              ['Para cuándo la necesitas', 'Una landing sale en 1 a 2 semanas y una corporativa en 3 a 5. Si hay una fecha fija, dínosla desde el inicio.'],
            ].map(([t, d]) => (
              <li key={t} className="text-white/70 leading-relaxed"><strong className="text-white">{t}.</strong> {d}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={h2}>¿Por qué el precio final puede ser distinto del estimado?</h2>
          <p className={p}>
            El cotizador parte de precios «desde», que cubren lo que pide la mayoría de negocios. El número
            cambia cuando el proyecto trae algo que no entra en ese punto de partida: una integración con tu
            sistema, un catálogo más grande o contenido que hay que producir. Si algo cambia a mitad del
            proyecto, lo cotizamos por escrito y lo apruebas antes de que lo hagamos.
          </p>
          <p className={p}>
            ¿Prefieres ver ejemplos antes de decidir? Revisa el servicio de{' '}
            <Link href="/es/servicios/web-development" className={a}>diseño de páginas web</Link>, el de{' '}
            <Link href="/es/tiendas-virtuales-lima" className={a}>tiendas virtuales</Link> o, si tienes un restaurante,{' '}
            <Link href="/es/diseno-web-restaurantes-lima" className={a}>la web para restaurantes</Link>.
          </p>
        </div>

        <div>
          <h2 className={h2}>Preguntas frecuentes sobre el cotizador</h2>
          <ul className="space-y-4 mt-6">
            {GUIA_FAQ.map((f) => (
              <li key={f.q} className="rounded-[18px] border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-semibold mb-2">{f.q}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{f.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
