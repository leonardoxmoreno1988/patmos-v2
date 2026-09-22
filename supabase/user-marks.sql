-- RVNotas: resaltados, notas personales y marcadores por versículo.
-- Ejecuta este script una sola vez en Supabase → SQL Editor.

create table if not exists public.user_highlights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book text not null,
  chapter int not null,
  verse int not null,
  color text not null check (color in ('yellow','green','blue','pink')),
  created_at timestamptz not null default now(),
  unique (user_id, book, chapter, verse)
);

create table if not exists public.user_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book text not null,
  chapter int not null,
  verse int not null,
  content text not null,
  created_at timestamptz not null default now(),
  unique (user_id, book, chapter, verse)
);

create table if not exists public.user_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book text not null,
  chapter int not null,
  verse int not null,
  created_at timestamptz not null default now(),
  unique (user_id, book, chapter, verse)
);

grant select, insert, update, delete on public.user_highlights to authenticated;
grant select, insert, update, delete on public.user_notes to authenticated;
grant select, insert, update, delete on public.user_bookmarks to authenticated;
grant all on public.user_highlights to service_role;
grant all on public.user_notes to service_role;
grant all on public.user_bookmarks to service_role;

alter table public.user_highlights enable row level security;
alter table public.user_notes enable row level security;
alter table public.user_bookmarks enable row level security;

do $$
declare t text;
begin
  foreach t in array array['user_highlights','user_notes','user_bookmarks'] loop
    execute format('drop policy if exists "own rows select" on public.%I', t);
    execute format('drop policy if exists "own rows insert" on public.%I', t);
    execute format('drop policy if exists "own rows update" on public.%I', t);
    execute format('drop policy if exists "own rows delete" on public.%I', t);
    execute format('create policy "own rows select" on public.%I for select to authenticated using (auth.uid() = user_id)', t);
    execute format('create policy "own rows insert" on public.%I for insert to authenticated with check (auth.uid() = user_id)', t);
    execute format('create policy "own rows update" on public.%I for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
    execute format('create policy "own rows delete" on public.%I for delete to authenticated using (auth.uid() = user_id)', t);
  end loop;
end $$;

create index if not exists user_highlights_chapter_idx on public.user_highlights (user_id, book, chapter);
create index if not exists user_notes_chapter_idx on public.user_notes (user_id, book, chapter);
create index if not exists user_bookmarks_chapter_idx on public.user_bookmarks (user_id, book, chapter);
