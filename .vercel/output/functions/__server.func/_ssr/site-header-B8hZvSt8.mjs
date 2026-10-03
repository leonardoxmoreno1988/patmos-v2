import { i as __toESM } from "../_runtime.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { o as fetchBook, r as CHAPTER_COUNTS, s as slugifyBook, t as BOOKS } from "./bible-CwIUYS_X.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as RESOURCES, c as studyNotesQuery, l as supabase, u as useAuth } from "./notes-BgCmovsq.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as ArrowRight, C as Circle, D as Check, _ as History, b as CreditCard, c as Search, d as NotebookPen, f as Moon, g as Library, h as LoaderCircle, k as BookOpen, m as LogOut, n as Trash2, r as Sun, s as Settings, t as X, w as ChevronRight, y as Download } from "../_libs/lucide-react.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as twMerge } from "../_libs/streamdown+[...].mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { i as Trigger$1, n as List, r as Root2$1, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-B8hZvSt8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Official PATMOS typography logo, shared by the site header and the Consultas
* Patmos panel so both stay pixel-identical. The source SVG carries no intrinsic
* size, so we pin its viewBox ratio (105.62 x 14.77) and let callers set the height.
* The wordmark is dark navy: in dark mode we flatten it to white with a filter
* instead of shipping a second asset.
*/
function PatmosWordmark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo-patmos.svg",
		alt: "Patmos",
		className: `w-auto self-start object-contain aspect-[105.62/14.77] dark:brightness-0 dark:invert ${className ?? "h-4"}`
	});
}
function ThemeToggle() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem("cb-theme");
		const prefers = stored === "dark" || !stored && window.matchMedia("(prefers-color-scheme: dark)").matches;
		setDark(prefers);
		document.documentElement.classList.toggle("dark", prefers);
	}, []);
	const toggle = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("cb-theme", next ? "dark" : "light");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		"aria-label": dark ? "Activar modo claro" : "Activar modo oscuro",
		className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-transparent p-2 text-[#000f37] transition-colors hover:bg-accent/50 hover:text-foreground dark:text-white dark:hover:text-white/80",
		children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-[18px] w-[18px]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-[18px] w-[18px]" })
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Command$1 = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
	ref,
	className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
	...props
}));
Command$1.displayName = _e.displayName;
var CommandInput = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex items-center border-b px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
		ref,
		className: cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	})]
}));
CommandInput.displayName = _e.Input.displayName;
var CommandList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
	ref,
	className: cn("overflow-y-auto overflow-x-hidden", className),
	...props
}));
CommandList.displayName = _e.List.displayName;
var CommandEmpty = import_react.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
	ref,
	className: "py-6 text-center text-sm",
	...props
}));
CommandEmpty.displayName = _e.Empty.displayName;
var CommandGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
	ref,
	className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
	...props
}));
CommandGroup.displayName = _e.Group.displayName;
var CommandSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
	ref,
	className: cn("-mx-1 h-px bg-border", className),
	...props
}));
CommandSeparator.displayName = _e.Separator.displayName;
var CommandItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
	ref,
	className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className),
	...props
}));
CommandItem.displayName = _e.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
		...props
	});
};
CommandShortcut.displayName = "CommandShortcut";
/** Lowercases and strips accents while preserving string length (indices stay aligned). */
var norm = (s) => Array.from(s).map((ch) => {
	const base = ch.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	return (base === "" ? ch : base[0]).toLowerCase();
}).join("");
var stripHtml = (html) => html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s{2,}/g, " ").trim();
var escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Whole-word matcher: "mar" matches "mar," or "(mar)" but never "tomaron". */
function queryRegex(q) {
	return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(norm(q.trim()))}(?![\\p{L}\\p{N}])`, "u");
}
/** Index of the first whole-word match of `query` inside `text`, or -1. */
function matchIndex(text, query) {
	const q = query.trim();
	if (!q) return -1;
	return norm(text).search(queryRegex(q));
}
/** Returns a snippet around the first match. `pad` controls the context size. */
function snippet(text, query, pad = 45, tail = 75) {
	const i = matchIndex(text, query);
	if (i < 0) return text.slice(0, pad + tail);
	const start = Math.max(0, i - pad);
	const end = Math.min(text.length, i + query.trim().length + tail);
	return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}
function searchNotes(notes, q, full = false) {
	if (q.trim().length < 3 || !notes) return [];
	const re = queryRegex(q);
	const out = [];
	for (const [key, html] of Object.entries(notes)) {
		const text = stripHtml(html);
		const idx = key.lastIndexOf("-");
		const bookName = key.slice(0, idx);
		const chapter = Number(key.slice(idx + 1));
		const titleMatch = re.test(norm(bookName)) || re.test(String(chapter));
		const bodyMatch = re.test(norm(text));
		if (titleMatch || bodyMatch) out.push({
			key: `note-${key}`,
			book: bookName,
			chapter,
			snippet: full ? snippet(text, q, 120, 220) : snippet(text, q),
			score: (titleMatch ? 2 : 0) + (bodyMatch ? 1 : 0)
		});
	}
	return out.sort((a, b) => b.score - a.score);
}
function searchVerses(books, q, full = false) {
	if (q.trim().length < 3) return [];
	const re = queryRegex(q);
	const out = [];
	for (const book of books) for (const ch of book.chapters) for (const v of ch.verses) {
		const titleMatch = re.test(norm(book.name)) || `${ch.chapter}:${v.verse}` === q.trim() || re.test(String(ch.chapter));
		const bodyMatch = re.test(norm(v.text));
		if (titleMatch || bodyMatch) out.push({
			key: `v-${book.bookid}-${ch.chapter}-${v.verse}`,
			book: book.name,
			chapter: ch.chapter,
			verse: v.verse,
			snippet: full ? v.text : snippet(v.text, q),
			score: (titleMatch ? 2 : 0) + (bodyMatch ? 1 : 0)
		});
	}
	return out.sort((a, b) => b.score - a.score);
}
/** Fetches every book (bounded concurrency) so the search page can scan the whole Bible. */
async function fetchAllBooks() {
	const out = [];
	const queue = [...BOOKS];
	const workers = Array.from({ length: 8 }, async () => {
		for (;;) {
			const book = queue.shift();
			if (!book) return;
			try {
				out.push({
					bookid: book.bookid,
					name: book.name,
					chapters: await fetchBook(book.bookid)
				});
			} catch {}
		}
	});
	await Promise.all(workers);
	return out.sort((a, b) => a.bookid - b.bookid);
}
var allBooksQuery = {
	queryKey: ["bible", "all-books"],
	queryFn: fetchAllBooks,
	staleTime: Infinity,
	gcTime: Infinity
};
function Highlight({ text, query }) {
	const q = query.trim();
	const i = matchIndex(text, q);
	if (i < 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		text.slice(0, i),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded bg-amber-500/20 px-1 font-medium text-amber-800 dark:text-amber-300",
			children: text.slice(i, i + q.length)
		}),
		text.slice(i + q.length)
	] });
}
/** Parses queries like "Joel 1" or "Revelación 22:3" into a direct navigation target. */
function parseReference(query) {
	const m = /^\s*(\d?\s?[a-záéíóúñ.]+(?:\s[a-záéíóúñ]+)?)\s*(\d+)?\s*(?::\s*(\d+))?\s*$/i.exec(query);
	if (!m) return null;
	const name = norm(m[1] ?? "").trim();
	if (!name) return null;
	const book = BOOKS.find((b) => norm(b.name) === name) ?? BOOKS.find((b) => norm(b.name).startsWith(name));
	if (!book) return null;
	return {
		book,
		chapter: Math.min(Math.max(Number(m[2] ?? 1), 1), CHAPTER_COUNTS[book.bookid] ?? 1),
		verse: m[3] ? Number(m[3]) : void 0
	};
}
function GlobalSearch({ open, onOpenChange }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const navigate = useNavigate();
	const notes = useQuery({
		...studyNotesQuery,
		enabled: open
	});
	const allBooks = useQuery({
		...allBooksQuery,
		enabled: open
	});
	(0, import_react.useEffect)(() => {
		if (!open) {
			setQuery("");
			setFilter("all");
		}
	}, [open]);
	const q = query.trim();
	const direct = (0, import_react.useMemo)(() => q.length >= 2 ? parseReference(q) : null, [q]);
	const allNoteHits = (0, import_react.useMemo)(() => searchNotes(notes.data, q), [notes.data, q]);
	const allVerseHits = (0, import_react.useMemo)(() => allBooks.data ? searchVerses(allBooks.data, q) : [], [allBooks.data, q]);
	const visibleNoteHits = (0, import_react.useMemo)(() => {
		if (filter === "bible") return [];
		return allNoteHits.slice(0, 5);
	}, [allNoteHits, filter]);
	const visibleVerseHits = (0, import_react.useMemo)(() => {
		if (filter === "notes") return [];
		return allVerseHits.slice(0, 5);
	}, [allVerseHits, filter]);
	const totalCount = filter === "all" ? allNoteHits.length + allVerseHits.length : filter === "notes" ? allNoteHits.length : allVerseHits.length;
	const hasMore = q.length >= 3;
	const go = (book, chapter, verse, notes = false) => {
		onOpenChange(false);
		navigate({
			to: "/leer/$libro/$cap",
			params: {
				libro: slugifyBook(book),
				cap: String(chapter)
			},
			...verse ? { hash: `verse-${verse}` } : notes ? { hash: "notas" } : {}
		});
	};
	const goToSearchPage = () => {
		if (typeof window !== "undefined" && window.umami) window.umami.track("Search", { query: q });
		onOpenChange(false);
		navigate({
			to: "/buscar",
			search: {
				q,
				filter,
				page: 1
			}
		});
	};
	const empty = q.length >= 2 && !direct && visibleNoteHits.length === 0 && visibleVerseHits.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: cn("flex flex-col overflow-hidden p-0 gap-0 h-[100dvh] w-full justify-between bg-white dark:bg-slate-900", "max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:top-0 max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0", "sm:h-auto sm:max-h-[85vh] sm:max-w-2xl sm:rounded-2xl"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, {
				shouldFilter: false,
				className: "flex flex-col h-full [&_[cmdk-group-heading]]:mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
						value: query,
						onValueChange: setQuery,
						placeholder: "Buscar...",
						className: "text-base shrink-0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex shrink-0 items-center gap-2 px-3 py-2",
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
							onClick: () => setFilter(f.key),
							className: cn("rounded-full border-0 px-3 py-1 text-sm font-medium transition-colors", filter === f.key ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"),
							children: f.label
						}, f.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
						className: "flex-1 min-h-0 max-h-none h-full overflow-y-auto",
						children: [
							empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: "No se encontraron resultados." }) : null,
							direct ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
								heading: "Navegación directa",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
									value: `nav-${direct.book.name}-${direct.chapter}`,
									onSelect: () => go(direct.book.name, direct.chapter, direct.verse),
									className: "items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mt-0.5 h-4 w-4 shrink-0 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-semibold text-foreground",
										children: [
											direct.book.name,
											" ",
											direct.chapter,
											direct.verse ? `:${direct.verse}` : ""
										]
									})]
								})
							}) : null,
							visibleNoteHits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
								heading: "Notas de estudio",
								children: visibleNoteHits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
									value: h.key,
									onSelect: () => go(h.book, h.chapter, void 0, true),
									className: "items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "mt-0.5 h-4 w-4 shrink-0 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-sm font-semibold text-foreground",
											children: [
												h.book,
												" ",
												h.chapter
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm leading-relaxed text-muted-foreground line-clamp-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
												text: h.snippet,
												query: q
											})
										})]
									})]
								}, h.key))
							}) : null,
							visibleVerseHits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
								heading: "Texto bíblico",
								children: visibleVerseHits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
									value: h.key,
									onSelect: () => go(h.book, h.chapter, h.verse),
									className: "items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "mt-0.5 h-4 w-4 shrink-0 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-sm font-semibold text-foreground",
											children: [
												h.book,
												" ",
												h.chapter,
												":",
												h.verse
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm leading-relaxed text-muted-foreground line-clamp-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
												text: h.snippet,
												query: q
											})
										})]
									})]
								}, h.key))
							}) : null
						]
					}),
					hasMore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-shrink-0 mt-auto w-full border-t border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: goToSearchPage,
							className: "mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/20 hover:bg-foreground/[0.08] dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10",
							children: [
								"Ver todos los ",
								totalCount,
								" resultados para “",
								q,
								"”",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 shrink-0 opacity-60" })
							]
						})
					}) : null
				]
			})
		})
	});
}
function SearchTrigger({ onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-label": "Buscar",
		className: "hidden sm:flex h-9 items-center gap-2 rounded-full border border-foreground/15 px-4 text-sm text-muted-foreground transition-colors hover:border-foreground/30 min-w-[180px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Buscar..." })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-label": "Buscar",
		className: "grid sm:hidden h-10 w-10 shrink-0 place-items-center rounded-lg bg-transparent p-2 text-[#000f37] transition-colors hover:bg-accent/50 hover:text-foreground dark:text-white dark:hover:text-white/80",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-[18px] w-[18px]" })
	})] });
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Tabs = Root2$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger$1.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "h-4 w-4",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.8l4-3.1Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 4.7c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.7 12 4.7Z"
			})
		]
	});
}
function AuthModal({ open, onOpenChange, defaultTab = "signin" }) {
	const { signInWithEmail, signUpWithEmail, signInWithGoogle, user } = useAuth();
	const [tab, setTab] = (0, import_react.useState)(defaultTab);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [googleBusy, setGoogleBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [info, setInfo] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (open) setTab(defaultTab);
	}, [open, defaultTab]);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setError(null);
			setInfo(null);
			setPassword("");
			setBusy(false);
			setGoogleBusy(false);
		}
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (user && open) onOpenChange(false);
	}, [
		user,
		open,
		onOpenChange
	]);
	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);
		setInfo(null);
		setBusy(true);
		try {
			if (tab === "signin") await signInWithEmail(email.trim(), password);
			else {
				const { needsConfirmation } = await signUpWithEmail(email.trim(), password, name.trim() || void 0);
				if (needsConfirmation) setInfo("Revisa tu correo para confirmar la cuenta y luego inicia sesión.");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Algo salió mal. Intenta de nuevo.");
		} finally {
			setBusy(false);
		}
	}
	async function handleGoogle() {
		setError(null);
		setGoogleBusy(true);
		try {
			await signInWithGoogle();
		} catch (err) {
			setError(err instanceof Error ? err.message : "No se pudo continuar con Google.");
			setGoogleBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-[420px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Tu cuenta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Entra o crea una cuenta para guardar tu progreso de lectura." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: tab,
					onValueChange: (v) => setTab(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid w-full grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "signin",
							children: "Iniciar Sesión"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "signup",
							children: "Registrarse"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "signup",
								className: "m-0 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "auth-name",
									children: "Nombre"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "auth-name",
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "Tu nombre",
									autoComplete: "name"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "auth-email",
									children: "Correo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "auth-email",
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "tu@correo.com",
									autoComplete: "email"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "auth-password",
									children: "Contraseña"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "auth-password",
									type: "password",
									required: true,
									minLength: 6,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "••••••••",
									autoComplete: tab === "signin" ? "current-password" : "new-password"
								})]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-destructive",
								role: "alert",
								children: error
							}) : null,
							info ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: info
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "w-full dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
								disabled: busy,
								children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, tab === "signin" ? "Iniciar Sesión" : "Crear cuenta"]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-wider text-muted-foreground/70",
							children: "o"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					className: "w-full gap-2",
					onClick: handleGoogle,
					disabled: googleBusy,
					children: [googleBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), "Continuar con Google"]
				})
			]
		})
	});
}
function AccountModal({ open, onOpenChange }) {
	const { user, displayName, updateProfile, changePassword, deleteAccount } = useAuth();
	const [name, setName] = (0, import_react.useState)(displayName);
	const [profileBusy, setProfileBusy] = (0, import_react.useState)(false);
	const [profileMsg, setProfileMsg] = (0, import_react.useState)(null);
	const [profileErr, setProfileErr] = (0, import_react.useState)(null);
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [passBusy, setPassBusy] = (0, import_react.useState)(false);
	const [passMsg, setPassMsg] = (0, import_react.useState)(null);
	const [passErr, setPassErr] = (0, import_react.useState)(null);
	const [confirmStep, setConfirmStep] = (0, import_react.useState)(0);
	const [confirmText, setConfirmText] = (0, import_react.useState)("");
	const [deleteBusy, setDeleteBusy] = (0, import_react.useState)(false);
	const [deleteErr, setDeleteErr] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (open) {
			setName(displayName);
			setProfileMsg(null);
			setProfileErr(null);
			setPassword("");
			setConfirm("");
			setPassMsg(null);
			setPassErr(null);
			setConfirmStep(0);
			setConfirmText("");
			setDeleteErr(null);
		}
	}, [open, displayName]);
	async function handleProfile(e) {
		e.preventDefault();
		setProfileErr(null);
		setProfileMsg(null);
		setProfileBusy(true);
		try {
			await updateProfile(name.trim());
			setProfileMsg("Nombre actualizado.");
		} catch (err) {
			setProfileErr(err instanceof Error ? err.message : "No se pudo guardar.");
		} finally {
			setProfileBusy(false);
		}
	}
	async function handlePassword(e) {
		e.preventDefault();
		setPassErr(null);
		setPassMsg(null);
		if (password !== confirm) {
			setPassErr("Las contraseñas no coinciden.");
			return;
		}
		setPassBusy(true);
		try {
			await changePassword(password);
			setPassword("");
			setConfirm("");
			setPassMsg("Contraseña actualizada.");
		} catch (err) {
			setPassErr(err instanceof Error ? err.message : "No se pudo cambiar la contraseña.");
		} finally {
			setPassBusy(false);
		}
	}
	async function handleDelete() {
		setDeleteErr(null);
		setDeleteBusy(true);
		try {
			await deleteAccount();
			onOpenChange(false);
		} catch (err) {
			setDeleteErr(err instanceof Error ? err.message : "No se pudo eliminar la cuenta. Escríbenos y lo hacemos por ti.");
		} finally {
			setDeleteBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-[460px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Mi Cuenta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: user?.email })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "perfil",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid w-full grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "perfil",
								children: "Perfil"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "seguridad",
								children: "Seguridad"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "peligro",
								children: "Peligro"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "perfil",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleProfile,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "acc-name",
										children: "Nombre visible"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "acc-name",
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Tu nombre"
									})]
								}),
								profileErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-destructive",
									children: profileErr
								}) : null,
								profileMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: profileMsg
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: profileBusy || !name.trim(),
									className: "dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
									children: [profileBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, "Guardar"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "seguridad",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handlePassword,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "acc-pass",
										children: "Nueva contraseña"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "acc-pass",
										type: "password",
										minLength: 6,
										required: true,
										value: password,
										onChange: (e) => setPassword(e.target.value),
										autoComplete: "new-password"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "acc-pass2",
										children: "Repetir contraseña"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "acc-pass2",
										type: "password",
										minLength: 6,
										required: true,
										value: confirm,
										onChange: (e) => setConfirm(e.target.value),
										autoComplete: "new-password"
									})]
								}),
								passErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-destructive",
									children: passErr
								}) : null,
								passMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: passMsg
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: passBusy,
									className: "dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
									children: [passBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, "Cambiar contraseña"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "peligro",
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Eliminar tu cuenta borra tu acceso de forma permanente. Esta acción no se puede deshacer."
							}),
							confirmStep === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								onClick: () => setConfirmStep(1),
								children: "Eliminar mi cuenta"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 rounded-lg border border-destructive/40 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "acc-confirm",
										children: [
											"Escribe ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: "ELIMINAR"
											}),
											" para confirmar"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "acc-confirm",
										value: confirmText,
										onChange: (e) => setConfirmText(e.target.value),
										placeholder: "ELIMINAR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "destructive",
											disabled: confirmText.trim().toUpperCase() !== "ELIMINAR" || deleteBusy,
											onClick: handleDelete,
											children: [deleteBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, "Confirmar eliminación"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											onClick: () => setConfirmStep(0),
											children: "Cancelar"
										})]
									})
								]
							}),
							deleteErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-destructive",
								children: deleteErr
							}) : null
						]
					})
				]
			})]
		})
	});
}
var Sheet = Dialog$1;
var SheetPortal = DialogPortal$1;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay$1.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent$1.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle$1.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription$1.displayName;
var HIGHLIGHT_COLORS = [
	"yellow",
	"green",
	"blue",
	"pink"
];
var HIGHLIGHT_CLASS = {
	yellow: "bg-amber-300/45 dark:bg-amber-400/25",
	green: "bg-emerald-300/45 dark:bg-emerald-400/25",
	blue: "bg-sky-300/45 dark:bg-sky-400/25",
	pink: "bg-pink-300/45 dark:bg-pink-400/25"
};
var HIGHLIGHT_SWATCH = {
	yellow: "bg-amber-400",
	green: "bg-emerald-400",
	blue: "bg-sky-400",
	pink: "bg-pink-400"
};
var HIGHLIGHT_LABEL = {
	yellow: "Amarillo",
	green: "Verde",
	blue: "Azul",
	pink: "Rosa"
};
var empty = () => ({
	highlights: {},
	notes: {},
	bookmarks: {}
});
var byVerse = (rows) => Object.fromEntries((rows ?? []).map((r) => [r.verse, r]));
async function fetchChapterMarks(userId, book, chapter) {
	const [highlights, notes, bookmarks] = await Promise.all([
		supabase.from("user_highlights").select("id, book, chapter, verse, color, created_at").eq("user_id", userId).eq("book", book).eq("chapter", chapter),
		supabase.from("user_notes").select("*").eq("user_id", userId).eq("book", book).eq("chapter", chapter),
		supabase.from("user_bookmarks").select("id, book, chapter, verse, created_at").eq("user_id", userId).eq("book", book).eq("chapter", chapter)
	]);
	if (highlights.error) throw friendly(highlights.error);
	if (notes.error) throw friendly(notes.error);
	return {
		highlights: byVerse(highlights.data),
		notes: byVerse(notes.data),
		bookmarks: bookmarks.error ? {} : byVerse(bookmarks.data)
	};
}
function friendly(error) {
	const code = error.code ?? "";
	if (code === "42P01") return /* @__PURE__ */ new Error("Falta crear esta tabla en la base de datos.");
	if (code === "42501" || code === "PGRST301") return /* @__PURE__ */ new Error("Inicia sesión de nuevo para guardar tus marcas.");
	return new Error(error.message || "No pudimos guardar el cambio.");
}
var chapterMarksQuery = (userId, book, chapter) => ({
	queryKey: [
		"user-marks",
		userId,
		book,
		chapter
	],
	queryFn: () => userId ? fetchChapterMarks(userId, book, chapter) : Promise.resolve(empty()),
	enabled: !!userId,
	staleTime: 3e4
});
async function fetchLibrary(userId) {
	const order = {
		column: "created_at",
		ascending: false
	};
	const [bookmarks, highlights, notes] = await Promise.all([
		supabase.from("user_bookmarks").select("id, book, chapter, verse, created_at").eq("user_id", userId).order(order.column, { ascending: order.ascending }),
		supabase.from("user_highlights").select("id, book, chapter, verse, color, created_at").eq("user_id", userId).order(order.column, { ascending: order.ascending }),
		supabase.from("user_notes").select("*").eq("user_id", userId).order(order.column, { ascending: order.ascending })
	]);
	if (highlights.error) throw friendly(highlights.error);
	if (notes.error) throw friendly(notes.error);
	return {
		bookmarks: bookmarks.error ? [] : bookmarks.data ?? [],
		highlights: highlights.data ?? [],
		notes: notes.data ?? []
	};
}
var libraryQuery = (userId) => ({
	queryKey: ["user-library", userId],
	queryFn: () => userId ? fetchLibrary(userId) : Promise.resolve({
		bookmarks: [],
		highlights: [],
		notes: []
	}),
	enabled: !!userId,
	staleTime: 3e4
});
async function deleteMarksByIds(table, ids) {
	if (ids.length === 0) return;
	const { data } = await supabase.auth.getSession();
	const user_id = data.session?.user?.id;
	if (!user_id) throw new Error("Inicia sesión para editar tu biblioteca.");
	const { error } = await supabase.from(table).delete().in("id", ids).eq("user_id", user_id);
	if (error) throw friendly(error);
}
async function sessionUserId(fallback) {
	const { data } = await supabase.auth.getSession();
	const id = data.session?.user?.id;
	if (!id) throw new Error("Inicia sesión para guardar tus marcas.");
	return id || fallback;
}
async function setHighlight(t, color) {
	const user_id = await sessionUserId(t.userId);
	const { error } = await supabase.from("user_highlights").upsert({
		user_id,
		book: t.book,
		chapter: t.chapter,
		verse: t.verse,
		color
	}, { onConflict: "user_id,book,chapter,verse" });
	if (error) throw friendly(error);
}
async function removeHighlight(t) {
	const user_id = await sessionUserId(t.userId);
	const { error } = await supabase.from("user_highlights").delete().eq("user_id", user_id).eq("book", t.book).eq("chapter", t.chapter).eq("verse", t.verse);
	if (error) throw friendly(error);
}
async function saveNote(t, content, verses = [t.verse]) {
	const user_id = await sessionUserId(t.userId);
	const sorted = [...new Set(verses)].sort((a, b) => a - b);
	const base = {
		user_id,
		book: t.book,
		chapter: t.chapter,
		verse: sorted[0] ?? t.verse,
		content
	};
	const opts = { onConflict: "user_id,book,chapter,verse" };
	let { error } = await supabase.from("user_notes").upsert({
		...base,
		end_verse: sorted[sorted.length - 1] ?? t.verse,
		verses: sorted
	}, opts);
	if (error && (error.code === "42703" || error.code === "PGRST204")) {
		({error} = await supabase.from("user_notes").upsert(base, opts));
		if (error) throw friendly(error);
		return { rangeSaved: false };
	}
	if (error) throw friendly(error);
	return { rangeSaved: true };
}
async function deleteNote(t) {
	const user_id = await sessionUserId(t.userId);
	const { error } = await supabase.from("user_notes").delete().eq("user_id", user_id).eq("book", t.book).eq("chapter", t.chapter).eq("verse", t.verse);
	if (error) throw friendly(error);
}
async function toggleBookmark(t, on) {
	const user_id = await sessionUserId(t.userId);
	if (on) {
		const { error } = await supabase.from("user_bookmarks").upsert({
			user_id,
			book: t.book,
			chapter: t.chapter,
			verse: t.verse
		}, { onConflict: "user_id,book,chapter,verse" });
		if (error) throw friendly(error);
		return;
	}
	const { error } = await supabase.from("user_bookmarks").delete().eq("user_id", user_id).eq("book", t.book).eq("chapter", t.chapter).eq("verse", t.verse);
	if (error) throw friendly(error);
}
function groupContiguous(rows) {
	const sorted = [...rows].sort((a, b) => a.book.localeCompare(b.book) || a.chapter - b.chapter || a.verse - b.verse || a.created_at.localeCompare(b.created_at));
	const groups = [];
	for (const row of sorted) {
		const last = groups[groups.length - 1];
		if (last && last.book === row.book && last.chapter === row.chapter && last.color === row.color && last.endVerse === row.verse - 1) {
			last.endVerse = row.verse;
			last.ids.push(row.id);
			continue;
		}
		groups.push({
			id: row.id,
			ids: [row.id],
			book: row.book,
			chapter: row.chapter,
			verse: row.verse,
			endVerse: row.verse,
			...row.color ? { color: row.color } : {}
		});
	}
	return groups.reverse();
}
function LibrarySheet({ open, onOpenChange }) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery(libraryQuery(user?.id ?? null));
	const remove = useMutation({
		mutationFn: ({ table, ids }) => deleteMarksByIds(table, ids),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user-library"] });
			queryClient.invalidateQueries({ queryKey: ["user-marks"] });
			toast.success("Eliminado");
		},
		onError: (error) => toast.error(error.message)
	});
	function go(item) {
		onOpenChange(false);
		navigate({
			to: "/leer/$libro/$cap",
			params: {
				libro: slugifyBook(item.book),
				cap: String(item.chapter)
			},
			hash: `verse-${item.verse}`
		});
	}
	function renderList(items, table, emptyText) {
		if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-1 py-8 text-sm text-muted-foreground",
			children: "Cargando…"
		});
		if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-1 py-8 text-sm text-muted-foreground",
			children: emptyText
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group flex items-start gap-3 rounded-lg bg-foreground/[0.03] p-3 transition-colors hover:bg-foreground/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => go(item),
					className: "flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left",
					children: [item.color ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mt-1 h-3 w-3 shrink-0 rounded-full ${HIGHLIGHT_SWATCH[item.color]}` }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-sm font-semibold text-foreground",
							children: [
								item.book,
								" ",
								item.chapter,
								":",
								item.verse,
								item.endVerse && item.endVerse !== item.verse ? `–${item.endVerse}` : ""
							]
						}), item.preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 line-clamp-2 block text-sm text-muted-foreground",
							children: item.preview
						}) : null]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Eliminar",
					onClick: () => remove.mutate({
						table,
						ids: item.ids ?? [item.id]
					}),
					className: "shrink-0 cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})]
			}) }, item.id))
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "flex w-full flex-col gap-0 sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
				className: "mb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Mi Biblioteca" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "bookmarks",
				className: "flex min-h-0 flex-1 flex-col px-4 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "grid w-full grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "bookmarks",
							children: "Marcadores"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "highlights",
							children: "Resaltados"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "notes",
							children: "Notas"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 min-h-0 flex-1 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "bookmarks",
							children: renderList(groupContiguous(data?.bookmarks ?? []), "user_bookmarks", "Aún no tienes marcadores guardados.")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "highlights",
							children: renderList(groupContiguous(data?.highlights ?? []), "user_highlights", "Aún no tienes resaltados guardados.")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "notes",
							children: renderList((data?.notes ?? []).map((n) => ({
								...n,
								preview: n.content,
								endVerse: n.end_verse ?? n.verses?.[n.verses.length - 1] ?? n.verse
							})), "user_notes", "Aún no tienes notas guardadas.")
						})
					]
				})]
			})]
		})
	});
}
/** Ventana de descargas: E-books y material de estudio gratuito. */
function ResourcesSheet({ open, onOpenChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "flex w-full flex-col gap-0 sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Recursos" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
					className: "text-xs text-muted-foreground",
					children: "E-books y material de estudio para descargar."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto",
				children: RESOURCES.map((resource) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-4 rounded-lg bg-foreground/[0.03] p-4 dark:bg-white/[0.03]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: resource.cover,
						alt: `Portada de "${resource.title}"`,
						className: "h-28 w-20 shrink-0 object-cover",
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-semibold uppercase text-primary",
								children: "Recurso gratuito"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-semibold leading-snug text-foreground",
								children: resource.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "mt-4 dark:border-transparent dark:bg-white dark:text-slate-900 hover:dark:bg-slate-100",
								"data-umami-event": "Ebook Download",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: resource.url,
									target: "_blank",
									rel: "noopener noreferrer",
									children: "Descargar libro"
								})
							})
						]
					})]
				}, resource.id))
			})]
		})
	});
}
function AuthNav() {
	const { user, displayName, loading, signOut, isPremium } = useAuth();
	const navigate = useNavigate();
	const [authOpen, setAuthOpen] = (0, import_react.useState)(false);
	const [accountOpen, setAccountOpen] = (0, import_react.useState)(false);
	const [libraryOpen, setLibraryOpen] = (0, import_react.useState)(false);
	const [resourcesOpen, setResourcesOpen] = (0, import_react.useState)(false);
	const openBilling = async () => {
		const portal = window.open("", "_blank");
		try {
			const { data } = await supabase.auth.getSession();
			const token = data.session?.access_token;
			if (!token || !user) throw new Error();
			const res = await fetch("/api/billing", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ userId: user.id })
			});
			const result = await res.json();
			if (!res.ok || !result.url) throw new Error();
			if (portal) portal.location.href = result.url;
			else window.open(result.url, "_blank", "noopener,noreferrer");
		} catch {
			portal?.close();
			toast.error("No pudimos abrir la gestión de suscripción.");
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-20 animate-pulse rounded-full bg-foreground/5" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "outline",
		size: "sm",
		className: "h-9 rounded-full border border-foreground/15 px-3.5 text-sm font-medium shadow-none sm:px-5",
		onClick: () => setAuthOpen(true),
		children: "Iniciar Sesión"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
		open: authOpen,
		onOpenChange: setAuthOpen
	})] });
	const initial = displayName.charAt(0).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "ghost",
				className: "flex h-auto items-center gap-2 rounded-full py-1 pl-1 pr-2.5 text-sm font-medium text-foreground hover:bg-foreground/5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background",
						children: initial
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden max-w-[10rem] truncate sm:inline",
						children: displayName
					}),
					isPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden rounded-md border border-pro-badge-border bg-pro-badge px-2 py-0.5 text-[10px] font-bold tracking-wider text-pro-badge-foreground sm:inline",
						children: "PRO"
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
			align: "end",
			className: "w-64 p-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2.5 pb-2 pt-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted-foreground",
						children: user.email
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => {
						let libro = "genesis";
						let cap = "1";
						try {
							const saved = JSON.parse(localStorage.getItem("rv1865:last") ?? "null");
							if (typeof saved?.libro === "string" && typeof saved?.cap === "string") {
								libro = saved.libro;
								cap = saved.cap;
							}
						} catch {}
						navigate({
							to: "/leer/$libro/$cap",
							params: {
								libro,
								cap
							}
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}), " Lector Bíblico"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => {
						navigate({
							to: "/",
							search: { consulta: "history" }
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {}), " Historial de Consultas"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => setLibraryOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, {}), " Mi Biblioteca"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => setResourcesOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " Recursos"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => void openBilling(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {}), " Suscripción PRO"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => setAccountOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {}), " Ajustes de Cuenta"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					className: "text-destructive focus:text-destructive",
					onSelect: () => void signOut(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), "Cerrar Sesión"]
				})
			]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountModal, {
			open: accountOpen,
			onOpenChange: setAccountOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibrarySheet, {
			open: libraryOpen,
			onOpenChange: setLibraryOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourcesSheet, {
			open: resourcesOpen,
			onOpenChange: setResourcesOpen
		})
	] });
}
function SiteHeader({ rightLink }) {
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setSearchOpen((v) => !v);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "relative z-30 bg-background/80 backdrop-blur-xl sm:sticky sm:top-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 sm:gap-4 sm:px-6 sm:py-3.5 lg:py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "flex min-w-0 shrink-0 items-center cursor-pointer",
				"aria-label": "Patmos — inicio",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatmosWordmark, { className: "h-3.5 lg:h-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-1.5 sm:gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchTrigger, { onClick: () => setSearchOpen(true) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalSearch, {
						open: searchOpen,
						onOpenChange: setSearchOpen
					}),
					rightLink ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: rightLink.to,
						className: "cursor-pointer text-sm font-medium text-[#000f37] transition-opacity hover:opacity-80 dark:text-[#BBBECE]",
						children: rightLink.label
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthNav, {})
				]
			})]
		})
	});
}
//#endregion
export { matchIndex as C, searchVerses as D, searchNotes as E, setHighlight as O, deleteNote as S, saveNote as T, SheetTitle as _, DialogDescription as a, chapterMarksQuery as b, DialogTitle as c, HIGHLIGHT_LABEL as d, HIGHLIGHT_SWATCH as f, SheetDescription as g, SheetContent as h, DialogContent as i, toggleBookmark as k, HIGHLIGHT_CLASS as l, Sheet as m, Button as n, DialogFooter as o, PatmosWordmark as p, Dialog as r, DialogHeader as s, AuthModal as t, HIGHLIGHT_COLORS as u, SiteHeader as v, removeHighlight as w, cn as x, allBooksQuery as y };
