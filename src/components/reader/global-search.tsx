import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { BOOKS, CHAPTER_COUNTS, slugifyBook, type Chapter } from "@/lib/bible";
import { studyNotesQuery } from "@/lib/notes";
import { cn } from "@/lib/utils";

const norm = (s: string) =>
	s
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();

const stripHtml = (html: string) =>
	html
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/\s{2,}/g, " ")
		.trim();

/** Returns a short snippet around the first match, with the match wrapped in <mark>. */
function snippet(text: string, query: string) {
	const i = norm(text).indexOf(norm(query));
	if (i < 0) return text.slice(0, 120);
	const start = Math.max(0, i - 45);
	const end = Math.min(text.length, i + query.length + 75);
	return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

function Highlight({ text, query }: { text: string; query: string }) {
	const i = norm(text).indexOf(norm(query));
	if (i < 0 || !query) return <>{text}</>;
	return (
		<>
			{text.slice(0, i)}
			<span className="bg-amber-200/70 text-foreground dark:bg-amber-400/30">
				{text.slice(i, i + query.length)}
			</span>
			{text.slice(i + query.length)}
		</>
	);
}

interface Hit {
	key: string;
	book: string;
	chapter: number;
	verse?: number;
	snippet: string;
	score: number;
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
	const [showAll, setShowAll] = useState(false);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const notes = useQuery({ ...studyNotesQuery, enabled: open });

	useEffect(() => {
		if (!open) {
			setQuery("");
			setFilter("all");
			setShowAll(false);
		}
	}, [open]);

	useEffect(() => {
		setShowAll(false);
	}, [filter, query]);

	const q = query.trim();

	const direct = useMemo(() => (q.length >= 2 ? parseReference(q) : null), [q]);

	const allNoteHits = useMemo<Hit[]>(() => {
		if (q.length < 3 || !notes.data) return [];
		const out: Hit[] = [];
		for (const [key, html] of Object.entries(notes.data)) {
			const text = stripHtml(html);
			const nText = norm(text);
			const nq = norm(q);
			const idx = key.lastIndexOf("-");
			const bookName = key.slice(0, idx);
			const chapter = Number(key.slice(idx + 1));
			const titleMatch = norm(bookName).includes(nq) || String(chapter).includes(q);
			const bodyMatch = nText.includes(nq);
			if (titleMatch || bodyMatch) {
				out.push({
					key: `note-${key}`,
					book: bookName,
					chapter,
					snippet: snippet(text, q),
					score: (titleMatch ? 2 : 0) + (bodyMatch ? 1 : 0),
				});
			}
		}
		return out.sort((a, b) => b.score - a.score);
	}, [notes.data, q]);

	const allVerseHits = useMemo<Hit[]>(() => {
		if (q.length < 3) return [];
		const out: Hit[] = [];
		for (const book of BOOKS) {
			const cached = queryClient.getQueryData<Chapter[]>(["bible", "book", book.bookid]);
			if (!cached) continue;
			for (const ch of cached) {
				for (const v of ch.verses) {
					const nText = norm(v.text);
					const nq = norm(q);
					const titleMatch =
						norm(book.name).includes(nq) ||
						`${ch.chapter}:${v.verse}`.includes(q) ||
						String(ch.chapter).includes(q);
					const bodyMatch = nText.includes(nq);
					if (titleMatch || bodyMatch) {
						out.push({
							key: `v-${book.bookid}-${ch.chapter}-${v.verse}`,
							book: book.name,
							chapter: ch.chapter,
							verse: v.verse,
							snippet: snippet(v.text, q),
							score: (titleMatch ? 2 : 0) + (bodyMatch ? 1 : 0),
						});
					}
				}
			}
		}
		return out.sort((a, b) => b.score - a.score);
	}, [q, queryClient, open]);

	const visibleNoteHits = useMemo(() => {
		if (filter === "bible") return [];
		if (filter === "notes" || showAll) return allNoteHits;
		return allNoteHits.slice(0, 4);
	}, [allNoteHits, filter, showAll]);

	const visibleVerseHits = useMemo(() => {
		if (filter === "notes") return [];
		if (filter === "bible" || showAll) return allVerseHits;
		return allVerseHits.slice(0, 4);
	}, [allVerseHits, filter, showAll]);

	const totalCount =
		filter === "all" ? allNoteHits.length + allVerseHits.length :
		filter === "notes" ? allNoteHits.length :
		allVerseHits.length;

	const visibleCount = visibleNoteHits.length + visibleVerseHits.length;
	const hasMore = !showAll && visibleCount < totalCount;

	const go = (book: string, chapter: number, verse?: number) => {
		onOpenChange(false);
		navigate({
			to: "/leer/$libro/$cap",
			params: { libro: slugifyBook(book), cap: String(chapter) },
			...(verse ? { hash: `verse-${verse}` } : {}),
		});
	};

	const empty =
		q.length >= 2 &&
		!direct &&
		visibleNoteHits.length === 0 &&
		visibleVerseHits.length === 0;

	const filters: { key: Filter; label: string }[] = [
		{ key: "all", label: "Todos" },
		{ key: "notes", label: "Comentarios" },
		{ key: "bible", label: "Biblia" },
	];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={cn(
					"overflow-hidden p-0 gap-0",
					"max-sm:h-[100dvh] max-sm:max-h-[100dvh] max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:top-0 max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0",
					"sm:max-w-2xl",
				)}
			>
				<Command
					shouldFilter={false}
					className="max-sm:h-full [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:text-foreground/80"
				>
					<CommandInput
						value={query}
						onValueChange={setQuery}
						placeholder="Buscar en las notas..."
						className="text-base"
					/>
					<div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
						{filters.map((f) => (
							<button
								key={f.key}
								type="button"
								onClick={() => setFilter(f.key)}
								className={cn(
									"rounded-full px-3 py-1 text-sm font-medium transition-colors",
									filter === f.key
										? "bg-foreground text-background"
										: "bg-muted text-muted-foreground hover:bg-muted/80",
								)}
							>
								{f.label}
							</button>
						))}
					</div>
					<CommandList className="max-h-[60vh] max-sm:max-h-none max-sm:h-[calc(100dvh-3rem-44px)]">
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
							<CommandGroup heading="Comentarios y notas">
								{visibleNoteHits.map((h) => (
									<CommandItem
										key={h.key}
										value={h.key}
										onSelect={() => go(h.book, h.chapter)}
										className="items-start gap-3"
									>
										<NotebookPen className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
										<span className="min-w-0">
											<span className="block text-sm font-medium">
												{h.book} {h.chapter}
											</span>
											<span className="block text-xs text-muted-foreground line-clamp-2">
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
											<span className="block text-sm font-medium">
												{h.book} {h.chapter}:{h.verse}
											</span>
											<span className="block text-xs text-muted-foreground line-clamp-2">
												<Highlight text={h.snippet} query={q} />
											</span>
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						) : null}

						{hasMore ? (
							<CommandGroup>
								<CommandItem
									value="show-all"
									onSelect={() => setShowAll(true)}
									className="justify-center text-sm text-muted-foreground"
								>
									Ver todos los resultados para &ldquo;{q}&rdquo; ({totalCount})
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
		<button
			type="button"
			onClick={onClick}
			aria-label="Buscar en las notas"
			className="flex h-9 items-center gap-2 rounded-full border border-foreground/15 px-3 text-sm text-muted-foreground transition-colors hover:border-foreground/30 sm:px-4"
		>
			<Search className="h-4 w-4 shrink-0" />
			<span className="hidden sm:inline">Buscar en las notas...</span>
			<kbd className="ml-2 hidden items-center gap-0.5 rounded border border-foreground/15 px-1.5 py-0.5 text-[10px] font-medium sm:flex">
				<span>⌘</span>K
			</kbd>
		</button>
	);
}
