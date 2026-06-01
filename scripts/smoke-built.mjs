import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { chromium } from 'playwright';

const distDir = resolve('dist');
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
]);

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const resolveDistPath = (requestUrl) => {
  const url = new URL(requestUrl, 'http://127.0.0.1');
  const pathname = decodeURIComponent(url.pathname);
  const requestedPath =
    pathname === '/'
      ? 'index.html'
      : normalize(pathname).replace(/^[/\\]+/, '');
  const absolutePath = resolve(distDir, requestedPath);

  if (
    absolutePath !== distDir &&
    !absolutePath.startsWith(`${distDir}${sep}`)
  ) {
    return null;
  }

  return absolutePath;
};

const createStaticServer = () =>
  createServer(async (request, response) => {
    try {
      const absolutePath = resolveDistPath(request.url ?? '/');

      if (!absolutePath) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
      }

      const fileStat = await stat(absolutePath);
      const filePath = fileStat.isDirectory()
        ? join(absolutePath, 'index.html')
        : absolutePath;
      const body = await readFile(filePath);

      response.writeHead(200, {
        'content-type':
          mimeTypes.get(extname(filePath)) ?? 'application/octet-stream',
      });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  });

const listen = (server) =>
  new Promise((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', rejectListen);
      const address = server.address();

      if (!address || typeof address === 'string') {
        rejectListen(new Error('Static smoke server did not expose a port.'));
        return;
      }

      resolveListen(`http://127.0.0.1:${address.port}`);
    });
  });

const close = (server) =>
  new Promise((resolveClose, rejectClose) => {
    server.close((error) => {
      if (error) {
        rejectClose(error);
        return;
      }

      resolveClose();
    });
  });

const unique = (values) => [...new Set(values)];

const server = createStaticServer();
let serverStarted = false;
let browser;

try {
  await stat(join(distDir, 'index.html'));

  const baseUrl = await listen(server);
  serverStarted = true;
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });

  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  const localAssetUrls = unique(
    await page.evaluate(() => {
      const urls = [];
      const collect = (value) => {
        if (!value) {
          return;
        }

        const url = new URL(value, window.location.href);

        if (url.origin === window.location.origin) {
          urls.push(url.href);
        }
      };

      document
        .querySelectorAll('img[src], script[src], link[href]')
        .forEach((element) => {
          collect(element.getAttribute('src'));
          collect(element.getAttribute('href'));
        });

      return urls.filter((url) => new URL(url).pathname !== '/');
    }),
  );
  assert(localAssetUrls.length > 0, 'Expected local built assets to verify.');

  const assetResponses = await page.evaluate(async (urls) => {
    return Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url, { cache: 'no-store' });

        return {
          pathname: new URL(url).pathname,
          status: response.status,
        };
      }),
    );
  }, localAssetUrls);
  const missingAssets = assetResponses.filter((asset) => asset.status !== 200);
  assert(
    missingAssets.length === 0,
    `Missing built assets: ${JSON.stringify(missingAssets)}`,
  );

  const internalAnchors = unique(
    await page.$$eval('a[href^="#"]', (anchors) =>
      anchors.map((anchor) => anchor.getAttribute('href')).filter(Boolean),
    ),
  );
  assert(internalAnchors.length > 0, 'Expected at least one internal anchor.');

  const missingAnchorTargets = await page.evaluate((hashes) => {
    return hashes.filter((hash) => !document.querySelector(hash));
  }, internalAnchors);
  assert(
    missingAnchorTargets.length === 0,
    `Missing anchor targets: ${missingAnchorTargets.join(', ')}`,
  );

  for (const hash of internalAnchors) {
    if (hash === '#main-content') {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
    } else {
      await page.locator(`a[href="${hash}"]`).first().click();
    }

    await page.waitForFunction((expectedHash) => {
      return window.location.hash === expectedHash;
    }, hash);
  }

  await page
    .getByRole('link', { name: /^Get Started$/ })
    .first()
    .click();
  assert(
    page.url().endsWith('#contact'),
    'Primary Get Started CTA should navigate to #contact.',
  );

  await page.getByRole('link', { name: /^View Product$/ }).click();
  assert(
    page.url().endsWith('#products'),
    'Secondary View Product CTA should navigate to #products.',
  );

  await page.getByRole('tab', { name: /Build/ }).click();
  await page.waitForFunction(() => {
    return (
      document
        .querySelector('#preview-tab-build')
        ?.getAttribute('aria-selected') === 'true' &&
      document
        .querySelector('#preview-panel')
        ?.getAttribute('aria-labelledby') === 'preview-tab-build'
    );
  });

  const buildPreviewAlt = await page
    .locator('[data-preview-image-target]')
    .getAttribute('alt');
  assert(
    buildPreviewAlt === 'myClawTeam build workspace preview',
    'Build tab should swap the preview image alt text.',
  );

  await page.getByRole('tab', { name: /Build/ }).focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => {
    return (
      document
        .querySelector('#preview-tab-operate')
        ?.getAttribute('aria-selected') === 'true'
    );
  });

  const externalLinks = await page.$$eval('a[href^="http"]', (anchors) =>
    anchors.map((anchor) => ({
      href: anchor.href,
      label: anchor.textContent?.trim() || anchor.getAttribute('aria-label'),
      rel: anchor.rel,
      target: anchor.target,
    })),
  );
  assert(externalLinks.length > 0, 'Expected external social links.');

  const invalidExternalLinks = externalLinks.filter((link) => {
    return (
      !link.href.startsWith('https://') ||
      link.target !== '_blank' ||
      !link.rel.split(/\s+/).includes('noreferrer')
    );
  });
  assert(
    invalidExternalLinks.length === 0,
    `Invalid external links: ${JSON.stringify(invalidExternalLinks)}`,
  );

  await page.evaluate(() => {
    window.__myClawTeamMailtoHref = '';
    window.addEventListener('myclawteam:mailto-compose', (event) => {
      window.__myClawTeamMailtoHref = event.detail.href;
      event.preventDefault();
    });
  });

  await page.locator('#contact-name').fill('Ada Founder');
  await page.locator('#contact-email').fill('ada@example.com');
  await page
    .locator('#contact-message')
    .fill('Please help validate the production smoke path.');
  await page.getByRole('button', { name: 'Compose email' }).click();

  const mailtoHref = await page.waitForFunction(() => {
    return window.__myClawTeamMailtoHref;
  });
  const mailtoUrl = mailtoHref.toString();
  assert(
    mailtoUrl.startsWith('mailto:hello@example.com?'),
    'Contact form should compose a mailto URL to the configured address.',
  );
  assert(
    mailtoUrl.includes('subject=New+myClawTeam+project+inquiry'),
    'Contact form should include the configured subject.',
  );
  assert(
    mailtoUrl.includes('Ada+Founder') &&
      mailtoUrl.includes('ada%40example.com') &&
      mailtoUrl.includes('production+smoke+path'),
    'Contact form should include submitted name, email, and message.',
  );

  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page
    .getByLabel('Mobile navigation')
    .getByRole('link', { name: 'Contact' })
    .click();
  await page.waitForFunction(() => {
    return (
      window.location.hash === '#contact' &&
      document.querySelector('#mobile-navigation')?.hidden === true
    );
  });

  console.log(
    JSON.stringify(
      {
        checked: {
          anchors: internalAnchors.length,
          assets: localAssetUrls.length,
          externalLinks: externalLinks.length,
          ctas: 2,
          tabs: true,
          mailtoForm: true,
          mobileMenu: true,
        },
        url: baseUrl,
      },
      null,
      2,
    ),
  );
} finally {
  if (browser) {
    await browser.close();
  }

  if (serverStarted) {
    await close(server);
  }
}
