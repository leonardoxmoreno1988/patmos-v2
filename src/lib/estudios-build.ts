import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

export const ESTUDIOS_DIR = resolve(import.meta.dirname, "../content/estudios");

export interface EstudioMeta {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  author?: string;
  redirectFrom?: string;
  description: string;
  /** Categories shown as filter chips on /estudios. */
  tags: string[];
}

/**
 * Reads the `key: value` frontmatter block. Values may be JSON-quoted strings or JSON arrays
 * (`tags: ["Apologética"]`), as the importer writes them.
 */
function parseFrontmatter(
  source: string,
  file: string,
): { fields: Record<string, string | string[]>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) throw new Error(`${file}: missing frontmatter`);
  const fields: Record<string, string | string[]> = {};
  for (const line of (match[1] ?? "").split(/\r?\n/)) {
    const field = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (!field) continue;
    const [, key, raw] = field as unknown as [string, string, string];
    try {
      fields[key] =
        raw.startsWith('"') || raw.startsWith("[")
          ? (JSON.parse(raw) as string | string[])
          : raw.replace(/^'(.*)'$/, "$1");
    } catch {
      throw new Error(`${file}: invalid value for "${key}": ${raw}`);
    }
  }
  return { fields, body: source.slice(match[0].length) };
}

/** Frontmatter and Markdown body of one post file. */
export function readEstudioFile(file: string): { meta: EstudioMeta; body: string } {
  const name = file.replace(/^.*[\\/]/, "");
  const { fields, body } = parseFrontmatter(readFileSync(file, "utf8"), name);
  const string = (key: string) => {
    const value = fields[key];
    if (value !== undefined && typeof value !== "string")
      throw new Error(`${name}: "${key}" must be a string`);
    return value;
  };
  const [slug, title, date, updated, author, redirectFrom] = (
    ["slug", "title", "date", "updated", "author", "redirectFrom"] as const
  ).map(string);
  const description = string("description") ?? "";
  const tags = fields["tags"] ?? [];
  if (!Array.isArray(tags)) throw new Error(`${name}: "tags" must be a list, e.g. ["Apologética"]`);
  if (!slug || !title || !date) throw new Error(`${name}: frontmatter needs slug, title and date`);
  if (`${slug}.md` !== name) throw new Error(`${name}: slug "${slug}" doesn't match the file name`);
  const meta: EstudioMeta = {
    slug,
    title,
    date,
    description,
    tags: tags.map((tag) => tag.trim()).filter(Boolean),
    ...(updated ? { updated } : {}),
    ...(author ? { author } : {}),
    ...(redirectFrom ? { redirectFrom } : {}),
  };
  return { meta, body };
}

/** Absolute paths of every post in src/content/estudios. */
export function estudioFiles(dir: string = ESTUDIOS_DIR): string[] {
  try {
    return readdirSync(dir)
      .filter((name) => name.endsWith(".md"))
      .map((name) => join(dir, name));
  } catch {
    return [];
  }
}

/** Frontmatter of every post in src/content/estudios, newest first. */
export function readEstudios(dir: string = ESTUDIOS_DIR): EstudioMeta[] {
  return estudioFiles(dir)
    .map((file) => readEstudioFile(file).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}
