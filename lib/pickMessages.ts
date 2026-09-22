type Messages = Record<string, unknown>

/**
 * Recorta el diccionario de mensajes de next-intl a solo los namespaces que
 * una ruta concreta necesita en el cliente.
 *
 * Por qué hace falta: `NextIntlClientProvider` incrusta TODO lo que recibe en
 * `messages` dentro del payload de hidratación (los chunks `self.__next_f.push`
 * del HTML fuente). El layout raíz (`app/[locale]/layout.tsx`) carga con
 * `getMessages()` el diccionario COMPLETO del locale — namespaces de las ~40
 * rutas de /en, no solo la que se está sirviendo — y lo pasa entero al
 * provider que envuelve todas las páginas. Google no lo nota (ejecuta JS y
 * solo ve el DOM final), pero GPTBot y ClaudeBot no ejecutan JS: leen ese
 * `<script>` crudo, así que heredan también los namespaces de páginas legales
 * o de otros mercados que sí mencionan Perú/Lima, aunque la página visitada
 * (home, /nosotros) no los muestre ni los necesite.
 *
 * Usar solo en rutas donde la lista de namespaces se ha verificado contra el
 * árbol real de componentes cliente (useTranslations), no contra lo que
 * "parece" que hace falta — un namespace de menos deja un `t()` sin dato.
 */
export function pickMessages(messages: Messages, namespaces: string[]): Messages {
  const picked: Messages = {}
  for (const ns of namespaces) {
    if (messages[ns] !== undefined) picked[ns] = messages[ns]
  }
  return picked
}
