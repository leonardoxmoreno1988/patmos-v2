import { i as __toESM } from "../_runtime.mjs";
import { i as bookFromSlug, r as CHAPTER_COUNTS, s as slugifyBook, t as BOOKS } from "./bible-CwIUYS_X.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as getScriptPreloadAttrs, B as createNonReactiveMutableStore, D as getSsrBodyScriptParts, E as composeSsrBodyScripts, I as _getAssetMatches, N as resolveManifestCssLink, O as appendUniqueUserTags, Q as isModuleNotFoundError, R as RouterCore, T as BaseRoute, U as invariant, V as createNonReactiveReadonlyStore, et as replaceEqualDeep, k as getAssetCrossOrigin, q as escapeHtml, w as BaseRootRoute } from "../_libs/@tanstack/router-core+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import "../_libs/tanstack__store.mjs";
import "../_libs/@tanstack/react-store+[...].mjs";
import { a as Outlet, c as useRouter, d as __exportAll, i as getStartContext, l as useHydrated, o as dummyMatchContext, s as matchContext, u as reactUse } from "./server-CdxiqMkJ.mjs";
import { a as Link, f as useNavigate, l as studyNotesQuery, r as EBOOK_TITLE, s as getNote, t as AuthProvider } from "./notes-D-G9D8nd.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useSearch-Cjbj-wRr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useStructuralSharing(opts, router) {
	const previousResult = import_react.useRef();
	return (slice) => {
		const selected = opts?.select ? opts.select(slice) : slice;
		if (opts?.structuralSharing ?? router.options.defaultStructuralSharing) return previousResult.current = replaceEqualDeep(previousResult.current, selected);
		return selected;
	};
}
/**
* Read and select the nearest or targeted route match.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useMatchHook
*/
function useMatch(opts) {
	const router = useRouter();
	const nearestRouteId = import_react.useContext(opts.from ? dummyMatchContext : matchContext);
	const routeId = opts.from ?? nearestRouteId;
	const matchStore = router.stores.getMatchStore(routeId);
	{
		const match = matchStore.get();
		if (!match) {
			if (opts.shouldThrow ?? true) invariant();
			return;
		}
		return opts.select ? opts.select(match) : match;
	}
}
/**
* Read and select the current route's search parameters with type-safety.
*
* Options:
* - `from`/`strict`: Control which route's search is read and how strictly it's typed
* - `select`: Map the search object to a derived value for render optimization
* - `structuralSharing`: Enable structural sharing for stable references
* - `shouldThrow`: Throw when the route is not found (strict contexts)
*
* @returns The search object (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useSearchHook
*/
function useSearch(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		shouldThrow: opts.shouldThrow,
		structuralSharing: opts.structuralSharing,
		select: (match) => {
			return opts.select ? opts.select(match.search) : match.search;
		}
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/seo-Ctk5UCY1.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Read and select the current route's loader data with type‑safety.
*
* Options:
* - `from`/`strict`: Choose which route's data to read and strictness
* - `select`: Map the loader data to a derived value
* - `structuralSharing`: Enable structural sharing for stable references
*
* @returns The loader data (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDataHook
*/
function useLoaderData(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		structuralSharing: opts.structuralSharing,
		select: (match) => {
			return opts.select ? opts.select(match.loaderData) : match.loaderData;
		}
	});
}
/**
* Read and select the current route's loader dependencies object.
*
* Options:
* - `from`: Choose which route's loader deps to read
* - `select`: Map the deps to a derived value
* - `structuralSharing`: Enable structural sharing for stable references
*
* @returns The loader deps (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDepsHook
*/
function useLoaderDeps(opts) {
	const { select, ...rest } = opts;
	return useMatch({
		...rest,
		select: (match) => {
			return select ? select(match.loaderDeps) : match.loaderDeps;
		}
	});
}
/**
* Access the current route's path parameters with type-safety.
*
* Options:
* - `from`/`strict`: Specify the matched route and whether to enforce strict typing
* - `select`: Project the params object to a derived value for memoized renders
* - `structuralSharing`: Enable structural sharing for stable references
* - `shouldThrow`: Throw if the route is not found in strict contexts
*
* @returns The params object (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useParamsHook
*/
function useParams(opts) {
	return useMatch({
		from: opts.from,
		shouldThrow: opts.shouldThrow,
		structuralSharing: opts.structuralSharing,
		strict: opts.strict,
		select: (match) => {
			const params = opts.strict === false ? match.params : match._strictParams;
			return opts.select ? opts.select(params) : params;
		}
	});
}
function useRouteContext(opts) {
	return useMatch({
		...opts,
		select: (match) => opts.select ? opts.select(match.context) : match.context
	});
}
var Route$11 = class extends BaseRoute {
	/**
	* @deprecated Use the `createRoute` function instead.
	*/
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				...opts,
				from: this.id
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				...opts,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				...opts,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = import_react.forwardRef((props, ref) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				ref,
				from: this.fullPath,
				...props
			});
		});
	}
};
/**
* Creates a non-root Route instance for code-based routing.
*
* Use this to define a route that will be composed into a route tree
* (typically via a parent route's `addChildren`). If you're using file-based
* routing, prefer `createFileRoute`.
*
* @param options Route options (path, component, loader, context, etc.).
* @returns A Route instance to be attached to the route tree.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouteFunction
*/
function createRoute(options) {
	return new Route$11(options);
}
/**
* Creates a root route factory that requires a router context type.
*
* Use when your root route expects `context` to be provided to `createRouter`.
* The returned function behaves like `createRootRoute` but enforces a context type.
*
* @returns A factory function to configure and return a root route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRootRouteWithContextFunction
*/
function createRootRouteWithContext() {
	return (options) => {
		return createRootRoute(options);
	};
}
var RootRoute = class extends BaseRootRoute {
	/**
	* @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
	*/
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				...opts,
				from: this.id
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				...opts,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				...opts,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = import_react.forwardRef((props, ref) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				ref,
				from: this.fullPath,
				...props
			});
		});
	}
};
/**
* Creates a root Route instance used to build your route tree.
*
* Typically paired with `createRouter({ routeTree })`. If you need to require
* a typed router context, use `createRootRouteWithContext` instead.
*
* @param options Root route options (component, error, pending, etc.).
* @returns A root route instance.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRootRouteFunction
*/
function createRootRoute(options) {
	return new RootRoute(options);
}
/**
* Creates a file-based Route factory for a given path.
*
* Used by TanStack Router's file-based routing to associate a file with a
* route. The returned function accepts standard route options. In normal usage
* the `path` string is inserted and maintained by the `tsr` generator.
*
* @param path File path literal for the route (usually auto-generated).
* @returns A function that accepts Route options and returns a Route instance.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createFileRouteFunction
*/
function createFileRoute(path) {
	return (options) => {
		const route = createRoute(options);
		route.isRoot = false;
		return route;
	};
}
/**
* Wrap a dynamic import to create a route component that supports
* `.preload()` and friendly reload-on-module-missing behavior.
*
* @param importer Function returning a module promise
* @param exportName Named export to use (default: `default`)
* @returns A lazy route component compatible with TanStack Router
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/lazyRouteComponentFunction
*/
function lazyRouteComponent(importer, exportName) {
	let loadPromise;
	let comp;
	let error;
	const load = () => {
		if (!loadPromise) {
			error = void 0;
			loadPromise = importer().then((res) => {
				comp = res[exportName ?? "default"];
			}).catch((err) => {
				loadPromise = void 0;
				error = err;
			});
		}
		return loadPromise;
	};
	const lazyComp = function Lazy(props) {
		if (error) {
			if (isModuleNotFoundError(error) && false);
			throw error;
		}
		if (!comp) if (reactUse) reactUse(load());
		else throw load();
		return import_react.createElement(comp, props);
	};
	lazyComp.preload = load;
	return lazyComp;
}
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
//#region node_modules/.nitro/vite/services/ssr/assets/router-oxYdTyXd.js
var getStoreFactory = (opts) => {
	return {
		createMutableStore: createNonReactiveMutableStore,
		createReadonlyStore: createNonReactiveReadonlyStore,
		batch: (fn) => fn()
	};
};
/**
* Creates a new Router instance for React.
*
* Pass the returned router to `RouterProvider` to enable routing.
* Notable options: `routeTree` (your route definitions) and `context`
* (required if the root route was created with `createRootRouteWithContext`).
*
* @param options Router options used to configure the router.
* @returns A Router instance to be provided to `RouterProvider`.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouterFunction
*/
var createRouter = (options) => {
	return new Router(options);
};
var Router = class extends RouterCore {
	constructor(options) {
		super(options, getStoreFactory);
	}
};
var noopScriptHandler = () => {};
function setScriptAttrs(script, attrs) {
	if (!attrs) return;
	for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
}
function Asset(asset) {
	const { attrs, children, nonce, preventScriptHoist } = asset;
	const innerHTML = import_react.useMemo(() => children === void 0 ? void 0 : { __html: children }, [children]);
	switch (asset.tag) {
		case "title": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", {
			...attrs,
			suppressHydrationWarning: true,
			children
		});
		case "meta": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			...attrs,
			suppressHydrationWarning: true
		});
		case "link": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
			...attrs,
			precedence: attrs?.precedence ?? (attrs?.rel === "stylesheet" ? "default" : void 0),
			nonce,
			suppressHydrationWarning: true
		});
		case "style":
			if (asset.inlineCss && false);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				...attrs,
				dangerouslySetInnerHTML: innerHTML,
				nonce
			});
		case "script": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Script, {
			attrs,
			preventScriptHoist,
			children
		});
		default: return null;
	}
}
function Script({ attrs, children, preventScriptHoist }) {
	useRouter();
	useHydrated();
	const innerHTML = import_react.useMemo(() => children === void 0 ? void 0 : { __html: children }, [children]);
	const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
	import_react.useEffect(() => {
		if (dataScript) return;
		if (attrs?.src) {
			const link = document.createElement("a");
			link.href = attrs.src;
			const normSrc = link.href;
			for (const el of document.scripts) if (el.src === normSrc) return;
			const script = document.createElement("script");
			setScriptAttrs(script, attrs);
			document.head.appendChild(script);
			return () => script.remove();
		}
		if (typeof children === "string") {
			const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
			const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
			for (const el of document.scripts) {
				if (el.hasAttribute("src")) continue;
				const sType = el.getAttribute("type") ?? "text/javascript";
				const sNonce = el.getAttribute("nonce") ?? void 0;
				if (el.textContent === children && sType === typeAttr && sNonce === nonceAttr) return;
			}
			const script = document.createElement("script");
			script.textContent = children;
			setScriptAttrs(script, attrs);
			document.head.appendChild(script);
			return () => script.remove();
		}
	}, [
		attrs,
		children,
		dataScript
	]);
	if (attrs?.src) {
		if (!preventScriptHoist) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			...attrs,
			suppressHydrationWarning: true
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			...attrs,
			onLoad: noopScriptHandler,
			suppressHydrationWarning: true
		});
	}
	if (typeof children === "string") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		...attrs,
		dangerouslySetInnerHTML: innerHTML,
		suppressHydrationWarning: true
	});
	return null;
}
function buildTagsFromMatches(router, nonce, matches, assetCrossOrigin) {
	matches = _getAssetMatches(matches);
	const routeMeta = matches.map((match) => match.meta).filter((meta) => meta !== void 0);
	const resultMeta = [];
	const metaByAttribute = {};
	let title;
	for (let i = routeMeta.length - 1; i >= 0; i--) {
		const metas = routeMeta[i];
		for (let j = metas.length - 1; j >= 0; j--) {
			const m = metas[j];
			if (!m) continue;
			if (m.title) {
				if (!title) title = {
					tag: "title",
					children: m.title
				};
			} else if ("script:ld+json" in m) try {
				const json = JSON.stringify(m["script:ld+json"]);
				resultMeta.push({
					tag: "script",
					attrs: { type: "application/ld+json" },
					children: escapeHtml(json)
				});
			} catch {}
			else {
				const attribute = m.name ?? m.property;
				if (attribute) if (metaByAttribute[attribute]) continue;
				else metaByAttribute[attribute] = true;
				resultMeta.push({
					tag: "meta",
					attrs: {
						...m,
						nonce
					}
				});
			}
		}
	}
	if (title) resultMeta.push(title);
	if (nonce) resultMeta.push({
		tag: "meta",
		attrs: {
			property: "csp-nonce",
			content: nonce
		}
	});
	resultMeta.reverse();
	const constructedLinks = matches.flatMap((match) => match.links ?? []).filter((link) => link !== void 0).map((link) => ({
		tag: "link",
		attrs: {
			...link,
			nonce
		}
	}));
	const manifest = router.ssr?.manifest;
	const manifestCssTags = [];
	if (manifest) {
		matches.forEach((match) => {
			(manifest.routes[match.routeId]?.css)?.forEach((link) => {
				const resolvedLink = resolveManifestCssLink(link);
				manifestCssTags.push({
					tag: "link",
					attrs: {
						rel: "stylesheet",
						...resolvedLink,
						crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? resolvedLink.crossOrigin,
						suppressHydrationWarning: true,
						nonce
					}
				});
			});
		});
		if (manifest.inlineStyle) manifestCssTags.push({
			tag: "style",
			attrs: {
				...manifest.inlineStyle.attrs,
				nonce
			},
			children: manifest.inlineStyle.children,
			inlineCss: true
		});
	}
	const preloadLinks = [];
	if (manifest) matches.forEach((match) => {
		manifest.routes[match.routeId]?.preloads?.forEach((preload) => {
			preloadLinks.push({
				tag: "link",
				attrs: {
					...getScriptPreloadAttrs(manifest, preload, assetCrossOrigin),
					nonce
				}
			});
		});
	});
	const styles = matches.flatMap((match) => match.styles ?? []).filter((style) => style !== void 0).map(({ children, ...attrs }) => ({
		tag: "style",
		attrs: {
			...attrs,
			nonce
		},
		children
	}));
	const headScripts = matches.flatMap((match) => match.headScripts ?? []).filter((script) => script !== void 0).map(({ children, ...script }) => ({
		tag: "script",
		attrs: {
			...script,
			nonce
		},
		children
	}));
	const tags = [];
	appendUniqueUserTags(tags, resultMeta);
	tags.push(...preloadLinks);
	appendUniqueUserTags(tags, constructedLinks);
	tags.push(...manifestCssTags);
	appendUniqueUserTags(tags, styles);
	appendUniqueUserTags(tags, headScripts);
	return tags;
}
/**
* Build the head/link/meta/script tags from the renderable presented prefix.
* Used internally by `HeadContent`.
*/
var useTags = (assetCrossOrigin) => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	return buildTagsFromMatches(router, nonce, router.stores.matches.get(), assetCrossOrigin);
};
/**
* Render route-managed head tags (title, meta, links, styles, head scripts).
* Place inside the document head of your app shell.
* @link https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management
*/
function HeadContent(props) {
	const tags = useTags(props.assetCrossOrigin);
	const nonce = useRouter().options.ssr?.nonce;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: tags.map((tag) => /* @__PURE__ */ (0, import_react.createElement)(Asset, {
		...tag,
		key: `tsr-meta-${JSON.stringify(tag)}`,
		nonce
	})) });
}
var routeScriptAttrs = { suppressHydrationWarning: true };
/**
* Render body script tags collected from route matches and SSR manifests.
* During streaming SSR, `<Scripts>` marks where late hydration scripts may
* begin to be inserted.
*/
var Scripts = () => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	const getParts = (matches) => {
		const parts = getSsrBodyScriptParts(matches, router.ssr?.manifest, nonce, routeScriptAttrs);
		for (const script of parts[1]) if (typeof script.attrs?.src === "string") {
			const scriptWithHoist = script;
			scriptWithHoist.preventScriptHoist = true;
		}
		return parts;
	};
	return renderScripts(composeSsrBodyScripts(getParts(router.stores.matches.get()), router.serverSsr?.takeInitialHydrationScriptTags()));
};
function renderScripts(scripts) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: scripts.map((asset, i) => /* @__PURE__ */ (0, import_react.createElement)(Asset, {
		...asset,
		key: `tsr-scripts-${asset.tag}-${i}`
	})) });
}
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
var $$splitComponentImporter$4 = () => import("./routes-CBV7gwWF.mjs");
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
var $$splitComponentImporter$3 = () => import("./buscar-lwfbnCP6.mjs");
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
var $$splitComponentImporter$2 = () => import("./newsletter-JXpBvslc.mjs");
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
var $$splitComponentImporter$1 = () => import("./welcome-bznWCFRQ.mjs");
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
		const { handleBilling } = await import("./api.server-DLYLy2vP.mjs");
		return handleBilling(request);
	} } }
});
var Route$3 = createFileRoute("/api/chat")({
	staticData: { sitemap: false },
	server: { handlers: { POST: async ({ request }) => {
		const { handleChat } = await import("./api.server-DLYLy2vP.mjs");
		return handleChat(request);
	} } }
});
var Route$2 = createFileRoute("/api/consulta")({
	staticData: { sitemap: false },
	server: { handlers: { POST: async ({ request }) => {
		const { handleConsulta } = await import("./consulta.server-g-SWHRnZ.mjs");
		return handleConsulta(request);
	} } }
});
var handle = async ({ request }) => {
	const { handleHistory } = await import("./api.server-DLYLy2vP.mjs");
	return handleHistory(request);
};
var Route$1 = createFileRoute("/api/history")({
	staticData: { sitemap: false },
	server: { handlers: {
		GET: handle,
		DELETE: handle
	} }
});
var $$splitComponentImporter = () => import("./leer._libro._cap-PuTGNzkj.mjs");
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
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { useSearch as a, plainText as i, Route as n, useStructuralSharing as o, Route$8 as r, router_exports as t };
