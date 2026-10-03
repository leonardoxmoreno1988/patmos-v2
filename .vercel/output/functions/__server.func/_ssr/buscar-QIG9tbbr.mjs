import { i as __toESM } from "../_runtime.mjs";
import { s as slugifyBook } from "./bible-CwIUYS_X.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as studyNotesQuery } from "./notes-BgCmovsq.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as Route$8 } from "./router-BGfEn2-O.mjs";
import { c as Search, d as NotebookPen, k as BookOpen } from "../_libs/lucide-react.mjs";
import { C as matchIndex, D as searchVerses, E as searchNotes, v as SiteHeader, x as cn, y as allBooksQuery } from "./site-header-B8hZvSt8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buscar-QIG9tbbr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PER_PAGE = 20;
function Highlight({ text, query }) {
	const q = query.trim();
	const i = matchIndex(text, q);
	if (i < 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		text.slice(0, i),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
			className: "rounded bg-amber-500/25 px-0.5 font-semibold text-amber-800 dark:bg-amber-400/25 dark:text-amber-200",
			children: text.slice(i, i + q.length)
		}),
		text.slice(i + q.length)
	] });
}
function SearchPage() {
	const { q, filter, page } = Route$8.useSearch();
	const navigate = useNavigate({ from: "/buscar" });
	const [input, setInput] = (0, import_react.useState)(q);
	const notes = useQuery(studyNotesQuery);
	const books = useQuery({
		...allBooksQuery,
		enabled: q.trim().length >= 3
	});
	const query = q.trim();
	const noteHits = (0, import_react.useMemo)(() => filter === "bible" ? [] : searchNotes(notes.data, query, true), [
		notes.data,
		query,
		filter
	]);
	const verseHits = (0, import_react.useMemo)(() => filter === "notes" ? [] : searchVerses(books.data ?? [], query, true), [
		books.data,
		query,
		filter
	]);
	const results = (0, import_react.useMemo)(() => [...noteHits, ...verseHits], [noteHits, verseHits]);
	const total = results.length;
	const pages = Math.max(1, Math.ceil(total / PER_PAGE));
	const current = Math.min(page, pages);
	const pageHits = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);
	const setSearch = (next) => navigate({ search: (prev) => ({
		...prev,
		page: 1,
		...next
	}) });
	const loading = query.length >= 3 && (books.isLoading || notes.isLoading);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { rightLink: {
			to: "/",
			label: "Inicio"
		} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-3xl px-6 pb-24 pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight text-foreground",
					children: "Buscar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 flex items-center gap-2 rounded-full bg-muted px-4 py-2.5",
					onSubmit: (e) => {
						e.preventDefault();
						const term = input.trim();
						if (typeof window !== "undefined" && window.umami) window.umami.track("Search", { query: term });
						setSearch({ q: term });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 shrink-0 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: "Buscar...",
						"aria-label": "Buscar",
						className: "w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex items-center gap-2",
					children: [
						{
							key: "all",
							label: "Todos"
						},
						{
							key: "notes",
							label: "Notas"
						},
						{
							key: "bible",
							label: "Biblia"
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSearch({ filter: f.key }),
						className: cn("rounded-full border-0 px-3 py-1 text-sm font-medium transition-colors", filter === f.key ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"),
						children: f.label
					}, f.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: query.length < 3 ? "Escribe al menos 3 caracteres para buscar." : loading ? "Buscando en toda la Biblia y las notas…" : `${total} resultado${total === 1 ? "" : "s"} encontrado${total === 1 ? "" : "s"} para “${query}”`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 divide-y divide-border",
					children: pageHits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/leer/$libro/$cap",
						params: {
							libro: slugifyBook(h.book),
							cap: String(h.chapter)
						},
						hash: h.verse ? `verse-${h.verse}` : "notas",
						className: "flex items-start gap-3 py-4 transition-colors hover:bg-muted/40",
						children: [h.verse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "mt-1 h-4 w-4 shrink-0 opacity-60" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "mt-1 h-4 w-4 shrink-0 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-sm font-semibold text-foreground",
								children: [
									h.book,
									" ",
									h.chapter,
									h.verse ? `:${h.verse}` : ""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-[15px] leading-relaxed text-foreground/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
									text: h.snippet,
									query
								})
							})]
						})]
					}) }, h.key))
				}),
				pages > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-between gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: current <= 1,
							onClick: () => navigate({ search: (p) => ({
								...p,
								page: current - 1
							}) }),
							className: "rounded-full bg-muted px-4 py-2 text-sm font-medium disabled:opacity-40",
							children: "Anterior"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted-foreground",
							children: [
								"Página ",
								current,
								" de ",
								pages
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: current >= pages,
							onClick: () => navigate({ search: (p) => ({
								...p,
								page: current + 1
							}) }),
							className: "rounded-full bg-muted px-4 py-2 text-sm font-medium disabled:opacity-40",
							children: "Siguiente"
						})
					]
				}) : null
			]
		})]
	});
}
//#endregion
export { SearchPage as component };
