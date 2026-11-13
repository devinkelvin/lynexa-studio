// Quality gate for Insights articles. Exits with code 1 and a list of problems if any article fails.
// Run after `node build.mjs` (it also checks that internal links point at real pages):  node scripts/check-insights.mjs
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ARTICLES } from '../src/content/insights.mjs';

const root = process.cwd();
const problems = [];
const seen = new Set();
const TOPICS = new Set(['Product strategy', 'Product design', 'Fundraising', 'Engineering', 'Fintech', 'Growth', 'Research', 'Business']);
const BANNED = [/lorem ipsum/i, /\bTODO\b/, /\bas an ai\b/i, /\[citation needed\]/i, /\bin today's fast-paced\b/i, /\bdelve\b/i, /\bgame-?changer\b/i, /—/];
const words = (html) => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

for (const a of ARTICLES) {
  const p = (m) => problems.push(`${a.slug || '(no slug)'}: ${m}`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug || '')) p('slug must be lowercase words joined by hyphens');
  if (seen.has(a.slug)) p('duplicate slug'); seen.add(a.slug);
  if (!a.title || a.title.length > 95) p('title missing or longer than 95 characters');
  const seo = (a.seoTitle || a.title || '') + ' | Lynexa';
  if (seo.length > 65) p(`search title "${seo}" is ${seo.length} characters; add a shorter seoTitle (max 56 before " | Lynexa")`);
  if (!a.description || a.description.length < 70 || a.description.length > 165) p(`description must be 70–165 characters (is ${a.description ? a.description.length : 0})`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date || '')) p('date must be YYYY-MM-DD');
  if (!TOPICS.has(a.topic)) p(`topic must be one of: ${[...TOPICS].join(', ')}`);
  const w = words(a.body || '');
  if (w < 280) p(`body is ${w} words; minimum 280`);
  for (const re of BANNED) if (re.test(a.body + a.title + a.description)) p(`contains banned text: ${re}`);
  if (/<script|<iframe|on\w+=/i.test(a.body)) p('body must not contain scripts, iframes or inline handlers');
  if (!/<h2>/.test(a.body)) p('body needs at least one <h2> section heading');
  for (const [, url] of (a.sources || [])) if (!/^https:\/\//.test(url)) p(`source must be an https URL: ${url}`);
  // Numbers, percentages and legal or regulatory claims need at least one source.
  if ((/\d+(\.\d+)?\s?%|\bsection \d|\bregulat|\bper cent\b/i.test(a.body) || /\b(Act|CBN|NDPC|SEC)\b/.test(a.body)) && !(a.sources && a.sources.length)) p('contains statistics or regulatory claims but lists no sources');
  for (const m of a.body.matchAll(/href="([^"]+)"/g)) {
    const h = m[1];
    if (h.startsWith('/')) { const f = join(root, 'dist', h.split('#')[0], h.endsWith('/') ? 'index.html' : ''); if (!existsSync(f) && !existsSync(f + '.html')) p(`broken internal link ${h}`); }
    else if (!/^https:\/\//.test(h) && !h.startsWith('mailto:')) p(`link must be https: ${h}`);
  }
  if (!existsSync(join(root, 'public', 'assets', 'insights', `${a.slug}-1600.webp`))) p('cover image missing: run node scripts/make-covers.mjs');
}
const dates = ARTICLES.map((a) => a.date);
if (dates.some((d, i) => i && d > dates[i - 1])) problems.push('ARTICLES must be ordered newest first');

if (problems.length) { console.error('Insights check FAILED:\n- ' + problems.join('\n- ')); process.exit(1); }
console.log(`Insights check passed: ${ARTICLES.length} articles.`);
