import { linkifyScriptureRefs, readRefFromEvent, type ScriptureRef } from "@/lib/scripture-refs";

export function StudyNoteCard({
  html,
  onRefClick,
}: {
  html: string;
  bare?: boolean;
  onRefClick?: (ref: ScriptureRef) => void;
}) {
  return (
    <div
      className="study-note font-sans text-base leading-relaxed text-foreground/80"
      onClick={(e) => {
        const ref = readRefFromEvent(e.target);
        if (ref && onRefClick) {
          e.preventDefault();
          onRefClick(ref);
        }
      }}
      dangerouslySetInnerHTML={{ __html: linkifyScriptureRefs(html) }}
    />
  );
}
