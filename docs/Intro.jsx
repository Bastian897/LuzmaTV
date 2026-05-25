// Intro.jsx — cortinas de teatro con clip-path ondulado + scaleX (efecto tela)
const { useState: useStateIntro, useEffect: useEffectIntro, useRef: useRefIntro } = React;

// Patron de terciopelo con pliegues (multi-stop alternando claro/oscuro)
const VELVET_BG = `
  linear-gradient(180deg, rgba(0,0,0,.25) 0%, transparent 12%, transparent 88%, rgba(0,0,0,.5) 100%),
  repeating-linear-gradient(
    90deg,
    #1c0306 0px,
    #3a070f 7px,
    #6a1320 14px,
    #8a1f30 18px,
    #6a1320 22px,
    #3a070f 28px,
    #1c0306 34px
  )
`;

function CurtainPanel({ side, open }) {
  const isLeft = side === 'left';

  // 12 puntos a lo largo del borde interno — abierto tiene perfil ondulado (folds de tela)
  const yPoints = [0, 8, 16, 25, 34, 43, 52, 61, 70, 79, 88, 100];
  // X positions del borde interno cuando esta abierto (perfil de pliegues)
  const openXs = isLeft
    ? [14, 7, 13, 6, 12, 8, 15, 5, 11, 9, 14, 10]
    : [86, 93, 87, 94, 88, 92, 85, 95, 89, 91, 86, 90];

  const closedX = isLeft ? 100 : 0;
  const startCorner = isLeft ? '0% 0%' : '100% 0%';
  const endCorner = isLeft ? '0% 100%' : '100% 100%';

  const closedClip = `polygon(${startCorner}, ${yPoints.map(y => `${closedX}% ${y}%`).join(', ')}, ${endCorner})`;
  const openClip = `polygon(${startCorner}, ${yPoints.map((y, i) => `${openXs[i]}% ${y}%`).join(', ')}, ${endCorner})`;

  return (
    <div style={{
      position: 'absolute', top: 0, bottom: 0, [side]: 0, width: '52%',
      backgroundImage: VELVET_BG,
      clipPath: open ? openClip : closedClip,
      WebkitClipPath: open ? openClip : closedClip,
      transformOrigin: isLeft ? '0% 50%' : '100% 50%',
      transform: open
        ? `translateX(${isLeft ? '-12%' : '12%'}) scaleX(0.5)`
        : 'translateX(0) scaleX(1)',
      transition: [
        'clip-path 1500ms cubic-bezier(.45,0,.12,1)',
        '-webkit-clip-path 1500ms cubic-bezier(.45,0,.12,1)',
        'transform 1500ms cubic-bezier(.45,0,.12,1)',
      ].join(', '),
      transitionDelay: !isLeft && open ? '90ms' : '0ms',
      // Sombra interna fuerte en el borde interno (donde se bunch la tela)
      boxShadow: isLeft
        ? 'inset -50px 0 80px rgba(0,0,0,.75)'
        : 'inset 50px 0 80px rgba(0,0,0,.75)',
      willChange: 'transform, clip-path',
    }} />
  );
}

function Intro({ onDone }) {
  const exitStarted = useRefIntro(false);
  const logoRef = useRefIntro(null);
  const [curtainOpen, setCurtainOpen] = useStateIntro(false);
  const [contentVisible, setContentVisible] = useStateIntro(true);

  useEffectIntro(() => {
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

    setTimeout(() => { document.body.style.overflow = ''; }, 1600);

    const el = logoRef.current;
    if (!el) { setTimeout(onDone, 1600); return; }

    void el.offsetHeight;
    el.style.transition = 'transform 900ms cubic-bezier(.77,0,.18,1), opacity 480ms 340ms';

    const heroLogo = document.getElementById('lzm-hero-logo');
    if (heroLogo) {
      heroLogo.style.opacity = '0';
      setTimeout(() => {
        heroLogo.style.transition = 'opacity 350ms';
        heroLogo.style.opacity = '1';
      }, 820);

      const from = el.getBoundingClientRect();
      const to = heroLogo.getBoundingClientRect();
      const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      const scale = to.height / from.height;
      el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`;
    } else {
      el.style.transform = 'translate(calc(-50% - 42vw), calc(-50% - 38vh)) scale(0.38)';
    }
    el.style.opacity = '0';

    setTimeout(onDone, 1600);
  }

  return (
    <div
      onClick={startExit}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, cursor: 'pointer',
        background: 'transparent',
      }}
    >
      {/* Riel dorado superior fijo */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 22, zIndex: 4,
        background: 'linear-gradient(180deg, #FFE680 0%, #FFD600 30%, #C99700 70%, #8a6700 100%)',
        borderBottom: '4px solid #111',
        boxShadow: '0 4px 14px rgba(0,0,0,.5)',
      }} />

      {/* Cortinas */}
      <CurtainPanel side="left" open={curtainOpen} />
      <CurtainPanel side="right" open={curtainOpen} />

      {/* Estrellas decorativas */}
      <div style={{
        position: 'absolute', top: 60, left: 70, zIndex: 5,
        opacity: contentVisible ? 1 : 0, transition: 'opacity 400ms',
      }} className="lzm-wiggle">
        <Star size={42} fill="#FFD600" rotate={-15} />
      </div>
      <div style={{
        position: 'absolute', top: 80, right: 90, zIndex: 5,
        opacity: contentVisible ? 1 : 0, transition: 'opacity 400ms',
      }} className="lzm-spin-slow">
        <Star size={56} fill="#FFD600" rotate={12} />
      </div>
      <div style={{
        position: 'absolute', bottom: 100, left: 120, zIndex: 5,
        opacity: contentVisible ? 1 : 0, transition: 'opacity 400ms',
      }}>
        <Star size={22} fill="#fff" rotate={20} />
      </div>
      <div style={{
        position: 'absolute', bottom: 130, right: 140, zIndex: 5,
        opacity: contentVisible ? 1 : 0, transition: 'opacity 400ms',
      }}>
        <Star size={18} fill="#FDD835" rotate={35} />
      </div>

      {/* Logo central */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 6,
          willChange: 'transform, opacity',
        }}
      >
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

      {/* Badge + tagline */}
      <div style={{
        position: 'absolute', top: 'calc(50% + clamp(80px, 13vw, 130px))', left: 0, right: 0,
        zIndex: 6,
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
      <div style={{
        position: 'absolute', bottom: 28, left: 0, right: 0, zIndex: 6,
        textAlign: 'center',
        opacity: contentVisible ? 1 : 0, transition: 'opacity 300ms',
      }}>
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
