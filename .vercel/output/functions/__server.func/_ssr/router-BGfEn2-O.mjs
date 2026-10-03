import { i as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./dist-DtePOooj.mjs";
import { i as bookFromSlug, r as CHAPTER_COUNTS, s as slugifyBook, t as BOOKS } from "./bible-CwIUYS_X.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as studyNotesQuery, o as getNote, r as EBOOK_TITLE, t as AuthProvider } from "./notes-BgCmovsq.mjs";
import { i as getStartContext } from "./server-q4FwGRUh.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo-BehQe1AG.js
var SITE_URL = "https://www.patmosresearch.com";
var SITE_NAME = "Patmos";
/**
* Reusable head() builder: title, description, canonical, Open Graph and
* Twitter Card tags. Returns the exact shape TanStack Start's head() expects,
* so routes just do: `head: () => seoHead({ ... })`.
*/
function seoHead({ title, description, canonical, ogImage, ogType = "website", noindex = false }) {
	const url = canonical ? canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}` : void 0;
	const meta = [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: ogType
		},
		{
			property: "og:site_name",
			content: SITE_NAME
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	];
	if (url) meta.push({
		property: "og:url",
		content: url
	});
	if (ogImage) {
		meta.push({
			property: "og:image",
			content: ogImage
		});
		meta.push({
			name: "twitter:image",
			content: ogImage
		});
	}
	if (noindex) meta.push({
		name: "robots",
		content: "noindex"
	});
	return {
		meta,
		links: url ? [{
			rel: "canonical",
			href: url
		}] : []
	};
}
/** Strips HTML tags and collapses whitespace, for meta descriptions. */
function plainText(html) {
	return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
/** First `max` characters of plain text, cut on a word boundary. */
function excerpt(text, max = 150) {
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	return cut.slice(0, Math.max(cut.lastIndexOf(" "), 0)).trimEnd() + "…";
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BGfEn2-O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getRouterInstance = () => getStartContext().getRouter();
var styles_default = "/assets/styles-RRI06gCP.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	staticData: { sitemap: false },
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Comentario Bíblico — Lectura y notas de estudio" },
			{
				name: "description",
				content: "Lee la Biblia en un espacio limpio y sereno, con notas de estudio por capítulo."
			},
			{
				property: "og:title",
				content: "Comentario Bíblico"
			},
			{
				property: "og:description",
				content: "Lectura bíblica minimalista con comentario y notas de estudio."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function useUmamiOnInteraction() {
	(0, import_react.useEffect)(() => {
		const inject = () => {
			const s = document.createElement("script");
			s.src = "https://cloud.umami.is/script.js";
			s.defer = true;
			s.setAttribute("data-website-id", "bdfd0465-45a8-47d8-8cc0-076ed1c98361");
			document.head.appendChild(s);
		};
		const events = [
			"mousemove",
			"scroll",
			"keydown",
			"touchstart",
			"click"
		];
		const onFirst = () => {
			inject();
			events.forEach((e) => window.removeEventListener(e, onFirst));
		};
		events.forEach((e) => window.addEventListener(e, onFirst, { passive: true }));
		return () => events.forEach((e) => window.removeEventListener(e, onFirst));
	}, []);
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	useUmamiOnInteraction();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter$4 = () => import("./routes-Cph6jWEx.mjs");
var Route$9 = createFileRoute("/")({
	staticData: { sitemap: true },
	head: () => seoHead({
		title: "PATMOS — Exégesis y Biblia Reina Valera 1865",
		description: "Plataforma de investigación teológica, análisis profético y preservación del texto bíblico Reina Valera 1865.",
		canonical: "/"
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
/** Chapters with at least one study note, per book, from the global notes sheet. */
var $$splitComponentImporter$3 = () => import("./buscar-QIG9tbbr.mjs");
var Route$8 = createFileRoute("/buscar")({
	staticData: { sitemap: true },
	validateSearch: (search) => {
		const filter = String(search["filter"] ?? "all");
		return {
			q: typeof search["q"] === "string" ? search["q"] : "",
			filter: filter === "notes" || filter === "bible" ? filter : "all",
			page: Math.max(1, Number(search["page"] ?? 1) || 1)
		};
	},
	head: () => seoHead({
		title: "Buscar — Biblia + Notas",
		description: "Busca en el texto completo de la Reina-Valera 1865 y en las notas de estudio de Leonardo Moreno.",
		canonical: "/buscar"
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./newsletter-CfVv-SA4.mjs");
var Route$7 = createFileRoute("/newsletter")({
	staticData: { sitemap: true },
	head: () => seoHead({
		title: "Newsletter — Notas de Estudio",
		description: "Suscríbete al newsletter de Notas de Estudio: una exploración de la profecía bíblica y el cristianismo actual por Leonardo Moreno.",
		canonical: "/newsletter"
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
function isSitemapRouteIncluded(route) {
	if (!route || route.isRoot || route.options.staticData?.sitemap !== true) return false;
	for (let ancestor = route.parentRoute; ancestor; ancestor = ancestor.parentRoute) if (ancestor.options.staticData?.sitemap === "exclude-subtree") return false;
	return true;
}
function sitemapStaticPaths(router) {
	const paths = /* @__PURE__ */ new Set();
	for (const route of Object.values(router.routesById)) {
		if (!isSitemapRouteIncluded(route) || /[$*]/.test(route.fullPath)) continue;
		const path = sitemapPathForLocation(router, router.buildLocation({ to: route.fullPath }), route.id);
		if (path !== void 0) paths.add(path);
	}
	return [...paths].sort();
}
function sitemapPathForLocation(router, location, routeId) {
	if (!isSafeSitemapPath(location.pathname) || !isSafeSitemapPath(location.publicHref)) return void 0;
	const result = router.getMatchedRoutes(location.pathname);
	const [params, foundRoute] = Array.isArray(result) ? [result[1], result[2]] : [result.routeParams, result.parseError ? void 0 : result.foundRoute];
	return params["**"] === void 0 && foundRoute?.id === routeId && isSitemapRouteIncluded(foundRoute) ? location.publicHref : void 0;
}
function isSafeSitemapPath(pathname) {
	if (!pathname.startsWith("/") || pathname.startsWith("//") || /[?#\\]/.test(pathname)) return false;
	try {
		return decodeURI(new URL(pathname, "https://sitemap.invalid").pathname) === decodeURI(pathname);
	} catch {
		return false;
	}
}
function sitemapXML(baseURL, entries) {
	const origin = new URL(baseURL);
	if (!/^https?:$/.test(origin.protocol) || origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) throw new Error("The sitemap base URL must be the public site origin");
	const escape = (value) => value.replace(/[&<>"']/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&apos;"
	})[character]);
	const seen = /* @__PURE__ */ new Set();
	const urls = [];
	for (const entry of entries) {
		if (!isSafeSitemapPath(entry.path)) throw new Error("Invalid sitemap path");
		const url = new URL(entry.path, origin);
		if (seen.has(url.href)) continue;
		seen.add(url.href);
		urls.push(`<url><loc>${escape(url.href)}</loc>${entry.lastmod ? `<lastmod>${escape(entry.lastmod)}</lastmod>` : ""}</url>`);
	}
	return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
}
var BASE_URL = "https://www.patmosresearch.com";
var CHAPTER_ROUTE_ID = "/leer/$libro/$cap";
var Route$6 = createFileRoute("/sitemap.xml")({
	staticData: { sitemap: false },
	server: { handlers: { GET: async () => {
		const router = await getRouterInstance();
		const entries = sitemapStaticPaths(router).map((path) => ({ path }));
		if (isSitemapRouteIncluded(router.routesById[CHAPTER_ROUTE_ID])) for (const book of BOOKS) {
			const chapters = CHAPTER_COUNTS[book.bookid] ?? 0;
			for (let chapter = 1; chapter <= chapters; chapter++) {
				const path = sitemapPathForLocation(router, router.buildLocation({
					to: CHAPTER_ROUTE_ID,
					params: {
						libro: slugifyBook(book.name),
						cap: String(chapter)
					},
					search: () => ({}),
					hash: ""
				}), CHAPTER_ROUTE_ID);
				if (path) entries.push({ path });
			}
		}
		if (entries.length === 0) return new Response("No pages are included in this sitemap. Check route decisions and ancestor exclusions. Setting \"exclude-subtree\" on the root excludes the entire site.", {
			status: 404,
			headers: { "Cache-Control": "no-store" }
		});
		return new Response(sitemapXML(BASE_URL, entries), { headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, max-age=3600"
		} });
	} } }
});
var $$splitComponentImporter$1 = () => import("./welcome-Dg6yD3MI.mjs");
var Route$5 = createFileRoute("/welcome")({
	staticData: { sitemap: false },
	head: () => seoHead({
		title: "¡Bienvenido a Patmos! — Descarga tu E-book",
		description: `Tu cuenta está lista. Descarga gratis el E-book "${EBOOK_TITLE}".`,
		canonical: "/welcome",
		noindex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$4 = createFileRoute("/api/billing")({
	staticData: { sitemap: false },
	server: { handlers: { POST: async ({ request }) => {
		const { handleBilling } = await import("./api.server-UMH2vzLS.mjs");
		return handleBilling(request);
	} } }
});
var Route$3 = createFileRoute("/api/chat")({
	staticData: { sitemap: false },
	server: { handlers: { POST: async ({ request }) => {
		const { handleChat } = await import("./api.server-UMH2vzLS.mjs");
		return handleChat(request);
	} } }
});
var Route$2 = createFileRoute("/api/consulta")({
	staticData: { sitemap: false },
	server: { handlers: { POST: async ({ request }) => {
		const { handleConsulta } = await import("./consulta.server-swt_Lkwj.mjs");
		return handleConsulta(request);
	} } }
});
var handle = async ({ request }) => {
	const { handleHistory } = await import("./api.server-UMH2vzLS.mjs");
	return handleHistory(request);
};
var Route$1 = createFileRoute("/api/history")({
	staticData: { sitemap: false },
	server: { handlers: {
		GET: handle,
		DELETE: handle
	} }
});
var $$splitComponentImporter = () => import("./leer._libro._cap-CHplfmxR.mjs");
var Route = createFileRoute("/leer/$libro/$cap")({
	staticData: { sitemap: true },
	loader: ({ context }) => context.queryClient.ensureQueryData(studyNotesQuery),
	head: ({ params, loaderData }) => {
		const book = bookFromSlug(params.libro)?.name ?? "Génesis";
		const chapter = Math.max(1, Math.floor(Number(params.cap)) || 1);
		const note = getNote(loaderData, book, chapter);
		const description = note ? excerpt(plainText(note), 150) : `Lee ${book} ${chapter} en la Reina-Valera 1865 con notas de estudio y análisis doctrinal.`;
		return seoHead({
			title: `${book} ${chapter} - Notas de Estudio y Exégesis (RV1865)`,
			description,
			canonical: `/leer/${slugifyBook(book)}/${chapter}`,
			ogType: "article"
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	BuscarRoute: Route$8.update({
		id: "/buscar",
		path: "/buscar",
		getParentRoute: () => Route$10
	}),
	NewsletterRoute: Route$7.update({
		id: "/newsletter",
		path: "/newsletter",
		getParentRoute: () => Route$10
	}),
	SitemapDotxmlRoute: Route$6.update({
		id: "/sitemap.xml",
		path: "/sitemap.xml",
		getParentRoute: () => Route$10
	}),
	WelcomeRoute: Route$5.update({
		id: "/welcome",
		path: "/welcome",
		getParentRoute: () => Route$10
	}),
	ApiBillingRoute: Route$4.update({
		id: "/api/billing",
		path: "/api/billing",
		getParentRoute: () => Route$10
	}),
	ApiChatRoute: Route$3.update({
		id: "/api/chat",
		path: "/api/chat",
		getParentRoute: () => Route$10
	}),
	ApiConsultaRoute: Route$2.update({
		id: "/api/consulta",
		path: "/api/consulta",
		getParentRoute: () => Route$10
	}),
	ApiHistoryRoute: Route$1.update({
		id: "/api/history",
		path: "/api/history",
		getParentRoute: () => Route$10
	}),
	LeerLibroCapRoute: Route.update({
		id: "/leer/$libro/$cap",
		path: "/leer/$libro/$cap",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { plainText as i, Route as n, Route$8 as r, router_exports as t };
