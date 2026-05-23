// Programs.jsx — filterable program grid
const { useState: useStatePrg } = React;

const PROGRAMS = [
  { name: 'La Noche Luzma',     cat: 'talk',     day: 'Lun & Mié', time: '22:00', desc: 'Talk show con los invitados que mueven la noche.',     color: '#29B6F6', emoji: '🎙️' },
  { name: 'Cabros al Aire',     cat: 'humor',    day: 'Sábados',   time: '21:30', desc: 'Humor a la chilena, sin filtros, con la patota.',       color: '#E53935', emoji: '🎭', isNew: true },
  { name: 'Invitados del Día',  cat: 'invitado', day: 'Miércoles', time: '20:00', desc: 'Una hora con un invitado distinto cada semana.',        color: '#E91E8C', emoji: '🎤' },
  { name: 'Cancha Abierta',     cat: 'entret',   day: 'Jueves',    time: '20:00', desc: 'Análisis liviano de lo que pasa en la cancha.',         color: '#43A047', emoji: '⚽' },
  { name: 'Gran Show Luzma',    cat: 'entret',   day: 'Sábado',    time: '22:00', desc: 'El bloque familiar de la semana, en vivo.',             color: '#FDD835', emoji: '🎉' },
  { name: 'Mañaneando',         cat: 'talk',     day: 'L–V',       time: '10:00', desc: 'Lo que tienes que saber del día, con onda.',            color: '#0055FF', emoji: '☕' },
  { name: 'Risa Limpia',        cat: 'humor',    day: 'Domingos',  time: '21:00', desc: 'Stand-up chileno, una rotación distinta cada semana.',  color: '#FFD600', emoji: '🤣' },
  { name: 'Fans en el Set',     cat: 'invitado', day: 'Viernes',   time: '21:00', desc: 'Sube un fan al set, gana premios, hace papelones.',     color: '#7B2CBF', emoji: '🌟' },
];

const CATEGORIES = [
  { id: 'all',      label: 'Todos',           color: '#0055FF' },
  { id: 'talk',     label: 'Talk Show',       color: '#29B6F6' },
  { id: 'humor',    label: 'Humor',           color: '#E53935' },
  { id: 'entret',   label: 'Entretenimiento', color: '#FDD835' },
  { id: 'invitado', label: 'Invitados',       color: '#E91E8C' },
];

function Programs() {
  const [cat, setCat] = useStatePrg('all');
  const list = cat === 'all' ? PROGRAMS : PROGRAMS.filter((p) => p.cat === cat);

  return (
    <Section id="programas" eyebrow="Nuestra Familia" title="Programas de la casa" background="#FFF8E7">
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            style={{
              fontFamily: "'Montserrat'",
              fontWeight: 900,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '.06em',
              padding: '10px 18px',
              background: cat === c.id ? c.color : '#fff',
              color: cat === c.id && c.color === '#FDD835' ? '#111' : (cat === c.id ? '#fff' : '#111'),
              border: '3px solid #111',
              borderRadius: 9999,
              boxShadow: cat === c.id ? '5px 5px 0 #111' : '3px 3px 0 #111',
              cursor: 'pointer',
              transition: 'all 160ms cubic-bezier(.34,1.56,.64,1)',
              transform: cat === c.id ? 'translate(-2px,-2px)' : 'none',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 18,
        }}
      >
        {list.map((p) => (
          <div key={p.name} className="lzm-pop lzm-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 3',
                background: p.color,
                borderBottom: '3px solid #111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 72,
              }}
            >
              <span style={{ filter: 'drop-shadow(3px 3px 0 #111)' }}>{p.emoji}</span>
              {p.isNew && (
                <span style={{ position: 'absolute', top: 10, left: 10 }}>
                  <Pill color="#FFD600">⭐ NUEVO</Pill>
                </span>
              )}
              <span style={{ position: 'absolute', bottom: 10, right: 10 }}>
                <Pill color="#fff" size="xs">{p.time}</Pill>
              </span>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, lineHeight: 1, textTransform: 'uppercase' }}>{p.name}</div>
              <div style={{ fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: '#5B6479' }}>
                {p.day}
              </div>
              <div style={{ fontFamily: "'Nunito'", fontSize: 13, color: '#2A2A2A', marginTop: 4, flex: 1 }}>{p.desc}</div>
              <button
                style={{
                  marginTop: 10,
                  alignSelf: 'flex-start',
                  fontFamily: "'Montserrat'",
                  fontWeight: 900,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '.08em',
                  background: '#111',
                  color: '#FDD835',
                  border: '2.5px solid #111',
                  borderRadius: 9999,
                  padding: '7px 14px',
                  cursor: 'pointer',
                }}
              >
                Ver episodios →
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { Programs });
