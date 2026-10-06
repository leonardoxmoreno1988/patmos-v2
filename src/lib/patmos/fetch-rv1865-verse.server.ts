import type { Lang } from "@/i18n";
import { BOOKS, CHAPTER_COUNTS, TRANSLATIONS, bookFromSlug, bookName, fetchBook } from "@/lib/bible";
import { resolveBookName } from "@/lib/scripture-refs";

/** Accepts Spanish names and aliases ("Hechos") as well as English ones ("Revelation"). */
function findBook(name: string) {
  const canonical = resolveBookName(name);
  return (canonical ? BOOKS.find((b) => b.name === canonical) : undefined) ?? bookFromSlug(name);
}

function parseVerseRange(
  range: string | undefined,
): { from: number; to: number } | { error: string } {
  if (!range?.trim()) {
    return { error: 'Debes indicar verseRange (p. ej. "15" o "15-17").' };
  }
  const r = range.trim();
  const single = /^(\d+)$/.exec(r);
  if (single) {
    const v = Number(single[1]);
    return { from: v, to: v };
  }
  const span = /^(\d+)\s*[-–]\s*(\d+)$/.exec(r);
  if (span) {
    const from = Number(span[1]);
    const to = Number(span[2]);
    if (to < from) {
      return {
        error: `Rango inválido: ${range}. El versículo final debe ser mayor o igual al inicial.`,
      };
    }
    return { from, to };
  }
  return { error: `Formato de verseRange no válido: "${range}". Usa "15" o "15-17".` };
}

export type FetchRv1865VerseResult =
  | {
      ok: true;
      reference: string;
      text: string;
      verses: Array<{ verse: number; text: string }>;
    }
  | { ok: false; error: string };

/**
 * Resolves verse text for the chat tools: `fetch_rv1865_verse` ("es") and `fetch_kjv_verse` ("en").
 * English reads the local KJV files, so it needs the site `origin` to build an absolute URL.
 */
export async function executeFetchVerse(
  params: { bookName: string; chapter: number; verseRange?: string },
  { lang = "es", origin = "" }: { lang?: Lang; origin?: string } = {},
): Promise<FetchRv1865VerseResult> {
  const translation = TRANSLATIONS[lang];
  const found = findBook(params.bookName);
  if (!found) {
    return {
      ok: false,
      error:
        lang === "en"
          ? `Book not found: "${params.bookName}". Use the KJV English name (e.g. Genesis, 2 Timothy, 1 Corinthians).`
          : `Libro no encontrado: "${params.bookName}". Usa el nombre canónico en español (p. ej. Génesis, 2 Timoteo, 1 Corintios).`,
    };
  }
  const book = { ...found, name: bookName(found, lang) };

  if (!Number.isInteger(params.chapter) || params.chapter < 1) {
    return { ok: false, error: `Capítulo inválido: ${params.chapter}.` };
  }

  const maxChapter = CHAPTER_COUNTS[book.bookid];
  if (maxChapter && params.chapter > maxChapter) {
    return {
      ok: false,
      error: `${book.name} solo tiene ${maxChapter} capítulos; se solicitó el capítulo ${params.chapter}.`,
    };
  }

  const parsed = parseVerseRange(params.verseRange);
  if ("error" in parsed) return { ok: false, error: parsed.error };

  let chapters;
  try {
    chapters = await fetchBook(book.bookid, lang, origin);
  } catch {
    return {
      ok: false,
      error: `No se pudo cargar el texto de ${book.name} desde la fuente ${translation}.`,
    };
  }

  const chapterData = chapters.find((c) => c.chapter === params.chapter);
  if (!chapterData) {
    return {
      ok: false,
      error: `El capítulo ${params.chapter} de ${book.name} no está disponible en ${translation}.`,
    };
  }

  const verses = chapterData.verses.filter(
    (v) => v.verse >= parsed.from && v.verse <= parsed.to,
  );
  if (verses.length === 0) {
    const last = chapterData.verses.at(-1)?.verse;
    const hint = last ? ` Versículos disponibles en este capítulo: 1–${last}.` : "";
    const rangeLabel =
      parsed.from === parsed.to ? `${parsed.from}` : `${parsed.from}–${parsed.to}`;
    return {
      ok: false,
      error: `No hay versículos ${rangeLabel} en ${book.name} ${params.chapter}.${hint}`,
    };
  }

  const rangeLabel =
    parsed.from === parsed.to ? `${parsed.from}` : `${parsed.from}-${parsed.to}`;
  const reference = `${book.name} ${params.chapter}:${rangeLabel}`;

  return {
    ok: true,
    reference,
    text: verses.map((v) => v.text).join(" "),
    verses: verses.map((v) => ({ verse: v.verse, text: v.text })),
  };
}
