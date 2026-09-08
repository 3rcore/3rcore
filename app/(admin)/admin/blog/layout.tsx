'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

/**
 * Shell del CMS.
 *
 * Cambio de fondo respecto a la versión anterior: «Crear» estaba en la barra
 * de navegación, junto a «Posts» y «Categorías». Crear no es un sitio al que
 * se va, es algo que se hace: ahora es el botón primario y la navegación baja
 * a dos destinos reales. De paso desaparece el estado raro en que la propia
 * pantalla de creación se marcaba como pestaña activa.
 *
 * El menú hamburguesa también se va: escondía dos enlaces de una palabra.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const path = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    createBrowserClient()
      .auth.getSession()
      .then(({ data: { session } }) => {
        if (!alive) return
        if (!session) router.replace('/admin/login')
        else { setUser(session.user); setReady(true) }
      })
    return () => { alive = false }
  }, [router])

  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <div className="spinner" role="status" aria-label="Cargando" />
      </div>
    )
  }

  const nav = [
    { href: '/admin/blog', label: 'Artículos', exact: true },
    { href: '/admin/blog/categories', label: 'Categorías', exact: false },
  ]
  const isOn = (n: (typeof nav)[number]) => (n.exact ? path === n.href : path.startsWith(n.href))

  const name = (user?.user_metadata?.name as string) || user?.email?.split('@')[0] || 'Equipo'
  const initial = name.charAt(0).toUpperCase()

  const signOut = async () => {
    await createBrowserClient().auth.signOut()
    router.replace('/admin/login')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#contenido" className="sr-only">Saltar al contenido</a>

      <header style={SH.bar}>
        <div style={SH.inner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-5)', minWidth: 0 }}>
            <Link href="/admin/blog" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, minHeight: 40, padding: '0 6px', marginLeft: -6 }} aria-label="Blog CMS de 3R Core">
              <Image src="/icons/LogoFull.webp" alt="" width={90} height={30} priority style={{ height: 26, width: 'auto' }} />
              <span className="hide-m" style={SH.wordmark}>Blog CMS</span>
            </Link>

            <nav aria-label="Secciones" style={{ display: 'flex', gap: 'var(--s-1)' }}>
              {nav.map((n) => {
                const on = isOn(n)
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={on ? 'page' : undefined}
                    style={{ ...SH.navLink, color: on ? 'var(--ink)' : 'var(--ink-3)' }}
                  >
                    {n.label}
                    {/* El activo se marca con una regla bajo el texto, no con
                        una píldora rellena: pesa menos y deja el acento
                        magenta para la acción primaria. */}
                    <span aria-hidden style={{ ...SH.navRule, opacity: on ? 1 : 0 }} />
                  </Link>
                )
              })}
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
            <Link href="/admin/blog/new" className="btn btn--primary btn--sm">
              <PlusIcon />
              <span className="hide-m">Nuevo artículo</span>
              <span className="only-m">Nuevo</span>
            </Link>

            <span className="hide-m" style={SH.divider} aria-hidden />

            <a href="/" target="_blank" rel="noreferrer" className="icon-btn hide-m" title="Ver 3rcore.com en una pestaña nueva" aria-label="Ver el sitio">
              <ExternalIcon />
            </a>

            <span className="hide-m" style={SH.avatar} title={user?.email ?? name} aria-hidden>{initial}</span>

            <button type="button" onClick={signOut} className="icon-btn" title={`Salir (${name})`} aria-label="Cerrar sesión">
              <SignOutIcon />
            </button>
          </div>
        </div>
      </header>

      <main id="contenido" className="rise" style={SH.main}>
        {children}
      </main>
    </div>
  )
}

function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 3.2v9.6M3.2 8h9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
}
function ExternalIcon() {
  return <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M10.5 3h4.5v4.5M15 3l-6.6 6.6M12.6 10.8V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function SignOutIcon() {
  return <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M7 15.5H4a1.5 1.5 0 0 1-1.5-1.5v-10A1.5 1.5 0 0 1 4 2.5h3M12 12l3-3-3-3M15 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

const SH: Record<string, React.CSSProperties> = {
  bar: {
    position: 'sticky', top: 0, zIndex: 40,
    background: 'var(--surface)',
    borderBottom: '1px solid var(--rule)',
  },
  inner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--s-4)',
    height: 58, maxWidth: 1240, margin: '0 auto', padding: '0 var(--s-5)',
  },
  wordmark: {
    fontFamily: 'var(--font-display)', fontSize: 'var(--t-sm)', fontWeight: 700,
    letterSpacing: '-0.01em', color: 'var(--ink)',
    paddingLeft: 'var(--s-3)', borderLeft: '1px solid var(--rule)',
  },
  navLink: {
    position: 'relative',
    display: 'inline-flex', alignItems: 'center',
    height: 34, padding: '0 10px',
    fontSize: 'var(--t-sm)', fontWeight: 600,
    transition: 'color 120ms var(--ease)',
  },
  navRule: {
    position: 'absolute', left: 10, right: 10, bottom: -1, height: 2,
    background: 'var(--brand)', borderRadius: '2px 2px 0 0',
    transition: 'opacity 160ms var(--ease)',
  },
  divider: { width: 1, height: 20, background: 'var(--rule)' },
  avatar: {
    display: 'grid', placeItems: 'center',
    width: 28, height: 28, borderRadius: '50%',
    background: 'var(--brand-soft)', border: '1px solid var(--brand-line)',
    color: 'var(--brand-ink)', fontSize: 'var(--t-xs)', fontWeight: 700,
  },
  main: { flex: 1, width: '100%', maxWidth: 1240, margin: '0 auto', padding: 'var(--s-6) var(--s-5) var(--s-8)' },
}
