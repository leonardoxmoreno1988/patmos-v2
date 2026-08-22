import { useState } from "react";
import { Mail } from "lucide-react";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="mt-12 rounded-[8px] border border-[#000f37]/10 bg-[#f4f5f8] p-6 text-[#000f37] dark:border-neutral-800 dark:bg-[#161620] dark:text-white">
      <span className="block text-[11px] font-bold uppercase tracking-wider opacity-70">
        Actualizaciones de estudio
      </span>
      <p className="my-2 font-sans text-base font-semibold leading-snug sm:text-lg">
        Recibe una notificación cuando se publiquen o actualicen nuevas notas bíblicas.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email.trim()) setSent(true);
        }}
        className="mt-4 flex w-full flex-col items-stretch gap-2 sm:flex-row"
      >
        <div className="flex w-full min-w-0 items-center rounded-[8px] border border-neutral-300 bg-white px-4 text-neutral-900 dark:border-neutral-700 dark:bg-[#0c0c12] dark:text-white">
          <Mail className="mr-2 h-4 w-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            aria-label="Correo electrónico"
            className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
          />
        </div>
        <button
          type="submit"
          className="whitespace-nowrap rounded-[8px] bg-[#000f37] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#000f37] dark:hover:bg-neutral-100"
        >
          {sent ? "¡Gracias!" : "Suscribirme"}
        </button>
      </form>

      <span className="mt-3 block text-xs italic opacity-70">
        *Sin spam. Cancela tu suscripción en cualquier momento.
      </span>
    </section>
  );
}
