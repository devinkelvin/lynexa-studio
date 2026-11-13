// Comments on Insights articles.
//   GET  /api/comments?slug=<slug>   -> visible comments, oldest first
//   POST /api/comments {slug, name, text, website (honeypot), ms (time on page)}
// Automatic checks before a comment is shown: honeypot, minimum time on page, length limits, no links,
// a blocklist of abusive words (those are held, not shown) and a rate limit. The daily insights task also reviews
// new comments and can hide any that slip through, via /api/comments-moderate.
// Stored: display name, comment text and time. No email, IP address or cookie.
import { getStore } from '@netlify/blobs';
import type { Config } from '@netlify/functions';
import { articleBySlug } from '../../src/content/insights.mjs';

type Comment = { name: string; text: string; at: string; status: 'visible' | 'held' | 'hidden' };
const BLOCK = /\b(fuck|shit|bitch|cunt|nigger|faggot|whore|bastard|scam|casino|viagra|crypto ?giveaway|loan offer)\b/i;
const LINK = /(https?:\/\/|www\.|\.(com|net|org|io|ng|xyz|ru)\b)/i;

const clean = (t: unknown, max: number) => String(t ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

export default async (req: Request) => {
  const store = getStore({ name: 'insights', consistency: 'strong' });
  if (req.method === 'GET') {
    const slug = new URL(req.url).searchParams.get('slug') || '';
    if (!articleBySlug[slug]) return Response.json({ error: 'Unknown article' }, { status: 404 });
    const { blobs } = await store.list({ prefix: `comments/${slug}/` });
    const items: (Comment & { id: string })[] = [];
    for (const b of blobs.slice(-200)) {
      const c = (await store.get(b.key, { type: 'json' })) as Comment | null;
      if (c && c.status === 'visible') items.push({ ...c, id: b.key.split('/').pop() as string });
    }
    items.sort((a, b) => a.at.localeCompare(b.at));
    return Response.json({ slug, comments: items.map(({ id, name, text, at }) => ({ id, name, text, at })) }, { headers: { 'cache-control': 'no-store' } });
  }

  let body: any = {};
  try { body = JSON.parse(await req.text()); } catch { return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 400 }); }
  const slug = String(body.slug || '');
  if (!articleBySlug[slug]) return Response.json({ error: 'Unknown article' }, { status: 404 });
  if (body.website) return Response.json({ ok: true, status: 'visible' });               // honeypot: pretend success
  if (Number(body.ms) < 4000) return Response.json({ error: 'Please take a moment to read before commenting.' }, { status: 400 });
  const name = clean(body.name, 60), text = clean(body.text, 1000);
  if (name.length < 2) return Response.json({ error: 'Please add your name.' }, { status: 400 });
  if (text.length < 3) return Response.json({ error: 'Please write a comment.' }, { status: 400 });
  if (LINK.test(text) || LINK.test(name)) return Response.json({ error: 'Links aren’t allowed in comments. Please remove the link and try again.' }, { status: 400 });

  const status: Comment['status'] = BLOCK.test(text) || BLOCK.test(name) ? 'held' : 'visible';
  const at = new Date().toISOString();
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  await store.setJSON(`comments/${slug}/${id}`, { name, text, at, status } satisfies Comment);
  return Response.json({ ok: true, status, comment: status === 'visible' ? { id, name, text, at } : null });
};

export const config: Config = {
  path: '/api/comments',
  method: ['GET', 'POST'],
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'] }
};
