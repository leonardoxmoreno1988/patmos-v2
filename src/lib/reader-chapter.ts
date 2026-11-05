import { createServerFn } from "@tanstack/react-start";

import type { Lang } from "@/i18n";
import type { Verse } from "@/lib/bible";
import type { BibleNote } from "@/lib/bible-notes";

/** A study note's body as plain data: built on the server, rendered by React on both sides. */
export type NoteNode =
  | { kind: "text"; text: string }
  | { kind: "br" }
  | { kind: "el"; tag: string; children: NoteNode[] }
  | { kind: "ref"; id: string; label: string; book: string; chapter: number; verse: number; verseEnd?: number };

export interface StudyNote extends BibleNote {
  nodes: NoteNode[];
}

export interface ReaderChapter {
  verses: Verse[];
  /** null when the notes could not be loaded; the page still shows the text. */
  notes: StudyNote[] | null;
}

/**
 * One chapter's text and processed notes. Runs on the server (SSR and client navigations alike);
 * the server-only module is imported inside the handler, so the Bible data never reaches the browser.
 */
export const getReaderChapter = createServerFn({ method: "GET" })
  .inputValidator((input: { bookid: number; chapter: number; lang: Lang }) => input)
  .handler(async ({ data }): Promise<ReaderChapter> => {
    const { loadReaderChapter } = await import("./reader-chapter.server");
    return loadReaderChapter(data.bookid, data.chapter, data.lang);
  });

export const readerChapterQuery = (bookid: number, chapter: number, lang: Lang) => ({
  queryKey: ["reader-chapter", lang, bookid, chapter] as const,
  queryFn: () => getReaderChapter({ data: { bookid, chapter, lang } }),
  // Same session-long caching as the notes query it replaces.
  staleTime: Infinity,
  gcTime: Infinity,
});
