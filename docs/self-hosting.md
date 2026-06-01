# Self-Hosted Deployment

This site is a static Astro build for myClawTeam. It does not require a Node.js
runtime, server-side rendering, a database, Docker, or CI/CD to serve in
production.

## Build

Install dependencies and create the production static output:

```bash
npm ci
npm run build
```

The deployable artifact is the complete `dist/` directory. Keep the directory
contents together when copying to the server because the generated HTML refers
to sibling static assets.

## Verify Before Copying

Run the built-output smoke check from the repository root:

```bash
npm run smoke:built
```

The smoke check serves `dist/` locally and verifies:

- Internal anchor targets and CTAs.
- Product-preview tab switching.
- External social links.
- Same-origin asset paths referenced by the built page.
- The `mailto:` contact form composition.
- Mobile navigation open/close behavior.

## Serve `dist/`

Configure the self-hosted web server to use `dist/` as the site root. The site
is intended to be served from the domain root, for example `https://example.com/`.

Important paths produced by the build:

- `/index.html` is the landing page.
- `/assets/*` contains public logo, icon, and preview assets.
- `/_astro/*` contains Astro-generated CSS and client JavaScript.
- `/favicon.svg` is the favicon.

Do not rewrite every request to `index.html`; there is no client-side router.
Missing files should remain 404s so broken asset paths are visible.

## Example Nginx Server

Replace `/var/www/myclawteam/dist` and `myclawteam.example.com` with the actual
self-hosted paths and host name.

```nginx
server {
  listen 80;
  server_name myclawteam.example.com;
  root /var/www/myclawteam/dist;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }

  location ~* ^/(assets|_astro)/ {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }
}
```

## Example Caddy Site

```caddyfile
myclawteam.example.com {
  root * /var/www/myclawteam/dist
  file_server
}
```

## Post-Deploy Check

After copying `dist/` to the target, open the deployed URL and confirm:

- Navigation anchors scroll to Products, Features, Community, and Contact.
- Get Started opens the Contact section.
- Product-preview tabs switch visually.
- Discord and X links open the configured placeholder URLs in new tabs.
- Compose email opens the configured `mailto:` target.
