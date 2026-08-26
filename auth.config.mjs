import Google from '@auth/core/providers/google';
import { defineConfig } from 'auth-astro';

// Read env from either the build (import.meta.env) or the serverless runtime (process.env).
const env = (key) =>
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) ||
  (typeof process !== 'undefined' && process.env && process.env[key]) ||
  undefined;

function allowedEmails() {
  return (env('AUTH_ALLOWED_EMAILS') ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export default defineConfig({
  providers: [
    Google({
      clientId: env('GOOGLE_CLIENT_ID'),
      clientSecret: env('GOOGLE_CLIENT_SECRET'),
    }),
  ],
  // Trust the deployment host (Vercel preview/prod URLs) for callback resolution.
  trustHost: true,
  // JWT sessions — no database. The allowlist decides who gets in.
  session: { strategy: 'jwt' },
  callbacks: {
    // Only allowlisted Google accounts may sign in.
    signIn({ user }) {
      const email = user?.email?.toLowerCase();
      const allowed = allowedEmails();
      return !!email && allowed.includes(email);
    },
  },
  pages: {
    // Custom sign-in page (kept outside the guarded /admin/* area).
    signIn: '/admin/login',
    error: '/admin/login',
  },
});
