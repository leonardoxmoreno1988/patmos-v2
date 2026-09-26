import { createOpenAI } from "@ai-sdk/openai";
import { createClient } from "@supabase/supabase-js";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.server";

const MODEL = "openai/gpt-6-astra";

export interface ConsultaContext {
  book?: string;
  chapter?: number;
  verses?: number[];
}

function systemPrompt(ctx: ConsultaContext) {
  const passage =
    ctx.book && ctx.chapter
      ? `${ctx.book} ${ctx.chapter}${ctx.verses?.length ? `:${ctx.verses.join(", ")}` : ""}`
      : "ninguno";
  return `Eres "Consultas Patmos", un consultor exegético académico para el estudio bíblico sobre la Reina-Valera 1865.
Responde siempre en español, con tono sobrio, riguroso y pastoralmente respetuoso.
Nunca te describas como inteligencia artificial, IA, bot, robot, asistente virtual ni modelo; si te preguntan qué eres, di que eres el servicio de Consultas Patmos.
Pasaje activo del lector: ${passage}. Si la pregunta es ambigua, asume que se refiere a este pasaje.
Formato (Markdown):
- Usa encabezados breves en negrita o ### para organizar el análisis.
- Cita la Escritura en bloques de cita (> ...) según la Reina-Valera 1865, seguidos de la referencia.
- Escribe siempre las referencias como "Libro capítulo:versículo" con nombres en español (p. ej. Génesis 1:1, Actos 2:38, 1 Corintios 13:4), para que sean enlazables.
- Para términos del texto original, da la palabra hebrea/griega transliterada y su sentido.
- Sé conciso: normalmente menos de 350 palabras.`;
}

export async function handleConsulta(request: Request) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return Response.json({ error: "Servicio no configurado." }, { status: 500 });

  const auth = request.headers.get("authorization") ?? "";
  const token = auth.replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ error: "Inicia sesión para consultar." }, { status: 401 });

  const supabase = createClient(
    import.meta.env["VITE_SUPABASE_URL"] as string,
    import.meta.env["VITE_SUPABASE_ANON_KEY"] as string,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    },
  );
  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) {
    return Response.json({ error: "Inicia sesión de nuevo para consultar." }, { status: 401 });
  }
  const userId = userData.user.id;

  let body: { messages?: UIMessage[]; context?: ConsultaContext };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  const messages = Array.isArray(body.messages) ? body.messages.slice(-30) : [];
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const saveUser = await supabase.from("patmos_messages").upsert(
    { user_id: userId, message_id: last.id, role: "user", parts: last.parts },
    { onConflict: "user_id,message_id" },
  );
  if (saveUser.error) console.error("patmos save user", saveUser.error);

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    system: systemPrompt(body.context ?? {}),
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: false,
      onError: (err) => {
        console.error("patmos stream", err);
        const status = (err as { statusCode?: number })?.statusCode;
        if (status === 429) return "Hay muchas consultas en este momento. Intenta de nuevo en unos segundos.";
        if (status === 402) return "El servicio de consultas no está disponible temporalmente.";
        return "No pudimos completar la consulta. Intenta de nuevo.";
      },
      onFinish: async ({ responseMessage }) => {
        const parts = responseMessage.parts.filter((p) => p.type === "text");
        if (parts.length === 0) return;
        const { error } = await supabase.from("patmos_messages").upsert(
          { user_id: userId, message_id: responseMessage.id, role: "assistant", parts },
          { onConflict: "user_id,message_id" },
        );
        if (error) console.error("patmos save assistant", error);
      },
    }),
    runIdFetch,
  );
}
