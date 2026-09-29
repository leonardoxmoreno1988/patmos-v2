import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const exportAllPolyfill = `
if (typeof globalThis.__exportAll === "undefined") {
  globalThis.__exportAll = (target, source) => {
    for (const key in source) {
      if (key !== "default" && !Object.prototype.hasOwnProperty.call(target, key)) {
        Object.defineProperty(target, key, { enumerable: true, get: () => source[key] });
      }
    }
  };
}
var __exportAll = globalThis.__exportAll;
`;

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro({ preset: "vercel" }),
    tsconfigPaths(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        banner: exportAllPolyfill,
      },
    },
  },
});