import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, MessageSquare, StickyNote } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { AuthModal } from "@/components/auth/auth-modal";
import { VerseActionBar } from "@/components/reader/verse-tools";
import { HIGHLIGHT_CLASS, chapterMarksQuery } from "@/lib/user-marks";

import { BOOKS, bookName, bookQuery, bookFromSlug, slugifyBook, type Verse } from "@/lib/bible";
import { Selector } from "@/components/reader/selector";
import { SiteHeader } from "@/components/reader/site-header";
import { StudyNoteCard } from "@/components/reader/study-note-card";
import { EtsyArtCarousel } from "@/components/EtsyArtCarousel";
import { LazyConsultaPatmos, preloadConsulta } from "@/components/reader/consulta-patmos-lazy";
import { getNote, studyNotesQuery } from "@/lib/notes";
import { getActiveLang, useI18n } from "@/i18n";
import { excerpt, plainText, seoHead } from "@/lib/seo";
import { recordReadChapter } from "@/lib/reading-progress";

function truncateWords(text: string, maxWords: number) {
 const clean = text.replace(/\s+/g, " ").trim();
 const words = clean.split(" ");
 return words.length > maxWords
  ? `${words.slice(0, maxWords).join(" ")}...`
  : clean;
}



export const Route = createFileRoute("/leer/$libro/$cap")({
 staticData: { sitemap: true },
 // SSR and hydration always render Spanish (seeded below as initialData). Client-side navigations
 // load the notes the reader will actually show, so English never waits on the Spanish sheet.
 loader: ({ context }) => context.queryClient.ensureQueryData(studyNotesQuery(getActiveLang())),
 head: ({ params, loaderData }) => {
  const book = bookFromSlug(params.libro)?.name ?? "Génesis";
  const chapter = Math.max(1, Math.floor(Number(params.cap)) || 1);
  const note = getNote(loaderData, book, chapter);
  const description = note
   ? excerpt(plainText(note), 150)
   : `Lee ${book} ${chapter} en la Reina-Valera 1865 con notas de estudio y análisis doctrinal.`;
  return seoHead({
   title: `${book} ${chapter} - Notas de Estudio y Exégesis (RV1865)`,
   description,
   canonical: `/leer/${slugifyBook(book)}/${chapter}`,
   ogType: "article",
  });
 },
 component: Reader,
});

function VerseText({
 verse,
 flashing,
 highlightClass,
 selected,
 hasNote,
 notePreview,
 onSelect,
 onOpenNote,
}: {
 verse: Verse;
 flashing?: boolean;
 highlightClass?: string;
 selected?: boolean;
 hasNote?: boolean;
 notePreview?: string;
 onSelect?: () => void;
 onOpenNote?: () => void;
}) {
 const { t } = useI18n();
 return (
   <span
    id={`verse-${verse.verse}`}
    onClick={onSelect}
    className={`-mx-3 block scroll-mt-44 cursor-pointer select-text rounded-lg px-3 py-1.5 text-[18px] sm:text-[19px] leading-relaxed text-foreground transition-colors duration-150 ${
     highlightClass || selected
      ? ""
      : "hover:bg-foreground/[0.04]"
    } ${highlightClass ?? ""} ${selected ? "ring-1 ring-inset ring-foreground/25" : ""} ${
     flashing ? "flash-target" : ""
    }`}
   >

   <sup className="mr-1 inline-block select-none text-xs font-medium text-verse-number">
    {verse.verse}
   </sup>
   {hasNote ? (
    <button
     type="button"
     aria-label={t.reader.viewMyNote(verse.verse)}
     onClick={(e) => {
      e.stopPropagation();
      onOpenNote?.();
     }}
     className="group/note relative mr-1 inline-flex translate-y-[1px] items-center align-baseline text-primary transition-opacity hover:opacity-80"
    >
     {notePreview ? (
      <span className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 max-w-[260px] truncate rounded-lg bg-foreground px-3 py-1.5 text-xs font-normal leading-snug text-background opacity-0 shadow-md shadow-black/10 transition-opacity duration-150 group-hover/note:opacity-100 dark:shadow-black/40 sm:max-w-[320px]">
       {notePreview}
      </span>
     ) : null}
     <StickyNote className="h-[13px] w-[13px]" fill="currentColor" />
    </button>
   ) : null}
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
 const params = Route.useParams();
 const libro = bookFromSlug(params.libro)?.name ?? "Génesis";
 const cap = Math.max(1, Math.floor(Number(params.cap)) || 1);
 const navigate = useNavigate({ from: Route.fullPath });
 const [history, setHistory] = useState<
  { book: string; chapter: number; verse: number; originId?: string }[]
 >([]);
 const [flashVerse, setFlashVerse] = useState<number | null>(null);
 const [flashNotes, setFlashNotes] = useState(false);
 const pendingVerse = useRef<number | null>(null);
 const pendingElId = useRef<string | null>(null);
 const hash = useRouterState({ select: (s) => s.location.hash });


 const book = BOOKS.find((b) => b.name === libro) ?? BOOKS[0]!;
 const bookId = book.bookid;
 const chapter = cap;
  const { t, lang } = useI18n();
  const bookData = useQuery({ ...bookQuery(bookId, lang), placeholderData: keepPreviousData });
  // The loader already resolved the study notes on the server; seeding the
  // client cache with that result keeps the first browser paint identical to
  // the server HTML (otherwise the notes section hydrates empty and React
  // throws a hydration mismatch that blanks the page). On the server the loader
  // loads Spanish notes and the first render is always "es", so only that query is
  // seeded; English client navigations already put their notes in the cache.
  const loaderNotes = Route.useLoaderData();
  const studyNotes = useQuery({
    ...studyNotesQuery(lang),
    ...(lang === "es" && loaderNotes ? { initialData: loaderNotes } : {}),
  });
 const chapters = bookData.data ?? [];
 const chapterCount = chapters.length || 1;
 const current = chapters.find((c) => c.chapter === chapter) ?? chapters[0];
 const verses = current?.verses ?? [];
 const loading =
  bookData.isFetching || bookData.isPlaceholderData || studyNotes.isFetching;

 const { user } = useAuth();
 const userId = user?.id ?? null;
 const marksQuery = useQuery(chapterMarksQuery(userId, book.name, chapter));
 const marks = marksQuery.data ?? { highlights: {}, notes: {}, bookmarks: {} };
 const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
 const [authOpen, setAuthOpen] = useState(false);
 const [openNoteVerse, setOpenNoteVerse] = useState<number | null>(null);
 const [consultaOpen, setConsultaOpen] = useState(false);

 useEffect(() => {
  setSelectedVerses([]);
  setOpenNoteVerse(null);
 }, [libro, cap]);

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
  try {
   window.localStorage.setItem("rv1865:last", JSON.stringify({ libro: slugifyBook(libro), cap: String(cap) }));
    recordReadChapter(slugifyBook(libro), cap);
  } catch {
   /* ignore */
  }
 }, [libro, cap]);

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

 /** Deep linking: scrolls to and flashes the element referenced by the URL hash. */
 useEffect(() => {
  if (typeof window === "undefined") return;
  const raw = (hash || window.location.hash).replace(/^#/, "");
  if (!raw) return;
  const t = window.setTimeout(() => {
   const targets =
    raw === "notas" || raw.startsWith("note")
     ? ["study-notes-desktop", "study-notes-section"]
     : [raw];
   const el = targets
    .map((id) => document.getElementById(id))
    .find((n): n is HTMLElement => !!n && n.getClientRects().length > 0);
   if (!el) return;
   el.scrollIntoView({ behavior: "smooth", block: "center" });
   const verseMatch = /^verse-(\d+)$/.exec(raw);
   if (verseMatch) {
    const n = Number(verseMatch[1]);
    setFlashVerse(n);
    window.setTimeout(() => setFlashVerse((c) => (c === n ? null : c)), 2400);
   } else {
    setFlashNotes(true);
    window.setTimeout(() => setFlashNotes(false), 2400);
   }
  }, 120);
  return () => window.clearTimeout(t);
 }, [hash, libro, cap, verses, studyNotes.data]);



 const renderNotes = () =>
  getNote(studyNotes.data, book.name, chapter) ? (
   <StudyNoteCard
    html={getNote(studyNotes.data, book.name, chapter)!}
    onRefClick={goToReference}
   />
  ) : studyNotes.isPending ? null : (
    <p className="py-4 text-sm italic text-muted-foreground/70">
     {t.reader.noNotes}
    </p>
  );
 const goTo = (nextBook: number, nextChapter: number) => {
  const target = BOOKS.find((b) => b.bookid === nextBook);
  if (!target) return;
  void navigate({ params: { libro: slugifyBook(target.name), cap: String(nextChapter) } });
  if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
 };

 const goToVerse = (bookName: string, nextChapter: number, verse: number) => {
  if (bookName === book.name && nextChapter === chapter) {
   requestAnimationFrame(() => scrollToVerse(verse));
   return;
  }
  pendingVerse.current = verse;
  void navigate({ params: { libro: slugifyBook(bookName), cap: String(nextChapter) } });
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
   void navigate({ params: { libro: slugifyBook(last.book), cap: String(last.chapter) } });
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
   <div
    aria-hidden
    className={`fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[#000f37] transition-opacity duration-200 dark:bg-white ${
     loading ? "opacity-100" : "opacity-0"
    }`}
   />
   <SiteHeader />


   <div className="sticky top-0 z-30 bg-background/95 py-2 backdrop-blur-md sm:top-[64px] sm:bg-background/70 lg:top-[68px]">
    <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 sm:flex-nowrap sm:gap-4">
     <div className="flex w-full min-w-0 items-center justify-between gap-3 sm:w-auto sm:justify-start">
      <div className="flex items-center gap-3 sm:gap-4">
       <Selector
        label={t.reader.book}
        value={bookId}
        options={BOOKS.map((b) => ({ value: b.bookid, label: bookName(b, lang) }))}
        onSelect={(v) => goTo(v, 1)}
       />
       <Selector
        label={t.reader.chapter}
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
         className="ml-2 hidden cursor-pointer whitespace-nowrap text-sm font-medium text-[#000f37] underline underline-offset-4 decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] sm:inline"
        >
         {t.reader.back}
        </button>
       ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
       <button
        type="button"
        onClick={prev}
        aria-label={t.reader.prevChapter}
        className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
       >
        <ChevronLeft className="h-[18px] w-[18px]" />
       </button>
       <button
        type="button"
        onClick={next}
        aria-label={t.reader.nextChapter}
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
       className="mt-2 inline-block cursor-pointer whitespace-nowrap text-sm font-medium text-[#000f37] underline underline-offset-4 decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] sm:hidden"
      >
       {t.reader.back}
      </button>
     ) : null}
    </nav>
   </div>

   <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-24 pt-4 sm:pt-6 lg:grid-cols-12 lg:items-start lg:gap-16">
     <article id="bible-text-section" className="scroll-mt-[8rem] lg:col-span-7">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
       <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white sm:text-4xl">
        {bookName(book, lang)} {chapter}
       </h1>
       <button
        type="button"
        onClick={() => scrollToId("study-notes-section")}
        className="cursor-pointer text-sm font-medium text-[#000f37] underline underline-offset-4 decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] lg:hidden"
       >
        {t.reader.goToNotes}
       </button>
      </div>

      <div
       className={`mt-8 transition-opacity duration-200 ${
        loading ? "pointer-events-none opacity-40" : "opacity-100"
       }`}
      >
       {bookData.isError ? (
        <p className="text-sm text-muted-foreground">
         {t.reader.loadError}
        </p>
       ) : (
        <div className="space-y-1.5 tracking-[-0.01em] text-foreground">
         {verses.map((v) => {
          const noteContent = marks.notes[v.verse]?.content;
          return (
          <VerseText
           key={v.verse}
           verse={v}
           flashing={flashVerse === v.verse}
           {...(marks.highlights[v.verse]
            ? { highlightClass: HIGHLIGHT_CLASS[marks.highlights[v.verse]!.color] }
            : {})}
           selected={selectedVerses.includes(v.verse)}
           hasNote={!!marks.notes[v.verse]}
           {...(noteContent
            ? { notePreview: truncateWords(noteContent, 12) }
            : {})}
           onSelect={() => {
            setOpenNoteVerse(null);
            setSelectedVerses((cur) =>
             cur.includes(v.verse)
              ? cur.filter((n) => n !== v.verse)
              : [...cur, v.verse].sort((a, b) => a - b),
            );
           }}
           onOpenNote={() => {
            const note = marks.notes[v.verse];
            setSelectedVerses(note?.verses?.length ? [...note.verses] : [v.verse]);
            setOpenNoteVerse(v.verse);
           }}
           />
          );
         })}
        </div>
       )}
      </div>

     </article>

    <section id="study-notes-section" className="scroll-mt-[8rem] lg:hidden">
     <div className="mt-10 w-full border-t border-[#000f37] pt-8 dark:border-[#7c7b82]" />
      <div className="mb-3">
       <h2 className="text-lg font-bold text-foreground lg:text-[20px]">
        {t.reader.notes}
       </h2>
     </div>
     <div
      className={`space-y-6 transition-opacity duration-200 ${
       loading ? "pointer-events-none opacity-40" : "opacity-100"
      } ${flashNotes ? "flash-target" : ""}`}
     >
       {notesContent}
      </div>
     </section>

     <aside className="hidden space-y-6 lg:col-span-5 lg:block lg:sticky lg:top-[8rem] lg:self-start lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto scrollbar-none">
     <div
      id="study-notes-desktop"
      className="min-h-full scroll-mt-[8rem] border-l border-[#000f37]/50 bg-transparent pt-0 pb-16 pl-6 shadow-none dark:border-[#bcbecd]/50 lg:pl-8"
     >

      <div className="mb-3">
       <h2 className="text-lg font-bold text-foreground lg:text-[20px]">
        {t.reader.notes}
       </h2>
      </div>
      <div
       className={`transition-opacity duration-200 ${
        loading ? "pointer-events-none opacity-40" : "opacity-100"
       } ${flashNotes ? "flash-target" : ""}`}
      >

        {renderNotes()}
       </div>
      </div>
      </aside>
   </main>

   <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-6">
    <EtsyArtCarousel />
   </div>

   <footer className="mt-20 border-t-0 border-border py-8 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm sm:leading-normal">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
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

   {selectedVerses.length > 0 ? (
    <VerseActionBar
     userId={userId}
     book={book.name}
     chapter={chapter}
     selection={selectedVerses.map((n) => ({
      verse: n,
      text: verses.find((v) => v.verse === n)?.text ?? "",
     }))}
     marks={marks}
     initialNoteOpen={openNoteVerse !== null}
     key={`note-${openNoteVerse ?? "none"}`}
     onClose={() => {
      setSelectedVerses([]);
      setOpenNoteVerse(null);
     }}
     onRequireAuth={() => setAuthOpen(true)}
    />
   ) : null}


   {selectedVerses.length === 0 ? (
            <button
              type="button"
              data-consulta-fab=""
              onPointerEnter={preloadConsulta}
              onFocus={preloadConsulta}
              onClick={() => setConsultaOpen((o) => !o)}
     aria-label={consultaOpen ? t.reader.closeConsulta : t.reader.openConsulta}
               className={
                 consultaOpen
                   ? "fixed bottom-6 z-[60] inline-flex items-center gap-2 rounded-full bg-fab px-4 py-2.5 text-sm font-medium text-fab-foreground shadow-xl transition-colors hover:bg-fab/90 max-sm:hidden sm:right-[29.5rem]"
                   : "fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-fab px-4 py-2.5 text-sm font-medium text-fab-foreground shadow-xl transition-colors hover:bg-fab/90"
               }
             >
               <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
               {t.reader.consulta}
            </button>
   ) : null}

   <LazyConsultaPatmos
    open={consultaOpen}
    onOpenChange={setConsultaOpen}
    userId={userId}
    book={book.name}
    chapter={chapter}
    verses={selectedVerses}
    // Right after a language switch the reader still shows the previous translation as placeholder
    // data; send no chapter text then rather than RV1865 in an English (KJV) consultation.
    chapterText={
     bookData.isPlaceholderData ? "" : verses.map((v) => `${v.verse} ${v.text}`).join("\n")
    }
    chapterNotes={plainText(getNote(studyNotes.data, book.name, chapter) ?? "")}
    onRequireAuth={() => {
     setConsultaOpen(false);
     setAuthOpen(true);
    }}
   />

   <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
  </div>
 );
}
