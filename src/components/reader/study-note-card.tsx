import { useRef, useState } from "react";

import { linkifyScriptureRefs, readRefFromEvent, type ScriptureRef } from "@/lib/scripture-refs";
import { useIsMobile } from "@/hooks/use-mobile";
import { VersePopover, VerseSheet, type PreviewTarget } from "./verse-preview";

export function StudyNoteCard({
 html,
 onRefClick,
}: {
 html: string;
 bare?: boolean;
 onRefClick?: (ref: ScriptureRef & { originId?: string }) => void;
}) {
 const isMobile = useIsMobile();
 const [hovered, setHovered] = useState<PreviewTarget | null>(null);
 const [sheet, setSheet] = useState<PreviewTarget | null>(null);
 const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

 const clearTimer = () => {
  if (timer.current) clearTimeout(timer.current);
  timer.current = null;
 };

 return (
  <>
   <div
    className="study-note text-base leading-relaxed text-[#000f37] dark:text-foreground/80"
    onMouseOver={(e) => {
     if (isMobile) return;
     const el = (e.target as HTMLElement | null)?.closest?.(
      "[data-ref-book]",
     ) as HTMLElement | null;
     if (!el) return;
     const ref = readRefFromEvent(el);
     if (!ref) return;
     const r = el.getBoundingClientRect();
     clearTimer();
     timer.current = setTimeout(
      () => setHovered({ ...ref, rect: { top: r.top, bottom: r.bottom, left: r.left, width: r.width } }),
      120,
     );
    }}
    onMouseOut={(e) => {
     const el = (e.target as HTMLElement | null)?.closest?.("[data-ref-book]");
     if (!el) return;
     clearTimer();
     setHovered(null);
    }}
    onClick={(e) => {
     const ref = readRefFromEvent(e.target);
     if (!ref) return;
     e.preventDefault();
     clearTimer();
     setHovered(null);
     if (isMobile) setSheet(ref);
     else onRefClick?.(ref);
    }}
    dangerouslySetInnerHTML={{ __html: linkifyScriptureRefs(html) }}
   />
   {hovered && !isMobile ? <VersePopover target={hovered} /> : null}
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
