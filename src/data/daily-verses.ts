import { BOOKS } from "@/lib/bible";
import { bookIdOf, readerPath } from "@/lib/bible-slugs";

export type DailyVerseLang = "es" | "en";

interface SeedVerse {
  /** Spanish book name, as in RV1865. */
  book: string;
  chapter: number;
  verse: number;
  /** Last verse of a range, e.g. Proverbios 3:5-6. */
  verseEnd?: number;
  rv1865: string;
  kjv: string;
}

const SEED_VERSES: SeedVerse[] = [
  {
    book: "Salmos",
    chapter: 119,
    verse: 105,
    rv1865: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
    kjv: "Thy word is a lamp unto my feet, and a light unto my path.",
  },
  {
    book: "Proverbios",
    chapter: 3,
    verse: 5,
    verseEnd: 6,
    rv1865: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
    kjv: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
  },
  {
    book: "Josué",
    chapter: 1,
    verse: 8,
    rv1865: "Nunca se apartará de tu boca este libro de la ley, sino que de día y de noche meditarás en él, para que guardes y hagas conforme a todo lo que en él está escrito; porque entonces harás prosperar tu camino, y todo te saldrá bien.",
    kjv: "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.",
  },
  {
    book: "Isaías",
    chapter: 40,
    verse: 8,
    rv1865: "Secóse la hierba, marchitóse la flor; mas la palabra del Dios nuestro permanece para siempre.",
    kjv: "The grass withereth, the flower fadeth: but the word of our God shall stand for ever.",
  },
  {
    book: "Juan",
    chapter: 1,
    verse: 1,
    rv1865: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.",
    kjv: "In the beginning was the Word, and the Word was with God, and the Word was God.",
  },
  {
    book: "2 Timoteo",
    chapter: 3,
    verse: 16,
    rv1865: "Toda la Escritura es inspirada divinamente, y es útil para enseñar, para reprender, para corregir, para instituir en justicia.",
    kjv: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:",
  },
];

export interface DailyVerse {
  /** Book, chapter and verse(s), in the language of the page, e.g. "Salmos 119:105" or "Psalms 119:105". */
  reference: string;
  /** "RV1865" for Spanish, "KJV" for English. */
  version: string;
  text: string;
  /** Reader URL for the passage, in the language of the page. */
  readerUrl: string;
}

/** Day of the year (1–366) for the given date, in local time. */
export function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86_400_000);
}

/** The verse for a date. Deterministic: the same day always shows the same verse. */
export function getDailyVerse(date: Date, lang: DailyVerseLang): DailyVerse {
  const seed = SEED_VERSES[dayOfYear(date) % SEED_VERSES.length]!;
  const bookid = bookIdOf(seed.book);
  const book = BOOKS.find((b) => b.bookid === bookid);
  if (bookid === null || !book) throw new Error(`Unknown book in daily verses: ${seed.book}`);

  const verses = seed.verseEnd ? `${seed.verse}-${seed.verseEnd}` : `${seed.verse}`;
  const bookName = lang === "en" ? book.nameEn : book.name;

  return {
    reference: `${bookName} ${seed.chapter}:${verses}`,
    version: lang === "en" ? "KJV" : "RV1865",
    text: lang === "en" ? seed.kjv : seed.rv1865,
    readerUrl: readerPath(lang === "en" ? "en" : "es", bookid, seed.chapter, seed.verse),
  };
}
