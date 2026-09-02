import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { BOOKS, bookQuery } from "@/lib/bible";
import type { ScriptureRef } from "@/lib/scripture-refs";

export interface PreviewTarget extends ScriptureRef {
  originId?: string;
  rect?: { top: number; bottom: number; left: number; width: number };
}

export function useVerseText(ref: ScriptureRef | null) {
  const bookid = ref ? (BOOKS.find((b) => b.name === ref.book)?.bookid ?? 0) : 0;
  const query = useQuery({ ...bookQuery(bookid), enabled: bookid > 0 });
  const chapter = query.data?.find((c) => c.chapter === ref?.chapter);
  const verse = chapter?.verses.find((v) => v.verse === ref?.verse);
  return {
    text: verse?.text ?? "",
    loading: query.isPending || query.isFetching,
    missing: !!query.data && !verse,
  };
}

const label = (ref: ScriptureRef) => `${ref.book} ${ref.chapter}:${ref.verse}`;

/** Floating hover popover (desktop). */
export function VersePopover({ target }: { target: PreviewTarget }) {
  const { text, loading, missing } = useVerseText(target);
  const rect = target.rect;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!rect) return null;

  const width = 340;
  const left = Math.min(
    Math.max(12, rect.left + rect.width / 2 - width / 2),
    (typeof window !== "undefined" ? window.innerWidth : width + 24) - width - 12,
  );
  const above = rect.top > 220;

  return (
    <div
      role="tooltip"
      style={{
        position: "fixed",
        left,
        width,
        ...(above ? { bottom: `calc(100vh - ${rect.top}px + 10px)` } : { top: rect.bottom + 10 }),
        zIndex: 60,
      }}
      className={`pointer-events-none rounded-xl border border-[#000f37]/15 bg-background p-4 shadow-lg transition-all duration-150 dark:border-white/20 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      }`}
    >
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label(target)}
      </p>
      <p className="text-[15px] leading-relaxed text-foreground">
        {text ||
          (loading ? "Cargando…" : missing ? "Versículo no disponible." : "Cargando…")}
      </p>
    </div>
  );
}

/** Bottom sheet (mobile). */
export function VerseSheet({
  target,
  onClose,
  onGoToChapter,
}: {
  target: PreviewTarget;
  onClose: () => void;
  onGoToChapter: () => void;
}) {
  const { text, loading, missing } = useVerseText(target);
  const [open, setOpen] = useState(false);
  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = prev;
    };
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.setTimeout(onClose, 180);
  };

  let startY = 0;

  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={dismiss}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label(target)}
        style={{ transform: `translateY(${open ? dragY : 400}px)` }}
        className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-[#000f37]/15 bg-background px-5 pb-8 pt-3 transition-transform duration-200 ease-out dark:border-white/20"
        onTouchStart={(e) => {
          startY = e.touches[0]?.clientY ?? 0;
        }}
        onTouchMove={(e) => {
          const y = (e.touches[0]?.clientY ?? 0) - startY;
          if (y > 0) setDragY(y);
        }}
        onTouchEnd={() => {
          if (dragY > 90) dismiss();
          else setDragY(0);
        }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted-foreground/30" />
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label(target)}
        </p>
        <p className="text-[17px] leading-relaxed text-foreground">
          {text || (loading ? "Cargando…" : missing ? "Versículo no disponible." : "Cargando…")}
        </p>
        <button
          type="button"
          onClick={onGoToChapter}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#000f37] text-sm font-medium text-white dark:bg-white dark:text-[#000f37]"
        >
          Ir al capítulo
        </button>
      </div>
    </div>
  );
}
