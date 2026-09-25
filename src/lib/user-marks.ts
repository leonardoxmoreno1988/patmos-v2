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
  end_verse?: number | null;
  verses?: number[] | null;
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
      .select("*")
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

  if (highlights.error) throw friendly(highlights.error);
  if (notes.error) throw friendly(notes.error);
  // Los marcadores son opcionales: si la tabla aún no existe, seguimos sin ellos.

  return {
    highlights: byVerse(highlights.data as UserHighlight[] | null),
    notes: byVerse(notes.data as UserNote[] | null),
    bookmarks: bookmarks.error ? {} : byVerse(bookmarks.data as UserBookmark[] | null),
  };
}

function friendly(error: { message?: string; code?: string }): Error {
  const code = error.code ?? "";
  if (code === "42P01") {
    return new Error("Falta crear esta tabla en la base de datos.");
  }
  if (code === "42501" || code === "PGRST301") {
    return new Error("Inicia sesión de nuevo para guardar tus marcas.");
  }
  return new Error(error.message || "No pudimos guardar el cambio.");
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

export interface LibraryData {
  bookmarks: UserBookmark[];
  highlights: UserHighlight[];
  notes: UserNote[];
}

export async function fetchLibrary(userId: string): Promise<LibraryData> {
  const order = { column: "created_at", ascending: false } as const;
  const [bookmarks, highlights, notes] = await Promise.all([
    supabase
      .from("user_bookmarks")
      .select("id, book, chapter, verse, created_at")
      .eq("user_id", userId)
      .order(order.column, { ascending: order.ascending }),
    supabase
      .from("user_highlights")
      .select("id, book, chapter, verse, color, created_at")
      .eq("user_id", userId)
      .order(order.column, { ascending: order.ascending }),
    supabase
      .from("user_notes")
      .select("*")
      .eq("user_id", userId)
      .order(order.column, { ascending: order.ascending }),
  ]);

  if (highlights.error) throw friendly(highlights.error);
  if (notes.error) throw friendly(notes.error);

  return {
    bookmarks: bookmarks.error ? [] : ((bookmarks.data ?? []) as UserBookmark[]),
    highlights: (highlights.data ?? []) as UserHighlight[],
    notes: (notes.data ?? []) as UserNote[],
  };
}

export const libraryQuery = (userId: string | null) => ({
  queryKey: ["user-library", userId],
  queryFn: () =>
    userId
      ? fetchLibrary(userId)
      : Promise.resolve({ bookmarks: [], highlights: [], notes: [] } as LibraryData),
  enabled: !!userId,
  staleTime: 30_000,
});

type MarkTable = "user_bookmarks" | "user_highlights" | "user_notes";

export async function deleteMarkById(table: MarkTable, id: string) {
  const { data } = await supabase.auth.getSession();
  const user_id = data.session?.user?.id;
  if (!user_id) throw new Error("Inicia sesión para editar tu biblioteca.");
  const { error } = await supabase.from(table).delete().eq("id", id).eq("user_id", user_id);
  if (error) throw friendly(error);
}

export async function deleteMarksByIds(table: MarkTable, ids: string[]) {
  if (ids.length === 0) return;
  const { data } = await supabase.auth.getSession();
  const user_id = data.session?.user?.id;
  if (!user_id) throw new Error("Inicia sesión para editar tu biblioteca.");
  const { error } = await supabase.from(table).delete().in("id", ids).eq("user_id", user_id);
  if (error) throw friendly(error);
}

interface Target {
  userId: string;
  book: string;
  chapter: number;
  verse: number;
}

// Siempre escribimos con el id de la sesión activa, para que coincida con auth.uid() en RLS.
async function sessionUserId(fallback: string): Promise<string> {
  const { data } = await supabase.auth.getSession();
  const id = data.session?.user?.id;
  if (!id) throw new Error("Inicia sesión para guardar tus marcas.");
  return id || fallback;
}

export async function setHighlight(t: Target, color: HighlightColor) {
  const user_id = await sessionUserId(t.userId);
  const { error } = await supabase.from("user_highlights").upsert(
    { user_id, book: t.book, chapter: t.chapter, verse: t.verse, color },
    { onConflict: "user_id,book,chapter,verse" },
  );
  if (error) throw friendly(error);
}

export async function removeHighlight(t: Target) {
  const user_id = await sessionUserId(t.userId);
  const { error } = await supabase
    .from("user_highlights")
    .delete()
    .eq("user_id", user_id)
    .eq("book", t.book)
    .eq("chapter", t.chapter)
    .eq("verse", t.verse);
  if (error) throw friendly(error);
}

export async function saveNote(
  t: Target,
  content: string,
  verses: number[] = [t.verse],
): Promise<{ rangeSaved: boolean }> {
  const user_id = await sessionUserId(t.userId);
  const sorted = [...new Set(verses)].sort((a, b) => a - b);
  const base = { user_id, book: t.book, chapter: t.chapter, verse: sorted[0] ?? t.verse, content };
  const opts = { onConflict: "user_id,book,chapter,verse" };
  let { error } = await supabase
    .from("user_notes")
    .upsert({ ...base, end_verse: sorted[sorted.length - 1] ?? t.verse, verses: sorted }, opts);
  // Si aún no existen las columnas de rango, guardamos la nota en el primer versículo.
  if (error && (error.code === "42703" || error.code === "PGRST204")) {
    ({ error } = await supabase.from("user_notes").upsert(base, opts));
    if (error) throw friendly(error);
    return { rangeSaved: false };
  }
  if (error) throw friendly(error);
  return { rangeSaved: true };
}

export async function deleteNote(t: Target) {
  const user_id = await sessionUserId(t.userId);
  const { error } = await supabase
    .from("user_notes")
    .delete()
    .eq("user_id", user_id)
    .eq("book", t.book)
    .eq("chapter", t.chapter)
    .eq("verse", t.verse);
  if (error) throw friendly(error);
}

export async function toggleBookmark(t: Target, on: boolean) {
  const user_id = await sessionUserId(t.userId);
  if (on) {
    const { error } = await supabase.from("user_bookmarks").upsert(
      { user_id, book: t.book, chapter: t.chapter, verse: t.verse },
      { onConflict: "user_id,book,chapter,verse" },
    );
    if (error) throw friendly(error);
    return;
  }
  const { error } = await supabase
    .from("user_bookmarks")
    .delete()
    .eq("user_id", user_id)
    .eq("book", t.book)
    .eq("chapter", t.chapter)
    .eq("verse", t.verse);
  if (error) throw friendly(error);
}

