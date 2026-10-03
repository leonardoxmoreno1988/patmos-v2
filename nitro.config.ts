import { defineConfig } from "nitro";
import path from "node:path";

export default defineConfig({
  preset: "vercel",
  noExternals: ["tslib"],
  alias: {
    tslib: path.resolve("node_modules/tslib/tslib.es6.js"),
  },
});