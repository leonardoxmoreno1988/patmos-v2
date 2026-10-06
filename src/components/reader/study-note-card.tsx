import { createElement, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { slugifyBook } from "@/lib/bible";
import { linkifyScriptureRefs, type ScriptureRef } from "@/lib/scripture-refs";
import { useIsMobile } from "@/hooks/use-mobile";
import { hydrateCitations } from "@/utils/hydrateCitations";
import { useVerseText, VerseSheet, type PreviewTarget } from "./verse-preview";
import { useI18n } from "@/i18n";

type RefToken = ScriptureRef & { id: string; label: string };

const ALLOWED_TAGS = new Set(["b", "strong", "i", "em", "u", "br", "p", "ul", "ol", "li", "span"]);

const LINK_CLASS =
  "font-medium underline underline-offset-2 text-[#000f37] decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] cursor-pointer";

const CITATION_RE = /\{\{cita:[^}]+\}\}/g;

function RefPreview({ target }: { target: ScriptureRef }) {
  const { display, label } = useVerseText(target);
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
        className="w-[340px] rounded-xl border-none bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] text-slate-900 dark:bg-[#1c1b2d] dark:text-[#bbbece]"
      >
        <RefPreview target={token} />
      </HoverCardContent>
    </HoverCard>
  );
}

function MobileRefButton({ token, onOpen }: { token: RefToken; onOpen: (t: PreviewTarget) => void }) {
  return (
    <button
      type="button"
      id={token.id}
      className={LINK_CLASS}
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

/** Converts sanitized note HTML into React nodes, swapping scripture anchors for interactive links. */
function renderNodes(
  nodes: NodeListOf<ChildNode> | ChildNode[],
  renderRef: (token: RefToken, key: string) => ReactNode,
  keyPrefix = "n",
): ReactNode[] {
  return Array.from(nodes).map((node, i) => {
    const key = `${keyPrefix}-${i}`;
    if (node.nodeType === 3) return node.textContent;
    if (node.nodeType !== 1) return null;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (tag === "a" && el.dataset["refBook"]) {
      return renderRef(
        {
          id: el.id,
          label: el.textContent ?? "",
          book: el.dataset["refBook"]!,
          chapter: Number(el.dataset["refChapter"]),
          verse: Number(el.dataset["refVerse"]),
        },
        key,
      );
    }

    if (!ALLOWED_TAGS.has(tag)) return el.textContent;
    if (tag === "br") return <br key={key} />;
    return createElement(tag, { key }, renderNodes(el.childNodes, renderRef, key));
  });
}

function NoteSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-full animate-pulse rounded bg-muted" />
      <div className="h-4 w-[92%] animate-pulse rounded bg-muted" />
      <div className="h-4 w-[80%] animate-pulse rounded bg-muted" />
      <div className="h-4 w-[60%] animate-pulse rounded bg-muted" />
    </div>
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
  const { lang } = useI18n();
  const [sheet, setSheet] = useState<PreviewTarget | null>(null);
  const [linked, setLinked] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const process = async () => {
      const hasCitations = CITATION_RE.test(html);
      CITATION_RE.lastIndex = 0;

      if (!hasCitations) {
        if (!cancelled) setLinked(linkifyScriptureRefs(html));
        return;
      }

      try {
        const hydrated = await hydrateCitations(html, lang);
        if (!cancelled) setLinked(linkifyScriptureRefs(hydrated));
      } catch {
        if (!cancelled) setLinked(linkifyScriptureRefs(html));
      }
    };

    process();
    return () => {
      cancelled = true;
    };
  }, [html, lang]);

  const body = useMemo(() => {
    if (typeof window === "undefined" || linked === null) return null;
    const doc = new DOMParser().parseFromString(`<body>${linked}</body>`, "text/html");
    return renderNodes(doc.body.childNodes, (token, key) =>
      isMobile ? (
        <MobileRefButton key={key} token={token} onOpen={setSheet} />
      ) : (
        <DesktopRefLink key={key} token={token} {...(onRefClick ? { onRefClick } : {})} />
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linked, isMobile, onRefClick]);

  return (
    <>
      <div className="study-note text-base leading-relaxed text-[#000f37] dark:text-foreground/80">
        {body ?? <NoteSkeleton />}
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
