import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronLeft, ChevronRight, MessageSquare, StickyNote } from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { AuthModal } from "@/components/auth/auth-modal";
import { VerseActionBar, formatVerseList } from "@/components/reader/verse-tools";
import { HIGHLIGHT_CLASS, chapterMarksQuery } from "@/lib/user-marks";

import { BOOKS, CHAPTER_COUNTS, TRANSLATIONS, bookName, slugifyBook, type Verse } from "@/lib/bible";
import { Selector } from "@/components/reader/selector";
import { SiteHeader } from "@/components/reader/site-header";
import { StudyNoteCard } from "@/components/reader/study-note-card";
import { EtsyArtCarousel } from "@/components/EtsyArtCarousel";
import { LazyConsultaPatmos, preloadConsulta } from "@/components/reader/consulta-patmos-lazy";
import { adjacentChapters, notesToHtml } from "@/lib/bible-notes";
import { bookIdOf, readerPath, type SlugLang } from "@/lib/bible-slugs";
import { readerChapterQuery, type ReaderChapter } from "@/lib/reader-chapter";
import { useI18n } from "@/i18n";
import { plainText } from "@/lib/seo";
import { recordReadChapter } from "@/lib/reading-progress";

function truncateWords(text: string, maxWords: number) {
 const clean = text.replace(/\s+/g, " ").trim();
 const words = clean.split(" ");
 return words.length > maxWords
  ? `${words.slice(0, maxWords).join(" ")}...`
  : clean;
}

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

/** One chapter as the loader returns it, plus the language and position the URL fixes. */
export interface ReaderPageData extends ReaderChapter {
 lang: SlugLang;
 bookId: number;
 chapter: number;
}

export function ReaderPage({ page }: { page: ReaderPageData }) {
 const { bookId, lang } = page;
 const cap = page.chapter;
 const libro = BOOKS[bookId - 1]!.name;
 const navigate = useNavigate();
 const [history, setHistory] = useState<
  { book: string; chapter: number; verse: number; originId?: string }[]
 >([]);
 const [flashVerse, setFlashVerse] = useState<number | null>(null);
 const [flashNotes, setFlashNotes] = useState(false);
 const [flashNoteId, setFlashNoteId] = useState<string | null>(null);
 const pendingVerse = useRef<number | null>(null);
 const pendingElId = useRef<string | null>(null);
 const hash = useRouterState({ select: (s) => s.location.hash });


 const book = BOOKS[bookId - 1]!;
 const chapter = cap;
  const { t } = useI18n();
  // Text and notes come from the loader (server-rendered); the router keeps the previous page on
  // screen until the next chapter's loader resolves.
  const verses = page.verses;
  const noteSections = page.notes ?? [];
 const hasNotes = noteSections.length > 0;
  const queryClient = useQueryClient();
  // Prefetch the neighbouring chapters so the prev/next arrows don't wait on the server.
  useEffect(() => {
    for (const n of adjacentChapters(bookId, chapter)) {
      const neighbour = BOOKS.find((b) => b.code === n.bookUsfm);
      if (neighbour) void queryClient.prefetchQuery(readerChapterQuery(neighbour.bookid, n.chapter, lang));
    }
  }, [queryClient, bookId, chapter, lang]);
 const chapterCount = CHAPTER_COUNTS[bookId] ?? 1;
 const loading = useRouterState({ select: (s) => s.isLoading });

 const { user } = useAuth();
 const userId = user?.id ?? null;
 const marksQuery = useQuery(chapterMarksQuery(userId, book.name, chapter));
 const marks = marksQuery.data ?? { highlights: {}, notes: {}, bookmarks: {} };
 const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
 const [authOpen, setAuthOpen] = useState(false);
 const [openNoteVerse, setOpenNoteVerse] = useState<number | null>(null);
 const [consultaOpen, setConsultaOpen] = useState(false);
  // Sign-in / sign-up modal: the tab and an optional line explaining why it opened.
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [authContext, setAuthContext] = useState<string | undefined>(undefined);
  // Ask Patmos: a question to pre-fill, and a key that remounts the panel to apply it.
  const [consultaQuestion, setConsultaQuestion] = useState("");
  const [consultaKey, setConsultaKey] = useState(0);
  // Mobile only: which column is showing. Desktop shows both regardless.
  const [mobileTab, setMobileTab] = useState<"text" | "notes">("text");
  const tabBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMobileTab("text");
  }, [bookId, chapter]);
  const selectMobileTab = (tab: "text" | "notes") => {
    if (tab === "notes") setSelectedVerses([]);
    setMobileTab(tab);
    const bar = tabBarRef.current;
    if (bar) {
      const top = bar.getBoundingClientRect().top;
      if (top < 0) window.scrollTo({ top: window.scrollY + top - 8, behavior: "smooth" });
    }
  };
  // Bottom fade on the notes column: shown only while there is more text below.
  const notesScrollRef = useRef<HTMLElement>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const updateCanScrollDown = () => {
    const el = notesScrollRef.current;
    if (el) setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 12);
  };
  useEffect(() => {
    const frame = requestAnimationFrame(updateCanScrollDown);
    const el = notesScrollRef.current;
    const observer = el && typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateCanScrollDown) : null;
    if (el && observer) observer.observe(el);
    window.addEventListener("resize", updateCanScrollDown);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", updateCanScrollDown);
    };
  }, [bookId, chapter, page.notes, userId]);
  const openAuth = (tab: "signin" | "signup", context?: string) => {
    setAuthTab(tab);
    setAuthContext(context);
    setAuthOpen(true);
  };
  // Signed-out readers are asked to create an account first; signed-in readers get the panel.
  const askPatmos = (question: string) => {
    if (!userId) {
      openAuth("signup", t.funnel.askContext);
      return;
    }
    setConsultaQuestion(question);
    setConsultaKey((k) => k + 1);
    setConsultaOpen(true);
  };

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
 }, [libro, cap, page.notes, verses]);

 /** Deep linking: scrolls to and flashes the element referenced by the URL hash. */
 useEffect(() => {
  if (typeof window === "undefined") return;
  const raw = (hash || window.location.hash).replace(/^#/, "");
  if (!raw) return;
  const t = window.setTimeout(() => {
   // "#notas" and the older notes anchors all point at the single notes section.
   const isNotes = raw === "notas" || raw.startsWith("note") || raw.startsWith("study-notes");
   const el = document.getElementById(isNotes ? "study-notes" : raw);
   if (!el) return;
   // Sections and the notes block are taller than the screen, so they align to the top instead.
   const isNoteSection = raw.startsWith("nota-");
   el.scrollIntoView({ behavior: "smooth", block: isNotes || isNoteSection ? "start" : "center" });
   const verseMatch = /^verse-(\d+)$/.exec(raw);
   if (verseMatch) {
    const n = Number(verseMatch[1]);
    setFlashVerse(n);
    window.setTimeout(() => setFlashVerse((c) => (c === n ? null : c)), 2400);
   } else if (isNoteSection) {
    setFlashNoteId(raw);
    window.setTimeout(() => setFlashNoteId((c) => (c === raw ? null : c)), 2400);
   } else {
    setFlashNotes(true);
    window.setTimeout(() => setFlashNotes(false), 2400);
   }
  }, 120);
  return () => window.clearTimeout(t);
 }, [hash, libro, cap, verses, page.notes]);

 // Notes render only when the chapter has some; a failed fetch shows a message instead.
 const renderNotes = () =>
 hasNotes ? (
  <StudyNoteCard
   notes={noteSections}
   flashedId={flashNoteId}
   onRefClick={goToReference}
   onVerseClick={scrollToVerse}
  />
 ) : (
  <p className="text-sm text-muted-foreground">{t.reader.noNotes}</p>
 );
 const goTo = (nextBook: number, nextChapter: number) => {
  const target = BOOKS.find((b) => b.bookid === nextBook);
  if (!target) return;
  void navigate({ href: readerPath(lang, target.bookid, nextChapter) });
  if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
 };

 const goToVerse = (bookName: string, nextChapter: number, verse: number) => {
  if (bookName === book.name && nextChapter === chapter) {
   window.setTimeout(() => scrollToVerse(verse), 0);
   return;
  }
  const targetId = bookIdOf(bookName);
  if (targetId === null) return;
  pendingVerse.current = verse;
  void navigate({ href: readerPath(lang, targetId, nextChapter) });
 };

 const goToReference = (ref: {
  book: string;
  chapter: number;
  verse: number;
  originId?: string;
 }) => {
  if (!BOOKS.some((b) => b.name === ref.book)) return;
  setMobileTab("text");
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
   const lastId = bookIdOf(last.book);
   if (lastId !== null) void navigate({ href: readerPath(lang, lastId, last.chapter) });
   return;
  }
  goToVerse(last.book, last.chapter, last.verse);
 };

 const lastOrigin = history[history.length - 1];
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
        options={BOOKS.map((b) => ({
         value: b.bookid,
         label: bookName(b, lang),
         aliases: b.name === "Revelación" ? ["Apocalipsis", "Apocalypse"] : undefined,
        }))}
        onSelect={(v) => goTo(v, 1)}
        searchable
        searchPlaceholder={t.reader.searchBook}
        emptyMessage={t.reader.noBooksFound}
        clearLabel={t.reader.clearSearch}
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

   <main className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-6 pb-24 pt-4 sm:pt-6 lg:grid-cols-12 lg:items-start lg:gap-16">
     <article id="bible-text-section" className="scroll-mt-[8rem] lg:col-span-7">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
       <div className="flex min-w-0 flex-1 items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white sm:text-4xl">
         {bookName(book, lang)} {chapter}
        </h1>
        <span
         className="text-xs uppercase tracking-widest text-muted-foreground/80 select-none sm:text-sm"
         style={{ fontFamily: "Georgia, Charter, 'Times New Roman', serif" }}
        >
         {TRANSLATIONS[lang]}
        </span>
       </div>
      </div>

      <div
       ref={tabBarRef}
       className="sticky top-0 z-20 -mx-4 mb-5 flex gap-6 border-b border-black/10 bg-background/95 px-4 backdrop-blur-sm dark:border-white/10 lg:hidden"
      >
       {(["text", "notes"] as const).map((tab) => (
        <button
         key={tab}
         type="button"
         onClick={() => selectMobileTab(tab)}
         className={`-mb-px border-b-2 py-3 text-sm transition-colors ${
          mobileTab === tab ? "border-foreground font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
         }`}
        >
         {tab === "text" ? t.reader.tabText : t.reader.tabNotes}
        </button>
       ))}
      </div>

      <div
       className={`mt-8 transition-opacity duration-200 ${
        loading ? "pointer-events-none opacity-40" : "opacity-100"
       } ${mobileTab === "notes" ? "hidden lg:block" : ""}`}
      >
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
      </div>

     </article>

    {/* One notes section for every breakpoint: stacked under the text on mobile, a sticky column beside it on lg+. */}
    {page.notes === null ? (
     <p className="text-sm text-muted-foreground lg:col-span-5">{t.reader.loadError}</p>
    ) : (
     <div className={`relative lg:col-span-5 lg:sticky lg:top-[8rem] lg:h-[calc(100vh-8rem)] ${mobileTab === "notes" ? "block" : "hidden lg:block"}`}>
     <section
      id="study-notes"
      ref={notesScrollRef}
      onScroll={updateCanScrollDown}
      aria-labelledby="study-notes-heading"
      className="scroll-mt-[8rem] pt-0 lg:h-full lg:overflow-y-auto lg:border-l lg:border-t-0 lg:border-[#000f37]/50 lg:pb-24 lg:pl-8 lg:pt-0 lg:dark:border-[#bcbecd]/50 scrollbar-none"
     >
       <div className="mb-3">
        <h2 id="study-notes-heading" className="hidden text-lg font-bold text-foreground lg:block lg:text-[20px]">
         {t.reader.tabNotes}
        </h2>
        {hasNotes ? <p className="mt-1 mb-6 text-xs tracking-wide text-muted-foreground">{t.funnel.notesSubtitle}</p> : null}
       </div>
       <div
        className={`space-y-6 transition-opacity duration-200 ${
         loading ? "pointer-events-none opacity-40" : "opacity-100"
        } ${flashNotes ? "flash-target" : ""}`}
       >
        {renderNotes()}
       </div>
       {hasNotes ? (
        <div className="mt-10">
         <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{t.funnel.explore}</p>
         <div className="mt-3 flex flex-col items-start gap-2">
          {t.funnel.pills(bookName(book, lang), chapter).map((question) => (
           <button
            key={question}
            type="button"
            onClick={() => askPatmos(question)}
            className="rounded-full border border-black/15 bg-black/[0.02] px-3.5 py-1.5 text-left text-xs text-foreground/90 transition-colors hover:bg-black/[0.06] dark:border-white/15 dark:bg-white/[0.03] dark:hover:bg-white/[0.08]"
           >
            {question}
           </button>
          ))}
         </div>
        </div>
       ) : null}
       {hasNotes && !userId ? (
        <div className="mt-8 rounded-xl border border-black/15 bg-black/[0.02] p-5 sm:p-6 dark:border-white/15 dark:bg-white/[0.02]">
         <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "Georgia, Charter, 'Times New Roman', serif" }}>
          {t.funnel.conversionTitle}
         </h3>
         <ul className="mt-4 space-y-2 text-sm text-foreground/85">
          {t.funnel.conversionPoints.map((point) => (
           <li key={point} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{point}</span>
           </li>
          ))}
         </ul>
         <button
          type="button"
          onClick={() => openAuth("signup")}
          className="mt-5 w-full rounded-lg bg-foreground px-4 py-2.5 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:w-auto"
         >
          {t.funnel.conversionCta}
         </button>
        </div>
       ) : null}
     </section>
     <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-20 bg-linear-to-t from-background via-background/85 to-transparent transition-opacity duration-200 lg:block ${canScrollDown ? "opacity-100" : "opacity-0"}`}
     />
     </div>
    )}
   </main>

   <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-6">
    <EtsyArtCarousel />
   </div>

   <footer className="mt-20 border-t-0 border-border py-8 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm sm:leading-normal">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
     © Patmos 2026 ·{" "}{t.footer.rights}
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
     onRequireAuth={() => openAuth("signin")}
     onAsk={() =>
      askPatmos(t.funnel.verseQuestion(bookName(book, lang), chapter + ":" + formatVerseList(selectedVerses)))
     }
    />
   ) : null}


   {selectedVerses.length === 0 ? (
            <button
              type="button"
              data-consulta-fab=""
              onPointerEnter={preloadConsulta}
              onFocus={preloadConsulta}
              onClick={() => {
                setConsultaQuestion("");
                setConsultaOpen((o) => !o);
              }}
     aria-label={consultaOpen ? t.reader.closeConsulta : t.reader.openConsulta}
               className={
                 consultaOpen
                   ? "fixed bottom-6 z-[60] inline-flex items-center gap-2 rounded-lg bg-fab px-4 py-2.5 text-sm font-medium text-fab-foreground shadow-xl transition-colors hover:bg-fab/90 max-sm:hidden sm:right-[29.5rem]"
                   : "fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-lg bg-fab px-4 py-2.5 text-sm font-medium text-fab-foreground shadow-xl transition-colors hover:bg-fab/90"
               }
             >
               <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
               {t.reader.consulta}
            </button>
   ) : null}

   <LazyConsultaPatmos
    key={consultaKey}
    initialQuestion={consultaQuestion}
    open={consultaOpen}
    onOpenChange={setConsultaOpen}
    userId={userId}
    book={book.name}
    chapter={chapter}
    verses={selectedVerses}
    chapterText={verses.map((v) => `${v.verse} ${v.text}`).join("\n")}
    chapterNotes={plainText(notesToHtml(noteSections))}
    onRequireAuth={() => {
     setConsultaOpen(false);
     openAuth("signin");
    }}
   />

   <AuthModal open={authOpen} onOpenChange={setAuthOpen} defaultTab={authTab} subtitle={authContext} />
  </div>
 );
}
