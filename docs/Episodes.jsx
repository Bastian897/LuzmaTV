// Episodes.jsx — carrusel de episodios
function Episodes() {
  return (
    <Section
      id="episodios"
      eyebrow="Recién salido"
      title="Últimos episodios"
      background="#fff"
      action={
        <Button variant="ghost" size="sm" as="a" href="#episodios">
          Ver todos <Icon name="chevronRight" size={14} />
        </Button>
      }
    >
      <div className="lzm-scroll-x">
        {LZM_DATA.episodes.map((e) => (
          <a
            key={e.id}
            href={`#/episodio/${e.id}`}
            className="lzm-pop lzm-card"
            style={{ display: 'block', flex: '0 0 300px' }}
          >
            <div style={{
              aspectRatio: '16 / 9',
              background: `linear-gradient(135deg, ${e.color} 0%, #0A0F2C 130%)`,
              borderBottom: '3px solid #111',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ width: 60, height: 60, background: '#FDD835', border: '3px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 0 #111' }}>
                <Icon name="play" size={24} color="#111" fill="#111" />
              </div>
              {e.isNew && (
                <span style={{ position: 'absolute', top: 10, left: 10 }}>
                  <Pill color="#FFD600" size="xs">⭐ NUEVO</Pill>
                </span>
              )}
              <span style={{ position: 'absolute', bottom: 10, right: 10, padding: '3px 8px', background: '#111', color: '#fff', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, borderRadius: 5 }}>
                {e.duration}
              </span>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: e.color, marginBottom: 4 }}>
                {LZM_DATA.programs.find((p) => p.id === e.programId)?.name || ''}
              </div>
              <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: '#111', lineHeight: 1.25 }}>{e.title}</div>
              <div style={{ marginTop: 8, fontFamily: "'Nunito'", fontSize: 12, color: '#5B6479' }}>
                {e.views} visualizaciones · {e.duration}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { Episodes });
