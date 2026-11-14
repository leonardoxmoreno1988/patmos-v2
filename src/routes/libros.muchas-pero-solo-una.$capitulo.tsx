import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Download, List } from "lucide-react";

import { ChapterBlocks, ChapterBody } from "@/components/libro/chapter-body";
import { SiteHeader } from "@/components/reader/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LibroBreadcrumb } from "@/components/libro/libro-breadcrumb";
import { getChapterBySlug, LIBRO_1865 } from "@/data/libro-1865";
import { collectVerseRanges } from "@/lib/libro-footnotes";
import { getLibroVerseTexts } from "@/lib/libro-verses";
import { PUBLIC_PAGE_HEADERS, SITE_URL, excerpt, seoHead } from "@/lib/seo";

const BOOK_PATH = `/libros/${LIBRO_1865.slug}`;
const COVER_URL = `${SITE_URL}${LIBRO_1865.coverImage}`;

// Chapter URLs are listed in the sitemap by the sitemap build (they're data-driven, not routes).
export const Route = createFileRoute("/libros/muchas-pero-solo-una/$capitulo")({
  staticData: { sitemap: false },
  // An unknown chapter is a real 404; the block below is what the visitor sees.
  beforeLoad: ({ params }) => {
    if (!getChapterBySlug(params.capitulo)) throw notFound();
  },
  notFoundComponent: ChapterNotFound,
  // Verse texts for the footnotes and in-text references, looked up on the server (in the HTML).
  loader: async ({ params }) => {
    const chapter = getChapterBySlug(params.capitulo);
    if (!chapter) throw notFound();
    const verseTexts = await getLibroVerseTexts({ data: collectVerseRanges(chapter.content) });
    return { verseTexts };
  },
  headers: () => PUBLIC_PAGE_HEADERS,
  head: ({ params }) => {
    const chapter = getChapterBySlug(params.capitulo);
    if (!chapter) return seoHead({ title: "Capítulo no encontrado", description: LIBRO_1865.synopsis, noindex: true });
    const path = `${BOOK_PATH}/${chapter.slug}`;
    return seoHead({
      title: `${chapter.title} — Muchas pero solo una | Patmos Research`,
      description: excerpt(chapter.summary, 160),
      canonical: path,
      ogImage: COVER_URL,
      ogType: "article",
      jsonLd: [
        {
          "@type": "Chapter",
          "@id": `${SITE_URL}${path}`,
          name: chapter.title,
          ...(chapter.subtitle ? { alternateName: chapter.subtitle } : {}),
          position: chapter.number,
          url: `${SITE_URL}${path}`,
          description: chapter.summary,
          inLanguage: "es",
          isPartOf: {
            "@type": "Book",
            "@id": `${SITE_URL}${BOOK_PATH}#book`,
            name: LIBRO_1865.title,
            url: `${SITE_URL}${BOOK_PATH}`,
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/dashboard` },
            { "@type": "ListItem", position: 2, name: LIBRO_1865.title, item: `${SITE_URL}${BOOK_PATH}` },
            { "@type": "ListItem", position: 3, name: chapter.title, item: `${SITE_URL}${path}` },
          ],
        },
      ],
    });
  },
  component: ChapterPage,
});

function ChapterNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-foreground">Capítulo no encontrado</h1>
        <p className="mt-3 text-muted-foreground">Este capítulo no existe en el libro.</p>
        <Link to="/libros/muchas-pero-solo-una" className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4">
          <ArrowLeft className="size-4" /> Volver al índice del libro
        </Link>
      </main>
    </div>
  );
}

function ChapterPage() {
  const { capitulo } = Route.useParams();
  const { verseTexts } = Route.useLoaderData();
  const chapter = getChapterBySlug(capitulo);

  // beforeLoad has already rejected unknown slugs.
  if (!chapter) return null;

  const index = LIBRO_1865.chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = index > 0 ? LIBRO_1865.chapters[index - 1] : undefined;
  const next = index < LIBRO_1865.chapters.length - 1 ? LIBRO_1865.chapters[index + 1] : undefined;
  const total = LIBRO_1865.chapters.length;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:max-w-3xl sm:px-6 sm:py-12">
        <LibroBreadcrumb items={[{ label: "Inicio", to: "/dashboard" }, { label: "Libros", to: "/libros" }, { label: "Muchas pero solo una", to: "/libros/muchas-pero-solo-una" }, { label: `Capítulo ${chapter.number}` }]} />

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1">
              Capítulo {chapter.number} de {total}
            </span>
            <span>{chapter.readingTimeMinutes} min de lectura</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">{chapter.title}</h1>
          {chapter.subtitle ? <p className="text-lg italic text-muted-foreground">{chapter.subtitle}</p> : null}
        </header>

        <article className="mt-10">
          {chapter.blocks ? (
            <ChapterBlocks blocks={chapter.blocks} />
          ) : (
            <ChapterBody paragraphs={chapter.content} verseTexts={verseTexts} />
          )}
        </article>

        <footer className="mt-16 border-t border-border pt-8">
          <nav aria-label="Navegación de capítulos" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prev ? (
              <Link to="/libros/muchas-pero-solo-una/$capitulo" params={{ capitulo: prev.slug }} className="flex flex-col items-start text-left rounded-lg border border-border/60 bg-card/30 hover:bg-muted/40 hover:border-border p-4 transition-colors">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><ArrowLeft className="size-3.5" aria-hidden="true" /> Capítulo anterior</span>
                <span className="mt-1 line-clamp-1 font-medium text-foreground">{prev.title}</span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            {next ? (
              <Link to="/libros/muchas-pero-solo-una/$capitulo" params={{ capitulo: next.slug }} className="flex flex-col items-end text-right rounded-lg border border-border/60 bg-card/30 hover:bg-muted/40 hover:border-border p-4 transition-colors">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">Capítulo siguiente <ArrowRight className="size-3.5" aria-hidden="true" /></span>
                <span className="mt-1 line-clamp-1 font-medium text-foreground">{next.title}</span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
          </nav>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/libros/muchas-pero-solo-una" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"><List className="size-3.5" aria-hidden="true" /> Índice del libro</Link>
            <a href={LIBRO_1865.pdfUrl} download className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"><Download className="size-3.5" aria-hidden="true" /> Descargar libro en PDF</a>
          </div>
        </footer>
      </main>

      <SiteFooter />
    </div>
  );
}
