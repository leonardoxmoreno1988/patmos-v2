import { Marked, type Tokens } from "marked";
import type { Plugin } from "vite";

import { ESTUDIOS_DIR, estudioFiles, readEstudioFile } from "./estudios-build.ts";
import { normalizeSearch, type Estudio, type EstudioSummary } from "./estudios.ts";
import { buildRedirects } from "./redirects-build.ts";
import { SITE_URL } from "./seo.ts";

const LIST_ID = "virtual:estudios";
const SEARCH_ID = "virtual:estudios-search";
const DEFAULT_AUTHOR = "Leonardo Moreno";
const WORDS_PER_MINUTE = 200;
// Links to the old blog are rewritten to the migrated post when there is one.
const OLD_BLOG =
  /^https?:\/\/(?:www\.)?(?:ritualypropaganda\.com|ritualypropaganda\.blogspot\.com)(\/[^?#]*)/i;

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const plainText = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function createRenderer(redirects: Record<string, string>) {
  const marked = new Marked({ gfm: true, async: false });
  marked.use({
    renderer: {
      // Posts are Markdown only; any raw HTML that slips through is shown as text, not executed.
      html: ({ text }: Tokens.HTML | Tokens.Tag) => escapeHtml(text),
      link(token: Tokens.Link) {
        const label = this.parser.parseInline(token.tokens);
        const old = OLD_BLOG.exec(token.href);
        const href = (old && redirects[old[1]!]) ?? token.href;
        const external = /^https?:\/\//i.test(href) && !href.startsWith(SITE_URL);
        const title = token.title ? ` title="${escapeHtml(token.title)}"` : "";
        const target = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${escapeHtml(href)}"${title}${target}>${label}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        const caption = title ? ` title="${escapeHtml(title)}"` : "";
        return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${caption} loading="lazy" decoding="async">`;
      },
    },
  });
  return (markdown: string) => marked.parse(markdown) as string;
}

function compile(
  file: string,
  render: (markdown: string) => string,
): { post: Estudio; text: string } {
  const { meta, body } = readEstudioFile(file);
  const html = render(body);
  const text = plainText(html);
  const image = /<img src="([^"]+)"/.exec(html)?.[1]?.replace(/&amp;/g, "&");
  const post: Estudio = {
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    ...(meta.updated && meta.updated !== meta.date ? { updated: meta.updated } : {}),
    author: meta.author ?? DEFAULT_AUTHOR,
    readingMinutes: Math.max(1, Math.round(text.split(" ").length / WORDS_PER_MINUTE)),
    html,
    ...(image ? { image } : {}),
  };
  return { post, text };
}

const summary = ({ html: _html, image: _image, ...rest }: Estudio): EstudioSummary => rest;

/**
 * Compiles src/content/estudios/*.md at build time, so no Markdown parser ships to the browser:
 * - `import post from ".../<slug>.md"` -> Estudio (frontmatter + rendered HTML); routes load these
 *   one at a time through a non-eager import.meta.glob.
 * - `virtual:estudios` -> EstudioSummary[] for the listing page, newest first.
 * - `virtual:estudios-search` -> slug -> the post's unique normalized words, loaded only once a reader searches.
 */
export function estudiosPlugin(): Plugin {
  let render: ((markdown: string) => string) | undefined;
  const renderer = () => (render ??= createRenderer(buildRedirects()));

  return {
    name: "patmos:estudios",
    enforce: "pre",
    resolveId(id) {
      return id === LIST_ID || id === SEARCH_ID ? `\0${id}` : undefined;
    },
    load(id) {
      if (id === `\0${LIST_ID}` || id === `\0${SEARCH_ID}`) {
        // No addWatchFile here: in dev, watched files are recorded as imports of this module, and
        // import analysis fails on the directory. configureServer below handles reloading instead.
        const compiled = estudioFiles().map((file) => compile(file, renderer()));
        if (id === `\0${SEARCH_ID}`) {
          const index = Object.fromEntries(
            // Search matches each term separately, so each post's unique words are enough.
            compiled.map(({ post, text }) => [
              post.slug,
              [...new Set(normalizeSearch(text).split(/[^\p{L}\p{N}]+/u))].join(" "),
            ]),
          );
          return `export default ${JSON.stringify(index)};`;
        }
        const list = compiled
          .map(({ post }) => summary(post))
          .sort((a, b) => b.date.localeCompare(a.date));
        return `export default ${JSON.stringify(list)};`;
      }
      const file = id.split("?")[0]!;
      if (file.startsWith(ESTUDIOS_DIR) && file.endsWith(".md")) {
        return `export default ${JSON.stringify(compile(file, renderer()).post)};`;
      }
      return undefined;
    },
    configureServer(server) {
      // The listing and search index depend on every post, including ones added or deleted later.
      const refresh = (file: string) => {
        if (!file.startsWith(ESTUDIOS_DIR) || !file.endsWith(".md")) return;
        render = undefined; // slugs or redirects may have changed
        for (const env of Object.values(server.environments)) {
          for (const id of [`\0${LIST_ID}`, `\0${SEARCH_ID}`]) {
            const mod = env.moduleGraph.getModuleById(id);
            if (mod) env.moduleGraph.invalidateModule(mod);
          }
        }
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.add(ESTUDIOS_DIR);
      server.watcher.on("add", refresh).on("change", refresh).on("unlink", refresh);
    },
  };
}
