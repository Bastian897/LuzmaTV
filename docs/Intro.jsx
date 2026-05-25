// Intro.jsx — splash screen al entrar al sitio
const { useState: useStateIntro, useEffect: useEffectIntro } = React;

function Intro({ onDone }) {
  const [exiting, setExiting] = useStateIntro(false);

  useEffectIntro(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1300);
    const doneTimer = setTimeout(() => onDone(), 1900);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, []);

  const skip = () => {
    setExiting(true);
    setTimeout(onDone, 600);
  };

  return (
    <div
      onClick={skip}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: '#0A0F2C',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.09) 1.5px, transparent 2px)',
        backgroundSize: '22px 22px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 600ms ease-out' : 'none',
      }}
    >
      {/* Estrellas decorativas */}
      <div style={{ position: 'absolute', top: 52, right: 80 }} className="lzm-spin-slow">
        <Star size={68} fill="#FFD600" rotate={12} />
      </div>
      <div style={{ position: 'absolute', bottom: 70, left: 80 }} className="lzm-wiggle">
        <Star size={38} fill="#E91E8C" rotate={-15} />
      </div>
      <div style={{ position: 'absolute', top: 130, left: 130 }}>
        <Star size={20} fill="#fff" rotate={20} />
      </div>
      <div style={{ position: 'absolute', bottom: 140, right: 160 }}>
        <Star size={16} fill="#FDD835" rotate={35} />
      </div>

      {/* Logo rebotando desde arriba */}
      <div style={{ animation: 'lzm-intro-logo 580ms cubic-bezier(.34,1.56,.64,1) both' }}>
        <img
          src="assets/luzmatv-logo.png"
          alt="LuzmaTV"
          style={{
            height: 'clamp(110px, 22vw, 190px)',
            display: 'block',
            border: '5px solid #111',
            borderRadius: 22,
            boxShadow: '12px 12px 0 #111',
          }}
        />
      </div>

      {/* Badge EN VIVO */}
      <div style={{ marginTop: 28, animation: 'lzm-intro-up 380ms 580ms cubic-bezier(.34,1.56,.64,1) both' }}>
        <LiveBadge size="md" />
      </div>

      {/* Tagline */}
      <div style={{
        marginTop: 14,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(18px, 3vw, 26px)',
        color: '#FDD835',
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        textShadow: '2px 2px 0 #111',
        animation: 'lzm-intro-up 380ms 820ms cubic-bezier(.34,1.56,.64,1) both',
      }}>
        La señal que deja huella
      </div>

      {/* Hint toca para saltar */}
      <div style={{
        position: 'absolute', bottom: 28,
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 700, fontSize: 10,
        textTransform: 'uppercase', letterSpacing: '.14em',
        color: 'rgba(255,255,255,.28)',
        animation: 'lzm-intro-up 380ms 1100ms ease both',
      }}>
        Toca para continuar
      </div>
    </div>
  );
}

Object.assign(window, { Intro });
