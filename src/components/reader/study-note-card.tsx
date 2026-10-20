import { createElement, useEffect, useMemo, useState, type ReactNode } from "react";

import { noteLabel, type BibleNote } from "@/lib/bible-notes";
import { linkifyScriptureRefs, type ScriptureRef } from "@/lib/scripture-refs";
import { useIsMobile } from "@/hooks/use-mobile";
import { hydrateCitations } from "@/utils/hydrateCitations";
import { VerseSheet, type PreviewTarget } from "./verse-preview";
import { ScriptureRefLink, type ScriptureRefToken } from "./scripture-ref-link";
import { useI18n } from "@/i18n";

const ALLOWED_TAGS = new Set(["b", "strong", "i", "em", "u", "br", "p", "ul", "ol", "li", "span"]);

const CITATION_RE = /\{\{cita:[^}]+\}\}/g;

/** Converts sanitized note HTML into React nodes, swapping scripture anchors for interactive links. */
function renderNodes(
  nodes: NodeListOf<ChildNode> | ChildNode[],
  renderRef: (token: ScriptureRefToken, key: string) => ReactNode,
  keyPrefix = "n",
): ReactNode[] {
  return Array.from(nodes).map((node, i) => {
    const key = `${keyPrefix}-${i}`;
    if (node.nodeType === 3) return node.textContent;
    if (node.nodeType !== 1) return null;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (tag === "a" && el.dataset["refBook"]) {
      return renderRef(
        {
          id: el.id,
          label: el.textContent ?? "",
          book: el.dataset["refBook"]!,
          chapter: Number(el.dataset["refChapter"]),
          verse: Number(el.dataset["refVerse"]),
        },
        key,
      );
    }

    if (!ALLOWED_TAGS.has(tag)) return el.textContent;
    if (tag === "br") return <br key={key} />;
    return createElement(tag, { key }, renderNodes(el.childNodes, renderRef, key));
  });
}

function NoteSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-full animate-pulse rounded bg-muted" />
      <div className="h-4 w-[92%] animate-pulse rounded bg-muted" />
      <div className="h-4 w-[80%] animate-pulse rounded bg-muted" />
      <div className="h-4 w-[60%] animate-pulse rounded bg-muted" />
    </div>
  );
}

/** Separates sections while they are hydrated and linkified as one string (one pass keeps ref-link ids unique). */
const SECTION_SEPARATOR = "<x-note-section>";

export function StudyNoteCard({
  notes,
  onRefClick,
  onVerseClick,
}: {
  notes: BibleNote[];
  bare?: boolean;
  onRefClick?: (ref: ScriptureRef & { originId?: string }) => void;
  /** Called with the first verse of a section when its "[3-5]" label is clicked. */
  onVerseClick?: (verse: number) => void;
}) {
  const isMobile = useIsMobile();
  const { lang } = useI18n();
  const [sheet, setSheet] = useState<PreviewTarget | null>(null);
  // Linkified bodies are stored with the notes they belong to, so a chapter change keeps showing the
  // previous, consistent sections until the new ones are ready.
  const [linked, setLinked] = useState<{ notes: BibleNote[]; parts: string[] } | null>(null);
  const html = useMemo(() => notes.map((n) => n.body_html).join(SECTION_SEPARATOR), [notes]);

  useEffect(() => {
    let cancelled = false;
    const finish = (out: string) => {
      if (!cancelled) setLinked({ notes, parts: linkifyScriptureRefs(out).split(SECTION_SEPARATOR) });
    };

    const process = async () => {
      const hasCitations = CITATION_RE.test(html);
      CITATION_RE.lastIndex = 0;

      if (!hasCitations) return finish(html);

      try {
        finish(await hydrateCitations(html, lang));
      } catch {
        finish(html);
      }
    };

    process();
    return () => {
      cancelled = true;
    };
    // `html` is derived from `notes`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, lang]);

  const sections = useMemo(() => {
    if (typeof window === "undefined" || linked === null) return null;
    const renderRef = (token: ScriptureRefToken, key: string) => (
      <ScriptureRefLink
        key={key}
        token={token}
        isMobile={isMobile}
        onMobileOpen={setSheet}
        {...(onRefClick ? { onRefClick } : {})}
      />
    );
    return linked.notes.map((note, i) => {
      const doc = new DOMParser().parseFromString(`<body>${linked.parts[i] ?? ""}</body>`, "text/html");
      const label = noteLabel(note);
      const verse = note.verse_start;
      return (
        <div key={note.id} data-verse-start={verse ?? undefined} data-verse-end={note.verse_end ?? undefined}>
          {label ? (
            verse !== null && onVerseClick ? (
              <button
                type="button"
                onClick={() => onVerseClick(verse)}
                className="cursor-pointer font-semibold text-foreground hover:underline hover:underline-offset-2"
              >
                {label}
              </button>
            ) : (
              <b>{label}</b>
            )
          ) : null}{" "}
          {renderNodes(doc.body.childNodes, renderRef, `s${i}`)}
        </div>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linked, isMobile, onRefClick, onVerseClick]);

  return (
    <>
      <div className="study-note space-y-3 text-base leading-relaxed text-[#000f37] dark:text-foreground/80">
        {sections ?? <NoteSkeleton />}
      </div>

      {sheet ? (
        <VerseSheet
          target={sheet}
          onClose={() => setSheet(null)}
          onGoToChapter={() => {
            const ref = sheet;
            setSheet(null);
            onRefClick?.(ref);
          }}
        />
      ) : null}
    </>
  );
}
