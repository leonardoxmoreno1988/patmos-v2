import { BOOKS, slugifyBook } from "./bible";
import { BOOK_ALIASES, canonicalBook } from "./scripture-refs";

export type SlugLang = "es" | "en";

/**
 * Canonical URL slug of each book per language: "exodo" / "exodus", "revelacion" / "revelation".
 * Derived from the book names so the Spanish and English slugs can't drift from the book data.
 */
const SLUGS = new Map(
  BOOKS.map((b) => [b.bookid, { es: slugifyBook(b.name), en: slugifyBook(b.nameEn) }] as const),
);

const BY_SLUG = new Map<string, number>();
for (const book of BOOKS) {
  BY_SLUG.set(slugifyBook(book.name), book.bookid);
  BY_SLUG.set(slugifyBook(book.nameEn), book.bookid);
}

// Legacy and alternate names ("hechos", "apocalipsis", "salmo") resolve to their book; the route
// then redirects them to the canonical slug.
const BOOK_BY_NAME = new Map(BOOKS.map((b) => [b.name, b.bookid]));
for (const alias of Object.keys(BOOK_ALIASES)) {
  const bookid = BOOK_BY_NAME.get(canonicalBook(alias));
  if (bookid !== undefined) BY_SLUG.set(slugifyBook(alias), bookid);
}

/** Bookid for a Spanish, English, or alias slug (accent-insensitive); null when unknown. */
export function resolveBookSlug(slug: string): number | null {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    /* malformed escape: match the raw value */
  }
  return BY_SLUG.get(slugifyBook(decoded)) ?? null;
}

/** The canonical slug for a book in a language ("exodo" in Spanish, "exodus" in English). */
export function bookSlug(bookid: number, lang: SlugLang): string {
  const slugs = SLUGS.get(bookid);
  if (!slugs) throw new Error(`Libro desconocido: ${bookid}`);
  return slugs[lang];
}

/** Bookid for a Spanish canonical book name ("Éxodo"), as stored in notes and progress. */
export const bookIdOf = (name: string): number | null => BOOK_BY_NAME.get(name) ?? null;

/**
 * Reader URL for a chapter: /leer/exodo/1 (Spanish) or /en/read/exodus/1 (English). Pass a verse
 * to add its anchor.
 */
export function readerPath(lang: SlugLang, bookid: number, chapter: number, verse?: number): string {
  const base =
    lang === "en" ? `/en/read/${bookSlug(bookid, "en")}/${chapter}` : `/leer/${bookSlug(bookid, "es")}/${chapter}`;
  return verse ? `${base}#verse-${verse}` : base;
}


/**
 * Reader URL from a stored or displayed book reference: a Spanish or English slug, or a book name.
 * An unrecognised reference falls back to Genesis rather than building a broken link.
 */
export function readerPathForSlug(lang: SlugLang, slug: string, chapter: number, verse?: number): string {
  const bookid = resolveBookSlug(slug) ?? BOOKS[0]!.bookid;
  return readerPath(lang, bookid, chapter, verse);
}
