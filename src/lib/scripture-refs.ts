import { BOOKS } from "./bible";

export interface ScriptureRef {
  book: string;
  chapter: number;
  verse: number;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const NAMES = BOOKS.map((b) => b.name).sort((a, b) => b.length - a.length);

const REF_RE = new RegExp(
  `(^|[^\\p{L}\\p{N}])(${NAMES.map(escape).join("|")})\\s+(\\d+)\\s*[:.]\\s*(\\d+)(\\s*[-–]\\s*\\d+)?`,
  "gu",
);

const LINK_CLASS =
  "text-primary font-medium underline decoration-primary/30 underline-offset-2 hover:decoration-primary cursor-pointer transition-colors";

/** Wraps scripture references inside a sanitized HTML string with clickable anchors. */
export function linkifyScriptureRefs(html: string): string {
  let n = 0;
  return html
    .split(/(<[^>]*>)/g)
    .map((part) => {
      if (part.startsWith("<")) return part;
      return part.replace(REF_RE, (match, pre, book, chapter, verse, range) => {
        const label = `${book} ${chapter}:${verse}${range ? range.replace(/\s/g, "") : ""}`;
        const id = `ref-link-${n++}`;
        return `${pre}<a id="${id}" role="button" tabindex="0" class="${LINK_CLASS}" data-ref-book="${book}" data-ref-chapter="${chapter}" data-ref-verse="${verse}">${label}</a>`;
      });
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
  return { book, chapter, verse, ...(el.id ? { originId: el.id } : {}) };
}