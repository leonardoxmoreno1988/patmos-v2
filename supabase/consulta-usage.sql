-- Consultas Patmos: one row per free consulta answered, for the daily limit (FREE_DAILY_LIMIT).
-- Written and counted only by the server with the service-role key; users can't read, add or
-- delete rows, so clearing the history (chat_history) no longer resets the limit.
create table if not exists public.consulta_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

revoke all on public.consulta_usage from anon, authenticated;
grant all on public.consulta_usage to service_role;

-- RLS on with no policies: only the service role (which bypasses RLS) can touch the table.
alter table public.consulta_usage enable row level security;

create index if not exists consulta_usage_user_day_idx on public.consulta_usage (user_id, created_at);
