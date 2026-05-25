// ProgramPage.jsx — página individual de programa
const { useEffect: useEffectPP } = React;

function ProgramPage({ id }) {
  const prog     = LZM_DATA.programs.find((p) => p.id === id);
  const episodes = prog ? LZM_DATA.episodes.filter((e) => e.programId === id) : [];
  const hosts    = prog ? LZM_DATA.hosts.filter((h) => prog.hostIds.includes(h.id)) : [];

  useEffectPP(() => {
    window.scrollTo(0, 0);
    setTimeout(() => { if (window.AOS) window.AOS.refreshHard(); }, 80);
  }, [id]);

  const onNav = (sectionId) => { window.location.hash = `#${sectionId}`; };

  if (!prog) {
    return (
      <div>
        <Header onNav={onNav} live={false} />
        <div style={{ padding: '100px 24px', textAlign: 'center', fontFamily: "'Nunito'" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 48 }}>Programa no encontrado</h1>
          <a href="#programas"><Button variant="primary" style={{ marginTop: 24 }}>Ver todos los programas</Button></a>
        </div>
        <Footer />
      </div>
    );
  }

  const catLabel = LZM_DATA.catLabel[prog.cat] || prog.cat;

  return (
    <div>
      <Header onNav={onNav} live={false} />

      {/* Hero del programa */}
      <div style={{ background: prog.color, borderBottom: '4px solid #111', padding: '56px 0 48px' }}>
        <div className="lzm-shell">
          <a href="#programas"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em', color: '#111', opacity: .65, marginBottom: 28 }}>
            <Icon name="chevronLeft" size={14} /> Todos los programas
          </a>
          <div style={{ fontSize: 64, marginBottom: 10 }}>{prog.emoji}</div>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: .9, textTransform: 'uppercase', margin: '0 0 20px', color: '#111', textShadow: '4px 4px 0 rgba(0,0,0,.12)' }}>
            {prog.name}
          </h1>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Pill color="#111" fg="#fff">{prog.day}</Pill>
            <Pill color="#111" fg="#fff">{prog.time} hs</Pill>
            <Pill color="#fff">{catLabel}</Pill>
          </div>
        </div>
      </div>

      <div className="lzm-shell" style={{ padding: '48px 24px 80px' }}>

        {/* Descripción */}
        <p style={{ fontFamily: "'Nunito'", fontSize: 18, color: '#2A2A2A', lineHeight: 1.75, maxWidth: 700, marginBottom: 48 }}>
          {prog.longDesc}
        </p>

        {/* Hosts */}
        {hosts.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div className="lzm-section-eyebrow" style={{ marginBottom: 16 }}>Conduce</div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {hosts.map((h) => (
                <a key={h.id} href={`https://instagram.com/${h.ig}`} target="_blank" rel="noreferrer"
                  className="lzm-card lzm-pop"
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', minWidth: 220 }}>
                  <div style={{ width: 54, height: 54, background: h.bg, border: '3px solid #111', borderRadius: 12, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <img
                      src={`assets/hosts/${h.id}.jpg`}
                      alt={h.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      onError={(ev) => {
                        ev.target.style.display = 'none';
                        ev.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontFamily: "'Black Ops One'", fontSize: 20, color: '#fff', WebkitTextStroke: '1.5px #111' }}>
                      {h.initials}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue'", fontSize: 24, textTransform: 'uppercase', lineHeight: 1 }}>{h.name}</div>
                    <div style={{ fontFamily: "'Nunito'", fontSize: 12, color: '#0055FF', fontWeight: 700, marginTop: 4 }}>@{h.ig} en Instagram</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Episodios */}
        <div>
          <div className="lzm-section-eyebrow" style={{ marginBottom: 16 }}>Episodios</div>
          {episodes.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {episodes.map((ep, i) => (
                <a key={ep.id} href={`#/episodio/${ep.id}`} className="lzm-card lzm-pop" style={{ display: 'block' }} data-aos="fade-up" data-aos-delay={i * 60}>
                  <div style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, ${ep.color} 0%, #0A0F2C 130%)`, borderBottom: '3px solid #111', position: 'relative', overflow: 'hidden' }}>
                    {ep.youtubeId && <img src={`https://img.youtube.com/vi/${ep.youtubeId}/maxresdefault.jpg`} alt={ep.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={ev => { ev.target.style.display='none'; }} />}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 54, height: 54, background: '#FDD835', border: '3px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 0 #111' }}>
                        <Icon name="play" size={22} color="#111" fill="#111" />
                      </div>
                    </div>
                    {ep.isNew && <span style={{ position: 'absolute', top: 10, left: 10 }}><Pill color="#FFD600" size="xs">⭐ NUEVO</Pill></span>}
                    <span style={{ position: 'absolute', bottom: 10, right: 10, padding: '3px 8px', background: 'rgba(0,0,0,.8)', color: '#fff', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, borderRadius: 5 }}>{ep.duration}</span>
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: '#111', lineHeight: 1.3 }}>{ep.title}</div>
                    <div style={{ fontFamily: "'Nunito'", fontSize: 12, color: '#5B6479', marginTop: 6 }}>{ep.views} vistas · {ep.duration}</div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div style={{ padding: '48px 0', fontFamily: "'Nunito'", fontWeight: 700, color: '#5B6479', fontSize: 16 }}>
              Los episodios de {prog.name} estarán disponibles próximamente.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

Object.assign(window, { ProgramPage });
