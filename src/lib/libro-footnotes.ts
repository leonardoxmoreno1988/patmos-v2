import { bookIdOf } from "./bible-slugs";
import { canonicalBook, splitScriptureRefs } from "./scripture-refs";
import { BOOKS } from "./bible";

/** A Bible passage to quote: consecutive verses of one chapter. */
export interface VerseRange {
  bookid: number;
  chapter: number;
  from: number;
  to: number;
}

/** One reference from a footnote block, e.g. `12 Proverbios 22:28`. */
export interface FootnoteEntry extends VerseRange {
  number: number;
  label: string;
}

export const verseKey = (r: VerseRange) => `${r.bookid}:${r.chapter}:${r.from}-${r.to}`;

// "12 Proverbios 22:28", "2 1 Juan 3:12-13", "Revelación (Apocalipsis) 3:17c", "18:14-22 y 25-27".
const ENTRY_RE = /(\d{1,3})\s+((?:[1-3]\s+)?[^\d\n:]+?)\s+(\d{1,3}):(\d{1,3})[a-c]?(?:\s*[-–]\s*(\d{1,3})[a-c]?)?/g;
const BLOCK_RE = /^\d{1,3}\s+(?:[1-3]\s+)?[^\d\n:]+?\s+\d{1,3}:\d/;

/** A footnote block is one short line that opens with a number and a Scripture reference. */
export function isFootnoteBlock(text: string): boolean {
  return !text.includes("\n") && text.length < 400 && BLOCK_RE.test(text);
}

/** Book name as cited ("Revelación (Apocalipsis)") to a bookid, or null when unknown. */
function citedBookId(cited: string): number | null {
  const name = cited.replace(/\s*\(.*?\)\s*/g, " ").trim();
  return bookIdOf(canonicalBook(name));
}

/** The references of a footnote block; empty when the block cites no known book. */
export function parseFootnoteBlock(text: string): FootnoteEntry[] {
  const out: FootnoteEntry[] = [];
  for (const m of text.matchAll(ENTRY_RE)) {
    const bookid = citedBookId(m[2]!);
    if (bookid === null) continue;
    const chapter = Number(m[3]);
    const from = Number(m[4]);
    const to = m[5] ? Math.max(from, Number(m[5])) : from;
    const bookName = BOOKS[bookid - 1]!.name;
    out.push({
      number: Number(m[1]),
      bookid,
      chapter,
      from,
      to,
      label: `${bookName} ${chapter}:${from}${to > from ? `-${to}` : ""}`,
    });
  }
  return out;
}

/** Every verse range a chapter quotes: footnote references and in-text references, without repeats. */
export function collectVerseRanges(paragraphs: string[]): VerseRange[] {
  const seen = new Map<string, VerseRange>();
  const add = (r: VerseRange) => seen.set(verseKey(r), r);
  for (const p of paragraphs) {
    if (isFootnoteBlock(p) && parseFootnoteBlock(p).length > 0) {
      for (const e of parseFootnoteBlock(p)) add(e);
      continue;
    }
    for (const part of splitScriptureRefs(p)) {
      if (typeof part === "string") continue;
      const bookid = bookIdOf(part.book);
      if (bookid === null) continue;
      const to = part.verseEnd ?? part.verse;
      add({ bookid, chapter: part.chapter, from: part.verse, to });
    }
  }
  return [...seen.values()];
}
