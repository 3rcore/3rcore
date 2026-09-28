/**
 * Texto de apoyo de /en/quote (28-sep-2026).
 *
 * jev-seo midió la página en 113 palabras (JEV-003): solo la calculadora, sin
 * explicar qué pasa después de enviarla. Aquí va lo que un comprador de EE.UU.
 * pregunta antes de dejar su WhatsApp.
 *
 * Nada de esto es nuevo: cada frase sale de algo ya publicado en el sitio.
 *  - Horario: messages/en.json → FAQ.faqs.q6.answer
 *  - Reunión inicial gratis: HomeSEO.p4 · «Every quote is tailored after an
 *    initial meeting»: WebDevFAQ.faqs.q1.answer
 *  - Cotización formal con entregables: BrandingFAQ.faqs.q3.answer
 *  - Calendario por hitos y plazos de web/tienda: WebDevFAQ.faqs.q4.answer
 *  - SEO de 3 a 6 meses y sin contrato forzoso: SEOFAQ / PricingFAQ
 *  - Pago 50/50: FAQ q8 de las verticales en /en
 *  - Qué se guarda y qué se abre al enviar: components/cotizador/Cotizador.tsx
 * Sin menciones a Perú (plan USA) y sin cifras de precio: esas ya están en la
 * calculadora con su aviso de precio referencial.
 */

const STEPS = [
  {
    h: 'Your selection reaches our team',
    p: 'The services you checked are saved to our own lead panel and a WhatsApp chat opens with them already listed. The message carries the scope, not the price, so the conversation starts from what you actually need.',
  },
  {
    h: 'We reply during U.S. business hours',
    p: 'Our in-house team works Monday to Friday, 9 a.m. to 6 p.m. Eastern, so your business day and ours are the same day.',
  },
  {
    h: 'A free initial meeting',
    p: 'A video call to understand your business, your goals and what you already have in place. There is no charge for it and no commitment after it.',
  },
  {
    h: 'Your formal quote',
    p: 'Every quote is tailored after that meeting: a formal quote with the deliverables detailed, before any work starts.',
  },
]

const INCLUDES = [
  'The scope, itemized: what is delivered and what is not.',
  'A milestone-based timeline, so you have real visibility on progress.',
  'Net prices in U.S. dollars, contracted and invoiced through our U.S. subsidiary.',
  'Payment terms: one-off projects such as websites and online stores are paid 50% to start and 50% on delivery; SEO is billed monthly with no mandatory contract.',
]

const TIMELINES = [
  { name: 'Landing page', time: '2–3 weeks' },
  { name: 'Corporate website', time: '4–6 weeks' },
  { name: 'Online store', time: '6–10 weeks, depending on complexity' },
  { name: 'SEO', time: 'consolidates within 3 to 6 months of consistent work' },
]

const FAQ = [
  {
    q: 'Is the estimate the final price?',
    a: 'No. It is a reference estimate built from our published starting prices. The exact figure comes in the formal quote, once we know the scope.',
  },
  {
    q: 'Do I need to leave my email?',
    a: 'No. The calculator only asks for your name and your WhatsApp number, which is where we send the quote.',
  },
  {
    q: 'Which services can I quote here?',
    a: 'SEO, website development and online stores on Shopify or WooCommerce: the three services we deliver for U.S. businesses.',
  },
  {
    q: 'Am I tied to a long contract?',
    a: 'No. There are no mandatory contracts; SEO runs month to month.',
  },
]

export default function QuoteDetailsEn() {
  return (
    <section className="relative z-10 bg-[#0D0010] text-white px-6 md:px-12 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-8">What happens after you send your selection</h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {STEPS.map((s, i) => (
            <li key={s.h} className="rounded-[18px] border border-white/10 bg-white/[0.03] p-6">
              <span className="text-[#E91E63] font-mono text-sm">{String(i + 1).padStart(2, '0')}.</span>
              <h3 className="text-base md:text-lg font-semibold text-white mt-2 mb-2">{s.h}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{s.p}</p>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <h2 className="text-xl md:text-2xl font-semibold mb-5">What your quote includes</h2>
            <ul className="space-y-3 text-white/60 text-sm md:text-base leading-relaxed list-disc pl-5">
              {INCLUDES.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-7 md:p-9">
            <h2 className="text-xl md:text-2xl font-semibold mb-5">Typical timelines</h2>
            <dl className="space-y-3 text-sm md:text-base">
              {TIMELINES.map((x) => (
                <div key={x.name} className="flex flex-wrap gap-x-3 border-b border-white/10 pb-3">
                  <dt className="text-white font-semibold">{x.name}</dt>
                  <dd className="text-white/60">{x.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-8">Before you ask for a quote</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-[18px] border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-base font-semibold text-white mb-2">{f.q}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
