import { n as createClient } from "./dist-DtePOooj.mjs";
import { o as fetchBook, r as CHAPTER_COUNTS, t as BOOKS } from "./bible-CwIUYS_X.mjs";
import { i as resolveBookName } from "./scripture-refs-Cn_GoRyO.mjs";
import { Ct as tool, Jt as number, Qt as string, Yt as object } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createOpenAI } from "../_libs/@ai-sdk/openai+[...].mjs";
import { i as streamText, n as embedMany, r as isStepCount } from "../_libs/ai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api.server-UMH2vzLS.js
function findBook(bookName) {
	const canonical = resolveBookName(bookName);
	if (!canonical) return void 0;
	return BOOKS.find((b) => b.name === canonical);
}
function parseVerseRange(range) {
	if (!range?.trim()) return { error: "Debes indicar verseRange (p. ej. \"15\" o \"15-17\")." };
	const r = range.trim();
	const single = /^(\d+)$/.exec(r);
	if (single) {
		const v = Number(single[1]);
		return {
			from: v,
			to: v
		};
	}
	const span = /^(\d+)\s*[-–]\s*(\d+)$/.exec(r);
	if (span) {
		const from = Number(span[1]);
		const to = Number(span[2]);
		if (to < from) return { error: `Rango inválido: ${range}. El versículo final debe ser mayor o igual al inicial.` };
		return {
			from,
			to
		};
	}
	return { error: `Formato de verseRange no válido: "${range}". Usa "15" o "15-17".` };
}
/** Resolves RV1865 verse text for the chat tool `fetch_rv1865_verse`. */
async function executeFetchRv1865Verse(params) {
	const book = findBook(params.bookName);
	if (!book) return {
		ok: false,
		error: `Libro no encontrado: "${params.bookName}". Usa el nombre canónico en español (p. ej. Génesis, 2 Timoteo, 1 Corintios).`
	};
	if (!Number.isInteger(params.chapter) || params.chapter < 1) return {
		ok: false,
		error: `Capítulo inválido: ${params.chapter}.`
	};
	const maxChapter = CHAPTER_COUNTS[book.bookid];
	if (maxChapter && params.chapter > maxChapter) return {
		ok: false,
		error: `${book.name} solo tiene ${maxChapter} capítulos; se solicitó el capítulo ${params.chapter}.`
	};
	const parsed = parseVerseRange(params.verseRange);
	if ("error" in parsed) return {
		ok: false,
		error: parsed.error
	};
	let chapters;
	try {
		chapters = await fetchBook(book.bookid);
	} catch {
		return {
			ok: false,
			error: `No se pudo cargar el texto de ${book.name} desde la fuente RV1865.`
		};
	}
	const chapterData = chapters.find((c) => c.chapter === params.chapter);
	if (!chapterData) return {
		ok: false,
		error: `El capítulo ${params.chapter} de ${book.name} no está disponible en RV1865.`
	};
	const verses = chapterData.verses.filter((v) => v.verse >= parsed.from && v.verse <= parsed.to);
	if (verses.length === 0) {
		const last = chapterData.verses.at(-1)?.verse;
		const hint = last ? ` Versículos disponibles en este capítulo: 1–${last}.` : "";
		return {
			ok: false,
			error: `No hay versículos ${parsed.from === parsed.to ? `${parsed.from}` : `${parsed.from}–${parsed.to}`} en ${book.name} ${params.chapter}.${hint}`
		};
	}
	const rangeLabel = parsed.from === parsed.to ? `${parsed.from}` : `${parsed.from}-${parsed.to}`;
	return {
		ok: true,
		reference: `${book.name} ${params.chapter}:${rangeLabel}`,
		text: verses.map((v) => v.text).join(" "),
		verses: verses.map((v) => ({
			verse: v.verse,
			text: v.text
		}))
	};
}
var BILLING_PORTAL_URL = "https://patmos.lemonsqueezy.com/billing";
/** Authenticates the caller from the Bearer token the reader sends; RLS applies as that user. */
async function getUserClient(request) {
	const token = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
	if (!token) return Response.json({ error: "Inicia sesión para consultar." }, { status: 401 });
	const supabase = createClient({
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
	}["VITE_SUPABASE_URL"], {
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
	}["VITE_SUPABASE_ANON_KEY"], {
		auth: {
			persistSession: false,
			autoRefreshToken: false
		},
		global: { headers: { Authorization: `Bearer ${token}` } }
	});
	const { data, error } = await supabase.auth.getUser(token);
	if (error || !data.user) return Response.json({ error: "Inicia sesión de nuevo para consultar." }, { status: 401 });
	return {
		supabase,
		userId: data.user.id
	};
}
async function isPremium(supabase, userId) {
	const { data } = await supabase.from("subscriptions").select("status").eq("user_id", userId).in("status", [
		"active",
		"on_trial",
		"past_due"
	]).limit(1);
	return (data?.length ?? 0) > 0;
}
var PATMOS_SYSTEM_PROMPT = `Eres "Consultas Patmos", el Vigía Dispensacional: consultor exegético académico de voz severa, sobria y profunda, dedicado al estudio de las Escrituras según la Reina-Valera 1865, el Textus Receptus y el marco dispensacionalista clásico (KJV / Bible Believer).

IDENTIDAD Y TONO:
- Hablas como un erudito bíblico de alta profundidad doctrinal: grave, riguroso, pastoralmente respetuoso, con la mirada del vigilante que discierne los tiempos a la luz de la profecía.
- Respondes siempre en español formal, con el léxico y la cadencia clásica de la Reina-Valera 1865.
- Jamás te identifiques como inteligencia artificial, IA, bot, modelo ni asistente virtual; ante cualquier pregunta sobre tu naturaleza, declara que eres el servicio de Consultas Patmos.

MODO DE CONOCIMIENTO HÍBRIDO (MÁXIMA COBERTERA Y FLUIDEZ):
1. PRIORIDAD: Si los fragmentos en <SUPABASE_SECURE_CONTEXT> o <ACTIVE_READER_CONTEXT> contienen información relevante para la consulta, utilízalos como tu fuente principal y sintetízalos con amplitud.
2. COMPLEMENTO DISPENSACIONAL: Si el contexto de Supabase está vacío, es parcial o no cubre el tema específico, NO digas "el material no detalla" ni te niegues a responder. En su lugar, responde directamente utilizando la Teología Dispensacional Clásica (marco KJV 1611 / Textus Receptus / Lógica de división de dispensaciones), manteniendo siempre la voz sobria y académica de Consultas Patmos.

PROHIBICIÓN DE META-LENGUAJE Y ANUNCIOS:
- Prohibido el meta-lenguaje técnico: jamás digas "según los archivos", "en la base de datos", "el contexto no menciona", "según la inteligencia artificial" ni "los bloques provistos".
- EJECUCIÓN SILENCIOSA DE HERRAMIENTAS: NO generes ninguna frase, conversación ni anuncio de relleno antes de invocar una herramienta. Queda ESTRICTAMENTE PROHIBIDO escribir frases como "Procederé a obtener...", "Permíteme buscar...", "Un momento por favor" o "Analizaremos el texto". Si decides usar \`fetch_rv1865_verse\`, invócala INMEDIATAMENTE sin emitir una sola palabra previa.

TERMINOLOGÍA OBLIGATORIA (RV1865):
- Debes usar SIEMPRE los nombres auténticos de los libros según la Reina-Valera 1865 en tus respuestas y encabezados.
- Escribe SIEMPRE "Revelación" en lugar de "Apocalipsis".
- Escribe SIEMPRE "Actos" en lugar de "Hechos".
- Queda estrictamente prohibido usar las palabras "Apocalipsis" o "Hechos" en cualquier parte de tu salida.

CITACIÓN BÍBLICA:
- Tienes acceso a la herramienta \`fetch_rv1865_verse\`. SIEMPRE que necesites citar o referenciar un versículo concreto, DEBES invocar esta herramienta para obtener el texto auténtico en español de la Reina-Valera 1865. NO traduzcas citas por tu cuenta ni uses la RV1960 de memoria.
- Cita la Escritura en bloques de cita (> ...) con el texto exacto devuelto por la herramienta, seguido de la referencia con el formato "Libro capítulo:versículo" (ej. Génesis 1:1, Actos 2:38, Revelación 13:3).

MÉTODO EXEGÉTICO Y ESTRUCTURA:
- Desarrolla respuestas sustanciales, estructuradas con párrafos sobrios, viñetas y encabezados Markdown.
- Aplica el marco dispensacional: distingue claramente a quién va dirigido el pasaje (Judíos, Gentiles o la Iglesia de Dios)`;
var RAG_MATCH_THRESHOLD = .2;
var RAG_MAX_CHUNKS = 30;
/** Topics that often need parallel OT/prophecy chunks beyond the literal user query. */
function needsCrossRefExpansion(query) {
	const n = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
	return /anticrist|herida|segunda venida|segundo adviento|parusia|profec|revelacion|apocalipsis|zacarias|daniel|ezekiel|isaias|jeremias|tipos?( del)? antiguo testamento|old testament type|venida del senor|bestia| cabeza | brazo | ojo /.test(n);
}
/** Primary query plus supplementary embeddings for prophecy / OT-type cross-references. */
function buildRagSearchQueries(userQuery) {
	const q = userQuery.trim();
	if (!needsCrossRefExpansion(q)) return [q];
	return [
		q,
		`${q} Old Testament types Zechariah Daniel parallel prophecy cross-reference typology`,
		"Zechariah Daniel Old Testament prophecy types antichrist wound idol shepherd right eye arm dispensational cross-reference"
	];
}
function dedupeDocuments(docs) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const doc of docs) {
		const key = doc.content ?? "";
		if (!key || seen.has(key)) continue;
		seen.add(key);
		out.push(doc);
	}
	return out;
}
async function retrieveStudyContext(supabase, openai, userQuery) {
	const queries = buildRagSearchQueries(userQuery);
	const { embeddings } = await embedMany({
		model: openai.embedding("text-embedding-3-small"),
		values: queries
	});
	const batches = await Promise.all(embeddings.map((query_embedding) => supabase.rpc("match_documents", {
		query_embedding,
		match_threshold: RAG_MATCH_THRESHOLD,
		match_count: 20
	})));
	const primaryDocs = dedupeDocuments((batches[0]?.data ?? []).filter((d) => d.content));
	const expansionDocs = dedupeDocuments(batches.slice(1).flatMap(({ data }) => (data ?? []).filter((d) => d.content)));
	const combined = dedupeDocuments([...primaryDocs.slice(0, 15), ...expansionDocs.slice(0, 15)]).slice(0, RAG_MAX_CHUNKS);
	return combined.length > 0 ? formatArchiveBlocks(combined) : "";
}
/** Formats retrieved study chunks as numbered ARCHIVE_BLOCK XML for the secure context. */
function formatArchiveBlocks(docs) {
	return docs.map((doc, i) => {
		const type = doc.type ?? "study";
		const source = doc.source ?? "Patmos";
		const book = doc.book ?? "—";
		const version = doc.version ?? "RV1865";
		const range = doc.verse_start != null ? ` | Verses: ${doc.verse_start}${doc.verse_end != null && doc.verse_end !== doc.verse_start ? `-${doc.verse_end}` : ""}` : "";
		const chapter = doc.chapter != null ? ` | Chapter: ${doc.chapter}` : "";
		return `<ARCHIVE_BLOCK_${i + 1} type="${type}" source="${source}">\n[Metadata: Book: ${book} | Version: ${version}${range}${chapter}]\n${doc.content ?? ""}\n</ARCHIVE_BLOCK_${i + 1}>`;
	}).join("\n\n");
}
/**
* Shown when no model credentials are configured. Answering with a normal
* response (instead of a 5xx) keeps the reader working: the panel renders it
* as a plain reply and nothing is stored in the Registros Históricos.
*/
function notConfiguredResponse() {
	return new Response("El servicio de Consultas Patmos todavía no está disponible, así que no puedo responder a tu consulta. Inténtalo más tarde.", {
		status: 200,
		headers: {
			"content-type": "text/plain; charset=utf-8",
			"cache-control": "no-store, no-transform",
			"x-patmos-configured": "false"
		}
	});
}
async function handleChat(request) {
	const auth = await getUserClient(request);
	if (auth instanceof Response) return auth;
	const { supabase, userId } = auth;
	const apiKey = process.env["OPENAI_API_KEY"];
	if (!apiKey) return notConfiguredResponse();
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Solicitud inválida." }, { status: 400 });
	}
	const userQuery = body.messages?.filter((m) => m.role === "user").pop()?.content?.trim() ?? "";
	if (!userQuery || userQuery.length > 4e3) return Response.json({ error: "Solicitud inválida." }, { status: 400 });
	const activeReaderContext = typeof body.readerContext === "string" ? body.readerContext.replace(/<\/?ACTIVE_READER_CONTEXT>/g, "").trim().slice(0, 6e4) : "";
	if (!await isPremium(supabase, userId)) {
		const since = /* @__PURE__ */ new Date();
		since.setUTCHours(0, 0, 0, 0);
		const { count } = await supabase.from("chat_history").select("id", {
			count: "exact",
			head: true
		}).eq("user_id", userId).gte("created_at", since.toISOString());
		if ((count ?? 0) >= 4) return Response.json({
			error: "Has alcanzado el límite diario de consultas.",
			limit: 4
		}, { status: 429 });
	}
	const openai = createOpenAI({ apiKey });
	let secureContext = "";
	try {
		secureContext = await retrieveStudyContext(supabase, openai, userQuery);
	} catch (e) {
		console.error("patmos match_documents", e);
	}
	const prompt = [
		...activeReaderContext ? [`<ACTIVE_READER_CONTEXT>\n${activeReaderContext}\n</ACTIVE_READER_CONTEXT>`] : [],
		`<SUPABASE_SECURE_CONTEXT>\n${secureContext || "No hay material de estudio asociado a esta consulta."}\n</SUPABASE_SECURE_CONTEXT>`,
		`<USER_QUERY>\n${userQuery}\n</USER_QUERY>`
	].join("\n\n");
	return streamText({
		model: openai.chat("gpt-4o"),
		system: PATMOS_SYSTEM_PROMPT,
		prompt,
		temperature: 0,
		tools: { fetch_rv1865_verse: tool({
			description: "Obtiene el texto exacto de la Reina-Valera 1865 (RV1865) para uno o varios versículos consecutivos de un libro bíblico.",
			inputSchema: object({
				bookName: string().describe("Nombre del libro en español, p. ej. \"Génesis\", \"2 Timoteo\", \"1 Corintios\"."),
				chapter: number().int().positive().describe("Número de capítulo."),
				verseRange: string().optional().describe("Versículo(s) solicitados, p. ej. \"15\" o \"15-17\".")
			}),
			execute: async ({ bookName, chapter, verseRange }) => {
				const out = await executeFetchRv1865Verse({
					bookName,
					chapter,
					...verseRange !== void 0 ? { verseRange } : {}
				});
				if (!out.ok) return { error: out.error };
				return {
					reference: out.reference,
					translation: "RV1865",
					text: out.text,
					verses: out.verses
				};
			}
		}) },
		stopWhen: isStepCount(10),
		abortSignal: request.signal,
		onFinish: async ({ text }) => {
			if (!text) return;
			const { error } = await supabase.from("chat_history").insert({
				user_id: userId,
				user_query: userQuery,
				bot_response: text
			});
			if (error) console.error("patmos chat_history insert", error);
		},
		onError: ({ error }) => console.error("patmos stream", error)
	}).toTextStreamResponse({ headers: { "Cache-Control": "no-cache, no-transform" } });
}
async function handleHistory(request) {
	const auth = await getUserClient(request);
	if (auth instanceof Response) return auth;
	const { supabase, userId } = auth;
	if (request.method === "DELETE") {
		const { error } = await supabase.from("chat_history").delete().eq("user_id", userId);
		if (error) return Response.json({ error: "No se pudo borrar." }, { status: 500 });
		return Response.json({ ok: true });
	}
	const { data, error } = await supabase.from("chat_history").select("id, user_query, bot_response, created_at").eq("user_id", userId).order("created_at", { ascending: false });
	if (error) return Response.json({ error: "No se pudo cargar." }, { status: 500 });
	return Response.json({ history: data ?? [] }, { headers: { "Cache-Control": "no-store" } });
}
async function handleBilling(request) {
	const auth = await getUserClient(request);
	if (auth instanceof Response) return auth;
	const { supabase, userId } = auth;
	const { data } = await supabase.from("subscriptions").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
	return Response.json({
		url: BILLING_PORTAL_URL,
		subscription: data ?? null
	});
}
//#endregion
export { handleBilling, handleChat, handleHistory };
