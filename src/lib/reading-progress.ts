import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const KEY = "patmos:read-chapters";

export type ReadingProgress = Record<string, number[]>;

export function getReadingProgress(): ReadingProgress {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function mergeProgress(base: ReadingProgress, extra: ReadingProgress): ReadingProgress {
  const merged: ReadingProgress = { ...base };
  for (const [slug, chapters] of Object.entries(extra)) {
    const current = Array.isArray(merged[slug]) ? merged[slug] : [];
    merged[slug] = Array.from(new Set([...current, ...chapters]));
  }
  return merged;
}

export function recordReadChapter(bookSlug: string, chapter: number) {
  if (!Number.isInteger(chapter) || chapter < 1) return;
  const progress = getReadingProgress();
  const chapters = Array.isArray(progress[bookSlug]) ? progress[bookSlug] : [];
  if (!chapters.includes(chapter)) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...progress, [bookSlug]: [...chapters, chapter] }));
    } catch { /* reading remains available if storage is disabled */ }
  }
  // Mirror to the account so progress follows the user across devices.
  void supabase.auth.getSession().then(({ data }) => {
    const userId = data.session?.user?.id;
    if (!userId) return;
    void supabase
      .from("user_progress")
      .upsert(
        { user_id: userId, book_slug: bookSlug, chapter },
        { onConflict: "user_id,book_slug,chapter" },
      )
      .then(() => undefined, () => undefined);
  }, () => undefined);
}

/**
 * Reading progress for the home grid. Seeds from the local cache immediately
 * (so bars never flash back to 0%), then merges the account's `user_progress`
 * rows in a single batch query once the session is known.
 */
export function useReadingProgress(): { read: ReadingProgress; loading: boolean } {
  const [read, setRead] = useState<ReadingProgress>(() => getReadingProgress());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setRead(getReadingProgress());

    void supabase.auth.getSession().then(async ({ data }) => {
      const userId = data.session?.user?.id;
      if (!userId || cancelled) {
        if (!cancelled) setLoading(false);
        return;
      }
      const { data: rows, error } = await supabase
        .from("user_progress")
        .select("book_slug, chapter")
        .eq("user_id", userId);
      if (cancelled) return;
      if (!error && Array.isArray(rows)) {
        const remote: ReadingProgress = {};
        for (const row of rows as { book_slug: string; chapter: number }[]) {
          if (!row.book_slug || !Number.isInteger(row.chapter)) continue;
          (remote[row.book_slug] ??= []).push(row.chapter);
        }
        setRead((prev) => {
          const merged = mergeProgress(prev, remote);
          try {
            localStorage.setItem(KEY, JSON.stringify(merged));
          } catch { /* cache write is best-effort */ }
          return merged;
        });
      }
      setLoading(false);
    }, () => setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  return { read, loading };
}
