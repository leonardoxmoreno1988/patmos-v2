// Converts the published posts in a Blogger Atom export into src/content/estudios/<slug>.md,
// with frontmatter (title, date, updated, slug, redirectFrom, description) and a Markdown body.
//
//   node scripts/parse-blogger-export.mjs [blogger-export.xml]
//
// Re-running overwrites the generated files; files for posts no longer in the export are left alone.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { XMLParser } from "fast-xml-parser";
import TurndownService from "turndown";

const INPUT = process.argv[2] ?? "blogger-export.xml";
const OUT_DIR = "src/content/estudios";
const DESCRIPTION_LENGTH = 160;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  htmlEntities: true,
  isArray: (name) => ["entry", "link", "category"].includes(name),
});
const feed = parser.parse(readFileSync(INPUT, "utf8")).feed;

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.remove(["script", "style", "iframe"]);

/** Turndown leaves bare "**"/"_" lines where Blogger wrapped block elements in <b>/<i>. */
const toMarkdown = (html) =>
  turndown
    .turndown(html)
    .replace(/^[ \t]*(?:\*\*|__|_|\*)[ \t]*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const text = (node) =>
  typeof node === "object" && node !== null ? (node["#text"] ?? "") : String(node ?? "");

/** "/2026/07/Como-Trapo_2.html" -> "como-trapo-2" */
function slugFromPath(path) {
  return path
    .replace(/^.*\//, "")
    .replace(/\.html$/, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function decodeEntities(value) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return value.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (match, code) => {
    if (code[0] === "#") {
      const n =
        code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : Number(code.slice(1));
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return named[code.toLowerCase()] ?? match;
  });
}

const DEFAULT_AUTHOR = "Leonardo Moreno";
// Spelling variants of the same author in old bylines -> canonical name.
const AUTHOR_ALIASES = { "Leonardo M.": DEFAULT_AUTHOR, "J. P Holding": "J.P. Holding" };

// Guest bylines open the post as "Por <b><i>Author</i></b>", possibly after a lead image (markup only).
const GUEST_BYLINE =
  /^((?:\s|&nbsp;|<[^>]+>)*)Por(?:\s|&nbsp;|<\/[^>]+>)*((?:<(?:b|strong|i|em|u)\b[^>]*>\s*)+[^<]{1,40}(?:<\/?(?:b|strong|i|em|u|span)\b[^>]*>[^<]{0,20})*)/i;
// The house byline: "Por Leonardo M. // Ritual y Propaganda <br> № 89", within one block element.
const OWN_BYLINE =
  /^([\s\S]{0,1500}?)Por(?:(?!<\/?(?:p|div)\b)[\s\S]){0,400}?Ritual y Propaganda(?:(?:\s|&nbsp;|<[^>]+>){0,6}№(?:\s|&nbsp;|<[^>]+>)*\d+)?/i;

const stripTags = (html) =>
  decodeEntities(html.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();

/** Splits the byline off the post: the author's name and the HTML without it. */
function splitByline(html) {
  const own = OWN_BYLINE.exec(html);
  if (own) {
    // The issue number ("№ 49") sometimes sits in the next block, after stray markup.
    const rest = html
      .slice(own[0].length)
      .replace(/^((?:\s|&nbsp;|<[^>]+>)*)№(?:\s|&nbsp;)*\d+/, "$1");
    return { author: DEFAULT_AUTHOR, body: own[1] + rest };
  }
  const guest = GUEST_BYLINE.exec(html);
  if (guest) {
    const name = stripTags(guest[2]);
    return {
      author: AUTHOR_ALIASES[name] ?? name,
      body: guest[1] + html.slice(guest[0].length),
    };
  }
  return { author: DEFAULT_AUTHOR, body: html };
}

/** Plain-text excerpt of the post body (byline already removed), skipping the "Estimado lector" salutation. */
function describe(html) {
  const plain = decodeEntities(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<br\s*\/?>|<\/(p|div|blockquote|h\d|li)>/gi, " ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^Estimado lector,?\s*/i, "")
    .replace(/\s*Read more »$/, "")
    .replace(/^\p{Ll}/u, (c) => c.toUpperCase());
  if (plain.length <= DESCRIPTION_LENGTH) return plain;
  const cut = plain.slice(0, DESCRIPTION_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.]+$/, "")}…`;
}

const yaml = (value) => JSON.stringify(value); // JSON strings are valid YAML double-quoted scalars

mkdirSync(OUT_DIR, { recursive: true });
const seen = new Map();
let skipped = 0;
const truncated = [];

for (const entry of feed.entry ?? []) {
  const isDraft = text(entry["app:control"]?.["app:draft"]) === "yes";
  const alternate = (entry.link ?? []).find(
    (link) => link.rel === "alternate" && link.type === "text/html",
  );
  const isPost = (entry.category ?? []).every((c) => !/kind#(?!post)/.test(c.term ?? ""));
  if (isDraft || !alternate || !isPost) {
    skipped++;
    continue;
  }

  const redirectFrom = new URL(alternate.href).pathname;
  const slug = slugFromPath(redirectFrom);
  if (seen.has(slug))
    throw new Error(`Duplicate slug "${slug}": ${seen.get(slug)} and ${redirectFrom}`);
  seen.set(slug, redirectFrom);

  const { author, body: html } = splitByline(text(entry.content));
  // Blogger sometimes exports only the text above the jump break, ending in a "Read more »" link.
  if (/href="[^"]*#more"/.test(html)) truncated.push(redirectFrom);
  const published = text(entry.published);
  const frontmatter = [
    "---",
    `title: ${yaml(decodeEntities(text(entry.title)).trim())}`,
    `date: ${yaml(published.slice(0, 10))}`,
    `updated: ${yaml(text(entry.updated).slice(0, 10))}`,
    `author: ${yaml(author)}`,
    `slug: ${yaml(slug)}`,
    `redirectFrom: ${yaml(redirectFrom)}`,
    `description: ${yaml(describe(html))}`,
    "---",
  ].join("\n");

  writeFileSync(join(OUT_DIR, `${slug}.md`), `${frontmatter}\n\n${toMarkdown(html)}\n`);
}

if (truncated.length > 0) {
  console.warn(
    `Warning: ${truncated.length} posts only contain the text above the jump break:\n  ${truncated.join("\n  ")}`,
  );
}
const total = text(feed["openSearch:totalResults"]);
console.log(`Wrote ${seen.size} posts to ${OUT_DIR} (skipped ${skipped} drafts/non-posts).`);
if (total && Number(total) > (feed.entry ?? []).length) {
  console.warn(
    `Warning: the feed reports ${total} posts but contains ${(feed.entry ?? []).length} entries; the export is incomplete.`,
  );
}
