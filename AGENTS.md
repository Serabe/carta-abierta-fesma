# Carta abierta

Static [Astro](https://astro.build) site that renders an open letter ("Carta abierta a FESMA") from Markdown content in `src/content/sections/`. There is no backend, database, or auth. It deploys to Netlify as a static build.

Editorial backlog for points not yet written into the letter lives in `tasks/` (created by `/extraer-puntos-carta`). Those files are work items only — Astro does not load them.

Section frontmatter may include `signable: true` so readers can mark that section while reading; selections are completed in the «Completar la firma» panel (client-side only; no backend). The panel only appears after at least one section is marked. Signable sections require a stable `uid`: a random integer from 0–9999 written as 4 digits (`0` → `"0000"`). Quote it in YAML (`uid: "0639"`) so leading zeros are kept. Uids must not encode document order or file-path prefixes. The copyable code is `CAB1:<uid>,…`. Editors add signers with `pnpm sign --name "…" --code "CAB1:…"` (writes `src/data/signatures.json`); remove with `pnpm sign --remove --name "…"`.

## Normative reference texts

FESMA estatutos, reglamentos and protocols live under `reglamentos/` (plain
text; not loaded by Astro). When citing or checking what the norms say, use
those files via the skill `consultar-reglamentos-fesma` — do not invent
article numbers from memory.

## Editorial Agent Skills

Project skills live under `.cursor/skills/` (each folder has a `SKILL.md`).

Most editorial skills are **user-invoked only** (`disable-model-invocation: true`):
they do not auto-apply; invoke them with `/` or `@` in Agent chat.
`consultar-reglamentos-fesma` is an exception: the agent should use it whenever
estatutos/reglamento content is needed.

| Slash command | Skill | Purpose |
| --- | --- | --- |
| `/extraer-puntos-carta` | `extraer-puntos-carta` | Extract developable points from raw notes into `tasks/P*.md` |
| `/siguiente-tarea` | `siguiente-tarea` | Pick one open `tasks/P*.md` item to work on individually |
| `/espiritu-y-letra` | `espiritu-y-letra` | Split each point into espíritu (intent) vs letra (wording) |
| `/suavizar-tono-resentimiento` | `suavizar-tono-resentimiento` | Soften resentment / personal-attack tone without diluting the ask |
| `/consultar-reglamentos-fesma` | `consultar-reglamentos-fesma` | Read/cite texts in `reglamentos/` (estatutos, CMN, concursos, etc.) |

If the `/` menu does not list them (known gap on Cloud Agent follow-ups), write the skill name in prose, e.g. “usa la skill `extraer-puntos-carta`”. On desktop: open the repo root, pull `main`, then Reload Window; check **Customize → Skills**.

## Cursor Cloud specific instructions

- Standard commands live in `package.json`: `pnpm dev` (dev server), `pnpm build` (static build), `pnpm preview` (serve the built `dist/`).
- There is no lint or unit-test script. The single quality gate is `pnpm build`, which runs Astro's content sync + type generation and fails on type/content errors. CI (`.github/workflows/pr-build.yml`) only runs `pnpm build`.
- Build/deploy expect Node 22 (see `netlify.toml`).
- `src/utils/git-tags.ts` reads git tags via `git` at build time to render the version history. It fails gracefully (empty history) when there are no tags. To make release/compare links resolve to the right repo when building outside GitHub Actions, set `PUBLIC_REPO_URL` (e.g. `PUBLIC_REPO_URL=https://github.com/<owner>/<repo>`); otherwise it falls back to the `origin` remote URL.
- To view the dev server in this environment, bind it to all interfaces: `pnpm dev --host 0.0.0.0`.
