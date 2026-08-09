import { NotebookPen } from "lucide-react";

export function StudyNoteCard({ html }: { html: string }) {
  return (
    <section className="mt-8 rounded-2xl bg-muted/40 p-6">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/70 text-foreground">
          <NotebookPen className="h-[15px] w-[15px]" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Notas de Estudio
        </span>
      </div>
      <div
        className="study-note mt-4 font-sans text-base leading-relaxed text-foreground/80"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
