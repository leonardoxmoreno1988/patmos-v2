import { BOOKS, CHAPTER_COUNTS } from "./bible";

export interface ScriptureRef {
  book: string;
  chapter: number;
  verse: number;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normBookName = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/** Legacy / alternate spellings mapped to the canonical book name (linkify regex keys). */
export const BOOK_ALIASES: Record<string, string> = {
  Salmo: "Salmos",
  Hechos: "Actos",
  "Hechos de los Apóstoles": "Actos",
  "Actos de los Apóstoles": "Actos",
  Apocalipsis: "Revelación",
  "Apocalipsis de Juan": "Revelación",
  "Cantar de los Cantares": "Cantares",
  "Cantares de Salomón": "Cantares",
};

/** Alternate book names (Spanish, English, accent-less) → canonical `BOOKS.name`. */
const BOOK_NAME_ALIASES: Array<[string, string]> = [
  // Spanish variations
  ["Apocalipsis", "Revelación"],
  ["Apocalipsis de Juan", "Revelación"],
  ["Salmo", "Salmos"],
  ["Hechos", "Actos"],
  ["Hechos de los Apóstoles", "Actos"],
  ["Actos de los Apóstoles", "Actos"],
  ["Cantar de los Cantares", "Cantares"],
  ["Cantares de Salomón", "Cantares"],
  ["Cantares de Salomon", "Cantares"],
  // English OT
  ["Genesis", "Génesis"],
  ["Exodus", "Éxodo"],
  ["Leviticus", "Levítico"],
  ["Numbers", "Números"],
  ["Deuteronomy", "Deuteronomio"],
  ["Joshua", "Josué"],
  ["Judges", "Jueces"],
  ["Ruth", "Rut"],
  ["1 Samuel", "1 Samuel"],
  ["2 Samuel", "2 Samuel"],
  ["I Samuel", "1 Samuel"],
  ["II Samuel", "2 Samuel"],
  ["1 Kings", "1 Reyes"],
  ["2 Kings", "2 Reyes"],
  ["I Kings", "1 Reyes"],
  ["II Kings", "2 Reyes"],
  ["1 Chronicles", "1 Crónicas"],
  ["2 Chronicles", "2 Crónicas"],
  ["I Chronicles", "1 Crónicas"],
  ["II Chronicles", "2 Crónicas"],
  ["Ezra", "Esdras"],
  ["Nehemiah", "Nehemías"],
  ["Esther", "Ester"],
  ["Job", "Job"],
  ["Psalms", "Salmos"],
  ["Psalm", "Salmos"],
  ["Proverbs", "Proverbios"],
  ["Ecclesiastes", "Eclesiastés"],
  ["Song of Solomon", "Cantares"],
  ["Song of Songs", "Cantares"],
  ["Canticles", "Cantares"],
  ["Isaiah", "Isaías"],
  ["Jeremiah", "Jeremías"],
  ["Lamentations", "Lamentaciones"],
  ["Ezekiel", "Ezequiel"],
  ["Daniel", "Daniel"],
  ["Hosea", "Oseas"],
  ["Joel", "Joel"],
  ["Amos", "Amós"],
  ["Obadiah", "Abdías"],
  ["Jonah", "Jonás"],
  ["Micah", "Miqueas"],
  ["Nahum", "Nahúm"],
  ["Habakkuk", "Habacuc"],
  ["Zephaniah", "Sofonías"],
  ["Haggai", "Hageo"],
  ["Zechariah", "Zacarías"],
  ["Malachi", "Malaquías"],
  // English NT
  ["Matthew", "Mateo"],
  ["Mark", "Marcos"],
  ["Luke", "Lucas"],
  ["John", "Juan"],
  ["Acts", "Actos"],
  ["Romans", "Romanos"],
  ["1 Corinthians", "1 Corintios"],
  ["2 Corinthians", "2 Corintios"],
  ["I Corinthians", "1 Corintios"],
  ["II Corinthians", "2 Corintios"],
  ["Galatians", "Gálatas"],
  ["Ephesians", "Efesios"],
  ["Philippians", "Filipenses"],
  ["Colossians", "Colosenses"],
  ["1 Thessalonians", "1 Tesalonicenses"],
  ["2 Thessalonians", "2 Tesalonicenses"],
  ["I Thessalonians", "1 Tesalonicenses"],
  ["II Thessalonians", "2 Tesalonicenses"],
  ["1 Timothy", "1 Timoteo"],
  ["2 Timothy", "2 Timoteo"],
  ["I Timothy", "1 Timoteo"],
  ["II Timothy", "2 Timoteo"],
  ["Titus", "Tito"],
  ["Philemon", "Filemón"],
  ["Hebrews", "Hebreos"],
  ["James", "Santiago"],
  ["1 Peter", "1 Pedro"],
  ["2 Peter", "2 Pedro"],
  ["I Peter", "1 Pedro"],
  ["II Peter", "2 Pedro"],
  ["1 John", "1 Juan"],
  ["2 John", "2 Juan"],
  ["3 John", "3 Juan"],
  ["I John", "1 Juan"],
  ["II John", "2 Juan"],
  ["III John", "3 Juan"],
  ["Jude", "Judas"],
  ["Revelation", "Revelación"],
  ["Apocalypse", "Revelación"],
];

const NORMALIZED_BOOK_LOOKUP = new Map<string, string>(
  [
    ...BOOKS.map((b) => [normBookName(b.name), b.name] as const),
    ...BOOK_NAME_ALIASES.map(([alias, canonical]) => [normBookName(alias), canonical] as const),
    ...Object.entries(BOOK_ALIASES).map(([alias, canonical]) => [normBookName(alias), canonical] as const),
  ],
);

/** Resolves a book name (any alias, English, accent-less) to a canonical `BOOKS.name`. */
export function resolveBookName(input: string): string | null {
  const key = normBookName(input);
  if (!key) return null;
  return NORMALIZED_BOOK_LOOKUP.get(key) ?? null;
}

export const canonicalBook = (name: string) => resolveBookName(name) ?? BOOK_ALIASES[name] ?? name;

// Spanish names, English (KJV) names and their aliases, longest first so "1 John" wins over "John".
const NAMES = [
  ...new Set([
    ...BOOKS.map((b) => b.name),
    ...Object.keys(BOOK_ALIASES),
    ...BOOK_NAME_ALIASES.map(([alias]) => alias),
  ]),
].sort((a, b) => b.length - a.length);

const REF_RE = new RegExp(
  `(^|[^\\p{L}\\p{N}])(${NAMES.map(escape).join("|")})\\s+(\\d+)(\\s*[:.]\\s*(\\d+)(\\s*[-–]\\s*\\d+)?)?`,
  "gu",
);

const SINGLE_CHAPTER_BOOKS = new Set(
  BOOKS.filter((b) => CHAPTER_COUNTS[b.bookid] === 1).map((b) => b.name),
);

/** "Jude 11" / "Judas 11" cites verse 11 of a one-chapter book, not chapter 11. */
function refTarget(book: string, chapter: string, verse: string | undefined) {
  if (!verse && SINGLE_CHAPTER_BOOKS.has(book)) return { chapter: "1", verse: chapter };
  return { chapter, verse };
}

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
          const to = refTarget(target, chapter, verse);
          const id = `ref-link-${n++}`;
          return `${pre}<a id="${id}" role="button" tabindex="0" class="${LINK_CLASS}" data-ref-book="${target}" data-ref-chapter="${to.chapter}" data-ref-verse="${to.verse ?? 1}">${label}</a>`;
        },
      );
    })
    .join("");
}

const slug = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Turns scripture references in Markdown text into reader links (skips existing links). */
export function linkifyScriptureMarkdown(md: string): string {
  return md
    .split(/(\[[^\]]*\]\([^)]*\))/g)
    .map((part) => {
      if (part.startsWith("[")) return part;
      return part.replace(REF_RE, (match, pre, book, chapter, _v, verse, range) => {
        const target = canonicalBook(book);
        if (!BOOKS.some((b) => b.name === target)) return match;
        const label = verse
          ? `${book} ${chapter}:${verse}${range ? String(range).replace(/\s/g, "") : ""}`
          : `${book} ${chapter}`;
        const to = refTarget(target, chapter, verse);
        return `${pre}[${label}](/leer/${slug(target)}/${to.chapter}${to.verse ? `#verse-${to.verse}` : ""})`;
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
  return { book: canonicalBook(book), chapter, verse, ...(el.id ? { originId: el.id } : {}) };
}