export const TRANSLATION = "RV1865";

const BASE = "https://raw.githubusercontent.com/MC1171611/valera1865/master/USFM/";

export interface BookInfo {
  bookid: number;
  name: string;
  file: string;
}

const RAW_BOOKS = [
  { n: "Génesis", f: "01_GEN_RV1865.usfm" }, { n: "Éxodo", f: "02_EXO_RV1865.usfm" }, { n: "Levítico", f: "03_LEV_RV1865.usfm" }, { n: "Números", f: "04_NUM_RV1865.usfm" }, { n: "Deuteronomio", f: "05_DEU_RV1865.usfm" }, { n: "Josué", f: "06_JOS_RV1865.usfm" }, { n: "Jueces", f: "07_JDG_RV1865.usfm" }, { n: "Rut", f: "08_RUT_RV1865.usfm" }, { n: "1 Samuel", f: "09_1SA_RV1865.usfm" }, { n: "2 Samuel", f: "10_2SA_RV1865.usfm" }, { n: "1 Reyes", f: "11_1KI_RV1865.usfm" }, { n: "2 Reyes", f: "12_2KI_RV1865.usfm" }, { n: "1 Crónicas", f: "13_1CH_RV1865.usfm" }, { n: "2 Crónicas", f: "14_2CH_RV1865.usfm" }, { n: "Esdras", f: "15_EZR_RV1865.usfm" }, { n: "Nehemías", f: "16_NEH_RV1865.usfm" }, { n: "Ester", f: "17_EST_RV1865.usfm" }, { n: "Job", f: "18_JOB_RV1865.usfm" }, { n: "Salmos", f: "19_PSA_RV1865.usfm" }, { n: "Proverbios", f: "20_PRO_RV1865.usfm" }, { n: "Eclesiastés", f: "21_ECC_RV1865.usfm" }, { n: "Cantares", f: "22_SNG_RV1865.usfm" }, { n: "Isaías", f: "23_ISA_RV1865.usfm" }, { n: "Jeremías", f: "24_JER_RV1865.usfm" }, { n: "Lamentaciones", f: "25_LAM_RV1865.usfm" }, { n: "Ezequiel", f: "26_EZK_RV1865.usfm" }, { n: "Daniel", f: "27_DAN_RV1865.usfm" }, { n: "Oseas", f: "28_HOS_RV1865.usfm" }, { n: "Joel", f: "29_JOL_RV1865.usfm" }, { n: "Amós", f: "30_AMO_RV1865.usfm" }, { n: "Abdías", f: "31_OBA_RV1865.usfm" }, { n: "Jonás", f: "32_JON_RV1865.usfm" }, { n: "Miqueas", f: "33_MIC_RV1865.usfm" }, { n: "Nahúm", f: "34_NAM_RV1865.usfm" }, { n: "Habacuc", f: "35_HAB_RV1865.usfm" }, { n: "Sofonías", f: "36_ZEP_RV1865.usfm" }, { n: "Hageo", f: "37_HAG_RV1865.usfm" }, { n: "Zacarías", f: "38_ZEC_RV1865.usfm" }, { n: "Malaquías", f: "39_MAL_RV1865.usfm" }, { n: "Mateo", f: "41_MAT_RV1865.usfm" }, { n: "Marcos", f: "42_MRK_RV1865.usfm" }, { n: "Lucas", f: "43_LUK_RV1865.usfm" }, { n: "Juan", f: "44_JHN_RV1865.usfm" }, { n: "Hechos", f: "45_ACT_RV1865.usfm" }, { n: "Romanos", f: "46_ROM_RV1865.usfm" }, { n: "1 Corintios", f: "47_1CO_RV1865.usfm" }, { n: "2 Corintios", f: "48_2CO_RV1865.usfm" }, { n: "Gálatas", f: "49_GAL_RV1865.usfm" }, { n: "Efesios", f: "50_EPH_RV1865.usfm" }, { n: "Filipenses", f: "51_PHP_RV1865.usfm" }, { n: "Colosenses", f: "52_COL_RV1865.usfm" }, { n: "1 Tesalonicenses", f: "53_1TH_RV1865.usfm" }, { n: "2 Tesalonicenses", f: "54_2TH_RV1865.usfm" }, { n: "1 Timoteo", f: "55_1TI_RV1865.usfm" }, { n: "2 Timoteo", f: "56_2TI_RV1865.usfm" }, { n: "Tito", f: "57_TIT_RV1865.usfm" }, { n: "Filemón", f: "58_PHM_RV1865.usfm" }, { n: "Hebreos", f: "59_HEB_RV1865.usfm" }, { n: "Santiago", f: "60_JAS_RV1865.usfm" }, { n: "1 Pedro", f: "61_1PE_RV1865.usfm" }, { n: "2 Pedro", f: "62_2PE_RV1865.usfm" }, { n: "1 Juan", f: "63_1JN_RV1865.usfm" }, { n: "2 Juan", f: "64_2JN_RV1865.usfm" }, { n: "3 Juan", f: "65_3JN_RV1865.usfm" }, { n: "Judas", f: "66_JUD_RV1865.usfm" }, { n: "Revelación", f: "67_REV_RV1865.usfm" },
];

export const BOOKS: BookInfo[] = RAW_BOOKS.map((b, i) => ({
  bookid: i + 1,
  name: b.n,
  file: b.f,
}));

export interface Segment {
  text: string;
  italic?: boolean;
}

export interface Verse {
  verse: number;
  segments: Segment[];
  text: string;
  paragraph: boolean;
}

export interface Chapter {
  chapter: number;
  verses: Verse[];
}

/** Splits a USFM verse body into plain and \add ... \add* (italic) segments. */
function parseInline(raw: string): Segment[] {
  const segments: Segment[] = [];
  const re = /\\add\s?([\s\S]*?)\\add\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    const before = raw.slice(last, m.index);
    if (before) segments.push({ text: clean(before) });
    const inner = clean(m[1] ?? "");
    if (inner) segments.push({ text: inner, italic: true });
    last = m.index + m[0].length;
  }
  const tail = raw.slice(last);
  if (tail) segments.push({ text: clean(tail) });
  return segments.filter((s) => s.text.length > 0);
}

function clean(text: string) {
  return text
    .replace(/\\[a-z]+\d*\*?/g, "")
    .replace(/[¶]/g, "")
    .replace(/\s{2,}/g, " ");
}

/** Parses a full USFM book into chapters with verses and paragraph breaks. */
export function parseUsfm(source: string): Chapter[] {
  const chapters: Chapter[] = [];
  let current: Chapter | null = null;
  let verse: Verse | null = null;
  let pendingParagraph = true;
  let buffer = "";

  const flush = () => {
    if (!verse) return;
    verse.segments = parseInline(buffer);
    verse.text = verse.segments.map((s) => s.text).join("").replace(/\s{2,}/g, " ").trim();
    const first = verse.segments[0];
    const lastSeg = verse.segments[verse.segments.length - 1];
    if (first) first.text = first.text.replace(/^\s+/, "");
    if (lastSeg) lastSeg.text = lastSeg.text.replace(/\s+$/, "");
    if (verse.text) current?.verses.push(verse);
    verse = null;
    buffer = "";
  };

  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const chapterMatch = /^\\c\s+(\d+)/.exec(trimmed);
    if (chapterMatch) {
      flush();
      current = { chapter: Number(chapterMatch[1]), verses: [] };
      chapters.push(current);
      pendingParagraph = true;
      continue;
    }

    if (/^\\(p|m|q\d?|pi\d?|nb)\b/.test(trimmed)) {
      flush();
      pendingParagraph = true;
      continue;
    }

    const verseMatch = /^\\v\s+(\d+)\s?([\s\S]*)$/.exec(trimmed);
    if (verseMatch) {
      flush();
      const body = verseMatch[2] ?? "";
      const marked = /^\s*¶/.test(body);
      verse = {
        verse: Number(verseMatch[1]),
        segments: [],
        text: "",
        paragraph: pendingParagraph || marked,
      };
      buffer = body;
      pendingParagraph = false;
      continue;
    }

    if (trimmed.startsWith("\\")) {
      if (verse) buffer += " " + trimmed;
      continue;
    }

    if (verse) buffer += " " + trimmed;
  }
  flush();

  return chapters.filter((c) => c.verses.length > 0);
}

export async function fetchBook(bookid: number): Promise<Chapter[]> {
  const book = BOOKS.find((b) => b.bookid === bookid);
  if (!book) throw new Error("Libro no encontrado");
  const res = await fetch(`${BASE}${book.file}`);
  if (!res.ok) throw new Error("No se pudo cargar el libro");
  return parseUsfm(await res.text());
}

export const bookQuery = (bookid: number) => ({
  queryKey: ["bible", "book", bookid],
  queryFn: () => fetchBook(bookid),
  staleTime: Infinity,
});
