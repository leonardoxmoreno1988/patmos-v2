import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Copy, CreditCard, History, Printer, RotateCcw, Check, ChevronLeft, Settings, Trash2 } from "lucide-react";

import { SacredScripturesIcon } from "@/components/brand/sacred-scriptures-icon";
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
import { localizeBookName } from "@/lib/bible";
import { useI18n, type Lang } from "@/i18n";

const CHECKOUT_URL = (userId: string) =>
  `https://patmos.lemonsqueezy.com/checkout/buy/4beafe1a-6811-457e-b7b5-02e216f8aeef?checkout[custom][user_id]=${encodeURIComponent(userId)}&embed=1`;



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
  initialView?: "chat" | "history";
  initialScope?: "passage" | "bible";
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

function formatTs(lang: Lang, ts?: string): string {
  if (!ts) return "";
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(lang, { day: "numeric", month: "short" });
}

export function ConsultaPatmos(props: Props) {
  const { t } = useI18n();
  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <div className="border-b border-border px-5 pb-3 pt-4 pr-12">
          <SheetTitle className="sr-only">{t.consulta.title}</SheetTitle>
          <SheetDescription className="sr-only">
            {t.consulta.description}
          </SheetDescription>
          <PatmosWordmark className="h-3.5" />
        </div>
        {props.userId ? (
          <ConsultaChat key={props.userId} {...props} userId={props.userId} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="text-sm text-muted-foreground">
              {t.consulta.signInPrompt}
            </p>
            <button
              type="button"
              onClick={props.onRequireAuth}
              className="h-9 rounded-full bg-[#000f37] px-5 text-sm font-medium text-white hover:opacity-90 dark:bg-white dark:text-[#000f37]"
            >
              {t.consulta.signIn}
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
  initialView,
  initialScope,
}: Props & { userId: string }) {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  // Active session: only the messages of the current consultation (or one loaded
  // from Registros Históricos). Never a merge of the whole history.
  const [messages, setMessages] = useState<ChatMsg[]>([]);
   const [view, setView] = useState<"chat" | "history">(initialView ?? "chat");
  const [sessions, setSessions] = useState<HistorySession[] | null>(null);
  const [status, setStatus] = useState<Status>("ready");
  const [error, setError] = useState<string | null>(null);
  const [hasCredits, setHasCredits] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [confirmPurge, setConfirmPurge] = useState(false);
  const [purging, setPurging] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [pendingExternal, setPendingExternal] = useState<string | null>(null);
   const [scope, setScope] = useState<"passage" | "bible">(initialScope ?? (book ? "passage" : "bible"));
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const passage = `${book} ${chapter}${
    verses.length
      ? `:${verses.length > 3 ? `${verses[0]}–${verses[verses.length - 1]}` : verses.join(", ")}`
      : ""
  }`;
  // `passage` (canonical book name) goes to the model; this is only what the UI shows.
  const passageLabel = passage.replace(book, localizeBookName(book, lang));

  // What the UI reflects: only "Pasaje Activo" shows the passage, everything
  // else (global mode, or no chapter open) reads as whole-Scripture mode.
  const usingPassage = scope === "passage" && Boolean(book);

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
      setError(t.consulta.historyLoadError);
    }
  }, [t]);

  useEffect(() => {
    if (initialView === "history") void fetchSessions();
  }, [initialView, fetchSessions]);

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

  // Model-facing payload. In English the chapter text is the KJV (the reader loads it by language)
  // and headers are English; the server adds the respond-in-English instruction from `lang`.
  const passageQuery = (query: string) =>
    lang === "en" ? `[Passage: ${passageLabel}] ${query}` : `[Pasaje: ${passage}] ${query}`;
  const readerContext = () =>
    lang === "en"
      ? `<ACTIVE_READER_CONTEXT>\n[Book: ${localizeBookName(book, "en")} | Chapter: ${chapter}]\n\n=== CURRENT CHAPTER BIBLE TEXT (KJV) ===\n${chapterText || "(not available)"}\n\n=== STUDY NOTES SHOWN ON SCREEN ===\n${chapterNotes || "(no notes for this chapter)"}\n</ACTIVE_READER_CONTEXT>`
      : `<ACTIVE_READER_CONTEXT>\n[Libro: ${book} | Capítulo: ${chapter}]\n\n=== TEXTO BÍBLICO DEL CAPÍTULO ACTUAL ===\n${chapterText || "(no disponible)"}\n\n=== NOTAS DE ESTUDIO VISIBLES EN PANTALLA ===\n${chapterNotes || "(sin notas para este capítulo)"}\n</ACTIVE_READER_CONTEXT>`;

  const send = async (text: string) => {
    const query = text.trim();
    if (!query || busy) return;
    if (!hasCredits) return;
    setError(null);
    const userMsg: ChatMsg = { id: crypto.randomUUID(), role: "user", text: query };
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
          lang,
          messages: [{ role: "user", content: scope === "passage" ? passageQuery(query) : query }],
          ...(scope === "passage" ? { readerContext: readerContext() } : {}),
        }),
      });

      if (res.status === 429) {
        setHasCredits(false);
        setStatus("ready");
        return;
      }
      if (res.status === 401) throw new Error(t.consulta.reauth);
      if (!res.ok || !res.body) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(j?.error ?? t.consulta.queryError);
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
      setError((e as Error).message || t.consulta.queryErrorShort);
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
      setError(t.consulta.historyPurgeError);
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
      setError(t.consulta.billingError);
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
    w.document.write(`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${t.consulta.title} — ${passageLabel}</title>
<style>body{font-family:Georgia,serif;max-width:680px;margin:48px auto;padding:0 24px;color:#111;line-height:1.65}
h1{font-size:20px;border-bottom:1px solid #ccc;padding-bottom:8px}blockquote{border-left:3px solid #b8964f;margin:12px 0;padding-left:12px;font-style:italic}
a{color:inherit}.meta{font-size:12px;color:#666}</style></head><body>
<h1>${t.consulta.printHeading}</h1><p class="meta">${t.consulta.passageLabel} ${passageLabel} · ${new Date().toLocaleDateString(lang)}</p>${html}</body></html>`);
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
            <ChevronLeft className="h-3.5 w-3.5" /> {t.consulta.back}
          </button>
          <span className="text-sm font-semibold">{t.consulta.historyRecords}</span>
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
                aria-label={t.consulta.historyOptions}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 rounded-2xl p-1.5">
              {confirmPurge ? (
                <div className="p-2.5">
                  <p className="text-sm leading-snug text-foreground">
                    {t.consulta.purgeConfirm}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {t.consulta.purgeWarning}
                  </p>
                  <div className="mt-3 flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setConfirmPurge(false)}
                      className="rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      {t.consulta.cancel}
                    </button>
                    <button
                      type="button"
                      onClick={() => void purge()}
                      disabled={purging}
                      className="rounded-full bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:opacity-90 disabled:opacity-60"
                    >
                      {purging ? t.consulta.purging : t.consulta.purgeYes}
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
                  {t.consulta.purgeAction}
                </button>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          {sessions === null ? (
            <Shimmer className="px-2 pt-4 text-sm">{t.consulta.loadingHistory}</Shimmer>
          ) : sessions.length === 0 ? (
            <p className="px-2 pt-6 text-center text-sm text-muted-foreground">
              {t.consulta.emptyHistory}
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
                      <span className="shrink-0 text-xs text-muted-foreground">{formatTs(lang, s.created_at)}</span>
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
           {usingPassage ? (
             <>{t.consulta.passageLabel} <span className="font-medium text-foreground">{passageLabel}</span></>
           ) : (
             <>{t.consulta.modeLabel} <span className="font-medium text-foreground">{t.consulta.allScripture}</span></>
           )}
         </span>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={openHistory}
            aria-label={t.consulta.historyRecords}
            title={t.consulta.history}
            className="inline-flex h-7 items-center justify-center gap-1 rounded-full px-2 hover:bg-accent hover:text-foreground"
          >
            <History className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">{t.consulta.history}</span>
          </button>
          <button
            type="button"
            onClick={() => void openBilling()}
            aria-label={t.consulta.manageSubscription}
            title={t.consulta.manageSubscription}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <CreditCard className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={nuevaConsulta}
            aria-label={t.consulta.newQuery}
            title={t.consulta.newQuery}
            className="inline-flex h-7 items-center justify-center gap-1 rounded-full px-2 hover:bg-accent hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">{t.consulta.newQuery}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-b border-border px-5 pb-2.5 pt-1">
        <div
          role="tablist"
          aria-label={t.consulta.scopeLabel}
          className="flex w-full items-center gap-1 rounded-full bg-foreground/[0.05] p-1"
        >
           {(
             [
                ...(book
                  ? [{ id: "passage" as const, label: t.consulta.activePassageOf(`${localizeBookName(book, lang)} ${chapter}`), short: t.consulta.activePassage }]
                  : []),
               { id: "bible" as const, label: t.consulta.allBible, short: t.consulta.allBible },
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
               <span className="truncate sm:hidden">{opt.short}</span>
               <span className="hidden truncate sm:inline">{opt.label}</span>
             </button>
           ))}
        </div>
      </div>

      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="gap-6 px-5">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center gap-3 pt-2 text-center sm:gap-5 sm:pt-8">
              <SacredScripturesIcon className="h-11 w-11 text-muted-foreground/70 dark:text-primary/35 sm:h-16 sm:w-16" />
              <p className="max-w-xs text-sm text-muted-foreground">
                 {usingPassage
                   ? t.consulta.askAboutPassage(`${localizeBookName(book, lang)} ${chapter}`)
                   : t.consulta.askGlobal}
              </p>
              <div className="flex w-full flex-col gap-2">
                 {(usingPassage ? t.consulta.starters : t.consulta.globalStarters).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-xl bg-foreground/[0.04] px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-foreground/[0.08] sm:py-3"
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
                          {copied === m.id ? t.consulta.copied : t.consulta.copy}
                        </button>
                        <button
                          type="button"
                          onClick={() => print(m)}
                          className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground"
                        >
                          <Printer className="h-3 w-3" /> {t.consulta.print}
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
            <Shimmer className="text-sm">{t.consulta.thinking}</Shimmer>
          ) : null}

          {!hasCredits ? (
            <div className="rounded-xl border border-[#d9b36a]/40 bg-[#d9b36a]/10 p-4 text-sm">
              <p className="font-semibold text-foreground">{t.consulta.limitTitle}</p>
              <p className="mt-1 text-muted-foreground">
                {t.consulta.limitBody}
              </p>
              <a
                href={CHECKOUT_URL(userId)}
                target="_blank"
                rel="noopener noreferrer"
                className="lemonsqueezy-button mt-3 inline-flex h-9 items-center rounded-full bg-[#000f37] px-4 text-sm font-medium text-white hover:opacity-90 dark:bg-[#d9b36a] dark:text-[#141321]"
              >
                {t.consulta.upgrade}
              </a>
            </div>
          ) : null}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border p-3 sm:p-4">
        <PromptInput onSubmit={({ text }) => void send(text)}>
          <PromptInputTextarea
            ref={textareaRef}
            placeholder={t.consulta.inputPlaceholder}
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
            <DialogTitle>{t.consulta.externalTitle}</DialogTitle>
            <DialogDescription>
              {t.consulta.externalBody(pendingExternal ? new URL(pendingExternal).hostname : undefined)}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <button
              type="button"
              onClick={() => setPendingExternal(null)}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {t.consulta.cancel}
            </button>
            <button
              type="button"
              onClick={() => {
                if (pendingExternal) window.open(pendingExternal, "_blank", "noopener,noreferrer");
                setPendingExternal(null);
              }}
              className="rounded-full bg-[#000f37] px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-[#d9b36a] dark:text-[#141321]"
            >
              {t.consulta.openLink}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
