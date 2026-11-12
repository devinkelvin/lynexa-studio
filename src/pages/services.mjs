import { btn, link, head2, faq, faqLd, breadcrumbs, crumbLd, ctaBand, icon, img, status } from '../lib.mjs';
import { SERVICES, ALSO, PILLARS, svcBySlug } from '../content/services.mjs';
import { PROJECTS } from '../content/work.mjs';
import { PACKAGES, usd } from '../content/pricing.mjs';
import { pack } from './pricing.mjs';

export function servicesIndex() {
  const trail = [['/', 'Home'], ['/services/', 'Services']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>Everything it takes to get a product to market.</h1>
      <p class="lead">Strategy, product design, engineering, brand, websites and investor materials. Hire us for the whole journey or for the one piece you are missing.</p>
    </div>
    <p class="page-hero__more">${link('/mvp-planner/', 'Estimate a timeline for your product')}</p>
  </div>
</section>
<section class="sec sec--tight" aria-label="Services">
  <div class="shell">
    <div class="svc-index">
      ${SERVICES.map((s) => `
      <a class="svc-row" href="/services/${s.slug}/">
        <h2>${s.name}</h2>
        <p>${s.short}</p>
        <span class="go">Explore${icon.arrow}</span>
      </a>`).join('')}
    </div>
    <h2 style="font-size:1.5rem;margin-top:4rem">Also part of what we do</h2>
    <div class="also">
      ${ALSO.map(([t, d, h]) => `<div><h3>${t}</h3><p>${d}</p><p style="margin-top:.8rem">${link(h, 'Learn more')}</p></div>`).join('')}
    </div>
  </div>
</section>
<section class="sec surface-paper sheet" aria-labelledby="map-title">
  <div class="shell">
    ${head2('Three common starting points.', 'Most clients begin with one of these. Every project gets a written scope and a fixed price before work starts.', { id: 'map-title' })}
    <div class="packs">${PACKAGES.filter((x) => ['sprint', 'mvp', 'website'].includes(x.key)).map(pack).join('')}</div>
    <p class="center-cta" style="margin-top:2rem">${btn('/pricing/', 'See all packages and prices', 'secondary')}</p>
  </div>
</section>
${ctaBand({ title: 'Tell us where you are stuck.', text: 'Describe the project and we will recommend the right starting point, even if that is not us.' })}`;
  return {
    path: '/services/', title: 'Services: Product Design, MVP Development & Websites',
    description: 'Lynexa services: product strategy, UX/UI design, MVP and mobile app development, websites, brand identity, product engineering, pitch decks and product leadership.',
    body, jsonld: [crumbLd(trail)]
  };
}

export function servicePage(s) {
  const trail = [['/', 'Home'], ['/services/', 'Services'], [`/services/${s.slug}/`, s.nav]];
  const projects = s.work.map((k) => PROJECTS.find((p) => p.slug === k)).filter((p) => p && (p.page || p.href));
  const price = PACKAGES.find((x) => x.service === `/services/${s.slug}/`);
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  const steps = [
    ['Understand', 'A conversation about your goals, users and constraints, then a written scope with deliverables and timeline.'],
    ['Shape', 'Early direction shared quickly, so we agree on the approach before investing in detail.'],
    ['Make', 'The work itself, in reviewable steps, with you involved at every decision that matters.'],
    ['Hand over', 'Files, documentation and a walkthrough, plus support while your team takes it forward.']
  ];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>${s.name}</h1>
      <div>
        <p class="lead" style="margin-top:0">${s.lead}</p>
        <div class="actions">${btn(`/start-a-project/?service=${s.slug}`, 'Start a project', 'primary')}${btn('#includes', 'What’s included', 'secondary')}</div>
        ${price ? `<p class="svc-price"><b>From ${usd(price.from)}${price.unit}</b><span>${price.weeks}</span>${link('/pricing/', 'See pricing')}</p>` : ''}
      </div>
    </div>
  </div>
</section>

<section class="sec sec--tight surface-paper sheet" aria-labelledby="problem-title">
  <div class="shell split">
    <h2 id="problem-title" style="font-size:1rem;letter-spacing:0;color:var(--stone);font-weight:600">The problem we solve</h2>
    <p class="svc-problem">${s.problem}</p>
  </div>
</section>

<section class="sec" id="includes" aria-labelledby="inc-title">
  <div class="shell">
    ${head2('What’s included', 'Every engagement is scoped to your situation. These are the pieces we draw on.', { id: 'inc-title' })}
    <div class="cards cards--3">
      ${s.includes.map(([t, d]) => `<div class="card"><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="sec surface-dark sheet" aria-labelledby="del-title">
  <div class="shell split">
    <div>
      <h2 id="del-title" style="font-size:var(--fs-h2);max-width:12ch">What you walk away with</h2>
      <p class="lead" style="margin-top:1.25rem">Concrete deliverables, agreed in writing before work starts.</p>
    </div>
    <ul class="checklist" style="font-size:1.1rem;gap:.9rem;align-content:center">
      ${s.deliverables.map((d) => `<li>${icon.check}${d}</li>`).join('')}
    </ul>
  </div>
</section>

<section class="sec" aria-labelledby="how-title">
  <div class="shell">
    ${head2('How it runs', 'The same rhythm on every engagement, sized to the work.', { id: 'how-title' })}
    <ol class="steps steps--4">
      ${steps.map(([t, d], i) => `<li class="step"><span class="step__n" aria-hidden="true">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="sec surface-paper sheet" aria-labelledby="fit-title">
  <div class="shell">
    ${head2('Is this right for you?', '', { id: 'fit-title', cls: 'sec-head--stack' })}
    <div class="fit">
      <div class="fit__yes"><h3>A good fit if</h3><ul class="checklist">${s.fitYes.map((x) => `<li>${icon.check}${x}</li>`).join('')}</ul></div>
      <div class="fit__no"><h3>Probably not the right fit if</h3><ul class="checklist">${s.fitNo.map((x) => `<li>${icon.plus.replace('class="icon ', 'class="icon rot45 ')}${x}</li>`).join('')}</ul></div>
    </div>
  </div>
</section>

${projects.length ? `
<section class="sec" aria-labelledby="ex-title">
  <div class="shell">
    ${head2('Related work', '', { id: 'ex-title', cls: 'sec-head--stack' })}
    <div class="cards">
      ${projects.map((p) => `<a class="card" href="${p.page ? `/work/${p.slug}/` : p.href}"${p.page ? '' : ' target="_blank" rel="noopener noreferrer"'} style="text-decoration:none;display:grid;gap:.8rem;justify-items:start">${status(...p.status)}<h3 style="font-size:1.6rem;margin:0">${p.name}</h3><p>${p.summary}</p><span class="link">${p.page ? 'View project' : 'Visit the product'}${icon.arrow}${p.page ? '' : '<span class="sr-only"> (opens in a new tab)</span>'}</span></a>`).join('')}
    </div>
  </div>
</section>` : ''}

<section class="sec${projects.length ? ' surface-paper' : ''}" aria-labelledby="faq-title">
  <div class="shell faq-block">
    ${head2('Questions', '', { id: 'faq-title' })}
    ${faq(s.faqs)}
  </div>
</section>

<section class="sec sec--tight" aria-labelledby="more-title">
  <div class="shell">
    <h2 id="more-title" style="font-size:1.4rem;margin-bottom:1rem">Other services</h2>
    <div class="svc-index">
      ${others.map((o) => `<a class="svc-row" href="/services/${o.slug}/"><h3>${o.name}</h3><p>${o.short}</p><span class="go">Explore${icon.arrow}</span></a>`).join('')}
    </div>
  </div>
</section>

${ctaBand({ title: `Talk to us about ${s.nav.replace(/^[A-Z][a-z]/, (m) => m.toLowerCase())}.`, primary: [`/start-a-project/?service=${s.slug}`, 'Start a project'] })}`;

  return {
    path: `/services/${s.slug}/`, title: s.title, description: s.description, body,
    jsonld: [crumbLd(trail), faqLd(s.faqs), { '@context': 'https://schema.org', '@type': 'Service', name: s.name, description: s.description, serviceType: s.name, provider: { '@id': 'https://lynexa.co/#organization' }, areaServed: ['Nigeria', 'Africa', 'Worldwide'], url: `https://lynexa.co/services/${s.slug}/`, ...(price ? { offers: { '@type': 'Offer', priceCurrency: 'USD', priceSpecification: { '@type': 'PriceSpecification', minPrice: price.from, priceCurrency: 'USD' }, url: 'https://lynexa.co/pricing/' } } : {}) }]
  };
}
