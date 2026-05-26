// AdminAuth.jsx — pantalla de login
const { useState: useStateAuth } = React;

function AdminAuth({ onLogin }) {
  const [email, setEmail] = useStateAuth('');
  const [password, setPassword] = useStateAuth('');
  const [loading, setLoading] = useStateAuth(false);
  const [error, setError] = useStateAuth('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const session = await adminSignIn(email.trim(), password);
      onLogin(session);
    } catch (err) {
      setError(err.message || 'Credenciales invalidas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lzm-admin-login">
      <form className="lzm-admin-login-card" onSubmit={handleSubmit}>
        <h1>LuzmaTV Admin</h1>
        <p>Iniciá sesión con la cuenta admin del equipo.</p>

        {!window.ADMIN_CONFIGURED && (
          <div className="lzm-admin-error-banner" style={{ marginBottom: 20 }}>
            ⚠ Falta configurar Supabase. Revisá <code>admin/SETUP.md</code> y pegá la URL + anon key en <code>admin/supabase-client.jsx</code> y <code>lzm-data.jsx</code>.
          </div>
        )}

        {error && <div className="lzm-admin-error-banner">{error}</div>}

        <div className="lzm-admin-field">
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
            disabled={loading || !window.ADMIN_CONFIGURED}
          />
        </div>

        <div className="lzm-admin-field">
          <label htmlFor="admin-password">Contraseña</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            disabled={loading || !window.ADMIN_CONFIGURED}
          />
        </div>

        <button
          type="submit"
          className="lzm-admin-btn primary"
          style={{ width: '100%', padding: '14px 20px', fontSize: 14 }}
          disabled={loading || !window.ADMIN_CONFIGURED}
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

Object.assign(window, { AdminAuth });
