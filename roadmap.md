# Roadmap

## In progress
- [x] Floating "Consulta Patmos" FAB (bottom-right, toggles panel; header buttons removed); fixed so it stays clickable while the panel is open (scroll-lock pointer-events override)
- [x] PATMOS typography logo in the Consultas Patmos panel header (shared `src/components/brand/patmos-wordmark.tsx`)
- [x] PATMOS typography logo replaces book icon + "RV + Notas" in the site header; links to "/" and inverts to white in dark mode

## Waiting on user
- [ ] Supabase SQL Editor: `alter table public.user_notes add column if not exists end_verse int;` + `verses int[];`
- [ ] Supabase SQL Editor: run `supabase/patmos-consultas.sql`
- [ ] Supabase: enable email + Google auth; add `https://rvnotas.app` + preview URL as redirect URIs
- [ ] Account deletion needs `delete_own_account` DB function (SQL pending user confirmation)
- [ ] Create OpenAI API key and provide it (stored as `OPENAI_API_KEY`) — without it `/api/chat` returns 503
