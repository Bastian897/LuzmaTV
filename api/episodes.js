// api/episodes.js — devuelve los ultimos videos del canal LuzmaTV via RSS publico de YouTube.
// Sin API key, sin quota, sin billing. Cacheado 1h en el edge de Vercel.

const CHANNEL_ID    = 'UCQ0cnYx83lnRaCvMHuiM5QQ';
const MAX_RESULTS   = 10;
const PROGRAM_ID    = 'luzma-cachai';
const PROGRAM_COLOR = '#E91E8C';
const RSS_URL       = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function xmlText(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? m[1].trim() : '';
}

function allMatches(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');
  return xml.match(re) || [];
}

function attr(xml, tag, attrName) {
  const m = xml.match(new RegExp(`<${tag}[^>]*${attrName}="([^"]*)"`, 'i'));
  return m ? m[1] : '';
}

function decode(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export default async function handler(req, res) {
  try {
    const rssRes = await fetch(RSS_URL, {
      headers: { 'User-Agent': 'LuzmaTV-Site/1.0' },
    });
    if (!rssRes.ok) throw new Error(`RSS ${rssRes.status}`);
    const xml = await rssRes.text();

    const entries = allMatches(xml, 'entry').slice(0, MAX_RESULTS);

    const now = Date.now();
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

    const episodes = entries.map((entry) => {
      const videoId    = xmlText(entry, 'yt:videoId');
      const title      = decode(xmlText(entry, 'title'));
      const published  = xmlText(entry, 'published');       // ISO 8601
      const date       = published.slice(0, 10);
      const rawDesc    = decode(xmlText(entry, 'media:description'));
      const description =
        rawDesc.length > 0
          ? rawDesc.slice(0, 220) + (rawDesc.length > 220 ? '…' : '')
          : `${title} — LuzmaTV`;
      const isNew = published ? now - new Date(published).getTime() < SEVEN_DAYS : false;

      return {
        id:          `luzma-cachai-${videoId}`,
        programId:   PROGRAM_ID,
        title,
        youtubeId:   videoId,
        duration:    '—',
        views:       '—',
        color:       PROGRAM_COLOR,
        isNew,
        date,
        description,
      };
    }).filter((e) => e.youtubeId);

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
    res.status(200).json({ episodes, source: 'rss', count: episodes.length });
  } catch (err) {
    res.status(502).json({ error: err.message || 'rss fetch failed' });
  }
}
