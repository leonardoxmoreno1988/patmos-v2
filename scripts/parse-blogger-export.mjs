// Converts the published posts in a Blogger export into src/content/estudios/<slug>.md, with
// frontmatter (title, date, updated, author, slug, redirectFrom, description, tags) and a Markdown
// body. Reads both the full backup (Settings → Back up content; <blogger:type>POST</blogger:type>)
// and the older Atom feed format (/feeds/posts/default).
//
//   node scripts/parse-blogger-export.mjs [blogger-export.xml]
//
// Re-running overwrites the generated files (keeping each file's `tags` line, which may be edited by
// hand); files for posts no longer in the export are left alone.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { XMLParser } from "fast-xml-parser";
import TurndownService from "turndown";

const INPUT = process.argv[2] ?? "blogger-export.xml";
const OUT_DIR = "src/content/estudios";
const DESCRIPTION_LENGTH = 160;
// The blog's timezone: the full backup stores UTC, but post dates are shown (and were first imported)
// in blog time, so a post published at 8 p.m. Pacific keeps its local date.
const BLOG_TIMEZONE = "America/Los_Angeles";
const blogDate = (iso) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: BLOG_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));

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

// The old newsletter footer: "**PD:** Este mensaje (or libro) fue enviado vía email. Suscríbase aquí:", often
// followed by the author photo and bio. Everything from it to the end of the post is dropped.
const NEWSLETTER_FOOTER =
  /^.*?(?:(?:\*\*|__)?PD:(?:\*\*|__)?\s*(?:\*\*|__)?Este \p{L}+ fue enviado|Este \p{L}+ fue enviado vía email\.?\s*Suscríbase aquí)[\s\S]*$/mu;

/**
 * HTML -> Markdown, without the newsletter footer. Turndown also leaves bare "**"/"_" lines where
 * Blogger wrapped block elements in <b>/<i>.
 */
const toMarkdown = (html) =>
  turndown
    .turndown(html)
    .replace(NEWSLETTER_FOOTER, "")
    .replace(/^[ \t]*(?:\*\*|__|_|\*)[ \t]*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const text = (node) =>
  typeof node === "object" && node !== null ? (node["#text"] ?? "") : String(node ?? "");

/** "/2026/07/Como-Trapo_2.html" -> "como-trapo-2" */
const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** "/2026/07/Como-Trapo_2.html" -> "como-trapo-2" */
const slugFromPath = (path) => slugify(path.replace(/^.*\//, "").replace(/\.html$/, ""));

/** Title slug for posts whose (truncated) Blogger URLs collide, cut at a word boundary. */
function slugFromTitle(title, maxLength = 80) {
  const slug = slugify(title);
  return slug.length <= maxLength ? slug : slug.slice(0, slug.lastIndexOf("-", maxLength));
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
const AUTHOR_ALIASES = {
  "Leonardo M.": DEFAULT_AUTHOR,
  "J. P Holding": "J.P. Holding",
  "J. P. Holding": "J.P. Holding",
  "J.P Holding": "J.P. Holding",
  "Kevin Farrington": "Kevin Farringdon",
  "Steve Barcanz": "Steven Bancarz",
  "Steven Barcanz": "Steven Bancarz",
  "Dr. Juan Ferrer": "Dr. John Ferrer",
  JhonKbn: "Jhonkbn",
  "Vigilan Citizen": "Vigilant Citizen",
  TheVigilantCitizen: "Vigilant Citizen",
  "Fritz Sprignmeier": "Fritz Springmeier",
  "Cuidadano Uno": "Ciudadano Uno",
};

// Guest bylines open the post (possibly after a lead image or the old ">> Suscríbete al newsletter
// semanal" link) in a few shapes: "Por <b><i>Author</i></b>", "<b><i>Por Author</i></b>",
// "<i>Por</i>&nbsp;<i><b>Author</b></i>". The name is a whole text node of up to 40 characters, and
// "Por" or the name must be emphasized, so a first sentence starting with "Por" isn't taken as one.
const GUEST_BYLINE =
  /^((?:\s|&nbsp;|<[^>]+>|&gt;&gt;|Suscríbete al newsletter semanal)*?)((?:<(?:b|strong|i|em|u)\b[^>]*>\s*)*)Por((?:\s|&nbsp;|<\/?[^>]+>)+)([^<]{1,40}(?=<)(?:<\/?(?:b|strong|i|em|u|span)\b[^>]*>[^<]{0,20})*)/i;
const EMPHASIS = /<(?:b|strong|i|em|u)\b/i;
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
  if (guest && (guest[2] || EMPHASIS.test(guest[3]))) {
    // A name cut at 40 characters can end in a partial entity ("Vigilant Citizen&nbs").
    const name = stripTags(guest[4].replace(/&[a-z]*$/i, ""));
    return {
      author: AUTHOR_ALIASES[name] ?? name,
      body: guest[1] + html.slice(guest[0].length),
    };
  }
  return { author: DEFAULT_AUTHOR, body: html };
}

/** Plain-text excerpt of the post body (byline already removed), skipping the newsletter link and salutation. */
function describe(html) {
  const plain = decodeEntities(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<br\s*\/?>|<\/(p|div|blockquote|h\d|li)>/gi, " ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim()
    // Posts from 2010-2017 open with a ">> Suscríbete al newsletter semanal" link.
    .replace(/^(?:>>\s*)?Suscríbete al newsletter semanal\s*/i, "")
    .replace(/^Estimado lector,?\s*/i, "")
    .replace(/\s*Read more »$/, "")
    .replace(/^\p{Ll}/u, (c) => c.toUpperCase());
  if (plain.length <= DESCRIPTION_LENGTH) return plain;
  const cut = plain.slice(0, DESCRIPTION_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.]+$/, "")}…`;
}

/** Blogger labels -> tags: "APOLOGÉTICA" -> "Apologética"; issue numbers ("№ 89") are skipped. */
const labelTags = (categories) =>
  categories
    .filter((c) => !c.scheme?.includes("#kind") && c.term && !c.term.startsWith("№"))
    .map((c) =>
      c.term
        .trim()
        .toLocaleLowerCase("es")
        .replace(/^\p{L}/u, (l) => l.toLocaleUpperCase("es")),
    );

/** The `tags:` line of a post that was already imported, so hand-edited categories survive a re-import. */
const existingTagsLine = (file) =>
  existsSync(file)
    ? /^tags: .*$/m.exec(readFileSync(file, "utf8").split(/\n---/)[0])?.[0]
    : undefined;

const yaml = (value) => JSON.stringify(value); // JSON strings are valid YAML double-quoted scalars

mkdirSync(OUT_DIR, { recursive: true });
const seen = new Map();
const skipped = new Map();
const skip = (reason) => skipped.set(reason, (skipped.get(reason) ?? 0) + 1);
const truncated = [];

/** The post's original path ("/2026/07/post.html"), or a reason to skip the entry. */
function postPath(entry) {
  const type = text(entry["blogger:type"]);
  if (type) {
    // Full backup: comments, pages and posts share one list; only live posts are published.
    if (type !== "POST") return { skip: type.toLowerCase() };
    const status = text(entry["blogger:status"]);
    if (status !== "LIVE") return { skip: `post (${status.toLowerCase()})` };
    const path = text(entry["blogger:filename"]);
    return path ? { path } : { skip: "post without URL" };
  }
  // Atom feed: drafts are marked with app:draft, the URL is the alternate link.
  if (text(entry["app:control"]?.["app:draft"]) === "yes") return { skip: "post (draft)" };
  if ((entry.category ?? []).some((c) => /kind#(?!post)/.test(c.term ?? "")))
    return { skip: "non-post" };
  const alternate = (entry.link ?? []).find(
    (link) => link.rel === "alternate" && link.type === "text/html",
  );
  return alternate ? { path: new URL(alternate.href).pathname } : { skip: "post without URL" };
}

const posts = [];
for (const entry of feed.entry ?? []) {
  const { path, skip: reason } = postPath(entry);
  if (path)
    posts.push({ entry, redirectFrom: path, title: decodeEntities(text(entry.title)).trim() });
  else skip(reason);
}

// Blogger truncates long URLs, so different posts (often parts of a series) can share the same name
// in different months. Those get a slug from their title instead, plus the month if that collides too.
const pathSlugCount = new Map();
for (const post of posts) {
  const slug = slugFromPath(post.redirectFrom);
  pathSlugCount.set(slug, (pathSlugCount.get(slug) ?? 0) + 1);
}
for (const post of posts) {
  const pathSlug = slugFromPath(post.redirectFrom);
  post.slug = pathSlugCount.get(pathSlug) > 1 ? slugFromTitle(post.title) || pathSlug : pathSlug;
}
const titleSlugCount = new Map();
for (const { slug } of posts) titleSlugCount.set(slug, (titleSlugCount.get(slug) ?? 0) + 1);
for (const post of posts) {
  if (titleSlugCount.get(post.slug) > 1) {
    post.slug = `${post.slug}-${post.redirectFrom.slice(1, 8).replace("/", "-")}`; // "-2013-05"
  }
}

for (const { entry, redirectFrom, title, slug } of posts) {
  if (seen.has(slug))
    throw new Error(`Duplicate slug "${slug}": ${seen.get(slug)} and ${redirectFrom}`);
  seen.set(slug, redirectFrom);

  const { author, body: html } = splitByline(text(entry.content));
  // Blogger sometimes exports only the text above the jump break, ending in a "Read more »" link.
  if (/href="[^"]*#more"/.test(html)) truncated.push(redirectFrom);
  const file = join(OUT_DIR, `${slug}.md`);
  const frontmatter = [
    "---",
    `title: ${yaml(title)}`,
    `date: ${yaml(blogDate(text(entry.published)))}`,
    `updated: ${yaml(blogDate(text(entry.updated)))}`,
    `author: ${yaml(author)}`,
    `slug: ${yaml(slug)}`,
    `redirectFrom: ${yaml(redirectFrom)}`,
    `description: ${yaml(describe(html))}`,
    existingTagsLine(file) ?? `tags: ${JSON.stringify(labelTags(entry.category ?? []))}`,
    "---",
  ].join("\n");

  writeFileSync(file, `${frontmatter}\n\n${toMarkdown(html)}\n`);
}

if (truncated.length > 0) {
  console.warn(
    `Warning: ${truncated.length} posts only contain the text above the jump break:\n  ${truncated.join("\n  ")}`,
  );
}
const total = text(feed["openSearch:totalResults"]);
const skippedSummary = [...skipped].map(([reason, n]) => `${n} ${reason}`).join(", ");
console.log(
  `Wrote ${seen.size} posts to ${OUT_DIR}${skippedSummary ? ` (skipped ${skippedSummary})` : ""}.`,
);
if (total && Number(total) > (feed.entry ?? []).length) {
  console.warn(
    `Warning: the feed reports ${total} posts but contains ${(feed.entry ?? []).length} entries; the export is incomplete.`,
  );
}
