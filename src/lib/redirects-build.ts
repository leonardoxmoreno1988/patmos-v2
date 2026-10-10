import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import type { Plugin } from "vite";

import { readEstudios } from "./estudios-build.ts";

/** Old path -> new path. Read by scripts/merge-vercel-redirects.mjs after the build. */
export const REDIRECTS_FILE = resolve(import.meta.dirname, "../../redirects.json");

export function buildRedirects(): Record<string, string> {
  const redirects: Record<string, string> = {};
  for (const post of readEstudios()) {
    if (!post.redirectFrom) continue;
    const from = post.redirectFrom;
    if (!/^\/[^?#\s]*$/.test(from) || from === "/") {
      throw new Error(
        `${post.slug}.md: redirectFrom must be a path like /2026/07/post.html, got "${from}"`,
      );
    }
    if (redirects[from]) throw new Error(`Two posts redirect from ${from}`);
    redirects[from] = `/estudios/${post.slug}`;
  }
  return redirects;
}

/** Writes redirects.json (Blogger URLs -> /estudios/<slug>) from the posts' `redirectFrom` frontmatter. */
export function redirectsPlugin(): Plugin {
  let written = false;
  return {
    name: "patmos:redirects",
    buildStart() {
      if (written) return;
      written = true;
      const redirects = buildRedirects();
      writeFileSync(REDIRECTS_FILE, `${JSON.stringify(redirects, null, 2)}\n`);
      this.info(`wrote redirects.json (${Object.keys(redirects).length} redirects)`);
    },
  };
}
