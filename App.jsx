// App.jsx — router principal
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const [path, setPath] = useStateApp(window.location.pathname);
  const [showIntro, setShowIntro] = useStateApp(() => !sessionStorage.getItem('lzm-intro'));
  const [, lzmForce] = useStateApp(0);
  const handleIntroDone = () => { sessionStorage.setItem('lzm-intro', '1'); setShowIntro(false); };

  // Re-render cuando lzm-data.jsx termina de cargar episodes/programs desde Supabase
  useEffectApp(() => {
    const onReady = () => lzmForce(v => v + 1);
    window.addEventListener('lzm-data-ready', onReady);
    return () => window.removeEventListener('lzm-data-ready', onReady);
  }, []);

  useEffectApp(() => {
    if (window.AOS) window.AOS.init({ duration: 500, once: true, offset: 50, easing: 'ease-out-cubic' });

    // Scroll spy: actualiza el hash de la URL mientras el usuario scrollea entre secciones
    const SECTIONS = ['inicio','programas','envivo','episodios','equipo','grilla','vernos','contacto'];
    const visible = new Set();
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id));
      if (window.location.pathname !== '/') return;
      const active = SECTIONS.find(id => visible.has(id));
      if (active) history.replaceState(null, '', '#' + active);
    }, { threshold: 0.25 });
    const attachSpy = () => SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });
    setTimeout(attachSpy, 300);
    window.__lzmAttachSpy = attachSpy;

    return () => { spy.disconnect(); delete window.__lzmAttachSpy; };
  }, []);

  // Rutas /episodio/:id y /programa/:id: escucha cambios de ruta (back/forward y lzmNavigate)
  useEffectApp(() => {
    const handler = () => {
      const p = window.location.pathname;
      setPath(p);
      if (p === '/' || p === '/index.html') {
        const title = 'LuzmaTV - La señal que deja huella | Canal chileno en vivo';
        const description = 'LuzmaTV es el canal chileno de talk shows, humor y entretenimiento en vivo. Luzma Cachai (Lun–Vie 10:00), Frente a Frente (Mar y Jue tarde). Míranos en Kick, Twitch, YouTube, TikTok e Instagram.';
        const ogImage = 'https://luzmatv.vercel.app/assets/luzmatv-og-image.jpg';
        document.title = title;
        const setMeta = (selector, attr, value) => {
          const el = document.querySelector(selector);
          if (el) el.setAttribute(attr, value);
        };
        setMeta('meta[name="description"]', 'content', description);
        setMeta('link[rel="canonical"]', 'href', 'https://luzmatv.vercel.app/');
        setMeta('meta[property="og:url"]', 'content', 'https://luzmatv.vercel.app/');
        setMeta('meta[property="og:title"]', 'content', title);
        setMeta('meta[property="og:description"]', 'content', 'Canal chileno de talk shows, humor y entretenimiento en vivo. Luzma Cachai, Frente a Frente y más. Míranos en Kick, Twitch, YouTube, TikTok e Instagram.');
        setMeta('meta[property="og:image"]', 'content', ogImage);
        setMeta('meta[name="twitter:title"]', 'content', 'LuzmaTV - La señal que deja huella');
        setMeta('meta[name="twitter:description"]', 'content', 'Canal chileno de talk shows, humor y entretenimiento en vivo. Lun–Vie 10:00 en vivo.');
        setMeta('meta[name="twitter:image"]', 'content', ogImage);
        setTimeout(() => window.__lzmAttachSpy && window.__lzmAttachSpy(), 300);
      }
      if (window.AOS) window.AOS.refresh();
    };
    window.addEventListener('popstate', handler);
    window.addEventListener('lzm-pathchange', handler);
    return () => {
      window.removeEventListener('popstate', handler);
      window.removeEventListener('lzm-pathchange', handler);
    };
  }, []);

  const onNav = (id) => {
    window.location.hash = `#${id}`;
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Rutas internas: /episodio/:id y /programa/:id
  const epMatch = path.match(/^\/episodio\/([^/]+)\/?$/);
  if (epMatch) {
    return <EpisodePage id={decodeURIComponent(epMatch[1])} />;
  }
  const progMatch = path.match(/^\/programa\/([^/]+)\/?$/);
  if (progMatch) {
    return <ProgramPage id={decodeURIComponent(progMatch[1])} />;
  }

  // Cualquier otra ruta desconocida (ej: /asdf) cae aquí gracias al
  // rewrite catch-all de vercel.json hacia index.html
  if (path !== '/' && path !== '/index.html') {
    return <NotFound />;
  }

  // Página principal
  return (
    <div>
      {showIntro && <Intro onDone={handleIntroDone} />}

      {/* Botón flotante WhatsApp */}
      <a
        href="https://wa.me/56972041514"
        target="_blank"
        rel="noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="lzm-pop"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 999,
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          boxShadow: '3px 3px 0 #111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="assets/platforms/whatsapp-logo.webp"
          alt="WhatsApp"
          style={{ width: 64, height: 64, display: 'block', borderRadius: '50%' }}
        />
      </a>

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
