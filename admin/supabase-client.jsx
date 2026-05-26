// supabase-client.jsx — cliente Supabase y helpers CRUD para el panel admin

// ============================================================================
// CONFIG — pega aqui las MISMAS credenciales que en lzm-data.jsx (en la raiz)
// (instrucciones en admin/SETUP.md)
// ============================================================================
const ADMIN_SUPABASE_URL  = 'https://YOUR-PROJECT.supabase.co';
const ADMIN_SUPABASE_ANON = 'YOUR-ANON-PUBLIC-KEY';

const ADMIN_CONFIGURED = !ADMIN_SUPABASE_URL.includes('YOUR-PROJECT') && !ADMIN_SUPABASE_ANON.includes('YOUR-ANON');

// Cliente unico (window.supabase es el namespace global del UMD)
const supabase = window.supabase
  ? window.supabase.createClient(ADMIN_SUPABASE_URL, ADMIN_SUPABASE_ANON, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: 'lzm-admin-auth' },
    })
  : null;

// ============================================================================
// Mapeo BD <-> UI (snake_case <-> camelCase)
// ============================================================================
function dbProgramToUi(p) {
  return {
    id: p.id,
    name: p.name || '',
    cat: p.cat || 'talk',
    day: p.day || '',
    time: p.time || '',
    desc: p.description || '',
    longDesc: p.long_description || '',
    color: p.color || '#E91E8C',
    emoji: p.emoji || '🎬',
    status: p.status || 'active',
    hostIds: p.host_ids || [],
    sortOrder: p.sort_order || 0,
  };
}

function uiProgramToDb(p) {
  return {
    id: p.id,
    name: p.name,
    cat: p.cat,
    day: p.day || null,
    time: p.time || null,
    description: p.desc || null,
    long_description: p.longDesc || null,
    color: p.color || null,
    emoji: p.emoji || null,
    status: p.status || 'active',
    host_ids: Array.isArray(p.hostIds) ? p.hostIds : [],
    sort_order: parseInt(p.sortOrder, 10) || 0,
  };
}

function dbEpisodeToUi(e) {
  return {
    id: e.id,
    programId: e.program_id || '',
    title: e.title || '',
    youtubeId: e.youtube_id || '',
    duration: e.duration || '',
    views: e.views || '—',
    color: e.color || '#E91E8C',
    isNew: !!e.is_new,
    date: e.date || '',
    description: e.description || '',
  };
}

function uiEpisodeToDb(e) {
  return {
    id: e.id,
    program_id: e.programId,
    title: e.title,
    youtube_id: e.youtubeId || null,
    duration: e.duration || null,
    views: e.views || '—',
    color: e.color || null,
    is_new: !!e.isNew,
    date: e.date || null,
    description: e.description || null,
  };
}

// ============================================================================
// Helpers de auth
// ============================================================================
async function adminGetSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

async function adminSignIn(email, password) {
  if (!supabase) throw new Error('Cliente Supabase no inicializado');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

async function adminSignOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

// ============================================================================
// CRUD: Programs
// ============================================================================
async function listPrograms() {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data || []).map(dbProgramToUi);
}

async function upsertProgram(uiProgram) {
  const row = uiProgramToDb(uiProgram);
  const { data, error } = await supabase
    .from('programs')
    .upsert(row, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return dbProgramToUi(data);
}

async function deleteProgram(id) {
  const { error } = await supabase.from('programs').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================================
// CRUD: Episodes
// ============================================================================
async function listEpisodes() {
  const { data, error } = await supabase
    .from('episodes')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data || []).map(dbEpisodeToUi);
}

async function upsertEpisode(uiEp) {
  const row = uiEpisodeToDb(uiEp);
  const { data, error } = await supabase
    .from('episodes')
    .upsert(row, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return dbEpisodeToUi(data);
}

async function deleteEpisode(id) {
  const { error } = await supabase.from('episodes').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================================
// Exponer en window para los demas .jsx
// ============================================================================
Object.assign(window, {
  ADMIN_CONFIGURED,
  supabase,
  adminGetSession,
  adminSignIn,
  adminSignOut,
  listPrograms,
  upsertProgram,
  deleteProgram,
  listEpisodes,
  upsertEpisode,
  deleteEpisode,
});
