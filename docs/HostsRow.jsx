// HostsRow.jsx
const HOSTS = [
  { name: 'Lucho Rojas',   role: 'Conductor · La Noche',     bg: '#E91E8C', initials: 'LR', ig: 'luchotv',     sign: '🎙️' },
  { name: 'Cami Vergara',  role: 'Cabros al Aire',           bg: '#FDD835', initials: 'CV', ig: 'cami.luzma',  sign: '🎭' },
  { name: 'Pancho Garrido',role: 'Invitados del Día',        bg: '#43A047', initials: 'PG', ig: 'pancho_g',    sign: '🎤' },
  { name: 'Maca Pino',     role: 'Mañaneando',               bg: '#29B6F6', initials: 'MP', ig: 'macapino',    sign: '☕' },
  { name: 'Tati Espinoza', role: 'Risa Limpia',              bg: '#E53935', initials: 'TE', ig: 'taticomedia', sign: '🤣' },
];

function HostsRow() {
  return (
    <Section
      id="equipo"
      eyebrow="Los rostros del canal"
      title="Conoce al equipo"
      background="#fff"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 18,
        }}
      >
        {HOSTS.map((h) => (
          <div key={h.name} className="lzm-card lzm-pop">
            <div
              style={{
                aspectRatio: '1 / 1',
                background: h.bg,
                borderBottom: '3px solid #111',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Black Ops One'",
                  fontSize: 90,
                  color: '#fff',
                  WebkitTextStroke: '3px #111',
                  textShadow: '4px 4px 0 #111',
                  lineHeight: 1,
                  filter: h.bg === '#FDD835' ? 'invert(1)' : 'none',
                }}
              >
                {h.initials}
              </div>
              <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 28, filter: 'drop-shadow(2px 2px 0 #111)' }}>{h.sign}</div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 26, lineHeight: 1, textTransform: 'uppercase' }}>{h.name}</div>
              <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 12, color: '#5B6479', marginTop: 4 }}>{h.role}</div>
              <a
                href={`https://instagram.com/${h.ig}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 10,
                  fontFamily: "'Montserrat'",
                  fontWeight: 800,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: '#0055FF',
                }}
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
