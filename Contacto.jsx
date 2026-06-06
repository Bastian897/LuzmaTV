// Contacto.jsx — Section 9 — Contact info
function Contacto() {
  return (
    <section id="contacto" className="lzm-section" style={{ background: '#FFF8E7', position: 'relative', overflow: 'hidden' }} data-screen-label="Contacto">
      <div style={{ position: 'absolute', top: 40, right: '8%' }} className="lzm-spin-slow">
        <Star size={70} fill="#E91E8C" rotate={12} />
      </div>
      <div style={{ position: 'absolute', bottom: 60, left: '5%' }}>
        <Star size={50} fill="#0055FF" rotate={-15} />
      </div>

      <div className="lzm-shell" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="lzm-section-eyebrow" style={{ color: '#E53935' }}>HABLEMOS</div>
          <h2 className="lzm-section-title" style={{ color: '#111' }}>
            CONTÁCTANOS
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 480, margin: '0 auto' }}>
          <ContactCard
            accent="#0055FF"
            icon="mail"
            label="Email"
            value="Contacto@LuzmaTV.cl"
            href="https://mail.google.com/mail/?view=cm&to=Contacto@LuzmaTV.cl"
          />
          <ContactCard
            accent="#43A047"
            icon="bell"
            label="WhatsApp / Teléfono"
            value="+56 9 7204 1514"
            href="https://wa.me/56972041514"
          />
          <ContactCard
            accent="#E91E8C"
            icon="star"
            label="Estudio"
            value={<span>Santiago<br/>Región Metropolitana</span>}
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({ accent, icon, label, value, href }) {
  const inner = (
    <div style={{
      background: '#fff',
      border: '4px solid #111',
      borderLeft: `12px solid ${accent}`,
      borderRadius: 14,
      padding: '16px 18px',
      boxShadow: '6px 6px 0 #111',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
    }}>
      <div style={{
        width: 46, height: 46, flexShrink: 0,
        background: accent,
        border: '3px solid #111',
        borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '3px 3px 0 #111',
      }}>
        <Icon name={icon} size={22} color="#fff" />
      </div>
      <div>
        <div style={{ fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: '#888', marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, lineHeight: 1.05, color: '#111', textTransform: 'uppercase' }}>
          {value}
        </div>
      </div>
    </div>
  );
  return href ? <a href={href} className="lzm-pop" style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer">{inner}</a> : inner;
}

Object.assign(window, { Contacto });
