import { i as __toESM } from "../_runtime.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { J as functionalUpdate, K as deepEqual, W as removeTrailingSlash, Y as getUrlScheme, Z as isDangerousProtocol } from "../_libs/@tanstack/router-core+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import "../_libs/@tanstack/react-store+[...].mjs";
import { c as useRouter } from "./server-CdxiqMkJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notes-D-G9D8nd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Imperative navigation hook.
*
* Returns a stable `navigate(options)` function to change the current location
* programmatically. Prefer the `Link` component for user-initiated navigation,
* and use this hook from effects, callbacks, or handlers where imperative
* navigation is required.
*
* Options:
* - `from`: Optional route base used to resolve relative `to` paths.
*
* @returns A function that accepts `NavigateOptions`.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useNavigateHook
*/
function useNavigate(_defaultOpts) {
	const router = useRouter();
	return import_react.useCallback((options) => {
		return router.navigate({
			...options,
			from: options.from ?? _defaultOpts?.from
		});
	}, [_defaultOpts?.from, router]);
}
function resolveExternalLink(to, protocolAllowlist) {
	const scheme = typeof to === "string" && getUrlScheme(to);
	if (!scheme) return;
	if (!protocolAllowlist.has(scheme)) return null;
	return to;
}
function resolveIsActive(location, next, activeOptions, basepath, isHydrated) {
	const currentPath = removeTrailingSlash(location.pathname, basepath);
	const nextPath = removeTrailingSlash(next.pathname, basepath);
	if (activeOptions?.exact ? currentPath !== nextPath : !(currentPath.startsWith(nextPath) && (currentPath.length === nextPath.length || currentPath[nextPath.length] === "/"))) return false;
	if (activeOptions?.includeSearch ?? true) {
		if (!deepEqual(location.search, next.search, !activeOptions?.exact, activeOptions?.explicitUndefined)) return false;
	}
	if (activeOptions?.includeHash) return isHydrated && location.hash === next.hash;
	return true;
}
function useLinkProps(options, forwardedRef, host) {
	return getServerLinkProps(useRouter(), options, forwardedRef, host);
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var ROUTER_OPTION_KEYS = /* @__PURE__ */ new Set([
	"to",
	"params",
	"search",
	"hash",
	"state",
	"mask",
	"from",
	"unsafeRelative",
	"_fromLocation",
	"reloadDocument",
	"preload",
	"preloadDelay",
	"preloadIntentProximity",
	"hashScrollIntoView",
	"replace",
	"startTransition",
	"resetScroll",
	"viewTransition",
	"ignoreBlocker",
	"activeProps",
	"inactiveProps",
	"activeOptions",
	"_asChild"
]);
function collectElementProps(options, host) {
	const props = {};
	for (const key in options) {
		if (ROUTER_OPTION_KEYS.has(key) || key === "type" && host !== void 0 || key === "disabled" && host === "a") continue;
		props[key] = options[key];
	}
	return props;
}
function applyLinkState(props, options, isActive, href, linkDisabled, host) {
	const { activeProps, inactiveProps, className, style, target } = options;
	const stateProps = functionalUpdate(isActive ? activeProps : inactiveProps, {}) ?? (isActive ? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT);
	Object.assign(props, stateProps);
	props.href = href;
	if (host !== "a") props.disabled = linkDisabled;
	props.target = target;
	const stateStyle = stateProps.style;
	if (style || stateStyle) props.style = style && stateStyle ? {
		...style,
		...stateStyle
	} : style || stateStyle;
	const stateClassName = stateProps.className;
	if (className || stateClassName) props.className = className ? stateClassName ? `${className} ${stateClassName}` : className : stateClassName;
	if (linkDisabled) {
		props.role = "link";
		props["aria-disabled"] = true;
	}
	if (isActive) {
		props["data-status"] = "active";
		props["aria-current"] = "page";
	}
	return props;
}
function getServerLinkProps(router, options, forwardedRef, host) {
	const { to, disabled, activeOptions } = options;
	const directExternalLink = resolveExternalLink(to, router.protocolAllowlist);
	const next = directExternalLink === void 0 ? router.buildLocation(options) : void 0;
	const hrefOption = next ? getHrefOption(next, router, disabled) : directExternalLink ?? void 0;
	const linkDisabled = disabled || !hrefOption;
	const externalLink = directExternalLink ?? (hrefOption && getUrlScheme(hrefOption) ? hrefOption : void 0);
	const props = collectElementProps(options, host);
	props.ref = forwardedRef;
	if (externalLink) {
		props.href = externalLink;
		return props;
	}
	return applyLinkState(props, options, !!next && !(!disabled && !hrefOption) && resolveIsActive(router.stores.location.get(), next, activeOptions, router.basepath, false), hrefOption, linkDisabled, host);
}
function getHrefOption(next, router, disabled) {
	if (disabled) return;
	const location = next.maskedLocation ?? next;
	const href = location.external ? location.publicHref : router.history.createHref(location.publicHref) || "/";
	if ((location.external || href !== location.publicHref) && isDangerousProtocol(href, router.protocolAllowlist)) return;
	return href;
}
/**
* A strongly-typed anchor component for declarative navigation.
* Handles path, search, hash and state updates with optional route preloading
* and active-state styling.
*
* Props:
* - `preload`: Controls route preloading (eg. 'intent', 'render', 'viewport', true/false)
* - `preloadDelay`: Delay in ms before preloading on focus, hover, or viewport entry
* - `activeProps`/`inactiveProps`: Additional props merged when link is active/inactive
* - `resetScroll`/`hashScrollIntoView`: Control scroll behavior on navigation
* - `viewTransition`/`startTransition`: Use View Transitions/React transitions for navigation
* - `ignoreBlocker`: Bypass registered blockers
*
* @returns An anchor-like element that navigates without full page reloads.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent
*/
var Link = import_react.memo(import_react.forwardRef((props, ref) => {
	const host = props._asChild || "a";
	const linkProps = useLinkProps(props, ref, host);
	const children = typeof props.children === "function" ? props.children({ isActive: linkProps["data-status"] === "active" }) : props.children;
	return import_react.createElement(host, linkProps, children);
}), areLinkPropsEqual);
function areLinkPropsEqual(prev, next) {
	let extraKeys = 0;
	for (const key in next) {
		extraKeys++;
		if (prev[key] === next[key]) continue;
		if (!ROUTER_OPTION_KEYS.has(key) || !deepEqual(prev[key], next[key], false, true)) return false;
	}
	for (const _key in prev) extraKeys--;
	return extraKeys === 0;
}
var supabaseUrl = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "sb_publishable_BTj1gIgeYrurprbtsVIk6w_iL4kOk3C",
	"VITE_SUPABASE_URL": "https://eaizfpczslirmxrujbkl.supabase.co"
}["VITE_SUPABASE_URL"];
var supabaseAnonKey = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "sb_publishable_BTj1gIgeYrurprbtsVIk6w_iL4kOk3C",
	"VITE_SUPABASE_URL": "https://eaizfpczslirmxrujbkl.supabase.co"
}["VITE_SUPABASE_ANON_KEY"];
var isBrowser = typeof window !== "undefined";
var supabase = createClient(supabaseUrl ?? "https://placeholder.supabase.co", supabaseAnonKey ?? "placeholder-anon-key", { auth: {
	persistSession: isBrowser,
	autoRefreshToken: isBrowser,
	detectSessionInUrl: isBrowser,
	storage: isBrowser ? window.localStorage : void 0
} });
var EBOOK_URL = "https://drive.google.com/file/d/1gC_qykQa0p4zCXUbuYlXnH-CcvCzVpvn/view?usp=sharing";
var EBOOK_TITLE = "La Segunda Venida de Cristo en las Religiones del Mundo";
var EBOOK_COVER = "/religiones-segunda-venida.jpg";
/** Catálogo único de descargas: se muestra en la ventana "Recursos". */
var RESOURCES = [{
	id: "segunda-venida",
	title: EBOOK_TITLE,
	cover: EBOOK_COVER,
	url: EBOOK_URL
}];
var key = (userId) => `rvnotas:welcomed:${userId}`;
function hasSeenWelcome(userId) {
	try {
		return window.localStorage.getItem(key(userId)) === "1";
	} catch {
		return true;
	}
}
function markWelcomeSeen(userId) {
	try {
		window.localStorage.setItem(key(userId), "1");
	} catch {}
}
var g = globalThis;
var AuthContext = g.__rvAuthCtx ??= (0, import_react.createContext)(null);
function nameFromUser(user) {
	if (!user) return "";
	const meta = user.user_metadata ?? {};
	const name = meta["display_name"] ?? meta["full_name"] ?? meta["name"];
	if (name && name.trim()) return name.trim();
	return user.email ? user.email.split("@")[0] : "Cuenta";
}
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isPremium, setIsPremium] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		let active = true;
		const { data: sub } = supabase.auth.onAuthStateChange((event, nextSession) => {
			if (!active) return;
			setSession(nextSession);
			setUser(nextSession?.user ?? null);
			setLoading(false);
			const u = nextSession?.user;
			if (event === "SIGNED_IN" && u && !hasSeenWelcome(u.id)) {
				const created = u.created_at ? Date.parse(u.created_at) : 0;
				if (Date.now() - created < 6048e5) setTimeout(() => void navigate({ to: "/welcome" }), 0);
				else markWelcomeSeen(u.id);
			}
		});
		supabase.auth.getSession().then(({ data }) => {
			if (!active) return;
			setSession(data.session);
			setUser(data.session?.user ?? null);
			setLoading(false);
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	const PREMIUM_EMAIL = "leonardo@ritualypropaganda.com";
	const ACTIVE_STATUSES = [
		"active",
		"on_trial",
		"past_due"
	];
	(0, import_react.useEffect)(() => {
		let active = true;
		if (!user) {
			setIsPremium(false);
			return;
		}
		if (user.email?.toLowerCase() === PREMIUM_EMAIL) {
			setIsPremium(true);
			return;
		}
		supabase.from("subscriptions").select("status").eq("user_id", user.id).in("status", ACTIVE_STATUSES).limit(1).then(({ data }) => {
			if (active) setIsPremium((data?.length ?? 0) > 0);
		});
		return () => {
			active = false;
		};
	}, [user]);
	const signInWithEmail = (0, import_react.useCallback)(async (email, password) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) throw error;
	}, []);
	const signUpWithEmail = (0, import_react.useCallback)(async (email, password, displayName) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: displayName ? { display_name: displayName } : {},
				...typeof window !== "undefined" ? { emailRedirectTo: `${window.location.origin}/` } : {}
			}
		});
		if (error) throw error;
		return { needsConfirmation: !data.session };
	}, []);
	const signInWithGoogle = (0, import_react.useCallback)(async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: typeof window !== "undefined" ? { redirectTo: `${window.location.origin}/` } : {}
		});
		if (error) throw error;
	}, []);
	const signOut = (0, import_react.useCallback)(async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
	}, []);
	const updateProfile = (0, import_react.useCallback)(async (nextName) => {
		const { data, error } = await supabase.auth.updateUser({ data: { display_name: nextName } });
		if (error) throw error;
		setUser(data.user);
	}, []);
	const changePassword = (0, import_react.useCallback)(async (newPassword) => {
		const { error } = await supabase.auth.updateUser({ password: newPassword });
		if (error) throw error;
	}, []);
	const deleteAccount = (0, import_react.useCallback)(async () => {
		const { error } = await supabase.rpc("delete_own_account");
		if (error) throw error;
		await supabase.auth.signOut();
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		user,
		session,
		loading,
		displayName: nameFromUser(user),
		signInWithEmail,
		signUpWithEmail,
		signInWithGoogle,
		signOut,
		updateProfile,
		changePassword,
		deleteAccount,
		isPremium
	}), [
		user,
		session,
		loading,
		isPremium,
		signInWithEmail,
		signUpWithEmail,
		signInWithGoogle,
		signOut,
		updateProfile,
		changePassword,
		deleteAccount
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
	return ctx;
}
var CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHY2r7RUsyLXl9ZjOxAkHpfDXNyuhHE0cutaWf2SlWssYDa3zKYZpuVrNRRd8gD6Rsz82Uv1SMb6SY/pub?output=csv";
/** Minimal RFC-4180 CSV parser (handles quoted fields, escaped quotes, newlines). */
function parseCsv(input) {
	const rows = [];
	let row = [];
	let field = "";
	let quoted = false;
	for (let i = 0; i < input.length; i++) {
		const c = input[i];
		if (quoted) {
			if (c === "\"") {
				if (input[i + 1] === "\"") {
					field += "\"";
					i++;
				} else quoted = false;
			} else field += c;
			continue;
		}
		if (c === "\"") quoted = true;
		else if (c === ",") {
			row.push(field);
			field = "";
		} else if (c === "\n") {
			row.push(field);
			rows.push(row);
			row = [];
			field = "";
		} else if (c !== "\r") field += c;
	}
	if (field || row.length) {
		row.push(field);
		rows.push(row);
	}
	return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}
/** Keeps only simple inline formatting tags from the spreadsheet content. */
function sanitizeNote(html) {
	return html.replace(/<\s*\/?\s*(script|style|iframe|object|embed|link|meta)[^>]*>/gi, "").replace(/<(?!\/?(b|strong|i|em|u|br|p|ul|ol|li)\b)[^>]*>/gi, "").replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "").trim();
}
async function fetchStudyNotes() {
	const res = await fetch(CSV_URL);
	if (!res.ok) throw new Error("No se pudieron cargar las notas de estudio");
	const rows = parseCsv(await res.text());
	const map = {};
	for (const [key, note] of rows.slice(1)) {
		if (!key || !note) continue;
		map[key.trim()] = sanitizeNote(note);
	}
	return map;
}
/** Legacy spreadsheet keys that should resolve to the current canonical book name. */
var KEY_ALIASES = {
	Hechos: "Actos",
	Salmo: "Salmos"
};
/** Reads a note allowing legacy book spellings (e.g. "Hechos-2" for "Actos-2"). */
var getNote = (map, bookName, chapter) => {
	if (!map) return void 0;
	const canonical = KEY_ALIASES[bookName] ?? bookName;
	const legacy = Object.entries(KEY_ALIASES).find(([, v]) => v === canonical)?.[0];
	return map[`${canonical}-${chapter}`] ?? (legacy ? map[`${legacy}-${chapter}`] : void 0);
};
var studyNotesQuery = {
	queryKey: ["study-notes"],
	queryFn: fetchStudyNotes,
	staleTime: 18e5
};
//#endregion
export { Link as a, markWelcomeSeen as c, useAuth as d, useNavigate as f, EBOOK_URL as i, studyNotesQuery as l, EBOOK_COVER as n, RESOURCES as o, EBOOK_TITLE as r, getNote as s, AuthProvider as t, supabase as u };
