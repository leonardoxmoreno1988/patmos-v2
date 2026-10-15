// Dependency-free helpers for bible_notes anchors, shared by the reader, the admin editor (client and
// server) and scripts/migrate-notes.ts (which imports this file directly with Node).

export type NoteKind = "verse" | "range" | "section_heading";
export const NOTE_KINDS: readonly NoteKind[] = ["verse", "range", "section_heading"];

/** Matches the varchar(50) column. */
export const ANCHOR_MAX = 50;

/** "2", "3-5", "8–9", "1, 5-6": verses and ranges (hyphen, en or em dash), comma-separated. */
export const NUMERIC_ANCHOR_RE = /^\d+(?:\s*[-–—]\s*\d+)?(?:\s*,\s*\d+(?:\s*[-–—]\s*\d+)?)*$/;

export interface ParsedAnchor {
  verse_anchor: string;
  verse_start: number | null;
  verse_end: number | null;
  kind: NoteKind;
}

/** "[3-5]" contents -> anchor fields. Non-numeric text is a section heading ("Book Structure", "intro"). */
export function parseAnchor(raw: string): ParsedAnchor {
  const text = raw.trim().replace(/\s+/g, " ");
  if (!NUMERIC_ANCHOR_RE.test(text)) {
    return { verse_anchor: text, verse_start: null, verse_end: null, kind: "section_heading" };
  }
  const verses = text.split(/\D+/).filter(Boolean).map(Number);
  return {
    // One spelling in both languages: "8–9" -> "8-9", "1,5 - 6" -> "1, 5-6".
    verse_anchor: text.replace(/\s*[-–—]\s*/g, "-").replace(/\s*,\s*/g, ", "),
    verse_start: Math.min(...verses),
    verse_end: Math.max(...verses),
    kind: verses.length === 1 ? "verse" : "range",
  };
}

/** Why a note can't be saved (mirrors the table's check constraints), or null when it is valid. */
export function anchorProblem(note: Omit<ParsedAnchor, "verse_anchor"> & { verse_anchor: string }): string | null {
  const anchor = note.verse_anchor.trim();
  if (!anchor) return "El ancla no puede estar vacía.";
  if (anchor.length > ANCHOR_MAX) return `El ancla admite como máximo ${ANCHOR_MAX} caracteres.`;
  if (note.kind === "section_heading") {
    return note.verse_start === null && note.verse_end === null
      ? null
      : "Un encabezado no lleva versículos.";
  }
  if (note.verse_start === null || note.verse_end === null) return "Indica el versículo inicial y final.";
  if (note.verse_start < 1) return "Los versículos empiezan en 1.";
  if (note.verse_end < note.verse_start) return "El versículo final no puede ser menor que el inicial.";
  return null;
}

/** A line that starts a section: "[1-4]" alone or followed by text ("[5] En el principio..."). */
const SECTION_LINE_RE = /^\s*\[([^\]\n]{1,80})\]\s*(.*)$/;
/** Leftover generator placeholders such as "[Image of Hezekiah ...]"; they never start a section. */
const IMAGE_PLACEHOLDER_RE = /^\[Imag(?:e|en) (?:of|de)\b/i;
const LOOKS_LIKE_HTML_RE = /<\/?(b|strong|i|em|u|br|p|ul|ol|li)\b[^>]*>/i;

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Plain lines -> note HTML: line breaks become <br>; text that already contains note tags is kept as is. */
function linesToHtml(lines: string[]): string {
  const text = lines.join("\n").trim();
  const html = LOOKS_LIKE_HTML_RE.test(text) ? text : escapeHtml(text);
  return html.replace(/\n{2,}/g, "<br>").replace(/\n/g, "<br>");
}

export type PastedNote = ParsedAnchor & { body_html: string };

/** The chapter being edited, so NotebookLM-style paragraphs can be anchored by their references. */
export interface PasteContext {
  /** Every name the book may be cited by, e.g. ["Éxodo", "Exodus"]. */
  bookNames: string[];
  chapter: number;
}

const isSectionLine = (line: string) => SECTION_LINE_RE.test(line) && !IMAGE_PLACEHOLDER_RE.test(line.trim());

/**
 * Splits a pasted chapter note into sections. Two formats are accepted:
 *
 * Bracket anchors (used when any line starts with one):
 *
 *   [1-4]
 *   Commentary...
 *
 *   [5-6] More commentary...
 *
 *   Text before the first anchor becomes an "intro" section. Anchors go through parseAnchor, so
 *   "[8–9]" is stored as "8-9" and "[Estructura del Libro]" becomes a section heading.
 *
 * NotebookLM paragraphs (no anchors; see notebookParagraphs): one section per paragraph, anchored
 * by the references to `context`'s chapter it contains.
 */
export function parseNoteText(input: string, context?: PasteContext): PastedNote[] {
  const text = input.replace(/[​﻿]/g, "").replace(/\r\n?/g, "\n");
  const lines = text.split("\n");
  if (context && !lines.some(isSectionLine)) return notebookParagraphs(text, context);

  const sections: { anchor: string | null; lines: string[] }[] = [{ anchor: null, lines: [] }];
  for (const line of lines) {
    const m = SECTION_LINE_RE.exec(line);
    if (m && isSectionLine(line)) sections.push({ anchor: m[1]!, lines: [m[2] ?? ""] });
    else if (!IMAGE_PLACEHOLDER_RE.test(line.trim())) sections[sections.length - 1]!.lines.push(line);
  }
  return sections.flatMap(({ anchor, lines: body }) => {
    const body_html = linesToHtml(body);
    if (anchor === null) return body_html ? [introNote(body_html)] : [];
    return [{ ...parseAnchor(anchor), body_html }];
  });
}

const introNote = (body_html: string): PastedNote => ({
  verse_anchor: "intro",
  verse_start: null,
  verse_end: null,
  kind: "section_heading",
  body_html,
});

/** NotebookLM citation bubbles: "[14]", "[3, 4]", "[2-5]", including runs like "[3][4]". */
const CITATION_BUBBLE_RE = /\s*\[\d+(?:\s*[,\-–]\s*\d+)*\]/g;
const MARKDOWN_BOLD_RE = /\*\*(.+?)\*\*/g;

/** Lowercase, no accents: "Éxodo" and "exodo" compare equal. */
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Lowest and highest verse of `chapter` cited in `text` ("Exodus 23:1-2; 23:4", "vv. 4-5"), or null. */
function citedVerses(text: string, { bookNames, chapter }: PasteContext): [number, number] | null {
  const folded = fold(text);
  const names = bookNames.map((n) => escapeRe(fold(n)).replace(/\s+/g, "\\s+")).join("|");
  const verses: number[] = [];
  const add = (from: string, to: string | undefined) => {
    const a = Number(from);
    const b = to ? Number(to) : a;
    if (a > 0 && b > 0) verses.push(Math.min(a, b), Math.max(a, b));
  };
  // "Exodus 23:1-2", plus same-book continuations: "Exodus 23:1-2; 23:4, 23:6-7". The lookbehinds keep
  // "1 Juan 2:3" from counting as "Juan 2:3".
  const bookRef = new RegExp(`(?<![\\p{L}\\d])(?<!\\d\\s)(?:${names})\\.?\\s+(\\d+:\\d+(?:\\s*[-–]\\s*\\d+)?(?:\\s*[;,]\\s*\\d+:\\d+(?:\\s*[-–]\\s*\\d+)?)*)`, "gu");
  for (const m of folded.matchAll(bookRef)) {
    for (const r of m[1]!.matchAll(/(\d+):(\d+)(?:\s*[-–]\s*(\d+))?/g)) {
      if (Number(r[1]) === chapter) add(r[2]!, r[3]);
    }
  }
  // "v. 4", "vv. 4-5", "vs. 4": verses of the chapter being annotated.
  for (const r of folded.matchAll(/\bv(?:v|s)?\.\s*(\d+)(?:\s*[-–]\s*(\d+))?/g)) add(r[1]!, r[2]);
  return verses.length ? [Math.min(...verses), Math.max(...verses)] : null;
}

/**
 * NotebookLM output: plain paragraphs separated by blank lines, with references such as
 * "(Exodus 23:10-11)" and trailing citation bubbles "[14]". Each paragraph becomes one section whose
 * anchor spans the lowest to the highest verse of this chapter it cites. The first paragraph becomes
 * the intro when it cites none; later ones get an empty anchor, which the editor flags for review.
 */
function notebookParagraphs(text: string, context: PasteContext): PastedNote[] {
  const blocks = text
    .split(/\n\s*\n/)
    .map((block) =>
      block
        .split("\n")
        .filter((line) => !IMAGE_PLACEHOLDER_RE.test(line.trim()))
        .map((line) => line.replace(/^#{1,6}\s+/, "").replace(CITATION_BUBBLE_RE, "").trimEnd())
        .join("\n")
        .trim(),
    )
    .filter(Boolean);

  return blocks.map((block, i) => {
    const body_html = linesToHtml([block]).replace(MARKDOWN_BOLD_RE, "<b>$1</b>");
    const range = citedVerses(block, context);
    if (range) {
      const [start, end] = range;
      return { ...parseAnchor(start === end ? String(start) : `${start}-${end}`), body_html };
    }
    if (i === 0) return introNote(body_html);
    return { verse_anchor: "", verse_start: null, verse_end: null, kind: "range", body_html };
  });
}
