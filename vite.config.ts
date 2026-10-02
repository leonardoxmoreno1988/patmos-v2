import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro({
      preset: "vercel",
      rollupConfig: {
        output: {
          inlineDynamicImports: true,
        },
      },
    }),
    tsconfigPaths(),
    tailwindcss(),
  ],
  ssr: {
    noExternal: ["tslib"],
  },
});