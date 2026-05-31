// HostsRow.jsx — equipo real con fotos individuales
function HostsRow() {
  return (
    <Section id="equipo" eyebrow="Los rostros del canal" title="Conoce al equipo" background="#fff">
      <style>{`
        @media (max-width: 600px) {
          .lzm-hosts-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 12px !important; }
          .lzm-hosts-grid .lzm-host-name { font-size: 20px !important; }
          .lzm-hosts-grid .lzm-host-role { font-size: 11px !important; }
          .lzm-hosts-grid .lzm-host-ig { font-size: 11px !important; }
        }
      `}</style>
      <div className="lzm-hosts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
        {LZM_DATA.hosts.map((h, i) => (
          <div key={h.id} className="lzm-card lzm-pop" style={{ overflow: 'hidden' }} data-aos="fade-up" data-aos-delay={i * 80}>
            {/* Foto real */}
            <div style={{ aspectRatio: '1 / 1', position: 'relative', background: h.bg, borderBottom: '3px solid #111', overflow: 'hidden' }}>
              <img
                src={`assets/hosts/${h.id}.jpg`}
                alt={h.name}
                loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                onError={(ev) => { ev.target.style.display = 'none'; }}
              />
              {/* Overlay sutil */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 60%)' }} />
            </div>

            <div style={{ padding: 14 }}>
              <div className="lzm-host-name" style={{ fontFamily: "'Bebas Neue'", fontSize: 26, lineHeight: 1, textTransform: 'uppercase' }}>{h.name}</div>
              <div className="lzm-host-role" style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 12, color: '#5B6479', marginTop: 4 }}>{h.role}</div>
              <a
                href={`https://instagram.com/${h.ig}`}
                target="_blank"
                rel="noreferrer"
                className="lzm-host-ig"
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
