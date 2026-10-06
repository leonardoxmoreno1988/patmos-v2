import { RESOURCES } from "@/lib/ebook";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ResourcesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Ventana de descargas: E-books y material de estudio gratuito. */
export function ResourcesSheet({ open, onOpenChange }: ResourcesSheetProps) {
  const { t } = useI18n();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="mb-5">
          <SheetTitle>{t.resources.title}</SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            {t.resources.subtitle}
          </SheetDescription>
        </SheetHeader>
        <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
          {RESOURCES.map((resource) => (
            <li
              key={resource.id}
              className="flex items-start gap-4 rounded-lg bg-foreground/[0.03] p-4 dark:bg-white/[0.03]"
            >
              <img
                src={resource.cover}
                alt={t.resources.coverAlt(resource.title)}
                className="h-28 w-20 shrink-0 object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <span className="text-[11px] font-semibold uppercase text-primary">
                  {t.resources.freeResource}
                </span>
                <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
                  {resource.title}
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 dark:border-transparent dark:bg-white dark:text-slate-900 hover:dark:bg-slate-100"
                  data-umami-event="Ebook Download"
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {t.resources.downloadBook}
                  </a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
