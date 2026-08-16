import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";

interface SiteHeaderProps {
  rightLink?: { to: string; label: string };
}

export function SiteHeader({
  rightLink = { to: "/newsletter", label: "Newsletter" },
}: SiteHeaderProps) {
  return (
    <header className="relative z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl sm:sticky sm:top-0 sm:h-[56px] sm:items-center">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 sm:py-0">
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

