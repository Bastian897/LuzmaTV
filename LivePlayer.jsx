// LivePlayer.jsx — live stream embed + chat simulado
const { useState: useStateL, useEffect: useEffectL, useRef: useRefL } = React;

function LivePlayer() {
  const [platform, setPlatform] = useStateL(null); // null | 'kick' | 'twitch'
  const [viewers,  setViewers]  = useStateL(2143);
  const [messages, setMessages] = useStateL([
    { user: 'tata_77',      color: '#E91E8C', text: '¡aguanten los cabros!' },
    { user: 'pancho_chile', color: '#43A047', text: 'que bueno este invitado 🔥' },
    { user: 'consuVT',      color: '#29B6F6', text: 'desde Valpo viendo' },
    { user: 'luzmaníaca',   color: '#FDD835', text: 'WTF jajajajaj' },
    { user: 'matiastv',     color: '#0055FF', text: 'PIDAN EL CHACARERO' },
  ]);
  const [draft, setDraft] = useStateL('');
  const chatRef = useRefL(null);

  useEffectL(() => {
    const t = setInterval(() => {
      setViewers((v) => Math.max(0, v + Math.floor(Math.random() * 7) - 2));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  useEffectL(() => {
    const fillers = [
      { user: 'maca_p',    color: '#E53935', text: 'EN QUE MINUTO VAN?' },
      { user: 'rodrigot',  color: '#43A047', text: 'pongan reggaeton plis' },
      { user: 'sofi_94',   color: '#E91E8C', text: 'mejor live de la semana' },
      { user: 'guatonpro', color: '#29B6F6', text: 'jajajaja la lucho' },
      { user: 'andreaT',   color: '#FDD835', text: '#LaSeñalQueDejaHuella' },
    ];
    const t = setInterval(() => {
      const m = fillers[Math.floor(Math.random() * fillers.length)];
      setMessages((arr) => [...arr.slice(-30), m]);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  useEffectL(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((arr) => [...arr, { user: 'tú', color: '#0055FF', text: draft.trim() }]);
    setDraft('');
  };

  const parent = typeof window !== 'undefined' ? window.location.hostname : 'bastian897.github.io';
  const playerSrc = platform === 'kick'
    ? 'https://player.kick.com/luzmatv'
    : `https://player.twitch.tv/?channel=luzmatv&parent=${parent}&autoplay=false`;

  return (
    <Section id="envivo" eyebrow="Estamos al aire" title="En vivo ahora" background="#0A0F2C">
      <style>{`
        #envivo .lzm-section-eyebrow { color: #FDD835; }
        #envivo .lzm-section-title   { color: #fff; }
      `}</style>

      <div
        style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 18 }}
        className="lzm-player-grid"
      >
        {/* VIDEO */}
        <div style={{ background: '#000', border: '3px solid #111', borderRadius: 18, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
          {platform ? (
            <iframe
              src={playerSrc}
              title="LuzmaTV en vivo"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, display: 'block' }}
            />
          ) : (
            /* Pantalla de selección de plataforma */
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 30% 40%, rgba(233,30,140,.45) 0, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,170,255,.5) 0, transparent 55%), #0A0F2C',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 28, padding: 24,
            }}>
              <div style={{ textAlign: 'center', color: '#fff' }}>
                <LiveBadge />
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1, textTransform: 'uppercase', marginTop: 14, textShadow: '3px 3px 0 #111' }}>
                  ¿Dónde querés vernos?
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={() => setPlatform('kick')}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 24px', background: '#53FC18', border: '3px solid #111', borderRadius: 9999, boxShadow: '6px 6px 0 #111', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.06em', cursor: 'pointer', color: '#111' }}>
                  <img src="assets/platforms/kick.svg" style={{ width: 22, height: 22 }} alt="Kick" />
                  Ver en Kick
                </button>
                <button
                  onClick={() => setPlatform('twitch')}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 24px', background: '#9146FF', border: '3px solid #111', borderRadius: 9999, boxShadow: '6px 6px 0 #111', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.06em', cursor: 'pointer', color: '#fff' }}>
                  <img src="assets/platforms/twitch.svg" style={{ width: 22, height: 22 }} alt="Twitch" />
                  Ver en Twitch
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Pill color="#111" fg="#fff" shadow={false}>
                  <Icon name="user" size={12} color="#fff" /> {viewers.toLocaleString('es-CL')} viendo
                </Pill>
              </div>
            </div>
          )}

          {/* Botón para cambiar plataforma cuando ya hay una activa */}
          {platform && (
            <button
              onClick={() => setPlatform(null)}
              style={{ position: 'absolute', top: 10, right: 10, background: '#111', color: '#FDD835', border: '2px solid #FDD835', borderRadius: 9999, padding: '5px 12px', fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 11, textTransform: 'uppercase', cursor: 'pointer', zIndex: 10 }}>
              Cambiar plataforma
            </button>
          )}
        </div>

        {/* CHAT SIMULADO */}
        <div style={{ background: '#fff', border: '3px solid #111', borderRadius: 18, display: 'flex', flexDirection: 'column', minHeight: 460, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '3px solid #111', background: '#FDD835', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Montserrat'", fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 14 }}>Chat en vivo</span>
            <span style={{ fontFamily: "'Nunito'", fontSize: 11, fontWeight: 700 }}>{messages.length} msgs</span>
          </div>
          <div ref={chatRef} style={{ flex: 1, padding: 14, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, fontFamily: "'Nunito'", fontSize: 14, maxHeight: 360 }}>
            {messages.map((m, i) => (
              <div key={i}>
                <span style={{ color: m.color, fontWeight: 800 }}>{m.user}</span>
                <span style={{ color: '#5B6479' }}>: </span>
                <span>{m.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={send} style={{ display: 'flex', gap: 6, padding: 10, borderTop: '3px solid #111', background: '#F2F4FB' }}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Manda tu mensaje…"
              style={{ flex: 1, fontFamily: "'Nunito'", fontSize: 14, padding: '10px 12px', background: '#fff', border: '2.5px solid #111', borderRadius: 9999, outline: 'none' }}
            />
            <button type="submit" style={{ width: 44, background: '#E53935', color: '#fff', border: '2.5px solid #111', borderRadius: 9999, boxShadow: '3px 3px 0 #111', cursor: 'pointer' }}>
              <Icon name="send" size={18} color="#fff" />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .lzm-player-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}

Object.assign(window, { LivePlayer });
