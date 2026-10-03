import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as createOpenAI } from "../_libs/@ai-sdk/openai+[...].mjs";
import { i as streamText, t as convertToModelMessages } from "../_libs/ai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/consulta.server-g-SWHRnZ.js
var LOVABLE_AIG_RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";
function createLovableAiGatewayRunIdFetch(initialRunId) {
	let runId = initialRunId?.trim() || void 0;
	let resolveRunId = () => {};
	let runIdResolved = false;
	const runIdReady = new Promise((resolve) => {
		resolveRunId = resolve;
	});
	const publishRunId = (value) => {
		const next = value?.trim() || void 0;
		if (!runId && next) runId = next;
		if (!runIdResolved) {
			runIdResolved = true;
			resolveRunId(runId);
		}
	};
	if (runId) publishRunId(runId);
	return {
		fetch: async (input, init) => {
			const headers = new Headers(init?.headers);
			if (runId && !headers.has(LOVABLE_AIG_RUN_ID_HEADER)) headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
			try {
				const response = await fetch(input, {
					...init,
					headers
				});
				publishRunId(response.headers.get(LOVABLE_AIG_RUN_ID_HEADER) ?? void 0);
				return response;
			} catch (error) {
				publishRunId(void 0);
				throw error;
			}
		},
		getRunId: () => runId,
		waitForRunId: () => runId ? Promise.resolve(runId) : runIdReady
	};
}
function getLovableAiGatewayRunId(request) {
	return request.headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim() || void 0;
}
async function withLovableAiGatewayRunIdHeader(response, gateway) {
	const headers = new Headers(response.headers);
	if (!response.body) {
		const runId = gateway.getRunId();
		if (runId) headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
		return new Response(null, {
			status: response.status,
			headers
		});
	}
	const reader = response.body.getReader();
	const firstChunk = reader.read();
	const runId = await gateway.waitForRunId();
	if (runId) {
		headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
		headers.set("Access-Control-Expose-Headers", LOVABLE_AIG_RUN_ID_HEADER);
	}
	const body = new ReadableStream({
		async start(controller) {
			try {
				const first = await firstChunk;
				if (first.done) return controller.close();
				controller.enqueue(first.value);
				while (true) {
					const chunk = await reader.read();
					if (chunk.done) break;
					controller.enqueue(chunk.value);
				}
				controller.close();
			} catch (error) {
				controller.error(error);
			}
		},
		cancel(reason) {
			return reader.cancel(reason);
		}
	});
	return new Response(body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}
var MODEL = "openai/gpt-6-astra";
function systemPrompt(ctx) {
	return `Eres "Consultas Patmos", un consultor exegético académico para el estudio bíblico sobre la Reina-Valera 1865.
Responde siempre en español, con tono sobrio, riguroso y pastoralmente respetuoso.
Nunca te describas como inteligencia artificial, IA, bot, robot, asistente virtual ni modelo; si te preguntan qué eres, di que eres el servicio de Consultas Patmos.
Pasaje activo del lector: ${ctx.book && ctx.chapter ? `${ctx.book} ${ctx.chapter}${ctx.verses?.length ? `:${ctx.verses.join(", ")}` : ""}` : "ninguno"}. Si la pregunta es ambigua, asume que se refiere a este pasaje.
Formato (Markdown):
- Usa encabezados breves en negrita o ### para organizar el análisis.
- Cita la Escritura en bloques de cita (> ...) según la Reina-Valera 1865, seguidos de la referencia.
- Escribe siempre las referencias como "Libro capítulo:versículo" con nombres en español (p. ej. Génesis 1:1, Actos 2:38, 1 Corintios 13:4), para que sean enlazables.
- Para términos del texto original, da la palabra hebrea/griega transliterada y su sentido.
- Sé conciso: normalmente menos de 350 palabras.`;
}
async function handleConsulta(request) {
	const apiKey = process.env["LOVABLE_API_KEY"];
	if (!apiKey) return Response.json({ error: "Servicio no configurado." }, { status: 500 });
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
	const { data: userData, error: userError } = await supabase.auth.getUser(token);
	if (userError || !userData.user) return Response.json({ error: "Inicia sesión de nuevo para consultar." }, { status: 401 });
	const userId = userData.user.id;
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Solicitud inválida." }, { status: 400 });
	}
	const messages = Array.isArray(body.messages) ? body.messages.slice(-30) : [];
	const last = messages[messages.length - 1];
	if (!last || last.role !== "user") return Response.json({ error: "Solicitud inválida." }, { status: 400 });
	const saveUser = await supabase.from("patmos_messages").upsert({
		user_id: userId,
		message_id: last.id,
		role: "user",
		parts: last.parts
	}, { onConflict: "user_id,message_id" });
	if (saveUser.error) console.error("patmos save user", saveUser.error);
	const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
	const provider = createOpenAI({
		baseURL: "https://ai.gateway.lovable.dev/v1",
		apiKey,
		headers: {
			"Lovable-API-Key": apiKey,
			"X-Lovable-AIG-SDK": "vercel-ai-sdk"
		},
		fetch: runIdFetch.fetch
	});
	return withLovableAiGatewayRunIdHeader(streamText({
		model: provider.responses(MODEL),
		system: systemPrompt(body.context ?? {}),
		messages: await convertToModelMessages(messages),
		abortSignal: request.signal,
		providerOptions: { openai: {
			forceReasoning: true,
			reasoningEffort: "low",
			reasoningSummary: "auto",
			store: false,
			include: ["reasoning.encrypted_content"]
		} }
	}).toUIMessageStreamResponse({
		originalMessages: messages,
		sendReasoning: false,
		onError: (err) => {
			console.error("patmos stream", err);
			const status = err?.statusCode;
			if (status === 429) return "Hay muchas consultas en este momento. Intenta de nuevo en unos segundos.";
			if (status === 402) return "El servicio de consultas no está disponible temporalmente.";
			return "No pudimos completar la consulta. Intenta de nuevo.";
		},
		onFinish: async ({ responseMessage }) => {
			const parts = responseMessage.parts.filter((p) => p.type === "text");
			if (parts.length === 0) return;
			const { error } = await supabase.from("patmos_messages").upsert({
				user_id: userId,
				message_id: responseMessage.id,
				role: "assistant",
				parts
			}, { onConflict: "user_id,message_id" });
			if (error) console.error("patmos save assistant", error);
		}
	}), runIdFetch);
}
//#endregion
export { handleConsulta };
