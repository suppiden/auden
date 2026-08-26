import { useState, useEffect } from 'react';

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
  | { id: string; type: 'about'; style: Style; content: Loc<{ label: string; body: string }> };

interface Draft {
  slug: string;
  title: string; client: string; category: string; videoId: string;
  durationLabel?: string; jumpToScore?: boolean; jumpToId?: string;
  order?: number; draft?: boolean;
  dek: Loc<string>; backLabel: Loc<string>; jumpLabel?: Loc<string>;
  seo: Loc<{ metaTitle: string; metaDescription: string }>;
  blocks: Block[];
}

const BLOCK_LABELS: Record<Block['type'], string> = {
  text: 'Text', quote: 'Quote', numberedList: 'Numbered list',
  audio: 'Audio', credits: 'Credits', deliverables: 'Deliverables', about: 'About',
};
const BG_TOKENS = ['default', 'alt', 'craft'];

function rid(type: string) { return `${type}-${Math.random().toString(36).slice(2, 7)}`; }

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
  }
}

// ── small field helpers ─────────────────────────────────────────────
function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      {children}
      {hint && <p className="adm-hint">{hint}</p>}
    </div>
  );
}

export default function CaseStudyEditor({ initial, isNew }: { initial: Draft; isNew: boolean }) {
  const [draft, setDraft] = useState<Draft>(initial);
  const [lang, setLang] = useState<Lang>('en');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [previewLoading, setPreviewLoading] = useState(false);

  // Live preview: re-render the real case-study component from the draft.
  useEffect(() => {
    if (!previewOpen) return;
    const t = setTimeout(async () => {
      setPreviewLoading(true);
      try {
        const res = await fetch('/api/admin/preview', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ data: draft, lang, theme: previewTheme }),
        });
        setPreviewHtml(await res.text());
      } catch {
        setPreviewHtml('<p style="font-family:sans-serif;padding:2rem">Preview failed.</p>');
      } finally {
        setPreviewLoading(false);
      }
    }, 450);
    return () => clearTimeout(t);
  }, [previewOpen, draft, lang, previewTheme]);

  function update(mut: (d: Draft) => void) {
    setDraft((prev) => { const next = structuredClone(prev); mut(next); return next; });
  }
  function showToast(msg: string, err = false) {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3500);
  }

  const slugValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug);

  async function save() {
    if (!slugValid) { showToast('Slug must be lowercase words separated by hyphens.', true); return; }
    if (!draft.title.trim()) { showToast('Title is required.', true); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug: draft.slug, isNew, data: draft }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Save failed');
      showToast(json.message || 'Saved.');
    } catch (e: any) {
      showToast(e.message || 'Save failed', true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <header className="adm-header">
        <div className="adm-row">
          <a href="/admin" className="adm-iconbtn" title="Back to dashboard" style={{ textDecoration: 'none' }}>←</a>
          <span className="adm-brand">Auden <span>Editor</span></span>
        </div>
        <div className="adm-row">
          <div className="adm-lang" role="tablist" aria-label="Language">
            <button data-active={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button data-active={lang === 'es'} onClick={() => setLang('es')}>ES</button>
          </div>
          <button className="adm-btn adm-btn--ghost" onClick={() => setPreviewOpen(true)}>Preview</button>
          <button className="adm-btn adm-btn--primary" onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save & publish'}
          </button>
        </div>
      </header>

      <main className="adm-main">
        <h1 className="adm-h1">{isNew ? 'New case study' : draft.title || 'Untitled'}</h1>
        <p className="adm-sub">Editing <strong>{lang.toUpperCase()}</strong> content · switch language top-right · style is shared across languages.</p>

        {/* ── Meta ── */}
        <section className="adm-card">
          <p className="adm-card-title">Basics</p>
          <div className="adm-grid2">
            <Field label="Title"><input className="adm-input" value={draft.title} onChange={(e) => update((d) => { d.title = e.target.value; })} /></Field>
            <Field label="URL slug" hint={isNew ? 'lowercase-with-hyphens · becomes /work/<slug>/' : 'Locked when editing.'}>
              <input className="adm-input" value={draft.slug} disabled={!isNew} style={!slugValid ? { borderColor: '#ff5a5a' } : undefined}
                onChange={(e) => update((d) => { d.slug = e.target.value; })} />
            </Field>
            <Field label="Client"><input className="adm-input" value={draft.client} onChange={(e) => update((d) => { d.client = e.target.value; })} /></Field>
            <Field label="Category"><input className="adm-input" value={draft.category} onChange={(e) => update((d) => { d.category = e.target.value; })} /></Field>
            <Field label="YouTube video ID" hint="The part after v= (e.g. boZns6DvLl8)."><input className="adm-input" value={draft.videoId} onChange={(e) => update((d) => { d.videoId = e.target.value; })} /></Field>
            <Field label="Duration label"><input className="adm-input" value={draft.durationLabel ?? ''} placeholder="0:45" onChange={(e) => update((d) => { d.durationLabel = e.target.value; })} /></Field>
          </div>
          <div className="adm-field" style={{ marginTop: '0.9rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <label className="adm-check"><input type="checkbox" checked={!!draft.jumpToScore} onChange={(e) => update((d) => { d.jumpToScore = e.target.checked; })} /> Show “jump to score” button under the hero video</label>
            <label className="adm-check"><input type="checkbox" checked={!!draft.draft} onChange={(e) => update((d) => { d.draft = e.target.checked; })} /> Draft (hidden from the site)</label>
          </div>
          {draft.jumpToScore && (
            <Field label="Jump targets block id" hint="Give an Audio block this id (default: score).">
              <input className="adm-input" value={draft.jumpToId ?? 'score'} onChange={(e) => update((d) => { d.jumpToId = e.target.value; })} />
            </Field>
          )}
        </section>

        {/* ── Hero copy ── */}
        <section className="adm-card">
          <p className="adm-card-title">Hero &amp; SEO — {lang.toUpperCase()}</p>
          <Field label="Dek (subtitle under the title)"><textarea className="adm-textarea" value={draft.dek[lang]} onChange={(e) => update((d) => { d.dek[lang] = e.target.value; })} /></Field>
          <div className="adm-grid2">
            <Field label="Back link label"><input className="adm-input" value={draft.backLabel[lang]} onChange={(e) => update((d) => { d.backLabel[lang] = e.target.value; })} /></Field>
            <Field label="Jump button label"><input className="adm-input" value={draft.jumpLabel?.[lang] ?? ''} onChange={(e) => update((d) => { if (!d.jumpLabel) d.jumpLabel = { en: '', es: '' }; d.jumpLabel[lang] = e.target.value; })} /></Field>
          </div>
          <Field label="Meta title (SEO)"><input className="adm-input" value={draft.seo[lang].metaTitle} onChange={(e) => update((d) => { d.seo[lang].metaTitle = e.target.value; })} /></Field>
          <Field label="Meta description (SEO)"><textarea className="adm-textarea" value={draft.seo[lang].metaDescription} onChange={(e) => update((d) => { d.seo[lang].metaDescription = e.target.value; })} /></Field>
        </section>

        {/* ── Blocks ── */}
        <p className="adm-card-title" style={{ marginTop: '2rem' }}>Content blocks</p>
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
          <span className="adm-style-lbl">Add block</span>
          {(Object.keys(BLOCK_LABELS) as Block['type'][]).map((t) => (
            <button key={t} className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => update((d) => { d.blocks.push(newBlock(t)); })}>+ {BLOCK_LABELS[t]}</button>
          ))}
        </div>
      </main>

      {previewOpen && (
        <div className="adm-preview">
          <div className="adm-preview-bar">
            <span className="adm-style-lbl">Live preview — {lang.toUpperCase()}{previewLoading ? ' · updating…' : ''}</span>
            <div className="adm-row">
              <div className="adm-lang">
                <button data-active={previewTheme === 'dark'} onClick={() => setPreviewTheme('dark')}>Dark</button>
                <button data-active={previewTheme === 'light'} onClick={() => setPreviewTheme('light')}>Light</button>
              </div>
              <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setPreviewOpen(false)}>Close ✕</button>
            </div>
          </div>
          <iframe className="adm-preview-frame" srcDoc={previewHtml} title="Preview" />
        </div>
      )}

      {toast && <div className={`adm-toast${toast.err ? ' adm-toast--err' : ''}`}>{toast.msg}</div>}
    </>
  );
}

// ── One block card ──────────────────────────────────────────────────
function BlockCard({ block, lang, index, total, update, move, remove }: {
  block: Block; lang: Lang; index: number; total: number;
  update: (mut: (b: any) => void) => void;
  move: (dir: number) => void; remove: () => void;
}) {
  return (
    <div className="adm-block">
      <div className="adm-block-head">
        <span className="adm-block-type"><b>{BLOCK_LABELS[block.type]}</b> <span style={{ color: 'var(--adm-faint)' }}>#{block.id}</span></span>
        <div className="adm-row" style={{ gap: '0.35rem' }}>
          <button className="adm-iconbtn" title="Move up" disabled={index === 0} onClick={() => move(-1)}>↑</button>
          <button className="adm-iconbtn" title="Move down" disabled={index === total - 1} onClick={() => move(1)}>↓</button>
          <button className="adm-iconbtn adm-btn--danger" title="Delete" onClick={() => { if (confirm('Delete this block?')) remove(); }}>✕</button>
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
  const c: any = (block as any).content[lang];

  if (block.type === 'text') {
    const groups: string[][] = c.paragraphs;
    return (
      <>
        <label className="adm-label">Paragraphs — each box is one group; leave a blank line inside a box to split paragraphs.</label>
        {groups.map((g, gi) => (
          <div key={gi} className="adm-repeat-item">
            <textarea className="adm-textarea" value={g.join('\n\n')}
              onChange={(e) => update((b) => { b.content[lang].paragraphs[gi] = e.target.value.split(/\n{2,}/); })} />
            <div style={{ marginTop: '0.5rem' }}>
              <button className="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger" onClick={() => update((b) => { b.content[lang].paragraphs.splice(gi, 1); })}>Remove group</button>
            </div>
          </div>
        ))}
        <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => update((b) => { b.content[lang].paragraphs.push(['']); })}>+ Add group</button>
      </>
    );
  }

  if (block.type === 'quote') {
    return (
      <>
        <Field label="Statement"><textarea className="adm-textarea" value={c.statement} onChange={(e) => update((b) => { b.content[lang].statement = e.target.value; })} /></Field>
        <Field label="Sub-line (small, accent colour)"><input className="adm-input" value={c.subline ?? ''} onChange={(e) => update((b) => { b.content[lang].subline = e.target.value; })} /></Field>
      </>
    );
  }

  if (block.type === 'numberedList') {
    return (
      <>
        <Field label="Section label"><input className="adm-input" value={c.label} onChange={(e) => update((b) => { b.content[lang].label = e.target.value; })} /></Field>
        {c.items.map((it: any, ii: number) => (
          <div key={ii} className="adm-repeat-item">
            <Field label={`Point ${ii + 1} — heading`}><input className="adm-input" value={it.heading} onChange={(e) => update((b) => { b.content[lang].items[ii].heading = e.target.value; })} /></Field>
            <Field label="Body"><textarea className="adm-textarea" value={it.body} onChange={(e) => update((b) => { b.content[lang].items[ii].body = e.target.value; })} /></Field>
            <button className="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger" onClick={() => update((b) => { b.content[lang].items.splice(ii, 1); })}>Remove point</button>
          </div>
        ))}
        <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => update((b) => { b.content[lang].items.push({ heading: '', body: '' }); })}>+ Add point</button>
      </>
    );
  }

  if (block.type === 'audio') {
    const b: any = block;
    return (
      <>
        <Field label="Title"><input className="adm-input" value={c.title} onChange={(e) => update((bb) => { bb.content[lang].title = e.target.value; })} /></Field>
        <div className="adm-grid2">
          <Field label="SoundCloud playlist ID" hint="Numeric id from the oEmbed / embed URL."><input className="adm-input" value={b.soundcloud?.playlistId ?? ''} onChange={(e) => update((bb) => { if (!bb.soundcloud) bb.soundcloud = {}; bb.soundcloud.playlistId = e.target.value; })} /></Field>
          <Field label="Secret token" hint="For private sets (the s-XXXX part)."><input className="adm-input" value={b.soundcloud?.secretToken ?? ''} onChange={(e) => update((bb) => { if (!bb.soundcloud) bb.soundcloud = {}; bb.soundcloud.secretToken = e.target.value; })} /></Field>
        </div>
        <Field label="“Open in SoundCloud” link (full share URL)"><input className="adm-input" value={b.link ?? ''} onChange={(e) => update((bb) => { bb.link = e.target.value; })} /></Field>
      </>
    );
  }

  if (block.type === 'credits') {
    const b: any = block;
    return (
      <>
        <Field label="Section label"><input className="adm-input" value={c.label} onChange={(e) => update((bb) => { bb.content[lang].label = e.target.value; })} /></Field>
        <label className="adm-label">Credits (shared across languages)</label>
        {b.items.map((it: any, ii: number) => (
          <div key={ii} className="adm-repeat-item" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.6rem', alignItems: 'end' }}>
            <div><label className="adm-label">Role</label><input className="adm-input" value={it.role} onChange={(e) => update((bb) => { bb.items[ii].role = e.target.value; })} /></div>
            <div><label className="adm-label">Name</label><input className="adm-input" value={it.name} onChange={(e) => update((bb) => { bb.items[ii].name = e.target.value; })} /></div>
            <button className="adm-iconbtn adm-btn--danger" onClick={() => update((bb) => { bb.items.splice(ii, 1); })}>✕</button>
          </div>
        ))}
        <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => update((bb) => { bb.items.push({ role: '', name: '' }); })}>+ Add credit</button>
      </>
    );
  }

  if (block.type === 'deliverables') {
    return (
      <>
        <Field label="Section label"><input className="adm-input" value={c.label} onChange={(e) => update((b) => { b.content[lang].label = e.target.value; })} /></Field>
        <Field label="Items" hint="Separate with · (middle dot)."><input className="adm-input" value={c.items} onChange={(e) => update((b) => { b.content[lang].items = e.target.value; })} /></Field>
      </>
    );
  }

  if (block.type === 'about') {
    return (
      <>
        <Field label="Label"><input className="adm-input" value={c.label} onChange={(e) => update((b) => { b.content[lang].label = e.target.value; })} /></Field>
        <Field label="Body"><textarea className="adm-textarea" value={c.body} onChange={(e) => update((b) => { b.content[lang].body = e.target.value; })} /></Field>
      </>
    );
  }
  return null;
}

// ── Per-block style controls (wide freedom, with brand reset) ───────
function StyleControls({ style, update }: { style: Style; update: (mut: (b: any) => void) => void }) {
  const bgMode = style.bg == null ? 'default' : BG_TOKENS.includes(style.bg) ? style.bg : 'custom';
  const hasAccent = !!style.accent;
  return (
    <div className="adm-style">
      <span className="adm-style-lbl">Style</span>

      <label className="adm-style-lbl" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
        Background
        <select className="adm-select" style={{ width: 'auto' }} value={bgMode}
          onChange={(e) => update((b) => { const v = e.target.value; b.style.bg = v === 'custom' ? '#0a0a0a' : v; })}>
          <option value="default">Default</option>
          <option value="alt">Alt (darker)</option>
          <option value="craft">Craft (darkest)</option>
          <option value="custom">Custom…</option>
        </select>
      </label>
      {bgMode === 'custom' && (
        <input className="adm-color" type="color" value={/^#/.test(style.bg || '') ? (style.bg as string) : '#0a0a0a'} onChange={(e) => update((b) => { b.style.bg = e.target.value; })} />
      )}

      <label className="adm-style-lbl" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
        Align
        <select className="adm-select" style={{ width: 'auto' }} value={style.align ?? 'left'} onChange={(e) => update((b) => { b.style.align = e.target.value === 'left' ? undefined : e.target.value; })}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </label>

      <label className="adm-check adm-style-lbl">
        <input type="checkbox" checked={hasAccent} onChange={(e) => update((b) => { b.style.accent = e.target.checked ? '#ff4d00' : undefined; })} /> Accent
      </label>
      {hasAccent && <input className="adm-color" type="color" value={style.accent || '#ff4d00'} onChange={(e) => update((b) => { b.style.accent = e.target.value; })} />}

      <label className="adm-check adm-style-lbl">
        <input type="checkbox" checked={!!style.border} onChange={(e) => update((b) => { b.style.border = e.target.checked || undefined; })} /> Top divider
      </label>

      <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => update((b) => { b.style = {}; })}>Reset to brand</button>
    </div>
  );
}
