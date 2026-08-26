export const prerender = false;

import type { APIRoute } from 'astro';

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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

  // Local dev: persist to the content collection so editing is testable end to end.
  if (import.meta.env.DEV) {
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

  // Production: the GitHub commit is wired in the next step (Phase 5).
  return json({ message: 'Validated ✓ — publishing to the repo is wired in the next step (Phase 5).' });
};
