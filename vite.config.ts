import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

import { estudiosPlugin } from "./src/lib/estudios-plugin.ts";
import { redirectsPlugin } from "./src/lib/redirects-build.ts";
import { sitemapPlugin } from "./src/lib/sitemap-build.ts";

export default defineConfig({
  plugins: [
    sitemapPlugin(),
    redirectsPlugin(),
    estudiosPlugin(),
    tanstackStart(),
    viteReact(),
    tsconfigPaths(),
    tailwindcss(),
  ],
});
