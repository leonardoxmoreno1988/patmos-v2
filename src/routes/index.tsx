import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { BOOKS, bookQuery, TRANSLATION, type Verse } from "@/lib/bible";
import { Selector } from "@/components/reader/selector";
import { SiteHeader } from "@/components/reader/site-header";
import { StudyNoteCard } from "@/components/reader/study-note-card";
import { getNote, studyNotesQuery } from "@/lib/notes";
import { canonicalBook } from "@/lib/scripture-refs";


export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = typeof search["libro"] === "string" ? (search["libro"] as string) : "Génesis";
    const libro = canonicalBook(raw);
    const cap = Number(search["cap"]);
    return {
      libro: BOOKS.some((b) => b.name === libro) ? libro : "Génesis",
      cap: Number.isFinite(cap) && cap > 0 ? Math.floor(cap) : 1,
    };
  },
  head: () => ({
    meta: [
      { title: "Comentario Bíblico — Lectura serena y notas de estudio" },
      {
        name: "description",
        content:
          "Lee cualquier capítulo de la Biblia (Reina-Valera 1865) en una interfaz limpia y espaciosa, con notas de estudio y contexto por libro.",
      },
      { property: "og:title", content: "Comentario Bíblico" },
      {
        property: "og:description",
        content: "Lectura bíblica minimalista con comentario y notas de estudio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reader,
});

function VerseText({
  verse,
  flashing,
}: {
  verse: Verse;
  flashing?: boolean;
}) {
  return (
    <span
      id={`verse-${verse.verse}`}
      className={`-mx-2 block scroll-mt-44 cursor-text select-text rounded-lg px-2 py-1 text-[18px] sm:text-[19px] leading-relaxed text-foreground font-sans ${
        flashing ? "bg-verse-highlight" : ""
      }`}
    >

      <sup className="mr-2 inline-block select-none font-sans text-xs font-medium text-verse-number">
        {verse.verse}
      </sup>
      {verse.segments.map((s, i) =>
        s.italic ? (
          <em key={i} className="italic text-muted-foreground">
            {s.text}
          </em>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </span>
  );
}

function Reader() {
  const { libro, cap } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [history, setHistory] = useState<
    { book: string; chapter: number; verse: number; originId?: string }[]
  >([]);
  const [flashVerse, setFlashVerse] = useState<number | null>(null);
  const pendingVerse = useRef<number | null>(null);
  const pendingElId = useRef<string | null>(null);

  const book = BOOKS.find((b) => b.name === libro) ?? BOOKS[0]!;
  const bookId = book.bookid;
  const chapter = cap;
  const bookData = useQuery({ ...bookQuery(bookId), placeholderData: keepPreviousData });
  const studyNotes = useQuery(studyNotesQuery);
  const chapters = bookData.data ?? [];
  const chapterCount = chapters.length || 1;
  const current = chapters.find((c) => c.chapter === chapter) ?? chapters[0];
  const verses = current?.verses ?? [];
  const loading =
    bookData.isFetching || bookData.isPlaceholderData || studyNotes.isFetching;

  const scrollToVerse = (verse: number) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(`verse-${verse}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setFlashVerse(verse);
    window.setTimeout(() => setFlashVerse(null), 2000);
  };

  const scrollToId = (id: string) => {
    if (typeof window === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const target = pendingVerse.current;
    if (target === null || verses.length === 0) return;
    pendingVerse.current = null;
    const t = window.setTimeout(() => scrollToVerse(target), 60);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verses, libro, cap]);

  useEffect(() => {
    const id = pendingElId.current;
    if (!id || typeof window === "undefined") return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      pendingElId.current = null;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libro, cap, studyNotes.data, verses]);

  const renderNotes = () =>
    getNote(studyNotes.data, book.name, chapter) ? (
      <StudyNoteCard
        html={getNote(studyNotes.data, book.name, chapter)!}
        onRefClick={goToReference}
      />
    ) : studyNotes.isPending ? null : (
      <p className="py-4 text-sm italic text-muted-foreground/70">
        No hay comentario registrado para este capítulo.
      </p>
    );
  const goTo = (nextBook: number, nextChapter: number) => {
    const target = BOOKS.find((b) => b.bookid === nextBook);
    if (!target) return;
    void navigate({ search: { libro: target.name, cap: nextChapter } });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToVerse = (bookName: string, nextChapter: number, verse: number) => {
    if (bookName === book.name && nextChapter === chapter) {
      requestAnimationFrame(() => scrollToVerse(verse));
      return;
    }
    pendingVerse.current = verse;
    void navigate({ search: { libro: bookName, cap: nextChapter } });
  };

  const goToReference = (ref: {
    book: string;
    chapter: number;
    verse: number;
    originId?: string;
  }) => {
    if (!BOOKS.some((b) => b.name === ref.book)) return;
    setHistory((h) => [
      ...h,
      {
        book: book.name,
        chapter,
        verse: 1,
        ...(ref.originId ? { originId: ref.originId } : {}),
      },
    ]);
    goToVerse(ref.book, ref.chapter, ref.verse);
  };

  const goBack = () => {
    const last = history[history.length - 1];
    if (!last) return;
    setHistory((h) => h.slice(0, -1));
    if (last.originId) {
      if (last.book === book.name && last.chapter === chapter) {
        const el = document.getElementById(last.originId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
      }
      pendingElId.current = last.originId;
      void navigate({ search: { libro: last.book, cap: last.chapter } });
      return;
    }
    goToVerse(last.book, last.chapter, last.verse);
  };

  const lastOrigin = history[history.length - 1];
  const notesContent = renderNotes();

  const prev = () => {
    if (chapter > 1) return goTo(bookId, chapter - 1);
    const prevBook = BOOKS[bookId - 2];
    if (prevBook) goTo(prevBook.bookid, 1);
  };

  const next = () => {
    if (chapter < chapterCount) return goTo(bookId, chapter + 1);
    const nextBook = BOOKS[bookId];
    if (nextBook) goTo(nextBook.bookid, 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />


      <div className="sticky top-0 z-30 bg-background/95 py-2 backdrop-blur-md sm:top-[64px] sm:bg-background/70 lg:top-[68px]">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 sm:flex-nowrap sm:gap-4">
          <div className="flex w-full min-w-0 items-center justify-between gap-3 sm:w-auto sm:justify-start">
            <div className="flex items-center gap-3 sm:gap-4">
              <Selector
                label="Libro"
                value={bookId}
                options={BOOKS.map((b) => ({ value: b.bookid, label: b.name }))}
                onSelect={(v) => goTo(v, 1)}
              />
              <Selector
                label="Capítulo"
                value={chapter}
                options={Array.from({ length: chapterCount }, (_, i) => ({
                  value: i + 1,
                  label: String(i + 1),
                }))}
                onSelect={(v) => goTo(bookId, v)}
                columns={5}
                groupByTestament={false}
                itemClassName="text-base font-medium"
              />
              {lastOrigin ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="ml-2 hidden cursor-pointer whitespace-nowrap font-sans text-sm font-medium text-[#000f37] underline underline-offset-4 decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] sm:inline"
                >
                  Volver
                </button>
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Capítulo anterior"
                className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <ChevronLeft className="h-[18px] w-[18px]" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Capítulo siguiente"
                className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <ChevronRight className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>

          {lastOrigin ? (
            <button
              type="button"
              onClick={goBack}
              className="mt-2 inline-block cursor-pointer whitespace-nowrap font-sans text-sm font-medium text-[#000f37] underline underline-offset-4 decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] sm:hidden"
            >
              Volver
            </button>
          ) : null}
        </nav>
      </div>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-24 pt-4 sm:pt-6 lg:grid-cols-12 lg:items-start lg:gap-16">
          <article id="bible-text-section" className="scroll-mt-[8rem] lg:col-span-7">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h1 className="scripture text-3xl font-bold tracking-tight text-foreground dark:text-white sm:text-4xl">
                {book.name} {chapter}
              </h1>
              <button
                type="button"
                onClick={() => scrollToId("study-notes-section")}
                className="cursor-pointer font-sans text-sm font-medium text-[#000f37] underline underline-offset-4 decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] lg:hidden"
              >
                Ir a las notas
              </button>
            </div>

            <div
              className={`mt-8 transition-opacity duration-200 ${
                loading ? "pointer-events-none opacity-40" : "opacity-100"
              }`}
            >
              {bookData.isError ? (
                <p className="text-sm text-muted-foreground">
                  No pudimos cargar este libro. Revisa tu conexión e inténtalo de nuevo.
                </p>
              ) : (
                <div className="space-y-1.5 font-sans tracking-[-0.01em] text-foreground">
                  {verses.map((v) => (
                    <VerseText
                      key={v.verse}
                      verse={v}
                      flashing={flashVerse === v.verse}
                    />
                  ))}
                </div>
              )}
            </div>

          </article>

        <section id="study-notes-section" className="scroll-mt-[8rem] lg:hidden">
          <div className="mt-10 w-full border-t border-[#000f37] pt-8 dark:border-[#7c7b82]" />
          <h2 className="mb-3 font-sans text-lg font-bold text-foreground lg:text-[20px]">
            Notas
          </h2>
          <div
            className={`space-y-6 transition-opacity duration-200 ${
              loading ? "pointer-events-none opacity-40" : "opacity-100"
            }`}
          >
            {notesContent}
          </div>
        </section>

        <aside className="hidden space-y-6 lg:col-span-5 lg:block lg:sticky lg:top-[8rem] lg:self-start lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto scrollbar-none">
          <div className="min-h-full border-l border-[#000f37] bg-transparent pt-0 pb-16 pl-6 shadow-none dark:border-[#bcbecd] lg:pl-8">
            <h2 className="mb-3 font-sans text-lg font-bold text-foreground lg:text-[20px]">
              Notas
            </h2>
            <div
              className={`transition-opacity duration-200 ${
                loading ? "pointer-events-none opacity-40" : "opacity-100"
              }`}
            >
              {renderNotes()}
            </div>
          </div>
        </aside>
      </main>

      <footer className="mt-20 border-t-0 border-border py-8 text-center font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm sm:leading-normal">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          © 2026 Notas de Estudio por{" "}
          <a
            href="https://www.ritualypropaganda.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            Leonardo Moreno
          </a>
          . Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
