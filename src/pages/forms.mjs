import { breadcrumbs, crumbLd, icon, link, btn } from '../lib.mjs';
import { SITE } from '../site.mjs';
import { SERVICES } from '../content/services.mjs';

// Forms post natively to Netlify Forms (detected at deploy from this static HTML).
// Client-side validation enhances them; they still work without JavaScript.

const consent = (name) => `
  <div class="field" data-field data-msg="Please agree to the privacy notice so we can store and reply to your message.">
    <label class="consent"><input type="checkbox" name="privacy_consent" value="Agreed" required aria-describedby="${name}-consent-err"><span>I agree that Lynexa may store the details I send and use them to reply to me, as described in the <a href="/privacy/">privacy notice</a>.</span></label>
    <p class="error" id="${name}-consent-err"></p>
  </div>`;

const open = (name, action, extra = '') => `
<form class="form" name="${name}" method="POST" action="${action}" data-netlify="true" netlify-honeypot="bot-field" data-validate novalidate${extra}>
  <input type="hidden" name="form-name" value="${name}">
  <p class="hp" aria-hidden="true"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
  <div class="form-summary" role="alert" tabindex="-1"></div>`;

// Single-page form (short forms such as the contact message).
const wrap = (name, action, inner, submitLabel) => `${open(name, action)}
  ${inner}
  ${consent(name)}
  <div class="form__foot">
    <button class="btn btn--primary" type="submit"><span>${submitLabel}</span></button>
    <p>We reply within two working days.</p>
  </div>
</form>`;

// Staged form: one short step at a time. Without JavaScript every step shows and it submits as one form.
const stepped = (name, action, steps, submitLabel) => `${open(name, action, ' data-stepper')}
  <div class="stepper" aria-hidden="true">
    <ol class="stepper__list">${steps.map(([t], i) => `<li data-step-tab="${i}"><span>${i + 1}</span>${t}</li>`).join('')}</ol>
    <div class="stepper__bar"><span data-step-bar></span></div>
  </div>
  <p class="sr-only" aria-live="polite" data-step-status></p>
  ${steps.map(([t, html], i) => `
  <div class="form__step" role="group" aria-labelledby="${name}-step-${i}" data-step="${i}">
    <h3 class="form__step-title" id="${name}-step-${i}" tabindex="-1"><span class="sr-only">Step ${i + 1} of ${steps.length}: </span>${t}</h3>
    ${html}
    ${i === steps.length - 1 ? consent(name) : ''}
  </div>`).join('')}
  <div class="form__nav">
    <button class="btn btn--secondary" type="button" data-prev hidden>${icon.back}<span>Back</span></button>
    <button class="btn btn--primary" type="button" data-next><span>Continue</span></button>
    <button class="btn btn--primary" type="submit" data-submit><span>${submitLabel}</span></button>
    <p>Takes about two minutes. We reply within two working days.</p>
  </div>
</form>`;

const text = (name, form, label, { type = 'text', required = false, auto = '', hint = '', min = 0, msg = '' } = {}) => `
  <div class="field" data-field${msg ? ` data-msg="${msg}"` : ''}>
    <label for="${form}-${name}">${label}${required ? '' : ' <span class="opt">(optional)</span>'}</label>
    ${hint ? `<p class="hint" id="${form}-${name}-hint">${hint}</p>` : ''}
    <input class="input" id="${form}-${name}" name="${name}" type="${type}"${required ? ' required' : ''}${auto ? ` autocomplete="${auto}"` : ''}${min ? ` minlength="${min}"` : ''} aria-describedby="${hint ? `${form}-${name}-hint ` : ''}${form}-${name}-err">
    <p class="error" id="${form}-${name}-err"></p>
  </div>`;

const area = (name, form, label, { required = false, hint = '', min = 0, msg = '' } = {}) => `
  <div class="field" data-field${msg ? ` data-msg="${msg}"` : ''}>
    <label for="${form}-${name}">${label}${required ? '' : ' <span class="opt">(optional)</span>'}</label>
    ${hint ? `<p class="hint" id="${form}-${name}-hint">${hint}</p>` : ''}
    <textarea class="input" id="${form}-${name}" name="${name}"${required ? ' required' : ''}${min ? ` minlength="${min}"` : ''} aria-describedby="${hint ? `${form}-${name}-hint ` : ''}${form}-${name}-err"></textarea>
    <p class="error" id="${form}-${name}-err"></p>
  </div>`;

const select = (name, form, label, options, { required = false, msg = '' } = {}) => `
  <div class="field" data-field${msg ? ` data-msg="${msg}"` : ''}>
    <label for="${form}-${name}">${label}${required ? '' : ' <span class="opt">(optional)</span>'}</label>
    <select class="input" id="${form}-${name}" name="${name}"${required ? ' required' : ''} aria-describedby="${form}-${name}-err">
      <option value="">Choose one</option>
      ${options.map((o) => `<option>${o}</option>`).join('')}
    </select>
    <p class="error" id="${form}-${name}-err"></p>
  </div>`;

const pills = (name, form, label, options, { required = false, msg = '', hint = '' } = {}) => `
  <fieldset class="field" data-field data-group${required ? ' data-required' : ''}${msg ? ` data-msg="${msg}"` : ''} aria-describedby="${hint ? `${form}-${name}-hint ` : ''}${form}-${name}-err">
    <legend>${label}${required ? '' : ' <span class="opt">(optional)</span>'}</legend>
    ${hint ? `<p class="hint" id="${form}-${name}-hint">${hint}</p>` : ''}
    <div class="choices">${options.map((o) => `<label class="choice"><input type="radio" name="${name}" value="${o}"${required ? ' required' : ''}><span>${o}</span></label>`).join('')}</div>
    <p class="error" id="${form}-${name}-err"></p>
  </fieldset>`;

export function projectForm() {
  const f = 'project';
  const help = [...SERVICES.map((s) => [s.slug, s.nav]), ['not-sure', 'Not sure yet']];
  return stepped('project-enquiry', '/project-received/', [
    ['About you', `
      ${text('name', f, 'Full name', { required: true, auto: 'name', msg: 'Enter your name so we know who to reply to.' })}
      ${text('email', f, 'Email address', { type: 'email', required: true, auto: 'email', msg: 'Enter your email address so we can reply.' })}
      ${text('company', f, 'Company or startup name', { auto: 'organization' })}`],
    ['The project', `
      <fieldset class="field" data-field data-group data-required data-msg="Choose at least one option, or “Not sure yet”." aria-describedby="${f}-help-err">
        <legend>What do you need help with?</legend>
        <p class="hint">Choose all that apply.</p>
        <div class="choices">${help.map(([v, l]) => `<label class="choice"><input type="checkbox" name="help_with" value="${v}"><span>${l}</span></label>`).join('')}</div>
        <input type="hidden" name="services_needed" value="">
        <p class="error" id="${f}-help-err"></p>
      </fieldset>
      ${area('description', f, 'Tell us about it', { required: true, min: 30, hint: 'What are you building, who is it for, and where are you now?', msg: 'Tell us a little about the project.' })}`],
    ['Timing and budget', `
      ${pills('launch', f, 'When would you like to launch?', ['Within 3 months', '3 to 6 months', '6 to 12 months', 'No fixed date'], { required: true, msg: 'Choose a rough target, or “No fixed date”.' })}
      ${pills('budget', f, 'Expected budget', ['Under $10k', '$10k to $25k', '$25k to $50k', 'Over $50k', 'Not sure yet', 'Venture partnership'], { hint: 'Approximate, in US dollars or the naira equivalent.' })}`]
  ], 'Send project brief');
}

export function ventureForm() {
  const f = 'venture';
  return stepped('venture-application', '/application-received/', [
    ['About you', `
      ${text('name', f, 'Your name', { required: true, auto: 'name', msg: 'Enter your name.' })}
      ${text('email', f, 'Email address', { type: 'email', required: true, auto: 'email', msg: 'Enter your email address so we can reply.' })}`],
    ['The idea', `
      ${text('venture', f, 'Venture or working name', { required: true, msg: 'Give your idea a name, even a working one.' })}
      ${text('one_liner', f, 'Your idea in one sentence', { required: true, msg: 'Describe the idea in one sentence.' })}
      ${area('details', f, 'The problem, the customer and where you are today', { required: true, min: 50, hint: 'Who has the problem, how they solve it now, what you have done so far, and who is on the team.', msg: 'Tell us more about the idea and where you are.' })}`],
    ['Partnership', `
      ${pills('stage', f, 'Stage', ['Idea', 'Validated with customers', 'Prototype', 'Early product', 'Revenue'], { required: true, msg: 'Choose your current stage.' })}
      ${pills('model', f, 'What kind of partnership interests you?', ['Startup enablement', 'Product partnership', 'Cash and equity', 'Equity for service', 'Build, operate, transfer', 'Not sure yet'], { required: true, msg: 'Choose the closest option, or “Not sure yet”.' })}
      ${text('website', f, 'Website or deck link', { type: 'url', auto: 'url' })}`]
  ], 'Submit idea');
}

export function messageForm() {
  const f = 'message';
  return wrap('general-message', '/message-received/', `
  <div class="form__row">
    ${text('name', f, 'Your name', { required: true, auto: 'name', msg: 'Enter your name.' })}
    ${text('email', f, 'Email address', { type: 'email', required: true, auto: 'email', msg: 'Enter your email address so we can reply.' })}
  </div>
  ${area('message', f, 'Message', { required: true, min: 10, msg: 'Write a short message.' })}`, 'Send message');
}

export function contactPage() {
  const trail = [['/', 'Home'], ['/contact/', 'Contact']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>Talk to Lynexa.</h1>
      <div><p class="lead" style="margin-top:0">For new projects, the <a class="link" href="/start-a-project/">project brief</a> is the fastest way to get a useful reply. For anything else, use the details below.</p></div>
    </div>
  </div>
</section>
<section class="sec sec--tight" aria-label="Contact details and message form">
  <div class="shell contact-grid">
    <div>
      <p style="font-weight:700;font-size:1.2rem;margin-bottom:1rem">${SITE.legalName}</p>
      <div class="channels">
        <div class="channel"><span class="channel__icon">${icon.mail}</span><div><h2>Email</h2><a href="mailto:${SITE.email}">${SITE.email}</a><small>Main enquiries</small><p style="margin-top:.75rem"><a href="mailto:${SITE.emailSecondary}" style="font-size:1rem">${SITE.emailSecondary}</a></p><small>Alternative address</small></div></div>
        <div class="channel"><span class="channel__icon channel__icon--wa">${icon.whatsapp}</span><div><h2>WhatsApp</h2><a href="${SITE.whatsappUrl}" target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp<span class="sr-only"> (opens in a new tab)</span></a><small>Quickest for short questions</small></div></div>
        <div class="channel"><span class="channel__icon">${icon.phone}</span><div><h2>Phone</h2><a href="tel:${SITE.phoneIntl}">${SITE.phoneDisplay}</a><small>International: +234 703 827 1812</small></div></div>
        <div class="channel"><span class="channel__icon">${icon.pin}</span><div><h2>Address</h2><address>${SITE.address.lines.join('<br>')}</address>${link(SITE.mapsUrl, 'Get directions in Google Maps')}</div></div>
      </div>
      <p class="muted" style="margin-top:1.5rem;font-size:.95rem">Registered in Nigeria, ${SITE.rc}. We work across time zones; Lagos is GMT+1.</p>
    </div>
    <div>
      <h2 style="font-size:1.6rem;margin-bottom:1.25rem">Send a message</h2>
      ${messageForm()}
    </div>
  </div>
</section>`;
  return { swarm: 'light', path: '/contact/', title: 'Contact Lynexa', description: `Contact Lynexa Innovations Limited in Ikorodu, Lagos: ${SITE.email}, ${SITE.phoneDisplay}, address and directions, or send a message.`, body, jsonld: [crumbLd(trail), { '@context': 'https://schema.org', '@type': 'ContactPage', url: 'https://lynexa.co/contact/', about: { '@id': 'https://lynexa.co/#organization' } }] };
}

export function startPage() {
  const trail = [['/', 'Home'], ['/start-a-project/', 'Start a project']];
  const body = `
<section class="page-hero" style="padding-bottom:2rem">
  <div class="shell">
    ${breadcrumbs(trail)}
    <h1>Tell us about your project.</h1>
    <p class="lead">A few minutes now saves a round of emails later. We read every brief and reply within two working days, including when we are not the right fit.</p>
  </div>
</section>
<section class="sec sec--tight" aria-label="Project brief">
  <div class="shell contact-grid">
    <aside style="display:grid;gap:2rem;align-content:start">
      <div>
        <h2 style="font-size:1.25rem;margin-bottom:1rem">What happens next</h2>
        <ol class="checklist" style="gap:.9rem">
          <li>${icon.check}We review your brief and reply within two working days.</li>
          <li>${icon.check}If it looks like a fit, we set up a call.</li>
          <li>${icon.check}You receive a written scope with deliverables, timeline and price.</li>
        </ol>
      </div>
      <div class="note">Sharing something sensitive? Keep the brief high-level. We are happy to sign a mutual NDA before going into detail.</div>
      <p class="muted" style="font-size:.95rem">Prefer email? Write to <a class="link" href="mailto:${SITE.email}">${SITE.email}</a></p>
    </aside>
    ${projectForm()}
  </div>
</section>`;
  return { swarm: 'light', path: '/start-a-project/', title: 'Start a Project', description: 'Send Lynexa a short project brief for product design, MVP development, websites, branding or pitch materials. We reply within two working days.', body, jsonld: [crumbLd(trail)] };
}

const thanks = (path, title, h1, text, steps) => ({ swarm: 'light',
  path, title, noindex: true, description: 'Thank you for contacting Lynexa.',
  body: `
<section class="center-page">
  <div class="shell">
    <span class="channel__icon" style="width:56px;height:56px;margin-bottom:2rem;background:var(--violet)">${icon.check}</span>
    <h1 tabindex="-1">${h1}</h1>
    <p class="lead">${text}</p>
    <ol class="next-steps">${steps.map((s, i) => `<li><span class="step__n" aria-hidden="true">${i + 1}</span><p>${s}</p></li>`).join('')}</ol>
    <div class="actions">${btn('/work/', 'Explore our work', 'primary')}${btn('/', 'Back to home', 'secondary')}</div>
  </div>
</section>`
});

export const thanksPages = () => [
  thanks('/project-received/', 'Project brief received', 'Thanks, your brief is with us.', 'We read every brief personally. Expect a reply from the Lynexa team within two working days.', ['We review your brief and check how we can help.', `If it is a fit, we email you to arrange a call. Check your spam folder for messages from ${SITE.email}.`, 'After the call, you receive a written scope with deliverables, timeline and price.']),
  thanks('/application-received/', 'Venture idea received', 'Thanks for sharing your idea.', 'Your submission is confidential. We review every idea and reply within two working days, including when it is not a fit.', ['We read your submission and look at the market.', 'For promising ideas, we arrange a conversation with the founders.', 'Nothing is agreed until both sides sign written terms.']),
  thanks('/message-received/', 'Message received', 'Thanks, your message is on its way.', 'We reply to every message within two working days.', [`Replies come from ${SITE.email}.`, 'If it is urgent, call us on ' + SITE.phoneDisplay + '.'])
];
