export const prerender = false;

import type { APIRoute } from 'astro';

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });
}

// Resolve a SoundCloud share URL (public or private) into the numeric
// playlist/track id + secret token, via SoundCloud's public oEmbed endpoint.
export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try { body = await request.json(); } catch { return json({ message: 'Invalid JSON.' }, 400); }
  const url = (body?.url ?? '').toString().trim();
  if (!/^https?:\/\/(www\.)?(m\.)?soundcloud\.com\//i.test(url)) {
    return json({ message: 'Pega un enlace de soundcloud.com válido.' }, 400);
  }
  try {
    const res = await fetch(`https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`, {
      headers: { 'User-Agent': 'auden-cms' },
    });
    if (!res.ok) return json({ message: 'SoundCloud no reconoce ese enlace.' }, 502);
    const data = await res.json();
    const src = (data.html || '').match(/src="([^"]+)"/)?.[1];
    if (!src) return json({ message: 'No se pudo leer el reproductor de SoundCloud.' }, 502);
    const player = new URL(src.replace(/&amp;/g, '&'));
    const apiUrl = decodeURIComponent(player.searchParams.get('url') || '');
    const secretToken = player.searchParams.get('secret_token') || undefined;
    const playlistId = apiUrl.match(/\/playlists\/(\d+)/)?.[1];
    const trackId = apiUrl.match(/\/tracks\/(\d+)/)?.[1];
    if (!playlistId && !trackId) return json({ message: 'No es un set ni una pista de SoundCloud.' }, 400);
    return json({ playlistId, trackId, secretToken, title: data.title });
  } catch (e: any) {
    return json({ message: e.message || 'Error resolviendo el enlace.' }, 502);
  }
};
