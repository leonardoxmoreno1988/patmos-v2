import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Copy, CreditCard, History, Printer, RotateCcw, Check, ChevronLeft, Settings, Trash2 } from "lucide-react";

import patmosMark from "@/assets/patmos-mark.png";
import { PatmosWordmark } from "@/components/brand/patmos-wordmark";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  chapterText?: string;
  chapterNotes?: string;
  onRequireAuth: () => void;
}

type Status = "ready" | "submitted" | "streaming" | "error";
interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  text: string;
}
interface HistorySession {
  id: string;
  user_query: string;
  bot_response: string;
  created_at?: string | undefined;
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

function formatTs(ts?: string): string {
  if (!ts) return "";
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es", { day: "numeric", month: "short" });
}

export function ConsultaPatmos(props: Props) {
  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <div className="flex flex-col gap-1.5 border-b border-border px-5 pb-3.5 pt-4 pr-12">
          <SheetTitle className="sr-only">Consultas Patmos</SheetTitle>
          <PatmosWordmark className="h-3.5" />
          <SheetDescription className="text-xs text-muted-foreground">
            Análisis Exegético y contexto histórico del texto
          </SheetDescription>
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

function ConsultaChat({
  userId,
  book,
  chapter,
  verses,
  chapterText,
  chapterNotes,
  onOpenChange,
}: Props & { userId: string }) {
  const navigate = useNavigate();
  // Active session: only the messages of the current consultation (or one loaded
  // from Registros Históricos). Never a merge of the whole history.
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [view, setView] = useState<"chat" | "history">("chat");
  const [sessions, setSessions] = useState<HistorySession[] | null>(null);
  const [status, setStatus] = useState<Status>("ready");
  const [error, setError] = useState<string | null>(null);
  const [hasCredits, setHasCredits] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [confirmPurge, setConfirmPurge] = useState(false);
  const [purging, setPurging] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [pendingExternal, setPendingExternal] = useState<string | null>(null);
  const [scope, setScope] = useState<"passage" | "bible">(book ? "passage" : "bible");
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const passage = `${book} ${chapter}${
    verses.length
      ? `:${verses.length > 3 ? `${verses[0]}–${verses[verses.length - 1]}` : verses.join(", ")}`
      : ""
  }`;

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/history", { headers: await authHeaders() });
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json();
      const rows: Array<{ id?: string; user_query?: string; bot_response?: string; created_at?: string }> =
        Array.isArray(json) ? json : (json.history ?? json.data ?? []);
      setSessions(
        rows
          .filter((r) => r.user_query)
          .map((r, i) => ({
            id: r.id ?? `h${i}`,
            user_query: r.user_query!,
            bot_response: r.bot_response ?? "",
            created_at: r.created_at,
          })),
      );
    } catch {
      setSessions([]);
      setError("No pudimos cargar los Registros Históricos.");
    }
  }, []);

  const openHistory = () => {
    setView("history");
    setConfirmPurge(false);
    setSettingsOpen(false);
    if (sessions === null) void fetchSessions();
  };

  const loadSession = (s: HistorySession) => {
    stop();
    setError(null);
    setMessages([
      { id: `${s.id}-u`, role: "user", text: s.user_query },
      ...(s.bot_response ? [{ id: `${s.id}-a`, role: "assistant" as const, text: s.bot_response }] : []),
    ]);
    setView("chat");
  };

  const nuevaConsulta = () => {
    stop();
    setError(null);
    setMessages([]);
    setView("chat");
  };

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!busy && view === "chat") textareaRef.current?.focus();
  }, [busy, view]);

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
          ...(scope === "passage"
            ? {
                readerContext: `<ACTIVE_READER_CONTEXT>\n[Libro: ${book} | Capítulo: ${chapter}]\n\n=== TEXTO BÍBLICO DEL CAPÍTULO ACTUAL ===\n${chapterText || "(no disponible)"}\n\n=== NOTAS DE ESTUDIO VISIBLES EN PANTALLA ===\n${chapterNotes || "(sin notas para este capítulo)"}\n</ACTIVE_READER_CONTEXT>`,
              }
            : {}),
        }),
      });

      if (res.status === 429) {
        setHasCredits(false);
        setStatus("ready");
        return;
      }
      if (res.status === 401) throw new Error("Inicia sesión de nuevo para consultar.");
      if (!res.ok || !res.body) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(j?.error ?? "No pudimos completar la consulta. Inténtalo de nuevo.");
      }

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
      // New session was persisted server-side; refresh the history list next time it opens.
      setSessions(null);
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setError((e as Error).message || "No pudimos completar la consulta.");
      setStatus("error");
    } finally {
      abortRef.current = null;
    }
  };

  const purge = async () => {
    if (purging) return;
    setPurging(true);
    stop();
    try {
      const res = await fetch("/api/history", { method: "DELETE", headers: await authHeaders() });
      if (!res.ok) throw new Error();
      // Successful purge: empty the list, drop the active conversation, close the menu.
      setSessions([]);
      setMessages([]);
      setView("chat");
      setConfirmPurge(false);
      setSettingsOpen(false);
    } catch {
      setError("No pudimos borrar los Registros Históricos.");
      setConfirmPurge(false);
      setSettingsOpen(false);
    } finally {
      setPurging(false);
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

  const navigateInternal = useCallback(
    (href: string) => {
      onOpenChange(false);
      const [path, hash] = href.split("#");
      const leer = path?.match(/^\/leer\/([^/]+)\/([^/]+)/);
      if (leer) {
        void navigate({
          to: "/leer/$libro/$cap",
          params: { libro: leer[1]!, cap: leer[2]! },
          ...(hash ? { hash } : {}),
        });
      } else {
        void navigate({ href });
      }
    },
    [navigate, onOpenChange],
  );

  // Internal links (/leer/...) navigate in-place; external http(s) links ask first.
  const markdownComponents = useMemo(
    () => ({
      a: ({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
          href={href}
          {...rest}
          onClick={(e) => {
            if (!href) return;
            if (href.startsWith("/") || href.startsWith("#")) {
              e.preventDefault();
              navigateInternal(href);
              return;
            }
            if (/^https?:\/\//i.test(href)) {
              e.preventDefault();
              setPendingExternal(href);
            }
          }}
        >
          {children}
        </a>
      ),
    }),
    [navigateInternal],
  );

  const lastIsUser = messages[messages.length - 1]?.role === "user";

  if (view === "history") {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-3">
          <button
            type="button"
            onClick={() => setView("chat")}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Volver
          </button>
          <span className="text-sm font-semibold">Registros Históricos</span>
          <Popover
            open={settingsOpen}
            onOpenChange={(next) => {
              setSettingsOpen(next);
              if (!next) setConfirmPurge(false);
            }}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="Opciones de los Registros Históricos"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 rounded-2xl p-1.5">
              {confirmPurge ? (
                <div className="p-2.5">
                  <p className="text-sm leading-snug text-foreground">
                    ¿Está seguro de que desea eliminar todo su historial de consultas?
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Se borrarán todas las consultas guardadas. Esta acción no se puede deshacer.
                  </p>
                  <div className="mt-3 flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setConfirmPurge(false)}
                      className="rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => void purge()}
                      disabled={purging}
                      className="rounded-full bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:opacity-90 disabled:opacity-60"
                    >
                      {purging ? "Borrando..." : "Sí, borrar todo"}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmPurge(true)}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5 shrink-0" />
                  Limpiar registros históricos
                </button>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          {sessions === null ? (
            <Shimmer className="px-2 pt-4 text-sm">Consultando los registros...</Shimmer>
          ) : sessions.length === 0 ? (
            <p className="px-2 pt-6 text-center text-sm text-muted-foreground">
              Aún no tienes consultas guardadas.
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {sessions.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => loadSession(s)}
                    className="flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-foreground/[0.05]"
                  >
                    <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                      {s.user_query}
                    </span>
                    {s.created_at ? (
                      <span className="shrink-0 text-xs text-muted-foreground">{formatTs(s.created_at)}</span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-5 py-2 text-xs text-muted-foreground">
        <span className="truncate">
          Pasaje: <span className="font-medium text-foreground">{passage}</span>
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={openHistory}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground"
          >
            <History className="h-3 w-3" /> Historial
          </button>
          <button
            type="button"
            onClick={() => void openBilling()}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground"
          >
            <CreditCard className="h-3 w-3" /> Suscripción
          </button>
          <button
            type="button"
            onClick={nuevaConsulta}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" /> Nueva Consulta
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-b border-border px-5 pb-2.5 pt-1">
        <div
          role="tablist"
          aria-label="Alcance del contexto"
          className="flex w-full items-center gap-1 rounded-full bg-foreground/[0.05] p-1"
        >
          {(
            [
              { id: "passage" as const, label: `Pasaje Activo (${book} ${chapter})` },
              { id: "bible" as const, label: "Toda la Biblia" },
            ]
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={scope === opt.id}
              onClick={() => setScope(opt.id)}
              className={`min-w-0 flex-1 truncate rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                scope === opt.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {scope === "bible" ? (
          <p className="px-1 text-[11px] text-muted-foreground">
            Modo: Exégesis Libre y Teología Global
          </p>
        ) : null}
      </div>

      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="gap-6 px-5">
          {messages.length === 0 ? (
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
                      <MessageResponse components={markdownComponents}>{linkifyScriptureMarkdown(m.text)}</MessageResponse>
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
            <PromptInputSubmit status={status} onStop={stop} disabled={!hasCredits} />
          </PromptInputFooter>
        </PromptInput>
      </div>

      <Dialog
        open={pendingExternal !== null}
        onOpenChange={(o) => {
          if (!o) setPendingExternal(null);
        }}
      >
        <DialogContent className="rounded-2xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>¿Abrir enlace externo?</DialogTitle>
            <DialogDescription>
              {pendingExternal
                ? `Este enlace lleva a un sitio fuera de RVNotas (${new URL(pendingExternal).hostname}) y se abrirá en una pestaña nueva.`
                : "Este enlace lleva a un sitio fuera de RVNotas y se abrirá en una pestaña nueva."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <button
              type="button"
              onClick={() => setPendingExternal(null)}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                if (pendingExternal) window.open(pendingExternal, "_blank", "noopener,noreferrer");
                setPendingExternal(null);
              }}
              className="rounded-full bg-[#000f37] px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-[#d9b36a] dark:text-[#141321]"
            >
              Abrir enlace
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
