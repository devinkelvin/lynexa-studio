// Private summary of the anonymous visit counts collected by /api/hit.
// Protected by the STATS_KEY environment variable (Netlify > Site configuration > Environment variables, scope: Functions).
// Open https://lynexa.co/stats/ and enter the key to view it. Raw events older than 120 days are deleted.
import { getStore } from '@netlify/blobs';
import type { Config } from '@netlify/functions';
import { timingSafeEqual } from 'node:crypto';

type Rec = { e: string; p: string; r: string; c: string; m: number };
type Agg = { views: number; mobile: number; pages: Record<string, number>; refs: Record<string, number>; countries: Record<string, number>; events: Record<string, number> };

const empty = (): Agg => ({ views: 0, mobile: 0, pages: {}, refs: {}, countries: {}, events: {} });
const inc = (o: Record<string, number>, k: string) => { if (k) o[k] = (o[k] || 0) + 1; };
const same = (a: string, b: string) => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); };

export default async (req: Request) => {
  const key = Netlify.env.get('STATS_KEY') || '';
  const given = req.headers.get('x-stats-key') || '';
  if (!key || !given || !same(key, given)) return Response.json({ error: 'Not authorised' }, { status: 401 });

  const days = Math.min(90, Math.max(1, Number(new URL(req.url).searchParams.get('days')) || 30));
  const store = getStore({ name: 'analytics', consistency: 'strong' });
  const today = new Date().toISOString().slice(0, 10);
  const perDay: { day: string; views: number }[] = [];
  const total = empty();

  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    // Finished days are summarised once and cached; today is always counted live.
    let agg = day < today ? ((await store.get(`agg/${day}`, { type: 'json' })) as Agg | null) : null;
    if (!agg) {
      agg = empty();
      const { blobs } = await store.list({ prefix: `raw/${day}/` });
      for (const b of blobs) {
        const r = (await store.get(b.key, { type: 'json' })) as Rec | null;
        if (!r) continue;
        inc(agg.events, r.e);
        if (r.e === 'view') { agg.views++; agg.mobile += r.m ? 1 : 0; inc(agg.pages, r.p); inc(agg.refs, r.r); inc(agg.countries, r.c); }
      }
      if (day < today) await store.setJSON(`agg/${day}`, agg);
    }
    perDay.push({ day, views: agg.views });
    total.views += agg.views; total.mobile += agg.mobile;
    for (const f of ['pages', 'refs', 'countries', 'events'] as const) for (const [k, v] of Object.entries(agg[f])) total[f][k] = (total[f][k] || 0) + v;
  }

  // Housekeeping: drop raw events older than 120 days (their daily summaries are kept).
  const cutoff = new Date(Date.now() - 120 * 864e5).toISOString().slice(0, 10);
  const { directories } = await store.list({ prefix: 'raw/', directories: true });
  for (const d of directories) { const day = d.replace('raw/', '').replace(/\/$/, ''); if (day < cutoff) { const { blobs } = await store.list({ prefix: d }); for (const b of blobs) await store.delete(b.key); } }

  const top = (o: Record<string, number>, n = 15) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
  return Response.json({
    days, views: total.views, mobileShare: total.views ? Math.round((total.mobile / total.views) * 100) : 0,
    perDay, pages: top(total.pages), referrers: top(total.refs), countries: top(total.countries), events: top(total.events, 20)
  }, { headers: { 'cache-control': 'no-store' } });
};

export const config: Config = { path: '/api/stats', method: 'GET' };
