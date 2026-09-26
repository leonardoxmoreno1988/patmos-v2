import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, CreditCard, History, Library, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

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
  const { user, displayName, loading, signOut, isPremium } = useAuth();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);

  const openBilling = async () => {
    const portal = window.open("", "_blank");
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token || !user) throw new Error();
      const res = await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: user.id }),
      });
      const result = await res.json();
      if (!res.ok || !result.url) throw new Error();
      if (portal) portal.location.href = result.url;
      else window.open(result.url, "_blank", "noopener,noreferrer");
    } catch {
      portal?.close();
      toast.error("No pudimos abrir la gestión de suscripción.");
    }
  };

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
           <Button
            type="button"
             variant="ghost"
             className="flex h-auto items-center gap-2 rounded-full py-1 pl-1 pr-2.5 text-sm font-medium text-foreground hover:bg-foreground/5"
          >
             <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
              {initial}
            </span>
            <span className="hidden max-w-[10rem] truncate sm:inline">{displayName}</span>
            {isPremium ? (
              <span className="hidden rounded-md border border-pro-badge-border bg-pro-badge px-2 py-0.5 text-[10px] font-bold tracking-wider text-pro-badge-foreground sm:inline">
                PRO
              </span>
            ) : null}
           </Button>
        </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-64 p-1.5">
            <div className="px-2.5 pb-2 pt-1.5">
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
           <DropdownMenuSeparator />
           <DropdownMenuItem onSelect={() => {
             let libro = "genesis";
             let cap = "1";
             try {
               const saved = JSON.parse(localStorage.getItem("rv1865:last") ?? "null");
               if (typeof saved?.libro === "string" && typeof saved?.cap === "string") {
                 libro = saved.libro;
                 cap = saved.cap;
               }
             } catch { /* use Génesis 1 */ }
             void navigate({ to: "/leer/$libro/$cap", params: { libro, cap } });
           }}>
             <BookOpen /> Lector Bíblico
           </DropdownMenuItem>
           <DropdownMenuItem onSelect={() => {
             void navigate({ to: "/", search: { consulta: "history" } });
           }}>
             <History /> Historial de Consultas
           </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setLibraryOpen(true)}>
             <Library /> Mi Biblioteca &amp; E-books
          </DropdownMenuItem>
           <DropdownMenuSeparator />
           <DropdownMenuItem onSelect={() => void openBilling()}>
             <CreditCard /> Suscripción PRO
           </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setAccountOpen(true)}>
             <Settings /> Ajustes de Cuenta
          </DropdownMenuItem>
          <DropdownMenuSeparator />
           <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={() => void signOut()}>
             <LogOut />
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AccountModal open={accountOpen} onOpenChange={setAccountOpen} />
      <LibrarySheet open={libraryOpen} onOpenChange={setLibraryOpen} />
    </>
  );
}
