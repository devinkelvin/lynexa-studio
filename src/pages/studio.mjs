import { btn, link, img, head2, breadcrumbs, crumbLd, ctaBand, icon, faq, faqLd, founder } from '../lib.mjs';
import { SITE } from '../site.mjs';
import { ventureForm } from './forms.mjs';

export function aboutPage() {
  const trail = [['/', 'Home'], ['/about/', 'About']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <h1>A product studio for people building something new.</h1>
    <p class="lead">Lynexa Innovations Limited is a product design, engineering and venture-building studio based in Lagos. We work with founders and businesses in Nigeria, across Africa and further afield.</p>
  </div>
</section>
<section class="sec sec--tight" aria-label="Studio photography">
  <div class="shell">
    <div class="photo-band">
      <div data-reveal>${img('about-team-lagos', 'Three Nigerian tech professionals in a Lagos office reviewing a product on a laptop together', { sizes: '(min-width: 900px) 58vw, 100vw' })}</div>
      <div data-reveal>${img('about-team-nesa', 'Two Nigerian software engineers pair-programming at a shared desk in a busy tech workspace', { sizes: '(min-width: 900px) 40vw, 100vw' })}</div>
    </div>
    <p class="credit">Photography via Unsplash: Ninthgrid, Lagos (left); NESA by Makers, Nigeria (right). Representative of the people and places we work with.</p>
  </div>
</section>
<section class="sec surface-dark sheet why" aria-labelledby="why-title">
  <div class="shell">
    <div class="why__head">
      <p class="why__kicker">Why Lynexa exists</p>
      <h2 id="why-title">Building a startup should not take five vendors and a year of meetings.</h2>
      <p class="lead">Too many good ideas stall between the pitch and the product. Founders hire a designer, then a developer, then an agency for the website, and spend their runway translating between them.</p>
    </div>
    <div class="why__compare">
      <figure class="why__panel why__panel--before">
        <figcaption><b>The usual way</b><span>Five briefs, five invoices, five ideas of “done”.</span></figcaption>
        <ol class="why__chain">
          <li>Strategy consultant</li><li>UX designer</li><li>Developer</li><li>Web agency</li><li>Pitch designer</li>
        </ol>
        <p class="why__note">The idea gets re-explained at every handoff, and a little of it is lost each time.</p>
      </figure>
      <figure class="why__panel why__panel--after">
        <figcaption><b>With Lynexa</b><span>One accountable team from first conversation to launch.</span></figcaption>
        <div class="why__orbit" data-reveal-ring>
          <svg class="why__ring" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="78"/><circle cx="100" cy="100" r="78" class="why__ring-arc"/></svg>
          <span class="why__core">One<br>team</span>
          <span class="why__step why__step--1">Understand</span>
          <span class="why__step why__step--2">Design</span>
          <span class="why__step why__step--3">Build</span>
          <span class="why__step why__step--4">Launch</span>
        </div>
        <p class="why__note">The person who shaped the idea is still in the room when it ships.</p>
      </figure>
    </div>
  </div>
</section>
<section class="sec surface-paper sheet" aria-labelledby="mv-title">
  <div class="shell">
    <h2 id="mv-title" class="sr-only">Vision and mission</h2>
    <div class="reasons">
      <div><h3>Our vision</h3><p>African-built products that people everywhere choose because they are genuinely better, and a studio that helps make them.</p></div>
      <div><h3>Our mission</h3><p>Help ambitious founders and businesses turn early ideas into credible, working products, and give them what they need to take those products to market.</p></div>
    </div>
  </div>
</section>
<section class="sec" aria-labelledby="approach-title">
  <div class="shell">
    ${head2('How we build', 'A few beliefs that shape every project.', { id: 'approach-title' })}
    <div class="cards">
      <div class="card"><h3>Start with the problem, in plain words</h3><p>If we cannot describe the problem in one sentence a customer would recognise, we are not ready to design.</p></div>
      <div class="card"><h3>Design for real conditions</h3><p>Mid-range phones, unreliable networks, cash habits and first-time users. We design for how people actually live, not for a demo.</p></div>
      <div class="card"><h3>Ship the smallest true version</h3><p>We help founders say no to features early, so the first release is focused enough to learn from.</p></div>
      <div class="card"><h3>Be honest about the stage</h3><p>A prototype is a prototype. We label work truthfully, here and in the decks we make for clients.</p></div>
    </div>
  </div>
</section>
<section class="sec surface-dark sheet" aria-labelledby="diff-title">
  <div class="shell split">
    <div>
      <h2 id="diff-title" style="font-size:var(--fs-h2);max-width:12ch">Committed to early-stage founders</h2>
      <p class="lead" style="margin-top:1.25rem">We started where many of our clients are: an idea, limited capital and a lot to prove. That shapes how we work.</p>
    </div>
    <ul class="checklist" style="font-size:1.05rem;gap:1rem;align-content:center">
      <li>${icon.check}Honest advice on whether to build at all, before any paid work</li>
      <li>${icon.check}Scopes sized to what the next milestone actually needs</li>
      <li>${icon.check}Selective venture partnerships for ideas we believe in</li>
      <li>${icon.check}Everything handed over, so you are never locked in</li>
    </ul>
  </div>
</section>
<section class="sec sheet" id="founder">
  <div class="shell">${founder({ id: 'founder-title', full: true })}</div>
</section>
<section class="sec surface-paper sheet" aria-labelledby="collab-title">
  <div class="shell">
    ${head2('Working with clients and partners', 'What you can expect from the first message onward.', { id: 'collab-title' })}
    <div class="cards cards--3">
      <div class="card"><h3>A reply within two working days</h3><p>With an honest view of whether we are the right team, and if not, who might be.</p></div>
      <div class="card"><h3>Everything in writing</h3><p>Scope, deliverables, timeline and price agreed before work starts. No surprises.</p></div>
      <div class="card"><h3>Regular, visible progress</h3><p>Work you can see and try at each step, and a direct line to the people doing it.</p></div>
    </div>
  </div>
</section>
<section class="sec sec--tight" aria-labelledby="origin-title">
  <div class="shell split">
    <h2 id="origin-title" style="font-size:var(--fs-h2);max-width:12ch">Nigerian roots, global standards.</h2>
    <div style="display:grid;gap:1rem;align-content:end">
      <p class="lead">We are registered in Nigeria (${SITE.rc}) and based in Ikorodu, Lagos. Our products are designed first for African customers, and built to the standards of any market in the world. We work remotely with clients in other countries and time zones.</p>
    </div>
  </div>
</section>
${ctaBand()}`;
  return { path: '/about/', title: 'About Lynexa Innovations', description: 'Lynexa Innovations Limited is a founder-led product design, engineering and venture studio in Lagos, Nigeria. Meet the studio and founder Kelvin Ekuhoho.', body, jsonld: [crumbLd(trail), { '@context': 'https://schema.org', '@type': 'Person', name: SITE.founder, jobTitle: 'Founder & CEO', worksFor: { '@id': 'https://lynexa.co/#organization' }, sameAs: [SITE.linkedin, 'https://kelvinekuhoho.com/'] }] };
}

export function processPage() {
  const trail = [['/', 'Home'], ['/process/', 'Process']];
  const phases = [
    ['Discover', 'Understand the idea before designing it.', 'We unpack the idea, the customer, the market and the risks with you, then agree what the first version must do and what it will deliberately leave out.',
      ['Founder and stakeholder workshops', 'Customer and competitor research', 'Positioning and success measures', 'Scope and phased roadmap'], ['Discovery brief', 'Written scope with timeline and price']],
    ['Design', 'Make it real enough to test.', 'Flows, interfaces and brand come together into a clickable prototype. We put it in front of real people, learn, and refine before engineering begins.',
      ['User flows, including failure paths', 'Interface design for mobile and web', 'Brand identity and design system', 'Usability testing'], ['Tested prototype', 'Design system and handoff specs']],
    ['Build', 'Engineer in short, visible cycles.', 'We build in short cycles and show working software at each step. Payments, identity checks and integrations are tested against real failure cases, not just the happy path.',
      ['Mobile and web engineering', 'Backend, data and integrations', 'Quality assurance across devices', 'Security and performance checks'], ['Working product', 'Code, documentation and deployment']],
    ['Launch', 'Give the product somewhere to land.', 'Release to the app stores or the web, the website and story around it, and a clear plan for what to learn and build next.',
      ['Release management', 'Marketing website', 'Investor materials if you are raising', 'Monitoring and next-phase plan'], ['Live product', 'Launch assets and roadmap']]
  ];
  const FAQ = [
    ['Do we have to go through all four phases?', 'No. If you already have a validated scope or finished designs, we start where you are. We will review what exists before building on it.'],
    ['How involved do we need to be?', 'Expect a few hours a week from the founder or product owner: decisions, feedback and access to customers. Projects move fastest when decisions are quick.'],
    ['How do you keep projects on track?', 'A written scope, regular demos and an agreed process for changes. If something new comes up, we decide together whether it replaces something else, waits for later or extends the timeline.']
  ];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>Four phases. No guesswork.</h1>
      <p class="lead">Every phase ends with something concrete you can see, test or use. You always know what you are paying for and what happens next.</p>
    </div>
    <p class="page-hero__more">${link('/mvp-planner/', 'Estimate a timeline for your product')}</p>
  </div>
</section>
<section class="sec sec--tight" aria-label="Phases">
  <div class="shell">
    ${phases.map(([name, tag, text, acts, outs], i) => `
    <article class="phase">
      <div>
        <p class="phase__n">Phase ${i + 1} of 4</p>
        <h2>${name}</h2>
        <p class="lead" style="margin-top:1rem;font-size:1.15rem">${tag}</p>
      </div>
      <div>
        <p style="font-size:1.1rem">${text}</p>
        <div class="phase__cols" style="margin-top:2rem">
          <div><h3>What happens</h3><ul class="checklist">${acts.map((a) => `<li>${icon.check}${a}</li>`).join('')}</ul></div>
          <div><h3>What you get</h3><ul class="checklist">${outs.map((a) => `<li>${icon.check}${a}</li>`).join('')}</ul></div>
        </div>
      </div>
    </article>`).join('')}
  </div>
</section>
<section class="sec surface-dark sheet" aria-labelledby="start-title">
  <div class="shell">
    ${head2('How a project starts', 'From first message to kick-off.', { id: 'start-title' })}
    <ol class="steps steps--4">
      <li class="step"><span class="step__n" aria-hidden="true">1</span><h3>You get in touch</h3><p>Send a short brief through the project form or email. We reply within two working days.</p></li>
      <li class="step"><span class="step__n" aria-hidden="true">2</span><h3>First conversation</h3><p>A call about the idea, audience and timing. We tell you honestly whether we can help.</p></li>
      <li class="step"><span class="step__n" aria-hidden="true">3</span><h3>Written scope</h3><p>Deliverables, timeline and price on paper. An NDA first if you need one.</p></li>
      <li class="step"><span class="step__n" aria-hidden="true">4</span><h3>Kick-off</h3><p>Agreement signed, team introduced, discovery begins.</p></li>
    </ol>
  </div>
</section>
<section class="sec" aria-labelledby="faq-title">
  <div class="shell faq-block">${head2('Process questions', '', { id: 'faq-title' })}${faq(FAQ)}</div>
</section>
${ctaBand()}`;
  return { path: '/process/', title: 'Our Process: Discover, Design, Build, Launch', description: 'How Lynexa takes a product from idea to launch in four phases, each ending with a concrete output: discovery brief, tested prototype, working product, live launch.', body, jsonld: [crumbLd(trail), faqLd(FAQ)] };
}

export function venturesPage() {
  const trail = [['/', 'Home'], ['/ventures/', 'Ventures']];
  // [title, summary, detail, best for, payment, commitment, form value (null = project brief), icon]
  const models = [
    ['Project engagement', 'You pay for a defined scope; you own everything we make.', 'Clear deliverables, timeline and price. The simplest arrangement and the one most clients use.', 'Founders and businesses with budget for the work.', 'Fixed fee', 'One project', null, '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 11l2 2 4-4M9 17h6"/>'],
    ['Startup enablement', 'We help you get investor-ready on a reduced, focused scope.', 'Discovery, prototype and pitch materials sized to help you raise, so the full build can follow with funding.', 'Strong ideas at pre-seed that need proof before a raise.', 'Reduced fee', 'Until you raise', 'Startup enablement', '<path d="M12 3c3 2 5 5.5 5 9.5L15 16H9l-2-3.5C7 8.5 9 5 12 3z"/><circle cx="12" cy="10" r="1.6"/><path d="M9 16l-2 4 3-1M15 16l2 4-3-1"/>'],
    ['Strategic product partnership', 'Lynexa acts as your long-term product and engineering team.', 'Continuity across releases, with shared planning and a deeper commitment than a single project.', 'Funded teams without an in-house product function yet.', 'Ongoing fee', 'Release after release', 'Product partnership', '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 20c.6-3 2.6-5 5-5s4.4 2 5 5M11 20c.6-3 2.6-5 5-5s4.4 2 5 5"/>'],
    ['Build, operate, transfer', 'We build and run the product, then hand it over.', 'Lynexa operates the product for an agreed period, then transfers it to your team with documentation and support.', 'Organisations launching a new digital product without an existing team.', 'Agreed in writing', 'A set period, then handover', 'Build, operate, transfer', '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>'],
    ['Hybrid cash and equity', 'Part of our fee is paid in cash, part in equity.', 'Lowers the cash cost of the build while aligning us with the company’s long-term success.', 'Founders with some capital and a credible plan to grow.', 'Cash and equity', 'Long term', 'Cash and equity', '<circle cx="12" cy="12" r="8"/><path d="M12 4v16"/><path d="M12 4a8 8 0 0 1 0 16" fill="currentColor" fill-opacity=".25" stroke="none"/>'],
    ['Equity for service', 'Some or all of our work is exchanged for equity.', 'Rare and highly selective. We take on very few of these, and only when we believe strongly in the team and market.', 'Exceptional founders in markets we understand deeply.', 'Equity', 'Long term', 'Equity for service', '<path d="M5 20V10M10 20V6M15 20v-7M20 20V4"/><path d="M3 20h18"/>']
  ];
  const mcard = ([t, s, d, w, pay, commit, val, ic], i) => `
        <li class="vmodel${i === 0 ? ' vmodel--lead' : ''}">
          <div class="vmodel__top">
            <span class="vmodel__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ic}</svg></span>
            ${i === 0 ? '<span class="vmodel__tag">Most clients start here</span>' : ''}${t === 'Equity for service' ? '<span class="vmodel__tag vmodel__tag--amber">Highly selective</span>' : ''}
          </div>
          <h3 class="vmodel__title">${t}</h3>
          <p class="vmodel__sum">${s}</p>
          <p class="vmodel__desc">${d}</p>
          <dl class="vmodel__facts">
            <div><dt>How it is paid</dt><dd>${pay}</dd></div>
            <div><dt>Commitment</dt><dd>${commit}</dd></div>
            <div class="vmodel__best"><dt>Best for</dt><dd>${w}</dd></div>
          </dl>
          ${val
            ? `<a class="vmodel__cta" href="#apply" data-pick-model="${val}"><span>Apply with this model</span>${icon.arrow}</a>`
            : `<a class="vmodel__cta" href="/start-a-project/"><span>Start a project brief</span>${icon.arrow}</a>`}
        </li>`;
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>Ventures and partnerships.</h1>
      <div>
        <p class="lead" style="margin-top:0">Some founders have a promising idea and limited capital. For the right teams, Lynexa can contribute more than delivery: shared risk, long-term partnership and a studio’s worth of product experience.</p>
        <div class="actions">${btn('#apply', 'Submit your idea', 'primary')}${btn('#models', 'See the models', 'secondary')}</div>
      </div>
    </div>
  </div>
</section>
<section class="sec sec--tight surface-paper sheet" aria-labelledby="studio-v-title">
  <div class="shell split">
    <h2 id="studio-v-title" style="font-size:var(--fs-h2);max-width:12ch">We build our own ventures too.</h2>
    <div style="display:grid;gap:1rem;align-content:end;justify-items:start">
      <p class="lead">Zengly, Swiftly and our earlier-stage ventures in property, legal and productivity technology give us first-hand experience of what founders face. That is what we bring to a partnership.</p>
      ${link('/work/', 'See the ventures')}
    </div>
  </div>
</section>
<section class="sec" id="models" aria-labelledby="models-title">
  <div class="shell">
    ${head2('Ways we can work together', 'Each model suits a different stage and level of risk. We will recommend the one that fits, which is often the simplest.', { id: 'models-title' })}
    <div class="vmodels">
      <div class="vmodels__group">
        <div class="vmodels__label"><h3>Fee-based</h3><p>You pay for the work and own the result outright. Most engagements are one of these.</p></div>
        <ul class="vmodels__list" role="list">${models.slice(0, 4).map(mcard).join('')}
        </ul>
      </div>
      <div class="vmodels__group">
        <div class="vmodels__label"><h3>Shared risk</h3><p>Lynexa takes equity in your company. Rare, selective and always agreed in writing with legal advice on both sides.</p></div>
        <ul class="vmodels__list" role="list">${models.slice(4).map((m, i) => mcard(m, i + 4)).join('')}
        </ul>
      </div>
      <p class="vmodels__unsure">Not sure which fits? <a class="link" href="#apply" data-pick-model="Not sure yet">Apply with “Not sure yet”${icon.arrow}</a> and we will recommend one.</p>
    </div>
  </div>
</section>
<section class="sec surface-dark sheet" aria-labelledby="expect-title">
  <div class="shell split">
    <div>
      <h2 id="expect-title" style="font-size:var(--fs-h2);max-width:12ch">What we look for</h2>
      <p class="lead" style="margin-top:1.25rem">Partnerships are a long commitment on both sides. These help us decide.</p>
    </div>
    <ul class="checklist" style="font-size:1.05rem;gap:1rem;align-content:center">
      <li>${icon.check}A real problem you can describe in one sentence</li>
      <li>${icon.check}Founders who know the market from the inside</li>
      <li>${icon.check}A product where design and engineering make the difference</li>
      <li>${icon.check}Willingness to put agreements in writing and share information openly</li>
    </ul>
  </div>
</section>
<section class="sec" aria-labelledby="how-v-title">
  <div class="shell">
    ${head2('How applications work', '', { id: 'how-v-title', cls: 'sec-head--stack' })}
    <ol class="steps steps--4">
      <li class="step"><span class="step__n" aria-hidden="true">1</span><h3>Submit your idea</h3><p>A short application. No deck needed at this stage.</p></li>
      <li class="step"><span class="step__n" aria-hidden="true">2</span><h3>Initial review</h3><p>We read every submission and reply, including when it is not a fit.</p></li>
      <li class="step"><span class="step__n" aria-hidden="true">3</span><h3>Conversations</h3><p>For promising ideas, calls with the founders and a closer look at the market.</p></li>
      <li class="step"><span class="step__n" aria-hidden="true">4</span><h3>Written terms</h3><p>If we both want to proceed, we agree terms in writing with legal advice on both sides.</p></li>
    </ol>
    <div class="note" style="margin-top:2.5rem;max-width:52rem"><b>Please note:</b> Lynexa venture partnerships are not a funding programme or an offer of investment. Submitting an idea does not create any obligation on either side. Any partnership, equity or payment arrangement applies only once both parties have signed a written agreement. We recommend you take independent legal and financial advice before agreeing to any equity arrangement.</div>
  </div>
</section>
<section class="sec surface-paper sheet" id="apply" aria-labelledby="apply-title">
  <div class="shell contact-grid">
    <div>
      <h2 id="apply-title" style="font-size:var(--fs-h2);max-width:12ch">Submit your startup idea</h2>
      <p class="lead" style="margin-top:1.25rem">Tell us what you are building and what kind of help you are looking for. We treat submissions as confidential and are happy to sign an NDA before deeper conversations.</p>
    </div>
    ${ventureForm()}
  </div>
</section>`;
  return { path: '/ventures/', title: 'Venture Building & Startup Partnerships', description: 'How Lynexa partners with founders: project engagements, startup enablement, hybrid cash-and-equity, equity-for-service and build-operate-transfer. Submit your startup idea.', body, jsonld: [crumbLd(trail)] };
}
