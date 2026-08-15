import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Star } from "lucide-react";

import profileAsset from "@/assets/leonardo-moreno.png.asset.json";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "Newsletter — Notas de Estudio" },
      {
        name: "description",
        content:
          "Suscríbete al newsletter de Notas de Estudio: una exploración de la profecía bíblica y el cristianismo actual por Leonardo Moreno.",
      },
      { property: "og:title", content: "Newsletter — Notas de Estudio" },
      {
        property: "og:description",
        content:
          "Una exploración de la profecía bíblica y el cristianismo actual.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsletterPage,
});

const reviews = [
  {
    text: "Excelente nivel de análisis histórico y teológico.",
    author: "Gustavo F. Monastra",
  },
  {
    text: "Un excelente blog acerca de los acontecimientos finales desde una perspectiva bíblica.",
    author: "Lucero Palga",
  },
  {
    text: "Sumamente valioso por el contenido que publica, un punto de referencia para profundizar en temas de gran importancia en estos tiempos peligrosos.",
    author: "Leon Santana",
  },
  {
    text: "Una visión e interpretación cristiana basada en la Biblia de los acontecimientos que ocurren hoy día. Es un punto de vista que puede dar claridad.",
    author: "Javier Bazán",
  },
  {
    text: "Es un excelente y maravilloso blog, que ayuda a entender desde la luz de la Biblia los acontecimientos actuales y futuros. ¡Muchas gracias por los análisis cuidadosos y profundos! Como cristianos no podemos seguir desapercibidos de los tiempos y ser engañados fácilmente.",
    author: "Viviana Enciso",
  },
  {
    text: "Son temas muy importantes que me han ayudado a conocer a profundidad los temas que se han dado.",
    author: "Leonardo Quispe",
  },
  {
    text: "Es muy gratificante la lectura de esta iniciativa divulgativa, poder compartir el verdadero conocimiento de la Palabra y sus conexiones sutiles con el día a día del hombre contemporáneo (contemporáneo en apariencia, claro está) y con la batalla permanente contra los enemigos de Dios. El Día de la Santa Victoria está cada vez más cerca y el Triunfo de Jesucristo es inminente.",
    author: "Jose Luis Gomez Vaiz",
  },
  {
    text: "Realmente interesante el contenido de esta página, la manera en que se exponen los temas y sobre todo siempre a la luz de la evidencia bíblica, no pierdo ningún tema y siempre lo comparto con mis amigos.",
    author: "Laura García",
  },
  {
    text: "Me gusta mucho esta página y el contenido es actual y te ayuda a ver más allá de lo que está ante nuestros ojos, te muestra aspectos que solemos pasar desapercibidos, y a la vez te insta a seguir investigando y te brinda información documentada que mucha falta hace hoy en día con tanta noticia falsa y sensacionalista.",
    author: "Jennifer Gómez",
  },
  {
    text: "Buena información en general. Datos que no son fáciles de encontrar.",
    author: "Cristina Davies",
  },
];

function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <Link
            to="/"
            search={{ libro: "Juan", cap: 3 }}
            className="flex min-w-0 items-center gap-2.5 text-foreground no-underline"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </span>
            <span className="flex min-w-0 items-baseline">
              <span className="truncate text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                Notas de Estudio
              </span>
              <span className="ml-2 shrink-0 text-xs font-normal text-neutral-400 md:text-sm">
                · por L. Moreno
              </span>
            </span>
          </Link>

          <Link
            to="/"
            search={{ libro: "Juan", cap: 3 }}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al lector
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12">
        <section className="space-y-16">
          <div className="space-y-4 text-center">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
              Una exploración de la profecía bíblica y el cristianismo actual
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600 dark:text-neutral-400 sm:text-lg">
              Un informe sobre propaganda anticristiana y otros engaños
              relevantes. Suscríbete aquí:
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSent(true);
              }}
              className="mx-auto mt-8 flex max-w-md flex-col gap-2 rounded-2xl border border-neutral-900 bg-background p-1.5 dark:border-neutral-400 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-transparent px-4 py-3 text-sm text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-neutral-100"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-neutral-900 sm:rounded-full"
              >
                {sent ? "¡Gracias!" : "Suscribirme"}
              </button>
            </form>

            <a
              href="https://newsletter.notasdeestudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center text-xs text-neutral-500 hover:underline"
            >
              Puede leer el archivo del newsletter desde este enlace ↗
            </a>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <img
              src={profileAsset.url}
              alt="Leonardo Moreno"
              className="h-32 w-32 shrink-0 rounded-[2rem] object-cover"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Leonardo Moreno
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                Estudiante de teología en TBDI, premilenialista, pretribulacionista,
                amante de la profecía bíblica y seguidor de Jesús. Escribo sobre los
                66 libros de la Biblia, las falsas doctrinas y el gnosticismo en el
                cine.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Reseñas ({reviews.length})
            </h3>
            <div className="columns-1 gap-4 space-y-4 md:columns-2">
              {reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="break-inside-avoid space-y-3 rounded-2xl border-none bg-neutral-200/60 p-5 shadow-none dark:bg-neutral-800"
                  >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    “{review.text}”
                  </p>
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    — {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
