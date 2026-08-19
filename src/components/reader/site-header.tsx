import { Link } from "@tanstack/react-router";
import { Feather } from "lucide-react";

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
        <Link to="/" search={{ libro: "Génesis", cap: 1 }} className="flex min-w-0 items-center gap-2.5 cursor-pointer">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#000f37] text-white sm:h-8 sm:w-8 dark:border-0 dark:bg-white dark:text-[#000f37]">
            <Feather className="h-4 w-4 stroke-[1.75] sm:h-[18px] sm:w-[18px]" />
          </span>
          <span className="flex flex-col justify-center gap-0.5">
            <span className="font-sans text-base font-bold leading-none tracking-tight text-foreground sm:text-lg">
              Notas Bíblicas
            </span>
            <span className="font-sans text-[11px] font-medium leading-none text-muted-foreground/80 sm:text-xs dark:text-neutral-400">
              Por Leonardo Moreno
            </span>
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




