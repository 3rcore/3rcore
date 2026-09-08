'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/lib/supabase/types'
import { LOCALES, LOCALE_LABEL, LOCALE_SHORT, scorePost, scoreColor, type Locale } from '@/lib/admin/seo-score'

type Status = 'all' | 'published' | 'draft'

/**
 * Lista de artículos.
 *
 * 🐛 Arreglado aquí: el selector de mercado ofrecía solo `es` y `en`, pero el
 * editor permite escribir en `us` (español para EE.UU., añadido el 28-ago).
 * Resultado: un artículo escrito para /us se guardaba bien y desaparecía del
 * CMS, porque ninguna pestaña lo mostraba. Ahora están los tres mercados.
 *
 * También se van dos cosas que estorbaban:
 *  - `confirm()` del navegador para borrar. Ahora la confirmación pasa en la
 *    propia fila, que es donde está mirando quien pulsa.
 *  - Con 145 artículos y sin buscador, encontrar uno era ir bajando. Hay
 *    buscador.
 */
export default function PostsList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<Status>('all')
  const [locale, setLocale] = useState<Locale>('es')
  const [q, setQ] = useState('')
  const [confirming, setConfirming] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await createBrowserClient()
      .from('blog_posts')
      .select('*, category:blog_categories(name)')
      .eq('locale', locale)
      .order('created_at', { ascending: false })
    if (error) setError('No se pudieron cargar los artículos. ' + error.message)
    setPosts(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load(); setConfirming(null) /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [locale])

  const counts = useMemo(() => ({
    all: posts.length,
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status !== 'published').length,
  }), [posts])

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return posts
      .filter((p) => (status === 'all' ? true : status === 'published' ? p.status === 'published' : p.status !== 'published'))
      .filter((p) => !needle || `${p.title} ${p.slug} ${p.focus_keyword ?? ''}`.toLowerCase().includes(needle))
  }, [posts, status, q])

  const remove = async (id: string) => {
    setDeleting(id)
    const { error } = await (createBrowserClient() as any).from('blog_posts').delete().eq('id', id)
    setDeleting(null)
    setConfirming(null)
    if (error) { setError('No se pudo eliminar. ' + error.message); return }
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--s-4)', flexWrap: 'wrap', marginBottom: 'var(--s-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--t-xl)' }}>Artículos</h1>
          <p className="hint" style={{ marginTop: 2 }}>
            {loading ? 'Cargando…' : `${counts.all} en ${LOCALE_LABEL[locale]} · ${counts.published} publicados, ${counts.draft} en borrador`}
          </p>
        </div>

        {/* El mercado manda sobre todo lo demás, así que va arriba y separado
            del filtro de estado. */}
        <div className="seg" role="group" aria-label="Mercado">
          {LOCALES.map((l) => (
            <button key={l} type="button" aria-pressed={locale === l} onClick={() => setLocale(l)}>
              {LOCALE_SHORT[l]}
            </button>
          ))}
        </div>
      </header>

      <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap', alignItems: 'center', marginBottom: 'var(--s-4)' }}>
        <div style={{ position: 'relative', flex: '1 1 260px', minWidth: 200 }}>
          <SearchIcon />
          <label htmlFor="q" className="sr-only">Buscar artículos</label>
          <input
            id="q"
            className="input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título, URL o palabra clave"
            style={{ paddingLeft: 36 }}
          />
        </div>

        <div className="seg" role="group" aria-label="Estado">
          {([['all', 'Todos'], ['published', 'Publicados'], ['draft', 'Borradores']] as const).map(([k, label]) => (
            <button key={k} type="button" aria-pressed={status === k} onClick={() => setStatus(k)}>
              {label} <span className="seg__n">{counts[k]}</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="notice notice--error" style={{ marginBottom: 'var(--s-4)' }} role="alert">
          <span>{error}</span>
          <button type="button" className="btn btn--sm btn--ghost" onClick={load} style={{ marginLeft: 'auto' }}>Reintentar</button>
        </div>
      )}

      <div className="sheet" style={{ overflow: 'hidden' }}>
        {loading ? (
          <Skeletons />
        ) : visible.length === 0 ? (
          <Empty q={q} status={status} locale={locale} onClear={() => { setQ(''); setStatus('all') }} />
        ) : (
          <ul style={{ listStyle: 'none' }}>
            {visible.map((post) => {
              const { pct } = scorePost(post)
              const live = post.status === 'published'
              const cat = (post.category as { name?: string } | null)?.name
              const isConfirming = confirming === post.id
              return (
                <li key={post.id} className="row" style={{ position: 'relative' }}>
                  {post.featured_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.featured_image} alt="" width={44} height={44} loading="lazy"
                      style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', objectFit: 'cover', flexShrink: 0, background: 'var(--surface-sunk)' }} />
                  ) : (
                    <span aria-hidden style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', background: 'var(--surface-sunk)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--ink-4)' }}>
                      <DocIcon />
                    </span>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link href={`/admin/blog/${post.id}`} className="row__link row__title" style={{ display: 'block' }}>
                      {post.title || 'Sin título'}
                    </Link>
                    <div className="row__meta">
                      <span className="mono truncate" style={{ color: 'var(--ink-4)' }}>/{post.slug}</span>
                      {cat && <span className="tag">{cat}</span>}
                    </div>
                  </div>

                  {isConfirming ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', position: 'relative', zIndex: 1 }}>
                      <span style={{ fontSize: 'var(--t-xs)', color: 'var(--ink-2)' }} className="hide-m">¿Eliminar definitivamente?</span>
                      <button type="button" className="btn btn--sm btn--danger" onClick={() => remove(post.id)} disabled={deleting === post.id} autoFocus>
                        {deleting === post.id ? 'Eliminando' : 'Sí, eliminar'}
                      </button>
                      <button type="button" className="btn btn--sm btn--secondary" onClick={() => setConfirming(null)}>Cancelar</button>
                    </div>
                  ) : (
                    <>
                      <span className={`state ${live ? 'state--live' : 'state--draft'}`} style={{ flexShrink: 0 }}>
                        <span className="hide-m">{live ? 'Publicado' : 'Borrador'}</span>
                      </span>

                      <span className="meter hide-m" title={`SEO ${pct} de 100`} style={{ flexShrink: 0 }}>
                        <span className="meter__track"><span className="meter__fill" style={{ width: `${pct}%`, background: scoreColor(pct) }} /></span>
                        <span className="meter__n" style={{ color: scoreColor(pct) }}>{pct}</span>
                      </span>

                      <time className="hide-m tnum" style={{ fontSize: 'var(--t-xs)', color: 'var(--ink-4)', width: 62, textAlign: 'right', flexShrink: 0 }}
                        dateTime={post.published_at || post.created_at}>
                        {new Date(post.published_at || post.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}
                      </time>

                      <button type="button" className="icon-btn icon-btn--danger" style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}
                        onClick={() => setConfirming(post.id)} aria-label={`Eliminar ${post.title}`}>
                        <TrashIcon />
                      </button>
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}

function Skeletons() {
  return (
    <ul style={{ listStyle: 'none' }} aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="row" style={{ pointerEvents: 'none' }}>
          <span className="skeleton" style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', flexShrink: 0 }} />
          <span style={{ flex: 1 }}>
            <span className="skeleton" style={{ display: 'block', height: 12, width: `${52 + ((i * 13) % 34)}%`, marginBottom: 7 }} />
            <span className="skeleton" style={{ display: 'block', height: 9, width: '28%' }} />
          </span>
          <span className="skeleton hide-m" style={{ height: 10, width: 66 }} />
        </li>
      ))}
    </ul>
  )
}

function Empty({ q, status, locale, onClear }: { q: string; status: Status; locale: Locale; onClear: () => void }) {
  const filtered = !!q || status !== 'all'
  return (
    <div className="empty">
      <p className="empty__title">{filtered ? 'Nada coincide' : `Todavía no hay artículos en ${LOCALE_LABEL[locale]}`}</p>
      <p className="empty__body">
        {filtered
          ? 'Prueba con otra palabra o quita los filtros.'
          : 'Cada artículo se escribe para un mercado. Este está vacío: lo que publiques aquí saldrá solo en esa versión del sitio.'}
      </p>
      {filtered ? (
        <button type="button" className="btn btn--secondary" onClick={onClear}>Quitar filtros</button>
      ) : (
        <Link href="/admin/blog/new" className="btn btn--primary">Escribir el primero</Link>
      )}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden
      style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)', pointerEvents: 'none', zIndex: 1 }}>
      <circle cx="8" cy="8" r="5.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m12 12 3.4 3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function DocIcon() {
  return <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden><path d="M11.5 2.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 17.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5l-4-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M11.5 2.5v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
}
function TrashIcon() {
  return <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M3.5 5h11M7.5 5V3.8a.8.8 0 0 1 .8-.8h1.4a.8.8 0 0 1 .8.8V5M6 5v8.7a1.3 1.3 0 0 0 1.3 1.3h3.4a1.3 1.3 0 0 0 1.3-1.3V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
