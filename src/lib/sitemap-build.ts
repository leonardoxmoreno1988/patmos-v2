import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import type { Plugin } from "vite";

import { BOOKS, CHAPTER_COUNTS, slugifyBook } from "./bible.ts";
import { readEstudios } from "./estudios-build.ts";
import { SITE_URL } from "./seo.ts";
import { sitemapXML, type SitemapEntry } from "./sitemap.ts";

const ROUTES_DIR = resolve(import.meta.dirname, "../routes");
const OUTPUT_FILE = resolve(import.meta.dirname, "../../public/sitemap.xml");
const CHAPTER_ROUTE = "/leer/$libro/$cap";

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

export function buildSitemapEntries(): SitemapEntry[] {
  const routes = includedRoutePaths();
  const entries: SitemapEntry[] = routes
    .filter((path) => !/[$*]/.test(path))
    // Index routes ("/estudios/") are served without the trailing slash.
    .map((path) => ({ path: path.length > 1 ? path.replace(/\/$/, "") : path }));
  if (routes.includes(CHAPTER_ROUTE)) {
    for (const book of BOOKS) {
      const chapters = CHAPTER_COUNTS[book.bookid] ?? 0;
      for (let chapter = 1; chapter <= chapters; chapter++) {
        entries.push({ path: `/leer/${slugifyBook(book.name)}/${chapter}` });
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
  return {
    name: "patmos:sitemap",
    buildStart() {
      if (written) return;
      written = true;
      const entries = buildSitemapEntries();
      if (entries.length === 0) throw new Error("Sitemap is empty: no routes declare staticData.sitemap = true");
      writeFileSync(OUTPUT_FILE, sitemapXML(`${SITE_URL}/`, entries));
      this.info(`wrote public/sitemap.xml (${entries.length} URLs)`);
    },
  };
}
