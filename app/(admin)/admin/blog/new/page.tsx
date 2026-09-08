import Link from 'next/link'
import PostEditor from '@/components/admin/PostEditor'

export default function NewPost() {
  return (
    <>
      <nav aria-label="Ruta" style={{ marginBottom: 'var(--s-3)' }}>
        <Link href="/admin/blog" style={{ fontSize: 'var(--t-xs)', color: 'var(--ink-3)', display: 'inline-flex', alignItems: 'center', gap: 5, minHeight: 36, paddingRight: 8 }}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M8.5 3 5 7l3.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Artículos
        </Link>
      </nav>
      <h1 className="sr-only">Nuevo artículo</h1>
      <PostEditor />
    </>
  )
}
