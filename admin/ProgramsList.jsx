// ProgramsList.jsx — listado de programas con CRUD
const { useState: useStatePL, useEffect: useEffectPL, useMemo: useMemoPL } = React;

function ProgramsList({ programs, onProgramsChanged, onToast }) {
  const [query, setQuery] = useStatePL('');
  const [editing, setEditing] = useStatePL(null);

  const filtered = useMemoPL(() => {
    const q = query.trim().toLowerCase();
    if (!q) return programs;
    return programs.filter(p =>
      p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    );
  }, [programs, query]);

  function handleSaved() {
    setEditing(null);
    onProgramsChanged();
  }

  return (
    <div>
      <div className="lzm-admin-toolbar">
        <input
          className="lzm-admin-search"
          type="search"
          placeholder="Buscar programa…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="lzm-admin-btn primary"
          onClick={() => setEditing({ program: null })}
        >
          + Nuevo programa
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="lzm-admin-empty">
          {query ? 'No hay programas que coincidan.' : 'Todavía no hay programas. Creá el primero.'}
        </div>
      ) : (
        <table className="lzm-admin-table">
          <thead>
            <tr>
              <th style={{ width: 50 }}>•</th>
              <th>Nombre</th>
              <th style={{ width: 130 }}>Categoría</th>
              <th style={{ width: 140 }}>Día / Hora</th>
              <th style={{ width: 100 }}>Estado</th>
              <th style={{ width: 80 }}>Orden</th>
              <th style={{ width: 120 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, background: p.color,
                    border: '2px solid #111', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 14,
                  }}>{p.emoji}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 800 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#5B6479', marginTop: 2 }}>{p.id}</div>
                </td>
                <td style={{ fontSize: 13 }}>{p.cat}</td>
                <td style={{ fontSize: 13, color: '#5B6479' }}>{p.day || '—'} · {p.time || '—'}</td>
                <td>
                  <span style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 9999,
                    background: p.status === 'active' ? '#43A047' : '#FF7043',
                    color: '#fff', fontWeight: 800, textTransform: 'uppercase',
                  }}>{p.status === 'active' ? 'Activo' : 'Soon'}</span>
                </td>
                <td style={{ fontSize: 13 }}>{p.sortOrder}</td>
                <td>
                  <div className="lzm-admin-actions">
                    <a
                      className="lzm-admin-btn"
                      href={`index.html#/programa/${p.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >Ver</a>
                    <button
                      className="lzm-admin-btn blue"
                      onClick={() => setEditing({ program: p })}
                    >Editar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editing && (
        <ProgramForm
          program={editing.program}
          onSaved={handleSaved}
          onClose={() => setEditing(null)}
          onToast={onToast}
        />
      )}
    </div>
  );
}

Object.assign(window, { ProgramsList });
