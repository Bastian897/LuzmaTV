// Community.jsx — social wall

function Community() {
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
    </Section>
  );
}

Object.assign(window, { Community });
