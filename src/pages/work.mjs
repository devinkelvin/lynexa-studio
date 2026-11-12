import { btn, link, img, phone, browser, head2, breadcrumbs, crumbLd, ctaBand, status, icon } from '../lib.mjs';
import { SITE } from '../site.mjs';
import { PROJECTS, CATEGORIES, VENTURE_MOCK } from '../content/work.mjs';

const ZENGLY_SITE = 'https://zenglypay.com/';

export function workIndex() {
  const trail = [['/', 'Home'], ['/work/', 'Work']];
  const used = CATEGORIES.filter(([k]) => PROJECTS.some((p) => p.cats.includes(k)));
  const media = (p) => {
    if (p.slug === 'zengly') return `<span class="showcase__media showcase__media--zengly"><span class="showcase__phones">${phone('zengly-home-dark', '', { sizes: '12vw' })}${phone('zengly-split-bill', '', { sizes: '12vw' })}</span></span>`;
    if (p.slug === 'swiftly') return `<span class="showcase__media showcase__media--cover">${img('mock-swiftly', VENTURE_MOCK.swiftly.alt, { sizes: '(min-width: 900px) 45vw, 92vw' })}<small class="photo-credit">Concept design</small></span>`;
    if (p.slug === 'createmycvnow') return `<span class="showcase__media showcase__media--site">${browser('site-cv-desktop', 'CreateMyCVNow homepage', 'CreateMyCVNow', { sizes: '(min-width: 900px) 40vw, 90vw' })}</span>`;
    if (p.slug === 'kelvinekuhoho') return `<span class="showcase__media showcase__media--site showcase__media--night">${browser('site-kelvin-desktop', 'Kelvin Ekuhoho portfolio homepage', 'kelvinekuhoho.com', { sizes: '(min-width: 900px) 40vw, 90vw' })}</span>`;
    if (VENTURE_MOCK[p.slug]) return `<span class="showcase__media showcase__media--cover">${img('mock-' + p.slug, VENTURE_MOCK[p.slug].alt, { sizes: '(min-width: 900px) 45vw, 92vw' })}<small class="photo-credit">Concept design</small></span>`;
    return '';
  };
  const card = (p) => {
    const m = media(p);
    const action = p.page ? `<span class="link">View case study${icon.arrow}</span>` : p.href ? `<span class="link">Visit the live product${icon.external}</span>` : '<p class="muted" style="font-size:.9rem">A detailed case study will follow when there is more to share publicly.</p>';
    const inner = `${m}<div class="work-card__body">${status(...p.status)}<h2>${p.name}</h2><p class="muted" style="font-size:.95rem">${p.sector}</p><p>${p.summary}</p>${action}</div>`;
    const wrap = p.page ? `<a href="/work/${p.slug}/" data-cursor-text="View">${inner}</a>` : p.href ? `<a href="${p.href}" target="_blank" rel="noopener noreferrer" data-cursor-text="Visit">${inner}<span class="sr-only"> (opens in a new tab)</span></a>` : `<div>${inner}</div>`;
    return `<li data-work-item data-cats="${p.cats.join(' ')}" class="work-card${m ? '' : ' work-card--text'}">${wrap}</li>`;
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
<section class="sec surface-dark sheet" aria-labelledby="list-title">
  <div class="shell">
    <h2 id="list-title" class="sr-only">Projects</h2>
    ${PROJECTS.length >= 8 ? `<div class="filter" data-filter role="group" aria-label="Filter projects by category">
      <button type="button" data-cat="all" aria-pressed="true">All<span class="count" aria-hidden="true">${PROJECTS.length}</span></button>
      ${used.map(([k, l]) => `<button type="button" data-cat="${k}" aria-pressed="false">${l}<span class="count" aria-hidden="true">${PROJECTS.filter((p) => p.cats.includes(k)).length}</span></button>`).join('')}
    </div>
    <p class="sr-only" aria-live="polite" data-filter-status></p>` : ''}
    <ul class="work-list">${PROJECTS.map(card).join('')}</ul>
    <div class="legend">
      <p>${status('live', 'Live')} Available to use today</p>
      <p>${status('progress', 'In progress')} Designed and in development or pre-launch</p>
      <p>${status('concept', 'Concept')} Proposed or early-stage venture</p>
    </div>
  </div>
</section>
<section class="sec sheet" aria-labelledby="sites-title">
  <div class="shell split">
    <h2 id="sites-title" style="font-size:var(--fs-h2);max-width:12ch">Looking for websites?</h2>
    <div style="display:grid;gap:1.25rem;justify-items:start;align-content:end"><p class="lead">See the marketing and product sites we have designed and engineered, separately from the products themselves.</p>${btn('/websites/', 'Websites we’ve built', 'secondary')}</div>
  </div>
</section>
${ctaBand()}`;
  return { path: '/work/', title: 'Work & Case Studies', description: 'Lynexa work: the Zengly social-finance app (launching December 2026), CreateMyCVNow, Swiftly and studio ventures, each labelled with its real status.', body, jsonld: [crumbLd(trail)] };
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
        ${status('progress', 'App launching December 2026')} ${status('live', 'Website live at zenglypay.com')}
        <p class="lead" style="margin:0">Zengly is a social-finance app for young Nigerians. It treats money the way people here actually use it: shared, celebrated and planned together. Lynexa shaped the product and leads its design, brand and marketing site.</p>
      </div>
    </div>
    <dl class="facts">
      <div><dt>Sector</dt><dd>Fintech, social finance</dd></div>
      <div><dt>Audience</dt><dd>Gen Z and millennial Nigerians</dd></div>
      <div><dt>Platforms</dt><dd>iOS and Android app, marketing website</dd></div>
      <div><dt>Status</dt><dd>App launching December 2026 on iOS and Android; website live at <a href="https://zenglypay.com/" target="_blank" rel="noopener noreferrer">zenglypay.com<span class="sr-only"> (opens in a new tab)</span></a></dd></div>
    </dl>
    <div class="case-hero__media zstage" data-reveal>
      ${phone('zengly-fig-nearby', 'Vaniti finding nearby guests to spray, with three guests on a radar', { sizes: '(min-width: 900px) 220px, 30vw', cls: 'zstage__p zstage__p--l' })}
      ${phone('zengly-fig-gift', 'Vaniti sending a black money bag gift to a guest', { sizes: '(min-width: 900px) 260px, 36vw', cls: 'zstage__p zstage__p--c', eager: true })}
      ${phone('zengly-fig-sent', 'Vaniti confirming a gift sent successfully, with a Money na water placard', { sizes: '(min-width: 900px) 220px, 30vw', cls: 'zstage__p zstage__p--r' })}
    </div>
    <p class="credit">Zengly’s Vaniti flow, from the product design files.</p>
  </div>
</section>

<section class="sec sec--tight proto-sec" aria-labelledby="proto-title">
  <div class="shell proto">
    <div class="proto__intro">
      <h2 id="proto-title">Tap through Zengly</h2>
      <p>These are Zengly’s real design screens, linked into a small click-through. Tap the highlighted areas on the phone to spray a guest at an event with Vaniti, or jump straight to a screen. The app launches in December 2026, so this is the design, not the live app.</p>
      <div class="proto__nav" role="group" aria-label="Jump to a screen">
        <button type="button" data-proto-go="home" aria-pressed="true">Home</button>
        <button type="button" data-proto-go="menu" aria-pressed="false">All services</button>
        <button type="button" data-proto-go="split" aria-pressed="false">Split bill</button>
        <button type="button" data-proto-go="vaniti" aria-pressed="false">Vaniti spray</button>
        <button type="button" data-proto-go="event" aria-pressed="false">Create an event</button>
        <button type="button" data-proto-go="leaderboard" aria-pressed="false">Leaderboard</button>
      </div>
      <button class="proto__theme" type="button" data-proto-theme aria-pressed="false"><span>Light mode</span><i aria-hidden="true"></i></button>
      <p class="sr-only" aria-live="polite" data-proto-status></p>
    </div>
    <div class="proto__device">
      <div class="proto__phone" data-proto>
        <span class="device__island" aria-hidden="true"></span>
        ${[
          ['home', 'the home screen', 'zengly-home-dark', 'Zengly home screen in dark mode with balance, quick actions and services', [['Open Vaniti', 'vaniti', 30.6, 28, 16.8, 11.2], ['Open Split Bill', 'split', 53.5, 28, 17, 11.2], ['See all services', 'menu', 75, 41.3, 18.4, 10.6]]],
          ['home-light', 'the home screen in light mode', 'zengly-home-light', 'Zengly home screen in light mode with balance, quick actions and services', [['Open Vaniti', 'vaniti', 30.6, 28, 16.8, 11.2], ['Open Split Bill', 'split', 53.5, 28, 17, 11.2], ['See all services', 'menu', 75, 41.3, 18.4, 10.6]]],
          ['menu', 'all services', 'zengly-menu', 'Zengly services menu listing transfers, bills, Vaniti and Split Bill', [['Back', 'back', 0, 6.7, 18.6, 6.1], ['Open Vaniti', 'vaniti', 34.8, 21, 29, 12], ['Open Split Bill', 'split', 66, 21, 28.5, 12]]],
          ['split', 'Split Bill', 'zengly-split-bill', 'Zengly split-bill screen showing a “Divide expenses fairly” card and bill history', [['Back', 'back', 0, 7.3, 18.6, 6.7]]],
          ['sprayers', 'Vaniti', 'zengly-vaniti-sprayers', 'Zengly Vaniti screen showing an event’s top sprayers', [['Back', 'back', 0, 7.3, 18.6, 6.7], ['See the leaderboard', 'leaderboard', 71.8, 33.5, 24, 4.9], ['See more sprayers', 'leaderboard', 31.9, 82.9, 35, 5.5]]],
          ['vaniti', 'Vaniti spray setup', 'zengly-fig-home', 'Vaniti spray setup: choose currency, spray option and how to find the person', [['Back', 'back', 0, 6.5, 18.6, 6.5], ['Open the leaderboard', 'leaderboard', 50, 13.6, 46, 4.6], ['Start spray', 'nearby', 5.5, 58.4, 89, 6.2]]],
          ['nearby', 'nearby guests', 'zengly-fig-nearby', 'Vaniti radar showing three nearby guests: Charley, Sammy and Benny', [['Back', 'back', 0, 6.5, 18.6, 6.5], ['Spray Sammy', 'options', 60, 29, 24, 11], ['Spray Charley', 'options', 14, 31, 24, 11], ['Spray Benny', 'options', 66, 48.5, 24, 11]]],
          ['options', 'spray options', 'zengly-fig-gifts', 'Vaniti spray options: notes, cash bundles and gifts with naira amounts', [['Back', 'back', 0, 6.5, 18.6, 6.5], ['Choose spray notes', 'sending', 6.5, 19, 43, 14.5], ['Choose cash bundle, 10,000 naira', 'sending', 6.5, 39, 43, 14.5], ['Choose cash bundle, 20,000 naira', 'sending', 50.5, 39, 43, 14.5]]],
          ['sending', 'sending a gift', 'zengly-fig-gift', 'Vaniti sending a black money bag gift to Ability Elijah', [['Finish sending', 'sent', 4, 61, 92, 25]]],
          ['sent', 'gift sent', 'zengly-fig-sent', 'Gift sent successfully: 4 million naira sent to Ability Elijah, with a Money na water placard', [['Go home', 'home', 4, 84.5, 92, 6.5], ['View on leaderboard', 'leaderboard', 4, 91.5, 92, 5]]],
          ['event', 'create an event', 'zengly-fig-ready', 'Creating a Vaniti event: Chioma and David’s wedding with guest joining options and live experience settings', [['Back', 'back', 0, 6.5, 18.6, 6.5], ['Create event', 'vaniti', 4, 89.5, 92, 6.5]]],
          ['leaderboard', 'the Vaniti leaderboard', 'zengly-vaniti-leaderboard', 'Zengly Vaniti leaderboard ranking the top sprayers at an event', [['Back', 'back', 0, 5.5, 18.6, 6.7], ['Switch to Baller mode', 'sprayers', 4.3, 14, 44.4, 3.9]]]
        ].map(([id, title, im, alt, spots]) => `<div class="proto__screen" data-screen="${id}" data-title="${title}" aria-hidden="true">${img(im, alt, { sizes: '300px' })}${spots.map(([label, go, l, t, w, h]) => `<button class="proto__hot" type="button" tabindex="-1" data-go="${go}" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%"><span class="sr-only">${label}</span></button>`).join('')}</div>`).join('')}
      </div>
      <p class="proto__tip" aria-hidden="true">Tap the glowing areas</p>
    </div>
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

<section class="sec surface-dark sheet" aria-labelledby="pillars-title">
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

<section class="sec surface-dark sheet" aria-labelledby="screens-title">
  <div class="shell">
    ${head2('Selected screens', 'Interface designs from the Zengly app, ahead of its December 2026 launch.', { id: 'screens-title' })}
    <div class="gallery gallery--phones">
      ${phone('zengly-home-dark', 'Zengly home screen in dark mode with balance, quick actions and recent transactions', { sizes: '(min-width: 900px) 22vw, 45vw', caption: 'Home, dark mode' })}
      ${phone('zengly-home-light', 'Zengly home screen in light mode', { sizes: '(min-width: 900px) 22vw, 45vw', caption: 'Home, light mode' })}
      ${phone('zengly-vaniti-leaderboard', 'Vaniti leaderboard with a podium of top sprayers', { sizes: '(min-width: 900px) 22vw, 45vw', caption: 'Vaniti leaderboard' })}
      ${phone('zengly-menu', 'Zengly services menu', { sizes: '(min-width: 900px) 22vw, 45vw', caption: 'Services menu' })}
      ${phone('zengly-split-bill', 'Split bill screen with bill history', { sizes: '(min-width: 900px) 22vw, 45vw', caption: 'Split bill' })}
      ${phone('zengly-vaniti-sprayers', 'Vaniti community screen listing sprayers', { sizes: '(min-width: 900px) 22vw, 45vw', caption: 'Vaniti community' })}
      ${phone('zengly-vaniti-intro', 'Vaniti feature introduction screen', { sizes: '(min-width: 900px) 22vw, 45vw', caption: 'Vaniti introduction', cls: 'device--contain' })}
    </div>
  </div>
</section>

<section class="sec" aria-label="Engineering and status">
  <div class="shell">
    ${chapter('Engineering contribution', `<p>Design and build are handled by the same team. We produced detailed Flutter handoff specifications covering states, animations and edge cases, and maintain a documented screen library so the mobile build matches the design.</p><p>We also designed and built the marketing website, with scroll-driven motion and an early-access sign-up, along with the business requirements, execution plan and investor materials behind the product.</p>`)}
    ${chapter('Challenges', `<p><strong>Making celebration feel real.</strong> Spraying money is loud, physical and joyful. Translating that to a phone without it feeling like a game took several rounds of prototyping.</p><p><strong>Earning trust early.</strong> Young users are quick to try apps and quick to leave. Clear verification, honest error messages and a calm visual system carry a lot of that work.</p>`)}
    ${chapter('Where it stands', `<p>The Zengly mobile app is in development and launches on iOS and Android in December 2026. The website at zenglypay.com is live and collecting early-access sign-ups. We will share usage and outcomes here after launch; we do not publish figures before the product is publicly available.</p><p>${link(ZENGLY_SITE, 'Visit the Zengly website')}</p>`)}
  </div>
</section>

<section class="sec sec--tight surface-paper sheet" aria-labelledby="next-title">
  <div class="shell split">
    <h2 id="next-title" style="font-size:var(--fs-h2)">Next project</h2>
    <a class="card" href="/work/swiftly/" style="text-decoration:none;display:grid;gap:.8rem;justify-items:start">${status('concept', 'Proposed venture, internal prototype')}<h3 style="font-size:1.8rem;margin:0">Swiftly</h3><p>How Africa moves and gathers.</p><span class="link">View project${icon.arrow}</span></a>
  </div>
</section>
${ctaBand({ title: 'Building something people will use with friends?' })}`;
  return {
    path: '/work/zengly/', title: 'Zengly: Social-Finance App Case Study',
    description: 'How Lynexa shaped Zengly, a social-finance app for young Nigerians launching December 2026: strategy, UX/UI, brand, design system and website.',
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
    <div class="case-hero__media" style="aspect-ratio:16/10;position:relative" data-reveal>${img('mock-swiftly', VENTURE_MOCK.swiftly.alt, { sizes: '(min-width: 1200px) 1200px, 100vw' })}</div>
    <p class="credit">Concept design: these screens show the proposed product. Swiftly has not launched.</p>
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
<section class="sec sec--tight surface-paper sheet" aria-labelledby="next-title">
  <div class="shell split">
    <h2 id="next-title" style="font-size:var(--fs-h2)">Next project</h2>
    <a class="card" href="/work/zengly/" style="text-decoration:none;display:grid;gap:.8rem;justify-items:start">${status('progress', 'App launching December 2026')}<h3 style="font-size:1.8rem;margin:0">Zengly</h3><p>Money that moves the way friends do.</p><span class="link">View case study${icon.arrow}</span></a>
  </div>
</section>
${ctaBand({ title: 'Have a venture idea of your own?', primary: ['/ventures/', 'Explore venture partnerships'], secondary: ['/start-a-project/', 'Start a project'] })}`;
  return { path: '/work/swiftly/', title: 'Swiftly: Mobility & Experience Commerce Venture', description: 'Swiftly is a proposed Lynexa studio venture for travel, tickets and experiences in Nigeria. See the strategy, specification and prototypes behind it.', body, jsonld: [crumbLd(trail)] };
}

const SITES = [
  {
    name: 'Zengly', host: 'zenglypay.com', url: 'https://zenglypay.com/', shot: 'zengly', status: ['live', 'Live'],
    tone: 'warm',
    text: 'Marketing site for a Nigerian social-finance app. It tells the product story, introduces Vaniti and collects early-access sign-ups, in English and other languages.',
    meta: [['Type', 'Product marketing site'], ['Our role', 'Messaging, design, engineering'], ['Built with', 'Next.js on Netlify']],
    more: ['/work/zengly/', 'Read the Zengly case study']
  },
  {
    name: 'CreateMyCVNow', host: 'CreateMyCVNow', url: SITE.cvUrl, shot: 'cv', status: ['live', 'Live'],
    tone: 'mint',
    text: 'A web app, not just a website: Nigerian job seekers upload a CV, get an ATS score and export a stronger version. Payments and AI processing run server-side.',
    meta: [['Type', 'AI web application'], ['Our role', 'Product, design, engineering'], ['Built with', 'React, Vite, Netlify Functions']]
  },
  {
    name: 'Kelvin Ekuhoho', host: 'kelvinekuhoho.com', url: 'https://kelvinekuhoho.com/', shot: 'kelvin', status: ['live', 'Live'],
    tone: 'night',
    text: 'Personal portfolio for our founder: an editorial, dark-mode site with a cinematic intro, selected work and a direct line for project enquiries.',
    meta: [['Type', 'Portfolio site'], ['Our role', 'Art direction, design, engineering'], ['Built with', 'Hand-built static site on Netlify']]
  }
];

export function websitesPage() {
  const trail = [['/', 'Home'], ['/websites/', 'Websites']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>Websites we’ve designed and built.</h1>
      <div>
        <p class="lead" style="margin-top:0">For many companies the website is the first product anyone touches. We design and engineer sites with the same care as the apps behind them, and test every one on a phone first.</p>
        <ul class="site-index" aria-label="Jump to a website">${SITES.map((x, i) => `<li><a href="#site-${i + 1}">${x.name}</a></li>`).join('')}<li><a href="#site-lynexa">Lynexa</a></li></ul>
      </div>
    </div>
  </div>
</section>
${SITES.map((x, i) => `
<section class="sec site-show ${i % 2 ? 'surface-paper' : ''} sheet" id="site-${i + 1}" aria-labelledby="site-${i + 1}-title">
  <div class="shell">
    <div class="site-show__stage site-show__stage--${x.tone}" data-reveal>
      ${browser(`site-${x.shot}-desktop`, `${x.name} website on desktop`, x.host, { sizes: '(min-width: 1100px) 900px, 88vw' })}
      ${phone(`site-${x.shot}-mobile`, `${x.name} website on a phone`, { sizes: '(min-width: 900px) 200px, 28vw', cls: 'site-show__phone' })}
    </div>
    <div class="site-show__info">
      <div>
        <p class="site-show__n">${String(i + 1).padStart(2, '0')} / ${String(SITES.length + 1).padStart(2, '0')}</p>
        <h2 id="site-${i + 1}-title">${x.name}</h2>
        ${status(...x.status)}
      </div>
      <div class="site-show__body">
        <p>${x.text}</p>
        <dl class="site-show__meta">${x.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
        <div class="actions">
          <a class="btn btn--primary" href="${x.url}" target="_blank" rel="noopener noreferrer" data-magnetic><span>Visit the site</span><span class="sr-only"> ${x.host}</span><span class="sr-only"> (opens in a new tab)</span></a>
          ${x.more ? btn(x.more[0], x.more[1], 'secondary') : ''}
        </div>
      </div>
    </div>
  </div>
</section>`).join('')}

<section class="sec surface-dark sheet" id="site-lynexa" aria-labelledby="lynexa-site-title">
  <div class="shell split">
    <div>
      <p class="site-show__n">${String(SITES.length + 1).padStart(2, '0')} / ${String(SITES.length + 1).padStart(2, '0')}</p>
      <h2 id="lynexa-site-title" style="font-size:var(--fs-h2);max-width:12ch">And this one.</h2>
      ${status('live', 'Live')}
    </div>
    <div style="display:grid;gap:1.25rem;align-content:end">
      <p class="lead">lynexa.co is a fast, accessible multi-page studio site, hand-built without a front-end framework, with structured data, staged enquiry forms and a design system shared across every page.</p>
      <ul class="tags"><li>Information architecture</li><li>Design system</li><li>Static site engineering</li><li>SEO and accessibility</li></ul>
    </div>
  </div>
</section>

<section class="sec sheet" aria-labelledby="dev-title">
  <div class="shell">
    <h2 id="dev-title" style="font-size:1.6rem">In development</h2>
    <div class="ventures-list" style="margin-top:1.5rem">
      <div class="ventures-list__row"><h3>Swiftly</h3><p>Marketing site prototype for a proposed mobility venture, including a fare comparison module. Not publicly launched.</p>${status('concept', 'Internal prototype')}</div>
    </div>
  </div>
</section>

<section class="sec surface-paper sheet" aria-labelledby="svc-title">
  <div class="shell">
    ${head2('What every website includes', 'Each project is scoped to what the site needs to do. These are our defaults.', { id: 'svc-title' })}
    <ol class="scards scards--grid">
      ${[
        ['Messaging first', 'What to say, to whom and in what order, settled before the design starts.'],
        ['Phone first', 'Every page designed and tested at phone widths, not squeezed down from desktop.'],
        ['Speed and accessibility', 'Optimised images and fonts, minimal JavaScript, contrast and keyboard access checked.'],
        ['Search foundations', 'Metadata, structured data, sitemaps and redirects for any old pages.'],
        ['Working lead capture', 'Forms and chat that actually reach your inbox, with spam protection.'],
        ['Clean handoff', 'Hosting set up on your accounts, with notes on how to edit and maintain the site.']
      ].map(([t, d], i) => `<li class="scard"><div class="scard__top"><h3>${t}</h3><span class="scard__n" aria-hidden="true">0${i + 1}</span></div><p>${d}</p></li>`).join('')}
    </ol>
    <p class="center-cta">${btn('/services/web-design-development/', 'About our website service', 'secondary', ' data-magnetic')}</p>
  </div>
</section>
${ctaBand({ title: 'Have a site that deserves better?', primary: ['/start-a-project/?service=web-design-development', 'Start a website project'] })}`;
  return { path: '/websites/', title: 'Websites We’ve Designed and Built', description: 'Websites and web apps designed and engineered by Lynexa: Zengly, CreateMyCVNow and kelvinekuhoho.com. Fast, accessible, phone-first sites.', body, jsonld: [crumbLd(trail)] };
}
