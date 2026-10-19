// Merges host-based domain aliases and redirects.json (written by the Vite build, see
// src/lib/redirects-build.ts) into .vercel/output/config.json as permanent redirects ahead of the
// `filesystem` handler, so Vercel's edge answers without invoking the server function.
//
//   node scripts/merge-vercel-redirects.mjs
//
// Safe to re-run: routes it added before (marked with "x-patmos-redirect") are replaced.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const CONFIG = ".vercel/output/config.json";
const REDIRECTS = "redirects.json";
const MARKER = "x-patmos-redirect";

/** Secondary domains → canonical path on patmosresearch.com. Host match only; localhost is untouched. */
const HOST_REDIRECTS = [
  { host: "ritualypropaganda.com", location: "https://www.patmosresearch.com/estudios" },
  { host: "www.ritualypropaganda.com", location: "https://www.patmosresearch.com/estudios" },
  { host: "rvnotas.app", location: "https://www.patmosresearch.com/leer" },
  { host: "www.rvnotas.app", location: "https://www.patmosresearch.com/leer" },
];

if (!existsSync(CONFIG)) throw new Error(`${CONFIG} not found; run the build first.`);
const config = JSON.parse(readFileSync(CONFIG, "utf8"));
const redirects = existsSync(REDIRECTS) ? JSON.parse(readFileSync(REDIRECTS, "utf8")) : {};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const routes = (config.routes ?? []).filter((route) => !route.headers?.[MARKER]);
const filesystem = routes.findIndex((route) => route.handle === "filesystem");
if (filesystem === -1) throw new Error(`${CONFIG} has no { handle: "filesystem" } route.`);

const hostRedirectRoutes = HOST_REDIRECTS.map(({ host, location }) => ({
  src: "/(.*)",
  has: [{ type: "host", value: host }],
  status: 301,
  headers: { Location: location, [MARKER]: "1" },
}));

const redirectRoutes = Object.entries(redirects).map(([from, to]) => ({
  src: `^${escapeRegex(from)}$`,
  status: 301,
  headers: { Location: to, [MARKER]: "1" },
}));
routes.splice(filesystem, 0, ...hostRedirectRoutes, ...redirectRoutes);

writeFileSync(CONFIG, JSON.stringify({ ...config, routes }));
console.log(
  `Merged ${hostRedirectRoutes.length} host redirects and ${redirectRoutes.length} path redirects into ${CONFIG}`,
);
