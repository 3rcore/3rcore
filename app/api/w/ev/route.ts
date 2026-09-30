import { NextRequest, NextResponse } from "next/server";
import { COLECTOR, SITIO } from "../destino";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Puente entre el navegador y el almacén de medición de Websy.
 *
 * El navegador habla SIEMPRE con 3rcore.com, nunca con otro dominio: eso es
 * lo que hace que ningún bloqueador se coma los eventos y lo que evita tener
 * que abrir la política de seguridad del sitio a un tercero.
 *
 * Aquí se añade lo que el navegador no puede saber de sí mismo con fiabilidad
 * —la ciudad, el país, el user-agent— usando lo que Vercel ya resuelve en el
 * borde, y se reenvía al colector. La IP no se guarda en ningún sitio: el
 * colector la convierte en una huella con sal y la tira.
 */
export async function POST(req: NextRequest) {
  try {
    const texto = await req.text();
    // Un visitante real no manda tandas enormes. Esto corta de raíz que
    // alguien intente usar la ruta para colar un cuerpo gigante.
    if (texto.length > 120_000) {
      return NextResponse.json({ ok: false }, { status: 413 });
    }

    const cuerpo = JSON.parse(texto);

    const r = await fetch(`${COLECTOR}/api/w/ingest`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...cuerpo,
        sitio: SITIO,
        ctx: {
          ua: req.headers.get("user-agent") ?? "",
          ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
          pais: req.headers.get("x-vercel-ip-country") ?? "",
          region: req.headers.get("x-vercel-ip-country-region") ?? "",
          ciudad: descodificar(req.headers.get("x-vercel-ip-city")),
        },
      }),
      // Si el colector tarda, la medición se pierde: nunca la página.
      signal: AbortSignal.timeout(4000),
    });

    return NextResponse.json({ ok: r.ok });
  } catch {
    // La medición jamás devuelve error al navegador. Un fallo aquí no puede
    // aparecer en la consola del visitante ni ensuciar los errores de JS.
    return NextResponse.json({ ok: false });
  }
}

/** Vercel manda la ciudad codificada en la cabecera ("Villa%20El%20Salvador"). */
function descodificar(v: string | null): string {
  if (!v) return "";
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}
