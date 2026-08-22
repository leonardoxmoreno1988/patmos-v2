import { BOOKS } from "./bible";

export interface ScriptureRef {
  book: string;
  chapter: number;
  verse: number;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Legacy / alternate spellings mapped to the canonical book name. */
export const BOOK_ALIASES: Record<string, string> = {
  Hechos: "Actos",
  "Hechos de los Apóstoles": "Actos",
  "Actos de los Apóstoles": "Actos",
};

export const canonicalBook = (name: string) => BOOK_ALIASES[name] ?? name;

const NAMES = [...BOOKS.map((b) => b.name), ...Object.keys(BOOK_ALIASES)].sort(
  (a, b) => b.length - a.length,
);

const REF_RE = new RegExp(
  `(^|[^\\p{L}\\p{N}])(${NAMES.map(escape).join("|")})\\s+(\\d+)(\\s*[:.]\\s*(\\d+)(\\s*[-–]\\s*\\d+)?)?`,
  "gu",
);

const LINK_CLASS =
  "font-medium underline underline-offset-2 text-[#000f37] decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] cursor-pointer";

/** Wraps scripture references inside a sanitized HTML string with clickable anchors. */
export function linkifyScriptureRefs(html: string): string {
  let n = 0;
  return html
    .split(/(<[^>]*>)/g)
    .map((part) => {
      if (part.startsWith("<")) return part;
      return part.replace(
        REF_RE,
        (_match, pre, book, chapter, _vpart, verse, range) => {
          const target = canonicalBook(book);
          const label = verse
            ? `${book} ${chapter}:${verse}${range ? String(range).replace(/\s/g, "") : ""}`
            : `${book} ${chapter}`;
          const id = `ref-link-${n++}`;
          return `${pre}<a id="${id}" role="button" tabindex="0" class="${LINK_CLASS}" data-ref-book="${target}" data-ref-chapter="${chapter}" data-ref-verse="${verse ?? 1}">${label}</a>`;
        },
      );
    })
    .join("");
}

export function readRefFromEvent(
  target: EventTarget | null,
): (ScriptureRef & { originId?: string }) | null {
  const el = (target as HTMLElement | null)?.closest?.("[data-ref-book]") as HTMLElement | null;
  if (!el) return null;
  const book = el.dataset["refBook"];
  const chapter = Number(el.dataset["refChapter"]);
  const verse = Number(el.dataset["refVerse"]);
  if (!book || !Number.isFinite(chapter) || !Number.isFinite(verse)) return null;
  return { book: canonicalBook(book), chapter, verse, ...(el.id ? { originId: el.id } : {}) };
}