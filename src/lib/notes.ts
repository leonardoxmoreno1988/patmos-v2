import type { Lang } from "@/i18n";
import { bookFromSlug } from "./bible";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHY2r7RUsyLXl9ZjOxAkHpfDXNyuhHE0cutaWf2SlWssYDa3zKYZpuVrNRRd8gD6Rsz82Uv1SMb6SY/pub?output=csv";
/** English notes served from public/notes/; same "Book-chapter,note" layout as the Spanish sheet. */
const CSV_URL_EN = "/notes/notes_en.csv";

/** Minimal RFC-4180 CSV parser (handles quoted fields, escaped quotes, newlines). */
export function parseCsv(input: string): string[][] {
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
export function sanitizeNote(html: string) {
  return html
    .replace(/<\s*\/?\s*(script|style|iframe|object|embed|link|meta)[^>]*>/gi, "")
    .replace(/<(?!\/?(b|strong|i|em|u|br|p|ul|ol|li)\b)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .trim();
}

export type NotesMap = Record<string, string>;

/** True for "Book-chapter" keys ("Génesis-1", "Exodus-3"), false for a header cell like "ID". */
const isNoteKey = (key: string | undefined) => !!key && /^.+-\d+$/.test(key.trim());

function notesFromCsv(csv: string, canonicalKeys: boolean): NotesMap {
  const map: NotesMap = {};
  const rows = parseCsv(csv);
  // The Spanish sheet starts with an "ID,Nota" header; exported files may not.
  for (const [key, note] of isNoteKey(rows[0]?.[0]) ? rows : rows.slice(1)) {
    if (!key || !note) continue;
    map[canonicalKeys ? canonicalNoteKey(key.trim()) : key.trim()] = sanitizeNote(note);
  }
  return map;
}

/** "Exodus-3" or "Éxodo-3" -> "Éxodo-3", so English rows share the Spanish (canonical) keys. */
function canonicalNoteKey(key: string) {
  const dash = key.lastIndexOf("-");
  const book = dash > 0 ? bookFromSlug(key.slice(0, dash)) : undefined;
  return book ? `${book.name}${key.slice(dash)}` : key;
}

/** Returns null when the English file is missing or empty so callers fall back to Spanish. */
async function fetchEnglishNotes(): Promise<NotesMap | null> {
  try {
    const res = await fetch(CSV_URL_EN);
    // A missing static file can come back as the app's HTML 404 page instead of an error status.
    if (!res.ok || res.headers.get("content-type")?.includes("text/html")) return null;
    const map = notesFromCsv(await res.text(), true);
    return Object.keys(map).length ? map : null;
  } catch {
    return null;
  }
}

export async function fetchStudyNotes(lang: Lang = "es"): Promise<NotesMap> {
  if (lang === "en") {
    const english = await fetchEnglishNotes();
    if (english) return english;
  }
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error("No se pudieron cargar las notas de estudio");
  return notesFromCsv(await res.text(), false);
}

/** Legacy spreadsheet keys that should resolve to the current canonical book name. */
const KEY_ALIASES: Record<string, string> = { Hechos: "Actos", Salmo: "Salmos" };

export const noteKey = (bookName: string, chapter: number) =>
  `${KEY_ALIASES[bookName] ?? bookName}-${chapter}`;

/** Reads a note allowing legacy book spellings (e.g. "Hechos-2" for "Actos-2"). */
export const getNote = (map: NotesMap | undefined, bookName: string, chapter: number) => {
  if (!map) return undefined;
  const canonical = KEY_ALIASES[bookName] ?? bookName;
  const legacy = Object.entries(KEY_ALIASES).find(([, v]) => v === canonical)?.[0];
  return map[`${canonical}-${chapter}`] ?? (legacy ? map[`${legacy}-${chapter}`] : undefined);
};

export const studyNotesQuery = (lang: Lang = "es") => ({
  queryKey: ["study-notes", lang],
  queryFn: () => fetchStudyNotes(lang),
  staleTime: 1000 * 60 * 30,
});
