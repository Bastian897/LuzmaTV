// Footer.jsx
function Footer() {
  return (
    <footer
      style={{
        background: '#0A0F2C',
        color: '#fff',
        borderTop: '4px solid #111',
        padding: '60px 0 28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 40, right: 80 }} className="lzm-spin-slow">
        <Star size={80} fill="#FFD600" />
      </div>
      <div style={{ position: 'absolute', bottom: 60, left: 60 }}>
        <Star size={32} fill="#E91E8C" rotate={-12} />
      </div>

      <div className="lzm-shell" style={{ position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 36,
            marginBottom: 36,
          }}
        >
          <div>
            <img src="assets/luzmatv-logo.png" alt="LuzmaTV" style={{ height: 72, marginBottom: 14, border: '3px solid #111', borderRadius: 12, boxShadow: '5px 5px 0 #111', display: 'block' }} />
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, lineHeight: 1, color: '#FDD835', textTransform: 'uppercase' }}>
              La señal que<br />deja huella
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: '#FDD835', marginBottom: 12 }}>
              Sitio
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: "'Nunito'", fontWeight: 700 }}>
              <a href="#programas">Programas</a>
              <a href="#envivo">En vivo</a>
              <a href="#episodios">Episodios</a>
              <a href="#equipo">Equipo</a>
              <a href="#grilla">Grilla</a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: '#FDD835', marginBottom: 12 }}>
              Contacto
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: "'Nunito'", fontWeight: 700 }}>
              <a href="https://mail.google.com/mail/?view=cm&to=Contacto@LuzmaTV.cl" target="_blank" rel="noreferrer">Contacto@LuzmaTV.cl</a>
              <a href="https://wa.me/56972041514">+56 9 7204 1514</a>
              <a href="#contacto">Prensa & PR</a>
              <a href="#contacto">Trabaja con nosotros</a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: '#FDD835', marginBottom: 12 }}>
              Síguenos
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { slug: 'kick',      url: 'https://kick.com/luzmatv' },
                { slug: 'twitch',    url: 'https://twitch.tv/luzmatv' },
                { slug: 'tiktok',    url: 'https://www.tiktok.com/@luzmatv_oficial' },
                { slug: 'instagram', url: 'https://www.instagram.com/luzma.tv/' },
                { slug: 'youtube',   url: 'https://www.youtube.com/@luzmatvcl' },
                { slug: 'tvmas',     url: 'https://tvmas.tv' },
                { slug: 'whatsapp',  url: 'https://wa.me/56972041514' },
              ].map(({ slug: p, url }) => (
                <a
                  key={p}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={p}
                  className="lzm-pop"
                  style={{
                    width: 38, height: 38,
                    background: '#fff',
                    border: '3px solid #111',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '3px 3px 0 #111',
                  }}
                >
                  <span style={{
                    width: 20, height: 20, display: 'block', background: '#0A0F2C',
                    WebkitMaskImage: `url(assets/platforms/${p}-mask.svg)`, maskImage: `url(assets/platforms/${p}-mask.svg)`,
                    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center', maskPosition: 'center',
                    WebkitMaskSize: 'contain', maskSize: 'contain',
                  }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Pregúntale a la IA — AEO: links directos para que las IA indexen la marca */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 20, marginBottom: 20 }}>
          <div style={{ fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.12em', color: '#FDD835', marginBottom: 10 }}>
            🤖 Pregúntale a la IA sobre LuzmaTV
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { name: 'ChatGPT', url: 'https://chatgpt.com/?q=' + encodeURIComponent('¿Qué es LuzmaTV y cómo puedo ver sus programas en vivo desde Chile?') },
              { name: 'Perplexity', url: 'https://www.perplexity.ai/search?q=' + encodeURIComponent('¿Qué es LuzmaTV Chile?') },
              { name: 'Gemini', url: 'https://gemini.google.com/' },
              { name: 'Claude', url: 'https://claude.ai/new?q=' + encodeURIComponent('¿Qué es LuzmaTV, el canal chileno de streaming?') },
            ].map(({ name, url }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer"
                style={{ fontFamily: "'Montserrat'", fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,.55)', border: '1.5px solid rgba(255,255,255,.2)', borderRadius: 20, padding: '5px 12px', textTransform: 'uppercase', letterSpacing: '.04em', transition: 'color 200ms, border-color 200ms' }}
                onMouseEnter={e => { e.currentTarget.style.color='#FDD835'; e.currentTarget.style.borderColor='#FDD835'; }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,.55)'; e.currentTarget.style.borderColor='rgba(255,255,255,.2)'; }}
              >
                {name} →
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            paddingTop: 18,
            borderTop: '2px solid rgba(255,255,255,.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            fontFamily: "'Nunito'",
            fontSize: 13,
            color: 'rgba(255,255,255,.7)',
          }}
        >
          <span>© 2026 LuzmaTV · Santiago, Chile</span>
          <span>Hecho con cariño en la RM 🇨🇱</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
