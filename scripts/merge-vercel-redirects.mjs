// Merges redirects.json (written by the Vite build, see src/lib/redirects-build.ts) into
// .vercel/output/config.json as permanent redirects ahead of the `filesystem` handler, so Vercel's
// edge answers old Blogger URLs with a 301 without invoking the server function.
//
//   node scripts/merge-vercel-redirects.mjs
//
// Safe to re-run: routes it added before (marked with "x-patmos-redirect") are replaced.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const CONFIG = ".vercel/output/config.json";
const REDIRECTS = "redirects.json";
const MARKER = "x-patmos-redirect";

if (!existsSync(CONFIG)) throw new Error(`${CONFIG} not found; run the build first.`);
const config = JSON.parse(readFileSync(CONFIG, "utf8"));
const redirects = existsSync(REDIRECTS) ? JSON.parse(readFileSync(REDIRECTS, "utf8")) : {};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const routes = (config.routes ?? []).filter((route) => !route.headers?.[MARKER]);
const filesystem = routes.findIndex((route) => route.handle === "filesystem");
if (filesystem === -1) throw new Error(`${CONFIG} has no { handle: "filesystem" } route.`);

const redirectRoutes = Object.entries(redirects).map(([from, to]) => ({
  src: `^${escapeRegex(from)}$`,
  status: 301,
  headers: { Location: to, [MARKER]: "1" },
}));
routes.splice(filesystem, 0, ...redirectRoutes);

writeFileSync(CONFIG, JSON.stringify({ ...config, routes }));
console.log(`Merged ${redirectRoutes.length} redirects into ${CONFIG}`);
