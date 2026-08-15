import { linkifyScriptureRefs, readRefFromEvent, type ScriptureRef } from "@/lib/scripture-refs";

export function StudyNoteCard({
  html,
  bare = false,
  onRefClick,
}: {
  html: string;
  bare?: boolean;
  onRefClick?: (ref: ScriptureRef) => void;
}) {
  return (
    <section className={bare ? "" : "mt-8 rounded-none bg-muted/40 p-6"}>
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
    </section>
  );
}
