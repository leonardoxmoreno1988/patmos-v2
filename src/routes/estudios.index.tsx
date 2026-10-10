import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import estudios from "virtual:estudios";

import { SiteHeader } from "@/components/reader/site-header";
import { PatmosCta } from "@/components/estudios/patmos-cta";
import { Input } from "@/components/ui/input";
import { formatEstudioDate, normalizeSearch, type EstudioSummary } from "@/lib/estudios";
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

// Title, description and author are searchable right away; the full text (a separate chunk) loads
// the first time the reader focuses or types in the search box.
const metaText = new Map(
  estudios.map((post) => [
    post.slug,
    normalizeSearch(`${post.title} ${post.description} ${post.author}`),
  ]),
);
const loadContentIndex = () => import("virtual:estudios-search").then((m) => m.default);

function EstudiosIndex() {
  const [query, setQuery] = useState("");
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
    if (terms.length === 0) return estudios;
    return estudios.filter((post) => {
      const haystack = `${metaText.get(post.slug) ?? ""} ${contentIndex?.[post.slug] ?? ""}`;
      return terms.every((term) => haystack.includes(term));
    });
  }, [deferredQuery, contentIndex]);

  const searching = deferredQuery.trim().length > 0;

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
                onClick={() => setQuery("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>
          <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
            {searching
              ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"}${contentIndex ? "" : " (buscando en el contenido…)"}`
              : `${estudios.length} estudios`}
          </p>
        </section>

        <PatmosCta
          title="Profundiza con Patmos"
          description="Lee la Reina-Valera 1865 con notas de estudio capítulo por capítulo, y haz tus preguntas exegéticas y proféticas al asistente de IA."
          showAssistant
        />

        {results.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post) => (
              <li key={post.slug}>
                <EstudioCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-16 text-center text-muted-foreground">
            No encontramos estudios para “{deferredQuery.trim()}”.
          </p>
        )}
      </main>
    </div>
  );
}

function EstudioCard({ post }: { post: EstudioSummary }) {
  return (
    <Link
      to="/estudios/$slug"
      params={{ slug: post.slug }}
      className="group flex h-full flex-col rounded-lg border border-border p-5 transition-colors hover:border-foreground/25"
    >
      <h2 className="text-lg font-semibold leading-snug text-foreground group-hover:underline group-hover:underline-offset-4">
        {post.title}
      </h2>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>
      <div className="mt-4 space-y-0.5 text-xs text-muted-foreground">
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
      </div>
    </Link>
  );
}
