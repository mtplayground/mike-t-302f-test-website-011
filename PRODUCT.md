# myClawTeam

myClawTeam is a static marketing website for a GitHub-native AI engineering
team for founders. The site presents the product promise, preview workflow,
feature set, community links, and a no-backend contact path.

## Current Experience

- Sticky top navigation with desktop links and an accessible mobile menu.
- Hero section with the approved myClawTeam positioning copy and primary CTAs.
- Product preview section with accessible tabs for Plan, Build, and Operate.
- Six-card feature grid covering SDLC automation, security-aware delivery,
  code ownership, autonomous build loops, deploy/operate work, and
  founder-speed collaboration.
- Community section with Discord and X placeholder links from site config.
- Contact section that composes a configured `mailto:` message without a
  backend.
- Footer with grouped links, legal placeholders, and social links.

## Architecture

- Astro static output only; no server runtime, database, Docker, or CI/CD.
- Tailwind CSS provides the dark visual system, near-black surfaces, orange
  accent tokens, typography, spacing, and responsive layout utilities.
- Shared document shell lives in `src/layouts/BaseLayout.astro`.
- Reusable section scaffold lives in `src/components/SectionShell.astro`.
- Editable product metadata, navigation, CTA destinations, social links,
  contact target, feature cards, and asset paths live in `src/config/site.ts`.
- Static assets are served from `public/assets` and copied into `dist/assets`;
  Astro-generated CSS and client scripts are emitted under `dist/_astro`.

## Quality And Deployment Conventions

- `npm run build` runs Astro diagnostics and creates the static `dist/` build.
- `npm run smoke:built` serves `dist/` locally and verifies anchors, local
  asset paths, CTAs, tabs, external links, the `mailto:` form, and mobile menu
  behavior.
- `npm run lint` and `npm run format:check` are the standard code-quality
  checks.
- Self-hosting instructions are documented in `docs/self-hosting.md`; deploy by
  serving `dist/` as the web root from the domain root.
- The project intentionally uses placeholder URLs for Discord, X, legal links,
  and the contact email until real destinations are provided in
  `src/config/site.ts`.
