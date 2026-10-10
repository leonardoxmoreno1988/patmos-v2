import { useEffect, useRef, useState, type RefObject } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Link2, Share2 } from "lucide-react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/reader/site-header";
import { PatmosCta } from "@/components/estudios/patmos-cta";
import { Button } from "@/components/ui/button";
import { formatEstudioDate, type Estudio } from "@/lib/estudios";
import { ORGANIZATION, PUBLIC_PAGE_HEADERS, SITE_URL, brandTitle, seoHead } from "@/lib/seo";

// One lazily loaded module per post, compiled from Markdown at build time (src/lib/estudios-plugin.ts).
const posts = import.meta.glob<Estudio>("../content/estudios/*.md", { import: "default" });

export const Route = createFileRoute("/estudios/$slug")({
  staticData: { sitemap: true },
  headers: () => PUBLIC_PAGE_HEADERS,
  loader: async ({ params }) => {
    const load = posts[`../content/estudios/${params.slug}.md`];
    if (!load) throw notFound();
    return load();
  },
  head: ({ loaderData: post }) => {
    if (!post) return {};
    const url = `${SITE_URL}/estudios/${post.slug}`;
    return seoHead({
      title: post.title,
      description: post.description,
      canonical: url,
      ogType: "article",
      jsonLd: [
        {
          "@type": "Article",
          headline: brandTitle(post.title),
          description: post.description,
          url,
          mainEntityOfPage: url,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: "es",
          image: post.image ?? `${SITE_URL}/og-image.png`,
          author: { "@type": "Person", name: post.author },
          publisher: ORGANIZATION,
          isPartOf: { "@id": `${SITE_URL}/#website` },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Estudios", item: `${SITE_URL}/estudios` },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        },
      ],
    });
  },
  component: EstudioPage,
});

function EstudioPage() {
  const post = Route.useLoaderData();
  const articleRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress target={articleRef} />
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground">
          <Link to="/estudios">
            <ArrowLeft /> Volver a Estudios
          </Link>
        </Button>

        <article ref={articleRef} className="mt-6">
          <header className="border-b border-border pb-6">
            <h1 className="text-[28px] font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{post.author}</p>
                <p>
                  <time dateTime={post.date}>{formatEstudioDate(post.date)}</time>
                  {" · "}
                  {post.readingMinutes} min de lectura
                </p>
                {post.updated ? (
                  <p>
                    Actualizado el{" "}
                    <time dateTime={post.updated}>{formatEstudioDate(post.updated)}</time>
                  </p>
                ) : null}
              </div>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </header>

          <div className="estudio-prose mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        <div className="mt-14">
          <PatmosCta
            title="Sigue estudiando en el Lector Bíblico"
            description="La Reina-Valera 1865 completa, con notas de estudio capítulo por capítulo y referencias cruzadas."
          />
        </div>
      </main>
    </div>
  );
}

/** Thin bar fixed to the top of the viewport showing how much of the article has been scrolled past. */
function ReadingProgress({ target }: { target: RefObject<HTMLElement | null> }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const article = target.current;
      const bar = barRef.current;
      if (!article || !bar) return;
      const { top, height } = article.getBoundingClientRect();
      // 0 when the article's top reaches the top of the viewport, 1 when its end reaches the bottom.
      const scrollable = height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -top / scrollable)) : 1;
      bar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [target]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5">
      <div
        ref={barRef}
        className="h-full origin-left bg-foreground/70"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  // navigator.share only exists in the browser (mostly mobile); checked after mount so SSR markup matches.
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator.share === "function"), []);
  const url = `${SITE_URL}/estudios/${slug}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Enlace copiado");
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={() => void copy()}
      >
        <Link2 /> Copiar enlace
      </Button>
      {canShare ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => void navigator.share({ title, url }).catch(() => {})}
        >
          <Share2 /> Compartir
        </Button>
      ) : null}
    </div>
  );
}
