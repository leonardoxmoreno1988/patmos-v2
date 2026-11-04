import { createFileRoute, redirect } from "@tanstack/react-router";

import { resolveReaderParams } from "@/lib/reader-route";

// /es/leer/... is the Spanish reader under a redundant language prefix: permanently moved to /leer/...
export const Route = createFileRoute("/es/leer/$libro/$cap")({
 staticData: { sitemap: false },
 beforeLoad: ({ params }) => {
  resolveReaderParams(params);
  throw redirect({ to: "/leer/$libro/$cap", params, statusCode: 301 });
 },
});
