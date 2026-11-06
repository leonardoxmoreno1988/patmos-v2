// Merges host-based domain aliases, redirects.json (written by the Vite build, see
// src/lib/redirects-build.ts), and Edge CDN cache headers into .vercel/output/config.json
// ahead of the `filesystem` handler, so Vercel's edge answers without invoking the server function.
//
//    node scripts/merge-vercel-redirects.mjs
//
// Safe to re-run: routes it added before (marked with "x-patmos-redirect" or "x-patmos-cache") are replaced.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const CONFIG = ".vercel/output/config.json";
const REDIRECTS = "redirects.json";
const REDIRECT_MARKER = "x-patmos-redirect";
const CACHE_MARKER = "x-patmos-cache";

/** Secondary domains → canonical path on patmosresearch.com. Host match only; localhost is untouched. */
const HOST_REDIRECTS = [
  { host: "ritualypropaganda.com", location: "https://www.patmosresearch.com/estudios" },
  { host: "www.ritualypropaganda.com", location: "https://www.patmosresearch.com/estudios" },
  { host: "rvnotas.app", location: "https://www.patmosresearch.com/leer" },
  { host: "www.rvnotas.app", location: "https://www.patmosresearch.com/leer" },
];

/** Edge CDN cache rules: prevents serverless CPU execution on heavy crawler traffic */
const CACHE_RULES = [
  {
    src: "^/(?:en/)?(?:leer|estudios)(?:/.*)?$",
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400",
      [CACHE_MARKER]: "1",
    },
    continue: true,
  },
];

if (!existsSync(CONFIG)) throw new Error(`${CONFIG} not found; run the build first.`);
const config = JSON.parse(readFileSync(CONFIG, "utf8"));
const redirects = existsSync(REDIRECTS) ? JSON.parse(readFileSync(REDIRECTS, "utf8")) : {};

/** Old paths of removed pages: retired routes and Blogger URLs of the removed "Linajes de los Illuminati" series. */
const REMOVED_REDIRECTS = {
  "/welcome": "/libros",
  "/2012/04/linajes-de-los-illuminati-de-fritz.html": "/estudios",
  "/2013/10/linajes-de-los-illuminati-el-linaje_2.html": "/estudios",
  "/2012/05/linajes-de-los-illuminati-el-linaje_26.html": "/estudios",
  "/2012/04/linajes-de-los-illuminati-el-linaje_30.html": "/estudios",
  "/2013/02/linajes-de-los-illuminati-el-linaje_6.html": "/estudios",
  "/2012/04/linajes-de-los-illuminati-el-linaje.html": "/estudios",
  "/2012/05/linajes-de-los-illuminati-el-linaje.html": "/estudios",
  "/2012/06/linajes-de-los-illuminati-el-linaje.html": "/estudios",
  "/2014/07/linajes-de-los-illuminati-el-linaje.html": "/estudios",
  "/2012/06/linajes-de-los-illuminati-el-linaje-li.html": "/estudios",
  "/2012/07/linajes-de-los-illuminati-el-linaje.html": "/estudios",
  "/2012/08/linajes-de-los-illuminati-el-linaje.html": "/estudios",
  "/2012/09/linajes-de-los-illuminati-el-linaje.html": "/estudios",
  "/2014/03/linajes-de-los-illuminati-el-linaje-van.html": "/estudios",
  "/2013/10/linajes-de-los-illuminati-fritz.html": "/estudios",
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const routes = (config.routes ?? []).filter(
  (route) =>
    !route.headers?.[REDIRECT_MARKER] &&
    !route.headers?.[CACHE_MARKER] &&
    !route.headers?.["x-patmos-redirect"],
);
const filesystem = routes.findIndex((route) => route.handle === "filesystem");
if (filesystem === -1) throw new Error(`${CONFIG} has no { handle: "filesystem" } route.`);

const hostRedirectRoutes = HOST_REDIRECTS.map(({ host, location }) => ({
  src: "/(.*)",
  has: [{ type: "host", value: host }],
  status: 301,
  headers: { Location: location, [REDIRECT_MARKER]: "1" },
}));

// Generated redirects win over the removed-content map when both name the same path.
const redirectRoutes = Object.entries({ ...REMOVED_REDIRECTS, ...redirects }).map(([from, to]) => ({
  src: `^${escapeRegex(from)}$`,
  status: 301,
  headers: { Location: to, [REDIRECT_MARKER]: "1" },
}));

const removedSeriesRoute = {
  src: "^/estudios/linajes-de-los-illuminati-.*$",
  status: 301,
  headers: { Location: "/estudios", [REDIRECT_MARKER]: "1" },
};

routes.splice(
  filesystem,
  0,
  ...hostRedirectRoutes,
  ...redirectRoutes,
  removedSeriesRoute,
  ...CACHE_RULES,
);

writeFileSync(CONFIG, JSON.stringify({ ...config, routes }, null, 2));
console.log(
  `Merged ${hostRedirectRoutes.length} host redirects, ${redirectRoutes.length} path redirects, and ${CACHE_RULES.length} cache rules into ${CONFIG}`,
);