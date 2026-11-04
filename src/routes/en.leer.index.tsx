import { createFileRoute, redirect } from "@tanstack/react-router";

// /en/leer with no book: the legacy English reader's start, now the first chapter of /en/read.
export const Route = createFileRoute("/en/leer/")({
 staticData: { sitemap: false },
 beforeLoad: () => {
  throw redirect({ to: "/en/read/$libro/$cap", params: { libro: "genesis", cap: "1" }, statusCode: 301 });
 },
});
