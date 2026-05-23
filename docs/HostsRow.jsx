// HostsRow.jsx — equipo real con miniaturas de YouTube
const HOST_THUMBS = {
  'ariel-osses':    'AD7V3krg4fQ',
  'vicky-more':     '3EJyGwxkL-A',
  'rodrigo-munoz':  'FlnoNezQY-U',
  'claudio-merlin': 'fyneTgOGiJI',
  'lita-melo':      'sFbg0BpbzIY',
};

function HostsRow() {
  return (
    <Section id="equipo" eyebrow="Los rostros del canal" title="Conoce al equipo" background="#fff">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
        {LZM_DATA.hosts.map((h) => {
          const thumbId = HOST_THUMBS[h.id];
          return (
            <div key={h.id} className="lzm-card lzm-pop" style={{ overflow: 'hidden' }}>
              {/* Foto real del episodio */}
              <div style={{ aspectRatio: '1 / 1', position: 'relative', background: h.bg, borderBottom: '3px solid #111', overflow: 'hidden' }}>
                {thumbId && (
                  <img
                    src={`https://img.youtube.com/vi/${thumbId}/maxresdefault.jpg`}
                    alt={h.name}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(ev) => { ev.target.style.display = 'none'; }}
                  />
                )}
                {/* Overlay degradado en la parte inferior */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 24, filter: 'drop-shadow(2px 2px 0 #111)' }}>{h.sign}</div>
              </div>

              <div style={{ padding: 14 }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 26, lineHeight: 1, textTransform: 'uppercase' }}>{h.name}</div>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 12, color: '#5B6479', marginTop: 4 }}>{h.role}</div>
                <a
                  href="https://www.youtube.com/@luzmatvcl"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 12, textTransform: 'uppercase', color: '#E91E8C' }}
                >
                  <img src="assets/platforms/youtube.svg" style={{ width: 16, height: 16 }} alt="" />
                  Ver en YouTube
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

Object.assign(window, { HostsRow });
