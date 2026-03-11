import type { APIRoute } from 'astro';

const SITE = 'https://auden.studio';

const pages = [
  { loc: '/', changefreq: 'monthly', priority: '1.0' },
  { loc: '/es/', changefreq: 'monthly', priority: '1.0' },
];

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    ({ loc, changefreq, priority }) => `  <url>
    <loc>${SITE}${loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/"/>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE}/es/"/>
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
