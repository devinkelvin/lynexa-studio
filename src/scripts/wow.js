/* Lynexa interactive extras: idea sketch (hero), ZenglyPay prototype, MVP timeline planner, quick menu (Ctrl/Cmd+K),
   link prefetch, Lagos clock, brief prefill. Zero dependencies; every feature works without the swarm, and the swarm
   (window.LynexaSwarm.build) animates it when present. */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const swarm = () => (window.LynexaSwarm && window.LynexaSwarm.build ? window.LynexaSwarm : null);

  /* ------------------------------------------------------------------ 8. Anonymous visit counting (no cookies, no IP, no profiles) */
  try {
    const optOut = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
    const live = /(^|\.)lynexa\.co$/.test(location.hostname);
    const sent = new Set();
    const track = (e, once) => {
      if (optOut || !live || !navigator.sendBeacon) return;
      if (once) { if (sent.has(e)) return; sent.add(e); }
      try { navigator.sendBeacon('/api/hit', new Blob([JSON.stringify({ e, p: location.pathname, r: e === 'view' ? document.referrer : '' })], { type: 'text/plain' })); } catch (err) { /* ignore */ }
    };
    window.LynexaTrack = track;
    track('view');
    document.addEventListener('click', (ev) => {
      const a = ev.target.closest && ev.target.closest('a, button');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (a.hasAttribute('data-book')) track('book');
      else if (href.includes('wa.me/')) track('whatsapp');
      else if (href.startsWith('mailto:')) track('email');
      else if (href.startsWith('/start-a-project')) track('start');
      else if (a.closest('[data-proto]') || a.hasAttribute('data-proto-go')) track('proto', true);
      else if (a.hasAttribute('data-cmdk-open')) track('cmdk', true);
    }, { capture: true, passive: true });
    document.addEventListener('submit', (ev) => {
      const f = ev.target;
      if (f.matches('[data-pitch]')) track('sketch', true);
      else if (f.matches('form[data-netlify], form[name]') && !f.matches('[data-planner]')) track('submit');
    }, true);
    const pl = $('[data-planner]'); if (pl) pl.addEventListener('change', () => track('plan', true));
  } catch (err) { /* never break the page */ }

  /* ------------------------------------------------------------------ 10. Insights: like, share and comment */
  try {
    const eg = $('[data-engage]');
    if (eg) {
      const slug = eg.dataset.slug, title = eg.dataset.title, url = location.origin + location.pathname;
      const status = $('[data-engage-status]', eg);
      const say = (t) => { status.textContent = t; };
      const track = (e) => { if (window.LynexaTrack) window.LynexaTrack(e); };
      const started = Date.now();
      const api = location.hostname === 'localhost' ? null : '/api';
      // Likes
      const likeBtn = $('[data-like]', eg), likeCount = $('[data-like-count]', eg), likeLabel = $('[data-like-label]', eg);
      const likedKey = 'lx-liked-' + slug;
      let liked = false; try { liked = localStorage.getItem(likedKey) === '1'; } catch (e) { /* ignore */ }
      const paint = (n) => { if (typeof n === 'number') likeCount.textContent = n ? String(n) : ''; likeBtn.setAttribute('aria-pressed', String(liked)); likeLabel.textContent = liked ? 'Liked' : 'Like'; };
      paint();
      if (api) fetch(api + '/likes?slug=' + encodeURIComponent(slug)).then((r) => r.ok ? r.json() : null).then((d) => d && paint(d.likes)).catch(() => {});
      likeBtn.addEventListener('click', async () => {
        if (liked) return;
        liked = true; paint(); try { localStorage.setItem(likedKey, '1'); } catch (e) { /* ignore */ }
        track('like');
        if (!api) return;
        try { const r = await fetch(api + '/likes', { method: 'POST', body: JSON.stringify({ slug }) }); const d = await r.json(); paint(d.likes); say('Thanks for liking this article.'); } catch (e) { /* ignore */ }
      });
      // Share
      const nat = $('[data-share-native]', eg);
      if (navigator.share) { nat.hidden = false; nat.addEventListener('click', () => { navigator.share({ title, url }).then(() => track('share')).catch(() => {}); }); }
      $('[data-share-copy]', eg).addEventListener('click', async (e) => {
        const b = e.currentTarget;
        try { await navigator.clipboard.writeText(url); b.textContent = 'Link copied'; say('Link copied to the clipboard.'); } catch (err) { b.textContent = 'Copy the address bar'; }
        track('share'); setTimeout(() => { b.textContent = 'Copy link'; }, 2500);
      });
      $$('.engage__share a', eg).forEach((a) => a.addEventListener('click', () => track('share')));
      // Comments
      const list = $('[data-comments]', eg), countEl = $('[data-comment-count]', eg), form = $('[data-comment-form]', eg), err = $('[data-comment-error]', eg);
      const when = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      const item = (c) => `<li class="comment"><p class="comment__who"><b>${esc(c.name)}</b> <time datetime="${esc(c.at)}">${when(c.at)}</time></p><p class="comment__text">${esc(c.text)}</p></li>`;
      let comments = [];
      const draw = () => {
        countEl.textContent = comments.length ? '(' + comments.length + ')' : '';
        list.innerHTML = comments.length ? comments.map(item).join('') : '<li class="comments__empty">No comments yet. Be the first to share a thought.</li>';
      };
      if (api) fetch(api + '/comments?slug=' + encodeURIComponent(slug)).then((r) => r.ok ? r.json() : { comments: [] }).then((d) => { comments = d.comments || []; draw(); }).catch(() => { list.innerHTML = '<li class="comments__empty">Comments could not be loaded right now.</li>'; });
      else draw();
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); err.textContent = '';
        const fd = new FormData(form);
        const name = String(fd.get('name') || '').trim(), text = String(fd.get('text') || '').trim();
        if (name.length < 2) { err.textContent = 'Please add your name.'; $('#c-name').focus(); return; }
        if (text.length < 3) { err.textContent = 'Please write a comment.'; $('#c-text').focus(); return; }
        const btn = $('button[type="submit"]', form); btn.disabled = true;
        try {
          if (!api) throw new Error('Comments work on the live site.');
          const r = await fetch(api + '/comments', { method: 'POST', body: JSON.stringify({ slug, name, text, website: fd.get('website'), ms: Date.now() - started }) });
          const d = await r.json();
          if (!r.ok) throw new Error(d.error || 'Your comment could not be posted. Please try again.');
          if (d.comment) { comments.push(d.comment); draw(); say('Your comment is posted.'); }
          else say('Thanks. Your comment will appear once it has been reviewed.');
          form.reset(); track('comment');
        } catch (x) { err.textContent = x.message; }
        btn.disabled = false;
      });
    }
  } catch (err) { /* never break the page */ }

  /* ------------------------------------------------------------------ 9. Private stats page (/stats/) */
  try {
    const box = $('[data-stats]');
    if (box) {
      const form = $('form', box), out = $('[data-stats-out]', box), msg = $('[data-stats-msg]', box);
      const NAMES = { view: 'Page views', book: 'Book-a-call clicks', whatsapp: 'WhatsApp clicks', email: 'Email clicks', start: 'Start-a-project clicks', submit: 'Form submissions', sketch: 'Idea sketches', plan: 'Planner used', proto: 'Prototype used', cmdk: 'Quick menu opened', like: 'Article likes', share: 'Article shares', comment: 'Comments posted' };
      const table = (title, rows, fmt = (k) => k) => `<section class="stats__card"><h2>${title}</h2>${rows.length ? `<table><tbody>${rows.map(([k, v]) => `<tr><td>${esc(fmt(k) || '(direct)')}</td><td>${v}</td></tr>`).join('')}</tbody></table>` : '<p>No data yet.</p>'}</section>`;
      const load = async (key, days) => {
        msg.textContent = 'Loading…';
        try {
          const r = await fetch('/api/stats?days=' + days, { headers: { 'x-stats-key': key } });
          if (r.status === 401) { msg.textContent = 'That key is not right.'; return; }
          const d = await r.json();
          try { sessionStorage.setItem('lx-stats', key); } catch (e) { /* ignore */ }
          const max = Math.max(1, ...d.perDay.map((x) => x.views));
          msg.textContent = '';
          out.innerHTML = `<p class="stats__total"><b>${d.views}</b> page views in the last ${d.days} days, ${d.mobileShare}% on phones.</p>
            <div class="stats__bars" role="img" aria-label="Page views per day">${d.perDay.map((x) => `<i title="${x.day}: ${x.views}" style="--h:${(x.views / max) * 100}%"></i>`).join('')}</div>
            <div class="stats__grid">${table('Top pages', d.pages)}${table('Where visitors came from', d.referrers)}${table('Countries', d.countries)}${table('Actions', d.events, (k) => NAMES[k] || k)}</div>`;
        } catch (e) { msg.textContent = 'Could not load the stats. Try again in a moment.'; }
      };
      form.addEventListener('submit', (e) => { e.preventDefault(); load($('input', form).value.trim(), $('select', form).value); });
      try { const k = sessionStorage.getItem('lx-stats'); if (k) { $('input', form).value = k; load(k, 30); } } catch (e) { /* ignore */ }
    }
  } catch (err) { /* ignore */ }

  /* ------------------------------------------------------------------ 7. Lagos time in the footer */
  try {
  const clock = $('[data-lagos-time]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Africa/Lagos' });
    const tick = () => { const now = new Date(); clock.textContent = fmt.format(now).replace(/\s?([ap]m)$/i, ' $1').toLowerCase(); clock.setAttribute('datetime', now.toISOString()); };
    tick(); setInterval(tick, 30000);
    const wrap = clock.closest('[data-lagos-wrap]'); if (wrap) wrap.hidden = false;
  }
  } catch (err) { if (window.console) console.warn('Lynexa extra failed:', err); }

  /* ------------------------------------------------------------------ 1. Pitch us your idea (home hero) */
  try {
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
    { k: 'book', words: ['booking', 'bookings', 'book', 'appointment', 'appointments', 'salon', 'barber', 'barbers', 'barbershop', 'spa', 'schedule', 'scheduling', 'reservation', 'reservations', 'slot', 'slots'], suffix: 'Book',
      features: ['Pick a time slot', 'Reminders and rescheduling', 'Deposits paid online'], card: ['Next free slot', 'Today, 4:00 pm'], rows: [['Standard session', '₦5,000'], ['Premium session', '₦12,000'], ['Home service', '₦15,000']], cta: 'Book a slot' },
    { k: 'people', words: ['event', 'events', 'party', 'friends', 'community', 'social', 'chat', 'wedding', 'church', 'club', 'network', 'creators', 'fans', 'dating'], suffix: 'Circle',
      features: ['Profiles and groups', 'Events and RSVPs', 'Messaging'], card: ['Going this weekend', '126'], rows: [['Tola’s birthday', 'Sat'], ['Tech meetup, Yaba', 'Thu'], ['Book club', 'Sun']], cta: 'Create an event' }
  ];
  const GENERIC = { k: 'idea', suffix: 'Hub', features: ['Simple onboarding', 'The core workflow', 'Dashboard and insights'], card: ['Today', '3 tasks'], rows: [['First step', 'Done'], ['Second step', 'In progress'], ['Next', 'Planned']], cta: 'Get started' };
  // Reads a one-line idea the way a person would: who it is for, what they need to do, to what, and where.
  // Everything on the sketch and the first screen is built from those parts, so the visitor sees their own idea.
  const PLACES = /^(lagos|abuja|ibadan|kano|enugu|port|harcourt|benin|kaduna|jos|owerri|calabar|uyo|abeokuta|ilorin|nigeria|ghana|kenya|accra|nairobi|africa|yaba|lekki|ikeja|ikorodu|surulere|ajah|campus|campuses|universities|university|town|city|cities|estate|estates)$/;
  const PERSON = /^(customers?|clients?|patients?|students?|members?|tenants?|guests?|drivers?|staff|workers?|employees?|buyers?|sellers?|users?|parents?|children|child|kids?|players?|farmers?|traders?|vendors?|tailors?|barbers?|stylists?|teachers?|tutors?|doctors?|nurses?|lawyers?|landlords?|agents?|freelancers?|creators?|artists?|musicians?|chefs?|riders?|mechanics?|artisans?|plumbers?|electricians?|founders?|friends?|famil(y|ies)|volunteers?|donors?|athletes?|coaches?|photographers?|designers?|developers?|writers?|pharmacists?|caterers?|planners?|hosts?|travell?ers?|commuters?|shoppers?|fans?|readers?|learners?|flatmates?|roommates?|couples?|women|men|mums?|moms?|dads?|graduates?|job|seekers?|businesses|smes?|shops?|owners?|cleaners?|makeup|artists?|bakers?|churches|pastors?|managers?|teams?|retailers?|suppliers?|distributors?|pharmacies|clinics|schools|hospitals|restaurants|hotels)$/;
  const STOPAT = new Set('for with in on at by from to and so that who which when while without via using through into across near around between instead or but where whose they them before after because if until than fast quickly easily online instantly now today nearby safely cheaply together'.split(' '));
  const DET = new Set('a an the their your my our his her its all every each some any small local busy young new'.split(' '));
  const BRANDS = { uber: 'book', bolt: 'book', airbnb: 'book', calendly: 'book', netflix: 'share', spotify: 'share', youtube: 'share', tiktok: 'share', instagram: 'share', amazon: 'buy', jumia: 'buy', konga: 'buy', shopify: 'sell', upwork: 'find', fiverr: 'find', linkedin: 'find', tinder: 'find', zillow: 'find', duolingo: 'learn', glovo: 'deliver', chowdeck: 'deliver', gokada: 'deliver', piggyvest: 'pay', paystack: 'pay', opay: 'pay', splitwise: 'pay', trello: 'manage', notion: 'manage' };
  const NAMES = [['Mrs Okafor', 'Tunde A.', 'Chika N.'], ['Ada', 'Emeka', 'Zainab'], ['Bisi', 'Kunle', 'Ngozi']];
  const VERBS = {
    track: { forms: 'track tracks tracking monitor monitors monitoring log logs logging record records recording measure measures keep keeps', suffix: 'Log', kind: '', obj: 'records',
      feats: (o, O1) => [`Track ${o}`, `Add a new ${O1} in seconds`, 'History, search and reminders'], card: (o) => [`${cap(o)} tracked`, '24'], st: ['Updated today', 'Yesterday', 'Due Fri'], pre: ['Latest', 'Last week’s', 'Upcoming'], cta: (o, O1) => `Add ${an(O1)}` },
    manage: { forms: 'manage manages managing organise organises organising organize organizes organizing run runs running handle handles handling coordinate coordinates', suffix: 'Desk', kind: '', obj: 'operations',
      feats: (o) => [`Manage ${o} in one place`, 'A dashboard that shows what needs attention', 'Access for your team'], card: (o) => [`Active ${o}`, '18'], st: ['Active', 'Needs attention', 'Done'], pre: ['Main', 'New', 'Archived'], cta: (o, O1) => `New ${O1}` },
    book: { forms: 'book books booking reserve reserves reserving schedule schedules scheduling request requests requesting', suffix: 'Book', kind: 'book', obj: 'appointments',
      feats: (o) => [`Book ${o} in a few taps`, 'Pick a time that suits you', 'Reminders and deposits'], card: () => ['Next booking', 'Today, 4:00 pm'], st: ['Confirmed', 'Pending', 'Open'], rows: (O1) => [`${cap(O1)}, morning`, `${cap(O1)}, afternoon`, `${cap(O1)}, Saturday`], cta: (o, O1) => `Book ${an(O1)}` },
    find: { forms: 'find finds finding discover discovers discovering search searches searching locate locates locating hire hires hiring connect connects connecting match matches matching compare compares comparing choose', suffix: 'Find', kind: '', obj: 'services',
      feats: (o) => [`Find ${o} near you`, 'Verified profiles and honest reviews', 'Compare and save favourites'], card: (o) => [`${cap(o)} near you`, '18'], st: ['★ 4.9, 0.8 km', '★ 4.7, 1.4 km', '★ 4.6, 2.5 km'], pre: ['Nearest', 'Top-rated', 'Best-priced'], cta: (o, O1) => `Find ${an(O1)}` },
    sell: { forms: 'sell sells selling list lists listing advertise advertises', suffix: 'Mart', kind: 'shop', obj: 'products',
      feats: (o) => [`List and sell ${o}`, 'Get paid by card or bank transfer', 'Orders and delivery in one view'], card: () => ['Sales this week', '₦86,500'], st: ['₦8,500', '₦12,000', 'Sold out'], pre: ['Standard', 'Premium', 'Bulk'], cta: (o, O1) => `List ${an(O1)}` },
    buy: { forms: 'buy buys buying order orders ordering shop shops shopping rent rents renting', suffix: 'Mart', kind: 'shop', obj: 'items',
      feats: (o) => [`Order ${o} without the stress`, 'Pay online or on delivery', 'Track every order'], card: () => ['Your orders', '3 on the way'], st: ['₦4,500', '₦7,000', 'Delivered'], rows: (O1) => [cap(O1), `${cap(O1)} bundle`, 'Last order'], cta: (o, O1) => `Order ${O1}` },
    pay: { forms: 'give gives giving pay pays paying split splits splitting send sends sending transfer transfers collect collects collecting contribute contributes save saves saving invest invests investing lend lends lending borrow borrows borrowing raise raises raising donate donates fund funds', suffix: 'Pay', kind: 'pay', obj: 'money',
      feats: (o, O1, v) => [`${cap(v)} ${o} with less back-and-forth`, 'See who has paid and who has not', 'Reminders before anything is due'], card: () => ['Collected so far', '₦45,000'], st: ['Paid', '₦5,000 due', 'Paid'], people: true, cta: (o, O1, v) => `${cap(v)} ${o}` },
    learn: { forms: 'learn learns learning study studies studying teach teaches teaching practise practice practising practicing prepare prepares preparing revise', suffix: 'Learn', kind: 'learn', obj: 'skills',
      feats: (o) => [`Learn ${o} in short lessons`, 'Practice questions with instant feedback', 'Progress you can see'], card: () => ['This week', '4 lessons'], st: ['80%', '65%', 'Sat'], rows: (O1) => [`${cap(O1)} basics`, 'Practice test', 'Mock exam'], cta: () => 'Continue learning' },
    share: { forms: 'share shares sharing post posts posting chat chats chatting discuss discusses review reviews reviewing rate rates rating swap swaps swapping showcase stream streams', suffix: 'Circle', kind: 'people', obj: 'stories',
      feats: (o) => [`Share ${o} with people who care`, 'Comments, reactions and follows', 'Groups for every interest'], card: () => ['New this week', '126 posts'], st: ['12 likes', '4 replies', 'New'], people: true, cta: (o, O1) => `Share ${an(O1)}` },
    plan: { forms: 'plan plans planning invite invites inviting host hosts hosting celebrate', suffix: 'Plan', kind: 'people', obj: 'events',
      feats: (o) => [`Plan ${o} from start to finish`, 'Invites and RSVPs', 'Budget and checklist'], card: () => ['Coming up', 'Sat, 2:00 pm'], st: ['Confirmed', 'Invited', 'To do'], rows: () => ['Guest list', 'Budget', 'Venue'], cta: (o, O1) => `Plan ${an(O1)}` },
    deliver: { forms: 'deliver delivers delivering ship ships shipping move moves moving pick dispatch dispatches', suffix: 'Go', kind: 'move', obj: 'packages',
      feats: (o) => [`Deliver ${o} across town`, 'Live rider tracking', 'Proof of delivery'], card: () => ['Out for delivery', '6'], st: ['On the way', 'Picked up', 'Delivered'], rows: () => ['Order #1042', 'Order #1043', 'Order #1044'], cta: () => 'Request a pickup' },
    verify: { forms: 'verify verifies verifying check checks checking confirm confirms authenticate validate inspect inspects', suffix: 'Check', kind: 'home', obj: 'documents',
      feats: (o) => [`Verify ${o} before money changes hands`, 'A step-by-step checklist', 'A report you can share'], card: () => ['Checks passed', '3 of 5'], st: ['Verified', 'Pending', 'Not started'], rows: (O1) => [`${cap(O1)} documents`, 'Identity check', 'Final report'], cta: (o, O1) => `Verify ${an(O1)}` }
  };
  const NOUNV = { delivery: ['deliver', 'deliver'], deliveries: ['deliver', 'deliver'], savings: ['pay', 'save'], payments: ['pay', 'pay'], payment: ['pay', 'pay'], rental: ['buy', 'rent'], rentals: ['buy', 'rent'], tracker: ['track', 'track'], tutoring: ['learn', 'learn'], lessons: ['learn', 'learn'], bookings: ['book', 'book'], marketplace: ['', ''] };
  const VERB_OF = {};
  Object.keys(VERBS).forEach((k) => VERBS[k].forms.split(' ').forEach((f) => { VERB_OF[f] = k; }));
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function an(s) { if (/^(laundry|rent|money|food|data|water|gas|fuel|electricity|furniture|equipment|advice|help|information|transport|cleaning|catering|music|content|news|insurance|healthcare|fashion|clothing|luggage|feedback|support|training|childcare|homework)\b/i.test(s)) return s; return (/^[aeiou]/i.test(s) && !/^(uni|use|eu)/i.test(s) ? 'an ' : 'a ') + s; }
  function sing(w) { if (/(tomato|potato|mango|hero|echo)es$/.test(w)) return w.slice(0, -2); return /(ss|us|is)$/.test(w) || /^(physics|mathematics|economics|statistics|logistics|analytics|electronics|politics)$/.test(w) || /^(staff|news|series|money|rent|data)$/.test(w) ? w : w.replace(/ies$/, 'y').replace(/(ch|sh|x|ss)es$/, '$1').replace(/([^s])s$/, '$1'); }
  function base(w) {
    if (VERBS[w]) return w;
    let s = w;
    if (/ies$/.test(w)) s = w.slice(0, -3) + 'y';
    else if (/ing$/.test(w)) { s = w.slice(0, -3); if (/([bdgmnprt])\1$/.test(s)) s = s.slice(0, -1); if (!VERB_OF[s] && VERB_OF[s + 'e']) s += 'e'; }
    else if (/es$/.test(w) && VERB_OF[w.slice(0, -2)]) s = w.slice(0, -2);
    else if (/s$/.test(w) && VERB_OF[w.slice(0, -1)]) s = w.slice(0, -1);
    return VERB_OF[s] ? s : w;
  }
  function phrase(toks, i, max) {
    const out = [];
    for (let j = i; j < toks.length && out.length < max; j++) {
      const w = toks[j];
      if (STOPAT.has(w) || (out.length && VERB_OF[w] && !/s$/.test(w) && j > i)) break;
      if (DET.has(w) && !out.length) continue;
      if (/^\d/.test(w) && !out.length) continue;
      out.push(w);
    }
    return out;
  }
  function understand(idea) {
    const CASE = {};
    idea.replace(/[’']/g, '').split(/[^A-Za-z0-9-]+/).forEach((w) => { if (w.length > 1 && w === w.toUpperCase() && /[A-Z]/.test(w)) CASE[w.toLowerCase()] = w; });
    const fix = (t) => t.replace(/[A-Za-z0-9]+/g, (w) => CASE[w.toLowerCase()] || w);
    const toks = idea.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(Boolean);
    // Kind (colour and fallbacks) from keyword overlap, as before.
    let kind = GENERIC, score = 0;
    KINDS.forEach((k) => { const sc = toks.filter((w) => k.words.includes(w) || k.words.includes(w.replace(/s$/, ''))).length; if (sc > score) { score = sc; kind = k; } });
    // "Uber for laundry": borrow the model, the rest is the object.
    let like = '', verb = '', vi = -1, object = [], audience = [], where = [];
    const bi = toks.findIndex((w) => BRANDS[w]);
    if (bi >= 0 && toks[bi + 1] === 'for') { like = cap(toks[bi]); verb = BRANDS[toks[bi]]; object = phrase(toks, bi + 2, 3).filter((w) => !PLACES.test(w)); }
    let nounBase = '', prepPhrase = '';
    // "food delivery", "a savings app": the action is a noun and the thing comes before it.
    if (!verb) { const ni = toks.findIndex((w) => NOUNV[w] && NOUNV[w][0]); if (ni >= 0 && !toks.slice(0, ni).some((w) => VERB_OF[w])) { verb = NOUNV[toks[ni]][0]; nounBase = NOUNV[toks[ni]][1]; vi = ni; const prev = toks[ni - 1]; if (prev && !STOPAT.has(prev) && !DET.has(prev) && !PLACES.test(prev) && !VERB_OF[prev]) object = [prev]; } }
    // First action word that is not "help/let/allow".
    if (!verb) {
      for (let i = 0; i < toks.length; i++) { if (VERB_OF[toks[i]]) { vi = i; verb = VERB_OF[toks[i]]; break; } }
      if (vi >= 0) object = phrase(toks, vi + 1, 3).filter((w) => !PLACES.test(w));
    }
    // Who it is for: "for X", "helps X", "lets X", "X can".
    for (let i = 0; i < toks.length; i++) {
      if (/^(for|helps?|lets?|allows?|enables?)$/.test(toks[i]) && !(bi >= 0 && i === bi + 1)) {
        const p = phrase(toks, i + 1, 3);
        if (p.length && !VERB_OF[p[0]]) {
          const people = p.filter((w) => !PLACES.test(w));
          if (people.length && (people.some((w) => PERSON.test(w)) || !object.length || i < vi)) { audience = people; if (p.length > people.length) where = p.filter((w) => PLACES.test(w)); break; }
        }
      }
    }
    const pi = toks.findIndex((w, i) => /^(in|across|around|near)$/.test(w) && PLACES.test(toks[i + 1] || ''));
    if (pi >= 0) where = phrase(toks, pi + 1, 3).filter((w) => PLACES.test(w) || /^(state|island|mainland)$/.test(w));
    if (verb && vi >= 0 && !nounBase && !object.length && /^(for|to|on)$/.test(toks[vi + 1] || '') && (prepPhrase = toks[vi + 1])) object = phrase(toks, vi + 2, 3).filter((w) => !PLACES.test(w));
    if (!audience.length && vi > 0 && PERSON.test(toks[vi - 1])) audience = [toks[vi - 1]];
    // "connects landlords with tenants": the first group is the user, the second is who they are looking for.
    let partner = [];
    const after = vi >= 0 ? vi + 1 + toks.slice(vi + 1).findIndex((w) => STOPAT.has(w)) : -1;
    if (after > vi && /^(with|to)$/.test(toks[after] || '')) partner = phrase(toks, after + 1, 3).filter((w) => !PLACES.test(w));
    if (verb === 'find' && /^(connect|match)/.test(toks[vi]) && partner.length) { if (!audience.length) audience = object; object = partner; partner = []; nounBase = 'find'; }
    if (!audience.length && partner.some((w) => PERSON.test(w)) && verb === 'pay') { audience = partner; partner = []; }
    // If no action word, treat what follows "for/an app for" as the object.
    if (!verb && !object.length) {
      const fi = toks.indexOf('for');
      const rest = (fi >= 0 ? phrase(toks, fi + 1, 3) : toks.filter((w) => !STOPAT.has(w) && !DET.has(w) && !/^(app|apps|platform|website|site|tool|idea|startup|business)$/.test(w)).slice(-2)).filter((w) => !PLACES.test(w));
      if (rest.some((w) => PERSON.test(w))) audience = rest; else object = rest;
    }
    if (audience.join(' ') === object.join(' ')) audience = [];
    const V = VERBS[verb] || null;
    if (!kind.words && V && V.kind) kind = KINDS.find((k) => k.k === V.kind) || kind;
    const hadA = vi >= 0 && /^(a|an)$/.test(toks[vi + 1] || '') && object.length && !/s$/.test(object[object.length - 1]);
    const objText = ((hadA ? object.join(' ') + 's' : object.join(' ')) || (V ? V.obj : '')).slice(0, 28);
    const head = sing(object[object.length - 1] || (V ? V.obj : 'item'));
    const O1 = object.length > 1 ? object.slice(0, -1).filter((w) => !PERSON.test(w)).concat(head).join(' ') || head : head;
    const vBase = like ? verb : nounBase || (vi >= 0 ? base(toks[vi]) : '');
    const aud = audience.join(' ');
    const audHead = audience.length ? sing(audience[audience.length - 1]) : '';
    // Working name: the most specific noun plus a suffix that fits the job.
    const genericAud = /^(people|person|user|customer|everyone|business|businesses|owner|women|woman|men|man|folk)$/.test(audHead);
    const nameWord = (audHead && !genericAud ? audHead : audience.length > 1 && genericAud ? sing(audience[0]) : (object.length ? head : '')) || 'idea';
    const suffix = V ? V.suffix : kind.suffix;
    const name = cap(nameWord.replace(/-/g, '').slice(0, 12)) + ' ' + (cap(nameWord) === suffix ? 'Hub' : suffix);
    const doing = V ? (vBase === 'deliver' && nounBase ? `get ${objText} delivered` : `${vBase || verb} ${prepPhrase ? prepPhrase + ' ' : ''}${hadA ? an(object.join(' ')) : objText}${partner.length ? ' to ' + partner.join(' ') : ''}`.trim()) : (objText ? `get ${objText} sorted` : '');
    let features, card, rows, cta;
    if (V) {
      features = V.feats(objText, O1, vBase || verb);
      card = V.card(objText);
      const personObj = object.some((w) => PERSON.test(w));
      const labels = V.rows ? V.rows(O1) : (V.people || personObj ? NAMES[toks.length % 3] : V.pre.map((p) => `${p} ${O1}`));
      rows = labels.map((l, i) => [cap(l), V.st[i]]);
      cta = V.cta(objText, O1, vBase || verb);
      if (verb === 'pay' && /^(save|invest)$/.test(vBase)) { features = [`${cap(vBase)} ${objText} a little at a time`, 'Goals you can watch grow', 'Withdraw when you need it']; card = ['Saved so far', '₦45,000']; rows = rows.map(([a], i) => [a, ['₦500 daily', '₦2,000 weekly', 'Goal reached'][i]]); cta = 'Start saving'; }
      if (verb === 'pay' && /^(give|donate|raise|fund|contribute)$/.test(vBase)) { features = [`${cap(vBase)} ${objText} in a few taps`, 'Receipts for every gift', 'See what each campaign has raised']; card = ['Given this month', '₦128,000']; rows = rows.map(([a], i) => [a, ['₦5,000', '₦2,000', '₦10,000'][i]]); }
    } else {
      features = (objText ? [`Everything about ${objText} in one place`] : []).concat(kind.features).slice(0, 3);
      if (kind === GENERIC && objText) { card = [`Your ${objText}`, '3 active']; rows = [[`New ${O1} request`, 'Today'], [`${cap(O1)} update`, 'In progress'], ['Next step', 'Planned']]; cta = 'Get started'; } else { card = kind.card; rows = kind.rows; cta = kind.cta; }
    }
    const summary = (aud ? cap(aud) + ' who need to ' : 'Anyone who needs to ') + (doing || 'get this done') + (where.length ? ' in ' + where.map(cap).join(' ') : '');
    return { k: kind.k, name: fix(name), like, aud: fix(cap(aud)), doing: fix(doing), where: where.map(cap).join(' '), summary: fix(summary), features: features.map((f) => fix(cap(f)).slice(0, 60)), card: [fix(cap(card[0])).slice(0, 30), card[1]], rows: rows.map(([a, b]) => [fix(a).slice(0, 26), b]), cta: fix(cap(cta)).slice(0, 28), greet: audHead && PERSON.test(audience[audience.length - 1]) ? `For ${aud}` : '' };
  }

  const pitch = $('[data-pitch]');
  const build = $('.hero .build');
  if (pitch && build) {
    const input = $('input', pitch);
    const original = build.innerHTML;
    const live = $('[data-pitch-live]');
    const reset = () => {
      build.innerHTML = original;
      build.setAttribute('aria-label', 'How an idea becomes a product, shown with ZenglyPay’s split-bill feature');
      input.value = '';
      if (live) live.textContent = 'Showing the ZenglyPay example again.';
    };
    pitch.addEventListener('submit', (e) => {
      e.preventDefault();
      const idea = input.value.trim().replace(/\s+/g, ' ').slice(0, 140);
      if (idea.length < 6) { input.setAttribute('aria-invalid', 'true'); $('.pitch__hint', pitch).textContent = 'Give us a few words about your idea, for example “an app for splitting rent with flatmates”.'; input.focus(); return; }
      input.removeAttribute('aria-invalid');
      const c = understand(idea);
      const said = (k, v) => v ? `<div><dt>${k}</dt><dd>${v}</dd></div>` : '';
      const brief = '/start-a-project/?idea=' + encodeURIComponent(idea) + '&name=' + encodeURIComponent(c.name);
      build.setAttribute('aria-label', 'A first sketch of your idea, ' + c.name);
      build.innerHTML = `
      <span class="build__line" aria-hidden="true"></span>
      <div class="build__stage build__stage--idea">
        <p class="build__label"><b>1</b>What we heard</p>
        <div class="build__idea">
          <p class="build__note-text">“${esc(idea)}”</p>
          <dl class="heard">${said('For', esc(c.aud))}${said('They need to', esc(c.doing))}${said('Where', esc(c.where))}${said('Works like', c.like ? esc(c.like) : '')}${said('Working name', '<b>' + esc(c.name) + '</b>')}</dl>
        </div>
      </div>
      <div class="build__stage">
        <p class="build__label"><b>2</b>Sketched</p>
        <div class="build__frame build__frame--wire" aria-hidden="true">
          <div class="phone"><span class="phone__island"></span><div class="wire wire--said">
            <i class="w-a">${esc(c.name)}</i><i class="w-b">${esc(c.card[0])}</i><i class="w-c"></i>
            <span class="w-row"><i></i><i></i><i></i></span><i class="w-d">${esc(c.rows[0][0])}</i><i class="w-d">${esc(c.rows[1][0])}</i><i class="w-e">${esc(c.cta)}</i>
          </div></div>
        </div>
        <ul class="sketch-features">${c.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      </div>
      <div class="build__stage">
        <p class="build__label"><b>3</b>First screen</p>
        <div class="build__frame build__frame--real build__frame--concept">
          <div class="phone"><span class="phone__island"></span>
            <div class="concept concept--${c.k}">
              <p class="concept__bar"><span class="concept__logo" aria-hidden="true">${esc(c.name.charAt(0))}</span>${esc(c.name)}</p>${c.aud ? `<p class="concept__for">Made for ${esc(c.aud.toLowerCase() === c.aud ? c.aud : c.aud.charAt(0).toLowerCase() + c.aud.slice(1))}</p>` : ''}
              <div class="concept__card"><p>${esc(c.card[0])}</p><p class="concept__big">${esc(c.card[1])}</p></div>
              <ul class="concept__rows">${c.rows.map(([a, b]) => `<li><span>${esc(a)}</span><span>${esc(b)}</span></li>`).join('')}</ul>
              <p class="concept__cta">${esc(c.cta)}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="build__caption sketch-caption">
        <p>We heard: ${esc(c.summary)}. This is a first sketch of ${esc(c.name)} built from that. Not quite right? Add a detail, like who it is for or what they do first, and sketch again.</p>
        <p class="sketch-actions"><a class="btn btn--primary btn--sm" href="${brief}"><span>Turn this into a brief</span></a><button class="link" type="button" data-pitch-edit>Add a detail</button><button class="link" type="button" data-pitch-reset>Show the ZenglyPay example</button></p>
      </div>`;
      $('[data-pitch-reset]', build).addEventListener('click', reset);
      $('[data-pitch-edit]', build).addEventListener('click', () => { input.focus(); input.setSelectionRange(input.value.length, input.value.length); });
      if (live) live.textContent = 'We heard: ' + c.summary + '. Sketched ' + c.name + ': ' + c.features.join(', ') + '. You can turn it into a brief.';
      const s = swarm();
      if (s) {
        const items = [];
        $$('.build__label', build).forEach((el, i) => items.push({ el, type: 'text', lane: 'labels', speed: 1.4, wait: i ? 0 : 0 }));
        items.push({ el: $('.build__idea', build), type: 'box', lane: 'idea' });
        $$('.build__idea p, .heard > div', build).forEach((el) => items.push({ el, type: 'text', lane: 'idea', speed: 1.8 }));
        items.push({ el: $('.build__frame--wire', build), type: 'box', lane: 'wf', wait: 250 });
        $$('.wire > i, .wire .w-row i', build).forEach((el, i) => items.push({ el, type: 'wire', lane: 'w' + (i % 3), wait: i < 3 ? 700 : 0 }));
        $$('.sketch-features li', build).forEach((el) => items.push({ el, type: 'text', lane: 'feat', speed: 1.6, wait: 400 }));
        items.push({ el: $('.build__frame--concept', build), type: 'box', lane: 'phone', wait: 450 });
        $$('.concept__bar, .concept__for, .concept__card p, .concept__rows li, .concept__cta', build).forEach((el, i) => items.push({ el, type: 'text', lane: 'c' + (i % 3), speed: 1.6, wait: i < 3 ? 900 : 0 }));
        items.push({ el: $('.sketch-caption > p', build), type: 'text', lane: 'cap', speed: 3, wait: 1600 });
        items.push({ el: $('.sketch-actions', build), type: 'box', lane: 'cap' });
        s.build(items);
      }
    });
  }
  } catch (err) { if (window.console) console.warn('Lynexa extra failed:', err); }

  /* ------------------------------------------------------------------ 2. ZenglyPay prototype */
  try {
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
  } catch (err) { if (window.console) console.warn('Lynexa extra failed:', err); }

  /* ------------------------------------------------------------------ 3. MVP timeline planner (indicative only) */
  try {
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
        <p class="plan__actions"><a class="btn btn--light" href="/start-a-project/?plan=${encodeURIComponent(`${v.scope === 'v1' ? 'Fuller first version' : 'Lean MVP'} ${LABEL[v.type]}; ${STAGE[v.stage]}; features: ${v.feats.join(', ') || 'core only'}; indicative ${range(r.min, r.max)}`)}"><span>Send this plan with a brief</span></a><button class="btn btn--ghost-light" type="button" data-plan-copy><span>Copy link to this plan</span></button></p>`;
      const live = $('[data-plan-live]');
      if (live) live.textContent = 'Indicative timeline: ' + range(r.min, r.max) + '.';
      const s = swarm();
      if (s && animate) {
        const items = [{ el: $('.plan__total b', out), type: 'text', lane: 't', speed: 1.4 }];
        $$('.plan__bars li', out).forEach((li, i) => { items.push({ el: $('.plan__track i', li), type: 'wire', lane: 'b' + i, wait: 150 + i * 120, dur: 520 }); items.push({ el: $('.plan__head', li), type: 'text', lane: 'h' + (i % 2), speed: 1.8 }); });
        s.build(items, { tempo: 0.8 });
      }
    };
    // Shareable plans: the answers live in the URL (?type=&stage=&scope=&f=a,b).
    const toUrl = () => {
      const v = read(); const q = new URLSearchParams({ type: v.type, stage: v.stage, scope: v.scope });
      if (v.feats.length) q.set('f', v.feats.join(','));
      try { history.replaceState(null, '', location.pathname + '?' + q.toString()); } catch (e) { /* ignore */ }
    };
    const fromUrl = () => {
      const q = new URLSearchParams(location.search); if (!q.has('type')) return;
      ['type', 'stage', 'scope'].forEach((k) => { const el = planner.querySelector(`input[name="${k}"][value="${CSS.escape(q.get(k) || '')}"]`); if (el) el.checked = true; });
      const f = (q.get('f') || '').split(',');
      $$('input[name="features"]', planner).forEach((el) => { el.checked = f.includes(el.value); });
    };
    out.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-plan-copy]'); if (!b) return;
      toUrl();
      const label = $('span', b);
      try { await navigator.clipboard.writeText(location.href); label.textContent = 'Link copied'; }
      catch (err) { label.textContent = 'Copy the address bar to share'; }
      setTimeout(() => { label.textContent = 'Copy link to this plan'; }, 2500);
    });
    fromUrl();
    let t = 0;
    planner.addEventListener('change', () => { clearTimeout(t); t = setTimeout(() => { toUrl(); render(true); }, 120); });
    planner.addEventListener('submit', (e) => e.preventDefault());
    render(false);
  }
  } catch (err) { if (window.console) console.warn('Lynexa extra failed:', err); }

  /* ------------------------------------------------------------------ 4. Brief prefill from the sketch or the planner */
  try {
  const desc = $('#project-description');
  if (desc) {
    const q = new URLSearchParams(location.search);
    const idea = q.get('idea'), name = q.get('name'), plan = q.get('plan');
    const lines = [];
    if (idea) lines.push('My idea: ' + idea.slice(0, 300) + (name ? ' (working name: ' + name.slice(0, 40) + ')' : ''));
    if (plan) lines.push('From the timeline planner: ' + plan.slice(0, 400));
    if (lines.length && !desc.value) { desc.value = lines.join('\n') + '\n\n'; const n = $('[data-prefill-note]'); if (n) n.hidden = false; }
  }
  } catch (err) { if (window.console) console.warn('Lynexa extra failed:', err); }

  /* ------------------------------------------------------------------ 5. Quick menu: Ctrl/Cmd+K */
  try {
  const PAGES = [
    ['Home', '/'], ['Work', '/work/'], ['ZenglyPay case study', '/work/zengly/'], ['Swiftly', '/work/swiftly/'], ['Websites we have designed', '/websites/'],
    ['Services', '/services/'], ['Pricing and packages', '/pricing/'], ['Insights', '/insights/'], ['Fintech', '/fintech/'], ['Process', '/process/'], ['MVP timeline planner', '/mvp-planner/'], ['Ventures and partnerships', '/ventures/'], ['Submit a startup idea', '/ventures/apply/'], ['About Lynexa', '/about/'],
    ['Contact', '/contact/'], ['Start a project', '/start-a-project/'], ['Share feedback', '/feedback/'], ['Privacy notice', '/privacy/'], ['Terms of use', '/terms/']
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
  } catch (err) { if (window.console) console.warn('Lynexa extra failed:', err); }

  /* ------------------------------------------------------------------ 6. Prefetch internal pages on intent */
  try {
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
  } catch (err) { if (window.console) console.warn('Lynexa extra failed:', err); }

})();
