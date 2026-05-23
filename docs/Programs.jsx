// Programs.jsx — grilla de programas filtrable
const { useState: useStatePrg } = React;

const CATEGORIES = [
  { id: 'all',      label: 'Todos',           color: '#0055FF' },
  { id: 'talk',     label: 'Talk Show',       color: '#29B6F6' },
  { id: 'humor',    label: 'Humor',           color: '#E53935' },
  { id: 'entret',   label: 'Entretenimiento', color: '#FDD835' },
  { id: 'invitado', label: 'Invitados',       color: '#E91E8C' },
];

function Programs() {
  const [cat, setCat] = useStatePrg('all');
  const list = cat === 'all' ? LZM_DATA.programs : LZM_DATA.programs.filter((p) => p.cat === cat);

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18 }}>
        {list.map((p) => {
          const isSoon = p.status === 'soon';
          return (
            <div key={p.id} className="lzm-pop lzm-card" style={{ display: 'flex', flexDirection: 'column', opacity: isSoon ? 0.82 : 1 }}>
              <div style={{ position: 'relative', aspectRatio: '4 / 3', background: p.color, borderBottom: '3px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, overflow: 'hidden' }}>
                {p.id === 'luzma-cachai'
                  ? <img src="assets/luzma-cachai-logo.jpg" alt="Luzma Cachai" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ filter: 'drop-shadow(3px 3px 0 #111)' }}>{p.emoji}</span>
                }

                {/* Badge AL AIRE o PRÓXIMAMENTE — oculto si hay logo propio */}
                {p.id !== 'luzma-cachai' && (
                  <span style={{ position: 'absolute', top: 10, left: 10 }}>
                    {isSoon
                      ? <Pill color="#111" fg="#fff">🕐 Próximamente</Pill>
                      : <Pill color="#FDD835">📡 Al aire</Pill>
                    }
                  </span>
                )}

                {!isSoon && p.id !== 'luzma-cachai' && (
                  <span style={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <Pill color="#fff" size="xs">{p.time} hs</Pill>
                  </span>
                )}
              </div>

              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, lineHeight: 1, textTransform: 'uppercase' }}>{p.name}</div>
                <div style={{ fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: '#5B6479' }}>
                  {p.day}{!isSoon && ` · ${p.time} hs`}
                </div>
                <div style={{ fontFamily: "'Nunito'", fontSize: 13, color: '#2A2A2A', marginTop: 4, flex: 1 }}>{p.desc}</div>

                {isSoon ? (
                  <div style={{ marginTop: 10, alignSelf: 'flex-start', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: '#5B6479', padding: '7px 14px', border: '2.5px dashed #bbb', borderRadius: 9999 }}>
                    Próximamente
                  </div>
                ) : (
                  <a
                    href={`#/programa/${p.id}`}
                    style={{ marginTop: 10, alignSelf: 'flex-start', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', background: '#111', color: '#FDD835', border: '2.5px solid #111', borderRadius: 9999, padding: '7px 14px', display: 'inline-block' }}
                  >
                    Ver episodios →
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

Object.assign(window, { Programs });
