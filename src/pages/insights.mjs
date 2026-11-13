import { breadcrumbs, crumbLd, ctaBand, link } from '../lib.mjs';
import { SITE } from '../site.mjs';
import { ARTICLES } from '../content/insights.mjs';

const cover = (a, sizes, eager = false) => `<img class="post__cover" src="/assets/insights/${a.slug}-800.webp" srcset="/assets/insights/${a.slug}-800.webp 800w, /assets/insights/${a.slug}-1600.webp 1600w" sizes="${sizes}" width="1600" height="900" alt="" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const fmtDate = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function insightsIndex() {
  const trail = [['/', 'Home'], ['/insights/', 'Insights']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>Insights from the studio.</h1>
      <p class="lead">Practical notes on building products for African markets: scoping, design, fintech and fundraising. Written by the people who do the work.</p>
    </div>
  </div>
</section>
<section class="sec sec--tight" aria-label="Articles">
  <div class="shell">
    <ul class="posts">
      ${ARTICLES.map((a) => `<li class="post">
        <a href="/insights/${a.slug}/">
          ${cover(a, '(min-width: 800px) 45vw, 92vw')}
          <span class="post__topic">${a.topic}</span>
          <h2>${a.title}</h2>
          <p>${a.description}</p>
          <span class="post__meta"><time datetime="${a.date}">${fmtDate(a.date)}</time>, ${a.minutes} min read</span>
        </a>
      </li>`).join('')}
    </ul>
  </div>
</section>
${ctaBand({ title: 'Have a question we should write about?', text: 'Or a product you want to build. We reply within 24 hours on working days.' })}`;
  return { path: '/insights/', title: 'Insights on MVPs, Fintech and Product Design', description: 'Articles from Lynexa on scoping MVPs, designing fintech for African markets, payments integration and preparing products for investors.', body, jsonld: [crumbLd(trail)] };
}

export function articlePage(a) {
  const trail = [['/', 'Home'], ['/insights/', 'Insights'], [`/insights/${a.slug}/`, a.title]];
  const others = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 2);
  const body = `
<section class="page-hero article-hero">
  <div class="shell article-shell">
    ${breadcrumbs(trail)}
    <p class="post__topic">${a.topic}</p>
    <h1>${a.title}</h1>
    <p class="lead">${a.description}</p>
    <p class="post__meta">By the Lynexa studio team, <time datetime="${a.date}">${fmtDate(a.date)}</time>, ${a.minutes} min read</p>
  </div>
  <div class="shell article-cover">${cover(a, '(min-width: 1200px) 1100px, 100vw', true)}</div>
</section>
<section class="sec sec--tight">
  <div class="shell article-shell">
    <article class="prose article">${a.body}</article>
    ${a.sources && a.sources.length ? `<aside class="article__sources" aria-labelledby="src-title"><h2 id="src-title">Sources</h2><ul>${a.sources.map(([t, u]) => `<li><a href="${u}" rel="noopener noreferrer" target="_blank">${t}<span class="sr-only"> (opens in a new tab)</span></a></li>`).join('')}</ul></aside>` : ''}
    <div class="engage" data-engage data-slug="${a.slug}" data-title="${a.title.replace(/"/g, '&quot;')}">
      <div class="engage__bar">
        <button class="engage__like" type="button" data-like aria-pressed="false"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg><span data-like-label>Like</span> <span class="engage__count" data-like-count></span></button>
        <div class="engage__share" role="group" aria-label="Share this article">
          <button type="button" class="engage__btn" data-share-native hidden>Share</button>
          <a class="engage__btn" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE.url}/insights/${a.slug}/`)}">LinkedIn<span class="sr-only"> (opens in a new tab)</span></a>
          <a class="engage__btn" target="_blank" rel="noopener noreferrer" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(`${SITE.url}/insights/${a.slug}/`)}&text=${encodeURIComponent(a.title)}">X<span class="sr-only"> (opens in a new tab)</span></a>
          <a class="engage__btn" target="_blank" rel="noopener noreferrer" href="https://wa.me/?text=${encodeURIComponent(`${a.title} ${SITE.url}/insights/${a.slug}/`)}">WhatsApp<span class="sr-only"> (opens in a new tab)</span></a>
          <button type="button" class="engage__btn" data-share-copy>Copy link</button>
        </div>
      </div>
      <p class="sr-only" role="status" data-engage-status></p>
      <section class="comments" aria-labelledby="comments-title">
        <h2 id="comments-title">Comments <span data-comment-count></span></h2>
        <ol class="comments__list" data-comments><li class="comments__empty">Loading comments…</li></ol>
        <form class="comments__form" data-comment-form novalidate>
          <h3>Join the conversation</h3>
          <div class="field"><label for="c-name">Your name</label><input class="input" id="c-name" name="name" maxlength="60" autocomplete="name" required></div>
          <div class="field"><label for="c-text">Your comment</label><textarea class="input" id="c-text" name="text" rows="4" maxlength="1000" required></textarea></div>
          <div class="hp" aria-hidden="true"><label for="c-website">Leave this empty</label><input id="c-website" name="website" tabindex="-1" autocomplete="off"></div>
          <p class="comments__note">Comments are public. Please be kind and keep it on topic; links aren’t allowed. We don’t ask for your email.</p>
          <p class="comments__error" role="alert" data-comment-error></p>
          <button class="btn btn--primary" type="submit"><span>Post comment</span></button>
        </form>
      </section>
    </div>
  </div>
</section>
<section class="sec surface-paper sheet" aria-labelledby="more-title">
  <div class="shell">
    <div class="sec-head sec-head--stack"><h2 id="more-title">Keep reading</h2></div>
    <ul class="posts posts--two">
      ${others.map((x) => `<li class="post"><a href="/insights/${x.slug}/">${cover(x, '(min-width: 800px) 45vw, 92vw')}<span class="post__topic">${x.topic}</span><h3>${x.title}</h3><p>${x.description}</p></a></li>`).join('')}
    </ul>
    <p style="margin-top:2rem">${link('/insights/', 'All insights')}</p>
  </div>
</section>
${ctaBand({ title: 'Building something like this?', text: 'Tell us what you are working on. We reply within 24 hours on working days with an honest view of whether, and how, we can help.' })}`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.description,
    datePublished: a.date, dateModified: a.date, mainEntityOfPage: `${SITE.url}/insights/${a.slug}/`,
    author: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.legalName, url: SITE.url, logo: { '@type': 'ImageObject', url: `${SITE.url}/apple-touch-icon.png` } },
    image: `${SITE.url}/assets/insights/${a.slug}-1600.webp`, inLanguage: 'en',
    ...(a.sources && a.sources.length ? { citation: a.sources.map(([name, url]) => ({ '@type': 'CreativeWork', name, url })) } : {})
  };
  return { path: `/insights/${a.slug}/`, title: a.title, seoTitle: a.seoTitle, description: a.description, ogType: 'article', published: a.date, body, jsonld: [crumbLd(trail), ld] };
}

export const insightsPages = () => [insightsIndex(), ...ARTICLES.map(articlePage)];
