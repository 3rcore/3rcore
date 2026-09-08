'use client'

import { useEffect, useMemo, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import type { BlogCategory } from '@/lib/supabase/types'
import { LOCALES, LOCALE_LABEL, slugify, type Locale } from '@/lib/admin/seo-score'

/**
 * Categorías por mercado.
 *
 * 🐛 Igual que en la lista de artículos: aquí solo se pintaban `es` y `en`, así
 * que las categorías de `us` existían en la base y no se veían. Ahora salen los
 * tres mercados.
 *
 * Y se van los `confirm()`/`alert()` del navegador: la confirmación ocurre en
 * la fila y los errores se muestran donde se produjeron.
 */
export default function CategoriesPage() {
  const [cats, setCats] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [locale, setLocale] = useState<Locale>('es')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState<string | null>(null)

  const load = async () => {
    const { data, error } = await createBrowserClient().from('blog_categories').select('*').order('name')
    if (error) setError('No se pudieron cargar las categorías. ' + error.message)
    setCats(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const slug = useMemo(() => slugify(name), [name])
  const duplicate = useMemo(
    () => cats.some((c) => c.locale === locale && c.slug === slug) && !!slug,
    [cats, locale, slug]
  )

  const add = async () => {
    const clean = name.trim()
    if (!clean || duplicate) return
    setBusy(true); setError('')
    const { error } = await (createBrowserClient() as any)
      .from('blog_categories')
      .insert({ name: clean, slug, locale })
    setBusy(false)
    if (error) { setError('No se pudo crear. ' + error.message); return }
    setName('')
    load()
  }

  const remove = async (id: string) => {
    setError('')
    const { error } = await (createBrowserClient() as any).from('blog_categories').delete().eq('id', id)
    setConfirming(null)
    if (error) { setError('No se pudo eliminar. Puede que tenga artículos asignados. ' + error.message); return }
    setCats((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <>
      <header style={{ marginBottom: 'var(--s-6)' }}>
        <h1 style={{ fontSize: 'var(--t-xl)' }}>Categorías</h1>
        <p className="hint" style={{ marginTop: 2, maxWidth: '62ch' }}>
          Cada mercado tiene las suyas. Una categoría de Perú no aparece en la web en inglés, así que
          si un tema se publica en dos mercados necesita su categoría en cada uno.
        </p>
      </header>

      {/* Alta: una sola fila. Antes era una tarjeta con su propio título, que
          es mucha ceremonia para un campo de texto. */}
      <section aria-labelledby="alta" style={{ marginBottom: 'var(--s-7)' }}>
        <div className="section-head"><h2 id="alta">Nueva categoría</h2></div>
        <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 240px', minWidth: 200 }}>
            <label htmlFor="cat-name" className="sr-only">Nombre de la categoría</label>
            <input
              id="cat-name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') add() }}
              placeholder="Marketing digital"
              aria-invalid={duplicate}
              aria-describedby="cat-slug"
            />
            <p id="cat-slug" className="hint" style={{ marginTop: 6, minHeight: 18 }}>
              {duplicate
                ? <span style={{ color: 'var(--danger)' }}>Ya existe una categoría con esa URL en {LOCALE_LABEL[locale]}.</span>
                : slug
                  ? <>URL: <span className="mono" style={{ color: 'var(--ink-2)' }}>/{slug}</span></>
                  : 'La URL se genera sola a partir del nombre.'}
            </p>
          </div>

          <div>
            <label htmlFor="cat-locale" className="sr-only">Mercado</label>
            <select id="cat-locale" className="select" value={locale} onChange={(e) => setLocale(e.target.value as Locale)} style={{ width: 172 }}>
              {LOCALES.map((l) => <option key={l} value={l}>{LOCALE_LABEL[l]}</option>)}
            </select>
          </div>

          <button type="button" className="btn btn--primary" onClick={add} disabled={busy || !name.trim() || duplicate}>
            {busy ? 'Creando' : 'Crear'}
          </button>
        </div>
      </section>

      {error && <div className="notice notice--error" style={{ marginBottom: 'var(--s-4)' }} role="alert">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(272px, 1fr))', gap: 'var(--s-4)' }}>
        {LOCALES.map((l) => {
          const list = cats.filter((c) => c.locale === l)
          return (
            <section key={l} className="sheet" aria-label={`Categorías de ${LOCALE_LABEL[l]}`}>
              <header className="sheet__head">
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-sm)', fontWeight: 700 }}>{LOCALE_LABEL[l]}</span>
                <span className="tnum" style={{ fontSize: 'var(--t-xs)', color: 'var(--ink-4)' }}>{loading ? '—' : list.length}</span>
              </header>

              {loading ? (
                <div style={{ padding: 'var(--s-4)' }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className="skeleton" style={{ display: 'block', height: 11, width: `${58 + i * 12}%`, marginBottom: 14 }} aria-hidden />
                  ))}
                </div>
              ) : list.length === 0 ? (
                <p style={{ padding: 'var(--s-6) var(--s-4)', textAlign: 'center', fontSize: 'var(--t-sm)', color: 'var(--ink-4)' }}>
                  Sin categorías
                </p>
              ) : (
                <ul style={{ listStyle: 'none' }}>
                  {list.map((c) => (
                    <li key={c.id} className="row" style={{ padding: '10px var(--s-4)' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 'var(--t-sm)', fontWeight: 600 }} className="truncate">{c.name}</div>
                        <div className="mono truncate" style={{ color: 'var(--ink-4)', marginTop: 1 }}>/{c.slug}</div>
                      </div>
                      {confirming === c.id ? (
                        <span style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                          <button type="button" className="btn btn--sm btn--danger" onClick={() => remove(c.id)} autoFocus>Eliminar</button>
                          <button type="button" className="btn btn--sm btn--ghost" onClick={() => setConfirming(null)}>No</button>
                        </span>
                      ) : (
                        <button type="button" className="icon-btn icon-btn--danger" onClick={() => setConfirming(c.id)} aria-label={`Eliminar ${c.name}`} style={{ flexShrink: 0 }}>
                          <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden>
                            <path d="M3.5 5h11M7.5 5V3.8a.8.8 0 0 1 .8-.8h1.4a.8.8 0 0 1 .8.8V5M6 5v8.7a1.3 1.3 0 0 0 1.3 1.3h3.4a1.3 1.3 0 0 0 1.3-1.3V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </>
  )
}
