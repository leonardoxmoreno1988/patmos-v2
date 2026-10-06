import type { Lang } from "@/i18n";
import { BOOKS, fetchBook, type Chapter } from "./bible";
import type { NotesMap } from "./notes";

/** Lowercases and strips accents while preserving string length (indices stay aligned). */
export const norm = (s: string) =>
	Array.from(s)
		.map((ch) => {
			const base = ch.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			return (base === "" ? ch : base[0]!).toLowerCase();
		})
		.join("");

export const stripHtml = (html: string) =>
	html
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/\s{2,}/g, " ")
		.trim();

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Whole-word matcher: "mar" matches "mar," or "(mar)" but never "tomaron". */
export function queryRegex(q: string) {
	return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(norm(q.trim()))}(?![\\p{L}\\p{N}])`, "u");
}

/** Index of the first whole-word match of `query` inside `text`, or -1. */
export function matchIndex(text: string, query: string) {
	const q = query.trim();
	if (!q) return -1;
	return norm(text).search(queryRegex(q));
}

export const matchesWord = (text: string, query: string) => matchIndex(text, query) >= 0;

/** Returns a snippet around the first match. `pad` controls the context size. */
export function snippet(text: string, query: string, pad = 45, tail = 75) {
	const i = matchIndex(text, query);
	if (i < 0) return text.slice(0, pad + tail);
	const start = Math.max(0, i - pad);
	const end = Math.min(text.length, i + query.trim().length + tail);
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
	if (q.trim().length < 3 || !notes) return [];
	const re = queryRegex(q);
	const out: Hit[] = [];
	for (const [key, html] of Object.entries(notes)) {
		const text = stripHtml(html);
		const idx = key.lastIndexOf("-");
		const bookName = key.slice(0, idx);
		const chapter = Number(key.slice(idx + 1));
		const titleMatch = re.test(norm(bookName)) || re.test(String(chapter));
		const bodyMatch = re.test(norm(text));
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
	if (q.trim().length < 3) return [];
	const re = queryRegex(q);
	const out: Hit[] = [];
	for (const book of books) {
		for (const ch of book.chapters) {
			for (const v of ch.verses) {
				const titleMatch =
					re.test(norm(book.name)) ||
					`${ch.chapter}:${v.verse}` === q.trim() ||
					re.test(String(ch.chapter));
				const bodyMatch = re.test(norm(v.text));
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
export async function fetchAllBooks(lang: Lang = "es"): Promise<LoadedBook[]> {
	const out: LoadedBook[] = [];
	const queue = [...BOOKS];
	const workers = Array.from({ length: 8 }, async () => {
		for (;;) {
			const book = queue.shift();
			if (!book) return;
			try {
				out.push({ bookid: book.bookid, name: book.name, chapters: await fetchBook(book.bookid, lang) });
			} catch {
				/* skip unavailable book */
			}
		}
	});
	await Promise.all(workers);
	return out.sort((a, b) => a.bookid - b.bookid);
}

export const allBooksQuery = (lang: Lang = "es") => ({
	queryKey: ["bible", "all-books", lang],
	queryFn: () => fetchAllBooks(lang),
	staleTime: Infinity,
	gcTime: Infinity,
});
