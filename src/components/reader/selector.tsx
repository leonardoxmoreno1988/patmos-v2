import { useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  value: number;
  label: string;
}

export function Selector({
  label,
  value,
  options,
  onSelect,
  searchable = false,
  columns = 1,
}: {
  label: string;
  value: number;
  options: Option[];
  onSelect: (value: number) => void;
  searchable?: boolean;
  columns?: number;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, searchable]);

  const current = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-11 shrink-0 min-w-max items-center gap-2 rounded-full border border-border/70 bg-surface/90 px-3 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors hover:bg-accent sm:px-5"
        >
          <span className="hidden text-xs font-normal uppercase tracking-wide text-muted-foreground sm:inline">
            {label}
          </span>
          <span className="truncate">{current?.label ?? "—"}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(22rem,calc(100vw-2rem))] rounded-2xl border-border/60 p-2 shadow-[var(--shadow-float)]"
      >
        {searchable && (
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar libro…"
            className="mb-2 h-11 w-full rounded-xl bg-muted px-3 text-sm outline-none placeholder:text-muted-foreground"
          />
        )}
        <div
          className="max-h-72 gap-1 overflow-y-auto"
          style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {filtered.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onSelect(o.value);
                setOpen(false);
                setQuery("");
              }}
              className={`flex min-h-11 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
                o.value === value ? "bg-accent font-medium" : ""
              }`}
            >
              <span className="truncate">{o.label}</span>
              {o.value === value && <Check className="h-4 w-4 shrink-0" />}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Sin resultados
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}