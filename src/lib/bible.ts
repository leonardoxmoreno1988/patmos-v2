export const TRANSLATION = "RV1960";

export interface BookInfo {
  bookid: number;
  name: string;
  chapters: number;
}

export interface Verse {
  verse: number;
  text: string;
}

const API = "https://bolls.life";

export async function fetchBooks(): Promise<BookInfo[]> {
  const res = await fetch(`${API}/get-books/${TRANSLATION}/`);
  if (!res.ok) throw new Error("No se pudieron cargar los libros");
  const data = (await res.json()) as BookInfo[];
  return data.map((b) => ({ bookid: b.bookid, name: b.name, chapters: b.chapters }));
}

export async function fetchChapter(bookid: number, chapter: number): Promise<Verse[]> {
  const res = await fetch(`${API}/get-chapter/${TRANSLATION}/${bookid}/${chapter}/`);
  if (!res.ok) throw new Error("No se pudo cargar el capítulo");
  const data = (await res.json()) as Verse[];
  return data.map((v) => ({ verse: v.verse, text: cleanText(v.text) }));
}

function cleanText(text: string) {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export const booksQuery = {
  queryKey: ["bible", "books"],
  queryFn: fetchBooks,
  staleTime: Infinity,
};

export const chapterQuery = (bookid: number, chapter: number) => ({
  queryKey: ["bible", "chapter", bookid, chapter],
  queryFn: () => fetchChapter(bookid, chapter),
  staleTime: 1000 * 60 * 60,
});