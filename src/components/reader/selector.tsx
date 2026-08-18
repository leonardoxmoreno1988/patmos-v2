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
  columns = 1,
  groupByTestament = true,
}: {
  label: string;
  value: number;
  options: Option[];
  onSelect: (value: number) => void;
  columns?: number;
  groupByTestament?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const current = options.find((o) => o.value === value);

  const oldTestament = useMemo(
    () => options.filter((o) => o.value <= 39),
    [options],
  );
  const newTestament = useMemo(
    () => options.filter((o) => o.value >= 40),
    [options],
  );

  const renderGrid = (items: Option[]) => (
    <div
      className="gap-1"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {items.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => {
            onSelect(o.value);
            setOpen(false);
          }}
          className={`flex min-h-11 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
            o.value === value ? "bg-accent font-medium" : ""
          }`}
        >
          <span className="truncate">{o.label}</span>
          {o.value === value && <Check className="h-4 w-4 shrink-0" />}
        </button>
      ))}
    </div>
  );

  const renderGroup = (title: string, items: Option[]) =>
    items.length > 0 ? (
      <div className="space-y-1">
        <p className="sticky top-0 z-10 bg-popover px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        {renderGrid(items)}
      </div>
    ) : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-11 shrink-0 max-w-[120px] items-center gap-2 rounded-full border border-[#000f37]/30 bg-transparent px-3 py-2.5 text-sm font-medium text-[#000f37] shadow-none transition-colors hover:bg-accent sm:max-w-none sm:px-5 dark:border-[#7c7b82]/60 dark:bg-transparent dark:text-white"
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
        <div className="max-h-72 space-y-2 overflow-y-auto">
          {groupByTestament ? (
            <>
              {renderGroup("Antiguo Testamento", oldTestament)}
              {renderGroup("Nuevo Testamento", newTestament)}
              {oldTestament.length === 0 && newTestament.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Sin resultados
                </p>
              )}
            </>
          ) : (
            renderGrid(options)
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
