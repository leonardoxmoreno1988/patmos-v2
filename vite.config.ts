import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  ssr: {
    noExternal: [
      "tslib",
      "/@supabase/",
      "@tanstack/react-router",
      "@tanstack/react-start",
    ],
  },
  plugins: [
    tanstackStart(),
    nitro({
      preset: "vercel",
    }),
    tsconfigPaths(),
    tailwindcss(),
  ],
});