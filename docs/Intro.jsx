// Intro.jsx — cortinas de teatro: se abren y revelan la página principal
const { useState: useStateIntro, useEffect: useEffectIntro, useRef: useRefIntro } = React;

function Intro({ onDone }) {
  const exitStarted = useRefIntro(false);
  const logoRef = useRefIntro(null);
  const [curtainOpen, setCurtainOpen] = useStateIntro(false);
  const [contentVisible, setContentVisible] = useStateIntro(true);

  useEffectIntro(() => {
    // Bloquear scroll mientras el intro está visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const t = setTimeout(startExit, 1600);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  function startExit() {
    if (exitStarted.current) return;
    exitStarted.current = true;

    setContentVisible(false);
    setCurtainOpen(true);

    // Liberar scroll al cerrar el intro
    setTimeout(() => { document.body.style.overflow = ''; }, 900);

    const el = logoRef.current;
    if (!el) { setTimeout(onDone, 1000); return; }

    void el.offsetHeight; // force reflow
    el.style.transition = 'transform 780ms cubic-bezier(.77,0,.18,1), opacity 420ms 240ms';

    const heroLogo = document.getElementById('lzm-hero-logo');
    if (heroLogo) {
      heroLogo.style.opacity = '0';
      setTimeout(() => {
        heroLogo.style.transition = 'opacity 350ms';
        heroLogo.style.opacity = '1';
      }, 640);

      const from = el.getBoundingClientRect();
      const to = heroLogo.getBoundingClientRect();
      const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      const scale = to.height / from.height;
      // Preserva el centrado -50%,-50% del wrapper y agrega el desplazamiento al hero
      el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`;
    } else {
      el.style.transform = 'translate(calc(-50% - 42vw), calc(-50% - 38vh)) scale(0.38)';
    }
    el.style.opacity = '0';

    setTimeout(onDone, 1000);
  }

  // Cortina de terciopelo rojo con pliegues verticales
  const VELVET_BG = `
    linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,0) 14%, rgba(0,0,0,0) 86%, rgba(0,0,0,.45) 100%),
    repeating-linear-gradient(
      90deg,
      #3a0510 0px,
      #5a0e1c 14px,
      #7a1828 28px,
      #5a0e1c 42px,
      #3a0510 56px
    )
  `;

  const PANEL = {
    position: 'absolute', top: 0, bottom: 0, width: '52%',
    backgroundImage: VELVET_BG,
    transition: 'transform 1100ms cubic-bezier(.65,0,.18,1)',
    overflow: 'hidden',
    willChange: 'transform',
  };

  // Vara dorada superior (riel)
  const ROD = {
    position: 'absolute', top: 0, left: 0, right: 0, height: 18,
    background: 'linear-gradient(180deg, #FFD600 0%, #C99700 60%, #8a6700 100%)',
    borderBottom: '3px solid #111',
    boxShadow: '0 3px 10px rgba(0,0,0,.5)',
    zIndex: 2,
  };

  return (
    <div
      onClick={startExit}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* Cortina izquierda — se pliega y se inclina al abrirse (efecto tela) */}
      <div style={{
        ...PANEL,
        left: 0,
        transformOrigin: '0% 50%',
        transform: curtainOpen
          ? 'translateX(-102%) scaleX(0.78) skewY(1.2deg)'
          : 'translateX(0) scaleX(1) skewY(0deg)',
        // Sombra en el borde interno para dar profundidad
        boxShadow: 'inset -28px 0 38px rgba(0,0,0,.6)',
      }}>
        <div style={ROD} />
        <div style={{ position: 'absolute', bottom: 70, left: 80 }} className="lzm-wiggle">
          <Star size={38} fill="#FFD600" rotate={-15} />
        </div>
        <div style={{ position: 'absolute', top: 130, left: 130 }}>
          <Star size={20} fill="#fff" rotate={20} />
        </div>
      </div>

      {/* Cortina derecha — espejo de la izquierda con leve delay */}
      <div style={{
        ...PANEL,
        right: 0,
        transformOrigin: '100% 50%',
        transform: curtainOpen
          ? 'translateX(102%) scaleX(0.78) skewY(-1.2deg)'
          : 'translateX(0) scaleX(1) skewY(0deg)',
        transitionDelay: curtainOpen ? '60ms' : '0ms',
        boxShadow: 'inset 28px 0 38px rgba(0,0,0,.6)',
      }}>
        <div style={ROD} />
        <div style={{ position: 'absolute', top: 52, right: 80 }} className="lzm-spin-slow">
          <Star size={68} fill="#FFD600" rotate={12} />
        </div>
        <div style={{ position: 'absolute', bottom: 140, right: 160 }}>
          <Star size={16} fill="#FDD835" rotate={35} />
        </div>
      </div>

      {/* Wrapper centrado — no se anima, solo posiciona */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          willChange: 'transform, opacity',
        }}
      >
        {/* Inner que sí se anima (entrada bounce) */}
        <div style={{ animation: 'lzm-intro-logo 580ms cubic-bezier(.34,1.56,.64,1) both' }}>
          <img
            src="assets/luzmatv-logo.png"
            alt="LuzmaTV"
            style={{
              height: 'clamp(110px, 22vw, 190px)', display: 'block',
              border: '5px solid #111', borderRadius: 22, boxShadow: '12px 12px 0 #111',
            }}
          />
        </div>
      </div>

      {/* Badge + tagline — debajo del logo, sin afectar su centrado */}
      <div style={{
        position: 'absolute', top: 'calc(50% + clamp(80px, 13vw, 130px))', left: 0, right: 0,
        zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: contentVisible ? 1 : 0,
        transition: 'opacity 300ms',
        pointerEvents: 'none',
      }}>
        <div style={{ animation: 'lzm-intro-up 380ms 580ms cubic-bezier(.34,1.56,.64,1) both' }}>
          <LiveBadge size="md" />
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(18px, 3vw, 26px)',
          color: '#FFD600', letterSpacing: '.14em', textTransform: 'uppercase', textShadow: '2px 2px 0 #111',
          animation: 'lzm-intro-up 380ms 820ms cubic-bezier(.34,1.56,.64,1) both',
        }}>
          La señal que deja huella
        </div>
      </div>

      {/* Hint */}
      <div style={{ position: 'absolute', bottom: 28, zIndex: 3, opacity: contentVisible ? 1 : 0, transition: 'opacity 300ms' }}>
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 10,
          textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,.7)',
          animation: 'lzm-intro-up 380ms 1100ms ease both',
        }}>
          Toca para continuar
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Intro });
