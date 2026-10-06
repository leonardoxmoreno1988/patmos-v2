# Patmos v2 - Claude Code Guide

## Tech Stack
- Framework: TanStack Start / Nitro
- Bundler/Compiler: Vite
- Runtime Environment: Node.js 22.x (ES Modules `type: "module"`)
- Primary Editor: Cursor

## Critical Commands
- Development: `npm run dev`
- Build: `npm run build`
- **BUILD PIPELINE NOTICE**: We use a custom Vercel Build Output API v3 setup. The build script bundles static assets into `.vercel/output/static`, server logic into `.vercel/output/functions/__server.func`, and auto-generates `config.json`, `.vc-config.json` (runtime `nodejs22.x`), and a `package.json` with `type: "module"`.
- **STRICT RULE**: NEVER modify the `"build"` script in `package.json` without explicit approval.

## Development Guidelines
- Write clean, strictly-typed TypeScript.
- Favor functional components and React Hooks.
- Ensure all new dependencies support strict ESM environments.
- After making substantial changes, always verify local compilation using `npm run build`.