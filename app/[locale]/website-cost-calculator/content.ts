/**
 * Texto de /en/website-cost-calculator (28-sep-2026).
 *
 * Cada cifra sale de algo ya publicado en /en, sin mencionar Perú:
 *  - Precios: /en/pricing (COPY.en) y WebDevFAQ.q1 / webFAQ.q1 en messages/en.json.
 *  - Plazos: WebDevFAQ.q4 (2–3, 4–6 y 6–10 semanas) y webFAQ.q2 (3–6 semanas).
 *  - Hosting desde el segundo año ~$10–$35/mes: webFAQ.q5.
 *  - Dos rondas de revisión y 30 días de garantía: webFAQ.q9.
 *  - Pago 50/50 en dólares por la filial de EE.UU.: webFAQ.q8.
 *  - Qué incluye cada web: /en/pricing (webNote).
 *  - SEO $500/mes, primeros movimientos a los 2-3 meses: SEOFAQ.q1/q2.
 * Si cambia un precio publicado, hay que cambiarlo aquí y en
 * components/cotizador/WebsiteCostCalculator.tsx.
 */

export const REF = 'Figures shown are for reference only.'

export const CALCULATOR_FAQ: { q: string; a: string }[] = [
  {
    q: 'How much does a small business website cost?',
    a: 'At 3R Core, a landing page starts from $850, a corporate site of five to eight sections costs $1,200 to $2,400 and an online store on Shopify or WooCommerce starts from $1,750. The first year of domain, SSL and hosting is included. ' + REF,
  },
  {
    q: 'How accurate is the calculator?',
    a: 'It shows the published price band your project falls into. The exact figure depends on integrations, catalog size and content, and it is confirmed in a written quote after a first call, before any work begins.',
  },
  {
    q: 'Why does the calculator not give a price for 9 or more pages?',
    a: 'Our published corporate range covers sites of up to eight sections. Larger sites vary too much to price without seeing them, so we quote them individually instead of showing a number we have not published.',
  },
  {
    q: 'Does a bilingual website cost more?',
    a: 'A second language adds work: separate pages and URLs, hreflang, and forms and emails in both languages. It is scoped in the written quote. We have not published a separate price for it, so the calculator does not add one.',
  },
  {
    q: 'What does a website cost per month after launch?',
    a: 'The first year of domain, SSL and hosting is included. From year two, hosting runs roughly $10 to $35 per month depending on traffic and platform. Maintenance and monthly SEO (from $500 per month) are optional. ' + REF,
  },
  {
    q: 'How do I pay for the website?',
    a: 'In U.S. dollars, usually half at kickoff and half at launch, by transfer or card, invoiced through our U.S. subsidiary. SEO is billed monthly with no mandatory contract.',
  },
]

export const SECTIONS: { title: string; paragraphs?: string[]; bullets?: string[] }[] = [
  {
    title: 'How the calculator works',
    paragraphs: [
      'The calculator uses 3R Core\'s published reference prices and nothing else: a landing page from $850, a corporate site of five to eight sections from $1,200 to $2,400, and an online store from $1,750. Monthly SEO is $500 per month. ' + REF,
      'Where we have not published a price, the calculator says so instead of inventing a figure. That covers sites of nine or more pages and the extra scope of a second language. Both are priced in a written quote.',
    ],
  },
  {
    title: 'What moves the price of a website',
    bullets: [
      'Integrations: payment gateways and anything else the site has to connect to. They move the price more than the page count does.',
      'Catalog size, for online stores: how many products, variants and categories have to be set up.',
      'A second language: each language needs its own pages, URLs, hreflang and forms.',
      'Content readiness: copy, photos and access. Waiting on them stretches timelines more than development does.',
    ],
  },
  {
    title: 'What every website build includes',
    bullets: [
      'Design in Figma and responsive development.',
      'Basic technical SEO: semantic structure, schema markup, sitemap, meta tags, image optimization and page speed.',
      'A contact form and Google Analytics connected at launch.',
      'The first year of domain, SSL and hosting, registered in your name.',
      'Two revision rounds before launch and thirty days of warranty on anything that breaks afterwards.',
    ],
  },
  {
    title: 'Typical timelines',
    bullets: [
      'Landing page: 2 to 3 weeks.',
      'Corporate site: 4 to 6 weeks.',
      'Online store: 6 to 10 weeks, depending on complexity.',
      'SEO: first ranking movement usually between months two and three.',
    ],
  },
]
