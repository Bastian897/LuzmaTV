// Intro.jsx — cortinas de teatro con pliegues animados (efecto tela real)
const { useState: useStateIntro, useEffect: useEffectIntro, useRef: useRefIntro } = React;

function CurtainPanel({ side, open }) {
  const PLEATS = 16;
  const isLeft = side === 'left';

  // Pleats alternan color para que se vean los pliegues incluso quietos
  const darkBand = 'linear-gradient(90deg, #2a0408 0%, #3a0510 50%, #2a0408 100%)';
  const lightBand = 'linear-gradient(90deg, #5a0e1c 0%, #7a1828 50%, #5a0e1c 100%)';

  return (
    <div style={{
      position: 'absolute', top: 0, bottom: 0, [side]: 0, width: '52%',
      overflow: 'visible', pointerEvents: 'none',
    }}>
      {Array.from({ length: PLEATS }).map((_, i) => {
        // Para cortina izquierda: el pliegue mas a la derecha (junto al borde interno) abre primero.
        // Para cortina derecha: el pliegue mas a la izquierda abre primero.
        const orderFromInner = isLeft ? (PLEATS - 1 - i) : i;
        const delay = orderFromInner * 38;
        const dark = i % 2 === 0;

        return (
          <div key={i} style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: `${(i / PLEATS) * 100}%`,
            width: `${(100 / PLEATS) + 0.5}%`,
            backgroundImage: dark ? darkBand : lightBand,
            // Sombreado vertical superior/inferior para profundidad
            boxShadow: 'inset 0 18px 24px rgba(0,0,0,.45), inset 0 -22px 30px rgba(0,0,0,.55)',
            transformOrigin: isLeft ? '0% 0%' : '100% 0%',
            transform: open
              ? `translateX(${isLeft ? '-100%' : '100%'}) scaleX(0.08) skewY(${isLeft ? 1.8 : -1.8}deg)`
              : 'translateX(0) scaleX(1) skewY(0deg)',
            transition: `transform 820ms cubic-bezier(.55,0,.2,1) ${delay}ms`,
            willChange: 'transform',
            zIndex: dark ? 1 : 2,
          }} />
        );
      })}

      {/* Sombra del borde interno (donde se juntan las dos cortinas) */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        [isLeft ? 'right' : 'left']: 0, width: 50,
        background: isLeft
          ? 'linear-gradient(to left, rgba(0,0,0,.7), rgba(0,0,0,0))'
          : 'linear-gradient(to right, rgba(0,0,0,.7), rgba(0,0,0,0))',
        zIndex: 3, pointerEvents: 'none',
        opacity: open ? 0 : 1,
        transition: 'opacity 400ms ease',
      }} />
    </div>
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

    // Liberar scroll al cerrar
    setTimeout(() => { document.body.style.overflow = ''; }, 1500);

    const el = logoRef.current;
    if (!el) { setTimeout(onDone, 1500); return; }

    void el.offsetHeight;
    el.style.transition = 'transform 880ms cubic-bezier(.77,0,.18,1), opacity 460ms 320ms';

    const heroLogo = document.getElementById('lzm-hero-logo');
    if (heroLogo) {
      heroLogo.style.opacity = '0';
      setTimeout(() => {
        heroLogo.style.transition = 'opacity 350ms';
        heroLogo.style.opacity = '1';
      }, 800);

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

    setTimeout(onDone, 1500);
  }

  return (
    <div
      onClick={startExit}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, cursor: 'pointer',
        background: 'transparent',
      }}
    >
      {/* Riel dorado superior — span completo, no se mueve */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 22, zIndex: 4,
        background: 'linear-gradient(180deg, #FFE680 0%, #FFD600 30%, #C99700 70%, #8a6700 100%)',
        borderBottom: '4px solid #111',
        boxShadow: '0 4px 14px rgba(0,0,0,.5)',
      }} />

      {/* Cortinas con pliegues animados */}
      <CurtainPanel side="left" open={curtainOpen} />
      <CurtainPanel side="right" open={curtainOpen} />

      {/* Estrellas decorativas (encima de las cortinas) */}
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

      {/* Logo central — wrapper centrado, inner anima */}
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
