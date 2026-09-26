import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { slugifyBook } from "@/lib/bible";
import { useAuth } from "@/components/auth/auth-provider";
import {
  HIGHLIGHT_SWATCH,
  deleteMarksByIds,
  libraryQuery,
  type HighlightColor,
  type UserHighlight,
} from "@/lib/user-marks";

interface LibrarySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Item {
  id: string;
  ids?: string[];
  book: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  preview?: string;
  color?: HighlightColor;
}

// Agrupa versículos consecutivos del mismo libro y capítulo (y color, si aplica) en una sola tarjeta.
function groupContiguous<T extends { id: string; book: string; chapter: number; verse: number; created_at: string; color?: HighlightColor }>(
  rows: T[],
): Item[] {
  const sorted = [...rows].sort(
    (a, b) =>
      a.book.localeCompare(b.book) ||
      a.chapter - b.chapter ||
      a.verse - b.verse ||
      a.created_at.localeCompare(b.created_at),
  );
  const groups: Item[] = [];
  for (const row of sorted) {
    const last = groups[groups.length - 1];
    if (
      last &&
      last.book === row.book &&
      last.chapter === row.chapter &&
      last.color === row.color &&
      last.endVerse === row.verse - 1
    ) {
      last.endVerse = row.verse;
      last.ids!.push(row.id);
      continue;
    }
    groups.push({
      id: row.id,
      ids: [row.id],
      book: row.book,
      chapter: row.chapter,
      verse: row.verse,
      endVerse: row.verse,
      ...(row.color ? { color: row.color } : {}),
    });
  }
  // Los grupos más recientes primero (según el último versículo añadido al grupo).
  return groups.reverse();
}

export function LibrarySheet({ open, onOpenChange }: LibrarySheetProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(libraryQuery(user?.id ?? null));

  const remove = useMutation({
    mutationFn: ({ table, ids }: { table: "user_bookmarks" | "user_highlights" | "user_notes"; ids: string[] }) =>
      deleteMarksByIds(table, ids),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["user-library"] });
      void queryClient.invalidateQueries({ queryKey: ["user-marks"] });
      toast.success("Eliminado");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function go(item: Item) {
    onOpenChange(false);
    void navigate({
      to: "/leer/$libro/$cap",
      params: { libro: slugifyBook(item.book), cap: String(item.chapter) },
      hash: `verse-${item.verse}`,
    });
  }

  function renderList(
    items: Item[],
    table: "user_bookmarks" | "user_highlights" | "user_notes",
    emptyText: string,
  ) {
    if (isLoading) {
      return <p className="px-1 py-8 text-sm text-muted-foreground">Cargando…</p>;
    }
    if (items.length === 0) {
      return <p className="px-1 py-8 text-sm text-muted-foreground">{emptyText}</p>;
    }
    return (
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <div className="group flex items-start gap-3 rounded-lg bg-foreground/[0.03] p-3 transition-colors hover:bg-foreground/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
              <button
                type="button"
                onClick={() => go(item)}
                className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left"
              >
                {item.color ? (
                  <span
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full ${HIGHLIGHT_SWATCH[item.color]}`}
                  />
                ) : null}
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">
                    {item.book} {item.chapter}:{item.verse}
                    {item.endVerse && item.endVerse !== item.verse ? `–${item.endVerse}` : ""}
                  </span>
                  {item.preview ? (
                    <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">
                      {item.preview}
                    </span>
                  ) : null}
                </span>
              </button>
              <button
                type="button"
                aria-label="Eliminar"
                onClick={() => remove.mutate({ table, ids: item.ids ?? [item.id] })}
                className="shrink-0 cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="mb-5">
          <SheetTitle>Mi Biblioteca</SheetTitle>
        </SheetHeader>
         <Tabs defaultValue="bookmarks" className="flex min-h-0 flex-1 flex-col px-4 pb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookmarks">Marcadores</TabsTrigger>
            <TabsTrigger value="highlights">Resaltados</TabsTrigger>
            <TabsTrigger value="notes">Notas</TabsTrigger>
          </TabsList>
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
            <TabsContent value="bookmarks">
              {renderList(groupContiguous(data?.bookmarks ?? []), "user_bookmarks", "Aún no tienes marcadores guardados.")}
            </TabsContent>
            <TabsContent value="highlights">
              {renderList(
                groupContiguous(data?.highlights ?? []),
                "user_highlights",
                "Aún no tienes resaltados guardados.",
              )}
            </TabsContent>
            <TabsContent value="notes">
              {renderList(
                (data?.notes ?? []).map((n) => ({
                  ...n,
                  preview: n.content,
                  endVerse: n.end_verse ?? n.verses?.[n.verses.length - 1] ?? n.verse,
                })),
                "user_notes",
                "Aún no tienes notas guardadas.",
              )}
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
