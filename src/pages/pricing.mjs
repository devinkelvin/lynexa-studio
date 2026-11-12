import { breadcrumbs, crumbLd, ctaBand, faq, faqLd, icon, link, bookBtn, TZ_LONG } from '../lib.mjs';
import { PACKAGES, usd } from '../content/pricing.mjs';

// One package card, shared by the home page teaser and the pricing page.
export const pack = (x) => `
      <article class="pack${x.featured ? ' pack--featured' : ''}">
        <div class="pack__head">
          <h3>${x.name}</h3>
          ${x.featured ? '<span class="pack__tag">Most chosen</span>' : ''}
        </div>
        <p class="pack__price"><span>From</span> <b>${usd(x.from)}</b>${x.unit ? `<span>${x.unit}</span>` : ''}</p>
        <p class="pack__time">${x.weeks}</p>
        <p class="pack__for">${x.for}</p>
        <ul class="checklist">${x.gets.map((g) => `<li>${icon.check}${g}</li>`).join('')}</ul>
        <p class="pack__more">${link(x.service, `About ${x.name.toLowerCase()}`)}</p>
      </article>`;

const PRICE_FAQ = [
  ['Why “from” prices?', 'Every product is different. The starting price covers a focused version of the package. After a first call we send a written scope with a fixed price, so the number you agree to is the number you pay.'],
  ['Can I pay in naira?', 'Yes. We quote in US dollars and can invoice in naira at the exchange rate on the invoice date.'],
  ['How are payments split?', 'Payments are tied to milestones agreed in the written scope, so you pay as work is delivered.'],
  ['What if my budget is smaller?', 'Tell us. We may suggest a smaller first step, such as a Product Sprint before a full build, or a <a href="/ventures/">venture partnership</a> for the right idea.'],
  ['Do prices include hosting and third-party tools?', 'No. Hosting, app store accounts, payment provider fees and paid tools are billed by those providers to your own accounts, so you own them from day one.']
];

export function pricingPage() {
  const trail = [['/', 'Home'], ['/pricing/', 'Pricing']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>Clear starting prices.</h1>
      <p class="lead">Where most engagements begin, in US dollars. Every project gets a written scope and a fixed price before any work starts, with no hourly surprises.</p>
    </div>
    <p class="page-hero__more">${link('/mvp-planner/', 'Estimate a timeline for your product')}</p>
  </div>
</section>
<section class="sec sec--tight" aria-labelledby="packs-title">
  <div class="shell">
    <h2 id="packs-title" class="sr-only">Packages</h2>
    <div class="packs">${PACKAGES.map(pack).join('')}</div>
    <p class="packs__note">Prices exclude VAT where it applies, and third-party costs such as hosting and app store fees.</p>
  </div>
</section>
<section class="sec surface-paper sheet" aria-labelledby="every-title">
  <div class="shell split">
    <div>
      <h2 id="every-title" style="font-size:var(--fs-h2);max-width:14ch">Included in every project.</h2>
    </div>
    <ul class="checklist checklist--lg">
      <li>${icon.check}A written scope with deliverables, timeline and a fixed price</li>
      <li>${icon.check}A named lead and a direct line to the people doing the work</li>
      <li>${icon.check}Progress you can see and try at every step</li>
      <li>${icon.check}All code, design files and accounts handed over to you</li>
      <li>${icon.check}A mutual NDA on request, before you share anything sensitive</li>
    </ul>
  </div>
</section>
<section class="sec sheet" aria-labelledby="global-title">
  <div class="shell split">
    <div>
      <h2 id="global-title" style="font-size:var(--fs-h2);max-width:14ch">Working with us from abroad.</h2>
    </div>
    <div style="display:grid;gap:1.25rem;justify-items:start">
      <p class="lead">${TZ_LONG}</p>
      <p>We work remotely with video calls, shared boards and a demo at every milestone. Quotes are in US dollars, and we reply within 24 hours on working days.</p>
      ${bookBtn('secondary')}
    </div>
  </div>
</section>
<section class="sec surface-paper sheet" aria-labelledby="pfaq-title">
  <div class="shell faq-block">
    <div class="sec-head sec-head--stack"><h2 id="pfaq-title">Pricing questions</h2></div>
    ${faq(PRICE_FAQ)}
  </div>
</section>
${ctaBand({ title: 'Want a fixed price for your project?', text: 'Send a short brief and we reply within 24 hours on working days with an honest view of scope, timing and cost.' })}`;
  return { path: '/pricing/', title: 'Pricing and Packages', description: 'Starting prices in US dollars for Lynexa product sprints, MVP builds, websites, brand identity, pitch decks and fractional product leadership. Fixed-price scopes before work starts.', body, jsonld: [crumbLd(trail), faqLd(PRICE_FAQ)] };
}
