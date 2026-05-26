-- LuzmaTV — datos iniciales (espejo de data.jsx)
-- Ejecutar UNA SOLA VEZ en el SQL Editor de Supabase DESPUES de schema.sql

insert into public.programs (id, name, cat, day, time, description, long_description, color, emoji, status, host_ids, sort_order) values
  (
    'luzma-cachai', 'Luzma Cachai', 'talk', 'Lun a Vie', '10:00',
    'El live show diario de LuzmaTV. Tendencias, invitados y la mejor energia de Chile.',
    'Luzma Cachai es el corazon de LuzmaTV. De lunes a viernes de 10:00 a 12:00, Ariel Osses, Vicky More, Rodrigo Munoz, Claudio Merlin y Lita Melo se juntan en vivo para hablar de todo — sin filtros, sin guion y con la energia que hace unica a esta senal.',
    '#E91E8C', '🎬', 'active',
    array['ariel-osses','vicky-more','rodrigo-munoz','claudio-merlin','lita-melo'],
    10
  ),
  (
    'cara-a-cara', 'Cara a Cara', 'invitado', 'Mar y Jue', '18:00',
    'Las conversaciones que no se pueden ignorar. Dos visiones, una mesa, sin filtros.',
    'Cara a Cara es el espacio donde los temas que dividen a Chile se ponen sobre la mesa. Cada episodio enfrenta dos visiones distintas en una conversacion directa, sin guion y sin zonas de confort. Martes y jueves en las tardes, por LuzmaTV.',
    '#7B2CBF', '🎤', 'active',
    array[]::text[],
    20
  ),
  (
    'dia-uno', 'Dia Uno', 'entret', 'Por confirmar', '—',
    'El proximo gran proyecto de LuzmaTV. Vale la pena esperar.',
    'Dia Uno es el nuevo proyecto que viene a marcar el inicio de algo grande en LuzmaTV. Todavia no podemos decir mucho — pero cuando llegue, lo van a saber.',
    '#FF7043', '🌅', 'soon',
    array[]::text[],
    30
  )
on conflict (id) do nothing;

insert into public.episodes (id, program_id, title, youtube_id, duration, views, color, is_new, date, description) values
  (
    'luzma-cachai-20-mayo', 'luzma-cachai', 'Luzma Cachai · 20 de Mayo',
    'AD7V3krg4fQ', '2:13:08', '286', '#E91E8C', true, '2026-05-20',
    'Ariel Osses, Vicky More, Rodrigo Munoz, Claudio Merlin y Lita Melo en el live del 20 de mayo. Conversaciones, tendencias y la energia de siempre en LuzmaTV.'
  ),
  (
    'luzma-cachai-19-mayo', 'luzma-cachai', 'Luzma Cachai · 19 de Mayo',
    '3EJyGwxkL-A', '2:18:04', '201', '#E91E8C', true, '2026-05-19',
    'Ariel Osses, Vicky More, Rodrigo Munoz, Claudio Merlin y Lita Melo en el live del 19 de mayo. "Recordando la esencia de Chile".'
  ),
  (
    'luzma-cachai-18-mayo', 'luzma-cachai', 'Luzma Cachai · 18 de Mayo',
    'FlnoNezQY-U', '2h+', '—', '#E91E8C', false, '2026-05-18',
    'Ariel Osses, Rodrigo Munoz, Ignacio Ruiz, Claudio Merlin y Lita Melo en el live del 18 de mayo. Previa al Feriado — la polemica!'
  ),
  (
    'luzma-cachai-15-mayo', 'luzma-cachai', 'Luzma Cachai · 15 de Mayo',
    'fyneTgOGiJI', '2h+', '—', '#E91E8C', false, '2026-05-15',
    'Ariel Osses, Vicky More, Rodrigo Munoz e Ignacio Ruiz en el live del 15 de mayo.'
  ),
  (
    'luzma-cachai-14-mayo', 'luzma-cachai', 'Luzma Cachai · 14 de Mayo',
    'sFbg0BpbzIY', '2h+', '—', '#E91E8C', false, '2026-05-14',
    'Ariel Osses, Vicky More, Rodrigo Munoz, Claudio Merlin e Ignacio Ruiz en el live del 14 de mayo.'
  ),
  (
    'luzma-cachai-13-mayo', 'luzma-cachai', 'Luzma Cachai · 13 de Mayo',
    'YkBpnm1pYQk', '2h+', '—', '#E91E8C', false, '2026-05-13',
    'Ariel Osses, Lita Melo, Vicky More y Rodrigo Munoz en el live del 13 de mayo.'
  )
on conflict (id) do nothing;
