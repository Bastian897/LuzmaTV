// Contacto.jsx — Section 9 — Contact form
const { useState: useStateK } = React;

function Contacto() {
  const [form, setForm] = useStateK({ nombre: '', email: '', asunto: 'Prensa', mensaje: '' });
  const [sent, setSent] = useStateK(false);

  const submit = (e) => {
    e.preventDefault();
    if (form.nombre && form.email.includes('@') && form.mensaje.length > 4) {
      setSent(true);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: '#FFF8E7',
    border: '3px solid #111',
    borderRadius: 12,
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: '#111',
    boxShadow: '4px 4px 0 #111',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 900,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '.1em',
    color: '#111',
    marginBottom: 6,
  };

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
            ESCRÍBENOS Y<br />TE RESPONDEMOS
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 28, alignItems: 'start' }} className="lzm-contact-grid">
          {/* FORM */}
          <form
            onSubmit={submit}
            style={{
              background: '#fff',
              border: '4px solid #111',
              borderRadius: 16,
              padding: 28,
              boxShadow: '10px 10px 0 #111',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {sent ? (
              <div style={{ padding: '40px 8px', textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, margin: '0 auto 18px', background: '#43A047', border: '4px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '6px 6px 0 #111' }}>
                  <Icon name="check" size={40} color="#fff" />
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 44, lineHeight: .95, color: '#111', textTransform: 'uppercase', marginBottom: 8 }}>
                  ¡Mensaje enviado!
                </h3>
                <p style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 16, color: '#444', maxWidth: 360, margin: '0 auto' }}>
                  Te respondemos dentro de 24 hrs hábiles. Mientras, échate un live.
                </p>
              </div>
            ) : (
              <React.Fragment>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="lzm-contact-row">
                  <div>
                    <label style={labelStyle}>Tu nombre</label>
                    <input
                      style={inputStyle}
                      type="text"
                      placeholder="Cómo te llamas"
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      style={inputStyle}
                      type="email"
                      placeholder="tu@correo.cl"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Asunto</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Prensa','Publicidad','Casting','Técnico','Otro'].map((a) => {
                      const active = form.asunto === a;
                      const accent = { Prensa:'#29B6F6', Publicidad:'#FDD835', Casting:'#E91E8C', 'Técnico':'#43A047', Otro:'#0055FF' }[a];
                      return (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setForm({ ...form, asunto: a })}
                          style={{
                            padding: '8px 16px',
                            background: active ? accent : '#fff',
                            color: active && a !== 'Publicidad' ? '#fff' : '#111',
                            border: '3px solid #111',
                            borderRadius: 9999,
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 900,
                            fontSize: 12,
                            textTransform: 'uppercase',
                            letterSpacing: '.04em',
                            boxShadow: active ? '4px 4px 0 #111' : '2px 2px 0 #111',
                            cursor: 'pointer',
                            transition: 'all 160ms cubic-bezier(.34,1.56,.64,1)',
                          }}
                        >
                          {a}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Mensaje</label>
                  <textarea
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 140, fontFamily: "'Nunito', sans-serif" }}
                    placeholder="Cuéntanos qué tienes en mente..."
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 6 }}>
                  <div style={{ fontFamily: "'Nunito'", fontSize: 12, color: '#666', fontWeight: 700 }}>
                    Te respondemos en menos de 24h hábiles
                  </div>
                  <Button type="submit" variant="accent" size="lg">
                    Enviar mensaje
                    <Icon name="send" size={18} color="#fff" />
                  </Button>
                </div>
              </React.Fragment>
            )}
          </form>

          {/* INFO PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ContactCard
              accent="#0055FF"
              icon="mail"
              label="Email"
              value="Contacto@LuzmaTV.cl"
              href="mailto:Contacto@LuzmaTV.cl"
            />
            <ContactCard
              accent="#43A047"
              icon="bell"
              label="WhatsApp / Teléfono"
              value="+56 9 4099 6090"
              href="https://wa.me/56940996090"
            />
            <ContactCard
              accent="#E91E8C"
              icon="star"
              label="Estudio"
              value={<span>Santiago<br/>Región Metropolitana</span>}
            />

            <div style={{
              background: '#0055FF',
              color: '#fff',
              border: '4px solid #111',
              borderRadius: 16,
              padding: 22,
              boxShadow: '6px 6px 0 #111',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -12, right: -12 }}>
                <Star size={60} fill="#FFD600" rotate={18} />
              </div>
              <div style={{ fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', color: '#FDD835', marginBottom: 10 }}>
                Horario
              </div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 30, lineHeight: 1, textTransform: 'uppercase', marginBottom: 10 }}>
                Lun a Vie<br/>10:00 — 19:00
              </div>
              <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 13, opacity: .9 }}>
                Para urgencias de transmisión, escribe por WhatsApp.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .lzm-contact-grid { grid-template-columns: 1fr !important; }
          .lzm-contact-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
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
  return href ? <a href={href} className="lzm-pop" style={{ textDecoration: 'none' }}>{inner}</a> : inner;
}

Object.assign(window, { Contacto });
