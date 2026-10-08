import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyConsultaPatmos, preloadConsulta } from "@/components/reader/consulta-patmos-lazy";
import { useQuery } from "@tanstack/react-query";
import { notesCoverage, studyNotesQuery, type NotesCoverage } from "@/lib/notes";
import metaEs from "@/data/meta_es.json";
import metaEn from "@/data/meta_en.json";
import { isDemoUser, useAuth } from "@/components/auth/auth-provider";
import { AuthModal } from "@/components/auth/auth-modal";
import { EBOOK_COVER, EBOOK_TITLE } from "@/lib/ebook";

import { BOOKS, BOOK_GROUPS, CHAPTER_COUNTS, bookFromSlug, bookName, slugifyBook, type BookInfo } from "@/lib/bible";
import { SiteHeader } from "@/components/reader/site-header";
import { ORGANIZATION, SITE_NAME, SITE_URL, seoHead } from "@/lib/seo";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/")({
 staticData: { sitemap: true },
 head: () =>
  seoHead({
   title: "PATMOS — Exégesis y Biblia Reina Valera 1865",
   description:
     "Plataforma de investigación teológica, análisis profético y preservación del texto bíblico Reina Valera 1865.",
   canonical: "/",
   jsonLd: [
    {
     "@type": "WebSite",
     "@id": `${SITE_URL}/#website`,
     name: SITE_NAME,
     url: `${SITE_URL}/`,
     inLanguage: "es",
     publisher: { "@id": `${SITE_URL}/#organization` },
     potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/buscar?q={search_term_string}` },
      "query-input": "required name=search_term_string",
     },
    },
    ORGANIZATION,
   ],
  }),
 component: Home,
});

/** Free e-book banner on the home page; temporarily hidden. */
const SHOW_EBOOK_BANNER = false;

/**
 * Bundled snapshot of which chapters have notes (scripts/build-notes-meta.mjs). It renders the grid
 * in the server HTML and on first paint, before the full notes have downloaded.
 */
const NOTES_META: Record<"es" | "en", NotesCoverage> = {
 es: metaEs.chapters,
 en: metaEn.chapters,
};

/** Chapters with at least one study note in a book (global editorial coverage). */
function bookProgress(coverage: NotesCoverage, book: BookInfo) {
 const total = CHAPTER_COUNTS[book.bookid] ?? 0;
 const done = coverage[book.bookid]?.length ?? 0;
 return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

function Home() {
 const { user } = useAuth();
 const { t, lang } = useI18n();
 const navigate = useNavigate();
  const search = useSearch({ from: "/" }) as { consulta?: string };
 const [signupOpen, setSignupOpen] = useState(false);
  const [consultaOpen, setConsultaOpen] = useState(false);
  const [consultaView, setConsultaView] = useState<"chat" | "history">("chat");
  const [consultaKey, setConsultaKey] = useState(0);
  // Full notes load in the background after mount (they also warm the reader's cache); once they
  // arrive they replace the snapshot, so edits made to the sheet since the snapshot still show up.
  // The download (~1.7 MB CSV) waits until the browser is idle so it doesn't compete with hydration.
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(id);
  }, []);
  const { data: liveNotes } = useQuery({ ...studyNotesQuery(lang), enabled: idle });
  const coverage = useMemo(
    () => (liveNotes ? notesCoverage(liveNotes) : NOTES_META[lang]),
    [liveNotes, lang],
  );

 const [last, setLast] = useState<{ libro: string; cap: string }>({
  libro: "genesis",
  cap: "1",
 });

 useEffect(() => {
   try {
   const raw = window.localStorage.getItem("rv1865:last");
   if (!raw) return;
   const parsed = JSON.parse(raw) as { libro?: string; cap?: string | number };
   // Older entries stored the display name ("Éxodo"); bookFromSlug accepts names and slugs.
   const book = parsed?.libro ? bookFromSlug(parsed.libro) : undefined;
   const cap = Math.floor(Number(parsed?.cap));
   if (book && cap >= 1) setLast({ libro: slugifyBook(book.name), cap: String(cap) });
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

  const lastBook = bookName(bookFromSlug(last.libro) ?? BOOKS[0]!, lang);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
  
      <main className="mx-auto max-w-6xl px-6">
        <section className="py-14 text-center md:py-20">
          <h1 className="sr-only">{t.home.srTitle}</h1>
          
          {/* Título visible únicamente en desktop */}
          <p aria-hidden="true" className="hidden md:block font-bold tracking-tight text-foreground mb-6 text-4xl md:text-5xl lg:text-6xl">
            {t.home.heroTitle}
          </p>
  
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.home.heroDescription}
          </p>
  
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-11 rounded-full px-6 dark:border-transparent dark:bg-white dark:text-slate-900 hover:dark:bg-slate-100">
              <Link to="/leer/$libro/$cap" params={{ libro: last.libro, cap: last.cap }}>
                <BookOpen /> {t.home.continueReading} ({lastBook} {last.cap})
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-11 rounded-full px-6" onPointerEnter={preloadConsulta} onFocus={preloadConsulta} onClick={() => { setConsultaView("chat"); setConsultaKey((k) => k + 1); setConsultaOpen(true); }}>
              <MessageSquare /> {t.home.askPatmos}
            </Button>
          </div>
        </section>
  
        {/* Banner del E-book gratuito — oculto temporalmente; poner SHOW_EBOOK_BANNER en true para reactivarlo */}
        {SHOW_EBOOK_BANNER && !isDemoUser(user) && (
          <section className="border-y border-border py-8 sm:py-10" aria-label={t.home.ebookRegion}>
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
                    {t.home.ebookEyebrow}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-[15px]">
                    {t.home.ebookPitchBefore} <span className="font-semibold">"{EBOOK_TITLE}"</span> {t.home.ebookPitchAfter}
                  </p>
                </div>
              </div>
  
              <Button
                type="button"
                onClick={() => (user ? void navigate({ to: "/welcome" }) : setSignupOpen(true))}
                className="h-10 w-full shrink-0 rounded-full px-5 sm:w-auto dark:border-transparent dark:bg-white dark:text-slate-900 hover:dark:bg-slate-100"
              >
                {t.home.downloadBook} <ArrowRight />
              </Button>
            </div>
          </section>
        )}


     <section className="py-12 pb-24">
      <div className="mb-7 flex items-end justify-between gap-4 border-b border-border pb-4">
        <div><h2 className="text-xl font-semibold text-foreground">{t.home.notesProgress}</h2><p className="mt-1 text-sm text-muted-foreground">{t.home.notesProgressSubtitle}</p></div>
      </div>
     <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {BOOK_GROUPS.flatMap((group) => group.books).map((book) => (
       <li key={book.bookid}>
         <BookCard book={book} coverage={coverage} />
       </li>
      ))}
     </ul>
    </section>
   </main>
    <AuthModal open={signupOpen} onOpenChange={setSignupOpen} defaultTab="signup" />
    <LazyConsultaPatmos key={consultaKey} open={consultaOpen} onOpenChange={(open) => {
      setConsultaOpen(open);
      if (!open && search.consulta) void navigate({ to: "/", search: {}, replace: true });
    }} userId={user?.id ?? null} book="" chapter={0} verses={[]} initialScope="bible" initialView={consultaView} onRequireAuth={() => { setConsultaOpen(false); setSignupOpen(true); }} />

   <footer className="border-border py-8 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
    <div className="mx-auto max-w-6xl px-6">
     © 2026 {t.footer.notesBy}{" "}
     <a
      href="https://www.ritualypropaganda.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-foreground underline underline-offset-2 transition-opacity hover:opacity-80"
     >
      Leonardo Moreno
     </a>
     . {t.footer.rights}
    </div>
   </footer>
  </div>
 );
}

function BookCard({ book, coverage }: { book: BookInfo; coverage: NotesCoverage }) {
  const { t, lang } = useI18n();
  const { total, done, pct } = bookProgress(coverage, book);

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
      {bookName(book, lang)}
     </span>
     {badge}
    </div>
    <span className="text-[11px] text-muted-foreground">
     {t.home.chaptersDone(done, total)}
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
