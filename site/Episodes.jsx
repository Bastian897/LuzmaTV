// Episodes.jsx — clips carousel
const EPISODES = [
  { title: 'La Lucho se cae del escenario', show: 'Cabros al Aire', dur: '2:14', views: '128K', color: '#E53935', isNew: true },
  { title: 'Pancho Saavedra cuenta TODO',   show: 'La Noche Luzma', dur: '12:40', views: '94K', color: '#29B6F6', isNew: true },
  { title: 'Concurso del chacarero',        show: 'Fans en el Set', dur: '5:21',  views: '67K', color: '#7B2CBF' },
  { title: 'Análisis del clásico',          show: 'Cancha Abierta', dur: '8:02',  views: '41K', color: '#43A047' },
  { title: 'Stand-up de Cami Vergara',      show: 'Risa Limpia',    dur: '4:55',  views: '83K', color: '#FFD600' },
  { title: 'Maca leyendo memes',            show: 'Mañaneando',     dur: '3:10',  views: '36K', color: '#0055FF' },
];

function Episodes() {
  return (
    <Section
      id="episodios"
      eyebrow="Recién salido"
      title="Últimos episodios"
      background="#fff"
      action={
        <Button variant="ghost" size="sm">
          Ver todos <Icon name="chevronRight" size={14} />
        </Button>
      }
    >
      <div className="lzm-scroll-x">
        {EPISODES.map((e, i) => (
          <a
            key={i}
            href="#"
            className="lzm-pop lzm-card"
            style={{ display: 'block', flex: '0 0 300px' }}
          >
            <div
              style={{
                aspectRatio: '16 / 9',
                background: `linear-gradient(135deg, ${e.color} 0%, #0A0F2C 130%)`,
                borderBottom: '3px solid #111',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  background: '#FDD835',
                  border: '3px solid #111',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '4px 4px 0 #111',
                }}
              >
                <Icon name="play" size={24} color="#111" fill="#111" />
              </div>
              {e.isNew && (
                <span style={{ position: 'absolute', top: 10, left: 10 }}>
                  <Pill color="#FFD600" size="xs">⭐ NUEVO</Pill>
                </span>
              )}
              <span
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  padding: '3px 8px',
                  background: '#111',
                  color: '#fff',
                  fontFamily: "'Montserrat'",
                  fontWeight: 900,
                  fontSize: 11,
                  borderRadius: 5,
                }}
              >
                {e.dur}
              </span>
            </div>
            <div style={{ padding: 14 }}>
              <div
                style={{
                  fontFamily: "'Montserrat'",
                  fontWeight: 800,
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '.1em',
                  color: e.color,
                  marginBottom: 4,
                }}
              >
                {e.show}
              </div>
              <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: '#111', lineHeight: 1.25 }}>
                {e.title}
              </div>
              <div style={{ marginTop: 8, fontFamily: "'Nunito'", fontSize: 12, color: '#5B6479' }}>
                {e.views} visualizaciones · hace 2 días
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { Episodes });
