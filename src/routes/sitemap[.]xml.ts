import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";

import { BOOKS, CHAPTER_COUNTS, slugifyBook } from "@/lib/bible";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";

const BASE_URL = "https://rvnotas.app";

const CHAPTER_ROUTE_ID = "/leer/$libro/$cap";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        if (isSitemapRouteIncluded(router.routesById[CHAPTER_ROUTE_ID])) {
          for (const book of BOOKS) {
            const chapters = CHAPTER_COUNTS[book.bookid] ?? 0;
            for (let chapter = 1; chapter <= chapters; chapter++) {
              const location = router.buildLocation({
                to: CHAPTER_ROUTE_ID,
                params: { libro: slugifyBook(book.name), cap: String(chapter) },
                search: () => ({}),
                hash: "",
              });
              const path = sitemapPathForLocation(router, location, CHAPTER_ROUTE_ID);
              if (path) entries.push({ path });
            }
          }
        }

        if (entries.length === 0) {
          return new Response(
            'No pages are included in this sitemap. Check route decisions and ancestor exclusions. Setting "exclude-subtree" on the root excludes the entire site.',
            { status: 404, headers: { "Cache-Control": "no-store" } },
          );
        }

        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
