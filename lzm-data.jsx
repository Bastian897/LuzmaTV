// lzm-data.jsx — capa de datos remota (Supabase) con cache localStorage y fallback a LZM_STATIC.
// El sitio publico SIEMPRE arranca con LZM_STATIC, luego se hidrata con datos remotos en background.

// ============================================================================
// CONFIG — pega aqui la URL y la anon key de tu proyecto Supabase
// (instrucciones en admin/SETUP.md)
// ============================================================================
const SUPABASE_URL  = 'https://YOUR-PROJECT.supabase.co';
const SUPABASE_ANON = 'YOUR-ANON-PUBLIC-KEY';

const LS_KEY = 'lzm-data-cache-v1';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 min

// ============================================================================
// 1. Hidratar LZM_DATA con datos estaticos (fallback siempre disponible)
// ============================================================================
window.LZM_DATA = {
  programs: (window.LZM_STATIC && window.LZM_STATIC.programs) || [],
  episodes: (window.LZM_STATIC && window.LZM_STATIC.episodes) || [],
  hosts:    (window.LZM_STATIC && window.LZM_STATIC.hosts)    || [],
  catLabel: (window.LZM_STATIC && window.LZM_STATIC.catLabel) || {},
  _loading: true,
  _source:  'static',
};

// ============================================================================
// 2. Helpers
// ============================================================================
function lzmMapProgram(p) {
  return {
    id: p.id,
    name: p.name,
    cat: p.cat,
    day: p.day,
    time: p.time,
    desc: p.description,
    longDesc: p.long_description,
    color: p.color,
    emoji: p.emoji,
    status: p.status,
    hostIds: p.host_ids || [],
  };
}

function lzmMapEpisode(e) {
  return {
    id: e.id,
    programId: e.program_id,
    title: e.title,
    youtubeId: e.youtube_id,
    duration: e.duration,
    views: e.views,
    color: e.color,
    isNew: e.is_new,
    date: e.date,
    description: e.description,
  };
}

function lzmFire() {
  window.dispatchEvent(new Event('lzm-data-ready'));
}

function lzmConfigured() {
  return SUPABASE_URL && !SUPABASE_URL.includes('YOUR-PROJECT') && SUPABASE_ANON && !SUPABASE_ANON.includes('YOUR-ANON');
}

// ============================================================================
// 3. Fetch desde Supabase REST (PostgREST) — sin SDK para no cargar 50KB extra
// ============================================================================
async function lzmFetchRemote() {
  const headers = {
    apikey: SUPABASE_ANON,
    Authorization: `Bearer ${SUPABASE_ANON}`,
  };
  const [progRes, epRes] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/programs?select=*&order=sort_order.asc`, { headers }),
    fetch(`${SUPABASE_URL}/rest/v1/episodes?select=*&order=date.desc`, { headers }),
  ]);
  if (!progRes.ok) throw new Error(`programs ${progRes.status}`);
  if (!epRes.ok)   throw new Error(`episodes ${epRes.status}`);
  const [progs, eps] = await Promise.all([progRes.json(), epRes.json()]);
  return {
    programs: progs.map(lzmMapProgram),
    episodes: eps.map(lzmMapEpisode),
  };
}

// ============================================================================
// 4. Cache localStorage
// ============================================================================
function lzmReadCache() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj || !obj.t || Date.now() - obj.t > CACHE_TTL_MS) return null;
    return obj.data;
  } catch { return null; }
}

function lzmWriteCache(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify({ t: Date.now(), data })); } catch {}
}

// ============================================================================
// 5. Boot: hidrata desde cache (si hay), luego fetch remoto
// ============================================================================
(async () => {
  // 5a. Cache local primero (instantaneo)
  const cached = lzmReadCache();
  if (cached) {
    window.LZM_DATA.programs = cached.programs;
    window.LZM_DATA.episodes = cached.episodes;
    window.LZM_DATA._source = 'cache';
    lzmFire();
  }

  // 5b. Si no esta configurado todavia, quedate con el fallback estatico
  if (!lzmConfigured()) {
    window.LZM_DATA._loading = false;
    window.LZM_DATA._source = cached ? 'cache' : 'static';
    if (!cached) lzmFire(); // ya disparamos arriba si habia cache
    return;
  }

  // 5c. Fetch remoto en background
  try {
    const fresh = await lzmFetchRemote();
    window.LZM_DATA.programs = fresh.programs;
    window.LZM_DATA.episodes = fresh.episodes;
    window.LZM_DATA._loading = false;
    window.LZM_DATA._source = 'remote';
    lzmWriteCache(fresh);
    lzmFire();
  } catch (err) {
    console.warn('[lzm] fetch a Supabase fallo, uso fallback', err);
    window.LZM_DATA._loading = false;
    window.LZM_DATA._source = cached ? 'cache' : 'fallback';
    if (!cached) lzmFire();
  }
})();
