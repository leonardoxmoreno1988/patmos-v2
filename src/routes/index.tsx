import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { BOOK_GROUPS, CHAPTER_COUNTS, slugifyBook, type BookInfo } from "@/lib/bible";
import { getNote, studyNotesQuery, type NotesMap } from "@/lib/notes";
import { SiteHeader } from "@/components/reader/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RV1865 + Notas — Biblia de estudio por Leonardo Moreno" },
      {
        name: "description",
        content:
          "Una exploración de la profecía bíblica y el cristianismo actual: lee la Reina-Valera 1865 con notas de estudio, libro por libro.",
      },
      { property: "og:title", content: "RV1865 + Notas" },
      {
        property: "og:description",
        content: "Lectura bíblica serena con notas de estudio por Leonardo Moreno.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function progressFor(notes: NotesMap | undefined, book: BookInfo) {
  const total = CHAPTER_COUNTS[book.bookid] ?? 0;
  let done = 0;
  if (notes && total) {
    for (let c = 1; c <= total; c++) {
      const note = getNote(notes, book.name, c);
      if (note && note.trim() !== "") done++;
    }
  }
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

function Home() {
  const { data: notes } = useQuery(studyNotesQuery);

  const [last, setLast] = useState<{ libro: string; cap: string }>({
    libro: "genesis",
    cap: "1",
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("rv1865:last");
      if (!raw) return;
      const parsed = JSON.parse(raw) as { libro?: string; cap?: string };
      if (parsed?.libro && parsed?.cap) setLast({ libro: parsed.libro, cap: parsed.cap });
    } catch {
      /* ignore */
    }
  }, []);

  const revelacion = useMemo(() => {
    const book = BOOK_GROUPS.flatMap((g) => g.books).find((b) => b.name === "Revelación");
    return book ? progressFor(notes, book) : { total: 22, done: 0, pct: 0 };
  }, [notes]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6">
        <section className="py-20 text-center md:py-24">
          <h1 className="scripture text-4xl font-bold tracking-tight text-[#000f37] md:text-6xl dark:text-white">
            RV1865 + Notas
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-neutral-600 md:text-xl dark:text-neutral-400">
            Una exploración de la profecía bíblica y el cristianismo actual.
          </p>
          <p className="mt-6 font-sans text-sm font-semibold uppercase tracking-widest text-foreground opacity-70">
            Por Leonardo Moreno
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/leer/$libro/$cap"
              params={{ libro: last.libro, cap: last.cap }}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#000f37] px-7 font-sans text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#000f37]"
            >
              Comenzar a leer
            </Link>
            <Link
              to="/leer/$libro/$cap"
              params={{ libro: "revelacion", cap: "1" }}
              className="font-sans text-sm font-medium text-[#000f37] underline decoration-[#000f37] underline-offset-4 dark:text-white dark:decoration-white"
            >
              Ver Revelación ({revelacion.pct}%)
            </Link>
          </div>
        </section>

        <section className="pb-24">
          <div className="space-y-12">
            {BOOK_GROUPS.map((group) => (
              <div key={group.label}>
                <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </h2>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {group.books.map((book) => (
                    <li key={book.bookid}>
                      <BookCard book={book} notes={notes} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-border py-8 text-center font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
        <div className="mx-auto max-w-6xl px-6">
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

function BookCard({ book, notes }: { book: BookInfo; notes: NotesMap | undefined }) {
  const { total, done, pct } = progressFor(notes, book);

  return (
    <Link
      to="/leer/$libro/$cap"
      params={{ libro: slugifyBook(book.name), cap: "1" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-md border border-[#000f37]/10 bg-transparent transition-colors hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-800/60"
    >
      <div className="flex flex-1 flex-col gap-2 px-3 pt-3">
        <div className="flex items-start justify-between gap-2">
          <span className="font-sans text-[15px] font-medium leading-tight text-foreground">
            {book.name}
          </span>
          {pct === 0 ? (
            <span className="shrink-0 font-sans text-xs text-muted-foreground">0%</span>
          ) : pct === 100 ? (
            <span className="shrink-0 rounded-full border border-emerald-200/50 bg-emerald-50 px-2 py-0.5 font-sans text-xs font-semibold text-emerald-600 dark:bg-emerald-950/40">
              100%
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 font-sans text-xs font-medium text-amber-600 dark:bg-amber-950/40">
              {pct}%
            </span>
          )}
        </div>
        <span className="font-sans text-[11px] text-muted-foreground">
          {done}/{total} caps.
        </span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-b-md bg-neutral-100 dark:bg-neutral-800">
        <div
          className={`h-full ${pct === 100 ? "bg-emerald-500" : "bg-amber-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </Link>
  );
}
