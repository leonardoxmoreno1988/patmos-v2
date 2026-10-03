import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro({
      preset: "vercel",
      rollupConfig: {
        plugins: [
          {
            name: "inline-tslib-plugin",
            resolveId(source: string) {
              if (source === "tslib" || source.startsWith("tslib/")) {
                return require.resolve("tslib/tslib.es6.mjs");
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