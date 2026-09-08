'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/lib/supabase/types'
import PostEditor from '@/components/admin/PostEditor'

export default function EditPost() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    createBrowserClient().from('blog_posts').select('*').eq('id', id).single()
      .then(({ data }) => { setPost(data); setLoading(false) })
  }, [id])

  if (loading) {
    // Esqueleto con la forma del editor: se ve dónde va a estar cada cosa en
    // vez de un disco girando en el centro de una página vacía.
    return (
      <div className="editor-grid" aria-busy="true">
        <div>
          <span className="skeleton" style={{ display: 'block', height: 38, width: '72%', marginBottom: 18 }} />
          <span className="skeleton" style={{ display: 'block', height: 13, width: '38%', marginBottom: 34 }} />
          <span className="skeleton" style={{ display: 'block', height: 62, marginBottom: 26 }} />
          <span className="skeleton" style={{ display: 'block', height: 340, borderRadius: 'var(--r-lg)' }} />
        </div>
        <div>
          <span className="skeleton" style={{ display: 'block', height: 268, borderRadius: 'var(--r-lg)', marginBottom: 16 }} />
          <span className="skeleton" style={{ display: 'block', height: 210, borderRadius: 'var(--r-lg)' }} />
        </div>
        <span className="sr-only">Cargando el artículo</span>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="sheet">
        <div className="empty">
          <p className="empty__title">Ese artículo ya no existe</p>
          <p className="empty__body">Puede que se haya eliminado desde otra pestaña, o que el enlace esté mal.</p>
          <Link href="/admin/blog" className="btn btn--primary">Volver a los artículos</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <nav aria-label="Ruta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--s-3)', flexWrap: 'wrap', marginBottom: 'var(--s-3)' }}>
        <Link href="/admin/blog" style={{ fontSize: 'var(--t-xs)', color: 'var(--ink-3)', display: 'inline-flex', alignItems: 'center', gap: 5, minHeight: 36, paddingRight: 8 }}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M8.5 3 5 7l3.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Artículos
        </Link>

        {post.status === 'published' && (
          <a href={`/${post.locale}/blogs/${post.slug}`} target="_blank" rel="noreferrer"
            style={{ fontSize: 'var(--t-xs)', color: 'var(--brand-ink)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            Ver publicado
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M10.5 3h4.5v4.5M15 3l-6.6 6.6M12.6 10.8V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </nav>
      <h1 className="sr-only">Editar: {post.title}</h1>
      <PostEditor post={post} />
    </>
  )
}
