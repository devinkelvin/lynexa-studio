import { breadcrumbs, crumbLd, ctaBand, link } from '../lib.mjs';
import { SITE } from '../site.mjs';
import { ARTICLES } from '../content/insights.mjs';

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
  return { path: '/insights/', title: 'Insights', description: 'Articles from Lynexa on scoping MVPs, designing fintech for African markets, payments integration and preparing products for investors.', body, jsonld: [crumbLd(trail)] };
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
</section>
<section class="sec sec--tight">
  <div class="shell article-shell">
    <article class="prose article">${a.body}</article>
  </div>
</section>
<section class="sec surface-paper sheet" aria-labelledby="more-title">
  <div class="shell">
    <div class="sec-head sec-head--stack"><h2 id="more-title">Keep reading</h2></div>
    <ul class="posts posts--two">
      ${others.map((x) => `<li class="post"><a href="/insights/${x.slug}/"><span class="post__topic">${x.topic}</span><h3>${x.title}</h3><p>${x.description}</p></a></li>`).join('')}
    </ul>
    <p style="margin-top:2rem">${link('/insights/', 'All insights')}</p>
  </div>
</section>
${ctaBand({ title: 'Building something like this?', text: 'Tell us what you are working on. We reply within 24 hours on working days with an honest view of whether, and how, we can help.' })}`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.description,
    datePublished: a.date, dateModified: a.date, mainEntityOfPage: `${SITE.url}/insights/${a.slug}/`,
    author: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.legalName, url: SITE.url }
  };
  return { path: `/insights/${a.slug}/`, title: a.title, description: a.description, body, jsonld: [crumbLd(trail), ld] };
}

export const insightsPages = () => [insightsIndex(), ...ARTICLES.map(articlePage)];
