import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, Quote } from "lucide-react";

import { SiteHeader } from "@/components/reader/site-header";
import { LibroBreadcrumb } from "@/components/libro/libro-breadcrumb";
import { Button } from "@/components/ui/button";
import { LIBRO_1865, type Chapter } from "@/data/libro-1865";
import { ORGANIZATION, PUBLIC_PAGE_HEADERS, SITE_URL, excerpt, seoHead } from "@/lib/seo";

const BOOK_PATH = `/libros/${LIBRO_1865.slug}`;
const COVER_URL = `${SITE_URL}${LIBRO_1865.coverImage}`;
const TITLE = `${LIBRO_1865.title} — Enrique Ginocchio | Patmos Research`;
const DESCRIPTION = excerpt(LIBRO_1865.synopsis, 160);

export const Route = createFileRoute("/libros/muchas-pero-solo-una/")({
  staticData: { sitemap: true },
  headers: () => PUBLIC_PAGE_HEADERS,
  head: () =>
    seoHead({
      title: TITLE,
      description: DESCRIPTION,
      canonical: BOOK_PATH,
      ogImage: COVER_URL,
      jsonLd: [
        {
          "@type": "Book",
          "@id": `${SITE_URL}${BOOK_PATH}#book`,
          name: LIBRO_1865.title,
          alternateName: LIBRO_1865.subtitle,
          url: `${SITE_URL}${BOOK_PATH}`,
          image: COVER_URL,
          description: LIBRO_1865.synopsis,
          inLanguage: "es",
          datePublished: String(LIBRO_1865.year),
          numberOfPages: LIBRO_1865.pageCount,
          author: {
            "@type": "Person",
            name: LIBRO_1865.author.name,
            jobTitle: LIBRO_1865.author.role,
            worksFor: { "@type": "Organization", name: LIBRO_1865.author.church },
            address: LIBRO_1865.author.city,
          },
          publisher: ORGANIZATION,
          hasPart: LIBRO_1865.chapters.map((c) => ({
            "@type": "Chapter",
            name: c.title,
            position: c.number,
            url: `${SITE_URL}${BOOK_PATH}/${c.slug}`,
          })),
        },
      ],
    }),
  component: BookHub,
});

function BookHub() {
  const { chapters } = LIBRO_1865;
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <LibroBreadcrumb items={[{ label: "Inicio", to: "/dashboard" }, { label: "Libros", to: "/libros" }, { label: "Muchas pero solo una" }]} />

        <section className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start md:gap-12">
          <div className="space-y-6">
            <img
              src={LIBRO_1865.coverImage}
              alt={`Portada de ${LIBRO_1865.title}`}
              className="w-full rounded-[8px] overflow-hidden border border-border object-cover shadow-2xl"
            />
            <p className="text-sm text-muted-foreground">
              {LIBRO_1865.year} · Lima, Perú · {LIBRO_1865.pageCount} páginas
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="h-11 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
                <a href={LIBRO_1865.pdfUrl} download>
                  <Download className="size-4" /> Descargar PDF completo
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-full">
                <Link to="/libros/muchas-pero-solo-una/$capitulo" params={{ capitulo: chapters[0]!.slug }}>
                  Empezar a leer online <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Defensa Textual
            </span>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {LIBRO_1865.title}
            </h1>
            <p className="text-lg text-muted-foreground">{LIBRO_1865.subtitle}</p>
            <p className="text-sm text-muted-foreground">
              Por <span className="font-medium text-foreground/80">{LIBRO_1865.author.name}</span>, {LIBRO_1865.author.role}
              {" · "}
              {LIBRO_1865.author.church}, {LIBRO_1865.author.city}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mt-4">{LIBRO_1865.synopsis}</p>
          </div>
        </section>

        <section className="mt-16 sm:mt-20">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Índice</h2>
          <ol className="mt-6 divide-y divide-border">
            {chapters.map((c) => (
              <ChapterItem key={c.slug} chapter={c} />
            ))}
          </ol>
        </section>

        <section className="mt-16 sm:mt-20">
          <div className="flex gap-4 rounded-xl border border-border p-6 sm:p-8">
            <Quote className="mt-1 size-6 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Sobre el autor</p>
              <h2 className="text-xl font-bold text-foreground">{LIBRO_1865.author.name}</h2>
              <p className="text-sm text-muted-foreground">
                {LIBRO_1865.author.role} · {LIBRO_1865.author.church}, {LIBRO_1865.author.city}
              </p>
              <p className="leading-relaxed text-foreground/85">{LIBRO_1865.author.bio}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ChapterItem({ chapter }: { chapter: Chapter }) {
  return (
    <li>
      <Link
        to="/libros/muchas-pero-solo-una/$capitulo"
        params={{ capitulo: chapter.slug }}
        className="group flex gap-5 py-6 transition-colors hover:text-foreground"
      >
        <span className="w-10 shrink-0 pt-1 text-2xl font-bold tabular-nums text-muted-foreground/60">
          {String(chapter.number).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <h3 className="text-lg font-semibold leading-snug text-foreground/90 group-hover:text-foreground">
            {chapter.title}
          </h3>
          {chapter.subtitle ? <p className="text-sm italic text-muted-foreground">{chapter.subtitle}</p> : null}
          <p className="text-sm leading-relaxed text-muted-foreground">{chapter.summary}</p>
          <p className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
            {chapter.readingTimeMinutes} min de lectura
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </p>
        </div>
      </Link>
    </li>
  );
}
