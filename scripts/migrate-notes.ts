// Imports study notes into the Supabase bible_notes table (supabase/migrations/*_create_bible_notes.sql),
// one row per anchored section of a chapter note: "<b>[3-5]</b> ..." becomes verse_anchor "3-5",
// verse_start 3, verse_end 5. Spanish comes from the published Google Sheet; English only from a CSV
// passed with --en (same "Book-chapter,note" layout; the original lives in git history at
// public/notes/notes_en.csv).
//
//   node scripts/migrate-notes.ts --dry-run                         # parse and validate; writes nothing
//   node --env-file=.env scripts/migrate-notes.ts                   # re-sync Spanish from the sheet
//   node --env-file=.env scripts/migrate-notes.ts --en notes_en.csv # also import English
//
// A real run upserts on (book_usfm, chapter, lang, position) and then deletes rows of the imported
// languages that this import no longer produces, so it is safe to re-run after the notes change.
// Languages that are not imported are left untouched.
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

import { CHAPTER_COUNTS, bookFromSlug } from "../src/lib/bible.ts";

type Lang = "es" | "en";
type Kind = "verse" | "range" | "section_heading";

interface NoteRow {
  book_usfm: string;
  chapter: number;
  verse_anchor: string;
  verse_start: number | null;
  verse_end: number | null;
  kind: Kind;
  position: number;
  lang: Lang;
  body_html: string;
}

interface LangReport {
  chapters: number;
  rows: NoteRow[];
  errors: string[];
  warnings: string[];
  imagesRemoved: number;
  zeroWidthRemoved: number;
}

const DRY_RUN = process.argv.includes("--dry-run");
const enIndex = process.argv.indexOf("--en");
const EN_CSV = enIndex > 0 ? process.argv[enIndex + 1] : undefined;
const ES_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHY2r7RUsyLXl9ZjOxAkHpfDXNyuhHE0cutaWf2SlWssYDa3zKYZpuVrNRRd8gD6Rsz82Uv1SMb6SY/pub?output=csv";
const TABLE = "bible_notes";
const ANCHOR_MAX = 50;

/** Legacy sheet spellings of current book names. */
const BOOK_ALIASES: Record<string, string> = { Hechos: "Actos", Salmo: "Salmos" };

/** Minimal RFC-4180 CSV parser (handles quoted fields, escaped quotes, newlines). */
function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quoted) {
      if (c === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
      continue;
    }
    if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

/** Keeps only simple inline formatting tags from the spreadsheet content. */
function sanitizeNote(html: string) {
  return html
    .replace(/<\s*\/?\s*(script|style|iframe|object|embed|link|meta)[^>]*>/gi, "")
    .replace(/<(?!\/?(b|strong|i|em|u|br|p|ul|ol|li)\b)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .trim();
}

/** "Book-chapter,note" rows -> { "Génesis-1": "<b>[1]</b> ..." }. Skips an "ID,Nota" header and empty notes. */
function notesFromCsv(csv: string): Record<string, string> {
  const rows = parseCsv(csv.replace(/^\uFEFF/, ""));
  const isKey = (key: string | undefined) => !!key && /^.+-\d+$/.test(key.trim());
  const notes: Record<string, string> = {};
  for (const [key, note] of isKey(rows[0]?.[0]) ? rows : rows.slice(1)) {
    if (key && note) notes[key.trim()] = sanitizeNote(note);
  }
  return notes;
}

async function fetchSpanishSheet(): Promise<Record<string, string>> {
  const res = await fetch(ES_SHEET_URL);
  if (!res.ok) throw new Error(`Google Sheet returned ${res.status}`);
  return notesFromCsv(await res.text());
}

/**
 * A "[...]" marker at the start of the note or of a line, bold or not: "<b>[3-5]</b>", "<b></b> [1-4]",
 * "<b>[1, 2] </b>". Brackets in mid-sentence ("... in haste [4, 5].") are cross references and stay
 * in the body.
 */
const ANCHOR_RE = /(?:^|<br\s*\/?>)\s*(?:<b>\s*<\/b>\s*)?(<b>\s*)?\[([^\]<>]{1,80})\](\s*<\/b>)?/gi;
/** "2", "3-5", "8–9", "1, 5-6": verses and ranges (hyphen, en or em dash), comma-separated. */
const NUMERIC_ANCHOR_RE = /^\d+(?:\s*[-–—]\s*\d+)?(?:\s*,\s*\d+(?:\s*[-–—]\s*\d+)?)*$/;
/** Leftover generator placeholders such as "[Image of Hezekiah spreading the letter ...]". */
const IMAGE_PLACEHOLDER_RE = /\s*\[Imag(?:e|en) (?:of|de)\b[^\]]*\]/gi;
const ZERO_WIDTH_RE = /[​﻿]/g;
const EDGE_BREAKS_RE = /^(?:\s|<br\s*\/?>|<b>\s*<\/b>)+|(?:\s|<br\s*\/?>|<b>\s*<\/b>)+$/gi;
const HEBREW_GREEK_RE = /[֐-׿Ͱ-Ͽἀ-῿]/g;

const countMatches = (s: string, re: RegExp) => s.match(re)?.length ?? 0;

function parseAnchor(raw: string): Pick<NoteRow, "verse_anchor" | "verse_start" | "verse_end" | "kind"> {
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

/** Splits one chapter note into [anchor | null for the text before the first anchor, body] sections. */
function splitNote(html: string): { anchor: string | null; body: string }[] {
  const marks: { start: number; end: number; anchor: string; reopenBold: boolean }[] = [];
  for (const m of html.matchAll(ANCHOR_RE)) {
    const [whole, boldOpen, anchor = "", boldClose] = m;
    // Unbolded line-initial brackets only count when they are verse numbers.
    if (!boldOpen && !NUMERIC_ANCHOR_RE.test(anchor.trim())) continue;
    // "<b>[1] Title</b>": the bold keeps going past the marker, so it is restored in the body.
    marks.push({ start: m.index, end: m.index + whole.length, anchor, reopenBold: !!boldOpen && !boldClose });
  }
  const tidy = (s: string) => s.replace(EDGE_BREAKS_RE, "");
  const sections: { anchor: string | null; body: string }[] = [];
  const intro = tidy(html.slice(0, marks[0]?.start ?? html.length));
  if (intro) sections.push({ anchor: null, body: intro });
  marks.forEach((mark, i) => {
    const body = html.slice(mark.end, marks[i + 1]?.start ?? html.length);
    sections.push({ anchor: mark.anchor, body: tidy((mark.reopenBold ? "<b>" : "") + body) });
  });
  return sections;
}

function buildRows(lang: Lang, notes: Record<string, string>): LangReport {
  const report: LangReport = { chapters: 0, rows: [], errors: [], warnings: [], imagesRemoved: 0, zeroWidthRemoved: 0 };
  const seen = new Map<string, string>();

  for (const [key, raw] of Object.entries(notes)) {
    const dash = key.lastIndexOf("-");
    const bookPart = key.slice(0, dash).trim();
    const chapter = Number(key.slice(dash + 1));
    const book = bookFromSlug(BOOK_ALIASES[bookPart] ?? bookPart);
    if (dash <= 0 || !book || !Number.isInteger(chapter)) {
      report.errors.push(`${key}: unknown book or chapter`);
      continue;
    }
    if (chapter < 1 || chapter > (CHAPTER_COUNTS[book.bookid] ?? 0)) {
      report.errors.push(`${key}: ${book.code} has no chapter ${chapter}`);
      continue;
    }
    const id = `${book.code} ${chapter}`;
    if (seen.has(id)) {
      report.errors.push(`${key}: same chapter as "${seen.get(id)}"`);
      continue;
    }
    seen.set(id, key);

    report.imagesRemoved += countMatches(raw, IMAGE_PLACEHOLDER_RE);
    report.zeroWidthRemoved += countMatches(raw, ZERO_WIDTH_RE);
    const html = raw.replace(ZERO_WIDTH_RE, "").replace(IMAGE_PLACEHOLDER_RE, "");

    const sections = splitNote(html);
    const scriptChars = countMatches(html, HEBREW_GREEK_RE);
    const keptScriptChars = sections.reduce((n, s) => n + countMatches(s.body, HEBREW_GREEK_RE), 0);
    if (keptScriptChars !== scriptChars) {
      report.errors.push(`${key}: Hebrew/Greek characters changed (${scriptChars} -> ${keptScriptChars})`);
    }

    report.chapters++;
    sections.forEach(({ anchor, body }, position) => {
      const parsed =
        anchor === null
          ? { verse_anchor: "intro", verse_start: null, verse_end: null, kind: "section_heading" as const }
          : parseAnchor(anchor);
      const where = `${key} [${parsed.verse_anchor}]`;
      if (parsed.verse_anchor.length > ANCHOR_MAX) report.errors.push(`${where}: anchor longer than ${ANCHOR_MAX}`);
      if (!body) report.warnings.push(`${where}: empty body`);
      if (countMatches(body, /<b>/gi) !== countMatches(body, /<\/b>/gi)) report.warnings.push(`${where}: unbalanced <b>`);
      report.rows.push({ book_usfm: book.code, chapter, ...parsed, position, lang, body_html: body });
    });
  }
  return report;
}

function printReport(lang: Lang, r: LangReport) {
  const by = (kind: Kind) => r.rows.filter((row) => row.kind === kind).length;
  const compound = [...new Set(r.rows.filter((row) => row.verse_anchor.includes(",")).map((row) => row.verse_anchor))];
  const headings = [...new Set(r.rows.filter((row) => row.kind === "section_heading").map((row) => row.verse_anchor))];
  console.log(`\n== ${lang.toUpperCase()}: ${r.chapters} chapters -> ${r.rows.length} rows`);
  console.log(`   verse ${by("verse")} | range ${by("range")} | section_heading ${by("section_heading")}`);
  console.log(`   removed: ${r.imagesRemoved} [Image of ...] placeholders, ${r.zeroWidthRemoved} zero-width characters`);
  console.log(`   headings: ${headings.join(" | ") || "none"}`);
  console.log(`   compound anchors (stored as min-max range): ${compound.join(" | ") || "none"}`);
  for (const w of r.warnings) console.log(`   warning: ${w}`);
  for (const e of r.errors) console.log(`   ERROR: ${e}`);
}

/** Chapters present in only one language, and chapters whose verse anchors differ between languages. */
function compareLanguages(es: NoteRow[], en: NoteRow[]) {
  const anchorsByChapter = (rows: NoteRow[]) => {
    const map = new Map<string, string[]>();
    for (const row of rows) {
      const id = `${row.book_usfm} ${row.chapter}`;
      if (!map.has(id)) map.set(id, []);
      if (row.kind !== "section_heading") map.get(id)!.push(row.verse_anchor);
    }
    return map;
  };
  const a = anchorsByChapter(es);
  const b = anchorsByChapter(en);
  const onlyEs = [...a.keys()].filter((id) => !b.has(id));
  const onlyEn = [...b.keys()].filter((id) => !a.has(id));
  const differing = [...a.keys()].filter((id) => b.has(id) && a.get(id)!.join() !== b.get(id)!.join());
  console.log(`\n== ES vs EN`);
  console.log(`   only ES: ${onlyEs.join(", ") || "none"}`);
  console.log(`   only EN: ${onlyEn.join(", ") || "none"}`);
  console.log(`   chapters with different verse anchors: ${differing.length}`);
  for (const id of differing) {
    console.log(`   ${id}\n     ES: ${a.get(id)!.join(" ")}\n     EN: ${b.get(id)!.join(" ")}`);
  }
}

async function writeRows(rows: NoteRow[], langs: Lang[]) {
  const url = process.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) throw new Error("VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required (use --env-file=.env).");
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await db
      .from(TABLE)
      .upsert(rows.slice(i, i + 500), { onConflict: "book_usfm,chapter,lang,position" });
    if (error) throw new Error(`Upsert failed at row ${i}: ${error.message}`);
  }

  // Remove sections that no longer exist (a chapter lost a section, or a note was deleted).
  const keep = new Set(rows.map((r) => `${r.lang}|${r.book_usfm}|${r.chapter}|${r.position}`));
  const stale: string[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from(TABLE)
      .select("id, lang, book_usfm, chapter, position")
      .in("lang", langs)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(`Reading existing rows failed: ${error.message}`);
    for (const r of data) if (!keep.has(`${r.lang}|${r.book_usfm}|${r.chapter}|${r.position}`)) stale.push(r.id);
    if (data.length < 1000) break;
  }
  for (let i = 0; i < stale.length; i += 200) {
    const { error } = await db.from(TABLE).delete().in("id", stale.slice(i, i + 200));
    if (error) throw new Error(`Deleting stale rows failed: ${error.message}`);
  }
  console.log(`\nUpserted ${rows.length} rows, deleted ${stale.length} stale rows.`);
}

const sources: Partial<Record<Lang, Record<string, string>>> = { es: await fetchSpanishSheet() };
if (EN_CSV) sources.en = notesFromCsv(readFileSync(EN_CSV, "utf8"));
else console.log("No --en file given: importing Spanish only; English rows are left untouched.");

const reports: Partial<Record<Lang, LangReport>> = {};
for (const lang of ["es", "en"] as const) {
  const notes = sources[lang];
  if (!notes) continue;
  reports[lang] = buildRows(lang, notes);
  printReport(lang, reports[lang]);
}
if (reports.es && reports.en) compareLanguages(reports.es.rows, reports.en.rows);

const sample = reports.es?.rows.find((r) => r.book_usfm === "GEN" && r.chapter === 1 && r.verse_anchor === "2");
if (sample) console.log(`\nSample GEN 1 [2] (es): ${sample.body_html.slice(0, 160)}…`);

const imported = Object.values(reports);
const errors = imported.reduce((n, r) => n + r.errors.length, 0);
if (errors) {
  console.error(`\n${errors} error(s); nothing was written.`);
  process.exitCode = 1;
} else if (DRY_RUN) {
  console.log("\nDry run: nothing was written.");
} else {
  await writeRows(
    imported.flatMap((r) => r.rows),
    Object.keys(reports) as Lang[],
  );
}
