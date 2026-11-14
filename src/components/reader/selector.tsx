import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  value: number;
  label: string;
  /** Extra names the search also matches, e.g. "Apocalipsis" for Revelación. */
  aliases?: string[] | undefined;
}

/** Lowercase and without accents, so "Génesis" matches "genesis". */
const normalize = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function Selector({
  label,
  value,
  options,
  onSelect,
  columns = 1,
  itemClassName = "text-sm sm:text-base",
  searchable = false,
  searchPlaceholder = "",
  emptyMessage = "",
}: {
  label: string;
  value: number;
  options: Option[];
  onSelect: (value: number) => void;
  columns?: number;
  groupByTestament?: boolean;
  itemClassName?: string;
  /** Adds a search field above the list, and centres the active item when opened. */
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = options.find((o) => o.value === value);

  const needle = normalize(query.trim());
  const visible =
    searchable && needle
      ? options.filter((o) =>
          [o.label, ...(o.aliases ?? [])].some((name) => normalize(name).includes(needle)),
        )
      : options;

  // Closing always clears the search, so the next open starts from the full list.
  const close = () => {
    setOpen(false);
    setQuery("");
  };

  // Centre the active item in the list on open. Setting scrollTop (rather than scrollIntoView)
  // keeps the page itself from jumping.
  useEffect(() => {
    if (!open || !searchable) return;
    const frame = requestAnimationFrame(() => {
      const list = listRef.current;
      const active = list?.querySelector<HTMLElement>('[data-active="true"]');
      if (list && active) {
        list.scrollTop = active.offsetTop - list.clientHeight / 2 + active.clientHeight / 2;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [open, searchable]);

  // Focus the search field only where a physical keyboard is likely, so touch devices don't
  // raise the on-screen keyboard over the list.
  const focusSearchOnOpen = (event: Event) => {
    event.preventDefault();
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  };

  // Enter opens the first match, the same as clicking it.
  const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && visible[0]) {
      event.preventDefault();
      onSelect(visible[0].value);
      close();
    }
  };

  const renderGrid = (items: Option[]) => (
    <div
      className="gap-1"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {items.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            data-active={active ? "true" : undefined}
            onClick={() => {
              onSelect(o.value);
              close();
            }}
            className={`flex min-h-11 items-center justify-between gap-2 rounded-xl text-left text-[16px] sm:text-[17px] font-medium py-2.5 px-3 transition-colors hover:bg-accent ${itemClassName} ${
              active ? "bg-accent font-semibold" : ""
            }`}
          >
            <span className="truncate">{o.label}</span>
            {searchable && active ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
          </button>
        );
      })}
    </div>
  );

  return (
    <Popover open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
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
        onOpenAutoFocus={searchable ? focusSearchOnOpen : undefined}
        className="w-[min(22rem,calc(100vw-2rem))] rounded-2xl border-border/60 p-2 shadow-[var(--shadow-float)]"
      >
        {searchable ? (
          <div className="border-b border-border/50 pb-2">
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onSearchKeyDown}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              autoComplete="off"
              className="h-9 w-full rounded-lg border border-border/60 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        ) : null}
        <div
          ref={listRef}
          className={`relative max-h-[23.5rem] space-y-2 overflow-y-auto ${searchable ? "pt-2" : ""}`}
        >
          {visible.length > 0 ? (
            renderGrid(visible)
          ) : (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
