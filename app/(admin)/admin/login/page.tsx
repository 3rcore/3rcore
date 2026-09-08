'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase/client'

/**
 * Puerta del CMS. Se cruza todos los días, así que lo que importa aquí no es
 * el adorno: es entrar rápido y saber qué pasó cuando algo falla.
 *
 * Lo que antes no estaba y ahora sí:
 *  - `autoComplete` correcto, para que el gestor de contraseñas rellene.
 *  - Un solo mensaje de error genérico se convertía en «contraseña incorrecta»
 *    aunque el fallo fuera de red. Ahora se distinguen los casos.
 *  - Aviso de Bloq Mayús, que es la causa real de la mitad de los intentos
 *    fallidos en un campo donde no ves lo que escribes.
 *  - Mostrar/ocultar contraseña.
 *  - Si ya hay sesión, no se enseña el formulario: se entra directo.
 */
export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [caps, setCaps] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let alive = true
    createBrowserClient()
      .auth.getSession()
      .then(({ data: { session } }) => {
        if (!alive) return
        if (session) router.replace('/admin/blog')
        else { setChecking(false); requestAnimationFrame(() => emailRef.current?.focus()) }
      })
      .catch(() => alive && setChecking(false))
    return () => { alive = false }
  }, [router])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error } = await createBrowserClient().auth.signInWithPassword({ email, password })
      if (error) {
        // Supabase devuelve el mismo código para usuario inexistente y clave
        // mala, y eso está bien: no se filtra qué correos existen.
        setError(
          /invalid|credential/i.test(error.message)
            ? 'Ese correo y esa contraseña no coinciden.'
            : `No se pudo entrar: ${error.message}`
        )
        setLoading(false)
        return
      }
      router.push('/admin/blog')
    } catch {
      setError('No hay conexión con el servidor. Revisa tu internet e inténtalo otra vez.')
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <main style={S.page}>
        <div style={S.masthead} aria-hidden />
        <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
          <div className="spinner" role="status" aria-label="Comprobando sesión" />
        </div>
      </main>
    )
  }

  return (
    <main style={S.page}>
      {/* Cabezada: una regla de marca a lo ancho del papel. Es toda la
          decoración que lleva la página, y sitúa la marca sin gritar. */}
      <div style={S.masthead} aria-hidden />

      <div style={S.wrap}>
        <div className="rise" style={S.col}>
          <header style={{ marginBottom: 'var(--s-6)', paddingBottom: 'var(--s-6)', borderBottom: '1px solid var(--rule)' }}>
            <Image
              src="/icons/LogoFull.webp"
              alt="3R Core"
              width={140}
              height={46}
              priority
              style={{ height: 44, width: 'auto', marginBottom: 'var(--s-5)' }}
            />
            <h1 style={S.h1}>Blog CMS</h1>
            <p style={S.sub}>
              Redacción y publicación de los artículos de 3rcore.com, en los tres mercados.
            </p>
          </header>

          <form onSubmit={submit} noValidate>
            <div style={{ marginBottom: 'var(--s-4)' }}>
              <label className="label" htmlFor="email">Correo</label>
              <input
                ref={emailRef}
                id="email"
                className="input"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="off"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@3rcore.com"
                required
                aria-invalid={!!error}
              />
            </div>

            <div style={{ marginBottom: 'var(--s-5)' }}>
              <label className="label" htmlFor="password">Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  className="input"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={(e) => setCaps(e.getModifierState?.('CapsLock') ?? false)}
                  onBlur={() => setCaps(false)}
                  placeholder="••••••••"
                  required
                  aria-invalid={!!error}
                  aria-describedby={caps ? 'caps-hint' : undefined}
                  style={{ paddingRight: 46 }}
                />
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setShowPass((v) => !v)}
                  aria-pressed={showPass}
                  aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)' }}
                >
                  {showPass ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {caps && (
                <p id="caps-hint" className="hint" style={{ marginTop: 'var(--s-2)', color: 'var(--warn)' }}>
                  Bloq Mayús está activado.
                </p>
              )}
            </div>

            {/* La región vive siempre en el árbol para que el lector de pantalla
                anuncie el error sin que el formulario dé un salto. */}
            <div aria-live="polite" style={{ minHeight: error ? undefined : 0 }}>
              {error && (
                <div className="notice notice--error rise" style={{ marginBottom: 'var(--s-4)' }}>
                  <AlertIcon />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={loading || !email || !password}
              style={{ minHeight: 44 }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: 15, height: 15, borderColor: 'oklch(1 0 0 / .35)', borderTopColor: 'var(--surface)' }} />
                  Entrando
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <footer style={S.foot}>
            <Link href="/" style={{ color: 'var(--ink-2)', fontWeight: 500 }}>
              Volver a 3rcore.com
            </Link>
            <span style={{ color: 'var(--ink-3)' }}>
              ¿Sin acceso? Escribe a{' '}
              <a href="mailto:info@3rcore.com" style={{ color: 'var(--brand-ink)', fontWeight: 600 }}>info@3rcore.com</a>
            </span>
          </footer>
        </div>
      </div>
    </main>
  )
}

/* ── Iconos: trazo de 1.5, mismo peso que la tipografía de interfaz ────── */
function Eye() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M1.8 10S4.9 4.6 10 4.6 18.2 10 18.2 10 15.1 15.4 10 15.4 1.8 10 1.8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function EyeOff() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M8.2 4.8A7.6 7.6 0 0 1 10 4.6c5.1 0 8.2 5.4 8.2 5.4a15 15 0 0 1-2.4 3.1M5.1 5.9A15 15 0 0 0 1.8 10S4.9 15.4 10 15.4c1.4 0 2.6-.4 3.7-1M3 3l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function AlertIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="10" cy="10" r="7.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.4v4.2M10 13.4h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    // Lavado radial en el tono de marca, croma bajísimo: da profundidad al
    // papel sin convertirse en un degradado decorativo.
    background:
      'radial-gradient(120% 80% at 50% -10%, oklch(0.965 0.020 350) 0%, transparent 62%), var(--paper)',
  },
  masthead: {
    position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 10,
    background: 'linear-gradient(to right, oklch(0.496 0.218 323), oklch(0.628 0.245 12))',
  },
  wrap: { minHeight: '100vh', display: 'grid', placeItems: 'center', alignContent: 'safe center', padding: 'clamp(var(--s-6), 12vh, 132px) var(--s-5) var(--s-8)' },
  col: { width: '100%', maxWidth: 396 },
  h1: { fontSize: 'var(--t-xl)', letterSpacing: '-0.022em', marginBottom: 'var(--s-2)' },
  sub: { fontSize: 'var(--t-sm)', color: 'var(--ink-3)', maxWidth: '38ch', lineHeight: 1.55 },
  foot: {
    marginTop: 'var(--s-6)', paddingTop: 'var(--s-4)',
    borderTop: '1px solid var(--rule)',
    display: 'flex', flexDirection: 'column', gap: 6,
    fontSize: 'var(--t-xs)', lineHeight: 1.5,
  },
}
