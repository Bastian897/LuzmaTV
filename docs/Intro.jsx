// Intro.jsx — splash de entrada con cortinas laterales
const { useState: useStateIntro, useEffect: useEffectIntro, useRef: useRefIntro } = React;

function Intro({ onDone }) {
  const exitStarted = useRefIntro(false);
  const logoRef = useRefIntro(null);
  const [curtainOpen, setCurtainOpen] = useStateIntro(false);
  const [contentVisible, setContentVisible] = useStateIntro(true);

  useEffectIntro(() => {
    const t = setTimeout(startExit, 1500);
    return () => clearTimeout(t);
  }, []);

  function startExit() {
    if (exitStarted.current) return;
    exitStarted.current = true;

    setContentVisible(false);
    setCurtainOpen(true);

    const el = logoRef.current;
    if (!el) { setTimeout(onDone, 900); return; }

    // Cancelar animación CSS para poder hacer transición de salida
    el.style.animation = 'none';
    void el.offsetHeight; // force reflow

    el.style.transition = 'transform 680ms cubic-bezier(.77,0,.18,1), opacity 420ms 180ms';

    const heroLogo = document.getElementById('lzm-hero-logo');
    if (heroLogo) {
      // Ocultar hero logo para evitar ver dos logos simultáneos
      heroLogo.style.opacity = '0';
      setTimeout(() => {
        heroLogo.style.transition = 'opacity 350ms';
        heroLogo.style.opacity = '1';
      }, 580);

      const from = el.getBoundingClientRect();
      const to = heroLogo.getBoundingClientRect();
      const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      const scale = to.height / from.height;
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    } else {
      el.style.transform = 'translate(-42vw, -38vh) scale(0.38)';
    }
    el.style.opacity = '0';

    setTimeout(onDone, 900);
  }

  const PANEL = {
    position: 'absolute', top: 0, bottom: 0, width: '50%',
    backgroundColor: '#0A0F2C',
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.09) 1.5px, transparent 2px)',
    backgroundSize: '22px 22px',
    transition: 'transform 750ms cubic-bezier(.77,0,.18,1)',
    overflow: 'hidden',
  };

  return (
    <div
      onClick={startExit}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, cursor: 'pointer',
        backgroundColor: '#0A0F2C',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Cortina izquierda — estrella rosa y blanca viajan con ella */}
      <div style={{ ...PANEL, left: 0, transform: curtainOpen ? 'translateX(-100%)' : 'translateX(0)' }}>
        <div style={{ position: 'absolute', bottom: 70, left: 80 }} className="lzm-wiggle">
          <Star size={38} fill="#E91E8C" rotate={-15} />
        </div>
        <div style={{ position: 'absolute', top: 130, left: 130 }}>
          <Star size={20} fill="#fff" rotate={20} />
        </div>
      </div>

      {/* Cortina derecha — estrella amarilla grande y pequeña viajan con ella */}
      <div style={{ ...PANEL, right: 0, transform: curtainOpen ? 'translateX(100%)' : 'translateX(0)' }}>
        <div style={{ position: 'absolute', top: 52, right: 80 }} className="lzm-spin-slow">
          <Star size={68} fill="#FFD600" rotate={12} />
        </div>
        <div style={{ position: 'absolute', bottom: 140, right: 160 }}>
          <Star size={16} fill="#FDD835" rotate={35} />
        </div>
      </div>

      {/* Logo — se anima al entrar y viaja hacia el hero al salir */}
      <div
        ref={logoRef}
        style={{
          position: 'relative', zIndex: 1,
          animation: 'lzm-intro-logo 580ms cubic-bezier(.34,1.56,.64,1) both',
        }}
      >
        <img
          src="assets/luzmatv-logo.png"
          alt="LuzmaTV"
          style={{
            height: 'clamp(110px, 22vw, 190px)', display: 'block',
            border: '5px solid #111', borderRadius: 22, boxShadow: '12px 12px 0 #111',
          }}
        />
      </div>

      {/* Badge + tagline — desaparecen al abrir cortinas */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: contentVisible ? 1 : 0,
        transition: 'opacity 300ms',
        pointerEvents: 'none',
      }}>
        <div style={{ marginTop: 28, animation: 'lzm-intro-up 380ms 580ms cubic-bezier(.34,1.56,.64,1) both' }}>
          <LiveBadge size="md" />
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(18px, 3vw, 26px)',
          color: '#FDD835', letterSpacing: '.14em', textTransform: 'uppercase', textShadow: '2px 2px 0 #111',
          animation: 'lzm-intro-up 380ms 820ms cubic-bezier(.34,1.56,.64,1) both',
        }}>
          La señal que deja huella
        </div>
      </div>

      {/* Hint */}
      <div style={{ position: 'absolute', bottom: 28, zIndex: 1, opacity: contentVisible ? 1 : 0, transition: 'opacity 300ms' }}>
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 10,
          textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,.28)',
          animation: 'lzm-intro-up 380ms 1100ms ease both',
        }}>
          Toca para continuar
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Intro });
