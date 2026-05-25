// Hero.jsx
const HERO_SOCIAL_URLS = {
  kick:      'https://kick.com/luzmatv',
  tiktok:    'https://tiktok.com/@luzmatv',
  instagram: 'https://instagram.com/luzmatv',
  twitch:    'https://twitch.tv/luzmatv',
  youtube:   'https://youtube.com/@luzmatv',
};

function Hero({ onWatch, onPrograms }) {
  return (
    <section id="inicio" className="lzm-halftone" style={{ position: 'relative', overflow: 'hidden', borderBottom: '4px solid #111' }}>
      <div style={{ position: 'absolute', top: 30,   right: 70  }} className="lzm-spin-slow"><Star size={88} fill="#FFD600" rotate={12} /></div>
      <div style={{ position: 'absolute', top: 220,  left: 60   }} className="lzm-wiggle"><Star size={42} fill="#FDD835" rotate={-15} /></div>
      <div style={{ position: 'absolute', bottom: 80, right: 200 }}><Star size={28} fill="#fff" rotate={20} /></div>
      <div style={{ position: 'absolute', top: 120,  right: 360 }}><Star size={18} fill="#fff" rotate={-8} /></div>
      {/* Estrellas lado derecho adicionales */}
      <div style={{ position: 'absolute', bottom: 50,  right: 90  }} className="lzm-wiggle"><Star size={52} fill="#E91E8C" rotate={-20} /></div>
      <div style={{ position: 'absolute', top: 260,   right: 140 }}><Star size={22} fill="#fff" rotate={35} /></div>
      <div style={{ position: 'absolute', bottom: 180, right: 60  }} className="lzm-spin-slow"><Star size={16} fill="#FDD835" rotate={0} /></div>

      <div className="lzm-shell" style={{ position: 'relative', padding: '64px 24px 96px', maxWidth: 1100 }}>
        <div style={{ marginBottom: 24, animation: 'lzm-bounce-in 600ms cubic-bezier(.34,1.56,.64,1) both' }}>
          <img src="assets/luzmatv-logo.png" alt="LuzmaTV"
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
          Todo pasa en LuzmaTV — en vivo, sin filtros y con la energía de los cabros que están conectados desde Santiago hasta la última región.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button size="lg" variant="primary" onClick={onWatch}><Icon name="play" size={18} /> Ver en vivo</Button>
          <Button size="lg" variant="secondary" onClick={onPrograms}>Conoce los programas</Button>
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {['kick', 'tiktok', 'instagram', 'twitch', 'youtube'].map((p) => (
              <a key={p} href={HERO_SOCIAL_URLS[p]} target="_blank" rel="noreferrer"
                className="lzm-pop"
                style={{ width: 44, height: 44, background: '#fff', border: '3px solid #111', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 0 #111' }}>
                <img src={`assets/platforms/${p}.svg`} style={{ width: 22, height: 22 }} alt={p} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
