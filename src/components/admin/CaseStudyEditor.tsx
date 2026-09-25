import { useState, useEffect, createContext, useContext } from 'react';

// ── Types (mirror src/content/config.ts) ────────────────────────────
type Lang = 'en' | 'es';
type Loc<T> = { en: T; es: T };
interface Style { bg?: string; accent?: string; textColor?: string; align?: 'left' | 'center' | 'right'; border?: boolean }
type Block =
  | { id: string; type: 'text'; style: Style; content: Loc<{ paragraphs: string[][] }> }
  | { id: string; type: 'quote'; style: Style; content: Loc<{ statement: string; subline?: string }> }
  | { id: string; type: 'numberedList'; style: Style; content: Loc<{ label: string; items: { heading: string; body: string }[] }> }
  | { id: string; type: 'audio'; style: Style; soundcloud?: { playlistId: string; secretToken?: string }; link?: string; content: Loc<{ title: string }> }
  | { id: string; type: 'credits'; style: Style; items: { role: string; name: string }[]; content: Loc<{ label: string }> }
  | { id: string; type: 'deliverables'; style: Style; content: Loc<{ label: string; items: string }> }
  | { id: string; type: 'about'; style: Style; content: Loc<{ label: string; body: string }> }
  | { id: string; type: 'image'; style: Style; src: string; content: Loc<{ caption?: string }> };

interface Draft {
  slug: string;
  title: string; client: string; category: string; videoId?: string; heroImage?: string;
  durationLabel?: string; jumpToScore?: boolean; jumpToId?: string;
  order?: number; draft?: boolean;
  dek: Loc<string>; backLabel: Loc<string>; jumpLabel?: Loc<string>;
  seo: Loc<{ metaTitle: string; metaDescription: string }>;
  blocks: Block[];
}

// ── UI translations (panel language, independent of the content language) ──
type UiLang = 'es' | 'en';
const UI = {
  es: {
    editor: 'Editor', panel: 'Idioma del panel', back: 'Volver al panel',
    preview: 'Vista previa', save: 'Guardar y publicar', saving: 'Guardando…',
    newCS: 'Nuevo case study', untitled: 'Sin título',
    editingA: 'Editando contenido', editingB: 'cambia el idioma del contenido arriba a la derecha · el estilo es común a ambos idiomas.',
    basics: 'Datos básicos',
    title: 'Título', slug: 'Slug (URL)', slugHintNew: 'minúsculas-con-guiones · será /work/<slug>/', slugHintLock: 'Bloqueado al editar.',
    client: 'Cliente', category: 'Categoría',
    videoId: 'Enlace del vídeo de YouTube', videoIdHint: 'El vídeo grande de la cabecera. Pega el enlace del vídeo y el código se extrae solo.',
    duration: 'Duración', durationHint: 'Etiqueta pequeña que se ve en una esquina del vídeo (p.ej. 0:45). Opcional.',
    showJump: 'Mostrar botón para saltar al audio en la cabecera (salta solo al primer bloque de Audio)', draftFlag: 'Borrador (oculto en la web)',
    jumpTarget: 'Id del bloque destino', jumpTargetHint: 'Dale este id a un bloque de Audio (por defecto: score).',
    heroSeo: 'Hero y SEO',
    dek: 'Dek (subtítulo bajo el título)', backLabel: 'Texto del enlace «volver»', jumpLabel: 'Texto del botón de salto',
    metaTitle: 'Meta título (SEO)', metaDesc: 'Meta descripción (SEO)',
    blocks: 'Bloques de contenido', addBlock: 'Añadir bloque',
    moveUp: 'Subir', moveDown: 'Bajar', del: 'Borrar', delBlock: '¿Borrar este bloque?',
    // text
    paragraphs: 'Párrafos — cada caja es un grupo; deja una línea en blanco dentro para separar párrafos.',
    removeGroup: 'Quitar grupo', addGroup: '+ Añadir grupo',
    // quote
    statement: 'Frase', subline: 'Subtítulo (pequeño, color de acento)',
    // numberedList
    sectionLabel: 'Etiqueta de sección', point: 'Punto', heading: 'título', body: 'Texto',
    removePoint: 'Quitar punto', addPoint: '+ Añadir punto',
    // audio
    scId: 'ID de la playlist de SoundCloud', scIdHint: 'Id numérico del embed/oEmbed.',
    scToken: 'Token secreto', scTokenHint: 'Para sets privados (la parte s-XXXX).',
    scLink: 'Enlace «Abrir en SoundCloud» (URL completa)',
    scLinkLabel: 'Enlace de SoundCloud', scLinkHint: 'Pega el enlace del set o pista. Si es privado, el código se coge automáticamente.',
    scLoad: 'Cargar', scResolving: 'Cargando…', scLoaded: 'Cargado',
    // credits
    creditsShared: 'Créditos (comunes a ambos idiomas)', role: 'Rol', name: 'Nombre', addCredit: '+ Añadir crédito',
    // deliverables
    items: 'Elementos', itemsHint: 'Sepáralos con · (punto medio).',
    // about
    label: 'Etiqueta',
    // style
    style: 'Estilo', bg: 'Fondo', bgDefault: 'Por defecto', bgAlt: 'Alt (más oscuro)', bgCraft: 'Craft (el más oscuro)', bgCustom: 'Personalizado…',
    align: 'Alineación', alignLeft: 'Izquierda', alignCenter: 'Centro', alignRight: 'Derecha',
    accent: 'Acento', divider: 'Línea divisoria', reset: 'Volver al estilo de marca',
    livePreview: 'Vista previa en vivo', updating: 'actualizando…', dark: 'Oscuro', light: 'Claro', close: 'Cerrar',
    recoveredMsg: 'Recuperamos un borrador sin guardar de antes.', discard: 'Descartar cambios',
    errSlug: 'El slug debe ser minúsculas separadas por guiones.', errTitle: 'El título es obligatorio.',
    heroType: 'Cabecera', heroVideo: 'Vídeo', heroPhoto: 'Imagen', heroImageLabel: 'Imagen de cabecera',
    uploadImage: 'Subir imagen', changeImage: 'Cambiar imagen', removeImage: 'Quitar', uploading: 'Subiendo…',
    caption: 'Pie de foto (opcional)', errNoMedia: 'Pon un vídeo o una imagen en la cabecera.',
    blockLabels: { text: 'Texto', quote: 'Cita', numberedList: 'Lista numerada', audio: 'Audio', credits: 'Créditos', deliverables: 'Entregables', about: 'Sobre la marca', image: 'Imagen' } as Record<Block['type'], string>,
  },
  en: {
    editor: 'Editor', panel: 'Panel language', back: 'Back to dashboard',
    preview: 'Preview', save: 'Save & publish', saving: 'Saving…',
    newCS: 'New case study', untitled: 'Untitled',
    editingA: 'Editing', editingB: 'content · switch the content language top-right · style is shared across languages.',
    basics: 'Basics',
    title: 'Title', slug: 'URL slug', slugHintNew: 'lowercase-with-hyphens · becomes /work/<slug>/', slugHintLock: 'Locked when editing.',
    client: 'Client', category: 'Category',
    videoId: 'YouTube video link', videoIdHint: 'The large hero video. Paste the video link and the code is extracted for you.',
    duration: 'Duration label', durationHint: 'The small label shown in a corner of the video (e.g. 0:45). Optional.',
    showJump: 'Show a button in the hero that jumps to the audio (auto-targets the first Audio block)', draftFlag: 'Draft (hidden from the site)',
    jumpTarget: 'Jump targets block id', jumpTargetHint: 'Give an Audio block this id (default: score).',
    heroSeo: 'Hero & SEO',
    dek: 'Dek (subtitle under the title)', backLabel: 'Back link label', jumpLabel: 'Jump button label',
    metaTitle: 'Meta title (SEO)', metaDesc: 'Meta description (SEO)',
    blocks: 'Content blocks', addBlock: 'Add block',
    moveUp: 'Move up', moveDown: 'Move down', del: 'Delete', delBlock: 'Delete this block?',
    paragraphs: 'Paragraphs — each box is one group; leave a blank line inside a box to split paragraphs.',
    removeGroup: 'Remove group', addGroup: '+ Add group',
    statement: 'Statement', subline: 'Sub-line (small, accent colour)',
    sectionLabel: 'Section label', point: 'Point', heading: 'heading', body: 'Body',
    removePoint: 'Remove point', addPoint: '+ Add point',
    scId: 'SoundCloud playlist ID', scIdHint: 'Numeric id from the embed / oEmbed URL.',
    scToken: 'Secret token', scTokenHint: 'For private sets (the s-XXXX part).',
    scLink: '“Open in SoundCloud” link (full share URL)',
    scLinkLabel: 'SoundCloud link', scLinkHint: 'Paste the set or track link. If private, the code is captured automatically.',
    scLoad: 'Load', scResolving: 'Loading…', scLoaded: 'Loaded',
    creditsShared: 'Credits (shared across languages)', role: 'Role', name: 'Name', addCredit: '+ Add credit',
    items: 'Items', itemsHint: 'Separate with · (middle dot).',
    label: 'Label',
    style: 'Style', bg: 'Background', bgDefault: 'Default', bgAlt: 'Alt (darker)', bgCraft: 'Craft (darkest)', bgCustom: 'Custom…',
    align: 'Align', alignLeft: 'Left', alignCenter: 'Center', alignRight: 'Right',
    accent: 'Accent', divider: 'Top divider', reset: 'Reset to brand',
    livePreview: 'Live preview', updating: 'updating…', dark: 'Dark', light: 'Light', close: 'Close',
    recoveredMsg: 'Recovered an unsaved draft from before.', discard: 'Discard changes',
    errSlug: 'Slug must be lowercase words separated by hyphens.', errTitle: 'Title is required.',
    heroType: 'Hero', heroVideo: 'Video', heroPhoto: 'Image', heroImageLabel: 'Hero image',
    uploadImage: 'Upload image', changeImage: 'Change image', removeImage: 'Remove', uploading: 'Uploading…',
    caption: 'Caption (optional)', errNoMedia: 'Add a hero video or image.',
    blockLabels: { text: 'Text', quote: 'Quote', numberedList: 'Numbered list', audio: 'Audio', credits: 'Credits', deliverables: 'Deliverables', about: 'About', image: 'Image' } as Record<Block['type'], string>,
  },
};
type Dict = typeof UI.es;
const TCtx = createContext<Dict>(UI.es);
const useT = () => useContext(TCtx);

const BG_TOKENS = ['default', 'alt', 'craft'];

function rid(type: string) { return `${type}-${Math.random().toString(36).slice(2, 7)}`; }

// Accept a full YouTube URL (any format) or a raw ID, and return just the 11-char ID.
function ytId(input: string): string {
  const s = input.trim();
  const m = s.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : s;
}

function newBlock(type: Block['type']): Block {
  const id = rid(type);
  switch (type) {
    case 'text': return { id, type, style: {}, content: { en: { paragraphs: [['']] }, es: { paragraphs: [['']] } } };
    case 'quote': return { id, type, style: { bg: 'alt', border: true, align: 'center' }, content: { en: { statement: '', subline: '' }, es: { statement: '', subline: '' } } };
    case 'numberedList': return { id, type, style: { bg: 'craft', border: true }, content: { en: { label: 'Behind the craft', items: [{ heading: '', body: '' }] }, es: { label: 'Detras de la pieza', items: [{ heading: '', body: '' }] } } };
    case 'audio': return { id, type, style: { border: true }, soundcloud: { playlistId: '', secretToken: '' }, link: '', content: { en: { title: 'Original score' }, es: { title: 'Score original' } } };
    case 'credits': return { id, type, style: { border: true }, items: [{ role: '', name: '' }], content: { en: { label: 'Credits' }, es: { label: 'Creditos' } } };
    case 'deliverables': return { id, type, style: { border: true }, content: { en: { label: 'Deliverables', items: '' }, es: { label: 'Entregables', items: '' } } };
    case 'about': return { id, type, style: { border: true }, content: { en: { label: 'About', body: '' }, es: { label: 'Sobre', body: '' } } };
    case 'image': return { id, type, style: {}, src: '', content: { en: { caption: '' }, es: { caption: '' } } };
  }
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      {children}
      {hint && <p className="adm-hint">{hint}</p>}
    </div>
  );
}

// Resize/compress an image in the browser before upload (keeps the repo lean).
function resizeImage(file: File, maxDim = 1600): Promise<{ dataBase64: string; ext: string; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (file.type === 'image/gif') { // don't canvas GIFs (would kill animation)
        resolve({ dataBase64: dataUrl.split(',')[1], ext: 'gif', dataUrl });
        return;
      }
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (Math.max(width, height) > maxDim) {
          const s = maxDim / Math.max(width, height);
          width = Math.round(width * s); height = Math.round(height * s);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        // Keep PNG only when the image actually has transparency (logos);
        // photos — even if uploaded as PNG — become JPEG (far smaller).
        let transparent = false;
        if (file.type === 'image/png') {
          try {
            const d = ctx.getImageData(0, 0, width, height).data;
            for (let i = 3; i < d.length; i += 4) { if (d[i] < 250) { transparent = true; break; } }
          } catch { transparent = true; } // tainted canvas → play safe
        }
        const out = transparent ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.82);
        resolve({ dataBase64: out.split(',')[1], ext: transparent ? 'png' : 'jpg', dataUrl: out });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

function ImageUpload({ slug, value, onChange }: { slug: string; value?: string; onChange: (url: string) => void }) {
  const t = useT();
  const [preview, setPreview] = useState<string | undefined>(value);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true); setErr(null);
    try {
      const { dataBase64, ext, dataUrl } = await resizeImage(file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, ext, dataBase64 }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Error');
      setPreview(dataUrl);
      onChange(json.url);
    } catch (e: any) { setErr(e.message || 'Error'); }
    finally { setBusy(false); }
  }
  return (
    <div className="adm-upload">
      {preview && <img src={preview} className="adm-upload-preview" alt="" />}
      <div className="adm-row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
        <label className="adm-btn adm-btn--ghost adm-btn--sm" style={{ cursor: busy ? 'default' : 'pointer' }}>
          {busy ? t.uploading : preview ? t.changeImage : t.uploadImage}
          <input type="file" accept="image/*" hidden onChange={pick} disabled={busy} />
        </label>
        {preview && !busy && (
          <button className="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger" onClick={() => { setPreview(undefined); onChange(''); }}>{t.removeImage}</button>
        )}
        {err && <span style={{ color: '#ff8f8f', fontSize: '0.75rem' }}>{err}</span>}
      </div>
    </div>
  );
}

function SoundCloudField({ block, update }: { block: any; update: (mut: (b: any) => void) => void }) {
  const t = useT();
  const [input, setInput] = useState<string>(block.soundcloud?.url ?? block.link ?? '');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok?: string; err?: string } | null>(
    block.soundcloud?.playlistId || block.soundcloud?.trackId ? { ok: t.scLoaded } : null
  );
  async function resolve() {
    const v = input.trim();
    if (!v) return;
    if (v === block.soundcloud?.url && (block.soundcloud?.playlistId || block.soundcloud?.trackId)) return; // unchanged
    setBusy(true); setStatus(null);
    try {
      const res = await fetch('/api/admin/soundcloud', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url: v }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.message || 'Error');
      update((b) => { b.soundcloud = { url: v, playlistId: j.playlistId, trackId: j.trackId, secretToken: j.secretToken }; b.link = v; });
      setStatus({ ok: j.title || t.scLoaded });
    } catch (e: any) { setStatus({ err: e.message }); }
    finally { setBusy(false); }
  }
  return (
    <Field label={t.scLinkLabel} hint={t.scLinkHint}>
      <div className="adm-row" style={{ gap: '0.5rem' }}>
        <input className="adm-input" value={input} placeholder="https://soundcloud.com/…"
          onChange={(e) => setInput(e.target.value)} onBlur={resolve} />
        <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={resolve} disabled={busy}>{busy ? t.scResolving : t.scLoad}</button>
      </div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.75rem' }}>
        {status?.ok && <span style={{ color: '#7dd69b' }}>✓ {status.ok}</span>}
        {status?.err && <span style={{ color: '#ff8f8f' }}>{status.err}</span>}
      </div>
    </Field>
  );
}

export default function CaseStudyEditor({ initial, isNew }: { initial: Draft; isNew: boolean }) {
  // Autosave key: one slot per case study (or one for a new one).
  const draftKey = isNew ? 'auden-draft:new' : `auden-draft:${initial.slug}`;
  const [draft, setDraft] = useState<Draft>(() => {
    try { const s = localStorage.getItem(draftKey); if (s) return JSON.parse(s) as Draft; } catch {}
    return initial;
  });
  // True only when the restored draft actually differs from the saved version.
  const [recovered, setRecovered] = useState<boolean>(() => {
    try { const s = localStorage.getItem(draftKey); return !!s && s !== JSON.stringify(initial); } catch { return false; }
  });
  const [lang, setLang] = useState<Lang>('en');
  const [uiLang, setUiLang] = useState<UiLang>('es');
  const [heroMode, setHeroMode] = useState<'video' | 'image'>(draft.heroImage && !draft.videoId ? 'image' : 'video');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [previewLoading, setPreviewLoading] = useState(false);
  const t = UI[uiLang];

  useEffect(() => {
    if (!previewOpen) return;
    const timer = setTimeout(async () => {
      setPreviewLoading(true);
      try {
        const res = await fetch('/api/admin/preview', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ data: draft, lang, theme: previewTheme }),
        });
        setPreviewHtml(await res.text());
      } catch {
        setPreviewHtml('<p style="font-family:sans-serif;padding:2rem">Preview failed.</p>');
      } finally { setPreviewLoading(false); }
    }, 450);
    return () => clearTimeout(timer);
  }, [previewOpen, draft, lang, previewTheme]);

  // Autosave the draft to the browser (debounced) so opening the preview,
  // going back, or reloading never loses work.
  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem(draftKey, JSON.stringify(draft)); } catch {}
    }, 600);
    return () => clearTimeout(t);
  }, [draft]);

  function discardDraft() {
    try { localStorage.removeItem(draftKey); } catch {}
    setDraft(initial);
    setRecovered(false);
  }

  function update(mut: (d: Draft) => void) {
    setDraft((prev) => { const next = structuredClone(prev); mut(next); return next; });
  }
  function showToast(msg: string, err = false) {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3500);
  }

  const slugValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug);

  async function save() {
    if (!slugValid) { showToast(t.errSlug, true); return; }
    if (!draft.title.trim()) { showToast(t.errTitle, true); return; }
    if (!draft.videoId && !draft.heroImage) { showToast(t.errNoMedia, true); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug: draft.slug, isNew, data: draft }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Save failed');
      showToast(json.message || 'Saved.');
      // Published to the repo — clear the local autosave.
      try { localStorage.removeItem(draftKey); } catch {}
      setRecovered(false);
    } catch (e: any) {
      showToast(e.message || 'Save failed', true);
    } finally { setSaving(false); }
  }

  return (
    <TCtx.Provider value={t}>
      <header className="adm-header">
        <div className="adm-row">
          <a href="/admin" className="adm-iconbtn" title={t.back} style={{ textDecoration: 'none' }}>←</a>
          <span className="adm-brand">Auden <span>{t.editor}</span></span>
          <div className="adm-lang" title={t.panel} style={{ marginLeft: '0.5rem' }}>
            <button data-active={uiLang === 'es'} onClick={() => setUiLang('es')}>🌐 ES</button>
            <button data-active={uiLang === 'en'} onClick={() => setUiLang('en')}>EN</button>
          </div>
        </div>
        <div className="adm-row">
          <div className="adm-lang" role="tablist" aria-label="Content language">
            <button data-active={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button data-active={lang === 'es'} onClick={() => setLang('es')}>ES</button>
          </div>
          <button className="adm-btn adm-btn--ghost" onClick={() => setPreviewOpen(true)}>{t.preview}</button>
          <button className="adm-btn adm-btn--primary" onClick={save} disabled={saving}>
            {saving ? t.saving : t.save}
          </button>
        </div>
      </header>

      <main className="adm-main">
        <h1 className="adm-h1">{isNew ? t.newCS : draft.title || t.untitled}</h1>
        <p className="adm-sub">{t.editingA} <strong>{lang.toUpperCase()}</strong> {t.editingB}</p>

        {recovered && (
          <div className="adm-recovered">
            <span>{t.recoveredMsg}</span>
            <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={discardDraft}>{t.discard}</button>
          </div>
        )}

        <section className="adm-card">
          <p className="adm-card-title">{t.basics}</p>
          <div className="adm-grid2">
            <Field label={t.title}><input className="adm-input" value={draft.title} onChange={(e) => update((d) => { d.title = e.target.value; })} /></Field>
            <Field label={t.slug} hint={isNew ? t.slugHintNew : t.slugHintLock}>
              <input className="adm-input" value={draft.slug} disabled={!isNew} style={!slugValid ? { borderColor: '#ff5a5a' } : undefined}
                onChange={(e) => update((d) => { d.slug = e.target.value; })} />
            </Field>
            <Field label={t.client}><input className="adm-input" value={draft.client} onChange={(e) => update((d) => { d.client = e.target.value; })} /></Field>
            <Field label={t.category}><input className="adm-input" value={draft.category} onChange={(e) => update((d) => { d.category = e.target.value; })} /></Field>
          </div>

          <div className="adm-field" style={{ marginTop: '1.1rem' }}>
            <label className="adm-label">{t.heroType}</label>
            <div className="adm-lang" style={{ marginBottom: '0.75rem' }}>
              <button data-active={heroMode === 'video'} onClick={() => { setHeroMode('video'); update((d) => { d.heroImage = undefined; }); }}>{t.heroVideo}</button>
              <button data-active={heroMode === 'image'} onClick={() => { setHeroMode('image'); update((d) => { d.videoId = ''; d.durationLabel = ''; }); }}>{t.heroPhoto}</button>
            </div>
            {heroMode === 'video' ? (
              <div className="adm-grid2">
                <Field label={t.videoId} hint={t.videoIdHint}><input className="adm-input" value={draft.videoId ?? ''} placeholder="https://youtu.be/…" onChange={(e) => update((d) => { d.videoId = ytId(e.target.value); })} /></Field>
                <Field label={t.duration} hint={t.durationHint}><input className="adm-input" value={draft.durationLabel ?? ''} placeholder="0:45" onChange={(e) => update((d) => { d.durationLabel = e.target.value; })} /></Field>
              </div>
            ) : (
              <Field label={t.heroImageLabel}>
                <ImageUpload slug={draft.slug} value={draft.heroImage} onChange={(url) => update((d) => { d.heroImage = url || undefined; })} />
              </Field>
            )}
          </div>
          <div className="adm-field" style={{ marginTop: '0.9rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <label className="adm-check"><input type="checkbox" checked={!!draft.jumpToScore} onChange={(e) => update((d) => { d.jumpToScore = e.target.checked; })} /> {t.showJump}</label>
            <label className="adm-check"><input type="checkbox" checked={!!draft.draft} onChange={(e) => update((d) => { d.draft = e.target.checked; })} /> {t.draftFlag}</label>
          </div>
        </section>

        <section className="adm-card">
          <p className="adm-card-title">{t.heroSeo} — {lang.toUpperCase()}</p>
          <Field label={t.dek}><textarea className="adm-textarea" value={draft.dek[lang]} onChange={(e) => update((d) => { d.dek[lang] = e.target.value; })} /></Field>
          <div className="adm-grid2">
            <Field label={t.backLabel}><input className="adm-input" value={draft.backLabel[lang]} onChange={(e) => update((d) => { d.backLabel[lang] = e.target.value; })} /></Field>
            <Field label={t.jumpLabel}><input className="adm-input" value={draft.jumpLabel?.[lang] ?? ''} onChange={(e) => update((d) => { if (!d.jumpLabel) d.jumpLabel = { en: '', es: '' }; d.jumpLabel[lang] = e.target.value; })} /></Field>
          </div>
          <Field label={t.metaTitle}><input className="adm-input" value={draft.seo[lang].metaTitle} onChange={(e) => update((d) => { d.seo[lang].metaTitle = e.target.value; })} /></Field>
          <Field label={t.metaDesc}><textarea className="adm-textarea" value={draft.seo[lang].metaDescription} onChange={(e) => update((d) => { d.seo[lang].metaDescription = e.target.value; })} /></Field>
        </section>

        <p className="adm-card-title" style={{ marginTop: '2rem' }}>{t.blocks}</p>
        {draft.blocks.map((block, i) => (
          <BlockCard
            key={block.id}
            block={block}
            lang={lang}
            index={i}
            total={draft.blocks.length}
            update={(mut) => update((d) => mut(d.blocks[i]))}
            move={(dir) => update((d) => { const j = i + dir; if (j < 0 || j >= d.blocks.length) return; [d.blocks[i], d.blocks[j]] = [d.blocks[j], d.blocks[i]]; })}
            remove={() => update((d) => { d.blocks.splice(i, 1); })}
          />
        ))}

        <div className="adm-add">
          <span className="adm-style-lbl">{t.addBlock}</span>
          {(Object.keys(t.blockLabels) as Block['type'][]).map((ty) => (
            <button key={ty} className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => update((d) => { d.blocks.push(newBlock(ty)); })}>+ {t.blockLabels[ty]}</button>
          ))}
        </div>
      </main>

      {previewOpen && (
        <div className="adm-preview">
          <div className="adm-preview-bar">
            <span className="adm-style-lbl">{t.livePreview} — {lang.toUpperCase()}{previewLoading ? ` · ${t.updating}` : ''}</span>
            <div className="adm-row">
              <div className="adm-lang">
                <button data-active={previewTheme === 'dark'} onClick={() => setPreviewTheme('dark')}>{t.dark}</button>
                <button data-active={previewTheme === 'light'} onClick={() => setPreviewTheme('light')}>{t.light}</button>
              </div>
              <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setPreviewOpen(false)}>{t.close} ✕</button>
            </div>
          </div>
          <iframe className="adm-preview-frame" srcDoc={previewHtml} title="Preview" />
        </div>
      )}

      {toast && <div className={`adm-toast${toast.err ? ' adm-toast--err' : ''}`}>{toast.msg}</div>}
    </TCtx.Provider>
  );
}

function BlockCard({ block, lang, index, total, update, move, remove }: {
  block: Block; lang: Lang; index: number; total: number;
  update: (mut: (b: any) => void) => void;
  move: (dir: number) => void; remove: () => void;
}) {
  const t = useT();
  return (
    <div className="adm-block">
      <div className="adm-block-head">
        <span className="adm-block-type"><b>{t.blockLabels[block.type]}</b> <span style={{ color: 'var(--adm-faint)' }}>#{block.id}</span></span>
        <div className="adm-row" style={{ gap: '0.35rem' }}>
          <button className="adm-iconbtn" title={t.moveUp} disabled={index === 0} onClick={() => move(-1)}>↑</button>
          <button className="adm-iconbtn" title={t.moveDown} disabled={index === total - 1} onClick={() => move(1)}>↓</button>
          <button className="adm-iconbtn adm-btn--danger" title={t.del} onClick={() => { if (confirm(t.delBlock)) remove(); }}>✕</button>
        </div>
      </div>
      <div className="adm-block-body">
        <BlockFields block={block} lang={lang} update={update} />
        <StyleControls style={block.style} update={update} />
      </div>
    </div>
  );
}

function BlockFields({ block, lang, update }: { block: Block; lang: Lang; update: (mut: (b: any) => void) => void }) {
  const t = useT();
  const c: any = (block as any).content[lang];

  if (block.type === 'text') {
    const groups: string[][] = c.paragraphs;
    return (
      <>
        <label className="adm-label">{t.paragraphs}</label>
        {groups.map((g, gi) => (
          <div key={gi} className="adm-repeat-item">
            <textarea className="adm-textarea" value={g.join('\n\n')}
              onChange={(e) => update((b) => { b.content[lang].paragraphs[gi] = e.target.value.split(/\n{2,}/); })} />
            <div style={{ marginTop: '0.5rem' }}>
              <button className="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger" onClick={() => update((b) => { b.content[lang].paragraphs.splice(gi, 1); })}>{t.removeGroup}</button>
            </div>
          </div>
        ))}
        <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => update((b) => { b.content[lang].paragraphs.push(['']); })}>{t.addGroup}</button>
      </>
    );
  }

  if (block.type === 'quote') {
    return (
      <>
        <Field label={t.statement}><textarea className="adm-textarea" value={c.statement} onChange={(e) => update((b) => { b.content[lang].statement = e.target.value; })} /></Field>
        <Field label={t.subline}><input className="adm-input" value={c.subline ?? ''} onChange={(e) => update((b) => { b.content[lang].subline = e.target.value; })} /></Field>
      </>
    );
  }

  if (block.type === 'numberedList') {
    return (
      <>
        <Field label={t.sectionLabel}><input className="adm-input" value={c.label} onChange={(e) => update((b) => { b.content[lang].label = e.target.value; })} /></Field>
        {c.items.map((it: any, ii: number) => (
          <div key={ii} className="adm-repeat-item">
            <Field label={`${t.point} ${ii + 1} — ${t.heading}`}><input className="adm-input" value={it.heading} onChange={(e) => update((b) => { b.content[lang].items[ii].heading = e.target.value; })} /></Field>
            <Field label={t.body}><textarea className="adm-textarea" value={it.body} onChange={(e) => update((b) => { b.content[lang].items[ii].body = e.target.value; })} /></Field>
            <button className="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger" onClick={() => update((b) => { b.content[lang].items.splice(ii, 1); })}>{t.removePoint}</button>
          </div>
        ))}
        <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => update((b) => { b.content[lang].items.push({ heading: '', body: '' }); })}>{t.addPoint}</button>
      </>
    );
  }

  if (block.type === 'audio') {
    return (
      <>
        <Field label={t.title}><input className="adm-input" value={c.title} onChange={(e) => update((bb) => { bb.content[lang].title = e.target.value; })} /></Field>
        <SoundCloudField block={block} update={update} />
      </>
    );
  }

  if (block.type === 'credits') {
    const b: any = block;
    return (
      <>
        <Field label={t.sectionLabel}><input className="adm-input" value={c.label} onChange={(e) => update((bb) => { bb.content[lang].label = e.target.value; })} /></Field>
        <label className="adm-label">{t.creditsShared}</label>
        {b.items.map((it: any, ii: number) => (
          <div key={ii} className="adm-repeat-item" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.6rem', alignItems: 'end' }}>
            <div><label className="adm-label">{t.role}</label><input className="adm-input" value={it.role} onChange={(e) => update((bb) => { bb.items[ii].role = e.target.value; })} /></div>
            <div><label className="adm-label">{t.name}</label><input className="adm-input" value={it.name} onChange={(e) => update((bb) => { bb.items[ii].name = e.target.value; })} /></div>
            <button className="adm-iconbtn adm-btn--danger" onClick={() => update((bb) => { bb.items.splice(ii, 1); })}>✕</button>
          </div>
        ))}
        <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => update((bb) => { bb.items.push({ role: '', name: '' }); })}>{t.addCredit}</button>
      </>
    );
  }

  if (block.type === 'deliverables') {
    return (
      <>
        <Field label={t.sectionLabel}><input className="adm-input" value={c.label} onChange={(e) => update((b) => { b.content[lang].label = e.target.value; })} /></Field>
        <Field label={t.items} hint={t.itemsHint}><input className="adm-input" value={c.items} onChange={(e) => update((b) => { b.content[lang].items = e.target.value; })} /></Field>
      </>
    );
  }

  if (block.type === 'about') {
    return (
      <>
        <Field label={t.label}><input className="adm-input" value={c.label} onChange={(e) => update((b) => { b.content[lang].label = e.target.value; })} /></Field>
        <Field label={t.body}><textarea className="adm-textarea" value={c.body} onChange={(e) => update((b) => { b.content[lang].body = e.target.value; })} /></Field>
      </>
    );
  }

  if (block.type === 'image') {
    const b: any = block;
    return (
      <>
        <Field label={t.heroPhoto}>
          <ImageUpload slug="" value={b.src} onChange={(url) => update((bb) => { bb.src = url; })} />
        </Field>
        <Field label={t.caption}><input className="adm-input" value={c.caption ?? ''} onChange={(e) => update((bb) => { bb.content[lang].caption = e.target.value; })} /></Field>
      </>
    );
  }
  return null;
}

function StyleControls({ style, update }: { style: Style; update: (mut: (b: any) => void) => void }) {
  const t = useT();
  const bgMode = style.bg == null ? 'default' : BG_TOKENS.includes(style.bg) ? style.bg : 'custom';
  const hasAccent = !!style.accent;
  return (
    <div className="adm-style">
      <span className="adm-style-lbl">{t.style}</span>

      <label className="adm-style-lbl" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
        {t.bg}
        <select className="adm-select" style={{ width: 'auto' }} value={bgMode}
          onChange={(e) => update((b) => { const v = e.target.value; b.style.bg = v === 'custom' ? '#0a0a0a' : v; })}>
          <option value="default">{t.bgDefault}</option>
          <option value="alt">{t.bgAlt}</option>
          <option value="craft">{t.bgCraft}</option>
          <option value="custom">{t.bgCustom}</option>
        </select>
      </label>
      {bgMode === 'custom' && (
        <input className="adm-color" type="color" value={/^#/.test(style.bg || '') ? (style.bg as string) : '#0a0a0a'} onChange={(e) => update((b) => { b.style.bg = e.target.value; })} />
      )}

      <label className="adm-style-lbl" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
        {t.align}
        <select className="adm-select" style={{ width: 'auto' }} value={style.align ?? 'left'} onChange={(e) => update((b) => { b.style.align = e.target.value === 'left' ? undefined : e.target.value; })}>
          <option value="left">{t.alignLeft}</option>
          <option value="center">{t.alignCenter}</option>
          <option value="right">{t.alignRight}</option>
        </select>
      </label>

      <label className="adm-check adm-style-lbl">
        <input type="checkbox" checked={hasAccent} onChange={(e) => update((b) => { b.style.accent = e.target.checked ? '#ff4d00' : undefined; })} /> {t.accent}
      </label>
      {hasAccent && <input className="adm-color" type="color" value={style.accent || '#ff4d00'} onChange={(e) => update((b) => { b.style.accent = e.target.value; })} />}

      <label className="adm-check adm-style-lbl">
        <input type="checkbox" checked={!!style.border} onChange={(e) => update((b) => { b.style.border = e.target.checked || undefined; })} /> {t.divider}
      </label>

      <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => update((b) => { b.style = {}; })}>{t.reset}</button>
    </div>
  );
}
