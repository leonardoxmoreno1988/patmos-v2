export function ChapterSkeleton() {
  const widths = ["100%", "94%", "88%", "97%", "72%", "91%", "85%", "96%", "68%"];
  return (
    <div className="space-y-5" aria-hidden>
      {widths.map((w, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 animate-pulse rounded-full bg-muted" style={{ width: w }} />
          <div
            className="h-4 animate-pulse rounded-full bg-muted"
            style={{ width: `calc(${w} - 18%)` }}
          />
        </div>
      ))}
    </div>
  );
}

export function NotesSkeleton() {
  return (
    <div className="space-y-3" aria-hidden>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/50 bg-surface p-5 shadow-[var(--shadow-soft)]"
        >
          <div className="h-3 w-28 animate-pulse rounded-full bg-muted" />
          <div className="mt-3 h-3 w-full animate-pulse rounded-full bg-muted" />
          <div className="mt-2 h-3 w-3/4 animate-pulse rounded-full bg-muted" />
        </div>
      ))}
    </div>
  );
}