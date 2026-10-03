import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const tslibPath = require.resolve("tslib/tslib.es6.mjs");

const inlineTslibPlugin = () => ({
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
});

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro({
      preset: "vercel",
      rollupConfig: {
        plugins: [inlineTslibPlugin()],
      },
    }),
    tsconfigPaths(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      plugins: [inlineTslibPlugin()],
    },
  },
});