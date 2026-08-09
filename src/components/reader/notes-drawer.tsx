import type { ReactNode } from "react";
import { NotebookPen } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function NotesDrawer({ children }: { children: ReactNode }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-xl backdrop-blur-md transition-all active:scale-95 lg:hidden"
        >
          <NotebookPen className="h-4 w-4" />
          Ver Notas
        </button>
      </DrawerTrigger>
      <DrawerContent className="rounded-t-3xl border-t border-border bg-background [&>div:first-child]:hidden">
        <div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/30" />
        <DrawerTitle className="sr-only">Notas de Estudio</DrawerTitle>
        <DrawerDescription className="sr-only">
          Comentario del capítulo seleccionado
        </DrawerDescription>
        <div className="max-h-[85vh] overflow-y-auto p-6 pt-0">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
