// AdminApp.jsx — entrypoint del panel admin: shell + auth + tabs
const { useState: useStateA, useEffect: useEffectA } = React;

function AdminApp() {
  const [session, setSession] = useStateA(undefined); // undefined = aun no chequeado, null = no logueado
  const [tab, setTab] = useStateA('episodes');
  const [programs, setPrograms] = useStateA([]);
  const [programsLoading, setProgramsLoading] = useStateA(true);
  const [programsError, setProgramsError] = useStateA('');
  const [toast, setToast] = useStateA(null);

  // Check session inicial + suscripcion a cambios
  useEffectA(() => {
    if (!supabase) { setSession(null); return; }
    let mounted = true;
    adminGetSession().then(s => { if (mounted) setSession(s || null); });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (mounted) setSession(sess || null);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  // Cargar programas una vez logueado (necesarios para el select de episodios)
  async function refreshPrograms() {
    setProgramsLoading(true);
    setProgramsError('');
    try {
      const ps = await listPrograms();
      setPrograms(ps);
    } catch (err) {
      setProgramsError(err.message || 'Error al cargar programas');
    } finally {
      setProgramsLoading(false);
    }
  }

  useEffectA(() => {
    if (session) refreshPrograms();
  }, [session]);

  // Toast con auto-dismiss
  useEffectA(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  async function handleLogout() {
    if (!confirm('¿Cerrar sesión?')) return;
    await adminSignOut();
    setSession(null);
  }

  // Loading inicial
  if (session === undefined) {
    return <div className="lzm-admin-loading">Cargando…</div>;
  }

  // No logueado
  if (!session) {
    return <AdminAuth onLogin={(s) => setSession(s)} />;
  }

  // Logueado
  return (
    <div>
      <header className="lzm-admin-header">
        <h1>LuzmaTV Admin</h1>
        <div className="lzm-admin-user">
          <span>{session.user?.email}</span>
          <a href="index.html" className="lzm-admin-btn" target="_blank" rel="noreferrer">Ver sitio</a>
          <button className="lzm-admin-btn" onClick={handleLogout}>Salir</button>
        </div>
      </header>

      <nav className="lzm-admin-tabs">
        <button
          className={`lzm-admin-tab ${tab === 'episodes' ? 'active' : ''}`}
          onClick={() => setTab('episodes')}
        >Episodios</button>
        <button
          className={`lzm-admin-tab ${tab === 'programs' ? 'active' : ''}`}
          onClick={() => setTab('programs')}
        >Programas</button>
      </nav>

      <main className="lzm-admin-main">
        {programsError && <div className="lzm-admin-error-banner">{programsError}</div>}

        {programsLoading ? (
          <div className="lzm-admin-loading">Cargando datos…</div>
        ) : tab === 'episodes' ? (
          <EpisodesList programs={programs} onToast={setToast} />
        ) : (
          <ProgramsList
            programs={programs}
            onProgramsChanged={refreshPrograms}
            onToast={setToast}
          />
        )}
      </main>

      {toast && (
        <div className={`lzm-admin-toast ${toast.kind || ''}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

const adminRoot = ReactDOM.createRoot(document.getElementById('admin-root'));
adminRoot.render(<AdminApp />);
