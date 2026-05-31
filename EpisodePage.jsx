// EpisodePage.jsx — página individual de episodio
const { useEffect: useEffectEP } = React;

function EpisodePage({ id }) {
  const ep   = LZM_DATA.episodes.find((e) => e.id === id);
  const prog = ep ? LZM_DATA.programs.find((p) => p.id === ep.programId) : null;
  const related = ep
    ? LZM_DATA.episodes.filter((e) => e.programId === ep.programId && e.id !== id).slice(0, 3)
    : [];

  useEffectEP(() => {
    window.scrollTo(0, 0);
    if (ep) {
      document.title = `${ep.title} — LuzmaTV`;
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', ep.description || `${ep.title} en LuzmaTV. ${ep.duration}.`);
    }

    // JSON-LD VideoObject por episodio (SEO de paginas individuales)
    const existing = document.getElementById('lzm-episode-ldjson');
    if (existing) existing.remove();
    if (ep && ep.youtubeId) {
      const baseUrl = 'https://luzmatv.vercel.app/';
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: ep.title,
        description: ep.description || `${ep.title} — LuzmaTV`,
        thumbnailUrl: `https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`,
        uploadDate: ep.date,
        embedUrl: `https://www.youtube.com/embed/${ep.youtubeId}`,
        url: `${baseUrl}#/episodio/${ep.id}`,
        publisher: { '@id': `${baseUrl}#org` },
      };
      if (ep.duration && /^\d+:\d+(:\d+)?$/.test(ep.duration)) {
        const parts = ep.duration.split(':').map(Number);
        if (parts.length === 3)      ld.duration = `PT${parts[0]}H${parts[1]}M${parts[2]}S`;
        else if (parts.length === 2) ld.duration = `PT${parts[0]}M${parts[1]}S`;
      }
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'lzm-episode-ldjson';
      script.textContent = JSON.stringify(ld);
      document.head.appendChild(script);
    }
    return () => {
      const s = document.getElementById('lzm-episode-ldjson');
      if (s) s.remove();
    };
  }, [id, ep && ep.youtubeId]);

  const onNav = (sectionId) => { window.location.hash = `#${sectionId}`; };

  if (!ep) {
    return (
      <div>
        <Header onNav={onNav} live={false} />
        <div style={{ padding: '100px 24px', textAlign: 'center', fontFamily: "'Nunito'" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 48 }}>Episodio no encontrado</h1>
          <a href="#episodios"><Button variant="primary" style={{ marginTop: 24 }}>Ver todos los episodios</Button></a>
        </div>
        <Footer />
      </div>
    );
  }

  const dateStr = new Date(ep.date + 'T12:00:00').toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div>
      <Header onNav={onNav} live={false} />

      <div className="lzm-shell" style={{ padding: '40px 24px 80px', maxWidth: 900 }}>
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Inicio', href: '#' },
          { label: 'Programas', href: '#programas' },
          { label: prog?.name || 'Programa', href: prog ? `#/programa/${prog.id}` : '#programas' },
          { label: ep.title },
        ]} />

        {/* Program badge */}
        {prog && (
          <div style={{ marginBottom: 14 }}>
            <a href={`#/programa/${prog.id}`}>
              <Pill color={prog.color}>{prog.emoji} {prog.name}</Pill>
            </a>
          </div>
        )}

        {/* Title */}
        <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(42px, 7vw, 72px)', lineHeight: .92, textTransform: 'uppercase', margin: '0 0 18px' }}>
          {ep.title}
        </h1>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', fontFamily: "'Nunito'", fontWeight: 700, fontSize: 14, color: '#5B6479' }}>
          <span>{dateStr}</span>
          <span style={{ color: '#D0D5E0' }}>·</span>
          <span>{ep.duration}</span>
          <span style={{ color: '#D0D5E0' }}>·</span>
          <span>{ep.views} visualizaciones</span>
        </div>

        {/* Video */}
        <div style={{ border: '4px solid #111', borderRadius: 18, overflow: 'hidden', boxShadow: '8px 8px 0 #111', marginBottom: 36, background: '#111' }}>
          {ep.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ep.youtubeId}?rel=0`}
              title={ep.title}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: '100%', aspectRatio: '16/9', display: 'block' }}
            />
          ) : (
            <div style={{
              aspectRatio: '16/9',
              background: `linear-gradient(135deg, ${ep.color} 0%, #0A0F2C 130%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20,
            }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(22px, 4vw, 36px)', color: '#fff', textAlign: 'center', padding: '0 32px', textShadow: '3px 3px 0 #111', lineHeight: 1.1 }}>
                Video próximamente en YouTube
              </div>
              <a href="https://www.youtube.com/@luzmatvcl" target="_blank" rel="noreferrer">
                <Button variant="primary">Suscribirse al canal →</Button>
              </a>
            </div>
          )}
        </div>

        {/* Description */}
        <p style={{ fontFamily: "'Nunito'", fontSize: 17, color: '#2A2A2A', lineHeight: 1.75, marginBottom: 56, maxWidth: 700 }}>
          {ep.description}
        </p>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <div className="lzm-section-eyebrow" style={{ marginBottom: 16 }}>
              Más de {prog?.name}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
              {related.map((r) => (
                <a key={r.id} href={`#/episodio/${r.id}`} className="lzm-card lzm-pop" style={{ display: 'block' }}>
                  <div style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, ${r.color} 0%, #0A0F2C 130%)`, borderBottom: '3px solid #111', position: 'relative', overflow: 'hidden' }}>
                    {r.youtubeId && <img src={`https://img.youtube.com/vi/${r.youtubeId}/hqdefault.jpg`} alt={r.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={ev => { ev.target.style.display='none'; }} />}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 44, height: 44, background: '#FDD835', border: '3px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 0 #111' }}>
                        <Icon name="play" size={18} color="#111" fill="#111" />
                      </div>
                    </div>
                    <span style={{ position: 'absolute', bottom: 10, right: 10, padding: '3px 8px', background: 'rgba(0,0,0,.8)', color: '#fff', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, borderRadius: 5 }}>{r.duration}</span>
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 14, color: '#111', lineHeight: 1.3 }}>{r.title}</div>
                    <div style={{ fontFamily: "'Nunito'", fontSize: 12, color: '#5B6479', marginTop: 6 }}>{r.views} vistas</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

Object.assign(window, { EpisodePage });
