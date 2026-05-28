// lzm-data.jsx — carga episodios desde /api/episodes (YouTube) con cache local y fallback a LZM_STATIC.
// El sitio SIEMPRE arranca con LZM_STATIC, luego se hidrata en background.

const LS_KEY = 'lzm-data-cache-v2';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora (alineado con el cache del edge)

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
// 2. Fire event para que los componentes re-rendericen
// ============================================================================
function lzmFire() {
  window.dispatchEvent(new Event('lzm-data-ready'));
}

// ============================================================================
// 3. Cache localStorage
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
// 4. Fetch desde /api/episodes (Vercel Function -> YouTube Data API)
// ============================================================================
async function lzmFetchYoutube() {
  const res = await fetch('/api/episodes');
  if (!res.ok) throw new Error(`/api/episodes ${res.status}`);
  const json = await res.json();
  if (!json.episodes || json.episodes.length === 0) throw new Error('sin episodios');
  return json.episodes;
}

// ============================================================================
// 5. Boot
// ============================================================================
(async () => {
  // 5a. Cache local primero (instantaneo, evita parpadeo)
  const cached = lzmReadCache();
  if (cached) {
    window.LZM_DATA.episodes = cached.episodes;
    window.LZM_DATA._source = 'cache';
    lzmFire();
  }

  // 5b. Fetch remoto en background
  try {
    const episodes = await lzmFetchYoutube();
    window.LZM_DATA.episodes = episodes;
    window.LZM_DATA._loading = false;
    window.LZM_DATA._source = 'youtube';
    lzmWriteCache({ episodes });
    lzmFire();
  } catch (err) {
    console.warn('[lzm] /api/episodes fallo, usando fallback', err.message);
    window.LZM_DATA._loading = false;
    window.LZM_DATA._source = cached ? 'cache' : 'static';
    if (!cached) lzmFire();
  }
})();
