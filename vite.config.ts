import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const tslibPath = require.resolve("tslib/tslib.es6.mjs");

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
      rollupConfig: {
        external(id: string) {
          if (id === "tslib" || id.startsWith("tslib") || id.includes("supabase")) {
            return false;
          }
          return undefined;
        },
        plugins: [
          {
            name: "force-inline-tslib",
            resolveId(source: string) {
              if (source === "tslib" || source.startsWith("tslib/")) {
                return tslibPath;
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