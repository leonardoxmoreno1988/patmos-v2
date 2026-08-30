const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHY2r7RUsyLXl9ZjOxAkHpfDXNyuhHE0cutaWf2SlWssYDa3zKYZpuVrNRRd8gD6Rsz82Uv1SMb6SY/pub?output=csv";

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

export async function fetchStudyNotes(): Promise<NotesMap> {
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error("No se pudieron cargar las notas de estudio");
  const rows = parseCsv(await res.text());
  const map: NotesMap = {};
  for (const [key, note] of rows.slice(1)) {
    if (!key || !note) continue;
    map[key.trim()] = sanitizeNote(note);
  }
  return map;
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

export const studyNotesQuery = {
  queryKey: ["study-notes"],
  queryFn: fetchStudyNotes,
  staleTime: 1000 * 60 * 30,
};
