import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/notes")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      PUT: async ({ request }) => {
        const { handleSaveChapterNotes } = await import("@/lib/patmos/admin-notes.server");
        return handleSaveChapterNotes(request);
      },
    },
  },
});
