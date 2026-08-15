import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { SiteHeader } from "@/components/reader/site-header";
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
      <SiteHeader rightLink={{ to: "/", label: "← Volver al lector" }} />


      <main className="mx-auto max-w-3xl px-4 py-12">
        <section className="space-y-16">
          <div className="space-y-4 text-center">
            <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground dark:text-white sm:text-4xl">
              Una exploración de la profecía bíblica y el cristianismo actual
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-sans text-base font-normal text-[#000f37] dark:text-[#BBBECE] sm:text-lg">
              Un informe sobre propaganda anticristiana y otros engaños
              relevantes. Suscríbete aquí:
            </p>


            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSent(true);
              }}
              className="mx-auto mt-8 flex max-w-md flex-col gap-2 rounded-2xl border border-foreground bg-background p-1.5 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-transparent px-4 py-3 font-sans text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-xl bg-primary px-6 py-3 font-sans text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 sm:rounded-full"
              >
                {sent ? "¡Gracias!" : "Suscribirme"}
              </button>
            </form>

          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <img
              src={profileAsset.url}
              alt="Leonardo Moreno"
              className="h-32 w-32 shrink-0 rounded-[2rem] object-cover"
            />
            <div className="text-center sm:text-left">
              <h2 className="font-sans text-xl font-bold text-foreground dark:text-white">
                Leonardo Moreno
              </h2>
              <p className="font-sans text-sm font-normal leading-relaxed text-[#000f37] dark:text-[#BBBECE]">
                Estudiante de teología en TBDI, premilenialista, pretribulacionista,
                amante de la profecía bíblica y seguidor de Jesús. Escribo sobre los
                66 libros de la Biblia, las falsas doctrinas y el gnosticismo en el
                cine.
              </p>

            </div>
          </div>

          <div>
            <h3 className="mb-8 text-center font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Reseñas ({reviews.length})
            </h3>
            <div className="columns-1 gap-4 space-y-4 md:columns-2">
              {reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="break-inside-avoid space-y-3 rounded-2xl border-none bg-muted p-5 shadow-none dark:bg-[#232232]"
                  >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        strokeLinejoin="miter"
                        strokeLinecap="square"
                      />
                    ))}
                  </div>
                  <p className="font-sans text-sm font-normal leading-relaxed text-foreground/80 dark:text-white">
                    “{review.text}”
                  </p>
                  <p className="font-sans text-xs font-normal text-muted-foreground dark:text-[#BBBECE]">
                    — {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>


      <footer className="mt-20 border-t border-border py-8 text-center font-sans text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-6">
          © 2026 Notas de Estudio. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
