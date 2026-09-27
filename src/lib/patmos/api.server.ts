import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createOpenAI } from "@ai-sdk/openai";
import { embed, stepCountIs, streamText, tool } from "ai";
import { z } from "zod";

import { executeFetchRv1865Verse } from "./fetch-rv1865-verse.server";

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

const PATMOS_SYSTEM_PROMPT = `Eres "Consultas Patmos", el Vigía Dispensacional: consultor exegético académico de voz severa y sobria, dedicado al estudio de las Escrituras según la Reina-Valera 1865 y el Textus Receptus.

IDENTIDAD Y TONO:
- Hablas como un erudito bíblico de alta profundidad doctrinal: grave, riguroso, pastoralmente respetuoso, con la mirada del vigilante que discierne los tiempos a la luz de la profecía.
- Respondes siempre en español formal, con el léxico y la cadencia de la Reina-Valera 1865.
- Nunca te describas como inteligencia artificial, IA, bot, robot, asistente virtual ni modelo; si te preguntan qué eres, di que eres el servicio de Consultas Patmos.

PROHIBICIONES ESTRICTAS:
- Prohibido todo meta-lenguaje sobre fuentes, archivos, contextos o bases de datos: nada de "según los archivos", "en el contexto proporcionado", "no encuentro información en la base de datos" ni "el contexto no menciona". Si el material de estudio no cubre algo, resuélvelo desde el conocimiento exegético general sin señalar carencias.
- No uses encabezados Markdown con #; los títulos de sección van siempre en negrita (**Título**).

CITACIÓN BÍBLICA (RV1865):
- Tienes acceso a la herramienta \`fetch_rv1865_verse\`. SIEMPRE que necesites citar o referenciar un versículo concreto basándote en las notas KJV en inglés, DEBES invocar esta herramienta para obtener el texto auténtico de la Reina-Valera 1865. NO traduzcas por tu cuenta citas bíblicas al español ni uses la Reina-Valera 1960 ni otras versiones de memoria.

MÉTODO EXEGÉTICO:
- Ofrece análisis exegético natural y continuo: no fuerces desgloses etimológicos del hebreo ni del griego salvo que aporten algo esencial a la pregunta.
- Cita la Escritura en bloques de cita (> ...) con el texto exacto devuelto por \`fetch_rv1865_verse\`, y añade la referencia detrás.
- Escribe siempre las referencias como "Libro capítulo:versículo" con nombres en español (p. ej. Génesis 1:1, Actos 2:38, 1 Corintios 13:4), para que sean enlazables.
- Estructura con títulos en negrita, doble salto de línea entre párrafos y viñetas eruditas (-) cuando ordenen la exposición.
- El contexto del lector trae el capítulo que está leyendo y sus notas de estudio; si la pregunta es ambigua, asume que se refiere a ese pasaje.
- Sé conciso: normalmente menos de 350 palabras.`;

interface MatchDocument {
  content?: string;
  type?: string;
  source?: string;
  book?: string;
  version?: string;
  chapter?: number | string;
  verse_start?: number;
  verse_end?: number;
}

/** Formats retrieved study chunks as numbered ARCHIVE_BLOCK XML for the secure context. */
function formatArchiveBlocks(docs: MatchDocument[]): string {
  return docs
    .map((doc, i) => {
      const type = doc.type ?? "study";
      const source = doc.source ?? "Patmos";
      const book = doc.book ?? "—";
      const version = doc.version ?? "RV1865";
      const range =
        doc.verse_start != null
          ? ` | Verses: ${doc.verse_start}${doc.verse_end != null && doc.verse_end !== doc.verse_start ? `-${doc.verse_end}` : ""}`
          : "";
      const chapter = doc.chapter != null ? ` | Chapter: ${doc.chapter}` : "";
      return `<ARCHIVE_BLOCK_${i + 1} type="${type}" source="${source}">\n[Metadata: Book: ${book} | Version: ${version}${range}${chapter}]\n${doc.content ?? ""}\n</ARCHIVE_BLOCK_${i + 1}>`;
    })
    .join("\n\n");
}

/**
 * Shown when no model credentials are configured. Answering with a normal
 * response (instead of a 5xx) keeps the reader working: the panel renders it
 * as a plain reply and nothing is stored in the Registros Históricos.
 */
function notConfiguredResponse() {
  return new Response(
    "El servicio de Consultas Patmos todavía no está disponible, así que no puedo responder a tu consulta. Inténtalo más tarde.",
    {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store, no-transform",
        "x-patmos-configured": "false",
      },
    },
  );
}

export async function handleChat(request: Request) {
  const auth = await getUserClient(request);
  if (auth instanceof Response) return auth;
  const { supabase, userId } = auth;

  const apiKey = process.env["OPENAI_API_KEY"];
  if (!apiKey) return notConfiguredResponse();


  let body: { messages?: Array<{ role: string; content: string }>; readerContext?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  const userQuery = body.messages?.filter((m) => m.role === "user").pop()?.content?.trim() ?? "";
  if (!userQuery || userQuery.length > 4000) {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  // Reader context: strip outer tags (re-added below) and cap size (~long chapters like Salmos 119).
  const activeReaderContext =
    typeof body.readerContext === "string"
      ? body.readerContext
          .replace(/<\/?ACTIVE_READER_CONTEXT>/g, "")
          .trim()
          .slice(0, 60000)
      : "";

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

  // Contexto semántico desde match_documents (umbral 0.30, 15 fragmentos).
  let secureContext = "";
  try {
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: userQuery,
    });
    const { data } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.3,
      match_count: 15,
    });
    const docs = ((data ?? []) as MatchDocument[]).filter((d) => d.content);
    if (docs.length > 0) secureContext = formatArchiveBlocks(docs);
  } catch (e) {
    console.error("patmos match_documents", e);
  }

  // One clean payload: what the reader sees, then the retrieved study material, then the question.
  const prompt = [
    ...(activeReaderContext ? [`<ACTIVE_READER_CONTEXT>\n${activeReaderContext}\n</ACTIVE_READER_CONTEXT>`] : []),
    `<SUPABASE_SECURE_CONTEXT>\n${secureContext || "No hay material de estudio asociado a esta consulta."}\n</SUPABASE_SECURE_CONTEXT>`,
    `<USER_QUERY>\n${userQuery}\n</USER_QUERY>`,
  ].join("\n\n");

  const result = streamText({
    model: openai.chat("gpt-4o"),
    system: PATMOS_SYSTEM_PROMPT,
    prompt,
    temperature: 0,
    tools: {
      fetch_rv1865_verse: tool({
        description:
          "Obtiene el texto exacto de la Reina-Valera 1865 (RV1865) para uno o varios versículos consecutivos de un libro bíblico.",
        inputSchema: z.object({
          bookName: z
            .string()
            .describe('Nombre del libro en español, p. ej. "Génesis", "2 Timoteo", "1 Corintios".'),
          chapter: z.number().int().positive().describe("Número de capítulo."),
          verseRange: z
            .string()
            .optional()
            .describe('Versículo(s) solicitados, p. ej. "15" o "15-17".'),
        }),
        execute: async ({ bookName, chapter, verseRange }) => {
          const out = await executeFetchRv1865Verse({
            bookName,
            chapter,
            ...(verseRange !== undefined ? { verseRange } : {}),
          });
          if (!out.ok) return { error: out.error };
          return {
            reference: out.reference,
            translation: "RV1865",
            text: out.text,
            verses: out.verses,
          };
        },
      }),
    },
    stopWhen: stepCountIs(10),
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
