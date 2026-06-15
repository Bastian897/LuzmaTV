// ProgramPage.jsx - página individual de programa
const { useEffect: useEffectPP } = React;

function ProgramPage({ id }) {
  const prog     = LZM_DATA.programs.find((p) => p.id === id);
  const episodes = prog ? LZM_DATA.episodes.filter((e) => e.programId === id) : [];
  const hosts    = prog ? LZM_DATA.hosts.filter((h) => prog.hostIds.includes(h.id)) : [];

  useEffectPP(() => {
    window.scrollTo(0, 0);
    if (!prog) {
      document.title = 'Programa no encontrado - LuzmaTV';
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', 'El programa que buscas no existe. Vuelve al inicio de LuzmaTV o revisa todos los programas disponibles.');
    }
    if (prog) {
      const baseUrl = 'https://luzmatv.vercel.app/';
      const title = `${prog.name} - LuzmaTV`;
      const description = prog.longDesc || prog.desc;
      const pageUrl = `${baseUrl}programa/${prog.id}`;

      document.title = title;
      const setMeta = (selector, attr, value) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
      };
      setMeta('meta[name="description"]', 'content', description);
      setMeta('link[rel="canonical"]', 'href', pageUrl);
      setMeta('meta[property="og:url"]', 'content', pageUrl);
      setMeta('meta[property="og:title"]', 'content', title);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:title"]', 'content', title);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }
    setTimeout(() => { if (window.AOS) window.AOS.refreshHard(); }, 80);
  }, [id]);

  const onNav = (sectionId) => { lzmNavigate(`/#${sectionId}`); };

  if (!prog) {
    return (
      <div>
        <Header onNav={onNav} live={false} />
        <div style={{ padding: '100px 24px', textAlign: 'center', fontFamily: "'Nunito'" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 48 }}>Programa no encontrado</h1>
          <a href="/#programas" onClick={lzmNavClick('/#programas')}><Button variant="primary" style={{ marginTop: 24 }}>Ver todos los programas</Button></a>
        </div>
        <Footer />
      </div>
    );
  }

  const catLabel = LZM_DATA.catLabel[prog.cat] || prog.cat;

  return (
    <div>
      <Header onNav={onNav} live={false} />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <div style={{ background: prog.color, borderBottom: '4px solid #111', overflow: 'hidden', position: 'relative' }}>
        {/* Textura diagonal */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 14px, rgba(0,0,0,.06) 14px, rgba(0,0,0,.06) 28px)', pointerEvents: 'none' }} />

        <div className="lzm-shell" style={{ position: 'relative', padding: '44px 24px 52px' }}>
          <div className="lzm-prog-hero-grid">

            {/* Izquierda */}
            <div>
              <Breadcrumb items={[
                { label: 'Inicio', href: '/' },
                { label: 'Programas', href: '/#programas' },
                { label: prog.name },
              ]} />

              {prog.status === 'active' && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#111', color: '#FDD835', padding: '5px 14px', borderRadius: 9999, fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', marginTop: 20, marginBottom: 18 }}>
                  <span className="lzm-pulse-dot" />
                  Al aire
                </div>
              )}

              <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(56px, 9vw, 108px)', lineHeight: .88, textTransform: 'uppercase', margin: '0 0 22px', color: '#111', textShadow: '5px 5px 0 rgba(0,0,0,.18)' }}>
                {prog.name}
              </h1>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
                <Pill color="#111" fg="#fff">{prog.day}</Pill>
                <Pill color="#111" fg="#fff">{prog.time} hs</Pill>
                <Pill color="#fff">{catLabel}</Pill>
              </div>

              <a href="/#envivo" onClick={lzmNavClick('/#envivo')} style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">Ver en vivo →</Button>
              </a>
            </div>

            {/* Derecha - caja decorativa */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <div style={{
                background: '#111',
                border: '4px solid #111',
                borderRadius: 24,
                boxShadow: '10px 10px 0 rgba(0,0,0,.25)',
                width: 180, height: 180,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 8,
                flexShrink: 0,
                overflow: 'hidden',
                position: 'relative',
              }}>
                {prog.logoImg ? (
                  <img src={prog.logoImg} alt={prog.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <div style={{ fontSize: 72, lineHeight: 1 }}>{prog.emoji}</div>
                    <div style={{ fontFamily: "'Bebas Neue'", fontSize: 13, color: prog.color, letterSpacing: '.15em', textTransform: 'uppercase' }}>
                      {catLabel}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CUERPO ─────────────────────────────────────────────── */}
      <div className="lzm-shell" style={{ padding: '56px 24px 80px' }}>

        {/* Descripción destacada */}
        <div style={{
          borderLeft: `6px solid ${prog.color}`,
          paddingLeft: 24,
          marginBottom: 56,
          maxWidth: 720,
        }}>
          <div className="lzm-section-eyebrow" style={{ marginBottom: 10 }}>El programa</div>
          <p style={{ fontFamily: "'Nunito'", fontSize: 19, color: '#111', lineHeight: 1.75, margin: 0, fontWeight: 700 }}>
            {prog.longDesc}
          </p>
        </div>

        {/* Hosts */}
        {hosts.length > 0 && (
          <div style={{ marginBottom: 56 }}>
            <div className="lzm-section-eyebrow" style={{ marginBottom: 18 }}>Conduce</div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {hosts.map((h) => (
                <a key={h.id} href={`https://instagram.com/${h.ig}`} target="_blank" rel="noreferrer"
                  className="lzm-card lzm-pop"
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 22px', minWidth: 230, textDecoration: 'none' }}>
                  <div style={{ width: 60, height: 60, background: h.bg, border: '3px solid #111', borderRadius: 14, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <img
                      src={`assets/hosts/${h.id}.jpg`}
                      alt={h.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      onError={(ev) => { ev.target.style.display = 'none'; ev.target.nextSibling.style.display = 'flex'; }}
                    />
                    <div style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontFamily: "'Black Ops One'", fontSize: 22, color: '#fff', WebkitTextStroke: '1.5px #111' }}>
                      {h.initials}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue'", fontSize: 26, textTransform: 'uppercase', lineHeight: 1, color: '#111' }}>{h.name}</div>
                    <div style={{ fontFamily: "'Montserrat'", fontSize: 11, color: '#0055FF', fontWeight: 800, marginTop: 5, textTransform: 'uppercase', letterSpacing: '.06em' }}>@{h.ig}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Episodios */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
            <div className="lzm-section-eyebrow" style={{ margin: 0 }}>Episodios</div>
            {prog.ig && (
              <a href={`https://www.instagram.com/${prog.ig}/`} target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', color: '#fff', background: 'linear-gradient(135deg,#FFD600 0%,#E91E8C 50%,#7B2CBF 100%)', border: '2.5px solid #111', borderRadius: 9999, padding: '5px 14px', boxShadow: '3px 3px 0 #111', textDecoration: 'none' }}>
                <img src="assets/platforms/instagram.svg" style={{ width: 14, height: 14 }} alt="" />
                @{prog.ig}
              </a>
            )}
          </div>
          {episodes.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
              {episodes.map((ep, i) => (
                <a key={ep.id} href={`/episodio/${ep.id}`} onClick={lzmNavClick(`/episodio/${ep.id}`)} className="lzm-card lzm-pop" style={{ display: 'block', textDecoration: 'none' }} data-aos="fade-up" data-aos-delay={Math.min(i * 50, 300)}>
                  <div style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, ${ep.color} 0%, #0A0F2C 130%)`, borderBottom: '3px solid #111', position: 'relative', overflow: 'hidden' }}>
                    {ep.youtubeId && (
                      <img src={`https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`} alt={ep.title} loading="lazy"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(ev) => { ev.target.style.display = 'none'; }} />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 52, height: 52, background: '#FDD835', border: '3px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 0 #111' }}>
                        <Icon name="play" size={20} color="#111" fill="#111" />
                      </div>
                    </div>
                    {ep.duration && ep.duration !== '-' && (
                      <span style={{ position: 'absolute', bottom: 10, right: 10, padding: '3px 8px', background: 'rgba(0,0,0,.8)', color: '#fff', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, borderRadius: 5 }}>
                        {ep.duration}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: '#111', lineHeight: 1.3 }}>{ep.title}</div>
                    {ep.date && (
                      <div style={{ fontFamily: "'Montserrat'", fontSize: 11, color: '#5B6479', marginTop: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }}>{ep.date}</div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div style={{
              padding: '48px 32px',
              background: '#F5F5F5',
              border: '3px solid #111',
              borderRadius: 18,
              boxShadow: '6px 6px 0 #111',
              fontFamily: "'Nunito'",
              fontWeight: 700,
              color: '#5B6479',
              fontSize: 16,
            }}>
              Los episodios de <strong style={{ color: '#111' }}>{prog.name}</strong> estarán disponibles próximamente.
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        .lzm-prog-hero-grid {
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 32px;
          align-items: center;
        }
        .lzm-pulse-dot {
          width: 7px; height: 7px;
          background: #FDD835;
          border-radius: 50%;
          display: inline-block;
          animation: lzm-pulse 1.5s ease-in-out infinite;
        }
        @keyframes lzm-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .5; transform: scale(.7); }
        }
        @media (max-width: 640px) {
          .lzm-prog-hero-grid { grid-template-columns: 1fr; }
          .lzm-prog-hero-grid > div:last-child { display: none; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { ProgramPage });
