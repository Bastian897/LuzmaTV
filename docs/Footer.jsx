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
              <a href="mailto:Contacto@LuzmaTV.cl">Contacto@LuzmaTV.cl</a>
              <a href="https://wa.me/56940996090">+56 9 4099 6090</a>
              <a href="#contacto">Prensa & PR</a>
              <a href="#contacto">Trabaja con nosotros</a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: '#FDD835', marginBottom: 12 }}>
              Síguenos
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['kick','twitch','tiktok','instagram','youtube','tvmas','whatsapp'].map((p) => (
                <a
                  key={p}
                  href={`https://${p}.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="lzm-pop"
                  style={{
                    width: 38, height: 38,
                    background: '#fff',
                    border: '3px solid #111',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '3px 3px 0 #111',
                  }}
                >
                  <img src={`assets/platforms/${p}.svg`} style={{ width: 20, height: 20 }} alt={p} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: 22,
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
