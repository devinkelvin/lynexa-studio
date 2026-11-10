import { breadcrumbs, crumbLd, btn, link } from '../lib.mjs';
import { SITE } from '../site.mjs';

const UPDATED = '10 November 2026';

export function privacyPage() {
  const trail = [['/', 'Home'], ['/privacy/', 'Privacy']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <h1>Privacy notice</h1>
    <p class="lead">How ${SITE.legalName} handles the personal information you share through this website. Last updated ${UPDATED}.</p>
  </div>
</section>
<section class="sec sec--tight">
  <div class="shell prose">
    <h2>Who we are</h2>
    <p>${SITE.legalName} (“Lynexa”, “we”) is a company registered in Nigeria (${SITE.rc}), at ${SITE.address.full}. We are responsible for the personal information collected through lynexa.co. Contact us about privacy at <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>

    <h2>What we collect</h2>
    <p>We only collect what you choose to send us through our forms or by email:</p>
    <ul>
      <li>Your name, email address and, if you provide them, phone number and company name.</li>
      <li>What you tell us about your project or idea, including stage, timeline, budget range and how you heard about us.</li>
      <li>Technical information that our hosting provider records automatically when any website is visited, such as IP address, browser type and the pages requested, used for security and to keep the site running.</li>
    </ul>
    <p>This website does not use advertising or analytics cookies, and our fonts are hosted on our own domain, not loaded from third parties.</p>

    <h2>Why we use it</h2>
    <ul>
      <li>To reply to your enquiry and discuss possible work together, based on your consent and on steps you ask us to take before entering a contract.</li>
      <li>To keep records of our business conversations, based on our legitimate interest in running the company.</li>
      <li>To protect the website from spam and abuse.</li>
    </ul>
    <p>We do not sell your information, and we do not use it for marketing unless you separately agree.</p>

    <h2>Who we share it with</h2>
    <p>Form submissions are processed by Netlify, Inc., which hosts this website and stores submissions on our behalf. Netlify may process data outside Nigeria, including in the United States; we rely on its contractual data protection commitments. Our email is handled by our email provider. We may share information with professional advisers or authorities where the law requires it.</p>

    <h2>How long we keep it</h2>
    <p>We keep enquiries for as long as needed to respond and follow up, and normally no longer than 24 months if no working relationship begins. If we work together, records are kept for as long as our agreement and legal obligations require.</p>

    <h2>Your rights</h2>
    <p>Under the Nigeria Data Protection Act 2023 and other laws that may apply to you, you can ask to access, correct or delete your information, object to or restrict how we use it, withdraw consent at any time, and ask for a copy in a portable format. Email <a href="mailto:${SITE.email}">${SITE.email}</a> and we will respond within the time the law allows. You can also complain to the Nigeria Data Protection Commission.</p>

    <h2>Confidential project information</h2>
    <p>We treat project and venture details you share as confidential, whether or not an NDA has been signed. Please avoid sending highly sensitive information through the website; we are happy to sign a mutual NDA first.</p>

    <h2>Changes</h2>
    <p>If we change this notice we will update the date at the top of this page.</p>
  </div>
</section>`;
  return { path: '/privacy/', title: 'Privacy Notice', description: 'How Lynexa Innovations Limited collects, uses and protects personal information shared through lynexa.co, and your rights under Nigerian data protection law.', body, jsonld: [crumbLd(trail)] };
}

export function termsPage() {
  const trail = [['/', 'Home'], ['/terms/', 'Terms']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <h1>Terms of use</h1>
    <p class="lead">The terms for using lynexa.co. Last updated ${UPDATED}.</p>
  </div>
</section>
<section class="sec sec--tight">
  <div class="shell prose">
    <h2>About these terms</h2>
    <p>This website is operated by ${SITE.legalName} (${SITE.rc}). By using it you agree to these terms. Separate written agreements govern any services we provide; these terms do not create a client relationship.</p>
    <h2>Information on this site</h2>
    <p>We describe our services, work and ventures as accurately as we can, including the current status of each project. Content is for general information and may change. Nothing on this website is a binding offer, a quotation, a promise of results or an offer of investment. Prices, timelines and any partnership terms are only agreed in writing.</p>
    <h2>Ventures and partnerships</h2>
    <p>Information about venture partnerships, including equity-based arrangements, describes possible ways of working together. Submitting an idea does not create any obligation for either party. Seek independent legal and financial advice before entering any equity arrangement.</p>
    <h2>Intellectual property</h2>
    <p>The Lynexa name, logo, site design and written content belong to ${SITE.legalName}. Client and venture names, logos and product designs shown here belong to their respective owners and appear with permission or as part of our own ventures. Photography credited to Pexels is used under the Pexels licence. Please do not copy material from this site without permission.</p>
    <h2>Ideas you share</h2>
    <p>You keep ownership of the ideas and materials you send us. We use them only to assess and respond to your enquiry, and treat them as confidential.</p>
    <h2>Links to other sites</h2>
    <p>We link to some external websites, such as product sites and maps. We are not responsible for their content or practices.</p>
    <h2>Liability</h2>
    <p>We work to keep this website accurate and available, but provide it as it is. To the extent the law allows, we are not liable for losses arising from use of, or reliance on, this website.</p>
    <h2>Governing law</h2>
    <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>
    <h2>Contact</h2>
    <p>Questions about these terms: <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
  </div>
</section>`;
  return { path: '/terms/', title: 'Terms of Use', description: 'Terms for using the Lynexa Innovations Limited website, lynexa.co.', body, jsonld: [crumbLd(trail)] };
}

export function notFoundPage() {
  return {
    path: '/404', title: 'Page not found', noindex: true, description: 'This page could not be found.',
    body: `
<section class="center-page">
  <div class="shell">
    <p class="muted" style="font-weight:600;margin-bottom:1rem">Error 404</p>
    <h1>This page isn’t built yet. Or it moved.</h1>
    <p class="lead">The link may be old, or the address may have a typo. Here are the places most people are looking for.</p>
    <div class="actions">${btn('/', 'Go to the home page', 'primary')}${btn('/work/', 'See our work', 'secondary')}</div>
    <ul style="display:grid;gap:.75rem;margin-top:2.5rem">
      <li>${link('/services/', 'Services')}</li><li>${link('/start-a-project/', 'Start a project')}</li><li>${link('/contact/', 'Contact')}</li>
    </ul>
  </div>
</section>`
  };
}
