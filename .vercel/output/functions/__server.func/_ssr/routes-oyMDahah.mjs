import { i as __toESM } from "../_runtime.mjs";
import { n as BOOK_GROUPS, r as CHAPTER_COUNTS, s as slugifyBook } from "./bible-CwIUYS_X.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as useSearch, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as studyNotesQuery, n as EBOOK_COVER, o as getNote, r as EBOOK_TITLE, u as useAuth } from "./notes-Dpau9YV6.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as ArrowRight, k as BookOpen, p as MessageSquare } from "../_libs/lucide-react.mjs";
import { n as Button, t as AuthModal, v as SiteHeader } from "./site-header-a-tCyTrN.mjs";
import { t as ConsultaPatmos } from "./consulta-patmos-CFz3e5db.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-oyMDahah.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Chapters with at least one study note, per book, from the global notes sheet. */
function notesAvailability(notes, book) {
	const total = CHAPTER_COUNTS[book.bookid] ?? 0;
	if (!notes || !total) return {
		total,
		done: 0,
		pct: 0
	};
	let done = 0;
	for (let cap = 1; cap <= total; cap++) if (getNote(notes, book.name, cap)) done++;
	return {
		total,
		done,
		pct: total ? Math.round(done / total * 100) : 0
	};
}
function Home() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const search = useSearch({ from: "/" });
	const [signupOpen, setSignupOpen] = (0, import_react.useState)(false);
	const [consultaOpen, setConsultaOpen] = (0, import_react.useState)(false);
	const [consultaView, setConsultaView] = (0, import_react.useState)("chat");
	const [consultaKey, setConsultaKey] = (0, import_react.useState)(0);
	const { data: studyNotes, isLoading: notesLoading } = useQuery(studyNotesQuery);
	const [last, setLast] = (0, import_react.useState)({
		libro: "genesis",
		cap: "1"
	});
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem("rv1865:last");
			if (!raw) return;
			const parsed = JSON.parse(raw);
			if (parsed?.libro && parsed?.cap) setLast({
				libro: parsed.libro,
				cap: parsed.cap
			});
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (search.consulta === "history") {
			setConsultaView("history");
			setConsultaKey((k) => k + 1);
			setConsultaOpen(true);
		}
	}, [search.consulta]);
	const lastBook = BOOK_GROUPS.flatMap((g) => g.books).find((b) => slugifyBook(b.name) === last.libro)?.name ?? "Génesis";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "py-14 text-center md:py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "sr-only",
								children: "PATMOS — Exégesis y Notas de Estudio RV1865"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "hidden md:block font-bold tracking-tight text-foreground mb-6 text-4xl md:text-5xl lg:text-6xl",
								children: "RV1865 + Notas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
								children: "Plataforma de investigación teológica, análisis profético y estudio del texto bíblico Reina Valera 1865."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 flex flex-wrap items-center justify-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									className: "h-11 rounded-full px-6 dark:border-transparent dark:bg-white dark:text-slate-900 hover:dark:bg-slate-100",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/leer/$libro/$cap",
										params: {
											libro: last.libro,
											cap: last.cap
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}),
											" Continuar Lectura (",
											lastBook,
											" ",
											last.cap,
											")"
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "lg",
									className: "h-11 rounded-full px-6",
									onClick: () => {
										setConsultaView("chat");
										setConsultaKey((k) => k + 1);
										setConsultaOpen(true);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {}), " Consultar Patmos"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-y border-border py-8 sm:py-10",
						"aria-label": "Recurso gratuito",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4 sm:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: EBOOK_COVER,
									alt: EBOOK_TITLE,
									className: "h-20 w-14 shrink-0 rounded-none object-cover shadow-md",
									loading: "lazy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold uppercase text-primary",
										children: "Recurso gratuito · E-book"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm leading-relaxed text-foreground sm:text-[15px]",
										children: [
											"Obtén el E-book ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold",
												children: [
													"\"",
													EBOOK_TITLE,
													"\""
												]
											}),
											" al crear tu cuenta"
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: () => user ? void navigate({ to: "/welcome" }) : setSignupOpen(true),
								className: "h-10 w-full shrink-0 rounded-full px-5 sm:w-auto dark:border-transparent dark:bg-white dark:text-slate-900 hover:dark:bg-slate-100",
								children: ["Descargar libro ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "py-12 pb-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-7 flex items-end justify-between gap-4 border-b border-border pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold text-foreground",
								children: "Progreso de las Notas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Reina Valera 1865 · 66 libros"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4",
							children: BOOK_GROUPS.flatMap((group) => group.books).map((book) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookCard, {
								book,
								notes: studyNotes,
								loading: notesLoading
							}) }, book.bookid))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
				open: signupOpen,
				onOpenChange: setSignupOpen,
				defaultTab: "signup"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultaPatmos, {
				open: consultaOpen,
				onOpenChange: (open) => {
					setConsultaOpen(open);
					if (!open && search.consulta) navigate({
						to: "/",
						search: {},
						replace: true
					});
				},
				userId: user?.id ?? null,
				book: "",
				chapter: 0,
				verses: [],
				initialScope: "bible",
				initialView: consultaView,
				onRequireAuth: () => {
					setConsultaOpen(false);
					setSignupOpen(true);
				}
			}, consultaKey),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-border py-8 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6",
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
			})
		]
	});
}
function BookCard({ book, notes, loading }) {
	const { total, done, pct } = notesAvailability(notes, book);
	const badge = pct === 100 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "shrink-0 rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
		children: "100%"
	}) : pct >= 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "shrink-0 rounded-full border border-orange-200 bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-800 dark:border-orange-800 dark:bg-orange-950/60 dark:text-orange-300",
		children: [pct, "%"]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "shrink-0 text-xs text-neutral-400 dark:text-neutral-500",
		children: "0%"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/leer/$libro/$cap",
		params: {
			libro: slugifyBook(book.name),
			cap: "1"
		},
		className: "group flex h-full flex-col rounded-md border border-border bg-transparent p-3 transition-all hover:border-foreground/25 cursor-pointer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[15px] font-medium leading-tight text-foreground",
					children: book.name
				}), badge]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[11px] text-muted-foreground",
				children: [
					done,
					"/",
					total,
					" caps."
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 h-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800",
			children: loading && pct === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full animate-pulse bg-neutral-200 dark:bg-neutral-700" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `h-full transition-all ${pct === 100 ? "bg-emerald-500" : pct >= 1 ? "bg-orange-500" : "bg-neutral-300 dark:bg-neutral-600"}`,
				style: { width: `${pct}%` }
			})
		})]
	});
}
//#endregion
export { Home as component };
