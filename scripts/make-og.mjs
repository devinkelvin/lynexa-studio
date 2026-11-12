// Dev-only: renders a 1200x630 social share image for every built page into public/assets/og/.
// Run after `node build.mjs`:  node scripts/make-og.mjs   (needs Playwright, which the build itself does not use)
import { readFile, readdir, stat, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = process.cwd();
const dist = join(root, 'dist');
const out = join(root, 'public', 'assets', 'og');
await mkdir(out, { recursive: true });

export const ogName = (path) => (path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '--'));

async function walk(dir, base = '') {
  const items = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) { if (name !== 'assets') items.push(...await walk(p, base + '/' + name)); }
    else if (name === 'index.html') items.push(base + '/');
  }
  return items;
}

const font = (await readFile(join(root, 'public/assets/fonts/plus-jakarta-sans-latin-wght-normal.woff2'))).toString('base64');
const mark = (await readFile(join(root, 'public/assets/img/lynexa-mark-64.png'))).toString('base64');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, '’').replace(/&quot;/g, '"').replace(/<[^>]+>/g, '');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const paths = await walk(dist);
for (const p of paths) {
  const html = await readFile(join(dist, p, 'index.html'), 'utf8');
  if (/name="robots" content="noindex/.test(html)) continue;
  const h1 = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, 'Lynexa'])[1]).trim();
  const kicker = p === '/' ? 'Product design, engineering and venture studio, Lagos' : /^\/insights\/.+/.test(p) ? 'Lynexa Insights' : decode((html.match(/<title>([^<]*)<\/title>/) || [, ''])[1]).replace(/\s*\|\s*Lynexa\s*$/, '').replace(/^Lynexa — .*/, 'Lynexa');
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face{font-family:J;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:200 800}
    *{margin:0;box-sizing:border-box}
    body{width:1200px;height:630px;background:#18171c;color:#f1eee8;font-family:J,sans-serif;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
    .b{display:flex;align-items:center;gap:14px;font-weight:700;font-size:28px}
    .b img{width:52px;height:52px}
    h1{font-size:${h1.length > 60 ? 58 : h1.length > 36 ? 70 : 84}px;line-height:1.02;letter-spacing:-.045em;font-weight:750;max-width:1000px}
    .f{display:flex;justify-content:space-between;align-items:center;font-size:24px;color:#a9a4af}
    .f i{width:260px;height:4px;border-radius:4px;background:linear-gradient(90deg,#5a35fe,#c026d3)}
    .glow{position:absolute;right:-180px;top:-200px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(90,53,254,.35),transparent 65%)}
  </style></head><body><span class="glow"></span>
    <div class="b"><img src="data:image/png;base64,${mark}" alt="">Lynexa</div>
    <h1>${h1.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</h1>
    <div class="f"><span>${kicker.replace(/&/g, '&amp;')}</span><i></i></div>
  </body></html>`);
  await page.evaluate(() => document.fonts.ready);
  const name = ogName(p);
  await page.screenshot({ path: join(out, name + '.png'), type: 'png' });
  if (p === '/') await page.screenshot({ path: join(out, 'lynexa-og.png'), type: 'png' });
}
await browser.close();
console.log('OG images:', paths.length);
