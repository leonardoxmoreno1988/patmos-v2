import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ArrowUpRight } from "lucide-react";

import { LibroBreadcrumb } from "@/components/libro/libro-breadcrumb";
import { SiteHeader } from "@/components/reader/site-header";
import { Button } from "@/components/ui/button";
import { LIBRO_1865 } from "@/data/libro-1865";
import { EBOOK_COVER, EBOOK_TITLE, EBOOK_URL } from "@/lib/ebook";
import { PUBLIC_PAGE_HEADERS, SITE_URL, excerpt, seoHead } from "@/lib/seo";

const PATH = "/libros";
const TITLE = "Libros y Publicaciones — Editorial Patmos | Patmos Research";
const DESCRIPTION =
  "Obras y análisis publicados para la edificación y defensa de las Sagradas Escrituras.";

export const Route = createFileRoute("/libros/")({
  staticData: { sitemap: true },
  headers: () => PUBLIC_PAGE_HEADERS,
  head: () =>
    seoHead({
      title: TITLE,
      description: excerpt(DESCRIPTION, 160),
      canonical: PATH,
      jsonLd: [
        {
          "@type": "CollectionPage",
          "@id": `${SITE_URL}${PATH}#collection`,
          name: "Libros y Publicaciones",
          url: `${SITE_URL}${PATH}`,
          description: DESCRIPTION,
          inLanguage: "es",
          hasPart: [
            {
              "@type": "Book",
              name: LIBRO_1865.title,
              url: `${SITE_URL}/libros/${LIBRO_1865.slug}`,
            },
            {
              "@type": "Book",
              name: EBOOK_TITLE,
              url: EBOOK_URL,
            },
          ],
        },
      ],
    }),
  component: LibrosCatalog,
});

interface CatalogBook {
  id: string;
  title: string;
  author: string;
  cover: string;
  tags: string[];
  description: string;
}

const BOOKS: CatalogBook[] = [
  {
    id: "muchas-pero-solo-una",
    title: LIBRO_1865.title,
    author: "Enrique Ginocchio R.",
    cover: LIBRO_1865.coverImage,
    tags: ["Lectura Web", "PDF"],
    description:
      "Siete evidencias históricas y teológicas de la palabra perfecta e infalible de Dios en castellano.",
  },
  {
    id: "segunda-venida",
    title: EBOOK_TITLE,
    author: "Leonardo Moreno",
    cover: EBOOK_COVER,
    tags: ["Análisis Comparativo", "PDF"],
    description:
      "Un análisis escatológico de la revelación bíblica frente a las profecías del advenimiento en las religiones globales.",
  },
];

const PRIMARY_CTA =
  "h-11 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200";

function LibrosCatalog() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        <LibroBreadcrumb items={[{ label: "Inicio", to: "/dashboard" }, { label: "Libros" }]} />

        <header>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Libros y Publicaciones
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{DESCRIPTION}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {BOOKS.map((book) => (
            <article key={book.id} className="flex flex-col gap-5 rounded-xl border border-border p-6">
              <div className="flex gap-5">
                <img
                  src={book.cover}
                  alt={`Portada de ${book.title}`}
                  className="h-40 w-28 shrink-0 rounded-lg object-cover shadow-md"
                />
                <div className="space-y-2">
                  <h2 className="text-xl font-bold leading-snug text-foreground">{book.title}</h2>
                  <p className="text-sm text-muted-foreground">Por {book.author}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-base leading-relaxed text-foreground/85">{book.description}</p>

              <div className="mt-auto flex flex-wrap gap-3">
                {book.id === "muchas-pero-solo-una" ? (
                  <>
                    <Button asChild size="lg" className={PRIMARY_CTA}>
                      <Link to="/libros/muchas-pero-solo-una">Empezar a leer online</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-11 rounded-full">
                      <a href={LIBRO_1865.pdfUrl} download>
                        <Download className="size-4" /> Descargar PDF
                      </a>
                    </Button>
                  </>
                ) : (
                  <Button asChild size="lg" className={PRIMARY_CTA}>
                    <a href={EBOOK_URL} target="_blank" rel="noopener noreferrer">
                      Descargar desde Drive <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
