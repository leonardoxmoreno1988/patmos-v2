import { BOOKS } from "./bible";
import { bookSlug, resolveBookSlug, type SlugLang } from "./bible-slugs";

/**
 * Typed `<Link>` props for a reader chapter. TanStack needs a literal `to` (an `href` alone is
 * rejected), so each language gets its own route literal. Use as `<Link {...readerLinkProps(...)}>`.
 */
export type ReaderLinkProps =
  | { to: "/leer/$libro/$cap"; params: { libro: string; cap: string }; hash?: string }
  | { to: "/en/read/$libro/$cap"; params: { libro: string; cap: string }; hash?: string };

/** Book is a Spanish or English slug or a book name; an unknown one falls back to Genesis. */
export function readerLinkProps(lang: SlugLang, book: string, chapter: number, hash?: string): ReaderLinkProps {
  const bookid = resolveBookSlug(book) ?? BOOKS[0]!.bookid;
  const params = { libro: bookSlug(bookid, lang), cap: String(chapter) };
  const anchor = hash ? { hash } : {};
  return lang === "en" ? { to: "/en/read/$libro/$cap", params, ...anchor } : { to: "/leer/$libro/$cap", params, ...anchor };
}
