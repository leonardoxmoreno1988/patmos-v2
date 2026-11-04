import { createElement, useState, type ReactNode } from "react";

import { noteLabel } from "@/lib/bible-notes";
import type { NoteNode, StudyNote } from "@/lib/reader-chapter";
import type { ScriptureRef } from "@/lib/scripture-refs";
import { useIsMobile } from "@/hooks/use-mobile";
import { VerseSheet, type PreviewTarget } from "./verse-preview";
import { ScriptureRefLink, type ScriptureRefToken } from "./scripture-ref-link";

/**
 * Renders a note's node tree (built on the server). Only the reference links carry client
 * behaviour; everything else is static markup, so the server HTML already contains the prose.
 */
function renderNodes(
  nodes: NoteNode[],
  renderRef: (token: ScriptureRefToken, key: string) => ReactNode,
  keyPrefix: string,
): ReactNode[] {
  return nodes.map((node, i) => {
    const key = `${keyPrefix}-${i}`;
    if (node.kind === "text") return node.text;
    if (node.kind === "br") return <br key={key} />;
    if (node.kind === "ref") {
      return renderRef(
        { id: node.id, label: node.label, book: node.book, chapter: node.chapter, verse: node.verse },
        key,
      );
    }
    return createElement(node.tag, { key }, renderNodes(node.children, renderRef, key));
  });
}

/** One section per verse range; ids and ref-link ids are assigned once on the server. */
export function StudyNoteCard({
  notes,
  onRefClick,
  onVerseClick,
}: {
  notes: StudyNote[];
  onRefClick?: (ref: ScriptureRef & { originId?: string }) => void;
  /** Called with the first verse of a section when its "[3-5]" label is clicked. */
  onVerseClick?: (verse: number) => void;
}) {
  const isMobile = useIsMobile();
  const [sheet, setSheet] = useState<PreviewTarget | null>(null);

  const renderRef = (token: ScriptureRefToken, key: string) => (
    <ScriptureRefLink
      key={key}
      token={token}
      isMobile={isMobile}
      onMobileOpen={setSheet}
      {...(onRefClick ? { onRefClick } : {})}
    />
  );

  return (
    <>
      <div className="study-note space-y-3 text-base leading-relaxed text-[#000f37] dark:text-foreground/80">
        {notes.map((note) => {
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
              {renderNodes(note.nodes, renderRef, note.id)}
            </div>
          );
        })}
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
