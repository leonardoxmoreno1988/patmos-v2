import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  ssr: {
    noExternal: [
      "tslib",
      "@supabase/supabase-js",
      "@supabase/functions-js",
      "@supabase/postgrest-js",
      "@supabase/realtime-js",
      "@supabase/storage-js",
    ],
  },
  plugins: [
    tanstackStart(),
    nitro(),
    tsconfigPaths(),
    tailwindcss(),
  ],
});