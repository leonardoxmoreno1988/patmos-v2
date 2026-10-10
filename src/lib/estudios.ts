/** Listing data for one post (src/content/estudios/<slug>.md), compiled by src/lib/estudios-plugin.ts. */
export interface EstudioSummary {
  slug: string;
  title: string;
  description: string;
  /** ISO dates, "YYYY-MM-DD" */
  date: string;
  updated?: string;
  author: string;
  readingMinutes: number;
  tags: string[];
  /** First image in the post (featured card, structured data). */
  image?: string;
}

/** A full post: summary plus the rendered article HTML. */
export interface Estudio extends EstudioSummary {
  html: string;
}

/** Author of every post without a guest byline; cards only name guest authors. */
export const HOUSE_AUTHOR = "Leonardo Moreno";

const DATE_FORMAT = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-07-05" -> "5 de julio de 2026" (UTC, so server and client render the same text). */
export const formatEstudioDate = (date: string) =>
  DATE_FORMAT.format(new Date(`${date}T00:00:00Z`));

const SHORT_DATE_FORMAT = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-07-05" -> "5 jul 2026" */
export const formatEstudioDateShort = (date: string) =>
  SHORT_DATE_FORMAT.format(new Date(`${date}T00:00:00Z`));

/** Lowercase without accents, for accent-insensitive search ("Revelación" matches "revelacion"). */
export const normalizeSearch = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
