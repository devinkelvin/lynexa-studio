import { breadcrumbs, crumbLd, btn, link, icon } from '../lib.mjs';
import { SITE } from '../site.mjs';

const UPDATED = '10 November 2026';
const UPDATED_ISO = '2026-11-10';

const glyph = {
  inbox: '<path d="M4 13l2.5-7h11L20 13v6H4z"/><path d="M4 13h4l1 2h6l1-2h4"/>',
  shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  key: '<circle cx="8" cy="14" r="4"/><path d="M11 11l8-8M16 6l2 2M14 8l2 2"/>',
  doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  scale: '<path d="M12 4v16M6 20h12M5 8h14"/><path d="M5 8l-2.5 6a2.5 2.5 0 0 0 5 0zM19 8l-2.5 6a2.5 2.5 0 0 0 5 0z"/>'
};
const g = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${glyph[k]}</svg>`;

// Shared layout for the legal pages: summary cards, a sticky contents list and numbered sections.
function legal({ kind, title, intro, summary, sections, other }) {
  const toc = sections.map(([id, t], i) => `<li><a href="#${id}"><span aria-hidden="true">${i + 1}</span>${t}</a></li>`).join('');
  return `
<section class="page-hero legal-hero">
  <div class="shell">
    ${breadcrumbs([['/', 'Home'], [`/${kind}/`, title]])}
    <h1>${title}</h1>
    <p class="lead">${intro}</p>
    <dl class="legal-meta">
      <div><dt>Last updated</dt><dd><time datetime="${UPDATED_ISO}">${UPDATED}</time></dd></div>
      <div><dt>Applies to</dt><dd>lynexa.co and its forms</dd></div>
      <div><dt>Questions</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div>
    </dl>
  </div>
</section>
<section class="sec sec--tight surface-paper sheet" aria-labelledby="${kind}-short">
  <div class="shell">
    <h2 id="${kind}-short" class="legal-short__title">The short version</h2>
    <ul class="legal-short" role="list">
      ${summary.map(([ic, h, p]) => `<li><span class="legal-short__icon">${g(ic)}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}
    </ul>
    <p class="legal-short__note">This summary is here to help. The full text below is what applies.</p>
  </div>
</section>
<section class="sec legal-body">
  <div class="shell legal-grid">
    <nav class="legal-toc" aria-label="On this page">
      <details open>
        <summary>On this page</summary>
        <ol>${toc}</ol>
      </details>
    </nav>
    <div class="legal-sections">
      ${sections.map(([id, t, html], i) => `
      <section class="legal-sec" id="${id}" aria-labelledby="${id}-h">
        <h2 id="${id}-h"><span class="legal-sec__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${t}</h2>
        <div class="prose">${html}</div>
      </section>`).join('')}
      <aside class="legal-contact" aria-label="Contact about this ${kind === 'privacy' ? 'notice' : 'page'}">
        <div>
          <h2>Questions about this?</h2>
          <p>Write to us and a person will reply, normally within two working days.</p>
          <div class="actions">${btn(`mailto:${SITE.email}`, SITE.email, 'primary')}${btn('/contact/', 'Other ways to reach us', 'secondary')}</div>
        </div>
        <address>
          <b>${SITE.legalName}</b>
          <span>${SITE.rc}</span>
          <span>${SITE.address.full}</span>
        </address>
      </aside>
      <p class="legal-other">${link(other[0], other[1])}</p>
    </div>
  </div>
</section>`;
}

export function privacyPage() {
  const trail = [['/', 'Home'], ['/privacy/', 'Privacy']];
  const body = legal({
    kind: 'privacy', title: 'Privacy notice',
    intro: `How ${SITE.legalName} handles the personal information you share through this website, and the choices you have.`,
    summary: [
      ['inbox', 'Only what you send us', 'Your name, contact details and what you tell us about your project. Nothing is collected behind your back.'],
      ['shield', 'No tracking cookies', 'No advertising or analytics cookies, and fonts are served from our own domain. We never sell your information.'],
      ['key', 'You stay in control', 'Ask to see, correct or delete your information at any time under the Nigeria Data Protection Act 2023.']
    ],
    sections: [
      ['who', 'Who we are', `<p>${SITE.legalName} (“Lynexa”, “we”) is a company registered in Nigeria (${SITE.rc}), at ${SITE.address.full}. We are responsible for the personal information collected through lynexa.co. Contact us about privacy at <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>`],
      ['collect', 'What we collect', `<p>We only collect what you choose to send us through our forms or by email:</p>
        <ul>
          <li>Your name, email address and, if you provide them, phone number and company name.</li>
          <li>What you tell us about your project or idea, including stage, timeline, budget range and how you heard about us.</li>
          <li>Technical information that our hosting provider records automatically when any website is visited, such as IP address, browser type and the pages requested, used for security and to keep the site running.</li>
        </ul>
        <p>This website does not use advertising or analytics cookies, and our fonts are hosted on our own domain, not loaded from third parties. If you message us on WhatsApp, WhatsApp’s own privacy policy also applies to that conversation.</p>`],
      ['use', 'Why we use it', `<ul>
          <li>To reply to your enquiry and discuss possible work together, based on your consent and on steps you ask us to take before entering a contract.</li>
          <li>To keep records of our business conversations, based on our legitimate interest in running the company.</li>
          <li>To protect the website from spam and abuse.</li>
        </ul>
        <p>We do not sell your information, and we do not use it for marketing unless you separately agree.</p>`],
      ['share', 'Who we share it with', `<p>Form submissions are processed by Netlify, Inc., which hosts this website and stores submissions on our behalf. Netlify may process data outside Nigeria, including in the United States; we rely on its contractual data protection commitments. Our email is handled by our email provider. We may share information with professional advisers or authorities where the law requires it.</p>`],
      ['keep', 'How long we keep it', `<p>We keep enquiries for as long as needed to respond and follow up, and normally no longer than 24 months if no working relationship begins. If we work together, records are kept for as long as our agreement and legal obligations require.</p>`],
      ['rights', 'Your rights', `<p>Under the Nigeria Data Protection Act 2023 and other laws that may apply to you, you can:</p>
        <ul>
          <li>ask to access, correct or delete your information;</li>
          <li>object to or restrict how we use it;</li>
          <li>withdraw consent at any time;</li>
          <li>ask for a copy in a portable format.</li>
        </ul>
        <p>Email <a href="mailto:${SITE.email}">${SITE.email}</a> and we will respond within the time the law allows. You can also complain to the Nigeria Data Protection Commission.</p>`],
      ['confidential', 'Confidential project information', `<p>We treat project and venture details you share as confidential, whether or not an NDA has been signed. Please avoid sending highly sensitive information through the website; we are happy to sign a mutual NDA first.</p>`],
      ['changes', 'Changes to this notice', `<p>If we change this notice we will update the date at the top of this page.</p>`]
    ],
    other: ['/terms/', 'Read the terms of use']
  });
  return { swarm: 'none', path: '/privacy/', title: 'Privacy Notice', description: 'How Lynexa Innovations Limited collects, uses and protects personal information shared through lynexa.co, and your rights under Nigerian data protection law.', body, jsonld: [crumbLd(trail)] };
}

export function termsPage() {
  const trail = [['/', 'Home'], ['/terms/', 'Terms']];
  const body = legal({
    kind: 'terms', title: 'Terms of use',
    intro: 'The terms for using lynexa.co. Any work we do together is covered by a separate written agreement.',
    summary: [
      ['doc', 'Nothing here is a binding offer', 'Prices, timelines and partnership terms are only agreed in writing. This site describes how we work; it is not a quote.'],
      ['bulb', 'Your ideas stay yours', 'You keep ownership of what you send us. We use it only to respond, and treat it as confidential.'],
      ['scale', 'Nigerian law applies', 'These terms are governed by the laws of the Federal Republic of Nigeria.']
    ],
    sections: [
      ['about', 'About these terms', `<p>This website is operated by ${SITE.legalName} (${SITE.rc}). By using it you agree to these terms. Separate written agreements govern any services we provide; these terms do not create a client relationship.</p>`],
      ['information', 'Information on this site', `<p>We describe our services, work and ventures as accurately as we can, including the current status of each project. Content is for general information and may change. Nothing on this website is a binding offer, a quotation, a promise of results or an offer of investment. Prices, timelines and any partnership terms are only agreed in writing.</p>`],
      ['ventures', 'Ventures and partnerships', `<p>Information about venture partnerships, including equity-based arrangements, describes possible ways of working together. Submitting an idea does not create any obligation for either party. Seek independent legal and financial advice before entering any equity arrangement.</p>`],
      ['ip', 'Intellectual property', `<p>The Lynexa name, logo, site design and written content belong to ${SITE.legalName}. Client and venture names, logos and product designs shown here belong to their respective owners and appear with permission or as part of our own ventures. Photography from Pexels and Unsplash is used under their respective licences, with photographers credited where shown. Please do not copy material from this site without permission.</p>`],
      ['ideas', 'Ideas you share', `<p>You keep ownership of the ideas and materials you send us. We use them only to assess and respond to your enquiry, and treat them as confidential.</p>`],
      ['links', 'Links to other sites', `<p>We link to some external websites, such as product sites, WhatsApp and maps. We are not responsible for their content or practices.</p>`],
      ['liability', 'Liability', `<p>We work to keep this website accurate and available, but provide it as it is. To the extent the law allows, we are not liable for losses arising from use of, or reliance on, this website.</p>`],
      ['law', 'Governing law', `<p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>`]
    ],
    other: ['/privacy/', 'Read the privacy notice']
  });
  return { swarm: 'none', path: '/terms/', title: 'Terms of Use', description: 'Terms for using the Lynexa Innovations Limited website, lynexa.co.', body, jsonld: [crumbLd(trail)] };
}

export function notFoundPage() {
  return {
    path: '/404', title: 'Page not found', noindex: true, description: 'This page could not be found.',
    body: `
<section class="center-page">
  <div class="shell">
    <div class="lost" aria-hidden="true"><span class="lost__q">?</span></div>
    <p class="muted lost__code">Error 404</p>
    <h1>This page isn’t built yet. Or it moved.</h1>
    <p class="lead">The swarm searched everywhere and came back empty-handed. The link may be old, or the address may have a typo. Here are the places most people are looking for.</p>
    <div class="actions">${btn('/', 'Go to the home page', 'primary')}${btn('/work/', 'See our work', 'secondary')}</div>
    <ul class="lost__links">
      <li>${link('/services/', 'Services')}</li><li>${link('/mvp-planner/', 'MVP timeline planner')}</li><li>${link('/start-a-project/', 'Start a project')}</li><li>${link('/contact/', 'Contact')}</li>
    </ul>
    <p class="muted lost__tip">Tip: press <kbd>Ctrl</kbd> + <kbd>K</kbd> to jump to any page.</p>
  </div>
</section>`
  };
}
