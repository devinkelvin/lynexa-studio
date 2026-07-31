import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const client = join(root, 'dist', 'client');
const server = join(root, 'dist', 'server');
const files = [
  'index.html',
  'websites.html',
  'style.css',
  'script.js',
  'motion.js',
  'robots.txt',
  'sitemap.xml',
  'IMAGE_CREDITS.md',
  'THIRD_PARTY_NOTICES.md'
];
const assets = [
  'kelvin.jpg',
  'lagos-collaboration.jpg',
  'lagos-professionals.jpg',
  'lagos-strategy-session.jpg',
  'lynexa-full-official.png',
  'lynexa-mark-official.png',
  'swiftly-full-logo.png',
  'zengly_text_logo.png',
  'zengly-podium.png',
  'zengly-sign.png',
  'zengly-home-dark.png',
  'zengly-home-light.png',
  'zengly-menu.png',
  'zengly-split-bill-group.jpg',
  'zengly-split-bill.png',
  'zengly-vaniti-intro.png',
  'zengly-vaniti-leaderboard.png',
  'zengly-vaniti-sprayers.png'
];

await rm(join(root, 'dist'), { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

for (const file of files) await cp(join(root, file), join(client, file));
await mkdir(join(client, 'assets'), { recursive: true });
for (const asset of assets) await cp(join(root, 'assets', asset), join(client, 'assets', asset));
await cp(join(root, 'assets', 'vendor'), join(client, 'assets', 'vendor'), { recursive: true });

const worker = `const securityHeaders = {
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') url.pathname = '/index.html';
    else if (!url.pathname.split('/').pop().includes('.')) url.pathname += '.html';

    let response = await env.ASSETS.fetch(new Request(url, request));
    if (response.status === 404 && url.pathname.endsWith('.html')) {
      const fallback = new URL('/index.html', url);
      response = await env.ASSETS.fetch(new Request(fallback, request));
    }

    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(securityHeaders)) headers.set(name, value);
    if (/\\.(?:css|js|png|jpe?g)$/i.test(url.pathname)) headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    else headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
`;

await writeFile(join(server, 'index.js'), worker, 'utf8');
console.log('Built Lynexa for Sites');
