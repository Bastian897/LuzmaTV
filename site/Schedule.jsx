// Schedule.jsx — weekly grilla
const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const SLOTS = [
  { time: '10:00', shows: ['Mañaneando','Mañaneando','Mañaneando','Mañaneando','Mañaneando', null, null], color: '#0055FF' },
  { time: '20:00', shows: [null, null, null, 'Cancha Abierta', null, null, null], color: '#43A047' },
  { time: '21:00', shows: [null, null, null, null, 'Fans en el Set', 'Cabros al Aire', 'Risa Limpia'], color: '#E53935' },
  { time: '22:00', shows: ['La Noche Luzma', null, 'La Noche Luzma', null, null, 'Gran Show Luzma', null], color: '#29B6F6' },
];

const SHOW_COLORS = {
  'Mañaneando': '#0055FF',
  'Cancha Abierta': '#43A047',
  'Fans en el Set': '#7B2CBF',
  'Cabros al Aire': '#E53935',
  'Risa Limpia': '#FFD600',
  'La Noche Luzma': '#29B6F6',
  'Gran Show Luzma': '#FDD835',
};

function Schedule() {
  return (
    <Section
      id="grilla"
      eyebrow="Programación de la semana"
      title="Grilla LuzmaTV"
      background="#F2F4FB"
    >
      <div
        style={{
          background: '#fff',
          border: '3px solid #111',
          borderRadius: 18,
          boxShadow: '8px 8px 0 #111',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '70px repeat(7, minmax(0, 1fr))',
          }}
        >
          <div style={{ borderBottom: '3px solid #111', background: '#111' }} />
          {DAYS.map((d) => (
            <div
              key={d}
              style={{
                padding: '12px 8px',
                background: '#111',
                color: '#FDD835',
                fontFamily: "'Montserrat'",
                fontWeight: 900,
                fontSize: 13,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                borderBottom: '3px solid #111',
              }}
            >
              {d}
            </div>
          ))}

          {SLOTS.map((slot, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  background: '#FDD835',
                  borderRight: '3px solid #111',
                  borderBottom: i === SLOTS.length - 1 ? '0' : '2px solid #111',
                  padding: '14px 6px',
                  fontFamily: "'Montserrat'",
                  fontWeight: 900,
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                {slot.time}
              </div>
              {slot.shows.map((s, j) => (
                <div
                  key={j}
                  style={{
                    minHeight: 70,
                    padding: 8,
                    background: s ? SHOW_COLORS[s] : '#fff',
                    borderRight: j < 6 ? '2px solid #111' : '0',
                    borderBottom: i === SLOTS.length - 1 ? '0' : '2px solid #111',
                    color: s && (SHOW_COLORS[s] === '#FDD835' || SHOW_COLORS[s] === '#FFD600') ? '#111' : (s ? '#fff' : '#111'),
                    fontFamily: "'Bebas Neue'",
                    fontSize: 14,
                    lineHeight: 1.05,
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  {s || ''}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
        {Object.entries(SHOW_COLORS).map(([name, c]) => (
          <span
            key={name}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Montserrat'",
              fontWeight: 700,
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '.04em',
            }}
          >
            <span style={{ width: 18, height: 18, background: c, border: '2.5px solid #111', borderRadius: 5 }} />
            {name}
          </span>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { Schedule });
