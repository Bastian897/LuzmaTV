// lzm-data.jsx — carga episodios desde /api/episodes (YouTube) con cache local y fallback a LZM_STATIC.
// El sitio SIEMPRE arranca con LZM_STATIC, luego se hidrata en background.
// El archivo acumulativo (LS_ARCHIVE_KEY) crece con cada fetch y nunca descarta episodios viejos.

const LS_FETCH_KEY   = 'lzm-fetch-ts-v2';       // timestamp del ultimo fetch exitoso
const LS_ARCHIVE_KEY = 'lzm-episodes-archive-v1'; // mapa youtubeId → episode (crece siempre)
const FETCH_TTL_MS   = 60 * 60 * 1000;            // re-fetch cada 1 hora

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
// 3. Archivo acumulativo en localStorage
// ============================================================================
function archiveLoad() {
  try {
    const raw = localStorage.getItem(LS_ARCHIVE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function archiveSave(map) {
  try { localStorage.setItem(LS_ARCHIVE_KEY, JSON.stringify(map)); } catch {}
}

// Fusiona episodios nuevos en el mapa existente, devuelve array ordenado por fecha desc
function archiveMerge(map, incoming) {
  const merged = { ...map };
  for (const ep of incoming) {
    merged[ep.youtubeId] = ep;
  }
  archiveSave(merged);
  return Object.values(merged).sort((a, b) => b.date.localeCompare(a.date));
}

// Convierte el mapa a array ordenado sin modificarlo
function archiveToList(map) {
  return Object.values(map).sort((a, b) => b.date.localeCompare(a.date));
}

// ============================================================================
// 4. Control de frescura del fetch
// ============================================================================
function fetchIsStale() {
  try {
    const ts = localStorage.getItem(LS_FETCH_KEY);
    return !ts || Date.now() - Number(ts) > FETCH_TTL_MS;
  } catch { return true; }
}

function fetchMarkFresh() {
  try { localStorage.setItem(LS_FETCH_KEY, String(Date.now())); } catch {}
}

// ============================================================================
// 5. Fetch desde /api/episodes (Vercel Function -> YouTube RSS)
// ============================================================================
async function lzmFetchYoutube() {
  const res = await fetch('/api/episodes');
  if (!res.ok) throw new Error(`/api/episodes ${res.status}`);
  const json = await res.json();
  if (!json.episodes || json.episodes.length === 0) throw new Error('sin episodios');
  return json.episodes;
}

// ============================================================================
// 6. Boot
// ============================================================================
(async () => {
  // 6a. Cargar archivo acumulativo e inicializar con episodios estaticos
  let archive = archiveLoad();

  // Sembrar con los estaticos solo si el archivo esta vacio (primera visita)
  const staticEps = (window.LZM_STATIC && window.LZM_STATIC.episodes) || [];
  if (Object.keys(archive).length === 0 && staticEps.length > 0) {
    archive = archiveMerge({}, staticEps);
    archive = archiveLoad(); // re-leer como mapa tras guardar
  }

  const archiveList = archiveToList(archive);
  if (archiveList.length > 0) {
    window.LZM_DATA.episodes = archiveList;
    window.LZM_DATA._source  = 'archive';
    lzmFire();
  }

  // 6b. Re-fetch solo si el cache de frescura expiró
  if (!fetchIsStale()) {
    window.LZM_DATA._loading = false;
    return;
  }

  try {
    const fresh   = await lzmFetchYoutube();
    const merged  = archiveMerge(archive, fresh);
    window.LZM_DATA.episodes = merged;
    window.LZM_DATA._loading = false;
    window.LZM_DATA._source  = 'youtube';
    fetchMarkFresh();
    lzmFire();
  } catch (err) {
    console.warn('[lzm] /api/episodes fallo, usando archivo acumulativo', err.message);
    window.LZM_DATA._loading = false;
    if (archiveList.length === 0) lzmFire(); // primer arranque sin red
  }
})();
