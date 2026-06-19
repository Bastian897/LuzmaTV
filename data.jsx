// data.jsx - datos estáticos bundled (fallback + hosts/catLabel).
// programs/episodes se cargan en runtime desde Supabase via lzm-data.jsx.
// Si Supabase falla o no esta configurado, el sitio usa estos datos.
// Hosts y catLabel viven solo aqui (no estan en la BD).

const LZM_STATIC = {
  programs: [
    {
      id: 'comunidad-am', name: 'Comunidad AM', cat: 'talk', day: 'Lun a Vie', time: '10:00',
      desc: 'El nuevo live show de LuzmaTV. De lunes a viernes con toda la energía de la mañana.',
      longDesc: 'Comunidad AM llega a tomar el horario matinal de LuzmaTV. De lunes a viernes de 10:00 a 12:00, Vicky More, Ignacio Ruiz y Paty Maldonado se juntan en vivo para hablar de todo - sin filtros, sin guión y con la energía que hace única a esta señal.',
      color: '#E91E8C', emoji: '🎬', status: 'active', logoImg: 'assets/comunidad-am-logo.jpg',
      ig: 'luzmatv',
      hostIds: ['vicky-more', 'ignacio-ruiz', 'paty-maldonado'],
    },
    {
      id: 'luzma-cachai', name: 'Luzma Cachai', cat: 'talk', day: 'Lun a Vie', time: '10:00',
      desc: 'El live show que marcó el inicio de LuzmaTV. Tendencias, invitados y la mejor energía de Chile.',
      longDesc: 'Luzma Cachai fue el corazón de LuzmaTV. De lunes a viernes de 10:00 a 12:00, el equipo se juntaba en vivo para hablar de todo - sin filtros, sin guión y con la energía que hace única a esta señal.',
      color: '#E91E8C', emoji: '🎬', status: 'past', logoImg: 'assets/luzma-cachai-logo.webp',
      ig: 'luzmacachai',
      hostIds: [],
    },
    {
      id: 'cara-a-cara', name: 'Frente a Frente', cat: 'invitado', day: 'Mar y Jue', time: '18:00',
      desc: 'Las conversaciones que no se pueden ignorar. Dos visiones, una mesa, sin filtros.',
      longDesc: 'Frente a Frente es el espacio donde los temas que dividen a Chile se ponen sobre la mesa. Cada episodio enfrenta dos visiones distintas en una conversación directa, sin guión y sin zonas de confort. Martes y jueves en las tardes, por LuzmaTV.',
      color: '#7B2CBF', emoji: '🎤', status: 'active', logoImg: 'assets/frente-a-frente-logo.webp', logoPosition: 'right center', hostIds: ['paty-maldonado'],
    },
    {
      id: 'dia-uno', name: 'Día Uno', cat: 'entret', day: 'Por confirmar', time: '-',
      desc: 'El próximo gran proyecto de LuzmaTV. Vale la pena esperar.',
      longDesc: 'Día Uno es el nuevo proyecto que viene a marcar el inicio de algo grande en LuzmaTV. Todavía no podemos decir mucho - pero cuando llegue, lo van a saber.',
      color: '#FF7043', emoji: '🌅', status: 'soon', logoImg: 'assets/dia-uno-logo.webp', hostIds: [],
    },
  ],

  episodes: [
    {
      id: 'luzma-cachai-20-mayo', title: 'Luzma Cachai · 20 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: 'AD7V3krg4fQ',
      duration: '2:13:08', color: '#E91E8C', date: '2026-05-20',
      description: 'Live del 20 de mayo. Conversaciones, tendencias y la energía de siempre en LuzmaTV.',
    },
    {
      id: 'luzma-cachai-19-mayo', title: 'Luzma Cachai · 19 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: '3EJyGwxkL-A',
      duration: '2:18:04', color: '#E91E8C', date: '2026-05-19',
      description: 'Live del 19 de mayo. "Recordando la esencia de Chile".',
    },
    {
      id: 'luzma-cachai-18-mayo', title: 'Luzma Cachai · 18 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: 'FlnoNezQY-U',
      duration: '2h+', color: '#E91E8C', date: '2026-05-18',
      description: 'Live del 18 de mayo. Previa al Feriado.',
    },
    {
      id: 'luzma-cachai-15-mayo', title: 'Luzma Cachai · 15 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: 'fyneTgOGiJI',
      duration: '2h+', color: '#E91E8C', date: '2026-05-15',
      description: 'Live del 15 de mayo.',
    },
    {
      id: 'luzma-cachai-14-mayo', title: 'Luzma Cachai · 14 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: 'sFbg0BpbzIY',
      duration: '2h+', color: '#E91E8C', date: '2026-05-14',
      description: 'Live del 14 de mayo.',
    },
    {
      id: 'luzma-cachai-13-mayo', title: 'Luzma Cachai · 13 de Mayo',
      programId: 'luzma-cachai',
      youtubeId: 'YkBpnm1pYQk',
      duration: '2h+', color: '#E91E8C', date: '2026-05-13',
      description: 'Live del 13 de mayo.',
    },
  ],

  hosts: [
    { id: 'vicky-more',    name: 'Vicky More',    role: 'Comunidad AM',              bg: '#FDD835', initials: 'VM', ig: 'vickymoremusic',    sign: '🌟' },
    { id: 'ignacio-ruiz',  name: 'Ignacio Ruiz',  role: 'Comunidad AM',              bg: '#E91E8C', initials: 'IR', ig: 'ignacioruizcarrasco', sign: '🎙️' },
    { id: 'paty-maldonado',name: 'Paty Maldonado',role: 'Comunidad AM · Frente a Frente', bg: '#7B2CBF', initials: 'PM', ig: 'lamaldito', sign: '🔥' },
  ],

  catLabel: { talk: 'Talk Show', humor: 'Humor', entret: 'Entretenimiento', invitado: 'Invitados' },
};

Object.assign(window, { LZM_STATIC });
