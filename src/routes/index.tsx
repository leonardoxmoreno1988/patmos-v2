import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultaPatmos } from "@/components/reader/consulta-patmos";
import { useQuery } from "@tanstack/react-query";
import { getNote, studyNotesQuery, type NotesMap } from "@/lib/notes";
import { useAuth } from "@/components/auth/auth-provider";
import { AuthModal } from "@/components/auth/auth-modal";
import { EBOOK_COVER, EBOOK_TITLE } from "@/lib/ebook";

import { BOOK_GROUPS, CHAPTER_COUNTS, slugifyBook, type BookInfo } from "@/lib/bible";
import { SiteHeader } from "@/components/reader/site-header";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
 staticData: { sitemap: true },
 head: () =>
  seoHead({
   title: "PATMOS — Exégesis y Biblia Reina Valera 1865",
   description:
     "Plataforma de investigación teológica, análisis profético y preservación del texto bíblico Reina Valera 1865.",
   canonical: "/",
  }),
 component: Home,
});

/** Chapters with at least one study note, per book, from the global notes sheet. */
function notesAvailability(notes: NotesMap | undefined, book: BookInfo) {
 const total = CHAPTER_COUNTS[book.bookid] ?? 0;
 if (!notes || !total) return { total, done: 0, pct: 0 };
 let done = 0;
 for (let cap = 1; cap <= total; cap++) {
  if (getNote(notes, book.name, cap)) done++;
 }
 return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

function Home() {
 const { user } = useAuth();
 const navigate = useNavigate();
  const search = useSearch({ from: "/" }) as { consulta?: string };
 const [signupOpen, setSignupOpen] = useState(false);
  const [consultaOpen, setConsultaOpen] = useState(false);
  const [consultaView, setConsultaView] = useState<"chat" | "history">("chat");
  const [consultaKey, setConsultaKey] = useState(0);
  const { data: studyNotes, isLoading: notesLoading } = useQuery(studyNotesQuery);

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

  useEffect(() => {
    if (search.consulta === "history") {
      setConsultaView("history");
      setConsultaKey((k) => k + 1);
      setConsultaOpen(true);
    }
  }, [search.consulta]);

  const lastBook = BOOK_GROUPS.flatMap((g) => g.books).find((b) => slugifyBook(b.name) === last.libro)?.name ?? "Génesis";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
  
      <main className="mx-auto max-w-6xl px-6">
        <section className="py-14 text-center md:py-20">
          <h1 className="sr-only">PATMOS — Exégesis y Notas de Estudio RV1865</h1>
          
          {/* Título visible únicamente en desktop */}
          <h2 className="hidden md:block font-bold tracking-tight text-foreground mb-6 text-4xl md:text-5xl lg:text-6xl">
            RV1865 + Notas
          </h2>
  
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Plataforma de investigación teológica, análisis profético y estudio del texto bíblico Reina Valera 1865.
          </p>
  
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-11 rounded-full px-6 dark:border-transparent dark:bg-white dark:text-slate-900 hover:dark:bg-slate-100">
              <Link to="/leer/$libro/$cap" params={{ libro: last.libro, cap: last.cap }}>
                <BookOpen /> Continuar Lectura ({lastBook} {last.cap})
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-11 rounded-full px-6" onClick={() => { setConsultaView("chat"); setConsultaKey((k) => k + 1); setConsultaOpen(true); }}>
              <MessageSquare /> Consultar Patmos
            </Button>
          </div>
        </section>
  
        {/* Sección del E-book gratuito reactivada */}
        <section className="border-y border-border py-8 sm:py-10" aria-label="Recurso gratuito">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4 sm:items-center">
              <img
                src={EBOOK_COVER}
                alt={EBOOK_TITLE}
                className="h-20 w-14 shrink-0 rounded-none object-cover shadow-md"
                loading="lazy"
              />
              
              <div className="min-w-0 text-left">
                <span className="text-[11px] font-semibold uppercase text-primary">
                  Recurso gratuito · E-book
                </span>
                <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-[15px]">
                  Obtén el E-book <span className="font-semibold">"{EBOOK_TITLE}"</span> al crear tu cuenta
                </p>
              </div>
            </div>
  
            <Button
              type="button"
              onClick={() => (user ? void navigate({ to: "/welcome" }) : setSignupOpen(true))}
              className="h-10 w-full shrink-0 rounded-full px-5 sm:w-auto dark:border-transparent dark:bg-white dark:text-slate-900 hover:dark:bg-slate-100"
            >
              Descargar libro <ArrowRight />
            </Button>
          </div>
        </section>


     <section className="py-12 pb-24">
      <div className="mb-7 flex items-end justify-between gap-4 border-b border-border pb-4">
        <div><h2 className="text-xl font-semibold text-foreground">Progreso de las Notas</h2><p className="mt-1 text-sm text-muted-foreground">Reina Valera 1865 · 66 libros</p></div>
      </div>
     <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {BOOK_GROUPS.flatMap((group) => group.books).map((book) => (
       <li key={book.bookid}>
         <BookCard book={book} notes={studyNotes} loading={notesLoading} />
       </li>
      ))}
     </ul>
    </section>
   </main>
    <AuthModal open={signupOpen} onOpenChange={setSignupOpen} defaultTab="signup" />
    <ConsultaPatmos key={consultaKey} open={consultaOpen} onOpenChange={(open) => {
      setConsultaOpen(open);
      if (!open && search.consulta) void navigate({ to: "/", search: {}, replace: true });
    }} userId={user?.id ?? null} book="" chapter={0} verses={[]} initialScope="bible" initialView={consultaView} onRequireAuth={() => { setConsultaOpen(false); setSignupOpen(true); }} />

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

function BookCard({ book, notes, loading }: { book: BookInfo; notes: NotesMap | undefined; loading: boolean }) {
  const { total, done, pct } = notesAvailability(notes, book);

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
    className="group flex h-full flex-col rounded-md border border-border bg-transparent p-3 transition-all hover:border-foreground/25 cursor-pointer"
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
     {loading && pct === 0 ? (
      <div className="h-full w-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
     ) : (
      <div
       className={`h-full transition-all ${pct === 100 ? "bg-emerald-500" : pct >= 1 ? "bg-orange-500" : "bg-neutral-300 dark:bg-neutral-600"}`}
       style={{ width: `${pct}%` }}
      />
     )}
    </div>
  </Link>
 );
}
