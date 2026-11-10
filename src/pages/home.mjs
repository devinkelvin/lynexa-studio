import { btn, link, img, head2, faq, faqLd, status, ctaBand, icon } from '../lib.mjs';
import { PILLARS, svcBySlug } from '../content/services.mjs';
import { PROJECTS } from '../content/work.mjs';
import { SITE } from '../site.mjs';

const HOME_FAQ = [
  ['What kind of companies do you work with?', 'Founders at the idea or early stage, startups that need a product or website built properly, and established businesses launching a new digital product. Most of our work so far is in fintech, mobility and consumer products for African markets, and we work with clients anywhere.'],
  ['Can you take a project from idea to launch?', 'Yes. Strategy, product design, brand, engineering, website and investor materials can all sit with one team. You can also bring us in for a single part, such as design or a website.'],
  ['How much does a project cost?', 'It depends on scope. After a first conversation we send a written scope with deliverables, timeline and price, so you know the commitment before any work starts.'],
  ['Who owns the work?', 'You do. Code, design files and brand assets created for your project are transferred to you as set out in our agreement.'],
  ['Will you sign an NDA?', 'Yes. We are happy to sign a mutual NDA before you share anything sensitive.'],
  ['Do you invest in startups?', 'Occasionally, through selective venture partnerships where Lynexa contributes design and engineering. These are case-by-case and never automatic. <a href="/ventures/">Read how venture partnerships work</a>.']
];

export default function home() {
  const zengly = PROJECTS.find((p) => p.slug === 'zengly');
  const swiftly = PROJECTS.find((p) => p.slug === 'swiftly');
  const others = PROJECTS.filter((p) => !p.page);

  const body = `
<section class="hero" id="top" aria-labelledby="hero-title">
  <div class="shell">
    <h1 id="hero-title">From a founder’s idea to a product people actually use.</h1>
    <div class="hero__meta">
      <p class="lead">Lynexa is a product design, engineering and venture studio in Lagos. We help you understand the idea, design it, build it and bring it to market, with one team accountable from the first conversation to launch.</p>
      <div class="actions">${btn('/start-a-project/', 'Start a project', 'primary')}${btn('/work/', 'Explore our work', 'secondary')}</div>
    </div>

    <div class="build" role="group" aria-label="How an idea becomes a product, shown with Zengly’s split-bill feature">
      <span class="build__line" aria-hidden="true"></span>
      <div class="build__stage build__stage--idea">
        <p class="build__label"><b>1</b>The idea</p>
        <div class="build__idea">
          <p class="build__note-text">Splitting a bill with friends shouldn’t take a spreadsheet and three reminders.</p>
          <p>Every project starts as a problem in plain words.</p>
        </div>
      </div>
      <div class="build__stage">
        <p class="build__label"><b>2</b>Designed</p>
        <div class="build__frame build__frame--wire" aria-hidden="true">
          <div class="phone"><div class="wire">
            <i class="w-a"></i><i class="w-b"></i><i class="w-c"></i>
            <span class="w-row"><i></i><i></i><i></i></span><i class="w-d"></i><i class="w-d"></i><i class="w-e"></i>
          </div></div>
        </div>
      </div>
      <div class="build__stage">
        <p class="build__label"><b>3</b>Built</p>
        <div class="build__frame build__frame--real">
          <div class="phone">${img('zengly-split-bill', 'Zengly split-bill screen showing a “Divide expenses fairly” card and bill history', { sizes: '(min-width: 760px) 240px, 40vw', eager: true })}</div>
        </div>
      </div>
      <p class="build__caption">Zengly’s split-bill feature, from a sentence to a wireframe to the interface in the app. Zengly is in pre-launch.</p>
    </div>
  </div>
</section>

<section class="sec" id="services" aria-labelledby="what-title">
  <div class="shell">
    ${head2('Four things, done by one team.', 'We understand your idea, design it, build it and help bring it to market. Hire us for all four, or for the one you are missing.', { id: 'what-title' })}
    <div class="pillars">
      ${PILLARS.map((p, i) => `
      <div class="pillar">
        <p class="pillar__step">Step ${i + 1}</p>
        <div><h3>${p.title}</h3><p style="margin-top:.75rem">${p.text}</p></div>
        <ul>${p.links.map((s) => `<li><a href="/services/${s}/">${svcBySlug[s].name}</a></li>`).join('')}</ul>
      </div>`).join('')}
    </div>
    <p style="margin-top:2rem">${link('/services/', 'See all services')}</p>
  </div>
</section>

<section class="sec surface-dark" id="work" aria-labelledby="work-title">
  <div class="shell">
    ${head2('Selected work, labelled honestly.', 'Products we have designed and engineered, and ventures we are building. Every project shows where it really is today.', { id: 'work-title' })}
    <div class="work-grid">
      <article class="work-feature">
        <a class="work-feature__media" href="/work/zengly/" data-reveal aria-label="Zengly case study">
          ${img('zengly-friends', '', { cls: 'bg', sizes: '(min-width: 900px) 55vw, 100vw' })}
          <span class="work-feature__screens">
            ${img('zengly-home-dark', '', { sizes: '(min-width: 900px) 15vw, 28vw' })}
            ${img('zengly-vaniti-leaderboard', '', { sizes: '(min-width: 900px) 15vw, 28vw' })}
            ${img('zengly-menu', '', { sizes: '(min-width: 900px) 15vw, 28vw' })}
          </span>
        </a>
        <div class="work-feature__body">
          ${status(...zengly.status)}
          <h3>Zengly</h3>
          <p>${zengly.summary} We shaped the product, designed every screen, built the brand and launched the marketing site.</p>
          <ul class="tags">${zengly.role.map((r) => `<li>${r}</li>`).join('')}</ul>
          ${link('/work/zengly/', 'Read the Zengly case study')}
        </div>
      </article>
      <article class="work-feature work-feature--flip">
        <a class="work-feature__media swiftly-media" href="/work/swiftly/" data-reveal aria-label="Swiftly project page">
          ${img('lagos-professionals', '', { cls: 'bg', sizes: '(min-width: 900px) 55vw, 100vw' })}
          ${img('swiftly-logo', 'Swiftly', { cls: 'logo', sizes: '320px' })}
        </a>
        <div class="work-feature__body">
          ${status(...swiftly.status)}
          <h3>Swiftly</h3>
          <p>${swiftly.summary} We wrote the product specification, researched real operator fares and prototyped the marketing site.</p>
          <ul class="tags">${swiftly.role.map((r) => `<li>${r}</li>`).join('')}</ul>
          ${link('/work/swiftly/', 'See the Swiftly concept')}
        </div>
      </article>
    </div>
    <div class="ventures-list">
      ${others.map((p) => `<div class="ventures-list__row"><h3>${p.name}</h3><p>${p.summary}</p>${status(...p.status)}</div>`).join('')}
    </div>
    <p style="margin-top:2.5rem" class="actions">${btn('/work/', 'View all work', 'light')}${btn('/websites/', 'Websites we’ve designed', 'ghost-light')}</p>
  </div>
</section>

<section class="sec" aria-labelledby="craft-title">
  <div class="shell split split--wide-left">
    <div>
      <h2 id="craft-title" style="font-size:var(--fs-h2);max-width:14ch">Designers who ship. Engineers who care how it feels.</h2>
      <p class="lead" style="margin-top:1.5rem">Design and engineering sit in the same room at Lynexa. The person who designed the payment flow is there when it is built, so the failed-transfer screen gets as much care as the home screen.</p>
    </div>
    <dl class="stack">
      <div><dt>Mobile</dt><dd>Flutter and React Native for iOS and Android</dd></div>
      <div><dt>Web</dt><dd>React, Next.js and fast hand-built static sites</dd></div>
      <div><dt>Backend</dt><dd>Node.js and Python services, APIs and databases</dd></div>
      <div><dt>Money and identity</dt><dd>Paystack, Flutterwave and Mono integrations; BVN and NIN verification</dd></div>
      <div><dt>Design</dt><dd>Figma prototypes, design systems and motion</dd></div>
      <div><dt>AI</dt><dd>Assistants and automation built into real product flows</dd></div>
    </dl>
  </div>
</section>

<section class="sec surface-paper" aria-labelledby="why-title">
  <div class="shell">
    ${head2('Why founders choose a studio over a string of freelancers.', '', { id: 'why-title', cls: 'sec-head--stack' })}
    <div class="reasons">
      <div><h3>Banking-grade product thinking</h3><p>Our founder spent years designing digital banking and payment products at Nigerian banks. We know what regulators, partners and nervous first-time users need to see.</p></div>
      <div><h3>One accountable team</h3><p>Strategy, design, engineering and brand under one roof. No handoffs between agencies, no vision lost between vendors.</p></div>
      <div><h3>Built for these markets</h3><p>Patchy networks, mid-range Android phones, cash habits and trust gaps. We design for the conditions your customers actually live in.</p></div>
      <div><h3>You own everything</h3><p>Code, Figma files, brand assets and documentation are handed over, so you are never locked in to us.</p></div>
    </div>
  </div>
</section>

<section class="sec" id="method" aria-labelledby="process-title">
  <div class="shell">
    ${head2('How a project moves.', 'Four phases with a clear output at the end of each, so you always know what you are paying for and what comes next.', { id: 'process-title' })}
    <ol class="steps steps--4">
      ${[
        ['Discover', 'We dig into the idea, the customer and the market, then agree what the first version must do.', 'Discovery brief and scope'],
        ['Design', 'Flows, interfaces and brand come together in a prototype you can test with real people.', 'Tested, clickable prototype'],
        ['Build', 'We engineer the product in short cycles, with a demo you can try at each step.', 'Working product, ready to release'],
        ['Launch', 'Release, website, investor story and a plan for what to learn next.', 'Live product and next-phase plan']
      ].map(([t, d, o], i) => `<li class="step"><span class="step__n" aria-hidden="true">${i + 1}</span><h3>${t}</h3><p>${d}</p><ul><li>${o}</li></ul></li>`).join('')}
    </ol>
    <p style="margin-top:2rem">${link('/process/', 'See the full process')}</p>
  </div>
</section>

<section class="sec surface-dark spotlight" id="zengly" aria-labelledby="zengly-title">
  <div class="shell">
    <div class="spotlight__top">
      <div>
        ${img('zengly-logo', 'Zengly', { cls: 'logo', sizes: '150px' })}
        <h2 id="zengly-title">Money that moves the way friends do.</h2>
      </div>
      <div style="display:grid;gap:1.5rem;justify-items:start">
        <p>Zengly brings transfers, bill payments, split bills and Vaniti, a social cash-spraying experience for celebrations, into one app designed around Nigerian social life. Lynexa leads its product, design, brand and marketing site.</p>
        ${link('/work/zengly/', 'Read the case study')}
      </div>
    </div>
    <ul class="screens" tabindex="0" aria-label="Zengly interface screens, scrollable">
      <li><figure>${img('zengly-home-light', 'Zengly home screen in light mode with balance and quick actions', { sizes: '(min-width: 1200px) 20vw, 260px' })}<figcaption><b>Everyday money</b>Home, light mode</figcaption></figure></li>
      <li><figure>${img('zengly-split-bill', 'Zengly split bill screen with bill history', { sizes: '(min-width: 1200px) 20vw, 260px' })}<figcaption><b>Shared costs</b>Split bill</figcaption></figure></li>
      <li><figure>${img('zengly-vaniti-leaderboard', 'Zengly Vaniti leaderboard showing the top sprayers at an event', { sizes: '(min-width: 1200px) 20vw, 260px' })}<figcaption><b>Celebration</b>Vaniti leaderboard</figcaption></figure></li>
      <li><figure>${img('zengly-vaniti-sprayers', 'Zengly Vaniti community screen listing sprayers', { sizes: '(min-width: 1200px) 20vw, 260px' })}<figcaption><b>Community</b>Vaniti sprayers</figcaption></figure></li>
    </ul>
  </div>
</section>

<section class="sec surface-paper" aria-labelledby="ventures-title">
  <div class="shell split">
    <div>
      <h2 id="ventures-title" style="font-size:var(--fs-h2);max-width:13ch">Some ideas need a partner, not a vendor.</h2>
    </div>
    <div style="display:grid;gap:1.25rem;justify-items:start">
      <p class="lead">Alongside client work, Lynexa builds ventures of its own and, selectively, with founders. For the right idea we can share risk through hybrid cash-and-equity or equity-for-service arrangements, or build and hand over a product to an operating team.</p>
      <p class="muted">Every partnership is assessed case by case. It is not a funding offer, and nothing is agreed until it is in writing.</p>
      ${link('/ventures/', 'How venture partnerships work')}
    </div>
  </div>
</section>

<section class="sec" id="studio" aria-labelledby="founder-title">
  <div class="shell founder">
    <div class="founder__photo" data-reveal>${img('kelvin-ekuhoho', 'Kelvin Ekuhoho, founder and CEO of Lynexa', { sizes: '(min-width: 900px) 40vw, 100vw' })}</div>
    <div class="founder__body">
      <h2 id="founder-title">Founder-led, from Lagos.</h2>
      <p>Lynexa was founded by <span class="founder__name">Kelvin Ekuhoho</span>, a product designer and builder with more than seven years of experience, including digital banking and payments work at Sterling Bank and Polaris Bank.</p>
      <p>He started Lynexa to give founders what he wished more of them had: one senior team that can turn an idea into a credible, working product without burning a year and five vendors on the way.</p>
      ${link('/about/', 'About Lynexa')}
    </div>
  </div>
</section>

<section class="sec surface-paper" aria-labelledby="engage-title">
  <div class="shell">
    ${head2('Three ways to work with us.', 'Pick the shape that fits where you are. We will tell you honestly if a different one would serve you better.', { id: 'engage-title' })}
    <div class="models">
      <article class="model model--dark">
        <h3>Full product build</h3>
        <p>Strategy, design, engineering, brand and launch, carried by one team from idea to release.</p>
        <ul class="checklist"><li>${icon.check}Founders building a first product</li><li>${icon.check}Businesses launching a new digital line</li></ul>
      </article>
      <article class="model">
        <h3>Focused project</h3>
        <p>One capability, scoped tightly: product design, a website, a brand identity, a pitch deck or an integration.</p>
        <ul class="checklist"><li>${icon.check}Teams missing one specific skill</li><li>${icon.check}A clear, contained deliverable</li></ul>
      </article>
      <article class="model">
        <h3>Ongoing partnership</h3>
        <p>Part-time product leadership, continued engineering, or a selective venture partnership.</p>
        <ul class="checklist"><li>${icon.check}Teams growing after launch or a raise</li><li>${icon.check}Founders seeking a long-term build partner</li></ul>
      </article>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="faq-title">
  <div class="shell faq-wrap">
    ${head2('Questions founders ask first.', `Something else? Email <a class="link" href="mailto:${SITE.email}">${SITE.email}</a>.`, { id: 'faq-title' })}
    ${faq(HOME_FAQ)}
  </div>
</section>

${ctaBand()}
`;

  return {
    path: '/',
    title: 'Lynexa — Product Design, Engineering & Venture Studio in Lagos',
    description: 'Lynexa is a Lagos product studio that helps founders and businesses turn ideas into working digital products: strategy, UX/UI design, MVP development, websites and launch.',
    body,
    jsonld: [faqLd(HOME_FAQ), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Lynexa', url: 'https://lynexa.co/' }]
  };
}
