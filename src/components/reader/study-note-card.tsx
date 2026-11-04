import { createElement, useState, type ReactNode } from "react";

import { noteLabel, type BibleNote } from "@/lib/bible-notes";
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

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Stable anchor per note: `nota-3-5` for a verse range, `nota-estructura-del-libro` for a topical
 * heading. Built from the same data on the server and the client, so the ids always match.
 */
export function noteAnchorIds(notes: Pick<BibleNote, "id" | "verse_start" | "verse_end" | "verse_anchor" | "position">[]) {
  const used = new Set<string>();
  const ids = new Map<string, string>();
  for (const note of notes) {
    const base =
      note.verse_start !== null
        ? `nota-${note.verse_start}-${note.verse_end ?? note.verse_start}`
        : `nota-${slugify(note.verse_anchor) || "seccion"}`;
    const id = used.has(base) ? `${base}-${note.position}` : base;
    used.add(id);
    ids.set(note.id, id);
  }
  return ids;
}

/** One section per verse range or topical heading. */
export function StudyNoteCard({
  notes,
  flashedId,
  onRefClick,
  onVerseClick,
}: {
  notes: StudyNote[];
  /** Anchor id of the section to flash after a hash jump. */
  flashedId?: string | null;
  onRefClick?: (ref: ScriptureRef & { originId?: string }) => void;
  /** Called with the first verse of a section when its "[3-5]" label is clicked. */
  onVerseClick?: (verse: number) => void;
}) {
  const isMobile = useIsMobile();
  const [sheet, setSheet] = useState<PreviewTarget | null>(null);
  const anchors = noteAnchorIds(notes);

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
          const id = anchors.get(note.id) ?? note.id;
          return (
            <section
              key={note.id}
              id={id}
              data-verse-start={verse ?? undefined}
              data-verse-end={note.verse_end ?? undefined}
              className={`scroll-mt-[8rem] ${flashedId === id ? "flash-target" : ""}`}
            >
              {label ? (
                // Inline, so the heading flows with the note text exactly as the old <b> label did.
                <h3 className={verse !== null && onVerseClick ? "inline" : "inline font-bold"}>
                  {verse !== null && onVerseClick ? (
                    <button
                      type="button"
                      onClick={() => onVerseClick(verse)}
                      className="cursor-pointer font-semibold text-foreground hover:underline hover:underline-offset-2"
                    >
                      {label}
                    </button>
                  ) : (
                    label
                  )}
                </h3>
              ) : null}{" "}
              {renderNodes(note.nodes, renderRef, note.id)}
            </section>
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
