import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/consulta")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleConsulta } = await import("@/lib/patmos/consulta.server");
        return handleConsulta(request);
      },
    },
  },
});
