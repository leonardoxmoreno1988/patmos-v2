import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  ssr: {
    noExternal: ["tslib"],
  },
  plugins: [
    tanstackStart(),
    nitro({
      preset: "vercel",
      externals: {
        inline: ["tslib"],
      },
      rollupConfig: {
        output: {
          inlineDynamicImports: true,
        },
      },
    }),
    tsconfigPaths(),
    tailwindcss(),
  ],
});