// Lynexa static site build. Zero runtime dependencies: node build.mjs → dist/
import { mkdir, rm, writeFile, readFile, cp } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { layout, HEAD_SCRIPT } from './src/lib.mjs';
import { SITE } from './src/site.mjs';
import { SERVICES } from './src/content/services.mjs';
import home from './src/pages/home.mjs';
import { servicesIndex, servicePage } from './src/pages/services.mjs';
import { workIndex, zenglyPage, swiftlyPage, websitesPage } from './src/pages/work.mjs';
import { aboutPage, processPage, venturesPage } from './src/pages/studio.mjs';
import { contactPage, startPage, thanksPages } from './src/pages/forms.mjs';
import { privacyPage, termsPage, notFoundPage } from './src/pages/legal.mjs';
import { plannerPage } from './src/pages/planner.mjs';

const root = process.cwd();
const out = join(root, 'dist');
await rm(out, { recursive: true, force: true });
await mkdir(join(out, 'assets'), { recursive: true });

// Static files (images, fonts, icons)
await cp(join(root, 'public'), out, { recursive: true });

// Fingerprinted CSS/JS
const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 10);
const css = await readFile(join(root, 'src/styles/site.css'), 'utf8');
const js = (await readFile(join(root, 'src/scripts/site.js'), 'utf8')) + '\n' + (await readFile(join(root, 'src/scripts/wow.js'), 'utf8'));
const swarm = await readFile(join(root, 'src/scripts/swarm.js'), 'utf8');
const cssName = `site.${hash(css)}.css`;
const jsName = `site.${hash(js)}.js`;
const swarmName = `swarm.${hash(swarm)}.js`;
await writeFile(join(out, 'assets', cssName), css);
await writeFile(join(out, 'assets', jsName), js);
await writeFile(join(out, 'assets', swarmName), swarm);

const pages = [
  home(), aboutPage(), servicesIndex(), ...SERVICES.map(servicePage),
  workIndex(), zenglyPage(), swiftlyPage(), websitesPage(), processPage(), plannerPage(), venturesPage(),
  contactPage(), startPage(), ...thanksPages(), privacyPage(), termsPage(), notFoundPage()
];

const seen = new Set();
for (const p of pages) {
  if (seen.has(p.path)) throw new Error(`Duplicate route ${p.path}`);
  seen.add(p.path);
  let html = layout(p)
    .replace('/assets/site.css?v=__BUILD__', `/assets/${cssName}`)
    .replace('/assets/site.js?v=__BUILD__', `/assets/${jsName}`)
    .replace('/assets/swarm.js?v=__BUILD__', `/assets/${swarmName}`);
  const file = p.path === '/404' ? join(out, '404.html') : join(out, p.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

// Sitemap (indexable pages only)
const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !p.noindex);
await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /project-received/\nDisallow: /application-received/\nDisallow: /message-received/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

// Redirects for old URLs and likely mistypes. Netlify serves /path/ for /path automatically.
await writeFile(join(out, '_redirects'), `# Legacy single-page site
/index.html            /                  301
/websites.html         /websites/         301
# Projects without a public case study yet
/work/landlink         /work/             302
/work/sparkhive        /work/             302
/work/lexforum         /work/             302
# Friendly aliases
/contact-us            /contact/          301
/start                 /start-a-project/  301
/brief                 /start-a-project/  301
/privacy-policy        /privacy/          301
/terms-of-use          /terms/            301
/portfolio             /work/             301
/case-studies          /work/             301
`);

// Content-Security-Policy: production (and local builds) only. Netlify sets CONTEXT during builds;
// on deploy previews and branch deploys it is omitted so the Netlify Drawer can load.
const headHash = createHash('sha256').update(HEAD_SCRIPT).digest('base64');
const CSP = "default-src 'self'; script-src 'self' 'sha256-" + headHash + "'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests";
const context = process.env.CONTEXT || 'local';
if (context === 'production' || context === 'local') {
  await writeFile(join(out, '_headers'), `/*\n  Content-Security-Policy: ${CSP}\n`);
}

await writeFile(join(out, 'site.webmanifest'), JSON.stringify({
  name: SITE.legalName, short_name: 'Lynexa', start_url: '/', display: 'browser',
  background_color: '#F1EEE8', theme_color: '#18171C',
  icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }]
}, null, 2));

console.log(`Built ${pages.length} pages → dist/ (${cssName}, ${jsName})`);
