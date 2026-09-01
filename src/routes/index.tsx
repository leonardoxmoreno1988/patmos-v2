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

 const mateo = useMemo(() => {
   const book = BOOK_GROUPS.flatMap((g) => g.books).find((b) => b.name === "Mateo");
   return book ? progressFor(notes, book) : { total: 28, done: 0, pct: 0 };
  }, [notes]);

  return (
   <div className="min-h-screen bg-background">
    <SiteHeader />

    <main className="mx-auto max-w-6xl px-6">
     <section className="py-20 text-center md:py-24">
       <h1 className="text-4xl font-bold tracking-tight text-[#000f37] md:text-6xl dark:text-white">
        Biblia + Notas
       </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 md:text-xl dark:text-neutral-400">
           Estudio doctrinal y profético del texto bíblico Reina Valera 1865.
          </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
       <Link
        to="/leer/$libro/$cap"
        params={{ libro: last.libro, cap: last.cap }}
        className="inline-flex h-11 items-center justify-center rounded-full bg-[#000f37] px-7 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#000f37]"
       >
        Comenzar a leer
       </Link>
       <Link
        to="/leer/$libro/$cap"
        params={{ libro: "mateo", cap: "1" }}
        className="text-sm font-medium text-[#000f37] underline decoration-[#000f37] underline-offset-4 dark:text-white dark:decoration-white"
       >
        Leer Mateo ({mateo.pct}%)
       </Link>
      </div>
     </section>

    <section className="pb-24">
     <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {BOOK_GROUPS.flatMap((group) => group.books).map((book) => (
       <li key={book.bookid}>
        <BookCard book={book} notes={notes} />
       </li>
      ))}
     </ul>
    </section>
   </main>

   <footer className="border-border py-8 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
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

 const badge =
  pct === 100 ? (
   <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
    100%
   </span>
  ) : pct >= 1 ? (
   <span className="shrink-0 rounded-full border border-orange-200 bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-800 dark:border-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
    {pct}%
   </span>
  ) : (
   <span className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">0%</span>
  );

 return (
  <Link
   to="/leer/$libro/$cap"
   params={{ libro: slugifyBook(book.name), cap: "1" }}
   className="group flex h-full flex-col rounded-md border border-[#000f37]/10 bg-transparent p-3 transition-all hover:border-neutral-300 dark:border-white/10 dark:hover:border-neutral-700 cursor-pointer"
  >
   <div className="flex flex-1 flex-col gap-2">
    <div className="flex items-start justify-between gap-2">
     <span className="text-[15px] font-medium leading-tight text-foreground">
      {book.name}
     </span>
     {badge}
    </div>
    <span className="text-[11px] text-muted-foreground">
     {done}/{total} caps.
    </span>
   </div>
   <div className="mt-3 h-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
    <div
     className={`h-full transition-all ${pct === 100 ? "bg-emerald-500" : pct >= 1 ? "bg-orange-500" : "bg-neutral-300 dark:bg-neutral-600"}`}
     style={{ width: `${pct}%` }}
    />
   </div>
  </Link>
 );
}
