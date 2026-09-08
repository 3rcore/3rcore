'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase/client'
import type { BlogPost, BlogCategory } from '@/lib/supabase/types'
import {
  LOCALES, LOCALE_LABEL, scorePost, scoreColor, slugify, type Locale, type SeoCheck,
} from '@/lib/admin/seo-score'

const TipTapEditor = dynamic(() => import('./TipTapEditor'), {
  ssr: false,
  loading: () => <div className="skeleton" style={{ height: 340, borderRadius: 'var(--r-lg)' }} aria-hidden />,
})

const MAX_IMAGE_MB = 5

/**
 * Editor de artículo.
 *
 * Reorganización respecto a la versión anterior:
 *  - La lista de comprobación SEO estaba dentro del mismo bloque plegable que
 *    los campos que califica, así que para ver qué faltaba había que bajar por
 *    debajo de los campos. Ahora vive en la columna lateral y se actualiza
 *    mientras escribes.
 *  - Los ocho campos de SEO eran una pila. Se agrupan en tres pestañas:
 *    buscador, redes y avanzado.
 *  - `alert()` para errores y para «título obligatorio». Ahora el error se
 *    muestra donde ocurre y el campo se enfoca.
 *  - No había aviso al salir con cambios sin guardar. En un CMS eso es perder
 *    una hora de trabajo por cambiar de pestaña.
 *  - ⌘S / Ctrl+S guarda.
 */
export default function PostEditor({ post }: { post?: BlogPost }) {
  const router = useRouter()
  const isEdit = !!post

  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [saving, setSaving] = useState<false | 'draft' | 'publish'>(false)
  const [error, setError] = useState('')
  const [seoTab, setSeoTab] = useState<'search' | 'social' | 'advanced'>('search')
  const [dirty, setDirty] = useState(false)
  const titleRef = useRef<HTMLTextAreaElement>(null)

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [slugManual, setSlugManual] = useState(isEdit)
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image ?? '')
  const [featuredImageAlt, setFeaturedImageAlt] = useState(post?.featured_image_alt ?? '')
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status === 'published' ? 'published' : 'draft')
  const [locale, setLocale] = useState<Locale>((post?.locale as Locale) ?? 'es')
  const [categoryId, setCategoryId] = useState(post?.category_id ?? '')
  const [authorName, setAuthorName] = useState(post?.author_name ?? 'Piero Roque')

  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? '')
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? '')
  const [ogTitle, setOgTitle] = useState(post?.og_title ?? '')
  const [ogDescription, setOgDescription] = useState(post?.og_description ?? '')
  const [ogImage, setOgImage] = useState(post?.og_image ?? '')
  const [canonicalUrl, setCanonicalUrl] = useState(post?.canonical_url ?? '')
  const [robots, setRobots] = useState(post?.robots ?? 'index, follow')
  const [focusKeyword, setFocusKeyword] = useState(post?.focus_keyword ?? '')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    createBrowserClient().from('blog_categories').select('*').order('name')
      .then(({ data }) => setCategories(data ?? []))
  }, [])

  useEffect(() => { if (!slugManual) setSlug(slugify(title)) }, [title, slugManual])
  useEffect(() => {
    if (!metaTitle && title) setMetaTitle(`${title} | 3R Core`)
    if (!ogTitle && title) setOgTitle(title)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  // El título es un textarea que crece: un artículo puede tener 90 caracteres
  // y en un input de una línea no se lee entero.
  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [title])

  const seo = useMemo(
    () => scorePost({ title, slug, excerpt, content, featured_image: featuredImage, featured_image_alt: featuredImageAlt, meta_title: metaTitle, meta_description: metaDescription, og_image: ogImage, focus_keyword: focusKeyword }),
    [title, slug, excerpt, content, featuredImage, featuredImageAlt, metaTitle, metaDescription, ogImage, focusKeyword]
  )

  const touch = <T,>(setter: (v: T) => void) => (v: T) => { setter(v); setDirty(true) }

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const save = useCallback(async (publishNow: boolean) => {
    if (!title.trim()) {
      setError('El artículo necesita un título antes de guardarse.')
      titleRef.current?.focus()
      return
    }
    if (!slug.trim()) { setError('La URL no puede quedar vacía.'); return }

    setSaving(publishNow ? 'publish' : 'draft')
    setError('')

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt, content,
      featured_image: featuredImage || null,
      featured_image_alt: featuredImageAlt || null,
      status: publishNow ? 'published' : status,
      locale,
      meta_title: metaTitle || `${title} | 3R Core`,
      meta_description: metaDescription || excerpt || '',
      og_title: ogTitle || title,
      og_description: ogDescription || metaDescription || excerpt || '',
      og_image: ogImage || featuredImage || null,
      canonical_url: canonicalUrl || null,
      robots,
      focus_keyword: focusKeyword || null,
      author_name: authorName,
      category_id: categoryId || null,
      ...(publishNow && !post?.published_at ? { published_at: new Date().toISOString() } : {}),
    }

    const sb = createBrowserClient() as any
    const { error } = isEdit
      ? await sb.from('blog_posts').update(payload).eq('id', post!.id)
      : await sb.from('blog_posts').insert(payload)

    setSaving(false)
    if (error) {
      setError(
        /duplicate|unique/i.test(error.message)
          ? `Ya existe un artículo con la URL /${slug} en ${LOCALE_LABEL[locale]}. Cambia la URL.`
          : `No se pudo guardar: ${error.message}`
      )
      return
    }
    setDirty(false)
    router.push('/admin/blog')
    router.refresh()
  }, [title, slug, excerpt, content, featuredImage, featuredImageAlt, status, locale, metaTitle, metaDescription, ogTitle, ogDescription, ogImage, canonicalUrl, robots, focusKeyword, authorName, categoryId, isEdit, post, router])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') { e.preventDefault(); save(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [save])

  const uploadImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
        setError(`La imagen pesa ${(file.size / 1048576).toFixed(1)} MB. El máximo son ${MAX_IMAGE_MB} MB: comprímela antes de subirla.`)
        return
      }
      setUploading(true); setError('')
      const sb = createBrowserClient()
      const ext = file.name.split('.').pop()
      const path = `featured/${Date.now()}.${ext}`
      const { error } = await sb.storage.from('blog-images').upload(path, file, { contentType: file.type })
      if (error) { setUploading(false); setError('No se pudo subir la imagen. ' + error.message); return }
      const { data } = sb.storage.from('blog-images').getPublicUrl(path)
      setFeaturedImage(data.publicUrl)
      if (!ogImage) setOgImage(data.publicUrl)
      setDirty(true); setUploading(false)
    }
    input.click()
  }, [ogImage])

  const publicUrl = `3rcore.com/${locale}/blogs/${slug || '…'}`

  return (
    // La rejilla vive en globals.css: en línea pisaría la media query y el
    // editor se quedaría en una columna incluso en pantallas anchas.
    <div className="editor-grid">
      {/* ══ Columna de escritura ══════════════════════════════════════ */}
      <div style={{ minWidth: 0 }}>
        <div style={{ marginBottom: 'var(--s-5)' }}>
          <label htmlFor="title" className="sr-only">Título del artículo</label>
          <textarea
            ref={titleRef}
            id="title"
            rows={1}
            value={title}
            onChange={(e) => touch(setTitle)(e.target.value.replace(/\n/g, ''))}
            placeholder="Título del artículo"
            style={ST.title}
          />
          <div style={ST.slugRow}>
            <span className="mono" style={{ color: 'var(--ink-4)', flexShrink: 0 }}>3rcore.com/{locale}/blogs/</span>
            <label htmlFor="slug" className="sr-only">URL del artículo</label>
            <input
              id="slug"
              value={slug}
              onChange={(e) => { touch(setSlug)(slugify(e.target.value)); setSlugManual(true) }}
              className="mono"
              style={ST.slugInput}
              spellCheck={false}
            />
          </div>
        </div>

        <div style={{ marginBottom: 'var(--s-5)' }}>
          <label htmlFor="excerpt" className="label">Extracto</label>
          <textarea
            id="excerpt"
            className="textarea"
            rows={2}
            value={excerpt}
            onChange={(e) => touch(setExcerpt)(e.target.value)}
            placeholder="Dos líneas que resuman el artículo. Salen en la lista del blog."
            style={{ minHeight: 62 }}
          />
        </div>

        <div style={{ marginBottom: 'var(--s-6)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--s-2)' }}>
            <span className="label" style={{ marginBottom: 0 }}>Contenido</span>
            <span className="hint tnum">
              {seo.words} palabras
              {seo.words > 0 && seo.words <= 300 && <span style={{ color: 'var(--warn)' }}> · por debajo de 300</span>}
            </span>
          </div>
          <TipTapEditor content={content} onChange={(v: string) => touch(setContent)(v)} />
        </div>

        {/* ══ SEO ═══════════════════════════════════════════════════ */}
        <section aria-labelledby="seo-h">
          <div className="section-head"><h2 id="seo-h">Cómo se verá en Google y en redes</h2></div>

          <div className="seg" role="tablist" aria-label="Secciones de SEO" style={{ marginBottom: 'var(--s-4)' }}>
            {([['search', 'Buscador'], ['social', 'Redes'], ['advanced', 'Avanzado']] as const).map(([k, label]) => (
              <button key={k} type="button" role="tab" aria-selected={seoTab === k} aria-pressed={seoTab === k} onClick={() => setSeoTab(k)}>
                {label}
              </button>
            ))}
          </div>

          {seoTab === 'search' && (
            <div style={ST.stack}>
              <Field label="Palabra clave de enfoque" htmlFor="kw"
                hint="La búsqueda concreta que quieres ganar con este artículo.">
                <input id="kw" className="input" value={focusKeyword} onChange={(e) => touch(setFocusKeyword)(e.target.value)} placeholder="agencia de marketing digital" />
              </Field>

              <Field label="Título en Google" htmlFor="mt"
                counter={<Counter n={metaTitle.length} max={60} />}>
                <input id="mt" className="input" value={metaTitle} onChange={(e) => touch(setMetaTitle)(e.target.value)} placeholder={`${title || 'Título'} | 3R Core`} />
              </Field>

              <Field label="Descripción en Google" htmlFor="md"
                counter={<Counter n={metaDescription.length} min={120} max={160} />}>
                <textarea id="md" className="textarea" rows={3} value={metaDescription} onChange={(e) => touch(setMetaDescription)(e.target.value)}
                  placeholder="Lo que se lee bajo el título en los resultados. Entre 120 y 160 caracteres." />
              </Field>

              <div>
                <span className="label">Previsualización</span>
                <GooglePreview title={metaTitle || (title ? `${title} | 3R Core` : '')} url={publicUrl} desc={metaDescription || excerpt} />
              </div>
            </div>
          )}

          {seoTab === 'social' && (
            <div style={ST.stack}>
              <Field label="Título al compartir" htmlFor="ogt" hint="Si lo dejas vacío se usa el título del artículo.">
                <input id="ogt" className="input" value={ogTitle} onChange={(e) => touch(setOgTitle)(e.target.value)} placeholder={title} />
              </Field>
              <Field label="Descripción al compartir" htmlFor="ogd" hint="Si lo dejas vacío se usa la descripción de Google.">
                <input id="ogd" className="input" value={ogDescription} onChange={(e) => touch(setOgDescription)(e.target.value)} placeholder={metaDescription} />
              </Field>
              <Field label="Imagen al compartir" htmlFor="ogi" hint="Si lo dejas vacío se usa la imagen destacada. 1200 × 630 es la medida que respetan todas las redes.">
                <input id="ogi" className="input mono" value={ogImage} onChange={(e) => touch(setOgImage)(e.target.value)} placeholder={featuredImage || 'https://…'} />
              </Field>
            </div>
          )}

          {seoTab === 'advanced' && (
            <div style={ST.stack}>
              <Field label="URL canónica" htmlFor="canon"
                hint="Solo si este artículo es una copia de otro que ya existe. En blanco, se canoniza a sí mismo.">
                <input id="canon" className="input mono" value={canonicalUrl} onChange={(e) => touch(setCanonicalUrl)(e.target.value)} placeholder={`https://${publicUrl}`} />
              </Field>
              <Field label="Indexación" htmlFor="robots"
                hint={robots.startsWith('noindex') ? '⚠ Con noindex este artículo no aparecerá en Google.' : 'index, follow es lo normal para un artículo.'}>
                <select id="robots" className="select" value={robots} onChange={(e) => touch(setRobots)(e.target.value)}>
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </Field>
            </div>
          )}
        </section>
      </div>

      {/* ══ Columna lateral ═══════════════════════════════════════════ */}
      <aside style={ST.aside}>
        <div style={ST.sticky}>
          {error && (
            <div className="notice notice--error rise" role="alert" style={{ marginBottom: 'var(--s-4)' }}>
              {error}
            </div>
          )}

          <section className="sheet" style={{ padding: 'var(--s-5)', marginBottom: 'var(--s-4)' }}>
            <div style={{ display: 'flex', gap: 'var(--s-2)', marginBottom: 'var(--s-5)' }}>
              <button type="button" className="btn btn--secondary" style={{ flex: 1 }} onClick={() => save(false)} disabled={!!saving}>
                {saving === 'draft' ? <><span className="spinner" style={{ width: 14, height: 14 }} />Guardando</> : 'Guardar'}
              </button>
              <button type="button" className="btn btn--primary" style={{ flex: 1 }} onClick={() => save(true)} disabled={!!saving}>
                {saving === 'publish'
                  ? <><span className="spinner" style={{ width: 14, height: 14, borderColor: 'oklch(1 0 0 / .35)', borderTopColor: 'var(--surface)' }} />Publicando</>
                  : status === 'published' ? 'Actualizar' : 'Publicar'}
              </button>
            </div>
            <p className="hint" style={{ marginTop: -14, marginBottom: 'var(--s-5)' }}>
              {dirty ? 'Hay cambios sin guardar.' : isEdit ? 'Todo guardado.' : 'Aún no se ha guardado.'}
              {' '}<kbd style={ST.kbd}>⌘S</kbd> guarda.
            </p>

            <Field label="Mercado" hint="Decide en qué versión del sitio sale y con qué categorías puede ir.">
              <div style={{ display: 'grid', gap: 4 }}>
                {LOCALES.map((l) => (
                  <button key={l} type="button" onClick={() => { touch(setLocale)(l); setCategoryId('') }}
                    aria-pressed={locale === l} style={ST.marketBtn(locale === l)}>
                    {LOCALE_LABEL[l]}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Estado" htmlFor="status">
              <select id="status" className="select" value={status} onChange={(e) => touch(setStatus)(e.target.value as 'draft' | 'published')}>
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </Field>

            <Field label="Categoría" htmlFor="cat"
              hint={categories.filter((c) => c.locale === locale).length === 0 ? `No hay categorías en ${LOCALE_LABEL[locale]}.` : undefined}>
              <select id="cat" className="select" value={categoryId} onChange={(e) => touch(setCategoryId)(e.target.value)}>
                <option value="">Sin categoría</option>
                {categories.filter((c) => c.locale === locale).map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Autor" htmlFor="author" last>
              <input id="author" className="input" value={authorName} onChange={(e) => touch(setAuthorName)(e.target.value)} />
            </Field>
          </section>

          {/* Imagen destacada */}
          <section className="sheet" style={{ padding: 'var(--s-5)', marginBottom: 'var(--s-4)' }}>
            <div className="section-head" style={{ marginBottom: 'var(--s-3)' }}><h3>Imagen destacada</h3></div>
            {featuredImage ? (
              <div style={{ position: 'relative', marginBottom: 'var(--s-3)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featuredImage} alt={featuredImageAlt || ''} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 'var(--r)', background: 'var(--surface-sunk)' }} />
                <button type="button" className="btn btn--sm btn--secondary" onClick={() => { setFeaturedImage(''); setFeaturedImageAlt(''); setDirty(true) }}
                  style={{ position: 'absolute', top: 8, right: 8 }}>Quitar</button>
              </div>
            ) : (
              <button type="button" onClick={uploadImage} disabled={uploading} style={ST.drop}>
                {uploading ? <><span className="spinner" style={{ width: 15, height: 15 }} /> Subiendo…</> : `Subir imagen · máx. ${MAX_IMAGE_MB} MB`}
              </button>
            )}
            <Field label="Texto alternativo" htmlFor="alt" last
              hint="Describe lo que se ve. Lo leen los buscadores y quien usa lector de pantalla.">
              <input id="alt" className="input" value={featuredImageAlt} onChange={(e) => touch(setFeaturedImageAlt)(e.target.value)}
                placeholder="Equipo de 3R Core revisando métricas" />
            </Field>
          </section>

          {/* Checklist: aquí arriba y siempre visible, que es el punto */}
          <section className="sheet" style={{ padding: 'var(--s-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--s-4)' }}>
              <h3 style={{ fontSize: 'var(--t-micro)', fontWeight: 700, letterSpacing: '.085em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Revisión SEO</h3>
              <span className="meter">
                <span className="meter__track"><span className="meter__fill" style={{ width: `${seo.pct}%`, background: scoreColor(seo.pct) }} /></span>
                <span className="meter__n" style={{ color: scoreColor(seo.pct) }}>{seo.score}/{seo.total}</span>
              </span>
            </div>
            <Checklist checks={seo.checks} />
          </section>
        </div>
      </aside>
    </div>
  )
}

/* ── Piezas ────────────────────────────────────────────────────────────── */

function Field({ label, htmlFor, hint, counter, children, last }: {
  label: string; htmlFor?: string; hint?: string; counter?: React.ReactNode; children: React.ReactNode; last?: boolean
}) {
  return (
    <div style={{ marginBottom: last ? 0 : 'var(--s-4)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        {htmlFor ? <label className="label" htmlFor={htmlFor}>{label}</label> : <span className="label">{label}</span>}
        {counter}
      </div>
      {children}
      {hint && <p className="hint" style={{ marginTop: 6 }}>{hint}</p>}
    </div>
  )
}

function Counter({ n, min, max }: { n: number; min?: number; max: number }) {
  const tone = n === 0 ? 'idle' : n > max ? 'over' : min && n < min ? 'warn' : 'ok'
  return <span className={`label count count--${tone}`} style={{ marginBottom: 0 }}>{n}/{max}</span>
}

function Checklist({ checks }: { checks: SeoCheck[] }) {
  const groups = ['Fundamentos', 'Palabra clave', 'Compartir'] as const
  return (
    <div style={{ display: 'grid', gap: 'var(--s-4)' }}>
      {groups.map((g) => {
        const items = checks.filter((c) => c.group === g)
        if (!items.length) return null
        return (
          <div key={g}>
            <p style={{ fontSize: 'var(--t-micro)', fontWeight: 600, color: 'var(--ink-4)', marginBottom: 6, letterSpacing: '.04em' }}>{g}</p>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 5 }}>
              {items.map((c) => (
                <li key={c.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }} title={c.ok ? undefined : c.fix}>
                  <span aria-hidden style={{ flexShrink: 0, marginTop: 3, color: c.ok ? 'var(--ok)' : 'var(--ink-4)' }}>
                    {c.ok ? <TickIcon /> : <DotIcon />}
                  </span>
                  <span style={{ fontSize: 'var(--t-xs)', lineHeight: 1.45, color: c.ok ? 'var(--ink-3)' : 'var(--ink-2)' }}>
                    {c.label}
                    <span className="sr-only">{c.ok ? ' (cumplido)' : ` (pendiente: ${c.fix})`}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

function GooglePreview({ title, url, desc }: { title: string; url: string; desc: string }) {
  const t = title.length > 60 ? title.slice(0, 59).trimEnd() + '…' : title
  const d = desc.length > 160 ? desc.slice(0, 159).trimEnd() + '…' : desc
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 'var(--r)', padding: 'var(--s-4)', maxWidth: 600 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
        <span aria-hidden style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--surface-sunk)', border: '1px solid var(--rule)', display: 'grid', placeItems: 'center', fontSize: 8, fontWeight: 700, color: 'var(--ink-3)' }}>3R</span>
        <span style={{ fontSize: 11, color: 'var(--ink-2)', lineHeight: 1.2 }}>
          3R Core<br /><span style={{ color: 'var(--ink-3)' }}>{url}</span>
        </span>
      </div>
      <p style={{ color: '#1a0dab', fontSize: 18, lineHeight: 1.3, marginBottom: 3 }}>{t || 'Sin título'}</p>
      <p style={{ color: 'var(--ink-2)', fontSize: 13, lineHeight: 1.55 }}>{d || 'Sin descripción. Google inventará una a partir del contenido, y suele elegir mal.'}</p>
    </div>
  )
}

function TickIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M2.6 7.4 5.4 10l6-6.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function DotIcon() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
}

const ST = {
  title: {
    width: '100%', background: 'transparent', border: 'none', resize: 'none',
    fontFamily: 'var(--font-display)', fontSize: 'var(--t-2xl)', fontWeight: 800,
    letterSpacing: '-0.025em', lineHeight: 1.18, color: 'var(--ink)', overflow: 'hidden',
  } as React.CSSProperties,
  slugRow: {
    display: 'flex', alignItems: 'center', gap: 2, marginTop: 'var(--s-3)',
    paddingTop: 'var(--s-3)', borderTop: '1px solid var(--rule)', flexWrap: 'wrap',
  } as React.CSSProperties,
  slugInput: {
    flex: '1 1 160px', minWidth: 120, background: 'transparent', border: 'none',
    color: 'var(--brand-ink)', fontWeight: 600, padding: '7px 0', minHeight: 34,
  } as React.CSSProperties,
  stack: { display: 'grid', gap: 'var(--s-4)' } as React.CSSProperties,
  aside: { minWidth: 0 } as React.CSSProperties,
  sticky: { position: 'sticky', top: 'calc(58px + var(--s-4))' } as React.CSSProperties,
  drop: {
    width: '100%', padding: 'var(--s-6) var(--s-4)', marginBottom: 'var(--s-3)',
    border: '1px dashed var(--rule-strong)', borderRadius: 'var(--r)',
    background: 'var(--surface-sunk)', color: 'var(--ink-3)',
    fontSize: 'var(--t-xs)', fontWeight: 600,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  } as React.CSSProperties,
  kbd: {
    fontFamily: 'var(--font-mono)', fontSize: 10, padding: '1px 5px',
    border: '1px solid var(--rule)', borderRadius: 4, background: 'var(--surface-sunk)', color: 'var(--ink-3)',
  } as React.CSSProperties,
  marketBtn: (on: boolean): React.CSSProperties => ({
    textAlign: 'left', padding: '8px 12px', borderRadius: 'var(--r-sm)',
    fontSize: 'var(--t-xs)', fontWeight: 600,
    background: on ? 'var(--brand-soft)' : 'var(--surface-sunk)',
    border: `1px solid ${on ? 'var(--brand-line)' : 'transparent'}`,
    color: on ? 'var(--brand-ink)' : 'var(--ink-2)',
    transition: 'background 120ms var(--ease), color 120ms var(--ease)',
  }),
}
