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

export function recordReadChapter(bookSlug: string, chapter: number) {
  if (!Number.isInteger(chapter) || chapter < 1) return;
  const progress = getReadingProgress();
  const chapters = Array.isArray(progress[bookSlug]) ? progress[bookSlug] : [];
  if (chapters.includes(chapter)) return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...progress, [bookSlug]: [...chapters, chapter] }));
  } catch { /* reading remains available if storage is disabled */ }
}