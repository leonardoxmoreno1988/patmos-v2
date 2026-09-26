import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createOpenAI } from "@ai-sdk/openai";
import { embed, streamText } from "ai";

export const FREE_DAILY_LIMIT = 4;
export const BILLING_PORTAL_URL = "https://patmos.lemonsqueezy.com/billing";

/** Authenticates the caller from the Bearer token the reader sends; RLS applies as that user. */
export async function getUserClient(
  request: Request,
): Promise<{ supabase: SupabaseClient; userId: string } | Response> {
  const token = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ error: "Inicia sesión para consultar." }, { status: 401 });
  const supabase = createClient(
    import.meta.env["VITE_SUPABASE_URL"] as string,
    import.meta.env["VITE_SUPABASE_ANON_KEY"] as string,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    },
  );
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return Response.json({ error: "Inicia sesión de nuevo para consultar." }, { status: 401 });
  }
  return { supabase, userId: data.user.id };
}

async function isPremium(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .in("status", ["active", "on_trial", "past_due"])
    .limit(1);
  return (data?.length ?? 0) > 0;
}

function systemPrompt(context: string) {
  return `Eres "Consultas Patmos", un consultor exegético académico para el estudio bíblico sobre la Reina-Valera 1865.
Responde siempre en español, con tono sobrio, riguroso y pastoralmente respetuoso.
Nunca te describas como inteligencia artificial, IA, bot, robot, asistente virtual ni modelo; si te preguntan qué eres, di que eres el servicio de Consultas Patmos.
La consulta del lector puede empezar con "[Pasaje: ...]": ese es el pasaje que está leyendo; si la pregunta es ambigua, asume que se refiere a él.
Formato (Markdown): encabezados breves en negrita o ###; cita la Escritura en bloques (> ...) según la RV1865 seguidos de la referencia; escribe las referencias como "Libro capítulo:versículo" con nombres en español (Génesis 1:1, Actos 2:38); para términos originales da la palabra hebrea/griega transliterada y su sentido; normalmente menos de 350 palabras.
${context ? `\nFuentes de estudio relevantes (úsalas cuando apliquen):\n${context}` : ""}`;
}

export async function handleChat(request: Request) {
  const apiKey = process.env["OPENAI_API_KEY"];
  if (!apiKey) {
    return Response.json(
      { error: "El servicio de Consultas Patmos aún no está configurado." },
      { status: 503 },
    );
  }

  const auth = await getUserClient(request);
  if (auth instanceof Response) return auth;
  const { supabase, userId } = auth;

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  const userQuery = body.messages?.filter((m) => m.role === "user").pop()?.content?.trim() ?? "";
  if (!userQuery || userQuery.length > 4000) {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Paywall: 4 consultas diarias gratuitas.
  if (!(await isPremium(supabase, userId))) {
    const since = new Date();
    since.setUTCHours(0, 0, 0, 0);
    const { count } = await supabase
      .from("chat_history")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", since.toISOString());
    if ((count ?? 0) >= FREE_DAILY_LIMIT) {
      return Response.json(
        { error: "Has alcanzado el límite diario de consultas.", limit: FREE_DAILY_LIMIT },
        { status: 429 },
      );
    }
  }

  const openai = createOpenAI({ apiKey });

  // Contexto semántico desde match_documents.
  let context = "";
  try {
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: userQuery,
    });
    const { data } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.75,
      match_count: 5,
    });
    context = ((data ?? []) as Array<{ content?: string }>)
      .map((d) => d.content)
      .filter(Boolean)
      .join("\n---\n");
  } catch (e) {
    console.error("patmos match_documents", e);
  }

  const result = streamText({
    model: openai.chat("gpt-4o"),
    system: systemPrompt(context),
    prompt: userQuery,
    abortSignal: request.signal,
    onFinish: async ({ text }) => {
      if (!text) return;
      const { error } = await supabase
        .from("chat_history")
        .insert({ user_id: userId, user_query: userQuery, bot_response: text });
      if (error) console.error("patmos chat_history insert", error);
    },
    onError: ({ error }) => console.error("patmos stream", error),
  });

  return result.toTextStreamResponse({ headers: { "Cache-Control": "no-cache, no-transform" } });
}

export async function handleHistory(request: Request) {
  const auth = await getUserClient(request);
  if (auth instanceof Response) return auth;
  const { supabase, userId } = auth;

  if (request.method === "DELETE") {
    const { error } = await supabase.from("chat_history").delete().eq("user_id", userId);
    if (error) return Response.json({ error: "No se pudo borrar." }, { status: 500 });
    return Response.json({ ok: true });
  }

  const { data, error } = await supabase
    .from("chat_history")
    .select("id, user_query, bot_response, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) return Response.json({ error: "No se pudo cargar." }, { status: 500 });
  return Response.json({ history: data ?? [] }, { headers: { "Cache-Control": "no-store" } });
}

export async function handleBilling(request: Request) {
  const auth = await getUserClient(request);
  if (auth instanceof Response) return auth;
  const { supabase, userId } = auth;
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return Response.json({ url: BILLING_PORTAL_URL, subscription: data ?? null });
}
