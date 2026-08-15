export function StudyNoteCard({ html, bare = false }: { html: string; bare?: boolean }) {
  return (
    <section className={bare ? "" : "mt-8 rounded-none bg-muted/40 p-6"}>
      <div
        className="study-note font-sans text-base leading-relaxed text-foreground/80"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
