import { useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ReferenceSelector({
  books,
  bookId,
  bookName,
  chapter,
  chapterCount,
  onSelect,
}: {
  books: { bookid: number; name: string }[];
  bookId: number;
  bookName: string;
  chapter: number;
  chapterCount: number;
  onSelect: (bookId: number, chapter: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) => b.name.toLowerCase().includes(q));
  }, [books, query]);

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-11 items-center gap-1.5 rounded-lg px-4 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent"
        >
          <span className="truncate">
            {bookName} {chapter}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(34rem,calc(100vw-2rem))] rounded-2xl border-border/60 p-3 shadow-[var(--shadow-float)]"
      >
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar libro…"
              className="mb-2 h-10 w-full rounded-xl bg-muted px-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
              {filtered.map((b) => (
                <button
                  key={b.bookid}
                  type="button"
                  onClick={() => {
                    onSelect(b.bookid, 1);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex min-h-10 w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
                    b.bookid === bookId ? "bg-accent font-medium" : ""
                  }`}
                >
                  <span className="truncate">{b.name}</span>
                  {b.bookid === bookId && <Check className="h-4 w-4 shrink-0" />}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Sin resultados
                </p>
              )}
            </div>
          </div>
          <div className="min-w-0">
            <p className="mb-2 px-1 text-xs uppercase tracking-wide text-muted-foreground">
              Capítulo
            </p>
            <div className="grid max-h-72 grid-cols-5 gap-1 overflow-y-auto pr-1">
              {Array.from({ length: chapterCount }, (_, i) => i + 1).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    onSelect(bookId, c);
                    setOpen(false);
                  }}
                  className={`grid min-h-10 place-items-center rounded-xl text-sm transition-colors hover:bg-accent ${
                    c === chapter ? "bg-accent font-medium" : ""
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}