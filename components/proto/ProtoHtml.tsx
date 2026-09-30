/* Igual que ProtoPage, pero el HTML llega ya armado (lib/landings-peru.ts)
   en vez de leerse de proto-html/. Mismo aislamiento bajo `.proto`, misma
   captura de leads y mismo proto.js. */
import Script from 'next/script';
import '@/app/proto.css';
import ProtoLeadWiring from './ProtoLeadWiring';

export default function ProtoHtml({ html }: { html: string }) {
  return (
    <>
      <div className="proto" dangerouslySetInnerHTML={{ __html: html }} />
      <ProtoLeadWiring />
      <Script src="/proto/proto.js" strategy="afterInteractive" />
    </>
  );
}
