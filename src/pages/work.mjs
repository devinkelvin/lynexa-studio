import { btn, link, img, head2, breadcrumbs, crumbLd, ctaBand, status, icon } from '../lib.mjs';
import { PROJECTS, CATEGORIES } from '../content/work.mjs';

const ZENGLY_SITE = 'https://zenglypay.com/';

export function workIndex() {
  const trail = [['/', 'Home'], ['/work/', 'Work']];
  const used = CATEGORIES.filter(([k]) => PROJECTS.some((p) => p.cats.includes(k)));
  const card = (p) => {
    const media = p.slug === 'zengly'
      ? `<span class="work-feature__media" style="aspect-ratio:16/11">${img('zengly-friends', '', { cls: 'bg', sizes: '(min-width: 900px) 45vw, 100vw' })}<span class="work-feature__screens">${img('zengly-home-dark', '', { sizes: '14vw' })}${img('zengly-split-bill', '', { sizes: '14vw' })}${img('zengly-vaniti-leaderboard', '', { sizes: '14vw' })}</span></span>`
      : p.slug === 'swiftly'
        ? `<span class="work-feature__media swiftly-media" style="aspect-ratio:16/11">${img('lagos-collaboration', '', { cls: 'bg', sizes: '(min-width: 900px) 45vw, 100vw' })}${img('swiftly-logo', 'Swiftly', { cls: 'logo', sizes: '320px' })}</span>`
        : '';
    const inner = `${media}<div class="work-card__body">${status(...p.status)}<h2>${p.name}</h2><p class="muted" style="font-size:.95rem">${p.sector}</p><p>${p.summary}</p>${p.page ? `<span class="link">View project${icon.arrow}</span>` : '<p class="muted" style="font-size:.9rem">A detailed case study will follow when there is more to share publicly.</p>'}</div>`;
    return `<li data-work-item data-cats="${p.cats.join(' ')}" class="work-card${p.page ? '' : ' work-card--text'}">${p.page ? `<a href="/work/${p.slug}/">${inner}</a>` : `<div>${inner}</div>`}</li>`;
  };
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>Work, at every stage.</h1>
      <p class="lead">Products we have designed and built for founders, and ventures we are developing in the studio. Each one is labelled with where it actually stands today.</p>
    </div>
  </div>
</section>
<section class="sec sec--tight surface-dark" aria-labelledby="list-title">
  <div class="shell">
    <h2 id="list-title" class="sr-only">Projects</h2>
    <div class="filter" data-filter role="group" aria-label="Filter projects by category">
      <button type="button" data-cat="all" aria-pressed="true">All<span class="count" aria-hidden="true">${PROJECTS.length}</span></button>
      ${used.map(([k, l]) => `<button type="button" data-cat="${k}" aria-pressed="false">${l}<span class="count" aria-hidden="true">${PROJECTS.filter((p) => p.cats.includes(k)).length}</span></button>`).join('')}
    </div>
    <p class="sr-only" aria-live="polite" data-filter-status></p>
    <ul class="work-list">${PROJECTS.map(card).join('')}</ul>
    <div class="legend">
      <p>${status('progress', 'In progress')} Designed and in development or pre-launch</p>
      <p>${status('concept', 'Concept')} Proposed or early-stage venture</p>
    </div>
  </div>
</section>
<section class="sec sec--tight" aria-labelledby="sites-title">
  <div class="shell split">
    <h2 id="sites-title" style="font-size:var(--fs-h2);max-width:12ch">Looking for websites?</h2>
    <div style="display:grid;gap:1.25rem;justify-items:start;align-content:end"><p class="lead">See the marketing and product sites we have designed and engineered, separately from the products themselves.</p>${btn('/websites/', 'Websites we’ve designed', 'secondary')}</div>
  </div>
</section>
${ctaBand()}`;
  return { path: '/work/', title: 'Work & Case Studies', description: 'Selected Lynexa work: Zengly social-finance app, Swiftly mobility venture and studio ventures in property, legal and productivity technology, each labelled with its real status.', body, jsonld: [crumbLd(trail)] };
}

const chapter = (title, html) => `<div class="chapter"><h2>${title}</h2><div class="chapter__body">${html}</div></div>`;

export function zenglyPage() {
  const trail = [['/', 'Home'], ['/work/', 'Work'], ['/work/zengly/', 'Zengly']];
  const body = `
<section class="page-hero case-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <div>
        ${img('zengly-logo', 'Zengly', { sizes: '160px', cls: '' }).replace('<img ', '<img style="width:160px;margin-bottom:2rem" ')}
        <h1>Money that moves the way friends do.</h1>
      </div>
      <div style="display:grid;gap:1.25rem;justify-items:start">
        ${status('progress', 'App in pre-launch')}
        <p class="lead" style="margin:0">Zengly is a social-finance app for young Nigerians. It treats money the way people here actually use it: shared, celebrated and planned together. Lynexa shaped the product and leads its design, brand and marketing site.</p>
      </div>
    </div>
    <dl class="facts">
      <div><dt>Sector</dt><dd>Fintech, social finance</dd></div>
      <div><dt>Audience</dt><dd>Gen Z and millennial Nigerians</dd></div>
      <div><dt>Platforms</dt><dd>iOS and Android app, marketing website</dd></div>
      <div><dt>Status</dt><dd>App in pre-launch; marketing site live</dd></div>
    </dl>
    <div class="case-hero__media" data-reveal>${img('zengly-friends', 'Four friends at a restaurant table, each using their phone', { sizes: '(min-width: 1320px) 1320px, 100vw' }).replace('<img ', '<img style="width:100%;aspect-ratio:21/9;object-fit:cover" ')}</div>
    <p class="credit">Photo: BlackBoy Joy via Pexels.</p>
  </div>
</section>

<section class="sec" aria-label="Case study">
  <div class="shell">
    ${chapter('The context', `<p>In Nigeria, money is social. People contribute to celebrations, spray cash on the dance floor at weddings, split the bill after dinner and chip in for each other’s data. Most banking apps still treat money as something one person does alone, in a tab labelled “Transfer”.</p>`)}
    ${chapter('The opportunity', `<p>A product that makes the social side of money feel natural, without being casual about security. Zengly had to work as a dependable everyday wallet <strong>and</strong> carry the energy of a celebration, and never feel like a generic digital bank, a payment gateway or a crypto product.</p>`)}
    ${chapter('Who it’s for', `<p>Gen Z and millennial Nigerians who pay for airtime, data and electricity on their phones, organise group costs on WhatsApp and show up for friends’ events. Many are comfortable with fintech apps; few feel that any of them understand how they live.</p>`)}
    ${chapter('Product strategy', `<p>We organised the product around four things people do with money together: <strong>move</strong>, <strong>share</strong>, <strong>celebrate</strong> and <strong>plan</strong>. The first version focuses on everyday essentials (transfers, airtime, data, electricity, airtime-to-cash, split bills and referrals) plus Vaniti, the feature that gives Zengly its personality.</p><p>Later modules, such as voice banking, peer-to-peer lending and crowdfunding, are deliberately held back and shown only as planned. Launching with fewer, better features protects trust.</p>`)}
  </div>
</section>

<section class="sec surface-dark" aria-labelledby="pillars-title">
  <div class="shell">
    <h2 id="pillars-title" class="sr-only">Product architecture</h2>
    <div class="pillars4">
      <div><b>Move</b><p>Transfers, airtime, data and bill payments, fast and dependable.</p></div>
      <div><b>Share</b><p>Split bills and group costs without awkward follow-ups.</p></div>
      <div><b>Celebrate</b><p>Vaniti: spraying money at events, live and together.</p></div>
      <div><b>Plan</b><p>Future modules for saving and collective goals, shown as planned.</p></div>
    </div>
  </div>
</section>

<section class="sec" aria-label="Design">
  <div class="shell">
    ${chapter('Design direction', `<p>We built the brand on a warm gold accent and a six-colour palette with names drawn from earth and spice tones, and ruled out the blue that most fintech apps default to. Plus Jakarta Sans gives the interface a confident, friendly voice in both light and dark modes.</p><p>The aim: fintech-grade clarity for balances and transactions, and real warmth everywhere people are doing something together.</p>`)}
    <div class="duo" style="margin-block:1rem 2rem">
      <figure>${img('zengly-podium', 'Zengly campaign artwork of a gold podium with places one, two and three', { sizes: '(min-width: 700px) 50vw, 100vw' }).replace('<img ', '<img style="background:var(--violet-wash)" ')}<figcaption class="credit">Campaign artwork for Vaniti’s leaderboard.</figcaption></figure>
      <figure>${img('zengly-sign', 'Zengly campaign artwork of hands holding a blank yellow sign', { sizes: '(min-width: 700px) 50vw, 100vw' }).replace('<img ', '<img style="background:#efe1c7" ')}<figcaption class="credit">Campaign artwork for the marketing site.</figcaption></figure>
    </div>
    ${chapter('Experience decisions', `<p><strong>Vaniti feels like the room, not a form.</strong> Spraying is fast, visual and social, with a live leaderboard, while the money underneath follows the same confirmations as any transfer.</p><p><strong>Failure states are designed, not left to defaults.</strong> Verification levels, error messages and PIN recovery each have their own screens, written in plain language that tells people what to do next.</p><p><strong>Security is visible without being scary.</strong> Balances can be hidden, verification is explained as unlocking more, not as a hurdle.</p>`)}
  </div>
</section>

<section class="sec surface-dark" aria-labelledby="screens-title">
  <div class="shell">
    ${head2('Selected screens', 'Interface designs from the Zengly app. Shown as designed for pre-launch.', { id: 'screens-title' })}
    <div class="gallery">
      <figure>${img('zengly-home-dark', 'Zengly home screen in dark mode with balance, quick actions and recent transactions', { sizes: '(min-width: 900px) 22vw, 45vw' })}<figcaption>Home, dark mode</figcaption></figure>
      <figure>${img('zengly-home-light', 'Zengly home screen in light mode', { sizes: '(min-width: 900px) 22vw, 45vw' })}<figcaption>Home, light mode</figcaption></figure>
      <figure>${img('zengly-vaniti-leaderboard', 'Vaniti leaderboard with a podium of top sprayers', { sizes: '(min-width: 900px) 22vw, 45vw' })}<figcaption>Vaniti leaderboard</figcaption></figure>
      <figure>${img('zengly-menu', 'Zengly services menu', { sizes: '(min-width: 900px) 22vw, 45vw' })}<figcaption>Services menu</figcaption></figure>
      <figure>${img('zengly-split-bill', 'Split bill screen with bill history', { sizes: '(min-width: 900px) 22vw, 45vw' })}<figcaption>Split bill</figcaption></figure>
      <figure>${img('zengly-vaniti-sprayers', 'Vaniti community screen listing sprayers', { sizes: '(min-width: 900px) 22vw, 45vw' })}<figcaption>Vaniti community</figcaption></figure>
      <figure>${img('zengly-vaniti-intro', 'Vaniti feature introduction screen', { sizes: '(min-width: 900px) 22vw, 45vw' })}<figcaption>Vaniti introduction</figcaption></figure>
    </div>
  </div>
</section>

<section class="sec" aria-label="Engineering and status">
  <div class="shell">
    ${chapter('Engineering contribution', `<p>Design and build are handled by the same team. We produced detailed Flutter handoff specifications covering states, animations and edge cases, and maintain a documented screen library so the mobile build matches the design.</p><p>We also designed and built the marketing website, with scroll-driven motion and an early-access sign-up, along with the business requirements, execution plan and investor materials behind the product.</p>`)}
    ${chapter('Challenges', `<p><strong>Making celebration feel real.</strong> Spraying money is loud, physical and joyful. Translating that to a phone without it feeling like a game took several rounds of prototyping.</p><p><strong>Earning trust early.</strong> Young users are quick to try apps and quick to leave. Clear verification, honest error messages and a calm visual system carry a lot of that work.</p>`)}
    ${chapter('Where it stands', `<p>The Zengly app is in pre-launch, with the core experience designed and in development. The marketing site is live and collecting early-access sign-ups. We are not publishing usage or financial figures until the product is publicly available.</p><p>${link(ZENGLY_SITE, 'Visit the Zengly website')}</p>`)}
  </div>
</section>

<section class="sec sec--tight surface-paper" aria-labelledby="next-title">
  <div class="shell split">
    <h2 id="next-title" style="font-size:var(--fs-h2)">Next project</h2>
    <a class="card" href="/work/swiftly/" style="text-decoration:none;display:grid;gap:.8rem;justify-items:start">${status('concept', 'Proposed venture, internal prototype')}<h3 style="font-size:1.8rem;margin:0">Swiftly</h3><p>How Africa moves and gathers.</p><span class="link">View project${icon.arrow}</span></a>
  </div>
</section>
${ctaBand({ title: 'Building something people will use with friends?' })}`;
  return {
    path: '/work/zengly/', title: 'Zengly: Social-Finance App Case Study',
    description: 'How Lynexa shaped and designed Zengly, a pre-launch social-finance app for young Nigerians: product strategy, UX/UI, brand, design system and marketing site.',
    body, jsonld: [crumbLd(trail), { '@context': 'https://schema.org', '@type': 'CreativeWork', name: 'Zengly case study', about: 'Zengly social-finance app', creator: { '@id': 'https://lynexa.co/#organization' }, url: 'https://lynexa.co/work/zengly/' }]
  };
}

export function swiftlyPage() {
  const trail = [['/', 'Home'], ['/work/', 'Work'], ['/work/swiftly/', 'Swiftly']];
  const body = `
<section class="page-hero case-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>How Africa moves and gathers.</h1>
      <div style="display:grid;gap:1.25rem;justify-items:start">
        ${status('concept', 'Proposed venture, internal prototype')}
        <p class="lead" style="margin:0">Swiftly is a Lynexa studio venture: a proposed platform that brings intercity travel, tickets and experiences into one place. It has not launched. This page shows the thinking and prototypes behind it.</p>
      </div>
    </div>
    <dl class="facts">
      <div><dt>Sector</dt><dd>Mobility, experience commerce</dd></div>
      <div><dt>Market</dt><dd>Nigeria first, then wider Africa</dd></div>
      <div><dt>Lynexa’s role</dt><dd>Venture strategy, specification, prototypes</dd></div>
      <div><dt>Status</dt><dd>Concept with internal prototype</dd></div>
    </dl>
    <div class="case-hero__media swiftly-media" style="aspect-ratio:21/9;position:relative" data-reveal>${img('lagos-collaboration', '', { cls: 'bg', sizes: '100vw' }).replace('class="bg"', 'class="bg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"')}${img('swiftly-logo', 'Swiftly', { cls: 'logo', sizes: '320px' })}</div>
    <p class="credit">Photo: Ninthgrid via Pexels.</p>
  </div>
</section>
<section class="sec" aria-label="Venture overview">
  <div class="shell">
    ${chapter('The problem', `<p>Planning a trip across Nigeria, or to an event in another city, still means comparing bus operators by phone or social media, guessing at prices and buying tickets in several places. Information is scattered and trust is low.</p>`)}
    ${chapter('The idea', `<p>One place to compare travel options, book and pay, and connect the journey to the event or experience at the other end. Swiftly is designed around how people actually travel and gather here, not around imported ride-hailing patterns.</p>`)}
    ${chapter('What Lynexa has produced', `<ul class="checklist">${['A full product specification and phased roadmap', 'A fare comparison model researched with real Nigerian operator fares', 'An agent-assisted build architecture for the product', 'A marketing website prototype used internally'].map((x) => `<li>${icon.check}${x}</li>`).join('')}</ul>`)}
    ${chapter('What happens next', `<p>Swiftly is being developed as a studio venture. We are open to conversations with transport operators, event organisers and partners who want to help shape it.</p><div class="note">Swiftly is not a live product, and nothing on this page should be read as a commercial offer or launch date.</div><p>${link('/contact/', 'Talk to us about Swiftly')}</p>`)}
  </div>
</section>
<section class="sec sec--tight surface-paper" aria-labelledby="next-title">
  <div class="shell split">
    <h2 id="next-title" style="font-size:var(--fs-h2)">Next project</h2>
    <a class="card" href="/work/zengly/" style="text-decoration:none;display:grid;gap:.8rem;justify-items:start">${status('progress', 'App in pre-launch')}<h3 style="font-size:1.8rem;margin:0">Zengly</h3><p>Money that moves the way friends do.</p><span class="link">View case study${icon.arrow}</span></a>
  </div>
</section>
${ctaBand({ title: 'Have a venture idea of your own?', primary: ['/ventures/', 'Explore venture partnerships'], secondary: ['/start-a-project/', 'Start a project'] })}`;
  return { path: '/work/swiftly/', title: 'Swiftly: Mobility & Experience Commerce Venture', description: 'Swiftly is a proposed Lynexa studio venture for travel, tickets and experiences in Nigeria. See the strategy, specification and prototypes behind it.', body, jsonld: [crumbLd(trail)] };
}

export function websitesPage() {
  const trail = [['/', 'Home'], ['/websites/', 'Websites']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>Websites we’ve designed and built.</h1>
      <p class="lead">For many companies the website is the first product anyone touches. We design and engineer marketing and product sites with the same care as the apps behind them.</p>
    </div>
  </div>
</section>
<section class="sec sec--tight" aria-label="Websites">
  <div class="shell">
    <article class="site-card">
      <a class="site-card__media" href="${ZENGLY_SITE}" target="_blank" rel="noopener noreferrer" aria-label="Zengly website (opens in a new tab)" style="background:#efe1c7">${img('zengly-sign', 'Zengly campaign artwork used on the marketing site', { sizes: '(min-width: 900px) 55vw, 100vw' })}</a>
      <div class="site-card__body">
        ${status('live', 'Live')}
        <h2>Zengly</h2>
        <p>Marketing site for a Nigerian social-finance app: product story, feature architecture, scroll-driven motion and early-access sign-up.</p>
        <ul class="tags"><li>Messaging</li><li>Web design</li><li>Front-end engineering</li><li>Motion</li></ul>
        ${link(ZENGLY_SITE, 'Visit zenglypay.com')}
      </div>
    </article>
    <article class="site-card">
      <div class="site-card__media swiftly-media">${img('lagos-collaboration', '', { cls: 'bg', sizes: '(min-width: 900px) 55vw, 100vw' }).replace('class="bg"', 'class="bg" style="position:absolute;inset:0;opacity:.28"')}${img('swiftly-logo', 'Swiftly', { cls: 'logo', sizes: '320px' })}</div>
      <div class="site-card__body">
        ${status('concept', 'Internal prototype')}
        <h2>Swiftly</h2>
        <p>Marketing site prototype for a proposed mobility and experience-commerce venture, including a fare comparison module. Not publicly launched.</p>
        <ul class="tags"><li>Product specification</li><li>Web design</li><li>Fare comparison</li></ul>
        ${link('/work/swiftly/', 'About Swiftly')}
      </div>
    </article>
    <article class="site-card">
      <div class="site-card__media" style="background:var(--graphite)"><span style="color:var(--bone);font-size:clamp(2.2rem,6vw,4.5rem);font-weight:750;letter-spacing:-.05em;display:flex;gap:1rem;align-items:center"><img src="/assets/img/lynexa-mark-64.png" width="64" height="64" alt="">lynexa.co</span></div>
      <div class="site-card__body">
        ${status('live', 'Live')}
        <h2>Lynexa</h2>
        <p>The site you are on: a fast, accessible multi-page studio site, hand-built without a front-end framework, with structured data and working enquiry forms.</p>
        <ul class="tags"><li>Information architecture</li><li>Design system</li><li>Static site engineering</li><li>SEO</li></ul>
      </div>
    </article>
  </div>
</section>
<section class="sec surface-paper" aria-labelledby="svc-title">
  <div class="shell">
    ${head2('What every website includes', 'Each project is scoped to what the site needs to do. These are our defaults.', { id: 'svc-title' })}
    <div class="cards cards--3">
      <div class="card"><h3>Messaging first</h3><p>What to say, to whom and in what order, settled before the design starts.</p></div>
      <div class="card"><h3>Mobile treated as equal</h3><p>Every page designed and tested at phone widths, not just squeezed down.</p></div>
      <div class="card"><h3>Speed and accessibility</h3><p>Optimised images and fonts, minimal JavaScript, contrast and keyboard access checked.</p></div>
      <div class="card"><h3>Search foundations</h3><p>Metadata, structured data, sitemaps and redirects for any old pages.</p></div>
      <div class="card"><h3>Working lead capture</h3><p>Forms that actually reach your inbox, with spam protection.</p></div>
      <div class="card"><h3>Clean handoff</h3><p>Hosting set up on your accounts, with notes on how to edit and maintain the site.</p></div>
    </div>
    <p style="margin-top:2rem">${link('/services/web-design-development/', 'About our web design and development service')}</p>
  </div>
</section>
${ctaBand({ title: 'Have a site that deserves better?', primary: ['/start-a-project/?service=web-design-development', 'Start a website project'] })}`;
  return { path: '/websites/', title: 'Websites We’ve Designed and Built', description: 'Marketing and product websites designed and engineered by Lynexa, including Zengly and the Swiftly prototype. Fast, accessible, mobile-first sites.', body, jsonld: [crumbLd(trail)] };
}
