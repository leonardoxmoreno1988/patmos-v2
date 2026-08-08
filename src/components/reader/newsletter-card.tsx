import { useState } from "react";
import { Mail } from "lucide-react";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="mt-12 space-y-4 rounded-2xl border border-border/70 bg-muted/50 p-8">
      <div>
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Estudios bíblicos quincenales
        </span>
        <p className="font-sans text-lg font-medium leading-snug text-foreground">
          Una exploración de la profecía bíblica y el cristianismo actual
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email.trim()) setSent(true);
        }}
        className="mt-4 flex w-full max-w-xl flex-col items-center gap-2 rounded-2xl border border-border/80 bg-surface p-1.5 shadow-[var(--shadow-soft)] sm:flex-row sm:rounded-full"
      >
        <div className="flex w-full min-w-0 items-center px-4">
          <Mail className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          aria-label="Correo electrónico"
            className="w-full min-w-0 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button
          type="submit"
          className="w-full whitespace-nowrap rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:rounded-full"
        >
          {sent ? "¡Gracias!" : "Suscribirme"}
        </button>
      </form>

      <span className="mt-2 block text-xs italic text-muted-foreground/70">
        *Sin spam. Cancela cuando quieras.
      </span>
    </section>
  );
}
