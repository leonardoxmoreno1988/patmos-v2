import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Star } from "../_libs/lucide-react.mjs";
import { v as SiteHeader } from "./site-header-a-tCyTrN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/newsletter-BnLcSdpb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var leonardo_moreno_png_asset_default = {
	version: 1,
	asset_id: "2eefd469-fe6e-41c1-b0ac-72685e64faee",
	project_id: "5b625881-fa84-45ee-8fec-cbfb62964dde",
	url: "/__l5e/assets-v1/2eefd469-fe6e-41c1-b0ac-72685e64faee/leonardo-moreno.png",
	r2_key: "a/v1/5b625881-fa84-45ee-8fec-cbfb62964dde/2eefd469-fe6e-41c1-b0ac-72685e64faee/leonardo-moreno.png",
	original_filename: "leonardo-moreno.png",
	size: 189921,
	content_type: "image/png",
	created_at: "2026-08-15T10:51:26Z"
};
var reviews = [
	{
		text: "Excelente nivel de análisis histórico y teológico.",
		author: "Gustavo F. Monastra"
	},
	{
		text: "Un excelente blog acerca de los acontecimientos finales desde una perspectiva bíblica.",
		author: "Lucero Palga"
	},
	{
		text: "Sumamente valioso por el contenido que publica, un punto de referencia para profundizar en temas de gran importancia en estos tiempos peligrosos.",
		author: "Leon Santana"
	},
	{
		text: "Una visión e interpretación cristiana basada en la Biblia de los acontecimientos que ocurren hoy día. Es un punto de vista que puede dar claridad.",
		author: "Javier Bazán"
	},
	{
		text: "Es un excelente y maravilloso blog, que ayuda a entender desde la luz de la Biblia los acontecimientos actuales y futuros. ¡Muchas gracias por los análisis cuidadosos y profundos! Como cristianos no podemos seguir desapercibidos de los tiempos y ser engañados fácilmente.",
		author: "Viviana Enciso"
	},
	{
		text: "Son temas muy importantes que me han ayudado a conocer a profundidad los temas que se han dado.",
		author: "Leonardo Quispe"
	},
	{
		text: "Es muy gratificante la lectura de esta iniciativa divulgativa, poder compartir el verdadero conocimiento de la Palabra y sus conexiones sutiles con el día a día del hombre contemporáneo (contemporáneo en apariencia, claro está) y con la batalla permanente contra los enemigos de Dios. El Día de la Santa Victoria está cada vez más cerca y el Triunfo de Jesucristo es inminente.",
		author: "Jose Luis Gomez Vaiz"
	},
	{
		text: "Realmente interesante el contenido de esta página, la manera en que se exponen los temas y sobre todo siempre a la luz de la evidencia bíblica, no pierdo ningún tema y siempre lo comparto con mis amigos.",
		author: "Laura García"
	},
	{
		text: "Me gusta mucho esta página y el contenido es actual y te ayuda a ver más allá de lo que está ante nuestros ojos, te muestra aspectos que solemos pasar desapercibidos, y a la vez te insta a seguir investigando y te brinda información documentada que mucha falta hace hoy en día con tanta noticia falsa y sensacionalista.",
		author: "Jennifer Gómez"
	},
	{
		text: "Buena información en general. Datos que no son fáciles de encontrar.",
		author: "Cristina Davies"
	}
];
function NewsletterPage() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { rightLink: {
				to: "/",
				label: "← Volver al lector"
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-3xl px-4 py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-3xl font-bold tracking-tight text-foreground dark:text-white sm:text-4xl",
									children: "Una exploración de la profecía bíblica y el cristianismo actual"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-4 max-w-xl text-base font-normal text-[#000f37] dark:text-[#BBBECE] sm:text-lg",
									children: "Un informe sobre propaganda anticristiana y otros engaños relevantes. Suscríbete aquí:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: (e) => {
										e.preventDefault();
										if (email.trim()) setSent(true);
									},
									className: "mx-auto mt-8 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:gap-2 sm:rounded-full sm:border sm:border-neutral-900 sm:bg-transparent sm:p-1.5 sm:dark:border-neutral-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										required: true,
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "tu@email.com",
										className: "w-full rounded-full border border-neutral-900 bg-transparent px-5 py-3.5 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground dark:border-neutral-400 sm:border-none sm:bg-transparent sm:py-2.5"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "w-full whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-sm font-bold text-neutral-900 transition-opacity hover:opacity-90 sm:w-auto sm:bg-primary sm:py-3 sm:text-primary-foreground",
										children: sent ? "¡Gracias!" : "Suscribirme"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-6 sm:flex-row sm:items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: leonardo_moreno_png_asset_default.url,
								alt: "Leonardo Moreno",
								className: "h-20 w-20 shrink-0 rounded-[2rem] object-cover sm:h-24 sm:w-24"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center sm:text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold text-foreground dark:text-white",
									children: "Leonardo Moreno"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-normal leading-relaxed text-[#000f37] dark:text-[#BBBECE]",
									children: "Estudiante de teología en TBDI, premilenialista, pretribulacionista, amante de la profecía bíblica y seguidor de Jesús. Escribo sobre los 66 libros de la Biblia, las falsas doctrinas y el gnosticismo en el cine."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-8 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground",
							children: [
								"Reseñas (",
								reviews.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "columns-1 gap-4 space-y-4 md:columns-2",
							children: reviews.map((review, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "break-inside-avoid space-y-3 rounded-lg border-none bg-muted p-5 shadow-none dark:bg-[#232232]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-0.5",
										children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											className: "h-4 w-4 fill-amber-400 text-amber-400",
											strokeLinejoin: "miter",
											strokeLinecap: "square"
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-normal leading-relaxed text-foreground/80 dark:text-white",
										children: [
											"“",
											review.text,
											"”"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-normal text-muted-foreground dark:text-[#BBBECE]",
										children: ["— ", review.author]
									})
								]
							}, idx))
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-20 border-t border-border py-8 text-center text-xs text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-6",
					children: "© 2026 Notas de Estudio. Todos los derechos reservados."
				})
			})
		]
	});
}
//#endregion
export { NewsletterPage as component };
