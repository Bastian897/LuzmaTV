// ui.jsx — shared primitives for the LuzmaTV website
const { useState, useEffect, useRef } = React;

// ---------- Navegación SPA con rutas reales (/episodio/x, /programa/x) ----------
// Permite que /episodio/<id> y /programa/<id> sean URLs reales y crawleables,
// mientras se mantiene la navegación instantánea sin recarga completa.
function lzmNavigate(href) {
  if (!href) return;
  if (/^https?:\/\//.test(href) || href.startsWith('//')) { window.location.href = href; return; }

  let pathname, hash;
  if (href.startsWith('#')) {
    pathname = '/';
    hash = href.slice(1);
  } else {
    const hashIdx = href.indexOf('#');
    pathname = hashIdx === -1 ? href : href.slice(0, hashIdx);
    hash = hashIdx === -1 ? '' : href.slice(hashIdx + 1);
    if (pathname === '') pathname = '/';
  }

  const samePathname = pathname === window.location.pathname;
  const newUrl = pathname + (hash ? '#' + hash : '');

  if (!samePathname) {
    window.history.pushState(null, '', newUrl);
    window.dispatchEvent(new Event('lzm-pathchange'));
  } else if (hash) {
    window.history.replaceState(null, '', '#' + hash);
  } else {
    window.history.replaceState(null, '', pathname);
  }

  setTimeout(() => {
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, samePathname ? 50 : 200);
}

function lzmNavClick(href) {
  return (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
    e.preventDefault();
    lzmNavigate(href);
  };
}

// ---------- PlatformMark — single-color brand silhouette via CSS mask ----------
function PlatformMark({ slug, color = '#111', size = 22, style = {} }) {
  const url = `assets/platforms/${slug}-mask.svg`;
  return (
    <span
      aria-hidden="true"
      style={{
        width: size, height: size, display: 'inline-block', flexShrink: 0,
        background: color,
        WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`,
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        ...style,
      }}
    />
  );
}

// ---------- PlatformBadge — round tile with the silhouette inside ----------
function PlatformBadge({ slug, tile = '#fff', color = '#111', size = 26, icon = 16, style = {} }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size, height: size, borderRadius: '50%', background: tile,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, ...style,
      }}
    >
      <PlatformMark slug={slug} color={color} size={icon} />
    </span>
  );
}

// ---------- Star SVG ----------
function Star({ size = 36, fill = '#FFD600', stroke = 6, rotate = 0, style = {}, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      className={className}
    >
      <polygon
        points="50,5 61,38 96,38 67,59 78,93 50,72 22,93 33,59 4,38 39,38"
        fill={fill}
        stroke="#111"
        strokeWidth={stroke}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------- Button ----------
function Button({
  children,
  variant = 'primary', // primary (yellow), secondary (white), accent (red), ghost
  size = 'md',         // sm | md | lg
  as = 'button',
  ...rest
}) {
  const fills = {
    primary:   { bg: '#FDD835', fg: '#111' },
    secondary: { bg: '#fff',    fg: '#111' },
    accent:    { bg: '#E53935', fg: '#fff' },
    blue:      { bg: '#0055FF', fg: '#fff' },
    ghost:     { bg: 'transparent', fg: '#111' },
  };
  const sizes = {
    sm: { pad: '8px 16px',  fs: 12, sh: '3px 3px 0 #111', sh2: '5px 5px 0 #111' },
    md: { pad: '12px 22px', fs: 14, sh: '6px 6px 0 #111', sh2: '8px 8px 0 #111' },
    lg: { pad: '16px 30px', fs: 16, sh: '8px 8px 0 #111', sh2: '10px 10px 0 #111' },
  };
  const f = fills[variant] || fills.primary;
  const s = sizes[size] || sizes.md;
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  const Tag = as;
  return (
    <Tag
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 900,
        fontSize: s.fs,
        textTransform: 'uppercase',
        letterSpacing: '.04em',
        padding: s.pad,
        background: f.bg,
        color: f.fg,
        border: variant === 'ghost' ? '3px dashed #111' : '3px solid #111',
        borderRadius: 9999,
        boxShadow: press ? '0 0 0 #111' : (hover ? s.sh2 : s.sh),
        transform: press ? 'translate(2px,2px)' : (hover ? 'translate(-2px,-2px)' : 'none'),
        transition: 'transform 160ms cubic-bezier(.34,1.56,.64,1), box-shadow 160ms cubic-bezier(.34,1.56,.64,1)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ---------- Pill / chip ----------
function Pill({ children, color = '#fff', fg, outlined = true, shadow = true, size = 'sm', style = {}, ...rest }) {
  const textColor = fg || (['#FDD835', '#FFD600', '#fff', '#FFF8E7'].includes(color) ? '#111' : '#fff');
  const sizes = {
    xs: { pad: '4px 10px', fs: 10 },
    sm: { pad: '6px 14px', fs: 12 },
    md: { pad: '8px 18px', fs: 14 },
  };
  const s = sizes[size] || sizes.sm;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: s.pad,
        background: color,
        color: textColor,
        border: outlined ? '3px solid #111' : '0',
        borderRadius: 9999,
        boxShadow: shadow ? '3px 3px 0 #111' : 'none',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '.06em',
        fontSize: s.fs,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

// ---------- LIVE badge ----------
function LiveBadge({ size = 'sm' }) {
  return (
    <Pill color="#E53935" size={size}>
      <span
        className="lzm-pulse"
        style={{ width: 9, height: 9, borderRadius: '50%', background: '#fff', display: 'inline-block' }}
      />
      EN VIVO
    </Pill>
  );
}

// ---------- Section wrapper ----------
function Section({ eyebrow, title, action, children, background = '#fff', id }) {
  return (
    <section id={id} className="lzm-section" style={{ background }}>
      <div className="lzm-shell">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            {eyebrow && <div className="lzm-section-eyebrow">{eyebrow}</div>}
            {title && <h2 className="lzm-section-title">{title}</h2>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}

// ---------- Lucide icon helper ----------
const ICON_PATHS = {
  play: 'M 8 5 L 19 12 L 8 19 Z',
  pause: 'M 8 5 V 19 M 16 5 V 19',
  heart: 'M 12 21 C 12 21 4 14 4 8.5 A 4.5 4.5 0 0 1 12 6 A 4.5 4.5 0 0 1 20 8.5 C 20 14 12 21 12 21 Z',
  bell: 'M 6 8 a 6 6 0 0 1 12 0 c 0 7 3 9 3 9 H 3 s 3 -2 3 -9 M 10 21 a 2 2 0 0 0 4 0',
  search: 'M 11 4 a 7 7 0 1 0 4.95 11.95 L 21 21',
  menu: 'M 4 6 H 20 M 4 12 H 20 M 4 18 H 20',
  x: 'M 6 6 L 18 18 M 6 18 L 18 6',
  chevronRight: 'M 9 6 L 15 12 L 9 18',
  chevronLeft: 'M 15 6 L 9 12 L 15 18',
  user: 'M 12 12 a 4 4 0 1 0 0 -8 a 4 4 0 0 0 0 8 Z M 4 21 c 0 -4.5 3.5 -7 8 -7 s 8 2.5 8 7',
  send: 'M 4 12 L 20 4 L 12 20 L 10 14 Z',
  check: 'M 5 12 L 10 17 L 20 7',
  mail: 'M 3 6 H 21 V 18 H 3 Z M 3 6 L 12 13 L 21 6',
  users: 'M 9 11 a 3.5 3.5 0 1 0 0 -7 a 3.5 3.5 0 0 0 0 7 Z M 2 20 c 0 -3.5 3 -6 7 -6 s 7 2.5 7 6 M 16 11 a 3 3 0 1 0 0 -6 a 3 3 0 0 0 0 6 Z M 22 19 c 0 -3 -2 -5 -5 -5',
  calendar: 'M 4 7 H 20 V 20 H 4 Z M 4 7 V 4 M 8 4 V 7 M 16 4 V 7 M 20 4 V 7',
  star: 'M 12 2 L 14.5 9 L 22 9 L 16 13.5 L 18.5 21 L 12 16.5 L 5.5 21 L 8 13.5 L 2 9 L 9.5 9 Z',
};

function Icon({ name, size = 22, color = 'currentColor', stroke = 2.5, fill = 'none', style = {} }) {
  const d = ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={d} />
    </svg>
  );
}

// ---------- Breadcrumb ----------
function Breadcrumb({ items }) {
  return (
    <nav aria-label="Ruta de navegación" style={{ marginBottom: 28 }}>
      <ol style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0, fontFamily: "'Montserrat'", fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.07em' }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {i > 0 && <Icon name="chevronRight" size={11} color="#ccc" />}
            {item.href
              ? <a href={item.href} onClick={lzmNavClick(item.href)} style={{ color: '#0055FF' }}>{item.label}</a>
              : <span style={{ color: '#5B6479' }}>{item.label}</span>
            }
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Make available globally to Babel scripts
Object.assign(window, { Button, Pill, LiveBadge, Section, Star, Icon, ICON_PATHS, Breadcrumb, PlatformMark, PlatformBadge, lzmNavigate, lzmNavClick });
