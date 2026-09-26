import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useNavigate } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";

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

export function ConsultaPatmos(props: Props) {
  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <div className="flex items-start gap-3 border-b border-border px-5 pb-4 pt-5 pr-12">
          <PatmosMark className="h-10 w-10 shrink-0" />
          <div className="min-w-0">
            <SheetTitle className="text-lg font-bold tracking-tight">Consultas Patmos</SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              Análisis exegético y contexto histórico del texto
            </SheetDescription>
          </div>
        </div>
        {props.userId ? (
          <ConsultaChat key={props.userId} {...props} userId={props.userId} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="text-sm text-muted-foreground">
              Inicia sesión para realizar consultas y conservar tu historial de estudio.
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
  onOpenChange,
}: Props & { userId: string }) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contextRef = useRef({ book, chapter, verses });
  contextRef.current = { book, chapter, verses };
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/consulta",
        headers: async (): Promise<Record<string, string>> => {
          const { data } = await supabase.auth.getSession();
          const token = data.session?.access_token;
          return token ? { Authorization: `Bearer ${token}` } : {};
        },
        body: () => ({ context: contextRef.current }),
      }),
    [],
  );

  const { messages, setMessages, sendMessage, status, stop } = useChat({
    id: `patmos-${userId}`,
    transport,
    onError: (e) => {
      const msg = e.message || "";
      setError(
        /429/.test(msg)
          ? "Hay muchas consultas en este momento. Intenta de nuevo en unos segundos."
          : /401|sesión/i.test(msg)
            ? "Inicia sesión de nuevo para consultar."
            : "No pudimos completar la consulta. Revisa tu conexión e inténtalo de nuevo.",
      );
    },
  });

  useEffect(() => {
    let cancelled = false;
    void supabase
      .from("patmos_messages")
      .select("message_id, role, parts")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          if (err.code === "42P01" || err.code === "PGRST205")
            setError("Falta crear la tabla de consultas en la base de datos.");
        } else if (data) {
          setMessages(
            data.map(
              (r) =>
                ({ id: r.message_id, role: r.role, parts: r.parts }) as UIMessage,
            ),
          );
        }
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, setMessages]);

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!busy) textareaRef.current?.focus();
  }, [busy, loaded]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setError(null);
    void sendMessage({ text: t });
  };

  const reset = async () => {
    stop();
    setMessages([]);
    const { error: err } = await supabase.from("patmos_messages").delete().eq("user_id", userId);
    if (err) setError("No pudimos borrar el historial.");
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
    void navigate({
      to: "/leer/$libro/$cap",
      params: { libro: libro!, cap: cap! },
      ...(hash ? { hash } : {}),
    });
  };

  const passage = `${book} ${chapter}${
    verses.length ? `:${verses.length > 3 ? `${verses[0]}–${verses[verses.length - 1]}` : verses.join(", ")}` : ""
  }`;
  const lastIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <>
      <div className="flex items-center justify-between px-5 py-2 text-xs text-muted-foreground">
        <span>
          Pasaje: <span className="font-medium text-foreground">{passage}</span>
        </span>
        {messages.length > 0 ? (
          <button
            type="button"
            onClick={() => void reset()}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" /> Nueva consulta
          </button>
        ) : null}
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
                    onClick={() => send(s)}
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
                {m.parts.map((p, i) =>
                  p.type === "text" ? (
                    m.role === "assistant" ? (
                      <MessageResponse key={i}>{linkifyScriptureMarkdown(p.text)}</MessageResponse>
                    ) : (
                      <p key={i} className="whitespace-pre-wrap">
                        {p.text}
                      </p>
                    )
                  ) : null,
                )}
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" || (status === "streaming" && lastIsUser) ? (
            <Shimmer className="text-sm">Consultando las fuentes exegéticas...</Shimmer>
          ) : null}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border p-4">
        <PromptInput onSubmit={({ text }) => send(text)}>
          <PromptInputTextarea
            ref={textareaRef}
            placeholder="Escribe una duda de estudio o pasaje..."
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} disabled={!busy && !loaded} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </>
  );
}
