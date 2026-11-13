// Privacy-friendly visit counting for lynexa.co. No cookies, no IP addresses, no user agents and no profiles are stored.
// Each record is one small, anonymous event: the page path, an event name, the referring website (host only),
// the visitor's country code (from Netlify's network, not stored as an IP) and a mobile/desktop flag.
// Records are append-only (one blob per event), then summarised per day by the stats function.
import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';

const EVENTS = new Set(['view', 'book', 'whatsapp', 'email', 'start', 'submit', 'sketch', 'plan', 'proto', 'cmdk', 'like', 'share', 'comment']);
const BOTS = /bot|crawl|spider|slurp|preview|lighthouse|headless|monitor|curl|wget|python|axios|node-fetch/i;

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return new Response(null, { status: 405 });
  const ua = req.headers.get('user-agent') || '';
  if (BOTS.test(ua)) return new Response(null, { status: 204 });
  let body: any = {};
  try { body = JSON.parse(await req.text()); } catch { return new Response(null, { status: 400 }); }

  const e = EVENTS.has(body.e) ? body.e : 'view';
  const p = String(body.p || '/').slice(0, 120).replace(/[^\w\-/.~%]/g, '');
  let r = '';
  try { if (body.r) { const h = new URL(String(body.r)).hostname.replace(/^www\./, ''); if (h && !h.endsWith('lynexa.co')) r = h.slice(0, 80); } } catch { /* ignore */ }
  const c = (context.geo?.country?.code || '').slice(0, 2);
  const m = /Mobi|Android|iPhone/i.test(ua) ? 1 : 0;

  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const key = `raw/${day}/${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  context.waitUntil(getStore('analytics').setJSON(key, { e, p, r, c, m }));
  return new Response(null, { status: 204 });
};

export const config: Config = {
  path: '/api/hit',
  method: 'POST',
  rateLimit: { windowLimit: 60, windowSize: 60, aggregateBy: ['ip', 'domain'] }
};
