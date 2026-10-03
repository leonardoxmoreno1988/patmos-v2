import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as EBOOK_URL, n as EBOOK_COVER, r as EBOOK_TITLE, s as markWelcomeSeen, u as useAuth } from "./notes-BgCmovsq.mjs";
import { v as SiteHeader } from "./site-header-B8hZvSt8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/welcome-Dg6yD3MI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Welcome() {
	const { user } = useAuth();
	(0, import_react.useEffect)(() => {
		if (user) markWelcomeSeen(user.id);
	}, [user]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl flex-col justify-center px-4 py-14 sm:px-6 md:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-full flex-col items-center md:w-auto md:shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: EBOOK_COVER,
						alt: `Portada del E-book "${EBOOK_TITLE}"`,
						className: "max-h-[380px] w-auto max-w-[280px] rounded-none object-cover shadow-xl md:max-h-[460px] md:max-w-[340px]",
						loading: "eager"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col items-center text-center md:items-start md:text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight text-[#000f37] md:text-5xl dark:text-white",
							children: "¡Bienvenido a Patmos!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-lg text-muted-foreground",
							children: "Tu cuenta ha sido creada con éxito. Ya puedes acceder a todas las notas exegéticas y descargar tu recurso exclusivo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col items-center gap-4 md:items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: EBOOK_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								"data-umami-event": "Ebook Download",
								className: "inline-flex h-12 items-center justify-center rounded-full bg-[#000f37] px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#000f37]",
								children: "Descargar E-Book Gratis"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground",
								children: "Ir a la portada"
							})]
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { Welcome as component };
