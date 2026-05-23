// App.jsx — router principal
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const [hash, setHash] = useStateApp(window.location.hash);

  useEffectApp(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const onNav = (id) => {
    window.location.hash = `#${id}`;
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Rutas internas: hash que empieza con #/
  if (hash.startsWith('#/episodio/')) {
    const id = hash.slice('#/episodio/'.length);
    return <EpisodePage id={id} />;
  }
  if (hash.startsWith('#/programa/')) {
    const id = hash.slice('#/programa/'.length);
    return <ProgramPage id={id} />;
  }

  // Página principal
  return (
    <div>
      <Header onNav={onNav} live={true} />
      <Hero onWatch={() => onNav('envivo')} onPrograms={() => onNav('programas')} />
      <LivePlayer />
      <Programs />
      <Episodes />
      <HostsRow />
      <Schedule />
      <Platforms />
      <Community />
      <Contacto />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
