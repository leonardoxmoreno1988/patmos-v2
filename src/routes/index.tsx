import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import { BOOKS, bookQuery, TRANSLATION, type Verse } from "@/lib/bible";
import { Selector } from "@/components/reader/selector";
import { SiteHeader } from "@/components/reader/site-header";
import { ChapterSkeleton, NotesSkeleton } from "@/components/reader/skeletons";
import { StudyNoteCard } from "@/components/reader/study-note-card";
import { VerseToolbar } from "@/components/reader/verse-toolbar";
import { noteKey, studyNotesQuery } from "@/lib/notes";
import { EtsyBanner } from "@/components/reader/etsy-banner";
// import { NewsletterCard } from "@/components/reader/newsletter-card";


export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const libro = typeof search["libro"] === "string" ? (search["libro"] as string) : "Génesis";
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
  selected,
  flashing,
  onSelect,
}: {
  verse: Verse;
  selected: boolean;
  flashing?: boolean;
  onSelect: () => void;
}) {
  return (
    <span
      id={`verse-${verse.verse}`}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`-mx-2 block scroll-mt-44 cursor-pointer rounded-lg px-2 py-1 text-lg leading-relaxed transition-colors duration-700 lg:text-[20px] lg:leading-[1.75] ${
        selected || flashing ? "bg-verse-highlight" : "hover:bg-accent/50"
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
  const [query, setQuery] = useState("");
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [history, setHistory] = useState<{ book: string; chapter: number; verse: number }[]>([]);
  const [flashVerse, setFlashVerse] = useState<number | null>(null);
  const pendingVerse = useRef<number | null>(null);

  const book = BOOKS.find((b) => b.name === libro) ?? BOOKS[0]!;
  const bookId = book.bookid;
  const chapter = cap;
  const bookData = useQuery(bookQuery(bookId));
  const studyNotes = useQuery(studyNotesQuery);
  const chapters = bookData.data ?? [];
  const chapterCount = chapters.length || 1;
  const current = chapters.find((c) => c.chapter === chapter) ?? chapters[0];
  const verses = current?.verses ?? [];

  const filteredVerses = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return verses;
    return verses.filter((v) => v.text.toLowerCase().includes(q));
  }, [verses, query]);

  const selectedVerseData = verses.find((v) => v.verse === selectedVerse);

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

  const renderNotes = () =>
    studyNotes.isPending ? (
      <NotesSkeleton />
    ) : studyNotes.data?.[noteKey(book.name, chapter)] ? (
      <StudyNoteCard
        html={studyNotes.data[noteKey(book.name, chapter)]!}
        onRefClick={goToReference}
      />
    ) : (
      <p className="py-4 text-sm italic text-muted-foreground/70">
        No hay comentario registrado para este capítulo.
      </p>
    );
  const goTo = (nextBook: number, nextChapter: number) => {
    const target = BOOKS.find((b) => b.bookid === nextBook);
    if (!target) return;
    setQuery("");
    setSelectedVerse(null);
    void navigate({ search: { libro: target.name, cap: nextChapter } });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToVerse = (bookName: string, nextChapter: number, verse: number) => {
    if (bookName === book.name && nextChapter === chapter) {
      setQuery("");
      setSelectedVerse(null);
      requestAnimationFrame(() => scrollToVerse(verse));
      return;
    }
    setQuery("");
    setSelectedVerse(null);
    pendingVerse.current = verse;
    void navigate({ search: { libro: bookName, cap: nextChapter } });
  };

  const goToReference = (ref: { book: string; chapter: number; verse: number }) => {
    if (!BOOKS.some((b) => b.name === ref.book)) return;
    setHistory((h) => [
      ...h,
      { book: book.name, chapter, verse: selectedVerse ?? 1 },
    ]);
    goToVerse(ref.book, ref.chapter, ref.verse);
  };

  const goBack = () => {
    const last = history[history.length - 1];
    if (!last) return;
    setHistory((h) => h.slice(0, -1));
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
      <SiteHeader showSearch query={query} setQuery={setQuery} />


      <div className="sticky top-0 z-30 bg-background/95 py-2 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50 sm:top-[64px] sm:min-h-[80px] sm:py-4 sm:bg-background/70 sm:border-0">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 sm:flex-nowrap sm:gap-4">
          <div className="flex w-full min-w-0 items-center justify-between gap-3 sm:w-auto sm:justify-start">
            <div className="flex items-center gap-3 sm:gap-4">
              <Selector
                label="Libro"
                value={bookId}
                options={BOOKS.map((b) => ({ value: b.bookid, label: b.name }))}
                onSelect={(v) => goTo(v, 1)}
                searchable
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
              />
              {lastOrigin ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="ml-2 hidden cursor-pointer items-center gap-1.5 whitespace-nowrap text-xs font-medium text-neutral-400 transition-colors hover:text-white sm:inline-flex"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Volver a {lastOrigin.book} {lastOrigin.chapter}:{lastOrigin.verse}
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
              className="inline-flex w-full items-center justify-between whitespace-nowrap rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200 mt-2 dark:bg-neutral-800/80 dark:text-neutral-300 sm:hidden"
            >
              <span className="inline-flex items-center gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" />
                Volver a {lastOrigin.book} {lastOrigin.chapter}:{lastOrigin.verse}
              </span>
            </button>
          ) : null}
        </nav>
      </div>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-24 pt-4 sm:pt-6 lg:grid-cols-12 lg:items-start lg:gap-16">
          <article id="bible-text-section" className="scroll-mt-24 lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Reina-Valera 1865
            </p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
              <h1 className="scripture text-3xl font-bold tracking-tight text-foreground dark:text-white sm:text-4xl">
                {book.name} {chapter}
              </h1>
              <button
                type="button"
                onClick={() => scrollToId("study-notes-section")}
                className="inline-flex items-center whitespace-nowrap rounded-full border border-[#000f37]/20 px-3 py-1.5 font-sans text-xs font-medium text-muted-foreground transition-colors hover:text-foreground dark:border-[#7c7b82]/50 lg:hidden"
              >
                Ir a las notas ↓
              </button>
            </div>
            <div className="mt-8 h-px w-16 bg-[#000f37]/20 dark:bg-[#7c7b82]/50" />

            <div className="mt-8">
              {bookData.isPending ? (
                <ChapterSkeleton />
              ) : bookData.isError ? (
                <p className="text-sm text-muted-foreground">
                  No pudimos cargar este libro. Revisa tu conexión e inténtalo de nuevo.
                </p>
              ) : filteredVerses.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Ningún versículo de este capítulo contiene «{query}».
                </p>
              ) : (
                <div className="space-y-3.5 font-sans tracking-[-0.01em] text-foreground">
                  {filteredVerses.map((v) => (
                    <VerseText
                      key={v.verse}
                      verse={v}
                      selected={selectedVerse === v.verse}
                      flashing={flashVerse === v.verse}
                      onSelect={() =>
                        setSelectedVerse((cur) => (cur === v.verse ? null : v.verse))
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            {/* <NewsletterCard /> */}
          </article>

        <section
          id="study-notes-section"
          className="scroll-mt-24 space-y-6 lg:hidden"
        >
          <p className="font-serif text-xl font-bold text-foreground">
            {book.name} {chapter}
          </p>
          {notesContent}
          <button
            type="button"
            onClick={() => scrollToId("bible-text-section")}
            className="inline-flex items-center whitespace-nowrap rounded-full border border-[#000f37]/20 px-3 py-1.5 font-sans text-xs font-medium text-muted-foreground transition-colors hover:text-foreground dark:border-[#7c7b82]/50"
          >
            ↑ Volver al texto
          </button>
          <EtsyBanner />
        </section>

        <aside className="hidden space-y-6 lg:col-span-5 lg:block lg:sticky lg:top-[9.5rem] lg:self-start lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto scrollbar-none">
          <div className="rounded-none border border-[#000f37] bg-transparent p-6 dark:border-[#7c7b82]">
            {renderNotes()}
          </div>
          <EtsyBanner />
        </aside>
      </main>

      {selectedVerse !== null && selectedVerseData ? (
        <VerseToolbar
          reference={`${book.name} ${chapter}:${selectedVerse}`}
          text={selectedVerseData.text}
          onClose={() => setSelectedVerse(null)}
        />
      ) : null}

      <footer className="mt-20 border-t border-border py-8 text-center font-sans text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-6">
          © 2026 Notas de Estudio. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
