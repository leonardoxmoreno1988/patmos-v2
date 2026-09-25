import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/reader/site-header";
import { useAuth } from "@/components/auth/auth-provider";
import { EBOOK_TITLE, EBOOK_URL, EBOOK_COVER, markWelcomeSeen } from "@/lib/ebook";
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
      <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl flex-col justify-center px-4 py-14 sm:px-6 md:py-20">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
          {/* Book cover */}
          <div className="flex w-full flex-col items-center md:w-auto md:shrink-0">
            <img
              src={EBOOK_COVER}
              alt={`Portada del E-book "${EBOOK_TITLE}"`}
              className="max-h-[380px] w-auto max-w-[280px] rounded-none object-cover shadow-xl md:max-h-[460px] md:max-w-[340px]"
              loading="eager"
            />
          </div>

          {/* Text + actions */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-[#000f37] md:text-5xl dark:text-white">
              ¡Bienvenido a RVNotas!
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Tu cuenta ha sido creada con éxito. Ya puedes acceder a todas las notas exegéticas y
              descargar tu recurso exclusivo.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 md:items-start">
              <a
                href={EBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="Ebook Download"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#000f37] px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#000f37]"
              >
                Descargar E-Book Gratis
              </a>
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Ir a la portada
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
