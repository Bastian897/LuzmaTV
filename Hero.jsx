// Hero.jsx
const { useEffect: useEffectStar, useRef: useRefStar } = React;

const Y_DELTAS = [-140, -100, -65, -30, 0, 30, 65, 100, 140];

function ShootingStar({ s, mobileHide }) {
  const ref = useRefStar(null);

  useEffectStar(() => {
    const el = ref.current;
    if (!el) return;
    let currentAnim = null;
    let fromRight = Math.random() < 0.5;
    let tid = null;

    function run() {
      const dy = Y_DELTAS[Math.floor(Math.random() * Y_DELTAS.length)];
      const sx = fromRight ? 'calc(100vw + 80px)' : '-80px';
      const ex = fromRight ? '-80px' : 'calc(100vw + 80px)';
      fromRight = !fromRight;

      currentAnim = el.animate([
        { transform: `translate(${sx}, 0px)`,    opacity: 0 },
        { transform: `translate(${sx}, 0px)`,    opacity: 0.9, offset: 0.08 },
        { transform: `translate(${ex}, ${dy}px)`, opacity: 0.9, offset: 0.92 },
        { transform: `translate(${ex}, ${dy}px)`, opacity: 0 },
      ], { duration: s.dur * 1000, easing: 'linear', fill: 'forwards' });

      currentAnim.onfinish = run;
    }

    tid = setTimeout(run, s.delay * 1000);
    return () => {
      clearTimeout(tid);
      if (currentAnim) { currentAnim.onfinish = null; currentAnim.cancel(); }
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={mobileHide ? 'lzm-shoot-mobile-hide' : ''}
      style={{
        position: 'absolute',
        top: s.top,
        left: 0,
        width: s.size,
        height: s.size,
        borderRadius: '50%',
        border: `3px solid ${s.color}`,
        boxShadow: `0 0 0 2px #fff, 0 0 26px 8px rgba(255,255,255,.45)`,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform, opacity',
      }}
    >
      <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
        <img src={s.img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    </div>
  );
}

const HERO_SOCIAL_URLS = {
  kick:      'https://kick.com/luzmatv',
  tiktok:    'https://www.tiktok.com/@luzmatv_oficial',
  instagram: 'https://www.instagram.com/luzma.tv/',
  twitch:    'https://twitch.tv/luzmatv',
  youtube:   'https://www.youtube.com/@luzmatvcl',
};

const SHOOT_STARS = [
  { img: 'assets/stars/ariel.webp',   name: 'Ariel',   dur: 5.0, delay: 0.0, top: '10%', size: 68, color: '#E91E8C' },
  { img: 'assets/stars/vicky.webp',   name: 'Vicky',   dur: 6.2, delay: 1.4, top: '58%', size: 62, color: '#FDD835' },
  { img: 'assets/stars/claudio.webp', name: 'Claudio', dur: 4.8, delay: 2.8, top: '28%', size: 66, color: '#43A047' },
  { img: 'assets/stars/lita.webp',    name: 'Lita',    dur: 5.8, delay: 0.6, top: '72%', size: 56, color: '#E53935' },
  { img: 'assets/stars/ignacio.webp', name: 'Ignacio', dur: 4.4, delay: 3.5, top: '42%', size: 64, color: '#7B2CBF' },
  { img: 'assets/stars/paty.webp',    name: 'Paty',    dur: 5.3, delay: 1.0, top: '63%', size: 70, color: '#FF7043' },
];

function Hero({ onWatch, onPrograms }) {
  return (
    <section id="inicio" className="lzm-halftone" style={{ position: 'relative', overflow: 'hidden', borderBottom: '4px solid #111' }}>
      <style>{`
        @media (max-width: 860px) {
          .lzm-hero-star-extra    { display: none !important; }
          .lzm-shoot-mobile-hide  { display: none !important; }
        }
      `}</style>

      {/* Estrellas fugaces */}
      {SHOOT_STARS.map((s, i) => (
        <ShootingStar key={s.name} s={s} mobileHide={i >= 4} />
      ))}

      {/* Estrellas decorativas siempre visibles */}
      <div style={{ position: 'absolute', top: 30,   right: 70  }} className="lzm-spin-slow"><Star size={88} fill="#FFD600" rotate={12} /></div>
      <div style={{ position: 'absolute', top: 220,  left: 60   }} className="lzm-wiggle"><Star size={42} fill="#FDD835" rotate={-15} /></div>
      <div style={{ position: 'absolute', bottom: 80, right: 200 }}><Star size={28} fill="#fff" rotate={20} /></div>
      <div style={{ position: 'absolute', top: 120,  right: 360 }}><Star size={18} fill="#fff" rotate={-8} /></div>
      {/* Estrellas solo desktop */}
      <div style={{ position: 'absolute', bottom: 50,  right: 90  }} className="lzm-wiggle lzm-hero-star-extra"><Star size={52} fill="#E91E8C" rotate={-20} /></div>
      <div style={{ position: 'absolute', top: 260,   right: 140 }} className="lzm-hero-star-extra"><Star size={22} fill="#fff" rotate={35} /></div>
      <div style={{ position: 'absolute', bottom: 180, right: 60  }} className="lzm-spin-slow lzm-hero-star-extra"><Star size={16} fill="#FDD835" rotate={0} /></div>
      <div style={{ position: 'absolute', top: 160,  right: 280 }} className="lzm-wiggle lzm-hero-star-extra"><Star size={72} fill="#fff" rotate={18} /></div>
      <div style={{ position: 'absolute', top: 400,  right: 320 }} className="lzm-wiggle lzm-hero-star-extra"><Star size={48} fill="#E91E8C" rotate={-22} /></div>

      <div className="lzm-shell" style={{ position: 'relative', zIndex: 2, padding: '64px 24px 96px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 24, animation: 'lzm-bounce-in 600ms cubic-bezier(.34,1.56,.64,1) both' }}>
          <img id="lzm-hero-logo" src="assets/luzmatv-logo.webp" alt="LuzmaTV"
            style={{ height: 'clamp(96px, 14vw, 160px)', border: '5px solid #111', borderRadius: 18, boxShadow: '10px 10px 0 #111', display: 'block' }} />
        </div>

        <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Pill color="#FDD835">⭐ Santiago, Chile</Pill>
          <Pill color="#fff">TV digital · streaming · TV Más</Pill>
        </div>

        <h1 className="lzm-comic-text"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(64px, 11vw, 144px)', lineHeight: .9, margin: 0, textTransform: 'uppercase', letterSpacing: '-.01em' }}>
          La señal<br />que deja huella
        </h1>

        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: '#fff', fontSize: 20, maxWidth: 560, margin: '28px 0 36px', textShadow: '2px 2px 0 #111' }}>
          Todo pasa en LuzmaTV - en vivo, sin filtros y con la energía de los cabros que están conectados desde Santiago hasta la última región.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button size="lg" variant="primary" onClick={onWatch}><Icon name="play" size={18} /> Ver en vivo</Button>
          <Button size="lg" variant="secondary" onClick={onPrograms}>Conoce los programas</Button>
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {['kick', 'tiktok', 'instagram', 'twitch', 'youtube'].map((p) => (
              <a key={p} href={HERO_SOCIAL_URLS[p]} target="_blank" rel="noreferrer"
                aria-label={p}
                className="lzm-pop"
                style={{ width: 44, height: 44, background: '#fff', border: '3px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 0 #111' }}>
                <span style={{
                  width: 22, height: 22, display: 'block', background: '#0055FF',
                  WebkitMaskImage: `url(assets/platforms/${p}-mask.svg)`, maskImage: `url(assets/platforms/${p}-mask.svg)`,
                  WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center', maskPosition: 'center',
                  WebkitMaskSize: 'contain', maskSize: 'contain',
                }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
