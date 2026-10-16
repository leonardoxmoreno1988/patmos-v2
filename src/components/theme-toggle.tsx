import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch for pages without the account menu (the landing page). The icon follows the
 * `dark` class via CSS rather than state, so it is right from first paint without a hydration mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={t.menu.dark}
      aria-pressed={theme === "dark"}
      title={t.menu.theme}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <Moon className="h-3.5 w-3.5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-3.5 w-3.5 dark:block" aria-hidden="true" />
    </button>
  );
}
