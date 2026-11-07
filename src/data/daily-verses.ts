import { BOOKS } from "@/lib/bible";
import { bookIdOf, readerPath } from "@/lib/bible-slugs";

export type DailyVerseLang = "es" | "en";

interface SeedVerse {
  /** Spanish book name, as in RV1865 (Revelación, Actos). */
  book: string;
  chapter: number;
  verse: number;
  /** Last verse of a range, e.g. Proverbios 3:5-6. */
  verseEnd?: number;
  /** Reina-Valera 1865 wording. */
  rv1865: string;
  /** King James Version wording. */
  kjv: string;
}

/** One passage per day of the month: index 0 is the 1st, index 30 is the 31st. */
const DAILY_VERSES: SeedVerse[] = [
  {
    book: "Salmos", chapter: 119, verse: 105,
    rv1865: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
    kjv: "Thy word is a lamp unto my feet, and a light unto my path.",
  },
  {
    book: "Proverbios", chapter: 3, verse: 5, verseEnd: 6,
    rv1865: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
    kjv: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
  },
  {
    book: "Josué", chapter: 1, verse: 8,
    rv1865: "Nunca se apartará de tu boca este libro de la ley, sino que de día y de noche meditarás en él, para que guardes y hagas conforme a todo lo que en él está escrito; porque entonces harás prosperar tu camino, y todo te saldrá bien.",
    kjv: "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.",
  },
  {
    book: "Isaías", chapter: 40, verse: 8,
    rv1865: "Secóse la hierba, marchitóse la flor; mas la palabra del Dios nuestro permanece para siempre.",
    kjv: "The grass withereth, the flower fadeth: but the word of our God shall stand for ever.",
  },
  {
    book: "Juan", chapter: 1, verse: 1,
    rv1865: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.",
    kjv: "In the beginning was the Word, and the Word was with God, and the Word was God.",
  },
  {
    book: "2 Timoteo", chapter: 3, verse: 16,
    rv1865: "Toda la Escritura es inspirada divinamente, y es útil para enseñar, para reprender, para corregir, para instituir en justicia.",
    kjv: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:",
  },
  {
    book: "Salmos", chapter: 23, verse: 1,
    rv1865: "Jehová es mi pastor; nada me faltará.",
    kjv: "The LORD is my shepherd; I shall not want.",
  },
  {
    book: "Romanos", chapter: 8, verse: 28,
    rv1865: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
    kjv: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
  },
  {
    book: "Filipenses", chapter: 4, verse: 6, verseEnd: 7,
    rv1865: "Por nada estéis afanosos; sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con hacimiento de gracias. Y la paz de Dios, que sobrepuja a todo entendimiento, guardará vuestros corazones y vuestros sentidos en Cristo Jesús.",
    kjv: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
  },
  {
    book: "Hebreos", chapter: 4, verse: 12,
    rv1865: "Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos; y penetra hasta partir el alma y el espíritu, y las coyunturas y los tuétanos, y discierne los pensamientos y las intenciones del corazón.",
    kjv: "For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.",
  },
  {
    book: "Salmos", chapter: 46, verse: 1,
    rv1865: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.",
    kjv: "God is our refuge and strength, a very present help in trouble.",
  },
  {
    book: "Mateo", chapter: 11, verse: 28,
    rv1865: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
    kjv: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
  },
  {
    book: "Efesios", chapter: 2, verse: 8, verseEnd: 9,
    rv1865: "Porque por gracia sois salvos por la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.",
    kjv: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
  },
  {
    book: "Salmos", chapter: 19, verse: 7,
    rv1865: "La ley de Jehová es perfecta, que vuelve el alma; el testimonio de Jehová es fiel, que hace sabio al pequeño.",
    kjv: "The law of the LORD is perfect, converting the soul: the testimony of the LORD is sure, making wise the simple.",
  },
  {
    book: "Isaías", chapter: 26, verse: 3,
    rv1865: "Tú guardarás en completa paz aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.",
    kjv: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
  },
  {
    book: "Proverbios", chapter: 16, verse: 3,
    rv1865: "Encomienda a Jehová tus obras, y tus pensamientos serán afirmados.",
    kjv: "Commit thy works unto the LORD, and thy thoughts shall be established.",
  },
  {
    book: "Lamentaciones", chapter: 3, verse: 22, verseEnd: 23,
    rv1865: "Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.",
    kjv: "It is of the LORD’S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
  },
  {
    book: "Romanos", chapter: 10, verse: 17,
    rv1865: "Así que la fe es por el oír, y el oír, por la palabra de Dios.",
    kjv: "So then faith cometh by hearing, and hearing by the word of God.",
  },
  {
    book: "Juan", chapter: 14, verse: 6,
    rv1865: "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.",
    kjv: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
  },
  {
    book: "Salmos", chapter: 27, verse: 1,
    rv1865: "Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?",
    kjv: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?",
  },
  {
    book: "Gálatas", chapter: 2, verse: 20,
    rv1865: "Con Cristo estoy juntamente crucificado; y ya no vivo yo, mas vive Cristo en mí; y lo que ahora vivo en la carne, lo vivo en la fe del Hijo de Dios, el cual me amó, y se entregó a sí mismo por mí.",
    kjv: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.",
  },
  {
    book: "1 Juan", chapter: 1, verse: 9,
    rv1865: "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.",
    kjv: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
  },
  {
    book: "Salmos", chapter: 37, verse: 5,
    rv1865: "Encomienda a Jehová tu camino, y confía en él; y él hará.",
    kjv: "Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.",
  },
  {
    book: "Jeremías", chapter: 29, verse: 11,
    rv1865: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
    kjv: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
  },
  {
    book: "Colosenses", chapter: 3, verse: 16,
    rv1865: "La palabra de Cristo habite en abundancia en vosotros, enseñándoos y exhortándoos unos a otros en toda sabiduría; cantando con gracia en vuestros corazones al Señor con salmos e himnos y cánticos espirituales.",
    kjv: "Let the word of Christ dwell in you richly in all wisdom; teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord.",
  },
  {
    book: "Salmos", chapter: 91, verse: 1, verseEnd: 2,
    rv1865: "El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.",
    kjv: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
  },
  {
    book: "1 Pedro", chapter: 5, verse: 7,
    rv1865: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.",
    kjv: "Casting all your care upon him; for he careth for you.",
  },
  {
    book: "Santiago", chapter: 1, verse: 5,
    rv1865: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente, y no zahiere; y le será dada.",
    kjv: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
  },
  {
    book: "Salmos", chapter: 103, verse: 1, verseEnd: 2,
    rv1865: "Bendice, alma mía, a Jehová, y bendiga todo mi ser su santo nombre. Bendice, alma mía, a Jehová, y no olvides ninguno de sus beneficios.",
    kjv: "Bless the LORD, O my soul: and all that is within me, bless his holy name. Bless the LORD, O my soul, and forget not all his benefits:",
  },
  {
    book: "Miqueas", chapter: 6, verse: 8,
    rv1865: "Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte para andar con tu Dios.",
    kjv: "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?",
  },
  {
    book: "Revelación", chapter: 22, verse: 13,
    rv1865: "Yo soy el Alfa y la Omega, el principio y el fin, el primero y el postrero.",
    kjv: "I am Alpha and Omega, the beginning and the end, the first and the last.",
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

/** The verse for a date: the 1st of the month gets entry 0, the 31st gets entry 30. Same day, same verse. */
export function getDailyVerse(date: Date, lang: DailyVerseLang): DailyVerse {
  const dayIndex = (date.getDate() - 1) % DAILY_VERSES.length;
  const seed = DAILY_VERSES[dayIndex]!;
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
