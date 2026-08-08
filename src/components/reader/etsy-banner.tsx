import { Image as ImageIcon } from "lucide-react";

const ETSY_URL = "https://www.etsy.com";

export function EtsyBanner() {
  return (
    <a
      href={ETSY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 flex aspect-[4/3] max-h-64 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-border/60 bg-muted/70 p-4 text-center transition-colors hover:bg-muted"
    >
      <ImageIcon className="h-5 w-5 text-muted-foreground" />
      <span className="text-xs font-medium text-muted-foreground">
        Espacio Banner Etsy (JPG/GIF)
      </span>
    </a>
  );
}
