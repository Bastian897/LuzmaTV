-- LuzmaTV — Supabase schema
-- Ejecutar UNA SOLA VEZ en el SQL Editor de Supabase

create table if not exists public.programs (
  id text primary key,
  name text not null,
  cat text not null,
  day text,
  time text,
  description text,
  long_description text,
  color text,
  emoji text,
  status text default 'active',
  host_ids text[] default '{}',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.episodes (
  id text primary key,
  program_id text references public.programs(id) on delete cascade,
  title text not null,
  youtube_id text,
  duration text,
  views text default '—',
  color text,
  is_new boolean default false,
  date date,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists episodes_program_id_idx on public.episodes (program_id);
create index if not exists episodes_date_idx on public.episodes (date desc);

-- Trigger updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists programs_updated_at on public.programs;
create trigger programs_updated_at before update on public.programs
  for each row execute function public.set_updated_at();

drop trigger if exists episodes_updated_at on public.episodes;
create trigger episodes_updated_at before update on public.episodes
  for each row execute function public.set_updated_at();

-- Row Level Security: lectura publica, escritura solo autenticados
alter table public.programs enable row level security;
alter table public.episodes enable row level security;

drop policy if exists "read_programs"  on public.programs;
drop policy if exists "read_episodes"  on public.episodes;
drop policy if exists "write_programs" on public.programs;
drop policy if exists "write_episodes" on public.episodes;

create policy "read_programs"  on public.programs for select using (true);
create policy "read_episodes"  on public.episodes for select using (true);
create policy "write_programs" on public.programs for all to authenticated using (true) with check (true);
create policy "write_episodes" on public.episodes for all to authenticated using (true) with check (true);
