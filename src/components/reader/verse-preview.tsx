import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { BOOKS, bookQuery, localizeBookName } from "@/lib/bible";
import type { ScriptureRef } from "@/lib/scripture-refs";
import { useI18n } from "@/i18n";

export interface PreviewTarget extends ScriptureRef {
  originId?: string;
  rect?: { top: number; bottom: number; left: number; width: number };
}

export function useVerseText(ref: ScriptureRef | null) {
  const bookid = ref ? (BOOKS.find((b) => b.name === ref.book)?.bookid ?? 0) : 0;
  const { t, lang } = useI18n();
  const query = useQuery({ ...bookQuery(bookid, lang), enabled: bookid > 0 });
  const chapter = query.data?.find((c) => c.chapter === ref?.chapter);
  const verse = chapter?.verses.find((v) => v.verse === ref?.verse);
  const text = verse?.text ?? "";
  const loading = query.isPending || query.isFetching;
  const missing = !!query.data && !verse;
  return {
    text,
    loading,
    missing,
    /** Verse text, or the localized loading / not-available message. */
    display: text || (!loading && missing ? t.verse.unavailable : t.verse.loading),
    label: ref ? `${localizeBookName(ref.book, lang)} ${ref.chapter}:${ref.verse}` : "",
  };
}

/** Floating hover popover (desktop). */
export function VersePopover({ target }: { target: PreviewTarget }) {
  const { display, label } = useVerseText(target);
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
      className={`pointer-events-none rounded-xl border-none bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-150 text-slate-900 dark:bg-[#1c1b2d] dark:text-[#bbbece] ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      }`}
    >
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-[#85878c]">
        {label}
      </p>
      <p className="text-[15px] leading-relaxed text-slate-900 dark:text-[#bbbece]">
        {display}
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
  const { t } = useI18n();
  const { display, label } = useVerseText(target);
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
        aria-label={t.verse.close}
        onClick={dismiss}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        style={{ transform: `translateY(${open ? dragY : 400}px)` }}
        className="absolute inset-x-0 bottom-0 rounded-t-2xl border-none bg-white px-5 pb-8 pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 ease-out text-slate-900 dark:bg-[#1c1b2d] dark:text-[#bbbece]"
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
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#85878c]">
          {label}
        </p>
        <p className="text-[17px] leading-relaxed text-slate-900 dark:text-[#bbbece]">
          {display}
        </p>
        <button
          type="button"
          onClick={onGoToChapter}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#0F172A] text-sm font-medium text-white dark:bg-white dark:text-[#000f37]"
        >
          {t.verse.goToChapter}
        </button>
      </div>
    </div>
  );
}
