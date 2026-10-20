import { createElement, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

import {
  ScriptureRefLink,
  type ScriptureRefToken,
} from "@/components/reader/scripture-ref-link";
import { VerseSheet, type PreviewTarget } from "@/components/reader/verse-preview";
import { useIsMobile } from "@/hooks/use-mobile";
import { slugifyBook } from "@/lib/bible";
import { localeParam, type Lang } from "@/i18n";

/** Estudios are Spanish-only; always preview / link RV1865 via `/leer/...`. */
const STUDY_LANG: Lang = "es";

/** Tags Marked emits for estudios prose (plus the SoundCloud iframe exception). */
const PROSE_TAGS = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "del",
  "span",
  "br",
  "hr",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "figure",
  "figcaption",
  "div",
]);

const VOID_TAGS = new Set(["br", "hr"]);

function attr(el: Element, name: string): string | undefined {
  return el.getAttribute(name) ?? undefined;
}

/**
 * Walk compiled estudio HTML into React nodes, swapping `a[data-ref-*]` for
 * interactive ScriptureRefLink. Other anchors/images/iframes keep safe attrs.
 */
function renderEstudioNodes(
  nodes: NodeListOf<ChildNode> | ChildNode[],
  renderRef: (token: ScriptureRefToken, key: string) => ReactNode,
  keyPrefix = "e",
): ReactNode[] {
  return Array.from(nodes).map((node, i) => {
    const key = `${keyPrefix}-${i}`;
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (tag === "a" && el.dataset["refBook"]) {
      return renderRef(
        {
          id: el.id || `estudio-ref-${key}`,
          label: el.textContent ?? "",
          book: el.dataset["refBook"]!,
          chapter: Number(el.dataset["refChapter"]),
          verse: Number(el.dataset["refVerse"]),
        },
        key,
      );
    }

    if (tag === "a") {
      return createElement(
        "a",
        {
          key,
          href: attr(el, "href"),
          title: attr(el, "title"),
          target: attr(el, "target"),
          rel: attr(el, "rel"),
          className: attr(el, "class"),
        },
        renderEstudioNodes(el.childNodes, renderRef, key),
      );
    }

    if (tag === "img") {
      return createElement("img", {
        key,
        src: attr(el, "src"),
        alt: attr(el, "alt") ?? "",
        title: attr(el, "title"),
        loading: attr(el, "loading"),
        decoding: attr(el, "decoding"),
        className: attr(el, "class"),
      });
    }

    if (tag === "iframe") {
      return createElement("iframe", {
        key,
        src: attr(el, "src"),
        title: attr(el, "title"),
        width: attr(el, "width"),
        height: attr(el, "height"),
        loading: attr(el, "loading"),
        allow: attr(el, "allow"),
        className: attr(el, "class"),
      });
    }

    if (VOID_TAGS.has(tag)) return createElement(tag, { key });

    if (!PROSE_TAGS.has(tag)) {
      // Unknown tag: keep text descendants only (raw HTML is escaped at compile time).
      return renderEstudioNodes(el.childNodes, renderRef, key);
    }

    const props: Record<string, unknown> = { key };
    const className = attr(el, "class");
    if (className) props.className = className;
    const id = attr(el, "id");
    if (id) props.id = id;

    return createElement(tag, props, renderEstudioNodes(el.childNodes, renderRef, key));
  });
}

/**
 * Renders compiled estudio HTML with SEO-safe SSR anchors, then upgrades
 * `data-ref-*` links to HoverCard / VerseSheet after hydration (no mismatch).
 */
export function EstudioProse({ html, className }: { html: string; className?: string }) {
  const [interactive, setInteractive] = useState(false);
  const isMobile = useIsMobile();
  const [sheet, setSheet] = useState<PreviewTarget | null>(null);
  const navigate = useNavigate();

  // First client paint must match SSR (`dangerouslySetInnerHTML`). Enhance only after mount.
  useEffect(() => {
    setInteractive(true);
  }, []);

  const enhanced = useMemo(() => {
    if (!interactive || typeof window === "undefined") return null;
    const doc = new DOMParser().parseFromString(`<div id="estudio-root">${html}</div>`, "text/html");
    const root = doc.getElementById("estudio-root");
    if (!root) return null;

    const renderRef = (token: ScriptureRefToken, key: string) => (
      <ScriptureRefLink
        key={key}
        token={token}
        isMobile={isMobile}
        lang={STUDY_LANG}
        onMobileOpen={setSheet}
      />
    );

    return renderEstudioNodes(root.childNodes, renderRef);
  }, [html, interactive, isMobile]);

  return (
    <>
      {enhanced ? (
        <div className={className}>{enhanced}</div>
      ) : (
        <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
      )}

      {sheet ? (
        <VerseSheet
          target={sheet}
          lang={STUDY_LANG}
          onClose={() => setSheet(null)}
          onGoToChapter={() => {
            const ref = sheet;
            setSheet(null);
            void navigate({
              to: "/{-$locale}/leer/$libro/$cap",
              params: {
                locale: localeParam(STUDY_LANG),
                libro: slugifyBook(ref.book),
                cap: String(ref.chapter),
              },
              hash: `verse-${ref.verse}`,
            });
          }}
        />
      ) : null}
    </>
  );
}
