// App.jsx — router principal
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const [hash, setHash] = useStateApp(window.location.hash);

  useEffectApp(() => {
    if (window.AOS) window.AOS.init({ duration: 500, once: true, offset: 50, easing: 'ease-out-cubic' });
    const handler = () => {
      const h = window.location.hash;
      setHash(h);
      if (!h.startsWith('#/')) {
        document.title = 'LuzmaTV — La señal que deja huella | Canal chileno en vivo';
        const m = document.querySelector('meta[name="description"]');
        if (m) m.setAttribute('content', 'LuzmaTV es el canal chileno de talk shows, humor y entretenimiento en vivo. Luzma Cachai (Lun–Vie 10:00), Cara a Cara (Mar y Jue tarde). Míranos en Kick, Twitch, YouTube, TikTok e Instagram.');
      }
      if (window.AOS) window.AOS.refresh();
    };
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
