import type { Lang } from "@/i18n";
import { BOOKS, bookName, fetchBook } from "@/lib/bible";
import { canonicalBook } from "@/lib/scripture-refs";

export interface ParsedReference {
	book: string;
	chapter: number;
	verseFrom: number;
	verseTo: number;
	label: string;
}

const normName = (s: string) =>
	s
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.trim();

/** Parses "Job 3:3" or "Génesis 1:1-3" (aliases like "Salmo"/"Hechos" included). */
export function parseReference(input: string): ParsedReference | null {
	const ref = input.trim().replace(/\s{2,}/g, " ");
	const m = /^(.+?)\s+(\d+)\s*[:.]\s*(\d+)(?:\s*[-–]\s*(\d+))?$/.exec(ref);
	if (!m) return null;
	const rawBook = m[1]!.trim();
	const target = normName(canonicalBook(rawBook));
	const book = BOOKS.find((b) => normName(b.name) === target);
	if (!book) return null;
	const chapter = Number(m[2]);
	const verseFrom = Number(m[3]);
	const verseTo = m[4] ? Math.max(Number(m[4]), verseFrom) : verseFrom;
	const range = m[4] ? `-${verseTo}` : "";
	return {
		book: book.name,
		chapter,
		verseFrom,
		verseTo,
		label: `${book.name} ${chapter}:${verseFrom}${range}`,
	};
}

async function verseText(ref: ParsedReference, lang: Lang): Promise<string | null> {
	try {
		const chapters = await fetchBook(BOOKS.find((b) => b.name === ref.book)!.bookid, lang);
		const chapter = chapters.find((c) => c.chapter === ref.chapter);
		if (!chapter) return null;
		const verses = chapter.verses.filter(
			(v) => v.verse >= ref.verseFrom && v.verse <= ref.verseTo,
		);
		if (verses.length === 0) return null;
		return verses.map((v) => v.text).join(" ");
	} catch {
		return null;
	}
}

/**
 * Replaces `{{cita:Ref|fragmento_opcional}}` placeholders in raw HTML with the
 * exact wording from the local Bible data: `"Texto Oficial" (Referencia)` —
 * RV1865 with Spanish book names, or the KJV with English names for `lang` "en".
 * When a fragment is given, only that substring is quoted, preserving the
 * official casing and punctuation found in the text (case-insensitive lookup).
 */
export async function hydrateCitations(rawHtml: string, lang: Lang = "es"): Promise<string> {
	const re = /\{\{cita:([^|}]+?)(?:\|([^}]*?))?\}\}/g;
	const matches = [...rawHtml.matchAll(re)];
	if (matches.length === 0) return rawHtml;

	const replacements = await Promise.all(
		matches.map(async (m) => {
			const ref = parseReference(m[1] ?? "");
			if (!ref) return m[0];
			const full = await verseText(ref, lang);
			if (!full) return m[0];
			const fragment = m[2]?.trim();
			let quote = full;
			if (fragment) {
				const i = full.toLowerCase().indexOf(fragment.toLowerCase());
				if (i >= 0) quote = full.slice(i, i + fragment.length);
			}
			const book = BOOKS.find((b) => b.name === ref.book)!;
			const label = ref.label.replace(ref.book, bookName(book, lang));
			return `"${quote}" (${label})`;
		}),
	);

	let out = "";
	let last = 0;
	matches.forEach((m, i) => {
		out += rawHtml.slice(last, m.index!) + replacements[i];
		last = m.index! + m[0].length;
	});
	return out + rawHtml.slice(last);
}
