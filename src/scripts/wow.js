/* Lynexa interactive extras: idea sketch (hero), Zengly prototype, MVP timeline planner, quick menu (Ctrl/Cmd+K),
   link prefetch, Lagos clock, brief prefill. Zero dependencies; every feature works without the swarm, and the swarm
   (window.LynexaSwarm.build) animates it when present. */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const swarm = () => (window.LynexaSwarm && window.LynexaSwarm.build ? window.LynexaSwarm : null);

  /* ------------------------------------------------------------------ 1. Pitch us your idea (home hero) */
  const KINDS = [
    { k: 'pay', words: ['pay', 'money', 'wallet', 'bank', 'loan', 'save', 'saving', 'invest', 'split', 'bill', 'naira', 'transfer', 'ajo', 'esusu', 'contribution', 'fintech', 'budget'], suffix: 'Pay',
      features: ['Wallet and transfers', 'Split and share costs', 'Spending insights'], card: ['Group balance', '₦45,000'], rows: [['Rent, Yaba flat', '₦30,000'], ['Shared groceries', '₦9,500'], ['Internet', '₦5,500']], cta: 'Collect contributions' },
    { k: 'move', words: ['ride', 'bus', 'transport', 'travel', 'ticket', 'tickets', 'trip', 'delivery', 'logistics', 'car', 'bike', 'keke', 'okada', 'driver', 'route', 'commute', 'flight'], suffix: 'Go',
      features: ['Live routes and fares', 'Tickets in one tap', 'Trip history'], card: ['Next departure', '7:45 am'], rows: [['Ikorodu to CMS', '₦1,500'], ['Lagos to Ibadan', '₦6,000'], ['Airport shuttle', '₦8,000']], cta: 'Book a seat' },
    { k: 'law', words: ['law', 'legal', 'lawyer', 'lawyers', 'court', 'contract', 'contracts', 'case', 'cases', 'firm', 'compliance'], suffix: 'Lex',
      features: ['Case and matter tracking', 'Research with sources', 'Client updates'], card: ['Open matters', '12'], rows: [['Lease review', 'Due Fri'], ['Company search', 'In progress'], ['Hearing prep', 'Tue 9am']], cta: 'Start a new matter' },
    { k: 'home', words: ['property', 'land', 'house', 'houses', 'rent', 'rental', 'real', 'estate', 'apartment', 'tenant', 'tenants', 'landlord', 'survey', 'title'], suffix: 'Nest',
      features: ['Verified listings', 'Document checklist', 'Secure payments'], card: ['Title status', 'Verified'], rows: [['Survey plan', 'Uploaded'], ['Deed of assignment', 'Pending'], ['Governor’s consent', 'Not started']], cta: 'Schedule an inspection' },
    { k: 'care', words: ['health', 'clinic', 'doctor', 'doctors', 'hospital', 'pharmacy', 'fitness', 'wellness', 'patient', 'patients', 'medicine', 'care'], suffix: 'Care',
      features: ['Appointments', 'Records in one place', 'Reminders'], card: ['Next appointment', 'Thu, 10:30'], rows: [['Dr Adebayo', 'General'], ['Lab results', 'Ready'], ['Refill', 'In 3 days']], cta: 'Book a visit' },
    { k: 'learn', words: ['learn', 'learning', 'school', 'student', 'students', 'course', 'courses', 'tutor', 'class', 'exam', 'exams', 'teach', 'teacher', 'jamb', 'waec'], suffix: 'Learn',
      features: ['Short lessons', 'Practice tests', 'Progress tracking'], card: ['This week', '4 lessons'], rows: [['Mathematics', '80%'], ['English', '65%'], ['Mock exam', 'Sat']], cta: 'Continue learning' },
    { k: 'shop', words: ['shop', 'store', 'sell', 'selling', 'buy', 'market', 'marketplace', 'vendor', 'vendors', 'food', 'restaurant', 'order', 'orders', 'fashion', 'groceries'], suffix: 'Mart',
      features: ['Catalogue and search', 'Checkout and delivery', 'Order tracking'], card: ['Today’s orders', '38'], rows: [['Jollof combo', '₦3,500'], ['Ankara set', '₦18,000'], ['Delivery to Lekki', 'On the way']], cta: 'Place an order' },
    { k: 'people', words: ['event', 'events', 'party', 'friends', 'community', 'social', 'chat', 'wedding', 'church', 'club', 'network', 'creators', 'fans', 'dating'], suffix: 'Circle',
      features: ['Profiles and groups', 'Events and RSVPs', 'Messaging'], card: ['Going this weekend', '126'], rows: [['Tola’s birthday', 'Sat'], ['Tech meetup, Yaba', 'Thu'], ['Book club', 'Sun']], cta: 'Create an event' }
  ];
  const GENERIC = { k: 'idea', suffix: 'Hub', features: ['Simple onboarding', 'The core workflow', 'Dashboard and insights'], card: ['Today', '3 tasks'], rows: [['First step', 'Done'], ['Second step', 'In progress'], ['Next', 'Planned']], cta: 'Get started' };
  const STOP = new Set('a an the for to of and or with in on at by from that this my our your their it its is are be app apps platform website site product tool tools system service services solution which who people using use make makes help helps easy easier simple better online digital nigeria nigerian lagos africa african like more less into across'.split(' '));

  function concept(idea) {
    const words = idea.toLowerCase().replace(/[^a-z0-9\s'’-]/g, ' ').split(/\s+/).filter(Boolean);
    let best = GENERIC, score = 0;
    KINDS.forEach((k) => { const sc = words.filter((w) => k.words.includes(w) || k.words.includes(w.replace(/s$/, ''))).length; if (sc > score) { score = sc; best = k; } });
    const key = words.filter((w) => !STOP.has(w) && w.length > 2 && !(best.words || []).includes(w)).sort((a, b) => b.length - a.length)[0] || words.find((w) => !STOP.has(w)) || 'Idea';
    const word = key.replace(/['’-]/g, '');
    const name = word.charAt(0).toUpperCase() + word.slice(1, 12) + ' ' + best.suffix;
    return { ...best, name };
  }

  const pitch = $('[data-pitch]');
  const build = $('.hero .build');
  if (pitch && build) {
    const input = $('input', pitch);
    const original = build.innerHTML;
    const live = $('[data-pitch-live]');
    const reset = () => {
      build.innerHTML = original;
      build.setAttribute('aria-label', 'How an idea becomes a product, shown with Zengly’s split-bill feature');
      input.value = '';
      if (live) live.textContent = 'Showing the Zengly example again.';
    };
    pitch.addEventListener('submit', (e) => {
      e.preventDefault();
      const idea = input.value.trim().replace(/\s+/g, ' ').slice(0, 140);
      if (idea.length < 6) { input.setAttribute('aria-invalid', 'true'); $('.pitch__hint', pitch).textContent = 'Give us a few words about your idea, for example “an app for splitting rent with flatmates”.'; input.focus(); return; }
      input.removeAttribute('aria-invalid');
      const c = concept(idea);
      const brief = '/start-a-project/?idea=' + encodeURIComponent(idea) + '&name=' + encodeURIComponent(c.name);
      build.setAttribute('aria-label', 'A first sketch of your idea, ' + c.name);
      build.innerHTML = `
      <span class="build__line" aria-hidden="true"></span>
      <div class="build__stage build__stage--idea">
        <p class="build__label"><b>1</b>Your idea</p>
        <div class="build__idea">
          <p class="build__note-text">“${esc(idea)}”</p>
          <p>Working name: <b>${esc(c.name)}</b></p>
        </div>
      </div>
      <div class="build__stage">
        <p class="build__label"><b>2</b>Sketched</p>
        <div class="build__frame build__frame--wire" aria-hidden="true">
          <div class="phone"><span class="phone__island"></span><div class="wire">
            <i class="w-a"></i><i class="w-b"></i><i class="w-c"></i>
            <span class="w-row"><i></i><i></i><i></i></span><i class="w-d"></i><i class="w-d"></i><i class="w-e"></i>
          </div></div>
        </div>
        <ul class="sketch-features">${c.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      </div>
      <div class="build__stage">
        <p class="build__label"><b>3</b>First screen</p>
        <div class="build__frame build__frame--real build__frame--concept">
          <div class="phone"><span class="phone__island"></span>
            <div class="concept concept--${c.k}">
              <p class="concept__bar"><span class="concept__logo" aria-hidden="true">${esc(c.name.charAt(0))}</span>${esc(c.name)}</p>
              <div class="concept__card"><p>${esc(c.card[0])}</p><p class="concept__big">${esc(c.card[1])}</p></div>
              <ul class="concept__rows">${c.rows.map(([a, b]) => `<li><span>${esc(a)}</span><span>${esc(b)}</span></li>`).join('')}</ul>
              <p class="concept__cta">${esc(c.cta)}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="build__caption sketch-caption">
        <p>A first sketch of ${esc(c.name)}, made from your sentence in seconds. A real product starts with a discovery conversation, and that part is on us.</p>
        <p class="sketch-actions"><a class="btn btn--primary btn--sm" href="${brief}"><span>Turn this into a brief</span></a><button class="link" type="button" data-pitch-reset>Show the Zengly example</button></p>
      </div>`;
      $('[data-pitch-reset]', build).addEventListener('click', reset);
      if (live) live.textContent = 'Sketched ' + c.name + ': ' + c.features.join(', ') + '. You can turn it into a brief.';
      const s = swarm();
      if (s) {
        const items = [];
        $$('.build__label', build).forEach((el, i) => items.push({ el, type: 'text', lane: 'labels', speed: 1.4, wait: i ? 0 : 0 }));
        items.push({ el: $('.build__idea', build), type: 'box', lane: 'idea' });
        $$('.build__idea p', build).forEach((el) => items.push({ el, type: 'text', lane: 'idea', speed: 1.8 }));
        items.push({ el: $('.build__frame--wire', build), type: 'box', lane: 'wf', wait: 250 });
        $$('.wire > i, .wire .w-row i', build).forEach((el, i) => items.push({ el, type: 'wire', lane: 'w' + (i % 3), wait: i < 3 ? 700 : 0 }));
        $$('.sketch-features li', build).forEach((el) => items.push({ el, type: 'text', lane: 'feat', speed: 1.6, wait: 400 }));
        items.push({ el: $('.build__frame--concept', build), type: 'box', lane: 'phone', wait: 450 });
        $$('.concept__bar, .concept__card p, .concept__rows li, .concept__cta', build).forEach((el, i) => items.push({ el, type: 'text', lane: 'c' + (i % 3), speed: 1.6, wait: i < 3 ? 900 : 0 }));
        items.push({ el: $('.sketch-caption > p', build), type: 'text', lane: 'cap', speed: 3, wait: 1600 });
        items.push({ el: $('.sketch-actions', build), type: 'box', lane: 'cap' });
        s.build(items);
      }
    });
  }

  /* ------------------------------------------------------------------ 2. Zengly prototype */
  $$('[data-proto]').forEach((proto) => {
    const screens = $$('.proto__screen', proto);
    const status = $('[data-proto-status]', proto.parentElement) || $('[data-proto-status]');
    const nav = $$('[data-proto-go]', proto.closest('.proto') || document);
    let current = 'home', theme = 'dark', history = [];
    const show = (id, back) => {
      if (id === 'home') id = theme === 'light' ? 'home-light' : 'home';
      const next = screens.find((s) => s.dataset.screen === id);
      if (!next) return;
      const prev = screens.find((s) => s.classList.contains('is-on'));
      if (prev === next) return;
      if (!back && prev) history.push(prev.dataset.screen);
      screens.forEach((s) => { const on = s === next; s.classList.toggle('is-on', on); s.classList.toggle('is-back', !!back && on); s.setAttribute('aria-hidden', String(!on)); $$('button', s).forEach((b) => { b.tabIndex = on ? 0 : -1; }); });
      current = id;
      nav.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.protoGo === id || (b.dataset.protoGo === 'home' && id === 'home-light'))));
      if (status) status.textContent = 'Showing ' + next.dataset.title + '.';
    };
    proto.addEventListener('click', (e) => {
      const b = e.target.closest('[data-go]');
      if (!b) return;
      const go = b.dataset.go;
      if (go === 'back') show(history.pop() || 'home', true); else show(go, false);
    });
    nav.forEach((b) => b.addEventListener('click', () => { history = []; show(b.dataset.protoGo, false); }));
    const tbtn = $('[data-proto-theme]', proto.closest('.proto') || document);
    if (tbtn) tbtn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      tbtn.setAttribute('aria-pressed', String(theme === 'light'));
      if (current === 'home' || current === 'home-light') show('home', false);
    });
    show('home', false);
  });

  /* ------------------------------------------------------------------ 3. MVP timeline planner (indicative only) */
  const planner = $('[data-planner]');
  if (planner) {
    const out = $('[data-plan-out]');
    const BASE = { // weeks [min, max] for discover, design, build, launch
      website: [[1, 1], [1, 2], [2, 3], [1, 1]],
      webapp: [[1, 2], [2, 4], [4, 8], [1, 2]],
      mobile: [[1, 2], [3, 5], [6, 10], [1, 2]],
      both: [[2, 2], [4, 6], [8, 14], [2, 3]]
    };
    const FEAT = { accounts: 1, payments: 2, chat: 2, maps: 2, admin: 2, notifications: 0.5, ai: 2, bookings: 2, integrations: 1.5 };
    const LABEL = { website: 'marketing website', webapp: 'web app', mobile: 'mobile app', both: 'mobile and web app' };
    const read = () => {
      const fd = new FormData(planner);
      return { type: fd.get('type') || 'mobile', stage: fd.get('stage') || 'idea', scope: fd.get('scope') || 'mvp', feats: fd.getAll('features') };
    };
    const calc = ({ type, stage, scope, feats }) => {
      let [d, de, b, l] = BASE[type].map((x) => x.slice());
      const extra = feats.reduce((s, f) => s + (FEAT[f] || 0), 0);
      if (type !== 'website') { b[0] += Math.round(extra * 0.7); b[1] += Math.ceil(extra); de[1] += Math.ceil(feats.length / 3); }
      if (feats.includes('payments')) l[1] += 1;
      if (scope === 'v1') { b = b.map((x) => Math.round(x * 1.6)); de = de.map((x) => Math.round(x * 1.3)); }
      if (stage === 'designs') { de = [1, Math.max(1, Math.round(de[1] * 0.4))]; }
      if (stage === 'existing') { d = [d[0] + 1, d[1] + 1]; b = b.map((x) => Math.max(2, Math.round(x * 0.7))); }
      const phases = [['Discover', d, 'Research, scope and a clear product plan'], ['Design', de, stage === 'designs' ? 'Review and refine your designs, then the design system' : 'Flows, wireframes, interface and a clickable prototype'], ['Build', b, 'Engineering, testing and the release candidate'], ['Launch', l, type === 'mobile' || type === 'both' ? 'App store review, launch support and the first fixes' : 'Go-live, analytics and the first fixes']];
      const min = phases.reduce((s, p) => s + p[1][0], 0), max = phases.reduce((s, p) => s + p[1][1], 0);
      return { phases, min, max };
    };
    const months = (w) => (w < 9 ? w + ' weeks' : String(Math.round((w / 4.33) * 2) / 2).replace('.5', '½') + ' months');
    const range = (a, b) => { const A = months(a), B = months(b); return A.endsWith('months') && B.endsWith('months') ? A.replace(' months', '') + ' to ' + B : A + ' to ' + B; };
    const STAGE = { idea: 'starting from an idea', designs: 'designs ready', existing: 'improving an existing product' };
    const render = (animate) => {
      const v = read(), r = calc(v);
      const scale = r.max * 1.0;
      let start = 0;
      const rec = v.stage === 'idea' ? 'Start with Discover and a clickable prototype first. It takes about ' + (r.phases[0][1][0] + r.phases[1][1][0]) + '–' + (r.phases[0][1][1] + r.phases[1][1][1]) + ' weeks and lets you test the idea, or raise, before committing to the full build.' : v.stage === 'existing' ? 'Begin with a short product review of what exists, then rebuild in priority order so users keep a working product throughout.' : 'With designs in hand we can move into Build sooner. We will still review them for gaps before engineering starts.';
      out.innerHTML = `
        <p class="plan__total"><span>Indicative timeline for a ${v.scope === 'v1' ? 'fuller first version of a' : 'lean MVP'} ${LABEL[v.type]}</span><b>${range(r.min, r.max)}</b></p>
        <ol class="plan__bars">${r.phases.map(([n, [a, b], note]) => { const left = (start / scale) * 100; start += (a + b) / 2; return `<li><div class="plan__head"><b>${n}</b><span>${a === b ? a : a + '–' + b} week${b > 1 ? 's' : ''}</span></div><span class="plan__track"><i style="--l:${left.toFixed(1)}%;--w:${Math.max(6, ((a + b) / 2 / scale) * 100).toFixed(1)}%"></i></span><p>${note}</p></li>`; }).join('')}</ol>
        <p class="plan__rec">${rec}</p>
        <p class="plan__note">Indicative only: a starting point for the conversation, not a quote or a commitment. Real timelines are agreed after discovery.</p>
        <p class="plan__actions"><a class="btn btn--light" href="/start-a-project/?plan=${encodeURIComponent(`${v.scope === 'v1' ? 'Fuller first version' : 'Lean MVP'} ${LABEL[v.type]}; ${STAGE[v.stage]}; features: ${v.feats.join(', ') || 'core only'}; indicative ${range(r.min, r.max)}`)}"><span>Send this plan with a brief</span></a></p>`;
      const live = $('[data-plan-live]');
      if (live) live.textContent = 'Indicative timeline: ' + range(r.min, r.max) + '.';
      const s = swarm();
      if (s && animate) {
        const items = [{ el: $('.plan__total b', out), type: 'text', lane: 't', speed: 1.4 }];
        $$('.plan__bars li', out).forEach((li, i) => { items.push({ el: $('.plan__track i', li), type: 'wire', lane: 'b' + i, wait: 150 + i * 120, dur: 520 }); items.push({ el: $('.plan__head', li), type: 'text', lane: 'h' + (i % 2), speed: 1.8 }); });
        s.build(items, { tempo: 0.8 });
      }
    };
    let t = 0;
    planner.addEventListener('change', () => { clearTimeout(t); t = setTimeout(() => render(true), 120); });
    planner.addEventListener('submit', (e) => e.preventDefault());
    render(false);
  }

  /* ------------------------------------------------------------------ 4. Brief prefill from the sketch or the planner */
  const desc = $('#project-description');
  if (desc) {
    const q = new URLSearchParams(location.search);
    const idea = q.get('idea'), name = q.get('name'), plan = q.get('plan');
    const lines = [];
    if (idea) lines.push('My idea: ' + idea.slice(0, 300) + (name ? ' (working name: ' + name.slice(0, 40) + ')' : ''));
    if (plan) lines.push('From the timeline planner: ' + plan.slice(0, 400));
    if (lines.length && !desc.value) { desc.value = lines.join('\n') + '\n\n'; const n = $('[data-prefill-note]'); if (n) n.hidden = false; }
  }

  /* ------------------------------------------------------------------ 5. Quick menu: Ctrl/Cmd+K */
  const PAGES = [
    ['Home', '/'], ['Work', '/work/'], ['Zengly case study', '/work/zengly/'], ['Swiftly', '/work/swiftly/'], ['Websites we have designed', '/websites/'],
    ['Services', '/services/'], ['Process', '/process/'], ['MVP timeline planner', '/mvp-planner/'], ['Ventures and partnerships', '/ventures/'], ['About Lynexa', '/about/'],
    ['Contact', '/contact/'], ['Start a project', '/start-a-project/'], ['Privacy notice', '/privacy/'], ['Terms of use', '/terms/']
  ];
  const extraLinks = $$('[data-cmdk-item]').map((a) => [a.dataset.cmdkItem, a.getAttribute('href')]);
  const ITEMS = [...PAGES, ...extraLinks];
  let dlg = null;
  const openMenu = () => {
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.className = 'cmdk';
      dlg.setAttribute('aria-label', 'Quick menu');
      dlg.innerHTML = `<form method="dialog" class="cmdk__box"><label class="sr-only" for="cmdk-q">Go to a page</label><input id="cmdk-q" class="cmdk__q" type="text" role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-autocomplete="list" placeholder="Go to… (Work, Process, WhatsApp)" autocomplete="off"><ul id="cmdk-list" class="cmdk__list" role="listbox"></ul><p class="cmdk__hint"><kbd>↑</kbd><kbd>↓</kbd> to move, <kbd>Enter</kbd> to open, <kbd>Esc</kbd> to close</p></form>`;
      document.body.appendChild(dlg);
      const q = $('.cmdk__q', dlg), list = $('.cmdk__list', dlg);
      let sel = 0, shown = [];
      const draw = () => {
        const t = q.value.trim().toLowerCase();
        shown = ITEMS.filter(([l]) => !t || l.toLowerCase().includes(t) || t.split(' ').every((w) => l.toLowerCase().includes(w)));
        sel = Math.min(sel, Math.max(0, shown.length - 1));
        list.innerHTML = shown.length ? shown.map(([l], i) => `<li role="option" id="cmdk-${i}" data-i="${i}" aria-selected="${i === sel}">${esc(l)}</li>`).join('') : '<li class="cmdk__empty" role="option" aria-disabled="true" aria-selected="false">No matching page. Try “work” or “contact”.</li>';
        q.setAttribute('aria-activedescendant', shown.length ? 'cmdk-' + sel : '');
      };
      q.addEventListener('input', () => { sel = 0; draw(); });
      q.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(shown.length - 1, sel + 1); draw(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); draw(); }
        else if (e.key === 'Enter') { e.preventDefault(); go(shown[sel]); }
      });
      const go = (it) => {
        if (!it) return;
        dlg.close();
        if (/^https?:/.test(it[1])) window.open(it[1], '_blank', 'noopener');
        else if (/^mailto:/.test(it[1])) location.href = it[1];
        else { const a = document.createElement('a'); a.href = it[1]; document.body.appendChild(a); a.click(); a.remove(); }
      };
      list.addEventListener('click', (e) => { const li = e.target.closest('[data-i]'); if (li) go(shown[+li.dataset.i]); });
      dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener('close', () => { const b = $('[data-cmdk-open]'); if (b) b.focus(); });
      draw();
    }
    const q = $('.cmdk__q', dlg);
    q.value = ''; q.dispatchEvent(new Event('input'));
    dlg.showModal(); q.focus();
  };
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openMenu(); }
  });
  $$('[data-cmdk-open]').forEach((b) => b.addEventListener('click', openMenu));

  /* ------------------------------------------------------------------ 6. Prefetch internal pages on intent */
  const done = new Set();
  const prefetch = (a) => {
    try {
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin || u.pathname === location.pathname || done.has(u.pathname)) return;
      done.add(u.pathname);
      const l = document.createElement('link'); l.rel = 'prefetch'; l.href = u.pathname; document.head.appendChild(l);
    } catch (e) { /* ignore */ }
  };
  document.addEventListener('pointerover', (e) => { const a = e.target.closest && e.target.closest('a[href^="/"]'); if (a) prefetch(a); }, { passive: true });
  document.addEventListener('focusin', (e) => { const a = e.target.closest && e.target.closest('a[href^="/"]'); if (a) prefetch(a); });

  /* ------------------------------------------------------------------ 7. Lagos time in the footer */
  const clock = $('[data-lagos-time]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-NG', { hour: 'numeric', minute: '2-digit', timeZone: 'Africa/Lagos' });
    const tick = () => { clock.textContent = fmt.format(new Date()); clock.setAttribute('datetime', new Date().toISOString()); };
    tick(); setInterval(tick, 30000);
  }
})();
