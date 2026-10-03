import { i as __toESM } from "../_runtime.mjs";
import { a as bookQuery, i as bookFromSlug, o as fetchBook, s as slugifyBook, t as BOOKS } from "./bible-CwIUYS_X.mjs";
import { r as linkifyScriptureRefs, t as canonicalBook } from "./scripture-refs-Cn_GoRyO.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import "../_libs/@tanstack/react-store+[...].mjs";
import { c as useRouter } from "./server-CdxiqMkJ.mjs";
import { a as Link, d as useAuth, f as useNavigate, l as studyNotesQuery, s as getNote } from "./notes-D-G9D8nd.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as plainText, n as Route } from "./router-oxYdTyXd.mjs";
import { E as ChevronDown, O as Bookmark, S as Copy, T as ChevronLeft, d as NotebookPen, i as StickyNote, n as Trash2, p as MessageSquare, t as X, v as Eraser, w as ChevronRight } from "../_libs/lucide-react.mjs";
import { O as setHighlight, S as deleteNote, T as saveNote, b as chapterMarksQuery, c as DialogTitle, d as HIGHLIGHT_LABEL, f as HIGHLIGHT_SWATCH, i as DialogContent, k as toggleBookmark, l as HIGHLIGHT_CLASS, r as Dialog, s as DialogHeader, t as AuthModal, u as HIGHLIGHT_COLORS, v as SiteHeader, w as removeHighlight, x as cn } from "./site-header-Dovowwfd.mjs";
import { i as PopoverTrigger, n as Popover, r as PopoverContent, t as ConsultaPatmos } from "./consulta-patmos-B6OzrOoF.mjs";
import { n as Root2, r as Trigger, t as Content2 } from "../_libs/radix-ui__react-hover-card.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leer._libro._cap-PuTGNzkj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Subscribe to the router's state store with optional selection and
* structural sharing for render optimization.
*
* Options:
* - `select`: Project the full router state to a derived slice
* - `structuralSharing`: Replace-equal semantics for stable references
* - `router`: Read state from a specific router instance instead of context
*
* @returns The selected router state (or the full state by default).
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useRouterStateHook
*/
function useRouterState(opts) {
	const contextRouter = useRouter({ warn: opts?.router === void 0 });
	const router = opts?.router || contextRouter;
	{
		const state = router.stores.__store.get();
		return opts?.select ? opts.select(state) : state;
	}
}
var HoverCard = Root2;
var HoverCardTrigger = Trigger;
var HoverCardContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-hover-card-content-transform-origin)", className),
	...props
}));
HoverCardContent.displayName = Content2.displayName;
function formatVerseList(nums) {
	const sorted = [...new Set(nums)].sort((a, b) => a - b);
	if (sorted.length === 0) return "";
	const contiguous = sorted.every((n, i) => i === 0 || n === sorted[i - 1] + 1);
	if (sorted.length > 1 && contiguous) return `${sorted[0]}–${sorted[sorted.length - 1]}`;
	return sorted.join(", ");
}
function VerseActionBar({ userId, book, chapter, selection, marks, onClose, onRequireAuth, initialNoteOpen }) {
	const queryClient = useQueryClient();
	const [noteOpen, setNoteOpen] = (0, import_react.useState)(!!initialNoteOpen);
	const verseNums = selection.map((s) => s.verse).sort((a, b) => a - b);
	const first = verseNums[0];
	const label = `${book} ${chapter}:${formatVerseList(verseNums)}`;
	const targets = verseNums.map((verse) => ({
		userId: userId ?? "",
		book,
		chapter,
		verse
	}));
	const firstTarget = targets[0];
	const colors = verseNums.map((v) => marks.highlights[v]?.color);
	const currentColor = colors.every((c) => c && c === colors[0]) ? colors[0] : void 0;
	const anyHighlighted = colors.some(Boolean);
	const bookmarked = verseNums.every((v) => !!marks.bookmarks[v]);
	const existingNote = marks.notes[first]?.content ?? "";
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: [
			"user-marks",
			userId,
			book,
			chapter
		] });
		queryClient.invalidateQueries({ queryKey: ["user-library", userId] });
	};
	const run = useMutation({
		mutationFn: async (action) => action(),
		onSuccess: () => invalidate(),
		onError: (error) => toast.error(error.message || "No pudimos guardar el cambio.")
	});
	const guard = (action) => {
		if (!userId) {
			onRequireAuth();
			return;
		}
		action();
	};
	const pickColor = (color) => guard(() => run.mutate(() => Promise.all(targets.map((t) => currentColor === color ? removeHighlight(t) : setHighlight(t, color)))));
	const copyVerse = async () => {
		try {
			const text = selection.slice().sort((a, b) => a.verse - b.verse).map((s) => s.text).join(" ");
			await navigator.clipboard.writeText(`"${text}" (${label}, RV1865)`);
			toast.success(selection.length > 1 ? "Versículos copiados" : "Versículo copiado");
			onClose();
		} catch {
			toast.error("No pudimos copiar el versículo.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border/60 bg-popover/95 px-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 whitespace-nowrap px-2 text-xs font-semibold text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 h-6 w-px shrink-0 bg-border/70" }),
				HIGHLIGHT_COLORS.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Resaltar en ${HIGHLIGHT_LABEL[color]}`,
					onClick: () => pickColor(color),
					className: `grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform hover:scale-105 ${currentColor === color ? "ring-2 ring-foreground/60" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-5 w-5 rounded-full ${HIGHLIGHT_SWATCH[color]}` })
				}, color)),
				anyHighlighted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					label: "Quitar resaltado",
					onClick: () => guard(() => run.mutate(() => Promise.all(targets.map((t) => removeHighlight(t))))),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "h-[18px] w-[18px]" })
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-1 h-6 w-px shrink-0 bg-border/70" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					label: "Añadir nota",
					active: !!existingNote,
					onClick: () => guard(() => setNoteOpen(true)),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "h-[18px] w-[18px]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					label: bookmarked ? "Quitar marcador" : "Marcador",
					active: bookmarked,
					onClick: () => guard(() => run.mutate(() => Promise.all(targets.map((t) => toggleBookmark(t, !bookmarked))))),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: `h-[18px] w-[18px] ${bookmarked ? "fill-current" : ""}` })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					label: "Copiar versículo",
					onClick: () => void copyVerse(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-[18px] w-[18px]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					label: "Cerrar",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-[18px] w-[18px]" })
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteDialog, {
		open: noteOpen,
		onOpenChange: setNoteOpen,
		title: label,
		initial: existingNote,
		onSave: (content) => run.mutate(() => saveNote(firstTarget, content, verseNums), { onSuccess: (result) => {
			invalidate();
			setNoteOpen(false);
			const rangeSaved = result?.rangeSaved;
			if (verseNums.length > 1 && rangeSaved === false) toast.warning("Nota guardada solo en el primer versículo: falta actualizar la base de datos para guardar rangos.");
			else toast.success("Nota guardada");
		} }),
		onDelete: existingNote ? () => run.mutate(() => deleteNote(firstTarget), { onSuccess: () => {
			invalidate();
			setNoteOpen(false);
			toast.success("Nota eliminada");
		} }) : void 0,
		saving: run.isPending
	})] });
}
function IconButton({ label, onClick, active, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		onClick,
		className: `grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors hover:bg-accent ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
		children
	});
}
function NoteDialog({ open, onOpenChange, title, initial, onSave, onDelete, saving, readOnly }) {
	const [value, setValue] = (0, import_react.useState)(initial);
	(0, import_react.useEffect)(() => {
		if (open) setValue(initial);
	}, [open, initial]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "text-base",
					children: ["Mi nota · ", title]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value,
					readOnly,
					onChange: (e) => setValue(e.target.value),
					rows: 7,
					placeholder: "Escribe tu nota personal sobre este versículo…",
					className: "w-full resize-none rounded-xl border border-border/60 bg-background p-3 text-sm leading-relaxed text-foreground outline-none focus:border-foreground/30"
				}),
				!readOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onDelete,
						className: "inline-flex items-center gap-1.5 text-sm font-medium text-destructive hover:underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Eliminar"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: saving || !value.trim(),
						onClick: () => onSave?.(value.trim()),
						className: "inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50",
						children: saving ? "Guardando…" : "Guardar nota"
					})]
				}) : null
			]
		})
	});
}
function Selector({ label, value, options, onSelect, columns = 1, itemClassName = "text-sm sm:text-base" }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const current = options.find((o) => o.value === value);
	const renderGrid = (items) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "gap-1",
		style: {
			display: "grid",
			gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
		},
		children: items.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => {
				onSelect(o.value);
				setOpen(false);
			},
			className: `flex min-h-11 items-center justify-between gap-2 rounded-xl text-left text-[16px] sm:text-[17px] font-medium py-2.5 px-3 transition-colors hover:bg-accent ${itemClassName} ${o.value === value ? "bg-accent font-semibold" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: o.label
			})
		}, o.value))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex h-11 shrink-0 max-w-[120px] items-center gap-2 rounded-full border border-[#000f37]/30 bg-transparent px-3 py-2.5 text-sm font-medium text-[#000f37] shadow-none transition-colors hover:bg-accent sm:max-w-none sm:px-5 dark:border-[#7c7b82]/60 dark:bg-transparent dark:text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs font-normal uppercase tracking-wide text-muted-foreground sm:inline",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: current?.label ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: "start",
			className: "w-[min(22rem,calc(100vw-2rem))] rounded-2xl border-border/60 p-2 shadow-[var(--shadow-float)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[23.5rem] space-y-2 overflow-y-auto",
				children: renderGrid(options)
			})
		})]
	});
}
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: 767px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
var normName = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
/** Parses "Job 3:3" or "Génesis 1:1-3" (aliases like "Salmo"/"Hechos" included). */
function parseReference(input) {
	const ref = input.trim().replace(/\s{2,}/g, " ");
	const m = /^(.+?)\s+(\d+)\s*[:.]\s*(\d+)(?:\s*[-–]\s*(\d+))?$/.exec(ref);
	if (!m) return null;
	const rawBook = m[1].trim();
	const target = normName(canonicalBook(rawBook));
	const book = BOOKS.find((b) => normName(b.name) === target);
	if (!book) return null;
	const chapter = Number(m[2]);
	const verseFrom = Number(m[3]);
	const verseTo = m[4] ? Math.max(Number(m[4]), verseFrom) : verseFrom;
	const range = m[4] ? `-${verseTo}` : "";
	return {
		book: book.name,
		chapter,
		verseFrom,
		verseTo,
		label: `${book.name} ${chapter}:${verseFrom}${range}`
	};
}
async function verseText(ref) {
	try {
		const chapter = (await fetchBook(BOOKS.find((b) => b.name === ref.book).bookid)).find((c) => c.chapter === ref.chapter);
		if (!chapter) return null;
		const verses = chapter.verses.filter((v) => v.verse >= ref.verseFrom && v.verse <= ref.verseTo);
		if (verses.length === 0) return null;
		return verses.map((v) => v.text).join(" ");
	} catch {
		return null;
	}
}
/**
* Replaces `{{cita:Ref|fragmento_opcional}}` placeholders in raw HTML with the
* exact RV1865 wording from the local Bible data: `"Texto Oficial" (Referencia)`.
* When a fragment is given, only that substring is quoted, preserving the
* official casing and punctuation found in the text (case-insensitive lookup).
*/
async function hydrateCitations(rawHtml) {
	const matches = [...rawHtml.matchAll(/\{\{cita:([^|}]+?)(?:\|([^}]*?))?\}\}/g)];
	if (matches.length === 0) return rawHtml;
	const replacements = await Promise.all(matches.map(async (m) => {
		const ref = parseReference(m[1] ?? "");
		if (!ref) return m[0];
		const full = await verseText(ref);
		if (!full) return m[0];
		const fragment = m[2]?.trim();
		let quote = full;
		if (fragment) {
			const i = full.toLowerCase().indexOf(fragment.toLowerCase());
			if (i >= 0) quote = full.slice(i, i + fragment.length);
		}
		return `"${quote}" (${ref.label})`;
	}));
	let out = "";
	let last = 0;
	matches.forEach((m, i) => {
		out += rawHtml.slice(last, m.index) + replacements[i];
		last = m.index + m[0].length;
	});
	return out + rawHtml.slice(last);
}
function useVerseText(ref) {
	const bookid = ref ? BOOKS.find((b) => b.name === ref.book)?.bookid ?? 0 : 0;
	const query = useQuery({
		...bookQuery(bookid),
		enabled: bookid > 0
	});
	const verse = (query.data?.find((c) => c.chapter === ref?.chapter))?.verses.find((v) => v.verse === ref?.verse);
	return {
		text: verse?.text ?? "",
		loading: query.isPending || query.isFetching,
		missing: !!query.data && !verse
	};
}
var label = (ref) => `${ref.book} ${ref.chapter}:${ref.verse}`;
/** Bottom sheet (mobile). */
function VerseSheet({ target, onClose, onGoToChapter }) {
	const { text, loading, missing } = useVerseText(target);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [dragY, setDragY] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = requestAnimationFrame(() => setOpen(true));
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			cancelAnimationFrame(id);
			document.body.style.overflow = prev;
		};
	}, []);
	const dismiss = () => {
		setOpen(false);
		window.setTimeout(onClose, 180);
	};
	let startY = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[70] lg:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Cerrar",
			onClick: dismiss,
			className: `absolute inset-0 bg-black/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": label(target),
			style: { transform: `translateY(${open ? dragY : 400}px)` },
			className: "absolute inset-x-0 bottom-0 rounded-t-2xl border-none bg-white px-5 pb-8 pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 ease-out text-slate-900 dark:bg-[#1c1b2d] dark:text-[#bbbece]",
			onTouchStart: (e) => {
				startY = e.touches[0]?.clientY ?? 0;
			},
			onTouchMove: (e) => {
				const y = (e.touches[0]?.clientY ?? 0) - startY;
				if (y > 0) setDragY(y);
			},
			onTouchEnd: () => {
				if (dragY > 90) dismiss();
				else setDragY(0);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-4 h-1 w-10 rounded-full bg-muted-foreground/30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#85878c]",
					children: label(target)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[17px] leading-relaxed text-slate-900 dark:text-[#bbbece]",
					children: text || (loading ? "Cargando…" : missing ? "Versículo no disponible." : "Cargando…")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onGoToChapter,
					className: "mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#0F172A] text-sm font-medium text-white dark:bg-white dark:text-[#000f37]",
					children: "Ir al capítulo"
				})
			]
		})]
	});
}
var ALLOWED_TAGS = /* @__PURE__ */ new Set([
	"b",
	"strong",
	"i",
	"em",
	"u",
	"br",
	"p",
	"ul",
	"ol",
	"li",
	"span"
]);
var LINK_CLASS = "font-medium underline underline-offset-2 text-[#000f37] decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] cursor-pointer";
var CITATION_RE = /\{\{cita:[^}]+\}\}/g;
function RefPreview({ target }) {
	const { text, loading, missing } = useVerseText(target);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-[#85878c]",
		children: [
			target.book,
			" ",
			target.chapter,
			":",
			target.verse
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[15px] leading-relaxed text-slate-900 dark:text-[#bbbece]",
		children: text || (loading ? "Cargando…" : missing ? "Versículo no disponible." : "Cargando…")
	})] });
}
function DesktopRefLink({ token, onRefClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HoverCard, {
		openDelay: 120,
		closeDelay: 80,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCardTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				id: token.id,
				to: "/leer/$libro/$cap",
				params: {
					libro: slugifyBook(token.book),
					cap: String(token.chapter)
				},
				className: LINK_CLASS,
				"data-ref-book": token.book,
				"data-ref-chapter": String(token.chapter),
				"data-ref-verse": String(token.verse),
				onClick: () => onRefClick?.({
					book: token.book,
					chapter: token.chapter,
					verse: token.verse,
					originId: token.id
				}),
				children: token.label
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCardContent, {
			side: "top",
			align: "center",
			className: "w-[340px] rounded-xl border-none bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] text-slate-900 dark:bg-[#1c1b2d] dark:text-[#bbbece]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefPreview, { target: token })
		})]
	});
}
function MobileRefButton({ token, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		id: token.id,
		className: LINK_CLASS,
		onClick: () => onOpen({
			book: token.book,
			chapter: token.chapter,
			verse: token.verse,
			originId: token.id
		}),
		children: token.label
	});
}
/** Converts sanitized note HTML into React nodes, swapping scripture anchors for interactive links. */
function renderNodes(nodes, renderRef, keyPrefix = "n") {
	return Array.from(nodes).map((node, i) => {
		const key = `${keyPrefix}-${i}`;
		if (node.nodeType === 3) return node.textContent;
		if (node.nodeType !== 1) return null;
		const el = node;
		const tag = el.tagName.toLowerCase();
		if (tag === "a" && el.dataset["refBook"]) return renderRef({
			id: el.id,
			label: el.textContent ?? "",
			book: el.dataset["refBook"],
			chapter: Number(el.dataset["refChapter"]),
			verse: Number(el.dataset["refVerse"])
		}, key);
		if (!ALLOWED_TAGS.has(tag)) return el.textContent;
		if (tag === "br") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}, key);
		return (0, import_react.createElement)(tag, { key }, renderNodes(el.childNodes, renderRef, key));
	});
}
function NoteSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-full animate-pulse rounded bg-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-[92%] animate-pulse rounded bg-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-[80%] animate-pulse rounded bg-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-[60%] animate-pulse rounded bg-muted" })
		]
	});
}
function StudyNoteCard({ html, onRefClick }) {
	const isMobile = useIsMobile();
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [linked, setLinked] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const process = async () => {
			const hasCitations = CITATION_RE.test(html);
			CITATION_RE.lastIndex = 0;
			if (!hasCitations) {
				if (!cancelled) setLinked(linkifyScriptureRefs(html));
				return;
			}
			try {
				const hydrated = await hydrateCitations(html);
				if (!cancelled) setLinked(linkifyScriptureRefs(hydrated));
			} catch {
				if (!cancelled) setLinked(linkifyScriptureRefs(html));
			}
		};
		process();
		return () => {
			cancelled = true;
		};
	}, [html]);
	const body = (0, import_react.useMemo)(() => {
		if (typeof window === "undefined" || linked === null) return null;
		return renderNodes(new DOMParser().parseFromString(`<body>${linked}</body>`, "text/html").body.childNodes, (token, key) => isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileRefButton, {
			token,
			onOpen: setSheet
		}, key) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopRefLink, {
			token,
			...onRefClick ? { onRefClick } : {}
		}, key));
	}, [
		linked,
		isMobile,
		onRefClick
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "study-note text-base leading-relaxed text-[#000f37] dark:text-foreground/80",
		children: body ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteSkeleton, {})
	}), sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerseSheet, {
		target: sheet,
		onClose: () => setSheet(null),
		onGoToChapter: () => {
			const ref = sheet;
			setSheet(null);
			onRefClick?.(ref);
		}
	}) : null] });
}
var ARTWORKS = [
	{
		title: "Jonás y el Gran Pez",
		reference: "Jonás 2",
		image: "/etsy-art/jonas.webp",
		href: "https://www.etsy.com/listing/4541664433/jonah-and-the-whale-digital-painting"
	},
	{
		title: "El Becerro de Oro",
		reference: "Éxodo 32",
		image: "/etsy-art/becerro-oro.webp",
		href: "https://www.etsy.com/listing/4569526660/adoration-of-the-golden-calf-biblical"
	},
	{
		title: "Daniel en el Foso de los Leones",
		reference: "Daniel 6",
		image: "/etsy-art/daniel.webp",
		href: "https://www.etsy.com/listing/4543525189/daniel-in-lions-den-oil-painting-print"
	},
	{
		title: "El Arca de Noé",
		reference: "Génesis 7",
		image: "/etsy-art/arca-noe.webp",
		href: "https://www.etsy.com/listing/4545827815/noahs-ark-oil-painting-print-stormy-sea"
	},
	{
		title: "El Mar Rojo",
		reference: "Éxodo 14",
		image: "/etsy-art/mar-rojo.webp",
		href: "https://www.etsy.com/listing/4542083259/moses-parting-red-sea-oil-painting-print"
	},
	{
		title: "Caminando sobre el Agua",
		reference: "Mateo 14",
		image: "/etsy-art/camina-sobre-agua.webp",
		href: "https://www.etsy.com/listing/4554387329/jesus-walking-on-water-impasto-oil"
	},
	{
		title: "El Trono de Salomón",
		reference: "1 Reyes 10",
		image: "/etsy-art/trono-salomon.webp",
		href: "https://www.etsy.com/listing/4544403417/king-solomon-throne-oil-texture-painting"
	},
	{
		title: "La Caída de Sodoma",
		reference: "Génesis 19",
		image: "/etsy-art/sodoma.webp",
		href: "https://www.etsy.com/listing/4549020689/lots-wife-pillar-of-salt-oil-painting"
	},
	{
		title: "La Crucifixión",
		reference: "Juan 19",
		image: "/etsy-art/crucifixion.webp",
		href: "https://www.etsy.com/listing/4546714509/crucifixion-oil-painting-golgotha-wall"
	},
	{
		title: "Adán en el Edén",
		reference: "Génesis 2",
		image: "/etsy-art/adam-eden.webp",
		href: "https://www.etsy.com/listing/4543370817/garden-of-eden-impasto-oil-painting"
	},
	{
		title: "David y Goliat",
		reference: "1 Samuel 17",
		image: "/etsy-art/david-goliat.webp",
		href: "https://www.etsy.com/listing/4543227597/david-and-goliath-oil-painting-print"
	}
];
function EtsyArtCarousel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Láminas e ilustraciones teológicas",
		className: "mt-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-5 text-xs uppercase tracking-wider text-muted-foreground/70",
			children: "Descarga Digital"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scrollbar-none -mx-4 flex gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0",
			children: ARTWORKS.map((artwork) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: artwork.href,
				target: "_blank",
				rel: "noopener noreferrer",
				"data-umami-event": "Etsy Click",
				"data-umami-event-item": artwork.title,
				className: "group flex-none w-[220px] shrink-0 snap-start overflow-hidden rounded-lg bg-foreground/[0.03] transition-all hover:bg-foreground/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: artwork.image,
						alt: artwork.title,
						loading: "lazy",
						width: 800,
						height: 600,
						className: "aspect-[4/3] w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-0.5 text-sm font-semibold leading-snug text-foreground line-clamp-1",
							children: artwork.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs font-normal text-muted-foreground/70",
							children: artwork.reference
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-primary transition-colors hover:underline dark:text-white dark:hover:text-white/90",
							children: "Ver en Etsy →"
						})
					]
				})]
			}, artwork.title))
		})]
	});
}
var KEY = "patmos:read-chapters";
function getReadingProgress() {
	try {
		const data = JSON.parse(localStorage.getItem(KEY) ?? "{}");
		return data && typeof data === "object" && !Array.isArray(data) ? data : {};
	} catch {
		return {};
	}
}
function recordReadChapter(bookSlug, chapter) {
	if (!Number.isInteger(chapter) || chapter < 1) return;
	const progress = getReadingProgress();
	const chapters = Array.isArray(progress[bookSlug]) ? progress[bookSlug] : [];
	if (chapters.includes(chapter)) return;
	try {
		localStorage.setItem(KEY, JSON.stringify({
			...progress,
			[bookSlug]: [...chapters, chapter]
		}));
	} catch {}
}
function truncateWords(text, maxWords) {
	const clean = text.replace(/\s+/g, " ").trim();
	const words = clean.split(" ");
	return words.length > maxWords ? `${words.slice(0, maxWords).join(" ")}...` : clean;
}
function VerseText({ verse, flashing, highlightClass, selected, hasNote, notePreview, onSelect, onOpenNote }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		id: `verse-${verse.verse}`,
		onClick: onSelect,
		className: `-mx-3 block scroll-mt-44 cursor-pointer select-text rounded-lg px-3 py-1.5 text-[18px] sm:text-[19px] leading-relaxed text-foreground transition-colors duration-150 ${highlightClass || selected ? "" : "hover:bg-foreground/[0.04]"} ${highlightClass ?? ""} ${selected ? "ring-1 ring-inset ring-foreground/25" : ""} ${flashing ? "flash-target" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", {
				className: "mr-1 inline-block select-none text-xs font-medium text-verse-number",
				children: verse.verse
			}),
			hasNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-label": `Ver mi nota del versículo ${verse.verse}`,
				onClick: (e) => {
					e.stopPropagation();
					onOpenNote?.();
				},
				className: "group/note relative mr-1 inline-flex translate-y-[1px] items-center align-baseline text-primary transition-opacity hover:opacity-80",
				children: [notePreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute bottom-full left-0 z-50 mb-2 max-w-[260px] truncate rounded-lg bg-foreground px-3 py-1.5 text-xs font-normal leading-snug text-background opacity-0 shadow-md shadow-black/10 transition-opacity duration-150 group-hover/note:opacity-100 dark:shadow-black/40 sm:max-w-[320px]",
					children: notePreview
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, {
					className: "h-[13px] w-[13px]",
					fill: "currentColor"
				})]
			}) : null,
			verse.segments.map((s, i) => s.italic ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
				className: "italic text-muted-foreground",
				children: s.text
			}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.text }, i))
		]
	});
}
function Reader() {
	const params = Route.useParams();
	const libro = bookFromSlug(params.libro)?.name ?? "Génesis";
	const cap = Math.max(1, Math.floor(Number(params.cap)) || 1);
	const navigate = useNavigate({ from: Route.fullPath });
	const [history, setHistory] = (0, import_react.useState)([]);
	const [flashVerse, setFlashVerse] = (0, import_react.useState)(null);
	const [flashNotes, setFlashNotes] = (0, import_react.useState)(false);
	const pendingVerse = (0, import_react.useRef)(null);
	const pendingElId = (0, import_react.useRef)(null);
	const hash = useRouterState({ select: (s) => s.location.hash });
	const book = BOOKS.find((b) => b.name === libro) ?? BOOKS[0];
	const bookId = book.bookid;
	const chapter = cap;
	const bookData = useQuery({
		...bookQuery(bookId),
		placeholderData: keepPreviousData
	});
	const loaderNotes = Route.useLoaderData();
	const studyNotes = useQuery({
		...studyNotesQuery,
		...loaderNotes ? { initialData: loaderNotes } : {}
	});
	const chapters = bookData.data ?? [];
	const chapterCount = chapters.length || 1;
	const verses = (chapters.find((c) => c.chapter === chapter) ?? chapters[0])?.verses ?? [];
	const loading = bookData.isFetching || bookData.isPlaceholderData || studyNotes.isFetching;
	const { user } = useAuth();
	const userId = user?.id ?? null;
	const marks = useQuery(chapterMarksQuery(userId, book.name, chapter)).data ?? {
		highlights: {},
		notes: {},
		bookmarks: {}
	};
	const [selectedVerses, setSelectedVerses] = (0, import_react.useState)([]);
	const [authOpen, setAuthOpen] = (0, import_react.useState)(false);
	const [openNoteVerse, setOpenNoteVerse] = (0, import_react.useState)(null);
	const [consultaOpen, setConsultaOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSelectedVerses([]);
		setOpenNoteVerse(null);
	}, [libro, cap]);
	const scrollToVerse = (verse) => {
		if (typeof window === "undefined") return;
		const el = document.getElementById(`verse-${verse}`);
		if (!el) return;
		el.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
		setFlashVerse(verse);
		window.setTimeout(() => setFlashVerse(null), 2e3);
	};
	const scrollToId = (id) => {
		if (typeof window === "undefined") return;
		document.getElementById(id)?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	(0, import_react.useEffect)(() => {
		try {
			window.localStorage.setItem("rv1865:last", JSON.stringify({
				libro,
				cap
			}));
			recordReadChapter(slugifyBook(libro), cap);
		} catch {}
	}, [libro, cap]);
	(0, import_react.useEffect)(() => {
		const target = pendingVerse.current;
		if (target === null || verses.length === 0) return;
		pendingVerse.current = null;
		const t = window.setTimeout(() => scrollToVerse(target), 60);
		return () => window.clearTimeout(t);
	}, [
		verses,
		libro,
		cap
	]);
	(0, import_react.useEffect)(() => {
		const id = pendingElId.current;
		if (!id || typeof window === "undefined") return;
		const t = window.setTimeout(() => {
			const el = document.getElementById(id);
			if (!el) return;
			pendingElId.current = null;
			el.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
		}, 80);
		return () => window.clearTimeout(t);
	}, [
		libro,
		cap,
		studyNotes.data,
		verses
	]);
	/** Deep linking: scrolls to and flashes the element referenced by the URL hash. */
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const raw = (hash || window.location.hash).replace(/^#/, "");
		if (!raw) return;
		const t = window.setTimeout(() => {
			const el = (raw === "notas" || raw.startsWith("note") ? ["study-notes-desktop", "study-notes-section"] : [raw]).map((id) => document.getElementById(id)).find((n) => !!n && n.getClientRects().length > 0);
			if (!el) return;
			el.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			const verseMatch = /^verse-(\d+)$/.exec(raw);
			if (verseMatch) {
				const n = Number(verseMatch[1]);
				setFlashVerse(n);
				window.setTimeout(() => setFlashVerse((c) => c === n ? null : c), 2400);
			} else {
				setFlashNotes(true);
				window.setTimeout(() => setFlashNotes(false), 2400);
			}
		}, 120);
		return () => window.clearTimeout(t);
	}, [
		hash,
		libro,
		cap,
		verses,
		studyNotes.data
	]);
	const renderNotes = () => getNote(studyNotes.data, book.name, chapter) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyNoteCard, {
		html: getNote(studyNotes.data, book.name, chapter),
		onRefClick: goToReference
	}) : studyNotes.isPending ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-4 text-sm italic text-muted-foreground/70",
		children: "Aún no hay notas registradas para este capítulo. Trabajo en progreso."
	});
	const goTo = (nextBook, nextChapter) => {
		const target = BOOKS.find((b) => b.bookid === nextBook);
		if (!target) return;
		navigate({ params: {
			libro: slugifyBook(target.name),
			cap: String(nextChapter)
		} });
		if (typeof window !== "undefined") window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const goToVerse = (bookName, nextChapter, verse) => {
		if (bookName === book.name && nextChapter === chapter) {
			requestAnimationFrame(() => scrollToVerse(verse));
			return;
		}
		pendingVerse.current = verse;
		navigate({ params: {
			libro: slugifyBook(bookName),
			cap: String(nextChapter)
		} });
	};
	const goToReference = (ref) => {
		if (!BOOKS.some((b) => b.name === ref.book)) return;
		setHistory((h) => [...h, {
			book: book.name,
			chapter,
			verse: 1,
			...ref.originId ? { originId: ref.originId } : {}
		}]);
		goToVerse(ref.book, ref.chapter, ref.verse);
	};
	const goBack = () => {
		const last = history[history.length - 1];
		if (!last) return;
		setHistory((h) => h.slice(0, -1));
		if (last.originId) {
			if (last.book === book.name && last.chapter === chapter) {
				const el = document.getElementById(last.originId);
				if (el) {
					el.scrollIntoView({
						behavior: "smooth",
						block: "center"
					});
					return;
				}
			}
			pendingElId.current = last.originId;
			navigate({ params: {
				libro: slugifyBook(last.book),
				cap: String(last.chapter)
			} });
			return;
		}
		goToVerse(last.book, last.chapter, last.verse);
	};
	const lastOrigin = history[history.length - 1];
	const notesContent = renderNotes();
	const prev = () => {
		if (chapter > 1) return goTo(bookId, chapter - 1);
		const prevBook = BOOKS[bookId - 2];
		if (prevBook) goTo(prevBook.bookid, 1);
	};
	const next = () => {
		if (chapter < chapterCount) return goTo(bookId, chapter + 1);
		const nextBook = BOOKS[bookId];
		if (nextBook) goTo(nextBook.bookid, 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: `fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[#000f37] transition-opacity duration-200 dark:bg-white ${loading ? "opacity-100" : "opacity-0"}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-30 bg-background/95 py-2 backdrop-blur-md sm:top-[64px] sm:bg-background/70 lg:top-[68px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 sm:flex-nowrap sm:gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full min-w-0 items-center justify-between gap-3 sm:w-auto sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 sm:gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Selector, {
									label: "Libro",
									value: bookId,
									options: BOOKS.map((b) => ({
										value: b.bookid,
										label: b.name
									})),
									onSelect: (v) => goTo(v, 1)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Selector, {
									label: "Capítulo",
									value: chapter,
									options: Array.from({ length: chapterCount }, (_, i) => ({
										value: i + 1,
										label: String(i + 1)
									})),
									onSelect: (v) => goTo(bookId, v),
									columns: 5,
									groupByTestament: false,
									itemClassName: "text-base font-medium"
								}),
								lastOrigin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: goBack,
									className: "ml-2 hidden cursor-pointer whitespace-nowrap text-sm font-medium text-[#000f37] underline underline-offset-4 decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] sm:inline",
									children: "Volver"
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: prev,
								"aria-label": "Capítulo anterior",
								className: "grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-[18px] w-[18px]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: next,
								"aria-label": "Capítulo siguiente",
								className: "grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-[18px] w-[18px]" })
							})]
						})]
					}), lastOrigin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: goBack,
						className: "mt-2 inline-block cursor-pointer whitespace-nowrap text-sm font-medium text-[#000f37] underline underline-offset-4 decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] sm:hidden",
						children: "Volver"
					}) : null]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-24 pt-4 sm:pt-6 lg:grid-cols-12 lg:items-start lg:gap-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						id: "bible-text-section",
						className: "scroll-mt-[8rem] lg:col-span-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-3xl font-bold tracking-tight text-foreground dark:text-white sm:text-4xl",
								children: [
									book.name,
									" ",
									chapter
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => scrollToId("study-notes-section"),
								className: "cursor-pointer text-sm font-medium text-[#000f37] underline underline-offset-4 decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] lg:hidden",
								children: "Ir a las notas"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `mt-8 transition-opacity duration-200 ${loading ? "pointer-events-none opacity-40" : "opacity-100"}`,
							children: bookData.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "No pudimos cargar este libro. Revisa tu conexión e inténtalo de nuevo."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1.5 tracking-[-0.01em] text-foreground",
								children: verses.map((v) => {
									const noteContent = marks.notes[v.verse]?.content;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerseText, {
										verse: v,
										flashing: flashVerse === v.verse,
										...marks.highlights[v.verse] ? { highlightClass: HIGHLIGHT_CLASS[marks.highlights[v.verse].color] } : {},
										selected: selectedVerses.includes(v.verse),
										hasNote: !!marks.notes[v.verse],
										...noteContent ? { notePreview: truncateWords(noteContent, 12) } : {},
										onSelect: () => {
											setOpenNoteVerse(null);
											setSelectedVerses((cur) => cur.includes(v.verse) ? cur.filter((n) => n !== v.verse) : [...cur, v.verse].sort((a, b) => a - b));
										},
										onOpenNote: () => {
											const note = marks.notes[v.verse];
											setSelectedVerses(note?.verses?.length ? [...note.verses] : [v.verse]);
											setOpenNoteVerse(v.verse);
										}
									}, v.verse);
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "study-notes-section",
						className: "scroll-mt-[8rem] lg:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-10 w-full border-t border-[#000f37] pt-8 dark:border-[#7c7b82]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-bold text-foreground lg:text-[20px]",
									children: "Notas"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `space-y-6 transition-opacity duration-200 ${loading ? "pointer-events-none opacity-40" : "opacity-100"} ${flashNotes ? "flash-target" : ""}`,
								children: notesContent
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden space-y-6 lg:col-span-5 lg:block lg:sticky lg:top-[8rem] lg:self-start lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto scrollbar-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "study-notes-desktop",
							className: "min-h-full scroll-mt-[8rem] border-l border-[#000f37]/50 bg-transparent pt-0 pb-16 pl-6 shadow-none dark:border-[#bcbecd]/50 lg:pl-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-bold text-foreground lg:text-[20px]",
									children: "Notas"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `transition-opacity duration-200 ${loading ? "pointer-events-none opacity-40" : "opacity-100"} ${flashNotes ? "flash-target" : ""}`,
								children: renderNotes()
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-7xl mx-auto px-4 sm:px-6 mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EtsyArtCarousel, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-20 border-t-0 border-border py-8 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm sm:leading-normal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: [
						"© 2026 Notas de Estudio por",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://www.ritualypropaganda.com/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "font-medium text-foreground underline underline-offset-2 transition-opacity hover:opacity-80",
							children: "Leonardo Moreno"
						}),
						". Todos los derechos reservados."
					]
				})
			}),
			selectedVerses.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerseActionBar, {
				userId,
				book: book.name,
				chapter,
				selection: selectedVerses.map((n) => ({
					verse: n,
					text: verses.find((v) => v.verse === n)?.text ?? ""
				})),
				marks,
				initialNoteOpen: openNoteVerse !== null,
				onClose: () => {
					setSelectedVerses([]);
					setOpenNoteVerse(null);
				},
				onRequireAuth: () => setAuthOpen(true)
			}, `note-${openNoteVerse ?? "none"}`) : null,
			selectedVerses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-consulta-fab": "",
				onClick: () => setConsultaOpen((o) => !o),
				"aria-label": consultaOpen ? "Cerrar Consultas Patmos" : "Abrir Consultas Patmos",
				className: consultaOpen ? "fixed bottom-6 z-[60] inline-flex items-center gap-2 rounded-full bg-fab px-4 py-2.5 text-sm font-medium text-fab-foreground shadow-xl transition-colors hover:bg-fab/90 max-sm:hidden sm:right-[29.5rem]" : "fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-fab px-4 py-2.5 text-sm font-medium text-fab-foreground shadow-xl transition-colors hover:bg-fab/90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
					className: "h-4 w-4 shrink-0",
					"aria-hidden": "true"
				}), "Consulta Patmos"]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultaPatmos, {
				open: consultaOpen,
				onOpenChange: setConsultaOpen,
				userId,
				book: book.name,
				chapter,
				verses: selectedVerses,
				chapterText: verses.map((v) => `${v.verse} ${v.text}`).join("\n"),
				chapterNotes: plainText(getNote(studyNotes.data, book.name, chapter) ?? ""),
				onRequireAuth: () => {
					setConsultaOpen(false);
					setAuthOpen(true);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
				open: authOpen,
				onOpenChange: setAuthOpen
			})
		]
	});
}
//#endregion
export { Reader as component };
