import { useState } from "react";
import { FileText, Library, LogOut, User as UserIcon } from "lucide-react";
import { EBOOK_URL } from "@/lib/ebook";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "./auth-provider";
import { AuthModal } from "./auth-modal";
import { AccountModal } from "./account-modal";
import { LibrarySheet } from "@/components/library/library-sheet";

export function AuthNav() {
  const { user, displayName, loading, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);

  if (loading) {
    return <div className="h-8 w-20 animate-pulse rounded-full bg-foreground/5" />;
  }

  if (!user) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-full border border-foreground/15 px-3.5 text-sm font-medium shadow-none sm:px-5"
          onClick={() => setAuthOpen(true)}
        >
          Iniciar Sesión
        </Button>
        <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      </>
    );
  }

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#000f37] text-xs font-semibold text-white dark:bg-white dark:text-[#000f37]">
              {initial}
            </span>
            <span className="hidden max-w-[10rem] truncate sm:inline">{displayName}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onSelect={() => setLibraryOpen(true)}>
            <Library className="mr-2 h-4 w-4" />
            Mi Biblioteca
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={EBOOK_URL} target="_blank" rel="noopener noreferrer" data-umami-event="Ebook Download">
              <FileText className="mr-2 h-4 w-4" />
              Mi E-book
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setAccountOpen(true)}>
            <UserIcon className="mr-2 h-4 w-4" />
            Mi Cuenta
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => void signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AccountModal open={accountOpen} onOpenChange={setAccountOpen} />
      <LibrarySheet open={libraryOpen} onOpenChange={setLibraryOpen} />
    </>
  );
}
