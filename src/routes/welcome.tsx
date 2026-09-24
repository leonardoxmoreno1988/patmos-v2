import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/reader/site-header";
import { useAuth } from "@/components/auth/auth-provider";
import { EBOOK_TITLE, EBOOK_URL, markWelcomeSeen } from "@/lib/ebook";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/welcome")({
  staticData: { sitemap: false },
  head: () =>
    seoHead({
      title: "¡Bienvenido a RVNotas! — Descarga tu E-book",
      description: `Tu cuenta está lista. Descarga gratis el E-book "${EBOOK_TITLE}".`,
      canonical: "/welcome",
      noindex: true,
    }),
  component: Welcome,
});

function Welcome() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) markWelcomeSeen(user.id);
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-20 text-center md:py-28">
        <h1 className="text-3xl font-bold tracking-tight text-[#000f37] md:text-5xl dark:text-white">
          ¡Bienvenido a RVNotas!
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Tu cuenta ha sido creada con éxito. Ya puedes acceder a todas las notas exegéticas y
          descargar tu recurso exclusivo.
        </p>
        <p className="mt-6 text-sm font-medium text-foreground">"{EBOOK_TITLE}"</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={EBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="Ebook Download"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#000f37] px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#000f37]"
          >
            📄 Descargar E-book Teológico Gratis (PDF)
          </a>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Ir a la portada
          </Link>
        </div>
      </main>
    </div>
  );
}
