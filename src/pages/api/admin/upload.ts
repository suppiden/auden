export const prerender = false;

import type { APIRoute } from 'astro';

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
}
function env(k: string): string | undefined {
  return (import.meta.env as any)[k] ?? (typeof process !== 'undefined' ? process.env?.[k] : undefined);
}

const EXT_OK = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);
const MAX_BYTES = 6 * 1024 * 1024; // 6 MB (images are resized client-side first)
const SLUG_RE = /^[a-z0-9]*(?:-[a-z0-9]+)*$/;

async function commitBinary(path: string, base64: string, message: string) {
  const token = env('GITHUB_TOKEN');
  const repo = env('GITHUB_REPO') || 'suppiden/auden';
  const branch = env('GITHUB_BRANCH') || 'main';
  if (!token) throw new Error('GITHUB_TOKEN is not configured.');
  const api = `https://api.github.com/repos/${repo}/contents/${path}`;
  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'auden-cms' };
  const res = await fetch(api, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ message, content: base64, branch }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GitHub upload failed (${res.status}): ${t.slice(0, 160)}`);
  }
}

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try { body = await request.json(); } catch { return json({ message: 'Invalid JSON body.' }, 400); }

  const slug = (body?.slug ?? '').toString();
  const ext = (body?.ext ?? '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');
  const data = (body?.dataBase64 ?? '').toString();

  if (!SLUG_RE.test(slug)) return json({ message: 'Invalid slug.' }, 400);
  if (!EXT_OK.has(ext)) return json({ message: 'Unsupported image type.' }, 400);
  if (!data) return json({ message: 'No image data.' }, 400);
  if (data.length * 0.75 > MAX_BYTES) return json({ message: 'Image too large (max 6 MB).' }, 413);

  const name = `${slug || 'img'}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}.${ext}`;
  const relPath = `public/uploads/${name}`;
  const url = `/uploads/${name}`;

  if (import.meta.env.DEV) {
    try {
      const fs = await import('node:fs/promises');
      const path = await import('node:path');
      const dir = path.resolve('public/uploads');
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, name), Buffer.from(data, 'base64'));
      return json({ url });
    } catch (e: any) {
      return json({ message: `Local write failed: ${e.message}` }, 500);
    }
  }

  try {
    await commitBinary(relPath, data, `CMS: upload image ${name}`);
    return json({ url });
  } catch (e: any) {
    return json({ message: e.message || 'Upload failed.' }, 502);
  }
};
