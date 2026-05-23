// Header.jsx
const { useState: useStateH, useEffect: useEffectH } = React;

function Header({ live = true, onNav }) {
  const [scrolled, setScrolled] = useStateH(false);
  const [open, setOpen] = useStateH(false);

  useEffectH(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    ['inicio', 'Inicio'],
    ['programas', 'Programas'],
    ['envivo', 'En Vivo'],
    ['episodios', 'Episodios'],
    ['equipo', 'Equipo'],
    ['vernos', '¿Cómo vernos?'],
    ['contacto', 'Contacto'],
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#fff',
        borderBottom: '4px solid #111',
        boxShadow: scrolled ? '0 4px 0 rgba(0,0,0,.07)' : 'none',
        transition: 'box-shadow 200ms',
      }}
    >
      <div className="lzm-shell" style={{ display: 'flex', alignItems: 'center', height: 76, gap: 24 }}>
        <a href="#inicio" onClick={(e) => { e.preventDefault(); onNav?.('inicio'); }} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="assets/luzmatv-logo.png" alt="LuzmaTV" style={{ height: 48, border: '3px solid #111', borderRadius: 10, boxShadow: '3px 3px 0 #111', display: 'block' }} />
        </a>

        <nav style={{ display: 'flex', gap: 22, marginLeft: 12 }} className="lzm-desktop-nav">
          {nav.map(([id, label], i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); onNav?.(id); }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: 13,
                textTransform: 'uppercase',
                letterSpacing: '.06em',
                color: '#111',
                position: 'relative',
                padding: '4px 0',
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        {live && (
          <a href="#envivo" onClick={(e) => { e.preventDefault(); onNav?.('envivo'); }} style={{ display: 'inline-flex' }}>
            <LiveBadge size="sm" />
          </a>
        )}

        <button
          aria-label="Menú"
          onClick={() => setOpen(!open)}
          className="lzm-mobile-only"
          style={{
            display: 'none',
            background: '#FDD835',
            border: '3px solid #111',
            borderRadius: 12,
            padding: 8,
            boxShadow: '3px 3px 0 #111',
          }}
        >
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
      </div>

      {open && (
        <div
          className="lzm-mobile-only"
          style={{
            display: 'none',
            background: '#fff',
            borderTop: '3px solid #111',
            padding: '16px 24px 22px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); setOpen(false); onNav?.(id); }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28,
                  textTransform: 'uppercase',
                  color: '#111',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .lzm-desktop-nav { display: none !important; }
          .lzm-mobile-only { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

Object.assign(window, { Header });
