import { useState } from "react";
import { Check, Copy, Share2, X } from "lucide-react";

export function VerseToolbar({
  reference,
  text,
  onClose,
}: {
  reference: string;
  text: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const payload = `${text} — ${reference}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: reference, text: payload });
        return;
      } catch {
        /* cancelled */
      }
    }
    void copy();
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-border/60 bg-surface/95 p-1.5 shadow-[var(--shadow-float)] backdrop-blur-md">
        <span className="px-3 text-sm font-medium tabular-nums">{reference}</span>
        <span className="h-5 w-px bg-border" />
        <button
          type="button"
          onClick={copy}
          className="flex h-11 min-w-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors hover:bg-accent"
        >
          {copied ? <Check className="h-[18px] w-[18px]" /> : <Copy className="h-[18px] w-[18px]" />}
          <span className="hidden sm:inline">{copied ? "Copiado" : "Copiar"}</span>
        </button>
        <button
          type="button"
          onClick={share}
          className="flex h-11 min-w-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors hover:bg-accent"
        >
          <Share2 className="h-[18px] w-[18px]" />
          <span className="hidden sm:inline">Compartir</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
