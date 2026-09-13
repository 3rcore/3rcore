"use client";

import { useState, useEffect, useRef } from "react";
import type { AppPathname } from "@/i18n/routing";
import Image from "next/image";
import gsap from "gsap";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const currentLocale = useLocale();

  // En un post de blog concreto (/blogs/{slug}) no todos los idiomas existen,
  // así que el cambio de idioma va al listado /blogs (200) en vez de a un
  // /en/blogs/{slug} inexistente (404). En el resto de páginas conserva la ruta.
  // usePathname() con `pathnames` devuelve la ruta interna (en español), que
  // es justo lo que Link necesita para reescribirla al slug del otro locale.
  // Rutas que existen en UN solo mercado: /nearshore-marketing-agency solo en
  // /en y /marketing-para-negocios-hispanos solo en /us. Mantener la ruta al
  // cambiar de idioma llevaba a un 404, así que el selector cae a la home.
  const MARKET_ONLY = ["/nearshore-marketing-agency", "/marketing-para-negocios-hispanos", "/casos-de-exito"];
  const localeSwitchHref = (
    /^\/blogs\/[^/]+$/.test(pathname)
      ? "/blogs"
      : MARKET_ONLY.includes(pathname)
        ? "/"
        : pathname
  ) as AppPathname;

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  // Rediseño de Aymar: con la página arriba del todo la barra va transparente
  // sobre el video del hero y recupera su fondo sólido al hacer scroll.
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Mobile services dropdown state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // GSAP refs for services dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownItemsRef = useRef<HTMLAnchorElement[]>([]);
  const servicesBackdropRef = useRef<HTMLDivElement>(null);

  const handleScrollTop = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("contacto") ?? document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname);
      }, 100);
    }
    setIsOpen(false);
  };

  // Services dropdown GSAP init
  useEffect(() => {
    if (!dropdownRef.current) return;
    gsap.set(dropdownRef.current, {
      opacity: 0,
      y: -8,
      pointerEvents: "none",
      display: "none",
    });
    gsap.set(dropdownItemsRef.current, { x: -8, opacity: 0 });
  }, []);

  const openServices = () => {
    if (servicesOpen) return;
    setServicesOpen(true);

    gsap.set(dropdownRef.current, { display: "flex" });

    const tl = gsap.timeline();
    tl.to(dropdownRef.current, {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      duration: 0.3,
      ease: "power3.out",
    }).to(
      dropdownItemsRef.current,
      {
        x: 0,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
        stagger: 0.06,
      },
      "-=0.15"
    );

    gsap.to(servicesBackdropRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.2,
    });
  };

  const closeServices = () => {
    if (!servicesOpen) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setServicesOpen(false);
        gsap.set(dropdownRef.current, { display: "none" });
        // Reset items for next open
        gsap.set(dropdownItemsRef.current, { x: -8, opacity: 0 });
      },
    });

    tl.to(dropdownItemsRef.current, {
      x: -6,
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      stagger: { each: 0.04, from: "end" },
    }).to(
      dropdownRef.current,
      {
        opacity: 0,
        y: -6,
        pointerEvents: "none",
        duration: 0.25,
        ease: "power3.in",
      },
      "-=0.05"
    );

    gsap.to(servicesBackdropRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.2,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setMobileServicesOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (isOpen) return;
        const currentScrollY = window.scrollY;
        setIsAtTop(currentScrollY < 10);

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
          closeServices();
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY, isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Los labels salen de messages/{locale}.json. Antes estaban hardcodeados en
  // español y el menú de /en mostraba "Posicionamiento SEO" / "Tiendas
  // Virtuales" / "Diseño Web" a visitantes en inglés (rebote 69,4% en /en vs
  // 39,6% en /es). Los href se mantienen: son las rutas reales del App Router.
  // En Estados Unidos solo se venden tres servicios: web, SEO y tiendas online.
  // El menú de /en y /us ofrecía los nueve, así que prometía un catálogo que
  // allí no existe y repartía los enlaces internos entre nueve destinos en vez
  // de concentrarlos en los tres que venden.
  const ALL_SERVICES: { href: AppPathname; label: string }[] = [
    { href: "/posicionamiento-seo", label: t("services.seo") },
    { href: "/servicios/google-ads", label: t("services.googleAds") },
    { href: "/tiendas-virtuales-lima", label: t("services.ecommerce") },
    { href: "/servicios/web-development", label: t("services.webDesign") },
    { href: "/servicios/ugc", label: t("services.ugc") },
    { href: "/servicios/influencer-marketing", label: t("services.influencers") },
    { href: "/servicios/relaciones-publicas", label: t("services.pr") },
    { href: "/servicios/socialmedia", label: t("services.socialMedia") },
    { href: "/servicios/branding", label: t("services.branding") },
  ];
  const US_SERVICES: AppPathname[] = [
    "/servicios/web-development",
    "/posicionamiento-seo",
    "/tiendas-virtuales-lima",
  ];
  // 13-sep-2026. Plan USA de 3R Core (Piero Roque): en /en los tres servicios
  // van en el orden SEO, Web Development, Online Stores. /us conserva el suyo.
  const EN_SERVICES: AppPathname[] = [
    "/posicionamiento-seo",
    "/servicios/web-development",
    "/tiendas-virtuales-lima",
  ];
  // 13-sep-2026. Plan Perú: Google Ads y Posicionamiento SEO van al frente y del
  // resto del catálogo solo quedan Desarrollo web, Social Media y Branding.
  const ES_SERVICES: AppPathname[] = [
    "/servicios/google-ads",
    "/posicionamiento-seo",
    "/servicios/web-development",
    "/servicios/socialmedia",
    "/servicios/branding",
  ];
  // 28-ago-2026. Las páginas ancla de cada mercado estaban con UN solo enlace
  // interno en todo el sitio y las tres seguían "Descubiertas: actualmente sin
  // indexar" dieciséis días después de publicarse. Colgar del menú es lo que
  // les da un enlace desde cada página del sitio, incluidas las que Google sí
  // tiene indexadas. Se quedan fuera de /es a propósito: allí no existen.
  // 13-sep-2026. Plan USA: el /en no menciona Perú en ninguna parte, así que
  // «Why a Peruvian agency» (/nearshore-marketing-agency) sale del menú. La
  // página sigue publicada.
  const MARKET_ANCHORS: Record<string, { href: AppPathname; label: string }[]> = {
    en: [
      { href: "/spanish-seo-services", label: t("services.spanishSeo") },
      { href: "/hispanic-marketing-agency", label: t("services.hispanic") },
    ],
    us: [
      { href: "/marketing-para-negocios-hispanos", label: t("services.hispanic") },
    ],
  };
  const pickServices = (hrefs: AppPathname[]) =>
    hrefs.map((h) => ALL_SERVICES.find((s) => s.href === h)!);
  const services =
    currentLocale === "es"
      ? pickServices(ES_SERVICES)
      : [
          ...pickServices(currentLocale === "en" ? EN_SERVICES : US_SERVICES),
          ...(MARKET_ANCHORS[currentLocale] ?? []),
        ];

  // '/servicios#servicios' y '#contacto' no son rutas: el primero se separa
  // en pathname + hash y el segundo es un ancla de la misma página.
  const links: { name: string; href: AppPathname; hash?: string; isServices?: boolean; isContact?: boolean }[] = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about us"), href: "/nosotros" },
    { name: t("nav.services"), href: "/servicios", hash: "#servicios", isServices: true },
    // Solo /es: la página vive únicamente en el mercado peruano
    ...(currentLocale === "es" ? [{ name: t("nav.cases"), href: "/casos-de-exito" as AppPathname }] : []),
    { name: t("nav.blogs"), href: "/blogs" },
    // 29-ago-2026. /cotizar es una calculadora real —precios publicados, moneda
    // por mercado y guardado del lead— y recibía 8 enlaces internos en todo el
    // sitio, ninguno desde el menú. Es la vía de contacto de menos fricción que
    // tiene la agencia: no pide hablar con nadie, devuelve un número.
    { name: t("nav.quote"), href: "/cotizar" },
    { name: t("nav.contact"), href: "/", hash: currentLocale === "en" ? "#contact" : "#contacto", isContact: true },
  ];

  // Menú lateral del rediseño de Aymar (aprobado por el cliente, ago-2026).
  // Los textos van fijos en español a propósito (este menú solo se monta en el
  // mercado peruano); /en y /us conservan su propio menú.
  // 13-sep-2026. Plan Perú de 3R Core (Piero Roque): Google Ads y
  // Posicionamiento SEO suben a primer nivel y lo demás se agrupa bajo
  // «Servicios» (Desarrollo web, Social Media, Branding). Precios no va en el
  // menú: no se publican montos. Tiendas virtuales y Casos de éxito salen del
  // menú; sus páginas siguen publicadas.
  const ES_SIDE_LINKS: typeof links = [
    { name: "INICIO", href: "/" },
    { name: "NOSOTROS", href: "/nosotros" },
    { name: "GOOGLE ADS", href: "/servicios/google-ads" },
    { name: "POSICIONAMIENTO SEO", href: "/posicionamiento-seo" },
    { name: "SERVICIOS", href: "/servicios", isServices: true },
    { name: "BLOG", href: "/blogs" },
    { name: "CONTÁCTANOS", href: "/", hash: "#contacto", isContact: true },
  ];
  const ES_SIDE_SUBLINKS: { href: AppPathname; label: string }[] = [
    { href: "/servicios/web-development", label: "DESARROLLO WEB" },
    { href: "/servicios/socialmedia", label: "SOCIAL MEDIA" },
    { href: "/servicios/branding", label: "BRANDING" },
  ];
  // /us: mismo menú que Perú pero con el catálogo de tres servicios de ese
  // mercado (pedido del cliente, 20-ago) — sin desplegable de marketing ni
  // casos de éxito, que solo existen en /es. El orden es el que dictó el
  // cliente: tiendas, webs, SEO.
  const US_SIDE_LINKS: typeof links = [
    { name: "INICIO", href: "/" },
    { name: "NOSOTROS", href: "/nosotros" },
    { name: "DESARROLLO DE TIENDAS VIRTUALES", href: "/tiendas-virtuales-lima" },
    { name: "DESARROLLO DE PÁGINAS WEBS", href: "/servicios/web-development" },
    { name: "POSICIONAMIENTO SEO", href: "/posicionamiento-seo" },
    { name: "PRECIOS", href: "/precios" },
    { name: "BLOG", href: "/blogs" },
    { name: "CONTÁCTANOS", href: "/", hash: "#contacto", isContact: true },
  ];
  const sideLinks =
    currentLocale === "es" ? ES_SIDE_LINKS
    : currentLocale === "us" ? US_SIDE_LINKS
    : links;
  const sideSublinks = currentLocale === "es" ? ES_SIDE_SUBLINKS : services;
  // Los menús de /es (7 entradas) y /us (8) usan tipografía y cascada más
  // compactas para caber en un móvil; /en conserva sus 6 a tamaño original.
  const sideItemSize =
    currentLocale === "en"
      ? "text-3xl sm:text-3xl py-4 sm:py-6"
      : "text-lg sm:text-2xl py-3 sm:py-4";
  const sideDelayStep = currentLocale === "en" ? 100 : 60;
  const sideSubItemSize =
    currentLocale === "en" ? "py-2.5 text-base" : "py-1.5 text-xs sm:text-sm";

  const socialLinks = [
    { name: "FACEBOOK", href: "https://www.facebook.com/3Rcore/" },
    { name: "INSTAGRAM", href: "https://www.instagram.com/3rcore_/?hl=es" },
    { name: "LINKEDIN", href: "https://www.linkedin.com/company/3r-core/" },
    { name: "TIKTOK", href: "https://www.tiktok.com/@3rcore" },
  ];

  return (
    <>
      {/* Services backdrop — closes dropdown on outside click */}
      <div
        ref={servicesBackdropRef}
        className="fixed inset-0 z-[49]"
        style={{ opacity: 0, pointerEvents: "none" }}
        onClick={closeServices}
      />

      <nav
        className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-500 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          ${isAtTop && !isOpen ? "bg-transparent" : "bg-[#130218]"}`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-24 lg:h-18 xl:h-24 relative">

            <div className="flex items-center gap-6 flex-shrink-0 relative z-[60]">

              <Link
                href="/"
                onClick={() => handleScrollTop("/")}
              >
                <div className="relative h-15 w-28 cursor-pointer">
                  <Image
                    src="/icons/LogoFull.webp"
                    alt="3RCORE Logo"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
              
              <div className="relative hidden md:block">
                <button
                  onMouseEnter={openServices}
                  onClick={() => servicesOpen ? closeServices() : openServices()}
                  className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-200 focus:outline-none group"
                >
                  <span
                    className="px-3 py-1.5 rounded-full  transition-colors duration-200"
                  >
                    {t("nav.services")}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown panel */}
                <div
                  ref={dropdownRef}
                  className="absolute top-[calc(100%+12px)] left-0 flex-col gap-1 py-3 px-1 rounded-xl shadow-2xl min-w-[200px] border border-white/10"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(19,2,24,0.98) 0%, rgba(30,4,40,0.98) 100%)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {/* Gradient accent top bar */}
                  <div
                    className="absolute top-0 left-4 right-4 h-[1px] rounded-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #9C27B0, #FF1A55)",
                    }}
                  />

                  {services.map((service, i) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      ref={(el) => { if (el) dropdownItemsRef.current[i] = el; }}
                      onClick={() => {
                        handleScrollTop(service.href);
                        closeServices();
                      }}
                      className="group/item flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover/item:scale-125"
                        style={{
                          background:
                            "linear-gradient(to right, #9C27B0, #FF1A55)",
                        }}
                      />
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Center: tagline */}
            <div
              className={`hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs tracking-wide transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="text-white">{t("regular")}</span>
              <span className="font-bold ml-2 text-white">{t("bold")}</span>
            </div>

            {/* Right: language + menu */}
            <div className="flex items-center gap-6 relative z-[60]">
              <div
                className={`flex items-center gap-4 text-xs font-bold tracking-widest transition-opacity duration-300 ${
                  isOpen ? "opacity-0 delay-0" : "opacity-100 delay-300"
                } text-gray-400`}
              >
                {/* Dos opciones: el selector es para el HUMANO y va por IDIOMA.
                    El servicio presencial de 3R Core es solo Perú, así que
                    «español» es Perú. El locale es-US (/us) sigue vivo e
                    indexado; a ese usuario lo enruta Google por hreflang, que
                    es para lo que existe — no por este botón. */}
                <Link
                  href={localeSwitchHref}
                  locale="es"
                  // next-intl deriva hrefLang del prop `locale`. Se declara
                  // explícito para no emitir códigos inválidos.
                  hrefLang="es"
                  title="Español"
                  className={`hover:text-[#E91E63] transition-colors cursor-pointer uppercase ${currentLocale === 'es' || currentLocale === 'us' ? 'text-white' : ''}`}
                >
                  ES
                </Link>
                <Link
                  href={localeSwitchHref}
                  locale="en"
                  hrefLang="en"
                  title="English"
                  className={`hover:text-[#E91E63] transition-colors cursor-pointer uppercase ${currentLocale === 'en' ? 'text-white' : ''}`}
                >
                  EN
                </Link>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-3 text-xs font-bold focus:outline-none tracking-widest uppercase hover:text-gray-300 transition-colors"
              >
                <span className="hidden sm:block">MENU</span>
                <div className="flex flex-col justify-center items-end w-6 h-6 gap-[5px] cursor-pointer">
                  <span
                    className={`block h-[2px] bg-white transition-all duration-500 ease-in-out ${
                      isOpen ? "w-6" : "w-4 group-hover:w-6"
                    }`}
                  />
                  <span
                    className={`block h-[2px] bg-white transition-all duration-500 ease-in-out ${
                      isOpen ? "w-6" : "w-6"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-[#130218] flex overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]
          ${isOpen
            ? "left-0 opacity-100 visible pointer-events-auto"
            : "left-1/2 opacity-0 invisible pointer-events-none"
          }`}
        style={{ width: isOpen ? "100%" : "0%", left: isOpen ? "0%" : "50%" }}
      >
        <div className="w-full h-full flex flex-col lg:flex-row">
          <div
            onClick={() => { setIsOpen(false); handleScrollTop("/"); }}
            className="hidden lg:flex flex-1 items-center justify-center bg-[#130218] relative border-r border-white/10"
          >
            <Link
              href="/"
              className={`relative h-100 w-100 cursor-pointer transition-all duration-700 delay-300 transform ${
                isOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-10"
              }`}
            >
              <Image
                src="/icons/LogoFull.webp"
                alt="3RCORE Logo Large"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-between bg-[#130218] p-8 sm:p-16 pt-20 lg:pt-12 overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors cursor-pointer z-20"
            >
              {t("clo")}
            </button>

            <ul className="flex flex-col space-y-0">
              {sideLinks.map((link, index) => (
                <li key={link.name} className="group overflow-hidden">
                  {link.isServices ? (
                    // Desplegable de servicios: un toque abre, otro cierra
                    // (el rediseño elimina el "segundo tap navega").
                    <div>
                      <div
                        className={`flex items-center justify-between ${sideItemSize} font-bold tracking-tight text-white border-b border-white/20 relative transition-all duration-500 transform cursor-pointer
                          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                          hover:text-white hover:pl-4
                        `}
                        style={{ transitionDelay: `${150 + index * sideDelayStep}ms` }}
                        onClick={() => {
                          setMobileServicesOpen(!mobileServicesOpen);
                        }}
                      >
                        <span className="absolute top-0 left-0 w-0 h-full z-[-1] transition-all duration-500 group-hover:w-full bg-gradient-to-r from-[rgba(156,39,176,0.25)] to-[rgba(233,30,99,0.25)]" />
                        <span className="flex-1">{link.name}</span>
                        {/* Chevron indicator */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 flex-shrink-0 transition-transform duration-300"
                          style={{
                            transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>

                      {/* Services dropdown */}
                      <div
                        className={`overflow-hidden transition-all ease-in-out ${
                          mobileServicesOpen ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0 py-0"
                        }`}
                        style={{ transitionDuration: "350ms" }}
                      >
                        <div className="pl-4 py-2 flex flex-col gap-1.5 border-b border-white/10 bg-black/20 rounded-lg my-1">
                          {sideSublinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => {
                                setIsOpen(false);
                                handleScrollTop(sub.href);
                              }}
                              className={`flex items-center gap-2.5 ${sideSubItemSize} font-medium text-white/60 hover:text-white transition-colors duration-200`}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{
                                  background: "linear-gradient(to right, #9C27B0, #FF1A55)",
                                }}
                              />
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (link.isContact) {
                          scrollToContact(e);
                        } else {
                          setIsOpen(false);
                          handleScrollTop(link.href);
                        }
                      }}
                      className={`block ${sideItemSize} font-bold tracking-tight text-white border-b border-white/20 relative transition-all duration-500 transform
                        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                        hover:text-white hover:pl-4
                      `}
                      style={{ transitionDelay: `${150 + index * sideDelayStep}ms` }}
                    >
                      <span className="absolute top-0 left-0 w-0 h-full z-[-1] transition-all duration-500 group-hover:w-full bg-gradient-to-r from-[rgba(156,39,176,0.25)] to-[rgba(233,30,99,0.25)]" />
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs font-bold tracking-widest text-white/50 mt-12 transition-all duration-700 delay-700 transform ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex gap-4 sm:gap-6 mb-4 sm:mb-0">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;