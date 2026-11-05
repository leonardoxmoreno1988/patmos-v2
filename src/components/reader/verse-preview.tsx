import { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import { BOOKS, bookQuery, localizeBookName } from "@/lib/bible";
import type { ScriptureRef } from "@/lib/scripture-refs";
import { useI18n, type Lang } from "@/i18n";

export interface PreviewTarget extends ScriptureRef {
  originId?: string;
  rect?: { top: number; bottom: number; left: number; width: number };
}

/** Most verses a reference preview shows before pointing to the full passage. */
export const PREVIEW_MAX_VERSES = 3;

export interface PreviewVerse {
  verse: number;
  text: string;
}

/**
 * Verse text for a reference, covering its whole range ("Mateo 27:50-51" -> verses 50 and 51).
 * Shows at most PREVIEW_MAX_VERSES verses; `remaining` counts the rest. Optional `langOverride`
 * forces a translation (estudios always pass `"es"` / RV1865).
 */
export function useVerseText(ref: ScriptureRef | null, langOverride?: Lang) {
  const bookid = ref ? (BOOKS.find((b) => b.name === ref.book)?.bookid ?? 0) : 0;
  const { t, lang: i18nLang } = useI18n();
  const lang = langOverride ?? i18nLang;
  const query = useQuery({ ...bookQuery(bookid, lang), enabled: bookid > 0 });
  const chapter = query.data?.find((c) => c.chapter === ref?.chapter);
  const from = ref?.verse ?? 0;
  const to = ref?.verseEnd ?? from;
  const found: PreviewVerse[] = (chapter?.verses ?? [])
    .filter((v) => v.verse >= from && v.verse <= to)
    .map((v) => ({ verse: v.verse, text: v.text }));
  const verses = found.slice(0, PREVIEW_MAX_VERSES);
  const remaining = found.length - verses.length;
  const missing = !!query.data && found.length === 0;
  return {
    verses,
    remaining,
    /** Localized loading / not-available message; null once verse text is shown. */
    message: found.length > 0 ? null : missing ? t.verse.unavailable : t.verse.loading,
    label: ref
      ? `${localizeBookName(ref.book, lang)} ${ref.chapter}:${from}${to > from ? `-${to}` : ""}`
      : "",
  };
}

/** Numbered verses, one per paragraph, or the loading / unavailable message. */
export function VerseExcerpt({
  verses,
  message,
  size = "text-[15px]",
  children,
}: {
  verses: PreviewVerse[];
  message: string | null;
  size?: string;
  children?: ReactNode;
}) {
  if (message) return <p className={`${size} leading-relaxed`}>{message}</p>;
  return (
    <>
      <div className={`space-y-2 ${size} leading-relaxed text-slate-900 dark:text-[#bbbece]`}>
        {verses.map((v) => (
          <p key={v.verse}>
            <sup className="mr-1 text-xs text-muted-foreground">{v.verse}</sup>
            {v.text}
          </p>
        ))}
      </div>
      {children}
    </>
  );
}

/** Floating hover popover (desktop). */
export function VersePopover({ target }: { target: PreviewTarget }) {
  const { verses, message, label } = useVerseText(target);
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
      className={`pointer-events-none max-h-72 overflow-y-auto rounded-xl border-none bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-150 text-slate-900 dark:bg-[#1c1b2d] dark:text-[#bbbece] ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      }`}
    >
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-[#85878c]">
        {label}
      </p>
      <VerseExcerpt verses={verses} message={message} />
    </div>
  );
}

/** Bottom sheet (mobile). */
export function VerseSheet({
  target,
  onClose,
  onGoToChapter,
  lang,
}: {
  target: PreviewTarget;
  onClose: () => void;
  onGoToChapter: () => void;
  /** Force verse text language (estudios: `"es"`). */
  lang?: Lang;
}) {
  const { t } = useI18n();
  const { verses, remaining, message, label } = useVerseText(target, lang);
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
        className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl border-none bg-white px-5 pb-8 pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 ease-out text-slate-900 dark:bg-[#1c1b2d] dark:text-[#bbbece]"
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
        <VerseExcerpt verses={verses} message={message} size="text-[17px]">
          {remaining > 0 ? (
            <p className="mt-3 text-sm text-slate-500 dark:text-[#85878c]">{t.verse.moreVerses(remaining)}</p>
          ) : null}
        </VerseExcerpt>
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
