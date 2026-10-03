import { defineConfig } from "nitro";

export default defineConfig({
  preset: "vercel",
  noExternals: ["tslib"],
});