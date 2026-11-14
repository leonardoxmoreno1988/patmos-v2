import { useI18n } from "@/i18n";

/** Minimal copyright line closing the Estudios and Libros pages. */
export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 py-8 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
      <div className="mx-auto max-w-6xl px-6">© Patmos 2026 · {t.footer.rights}</div>
    </footer>
  );
}
