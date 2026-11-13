// Comment moderation for the daily insights task (and for Kelvin if needed). Protected by STATS_KEY.
//   GET  /api/comments-moderate?days=7                -> every comment from the last N days with its status
//   POST /api/comments-moderate {key, status}         -> set a comment's status: visible | hidden
// `key` is the full blob key returned by GET, e.g. "comments/<slug>/<id>".
import { getStore } from '@netlify/blobs';
import type { Config } from '@netlify/functions';
import { timingSafeEqual } from 'node:crypto';

const same = (a: string, b: string) => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); };

export default async (req: Request) => {
  const secret = Netlify.env.get('STATS_KEY') || '';
  const given = req.headers.get('x-stats-key') || '';
  if (!secret || !given || !same(secret, given)) return Response.json({ error: 'Not authorised' }, { status: 401 });
  const store = getStore({ name: 'insights', consistency: 'strong' });

  if (req.method === 'GET') {
    const days = Math.min(60, Math.max(1, Number(new URL(req.url).searchParams.get('days')) || 7));
    const since = new Date(Date.now() - days * 864e5).toISOString();
    const { blobs } = await store.list({ prefix: 'comments/' });
    const out = [];
    for (const b of blobs) {
      const c = (await store.get(b.key, { type: 'json' })) as any;
      if (c && c.at >= since) out.push({ key: b.key, ...c });
    }
    out.sort((a, b) => b.at.localeCompare(a.at));
    return Response.json({ days, comments: out }, { headers: { 'cache-control': 'no-store' } });
  }

  let body: any = {};
  try { body = await req.json(); } catch { return Response.json({ error: 'Bad request' }, { status: 400 }); }
  const key = String(body.key || ''), status = String(body.status || '');
  if (!/^comments\/[a-z0-9-]+\/[a-z0-9-]+$/.test(key) || !['visible', 'hidden'].includes(status)) return Response.json({ error: 'Bad request' }, { status: 400 });
  const c = (await store.get(key, { type: 'json' })) as any;
  if (!c) return Response.json({ error: 'Not found' }, { status: 404 });
  await store.setJSON(key, { ...c, status });
  return Response.json({ ok: true, key, status });
};

export const config: Config = { path: '/api/comments-moderate', method: ['GET', 'POST'] };
