import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

function allowedEmails(): string[] {
  const raw =
    (import.meta.env.AUTH_ALLOWED_EMAILS as string | undefined) ??
    (typeof process !== 'undefined' ? process.env.AUTH_ALLOWED_EMAILS : undefined) ??
    '';
  return raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

// Paths under /admin that must stay reachable while logged out.
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const isGuarded =
    (pathname === '/admin' ||
      pathname.startsWith('/admin/') ||
      pathname.startsWith('/api/admin')) &&
    !PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));

  if (!isGuarded) return next();

  // Local-dev shortcut: when running `astro dev` AND an ADMIN_DEV_EMAIL is set
  // in .env, skip the Google round-trip. import.meta.env.DEV is always false in
  // a Vercel build, so this can never weaken a deployed environment.
  if (import.meta.env.DEV && import.meta.env.ADMIN_DEV_EMAIL) {
    return next();
  }

  let session;
  try {
    session = await getSession(context.request);
  } catch {
    // Auth.js failed to initialise — almost always missing env vars
    // (AUTH_SECRET / GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET). Fail with a
    // clear message instead of a cryptic 500.
    const msg =
      'Admin authentication is not configured yet. Set AUTH_SECRET, AUTH_TRUST_HOST, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and AUTH_ALLOWED_EMAILS as environment variables in Vercel, then redeploy.';
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'auth_not_configured', message: msg }), {
        status: 503,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(
      `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Admin not configured</title><body style="margin:0;font-family:system-ui,sans-serif;background:#080808;color:#F0EFE9;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:2rem"><div style="max-width:34rem"><p style="color:#ff4d00;font-size:.7rem;letter-spacing:.25em;text-transform:uppercase;margin:0 0 1rem">Admin not configured</p><p style="line-height:1.7;color:rgba(240,239,233,.7);font-size:.9rem;margin:0">${msg}</p></div></body>`,
      { status: 503, headers: { 'content-type': 'text/html; charset=utf-8' } }
    );
  }

  const email = session?.user?.email?.toLowerCase();
  const ok = !!email && allowedEmails().includes(email);

  if (!ok) {
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }
    return context.redirect('/admin/login');
  }

  return next();
});
