import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Copy, CreditCard, Printer, RotateCcw, Check } from "lucide-react";

import patmosMark from "@/assets/patmos-mark.png";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { supabase } from "@/lib/supabase";
import { linkifyScriptureMarkdown } from "@/lib/scripture-refs";

const STARTERS = [
  "¿Cuál es el contexto histórico de este capítulo?",
  "Ver análisis del texto original (Reina Valera 1865)",
  "Referencias cruzadas clave para este pasaje",
];

const CHECKOUT_URL = (userId: string) =>
  `https://patmos.lemonsqueezy.com/checkout/buy/4beafe1a-6811-457e-b7b5-02e216f8aeef?checkout[custom][user_id]=${encodeURIComponent(userId)}&embed=1`;

export function PatmosMark({ className }: { className?: string }) {
  return <img src={patmosMark} alt="" width={816} height={816} className={className} />;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
  book: string;
  chapter: number;
  verses: number[];
  onRequireAuth: () => void;
}

type Status = "ready" | "submitted" | "streaming" | "error";
interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  text: string;
}

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function extractDelta(payload: string): string {
  try {
    const j = JSON.parse(payload);
    if (typeof j === "string") return j;
    return (
      j?.choices?.[0]?.delta?.content ??
      j?.delta?.text ??
      j?.delta ??
      j?.text ??
      j?.content ??
      ""
    );
  } catch {
    return payload;
  }
}

export function ConsultaPatmos(props: Props) {
  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <div className="flex items-start gap-3 border-b border-border px-5 pb-4 pt-5 pr-12">
          <PatmosMark className="h-10 w-10 shrink-0" />
          <div className="min-w-0">
            <SheetTitle className="text-lg font-bold tracking-tight">Consultas Patmos</SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              Análisis Exegético y contexto histórico del texto
            </SheetDescription>
          </div>
        </div>
        {props.userId ? (
          <ConsultaChat key={props.userId} {...props} userId={props.userId} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="text-sm text-muted-foreground">
              Inicia sesión para realizar consultas y conservar tus Registros Históricos.
            </p>
            <button
              type="button"
              onClick={props.onRequireAuth}
              className="h-9 rounded-full bg-[#000f37] px-5 text-sm font-medium text-white hover:opacity-90 dark:bg-white dark:text-[#000f37]"
            >
              Iniciar Sesión
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function ConsultaChat({ userId, book, chapter, verses, onOpenChange }: Props & { userId: string }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [status, setStatus] = useState<Status>("ready");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCredits, setHasCredits] = useState(true);
  const [confirmPurge, setConfirmPurge] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const passage = `${book} ${chapter}${
    verses.length
      ? `:${verses.length > 3 ? `${verses[0]}–${verses[verses.length - 1]}` : verses.join(", ")}`
      : ""
  }`;

  // Registros Históricos
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/history", { headers: await authHeaders() });
        if (!res.ok) throw new Error(String(res.status));
        const json = await res.json();
        const rows: Array<{ id?: string; user_query?: string; bot_response?: string }> =
          Array.isArray(json) ? json : (json.history ?? json.data ?? []);
        if (cancelled) return;
        setMessages(
          rows.flatMap((r, i) => {
            const base = r.id ?? `h${i}`;
            const out: ChatMsg[] = [];
            if (r.user_query) out.push({ id: `${base}-u`, role: "user", text: r.user_query });
            if (r.bot_response) out.push({ id: `${base}-a`, role: "assistant", text: r.bot_response });
            return out;
          }),
        );
      } catch {
        if (!cancelled) setError("No pudimos cargar los Registros Históricos.");
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!busy) textareaRef.current?.focus();
  }, [busy, loaded]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("ready");
  }, []);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    if (!hasCredits) return;
    setError(null);
    const userMsg: ChatMsg = { id: crypto.randomUUID(), role: "user", text: t };
    const asstId = crypto.randomUUID();
    setMessages((m) => [...m, userMsg]);
    setStatus("submitted");
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        signal: ctrl.signal,
        headers: { "Content-Type": "application/json", ...(await authHeaders()) },
        body: JSON.stringify({
          messages: [{ role: "user", content: `[Pasaje: ${passage}] ${t}` }],
        }),
      });

      if (res.status === 429) {
        setHasCredits(false);
        setStatus("ready");
        return;
      }
      if (res.status === 401) throw new Error("Inicia sesión de nuevo para consultar.");
      if (!res.ok || !res.body) throw new Error("No pudimos completar la consulta. Inténtalo de nuevo.");

      const isSSE = (res.headers.get("content-type") ?? "").includes("event-stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let buf = "";
      setMessages((m) => [...m, { id: asstId, role: "assistant", text: "" }]);
      setStatus("streaming");

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (isSSE) {
          buf += chunk;
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            acc += extractDelta(data);
          }
        } else {
          acc += chunk;
        }
        const snapshot = acc;
        setMessages((m) => m.map((x) => (x.id === asstId ? { ...x, text: snapshot } : x)));
      }
      setStatus("ready");
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setError((e as Error).message || "No pudimos completar la consulta.");
      setStatus("error");
    } finally {
      abortRef.current = null;
    }
  };

  const purge = async () => {
    stop();
    setConfirmPurge(false);
    try {
      const res = await fetch("/api/history", { method: "DELETE", headers: await authHeaders() });
      if (!res.ok) throw new Error();
      setMessages([]);
    } catch {
      setError("No pudimos borrar los Registros Históricos.");
    }
  };

  const openBilling = async () => {
    const win = window.open("", "_blank");
    try {
      const res = await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(await authHeaders()) },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      const url = json.url ?? json.portalUrl ?? json.portal_url;
      if (!res.ok || !url) throw new Error();
      if (win) win.location.href = url;
      else window.open(url, "_blank", "noopener");
    } catch {
      win?.close();
      setError("No pudimos abrir la gestión de suscripción.");
    }
  };

  const copy = async (m: ChatMsg) => {
    await navigator.clipboard.writeText(m.text);
    setCopied(m.id);
    setTimeout(() => setCopied(null), 1500);
  };

  const print = (m: ChatMsg) => {
    const html = document.getElementById(`patmos-${m.id}`)?.innerHTML ?? m.text;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Consultas Patmos — ${passage}</title>
<style>body{font-family:Georgia,serif;max-width:680px;margin:48px auto;padding:0 24px;color:#111;line-height:1.65}
h1{font-size:20px;border-bottom:1px solid #ccc;padding-bottom:8px}blockquote{border-left:3px solid #b8964f;margin:12px 0;padding-left:12px;font-style:italic}
a{color:inherit}.meta{font-size:12px;color:#666}</style></head><body>
<h1>Consultas Patmos · Análisis Exegético</h1><p class="meta">Pasaje: ${passage} · ${new Date().toLocaleDateString("es")}</p>${html}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
  };

  const onLinkClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (!href?.startsWith("/leer/")) return;
    e.preventDefault();
    e.stopPropagation();
    const [path, hash] = href.split("#");
    const [, , libro, cap] = path!.split("/");
    onOpenChange(false);
    void navigate({ to: "/leer/$libro/$cap", params: { libro: libro!, cap: cap! }, ...(hash ? { hash } : {}) });
  };

  const lastIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-5 py-2 text-xs text-muted-foreground">
        <span className="truncate">
          Pasaje: <span className="font-medium text-foreground">{passage}</span>
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => void openBilling()}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground"
          >
            <CreditCard className="h-3 w-3" /> Suscripción
          </button>
          {messages.length > 0 ? (
            confirmPurge ? (
              <span className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => void purge()}
                  className="rounded-full px-2 py-1 font-medium text-destructive hover:bg-destructive/10"
                >
                  Borrar registros
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmPurge(false)}
                  className="rounded-full px-2 py-1 hover:bg-accent"
                >
                  Cancelar
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmPurge(true)}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" /> Nueva Consulta
              </button>
            )
          ) : null}
        </div>
      </div>

      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="gap-6 px-5" onClickCapture={onLinkClick}>
          {loaded && messages.length === 0 ? (
            <div className="flex flex-col items-center gap-5 pt-8 text-center">
              <PatmosMark className="h-16 w-16 opacity-90" />
              <p className="max-w-xs text-sm text-muted-foreground">
                Plantea una duda sobre {book} {chapter} o cualquier pasaje de la Escritura.
              </p>
              <div className="flex w-full flex-col gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-xl bg-foreground/[0.04] px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-foreground/[0.08]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent
                className={
                  m.role === "user"
                    ? "group-[.is-user]:bg-[#000f37] group-[.is-user]:text-white dark:group-[.is-user]:bg-[#2c2944] dark:group-[.is-user]:text-[#e9e7f1]"
                    : "text-[15px] leading-relaxed [&_blockquote]:border-l-2 [&_blockquote]:border-[#d9b36a] [&_blockquote]:pl-3 [&_blockquote]:italic [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2"
                }
              >
                {m.role === "assistant" ? (
                  <>
                    <div id={`patmos-${m.id}`}>
                      <MessageResponse>{linkifyScriptureMarkdown(m.text)}</MessageResponse>
                    </div>
                    {m.text && !(busy && m.id === messages[messages.length - 1]?.id) ? (
                      <div className="mt-2 flex gap-1 text-xs text-muted-foreground">
                        <button
                          type="button"
                          onClick={() => void copy(m)}
                          className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground"
                        >
                          {copied === m.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copied === m.id ? "Copiado" : "Copiar"}
                        </button>
                        <button
                          type="button"
                          onClick={() => print(m)}
                          className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground"
                        >
                          <Printer className="h-3 w-3" /> Imprimir
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <p className="whitespace-pre-wrap">{m.text}</p>
                )}
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" || (status === "streaming" && lastIsUser) ? (
            <Shimmer className="text-sm">Consultando las fuentes exegéticas...</Shimmer>
          ) : null}

          {!hasCredits ? (
            <div className="rounded-xl border border-[#d9b36a]/40 bg-[#d9b36a]/10 p-4 text-sm">
              <p className="font-semibold text-foreground">Has alcanzado el límite de consultas</p>
              <p className="mt-1 text-muted-foreground">
                Suscríbete a Patmos para continuar con tu Análisis Exegético sin límites.
              </p>
              <a
                href={CHECKOUT_URL(userId)}
                target="_blank"
                rel="noopener noreferrer"
                className="lemonsqueezy-button mt-3 inline-flex h-9 items-center rounded-full bg-[#000f37] px-4 text-sm font-medium text-white hover:opacity-90 dark:bg-[#d9b36a] dark:text-[#141321]"
              >
                Ampliar consultas
              </a>
            </div>
          ) : null}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border p-4">
        <PromptInput onSubmit={({ text }) => void send(text)}>
          <PromptInputTextarea
            ref={textareaRef}
            placeholder="Escribe una duda de estudio o pasaje..."
            disabled={!hasCredits}
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit
              status={status}
              onStop={stop}
              disabled={(!busy && !loaded) || !hasCredits}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </>
  );
}
