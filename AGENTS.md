# Carta abierta

Static [Astro](https://astro.build) site that renders an open letter ("Carta abierta a FESMA") from Markdown content in `src/content/sections/`. There is no backend, database, or auth. It deploys to Netlify as a static build.

Editorial backlog for points not yet written into the letter lives in `tasks/` (created by `/extraer-puntos-carta`). Those files are work items only — Astro does not load them.

## Cursor Cloud specific instructions

- Standard commands live in `package.json`: `pnpm dev` (dev server), `pnpm build` (static build), `pnpm preview` (serve the built `dist/`).
- There is no lint or unit-test script. The single quality gate is `pnpm build`, which runs Astro's content sync + type generation and fails on type/content errors. CI (`.github/workflows/pr-build.yml`) only runs `pnpm build`.
- Build/deploy expect Node 22 (see `netlify.toml`).
- `src/utils/git-tags.ts` reads git tags via `git` at build time to render the version history. It fails gracefully (empty history) when there are no tags. To make release/compare links resolve to the right repo when building outside GitHub Actions, set `PUBLIC_REPO_URL` (e.g. `PUBLIC_REPO_URL=https://github.com/<owner>/<repo>`); otherwise it falls back to the `origin` remote URL.
- To view the dev server in this environment, bind it to all interfaces: `pnpm dev --host 0.0.0.0`.
