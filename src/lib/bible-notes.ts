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
export const noteLabel = (note: BibleNote) =>
  note.kind === "section_heading" && note.verse_anchor === "intro" ? null : `[${note.verse_anchor}]`;

/** The whole chapter note as one HTML string, as the CSV used to store it (SEO excerpt, Consulta context). */
export const notesToHtml = (notes: BibleNote[]) =>
  notes
    .map((n) => {
      const label = noteLabel(n);
      return label ? `<b>${label}</b> ${n.body_html}` : n.body_html;
    })
    .join("<br>");
