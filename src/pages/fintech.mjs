import { breadcrumbs, crumbLd, ctaBand, faq, faqLd, icon, link, btn, bookBtn, phone } from '../lib.mjs';

const FINTECH_FAQ = [
  ['Do you handle licensing and compliance?', 'We are a product studio, not a law firm. We design and build products with compliance in mind, such as identity tiers, limits and audit trails, and work alongside your legal advisers and licensed partners.'],
  ['Which payment and identity providers have you worked with?', 'Our team has integrated providers such as Paystack, Flutterwave, Monnify and Mono, and BVN and NIN verification. We choose with you based on your product, volumes and markets.'],
  ['Can you work with an existing bank or fintech team?', 'Yes. We can design new journeys, run a product sprint, or provide fractional product leadership alongside your in-house engineers.'],
  ['Do you work on products outside Nigeria?', 'Yes. Our experience is deepest in Nigerian financial services, and we work remotely with teams across Africa and further afield.']
];

export function fintechPage() {
  const trail = [['/', 'Home'], ['/fintech/', 'Fintech']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>Fintech products people trust with their money.</h1>
      <p class="lead">Product design and engineering for wallets, payments, lending and social finance in African markets, from a team that spent years designing digital banking at Sterling Bank and Polaris Bank.</p>
    </div>
    <div class="actions" style="margin-top:2rem">${btn('/start-a-project/', 'Start a fintech project', 'primary', ' data-magnetic')}${bookBtn('secondary')}</div>
  </div>
</section>
<section class="sec" aria-labelledby="know-title">
  <div class="shell">
    <div class="sec-head"><h2 id="know-title">What we bring to a money product.</h2><p>The parts of fintech that decide whether customers trust you, and that generalist agencies often learn on your budget.</p></div>
    <div class="reasons">
      <div><h3>Banking-grade journeys</h3><p>Onboarding, identity tiers, limits, transfers, bills and statements, designed the way regulated institutions and their customers expect.</p></div>
      <div><h3>Payments and identity</h3><p>Integrations with providers such as Paystack, Flutterwave, Monnify and Mono, with BVN and NIN checks and server-side verification of every payment.</p></div>
      <div><h3>Failure, designed</h3><p>Pending transfers, wrong PINs, expired OTPs and provider downtime each get a clear screen, so customers know what happened to their money.</p></div>
      <div><h3>Built for real conditions</h3><p>Mid-range Android phones, patchy networks and first-time users. Small installs, fast balance screens and transactions that are safe to retry.</p></div>
    </div>
  </div>
</section>
<section class="sec surface-dark sheet" aria-labelledby="fz-title">
  <div class="shell split">
    <div style="display:grid;gap:1.25rem;justify-items:start">
      <h2 id="fz-title" style="font-size:var(--fs-h2);max-width:14ch">Zengly: social finance for young Nigerians.</h2>
      <p>Transfers, bills, split bills and Vaniti, a social cash-spraying experience for celebrations. Lynexa leads its product, design, brand and website. The app launches on iOS and Android in December 2026.</p>
      ${link('/work/zengly/', 'Read the Zengly case study')}
    </div>
    <div class="fz-phones">
      ${phone('zengly-home-dark', 'Zengly home screen in dark mode with balance and quick actions', { sizes: '(min-width: 900px) 200px, 40vw' })}
      ${phone('zengly-split-bill', 'Zengly split-bill screen with bill history', { sizes: '(min-width: 900px) 200px, 40vw' })}
    </div>
  </div>
</section>
<section class="sec" aria-labelledby="fread-title">
  <div class="shell">
    <div class="sec-head sec-head--stack"><h2 id="fread-title">From our insights</h2></div>
    <ul class="checklist checklist--lg">
      <li>${icon.arrow}<a href="/insights/fintech-design-for-real-conditions/">Designing fintech apps for mid-range Android phones and patchy networks</a></li>
      <li>${icon.arrow}<a href="/insights/choosing-a-payment-provider-nigeria/">Choosing a payment provider for your Nigerian MVP</a></li>
      <li>${icon.arrow}<a href="/insights/what-investors-want-in-a-prototype/">What early investors look for in a product prototype</a></li>
    </ul>
  </div>
</section>
<section class="sec surface-paper sheet" aria-labelledby="ffaq-title">
  <div class="shell faq-block">
    <div class="sec-head sec-head--stack"><h2 id="ffaq-title">Fintech questions</h2></div>
    ${faq(FINTECH_FAQ)}
    <p style="margin-top:2rem">${link('/pricing/', 'See starting prices')}</p>
  </div>
</section>
${ctaBand({ title: 'Building a money product?', text: 'Tell us what you are working on. We reply within 24 hours on working days with an honest view of whether, and how, we can help.' })}`;
  return { path: '/fintech/', title: 'Fintech Product Design & Development in Africa', description: 'Lynexa designs and builds fintech products for African markets: wallets, payments, lending and social finance, with Paystack, Flutterwave, Monnify, Mono and BVN/NIN integrations.', body, jsonld: [crumbLd(trail), faqLd(FINTECH_FAQ)] };
}
