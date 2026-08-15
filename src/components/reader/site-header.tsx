import { Link } from "@tanstack/react-router";
import { BookOpen, Search } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";

interface SiteHeaderProps {
  showSearch?: boolean;
  query?: string;
  setQuery?: (q: string) => void;
  rightLink?: { to: string; label: string };
}

export function SiteHeader({
  showSearch,
  query,
  setQuery,
  rightLink = { to: "/newsletter", label: "Newsletter" },
}: SiteHeaderProps) {
  return (
    <header className="relative z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl sm:sticky sm:top-0">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-2 sm:py-3 md:grid-cols-[auto_minmax(0,1fr)_auto]">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <BookOpen className="h-[18px] w-[18px]" />
          </span>
          <span className="flex min-w-0 items-baseline">
            <span className="min-w-0 truncate text-[15px] font-semibold tracking-tight text-foreground dark:text-white">
              Notas de Estudio
            </span>
            <span className="ml-2 hidden shrink-0 text-xs font-normal text-muted-foreground sm:inline md:text-sm">
              · por L. Moreno
            </span>
          </span>
        </div>

        {showSearch ? (
          <div className="order-last col-span-2 flex w-full justify-center md:order-none md:col-span-1">
            <label className="mx-auto flex h-10 w-full items-center gap-2 rounded-full border-none bg-muted/50 px-4 text-sm shadow-none outline-none focus-within:ring-0 md:w-72">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery?.(e.target.value)}
                placeholder="Buscar en este capítulo…"
                className="w-full min-w-0 border-none bg-transparent text-sm outline-none ring-0 placeholder:text-muted-foreground"
              />
            </label>
          </div>
        ) : (
          <div className="hidden md:block" />
        )}

        <div className="flex items-center gap-2">
          <Link
            to={rightLink.to}
            className="cursor-pointer text-sm font-medium text-[#000f37] transition-opacity hover:opacity-80 dark:text-[#BBBECE]"
          >
            {rightLink.label}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

