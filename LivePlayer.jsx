// LivePlayer.jsx — live stream embed + chat real (Twitch/Kick iframes oficiales)
const { useState: useStateL, useEffect: useEffectL } = React;

const KICK_CHANNEL    = 'luzmatv';
const TWITCH_CHANNEL  = 'luzmatv';
// Channel ID de YouTube (formato UCxxxxxx) — verlo en youtube.com > tu canal > Configuración > Información del canal
const YOUTUBE_CHANNEL_ID = 'UCQ0cnYx83lnRaCvMHuiM5QQ';

function LivePlayer() {
  const [platform, setPlatform] = useStateL(null); // null | 'kick' | 'twitch' | 'youtube'
  const [viewers,  setViewers]  = useStateL(2143);

  useEffectL(() => {
    const t = setInterval(() => {
      setViewers((v) => Math.max(0, v + Math.floor(Math.random() * 7) - 2));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const parent = typeof window !== 'undefined' ? window.location.hostname : 'luzmatv.cl';
  const playerSrc = platform === 'kick'
    ? `https://player.kick.com/${KICK_CHANNEL}`
    : platform === 'youtube'
    ? `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=1`
    : `https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${parent}&autoplay=false`;
  const chatSrc = `https://www.twitch.tv/embed/${TWITCH_CHANNEL}/chat?parent=${parent}&darkpopout`;

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
        <div
          className={`lzm-video-frame${platform ? '' : ' lzm-no-platform'}`}
          style={{
            background: '#000', border: '3px solid #111', borderRadius: 18, overflow: 'hidden',
            position: 'relative',
            ...(platform ? { aspectRatio: '16/9' } : {}),
          }}
        >
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
            /* Pantalla de selección de plataforma — flujo natural, sin position:absolute para que crezca en mobile */
            <div className="lzm-live-selector" style={{
              background: 'radial-gradient(circle at 30% 40%, rgba(233,30,140,.45) 0, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,170,255,.5) 0, transparent 55%), #0A0F2C',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24, padding: '32px 20px',
              width: '100%', height: '100%', minHeight: 320,
              boxSizing: 'border-box',
            }}>
              <div style={{ textAlign: 'center', color: '#fff' }}>
                <LiveBadge />
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(26px, 4vw, 52px)', lineHeight: 1, textTransform: 'uppercase', marginTop: 14, textShadow: '3px 3px 0 #111' }}>
                  ¿Dónde querés vernos?
                </div>
              </div>
              <div className="lzm-live-buttons" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                <button
                  onClick={() => setPlatform('kick')}
                  className="lzm-live-btn"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 24px', background: '#53FC18', border: '3px solid #111', borderRadius: 9999, boxShadow: '6px 6px 0 #111', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.06em', cursor: 'pointer', color: '#111' }}>
                  <PlatformBadge slug="kick" tile="#fff" color="#53FC18" size={26} icon={16} />
                  Ver en Kick
                </button>
                <button
                  onClick={() => setPlatform('twitch')}
                  className="lzm-live-btn"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 24px', background: '#9146FF', border: '3px solid #111', borderRadius: 9999, boxShadow: '6px 6px 0 #111', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.06em', cursor: 'pointer', color: '#fff' }}>
                  <PlatformBadge slug="twitch" tile="#fff" color="#9146FF" size={26} icon={16} />
                  Ver en Twitch
                </button>
                {YOUTUBE_CHANNEL_ID && (
                  <button
                    onClick={() => setPlatform('youtube')}
                    className="lzm-live-btn"
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 24px', background: '#FF0000', border: '3px solid #111', borderRadius: 9999, boxShadow: '6px 6px 0 #111', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.06em', cursor: 'pointer', color: '#fff' }}>
                    <PlatformBadge slug="youtube" tile="#fff" color="#FF0000" size={26} icon={16} />
                    Ver en YouTube
                  </button>
                )}
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

        {/* CHAT — real cuando hay plataforma, placeholder cuando no */}
        <div style={{ border: '3px solid #111', borderRadius: 18, display: 'flex', flexDirection: 'column', minHeight: 460, overflow: 'hidden', background: platform ? '#000' : '#fff' }}>
          <div style={{ padding: '12px 16px', borderBottom: '3px solid #111', background: '#FDD835', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: "'Montserrat'", fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 14 }}>
              Chat en vivo
            </span>
            {platform && (
              <span style={{ fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 11, textTransform: 'uppercase', color: platform === 'kick' ? '#2d9b00' : platform === 'youtube' ? '#FF0000' : '#6441a5' }}>
                {platform === 'kick' ? 'Kick' : platform === 'youtube' ? 'YouTube' : 'Twitch'}
              </span>
            )}
          </div>

          {platform === 'twitch' ? (
            <iframe
              key="twitch-chat"
              src={chatSrc}
              title="Chat Twitch"
              frameBorder="0"
              scrolling="yes"
              style={{ flex: 1, width: '100%', minHeight: 400, display: 'block', border: 'none' }}
            />
          ) : platform === 'youtube' ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 40 }}>💬</div>
              <div style={{ fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.06em', color: '#eee', lineHeight: 1.5 }}>
                Chat del live<br />en YouTube
              </div>
              <button
                onClick={() => window.open(`https://youtube.com/@luzmatv/live`, 'yt-chat', 'width=380,height=600,resizable=yes')}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 22px', background: '#FF0000', border: '3px solid #111', borderRadius: 9999, boxShadow: '5px 5px 0 #111', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.06em', cursor: 'pointer', color: '#fff' }}
              >
                <PlatformBadge slug="youtube" tile="#fff" color="#FF0000" size={22} icon={14} />
                Abrir chat de YouTube
              </button>
              <div style={{ fontFamily: "'Nunito'", fontSize: 12, color: 'rgba(255,255,255,.45)' }}>
                Se abre en una ventana pequeña
              </div>
            </div>
          ) : platform === 'kick' ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 40 }}>💬</div>
              <div style={{ fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.06em', color: '#eee', lineHeight: 1.5 }}>
                El chat de Kick no permite<br />embeds externos
              </div>
              <button
                onClick={() => window.open(`https://kick.com/${KICK_CHANNEL}/chatroom`, 'kick-chat', 'width=380,height=600,resizable=yes')}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 22px', background: '#53FC18', border: '3px solid #111', borderRadius: 9999, boxShadow: '5px 5px 0 #111', fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.06em', cursor: 'pointer', color: '#111' }}
              >
                <PlatformBadge slug="kick" tile="#fff" color="#53FC18" size={22} icon={14} />
                Abrir chat de Kick
              </button>
              <div style={{ fontFamily: "'Nunito'", fontSize: 12, color: 'rgba(255,255,255,.45)' }}>
                Se abre en una ventana pequeña
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
                <div style={{ fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.06em', color: '#5B6479' }}>
                  Seleccioná una plataforma<br />para ver el chat en vivo
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .lzm-video-frame.lzm-no-platform { aspect-ratio: 16/9; }
        @media (max-width: 900px) {
          .lzm-player-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .lzm-video-frame.lzm-no-platform { aspect-ratio: auto; }
        }
        @media (max-width: 520px) {
          .lzm-live-buttons { flex-direction: column; align-items: stretch; }
          .lzm-live-btn { width: 100%; justify-content: center; padding: 12px 18px !important; font-size: 13px !important; }
        }
      `}</style>
    </Section>
  );
}

Object.assign(window, { LivePlayer });
