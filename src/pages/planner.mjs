import { breadcrumbs, crumbLd, ctaBand, link } from '../lib.mjs';

const choice = (name, type, items, checked) => items.map(([v, l, d]) => `
          <label class="chip"><input type="${type}" name="${name}" value="${v}"${(Array.isArray(checked) ? checked.includes(v) : checked === v) ? ' checked' : ''}><span><b>${l}</b>${d ? `<small>${d}</small>` : ''}</span></label>`).join('');

export function plannerPage() {
  const trail = [['/', 'Home'], ['/process/', 'Process'], ['/mvp-planner/', 'MVP timeline planner']];
  const body = `
<section class="page-hero">
  <div class="shell">
    ${breadcrumbs(trail)}
    <div class="page-hero__grid">
      <h1>How long will your product take?</h1>
      <p class="lead">Pick what you are building and what it needs. You get an indicative timeline for each phase, based on how our projects usually run. It is a starting point for a conversation, not a quote.</p>
    </div>
  </div>
</section>
<section class="sec sec--tight planner-sec" aria-label="Timeline planner">
  <div class="shell planner">
    <form class="planner__form" data-planner aria-label="Describe your product">
      <fieldset>
        <legend>What are you building?</legend>
        <div class="chips chips--two">${choice('type', 'radio', [['website', 'Website', 'Marketing or company site'], ['webapp', 'Web app', 'Runs in the browser'], ['mobile', 'Mobile app', 'iOS and Android'], ['both', 'Mobile and web', 'App plus a web dashboard']], 'mobile')}
        </div>
      </fieldset>
      <fieldset>
        <legend>Where are you now?</legend>
        <div class="chips">${choice('stage', 'radio', [['idea', 'An idea', 'Nothing designed yet'], ['designs', 'I have designs', 'Screens or a prototype'], ['existing', 'Improving a product', 'Something already exists']], 'idea')}
        </div>
      </fieldset>
      <fieldset>
        <legend>What does it need? <span>Choose any</span></legend>
        <div class="chips chips--small">${choice('features', 'checkbox', [['accounts', 'Sign-up and accounts'], ['payments', 'Payments or wallet'], ['chat', 'Chat or messaging'], ['maps', 'Maps or location'], ['bookings', 'Bookings or tickets'], ['notifications', 'Notifications'], ['admin', 'Admin dashboard'], ['integrations', 'Third-party integrations'], ['ai', 'AI features']], ['accounts'])}
        </div>
      </fieldset>
      <fieldset>
        <legend>How much for the first release?</legend>
        <div class="chips">${choice('scope', 'radio', [['mvp', 'Lean MVP', 'The core journey, done well'], ['v1', 'Fuller first version', 'More features at launch']], 'mvp')}
        </div>
      </fieldset>
    </form>
    <div class="planner__out">
      <div class="plan" data-plan-out>
        <noscript><p>The planner needs JavaScript. As a rough guide, a lean mobile MVP usually takes three to five months from discovery to launch. ${link('/start-a-project/', 'Tell us about your project')} for a real estimate.</p></noscript>
      </div>
      <p class="sr-only" aria-live="polite" data-plan-live></p>
    </div>
  </div>
</section>
<section class="sec" aria-labelledby="planner-how">
  <div class="shell planner-notes">
    <h2 id="planner-how">How these numbers work</h2>
    <ul class="planner-notes__list">
      <li><h3>Based on our phases</h3><p>Each bar is one phase of ${link('/process/', 'our process')}: Discover, Design, Build and Launch. Phases overlap a little in practice.</p></li>
      <li><h3>Ranges, not promises</h3><p>The low end assumes quick decisions and a clear scope. Integrations, approvals and app store review can push towards the high end.</p></li>
      <li><h3>Agreed in writing</h3><p>After a first conversation we send a written scope with deliverables, a timeline and a price, before any work starts.</p></li>
    </ul>
  </div>
</section>
${ctaBand({ title: 'Want a real timeline?', text: 'Send us a short brief and we reply within 24 hours on working days with an honest view of scope and timing.' })}`;
  return { path: '/mvp-planner/', title: 'MVP Timeline Planner', description: 'Estimate an indicative timeline for your website, web app or mobile app MVP, phase by phase, based on how Lynexa projects usually run.', body, jsonld: [crumbLd(trail)] };
}
