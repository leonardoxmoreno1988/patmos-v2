import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createOpenAI } from "@ai-sdk/openai";
import { embedMany, stepCountIs, streamText, tool } from "ai";
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

const PATMOS_SYSTEM_PROMPT = `Eres "Consultas Patmos", el Vigía Dispensacional: consultor exegético académico de voz severa, sobria y profunda, dedicado al estudio de las Escrituras según la Reina-Valera 1865, el Textus Receptus y el marco dispensacionalista clásico (KJV / Bible Believer).

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

interface MatchDocument {
  id?: string;
  content?: string;
  type?: string;
  source?: string;
  book?: string;
  version?: string;
  chapter?: number | string;
  verse_start?: number;
  verse_end?: number;
  similarity?: number;
  metadata?: Record<string, any>;
}

const RAG_MATCH_THRESHOLD = 0.20; // Bajamos de 0.22 a 0.1 para capturar coincidencias cross-language (ES -> EN)
const RAG_MAX_CHUNKS = 30;

/** Topics that often need parallel OT/prophecy chunks beyond the literal user query. */
function needsCrossRefExpansion(query: string): boolean {
  const n = query
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return /anticrist|herida|segunda venida|segundo adviento|parusia|profec|revelacion|apocalipsis|zacarias|daniel|ezekiel|isaias|jeremias|tipos?( del)? antiguo testamento|old testament type|venida del senor|bestia| cabeza | brazo | ojo /.test(
    n,
  );
}

/** Primary query plus supplementary embeddings for prophecy / OT-type cross-references. */
function buildRagSearchQueries(userQuery: string): string[] {
  const q = userQuery.trim();
  if (!needsCrossRefExpansion(q)) return [q];
  return [
    q,
    `${q} Old Testament types Zechariah Daniel parallel prophecy cross-reference typology`,
    "Zechariah Daniel Old Testament prophecy types antichrist wound idol shepherd right eye arm dispensational cross-reference",
  ];
}

function dedupeDocuments(docs: MatchDocument[]): MatchDocument[] {
  const seen = new Set<string>();
  const out: MatchDocument[] = [];
  for (const doc of docs) {
    const key = doc.content ?? "";
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(doc);
  }
  return out;
}

async function retrieveStudyContext(
  supabase: SupabaseClient,
  openai: ReturnType<typeof createOpenAI>,
  userQuery: string,
): Promise<string> {
  const queries = buildRagSearchQueries(userQuery);
  const { embeddings } = await embedMany({
    model: openai.embedding("text-embedding-3-small"),
    values: queries,
  });

  const batches = await Promise.all(
    embeddings.map((query_embedding) =>
      supabase.rpc("match_documents", {
        query_embedding,
        match_threshold: RAG_MATCH_THRESHOLD,
        match_count: 20,
      }),
    ),
  );

  const primaryDocs = dedupeDocuments(((batches[0]?.data ?? []) as MatchDocument[]).filter((d) => d.content));
  const expansionDocs = dedupeDocuments(
    batches
      .slice(1)
      .flatMap(({ data }) => ((data ?? []) as MatchDocument[]).filter((d) => d.content)),
  );

  const combined = dedupeDocuments([
    ...primaryDocs.slice(0, 15),
    ...expansionDocs.slice(0, 15),
  ]).slice(0, RAG_MAX_CHUNKS);

  return combined.length > 0 ? formatArchiveBlocks(combined) : "";
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

  // Contexto semántico enriquecido utilizando la función Multi-Query (Español + Inglés)
  let secureContext = "";
  try {
    secureContext = await retrieveStudyContext(supabase, openai, userQuery);
  } catch (e) {
    console.error("patmos match_documents", e);
  }

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