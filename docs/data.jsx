// data.jsx — fuente única de datos. Para agregar episodios, programas o rostros: edita solo este archivo.

const LZM_DATA = {
  programs: [
    {
      id: 'luzma-cachai', name: 'Luzma Cachai', cat: 'talk', day: 'Lun a Vie', time: '22:00',
      desc: 'El live show diario de LuzmaTV. Tendencias, invitados y la mejor energía de Chile.',
      longDesc: 'Luzma Cachai es el corazón de LuzmaTV. De lunes a viernes, Ariel Osses, Vicky More, Rodrigo Muñoz, Claudio Merlin, Lita Melo e Ignacio Ruiz se juntan en vivo para hablar de todo — sin filtros, sin guión y con la energía que hace única a esta señal.',
      color: '#E91E8C', emoji: '🎬', hostIds: ['ariel-osses', 'vicky-more', 'rodrigo-munoz', 'claudio-merlin', 'lita-melo'],
    },
    {
      id: 'la-noche-luzma', name: 'La Noche Luzma', cat: 'talk', day: 'Lun & Mié', time: '22:00',
      desc: 'Talk show con los invitados que mueven la noche.',
      longDesc: 'El show nocturno de LuzmaTV. Cada lunes y miércoles a las 22:00 traemos a los personajes que están dando de qué hablar, en una conversación sin filtros y con la energía que solo LuzmaTV puede dar.',
      color: '#29B6F6', emoji: '🎙️', hostIds: [],
    },
    {
      id: 'cabros-al-aire', name: 'Cabros al Aire', cat: 'humor', day: 'Sábados', time: '21:30',
      desc: 'Humor a la chilena, sin filtros, con la patota.',
      longDesc: 'El show de humor más irreverente de la tele chilena. Los Cabros se juntan cada sábado para hacer reír a todo Chile, sin guión y sin red.',
      color: '#E53935', emoji: '🎭', isNew: true, hostIds: [],
    },
    {
      id: 'invitados-del-dia', name: 'Invitados del Día', cat: 'invitado', day: 'Miércoles', time: '20:00',
      desc: 'Una hora con un invitado distinto cada semana.',
      longDesc: 'Cada miércoles a las 20:00, un invitado diferente tiene una hora completa para contar su historia. Sin interrupciones, sin panel.',
      color: '#E91E8C', emoji: '🎤', hostIds: [],
    },
    {
      id: 'cancha-abierta', name: 'Cancha Abierta', cat: 'entret', day: 'Jueves', time: '20:00',
      desc: 'Análisis liviano de lo que pasa en la cancha.',
      longDesc: 'Deportes sin el aburrimiento del análisis técnico. Cada jueves revisamos lo que pasó en la cancha con humor y entrevistas exclusivas.',
      color: '#43A047', emoji: '⚽', hostIds: [],
    },
    {
      id: 'gran-show-luzma', name: 'Gran Show Luzma', cat: 'entret', day: 'Sábado', time: '22:00',
      desc: 'El bloque familiar de la semana, en vivo.',
      longDesc: 'El gran show familiar de LuzmaTV. Música, humor, invitados y sorpresas cada sábado en vivo para toda la familia.',
      color: '#FDD835', emoji: '🎉', hostIds: [],
    },
    {
      id: 'mananeando', name: 'Mañaneando', cat: 'talk', day: 'L–V', time: '10:00',
      desc: 'Lo que tienes que saber del día, con onda.',
      longDesc: 'La revista matinal de LuzmaTV. De lunes a viernes desde las 10:00 arrancamos el día con noticias, tendencias y los mejores tips.',
      color: '#0055FF', emoji: '☕', hostIds: [],
    },
    {
      id: 'risa-limpia', name: 'Risa Limpia', cat: 'humor', day: 'Domingos', time: '21:00',
      desc: 'Stand-up chileno, una rotación distinta cada semana.',
      longDesc: 'El espacio del stand-up nacional. Cada domingo un comediante diferente sube al escenario de LuzmaTV para una noche de risa limpia.',
      color: '#FFD600', emoji: '🤣', hostIds: [],
    },
    {
      id: 'fans-en-el-set', name: 'Fans en el Set', cat: 'invitado', day: 'Viernes', time: '21:00',
      desc: 'Sube un fan al set, gana premios, hace papelones.',
      longDesc: 'Cada viernes un fan sube al set de LuzmaTV, enfrenta desafíos, gana premios y se convierte en protagonista por una noche.',
      color: '#7B2CBF', emoji: '🌟', hostIds: [],
    },
  ],

  episodes: [
    {
      id: 'luzma-cachai-20-mayo', title: 'Luzma Cachai · 20 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: 'AD7V3krg4fQ',
      duration: '2:13:08', views: '286', color: '#E91E8C', isNew: true, date: '2026-05-20',
      description: 'Ariel Osses, Vicky More, Rodrigo Muñoz, Claudio Merlin y Lita Melo en el live del 20 de mayo. Conversaciones, tendencias y la energía de siempre en LuzmaTV.',
    },
    {
      id: 'luzma-cachai-19-mayo', title: 'Luzma Cachai · 19 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: '3EJyGwxkL-A',
      duration: '2:18:04', views: '201', color: '#E91E8C', isNew: true, date: '2026-05-19',
      description: 'Ariel Osses, Vicky More, Rodrigo Muñoz, Claudio Merlin y Lita Melo en el live del 19 de mayo. "Recordando la esencia de Chile".',
    },
    {
      id: 'luzma-cachai-18-mayo', title: 'Luzma Cachai · 18 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: 'FlnoNezQY-U',
      duration: '2h+', views: '—', color: '#E91E8C', date: '2026-05-18',
      description: 'Ariel Osses, Rodrigo Muñoz, Ignacio Ruiz, Claudio Merlin y Lita Melo en el live del 18 de mayo. Previa al Feriado — ¡se armó la polémica!',
    },
    {
      id: 'luzma-cachai-15-mayo', title: 'Luzma Cachai · 15 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: 'fyneTgOGiJI',
      duration: '2h+', views: '—', color: '#E91E8C', date: '2026-05-15',
      description: 'Ariel Osses, Vicky More, Rodrigo Muñoz e Ignacio Ruiz en el live del 15 de mayo.',
    },
    {
      id: 'luzma-cachai-14-mayo', title: 'Luzma Cachai · 14 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: 'sFbg0BpbzIY',
      duration: '2h+', views: '—', color: '#E91E8C', date: '2026-05-14',
      description: 'Ariel Osses, Vicky More, Rodrigo Muñoz, Claudio Merlin e Ignacio Ruiz en el live del 14 de mayo.',
    },
    {
      id: 'luzma-cachai-13-mayo', title: 'Luzma Cachai · 13 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: 'YkBpnm1pYQk',
      duration: '2h+', views: '—', color: '#E91E8C', date: '2026-05-13',
      description: 'Ariel Osses, Lita Melo, Vicky More y Rodrigo Muñoz en el live del 13 de mayo.',
    },
  ],

  hosts: [
    { id: 'ariel-osses',   name: 'Ariel Osses',   role: 'Conductor · Luzma Cachai', bg: '#E91E8C', initials: 'AO', ig: 'luzmatvcl', sign: '🎬' },
    { id: 'vicky-more',    name: 'Vicky More',    role: 'Luzma Cachai',              bg: '#FDD835', initials: 'VM', ig: 'luzmatvcl', sign: '🌟' },
    { id: 'rodrigo-munoz', name: 'Rodrigo Muñoz', role: 'Luzma Cachai',              bg: '#0055FF', initials: 'RM', ig: 'luzmatvcl', sign: '🎭' },
    { id: 'claudio-merlin',name: 'Claudio Merlin',role: 'Luzma Cachai',              bg: '#43A047', initials: 'CM', ig: 'luzmatvcl', sign: '🎤' },
    { id: 'lita-melo',     name: 'Lita Melo',     role: 'Luzma Cachai',              bg: '#E53935', initials: 'LM', ig: 'luzmatvcl', sign: '💃' },
  ],

  catLabel: { talk: 'Talk Show', humor: 'Humor', entret: 'Entretenimiento', invitado: 'Invitados' },
};

Object.assign(window, { LZM_DATA });
