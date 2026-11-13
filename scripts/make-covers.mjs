// Renders an editorial cover image for every Insights article: an abstract, on-brand illustration chosen by topic
// and varied by the article's slug, so every cover is unique and needs no stock photography or licence.
// Output: public/assets/insights/<slug>-800.webp and -1600.webp (16:9). Run: node scripts/make-covers.mjs
// Existing covers are kept unless --force is passed, so published articles never change their image.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ARTICLES } from '../src/content/insights.mjs';

const root = process.cwd();
const out = join(root, 'public', 'assets', 'insights');
await mkdir(out, { recursive: true });
const force = process.argv.includes('--force');

// Small deterministic RNG seeded from the slug.
const seed = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507), h = Math.imul(h ^ (h >>> 13), 3266489909), (h ^= h >>> 16) >>> 0) / 4294967296); };

const PALETTES = [
  ['#18171c', '#5a35fe', '#a898ff', '#f1eee8'],
  ['#1b1206', '#b57510', '#f0b14a', '#fff4dc'],
  ['#0d1f1c', '#0f8f84', '#7fe0d4', '#eefaf8'],
  ['#1e0c12', '#c43c68', '#f39ab6', '#fdf0f4'],
  ['#0b1630', '#1d6fc2', '#8fc4ff', '#eef5ff'],
  ['#1d1009', '#f0614f', '#ffb3a6', '#fff2ef']
];
const TOPIC = { 'Product strategy': 'roadmap', 'Product design': 'phone', 'Fundraising': 'growth', 'Engineering': 'network', 'Fintech': 'cards', 'Growth': 'growth', 'Research': 'network', 'Business': 'roadmap' };

function art(a) {
  const r = seed(a.slug);
  const [bg, main, soft, light] = PALETTES[Math.floor(r() * PALETTES.length)];
  const W = 1600, H = 900;
  const grid = Array.from({ length: 41 }, (_, i) => `<path d="M${i * 40} 0V${H}M0 ${i * 40}H${W}" />`).join('');
  let g = '';
  const kind = TOPIC[a.topic] || ['roadmap', 'phone', 'growth', 'network', 'cards'][Math.floor(r() * 5)];
  if (kind === 'roadmap') {
    for (let i = 0; i < 6; i++) {
      const y = 190 + i * 95, x = 180 + r() * 420, w = 260 + r() * 640;
      g += `<rect x="${x}" y="${y}" width="${w}" height="54" rx="27" fill="${i % 2 ? soft : main}" opacity="${0.55 + r() * 0.45}"/>`;
      g += `<circle cx="${x + w + 40}" cy="${y + 27}" r="12" fill="${light}" opacity=".8"/>`;
    }
    g += `<path d="M150 150V820" stroke="${light}" stroke-width="3" stroke-dasharray="6 14" opacity=".5"/>`;
  } else if (kind === 'phone') {
    const x = 560 + r() * 160;
    g += `<rect x="${x}" y="120" width="340" height="700" rx="56" fill="${bg}" stroke="${light}" stroke-width="10" opacity=".95"/>`;
    g += `<rect x="${x + 120}" y="146" width="100" height="26" rx="13" fill="${light}" opacity=".7"/>`;
    g += `<rect x="${x + 34}" y="210" width="272" height="130" rx="22" fill="${main}"/>`;
    for (let i = 0; i < 4; i++) g += `<rect x="${x + 34}" y="${370 + i * 78}" width="${180 + r() * 92}" height="54" rx="14" fill="${soft}" opacity="${0.35 + r() * 0.3}"/>`;
    g += `<rect x="${x + 34}" y="700" width="272" height="64" rx="32" fill="${light}"/>`;
    g += `<circle cx="${x - 140}" cy="${300 + r() * 260}" r="${70 + r() * 50}" fill="${main}" opacity=".85"/><circle cx="${x + 520}" cy="${220 + r() * 300}" r="${40 + r() * 60}" fill="none" stroke="${soft}" stroke-width="10"/>`;
  } else if (kind === 'growth') {
    let d = 'M140 760', y = 760;
    const pts = [];
    for (let i = 1; i <= 8; i++) { y -= 30 + r() * 70; const x = 140 + i * 160; d += ` L${x} ${y}`; pts.push([x, y]); }
    g += `<path d="${d}" fill="none" stroke="${soft}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`;
    g += pts.map(([x, yy], i) => `<circle cx="${x}" cy="${yy}" r="${i === pts.length - 1 ? 30 : 14}" fill="${i === pts.length - 1 ? light : main}"/>`).join('');
    for (let i = 0; i < 8; i++) { const h = 60 + r() * 220; g += `<rect x="${200 + i * 160}" y="${820 - h}" width="70" height="${h}" rx="10" fill="${main}" opacity=".35"/>`; }
  } else if (kind === 'network') {
    const n = Array.from({ length: 11 }, () => [200 + r() * 1200, 140 + r() * 620]);
    n.forEach(([x, y], i) => n.slice(i + 1).forEach(([x2, y2]) => { if (Math.hypot(x - x2, y - y2) < 430) g += `<path d="M${x} ${y}L${x2} ${y2}" stroke="${soft}" stroke-width="4" opacity=".5"/>`; }));
    n.forEach(([x, y], i) => { g += `<circle cx="${x}" cy="${y}" r="${i % 4 === 0 ? 34 : 18}" fill="${i % 4 === 0 ? main : light}"/>`; });
  } else {
    for (let i = 0; i < 3; i++) {
      const x = 380 + i * 170 + r() * 40, y = 220 + i * 90, rot = -14 + i * 9 + r() * 6;
      g += `<g transform="rotate(${rot} ${x + 260} ${y + 160})"><rect x="${x}" y="${y}" width="520" height="320" rx="34" fill="${[main, soft, light][i]}" opacity="${0.92 - i * 0.12}"/><rect x="${x + 44}" y="${y + 60}" width="80" height="58" rx="12" fill="${bg}" opacity=".35"/><rect x="${x + 44}" y="${y + 230}" width="${180 + r() * 120}" height="22" rx="11" fill="${bg}" opacity=".3"/></g>`;
    }
    for (let i = 0; i < 5; i++) g += `<circle cx="${1180 + r() * 240}" cy="${160 + r() * 560}" r="${24 + r() * 30}" fill="${light}" opacity=".85" stroke="${main}" stroke-width="8"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><radialGradient id="glow" cx="80%" cy="0%" r="90%"><stop offset="0" stop-color="${main}" stop-opacity=".55"/><stop offset="1" stop-color="${bg}" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="${bg}"/><rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g stroke="${light}" stroke-opacity=".06" stroke-width="1">${grid}</g>${g}</svg>`;
}

let made = 0;
for (const a of ARTICLES) {
  const big = join(out, `${a.slug}-1600.webp`);
  if (!force && existsSync(big)) continue;
  const svg = Buffer.from(art(a));
  await sharp(svg).resize(1600).webp({ quality: 82 }).toFile(big);
  await sharp(svg).resize(800).webp({ quality: 80 }).toFile(join(out, `${a.slug}-800.webp`));
  made++;
}
console.log(`Covers: ${made} new, ${ARTICLES.length} articles`);
