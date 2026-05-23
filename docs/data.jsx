// data.jsx — fuente única de datos. Para agregar episodios, programas o rostros: edita solo este archivo.

const LZM_DATA = {
  programs: [
    {
      id: 'la-noche-luzma', name: 'La Noche Luzma', cat: 'talk', day: 'Lun & Mié', time: '22:00',
      desc: 'Talk show con los invitados que mueven la noche.',
      longDesc: 'El show nocturno de LuzmaTV. Cada lunes y miércoles a las 22:00 traemos a los personajes que están dando de qué hablar, en una conversación sin filtros y con la energía que solo LuzmaTV puede dar.',
      color: '#29B6F6', emoji: '🎙️', hostIds: ['lucho-rojas'],
    },
    {
      id: 'cabros-al-aire', name: 'Cabros al Aire', cat: 'humor', day: 'Sábados', time: '21:30',
      desc: 'Humor a la chilena, sin filtros, con la patota.',
      longDesc: 'El show de humor más irreverente de la tele chilena. Los Cabros se juntan cada sábado para hacer reír a todo Chile, sin guión y sin red.',
      color: '#E53935', emoji: '🎭', isNew: true, hostIds: ['cami-vergara'],
    },
    {
      id: 'invitados-del-dia', name: 'Invitados del Día', cat: 'invitado', day: 'Miércoles', time: '20:00',
      desc: 'Una hora con un invitado distinto cada semana.',
      longDesc: 'Cada miércoles a las 20:00, un invitado diferente tiene una hora completa para contar su historia. Sin interrupciones, sin panel.',
      color: '#E91E8C', emoji: '🎤', hostIds: ['pancho-garrido'],
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
      color: '#0055FF', emoji: '☕', hostIds: ['maca-pino'],
    },
    {
      id: 'risa-limpia', name: 'Risa Limpia', cat: 'humor', day: 'Domingos', time: '21:00',
      desc: 'Stand-up chileno, una rotación distinta cada semana.',
      longDesc: 'El espacio del stand-up nacional. Cada domingo un comediante diferente sube al escenario de LuzmaTV para una noche de risa limpia.',
      color: '#FFD600', emoji: '🤣', hostIds: ['tati-espinoza'],
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
      id: 'pancho-saavedra-cuenta-todo', title: 'Pancho Saavedra cuenta TODO',
      programId: 'la-noche-luzma',
      youtubeId: '', // Reemplazar con el ID real del video de YouTube (ej: "dQw4w9WgXcQ")
      duration: '12:40', views: '94K', color: '#29B6F6', isNew: true, date: '2026-05-21',
      description: 'Pancho Saavedra llega al estudio de La Noche Luzma para una conversación sin filtros sobre su carrera, sus proyectos y los secretos que nunca había contado. Un episodio imperdible.',
    },
    {
      id: 'la-lucho-se-cae-del-escenario', title: 'La Lucho se cae del escenario',
      programId: 'cabros-al-aire',
      youtubeId: '',
      duration: '2:14', views: '128K', color: '#E53935', isNew: true, date: '2026-05-20',
      description: 'El momento más viral de Cabros al Aire: la Lucho pierde el equilibrio en pleno sketch y lo que pasa después no tiene nombre. El clip que todo Chile compartió.',
    },
    {
      id: 'concurso-del-chacarero', title: 'Concurso del chacarero',
      programId: 'fans-en-el-set',
      youtubeId: '',
      duration: '5:21', views: '67K', color: '#7B2CBF', date: '2026-05-18',
      description: 'El fan más hambriento de la historia de Fans en el Set compite por el chacarero definitivo. Nadie esperaba lo que pasó en el minuto 3.',
    },
    {
      id: 'analisis-del-clasico', title: 'Análisis del clásico',
      programId: 'cancha-abierta',
      youtubeId: '',
      duration: '8:02', views: '41K', color: '#43A047', date: '2026-05-17',
      description: 'El equipo de Cancha Abierta desglosa el clásico del fin de semana con el análisis más entretenido de la televisión chilena.',
    },
    {
      id: 'stand-up-cami-vergara', title: 'Stand-up de Cami Vergara',
      programId: 'risa-limpia',
      youtubeId: '',
      duration: '4:55', views: '83K', color: '#FFD600', date: '2026-05-16',
      description: 'Cami Vergara sube al escenario de Risa Limpia y destruye con un monólogo sobre las mañanas en Santiago. Uno de los mejores del año.',
    },
    {
      id: 'maca-leyendo-memes', title: 'Maca leyendo memes',
      programId: 'mananeando',
      youtubeId: '',
      duration: '3:10', views: '36K', color: '#0055FF', date: '2026-05-15',
      description: 'La sección más esperada de Mañaneando: Maca Pino lee los memes de la semana en vivo y no puede con la risa.',
    },
  ],

  hosts: [
    { id: 'lucho-rojas',    name: 'Lucho Rojas',    role: 'Conductor · La Noche',  bg: '#E91E8C', initials: 'LR', ig: 'luchotv',     sign: '🎙️' },
    { id: 'cami-vergara',   name: 'Cami Vergara',   role: 'Cabros al Aire',         bg: '#FDD835', initials: 'CV', ig: 'cami.luzma',  sign: '🎭' },
    { id: 'pancho-garrido', name: 'Pancho Garrido', role: 'Invitados del Día',      bg: '#43A047', initials: 'PG', ig: 'pancho_g',    sign: '🎤' },
    { id: 'maca-pino',      name: 'Maca Pino',      role: 'Mañaneando',             bg: '#29B6F6', initials: 'MP', ig: 'macapino',    sign: '☕' },
    { id: 'tati-espinoza',  name: 'Tati Espinoza',  role: 'Risa Limpia',            bg: '#E53935', initials: 'TE', ig: 'taticomedia', sign: '🤣' },
  ],

  catLabel: { talk: 'Talk Show', humor: 'Humor', entret: 'Entretenimiento', invitado: 'Invitados' },
};

Object.assign(window, { LZM_DATA });
