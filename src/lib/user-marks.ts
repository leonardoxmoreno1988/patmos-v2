import { supabase } from "@/lib/supabase";

export const HIGHLIGHT_COLORS = ["yellow", "green", "blue", "pink"] as const;
export type HighlightColor = (typeof HIGHLIGHT_COLORS)[number];

export const HIGHLIGHT_CLASS: Record<HighlightColor, string> = {
  yellow: "bg-amber-300/45 dark:bg-amber-400/25",
  green: "bg-emerald-300/45 dark:bg-emerald-400/25",
  blue: "bg-sky-300/45 dark:bg-sky-400/25",
  pink: "bg-pink-300/45 dark:bg-pink-400/25",
};

export const HIGHLIGHT_SWATCH: Record<HighlightColor, string> = {
  yellow: "bg-amber-400",
  green: "bg-emerald-400",
  blue: "bg-sky-400",
  pink: "bg-pink-400",
};

export const HIGHLIGHT_LABEL: Record<HighlightColor, string> = {
  yellow: "Amarillo",
  green: "Verde",
  blue: "Azul",
  pink: "Rosa",
};

export interface UserHighlight {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
  created_at: string;
}

export interface UserNote {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  content: string;
  created_at: string;
}

export interface UserBookmark {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  created_at: string;
}

export interface ChapterMarks {
  highlights: Record<number, UserHighlight>;
  notes: Record<number, UserNote>;
  bookmarks: Record<number, UserBookmark>;
}

const empty = (): ChapterMarks => ({ highlights: {}, notes: {}, bookmarks: {} });

const byVerse = <T extends { verse: number }>(rows: T[] | null) =>
  Object.fromEntries((rows ?? []).map((r) => [r.verse, r])) as Record<number, T>;

export async function fetchChapterMarks(
  userId: string,
  book: string,
  chapter: number,
): Promise<ChapterMarks> {
  const [highlights, notes, bookmarks] = await Promise.all([
    supabase
      .from("user_highlights")
      .select("id, book, chapter, verse, color, created_at")
      .eq("user_id", userId)
      .eq("book", book)
      .eq("chapter", chapter),
    supabase
      .from("user_notes")
      .select("id, book, chapter, verse, content, created_at")
      .eq("user_id", userId)
      .eq("book", book)
      .eq("chapter", chapter),
    supabase
      .from("user_bookmarks")
      .select("id, book, chapter, verse, created_at")
      .eq("user_id", userId)
      .eq("book", book)
      .eq("chapter", chapter),
  ]);

  if (highlights.error) throw highlights.error;
  if (notes.error) throw notes.error;
  if (bookmarks.error) throw bookmarks.error;

  return {
    highlights: byVerse(highlights.data as UserHighlight[] | null),
    notes: byVerse(notes.data as UserNote[] | null),
    bookmarks: byVerse(bookmarks.data as UserBookmark[] | null),
  };
}

export const chapterMarksQuery = (
  userId: string | null,
  book: string,
  chapter: number,
) => ({
  queryKey: ["user-marks", userId, book, chapter],
  queryFn: () => (userId ? fetchChapterMarks(userId, book, chapter) : Promise.resolve(empty())),
  enabled: !!userId,
  staleTime: 30_000,
});

interface Target {
  userId: string;
  book: string;
  chapter: number;
  verse: number;
}

export async function setHighlight(t: Target, color: HighlightColor) {
  const { error } = await supabase.from("user_highlights").upsert(
    {
      user_id: t.userId,
      book: t.book,
      chapter: t.chapter,
      verse: t.verse,
      color,
    },
    { onConflict: "user_id,book,chapter,verse" },
  );
  if (error) throw error;
}

export async function removeHighlight(t: Target) {
  const { error } = await supabase
    .from("user_highlights")
    .delete()
    .eq("user_id", t.userId)
    .eq("book", t.book)
    .eq("chapter", t.chapter)
    .eq("verse", t.verse);
  if (error) throw error;
}

export async function saveNote(t: Target, content: string) {
  const { error } = await supabase.from("user_notes").upsert(
    {
      user_id: t.userId,
      book: t.book,
      chapter: t.chapter,
      verse: t.verse,
      content,
    },
    { onConflict: "user_id,book,chapter,verse" },
  );
  if (error) throw error;
}

export async function deleteNote(t: Target) {
  const { error } = await supabase
    .from("user_notes")
    .delete()
    .eq("user_id", t.userId)
    .eq("book", t.book)
    .eq("chapter", t.chapter)
    .eq("verse", t.verse);
  if (error) throw error;
}

export async function toggleBookmark(t: Target, on: boolean) {
  if (on) {
    const { error } = await supabase.from("user_bookmarks").upsert(
      { user_id: t.userId, book: t.book, chapter: t.chapter, verse: t.verse },
      { onConflict: "user_id,book,chapter,verse" },
    );
    if (error) throw error;
    return;
  }
  const { error } = await supabase
    .from("user_bookmarks")
    .delete()
    .eq("user_id", t.userId)
    .eq("book", t.book)
    .eq("chapter", t.chapter)
    .eq("verse", t.verse);
  if (error) throw error;
}
