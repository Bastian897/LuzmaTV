// HostsRow.jsx — equipo real con fotos individuales
function HostsRow() {
  return (
    <Section id="equipo" eyebrow="Los rostros del canal" title="Conoce al equipo" background="#fff">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
        {LZM_DATA.hosts.map((h) => (
          <div key={h.id} className="lzm-card lzm-pop" style={{ overflow: 'hidden' }}>
            {/* Foto real */}
            <div style={{ aspectRatio: '1 / 1', position: 'relative', background: h.bg, borderBottom: '3px solid #111', overflow: 'hidden' }}>
              <img
                src={`assets/hosts/${h.id}.jpg`}
                alt={h.name}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                onError={(ev) => { ev.target.style.display = 'none'; }}
              />
              {/* Overlay sutil */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 24, filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,.5))' }}>{h.sign}</div>
            </div>

            <div style={{ padding: 14 }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 26, lineHeight: 1, textTransform: 'uppercase' }}>{h.name}</div>
              <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 12, color: '#5B6479', marginTop: 4 }}>{h.role}</div>
              <a
                href={`https://instagram.com/${h.ig}`}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 12, textTransform: 'uppercase', color: '#0055FF' }}
              >
                <img src="assets/platforms/instagram.svg" style={{ width: 16, height: 16 }} alt="" />
                @{h.ig}
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { HostsRow });
