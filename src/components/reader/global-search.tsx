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
			<span className="rounded bg-amber-500/20 px-1 font-medium text-amber-700 dark:text-amber-300">
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
					"flex flex-col overflow-hidden p-0 gap-0",
					"max-sm:h-[100dvh] max-sm:max-h-[100dvh] max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:top-0 max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0",
					"sm:max-w-2xl sm:max-h-[80vh]",
				)}
			>
				<Command
					shouldFilter={false}
					className="flex flex-col flex-1 max-sm:h-full [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:text-foreground/80"
				>
					<CommandInput
						value={query}
						onValueChange={setQuery}
						placeholder="Buscar..."
						className="text-base"
					/>
					<div className="flex items-center gap-2 px-3 py-2">
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
					<CommandList className="flex-1 overflow-y-auto min-h-0">
						{empty ? <CommandEmpty>No se encontraron resultados.</CommandEmpty> : null}

						{direct ? (
							<CommandGroup heading="Navegación directa">
								<CommandItem
									value={`nav-${direct.book.name}-${direct.chapter}`}
									onSelect={() => go(direct.book.name, direct.chapter, direct.verse)}
									className="gap-3"
								>
									<ArrowRight className="h-4 w-4 shrink-0 opacity-60" />
									<span className="font-medium">
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
										className="items-start gap-3"
									>
										<NotebookPen className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
										<span className="min-w-0">
											<span className="block text-sm font-semibold">
												{h.book} {h.chapter}
											</span>
											<span className="block text-sm text-search-snippet line-clamp-2">
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
										className="items-start gap-3"
									>
										<BookOpen className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
										<span className="min-w-0">
											<span className="block text-sm font-semibold">
												{h.book} {h.chapter}:{h.verse}
											</span>
											<span className="block text-sm text-search-snippet line-clamp-2">
												<Highlight text={h.snippet} query={q} />
											</span>
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						) : null}

						{hasMore ? (
							<CommandGroup className="py-3">
								<CommandItem
									value="show-all"
									onSelect={goToSearchPage}
									className="mx-auto w-fit justify-center gap-2 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
								>
									Ver todos los {totalCount} resultados para &ldquo;{q}&rdquo;
									<ArrowRight className="h-4 w-4 shrink-0 opacity-60" />
								</CommandItem>
							</CommandGroup>
						) : null}

					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
	return (
		<>
			<button
				type="button"
				onClick={onClick}
				aria-label="Buscar"
				className="hidden sm:flex h-9 items-center gap-2 rounded-full border border-foreground/15 px-4 text-sm text-muted-foreground transition-colors hover:border-foreground/30 min-w-[180px]"
			>
				<Search className="h-4 w-4 shrink-0" />
				<span>Buscar...</span>
			</button>
			<button
				type="button"
				onClick={onClick}
				aria-label="Buscar"
				className="grid sm:hidden h-10 w-10 shrink-0 place-items-center rounded-lg bg-transparent p-2 text-[#000f37] transition-colors hover:bg-accent/50 hover:text-foreground dark:text-white dark:hover:text-white/80"
			>
				<Search className="h-[18px] w-[18px]" />
			</button>
		</>
	);
}
