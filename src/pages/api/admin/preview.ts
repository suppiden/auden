export const prerender = false;

import type { APIRoute } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import CaseStudyArticle from '../../../components/CaseStudyArticle.astro';
// The case-study layout CSS as a raw string (the Container API does not emit
// component styles, so we inline it into the preview document).
import csCss from '../../../styles/case-study.css?raw';

const CS_VARS = `
:root{--cs-bg:#F5F4F0;--cs-bg-alt:#EDECEA;--cs-bg-craft:#E8E7E3;--cs-yt-bg:#D8D6D2;--cs-text:#1A1A1A;--cs-text-body:rgba(26,26,26,.78);--cs-text-dim:rgba(26,26,26,.62);--cs-text-muted:rgba(26,26,26,.45);--cs-text-faint:rgba(26,26,26,.32);--cs-border:rgba(26,26,26,.09);--cs-border-strong:rgba(26,26,26,.13);}
.dark{--cs-bg:#080808;--cs-bg-alt:#0D0D0D;--cs-bg-craft:#0F0F0F;--cs-yt-bg:#111;--cs-text:#F0EFE9;--cs-text-body:rgba(240,239,233,.75);--cs-text-dim:rgba(240,239,233,.6);--cs-text-muted:rgba(240,239,233,.45);--cs-text-faint:rgba(240,239,233,.32);--cs-border:rgba(240,239,233,.08);--cs-border-strong:rgba(240,239,233,.12);}
*{box-sizing:border-box;}html,body{margin:0;padding:0;}
body{background:var(--cs-bg);color:var(--cs-text);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;}
img{max-width:100%;}
/* reveals are animation state — always show them in the preview */
[data-reveal],[data-reveal-stagger],[data-reveal-text],[data-split-reveal],.split-word{opacity:1 !important;transform:none !important;}
`;

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }
  const { data, lang = 'en', theme = 'dark' } = body ?? {};
  if (!data) return new Response('Missing data', { status: 400 });

  try {
    const container = await AstroContainer.create();
    const inner = await container.renderToString(CaseStudyArticle, {
      props: { entry: { id: data.slug || 'preview', collection: 'caseStudies', data }, lang },
    });
    const html = `<!doctype html><html lang="${lang}" class="${theme === 'dark' ? 'dark' : ''}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${CS_VARS}${csCss}</style></head><body>${inner}</body></html>`;
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
  } catch (e: any) {
    return new Response(`<!doctype html><body style="font-family:sans-serif;padding:2rem;color:#c00">Preview error: ${e.message}</body>`, {
      status: 500,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  }
};
