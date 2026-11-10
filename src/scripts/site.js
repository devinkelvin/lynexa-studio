/* Lynexa site behaviour. No dependencies. Everything degrades to plain HTML. */
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hero entrance (one orchestrated moment) */
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-ready')));

  /* Header: border on scroll, hide on scroll-down (desktop pointer devices only) */
  const header = document.querySelector('[data-header]');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    const menuOpen = root.classList.contains('menu-open');
    const focusInHeader = header.contains(document.activeElement);
    if (!menuOpen && !focusInHeader && y > 400 && y > lastY + 4) header.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 400) header.classList.remove('is-hidden');
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
      f.addEventListener('focusout', (e) => { if (!f.contains(e.relatedTarget) && !('group' in f.dataset)) { const i = f.querySelector('input, textarea, select'); if (i && (i.value || f.classList.contains('has-error'))) check(f); } });
    });

    form.addEventListener('submit', (e) => {
      const bad = fields.filter((f) => !check(f));
      if (bad.length) {
        e.preventDefault();
        summary.textContent = bad.length === 1 ? 'One field needs attention before you can send.' : `${bad.length} fields need attention before you can send.`;
        summary.classList.add('is-visible');
        const target = bad[0].querySelector('input, select, textarea');
        target.focus();
        return;
      }
      summary.classList.remove('is-visible');
      const agg = form.querySelector('input[name="services_needed"]');
      if (agg) agg.value = [...form.querySelectorAll('input[name="help_with"]:checked')].map((i) => i.parentElement.textContent.trim()).join(', ');
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.setAttribute('aria-busy', 'true'); btn.querySelector('span').textContent = 'Sending…'; }
    });
  });
  /* Reset busy buttons when returning via back/forward cache */
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    document.querySelectorAll('button[aria-busy="true"]').forEach((b) => { b.removeAttribute('aria-busy'); });
  });
})();
