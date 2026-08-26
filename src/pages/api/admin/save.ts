export const prerender = false;

import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
}
function env(k: string): string | undefined {
  return (import.meta.env as any)[k] ?? (typeof process !== 'undefined' ? process.env?.[k] : undefined);
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function commitToGitHub(slug: string, doc: unknown, author?: { name: string; email: string }) {
  const token = env('GITHUB_TOKEN');
  const repo = env('GITHUB_REPO') || 'suppiden/auden';
  const branch = env('GITHUB_BRANCH') || 'main';
  if (!token) throw new Error('GITHUB_TOKEN is not configured.');

  const path = `src/content/caseStudies/${slug}.json`;
  const api = `https://api.github.com/repos/${repo}/contents/${path}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'auden-cms',
  };

  // Look up the existing file's sha (required to update; absent = new file).
  let sha: string | undefined;
  const getRes = await fetch(`${api}?ref=${encodeURIComponent(branch)}`, { headers });
  if (getRes.ok) sha = (await getRes.json()).sha;
  else if (getRes.status !== 404) throw new Error(`GitHub read failed (${getRes.status}).`);

  const content = Buffer.from(JSON.stringify(doc, null, 2) + '\n', 'utf8').toString('base64');
  const body: Record<string, unknown> = {
    message: `CMS: ${sha ? 'update' : 'add'} case study "${slug}"`,
    content,
    branch,
    ...(sha ? { sha } : {}),
    ...(author ? { author, committer: author } : {}),
  };
  const putRes = await fetch(api, { method: 'PUT', headers, body: JSON.stringify(body) });
  if (!putRes.ok) {
    const t = await putRes.text();
    throw new Error(`GitHub write failed (${putRes.status}): ${t.slice(0, 180)}`);
  }
  return { branch, path };
}

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ message: 'Invalid JSON body.' }, 400);
  }

  const { slug, data } = body ?? {};
  if (!slug || !SLUG_RE.test(slug)) return json({ message: 'Invalid slug (use lowercase-with-hyphens).' }, 400);
  if (!data || typeof data !== 'object') return json({ message: 'Missing data.' }, 400);
  if (!data.title?.trim()) return json({ message: 'Title is required.' }, 400);
  if (!data.videoId?.trim()) return json({ message: 'A hero video ID is required.' }, 400);

  // The slug is the filename, not a field inside the document.
  const { slug: _drop, ...doc } = data;

  // Attribute the commit to the signed-in editor when we have a session.
  let author: { name: string; email: string } | undefined;
  try {
    const session = await getSession(request);
    const email = session?.user?.email;
    if (email) author = { name: session!.user!.name || email, email };
  } catch { /* dev bypass / no session */ }

  // Local dev writes to disk for fast iteration; the deployed app commits to
  // the repo (set CMS_TEST_GITHUB=1 locally to exercise the GitHub path).
  const useGitHub = !import.meta.env.DEV || !!env('CMS_TEST_GITHUB');

  if (!useGitHub) {
    try {
      const fs = await import('node:fs/promises');
      const path = await import('node:path');
      const dir = path.resolve('src/content/caseStudies');
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, `${slug}.json`), JSON.stringify(doc, null, 2) + '\n', 'utf8');
      return json({ message: `Saved ${slug}.json locally (dev).` });
    } catch (e: any) {
      return json({ message: `Local write failed: ${e.message}` }, 500);
    }
  }

  try {
    const { branch } = await commitToGitHub(slug, doc, author);
    return json({ message: `Published to "${branch}" ✓ — the site will redeploy in ~1–2 min.` });
  } catch (e: any) {
    return json({ message: e.message || 'Publish failed.' }, 502);
  }
};
