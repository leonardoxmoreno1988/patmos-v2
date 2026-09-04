import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, NotebookPen, Search } from "lucide-react";

import { SiteHeader } from "@/components/reader/site-header";
import { slugifyBook } from "@/lib/bible";
import { studyNotesQuery } from "@/lib/notes";
import { allBooksQuery, norm, searchNotes, searchVerses, type Hit } from "@/lib/search";
import { cn } from "@/lib/utils";

type Filter = "all" | "notes" | "bible";
const PER_PAGE = 20;

interface SearchParams {
	q: string;
	filter: Filter;
	page: number;
}

export const Route = createFileRoute("/buscar")({
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		const filter = String(search["filter"] ?? "all");
		return {
			q: typeof search["q"] === "string" ? search["q"] : "",
			filter: filter === "notes" || filter === "bible" ? filter : "all",
			page: Math.max(1, Number(search["page"] ?? 1) || 1),
		};
	},
	head: () => ({
		meta: [
			{ title: "Buscar — Biblia + Notas" },
			{
				name: "description",
				content:
					"Busca en el texto completo de la Reina-Valera 1865 y en las notas de estudio de Leonardo Moreno.",
			},
			{ property: "og:title", content: "Buscar — Biblia + Notas" },
			{
				property: "og:description",
				content: "Busca versículos y notas de estudio en la Reina-Valera 1865.",
			},
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
	}),
	component: SearchPage,
});

function Highlight({ text, query }: { text: string; query: string }) {
	const i = query ? norm(text).indexOf(norm(query)) : -1;
	if (i < 0) return <>{text}</>;
	return (
		<>
			{text.slice(0, i)}
			<mark className="rounded bg-amber-500/25 px-0.5 font-semibold text-amber-800 dark:bg-amber-400/25 dark:text-amber-200">
				{text.slice(i, i + query.length)}
			</mark>
			{text.slice(i + query.length)}
		</>
	);
}

function SearchPage() {
	const { q, filter, page } = Route.useSearch();
	const navigate = useNavigate({ from: "/buscar" });
	const [input, setInput] = useState(q);

	const notes = useQuery(studyNotesQuery);
	const books = useQuery({ ...allBooksQuery, enabled: q.trim().length >= 3 });

	const query = q.trim();

	const noteHits = useMemo(
		() => (filter === "bible" ? [] : searchNotes(notes.data, query, true)),
		[notes.data, query, filter],
	);
	const verseHits = useMemo(
		() => (filter === "notes" ? [] : searchVerses(books.data ?? [], query, true)),
		[books.data, query, filter],
	);

	const results: Hit[] = useMemo(() => [...noteHits, ...verseHits], [noteHits, verseHits]);
	const total = results.length;
	const pages = Math.max(1, Math.ceil(total / PER_PAGE));
	const current = Math.min(page, pages);
	const pageHits = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);

	const setSearch = (next: Partial<SearchParams>) =>
		navigate({ search: (prev) => ({ ...prev, page: 1, ...next }) });

	const loading = query.length >= 3 && (books.isLoading || notes.isLoading);

	const filters: { key: Filter; label: string }[] = [
		{ key: "all", label: "Todos" },
		{ key: "notes", label: "Notas" },
		{ key: "bible", label: "Biblia" },
	];

	return (
		<div className="min-h-screen bg-background">
			<SiteHeader rightLink={{ to: "/", label: "Inicio" }} />

			<main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-6">
				<h1 className="text-2xl font-bold tracking-tight text-foreground">Buscar</h1>

				<form
					className="mt-4 flex items-center gap-2 rounded-full bg-muted px-4 py-2.5"
					onSubmit={(e) => {
						e.preventDefault();
						setSearch({ q: input.trim() });
					}}
				>
					<Search className="h-4 w-4 shrink-0 opacity-60" />
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Buscar..."
						aria-label="Buscar"
						className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
					/>
				</form>

				<div className="mt-4 flex items-center gap-2">
					{filters.map((f) => (
						<button
							key={f.key}
							type="button"
							onClick={() => setSearch({ filter: f.key })}
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

				<p className="mt-6 text-sm text-muted-foreground">
					{query.length < 3
						? "Escribe al menos 3 caracteres para buscar."
						: loading
							? "Buscando en toda la Biblia y las notas…"
							: `${total} resultado${total === 1 ? "" : "s"} encontrado${total === 1 ? "" : "s"} para “${query}”`}
				</p>

				<ul className="mt-6 divide-y divide-border">
					{pageHits.map((h) => (
						<li key={h.key}>
							<Link
								to="/leer/$libro/$cap"
								params={{ libro: slugifyBook(h.book), cap: String(h.chapter) }}
								hash={h.verse ? `verse-${h.verse}` : "notas"}
								className="flex items-start gap-3 py-4 transition-colors hover:bg-muted/40"
							>
								{h.verse ? (
									<BookOpen className="mt-1 h-4 w-4 shrink-0 opacity-60" />
								) : (
									<NotebookPen className="mt-1 h-4 w-4 shrink-0 opacity-60" />
								)}
								<span className="min-w-0">
									<span className="block text-sm font-semibold text-foreground">
										{h.book} {h.chapter}
										{h.verse ? `:${h.verse}` : ""}
									</span>
									<span className="mt-1 block text-[15px] leading-relaxed text-foreground/80">
										<Highlight text={h.snippet} query={query} />
									</span>
								</span>
							</Link>
						</li>
					))}
				</ul>

				{pages > 1 ? (
					<div className="mt-8 flex items-center justify-between gap-4">
						<button
							type="button"
							disabled={current <= 1}
							onClick={() => navigate({ search: (p) => ({ ...p, page: current - 1 }) })}
							className="rounded-full bg-muted px-4 py-2 text-sm font-medium disabled:opacity-40"
						>
							Anterior
						</button>
						<span className="text-sm text-muted-foreground">
							Página {current} de {pages}
						</span>
						<button
							type="button"
							disabled={current >= pages}
							onClick={() => navigate({ search: (p) => ({ ...p, page: current + 1 }) })}
							className="rounded-full bg-muted px-4 py-2 text-sm font-medium disabled:opacity-40"
						>
							Siguiente
						</button>
					</div>
				) : null}
			</main>
		</div>
	);
}
