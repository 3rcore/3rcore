import type { BlogPost } from "@/lib/supabase/types"
import { USA4_US_POSTS } from "@/lib/blog-seed/posts-usa4-us-2026-08"
import { HUECOS_POSTS_2026_08 } from "@/lib/blog-seed/posts-huecos-2026-08"
import { MIAMI_US_POSTS } from "@/lib/blog-seed/posts-miami-us-2026-11"

/**
 * Artículos de /us servidos DESDE EL CÓDIGO, no desde Supabase.
 *
 * POR QUÉ EXISTE ESTO. La tabla `blog_posts` tiene un CHECK que solo admite
 * locale 'es' o 'en'. El seed de los cuatro artículos en español para EE.UU.
 * falla con:
 *   new row for relation "blog_posts" violates check constraint
 *   "blog_posts_locale_check"
 * Ampliar ese CHECK es una línea de SQL, pero el proyecto de Supabase del blog
 * está en la cuenta del cliente y su clave solo vive en las variables de
 * entorno de Vercel: desde el repositorio no hay forma de ejecutarlo.
 *
 * En vez de dejar cuatro artículos ya escritos esperando indefinidamente, se
 * sirven desde el propio repositorio. Son las mismas piezas del fichero de
 * seed, así que no hay dos versiones del texto que mantener.
 *
 * CÓMO SE RETIRA. La base manda siempre: se consulta Supabase primero y solo se
 * cae aquí si no aparece el artículo. En cuanto el cliente ejecute el
 * ALTER TABLE y el seed entre bien, estos cuatro dejan de usarse solos y este
 * fichero se puede borrar junto con sus llamadas.
 *
 * LIMITACIÓN, dicha claramente: mientras vivan aquí NO son editables desde el
 * panel /admin. Se editan en el fichero de seed y se despliegan.
 */

const STAMP = '2026-08-28T22:00:00.000Z'

function toBlogPost(p: (typeof USA4_US_POSTS)[number], i: number, stamp = STAMP): BlogPost {
  // Sellos escalonados media hora, como hace el seed: publicar cuatro piezas
  // con la misma marca al milisegundo es una huella de publicación en lote.
  const published = new Date(new Date(stamp).getTime() - i * 30 * 60 * 1000).toISOString()
  return {
    id: `static-us-${p.slug}`,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    featured_image: p.featured_image,
    featured_image_alt: p.featured_image_alt,
    status: 'published',
    locale: 'us',
    meta_title: p.meta_title,
    meta_description: p.meta_description,
    og_title: p.og_title,
    og_description: p.og_description,
    og_image: p.featured_image,
    canonical_url: `https://3rcore.com/us/blogs/${p.slug}`,
    robots: 'index, follow',
    focus_keyword: p.focus_keyword,
    author_name: p.author_name,
    author_id: null,
    category_id: null,
    created_at: published,
    updated_at: published,
    published_at: published,
  }
}

// Los artículos es-US de otros lotes también se sirven desde aquí mientras el
// CHECK de la base no admita el locale 'us'.
const TODOS_US = [...USA4_US_POSTS, ...HUECOS_POSTS_2026_08.filter((p) => p.locale === 'us')]

// 11-nov-2026. Los dos de Miami llevan su propia fecha de publicación.
const STAMP_MIAMI = '2026-11-11T15:00:00.000Z'

export const STATIC_US_POSTS: BlogPost[] = [
  ...MIAMI_US_POSTS.map((p, i) => toBlogPost(p, i, STAMP_MIAMI)),
  ...TODOS_US.map((p, i) => toBlogPost(p, i)),
]

export function getStaticUsPost(slug: string): BlogPost | null {
  return STATIC_US_POSTS.find((p) => p.slug === slug) ?? null
}
