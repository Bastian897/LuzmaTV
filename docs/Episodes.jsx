// Episodes.jsx — carrusel de episodios con miniaturas reales de YouTube
function Episodes() {
  return (
    <Section
      id="episodios"
      eyebrow="Recién salido"
      title="Últimos episodios"
      background="#fff"
      action={
        <Button variant="ghost" size="sm" as="a" href="#/programa/luzma-cachai">
          Ver todos <Icon name="chevronRight" size={14} />
        </Button>
      }
    >
      <div className="lzm-carousel-wrap">
      <div className="lzm-scroll-x">
        {LZM_DATA.episodes.map((e, i) => {
          const prog = LZM_DATA.programs.find((p) => p.id === e.programId);
          return (
            <a
              key={e.id}
              href={`#/episodio/${e.id}`}
              className="lzm-pop lzm-card"
              style={{ display: 'block', flex: '0 0 300px' }}
            >
              {/* Miniatura real de YouTube */}
              <div style={{ position: 'relative', aspectRatio: '16 / 9', background: `linear-gradient(135deg, ${e.color} 0%, #0A0F2C 130%)`, borderBottom: '3px solid #111', overflow: 'hidden' }}>
                {e.youtubeId && (
                  <img
                    src={`https://img.youtube.com/vi/${e.youtubeId}/maxresdefault.jpg`}
                    alt={e.title}
                    loading="lazy"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(ev) => { ev.target.style.display = 'none'; }}
                  />
                )}
                {/* Overlay con botón play */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 56, height: 56, background: '#FDD835', border: '3px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 0 #111' }}>
                    <Icon name="play" size={22} color="#111" fill="#111" />
                  </div>
                </div>
                {e.isNew && (
                  <span style={{ position: 'absolute', top: 10, left: 10 }}>
                    <Pill color="#FFD600" size="xs">⭐ NUEVO</Pill>
                  </span>
                )}
                <span style={{ position: 'absolute', bottom: 10, right: 10, padding: '3px 8px', background: 'rgba(0,0,0,.8)', color: '#fff', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, borderRadius: 5 }}>
                  {e.duration}
                </span>
              </div>

              <div style={{ padding: 14 }}>
                <div style={{ fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: prog?.color || e.color, marginBottom: 4 }}>
                  {prog?.name || ''}
                </div>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: '#111', lineHeight: 1.25 }}>{e.title}</div>
                <div style={{ marginTop: 8, fontFamily: "'Nunito'", fontSize: 12, color: '#5B6479' }}>
                  {e.views !== '—' ? `${e.views} visualizaciones · ` : ''}{e.duration}
                </div>
              </div>
            </a>
          );
        })}
      </div>
      </div>
    </Section>
  );
}

Object.assign(window, { Episodes });
