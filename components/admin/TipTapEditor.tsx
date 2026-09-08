'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TiptapLink from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Youtube from '@tiptap/extension-youtube'
import { createBrowserClient } from '@/lib/supabase/client'

const MAX_IMAGE_MB = 5

/**
 * Superficie de escritura.
 *
 * Cambios de fondo respecto a la versión anterior:
 *  - Estaba pintado para fondo oscuro (`bg-white/10`, texto blanco) dentro de
 *    un CMS que ahora es papel: los bordes eran invisibles y el texto no se
 *    leía. Pasa a los mismos tokens que el resto del panel.
 *  - `prompt()` para pedir la URL de un enlace o de un vídeo, y `alert()` para
 *    los errores de subida. Los diálogos del navegador sacan a quien escribe
 *    del documento y no se pueden estilar ni traducir. Ahora la URL se pide en
 *    una barra que aparece bajo la herramienta, y los errores salen dentro del
 *    editor.
 *  - La barra de herramientas se queda pegada arriba: en un artículo de 1.500
 *    palabras estaba a mil píxeles de donde escribes.
 *  - Los botones eran emoji (🔗 🖼 ▶) y flechas de texto. Ahora son iconos con
 *    el mismo trazo que el resto de la interfaz, y anuncian su estado.
 */
export default function TipTapEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const [ask, setAsk] = useState<null | 'link' | 'youtube'>(null)
  const [askValue, setAskValue] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const askRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      TiptapImage.configure({ inline: false, allowBase64: false }),
      TiptapLink.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Placeholder.configure({ placeholder: 'Empieza por lo que el lector necesita saber en el primer párrafo…' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Youtube.configure({ width: 640, height: 360 }),
    ],
    content,
    editorProps: { attributes: { class: 'prose-editor' } },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  useEffect(() => { if (ask) requestAnimationFrame(() => askRef.current?.focus()) }, [ask])

  const openAsk = (kind: 'link' | 'youtube') => {
    setError('')
    setAskValue(kind === 'link' ? (editor?.getAttributes('link').href ?? 'https://') : 'https://')
    setAsk(kind)
  }

  const applyAsk = () => {
    if (!editor) return
    const url = askValue.trim()
    if (!url || url === 'https://') { setAsk(null); return }
    if (ask === 'link') editor.chain().focus().setLink({ href: url }).run()
    else editor.commands.setYoutubeVideo({ src: url })
    setAsk(null)
  }

  const addImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file || !editor) return
      if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
        setError(`La imagen pesa ${(file.size / 1048576).toFixed(1)} MB y el máximo son ${MAX_IMAGE_MB} MB.`)
        return
      }
      setUploading(true); setError('')
      const sb = createBrowserClient()
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error } = await sb.storage.from('blog-images').upload(path, file, { contentType: file.type })
      setUploading(false)
      if (error) { setError('No se pudo subir la imagen. ' + error.message); return }
      const { data } = sb.storage.from('blog-images').getPublicUrl(path)
      editor.chain().focus().setImage({ src: data.publicUrl, alt: file.name.replace(/\.[^.]+$/, '') }).run()
    }
    input.click()
  }, [editor])

  if (!editor) return <div className="skeleton" style={{ height: 340, borderRadius: 'var(--r-lg)' }} aria-hidden />

  return (
    <div className="tt">
      <div className="tt__bar" role="toolbar" aria-label="Formato del texto">
        <Group>
          <T ed={editor} on={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} label="Título de sección (H2)"><b>H2</b></T>
          <T ed={editor} on={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} label="Subtítulo (H3)"><b>H3</b></T>
          <T ed={editor} on={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive('heading', { level: 4 })} label="Subtítulo menor (H4)"><b>H4</b></T>
        </Group>
        <Sep />
        <Group>
          <T ed={editor} on={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} label="Negrita"><b style={{ fontWeight: 800 }}>B</b></T>
          <T ed={editor} on={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} label="Cursiva"><i style={{ fontFamily: 'Georgia, serif' }}>I</i></T>
          <T ed={editor} on={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} label="Subrayado"><u>U</u></T>
          <T ed={editor} on={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} label="Tachado"><s>S</s></T>
        </Group>
        <Sep />
        <Group>
          <T ed={editor} on={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} label="Lista con viñetas"><IconList /></T>
          <T ed={editor} on={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} label="Lista numerada"><IconListOrdered /></T>
          <T ed={editor} on={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} label="Cita"><IconQuote /></T>
          <T ed={editor} on={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} label="Bloque de código"><IconCode /></T>
        </Group>
        <Sep />
        <Group>
          <T ed={editor} on={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} label="Alinear a la izquierda"><IconAlign x={[10, 14, 8]} /></T>
          <T ed={editor} on={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} label="Centrar"><IconAlign x={[14, 9, 12]} center /></T>
          <T ed={editor} on={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} label="Alinear a la derecha"><IconAlign x={[14, 10, 12]} right /></T>
        </Group>
        <Sep />
        <Group>
          <T ed={editor} on={() => openAsk('link')} active={editor.isActive('link')} label="Insertar enlace"><IconLink /></T>
          <T ed={editor} on={addImage} active={false} label="Insertar imagen" busy={uploading}>{uploading ? <span className="spinner" style={{ width: 13, height: 13 }} /> : <IconImage />}</T>
          <T ed={editor} on={() => openAsk('youtube')} active={false} label="Insertar vídeo de YouTube"><IconPlay /></T>
          <T ed={editor} on={() => editor.chain().focus().setHorizontalRule().run()} active={false} label="Separador"><IconRule /></T>
        </Group>
        <Sep />
        <Group>
          <T ed={editor} on={() => editor.chain().focus().undo().run()} active={false} disabled={!editor.can().undo()} label="Deshacer"><IconUndo /></T>
          <T ed={editor} on={() => editor.chain().focus().redo().run()} active={false} disabled={!editor.can().redo()} label="Rehacer"><IconUndo flip /></T>
        </Group>
      </div>

      {ask && (
        <div className="tt__ask rise">
          <label htmlFor="tt-url" className="label" style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>
            {ask === 'link' ? 'Enlace a' : 'Vídeo de YouTube'}
          </label>
          <input
            ref={askRef}
            id="tt-url"
            className="input mono"
            value={askValue}
            onChange={(e) => setAskValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); applyAsk() } if (e.key === 'Escape') setAsk(null) }}
            placeholder={ask === 'link' ? 'https://3rcore.com/es/servicios' : 'https://www.youtube.com/watch?v=…'}
            style={{ flex: 1, minWidth: 150 }}
          />
          <button type="button" className="btn btn--sm btn--primary" onClick={applyAsk}>Insertar</button>
          {ask === 'link' && editor.isActive('link') && (
            <button type="button" className="btn btn--sm btn--ghost" onClick={() => { editor.chain().focus().unsetLink().run(); setAsk(null) }}>Quitar</button>
          )}
          <button type="button" className="icon-btn" onClick={() => setAsk(null)} aria-label="Cancelar"><IconX /></button>
        </div>
      )}

      {error && (
        <div className="notice notice--error" role="alert" style={{ margin: 'var(--s-3) var(--s-4) 0', borderRadius: 'var(--r-sm)' }}>
          <span style={{ flex: 1 }}>{error}</span>
          <button type="button" className="icon-btn" onClick={() => setError('')} aria-label="Cerrar aviso"><IconX /></button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  )
}

/* ── Piezas de la barra ────────────────────────────────────────────────── */
function Group({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', gap: 2 }}>{children}</div>
}
function Sep() {
  return <span aria-hidden style={{ width: 1, alignSelf: 'stretch', background: 'var(--rule)', margin: '3px 5px' }} />
}
function T({ on, active, label, children, disabled, busy }: {
  ed: Editor; on: () => void; active: boolean; label: string; children: React.ReactNode; disabled?: boolean; busy?: boolean
}) {
  return (
    <button type="button" onClick={on} title={label} aria-label={label} aria-pressed={active}
      disabled={disabled || busy} className="tt__btn" data-active={active || undefined}>
      {children}
    </button>
  )
}

/* ── Iconos: trazo 1.5, caja 18 ────────────────────────────────────────── */
const sv = { width: 16, height: 16, viewBox: '0 0 18 18', fill: 'none', 'aria-hidden': true } as const
const st = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

function IconList() { return <svg {...sv}><path d="M6.5 4.5h8M6.5 9h8M6.5 13.5h8" {...st} /><circle cx="3.4" cy="4.5" r="1" fill="currentColor" /><circle cx="3.4" cy="9" r="1" fill="currentColor" /><circle cx="3.4" cy="13.5" r="1" fill="currentColor" /></svg> }
function IconListOrdered() { return <svg {...sv}><path d="M7 4.5h7.5M7 9h7.5M7 13.5h7.5" {...st} /><text x="1.6" y="6" fontSize="5.4" fill="currentColor" fontWeight="700">1</text><text x="1.6" y="10.6" fontSize="5.4" fill="currentColor" fontWeight="700">2</text><text x="1.6" y="15.2" fontSize="5.4" fill="currentColor" fontWeight="700">3</text></svg> }
function IconQuote() { return <svg {...sv}><path d="M4 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2c0 2.4-1.2 4-3 4.7M12 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2c0 2.4-1.2 4-3 4.7" {...st} /></svg> }
function IconCode() { return <svg {...sv}><path d="m6 6-3.5 3L6 12M12 6l3.5 3L12 12M10.4 3.8l-2.8 10.4" {...st} /></svg> }
function IconAlign({ x, center, right }: { x: number[]; center?: boolean; right?: boolean }) {
  const pos = (w: number) => (center ? `${(18 - w) / 2}` : right ? `${16 - w}` : '2')
  return <svg {...sv}>{x.map((w, i) => <line key={i} x1={pos(w)} y1={4.5 + i * 4.3} x2={Number(pos(w)) + w} y2={4.5 + i * 4.3} {...st} />)}</svg>
}
function IconLink() { return <svg {...sv}><path d="M7.6 10.4a3 3 0 0 0 4.4.3l2-2a3 3 0 0 0-4.2-4.2l-1.1 1.1M10.4 7.6a3 3 0 0 0-4.4-.3l-2 2a3 3 0 0 0 4.2 4.2l1.1-1.1" {...st} /></svg> }
function IconImage() { return <svg {...sv}><rect x="2.5" y="3.5" width="13" height="11" rx="1.6" {...st} /><circle cx="6.6" cy="7.2" r="1.2" {...st} /><path d="m3.2 12.4 3.6-3.2 3 2.6 2.2-1.9 2.8 2.5" {...st} /></svg> }
function IconPlay() { return <svg {...sv}><rect x="1.8" y="4" width="14.4" height="10" rx="2.4" {...st} /><path d="M7.6 7.3v3.4l3-1.7z" fill="currentColor" /></svg> }
function IconRule() { return <svg {...sv}><path d="M2.5 9h13" {...st} /><path d="M5 5.2h8M5 12.8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".35" /></svg> }
function IconUndo({ flip }: { flip?: boolean }) {
  return <svg {...sv} style={flip ? { transform: 'scaleX(-1)' } : undefined}><path d="M6.2 5.5H10a4 4 0 0 1 0 8H5.5M6.2 5.5 8.8 3M6.2 5.5 8.8 8" {...st} /></svg>
}
function IconX() { return <svg {...sv} width={14} height={14}><path d="M5 5l8 8M13 5l-8 8" {...st} /></svg> }
