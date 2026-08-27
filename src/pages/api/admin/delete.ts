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

async function deleteFromGitHub(slug: string, author?: { name: string; email: string }) {
  const token = env('GITHUB_TOKEN');
  const repo = env('GITHUB_REPO') || 'suppiden/auden';
  const branch = env('GITHUB_BRANCH') || 'main';
  if (!token) throw new Error('GITHUB_TOKEN is not configured.');

  const path = `src/content/caseStudies/${slug}.json`;
  const api = `https://api.github.com/repos/${repo}/contents/${path}`;
  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'auden-cms' };

  // Need the file's current sha to delete it.
  const getRes = await fetch(`${api}?ref=${encodeURIComponent(branch)}`, { headers });
  if (getRes.status === 404) return { branch, alreadyGone: true };
  if (!getRes.ok) throw new Error(`GitHub read failed (${getRes.status}).`);
  const sha = (await getRes.json()).sha;

  const body: Record<string, unknown> = {
    message: `CMS: delete case study "${slug}"`,
    sha,
    branch,
    ...(author ? { author, committer: author } : {}),
  };
  const delRes = await fetch(api, { method: 'DELETE', headers, body: JSON.stringify(body) });
  if (!delRes.ok) {
    const t = await delRes.text();
    throw new Error(`GitHub delete failed (${delRes.status}): ${t.slice(0, 180)}`);
  }
  return { branch };
}

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try { body = await request.json(); } catch { return json({ message: 'Invalid JSON body.' }, 400); }

  const { slug } = body ?? {};
  if (!slug || !SLUG_RE.test(slug)) return json({ message: 'Invalid slug.' }, 400);

  let author: { name: string; email: string } | undefined;
  try {
    const session = await getSession(request);
    const email = session?.user?.email;
    if (email) author = { name: session!.user!.name || email, email };
  } catch { /* dev bypass */ }

  const useGitHub = !import.meta.env.DEV || !!env('CMS_TEST_GITHUB');

  if (!useGitHub) {
    try {
      const fs = await import('node:fs/promises');
      const path = await import('node:path');
      await fs.rm(path.resolve('src/content/caseStudies', `${slug}.json`), { force: true });
      return json({ message: `Deleted ${slug}.json locally (dev).` });
    } catch (e: any) {
      return json({ message: `Local delete failed: ${e.message}` }, 500);
    }
  }

  try {
    const { branch } = await deleteFromGitHub(slug, author);
    return json({ message: `Deleted from "${branch}" ✓ — the site will rebuild in ~1–2 min.` });
  } catch (e: any) {
    return json({ message: e.message || 'Delete failed.' }, 502);
  }
};
