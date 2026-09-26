import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/consulta")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleConsulta } = await import("@/lib/patmos/consulta.server");
        return handleConsulta(request);
      },
    },
  },
});
