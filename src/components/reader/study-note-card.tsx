import { createElement, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { slugifyBook } from "@/lib/bible";
import { linkifyScriptureRefs, type ScriptureRef } from "@/lib/scripture-refs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useVerseText, VerseSheet, type PreviewTarget } from "./verse-preview";

type RefToken = ScriptureRef & { id: string; label: string };

const ALLOWED_TAGS = new Set(["b", "strong", "i", "em", "u", "br", "p", "ul", "ol", "li", "span"]);


const LINK_CLASS =
  "font-medium underline underline-offset-2 text-[#000f37] decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] cursor-pointer";

function RefPreview({ target }: { target: ScriptureRef }) {
  const { text, loading, missing } = useVerseText(target);
  return (
    <>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {target.book} {target.chapter}:{target.verse}
      </p>
      <p className="text-[15px] leading-relaxed text-foreground">
        {text || (loading ? "Cargando…" : missing ? "Versículo no disponible." : "Cargando…")}
      </p>
    </>
  );
}

function DesktopRefLink({
  token,
  onRefClick,
}: {
  token: RefToken;
  onRefClick?: (ref: ScriptureRef & { originId?: string }) => void;
}) {
  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <Link
          id={token.id}
          to="/leer/$libro/$cap"
          params={{ libro: slugifyBook(token.book), cap: String(token.chapter) }}
          className={LINK_CLASS}
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
        className="w-[340px] rounded-xl border-[#000f37]/15 p-4 shadow-lg dark:border-white/20"
      >
        <RefPreview target={token} />
      </HoverCardContent>
    </HoverCard>
  );
}

export function StudyNoteCard({
  html,
  onRefClick,
}: {
  html: string;
  bare?: boolean;
  onRefClick?: (ref: ScriptureRef & { originId?: string }) => void;
}) {
  const isMobile = useIsMobile();
  const [sheet, setSheet] = useState<PreviewTarget | null>(null);
  const tokens = useMemo(() => tokenize(html), [html]);

  return (
    <>
      <div className="study-note text-base leading-relaxed text-[#000f37] dark:text-foreground/80">
        {tokens.map((t, i) =>
          t.kind === "html" ? (
            <span key={i} dangerouslySetInnerHTML={{ __html: t.html }} />
          ) : isMobile ? (
            <button
              key={i}
              type="button"
              id={t.id}
              className={LINK_CLASS}
              onClick={() =>
                setSheet({
                  book: t.book,
                  chapter: t.chapter,
                  verse: t.verse,
                  originId: t.id,
                })
              }
            >
              {t.label}
            </button>
          ) : (
            <DesktopRefLink key={i} token={t} {...(onRefClick ? { onRefClick } : {})} />
          ),
        )}
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
