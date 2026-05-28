// Platforms.jsx — "¿Cómo vernos?"
function Platforms() {
  const tiles = [
    { slug: 'kick',      name: 'Kick',      handle: '@luzmatv',      url: 'https://kick.com/luzmatv',        bg: '#53FC18', fg: '#000', tag: 'Streams diarios' },
    { slug: 'twitch',    name: 'Twitch',    handle: '/luzmatv',      url: 'https://twitch.tv/luzmatv',       bg: '#9146FF', fg: '#fff', tag: 'Streams diarios' },
    { slug: 'tiktok',    name: 'TikTok',    handle: '@luzmatv',      url: 'https://tiktok.com/@luzmatv',     bg: '#111',    fg: '#fff', tag: '+100k seguidores' },
    { slug: 'instagram', name: 'Instagram', handle: '@luzmatv',      url: 'https://instagram.com/luzmatv',   bg: 'linear-gradient(135deg,#FFD600 0%,#E91E8C 50%,#7B2CBF 100%)', fg: '#fff', tag: 'Stories diarias' },
    { slug: 'youtube',   name: 'YouTube',   handle: 'próximamente',  url: 'https://youtube.com/@luzmatv',    bg: '#FF0000', fg: '#fff', tag: 'Episodios completos' },
    { slug: 'tvmas',     name: 'TV Más',    handle: 'Canal abierto', url: 'https://tvmas.cl',                bg: '#111', fg: '#FFD600', tag: 'Lun a Vie · 22hs' },
  ];

  return (
    <Section
      id="vernos"
      eyebrow="¿Dónde vernos?"
      title="Elige tu plataforma"
      background="#fff"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 18,
        }}
      >
        {tiles.map((t) => (
          <a
            key={t.slug}
            href={t.url}
            target="_blank"
            rel="noreferrer"
            className="lzm-pop"
            style={{
              background: t.bg,
              border: '3px solid #111',
              borderRadius: 18,
              boxShadow: '6px 6px 0 #111',
              padding: 22,
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: t.fg,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <img src={`assets/platforms/${t.slug}.svg`} alt={t.name} style={{ width: 44, height: 44, background: '#fff', border: '2.5px solid #111', borderRadius: 10, padding: 4 }} />
              <Icon name="chevronRight" size={22} color={t.fg} />
            </div>
            <div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 38, lineHeight: 1, textTransform: 'uppercase' }}>
                {t.name}
              </div>
              <div style={{ fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 4, opacity: .9 }}>
                {t.handle}
              </div>
              <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 13, marginTop: 8 }}>
                {t.tag}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { Platforms });
