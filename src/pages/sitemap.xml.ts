import type { APIRoute } from 'astro';

// Keep the sitemap a build-time static file (hybrid mode renders endpoints
// on-demand by default).
export const prerender = true;

const SITE = 'https://audensonic.com';

const pages = [
  { loc: '/',                                  changefreq: 'monthly', priority: '1.0',  altEn: '/',                                  altEs: '/es/' },
  { loc: '/es/',                               changefreq: 'monthly', priority: '1.0',  altEn: '/',                                  altEs: '/es/' },
  { loc: '/work/',                             changefreq: 'monthly', priority: '0.8',  altEn: '/work/',                             altEs: '/es/work/' },
  { loc: '/es/work/',                          changefreq: 'monthly', priority: '0.8',  altEn: '/work/',                             altEs: '/es/work/' },
  { loc: '/work/bandit-grand-prix/',           changefreq: 'yearly',  priority: '0.9',  altEn: '/work/bandit-grand-prix/',           altEs: '/es/work/bandit-grand-prix/' },
  { loc: '/es/work/bandit-grand-prix/',        changefreq: 'yearly',  priority: '0.9',  altEn: '/work/bandit-grand-prix/',           altEs: '/es/work/bandit-grand-prix/' },
];

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    ({ loc, changefreq, priority, altEn, altEs }) => `  <url>
    <loc>${SITE}${loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${altEn}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE}${altEs}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${altEn}"/>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
