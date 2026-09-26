import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/chat")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleChat } = await import("@/lib/patmos/api.server");
        return handleChat(request);
      },
    },
  },
});
