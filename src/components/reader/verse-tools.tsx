import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark, Copy, Eraser, NotebookPen, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import {
  HIGHLIGHT_COLORS,
  HIGHLIGHT_LABEL,
  HIGHLIGHT_SWATCH,
  deleteNote,
  removeHighlight,
  saveNote,
  setHighlight,
  toggleBookmark,
  type ChapterMarks,
  type HighlightColor,
} from "@/lib/user-marks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface VerseSelection {
  verse: number;
  text: string;
}

export function formatVerseList(nums: number[]): string {
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  if (sorted.length === 0) return "";
  const contiguous = sorted.every((n, i) => i === 0 || n === sorted[i - 1]! + 1);
  if (sorted.length > 1 && contiguous) return `${sorted[0]}–${sorted[sorted.length - 1]}`;
  return sorted.join(", ");
}

interface Props {
  userId: string | null;
  book: string;
  chapter: number;
  selection: VerseSelection[];
  marks: ChapterMarks;
  onClose: () => void;
  onRequireAuth: () => void;
  initialNoteOpen?: boolean;
}

export function VerseActionBar({
  userId,
  book,
  chapter,
  selection,
  marks,
  onClose,
  onRequireAuth,
  initialNoteOpen,
}: Props) {
  const queryClient = useQueryClient();
  const [noteOpen, setNoteOpen] = useState(!!initialNoteOpen);
  const verseNums = selection.map((s) => s.verse).sort((a, b) => a - b);
  const first = verseNums[0]!;
  const label = `${book} ${chapter}:${formatVerseList(verseNums)}`;
  const targets = verseNums.map((verse) => ({ userId: userId ?? "", book, chapter, verse }));
  const firstTarget = targets[0]!;
  const colors = verseNums.map((v) => marks.highlights[v]?.color);
  const currentColor = colors.every((c) => c && c === colors[0]) ? colors[0] : undefined;
  const anyHighlighted = colors.some(Boolean);
  const bookmarked = verseNums.every((v) => !!marks.bookmarks[v]);
  const existingNote = marks.notes[first]?.content ?? "";

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["user-marks", userId, book, chapter] });
    void queryClient.invalidateQueries({ queryKey: ["user-library", userId] });
  };

  const run = useMutation({
    mutationFn: async (action: () => Promise<unknown>) => action(),
    onSuccess: () => invalidate(),
    onError: (error: Error) =>
      toast.error(error.message || "No pudimos guardar el cambio."),
  });

  const guard = (action: () => void) => {
    if (!userId) {
      onRequireAuth();
      return;
    }
    action();
  };

  const pickColor = (color: HighlightColor) =>
    guard(() =>
      run.mutate(() =>
        Promise.all(
          targets.map((t) =>
            currentColor === color ? removeHighlight(t) : setHighlight(t, color),
          ),
        ),
      ),
    );

  const copyVerse = async () => {
    try {
      const text = selection
        .slice()
        .sort((a, b) => a.verse - b.verse)
        .map((s) => s.text)
        .join(" ");
      await navigator.clipboard.writeText(`"${text}" (${label}, RV1865)`);
      toast.success(selection.length > 1 ? "Versículos copiados" : "Versículo copiado");
      onClose();
    } catch {
      toast.error("No pudimos copiar el versículo.");
    }
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-5">
        <div className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border/60 bg-popover/95 px-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <span className="shrink-0 whitespace-nowrap px-2 text-xs font-semibold text-muted-foreground">
            {label}
          </span>
          <span className="mx-1 h-6 w-px shrink-0 bg-border/70" />
          {HIGHLIGHT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Resaltar en ${HIGHLIGHT_LABEL[color]}`}
              onClick={() => pickColor(color)}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform hover:scale-105 ${
                currentColor === color ? "ring-2 ring-foreground/60" : ""
              }`}
            >
              <span className={`h-5 w-5 rounded-full ${HIGHLIGHT_SWATCH[color]}`} />
            </button>
          ))}
          {anyHighlighted ? (
            <IconButton
              label="Quitar resaltado"
              onClick={() =>
                guard(() => run.mutate(() => Promise.all(targets.map((t) => removeHighlight(t)))))
              }
            >
              <Eraser className="h-[18px] w-[18px]" />
            </IconButton>
          ) : null}
          <span className="mx-1 h-6 w-px shrink-0 bg-border/70" />
          <IconButton
            label="Añadir nota"
            active={!!existingNote}
            onClick={() => guard(() => setNoteOpen(true))}
          >
            <NotebookPen className="h-[18px] w-[18px]" />
          </IconButton>
          <IconButton
            label={bookmarked ? "Quitar marcador" : "Marcador"}
            active={bookmarked}
            onClick={() =>
              guard(() =>
                run.mutate(() => Promise.all(targets.map((t) => toggleBookmark(t, !bookmarked)))),
              )
            }
          >
            <Bookmark
              className={`h-[18px] w-[18px] ${bookmarked ? "fill-current" : ""}`}
            />
          </IconButton>
          <IconButton label="Copiar versículo" onClick={() => void copyVerse()}>
            <Copy className="h-[18px] w-[18px]" />
          </IconButton>
          <IconButton label="Cerrar" onClick={onClose}>
            <X className="h-[18px] w-[18px]" />
          </IconButton>
        </div>
      </div>

      <NoteDialog
        open={noteOpen}
        onOpenChange={setNoteOpen}
        title={label}
        initial={existingNote}
        onSave={(content) =>
          run.mutate(
            () => saveNote(firstTarget, content, verseNums),
            {
              onSuccess: (result) => {
                invalidate();
                setNoteOpen(false);
                const rangeSaved = (result as { rangeSaved?: boolean } | undefined)?.rangeSaved;
                if (verseNums.length > 1 && rangeSaved === false) {
                  toast.warning(
                    "Nota guardada solo en el primer versículo: falta actualizar la base de datos para guardar rangos.",
                  );
                } else {
                  toast.success("Nota guardada");
                }
              },
            },
          )
        }
        onDelete={
          existingNote
            ? () =>
                run.mutate(() => deleteNote(firstTarget), {
                  onSuccess: () => {
                    void invalidate();
                    setNoteOpen(false);
                    toast.success("Nota eliminada");
                  },
                })
            : undefined
        }
        saving={run.isPending}
      />
    </>
  );
}

function IconButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors hover:bg-accent ${
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function NoteDialog({
  open,
  onOpenChange,
  title,
  initial,
  onSave,
  onDelete,
  saving,
  readOnly,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  initial: string;
  onSave?: (content: string) => void;
  onDelete?: (() => void) | undefined;
  saving?: boolean;
  readOnly?: boolean;
}) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (open) setValue(initial);
  }, [open, initial]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base">Mi nota · {title}</DialogTitle>
        </DialogHeader>
        <textarea
          value={value}
          readOnly={readOnly}
          onChange={(e) => setValue(e.target.value)}
          rows={7}
          placeholder="Escribe tu nota personal sobre este versículo…"
          className="w-full resize-none rounded-xl border border-border/60 bg-background p-3 text-sm leading-relaxed text-foreground outline-none focus:border-foreground/30"
        />
        {!readOnly ? (
          <div className="flex items-center justify-between gap-3">
            {onDelete ? (
              <button
                type="button"
                onClick={onDelete}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-destructive hover:underline"
              >
                <Trash2 className="h-4 w-4" /> Eliminar
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              disabled={saving || !value.trim()}
              onClick={() => onSave?.(value.trim())}
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Guardando…" : "Guardar nota"}
            </button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
