import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Search, NotebookPen, ArrowRight } from "lucide-react";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BOOKS, CHAPTER_COUNTS, slugifyBook } from "@/lib/bible";
import { studyNotesQuery } from "@/lib/notes";
import { useI18n } from "@/i18n";
import {
	allBooksQuery,
	matchIndex,
	norm,
	searchNotes,
	searchVerses,
	type Hit,
} from "@/lib/search";
import { cn } from "@/lib/utils";

function Highlight({ text, query }: { text: string; query: string }) {
	const q = query.trim();
	const i = matchIndex(text, q);
	if (i < 0) return <>{text}</>;
	return (
		<>
			{text.slice(0, i)}
			<span className="rounded bg-amber-500/20 px-1 font-medium text-amber-800 dark:text-amber-300">
				{text.slice(i, i + q.length)}
			</span>
			{text.slice(i + q.length)}
		</>
	);
}

type Filter = "all" | "notes" | "bible";

/** Parses queries like "Joel 1" or "Revelación 22:3" into a direct navigation target. */
function parseReference(query: string) {
	const m = /^\s*(\d?\s?[a-záéíóúñ.]+(?:\s[a-záéíóúñ]+)?)\s*(\d+)?\s*(?::\s*(\d+))?\s*$/i.exec(
		query,
	);
	if (!m) return null;
	const name = norm(m[1] ?? "").trim();
	if (!name) return null;
	const book =
		BOOKS.find((b) => norm(b.name) === name) ?? BOOKS.find((b) => norm(b.name).startsWith(name));
	if (!book) return null;
	const chapter = Math.min(Math.max(Number(m[2] ?? 1), 1), CHAPTER_COUNTS[book.bookid] ?? 1);
	return { book, chapter, verse: m[3] ? Number(m[3]) : undefined };
}

export function GlobalSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
	const { t } = useI18n();
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState<Filter>("all");
	const navigate = useNavigate();
	const notes = useQuery({ ...studyNotesQuery, enabled: open });
	// Full Bible scan so the footer count matches the /buscar page exactly.
	const allBooks = useQuery({ ...allBooksQuery, enabled: open });

	useEffect(() => {
		if (!open) {
			setQuery("");
			setFilter("all");
		}
	}, [open]);

	const q = query.trim();

	const direct = useMemo(() => (q.length >= 2 ? parseReference(q) : null), [q]);

	// Shared search utilities keep the modal 1:1 in sync with /buscar.
	const allNoteHits = useMemo<Hit[]>(() => searchNotes(notes.data, q), [notes.data, q]);
	const allVerseHits = useMemo<Hit[]>(
		() => (allBooks.data ? searchVerses(allBooks.data, q) : []),
		[allBooks.data, q],
	);

	const visibleNoteHits = useMemo(() => {
		if (filter === "bible") return [];
		return allNoteHits.slice(0, 5);
	}, [allNoteHits, filter]);

	const visibleVerseHits = useMemo(() => {
		if (filter === "notes") return [];
		return allVerseHits.slice(0, 5);
	}, [allVerseHits, filter]);

	const totalCount =
		filter === "all" ? allNoteHits.length + allVerseHits.length :
		filter === "notes" ? allNoteHits.length :
		allVerseHits.length;

	const hasMore = q.length >= 3;

	const go = (book: string, chapter: number, verse?: number, notes = false) => {
		onOpenChange(false);
		navigate({
			to: "/leer/$libro/$cap",
			params: { libro: slugifyBook(book), cap: String(chapter) },
			...(verse ? { hash: `verse-${verse}` } : notes ? { hash: "notas" } : {}),
		});
	};



	const goToSearchPage = () => {
		if (typeof window !== "undefined" && (window as typeof window & { umami?: { track: (event: string, data?: Record<string, unknown>) => void } }).umami) {
			(window as typeof window & { umami?: { track: (event: string, data?: Record<string, unknown>) => void } }).umami!.track("Search", { query: q });
		}
		onOpenChange(false);
		navigate({ to: "/buscar", search: { q, filter, page: 1 } });
	};

	const empty =
		q.length >= 2 &&
		!direct &&
		visibleNoteHits.length === 0 &&
		visibleVerseHits.length === 0;


	const filters: { key: Filter; label: string }[] = [
		{ key: "all", label: "Todos" },
		{ key: "notes", label: "Notas" },
		{ key: "bible", label: "Biblia" },
	];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={cn(
					"flex flex-col overflow-hidden p-0 gap-0 h-[100dvh] w-full justify-between bg-white dark:bg-slate-900",
					"max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:top-0 max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0",
					"sm:h-auto sm:max-h-[85vh] sm:max-w-2xl sm:rounded-2xl",
				)}
			>
				<Command
					shouldFilter={false}
					className="flex flex-col h-full [&_[cmdk-group-heading]]:mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/60"
				>
					<CommandInput
						value={query}
						onValueChange={setQuery}
						placeholder={t.search.placeholder}
						className="text-base shrink-0"
					/>
					<div className="flex shrink-0 items-center gap-2 px-3 py-2">
						{filters.map((f) => (
							<button
								key={f.key}
								type="button"
								onClick={() => setFilter(f.key)}
								className={cn(
									"rounded-full border-0 px-3 py-1 text-sm font-medium transition-colors",
									filter === f.key
										? "bg-foreground text-background"
										: "bg-muted text-muted-foreground hover:bg-muted/80",
								)}
							>
								{f.label}
							</button>
						))}
					</div>
					<CommandList className="flex-1 min-h-0 max-h-none h-full overflow-y-auto">
						{empty ? <CommandEmpty>{t.search.empty}</CommandEmpty> : null}

						{direct ? (
							<CommandGroup heading="Navegación directa">
								<CommandItem
									value={`nav-${direct.book.name}-${direct.chapter}`}
									onSelect={() => go(direct.book.name, direct.chapter, direct.verse)}
									className="items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04]"
								>
									<ArrowRight className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
									<span className="text-sm font-semibold text-foreground">
										{direct.book.name} {direct.chapter}
										{direct.verse ? `:${direct.verse}` : ""}
									</span>
								</CommandItem>
							</CommandGroup>
						) : null}

						{visibleNoteHits.length > 0 ? (
							<CommandGroup heading="Notas de estudio">
								{visibleNoteHits.map((h) => (
									<CommandItem
										key={h.key}
										value={h.key}
										onSelect={() => go(h.book, h.chapter, undefined, true)}
										className="items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04]"
									>
										<NotebookPen className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
										<span className="min-w-0">
											<span className="block text-sm font-semibold text-foreground">
												{h.book} {h.chapter}
											</span>
<span className="block text-sm leading-relaxed text-muted-foreground line-clamp-2">
												<Highlight text={h.snippet} query={q} />
											</span>
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						) : null}

						{visibleVerseHits.length > 0 ? (
							<CommandGroup heading="Texto bíblico">
								{visibleVerseHits.map((h) => (
									<CommandItem
										key={h.key}
										value={h.key}
										onSelect={() => go(h.book, h.chapter, h.verse)}
										className="items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04]"
									>
										<BookOpen className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
										<span className="min-w-0">
											<span className="block text-sm font-semibold text-foreground">
												{h.book} {h.chapter}:{h.verse}
											</span>
											<span className="block text-sm leading-relaxed text-muted-foreground line-clamp-2">
												<Highlight text={h.snippet} query={q} />
											</span>
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						) : null}

					</CommandList>

				{hasMore ? (
					<div className="flex-shrink-0 mt-auto w-full border-t border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
						<button
							type="button"
							onClick={goToSearchPage}
							className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/[0.08] dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
						>
							Ver todos los {totalCount} resultados para &ldquo;{q}&rdquo;
							<ArrowRight className="h-4 w-4 shrink-0 opacity-60" />
						</button>
					</div>
				) : null}
				</Command>
			</DialogContent>
		</Dialog>
	);
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
	const { t } = useI18n();
	return (
		<>
			<button
				type="button"
				onClick={onClick}
				aria-label={t.search.label}
				className="hidden sm:flex h-9 items-center gap-2 rounded-full border border-foreground/15 px-4 text-sm text-muted-foreground transition-colors hover:border-foreground/30 min-w-[180px]"
			>
				<Search className="h-4 w-4 shrink-0" />
				<span>{t.search.placeholder}</span>
			</button>
			<button
				type="button"
				onClick={onClick}
				aria-label={t.search.label}
				className="grid sm:hidden h-10 w-10 shrink-0 place-items-center rounded-lg bg-transparent p-2 text-[#000f37] transition-colors hover:bg-accent/50 hover:text-foreground dark:text-white dark:hover:text-white/80"
			>
				<Search className="h-[18px] w-[18px]" />
			</button>
		</>
	);
}
