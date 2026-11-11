import { SITE, NAV } from './site.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- Icons (inline, decorative) ----------
const svg = (path, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${path}</svg>`;
export const icon = {
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  external: svg('<path d="M7 17 17 7M8 7h9v9"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>'),
  pin: svg('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  check: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
  back: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  whatsapp: '<svg class="icon icon--fill" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>'
};

// ---------- Images ----------
// Intrinsic size of the largest generated rendition, for width/height (prevents layout shift).
const DIMS = {
  'zengly-split-bill': [376, 820], 'zengly-home-dark': [376, 820], 'zengly-home-light': [376, 820],
  'zengly-menu': [376, 820], 'zengly-vaniti-leaderboard': [376, 820], 'zengly-vaniti-sprayers': [376, 820],
  'zengly-vaniti-intro': [340, 529], 'zengly-sign': [1080, 1080], 'zengly-podium': [1080, 1080],
  'zengly-gift': [1080, 1080], 'zengly-friends': [1200, 1600], 'lagos-professionals': [1600, 1294],
  'lagos-collaboration': [1600, 1067], 'lagos-strategy-session': [1600, 1067],
  'swiftly-logo': [383, 101], 'zengly-logo': [400, 121],
  'site-zengly-desktop': [1440, 900], 'site-kelvin-desktop': [1440, 900], 'site-cv-desktop': [1440, 900],
  'site-zengly-mobile': [390, 844], 'site-kelvin-mobile': [390, 844], 'site-cv-mobile': [390, 844],
  'venture-landlink': [1280, 854], 'venture-sparkhive': [1280, 720], 'venture-lexforum': [1280, 853],
  'swiftly-danfo': [1600, 1066], 'about-team-lagos': [1600, 1062], 'about-team-nesa': [1600, 1066]
};
const WIDTHS = {
  'zengly-sign': [540, 1080], 'zengly-podium': [540, 1080], 'zengly-gift': [540, 1080], 'zengly-friends': [600, 1200],
  'lagos-professionals': [800, 1600], 'lagos-collaboration': [800, 1600], 'lagos-strategy-session': [800, 1600],
  'site-zengly-desktop': [720, 1440], 'site-kelvin-desktop': [720, 1440], 'site-cv-desktop': [720, 1440],
  'venture-landlink': [640, 1280], 'venture-sparkhive': [640, 1280], 'venture-lexforum': [640, 1280],
  'swiftly-danfo': [800, 1600], 'about-team-lagos': [800, 1600], 'about-team-nesa': [800, 1600]
};
export function img(name, alt, { sizes = '100vw', cls = '', eager = false } = {}) {
  const [w, h] = DIMS[name];
  const ws = WIDTHS[name] || [w];
  const srcset = ws.map((x) => `/assets/img/${name}-${x}.webp ${x}w`).join(', ');
  const src = `/assets/img/${name}-${ws[ws.length - 1]}.webp`;
  return `<img class="${cls}" src="${src}" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

// ---------- Device mockups ----------
// Phone frame for any mobile screenshot. Purely CSS; the screenshot sits in the screen area.
export const phone = (name, alt, { sizes = '(min-width: 900px) 22vw, 60vw', cls = '', eager = false, caption = '' } = {}) => `
  <figure class="device ${cls}">
    <div class="device__frame">
      <span class="device__island" aria-hidden="true"></span>
      <div class="device__screen">${img(name, alt, { sizes, eager })}</div>
    </div>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>`;

// Browser window for desktop website screenshots.
export const browser = (name, alt, host, { sizes = '(min-width: 900px) 60vw, 100vw' } = {}) => `
  <div class="browser">
    <div class="browser__bar" aria-hidden="true"><span class="browser__dots"><i></i><i></i><i></i></span><span class="browser__url">${host}</span></div>
    <div class="browser__screen">${img(name, alt, { sizes })}</div>
  </div>`;

// ---------- Small components ----------
export const btn = (href, label, variant = 'primary', attrs = '') =>
  `<a class="btn btn--${variant}" href="${href}"${attrs}><span>${label}</span></a>`;

export const link = (href, label, cls = '') => {
  const ext = /^https?:/.test(href);
  return `<a class="link ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}${ext ? icon.external + '<span class="sr-only"> (opens in a new tab)</span>' : icon.arrow}</a>`;
};

export const status = (kind, label) => `<span class="status status--${kind}"><span class="status__dot" aria-hidden="true"></span>${label}</span>`;

export const head2 = (title, intro = '', { id = '', cls = '' } = {}) => `
  <div class="sec-head ${cls}">
    <h2${id ? ` id="${id}"` : ''}>${title}</h2>
    ${intro ? `<p>${intro}</p>` : ''}
  </div>`;

export const faq = (items) => `<div class="faq">${items.map(([q, a]) => `
  <details class="faq__item">
    <summary><span>${q}</span>${icon.plus}</summary>
    <div class="faq__body"><p>${a}</p></div>
  </details>`).join('')}</div>`;

export const breadcrumbs = (trail) => `
  <nav class="crumbs" aria-label="Breadcrumb"><ol>
    ${trail.map(([href, label], i) => i === trail.length - 1 ? `<li><span aria-current="page">${label}</span></li>` : `<li><a href="${href}">${label}</a></li>`).join('')}
  </ol></nav>`;

export const ctaBand = ({ title = 'Have an idea worth building?', text = 'Tell us what you are working on. We reply within two working days with an honest view of whether, and how, we can help.', primary = ['/start-a-project/', 'Start a project'], secondary = null } = {}) => `
  <section class="cta-band surface-dark sheet" id="contact" aria-labelledby="cta-title">
    <div class="shell cta-band__inner">
      <h2 id="cta-title">${title}</h2>
      <p>${text}</p>
      <div class="actions">
        ${btn(primary[0], primary[1], 'light', ' data-magnetic')}
        ${secondary ? btn(secondary[0], secondary[1], 'ghost-light') : `<a class="btn btn--ghost-light" href="${SITE.whatsappUrl}" target="_blank" rel="noopener noreferrer">${icon.whatsapp}<span>Chat on WhatsApp</span><span class="sr-only"> (opens in a new tab)</span></a>`}
      </div>
    </div>
  </section>`;

// Founder feature, used on the home and About pages.
export const founder = ({ id = 'founder-title', full = false } = {}) => `
  <div class="founder-card">
    <div class="founder-card__panel">
      <div class="founder-card__intro">
        <p class="founder-card__kicker">Meet the founder</p>
        <h2 id="${id}">“I build things people actually use.”</h2>
        <p class="founder-card__sign"><span class="founder-card__mono" aria-hidden="true">KE</span><span><b>Kelvin Ekuhoho</b><span>Founder &amp; CEO, Lead Product Designer</span></span></p>
      </div>
      <div class="founder-card__body">
        <p>Kelvin is a product designer and builder with more than seven years of experience, much of it designing digital banking and payment products at Nigerian banks. He started Lynexa so founders could get one senior team that turns an idea into a credible, working product, without burning a year and five vendors on the way.</p>
        <dl class="founder-card__facts">
          <div><dt>Experience</dt><dd>7+ years in product design</dd></div>
          <div><dt>Background</dt><dd>Digital banking and payments at Sterling Bank and Polaris Bank</dd></div>
          <div><dt>Leads</dt><dd>Product, design and venture building at Lynexa</dd></div>
        </dl>
        ${full ? `<details class="expand">
            <summary>${icon.plus}Read the full biography</summary>
            <div>
              <p>Before founding Lynexa, Kelvin worked with financial institutions including Sterling Bank and Polaris Bank, contributing to digital banking platforms, electronic payment systems, lending products and customer-facing financial experiences. That work gave him a grounding in payment infrastructure, banking operations, regulatory requirements and the trust that technology for regulated industries has to earn.</p>
              <p>He has also led product design in the energy and infrastructure technology sector: enterprise platforms, operational dashboards, customer applications and data tools that simplify complex workflows. His practice spans product strategy, user research, systems thinking, interaction design, design systems, web development and cross-functional delivery.</p>
              <p>As founder and CEO of Lynexa, Kelvin leads a multidisciplinary team across product design, software engineering and business development, guiding products from research and concept through architecture, MVP, market positioning and commercial readiness. Under his leadership Lynexa is developing ventures across fintech, mobility, legal technology, property technology and digital productivity, including Zengly and Swiftly.</p>
            </div>
          </details>` : ''}
        <div class="founder-card__links">
          ${full ? '' : link('/about/', 'About Lynexa')}
          ${link('https://kelvinekuhoho.com/', 'Portfolio')}
          ${link(SITE.linkedin, 'LinkedIn')}
        </div>
      </div>
    </div>
  </div>`;

// ---------- JSON-LD ----------
export const orgLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/#organization`,
  name: SITE.legalName,
  alternateName: 'Lynexa',
  url: SITE.url,
  logo: `${SITE.url}/icon-512.png`,
  image: `${SITE.url}/assets/og/lynexa-og.png`,
  description: 'Lagos-based product design, engineering and venture-building studio for founders and businesses.',
  email: SITE.email,
  telephone: SITE.phoneIntl,
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.locality, addressRegion: SITE.address.region, addressCountry: SITE.address.country },
  areaServed: ['Nigeria', 'Africa', 'Worldwide'],
  founder: { '@type': 'Person', name: SITE.founder, jobTitle: 'Founder & CEO' },
  sameAs: [SITE.linkedin]
});
export const crumbLd = (trail) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: trail.map(([href, label], i) => ({ '@type': 'ListItem', position: i + 1, name: label, item: SITE.url + href }))
});
export const faqLd = (items) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q.replace(/<[^>]+>/g, ''), acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } }))
});

// ---------- Layout ----------
const header = (path) => `
<header class="site-header" data-header>
  <div class="shell site-header__inner">
    <a class="brand" href="/" aria-label="Lynexa home">
      <img src="/assets/img/lynexa-mark-64.png" width="32" height="32" alt="">
      <span>Lynexa</span>
    </a>
    <nav class="nav" aria-label="Main">
      <ul>${NAV.map((n) => `<li><a href="${n.href}"${path.startsWith(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}</ul>
    </nav>
    <button class="cmdk-open" type="button" data-cmdk-open aria-label="Quick menu (Ctrl K)" aria-keyshortcuts="Control+K Meta+K"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.2-4.2"/></svg><kbd aria-hidden="true">Ctrl K</kbd></button>
    <a class="btn btn--primary btn--sm header-cta" href="/start-a-project/"><span>Start a project</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle>
      <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span></span>
      <span class="menu-toggle__label">Menu</span>
    </button>
  </div>
  <div class="menu surface-dark" id="menu" data-menu hidden>
    <nav class="shell menu__inner" aria-label="Mobile">
      <ul class="menu__links">
        <li><a href="/">Home</a></li>
        ${NAV.map((n) => `<li><a href="${n.href}"${path.startsWith(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}
      </ul>
      <div class="menu__foot">
        ${btn('/start-a-project/', 'Start a project', 'light')}
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <a href="tel:${SITE.phoneIntl}">${SITE.phoneDisplay}</a>
      </div>
    </nav>
  </div>
</header>`;

const footer = () => `
<footer class="site-footer surface-dark">
  <div class="shell">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand brand--light" href="/" aria-label="Lynexa home"><img src="/assets/img/lynexa-mark-64.png" width="32" height="32" alt=""><span>Lynexa</span></a>
        <p>We help founders and businesses turn ideas into products people actually use: strategy, design, engineering and launch, from one studio in Lagos.</p>
        <div class="pills">
          <a class="pill" href="mailto:${SITE.email}" data-cmdk-item="Email ${SITE.email}">${SITE.email}</a>
          <a class="pill" href="tel:${SITE.phoneIntl}">${SITE.phoneDisplay}</a>
          <a class="pill pill--wa" data-cmdk-item="Chat on WhatsApp" href="${SITE.whatsappUrl}" target="_blank" rel="noopener noreferrer">${icon.whatsapp}WhatsApp<span class="sr-only"> (opens in a new tab)</span></a>
        </div>
      </div>
      <nav class="footer-cols" aria-label="Footer">
        <div><h2>Studio</h2><ul>
          <li><a href="/about/">About</a></li><li><a href="/process/">Process</a></li><li><a href="/mvp-planner/">MVP timeline planner</a></li><li><a href="/ventures/">Ventures</a></li><li><a href="/contact/">Contact</a></li>
        </ul></div>
        <div><h2>Work</h2><ul>
          <li><a href="/work/">All work</a></li><li><a href="/work/zengly/">Zengly</a></li><li><a href="/work/swiftly/">Swiftly</a></li><li><a href="/websites/">Websites</a></li><li><a href="https://kelvinekuhoho.com/" target="_blank" rel="noopener noreferrer">Founder portfolio<span class="sr-only"> (opens in a new tab)</span></a></li>
        </ul></div>
        <div><h2>Services</h2><ul>
          <li><a href="/services/product-design/">Product design</a></li><li><a href="/services/mvp-development/">MVP development</a></li><li><a href="/services/web-design-development/">Websites</a></li><li><a href="/services/brand-identity/">Brand identity</a></li><li><a href="/services/">All services</a></li>
        </ul></div>
        <div><h2>Contact</h2><ul>
          <li><a href="/start-a-project/">Start a project</a></li>
          <li><a href="${SITE.mapsUrl}" target="_blank" rel="noopener noreferrer">Ikorodu, Lagos<span class="sr-only"> (directions open in a new tab)</span></a></li>
          <li><a href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn<span class="sr-only"> (opens in a new tab)</span></a></li>
        </ul></div>
      </nav>
    </div>
    <div class="footer-base">
      <p class="lagos-clock">It is <time data-lagos-time>—</time> in Lagos. We normally reply within two working days.</p>
      <p>© ${new Date().getFullYear()} ${SITE.legalName}. Registered in Nigeria, ${SITE.rc}.</p>
      <div class="motion-pref" role="group" aria-label="Motion preference" data-motion-pref><span>Motion</span><button type="button" data-motion-set="full" aria-pressed="false">Full</button><button type="button" data-motion-set="reduced" aria-pressed="false">Reduced</button><button type="button" data-motion-set="off" aria-pressed="false">Off</button></div>
      <p><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></p>
    </div>
  </div>
</footer>`;

// Runs before first paint: marks JS, applies a saved motion preference, and (first visit, motion allowed)
// asks the hero wireframe to wait for the swarm to draw it. Its hash is added to the CSP at build time.
export const HEAD_SCRIPT = "(function(e){e.classList.add('js');try{var m=localStorage.getItem('lx-motion');if(m)e.setAttribute('data-motion',m);var r=matchMedia('(prefers-reduced-motion: reduce)').matches,c=navigator.connection;if((m==='full'||(!m&&!r))&&!(c&&c.saveData)&&e.getAttribute('data-swarm-mode')!=='none'){e.classList.add('sw-intro');var l=document.createElement('link');l.rel='preload';l.as='script';l.href=e.getAttribute('data-swarm-src');document.head.appendChild(l)}}catch(x){}})(document.documentElement)";

export function layout({ path, title, description, body, jsonld = [], noindex = false, ogImage = '/assets/og/lynexa-og.png', bodyClass = '', swarm = 'full' }) {
  const canonical = SITE.url + path;
  const fullTitle = path === '/' ? title : `${title} | Lynexa`;
  const ld = [orgLd(), ...jsonld];
  return `<!doctype html>
<html lang="en-NG" data-swarm-src="/assets/swarm.js?v=__BUILD__" data-swarm-mode="${swarm}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta name="theme-color" content="#F1EEE8">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Lynexa">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_NG">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/plus-jakarta-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v=__BUILD__">
<script type="application/ld+json">${JSON.stringify(ld.length === 1 ? ld[0] : ld)}</script>
<script>${HEAD_SCRIPT}</script>
<script src="/assets/site.js?v=__BUILD__" defer></script>
</head>
<body class="${bodyClass}" data-swarm="${swarm}">
<a class="skip-link" href="#main">Skip to content</a>
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
<aside aria-label="Quick contact"><a class="wa-float" href="${SITE.whatsappUrl}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Lynexa on WhatsApp (opens in a new tab)">${icon.whatsapp}<span class="wa-float__label">Chat on WhatsApp</span></a></aside>
<div class="cursor" aria-hidden="true" data-cursor><span class="cursor__label" data-cursor-label></span></div>
</body>
</html>`;
}
