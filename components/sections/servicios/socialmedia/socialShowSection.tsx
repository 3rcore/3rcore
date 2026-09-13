"use client";

import Image from 'next/image';
import { useLocale } from 'next-intl';

export function SocialShowSection() {
  // 13-sep-2026. Plan USA: en /en el texto alternativo no nombra Lima ni Perú.
  const isEn = useLocale() === "en";
  

  return (
        <section className="relative h-[25vh] lg:h-[70vh] w-full overflow-hidden">
          <Image
            src="/images/social/fondoFi.png"
            alt={isEn ? "Social media management and community management - 3R Core" : "Agencia de manejo de redes sociales y community manager en Lima Perú - 3R Core"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </section>
  );
}