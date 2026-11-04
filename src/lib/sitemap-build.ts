import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { createClient } from "@supabase/supabase-js";
import { loadEnv, type Plugin } from "vite";

import { BOOKS, CHAPTER_COUNTS } from "./bible.ts";
import { bookSlug, type SlugLang } from "./bible-slugs.ts";
import { readEstudios } from "./estudios-build.ts";
import { SITE_URL } from "./seo.ts";
import { sitemapXML, type SitemapEntry } from "./sitemap.ts";

const ROUTES_DIR = resolve(import.meta.dirname, "../routes");
const OUTPUT_FILE = resolve(import.meta.dirname, "../../public/sitemap.xml");
const CHAPTER_ROUTE = "/leer/$libro/$cap";
const PAGE_SIZE = 1000;

/** "bookid:chapter" keys of the chapters that have study notes, per language. */
export type NotesCoverage = Record<SlugLang, Set<string>>;

/** Route paths whose file declares `staticData: { sitemap: true }`. */
function includedRoutePaths(dir: string = ROUTES_DIR): string[] {
  const paths: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) {
      paths.push(...includedRoutePaths(file));
      continue;
    }
    if (!/\.tsx?$/.test(entry.name)) continue;
    const source = readFileSync(file, "utf8");
    const path = /createFileRoute\(\s*["']([^"']+)["']\s*\)/.exec(source)?.[1];
    if (path && /staticData:\s*\{\s*sitemap:\s*true\s*\}/.test(source)) paths.push(path);
  }
  return paths.sort();
}

/**
 * Chapters with at least one note in each language. A chapter without notes is noindex on the
 * page (see readerHead), so it's left out of the sitemap too.
 */
export async function fetchNotesCoverage(url: string, anonKey: string): Promise<NotesCoverage> {
  const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
  const coverage: NotesCoverage = { es: new Set(), en: new Set() };
  const bookByCode = new Map(BOOKS.map((b) => [b.code, b.bookid]));
  for (const lang of ["es", "en"] as const) {
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await supabase
        .from("bible_notes")
        .select("book_usfm, chapter")
        .eq("lang", lang)
        .order("book_usfm")
        .order("chapter")
        .range(from, from + PAGE_SIZE - 1);
      if (error) throw new Error(`notes coverage (${lang}): ${error.message}`);
      for (const row of data ?? []) {
        const bookid = bookByCode.get(row.book_usfm as string);
        if (bookid !== undefined) coverage[lang].add(`${bookid}:${row.chapter}`);
      }
      if ((data?.length ?? 0) < PAGE_SIZE) break;
    }
  }
  return coverage;
}

export function buildSitemapEntries(coverage: NotesCoverage): SitemapEntry[] {
  const routes = includedRoutePaths();
  const entries: SitemapEntry[] = routes
    .filter((path) => !/[$*]/.test(path))
    // Index routes ("/estudios/") are served without the trailing slash.
    .map((path) => ({ path: path.length > 1 ? path.replace(/\/$/, "") : path }));
  if (routes.includes(CHAPTER_ROUTE)) {
    for (const book of BOOKS) {
      const chapters = CHAPTER_COUNTS[book.bookid] ?? 0;
      for (let chapter = 1; chapter <= chapters; chapter++) {
        const key = `${book.bookid}:${chapter}`;
        if (coverage.es.has(key)) entries.push({ path: `/leer/${bookSlug(book.bookid, "es")}/${chapter}` });
        if (coverage.en.has(key)) entries.push({ path: `/en/read/${bookSlug(book.bookid, "en")}/${chapter}` });
      }
    }
  }
  for (const post of readEstudios()) {
    entries.push({ path: `/estudios/${post.slug}`, lastmod: post.updated ?? post.date });
  }
  return entries;
}

/**
 * Writes public/sitemap.xml when Vite starts, so it ships as a static asset (served by the
 * CDN via the `filesystem` route) instead of invoking the server function on every crawl.
 */
export function sitemapPlugin(): Plugin {
  let written = false;
  let env: Record<string, string> = {};
  return {
    name: "patmos:sitemap",
    configResolved(config) {
      env = loadEnv(config.mode, config.envDir || config.root, "VITE_");
    },
    async buildStart() {
      if (written) return;
      written = true;
      const url = env["VITE_SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
      const anonKey = env["VITE_SUPABASE_ANON_KEY"] ?? process.env["VITE_SUPABASE_ANON_KEY"];
      if (!url || !anonKey) {
        this.warn("public/sitemap.xml not updated: Supabase settings are missing for the notes filter");
        return;
      }
      let coverage: NotesCoverage;
      try {
        coverage = await fetchNotesCoverage(url, anonKey);
      } catch (error) {
        // Keep the last sitemap rather than publish one with every chapter or none of them.
        this.warn(`public/sitemap.xml not updated: ${(error as Error).message}`);
        return;
      }
      const entries = buildSitemapEntries(coverage);
      if (entries.length === 0) throw new Error("Sitemap is empty: no routes declare staticData.sitemap = true");
      writeFileSync(OUTPUT_FILE, sitemapXML(`${SITE_URL}/`, entries));
      this.info(`wrote public/sitemap.xml (${entries.length} URLs)`);
    },
  };
}
