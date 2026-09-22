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

interface Props {
  userId: string | null;
  book: string;
  chapter: number;
  selection: VerseSelection;
  marks: ChapterMarks;
  onClose: () => void;
  onRequireAuth: () => void;
}

export function VerseActionBar({
  userId,
  book,
  chapter,
  selection,
  marks,
  onClose,
  onRequireAuth,
}: Props) {
  const queryClient = useQueryClient();
  const [noteOpen, setNoteOpen] = useState(false);
  const verse = selection.verse;
  const target = { userId: userId ?? "", book, chapter, verse };
  const currentColor = marks.highlights[verse]?.color;
  const bookmarked = !!marks.bookmarks[verse];
  const existingNote = marks.notes[verse]?.content ?? "";

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["user-marks", userId, book, chapter] });

  const run = useMutation({
    mutationFn: async (action: () => Promise<void>) => action(),
    onSuccess: () => void invalidate(),
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
        currentColor === color ? removeHighlight(target) : setHighlight(target, color),
      ),
    );

  const copyVerse = async () => {
    try {
      await navigator.clipboard.writeText(
        `"${selection.text}" (${book} ${chapter}:${verse}, RV1865)`,
      );
      toast.success("Versículo copiado");
      onClose();
    } catch {
      toast.error("No pudimos copiar el versículo.");
    }
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-5">
        <div className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border/60 bg-popover/95 px-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <span className="shrink-0 px-2 text-xs font-semibold text-muted-foreground">
            {book} {chapter}:{verse}
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
          {currentColor ? (
            <IconButton
              label="Quitar resaltado"
              onClick={() => guard(() => run.mutate(() => removeHighlight(target)))}
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
            onClick={() => guard(() => run.mutate(() => toggleBookmark(target, !bookmarked)))}
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
        title={`${book} ${chapter}:${verse}`}
        initial={existingNote}
        onSave={(content) =>
          run.mutate(
            () => saveNote(target, content),
            { onSuccess: () => { void invalidate(); setNoteOpen(false); toast.success("Nota guardada"); } },
          )
        }
        onDelete={
          existingNote
            ? () =>
                run.mutate(() => deleteNote(target), {
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
  onDelete?: () => void;
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
