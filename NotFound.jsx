// NotFound.jsx — página 404
const { useEffect: useEffectNF } = React;

function NotFound() {
  useEffectNF(() => {
    window.scrollTo(0, 0);
    document.title = 'Página no encontrada - LuzmaTV';
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', 'La página que buscas no existe. Vuelve al inicio de LuzmaTV o míranos en YouTube e Instagram.');
  }, []);

  const onNav = (id) => { window.location.hash = `#${id}`; };

  return (
    <div>
      <Header onNav={onNav} live={false} />

      <div style={{ background: '#0A0F2C', borderBottom: '4px solid #111', position: 'relative', overflow: 'hidden' }}>
        {/* Textura diagonal */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 14px, rgba(255,255,255,.04) 14px, rgba(255,255,255,.04) 28px)', pointerEvents: 'none' }} />

        <div style={{ position: 'absolute', top: 50, left: '8%' }} className="lzm-spin-slow">
          <Star size={64} fill="#FDD835" rotate={-10} />
        </div>
        <div style={{ position: 'absolute', bottom: 40, right: '10%' }}>
          <Star size={46} fill="#E91E8C" rotate={18} />
        </div>
        <div style={{ position: 'absolute', top: '40%', right: '6%' }} className="lzm-spin-slow">
          <Star size={34} fill="#0055FF" rotate={6} />
        </div>

        <div className="lzm-shell" style={{ position: 'relative', padding: '90px 24px', textAlign: 'center' }}>
          <div className="lzm-section-eyebrow" style={{ color: '#FDD835', marginBottom: 6 }}>UPS, ESTO SE FUE A NEGRO</div>

          <h1 style={{
            fontFamily: "'Bebas Neue'",
            fontSize: 'clamp(110px, 24vw, 240px)',
            lineHeight: .85,
            margin: '0 0 8px',
            color: '#fff',
            textShadow: '8px 8px 0 #E53935',
            letterSpacing: '.04em',
          }}>
            404
          </h1>

          <h2 style={{
            fontFamily: "'Bebas Neue'",
            fontSize: 'clamp(28px, 5vw, 48px)',
            lineHeight: 1.05,
            margin: '0 auto 18px',
            color: '#fff',
            textTransform: 'uppercase',
            maxWidth: 640,
          }}>
            Esta señal no está disponible
          </h2>

          <p style={{
            fontFamily: "'Nunito'",
            fontWeight: 700,
            fontSize: 17,
            color: 'rgba(255,255,255,.75)',
            maxWidth: 480,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            La página que buscas se perdió en la transmisión. Pero tranquilo, la fiesta sigue en otro lado.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 36 }}>
            <a href="#inicio" onClick={(e) => { e.preventDefault(); onNav('inicio'); }} style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">Volver al inicio</Button>
            </a>
            <a href="https://www.youtube.com/@luzmatvcl" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <Button variant="accent" size="lg">
                <PlatformMark slug="youtube" color="#fff" size={18} />
                YouTube
              </Button>
            </a>
            <a href="https://www.instagram.com/luzma.tv/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">
                <PlatformMark slug="instagram" color="#111" size={18} />
                Instagram
              </Button>
            </a>
          </div>

          <Pill color="#fff">404 — La señal que deja huella</Pill>
        </div>
      </div>

      <Footer />
    </div>
  );
}

Object.assign(window, { NotFound });
