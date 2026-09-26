import { createFileRoute } from "@tanstack/react-router";

const handle = async ({ request }: { request: Request }) => {
  const { handleHistory } = await import("@/lib/patmos/api.server");
  return handleHistory(request);
};

export const Route = createFileRoute("/api/history")({
  staticData: { sitemap: false },
  server: { handlers: { GET: handle, DELETE: handle } },
});
