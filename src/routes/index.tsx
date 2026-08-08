import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ChevronLeft, ChevronRight, Search, Sparkles } from "lucide-react";

import { BOOKS, bookQuery, TRANSLATION, type Verse } from "@/lib/bible";
import { buildNotes } from "@/lib/commentary";
import { Selector } from "@/components/reader/selector";
import { ThemeToggle } from "@/components/reader/theme-toggle";
import { ChapterSkeleton, NotesSkeleton } from "@/components/reader/skeletons";

export const Route = createFileRoute("/")({
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

function VerseText({ verse }: { verse: Verse }) {
  return (
    <>
      <sup className="mr-1.5 select-none font-sans text-xs text-verse-number">{verse.verse}</sup>
      {verse.segments.map((s, i) =>
        s.italic ? (
          <em key={i} className="italic text-muted-foreground">
            {s.text}
          </em>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}{" "}
    </>
  );
}

function Reader() {
  const [bookId, setBookId] = useState(43);
  const [chapter, setChapter] = useState(3);
  const [query, setQuery] = useState("");

  const book = BOOKS.find((b) => b.bookid === bookId);
  const bookData = useQuery(bookQuery(bookId));
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
    () => (verses.length && book ? buildNotes(bookId, book.name, chapter, verses) : []),
    [verses, book, bookId, chapter],
  );

  const goTo = (nextBook: number, nextChapter: number) => {
    setBookId(nextBook);
    setChapter(nextChapter);
    setQuery("");
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

      <div className="sticky top-[61px] z-20 px-4 py-4 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-border/50 bg-surface/95 p-1.5 shadow-[var(--shadow-float)] backdrop-blur-xl">
          <div className="flex min-w-0 items-center gap-1">
            <Selector
              label="Libro"
              value={bookId}
              options={BOOKS.map((b) => ({ value: b.bookid, label: b.name }))}
              onSelect={(v) => goTo(v, 1)}
              searchable
            />
            <span className="h-5 w-px shrink-0 bg-border" />
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

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={prev}
              aria-label="Capítulo anterior"
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ChevronLeft className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Capítulo siguiente"
              className="flex h-9 items-center gap-1 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="h-[18px] w-[18px]" />
            </button>
          </div>
        </nav>
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <article className="rounded-2xl border border-border/50 bg-surface px-6 py-10 shadow-[var(--shadow-soft)] sm:px-12 sm:py-14">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Reina-Valera 1865
            </p>
            <h1 className="scripture mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {book?.name ?? "…"} {chapter}
            </h1>
            <div className="mt-8 h-px w-16 bg-border" />

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
                <div className="scripture space-y-5 text-[1.0625rem] leading-[1.8] text-foreground sm:text-lg">
                  {paragraphs.map((group, i) => (
                    <p key={i}>
                      {group.map((v) => (
                        <VerseText key={v.verse} verse={v} />
                      ))}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </article>

          <aside className="space-y-3 lg:sticky lg:top-40">
            <div className="flex items-center gap-2 px-1">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold tracking-tight">Notas de estudio</h2>
            </div>
            {bookData.isPending ? (
              <NotesSkeleton />
            ) : (
              notes.map((n) => (
                <div
                  key={n.title}
                  className="rounded-2xl border border-border/50 bg-surface p-5 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="text-[13px] font-semibold tracking-tight">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                </div>
              ))
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
