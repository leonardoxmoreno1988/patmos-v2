import { Link } from "@tanstack/react-router";

import { ThemeToggle } from "./theme-toggle";

interface SiteHeaderProps {
  rightLink?: { to: string; label: string };
}

export function SiteHeader({
  rightLink = { to: "/newsletter", label: "Newsletter" },
}: SiteHeaderProps) {
  return (
    <header className="relative z-30 bg-background/80 backdrop-blur-xl sm:sticky sm:top-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 sm:py-3.5 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 cursor-pointer">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#000f37] font-serif text-xs font-bold tracking-tighter text-white sm:h-8 sm:w-8 sm:text-sm dark:border dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
            LM
          </span>
          <span className="min-w-0 truncate font-serif text-base font-bold tracking-tight text-foreground sm:text-lg dark:text-white">
            L. Moreno | Notas
          </span>
        </Link>

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


