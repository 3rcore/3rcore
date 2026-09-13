import Link from "next/link"
import { setRequestLocale } from "next-intl/server"

interface Props { params: Promise<{ locale: string }> }

const COPY = {
  es: {
    eyebrow: '3R Core · Web · Lima · Perú',
    h1: 'Diseño Web en Lima, Perú',
    sub: 'Páginas web a medida, sitios corporativos y e-commerce optimizados para velocidad, conversión y SEO. Desde S/1,800 con SEO técnico incluido. Los montos indicados son referenciales.',
    cta: 'Cotiza tu página web',
    contactPath: '/#contacto',
    why: 'Diseño, código y SEO en el mismo equipo',
    whyDesc: 'No subcontratamos: diseñamos en Figma, desarrollamos en código, optimizamos performance (Lighthouse 90+) y dejamos el sitio listo para posicionar. Una sola agencia, una sola factura, una sola responsabilidad.',
    tiers: 'Paquetes web desde Lima',
    tiersList: [
      { title: 'Landing page', price: 'Desde S/1,800', desc: 'Página de 1 a 3 secciones, formulario, integración WhatsApp, SEO técnico básico y deploy. 2–3 semanas.' },
      { title: 'Web corporativa', price: 'Desde S/4,500', desc: '5 a 8 secciones (home, nosotros, servicios, blog, contacto), CMS WordPress o Next.js, multidioma opcional. 4–6 semanas.' },
      { title: 'E-commerce Shopify / WooCommerce', price: 'Desde S/6,500', desc: 'Tienda con catálogo, pasarelas Culqi/Niubiz/Izipay, envíos, IGV, descuentos, abandono de carrito y dashboard. 6–10 semanas.' },
      { title: 'Web Next.js a medida', price: 'Desde S/9,500', desc: 'Headless CMS (Sanity, Supabase), animaciones GSAP/Framer, integraciones API, multilenguaje y deploy Vercel. 8–14 semanas.' },
    ],
    tiersNote: 'Los precios son referenciales y varían según el alcance del proyecto.',
    stack: 'Stack que dominamos',
    stackList: ['Shopify', 'WooCommerce', 'WordPress', 'Next.js', 'Astro', 'Tailwind CSS', 'Supabase', 'Sanity', 'Vercel', 'Cloudflare', 'Figma', 'GSAP'],
    process: 'Proceso de diseño y desarrollo',
    processList: [
      { step: '1', title: 'Brief y arquitectura', desc: 'Workshop de marca y negocio, sitemap, definición de plantillas y flujos críticos.' },
      { step: '2', title: 'Diseño en Figma', desc: 'Mockups responsivos desktop, tablet y mobile. 2 rondas de revisión incluidas.' },
      { step: '3', title: 'Desarrollo y QA', desc: 'Maquetación pixel-perfect, integraciones (CRM, analytics, pasarela), tests cross-browser y mobile.' },
      { step: '4', title: 'Lanzamiento y SEO', desc: 'Migración, configuración de dominio y SSL, schema, Search Console, sitemap, IndexNow y monitoreo 30 días post-launch.' },
    ],
    industries: 'Industrias con las que más trabajamos en Lima',
    industriesList: ['Inmobiliario', 'Estudios jurídicos', 'Clínicas y consultorios', 'Restaurantes y delivery', 'Educación', 'Industria y manufactura', 'Retail y moda', 'Servicios financieros'],
    coverage: 'Cobertura geográfica',
    coverageDesc: 'Atendemos reuniones presenciales en nuestra oficina de La Molina y por Google Meet a clientes en Lima Metropolitana, provincias del Perú y Estados Unidos.',
    contact: 'Conversemos sobre tu próximo proyecto web',
    contactCta: 'Cuéntanos qué necesitas y en menos de 48 h te enviamos propuesta, alcance, timeline y precio fijo. Sin sorpresas.',
  },
  en: {
    eyebrow: '3R Core · Web · Lima · Peru',
    h1: 'Web Design in Lima, Peru',
    sub: 'Custom websites, corporate sites and e-commerce optimized for speed, conversion and SEO. From $850 USD for US clients, with technical SEO included.',
    cta: 'Get a website quote',
    contactPath: '/#contacto',
    why: 'Design, code and SEO on the same team',
    whyDesc: 'We do not subcontract: we design in Figma, develop in code, optimize performance (Lighthouse 90+) and ship the site ready to rank. One agency, one invoice, one accountability.',
    tiers: 'Website packages from Lima',
    tiersList: [
      { title: 'Landing page', price: 'From $850 USD', desc: '1–3 sections, contact form, WhatsApp integration, basic technical SEO and deploy. 2–3 weeks.' },
      { title: 'Corporate website', price: 'From $1,200 USD', desc: '5–8 sections (home, about, services, blog, contact), WordPress or Next.js CMS, optional multilingual. 4–6 weeks.' },
      { title: 'Shopify / WooCommerce e-commerce', price: 'From $1,750 USD', desc: 'Store with catalog, Stripe/PayPal gateways, shipping, taxes, discounts, abandoned cart and admin dashboard. 6–10 weeks.' },
      { title: 'Custom Next.js website', price: 'From $2,550 USD', desc: 'Headless CMS (Sanity, Supabase), GSAP/Framer animations, API integrations, multilingual and Vercel deploy. 8–14 weeks.' },
    ],
    stack: 'Stack we master',
    stackList: ['Shopify', 'WooCommerce', 'WordPress', 'Next.js', 'Astro', 'Tailwind CSS', 'Supabase', 'Sanity', 'Vercel', 'Cloudflare', 'Figma', 'GSAP'],
    process: 'Design and development process',
    processList: [
      { step: '1', title: 'Brief & architecture', desc: 'Brand and business workshop, sitemap, template definition and critical flows.' },
      { step: '2', title: 'Figma design', desc: 'Responsive desktop, tablet and mobile mockups. Two review rounds included.' },
      { step: '3', title: 'Development & QA', desc: 'Pixel-perfect markup, integrations (CRM, analytics, gateway), cross-browser and mobile testing.' },
      { step: '4', title: 'Launch & SEO', desc: 'Migration, domain and SSL setup, schema, Search Console, sitemap, IndexNow and 30-day post-launch monitoring.' },
    ],
    industries: 'Industries we most often work with in Lima',
    industriesList: ['Real estate', 'Law firms', 'Clinics and medical offices', 'Restaurants and delivery', 'Education', 'Industry and manufacturing', 'Retail and fashion', 'Financial services'],
    coverage: 'Geographic coverage',
    coverageDesc: 'In-person meetings at our La Molina office and Google Meet calls with clients across Metropolitan Lima, Peruvian provinces and the United States.',
    contact: 'Let’s talk about your next web project',
    contactCta: 'Tell us what you need and in under 48 h we send a proposal with scope, timeline and fixed price. No surprises.',
  },
}

export default async function DisenoWebLimaPage({ params }: Props) {
  const { locale } = await params
  // Renderizado estático: sin esto next-intl marca la ruta como dinámica y
  // Vercel devuelve `no-store` en cada visita.
  setRequestLocale(locale);

  const t = (COPY as any)[locale === 'en' ? 'en' : 'es']

  return (
    <main className="min-h-screen bg-black text-white">
      <h1 className="sr-only">{t.h1}</h1>
      <section className="px-6 md:px-10 lg:px-20 pt-32 pb-20 max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">{t.eyebrow}</p>
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{t.h1}</h2>
        <p className="web-intro text-lg md:text-xl text-white/80 max-w-3xl mb-10">{t.sub}</p>
        <Link href={`/${locale}${t.contactPath}`} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</Link>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.why}</h2>
        <p className="text-white/70 max-w-3xl">{t.whyDesc}</p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.tiers}</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {t.tiersList.map((p: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">{p.price}</p>
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-white/70">{p.desc}</p>
            </li>
          ))}
        </ul>
        {t.tiersNote && <p className="text-white/60 mt-6 max-w-3xl">{t.tiersNote}</p>}
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.process}</h2>
        <ol className="grid md:grid-cols-2 gap-4">
          {t.processList.map((m: any, i: number) => (
            <li key={i} className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">{m.step}</p>
              <h3 className="text-xl font-semibold mb-2">{m.title}</h3>
              <p className="text-white/70">{m.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.stack}</h2>
        <ul className="flex flex-wrap gap-2">
          {t.stackList.map((s: string, i: number) => (
            <li key={i} className="px-4 py-2 border border-white/15 rounded-full text-sm text-white/80">{s}</li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.industries}</h2>
        <ul className="flex flex-wrap gap-2">
          {t.industriesList.map((s: string, i: number) => (
            <li key={i} className="px-4 py-2 border border-white/15 rounded-full text-sm text-white/80">{s}</li>
          ))}
        </ul>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-16 max-w-6xl mx-auto border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.coverage.includes ? t.coverage : 'Cobertura'}</h2>
        <p className="text-white/70 max-w-3xl">{t.coverageDesc}</p>
      </section>

      <section className="px-6 md:px-10 lg:px-20 py-20 max-w-6xl mx-auto border-t border-white/10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.contact}</h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">{t.contactCta}</p>
        <Link href={`/${locale}${t.contactPath}`} className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">{t.cta}</Link>
      </section>
    </main>
  )
}
