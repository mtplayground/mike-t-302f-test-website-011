# mike-t-302f-test-website-011

Static Astro project for the myClawTeam website.

## Scripts

- `npm run dev` starts the Astro development server on `0.0.0.0:8080`.
- `npm run build` runs Astro diagnostics and creates the static `dist/` build.
- `npm run preview` serves the built site on `0.0.0.0:8080`.
- `npm run smoke:built` serves `dist/` locally and checks built-output
  anchors, CTAs, tabs, external links, local assets, and the `mailto:` form.
- `npm run lint` runs ESLint.
- `npm run format:check` checks formatting with Prettier.

## Styling

Tailwind CSS is configured in `tailwind.config.mjs`, with the global Tailwind
entrypoint and base design tokens in `src/styles/global.css`.

The shared document shell lives in `src/layouts/BaseLayout.astro`, and section
anchors are scaffolded with `src/components/SectionShell.astro`.

Editable site metadata, navigation links, CTA destinations, social links,
contact target, and asset paths live in `src/config/site.ts`.

The sticky top navigation is implemented in `src/components/Nav.astro` and uses
the central site config for logo, anchor links, and the primary CTA.
On small screens, the same component exposes an accessible client-side mobile
menu toggle.

The footer is implemented in `src/components/Footer.astro` and uses grouped
links, legal links, and social links from `src/config/site.ts`.

The hero section is implemented in `src/components/sections/Hero.astro`.

The product-preview section is implemented in
`src/components/sections/ProductPreview.astro` and uses tab data from
`src/config/site.ts`.
Its tab switching is handled by a small colocated client script in the same
component.

The feature grid is implemented in `src/components/sections/FeatureGrid.astro`
with card data and icon paths from `src/config/site.ts`.

The community section is implemented in `src/components/sections/Community.astro`
and uses social links from `src/config/site.ts`.

The contact section is implemented in `src/components/sections/Contact.astro`
and composes a configured `mailto:` message without a backend.

## Self-Hosted Deployment

Build with `npm ci` and `npm run build`, then serve the generated `dist/`
directory as the web root of the self-hosted target.

Run `npm run smoke:built` after `npm run build` to verify the static output,
including same-origin asset paths under `/assets` and `/_astro`.

Detailed self-hosting notes live in `docs/self-hosting.md`.
