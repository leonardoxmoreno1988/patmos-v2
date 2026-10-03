import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const tslibPath = require.resolve("tslib");

export default defineConfig({
  resolve: {
    alias: {
      tslib: tslibPath,
    },
  },
  plugins: [
    tanstackStart(),
    nitro({
      preset: "vercel",
      noExternals: [
        "tslib",
        "@supabase/supabase-js",
        "@supabase/functions-js",
        "@supabase/postgrest-js",
        "@supabase/realtime-js",
        "@supabase/storage-js",
      ],
      rollupConfig: {
        plugins: [
          {
            name: "force-inline-tslib",
            resolveId(source: string) {
              if (source === "tslib" || source.startsWith("tslib/")) {
                return {
                  id: tslibPath,
                  external: false,
                };
              }
              return null;
            },
          },
        ],
      },
    }),
    tsconfigPaths(),
    tailwindcss(),
  ],
});