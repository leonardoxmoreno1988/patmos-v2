import { createFileRoute, Link } from "@tanstack/react-router";

import { BOOK_GROUPS, slugifyBook } from "@/lib/bible";
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

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6">
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
              params={{ libro: "genesis", cap: "1" }}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#000f37] px-7 font-sans text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#000f37]"
            >
              Comenzar a leer
            </Link>
            <Link
              to="/leer/$libro/$cap"
              params={{ libro: "revelacion", cap: "1" }}
              className="font-sans text-sm font-medium text-[#000f37] underline underline-offset-4 decoration-[#000f37] dark:text-white dark:decoration-white"
            >
              Explorar Revelación
            </Link>
          </div>
        </section>

        <section className="pb-24">
          <div className="space-y-10">
            {BOOK_GROUPS.map((group) => (
              <div key={group.label}>
                <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.label}
                </h2>
                <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
                  {group.books.map((book) => (
                    <li key={book.bookid}>
                      <Link
                        to="/leer/$libro/$cap"
                        params={{ libro: slugifyBook(book.name), cap: "1" }}
                        className="block rounded-md px-3 py-2 font-sans text-[15px] text-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        {book.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-border py-8 text-center font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
        <div className="mx-auto max-w-5xl px-6">
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
