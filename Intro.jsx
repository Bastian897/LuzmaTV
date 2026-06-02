// Intro.jsx — video real de cortinas + logo/contenido overlay
const { useState: useStateIntro, useEffect: useEffectIntro, useRef: useRefIntro } = React;

function Intro({ onDone }) {
  const exitStarted = useRefIntro(false);
  const logoRef = useRefIntro(null);
  const videoRef = useRefIntro(null);
  const [contentVisible, setContentVisible] = useStateIntro(true);
  const [overlayFading, setOverlayFading] = useStateIntro(false);

  useEffectIntro(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Si por alguna razon el video falla / es bloqueado, fallback timeout
    const fallback = setTimeout(startExit, 4000);

    return () => {
      clearTimeout(fallback);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  function startExit() {
    if (exitStarted.current) return;
    exitStarted.current = true;

    setContentVisible(false);

    // Liberar scroll inmediato
    setTimeout(() => { document.body.style.overflow = ''; }, 350);

    const el = logoRef.current;
    if (!el) {
      setOverlayFading(true);
      setTimeout(onDone, 280);
      return;
    }

    void el.offsetHeight;
    // Animaciones mas rapidas: logo viaja y fade simultaneo, sin esperas
    el.style.transition = 'transform 480ms cubic-bezier(.77,0,.18,1), opacity 280ms 100ms';

    const heroLogo = document.getElementById('lzm-hero-logo');
    if (heroLogo) {
      heroLogo.style.opacity = '0';
      setTimeout(() => {
        heroLogo.style.transition = 'opacity 250ms';
        heroLogo.style.opacity = '1';
      }, 380);

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

    // Fade del backdrop arranca casi inmediato
    setTimeout(() => setOverlayFading(true), 60);

    setTimeout(onDone, 560);
  }

  // Trigger exit cuando faltan ~0.2s para que termine el video (cortinas ya abiertas)
  function onTimeUpdate(e) {
    if (exitStarted.current) return;
    const v = e.target;
    if (v && v.duration && v.currentTime >= v.duration - 0.25) {
      startExit();
    }
  }

  function onVideoEnded() {
    startExit();
  }

  // Si el usuario clickea, saltamos
  function skip() {
    if (videoRef.current) {
      try { videoRef.current.pause(); } catch (e) {}
    }
    startExit();
  }

  return (
    <div
      onClick={skip}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, cursor: 'pointer',
        backgroundColor: '#000',
        opacity: overlayFading ? 0 : 1,
        transition: 'opacity 320ms ease-out',
        overflow: 'hidden',
      }}
    >
      {/* Video de cortinas */}
      <video
        ref={videoRef}
        src="assets/curtain.webm"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={onTimeUpdate}
        onEnded={onVideoEnded}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          pointerEvents: 'none',
        }}
      />

      {/* Estrellas decorativas — encima del video */}
      <div style={{
        position: 'absolute', top: 60, left: 70, zIndex: 3,
        opacity: contentVisible ? 1 : 0, transition: 'opacity 400ms',
      }} className="lzm-wiggle">
        <Star size={42} fill="#FFD600" rotate={-15} />
      </div>
      <div style={{
        position: 'absolute', top: 80, right: 90, zIndex: 3,
        opacity: contentVisible ? 1 : 0, transition: 'opacity 400ms',
      }} className="lzm-spin-slow">
        <Star size={56} fill="#FFD600" rotate={12} />
      </div>
      <div style={{
        position: 'absolute', bottom: 120, left: 130, zIndex: 3,
        opacity: contentVisible ? 1 : 0, transition: 'opacity 400ms',
      }}>
        <Star size={22} fill="#fff" rotate={20} />
      </div>
      <div style={{
        position: 'absolute', bottom: 150, right: 140, zIndex: 3,
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
          zIndex: 4,
          willChange: 'transform, opacity',
        }}
      >
        <div style={{ animation: 'lzm-intro-logo 580ms cubic-bezier(.34,1.56,.64,1) both' }}>
          <img
            src="assets/luzmatv-logo.webp"
            alt="LuzmaTV"
            style={{
              height: 'clamp(110px, 22vw, 190px)', display: 'block',
              border: '5px solid #111', borderRadius: 22, boxShadow: '12px 12px 0 #111',
            }}
          />
        </div>
      </div>

      {/* Badge + tagline debajo del logo */}
      <div style={{
        position: 'absolute', top: 'calc(50% + clamp(80px, 13vw, 130px))', left: 0, right: 0,
        zIndex: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: contentVisible ? 1 : 0,
        transition: 'opacity 300ms',
        pointerEvents: 'none',
      }}>
        <div style={{ animation: 'lzm-intro-up 380ms 700ms cubic-bezier(.34,1.56,.64,1) both' }}>
          <LiveBadge size="md" />
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(18px, 3vw, 26px)',
          color: '#FFD600', letterSpacing: '.14em', textTransform: 'uppercase', textShadow: '2px 2px 0 #111',
          animation: 'lzm-intro-up 380ms 940ms cubic-bezier(.34,1.56,.64,1) both',
        }}>
          La señal que deja huella
        </div>
      </div>

      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: 28, left: 0, right: 0, zIndex: 4,
        textAlign: 'center',
        opacity: contentVisible ? 1 : 0, transition: 'opacity 300ms',
      }}>
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 10,
          textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,.7)',
          animation: 'lzm-intro-up 380ms 1200ms ease both',
        }}>
          Toca para saltar
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Intro });
