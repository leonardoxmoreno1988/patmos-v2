-- Lemon Squeezy subscriptions, one row per user, kept in sync by the webhook
-- (src/lib/patmos/lemonsqueezy-webhook.server.ts) with the service-role key.
-- The table already exists from Patmos v1; "if not exists" leaves it untouched and only documents
-- the columns the app uses.
create table if not exists public.subscriptions (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lemonsqueezy_sub_id text,
  status text,
  price_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One row per user (the webhook updates it in place). Fails if a user already has several rows:
-- keep the newest and delete the rest first.
create unique index if not exists subscriptions_user_id_key on public.subscriptions (user_id);

-- Users may only read their own row. Without write privileges, no policy can let a user mark
-- themselves premium; only the service role (webhook) writes.
revoke insert, update, delete on public.subscriptions from anon, authenticated;
grant select on public.subscriptions to authenticated;
grant all on public.subscriptions to service_role;

alter table public.subscriptions enable row level security;

drop policy if exists "own rows select" on public.subscriptions;
create policy "own rows select" on public.subscriptions for select to authenticated using (auth.uid() = user_id);
