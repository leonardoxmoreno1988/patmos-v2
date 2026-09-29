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
- [x] Homepage primary buttons invert to white/dark text in dark mode; hero secondary action is "Consultar Patmos" (chat icon) opening the panel in Bible-wide mode; "Mi Biblioteca" keeps only Marcadores/Resaltados/Notas, downloads moved to the new "Recursos" window (`src/components/library/resources-sheet.tsx`)
- [x] Consultas Patmos panel: "Modo: Exégesis Libre…" helper line removed; empty state uses the inline `SacredScripturesIcon` (open-book glyph, theme-tinted) instead of the old PNG seal
- [x] Homepage grid section heading renamed to "Progreso de las Notas" (subtitle untouched); reader FAB now leads with the Lucide `MessageSquare` icon before "Consulta Patmos"
- [x] Mobile UX pass: hero drops the duplicated PATMOS wordmark (heading kept for screen readers), panel header drops the visible subtitle, "Historial"/"Nueva Consulta" collapse to icon buttons below `sm`, scope pills shorten on mobile, and the empty state tightens its vertical rhythm so the composer fits

## Waiting on user
- [ ] Supabase SQL Editor: `alter table public.user_notes add column if not exists end_verse int;` + `verses int[];`
- [ ] Supabase SQL Editor: run `supabase/patmos-consultas.sql`
- [ ] Supabase: enable email + Google auth; add `https://www.patmosresearch.com` + preview URLs as redirect URIs
- [ ] Account deletion needs `delete_own_account` DB function (SQL pending user confirmation)