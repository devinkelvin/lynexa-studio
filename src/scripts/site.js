/* Lynexa site behaviour. No dependencies. Everything degrades to plain HTML. */
(() => {
  const root = document.documentElement;
  /* Motion: the footer control (Full / Reduced / Off) overrides the system setting when chosen */
  const sysReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionMode = () => root.dataset.motion || (sysReduce.matches ? 'reduced' : 'full');
  const reduce = motionMode() !== 'full';

  /* Living Build System: loaded after the page has settled, only when motion is Full */
  const swarmOk = () => motionMode() === 'full' && 'IntersectionObserver' in window && window.CSS && CSS.supports('clip-path', 'polygon(0 0, 1px 0, 1px 1px)') &&
    !(navigator.connection && navigator.connection.saveData);
  let swarmLoading = false;
  const loadSwarm = () => {
    if (swarmLoading || window.LynexaSwarm || !swarmOk()) return;
    swarmLoading = true;
    const s = document.createElement('script');
    s.src = root.dataset.swarmSrc; s.async = true;
    s.onerror = () => root.classList.remove('sw-intro');
    s.onload = () => { swarmLoading = false; };
    document.body.appendChild(s);
  };
  if (!swarmOk()) root.classList.remove('sw-intro');
  else if (root.classList.contains('sw-intro')) {
    // The page header is waiting to be built: load the swarm straight away (it was preloaded in <head>),
    // and show everything if it has not arrived within 3.5 seconds.
    loadSwarm();
    setTimeout(() => { if (!window.LynexaSwarm) root.classList.remove('sw-intro'); }, 3500);
  } else {
    const go = () => ('requestIdleCallback' in window ? requestIdleCallback(loadSwarm, { timeout: 900 }) : setTimeout(loadSwarm, 300));
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
  }
  const motionButtons = document.querySelectorAll('[data-motion-set]');
  const syncMotion = () => motionButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.motionSet === motionMode())));
  syncMotion();
  motionButtons.forEach((b) => b.addEventListener('click', () => {
    const m = b.dataset.motionSet;
    root.dataset.motion = m;
    try { localStorage.setItem('lx-motion', m); } catch (e) { /* storage blocked: applies to this page only */ }
    syncMotion();
    if (m === 'full') loadSwarm(); else if (window.LynexaSwarm) window.LynexaSwarm.destroy();
  }));
  sysReduce.addEventListener && sysReduce.addEventListener('change', () => {
    syncMotion();
    if (motionMode() !== 'full' && window.LynexaSwarm) window.LynexaSwarm.destroy();
  });

  /* Hero entrance (one orchestrated moment) */
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-ready')));

  /* Header: border on scroll, hide on scroll-down (desktop pointer devices only) */
  const header = document.querySelector('[data-header]');
  const waBtn = document.querySelector('.wa-float');
  const narrow = window.matchMedia('(max-width: 699px)');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    const menuOpen = root.classList.contains('menu-open');
    const focusInHeader = header.contains(document.activeElement);
    if (!menuOpen && !focusInHeader && y > 400 && y > lastY + 4) header.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 400) header.classList.remove('is-hidden');
    // On phones, slide the WhatsApp button away while reading downwards; bring it back on scroll up
    if (waBtn && narrow.matches) waBtn.classList.toggle('is-away', y > 300 && y > lastY + 4 ? true : (y < lastY - 4 ? false : waBtn.classList.contains('is-away')));
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
  onScroll();

  /* Mobile menu: dialog-like, focus contained, Escape closes */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const label = toggle && toggle.querySelector('.menu-toggle__label');
  const focusables = () => [toggle, ...menu.querySelectorAll('a')];
  const openMenu = () => {
    menu.hidden = false;
    root.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    label.textContent = 'Close';
    requestAnimationFrame(() => menu.classList.add('is-open'));
    menu.querySelector('a').focus();
  };
  const closeMenu = (restore = true) => {
    menu.classList.remove('is-open');
    root.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    label.textContent = 'Menu';
    menu.hidden = true;
    if (restore) toggle.focus();
  };
  if (toggle && menu) {
    toggle.addEventListener('click', () => (toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu()));
    document.addEventListener('keydown', (e) => {
      if (!root.classList.contains('menu-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(); }
      if (e.key === 'Tab') {
        const f = focusables();
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(false); });
    window.matchMedia('(min-width: 1000px)').addEventListener('change', (e) => { if (e.matches && root.classList.contains('menu-open')) closeMenu(false); });
  }

  /* Media reveal on scroll */
  const revealables = document.querySelectorAll('[data-reveal]');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealables.forEach((el) => io.observe(el));
  } else revealables.forEach((el) => el.classList.add('is-in'));

  /* About: draw the 'one team' ring when it scrolls in */
  const ring = document.querySelector('[data-reveal-ring]');
  if (ring && 'IntersectionObserver' in window) {
    const ro = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { ring.classList.add('is-in'); ro.disconnect(); } }), { threshold: 0.4 });
    ro.observe(ring);
  } else if (ring) ring.classList.add('is-in');

  /* Work filter */
  const filter = document.querySelector('[data-filter]');
  if (filter) {
    const items = document.querySelectorAll('[data-work-item]');
    const live = document.querySelector('[data-filter-status]');
    filter.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      filter.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const cat = b.dataset.cat;
      let n = 0;
      items.forEach((it) => {
        const show = cat === 'all' || it.dataset.cats.split(' ').includes(cat);
        it.hidden = !show;
        if (show) n++;
      });
      if (live) live.textContent = `Showing ${n} project${n === 1 ? '' : 's'}`;
    });
  }

  /* Forms: preselect from URL, validate accessibly, then native submit to Netlify Forms */
  const params = new URLSearchParams(location.search);
  document.querySelectorAll('form[data-validate]').forEach((form) => {
    const svc = params.get('service');
    if (svc) {
      const box = form.querySelector(`input[name="help_with"][value="${CSS.escape(svc)}"]`);
      if (box) box.checked = true;
    }
    const summary = form.querySelector('.form-summary');
    const fields = [...form.querySelectorAll('[data-field]')];

    const check = (field) => {
      const inputs = [...field.querySelectorAll('input, select, textarea')];
      const err = field.querySelector('.error');
      let msg = '';
      const first = inputs[0];
      if ('group' in field.dataset) {
        if (field.hasAttribute('data-required') && !inputs.some((i) => i.checked)) msg = field.dataset.msg || 'Choose at least one option.';
      } else if (first.type === 'checkbox') {
        if (first.required && !first.checked) msg = field.dataset.msg || 'Please confirm to continue.';
      } else {
        const v = first.value.trim();
        if (first.required && !v) msg = field.dataset.msg || 'This field is required.';
        else if (v && first.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = 'Enter an email address like name@company.com.';
        else if (v && first.type === 'tel' && !/^[+()\d\s-]{7,20}$/.test(v)) msg = 'Enter a phone number using digits, spaces or +.';
        else if (v && first.minLength > 0 && v.length < first.minLength) msg = `Add a little more detail (at least ${first.minLength} characters).`;
      }
      field.classList.toggle('has-error', !!msg);
      if (err) err.textContent = msg;
      inputs.forEach((i) => i.setAttribute('aria-invalid', msg ? 'true' : 'false'));
      return !msg;
    };

    fields.forEach((f) => {
      f.addEventListener('change', () => { if (f.classList.contains('has-error')) check(f); });
      f.addEventListener('input', () => { if (f.classList.contains('has-error')) check(f); });
      f.addEventListener('focusout', (e) => { if (!f.contains(e.relatedTarget) && !('group' in f.dataset)) { const i = f.querySelector('input, textarea, select'); if (i && (i.value || f.classList.contains('has-error'))) check(f); } });
    });

    /* Staged forms: show one step at a time */
    const steps = [...form.querySelectorAll('[data-step]')];
    let current = 0;
    const prev = form.querySelector('[data-prev]');
    const next = form.querySelector('[data-next]');
    const submit = form.querySelector('[data-submit]');
    const bar = form.querySelector('[data-step-bar]');
    const tabs = [...form.querySelectorAll('[data-step-tab]')];
    const status = form.querySelector('[data-step-status]');
    const show = (i, focus = true) => {
      current = i;
      steps.forEach((st, k) => { st.hidden = k !== i; });
      tabs.forEach((t, k) => { t.classList.toggle('is-current', k === i); t.classList.toggle('is-done', k < i); });
      if (bar) bar.style.transform = `scaleX(${(i + 1) / steps.length})`;
      prev.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      submit.hidden = i !== steps.length - 1;
      if (status) status.textContent = `Step ${i + 1} of ${steps.length}`;
      if (focus) {
        const t = steps[i].querySelector('.form__step-title');
        t.focus({ preventScroll: true });
        const top = form.getBoundingClientRect().top + window.scrollY - 100;
        if (form.getBoundingClientRect().top < 0) window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      }
    };
    const stepFields = (i) => fields.filter((f) => steps[i].contains(f));
    if (steps.length) {
      form.classList.add('is-staged');
      show(0, false);
      next.addEventListener('click', () => {
        const bad = stepFields(current).filter((f) => !check(f));
        if (bad.length) { bad[0].querySelector('input, select, textarea').focus(); return; }
        summary.classList.remove('is-visible');
        show(current + 1);
      });
      prev.addEventListener('click', () => show(current - 1));
      // Enter in a text input moves to the next step instead of submitting early
      form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.matches('input:not([type=checkbox]):not([type=radio])') && current < steps.length - 1) { e.preventDefault(); next.click(); }
      });
    }

    form.addEventListener('submit', (e) => {
      const bad = fields.filter((f) => !check(f));
      if (bad.length) {
        e.preventDefault();
        if (steps.length) {
          const s = steps.findIndex((st) => st.contains(bad[0]));
          if (s !== current) show(s, false);
        }
        summary.textContent = bad.length === 1 ? 'One field needs attention before you can send.' : `${bad.length} fields need attention before you can send.`;
        summary.classList.add('is-visible');
        bad[0].querySelector('input, select, textarea').focus();
        return;
      }
      summary.classList.remove('is-visible');
      const agg = form.querySelector('input[name="services_needed"]');
      if (agg) agg.value = [...form.querySelectorAll('input[name="help_with"]:checked')].map((i) => i.parentElement.textContent.trim()).join(', ');
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.setAttribute('aria-busy', 'true'); btn.querySelector('span').textContent = 'Sending…'; }
    });
  });
  /* Cursor and magnetic buttons: fine pointers only, never with reduced motion */
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cursor = document.querySelector('[data-cursor]');
  if (fine && !reduce && cursor) {
    const label = cursor.querySelector('[data-cursor-label]');
    let x = -100, y = -100, cx = x, cy = y, raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    document.addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      root.classList.add('has-cursor');
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener('pointerleave', () => root.classList.remove('has-cursor'));
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor-text]');
      const hit = e.target.closest('a, button, summary, label, input, textarea, select');
      cursor.classList.toggle('is-media', !!t);
      cursor.classList.toggle('is-link', !t && !!hit);
      label.textContent = t ? t.dataset.cursorText : '';
    });
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.25, dy = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* Keep the WhatsApp button out of the way while someone is filling in a form */
  const wa = document.querySelector('.wa-float');
  const forms = document.querySelectorAll('form[data-validate]');
  if (wa && forms.length && 'IntersectionObserver' in window) {
    const seen = new Set();
    const fo = new IntersectionObserver((es) => {
      es.forEach((en) => (en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)));
      wa.classList.toggle('is-tucked', seen.size > 0);
    }, { threshold: 0.15 });
    forms.forEach((f) => fo.observe(f));
  }

  /* Venture application page: ?model=... (from "Apply with this model") pre-selects that model */
  (() => {
    const m = new URLSearchParams(location.search).get('model');
    const form = document.querySelector('#apply form');
    if (!m || !form) return;
    const radio = [...form.querySelectorAll('input[name="model"]')].find((r) => r.value === m);
    if (!radio) return;
    radio.checked = true;
    const note = document.createElement('p');
    note.className = 'form-picked';
    note.setAttribute('role', 'status');
    note.textContent = 'Model selected: ' + m + '. You can change it in the last step.';
    form.insertBefore(note, form.querySelector('.form__step'));
  })();

  /* Venture models: "Apply with this model" pre-selects the matching option in the application form */
  document.querySelectorAll('[data-pick-model]').forEach((a) => {
    a.addEventListener('click', () => {
      const val = a.getAttribute('data-pick-model');
      const form = document.querySelector('#apply form');
      if (!form) return;
      const radio = [...form.querySelectorAll('input[name="model"]')].find((r) => r.value === val);
      if (!radio) return;
      radio.checked = true;
      radio.dispatchEvent(new Event('change', { bubbles: true }));
      let note = form.querySelector('[data-model-note]');
      if (!note) {
        note = document.createElement('p');
        note.className = 'form-picked';
        note.setAttribute('data-model-note', '');
        note.setAttribute('role', 'status');
        form.insertBefore(note, form.querySelector('.form__step'));
      }
      note.textContent = 'Model selected: ' + val + '. You can change it in the last step.';
    });
  });

  /* Legal pages: highlight the section being read in the contents list */
  const tocBox = document.querySelector('.legal-toc details');
  if (tocBox && !matchMedia('(min-width: 960px)').matches) tocBox.open = false;
  const tocLinks = [...document.querySelectorAll('.legal-toc a')];
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const byId = new Map(tocLinks.map((a) => [a.hash.slice(1), a]));
    const to = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (!en.isIntersecting) return;
        tocLinks.forEach((a) => { a.classList.remove('is-current'); a.removeAttribute('aria-current'); });
        const a = byId.get(en.target.id);
        if (a) { a.classList.add('is-current'); a.setAttribute('aria-current', 'location'); }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.legal-sec').forEach((sec) => to.observe(sec));
  }

  /* Reset busy buttons when returning via back/forward cache */
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    document.querySelectorAll('button[aria-busy="true"]').forEach((b) => { b.removeAttribute('aria-busy'); });
  });
})();
