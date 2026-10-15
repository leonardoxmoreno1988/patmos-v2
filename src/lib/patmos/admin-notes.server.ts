import { dangerouslyDeleteByTag } from "@vercel/functions";
import { z } from "zod";

import { BOOKS, CHAPTER_COUNTS } from "@/lib/bible";
import { notesCacheTag, type BibleNote } from "@/lib/bible-notes";
import { NOTE_KINDS, anchorProblem, type NoteKind } from "@/lib/note-anchors";
import { getUserClient } from "./api.server";
import { isOwnerEmail } from "./premium";
import { getAdminClient } from "./supabase-admin.server";

const TABLE = "bible_notes";
const COLUMNS = "id, verse_anchor, verse_start, verse_end, kind, position, body_html";
const LANGS = ["es", "en"] as const;

const noteSchema = z
  .object({
    verse_anchor: z.string().trim(),
    verse_start: z.number().int().nullable(),
    verse_end: z.number().int().nullable(),
    kind: z.enum(NOTE_KINDS as [NoteKind, ...NoteKind[]]),
    body_html: z.string().max(100_000),
  })
  .superRefine((note, ctx) => {
    const problem = anchorProblem(note);
    if (problem) ctx.addIssue({ code: "custom", message: `[${note.verse_anchor}] ${problem}` });
  });

const saveSchema = z.object({
  book_usfm: z.string().length(3),
  chapter: z.number().int().positive(),
  // Array order is the reading order; it becomes `position`.
  notes: z.object({ es: z.array(noteSchema).max(300), en: z.array(noteSchema).max(300) }),
});

export type SaveChapterNotes = z.input<typeof saveSchema>;
export interface SaveChapterNotesResult {
  notes: Record<(typeof LANGS)[number], BibleNote[]>;
  /** False outside Vercel (local dev), where there is no CDN cache to purge. */
  purged: boolean;
}

const fail = (status: number, error: string) => Response.json({ error }, { status });

/**
 * PUT /api/admin/notes: replaces one chapter's notes in both languages. Only the owner account may
 * call it; writes use the service role because RLS only allows public reads on bible_notes.
 */
export async function handleSaveChapterNotes(request: Request): Promise<Response> {
  const auth = await getUserClient(request);
  if (auth instanceof Response) return auth;
  if (!isOwnerEmail(auth.email)) return fail(403, "Esta cuenta no tiene acceso de administración.");

  const admin = getAdminClient();
  if (!admin) return fail(500, "Falta SUPABASE_SERVICE_ROLE_KEY en el servidor.");

  const parsed = saveSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return fail(400, parsed.error.issues.map((i) => i.message).join(" · "));
  }
  const { book_usfm, chapter, notes } = parsed.data;
  const book = BOOKS.find((b) => b.code === book_usfm);
  if (!book || chapter > (CHAPTER_COUNTS[book.bookid] ?? 0)) {
    return fail(400, `${book_usfm} ${chapter} no existe.`);
  }

  for (const lang of LANGS) {
    const rows = notes[lang].map((note, position) => ({ book_usfm, chapter, lang, position, ...note }));
    // Positions are rewritten 0..n-1, then whatever was beyond the new end is removed.
    if (rows.length) {
      const { error } = await admin.from(TABLE).upsert(rows, { onConflict: "book_usfm,chapter,lang,position" });
      if (error) return fail(500, `No se pudo guardar (${lang}): ${error.message}`);
    }
    const { error } = await admin
      .from(TABLE)
      .delete()
      .eq("book_usfm", book_usfm)
      .eq("chapter", chapter)
      .eq("lang", lang)
      .gte("position", rows.length);
    if (error) return fail(500, `No se pudieron borrar las notas sobrantes (${lang}): ${error.message}`);
  }

  // Foreground revalidation is fine here: the tag covers a single URL, so there's no stampede risk.
  let purged = false;
  if (process.env["VERCEL"]) {
    try {
      await dangerouslyDeleteByTag(notesCacheTag(book_usfm, chapter));
      purged = true;
    } catch (error) {
      console.error("bible_notes cache purge", error);
    }
  }

  const saved = {} as SaveChapterNotesResult["notes"];
  for (const lang of LANGS) {
    const { data, error } = await admin
      .from(TABLE)
      .select(COLUMNS)
      .eq("book_usfm", book_usfm)
      .eq("chapter", chapter)
      .eq("lang", lang)
      .order("position");
    if (error) return fail(500, `Guardado, pero no se pudo releer (${lang}): ${error.message}`);
    saved[lang] = data as BibleNote[];
  }
  return Response.json({ notes: saved, purged } satisfies SaveChapterNotesResult);
}
