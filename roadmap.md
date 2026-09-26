# Roadmap

## In progress
- [x] PATMOS homepage, continuation action, Bible-wide consultation, e-book banner, and 66-book grid with locally tracked chapter progress
- [x] Profile dropdown with identity and PRO status, reading, consultation history, library/e-books, subscription, account settings, and sign-out
- [x] Reading page no longer blanks: study-notes query is seeded with the loader result so the browser's first paint matches the server HTML (hydration mismatch removed)
- [x] `/api/chat` never returns a server error: 401 when signed out, plain-text "not available yet" reply while no model key is configured
- [x] Floating "Consulta Patmos" FAB (bottom-right, toggles panel; header buttons removed); fixed so it stays clickable while the panel is open (scroll-lock pointer-events override)
- [x] Internal Bible links in Consultas Patmos markdown navigate via SPA router (with #verse hash scroll); external http(s) links require confirmation dialog
- [x] PATMOS typography logo in the Consultas Patmos panel header (shared `src/components/brand/patmos-wordmark.tsx`)
- [x] PATMOS typography logo replaces book icon + "RV + Notas" in the site header; links to "/" and inverts to white in dark mode

## Waiting on user
- [ ] Supabase SQL Editor: `alter table public.user_notes add column if not exists end_verse int;` + `verses int[];`
- [ ] Supabase SQL Editor: run `supabase/patmos-consultas.sql`
- [ ] Supabase: enable email + Google auth; add `https://rvnotas.app` + preview URL as redirect URIs
- [ ] Account deletion needs `delete_own_account` DB function (SQL pending user confirmation)
- [ ] Create OpenAI API key and provide it (stored as `OPENAI_API_KEY`) — until then Consultas Patmos replies with "still not available" instead of real answers
