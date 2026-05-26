// ProgramForm.jsx — formulario de creacion/edicion de programa
const { useState: useStatePF } = React;

const EMPTY_PROG = {
  id: '',
  name: '',
  cat: 'talk',
  day: '',
  time: '',
  desc: '',
  longDesc: '',
  color: '#E91E8C',
  emoji: '🎬',
  status: 'active',
  hostIds: [],
  sortOrder: 50,
};

const PROG_CATS = [
  { value: 'talk',     label: 'Talk Show' },
  { value: 'humor',    label: 'Humor' },
  { value: 'entret',   label: 'Entretenimiento' },
  { value: 'invitado', label: 'Invitados' },
];

const PROG_STATUS = [
  { value: 'active', label: 'Activo (al aire)' },
  { value: 'soon',   label: 'Próximamente' },
];

function ProgramForm({ program, onSaved, onClose, onToast }) {
  const isNew = !program;
  const [form, setForm] = useStatePF(() => program ? { ...program } : { ...EMPTY_PROG });
  const [saving, setSaving] = useStatePF(false);
  const [deleting, setDeleting] = useStatePF(false);
  const [error, setError] = useStatePF('');

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    if (!form.id) { setError('Falta el slug (id)'); return; }
    if (!form.name) { setError('Falta el nombre'); return; }
    setSaving(true);
    try {
      await upsertProgram(form);
      onToast({ kind: 'success', msg: isNew ? 'Programa creado ✓' : 'Programa actualizado ✓' });
      onSaved();
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`¿Eliminar programa "${form.name}"? Se eliminarán también todos sus episodios (cascade). No se puede deshacer.`)) return;
    setDeleting(true);
    try {
      await deleteProgram(form.id);
      onToast({ kind: 'success', msg: 'Programa eliminado' });
      onSaved();
    } catch (err) {
      setError(err.message || 'Error al eliminar');
      setDeleting(false);
    }
  }

  return (
    <div className="lzm-admin-modal-bg" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="lzm-admin-modal" onSubmit={handleSave}>
        <h2>{isNew ? '+ Nuevo programa' : 'Editar programa'}</h2>

        {error && <div className="lzm-admin-error-banner">{error}</div>}

        <div className="lzm-admin-field-row">
          <div className="lzm-admin-field">
            <label>Nombre *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Luzma Cachai"
              required
            />
          </div>
          <div className="lzm-admin-field">
            <label>Slug (URL) *</label>
            <input
              type="text"
              value={form.id}
              onChange={(e) => update('id', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              placeholder="luzma-cachai"
              disabled={!isNew}
              required
            />
          </div>
        </div>

        <div className="lzm-admin-field-row">
          <div className="lzm-admin-field">
            <label>Categoría</label>
            <select value={form.cat} onChange={(e) => update('cat', e.target.value)}>
              {PROG_CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div className="lzm-admin-field">
            <label>Estado</label>
            <select value={form.status} onChange={(e) => update('status', e.target.value)}>
              {PROG_STATUS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        <div className="lzm-admin-field-row">
          <div className="lzm-admin-field">
            <label>Día</label>
            <input
              type="text"
              value={form.day}
              onChange={(e) => update('day', e.target.value)}
              placeholder="Lun a Vie"
            />
          </div>
          <div className="lzm-admin-field">
            <label>Hora</label>
            <input
              type="text"
              value={form.time}
              onChange={(e) => update('time', e.target.value)}
              placeholder="10:00"
            />
          </div>
        </div>

        <div className="lzm-admin-field-row">
          <div className="lzm-admin-field">
            <label>Color (HEX)</label>
            <input
              type="text"
              value={form.color}
              onChange={(e) => update('color', e.target.value)}
              placeholder="#E91E8C"
            />
          </div>
          <div className="lzm-admin-field">
            <label>Emoji</label>
            <input
              type="text"
              value={form.emoji}
              onChange={(e) => update('emoji', e.target.value)}
              placeholder="🎬"
              maxLength={4}
            />
          </div>
        </div>

        <div className="lzm-admin-field">
          <label>Descripción corta</label>
          <input
            type="text"
            value={form.desc}
            onChange={(e) => update('desc', e.target.value)}
            placeholder="El live show diario de LuzmaTV."
            maxLength={140}
          />
        </div>

        <div className="lzm-admin-field">
          <label>Descripción larga</label>
          <textarea
            value={form.longDesc}
            onChange={(e) => update('longDesc', e.target.value)}
            placeholder="Texto largo que aparece en la página del programa"
            rows={4}
          />
        </div>

        <div className="lzm-admin-field-row">
          <div className="lzm-admin-field">
            <label>Host IDs (separados por coma)</label>
            <input
              type="text"
              value={(form.hostIds || []).join(', ')}
              onChange={(e) => update('hostIds', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="ariel-osses, vicky-more"
            />
          </div>
          <div className="lzm-admin-field">
            <label>Orden (menor = primero)</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => update('sortOrder', e.target.value)}
              placeholder="10"
            />
          </div>
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

Object.assign(window, { ProgramForm });
