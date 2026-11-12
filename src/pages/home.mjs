import { btn, link, img, phone, browser, head2, faq, faqLd, status, ctaBand, icon, bookBtn, teamSection, testimonialsSection } from '../lib.mjs';
import { PACKAGES } from '../content/pricing.mjs';
import { pack } from './pricing.mjs';
import { PILLARS, svcBySlug } from '../content/services.mjs';
import { PROJECTS, VENTURE_MOCK } from '../content/work.mjs';
import { PILLAR_ART } from '../content/art.mjs';
import { SITE } from '../site.mjs';

const HOME_FAQ = [
  ['What kind of companies do you work with?', 'Founders at the idea or early stage, startups that need a product or website built properly, and established businesses launching a new digital product. Most of our work so far is in fintech, mobility and consumer products for African markets, and we work with clients anywhere.'],
  ['Can you take a project from idea to launch?', 'Yes. Strategy, product design, brand, engineering, website and investor materials can all sit with one team. You can also bring us in for a single part, such as design or a website.'],
  ['How much does a project cost?', 'Most projects start from $1,500 for a website, $2,500 for a product sprint and $12,000 for an MVP build. After a first conversation we send a written scope with deliverables, timeline and a fixed price, so you know the commitment before any work starts. <a href="/pricing/">See starting prices</a>.'],
  ['Do you work with clients outside Nigeria?', 'Yes. We work remotely with clients anywhere, quote in US dollars or naira, and are on GMT+1 all year, so UK and European teams share our full working day and US East Coast teams get their mornings with us.'],
  ['Who owns the work?', 'You do. Code, design files and brand assets created for your project are transferred to you as set out in our agreement.'],
  ['Will you sign an NDA?', 'Yes. We are happy to sign a mutual NDA before you share anything sensitive.'],
  ['Do you invest in startups?', 'Occasionally, through selective venture partnerships where Lynexa contributes design and engineering. These are case-by-case and never automatic. <a href="/ventures/">Read how venture partnerships work</a>.']
];

export default function home() {
  const zengly = PROJECTS.find((p) => p.slug === 'zengly');
  const swiftly = PROJECTS.find((p) => p.slug === 'swiftly');
  const cv = PROJECTS.find((p) => p.slug === 'createmycvnow');
  const ventures = PROJECTS.filter((p) => !p.page && !p.href);

  const body = `
<section class="hero" id="top" aria-labelledby="hero-title">
  <div class="shell">
    <h1 id="hero-title">From a founder’s idea to a product people actually use.</h1>
    <div class="hero__meta">
      <p class="lead">Lynexa is a product design, engineering and venture studio in Lagos. We help you understand the idea, design it, build it and bring it to market, with one team accountable from the first conversation to launch.</p>
      <div class="actions">${btn('/start-a-project/', 'Start a project', 'primary', ' data-magnetic')}${btn('/work/', 'Explore our work', 'secondary', ' data-magnetic')}</div>
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
          <div class="phone"><span class="phone__island"></span><div class="wire">
            <i class="w-a"></i><i class="w-b"></i><i class="w-c"></i>
            <span class="w-row"><i></i><i></i><i></i></span><i class="w-d"></i><i class="w-d"></i><i class="w-e"></i>
          </div></div>
        </div>
      </div>
      <div class="build__stage">
        <p class="build__label"><b>3</b>Built</p>
        <div class="build__frame build__frame--real">
          <div class="phone phone--dark"><span class="phone__island"></span>${img('zengly-split-bill', 'Zengly split-bill screen showing a “Divide expenses fairly” card and bill history', { sizes: '(min-width: 760px) 240px, 40vw', eager: true })}</div>
        </div>
      </div>
      <p class="build__caption">Zengly’s split-bill feature, from a sentence to a wireframe to the interface in the app. Zengly launches in December 2026.</p>
    </div>
    <form class="pitch" data-pitch novalidate>
      <label class="pitch__label" for="pitch-idea">Try it with your idea</label>
      <div class="pitch__row">
        <input id="pitch-idea" name="idea" type="text" maxlength="140" autocomplete="off" placeholder="An app that helps flatmates split rent and bills" aria-describedby="pitch-hint">
        <button class="btn btn--primary btn--sm" type="submit"><span>Sketch it</span></button>
      </div>
      <p class="pitch__hint" id="pitch-hint">Describe it in one sentence. We sketch a first screen above, right here in your browser. Nothing is sent until you choose to send a brief.</p>
      <p class="sr-only" aria-live="polite" data-pitch-live></p>
    </form>
  </div>
</section>

<section class="sec sec--tight proof-sec" aria-label="Lynexa in brief">
  <div class="shell">
    <ul class="proof">
      <li><b>7+ years</b><span>designing banking and payment products at Sterling Bank and Polaris Bank</span></li>
      <li><b>December 2026</b><span>Zengly, our social-finance app, launches on iOS and Android</span></li>
      <li><b>24 hours</b><span>to a reply on working days, from the people who will do the work</span></li>
      <li><b>GMT+1</b><span>all year, sharing the working day with London and Europe</span></li>
    </ul>
    ${testimonialsSection()}
  </div>
</section>

<section class="sec" id="services" aria-labelledby="what-title">
  <div class="shell">
    ${head2('Four things, done by one team.', 'We understand your idea, design it, build it and help bring it to market. Hire us for all four, or for the one you are missing.', { id: 'what-title' })}
    <ol class="scards">
      ${PILLARS.map((p, i) => `
      <li class="scard" style="--i:${i}">
        <div class="scard__body">
          <div class="scard__top"><h3>${p.title}</h3><span class="scard__n" aria-hidden="true">0${i + 1}</span></div>
          <p>${p.text}</p>
          <ul class="scard__links">${p.links.map((s) => `<li><a href="/services/${s}/">${svcBySlug[s].name}${icon.arrow}</a></li>`).join('')}</ul>
        </div>
        <div class="scard__art">${PILLAR_ART[p.key]}</div>
      </li>`).join('')}
    </ol>
    <p class="center-cta">${btn('/services/', 'See all services', 'secondary', ' data-magnetic')}${btn('/process/', 'How a project runs', 'secondary', ' data-magnetic')}</p>
  </div>
</section>

<section class="sec surface-dark sheet" id="work" aria-labelledby="work-title">
  <div class="shell">
    ${head2('Selected work', 'Products we have designed and engineered, and ventures we are building. Every project shows where it really is today.', { id: 'work-title' })}
    <div class="showcase">
      <a class="showcase__item showcase__item--wide" href="/work/zengly/" data-cursor-text="View">
        <span class="showcase__media showcase__media--zengly" data-reveal>
          <span class="showcase__phones">
            ${phone('zengly-fig-gift', '', { sizes: '(min-width: 900px) 14vw, 30vw' })}
            ${phone('zengly-fig-sent', '', { sizes: '(min-width: 900px) 14vw, 30vw' })}
          </span>
        </span>
        <span class="showcase__meta">
          <span class="showcase__title">Zengly ${status(...zengly.status)}</span>
          <span class="showcase__desc">${zengly.summary} The mobile app launches in December 2026; the website at zenglypay.com is live and taking early-access sign-ups.</span>
        </span>
      </a>
      <a class="showcase__item" href="/work/swiftly/" data-cursor-text="View">
        <span class="showcase__media showcase__media--cover" data-reveal>
          ${img('mock-swiftly', VENTURE_MOCK.swiftly.alt, { sizes: '(min-width: 900px) 40vw, 100vw' })}
          <small class="photo-credit">Concept design</small>
        </span>
        <span class="showcase__meta">
          <span class="showcase__title">Swiftly ${status(...swiftly.status)}</span>
          <span class="showcase__desc">${swiftly.summary}</span>
        </span>
      </a>
      <a class="showcase__item" href="${cv.href}" target="_blank" rel="noopener noreferrer" data-cursor-text="Visit">
        <span class="showcase__media showcase__media--site" data-reveal>
          ${browser('site-cv-desktop', 'CreateMyCVNow homepage', 'CreateMyCVNow', { sizes: '(min-width: 900px) 36vw, 90vw' })}
        </span>
        <span class="showcase__meta">
          <span class="showcase__title">CreateMyCVNow ${status(...cv.status)}</span>
          <span class="showcase__desc">${cv.summary}<span class="sr-only"> (opens in a new tab)</span></span>
        </span>
      </a>
      <div class="showcase__ventures">
        <p class="showcase__list-title">Also in the studio</p>
        <ul class="vcards">
          ${ventures.map((p) => `<li class="vcard"><span class="vcard__media">${img('mock-' + p.slug, VENTURE_MOCK[p.slug].alt, { sizes: '(min-width: 900px) 30vw, (min-width: 700px) 220px, 92vw' })}<small class="photo-credit">Concept design</small></span><span class="vcard__body"><b>${p.name}</b><span>${p.summary}</span>${status(...p.status)}</span></li>`).join('')}
        </ul>
      </div>
    </div>
    <p class="center-cta">${btn('/work/', 'View all work', 'ghost-light', ' data-magnetic')}${btn('/websites/', 'Websites we’ve built', 'ghost-light', ' data-magnetic')}</p>
  </div>
</section>

<section class="sec surface-paper sheet" aria-labelledby="why-title">
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

<section class="sec sheet" id="studio" aria-labelledby="team-title">
  <div class="shell">
    ${teamSection({ id: 'team-title', text: 'Led by Kelvin Ekuhoho, a product designer with seven years in Nigerian digital banking. The people you meet in the first call are the people who design and build your product.' })}
    <p style="margin-top:2rem">${link('/about/', 'More about the studio')}</p>
  </div>
</section>

<section class="sec surface-paper sheet" aria-labelledby="price-title">
  <div class="shell">
    ${head2('Clear starting prices.', 'Every project gets a written scope and fixed price before work starts. These are where most engagements begin, in US dollars.', { id: 'price-title' })}
    <div class="packs packs--teaser">
      ${PACKAGES.filter((x) => ['sprint', 'mvp', 'website'].includes(x.key)).map(pack).join('')}
    </div>
    <p class="center-cta">${btn('/pricing/', 'See all packages', 'secondary', ' data-magnetic')}${bookBtn('secondary')}</p>
  </div>
</section>

<section class="sec sheet" aria-labelledby="faq-title">
  <div class="shell faq-block">
    ${head2('Questions founders ask first', '', { id: 'faq-title', cls: 'sec-head--stack' })}
    ${faq(HOME_FAQ)}
    <div class="faq-contact">
      <p>Still have a question? Ask the founder directly.</p>
      <div class="actions">
        <a class="btn btn--secondary btn--sm" href="${SITE.whatsappUrl}" target="_blank" rel="noopener noreferrer">${icon.whatsapp}<span>WhatsApp</span><span class="sr-only"> (opens in a new tab)</span></a>
        <a class="btn btn--secondary btn--sm" href="mailto:${SITE.email}"><span>${SITE.email}</span></a>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Have a product to build or rethink?' })}
`;

  return {
    path: '/',
    title: 'Lynexa — Product Design, Engineering & Venture Studio in Lagos',
    description: 'Lagos product studio turning founders’ ideas into working products: strategy, UX/UI design, MVP development, websites and launch. Fixed-price scopes.',
    body,
    jsonld: [faqLd(HOME_FAQ), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Lynexa', url: 'https://lynexa.co/' }]
  };
}
