"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { TEL_MAIN } from "@/lib/contact";
import type { AppPathname } from "@/i18n/routing";
import { NAP } from '@/lib/nap';

const Footer = () => {

  const t = useTranslations('Footer');
  // El footer listaba cuatro servicios fijados a mano. En /en y /us solo se
  // venden web, SEO y tiendas online, así que ofrecer branding, social media
  // y Google Ads allí promete un catálogo que no existe.
  // 13-sep-2026. Planes de reposicionamiento de 3R Core (Piero Roque): en /es
  // Google Ads y Posicionamiento SEO van al frente; en /en los tres servicios
  // van en orden SEO, Web Development, Online Stores y sale «Why a Peruvian
  // agency», porque el /en no menciona Perú. /us sin cambios.
  const tn = useTranslations('Navbar');
  const locale = useLocale();
  const footerServices: { href: AppPathname; label: string }[] =
    locale === 'es'
      ? [
          // El índice de servicios recibía 2 enlaces internos mientras sus
          // propias hijas recibían entre 41 y 71. La jerarquía estaba del revés.
          { href: '/servicios', label: tn('services.todos') },
          { href: '/servicios/google-ads', label: tn('services.googleAds') },
          { href: '/posicionamiento-seo', label: tn('services.seo') },
          { href: '/servicios/web-development', label: tn('services.webDesign') },
          { href: '/servicios/socialmedia', label: tn('services.socialMedia') },
          { href: '/servicios/branding', label: tn('services.branding') },
        ]
      : locale === 'en'
      ? [
          { href: '/servicios', label: tn('services.todos') },
          { href: '/posicionamiento-seo', label: tn('services.seo') },
          { href: '/servicios/web-development', label: tn('services.webDesign') },
          { href: '/tiendas-virtuales-lima', label: tn('services.ecommerce') },
          // Ver el comentario de MARKET_ANCHORS en Navbar.tsx: estas páginas
          // estaban huérfanas y sin indexar.
          { href: '/spanish-seo-services', label: tn('services.spanishSeo') },
          { href: '/hispanic-marketing-agency', label: tn('services.hispanic') },
        ]
      : [
          { href: '/servicios', label: tn('services.todos') },
          { href: '/servicios/web-development', label: tn('services.webDesign') },
          { href: '/posicionamiento-seo', label: tn('services.seo') },
          { href: '/tiendas-virtuales-lima', label: tn('services.ecommerce') },
          { href: '/marketing-para-negocios-hispanos', label: tn('services.hispanic') },
        ];


  const pathname = usePathname();

  const handleScrollTop = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <footer className="text-white pt-16 pb-8 px-10 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="flex justify-start items-start">
            <div className="relative w-60 h-30">
              <Image
                src="/icons/LogoLetrasBlanco.webp"
                alt="3R Core Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold lg:text-sm 2xl:text-base uppercase tracking-widest mb-6">{ t('agency')}</h3>
            <div className="text-gray-200 text-sm lg:text-xs xl:text-sm leading-relaxed space-y-1">
              {locale === 'en' ? (
                // 13-sep-2026. Plan USA: el /en se presenta para todo EE. UU.,
                // sin dirección en Perú.
                <p>
                  Serving the U.S. Nationwide
                  <br />
                  SEO · Web Development · Online Stores
                </p>
              ) : (
                // Dirección desde lib/nap.ts: una sola fuente para todo el sitio.
                <p>
                  {NAP.street}
                  <br />
                  Urb El Remanso, {NAP.district}. {NAP.region} - Perú
                </p>
              )}
              <p>
                { t('A')}<br />{locale === 'en' ? '9am to 6pm' : '9am a 6pm'}
              </p>
            </div>
          </div>

          <div className="flex  lg:justify-center">
            <div className="2xl:w-[60%]">
              <h3 className="text-white font-bold lg:text-sm 2xl:text-base uppercase tracking-widest mb-6">{ t('services')}</h3>
              <ul className="space-y-3 text-sm lg:text-xs xl:text-sm text-gray-200">
                {footerServices.map((sv) => (
                  <li key={sv.href}>
                    <Link
                      href={sv.href}
                      onClick={() => handleScrollTop(sv.href)}
                      className="hover:text-pink-500 transition-colors duration-300"
                    >
                      {sv.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 29-ago-2026. Las 43 URLs de /en y /us no tenían NI UN correo ni un
              teléfono pulsable: la única vía de contacto en todo el mercado de
              EE.UU. era un WhatsApp peruano con el texto prerrellenado en
              español. En /es sí existían, pero solo en algunas páginas.
              Ahora el correo va en el pie de las 218.
              ⚠️ PENDIENTE DEL CLIENTE: un número de EE.UU. Aquí no se inventa
              uno: se muestra el que atiende, diciendo el horario en que se
              atiende, que es información verdadera y útil. */}
          <div className="flex flex-col items-start">
            <h3 className="text-white font-bold lg:text-sm 2xl:text-base uppercase tracking-widest mb-6">
              {locale === 'en' ? 'Contact' : 'Contacto'}
            </h3>
            <ul className="space-y-2 text-gray-200 lg:text-xs 2xl:text-sm mb-8">
              <li>
                <a href="mailto:info@3rcore.com" className="hover:text-pink-500 transition-colors duration-300">
                  info@3rcore.com
                </a>
              </li>
              <li>
                <a href={`tel:${TEL_MAIN}`} className="hover:text-pink-500 transition-colors duration-300">
                  {TEL_MAIN}
                </a>
              </li>
              <li className="text-gray-400 text-[11px] leading-snug max-w-[240px]">
                {locale === 'en'
                  ? 'We work U.S. Eastern business hours.'
                  : locale === 'us'
                    ? 'Nuestro equipo está en Lima y atiende en horario del este de EE.UU.'
                    : 'Oficina en La Molina, Lima. Lunes a viernes.'}
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-white font-bold lg:text-sm 2xl:text-base uppercase tracking-widest mb-6">{ t('socialMedia')}</h3>
            <div className="flex gap-4">
              <SocialIcon href="https://www.facebook.com/3Rcore/" icon={<FaFacebookF />} />
              <SocialIcon href="https://www.instagram.com/3rcore_/?hl=es" icon={<FaInstagram />} />
              <SocialIcon href="https://www.linkedin.com/company/3r-core/" icon={<FaLinkedinIn />} />
              <SocialIcon href="https://www.tiktok.com/@3rcore" icon={<FaTiktok />} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[10px] tracking-widest text-gray-200">
            <Link
              href="/politicas"
              className="hover:text-pink-500 transition-colors duration-300 relative group"
            >
              { t('privacyPolicy')}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A21F8A] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/terminos"
              className="hover:text-pink-500 transition-colors duration-300 relative group"
            >
              { t('termsConditions')}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A21F8A] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/preguntas"
              className="hover:text-pink-500 transition-colors duration-300 relative group"
            >
              { t('pregunta')}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A21F8A] group-hover:w-full transition-all duration-300"></span>
            </Link>

          </div>

          <div className="text-[10px] uppercase tracking-widest text-white">
            { t('copyright')}
          </div>
        </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative text-white text-lg p-2 rounded-md border border-white/20 transition-all duration-500 ease-out hover:border-[#A21F8A] hover:-translate-y-0.5 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#A21F8A] to-[#6B0F5C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
    </a>
  );
};

export default Footer;
