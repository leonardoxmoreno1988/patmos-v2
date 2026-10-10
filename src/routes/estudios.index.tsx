import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, X } from "lucide-react";
import estudios from "virtual:estudios";

import { SiteHeader } from "@/components/reader/site-header";
import { PatmosCta } from "@/components/estudios/patmos-cta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HOUSE_AUTHOR,
  formatEstudioDate,
  formatEstudioDateShort,
  normalizeSearch,
  type EstudioSummary,
} from "@/lib/estudios";
import { ORGANIZATION, PUBLIC_PAGE_HEADERS, SITE_URL, seoHead } from "@/lib/seo";

const TITLE = "Estudios bíblicos — Profecía y Escatología";
const DESCRIPTION =
  "Estudios de Leonardo Moreno y autores invitados sobre profecía bíblica, escatología, apologética y la cultura actual a la luz de las Escrituras.";

export const Route = createFileRoute("/estudios/")({
  staticData: { sitemap: true },
  headers: () => PUBLIC_PAGE_HEADERS,
  head: () =>
    seoHead({
      title: TITLE,
      description: DESCRIPTION,
      canonical: "/estudios",
      jsonLd: [
        {
          "@type": "CollectionPage",
          name: TITLE,
          description: DESCRIPTION,
          url: `${SITE_URL}/estudios`,
          inLanguage: "es",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          publisher: ORGANIZATION,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Estudios", item: `${SITE_URL}/estudios` },
          ],
        },
      ],
    }),
  component: EstudiosIndex,
});

const PAGE_SIZE = 12;

// Title, description, author and tags are searchable right away; the full text (a separate chunk)
// loads the first time the reader focuses or types in the search box.
const metaText = new Map(
  estudios.map((post) => [
    post.slug,
    normalizeSearch(`${post.title} ${post.description} ${post.author} ${post.tags.join(" ")}`),
  ]),
);
const loadContentIndex = () => import("virtual:estudios-search").then((m) => m.default);

/** Every tag used by a post, most used first. */
const TAGS = (() => {
  const counts = new Map<string, number>();
  for (const post of estudios)
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts.entries()]
    .sort(([a, x], [b, y]) => y - x || a.localeCompare(b, "es"))
    .map(([tag]) => tag);
})();

/** Blogger image URLs carry their size in the path ("/s1600/"); ask for one fit for a wide card. */
const featuredImage = (url: string) => url.replace(/\/s\d+(-c)?\//, "/s1200/");

function EstudiosIndex() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [contentIndex, setContentIndex] = useState<Record<string, string> | null>(null);
  const [wantsContent, setWantsContent] = useState(false);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    if (!wantsContent || contentIndex) return;
    let cancelled = false;
    void loadContentIndex().then((index) => {
      if (!cancelled) setContentIndex(index);
    });
    return () => {
      cancelled = true;
    };
  }, [wantsContent, contentIndex]);

  const results = useMemo(() => {
    const terms = normalizeSearch(deferredQuery).split(/\s+/).filter(Boolean);
    return estudios.filter((post) => {
      if (tag && !post.tags.includes(tag)) return false;
      if (terms.length === 0) return true;
      const haystack = `${metaText.get(post.slug) ?? ""} ${contentIndex?.[post.slug] ?? ""}`;
      return terms.every((term) => haystack.includes(term));
    });
  }, [deferredQuery, tag, contentIndex]);

  const searching = deferredQuery.trim().length > 0;
  const filtered = searching || tag !== null;
  // The latest post is featured on the unfiltered page; filtered views list every match in the grid.
  const featured = filtered ? undefined : results[0];
  const grid = featured ? results.slice(1) : results;
  const visible = grid.slice(0, limit);

  const selectTag = (next: string | null) => {
    setTag(next);
    setLimit(PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <section className="py-10 sm:py-14">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Estudios
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {DESCRIPTION}
          </p>

          <div className="relative mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE_SIZE);
                setWantsContent(true);
              }}
              onFocus={() => setWantsContent(true)}
              placeholder="Buscar por título, tema o contenido…"
              aria-label="Buscar estudios"
              className="h-11 rounded-full pl-9 pr-10 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setLimit(PAGE_SIZE);
                }}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>

          {TAGS.length > 0 ? (
            <div
              role="group"
              aria-label="Filtrar por categoría"
              className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0"
            >
              {[null, ...TAGS].map((value) => (
                <TagChip
                  key={value ?? "*"}
                  label={value ?? "Todos"}
                  active={tag === value}
                  onClick={() => selectTag(value)}
                />
              ))}
            </div>
          ) : null}

          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
            {filtered
              ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"}${searching && !contentIndex ? " (buscando en el contenido…)" : ""}`
              : `${estudios.length} estudios`}
          </p>
        </section>

        {featured ? <FeaturedEstudio post={featured} /> : null}

        <div className={featured ? "mt-10" : undefined}>
          <PatmosCta
            title="Profundiza con Patmos"
            description="Lee la Reina-Valera 1865 con notas de estudio capítulo por capítulo, y haz tus preguntas exegéticas y proféticas al asistente de IA."
            showAssistant
          />
        </div>

        {visible.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <li key={post.slug}>
                <EstudioCard post={post} />
              </li>
            ))}
          </ul>
        ) : results.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            {searching
              ? `No encontramos estudios para “${deferredQuery.trim()}”${tag ? ` en ${tag}` : ""}.`
              : "No hay estudios en esta categoría."}
          </p>
        ) : null}

        {grid.length > visible.length ? (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-full px-6"
              onClick={() => setLimit((n) => n + PAGE_SIZE)}
            >
              Cargar más estudios
              <span className="text-muted-foreground">({grid.length - visible.length})</span>
            </Button>
          </div>
        ) : null}
      </main>
    </div>
  );
}

function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

/** Full metadata block of the featured card: author, date, reading time and last update. */
function EstudioMeta({ post }: { post: EstudioSummary }) {
  return (
    <>
      <p className="font-medium text-foreground/80">{post.author}</p>
      <p>
        <time dateTime={post.date}>{formatEstudioDate(post.date)}</time>
        {" · "}
        {post.readingMinutes} min de lectura
      </p>
      {post.updated ? (
        <p>
          Actualizado el <time dateTime={post.updated}>{formatEstudioDate(post.updated)}</time>
        </p>
      ) : null}
    </>
  );
}

function FeaturedEstudio({ post }: { post: EstudioSummary }) {
  return (
    <Link
      to="/estudios/$slug"
      params={{ slug: post.slug }}
      className="group grid overflow-hidden rounded-xl border border-border transition-colors hover:border-foreground/25 md:grid-cols-2"
    >
      {post.image ? (
        <img
          src={featuredImage(post.image)}
          alt=""
          className="aspect-[16/9] h-full w-full object-cover md:aspect-auto md:max-h-[380px]"
        />
      ) : null}
      <div
        className={`flex flex-col justify-center p-6 sm:p-8 ${post.image ? "" : "md:col-span-2"}`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Último estudio{post.tags[0] ? ` · ${post.tags[0]}` : ""}
        </p>
        <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-foreground group-hover:underline group-hover:underline-offset-4 sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{post.description}</p>
        <div className="mt-5 space-y-0.5 text-sm text-muted-foreground">
          <EstudioMeta post={post} />
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          Leer estudio{" "}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function EstudioCard({ post }: { post: EstudioSummary }) {
  return (
    <Link
      to="/estudios/$slug"
      params={{ slug: post.slug }}
      className="group flex h-full flex-col rounded-lg border border-border p-5 transition-colors hover:border-foreground/25"
    >
      {post.tags.length > 0 ? (
        <p className="mb-2 text-xs font-medium text-muted-foreground">{post.tags.join(" · ")}</p>
      ) : null}
      <h2 className="text-lg font-semibold leading-snug text-foreground group-hover:underline group-hover:underline-offset-4">
        {post.title}
      </h2>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>
      <p className="mt-auto pt-4 text-xs text-muted-foreground">
        {post.author !== HOUSE_AUTHOR ? (
          <>
            <span className="font-medium text-foreground/80">{post.author}</span>
            {" · "}
          </>
        ) : null}
        <time dateTime={post.date}>{formatEstudioDateShort(post.date)}</time>
        {" · "}
        {post.readingMinutes} min de lectura
      </p>
    </Link>
  );
}
