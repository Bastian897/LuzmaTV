// EpisodeForm.jsx — formulario de creacion/edicion de episodio
const { useState: useStateEpF, useEffect: useEffectEpF } = React;

function lzmSlugify(text) {
  return (text || '')
    .toString()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 64);
}

const EMPTY_EP = {
  id: '',
  programId: '',
  title: '',
  youtubeId: '',
  duration: '',
  views: '—',
  color: '#E91E8C',
  isNew: false,
  date: new Date().toISOString().slice(0, 10),
  description: '',
};

function EpisodeForm({ episode, programs, onSaved, onClose, onToast }) {
  const isNew = !episode;
  const [form, setForm] = useStateEpF(() => episode ? { ...episode } : { ...EMPTY_EP });
  const [saving, setSaving] = useStateEpF(false);
  const [deleting, setDeleting] = useStateEpF(false);
  const [error, setError] = useStateEpF('');
  const [autoSlug, setAutoSlug] = useStateEpF(isNew); // auto-genera slug solo en nuevos

  // Auto-slug desde title
  useEffectEpF(() => {
    if (autoSlug && isNew) {
      setForm(f => ({ ...f, id: lzmSlugify(f.title) }));
    }
  }, [form.title, autoSlug, isNew]);

  // Auto-color desde programa elegido
  useEffectEpF(() => {
    if (!form.programId) return;
    const prog = programs.find(p => p.id === form.programId);
    if (prog && prog.color && (!form.color || form.color === '#E91E8C')) {
      setForm(f => ({ ...f, color: prog.color }));
    }
  }, [form.programId]); // eslint-disable-line

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    if (!form.id) { setError('Falta el slug (id)'); return; }
    if (!form.title) { setError('Falta el titulo'); return; }
    if (!form.programId) { setError('Elegi un programa'); return; }
    setSaving(true);
    try {
      await upsertEpisode(form);
      onToast({ kind: 'success', msg: isNew ? 'Episodio creado ✓' : 'Episodio actualizado ✓' });
      onSaved();
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`¿Eliminar episodio "${form.title}"? Esta accion no se puede deshacer.`)) return;
    setDeleting(true);
    try {
      await deleteEpisode(form.id);
      onToast({ kind: 'success', msg: 'Episodio eliminado' });
      onSaved();
    } catch (err) {
      setError(err.message || 'Error al eliminar');
      setDeleting(false);
    }
  }

  return (
    <div className="lzm-admin-modal-bg" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="lzm-admin-modal" onSubmit={handleSave}>
        <h2>{isNew ? '+ Nuevo episodio' : 'Editar episodio'}</h2>

        {error && <div className="lzm-admin-error-banner">{error}</div>}

        <div className="lzm-admin-field">
          <label>Programa *</label>
          <select value={form.programId} onChange={(e) => update('programId', e.target.value)} required>
            <option value="">— Elegí un programa —</option>
            {programs.map(p => (
              <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
            ))}
          </select>
        </div>

        <div className="lzm-admin-field">
          <label>Título *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Luzma Cachai · 21 de Mayo"
            required
          />
        </div>

        <div className="lzm-admin-field">
          <label>
            Slug (URL) *
            {isNew && (
              <span style={{ float: 'right', fontWeight: 600, textTransform: 'none' }}>
                <input
                  type="checkbox"
                  checked={autoSlug}
                  onChange={(e) => setAutoSlug(e.target.checked)}
                  style={{ width: 14, height: 14, verticalAlign: 'middle', marginRight: 4 }}
                />
                auto desde titulo
              </span>
            )}
          </label>
          <input
            type="text"
            value={form.id}
            onChange={(e) => { setAutoSlug(false); update('id', lzmSlugify(e.target.value)); }}
            placeholder="luzma-cachai-21-mayo"
            disabled={!isNew}
            required
          />
        </div>

        <div className="lzm-admin-field">
          <label>YouTube ID</label>
          <input
            type="text"
            value={form.youtubeId}
            onChange={(e) => update('youtubeId', e.target.value)}
            placeholder="dQw4w9WgXcQ (solo el ID, no la URL completa)"
          />
          {form.youtubeId && (
            <img
              src={`https://img.youtube.com/vi/${form.youtubeId}/default.jpg`}
              alt="preview"
              style={{ marginTop: 8, width: 120, border: '2px solid #111', borderRadius: 6 }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
        </div>

        <div className="lzm-admin-field-row">
          <div className="lzm-admin-field">
            <label>Fecha</label>
            <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} />
          </div>
          <div className="lzm-admin-field">
            <label>Duración</label>
            <input
              type="text"
              value={form.duration}
              onChange={(e) => update('duration', e.target.value)}
              placeholder="2:13:08 o 2h+"
            />
          </div>
        </div>

        <div className="lzm-admin-field-row">
          <div className="lzm-admin-field">
            <label>Vistas</label>
            <input
              type="text"
              value={form.views}
              onChange={(e) => update('views', e.target.value)}
              placeholder="286 o —"
            />
          </div>
          <div className="lzm-admin-field">
            <label>Color (HEX)</label>
            <input
              type="text"
              value={form.color}
              onChange={(e) => update('color', e.target.value)}
              placeholder="#E91E8C"
            />
          </div>
        </div>

        <div className="lzm-admin-field lzm-admin-field-checkbox">
          <input
            id="ep-isnew"
            type="checkbox"
            checked={!!form.isNew}
            onChange={(e) => update('isNew', e.target.checked)}
          />
          <label htmlFor="ep-isnew">Marcar como "Nuevo" (badge destacado)</label>
        </div>

        <div className="lzm-admin-field">
          <label>Descripción</label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Una linea o dos sobre el episodio"
            rows={3}
          />
        </div>

        <div className="lzm-admin-form-actions">
          <div>
            {!isNew && (
              <button
                type="button"
                className="lzm-admin-btn danger"
                onClick={handleDelete}
                disabled={deleting || saving}
              >
                {deleting ? 'Eliminando…' : 'Eliminar'}
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="lzm-admin-btn" onClick={onClose} disabled={saving || deleting}>
              Cancelar
            </button>
            <button type="submit" className="lzm-admin-btn success" disabled={saving || deleting}>
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

Object.assign(window, { EpisodeForm });
