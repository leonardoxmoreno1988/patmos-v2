-- Study notes (ES/EN), one row per anchored section of a chapter note ("<b>[3-5]</b> ...").
-- Filled by scripts/migrate-notes.ts. Public read; writes only through the service role.

create table if not exists public.bible_notes (
  id uuid primary key default gen_random_uuid(),
  book_usfm varchar(3) not null,
  chapter integer not null check (chapter > 0),
  verse_anchor varchar(50) not null,
  verse_start integer check (verse_start > 0),
  verse_end integer,
  kind varchar(20) not null default 'verse' check (kind in ('verse', 'range', 'section_heading')),
  position integer not null default 0,
  lang varchar(2) not null check (lang in ('es', 'en')),
  body_html text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (book_usfm, chapter, lang, position),
  -- Verse rows carry both bounds; section headings carry neither.
  check (
    (kind = 'section_heading' and verse_start is null and verse_end is null)
    or (kind <> 'section_heading' and verse_start is not null and verse_end >= verse_start)
  )
);

create index if not exists idx_bible_notes_lookup
  on public.bible_notes (book_usfm, chapter, lang);
create index if not exists idx_bible_notes_verse_range
  on public.bible_notes (book_usfm, chapter, verse_start, verse_end);

create or replace function public.bible_notes_touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bible_notes_touch_updated_at on public.bible_notes;
create trigger bible_notes_touch_updated_at
  before update on public.bible_notes
  for each row execute function public.bible_notes_touch_updated_at();

alter table public.bible_notes enable row level security;

drop policy if exists "bible_notes are public" on public.bible_notes;
create policy "bible_notes are public"
  on public.bible_notes for select
  to anon, authenticated
  using (true);

grant select on public.bible_notes to anon, authenticated;
grant all on public.bible_notes to service_role;
