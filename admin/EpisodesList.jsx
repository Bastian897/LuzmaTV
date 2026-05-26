// EpisodesList.jsx — listado de episodios con CRUD
const { useState: useStateEpL, useEffect: useEffectEpL, useMemo: useMemoEpL } = React;

function EpisodesList({ programs, onToast }) {
  const [episodes, setEpisodes] = useStateEpL([]);
  const [loading, setLoading] = useStateEpL(true);
  const [error, setError] = useStateEpL('');
  const [query, setQuery] = useStateEpL('');
  const [editing, setEditing] = useStateEpL(null); // null | { episode } | { episode: null }  para "nuevo"

  async function refresh() {
    setLoading(true);
    setError('');
    try {
      const eps = await listEpisodes();
      setEpisodes(eps);
    } catch (err) {
      setError(err.message || 'Error al cargar episodios');
    } finally {
      setLoading(false);
    }
  }

  useEffectEpL(() => { refresh(); }, []);

  const filtered = useMemoEpL(() => {
    const q = query.trim().toLowerCase();
    if (!q) return episodes;
    return episodes.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      (e.programId || '').toLowerCase().includes(q)
    );
  }, [episodes, query]);

  function programName(id) {
    const p = programs.find(x => x.id === id);
    return p ? `${p.emoji} ${p.name}` : id;
  }

  function handleSaved() {
    setEditing(null);
    refresh();
  }

  return (
    <div>
      <div className="lzm-admin-toolbar">
        <input
          className="lzm-admin-search"
          type="search"
          placeholder="Buscar por título, slug o programa…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="lzm-admin-btn primary"
          onClick={() => setEditing({ episode: null })}
        >
          + Nuevo episodio
        </button>
      </div>

      {error && <div className="lzm-admin-error-banner">{error}</div>}

      {loading ? (
        <div className="lzm-admin-loading">Cargando episodios…</div>
      ) : filtered.length === 0 ? (
        <div className="lzm-admin-empty">
          {query ? 'No hay episodios que coincidan con tu búsqueda.' : 'Todavía no hay episodios. Creá el primero.'}
        </div>
      ) : (
        <table className="lzm-admin-table">
          <thead>
            <tr>
              <th style={{ width: 100 }}>Thumb</th>
              <th>Título</th>
              <th style={{ width: 180 }}>Programa</th>
              <th style={{ width: 110 }}>Fecha</th>
              <th style={{ width: 90 }}>Duración</th>
              <th style={{ width: 70 }}>Nuevo</th>
              <th style={{ width: 120 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(ep => (
              <tr key={ep.id}>
                <td>
                  {ep.youtubeId ? (
                    <img
                      src={`https://img.youtube.com/vi/${ep.youtubeId}/default.jpg`}
                      alt=""
                      className="lzm-admin-thumb"
                      onError={(e) => { e.target.style.background = '#ddd'; e.target.removeAttribute('src'); }}
                    />
                  ) : (
                    <div className="lzm-admin-thumb" style={{ background: ep.color || '#ccc' }} />
                  )}
                </td>
                <td>
                  <div style={{ fontWeight: 800 }}>{ep.title}</div>
                  <div style={{ fontSize: 11, color: '#5B6479', marginTop: 2 }}>{ep.id}</div>
                </td>
                <td style={{ fontSize: 13 }}>{programName(ep.programId)}</td>
                <td style={{ fontSize: 13, color: '#5B6479' }}>{ep.date || '—'}</td>
                <td style={{ fontSize: 13 }}>{ep.duration || '—'}</td>
                <td>{ep.isNew ? <span title="Marcado como nuevo">🔥</span> : ''}</td>
                <td>
                  <div className="lzm-admin-actions">
                    <a
                      className="lzm-admin-btn"
                      href={`index.html#/episodio/${ep.id}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Ver en el sitio"
                    >Ver</a>
                    <button
                      className="lzm-admin-btn blue"
                      onClick={() => setEditing({ episode: ep })}
                    >Editar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editing && (
        <EpisodeForm
          episode={editing.episode}
          programs={programs}
          onSaved={handleSaved}
          onClose={() => setEditing(null)}
          onToast={onToast}
        />
      )}
    </div>
  );
}

Object.assign(window, { EpisodesList });
