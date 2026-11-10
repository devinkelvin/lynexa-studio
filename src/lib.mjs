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
  check: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>')
};

// ---------- Images ----------
// Intrinsic size of the largest generated rendition, for width/height (prevents layout shift).
const DIMS = {
  'zengly-split-bill': [376, 820], 'zengly-home-dark': [376, 820], 'zengly-home-light': [376, 820],
  'zengly-menu': [376, 820], 'zengly-vaniti-leaderboard': [376, 820], 'zengly-vaniti-sprayers': [376, 820],
  'zengly-vaniti-intro': [340, 529], 'zengly-sign': [1080, 1080], 'zengly-podium': [1080, 1080],
  'zengly-gift': [1080, 1080], 'zengly-friends': [1200, 1600], 'lagos-professionals': [1600, 1294],
  'lagos-collaboration': [1600, 1067], 'lagos-strategy-session': [1600, 1067], 'kelvin-ekuhoho': [768, 1024],
  'swiftly-logo': [383, 101], 'zengly-logo': [400, 121]
};
const WIDTHS = {
  'zengly-sign': [540, 1080], 'zengly-podium': [540, 1080], 'zengly-gift': [540, 1080], 'zengly-friends': [600, 1200],
  'lagos-professionals': [800, 1600], 'lagos-collaboration': [800, 1600], 'lagos-strategy-session': [800, 1600],
  'kelvin-ekuhoho': [480, 768]
};
export function img(name, alt, { sizes = '100vw', cls = '', eager = false } = {}) {
  const [w, h] = DIMS[name];
  const ws = WIDTHS[name] || [w];
  const srcset = ws.map((x) => `/assets/img/${name}-${x}.webp ${x}w`).join(', ');
  const src = `/assets/img/${name}-${ws[ws.length - 1]}.webp`;
  return `<img class="${cls}" src="${src}" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

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

export const ctaBand = ({ title = 'Have an idea worth building?', text = 'Tell us what you are working on. We reply within two working days with an honest view of whether, and how, we can help.', primary = ['/start-a-project/', 'Start a project'], secondary = ['/contact/', 'Other ways to reach us'] } = {}) => `
  <section class="cta-band surface-dark" id="contact" aria-labelledby="cta-title">
    <div class="shell cta-band__inner">
      <h2 id="cta-title">${title}</h2>
      <div class="cta-band__side">
        <p>${text}</p>
        <div class="actions">${btn(primary[0], primary[1], 'light')}${btn(secondary[0], secondary[1], 'ghost-light')}</div>
      </div>
    </div>
  </section>`;

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
        ${btn('/start-a-project/', 'Start a project', 'light')}
      </div>
      <nav class="footer-cols" aria-label="Footer">
        <div><h2>Studio</h2><ul>
          <li><a href="/about/">About</a></li><li><a href="/process/">Process</a></li><li><a href="/ventures/">Ventures</a></li><li><a href="/contact/">Contact</a></li>
        </ul></div>
        <div><h2>Work</h2><ul>
          <li><a href="/work/">All work</a></li><li><a href="/work/zengly/">Zengly</a></li><li><a href="/work/swiftly/">Swiftly</a></li><li><a href="/websites/">Websites</a></li>
        </ul></div>
        <div><h2>Services</h2><ul>
          <li><a href="/services/product-design/">Product design</a></li><li><a href="/services/mvp-development/">MVP development</a></li><li><a href="/services/web-design-development/">Websites</a></li><li><a href="/services/brand-identity/">Brand identity</a></li><li><a href="/services/">All services</a></li>
        </ul></div>
        <div><h2>Contact</h2><ul>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li><a href="tel:${SITE.phoneIntl}">${SITE.phoneDisplay}</a></li>
          <li><a href="${SITE.mapsUrl}" target="_blank" rel="noopener noreferrer">Ikorodu, Lagos<span class="sr-only"> (directions open in a new tab)</span></a></li>
          <li><a href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn<span class="sr-only"> (opens in a new tab)</span></a></li>
        </ul></div>
      </nav>
    </div>
    <div class="footer-base">
      <p>© ${new Date().getFullYear()} ${SITE.legalName}. Registered in Nigeria, ${SITE.rc}.</p>
      <p><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></p>
    </div>
  </div>
</footer>`;

export function layout({ path, title, description, body, jsonld = [], noindex = false, ogImage = '/assets/og/lynexa-og.png', bodyClass = '' }) {
  const canonical = SITE.url + path;
  const fullTitle = path === '/' ? title : `${title} | Lynexa`;
  const ld = [orgLd(), ...jsonld];
  return `<!doctype html>
<html lang="en-NG">
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
<script>document.documentElement.classList.add('js')</script>
<script src="/assets/site.js?v=__BUILD__" defer></script>
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>`;
}
