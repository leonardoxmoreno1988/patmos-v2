import { createFileRoute, redirect } from "@tanstack/react-router";

import { bookSlug } from "@/lib/bible-slugs";
import { resolveReaderParams } from "@/lib/reader-route";

// Legacy English address (/en/leer/...): permanently moved to /en/read/... with the English slug.
export const Route = createFileRoute("/en/leer/$libro/$cap")({
 staticData: { sitemap: false },
 beforeLoad: ({ params }) => {
  const { bookid, chapter } = resolveReaderParams(params);
  throw redirect({ to: "/en/read/$libro/$cap", params: { libro: bookSlug(bookid, "en"), cap: String(chapter) }, statusCode: 301 });
 },
});
