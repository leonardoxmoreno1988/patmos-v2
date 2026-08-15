import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Search } from "lucide-react";

import { BOOKS, bookQuery, TRANSLATION, type Verse } from "@/lib/bible";
import { Selector } from "@/components/reader/selector";
import { ThemeToggle } from "@/components/reader/theme-toggle";
import { ChapterSkeleton, NotesSkeleton } from "@/components/reader/skeletons";
import { StudyNoteCard } from "@/components/reader/study-note-card";
import { VerseToolbar } from "@/components/reader/verse-toolbar";
import { noteKey, studyNotesQuery } from "@/lib/notes";
import { EtsyBanner } from "@/components/reader/etsy-banner";
import { NotesDrawer } from "@/components/reader/notes-drawer";
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
      className={`-mx-2 block scroll-mt-44 cursor-pointer rounded-lg px-2 py-1 transition-colors duration-700 ${
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

  useEffect(() => {
    const target = pendingVerse.current;
    if (target === null || verses.length === 0) return;
    pendingVerse.current = null;
    const el = document.getElementById(`verse-${target}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setFlashVerse(target);
    const t = setTimeout(() => setFlashVerse(null), 2000);
    return () => clearTimeout(t);
  }, [verses, libro, cap]);

  const renderNotes = (bare = false) =>
    studyNotes.isPending ? (
      <NotesSkeleton />
    ) : studyNotes.data?.[noteKey(book.name, chapter)] ? (
      <StudyNoteCard
        html={studyNotes.data[noteKey(book.name, chapter)]!}
        bare={bare}
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
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-3 md:grid-cols-[auto_minmax(0,1fr)_auto]">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen className="h-[18px] w-[18px]" />
            </span>
            <span className="flex min-w-0 items-baseline">
              <span className="truncate text-[15px] font-semibold tracking-tight text-foreground dark:text-white">
                Notas de Estudio
              </span>
              <span className="ml-2 shrink-0 text-xs font-normal text-muted-foreground md:text-sm">
                · por L. Moreno
              </span>
            </span>
          </div>

          <div className="order-last col-span-2 flex w-full justify-center md:order-none md:col-span-1">
            <label className="mx-auto flex h-12 w-full items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 text-sm transition-shadow focus-within:ring-1 focus-within:ring-muted-foreground/40 md:h-10 md:w-72">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en este capítulo…"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/newsletter"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground dark:hover:text-white"
            >
              Newsletter
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="sticky top-[61px] z-30 h-[80px] bg-background/70 py-4 backdrop-blur-md">
        <nav className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-6 sm:gap-6">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
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
          </div>

          <div className="flex shrink-0 items-center gap-3">
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
        </nav>
      </div>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-24 pt-6 lg:grid-cols-12 lg:items-start lg:gap-16">
          <article className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Reina-Valera 1865
            </p>
            <h1 className="scripture mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-white sm:text-4xl">
              {book.name} {chapter}
            </h1>
            <div className="mt-8 h-px w-16 bg-border/70" />

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
                <div className="space-y-5 font-sans text-[1.0625rem] leading-[1.95] text-foreground sm:text-lg">
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

        <aside className="hidden space-y-6 lg:col-span-5 lg:block lg:sticky lg:top-[9.5rem] lg:self-start lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto scrollbar-none">
          {notesContent}
          <EtsyBanner />
        </aside>
      </main>

      <NotesDrawer title={`${book.name} ${chapter}`}>
        {renderNotes(true)}
        <div className="mt-6">
          <EtsyBanner />
        </div>
      </NotesDrawer>

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
