import { defineConfig } from "nitro";

export default defineConfig({
  preset: "vercel",
  publicAssets: [
    {
      dir: "public",
      maxAge: 0,
    },
    {
      dir: "dist/client",
      maxAge: 31536000,
    },
  ],
});