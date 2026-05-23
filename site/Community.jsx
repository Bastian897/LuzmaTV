// Community.jsx — check-in + newsletter + social wall
const { useState: useStateC, useEffect: useEffectC } = React;

function Community() {
  const [checkedIn, setCheckedIn] = useStateC(false);
  const [count, setCount] = useStateC(847);
  const [email, setEmail] = useStateC('');
  const [subscribed, setSubscribed] = useStateC(false);

  useEffectC(() => {
    try {
      const saved = localStorage.getItem('lzm-checkin');
      if (saved === '1') setCheckedIn(true);
      const c = localStorage.getItem('lzm-count');
      if (c) setCount(parseInt(c, 10));
    } catch {}
  }, []);

  const checkIn = () => {
    const next = !checkedIn;
    setCheckedIn(next);
    const newCount = count + (next ? 1 : -1);
    setCount(newCount);
    try {
      localStorage.setItem('lzm-checkin', next ? '1' : '0');
      localStorage.setItem('lzm-count', String(newCount));
    } catch {}
  };

  const subscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) setSubscribed(true);
  };

  const posts = [
    { user: '@sofi_94',     text: 'el live de anoche estuvo BRÍGIDO',        color: '#E91E8C', platform: 'tiktok',    likes: '1.2K' },
    { user: '@maca_p',      text: 'sigo a la familia luzma hace 2 años ❤️',   color: '#FDD835', platform: 'instagram', likes: '847' },
    { user: '@guatonpro',   text: 'mejor canal sin discusión',                color: '#43A047', platform: 'kick',      likes: '512' },
    { user: '@andreaT',     text: '#LaSeñalQueDejaHuella siempre arriba',     color: '#29B6F6', platform: 'tiktok',    likes: '2.4K' },
  ];

  return (
    <Section
      id="comunidad"
      eyebrow="La familia"
      title="Comunidad LuzmaTV"
      background="#fff"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 18,
          marginBottom: 24,
        }}
        className="lzm-community-top"
      >
        {/* Check-in */}
        <div
          className="lzm-card"
          style={{
            background: '#FDD835',
            padding: 26,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 18,
          }}
        >
          <div>
            <div className="lzm-section-eyebrow" style={{ color: '#111' }}>¿Estás viendo ahora?</div>
            <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 44, lineHeight: .95, textTransform: 'uppercase', margin: '6px 0 10px' }}>
              Haz check-in
            </h3>
            <p style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 15, color: '#2A2A2A', margin: 0 }}>
              Súmate al contador y aparece en el chat global.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button
              variant={checkedIn ? 'accent' : 'blue'}
              size="lg"
              onClick={checkIn}
            >
              {checkedIn ? <><Icon name="check" size={18} color="#fff" /> ¡Estoy viendo!</> : 'Hacer check-in'}
            </Button>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, lineHeight: 1, color: '#111' }}>
              {count.toLocaleString('es-CL')}
              <div style={{ fontFamily: "'Montserrat'", fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', marginTop: 2 }}>
                conectados
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div
          className="lzm-card"
          style={{
            background: '#0055FF',
            padding: 26,
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 18,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 16, right: 16 }} className="lzm-spin-slow">
            <Star size={48} fill="#FFD600" />
          </div>
          <div>
            <div className="lzm-section-eyebrow" style={{ color: '#FDD835' }}>Suscríbete</div>
            <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 44, lineHeight: .95, textTransform: 'uppercase', margin: '6px 0 10px', color: '#fff', textShadow: '3px 3px 0 #111' }}>
              No te pierdas nada
            </h3>
            <p style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 15, margin: 0 }}>
              Te avisamos cuando empieza el live y cuando hay invitado nuevo.
            </p>
          </div>
          {subscribed ? (
            <div
              style={{
                padding: '14px 18px',
                background: '#43A047',
                border: '3px solid #111',
                borderRadius: 9999,
                fontFamily: "'Montserrat'",
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '.06em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                alignSelf: 'flex-start',
              }}
            >
              <Icon name="check" size={18} color="#fff" /> ¡Listo, te tenemos!
            </div>
          ) : (
            <form onSubmit={subscribe} style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.cl"
                style={{
                  flex: 1,
                  fontFamily: "'Nunito'",
                  fontSize: 15,
                  padding: '12px 16px',
                  background: '#fff',
                  color: '#111',
                  border: '3px solid #111',
                  borderRadius: 9999,
                  outline: 'none',
                }}
              />
              <Button variant="primary" type="submit">Suscribirme</Button>
            </form>
          )}
        </div>
      </div>

      {/* Social wall */}
      <div>
        <div className="lzm-section-eyebrow">Wall de fans · <code style={{ background: 'transparent', border: 0, padding: 0, color: '#0055FF' }}>#LaSeñalQueDejaHuella</code></div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
            marginTop: 14,
          }}
        >
          {posts.map((p, i) => (
            <div
              key={i}
              className="lzm-card lzm-pop"
              style={{
                background: p.color,
                color: ['#FDD835', '#FFD600'].includes(p.color) ? '#111' : '#fff',
                padding: 18,
                minHeight: 150,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 16, lineHeight: 1.3 }}>
                "{p.text}"
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  <img src={`assets/platforms/${p.platform}.svg`} style={{ width: 20, height: 20, background: '#fff', border: '2px solid #111', borderRadius: 5, padding: 2 }} alt="" />
                  {p.user}
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 12 }}>
                  <Icon name="heart" size={14} /> {p.likes}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .lzm-community-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}

Object.assign(window, { Community });
