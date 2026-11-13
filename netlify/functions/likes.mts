// Likes for Insights articles. Anonymous: each like is one append-only record (no cookies, no IP stored);
// the browser remembers its own like so a visitor can't like the same article twice from one device.
//   GET  /api/likes?slug=<slug>            -> { slug, likes }
//   POST /api/likes  {"slug":"<slug>"}     -> { slug, likes }
import { getStore } from '@netlify/blobs';
import type { Config } from '@netlify/functions';
import { articleBySlug } from '../../src/content/insights.mjs';

const count = async (slug: string) => (await getStore({ name: 'insights', consistency: 'strong' }).list({ prefix: `likes/${slug}/` })).blobs.length;

export default async (req: Request) => {
  if (req.method === 'GET') {
    const slug = new URL(req.url).searchParams.get('slug') || '';
    if (!articleBySlug[slug]) return Response.json({ error: 'Unknown article' }, { status: 404 });
    return Response.json({ slug, likes: await count(slug) }, { headers: { 'cache-control': 'no-store' } });
  }
  let body: any = {};
  try { body = JSON.parse(await req.text()); } catch { return Response.json({ error: 'Bad request' }, { status: 400 }); }
  const slug = String(body.slug || '');
  if (!articleBySlug[slug]) return Response.json({ error: 'Unknown article' }, { status: 404 });
  const now = Date.now();
  await getStore('insights').set(`likes/${slug}/${now.toString(36)}-${Math.random().toString(36).slice(2, 8)}`, '1');
  return Response.json({ slug, likes: await count(slug) });
};

export const config: Config = {
  path: '/api/likes',
  method: ['GET', 'POST'],
  rateLimit: { windowLimit: 30, windowSize: 60, aggregateBy: ['ip', 'domain'] }
};
