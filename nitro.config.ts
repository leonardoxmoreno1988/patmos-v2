import { defineConfig } from "nitro";
import fs from "node:fs";
import path from "node:path";

const copyTslibPlugin = () => ({
  name: "copy-tslib",
  closeBundle() {
    const src = path.resolve("node_modules/tslib");
    const dest = path.resolve(
      ".vercel/output/functions/__server.func/node_modules/tslib"
    );

    if (fs.existsSync(src)) {
      fs.mkdirSync(dest, { recursive: true });
      fs.cpSync(src, dest, { recursive: true });
      console.log("✓ tslib copiado exitosamente a __server.func/node_modules/tslib");
    }
  },
});

export default defineConfig({
  preset: "vercel",
  rollupConfig: {
    plugins: [copyTslibPlugin()],
  },
});