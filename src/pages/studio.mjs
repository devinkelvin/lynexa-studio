import { btn, link, img, head2, breadcrumbs, crumbLd, ctaBand, icon, faq, faqLd } from '../lib.mjs';
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
      <div data-reveal>${img('lagos-strategy-session', 'Two people in Lagos working together on a laptop', { sizes: '(min-width: 900px) 58vw, 100vw' })}</div>
      <div data-reveal>${img('lagos-professionals', 'Professionals working with laptops in a Lagos office', { sizes: '(min-width: 900px) 40vw, 100vw' })}</div>
    </div>
    <p class="credit">Photography: Ninthgrid via Pexels, Lagos.</p>
  </div>
</section>
<section class="sec" aria-labelledby="why-title">
  <div class="shell split">
    <h2 id="why-title" style="font-size:1rem;letter-spacing:0;color:var(--stone);font-weight:600">Why Lynexa exists</h2>
    <div style="display:grid;gap:1.5rem">
      <p class="statement">Building a startup should not take five vendors, a year of meetings and a product nobody can use.</p>
      <p class="lead">Too many good ideas stall between the pitch and the product. Founders hire a designer, then a developer, then an agency for the website, and spend their runway translating between them. Lynexa puts strategy, design, engineering and launch in one accountable team, so the idea survives the journey.</p>
    </div>
  </div>
</section>
<section class="sec surface-paper" aria-labelledby="mv-title">
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
<section class="sec surface-dark" aria-labelledby="diff-title">
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
<section class="sec" id="founder" aria-labelledby="founder-title">
  <div class="shell founder">
    <div class="founder__photo" data-reveal>${img('kelvin-ekuhoho', 'Portrait of Kelvin Ekuhoho', { sizes: '(min-width: 900px) 40vw, 100vw' })}</div>
    <div class="founder__body">
      <h2 id="founder-title">Kelvin Ekuhoho</h2>
      <p class="muted" style="margin-top:-.5rem">Founder &amp; CEO, Lead Product Designer</p>
      <div class="bio">
        <p>Kelvin is a product designer, technology entrepreneur and venture builder working where finance, design and software meet. He has more than seven years of experience across financial services, enterprise technology and product development.</p>
        <p>Before founding Lynexa, he worked with financial institutions including Sterling Bank and Polaris Bank, contributing to digital banking platforms, electronic payment systems, lending products and customer-facing financial experiences.</p>
        <details class="expand">
          <summary>${icon.plus}Read the full biography</summary>
          <div>
            <p>That work gave him a grounding in payment infrastructure, banking operations, regulatory requirements and the trust that technology for regulated industries has to earn.</p>
            <p>He has also led product design in the energy and infrastructure technology sector: enterprise platforms, operational dashboards, customer applications and data tools that simplify complex workflows. His practice spans product strategy, user research, systems thinking, interaction design, design systems, web development and cross-functional delivery.</p>
            <p>As founder and CEO of Lynexa, Kelvin leads a multidisciplinary team across product design, software engineering and business development, guiding products from research and concept through architecture, MVP, market positioning and commercial readiness. Under his leadership Lynexa is developing ventures across fintech, mobility, legal technology, property technology and digital productivity, including Zengly and Swiftly.</p>
            <p>His approach combines the discipline of financial systems with human-centred design and a startup operator’s commercial sense, with a particular focus on products that respond to real African behaviour while meeting the standards investors and institutions expect.</p>
          </div>
        </details>
      </div>
      ${link(SITE.linkedin, 'Kelvin on LinkedIn')}
    </div>
  </div>
</section>
<section class="sec surface-paper" aria-labelledby="collab-title">
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
  return { path: '/about/', title: 'About Lynexa Innovations', description: 'Lynexa Innovations Limited is a founder-led product design, engineering and venture studio in Lagos, Nigeria. Meet the studio and founder Kelvin Ekuhoho.', body, jsonld: [crumbLd(trail), { '@context': 'https://schema.org', '@type': 'Person', name: SITE.founder, jobTitle: 'Founder & CEO', worksFor: { '@id': 'https://lynexa.co/#organization' }, sameAs: [SITE.linkedin], image: 'https://lynexa.co/assets/img/kelvin-ekuhoho-768.webp' }] };
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
<section class="sec surface-dark" aria-labelledby="start-title">
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
  <div class="shell faq-wrap">${head2('Process questions', '', { id: 'faq-title' })}${faq(FAQ)}</div>
</section>
${ctaBand()}`;
  return { path: '/process/', title: 'Our Process: Discover, Design, Build, Launch', description: 'How Lynexa takes a product from idea to launch in four phases, each ending with a concrete output: discovery brief, tested prototype, working product, live launch.', body, jsonld: [crumbLd(trail), faqLd(FAQ)] };
}

export function venturesPage() {
  const trail = [['/', 'Home'], ['/ventures/', 'Ventures']];
  const models = [
    ['Project engagement', 'You pay for a defined scope; you own everything we make.', 'The simplest arrangement and the one most clients use. Clear deliverables, timeline and price.', 'Founders and businesses with budget for the work.'],
    ['Startup enablement', 'We help you get investor-ready on a reduced, focused scope.', 'Discovery, prototype and pitch materials sized to help you raise, so the full build can follow with funding.', 'Strong ideas at pre-seed that need proof before a raise.'],
    ['Strategic product partnership', 'Lynexa acts as your long-term product and engineering team.', 'Continuity across releases, with shared planning and a deeper commitment than a single project.', 'Funded teams without an in-house product function yet.'],
    ['Hybrid cash and equity', 'Part of our fee is paid in cash, part in equity.', 'Lowers the cash cost of the build while aligning us with the company’s long-term success.', 'Founders with some capital and a credible plan to grow.'],
    ['Equity for service', 'Some or all of our work is exchanged for equity.', 'Rare and highly selective. We take on very few of these, and only when we believe strongly in the team and market.', 'Exceptional founders in markets we understand deeply.'],
    ['Build, operate, transfer', 'We build and run the product, then hand it over.', 'Lynexa builds and operates the product for an agreed period, then transfers it to your team with documentation and support.', 'Organisations launching a new digital product without an existing team.']
  ];
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
<section class="sec sec--tight surface-paper" aria-labelledby="studio-v-title">
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
    <div class="cards cards--3">
      ${models.map(([t, s, d, w]) => `<div class="card" style="display:grid;gap:.75rem;align-content:start"><h3 style="margin:0">${t}</h3><p style="color:var(--ink);font-weight:600">${s}</p><p>${d}</p><p style="font-size:.9rem;padding-top:.75rem;border-top:1px solid var(--line)"><b style="color:var(--ink)">Best for:</b> ${w}</p></div>`).join('')}
    </div>
  </div>
</section>
<section class="sec surface-dark" aria-labelledby="expect-title">
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
<section class="sec surface-paper" id="apply" aria-labelledby="apply-title">
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
