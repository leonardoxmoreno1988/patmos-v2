import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      tslib: path.resolve("node_modules/tslib/tslib.es6.js"),
    },
  },
  plugins: [
    tanstackStart(),
    nitro(),
    tsconfigPaths(),
    tailwindcss(),
  ],
});