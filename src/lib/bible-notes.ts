import type { Lang } from "@/i18n";
import { supabase } from "@/lib/supabase";
import { BOOKS, CHAPTER_COUNTS } from "./bible";

/** One anchored section of a chapter's study note (table bible_notes, filled by scripts/migrate-notes.ts). */
export interface BibleNote {
  id: string;
  /** "3-5", "1, 5-6", a heading such as "Book Structure", or "intro" for text before the first anchor. */
  verse_anchor: string;
  verse_start: number | null;
  verse_end: number | null;
  kind: "verse" | "range" | "section_heading";
  position: number;
  body_html: string;
}

const COLUMNS = "id, verse_anchor, verse_start, verse_end, kind, position, body_html";

/** Sections of one chapter's note in reading order; empty when the chapter has no note in `lang`. */
export async function fetchChapterNotes(bookUsfm: string, chapter: number, lang: Lang): Promise<BibleNote[]> {
  const { data, error } = await supabase
    .from("bible_notes")
    .select(COLUMNS)
    .eq("book_usfm", bookUsfm)
    .eq("chapter", chapter)
    .eq("lang", lang)
    .order("position", { ascending: true });
  if (error) throw new Error(`No se pudieron cargar las notas de estudio: ${error.message}`);
  return data as BibleNote[];
}

export const chapterNotesQuery = (bookUsfm: string, chapter: number, lang: Lang) => ({
  queryKey: ["bible-notes", bookUsfm, chapter, lang] as const,
  queryFn: () => fetchChapterNotes(bookUsfm, chapter, lang),
  // Notes only change when the import script runs; keep every visited chapter for the whole session
  // so going back to it never waits on the network.
  staleTime: Infinity,
  gcTime: Infinity,
});

/** The chapters before and after (crossing book boundaries), for prefetching. */
export function adjacentChapters(bookid: number, chapter: number): { bookUsfm: string; chapter: number }[] {
  const book = BOOKS[bookid - 1];
  if (!book) return [];
  const out: { bookUsfm: string; chapter: number }[] = [];
  if (chapter > 1) out.push({ bookUsfm: book.code, chapter: chapter - 1 });
  else if (BOOKS[bookid - 2]) out.push({ bookUsfm: BOOKS[bookid - 2]!.code, chapter: 1 });
  if (chapter < (CHAPTER_COUNTS[bookid] ?? 0)) out.push({ bookUsfm: book.code, chapter: chapter + 1 });
  else if (BOOKS[bookid]) out.push({ bookUsfm: BOOKS[bookid]!.code, chapter: 1 });
  return out;
}

/** Label shown before a section ("[3-5]", "[Book Structure]"); null for the untitled intro. */
export const noteLabel = (note: Pick<BibleNote, "kind" | "verse_anchor">) =>
  note.kind === "section_heading" && note.verse_anchor === "intro" ? null : `[${note.verse_anchor}]`;

/** The whole chapter note as one HTML string, as the CSV used to store it (SEO excerpt, Consulta context). */
export const notesToHtml = (notes: Pick<BibleNote, "kind" | "verse_anchor" | "body_html">[]) =>
  notes
    .map((n) => {
      const label = noteLabel(n);
      return label ? `<b>${label}</b> ${n.body_html}` : n.body_html;
    })
    .join("<br>");

const PAGE_SIZE = 1000;

/** Every row of `lang`, in reading order. PostgREST caps a response at 1000 rows, so this pages. */
async function fetchAllRows<T>(columns: string, lang: Lang): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("bible_notes")
      .select(columns)
      .eq("lang", lang)
      .order("book_usfm")
      .order("chapter")
      .order("position")
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`No se pudieron cargar las notas de estudio: ${error.message}`);
    rows.push(...(data as unknown as T[]));
    if (data.length < PAGE_SIZE) return rows;
  }
}

const BOOK_BY_CODE = new Map(BOOKS.map((b) => [b.code, b]));

/** Chapters that have a note, per bookid. Feeds the home progress grid. */
export type NotesCoverage = Record<number, number[]>;

export async function fetchNotesCoverage(lang: Lang): Promise<NotesCoverage> {
  const rows = await fetchAllRows<{ book_usfm: string; chapter: number }>("book_usfm, chapter", lang);
  const chapters = new Map<number, Set<number>>();
  for (const row of rows) {
    const book = BOOK_BY_CODE.get(row.book_usfm);
    if (!book) continue;
    if (!chapters.has(book.bookid)) chapters.set(book.bookid, new Set());
    chapters.get(book.bookid)!.add(row.chapter);
  }
  const coverage: NotesCoverage = {};
  for (const [bookid, set] of chapters) coverage[bookid] = [...set].sort((a, b) => a - b);
  return coverage;
}

export const notesCoverageQuery = (lang: Lang) => ({
  queryKey: ["bible-notes", "coverage", lang] as const,
  queryFn: () => fetchNotesCoverage(lang),
  staleTime: Infinity,
  gcTime: Infinity,
});

/** One chapter's whole note, for full-text search. `book` is the canonical (Spanish) book name. */
export interface ChapterNoteText {
  bookid: number;
  book: string;
  chapter: number;
  html: string;
}

/** Every chapter note in `lang` (~1.7 MB), in canonical book order. */
export async function fetchAllChapterNotes(lang: Lang): Promise<ChapterNoteText[]> {
  type Row = Pick<BibleNote, "kind" | "verse_anchor" | "body_html"> & { book_usfm: string; chapter: number };
  const rows = await fetchAllRows<Row>("book_usfm, chapter, kind, verse_anchor, body_html", lang);
  const byChapter = new Map<string, Row[]>();
  for (const row of rows) {
    const key = `${row.book_usfm} ${row.chapter}`;
    if (!byChapter.has(key)) byChapter.set(key, []);
    byChapter.get(key)!.push(row);
  }
  const out: ChapterNoteText[] = [];
  for (const sections of byChapter.values()) {
    const book = BOOK_BY_CODE.get(sections[0]!.book_usfm);
    if (book) out.push({ bookid: book.bookid, book: book.name, chapter: sections[0]!.chapter, html: notesToHtml(sections) });
  }
  return out.sort((a, b) => a.bookid - b.bookid || a.chapter - b.chapter);
}

export const allChapterNotesQuery = (lang: Lang) => ({
  queryKey: ["bible-notes", "all", lang] as const,
  queryFn: () => fetchAllChapterNotes(lang),
  staleTime: Infinity,
  gcTime: Infinity,
});
