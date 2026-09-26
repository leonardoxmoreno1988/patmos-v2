import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/billing")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleBilling } = await import("@/lib/patmos/api.server");
        return handleBilling(request);
      },
    },
  },
});
