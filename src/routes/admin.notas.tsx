import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, ClipboardPaste, ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/reader/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BOOKS, CHAPTER_COUNTS, slugifyBook } from "@/lib/bible";
import { fetchChapterNotes, type BibleNote } from "@/lib/bible-notes";
import { NOTE_KINDS, anchorProblem, parseAnchor, parseNoteText, type NoteKind } from "@/lib/note-anchors";
import { isOwnerEmail } from "@/lib/patmos/premium";
import type { SaveChapterNotes, SaveChapterNotesResult } from "@/lib/patmos/admin-notes.server";
import { seoHead } from "@/lib/seo";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type Lang = "es" | "en";
const LANGS: readonly Lang[] = ["es", "en"];
const LANG_LABEL: Record<Lang, string> = { es: "Español", en: "English" };
const KIND_LABEL: Record<NoteKind, string> = {
  verse: "Versículo",
  range: "Rango",
  section_heading: "Encabezado",
};

interface AdminSearch {
  libro: string;
  cap: number;
}

export const Route = createFileRoute("/admin/notas")({
  staticData: { sitemap: false },
  // The Supabase session lives in the browser (localStorage), so the guard and the page run client-side
  // only. This only hides the UI: the real check is in PUT /api/admin/notes, which verifies the token
  // and the owner email on the server before writing.
  ssr: false,
  validateSearch: (search: Record<string, unknown>): AdminSearch => {
    const book = BOOKS.find((b) => b.code === String(search["libro"] ?? "").toUpperCase()) ?? BOOKS[0]!;
    const cap = Math.floor(Number(search["cap"] ?? 1)) || 1;
    return { libro: book.code, cap: Math.min(Math.max(cap, 1), CHAPTER_COUNTS[book.bookid] ?? 1) };
  },
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!isOwnerEmail(data.session?.user.email)) throw redirect({ to: "/" });
  },
  head: () => seoHead({ title: "Admin · Notas", description: "Editor de notas de estudio.", noindex: true }),
  component: AdminNotes,
});

/** A note while it is being edited; `key` only identifies it in React. */
interface Draft {
  key: string;
  verse_anchor: string;
  verse_start: number | null;
  verse_end: number | null;
  kind: NoteKind;
  body_html: string;
}
type Drafts = Record<Lang, Draft[]>;

const toDraft = (n: Omit<Draft, "key">): Draft => ({
  key: crypto.randomUUID(),
  verse_anchor: n.verse_anchor,
  verse_start: n.verse_start,
  verse_end: n.verse_end,
  kind: n.kind,
  body_html: n.body_html,
});
const toDrafts = (notes: Record<Lang, BibleNote[]>): Drafts => ({
  es: notes.es.map(toDraft),
  en: notes.en.map(toDraft),
});
const stripKey = ({ key: _key, ...note }: Draft) => note;
const serialize = (d: Drafts) => JSON.stringify({ es: d.es.map(stripKey), en: d.en.map(stripKey) });

/** Sections that should line up across languages share a key; headings differ in wording, so they match by kind. */
const alignKey = (d: Draft) =>
  d.kind === "section_heading"
    ? d.verse_anchor.trim() === "intro"
      ? "§intro"
      : "§heading"
    : d.verse_anchor.replace(/\s*[-–—]\s*/g, "-").replace(/\s*,\s*/g, ", ").trim();

/** Pairs ES and EN notes by longest common subsequence of anchors; unmatched notes get a gap opposite. */
function alignRows(es: Draft[], en: Draft[]): Record<Lang, number | null>[] {
  const a = es.map(alignKey);
  const b = en.map(alignKey);
  const lcs = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i]![j] = a[i] === b[j] ? lcs[i + 1]![j + 1]! + 1 : Math.max(lcs[i + 1]![j]!, lcs[i]![j + 1]!);
    }
  }
  const rows: Record<Lang, number | null>[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) rows.push({ es: i++, en: j++ });
    else if (j >= b.length || (i < a.length && lcs[i + 1]![j]! >= lcs[i]![j + 1]!)) rows.push({ es: i++, en: null });
    else rows.push({ es: null, en: j++ });
  }
  return rows;
}

const adminNotesQuery = (bookUsfm: string, chapter: number) => ({
  queryKey: ["admin-notes", bookUsfm, chapter] as const,
  queryFn: async (): Promise<Record<Lang, BibleNote[]>> => {
    const [es, en] = await Promise.all(LANGS.map((lang) => fetchChapterNotes(bookUsfm, chapter, lang)));
    return { es: es!, en: en! };
  },
  // Always read fresh rows when a chapter opens, and never refetch underneath unsaved edits.
  staleTime: Infinity,
  gcTime: 0,
  refetchOnWindowFocus: false,
});

function AdminNotes() {
  const { libro, cap } = Route.useSearch();
  const navigate = useNavigate({ from: "/admin/notas" });
  const router = useRouter();
  const queryClient = useQueryClient();
  const book = BOOKS.find((b) => b.code === libro) ?? BOOKS[0]!;
  const chapterCount = CHAPTER_COUNTS[book.bookid] ?? 1;
  const chapterKey = `${book.code} ${cap}`;

  const loaded = useQuery(adminNotesQuery(book.code, cap));
  // Drafts are stored with the chapter they belong to, so switching chapters never shows stale rows.
  const [state, setState] = useState<{ key: string; drafts: Drafts; baseline: string } | null>(null);
  useEffect(() => {
    if (!loaded.data) return;
    const drafts = toDrafts(loaded.data);
    setState({ key: chapterKey, drafts, baseline: serialize(drafts) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded.data]);
  const drafts = state?.key === chapterKey ? state.drafts : null;
  const dirty = !!state && !!drafts && serialize(drafts) !== state.baseline;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const go = (next: AdminSearch) => {
    if (dirty && !window.confirm("Hay cambios sin guardar en este capítulo. ¿Descartarlos?")) return;
    void navigate({ search: next });
  };

  const edit = (fn: (d: Drafts) => Drafts) =>
    setState((s) => (s && s.key === chapterKey ? { ...s, drafts: fn(s.drafts) } : s));
  const update = (lang: Lang, index: number, patch: Partial<Draft>) =>
    edit((d) => ({ ...d, [lang]: d[lang].map((n, i) => (i === index ? { ...n, ...patch } : n)) }));
  const insert = (lang: Lang, index: number, note: Omit<Draft, "key">) =>
    edit((d) => ({ ...d, [lang]: [...d[lang].slice(0, index), toDraft(note), ...d[lang].slice(index)] }));
  const remove = (lang: Lang, index: number) =>
    edit((d) => ({ ...d, [lang]: d[lang].filter((_, i) => i !== index) }));
  const move = (lang: Lang, index: number, by: -1 | 1) =>
    edit((d) => {
      const list = [...d[lang]];
      const target = index + by;
      if (target < 0 || target >= list.length) return d;
      [list[index], list[target]] = [list[target]!, list[index]!];
      return { ...d, [lang]: list };
    });

  // Language whose paste box is open (shown when the clipboard can't be read directly).
  const [manualPaste, setManualPaste] = useState<Lang | null>(null);
  const [manualText, setManualText] = useState("");
  useEffect(() => setManualPaste(null), [chapterKey]);

  /**
   * Appends a pasted note to a language: "[1-4]" sections, or NotebookLM paragraphs anchored by the
   * references to this chapter they cite. Nothing is saved until "Guardar".
   */
  const appendNoteText = (lang: Lang, text: string) => {
    const parsed = parseNoteText(text, { bookNames: [book.name, book.nameEn], chapter: cap });
    if (!parsed.length) {
      toast.error("No se encontró texto ni anclas como [1-4] en lo pegado.");
      return false;
    }
    edit((d) => ({ ...d, [lang]: [...d[lang], ...parsed.map(toDraft)] }));
    const unanchored = parsed.filter((n) => !n.verse_anchor).length;
    toast.success(
      `${parsed.length} nota${parsed.length === 1 ? "" : "s"} añadida${parsed.length === 1 ? "" : "s"} en ${LANG_LABEL[lang]}.` +
        (unanchored
          ? ` ${unanchored} sin referencia a ${book.name} ${cap}: completa su ancla (en rojo).`
          : " Revísalas y pulsa Guardar."),
    );
    return true;
  };

  const pasteFromClipboard = async (lang: Lang) => {
    let text: string;
    try {
      if (!navigator.clipboard?.readText) throw new Error("unsupported");
      text = await navigator.clipboard.readText();
    } catch {
      // Permission denied or unsupported browser: let the user paste by hand.
      setManualText("");
      setManualPaste(lang);
      return;
    }
    if (!text.trim()) {
      toast.error("El portapapeles está vacío.");
      return;
    }
    appendNoteText(lang, text);
  };

  const rows = useMemo(() => (drafts ? alignRows(drafts.es, drafts.en) : []), [drafts]);
  const gaps = rows.filter((r) => r.es === null || r.en === null).length;
  const problems = drafts
    ? LANGS.flatMap((lang) => drafts[lang].map((n) => anchorProblem(n)).filter(Boolean)).length
    : 0;

  const save = useMutation({
    mutationFn: async (current: Drafts): Promise<SaveChapterNotesResult> => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) throw new Error("La sesión expiró. Vuelve a iniciar sesión.");
      const body: SaveChapterNotes = {
        book_usfm: book.code,
        chapter: cap,
        notes: { es: current.es.map(stripKey), en: current.en.map(stripKey) },
      };
      const res = await fetch("/api/admin/notes", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const json = (await res.json().catch(() => ({}))) as Partial<SaveChapterNotesResult> & { error?: string };
      if (!res.ok || !json.notes) throw new Error(json.error ?? `Error ${res.status}`);
      return json as SaveChapterNotesResult;
    },
    onSuccess: async (result) => {
      const saved = toDrafts(result.notes);
      setState({ key: chapterKey, drafts: saved, baseline: serialize(saved) });
      // The reader caches notes for the whole session; drop them so this tab shows the edit at once.
      await queryClient.invalidateQueries({ queryKey: ["bible-notes"] });
      await router.invalidate();
      toast.success(
        result.purged
          ? `${book.name} ${cap} guardado y publicado.`
          : `${book.name} ${cap} guardado (sin caché de CDN que purgar en este entorno).`,
      );
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md sm:top-[64px] lg:top-[68px]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-3">
          <h1 className="mr-2 text-lg font-bold text-foreground">Notas</h1>
          <Select value={book.code} onValueChange={(code) => go({ libro: code, cap: 1 })}>
            <SelectTrigger className="w-48" aria-label="Libro">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {BOOKS.map((b) => (
                <SelectItem key={b.code} value={b.code}>
                  {b.name} · {b.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={String(cap)} onValueChange={(v) => go({ libro: book.code, cap: Number(v) })}>
            <SelectTrigger className="w-24" aria-label="Capítulo">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {Array.from({ length: chapterCount }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link
            to="/leer/$libro/$cap"
            params={{ libro: slugifyBook(book.name), cap: String(cap) }}
            target="_blank"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Ver en el lector <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {problems
                ? `${problems} nota${problems === 1 ? "" : "s"} con errores`
                : dirty
                  ? "Cambios sin guardar"
                  : "Sin cambios"}
            </span>
            <Button
              type="button"
              disabled={!drafts || !dirty || problems > 0 || save.isPending}
              onClick={() => drafts && save.mutate(drafts)}
            >
              <Save /> {save.isPending ? "Guardando…" : "Guardar"}
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-6">
        {loaded.isError ? (
          <p className="text-sm text-destructive">No se pudieron cargar las notas: {loaded.error.message}</p>
        ) : !drafts ? (
          <p className="text-sm text-muted-foreground">Cargando {book.name} {cap}…</p>
        ) : (
          <>
            <div className="mb-4 grid grid-cols-2 gap-4">
              {LANGS.map((lang) => (
                <div key={lang} className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {LANG_LABEL[lang]} · {drafts[lang].length} nota{drafts[lang].length === 1 ? "" : "s"}
                  </h2>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    title="Lee del portapapeles secciones [1-4] o párrafos de NotebookLM y los añade al final de esta columna"
                    onClick={() => void pasteFromClipboard(lang)}
                  >
                    <ClipboardPaste /> Pegar nota (auto)
                  </Button>
                </div>
              ))}
            </div>
            {manualPaste ? (
              <div className="mb-4 rounded-lg border border-border p-3">
                <p className="mb-2 text-sm text-muted-foreground">
                  El navegador no permitió leer el portapapeles. Pega aquí la nota completa para{" "}
                  {LANG_LABEL[manualPaste]}: secciones que empiezan con [1-4], [5-6]… o párrafos de NotebookLM
                  con referencias como ({book.nameEn} {cap}:10-11):
                </p>
                <Textarea
                  autoFocus
                  rows={8}
                  className="font-mono text-[13px]"
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                />
                <div className="mt-2 flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setManualPaste(null)}>
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    disabled={!manualText.trim()}
                    onClick={() => {
                      if (appendNoteText(manualPaste, manualText)) setManualPaste(null);
                    }}
                  >
                    <Plus /> Añadir a {LANG_LABEL[manualPaste]}
                  </Button>
                </div>
              </div>
            ) : null}
            {gaps ? (
              <p className="mb-4 rounded-md bg-amber-500/10 px-3 py-2 text-sm text-amber-800 dark:text-amber-300">
                {gaps} sección{gaps === 1 ? "" : "es"} sin pareja en el otro idioma.
              </p>
            ) : null}

            <div className="space-y-4">
              {rows.map((row, r) => (
                <div key={`${row.es ?? "-"}:${row.en ?? "-"}:${r}`} className="grid grid-cols-2 gap-4">
                  {LANGS.map((lang) => {
                    const index = row[lang];
                    if (index !== null) {
                      return (
                        <NoteEditor
                          key={drafts[lang][index]!.key}
                          note={drafts[lang][index]!}
                          index={index}
                          count={drafts[lang].length}
                          onChange={(patch) => update(lang, index, patch)}
                          onMove={(by) => move(lang, index, by)}
                          onRemove={() => remove(lang, index)}
                        />
                      );
                    }
                    const other = lang === "es" ? "en" : "es";
                    const source = drafts[other][row[other]!]!;
                    // Insert after the notes of this language that sit above this row.
                    const at = rows.slice(0, r).filter((x) => x[lang] !== null).length;
                    return (
                      <MissingNote
                        key={`missing-${lang}`}
                        lang={lang}
                        anchor={source.verse_anchor}
                        onCreate={() =>
                          insert(lang, at, {
                            verse_anchor: source.kind === "section_heading" ? "" : source.verse_anchor,
                            verse_start: source.verse_start,
                            verse_end: source.verse_end,
                            kind: source.kind,
                            body_html: "",
                          })
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {LANGS.map((lang) => (
                <Button
                  key={lang}
                  type="button"
                  variant="outline"
                  onClick={() =>
                    insert(lang, drafts[lang].length, {
                      verse_anchor: "",
                      verse_start: null,
                      verse_end: null,
                      kind: "verse",
                      body_html: "",
                    })
                  }
                >
                  <Plus /> Añadir nota ({lang.toUpperCase()})
                </Button>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function NoteEditor({
  note,
  index,
  count,
  onChange,
  onMove,
  onRemove,
}: {
  note: Draft;
  index: number;
  count: number;
  onChange: (patch: Partial<Draft>) => void;
  onMove: (by: -1 | 1) => void;
  onRemove: () => void;
}) {
  const problem = anchorProblem(note);
  const isHeading = note.kind === "section_heading";
  const numberValue = (v: number | null) => (v === null ? "" : String(v));
  const parseNumber = (v: string) => (v.trim() === "" ? null : Math.floor(Number(v)));

  return (
    <div className={cn("rounded-lg border p-3", problem ? "border-destructive/60" : "border-border")}>
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex min-w-0 flex-1 basis-32 flex-col gap-1 text-xs text-muted-foreground">
          Ancla
          <Input
            value={note.verse_anchor}
            placeholder="3-5"
            onChange={(e) => onChange({ verse_anchor: e.target.value })}
            // "3-5" fills the verses and kind; any other text becomes a heading. Both stay editable.
            onBlur={(e) => {
              if (!e.target.value.trim()) return;
              onChange(parseAnchor(e.target.value));
            }}
          />
        </label>
        <label className="flex w-20 flex-col gap-1 text-xs text-muted-foreground">
          Desde
          <Input
            type="number"
            min={1}
            disabled={isHeading}
            value={numberValue(note.verse_start)}
            onChange={(e) => onChange({ verse_start: parseNumber(e.target.value) })}
          />
        </label>
        <label className="flex w-20 flex-col gap-1 text-xs text-muted-foreground">
          Hasta
          <Input
            type="number"
            min={1}
            disabled={isHeading}
            value={numberValue(note.verse_end)}
            onChange={(e) => onChange({ verse_end: parseNumber(e.target.value) })}
          />
        </label>
        <label className="flex w-36 flex-col gap-1 text-xs text-muted-foreground">
          Tipo
          <Select
            value={note.kind}
            onValueChange={(kind) =>
              onChange(
                kind === "section_heading"
                  ? { kind, verse_start: null, verse_end: null }
                  : { kind: kind as NoteKind },
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {NOTE_KINDS.map((k) => (
                <SelectItem key={k} value={k}>
                  {KIND_LABEL[k]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="icon" aria-label="Subir" disabled={index === 0} onClick={() => onMove(-1)}>
            <ArrowUp />
          </Button>
          <Button type="button" variant="ghost" size="icon" aria-label="Bajar" disabled={index === count - 1} onClick={() => onMove(1)}>
            <ArrowDown />
          </Button>
          <Button type="button" variant="ghost" size="icon" aria-label="Eliminar" onClick={onRemove}>
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      </div>
      <Textarea
        className="mt-2 font-mono text-[13px] leading-relaxed"
        rows={Math.min(14, Math.max(4, Math.ceil(note.body_html.length / 90)))}
        value={note.body_html}
        placeholder="HTML de la nota (<b>, <i>, <br>, {{cita:Génesis 1:1}}…)"
        onChange={(e) => onChange({ body_html: e.target.value })}
      />
      {problem ? <p className="mt-1 text-xs text-destructive">{problem}</p> : null}
    </div>
  );
}

function MissingNote({ lang, anchor, onCreate }: { lang: Lang; anchor: string; onCreate: () => void }) {
  return (
    <div className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-amber-500/60 bg-amber-500/5 p-3 text-center text-sm text-amber-800 dark:text-amber-300">
      <span>
        Falta en {LANG_LABEL[lang]}: [{anchor}]
      </span>
      <Button type="button" size="sm" variant="outline" onClick={onCreate}>
        <Plus /> Crear aquí
      </Button>
    </div>
  );
}
