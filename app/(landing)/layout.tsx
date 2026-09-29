import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./landing.css";
import AttributionCapture from "@/components/global/AttributionCapture";
import WTrack from "@/components/global/WTrack";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://3rcore.com"),
};

export default function LandingRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-54VJ6F97');`}
        </Script>
        {/* Google Analytics 4 + Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SQBPMGH3BM"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SQBPMGH3BM');
          gtag('config', 'AW-17933910865');`}
        </Script>
        {/* Microsoft Clarity — mapa de calor + grabaciones de sesión.
            Inerte hasta definir NEXT_PUBLIC_CLARITY_ID en el entorno (Vercel). */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
        {/* 3R CORE — tracker propio de comportamiento → vista "Comportamiento" del panel.
            Privacy-safe (sin PII). Beacons same-origin a /panel/api/ux-ingest. */}
        <Script src="/_ux/t.js" strategy="afterInteractive" data-endpoint="/panel/api/ux-ingest" />
      </head>
      <body suppressHydrationWarning={true}>
        <AttributionCapture />
        <WTrack />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-54VJ6F97"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
