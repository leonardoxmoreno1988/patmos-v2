import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";

import { SCRIPTURE_REF_LINK_CLASS } from "@/components/reader/scripture-ref-link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { bookIdOf, readerPath } from "@/lib/bible-slugs";
import { isFootnoteBlock, parseFootnoteBlock, verseKey, type FootnoteEntry } from "@/lib/libro-footnotes";
import { splitScriptureRefs, type ScriptureRef } from "@/lib/scripture-refs";

/** RV1865 verses per range, keyed by `verseKey` (filled by the chapter loader on the server). */
export type VerseTexts = Record<string, { verse: number; text: string }[]>;

// A footnote number right after sentence punctuation: "...hicieron tus padres. 12".
const MARKER_RE = /(?<=[.!?»”"”)])\s*(\d{1,3})(?=\s|$)/g;

/**
 * Chapter paragraphs in reading order. Footnote blocks become Scripture cards where they stand,
 * and the footnote numbers are removed from the running text.
 */
export function ChapterBody({ paragraphs, verseTexts }: { paragraphs: string[]; verseTexts: VerseTexts }) {
  const noteNumbers = new Set(
    paragraphs.filter(isFootnoteBlock).flatMap((p) => parseFootnoteBlock(p).map((e) => e.number)),
  );

  return (
    <div className="space-y-6">
      {paragraphs.map((text, pi) => {
        if (isFootnoteBlock(text)) {
          const entries = parseFootnoteBlock(text);
          // A footnote block that cites no known book stays in the text as it is.
          if (entries.length > 0) {
            return (
              <div key={pi} className="space-y-0">
                {entries.map((e) => (
                  <ScriptureCard key={`${e.number}-${e.label}`} entry={e} verses={verseTexts[verseKey(e)] ?? []} />
                ))}
              </div>
            );
          }
        }
        return <div key={pi}>{renderParagraph(text, pi, noteNumbers, verseTexts)}</div>;
      })}
    </div>
  );
}

function renderParagraph(text: string, pi: number, noteNumbers: Set<number>, verseTexts: VerseTexts): ReactNode {
  const content = renderInline(stripMarkers(text, noteNumbers), `p${pi}`, verseTexts);
  if (text.includes("\n")) {
    // Hymn and verse lines keep their breaks.
    return <p className="whitespace-pre-line text-base italic leading-relaxed sm:text-lg">{content}</p>;
  }
  return <p className="text-base leading-relaxed text-foreground/90 sm:text-lg dark:text-zinc-200">{content}</p>;
}

/** Removes footnote numbers from the running text, keeping the punctuation before them. */
function stripMarkers(text: string, noteNumbers: Set<number>): string {
  return text.replace(MARKER_RE, (match, digits: string) => (noteNumbers.has(Number(digits)) ? "" : match));
}

/** Text with scripture references as popovers; a click shows the verse without leaving the chapter. */
function renderInline(text: string, keyPrefix: string, verseTexts: VerseTexts): ReactNode[] {
  let n = 0;
  return splitScriptureRefs(text).map((part) => {
    if (typeof part === "string") return part;
    return <InlineScripture key={`${keyPrefix}-${n++}`} part={part} verseTexts={verseTexts} />;
  });
}

/** A reference in the text: a click opens the verse in a popover. */
function InlineScripture({
  part,
  verseTexts,
}: {
  part: ScriptureRef & { label: string };
  verseTexts: VerseTexts;
}) {
  const bookid = bookIdOf(part.book);
  if (bookid === null) return part.label;
  const verses = verseTexts[verseKey({ bookid, chapter: part.chapter, from: part.verse, to: part.verseEnd ?? part.verse })] ?? [];
  return (
    <Popover>
      <PopoverTrigger className={SCRIPTURE_REF_LINK_CLASS}>{part.label}</PopoverTrigger>
      <PopoverContent side="top" align="center" className="max-h-72 w-[min(92vw,24rem)] overflow-y-auto p-4 text-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{part.label} · RV1865</p>
        <VerseList verses={verses} />
        <a
          href={readerPath("es", bookid, part.chapter)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block text-xs font-medium underline underline-offset-2 hover:text-foreground"
        >
          Abrir capítulo completo en el Lector ↗
        </a>
      </PopoverContent>
    </Popover>
  );
}

function VerseList({ verses }: { verses: { verse: number; text: string }[] }) {
  if (verses.length === 0) return <p className="text-muted-foreground">Texto no disponible.</p>;
  return (
    <div className="space-y-2 leading-relaxed">
      {verses.map((v) => (
        <p key={v.verse}>
          <sup className="mr-1 text-xs text-muted-foreground">{v.verse}</sup>
          {v.text}
        </p>
      ))}
    </div>
  );
}

/** A Scripture quote in the reading flow: the verse text in RV1865, with a link that keeps the reader open. */
function ScriptureCard({ entry, verses }: { entry: FootnoteEntry; verses: { verse: number; text: string }[] }) {
  return (
    <section className="my-6 rounded-lg border border-border/40 bg-muted/20 p-4 shadow-sm sm:p-5 dark:bg-zinc-900/60">
      <header className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary/80">
        <BookOpen className="size-3.5 shrink-0" aria-hidden="true" />
        <span>{entry.label} · RV1865</span>
      </header>
      <div className="mt-2.5 space-y-2 text-base italic leading-relaxed text-foreground/90 sm:text-lg dark:text-zinc-200">
        {verses.length === 0 ? (
          <p className="not-italic text-muted-foreground">Texto no disponible.</p>
        ) : (
          verses.map((v) => (
            <p key={v.verse}>
              {verses.length > 1 ? <sup className="mr-1 text-xs not-italic text-muted-foreground">{v.verse}</sup> : null}
              {v.text}
            </p>
          ))
        )}
      </div>
      <div className="mt-3 flex justify-end">
        <a
          href={readerPath("es", entry.bookid, entry.chapter, entry.from)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground hover:underline underline-offset-2"
        >
          Abrir en el Lector ↗
        </a>
      </div>
    </section>
  );
}
