-- Progreso de lectura por cuenta (capítulos leídos por libro).
-- Ejecutar en el SQL Editor de Supabase.

create table if not exists public.user_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  book_slug text not null,
  chapter int not null check (chapter >= 1),
  created_at timestamptz not null default now(),
  primary key (user_id, book_slug, chapter)
);

alter table public.user_progress enable row level security;

create policy "users read own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "users insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "users delete own progress"
  on public.user_progress for delete
  using (auth.uid() = user_id);
