// api/episodes.js — episodios desde RSS de playlists de YouTube (sin API key).
// Agregar playlist por programa en SOURCES cuando esten disponibles.

const SOURCES = [
  {
    rss:       'https://www.youtube.com/feeds/videos.xml?playlist_id=PLvSpPskFuJqJGJBhwyNrEFxlHYi3FV784',
    programId: 'luzma-cachai',
    color:     '#E91E8C',
  },
  // Descomentar cuando creen las playlists en YouTube Studio:
  // { rss: 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLAYLIST_ID_FRENTE', programId: 'cara-a-cara', color: '#7B2CBF' },
  // { rss: 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLAYLIST_ID_DIA_UNO', programId: 'dia-uno',     color: '#FF7043' },
];

const MAX_PER_SOURCE = 15;

function xmlText(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? m[1].trim() : '';
}

function allMatches(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');
  return xml.match(re) || [];
}

function decode(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchSource(source) {
  const res = await fetch(source.rss, { headers: { 'User-Agent': 'LuzmaTV-Site/1.0' } });
  if (!res.ok) throw new Error(`RSS ${source.programId} ${res.status}`);
  const xml = await res.text();

  const now = Date.now();
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

  return allMatches(xml, 'entry')
    .slice(0, MAX_PER_SOURCE)
    .map((entry) => {
      const videoId   = xmlText(entry, 'yt:videoId');
      if (!videoId) return null;
      const title     = decode(xmlText(entry, 'title'));
      const published = xmlText(entry, 'published');
      const date      = published.slice(0, 10);
      const rawDesc   = decode(xmlText(entry, 'media:description'));
      const description = rawDesc.length > 0
        ? rawDesc.slice(0, 220) + (rawDesc.length > 220 ? '…' : '')
        : `${title} — LuzmaTV`;
      const isNew = published ? now - new Date(published).getTime() < SEVEN_DAYS : false;

      return {
        id:        `${source.programId}-${videoId}`,
        programId: source.programId,
        title,
        youtubeId: videoId,
        duration:  '—',
        color:     source.color,
        isNew,
        date,
        description,
      };
    })
    .filter(Boolean);
}

export default async function handler(req, res) {
  try {
    const results = await Promise.allSettled(SOURCES.map(fetchSource));

    const seen = new Set();
    const episodes = results
      .flatMap((r) => r.status === 'fulfilled' ? r.value : [])
      .filter((e) => {
        if (seen.has(e.youtubeId)) return false;
        seen.add(e.youtubeId);
        return true;
      });

    if (results.every((r) => r.status === 'rejected')) {
      throw new Error(results.map((r) => r.reason?.message).join(', '));
    }

    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
    res.status(200).json({ episodes, source: 'rss-playlist', count: episodes.length });
  } catch (err) {
    res.status(502).json({ error: err.message || 'rss fetch failed' });
  }
}
