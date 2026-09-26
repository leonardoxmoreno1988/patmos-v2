-- Consultas Patmos: una conversación por usuario.
create table if not exists public.patmos_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  message_id text not null,
  role text not null check (role in ('user', 'assistant')),
  parts jsonb not null,
  created_at timestamptz not null default now(),
  unique (user_id, message_id)
);

grant select, insert, update, delete on public.patmos_messages to authenticated;
grant all on public.patmos_messages to service_role;

alter table public.patmos_messages enable row level security;

drop policy if exists "own rows select" on public.patmos_messages;
drop policy if exists "own rows insert" on public.patmos_messages;
drop policy if exists "own rows update" on public.patmos_messages;
drop policy if exists "own rows delete" on public.patmos_messages;
create policy "own rows select" on public.patmos_messages for select to authenticated using (auth.uid() = user_id);
create policy "own rows insert" on public.patmos_messages for insert to authenticated with check (auth.uid() = user_id);
create policy "own rows update" on public.patmos_messages for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows delete" on public.patmos_messages for delete to authenticated using (auth.uid() = user_id);

create index if not exists patmos_messages_user_idx on public.patmos_messages (user_id, created_at);
