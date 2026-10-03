import { t as BOOKS } from "./bible-CwIUYS_X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scripture-refs-Cn_GoRyO.js
var escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var normBookName = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
/** Legacy / alternate spellings mapped to the canonical book name (linkify regex keys). */
var BOOK_ALIASES = {
	Salmo: "Salmos",
	Hechos: "Actos",
	"Hechos de los Apóstoles": "Actos",
	"Actos de los Apóstoles": "Actos",
	Apocalipsis: "Revelación",
	"Apocalipsis de Juan": "Revelación",
	"Cantar de los Cantares": "Cantares",
	"Cantares de Salomón": "Cantares"
};
/** Alternate book names (Spanish, English, accent-less) → canonical `BOOKS.name`. */
var BOOK_NAME_ALIASES = [
	["Apocalipsis", "Revelación"],
	["Apocalipsis de Juan", "Revelación"],
	["Salmo", "Salmos"],
	["Hechos", "Actos"],
	["Hechos de los Apóstoles", "Actos"],
	["Actos de los Apóstoles", "Actos"],
	["Cantar de los Cantares", "Cantares"],
	["Cantares de Salomón", "Cantares"],
	["Cantares de Salomon", "Cantares"],
	["Genesis", "Génesis"],
	["Exodus", "Éxodo"],
	["Leviticus", "Levítico"],
	["Numbers", "Números"],
	["Deuteronomy", "Deuteronomio"],
	["Joshua", "Josué"],
	["Judges", "Jueces"],
	["Ruth", "Rut"],
	["1 Samuel", "1 Samuel"],
	["2 Samuel", "2 Samuel"],
	["I Samuel", "1 Samuel"],
	["II Samuel", "2 Samuel"],
	["1 Kings", "1 Reyes"],
	["2 Kings", "2 Reyes"],
	["I Kings", "1 Reyes"],
	["II Kings", "2 Reyes"],
	["1 Chronicles", "1 Crónicas"],
	["2 Chronicles", "2 Crónicas"],
	["I Chronicles", "1 Crónicas"],
	["II Chronicles", "2 Crónicas"],
	["Ezra", "Esdras"],
	["Nehemiah", "Nehemías"],
	["Esther", "Ester"],
	["Job", "Job"],
	["Psalms", "Salmos"],
	["Psalm", "Salmos"],
	["Proverbs", "Proverbios"],
	["Ecclesiastes", "Eclesiastés"],
	["Song of Solomon", "Cantares"],
	["Song of Songs", "Cantares"],
	["Canticles", "Cantares"],
	["Isaiah", "Isaías"],
	["Jeremiah", "Jeremías"],
	["Lamentations", "Lamentaciones"],
	["Ezekiel", "Ezequiel"],
	["Daniel", "Daniel"],
	["Hosea", "Oseas"],
	["Joel", "Joel"],
	["Amos", "Amós"],
	["Obadiah", "Abdías"],
	["Jonah", "Jonás"],
	["Micah", "Miqueas"],
	["Nahum", "Nahúm"],
	["Habakkuk", "Habacuc"],
	["Zephaniah", "Sofonías"],
	["Haggai", "Hageo"],
	["Zechariah", "Zacarías"],
	["Malachi", "Malaquías"],
	["Matthew", "Mateo"],
	["Mark", "Marcos"],
	["Luke", "Lucas"],
	["John", "Juan"],
	["Acts", "Actos"],
	["Romans", "Romanos"],
	["1 Corinthians", "1 Corintios"],
	["2 Corinthians", "2 Corintios"],
	["I Corinthians", "1 Corintios"],
	["II Corinthians", "2 Corintios"],
	["Galatians", "Gálatas"],
	["Ephesians", "Efesios"],
	["Philippians", "Filipenses"],
	["Colossians", "Colosenses"],
	["1 Thessalonians", "1 Tesalonicenses"],
	["2 Thessalonians", "2 Tesalonicenses"],
	["I Thessalonians", "1 Tesalonicenses"],
	["II Thessalonians", "2 Tesalonicenses"],
	["1 Timothy", "1 Timoteo"],
	["2 Timothy", "2 Timoteo"],
	["I Timothy", "1 Timoteo"],
	["II Timothy", "2 Timoteo"],
	["Titus", "Tito"],
	["Philemon", "Filemón"],
	["Hebrews", "Hebreos"],
	["James", "Santiago"],
	["1 Peter", "1 Pedro"],
	["2 Peter", "2 Pedro"],
	["I Peter", "1 Pedro"],
	["II Peter", "2 Pedro"],
	["1 John", "1 Juan"],
	["2 John", "2 Juan"],
	["3 John", "3 Juan"],
	["I John", "1 Juan"],
	["II John", "2 Juan"],
	["III John", "3 Juan"],
	["Jude", "Judas"],
	["Revelation", "Revelación"],
	["Apocalypse", "Revelación"]
];
var NORMALIZED_BOOK_LOOKUP = new Map([
	...BOOKS.map((b) => [normBookName(b.name), b.name]),
	...BOOK_NAME_ALIASES.map(([alias, canonical]) => [normBookName(alias), canonical]),
	...Object.entries(BOOK_ALIASES).map(([alias, canonical]) => [normBookName(alias), canonical])
]);
/** Resolves a book name (any alias, English, accent-less) to a canonical `BOOKS.name`. */
function resolveBookName(input) {
	const key = normBookName(input);
	if (!key) return null;
	return NORMALIZED_BOOK_LOOKUP.get(key) ?? null;
}
var canonicalBook = (name) => resolveBookName(name) ?? BOOK_ALIASES[name] ?? name;
var NAMES = [...BOOKS.map((b) => b.name), ...Object.keys(BOOK_ALIASES)].sort((a, b) => b.length - a.length);
var REF_RE = new RegExp(`(^|[^\\p{L}\\p{N}])(${NAMES.map(escape).join("|")})\\s+(\\d+)(\\s*[:.]\\s*(\\d+)(\\s*[-–]\\s*\\d+)?)?`, "gu");
var LINK_CLASS = "font-medium underline underline-offset-2 text-[#000f37] decoration-[#000f37] hover:text-[#000f37] hover:decoration-[#000f37] dark:text-[#ffffff] dark:decoration-[#ffffff] dark:hover:text-[#ffffff] dark:hover:decoration-[#ffffff] cursor-pointer";
/** Wraps scripture references inside a sanitized HTML string with clickable anchors. */
function linkifyScriptureRefs(html) {
	let n = 0;
	return html.split(/(<[^>]*>)/g).map((part) => {
		if (part.startsWith("<")) return part;
		return part.replace(REF_RE, (_match, pre, book, chapter, _vpart, verse, range) => {
			const target = canonicalBook(book);
			const label = verse ? `${book} ${chapter}:${verse}${range ? String(range).replace(/\s/g, "") : ""}` : `${book} ${chapter}`;
			return `${pre}<a id="${`ref-link-${n++}`}" role="button" tabindex="0" class="${LINK_CLASS}" data-ref-book="${target}" data-ref-chapter="${chapter}" data-ref-verse="${verse ?? 1}">${label}</a>`;
		});
	}).join("");
}
var slug = (name) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
/** Turns scripture references in Markdown text into reader links (skips existing links). */
function linkifyScriptureMarkdown(md) {
	return md.split(/(\[[^\]]*\]\([^)]*\))/g).map((part) => {
		if (part.startsWith("[")) return part;
		return part.replace(REF_RE, (match, pre, book, chapter, _v, verse, range) => {
			const target = canonicalBook(book);
			if (!BOOKS.some((b) => b.name === target)) return match;
			return `${pre}[${verse ? `${book} ${chapter}:${verse}${range ? String(range).replace(/\s/g, "") : ""}` : `${book} ${chapter}`}](/leer/${slug(target)}/${chapter}${verse ? `#verse-${verse}` : ""})`;
		});
	}).join("");
}
//#endregion
export { resolveBookName as i, linkifyScriptureMarkdown as n, linkifyScriptureRefs as r, canonicalBook as t };
