import { Link } from "@tanstack/react-router";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { slugifyBook } from "@/lib/bible";
import type { ScriptureRef } from "@/lib/scripture-refs";
import { localeParam, useI18n, type Lang } from "@/i18n";
import { useVerseText, type PreviewTarget } from "./verse-preview";

export type ScriptureRefToken = ScriptureRef & { id: string; label: string };

export const SCRIPTURE_REF_LINK_CLASS =
  "font-medium underline underline-offset-2 text-[#000f37] decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] cursor-pointer";

function RefPreview({ target, lang }: { target: ScriptureRef; lang?: Lang }) {
  const { display, label } = useVerseText(target, lang);
  return (
    <>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-[#85878c]">
        {label}
      </p>
      <p className="text-[15px] leading-relaxed text-slate-900 dark:text-[#bbbece]">
        {display}
      </p>
    </>
  );
}

/** Desktop: HoverCard preview over a real reader Link. */
export function DesktopRefLink({
  token,
  onRefClick,
  lang: langOverride,
}: {
  token: ScriptureRefToken;
  onRefClick?: (ref: ScriptureRef & { originId?: string }) => void;
  /** Force reader locale + verse translation (estudios: `"es"`). */
  lang?: Lang;
}) {
  const { lang: i18nLang } = useI18n();
  const lang = langOverride ?? i18nLang;
  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <Link
          id={token.id}
          to="/{-$locale}/leer/$libro/$cap"
          params={{ locale: localeParam(lang), libro: slugifyBook(token.book), cap: String(token.chapter) }}
          hash={`verse-${token.verse}`}
          className={SCRIPTURE_REF_LINK_CLASS}
          data-ref-book={token.book}
          data-ref-chapter={String(token.chapter)}
          data-ref-verse={String(token.verse)}
          onClick={() =>
            onRefClick?.({
              book: token.book,
              chapter: token.chapter,
              verse: token.verse,
              originId: token.id,
            })
          }
        >
          {token.label}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="center"
        className="w-[340px] rounded-xl border-none bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] text-slate-900 dark:bg-[#1c1b2d] dark:text-[#bbbece]"
      >
        <RefPreview target={token} lang={lang} />
      </HoverCardContent>
    </HoverCard>
  );
}

/** Mobile: opens the shared VerseSheet via the parent. */
export function MobileRefButton({
  token,
  onOpen,
}: {
  token: ScriptureRefToken;
  onOpen: (t: PreviewTarget) => void;
}) {
  return (
    <button
      type="button"
      id={token.id}
      className={SCRIPTURE_REF_LINK_CLASS}
      onClick={() =>
        onOpen({
          book: token.book,
          chapter: token.chapter,
          verse: token.verse,
          originId: token.id,
        })
      }
    >
      {token.label}
    </button>
  );
}

/** Picks desktop HoverCard or mobile sheet trigger for a scripture reference. */
export function ScriptureRefLink({
  token,
  isMobile,
  onRefClick,
  onMobileOpen,
  lang,
}: {
  token: ScriptureRefToken;
  isMobile: boolean;
  onRefClick?: (ref: ScriptureRef & { originId?: string }) => void;
  onMobileOpen: (t: PreviewTarget) => void;
  /** Force reader locale + verse translation (estudios: `"es"`). */
  lang?: Lang;
}) {
  if (isMobile) return <MobileRefButton token={token} onOpen={onMobileOpen} />;
  return (
    <DesktopRefLink
      token={token}
      {...(onRefClick ? { onRefClick } : {})}
      {...(lang ? { lang } : {})}
    />
  );
}
