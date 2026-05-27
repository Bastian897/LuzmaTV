// Schedule.jsx — grilla de programación real
const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const SLOTS = [
  {
    time: '10:00\n12:00',
    shows: ['Luzma Cachai', 'Luzma Cachai', 'Luzma Cachai', 'Luzma Cachai', 'Luzma Cachai', null, null],
  },
  {
    time: '18:00\ntarde',
    shows: [null, 'Frente a Frente', null, 'Frente a Frente', null, null, null],
  },
];

const SHOW_COLORS = { 'Luzma Cachai': '#E91E8C', 'Frente a Frente': '#7B2CBF' };

function Schedule() {
  return (
    <Section id="grilla" eyebrow="Programación de la semana" title="Grilla LuzmaTV" background="#F2F4FB">
      <div style={{ background: '#fff', border: '3px solid #111', borderRadius: 18, boxShadow: '8px 8px 0 #111', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(7, minmax(0, 1fr))' }}>
          {/* Header */}
          <div style={{ borderBottom: '3px solid #111', background: '#111' }} />
          {DAYS.map((d) => (
            <div key={d} style={{ padding: '12px 8px', background: '#111', color: '#FDD835', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 13, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '.08em', borderBottom: '3px solid #111' }}>
              {d}
            </div>
          ))}

          {/* Filas */}
          {SLOTS.map((slot, i) => (
            <React.Fragment key={i}>
              <div style={{ background: '#FDD835', borderRight: '3px solid #111', padding: '18px 6px', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 12, textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.4 }}>
                {slot.time}
              </div>
              {slot.shows.map((s, j) => (
                <div key={j} style={{
                  minHeight: 90,
                  padding: 10,
                  background: s ? SHOW_COLORS[s] : '#fff',
                  borderRight: j < 6 ? '2px solid #111' : '0',
                  color: '#fff',
                  fontFamily: "'Bebas Neue'",
                  fontSize: 15,
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                  {s || ''}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Nota de horario */}
      <div style={{ marginTop: 20, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Montserrat'", fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.04em' }}>
          <span style={{ width: 18, height: 18, background: '#E91E8C', border: '2.5px solid #111', borderRadius: 5 }} />
          Luzma Cachai — Lun a Vie · 10:00 a 12:00 hs
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Montserrat'", fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.04em' }}>
          <span style={{ width: 18, height: 18, background: '#7B2CBF', border: '2.5px solid #111', borderRadius: 5 }} />
          Frente a Frente — Mar y Jue · tarde
        </span>
      </div>
    </Section>
  );
}

Object.assign(window, { Schedule });
