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

  const session = await getSession(context.request);
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
