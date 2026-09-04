import { BOOKS, fetchBook, type Chapter } from "./bible";
import type { NotesMap } from "./notes";

export const norm = (s: string) =>
	s
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();

export const stripHtml = (html: string) =>
	html
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/\s{2,}/g, " ")
		.trim();

/** Returns a snippet around the first match. `pad` controls the context size. */
export function snippet(text: string, query: string, pad = 45, tail = 75) {
	const i = norm(text).indexOf(norm(query));
	if (i < 0) return text.slice(0, pad + tail);
	const start = Math.max(0, i - pad);
	const end = Math.min(text.length, i + query.length + tail);
	return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

export interface Hit {
	key: string;
	book: string;
	chapter: number;
	verse?: number;
	snippet: string;
	score: number;
}

export function searchNotes(notes: NotesMap | undefined, q: string, full = false): Hit[] {
	if (q.length < 3 || !notes) return [];
	const nq = norm(q);
	const out: Hit[] = [];
	for (const [key, html] of Object.entries(notes)) {
		const text = stripHtml(html);
		const idx = key.lastIndexOf("-");
		const bookName = key.slice(0, idx);
		const chapter = Number(key.slice(idx + 1));
		const titleMatch = norm(bookName).includes(nq) || String(chapter).includes(q);
		const bodyMatch = norm(text).includes(nq);
		if (titleMatch || bodyMatch) {
			out.push({
				key: `note-${key}`,
				book: bookName,
				chapter,
				snippet: full ? snippet(text, q, 120, 220) : snippet(text, q),
				score: (titleMatch ? 2 : 0) + (bodyMatch ? 1 : 0),
			});
		}
	}
	return out.sort((a, b) => b.score - a.score);
}

export function searchVerses(
	books: { bookid: number; name: string; chapters: Chapter[] }[],
	q: string,
	full = false,
): Hit[] {
	if (q.length < 3) return [];
	const nq = norm(q);
	const out: Hit[] = [];
	for (const book of books) {
		for (const ch of book.chapters) {
			for (const v of ch.verses) {
				const titleMatch =
					norm(book.name).includes(nq) ||
					`${ch.chapter}:${v.verse}`.includes(q) ||
					String(ch.chapter).includes(q);
				const bodyMatch = norm(v.text).includes(nq);
				if (titleMatch || bodyMatch) {
					out.push({
						key: `v-${book.bookid}-${ch.chapter}-${v.verse}`,
						book: book.name,
						chapter: ch.chapter,
						verse: v.verse,
						snippet: full ? v.text : snippet(v.text, q),
						score: (titleMatch ? 2 : 0) + (bodyMatch ? 1 : 0),
					});
				}
			}
		}
	}
	return out.sort((a, b) => b.score - a.score);
}

export interface LoadedBook {
	bookid: number;
	name: string;
	chapters: Chapter[];
}

/** Fetches every book (bounded concurrency) so the search page can scan the whole Bible. */
export async function fetchAllBooks(): Promise<LoadedBook[]> {
	const out: LoadedBook[] = [];
	const queue = [...BOOKS];
	const workers = Array.from({ length: 8 }, async () => {
		for (;;) {
			const book = queue.shift();
			if (!book) return;
			try {
				out.push({ bookid: book.bookid, name: book.name, chapters: await fetchBook(book.bookid) });
			} catch {
				/* skip unavailable book */
			}
		}
	});
	await Promise.all(workers);
	return out.sort((a, b) => a.bookid - b.bookid);
}

export const allBooksQuery = {
	queryKey: ["bible", "all-books"],
	queryFn: fetchAllBooks,
	staleTime: Infinity,
	gcTime: Infinity,
};
