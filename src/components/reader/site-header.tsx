import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import { GlobalSearch, SearchTrigger } from "./global-search";

interface SiteHeaderProps {
 rightLink?: { to: string; label: string };
}

export function SiteHeader({
 rightLink,
}: SiteHeaderProps) {
 const [searchOpen, setSearchOpen] = useState(false);

 useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
   if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    setSearchOpen((v) => !v);
   }
  };
  document.addEventListener("keydown", onKey);
  return () => document.removeEventListener("keydown", onKey);
 }, []);

 return (
  <header className="relative z-30 bg-background/80 backdrop-blur-xl sm:sticky sm:top-0">
   <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 sm:py-3.5 lg:py-4">
    <Link to="/" className="flex min-w-0 items-center gap-2.5 cursor-pointer">
     <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#000f37] text-white sm:h-8 sm:w-8 dark:border-0 dark:bg-white dark:text-[#000f37]">
      <BookOpen className="h-4 w-4 stroke-[1.75] sm:h-[18px] sm:w-[18px]" />
     </span>
      <span className="text-base sm:text-lg font-bold tracking-tight text-foreground whitespace-nowrap">
       Biblia + Notas
      </span>
    </Link>

     <div className="flex items-center gap-2">
      <SearchTrigger onClick={() => setSearchOpen(true)} />
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
      {rightLink ? (
      <Link
       to={rightLink.to}
       className="cursor-pointer text-sm font-medium text-[#000f37] transition-opacity hover:opacity-80 dark:text-[#BBBECE]"
      >
       {rightLink.label}
      </Link>
     ) : null}
     <ThemeToggle />
    </div>
   </div>
  </header>
 );
}
