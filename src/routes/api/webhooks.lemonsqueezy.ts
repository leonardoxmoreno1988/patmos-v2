import { createFileRoute } from "@tanstack/react-router";

// Lemon Squeezy → Settings → Webhooks should point at https://www.patmosresearch.com/api/webhooks/lemonsqueezy
export const Route = createFileRoute("/api/webhooks/lemonsqueezy")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleLemonSqueezyWebhook } =
          await import("@/lib/patmos/lemonsqueezy-webhook.server");
        return handleLemonSqueezyWebhook(request);
      },
    },
  },
});
