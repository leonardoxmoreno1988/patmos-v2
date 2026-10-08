import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PatmosWordmark } from "@/components/brand/patmos-wordmark";

import { SearchTrigger } from "./search-trigger";
import { AuthNav } from "@/components/auth/auth-nav";
import { useI18n } from "@/i18n";

// The search dialog (cmdk + search index) is only needed once the user opens it.
const loadGlobalSearch = () => import("./global-search");
const GlobalSearch = lazy(() => loadGlobalSearch().then((m) => ({ default: m.GlobalSearch })));

interface SiteHeaderProps {
 rightLink?: { to: string; label: string };
}

export function SiteHeader({
 rightLink,
}: SiteHeaderProps) {
 const { t } = useI18n();
 const [searchOpen, setSearchOpen] = useState(false);
 const [searchMounted, setSearchMounted] = useState(false);

 useEffect(() => {
  if (searchOpen) setSearchMounted(true);
 }, [searchOpen]);

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
   <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 sm:gap-4 sm:px-6 sm:py-3.5 lg:py-4">
    <Link to="/" className="flex min-w-0 shrink-0 items-center cursor-pointer" aria-label={t.header.homeLabel}>
      <PatmosWordmark className="h-3.5 lg:h-4" />
    </Link>

     <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <SearchTrigger onClick={() => setSearchOpen(true)} onIntent={() => void loadGlobalSearch()} />
      {searchMounted || searchOpen ? (
       <Suspense fallback={null}>
        <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
       </Suspense>
      ) : null}
      {rightLink ? (
      <Link
       to={rightLink.to}
       className="cursor-pointer text-sm font-medium text-[#000f37] transition-opacity hover:opacity-80 dark:text-[#BBBECE]"
      >
       {rightLink.label}
      </Link>
     ) : null}
     <AuthNav />
    </div>
   </div>
  </header>
 );
}
