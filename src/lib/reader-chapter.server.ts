import { parseFragment, type DefaultTreeAdapterMap } from "parse5";

import type { Lang } from "@/i18n";
import { BOOKS, parseUsfm, type Chapter, type Verse } from "@/lib/bible";
import { fetchChapterNotes, type BibleNote } from "@/lib/bible-notes";
import { splitScriptureRefs } from "@/lib/scripture-refs";
import type { NoteNode, ReaderChapter, StudyNote } from "@/lib/reader-chapter";
import { hydrateCitations } from "@/utils/hydrateCitations";

type ChildNode = DefaultTreeAdapterMap["childNode"];
type Element = DefaultTreeAdapterMap["element"];
type TextNode = DefaultTreeAdapterMap["textNode"];

// Bundled as raw strings and loaded one book at a time. Files under public/ aren't part of the
// serverless function bundle on Vercel, so they can't be read from disk at runtime.
const usfmSources = import.meta.glob("/public/bible/*/*.usfm", { query: "?raw", import: "default" }) as Record<
  string,
  () => Promise<string>
>;

/** Note tags kept in the output; anything else is unwrapped to its text. */
const ALLOWED_TAGS = new Set(["b", "strong", "i", "em", "u", "p", "ul", "ol", "li", "span"]);
/** Dropped with their content. */
const DROPPED_TAGS = new Set(["script", "style", "template", "iframe", "object"]);

const books = new Map<string, Promise<Chapter[]>>();

/** One translation's book, parsed once per server instance. */
function readBook(lang: Lang, bookid: number): Promise<Chapter[]> {
  const book = BOOKS.find((b) => b.bookid === bookid);
  if (!book) return Promise.reject(new Error(`Libro no encontrado: ${bookid}`));
  const key = `${lang}/${book.code}`;
  const cached = books.get(key);
  if (cached) return cached;
  const load = usfmSources[`/public/bible/${lang === "en" ? "en" : "es"}/${book.code}.usfm`];
  if (!load) return Promise.reject(new Error(`Falta el archivo USFM de ${book.code}`));
  const parsed = load().then(parseUsfm);
  books.set(key, parsed);
  parsed.catch(() => books.delete(key));
  return parsed;
}

const loadBook = (bookid: number, lang: Lang) => readBook(lang, bookid);

async function chapterVerses(bookid: number, chapter: number, lang: Lang): Promise<Verse[]> {
  const chapters = await readBook(lang, bookid);
  return chapters.find((c) => c.chapter === chapter)?.verses ?? [];
}

interface Ctx {
  lang: Lang;
  /** Running count so every reference link in a chapter gets a unique id (`goBack` relies on it). */
  refs: number;
}

const isElement = (node: ChildNode): node is Element => "tagName" in node;
const isText = (node: ChildNode): node is TextNode => node.nodeName === "#text";

const attr = (el: Element, name: string) => el.attrs.find((a) => a.name === name)?.value;

const textOf = (nodes: ChildNode[]): string =>
  nodes.map((n) => (isText(n) ? n.value : isElement(n) ? textOf(n.childNodes) : "")).join("");

function refNode(
  ref: { book: string; chapter: number; verse: number; label: string },
  ctx: Ctx,
): NoteNode {
  return { kind: "ref", id: `ref-link-${ctx.refs++}`, ...ref };
}

async function convertNodes(nodes: ChildNode[], ctx: Ctx): Promise<NoteNode[]> {
  const out: NoteNode[] = [];
  for (const node of nodes) out.push(...(await convertNode(node, ctx)));
  return out;
}

async function convertNode(node: ChildNode, ctx: Ctx): Promise<NoteNode[]> {
  if (isText(node)) {
    // Citations resolve to plain quoted text, so resolving before the reference split is safe.
    const resolved = await hydrateCitations(node.value, ctx.lang, loadBook);
    return splitScriptureRefs(resolved).map((part): NoteNode => {
      if (typeof part === "string") return { kind: "text", text: part };
      return refNode(part, ctx);
    });
  }
  if (!isElement(node)) return [];

  const tag = node.tagName.toLowerCase();
  if (DROPPED_TAGS.has(tag)) return [];
  if (tag === "br") return [{ kind: "br" }];

  if (tag === "a") {
    // Links the editor created to other chapters keep their reference data.
    const book = attr(node, "data-ref-book");
    if (book) {
      return [
        refNode(
          {
            book,
            chapter: Number(attr(node, "data-ref-chapter")),
            verse: Number(attr(node, "data-ref-verse") ?? 1),
            label: textOf(node.childNodes),
          },
          ctx,
        ),
      ];
    }
    return convertNodes(node.childNodes, ctx);
  }

  const children = await convertNodes(node.childNodes, ctx);
  return ALLOWED_TAGS.has(tag) ? [{ kind: "el", tag, children }] : children;
}

/** Parses each note's HTML into the node tree the client renders. */
async function withNodes(notes: BibleNote[], lang: Lang): Promise<StudyNote[]> {
  const ctx: Ctx = { lang, refs: 0 };
  const out: StudyNote[] = [];
  for (const note of notes) {
    const fragment = parseFragment(note.body_html);
    out.push({ ...note, nodes: await convertNodes(fragment.childNodes, ctx) });
  }
  return out;
}

export async function loadReaderChapter(bookid: number, chapter: number, lang: Lang): Promise<ReaderChapter> {
  const book = BOOKS.find((b) => b.bookid === bookid);
  if (!book) throw new Error(`Libro no encontrado: ${bookid}`);
  const [verses, notes] = await Promise.all([
    chapterVerses(bookid, chapter, lang),
    // A failed notes fetch must not take the page down; the client shows a message instead.
    fetchChapterNotes(book.code, chapter, lang)
      .then((rows) => withNodes(rows, lang))
      .catch(() => null),
  ]);
  return { verses, notes };
}
