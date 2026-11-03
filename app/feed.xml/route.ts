/**
 * /feed.xml — RSS de los últimos artículos del blog de Perú (/es/blogs).
 *
 * 3-nov-2026. Idea tomada de flamacreators.com, que publica feed RSS y lo
 * declara en el <head>. Un feed avisa de cada artículo nuevo a lectores RSS,
 * agregadores y rastreadores (incluidos los de IA) sin esperar al sitemap.
 * Mismos filtros que el listado del blog: solo publicados y sin los slugs
 * consolidados, que redirigen.
 */
import { createServerClient } from '@/lib/supabase/server'
import { CONSOLIDATED_SLUGS_IN } from '@/lib/blog-consolidated'
import { BASE_URL } from '@/lib/metadata'

export const revalidate = 3600

const xml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

type Row = { slug: string; title: string; excerpt: string | null; published_at: string | null; author_name: string | null }

export async function GET() {
  let posts: Row[] = []
  try {
    const { data } = await createServerClient()
      .from('blog_posts')
      .select('slug, title, excerpt, published_at, author_name')
      .eq('status', 'published')
      .eq('locale', 'es')
      .not('slug', 'in', CONSOLIDATED_SLUGS_IN)
      .order('published_at', { ascending: false })
      .limit(30)
    posts = (data as Row[] | null) ?? []
  } catch {
    // Si la base falla se sirve el canal vacío, no un 500.
  }

  const items = posts
    .map((p) => {
      const url = `${BASE_URL}/es/blogs/${p.slug}`
      return `    <item>
      <title>${xml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${p.published_at ? `<pubDate>${new Date(p.published_at).toUTCString()}</pubDate>` : ''}
      ${p.author_name ? `<dc:creator>${xml(p.author_name)}</dc:creator>` : ''}
      ${p.excerpt ? `<description>${xml(p.excerpt)}</description>` : ''}
    </item>`
    })
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Blog de 3R Core</title>
    <link>${BASE_URL}/es/blogs</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Guías de Google Ads, SEO, tiendas virtuales y marketing digital para negocios en Perú.</description>
    <language>es-PE</language>
${items}
  </channel>
</rss>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
