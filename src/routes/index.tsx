import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ChevronLeft, ChevronRight, Search, Sparkles } from "lucide-react";

import { BOOKS, bookQuery, TRANSLATION, type Verse } from "@/lib/bible";
import { buildNotes } from "@/lib/commentary";
import { Selector } from "@/components/reader/selector";
import { ThemeToggle } from "@/components/reader/theme-toggle";
import { ChapterSkeleton, NotesSkeleton } from "@/components/reader/skeletons";
import { StudyNoteCard } from "@/components/reader/study-note-card";
import { VerseToolbar } from "@/components/reader/verse-toolbar";
import { noteKey, studyNotesQuery } from "@/lib/notes";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const libro = typeof search["libro"] === "string" ? (search["libro"] as string) : "Juan";
    const cap = Number(search["cap"]);
    return {
      libro: BOOKS.some((b) => b.name === libro) ? libro : "Juan",
      cap: Number.isFinite(cap) && cap > 0 ? Math.floor(cap) : 3,
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
  onSelect,
}: {
  verse: Verse;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`cursor-pointer rounded-lg px-0.5 transition-colors ${
        selected ? "bg-verse-highlight" : "hover:bg-accent/50"
      }`}
    >
      <sup className="mr-1.5 select-none font-sans text-xs text-verse-number">{verse.verse}</sup>
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

  const book = BOOKS.find((b) => b.name === libro) ?? BOOKS[42]!;
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

  const paragraphs = useMemo(() => {
    const groups: Verse[][] = [];
    for (const v of filteredVerses) {
      const last = groups[groups.length - 1];
      if (!last || v.paragraph || query.trim()) groups.push([v]);
      else last.push(v);
    }
    return groups;
  }, [filteredVerses, query]);

  const notes = useMemo(
    () => (verses.length ? buildNotes(bookId, book.name, chapter, verses) : []),
    [verses, book.name, bookId, chapter],
  );

  const selectedVerseData = verses.find((v) => v.verse === selectedVerse);

  const goTo = (nextBook: number, nextChapter: number) => {
    const target = BOOKS.find((b) => b.bookid === nextBook);
    if (!target) return;
    setQuery("");
    setSelectedVerse(null);
    void navigate({ search: { libro: target.name, cap: nextChapter } });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 md:grid-cols-[auto_minmax(0,1fr)_auto]">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen className="h-[18px] w-[18px]" />
            </span>
            <span className="truncate text-[15px] font-semibold tracking-tight">
              Comentario Bíblico
            </span>
          </div>

          <div className="order-last col-span-2 md:order-none md:col-span-1">
            <label className="flex items-center gap-2 rounded-full border border-border/60 bg-surface px-4 py-2 shadow-[var(--shadow-soft)] transition-shadow focus-within:shadow-[var(--shadow-float)]">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en este capítulo…"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <div className="sticky top-[61px] z-30 h-[80px] bg-background/70 px-4 py-4 backdrop-blur-md sm:px-6">
        <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 sm:gap-6">
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
              className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-surface/90 text-muted-foreground shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors hover:bg-accent hover:text-foreground"
            >
              <ChevronLeft className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Capítulo siguiente"
              className="flex h-11 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="h-[18px] w-[18px]" />
            </button>
          </div>
        </nav>
      </div>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pb-24 pt-12 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-16 lg:pt-14">
          <article className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Reina-Valera 1865
            </p>
            <h1 className="scripture mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
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
              ) : paragraphs.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Ningún versículo de este capítulo contiene «{query}».
                </p>
              ) : (
                <div className="scripture space-y-6 text-[1.0625rem] leading-loose text-foreground sm:text-lg">
                  {paragraphs.map((group, i) => (
                    <p key={i} className="mb-6 last:mb-0">
                      {group.map((v) => (
                        <span key={v.verse}>
                          <VerseText
                            verse={v}
                            selected={selectedVerse === v.verse}
                            onSelect={() =>
                              setSelectedVerse((cur) => (cur === v.verse ? null : v.verse))
                            }
                          />{" "}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </article>

        <aside className="space-y-6 lg:col-span-5 lg:sticky lg:top-[9.5rem] lg:self-start lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto scrollbar-none">
          {studyNotes.data?.[noteKey(book.name, chapter)] ? (
            <StudyNoteCard html={studyNotes.data[noteKey(book.name, chapter)]!} />
          ) : null}

          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold tracking-tight">Notas de estudio</h2>
            </div>
            {bookData.isPending ? (
              <NotesSkeleton />
            ) : (
              notes.map((n) => (
                <div key={n.title} className="rounded-2xl bg-muted/40 p-6">
                  <h3 className="text-[13px] font-semibold tracking-tight">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                </div>
              ))
            )}
          </div>
        </aside>
      </main>

      {selectedVerse !== null && selectedVerseData ? (
        <VerseToolbar
          reference={`${book.name} ${chapter}:${selectedVerse}`}
          text={selectedVerseData.text}
          onClose={() => setSelectedVerse(null)}
        />
      ) : null}
    </div>
  );
}
