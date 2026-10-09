/* Cascarón que mete una página del prototipo dentro del layout REAL de
   3R Core: navbar, pie y comportamiento del cliente sin tocar una coma.
   El contenido va aislado bajo `.proto`, y proto.css está reescrito para
   que ninguna de sus reglas escape a las páginas del cliente. */
import fs from 'fs';
import path from 'path';
import Script from 'next/script';
import '@/app/proto.css';
import ProtoLeadWiring from './ProtoLeadWiring';

// `slots`: HTML que sustituye a cada marcador <!--slot:nombre--> del fragmento
// (9-oct-2026, bloque de prueba común de lib/prueba-servicio.ts). Sin slots, el
// fragmento se sirve exactamente igual que antes.
export default function ProtoPage({ frag, slots }: { frag: string; slots?: Record<string, string> }) {
  const ruta = path.join(process.cwd(), 'proto-html', `${frag}.html`);
  let html = fs.readFileSync(ruta, 'utf8');
  for (const [k, v] of Object.entries(slots || {})) html = html.split(`<!--slot:${k}-->`).join(v);
  return (
    <>
      <div className="proto" dangerouslySetInnerHTML={{ __html: html }} />
      {/* Conecta formularios y wa.me del prototipo a la captura real + medición */}
      <ProtoLeadWiring />
      <Script src="/proto/proto.js" strategy="afterInteractive" />
    </>
  );
}
