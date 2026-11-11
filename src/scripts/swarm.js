/* LYNEXA SWARM: the Living Build System.
 *
 * One shared swarm of tiny cursors lives in a corner of the viewport. When a section scrolls in, a few
 * cursors fly out and "build" it: they sweep headings, trace card outlines, wipe images into place and
 * draw connectors, then fly home and resume orbiting.
 *
 * Rules this file keeps:
 * - Content is never created or removed. Reveals use clip-path, opacity, translate/scale and SVG strokes on
 *   the existing server-rendered HTML, and every hidden state lives behind html.sw-on (removed on failure).
 * - The overlay is one <canvas>, aria-hidden, pointer-events: none. No DOM node per cursor.
 * - Layout is read when a section starts building, never on every frame (except sticky targets, which are
 *   re-read because they move with the viewport).
 * - Loaded lazily by site.js, only when motion is set to Full. See SWARM.md for configuration.
 */
(() => {
  'use strict';
  if (window.LynexaSwarm) return;
  const root = document.documentElement;
  const body = document.body;

  // ---------------------------------------------------------------- configuration
  const CONFIG = {
    counts: { desktop: 24, tablet: 16, mobile: 12, small: 9 },
    reserve: 0.22,                         // share of cursors that always stay home in formation
    corner: root.dataset.swarmCorner || 'bottom-left',
    inset: { desktop: 24, mobile: 14 },
    rings: { capacity: [6, 9, 99], radius: [10, 19, 29], period: [15000, 19000, 23000] },
    palette: {
      violet: '#5a35fe', magenta: '#c026d3', coral: '#f0614f', amber: '#e8962a',
      turquoise: '#0fb5a6', sky: '#1d9bf0', emerald: '#109a6a', lime: '#6fa514'
    },
    design: ['violet', 'magenta', 'coral', 'amber'],
    engineering: ['turquoise', 'sky', 'emerald', 'lime'],
    capMs: { desktop: 1900, mobile: 1200 },  // longest a single section may take to build
    fastScroll: 2.4,                         // px per ms; faster than this and sections appear instantly
    idleStopMs: 20000                        // freeze the orbit after this long with no input
  };
  const ORDER = ['violet', 'turquoise', 'coral', 'sky', 'amber', 'emerald', 'magenta', 'lime'];

  // ---------------------------------------------------------------- environment
  const mode = body.dataset.swarm || 'full';            // full | light | none (set per page at build time)
  const W = () => window.innerWidth, H = () => window.innerHeight;
  const isMobile = () => W() < 700;
  const isTablet = () => W() >= 700 && W() < 1100;
  const lowPower = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 2;
  let degraded = lowPower;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const timeScale = () => (isMobile() ? 0.72 : isTablet() ? 0.86 : 1);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeS = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
  const rand = (a, b) => a + Math.random() * (b - a);

  // ---------------------------------------------------------------- canvas overlay
  const canvas = document.createElement('canvas');
  canvas.className = 'swarm';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.setAttribute('role', 'presentation');
  body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let cw = 0, ch = 0;
  const safe = { l: 0, b: 0, r: 0 };
  function measureSafe() {
    const p = document.createElement('div');
    p.style.cssText = 'position:fixed;visibility:hidden;padding-left:env(safe-area-inset-left);padding-bottom:env(safe-area-inset-bottom);padding-right:env(safe-area-inset-right)';
    body.appendChild(p);
    const cs = getComputedStyle(p);
    safe.l = parseFloat(cs.paddingLeft) || 0; safe.b = parseFloat(cs.paddingBottom) || 0; safe.r = parseFloat(cs.paddingRight) || 0;
    p.remove();
  }
  function resize() {
    cw = W(); ch = H();
    canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr);
    canvas.style.width = cw + 'px'; canvas.style.height = ch + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    placeHome();
    fullClear = true;
  }

  // Cursor sprites: one pre-rendered pointer per colour (crisp, cheap to draw 30 times a frame)
  const ARROW = new Path2D('M0 0L0 13.2L3.3 10.1L5.5 14.9L7.6 14L5.4 9.3L9.9 9.3Z');
  const sprites = {};
  function sprite(color) {
    if (sprites[color]) return sprites[color];
    const s = document.createElement('canvas');
    const k = dpr * 1.6;                                 // supersample for rotation/scale
    s.width = Math.ceil(13 * k); s.height = Math.ceil(18 * k);
    const c = s.getContext('2d');
    c.scale(k, k); c.translate(1.5, 1.5);
    c.lineJoin = 'round';
    c.strokeStyle = 'rgba(24,23,28,.28)'; c.lineWidth = 2.6; c.stroke(ARROW);   // hairline shadow for light backgrounds
    c.strokeStyle = '#fff'; c.lineWidth = 1.5; c.stroke(ARROW);               // white keyline for dark backgrounds
    c.fillStyle = color; c.fill(ARROW);
    sprites[color] = { img: s, k };
    return sprites[color];
  }

  // ---------------------------------------------------------------- formation (idle orbit)
  const IDLE_ALPHA = 0.88;
  const home = { x: 0, y: 0, scale: 1, alpha: IDLE_ALPHA, targetAlpha: IDLE_ALPHA };
  function placeHome() {
    const m = isMobile();
    home.scale = m ? 0.76 : isTablet() ? 0.88 : 1;
    const R = CONFIG.rings.radius[2] * home.scale + 8;
    const ins = m ? CONFIG.inset.mobile : CONFIG.inset.desktop;
    const left = CONFIG.corner.includes('left');
    home.x = left ? ins + safe.l + R : cw - ins - safe.r - R;
    home.y = CONFIG.corner.includes('top') ? ins + R + 70 : ch - ins - safe.b - R;
  }

  const cursors = [];
  function makeCursors() {
    const n = isMobile() ? (W() < 360 ? CONFIG.counts.small : CONFIG.counts.mobile) : isTablet() ? CONFIG.counts.tablet : CONFIG.counts.desktop;
    const count = Math.round(n * (lowPower ? 0.7 : 1));
    const caps = CONFIG.rings.capacity;
    let ring = 0, inRing = 0;
    const ringSizes = [];
    for (let i = 0; i < count; i++) {
      if (inRing >= caps[ring]) { ring++; inRing = 0; }
      ringSizes[ring] = (ringSizes[ring] || 0) + 1; inRing++;
    }
    ring = 0; inRing = 0;
    for (let i = 0; i < count; i++) {
      if (inRing >= caps[ring]) { ring++; inRing = 0; }
      const colorName = ORDER[i % ORDER.length];
      cursors.push({
        i, ring, slot: inRing / ringSizes[ring],
        color: CONFIG.palette[colorName], group: CONFIG.design.includes(colorName) ? 'design' : 'engineering',
        seed: Math.random() * 1000, size: rand(0.6, 0.74), tilt: rand(-0.24, 0.1),
        state: 'orbit', x: 0, y: 0, vx: 0, rot: 0, // x,y are viewport coords in orbit; document coords when deployed
        queue: [], job: null, t0: 0, from: null, bend: 0, trail: [], reserve: false
      });
      inRing++;
    }
    const keep = Math.max(3, Math.round(count * CONFIG.reserve));
    // keep a few inner-ring cursors home so the formation never empties
    cursors.filter((c) => c.ring === 0).slice(0, keep).forEach((c) => { c.reserve = true; });
  }
  function orbitPos(c, t) {
    const r = CONFIG.rings;
    const dir = c.ring % 2 ? -1 : 1;
    const ang = c.slot * Math.PI * 2 + dir * (t / r.period[c.ring]) * Math.PI * 2 + 0.07 * Math.sin(t * 0.00035 + c.seed);
    const rad = (r.radius[c.ring] + 1.3 * Math.sin(t * 0.0006 + c.seed)) * home.scale;
    return [home.x + Math.cos(ang) * rad, home.y + Math.sin(ang) * rad * 0.94];
  }

  // ---------------------------------------------------------------- guides, pulses
  const guides = [];   // { pts (doc), color, prog 0..1, fadeAt, born, dash, alpha, live }
  const pulses = [];   // { x, y (doc), color, born }
  const timers = [];   // { at (clock), fn }
  let clock = 0;
  const after = (ms, fn) => timers.push({ at: clock + ms, fn });

  // ---------------------------------------------------------------- reveal helpers (DOM)
  const PENDING = ['sw-h', 'sw-t', 'sw-c', 'sw-m', 'sw-m--up', 'sw-p', 'sw-f', 'sw-w', 'sw-wr'];
  function reveal(el, ms, extra = 900) {
    if (!el || !el.isConnected || el.classList.contains('sw-go')) return;
    el.style.setProperty('--sw-d', Math.round(ms) + 'ms');
    el.classList.add('sw-go', 'sw-built');
    after(ms + extra, () => settle(el));
  }
  function settle(el) {
    el.classList.remove('sw-go', 'sw-now', 'sw-done', ...PENDING);
    el.style.removeProperty('--sw-d');
    el.style.removeProperty('clip-path');
    if (el.dataset.swPl) { el.removeAttribute('pathLength'); delete el.dataset.swPl; }
  }
  function instant(el) {
    el.classList.add('sw-now', 'sw-go', 'sw-built');
    requestAnimationFrame(() => requestAnimationFrame(() => settle(el)));
  }

  // ---------------------------------------------------------------- geometry
  const sx = () => window.scrollX, sy = () => window.scrollY;
  function docRect(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + sx(), y: r.top + sy(), w: r.width, h: r.height };
  }
  function lineBoxes(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const lines = [];
    for (const b of range.getClientRects()) {
      if (b.width < 3 || b.height < 6) continue;
      const hit = lines.find((l) => Math.abs(l.top - b.top) < b.height * 0.5);
      if (hit) { hit.l = Math.min(hit.l, b.left); hit.r = Math.max(hit.r, b.right); hit.bottom = Math.max(hit.bottom, b.bottom); }
      else lines.push({ l: b.left, r: b.right, top: b.top, bottom: b.bottom });
    }
    return lines.map((l) => ({ x1: l.l + sx(), x2: l.r + sx(), y: l.bottom + sy() - (l.bottom - l.top) * 0.12, top: l.top + sy(), bot: l.bottom + sy() }));
  }
  function stickyAncestor(el, stop) {
    for (let n = el, i = 0; n && n !== stop && i < 6; n = n.parentElement, i++) if (getComputedStyle(n).position === 'sticky') return n;
    return null;
  }
  const rectPts = (r, order) => {
    const TL = [r.x, r.y], TR = [r.x + r.w, r.y], BR = [r.x + r.w, r.y + r.h], BL = [r.x, r.y + r.h];
    return { a: [TL, TR, BR], b: [TL, BL, BR], full: [TL, TR, BR, BL, TL], top: [TL, TR], left: [TL, BL] }[order];
  };

  // ---------------------------------------------------------------- jobs
  // A job is one piece of work for one cursor: travel to pts[0], then follow pts over dur ms.
  // onStart fires when the cursor begins working (that is when the DOM reveal starts, in sync).
  const job = (pts, dur, o = {}) => ({ pts, dur, guide: o.guide === undefined ? 'line' : o.guide, onStart: o.onStart, onEnd: o.onEnd, onFrame: o.onFrame, quick: o.quick, pulse: o.pulse !== false, wait: o.wait || 0, live: o.live || null });
  const ts = (ms, unit) => ms * timeScale() * (unit.tempo || 1);

  const hideable = (u) => !u.noHide;
  function mark(u, el, cls) { if (hideable(u) && el && !el.classList.contains('sw-go')) { el.classList.add(...cls.split(' ')); u.els.add(el); } }

  // Writing: one cursor travels along each line of text and the words appear exactly where its tip has reached,
  // with a quick carriage return to the next line. The reveal is a clip-path staircase driven by the cursor position.
  function writeClip(el, er, L, i, x) {
    const P = (a, b) => `${a.toFixed(1)}px ${b.toFixed(1)}px`;
    // each line's band ends just under its descenders, so tight headlines do not leak the next line's ascenders
    const edge = (k) => (k === L.length - 1 ? L[k].bot + 12 : L[k].bot - (L[k].bot - L[k].top) * 0.05 + 1) - er.y;
    const left = -12, right = er.w + 12, T0 = L[0].top - er.y - 8;
    const bi = edge(i);
    let pts;
    if (i === 0) pts = [P(left, T0), P(x, T0), P(x, bi), P(left, bi)];
    else { const bp = edge(i - 1); pts = [P(left, T0), P(right, T0), P(right, bp), P(x, bp), P(x, bi), P(left, bi)]; }
    el.style.clipPath = `polygon(${pts.join(', ')})`;
  }
  function writeJobs(u, el, speed, o = {}) {
    const L = lineBoxes(el);
    if (!L.length) return [];
    const er = docRect(el);
    const store = () => { if (!el.classList.contains('sw-wr')) { el.classList.remove('sw-t', 'sw-h'); el.classList.add('sw-wr'); u.els.add(el); } };
    return L.map((l, i) => {
      const w = l.x2 - l.x1;
      const d = ts(clamp(w / speed, 110, 1150), u) * (o.f || 1);
      return job([[l.x1 - 2, l.y], [l.x2 + 3, l.y]], d, {
        wait: i === 0 ? (o.wait || 0) : 0, quick: i > 0, guide: o.guide === undefined ? 'line' : o.guide, pulse: i === L.length - 1,
        onStart: () => { store(); writeClip(el, er, L, i, l.x1 - er.x - 2); },
        onFrame: (t, c) => writeClip(el, er, L, i, i === L.length - 1 && t >= 1 ? er.w + 12 : c.x - er.x),
        onEnd: i === L.length - 1 ? () => { el.style.removeProperty('clip-path'); el.classList.add('sw-done', 'sw-built'); after(400, () => settle(el)); } : null
      });
    });
  }
  const writable = (el) => { const L = lineBoxes(el); return L.length && L.length <= 6; };

  // Heading: one cursor writes it line by line.
  function planHeading(u, h, tracks, wait = 0) {
    const jobs = hideable(u) ? writeJobs(u, h, 1.5, { wait }) : [];
    if (jobs.length) { tracks.push(jobs); return; }
    const lines = lineBoxes(h);
    if (!lines.length) return;
    const total = lines.reduce((s, l) => s + (l.x2 - l.x1), 0);
    lines.forEach((l, i) => {
      const d = ts(clamp(320 + (l.x2 - l.x1) * 0.55, 380, 950), u);
      const j = job([[l.x1 - 4, l.y], [l.x2 + 4, l.y]], d, {
        wait: i * 90,
        onStart: i === 0 ? () => reveal(h, ts(clamp(380 + total * 0.18, 500, 1100), u), 300) : null
      });
      tracks.push([j]);
    });
  }
  // Supporting text: short paragraphs are written (fast); long ones get a margin mark and settle in.
  function planText(u, p, tracks, wait = 0) {
    const r = docRect(p);
    if (!r.h) return;
    if (hideable(u) && writable(p)) { tracks.push(writeJobs(u, p, 3.2, { wait, guide: null })); return; }
    tracks.push([job([[r.x - 8, r.y + 2], [r.x - 8, r.y + Math.min(r.h, 90)]], ts(380, u), { wait, onStart: () => reveal(p, ts(560, u), 300) })]);
  }
  // Card: one cursor traces top and right edges, another the left and bottom, while the surface is drawn from
  // the top-left corner; a third places any image or illustration. Children settle once the surface is up.
  function planCard(u, card, tracks, wait = 0) {
    const r = docRect(card);
    if (!r.h || !r.w) return;
    const live = stickyAncestor(card, u.section);
    const L = live ? { el: live, base: docRect(live) } : null;
    const per = ts(clamp(420 + (r.w + r.h) * 0.32, 560, 1100), u);
    tracks.push([job(rectPts(r, 'a'), per, { wait, live: L, onStart: () => reveal(card, per, 1000) })]);
    tracks.push([job(rectPts(r, 'b'), per, { wait: wait + 70, live: L })]);
    const svg = card.querySelector('svg.art');
    const media = card.querySelector('.device, .browser, .showcase__media, .vcard__media, .scard__art img, figure');
    if (svg) planSvg(u, svg, tracks, wait + per * 0.45, L);
    else if (media) planMedia(u, media, tracks, wait + per * 0.35, L, true);
  }
  // Image: a light construction grid appears, then a cursor carries the leading edge across as the image is unmasked.
  function planMedia(u, m, tracks, wait = 0, live = null, inCard = false) {
    const r = docRect(m);
    if (!r.h || !r.w) return;
    const up = r.h > r.w * 1.15;   // tall frames (phones, portraits) build bottom-up
    if (!inCard) live = live || (stickyAncestor(m, u.section) ? { el: stickyAncestor(m, u.section), base: docRect(stickyAncestor(m, u.section)) } : null);
    mark(u, m, up ? 'sw-m sw-m--up' : 'sw-m');
    const d = ts(clamp(560 + Math.max(r.w, r.h) * 0.35, 650, 1150), u);
    const pts = up ? [[r.x, r.y + r.h], [r.x + r.w, r.y + r.h], [r.x + r.w, r.y]] : [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h]];
    tracks.push([job(pts, d, {
      wait, live, guide: 'line',
      onStart: () => { reveal(m, d * 0.92, 600); if (!degraded) gridGuide(r, d, live); }
    })]);
  }
  // Device and browser frames: trace the outline first, then unmask the screen.
  function planFrame(u, dev, tracks, wait = 0) {
    const frame = dev.querySelector('.device__frame, .browser') || dev;
    const screen = dev.querySelector('.device__screen, .browser__screen');
    const r = docRect(frame);
    if (!r.h) return;
    mark(u, dev, 'sw-c');
    const d = ts(clamp(520 + (r.w + r.h) * 0.25, 620, 1100), u);
    tracks.push([job(rectPts(r, 'full'), d, { wait, onStart: () => reveal(dev, d * 0.7, 900) })]);
    if (screen) {
      mark(u, screen, 'sw-m sw-m--up');
      const sr = docRect(screen);
      tracks.push([job([[sr.x, sr.y + sr.h], [sr.x + sr.w, sr.y + sr.h * 0.6]], ts(700, u), { wait: wait + d * 0.55, guide: null, onStart: () => reveal(screen, ts(800, u), 500) })]);
    }
    const cap = dev.querySelector('figcaption');
    if (cap) mark(u, cap, 'sw-t');
    if (cap) tracks[tracks.length - 1].push(job(rectPts(docRect(cap), 'top'), ts(300, u), { onStart: () => reveal(cap, ts(500, u), 300) }));
  }
  // Illustrations: the cursor follows the first strong stroke while every stroke draws itself in.
  function planSvg(u, svg, tracks, wait = 0, live = null) {
    const shapes = [...svg.querySelectorAll('path, rect, circle, line, polyline, ellipse')];
    if (!shapes.length) return;
    const draw = [], fade = [];
    shapes.forEach((s) => {
      const cs = getComputedStyle(s);
      const stroked = cs.stroke && cs.stroke !== 'none' && (cs.strokeDasharray === 'none' || cs.strokeDasharray === '');
      if (s.tagName === 'path' && stroked && (cs.fill === 'none' || cs.fill === 'rgba(0, 0, 0, 0)')) draw.push(s); else fade.push(s);
    });
    if (hideable(u)) draw.forEach((s) => { s.setAttribute('pathLength', '1'); s.dataset.swPl = '1'; mark(u, s, 'sw-p'); });
    fade.forEach((s) => mark(u, s, 'sw-f'));
    const lead = draw.find((s) => s.closest('.art-strong') || s.classList.contains('art-strong')) || draw[0];
    const d = ts(1000, u);
    const go = () => {
      fade.forEach((s, i) => { s.style.setProperty('--sw-k', (i * 50) + 'ms'); reveal(s, d * 0.6, 800); });
      draw.forEach((s) => reveal(s, d, 500));
    };
    let pts = null;
    if (lead && lead.getTotalLength && lead.getScreenCTM) {
      try {
        const len = lead.getTotalLength(); const m = lead.getScreenCTM(); const n = 14; pts = [];
        for (let i = 0; i <= n; i++) {
          const p = lead.getPointAtLength((len * i) / n);
          pts.push([m.a * p.x + m.c * p.y + m.e + sx(), m.b * p.x + m.d * p.y + m.f + sy()]);
        }
      } catch (e) { pts = null; }
    }
    if (!pts) { const r = docRect(svg); pts = rectPts(r, 'top'); }
    tracks.push([job(pts, d, { wait, live, onStart: go })]);
  }
  // Rows and separators: a cursor rules a line along the top edge, then the row's content settles.
  function planRow(u, row, tracks, wait = 0, hide = true) {
    const r = docRect(row);
    if (!r.h) return;
    if (hide) mark(u, row, 'sw-t');
    const d = ts(clamp(300 + r.w * 0.45, 420, 900), u);
    tracks.push([job([[r.x, r.y], [r.x + r.w, r.y]], d, { wait, onStart: hide ? () => reveal(row, ts(600, u), 300) : null })]);
  }
  // Buttons are never hidden: a cursor underlines them and leaves a small placement pulse.
  function planButton(u, b, tracks, wait = 0) {
    const r = docRect(b);
    if (!r.w) return;
    tracks.push([job([[r.x + 10, r.y + r.h + 7], [r.x + r.w - 10, r.y + r.h + 7]], ts(380, u), { wait })]);
  }
  function gridGuide(r, d, live) {
    const g = [];
    for (let i = 1; i < 3; i++) {
      g.push([[r.x + (r.w * i) / 3, r.y], [r.x + (r.w * i) / 3, r.y + r.h]]);
      g.push([[r.x, r.y + (r.h * i) / 3], [r.x + r.w, r.y + (r.h * i) / 3]]);
    }
    g.forEach((pts) => guides.push({ pts, color: 'rgba(90,53,254,.35)', prog: 1, born: clock, fadeAt: clock + d * 0.9, dash: true, live, plain: true }));
  }

  // ---------------------------------------------------------------- units (what gets built, and when)
  const CARD = '.reasons > div, .scard, .showcase__item, .vcard, .card, .vmodel, .model, .work-card, .channel, .faq-contact, .founder-card__panel';
  const FRAME = '.device, .browser';
  const MEDIA = '.photo-band figure, .founder-card__photo, .case-hero__media, .duo figure, .gallery figure';
  const ROW = '.stack > div, .svc-row, .founder-card__facts > div, .also li, .fit li';
  const units = [];
  const inForm = (el) => !!el.closest('form, .form, [data-stepper], .filter');

  function makeUnit(section, kind, opts = {}) {
    const u = { section, kind, els: new Set(), plan: null, tempo: opts.tempo || section.__tempo || 1, noHide: mode === 'light' || opts.noHide, state: 'pending', anchor: opts.anchor, data: opts.data || {} };
    units.push(u);
    return u;
  }

  function collect(section) {
    if (section.classList.contains('hero') || section.classList.contains('page-hero')) return;
    if (section.querySelector('form, [data-stepper]') && !section.querySelector(CARD + ', h2')) return;
    const editorial = section.querySelector('.founder-card, .chapter, .case-hero') || (section.querySelector('.split') && !section.querySelector(CARD + ', ' + ROW));
    const understated = section.querySelector('.faq, .models');
    section.__tempo = editorial ? 1.15 : understated ? 0.7 : 0.9;
    const taken = new Set();
    const claim = (el) => { taken.add(el); return el; };
    const free = (el) => ![...taken].some((t) => t.contains(el) || el.contains(t)) && !inForm(el);

    // Designers and engineers: the two groups build opposite halves, then meet in the middle.
    const stack = section.querySelector('.stack');
    if (stack) {
      const u = makeUnit(section, 'duo', { anchor: section.querySelector('.split') || stack, data: { stack } });
      section.querySelectorAll('h2, .lead, .stack').forEach(claim);
      return;
    }
    // Process steps and phases: a connector runs through the stages and each one is built as it is reached.
    const steps = section.querySelector('.steps');
    if (steps && free(steps)) { makeUnit(section, 'steps', { anchor: steps, data: { steps } }); claim(steps); }
    section.querySelectorAll('.phase').forEach((ph) => { makeUnit(section, 'phase', { anchor: ph, data: { ph } }); claim(ph); });
    const faq = section.querySelector('.faq');
    if (faq) { makeUnit(section, 'faq', { anchor: faq, noHide: true, data: { faq } }); claim(faq); }

    section.querySelectorAll('h2').forEach((h) => {
      if (!free(h) || h.closest(CARD)) return;
      const host = h.closest('.sec-head, .phase > div, .split > div') || h.parentElement;
      const texts = [...host.querySelectorAll(':scope > p, :scope > .lead')].filter(free);
      const split = h.closest('.split');
      if (split) split.querySelectorAll(':scope > div > p, :scope > div > .lead').forEach((p) => { if (free(p) && !texts.includes(p)) texts.push(p); });
      makeUnit(section, 'head', { anchor: h, data: { h, texts } });
      claim(h); texts.forEach(claim);
    });
    // Cards, grouped by their container, one unit per visual row so long grids build as you reach them
    const cards = [...section.querySelectorAll(CARD)].filter((c) => free(c) && !c.parentElement.closest(CARD));
    const groups = new Map();
    cards.forEach((c) => { const k = c.parentElement; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(c); });
    groups.forEach((list) => {
      const rows = [];
      list.forEach((c) => {
        const top = c.getBoundingClientRect().top;
        const sticky = getComputedStyle(c).position === 'sticky';
        const row = !sticky && rows.find((r) => Math.abs(r.top - top) < 40);
        if (row) row.items.push(c); else rows.push({ top, items: [c] });
      });
      rows.forEach((r) => { makeUnit(section, 'cards', { anchor: r.items[0], data: { items: r.items } }); r.items.forEach(claim); });
    });
    // Device frames and stand-alone images
    const frames = [...section.querySelectorAll(FRAME)].filter(free);
    const frows = [];
    frames.forEach((f) => { const top = f.getBoundingClientRect().top; const row = frows.find((r) => Math.abs(r.top - top) < 60); if (row) row.items.push(f); else frows.push({ top, items: [f] }); });
    frows.forEach((r) => { makeUnit(section, 'frames', { anchor: r.items[0], data: { items: r.items } }); r.items.forEach(claim); });
    [...section.querySelectorAll(MEDIA)].filter(free).forEach((m) => { makeUnit(section, 'media', { anchor: m, data: { m } }); claim(m); });
    // Rows and lists
    const rws = [...section.querySelectorAll(ROW)].filter(free);
    const rgroups = new Map();
    rws.forEach((r) => { const k = r.parentElement; if (!rgroups.has(k)) rgroups.set(k, []); rgroups.get(k).push(r); });
    rgroups.forEach((list, k) => { makeUnit(section, 'rows', { anchor: k, data: { items: list } }); list.forEach(claim); });
    // Section call-to-action buttons (guides only)
    const ctas = [...section.querySelectorAll('.center-cta .btn, .sec-head + .actions .btn, :scope > .shell > p > .link, .cta-band__inner > .actions .btn')].filter((b) => !inForm(b));
    if (ctas.length) makeUnit(section, 'ctas', { anchor: ctas[0], noHide: true, data: { items: ctas, close: section.classList.contains('cta-band') } });
  }

  function scope(u) {
    const d = u.data;
    return { head: () => [d.h, ...d.texts], duo: () => [u.section], steps: () => [d.steps], phase: () => [d.ph], cards: () => d.items, frames: () => d.items, media: () => [d.m], rows: () => d.items, faq: () => [d.faq], ctas: () => d.items, intro: () => [u.section] }[u.kind]?.() || [];
  }
  const within = (u, t) => scope(u).some((el) => el && (el === t || el.contains(t)));

  // Hide what a unit will build (only for units that start below the fold)
  function prime(u) {
    const d = u.data;
    const T = (el) => mark(u, el, 'sw-t');
    switch (u.kind) {
      case 'head': mark(u, d.h, 'sw-h'); d.texts.forEach(T); break;
      case 'duo': u.section.querySelectorAll('h2').forEach((h) => mark(u, h, 'sw-h')); u.section.querySelectorAll('.split .lead').forEach(T); d.stack.querySelectorAll(':scope > div').forEach(T); break;
      case 'steps': d.steps.querySelectorAll(':scope > .step').forEach((s) => mark(u, s, 'sw-c')); break;
      case 'phase': {
        const ph = d.ph; mark(u, ph.querySelector('h2'), 'sw-h');
        ph.querySelectorAll('.phase__n, .lead, :scope > div > p, h3').forEach(T);
        ph.querySelectorAll('.checklist li').forEach(T); break;
      }
      case 'cards': d.items.forEach((c) => mark(u, c, 'sw-c')); break;
      case 'frames': d.items.forEach((f) => { mark(u, f, 'sw-c'); const s = f.querySelector('.device__screen, .browser__screen'); if (s) mark(u, s, 'sw-m sw-m--up'); const c = f.querySelector('figcaption'); if (c) T(c); }); break;
      case 'rows': d.items.forEach(T); break;
      default: break;
    }
    // Media and illustration pending states are applied inside the planners (they need geometry), so plan
    // those now too, while the unit is still off-screen. The plan is rebuilt with fresh geometry on start.
    if (u.kind === 'media') mark(u, d.m, 'sw-m');
    if (u.kind === 'cards') d.items.forEach((c) => {
      const svg = c.querySelector('svg.art');
      if (svg) svg.querySelectorAll('path, rect, circle, line, polyline, ellipse').forEach((s) => mark(u, s, 'sw-f'));
      else { const m = c.querySelector('.device, .browser, .showcase__media, .vcard__media, figure'); if (m) mark(u, m, 'sw-m'); }
    });
  }

  function plan(u) {
    const d = u.data, tracks = [];
    switch (u.kind) {
      case 'head': {
        planHeading(u, d.h, tracks);
        d.texts.forEach((p, i) => planText(u, p, tracks, 260 + i * 120));
        break;
      }
      case 'duo': {
        const design = [], eng = [];
        u.section.querySelectorAll('h2').forEach((h) => planHeading(u, h, design));
        u.section.querySelectorAll('.split .lead').forEach((p) => planText(u, p, design, 300));
        [...d.stack.querySelectorAll(':scope > div')].forEach((row, i) => planRow(u, row, eng, i * 110));
        const left = docRect(u.section.querySelector('.split > div') || d.stack), right = docRect(d.stack);
        const meet = [[left.x + left.w * 0.6, left.y + left.h + 18], [right.x, right.y + right.h + 18]];
        eng.push([job(meet, ts(700, u), { wait: 900 })]);
        design.forEach((t) => (t.group = 'design'));
        eng.forEach((t) => (t.group = 'engineering'));
        tracks.push(...design, ...eng);
        break;
      }
      case 'steps': {
        const items = [...d.steps.querySelectorAll(':scope > .step')];
        const nums = items.map((s) => docRect(s.querySelector('.step__n') || s));
        const sameRow = nums.every((n) => Math.abs(n.y - nums[0].y) < 30);
        const pts = nums.map((n) => [n.x + n.w / 2, n.y + n.h / 2]);
        const dur = ts(1000, u);
        const stepAt = (i) => (dur * i) / Math.max(1, items.length - 1);
        if (pts.length > 1) tracks.push([job(sameRow ? pts : pts.map((p) => [Math.min(...pts.map((q) => q[0])) - 18, p[1]]), dur, {
          onStart: () => items.forEach((s, i) => after(stepAt(i), () => { reveal(s, ts(650, u), 1000); pulseAt(pts[i], '#5a35fe'); }))
        })]);
        items.forEach((s, i) => { const r = docRect(s); tracks.push([job(rectPts(r, 'a'), ts(600, u), { wait: stepAt(i) })]); });
        break;
      }
      case 'phase': {
        const ph = d.ph;
        planRow(u, ph, tracks, 0, false);
        const h = ph.querySelector('h2');
        if (h) planHeading(u, h, tracks);
        ph.querySelectorAll('.phase__n, .lead, :scope > div > p').forEach((p, i) => planText(u, p, tracks, 200 + i * 120));
        ph.querySelectorAll('h3').forEach((p, i) => planText(u, p, tracks, 450 + i * 160));
        // the "ticks": a cursor hops down each checklist, marking every item as it settles
        ph.querySelectorAll('.checklist').forEach((list, li) => {
          const items = [...list.children];
          const track = items.map((it, i) => {
            const r = docRect(it.querySelector('svg') || it);
            return job([[r.x + r.w / 2, r.y + r.h / 2], [r.x + r.w / 2 + 2, r.y + r.h / 2 + 2]], ts(170, u), { wait: i === 0 ? 600 + li * 200 : 0, guide: null, onStart: () => reveal(it, ts(420, u), 300) });
          });
          if (track.length) tracks.push(track);
        });
        break;
      }
      case 'cards': d.items.forEach((c, i) => planCard(u, c, tracks, i * 140)); break;
      case 'frames': d.items.forEach((f, i) => planFrame(u, f, tracks, i * 160)); break;
      case 'media': planMedia(u, d.m, tracks); break;
      case 'rows': d.items.forEach((r, i) => planRow(u, r, tracks, i * 90)); break;
      case 'faq': {
        [...d.faq.querySelectorAll('details')].forEach((dt, i) => { const r = docRect(dt); tracks.push([job(rectPts(r, 'top'), ts(420, u), { wait: i * 80 })]); });
        break;
      }
      case 'ctas': {
        d.items.forEach((b, i) => planButton(u, b, tracks, i * 120));
        if (d.close) {
          // Closing scene: builders gather and draw a ring around the primary action, then go home
          const r = docRect(d.items[0]);
          const cx = r.x + r.w / 2, cy = r.y + r.h / 2, rx = r.w / 2 + 18, ry = r.h / 2 + 14;
          const arcs = isMobile() ? 2 : 4;
          for (let a = 0; a < arcs; a++) {
            const pts = [];
            for (let k = 0; k <= 10; k++) { const t = ((a + k / 10) / arcs) * Math.PI * 2 - Math.PI / 2; pts.push([cx + Math.cos(t) * rx, cy + Math.sin(t) * ry]); }
            tracks.push([job(pts, ts(650, u), { wait: 380, onEnd: a === 0 ? () => pulseAt([cx, cy - ry], '#a898ff') : null })]);
          }
        }
        break;
      }
      default: break;
    }
    return tracks;
  }

  // ---------------------------------------------------------------- the controller
  let state = 'idle';           // idle | deploying | constructing | returning | paused
  const active = [];             // units currently building
  let lastScrollY = sy(), lastScrollT = performance.now(), velocity = 0, atBottom = false;

  function freeCursors() { return cursors.filter((c) => !c.reserve && (c.state === 'orbit' || c.state === 'return')); }

  function start(u) {
    if (u.state !== 'pending') return;
    if (state === 'paused' || Math.abs(velocity) > CONFIG.fastScroll || degradedHard) return finish(u);
    const r = u.anchor ? u.anchor.getBoundingClientRect() : u.section.getBoundingClientRect();
    if (r.bottom < 0 || r.top > H() * 1.1) return finish(u);  // passed by, or jumped over
    let tracks = plan(u).filter((t) => t.length);
    if (!tracks.length) return finish(u);
    u.state = 'building';
    active.push(u);
    let free = freeCursors();
    if (free.length < 2 && active.length > 1) { finish(active[0]); free = freeCursors(); }
    if (!free.length) return finish(u);
    // Several tracks per cursor if the swarm is outnumbered
    const want = Math.min(tracks.length, free.length);
    if (tracks.length > want) {
      const merged = Array.from({ length: want }, () => []);
      tracks.forEach((t, i) => merged[i % want].push(...t));
      merged.forEach((m, i) => { m.group = tracks[i].group; });
      tracks = merged;
    }
    // Keep each section brief: scale timings if a cursor's queue runs long
    const cap = isMobile() ? CONFIG.capMs.mobile : CONFIG.capMs.desktop;
    const longest = Math.max(...tracks.map((t) => t.reduce((s, j) => s + j.dur + j.wait, 0)));
    const k = longest > cap * (u.tempo || 1) ? (cap * (u.tempo || 1)) / longest : 1;
    if (k < 1) tracks.forEach((t) => t.forEach((j) => { j.dur *= k; j.wait *= k; }));
    // Assign: matching colour group first, then nearest to the work
    u.cursors = [];
    tracks.forEach((t, i) => {
      let pool = free.filter((c) => !u.cursors.includes(c));
      if (t.group) { const g = pool.filter((c) => c.group === t.group); if (g.length) pool = g; }
      const c = pool[0];
      if (!c) return;
      u.cursors.push(c);
      c.queue = t.map((j) => ({ ...j, unit: u }));
      c.releaseAt = clock + i * (isMobile() ? 35 : 50);    // staggered release from the formation
      next(c);
    });
    setState();
    wake();
  }
  function finish(u) {
    if (u.state === 'done') return;
    u.state = 'done';
    u.els.forEach((el) => { if (el.isConnected) instant(el); });
    u.els.clear();
    if (u.onDone) u.onDone();
    const i = active.indexOf(u);
    if (i >= 0) active.splice(i, 1);
    if (u.cursors) u.cursors.forEach((c) => { if (c.job && c.job.unit === u || c.queue.some((j) => j.unit === u)) { c.queue = []; c.job = null; goHome(c); } });
    setState();
  }
  function finishAll() { units.forEach(finish); }
  function unitDone(u) {
    if (u.state !== 'building') return;
    if (cursors.some((c) => (c.job && c.job.unit === u) || c.queue.some((j) => j.unit === u))) return;
    u.state = 'done';
    if (u.onDone) u.onDone();
    after(1400, () => { u.els.forEach((el) => { if (el.classList.contains('sw-go')) settle(el); }); u.els.clear(); });
    const i = active.indexOf(u);
    if (i >= 0) active.splice(i, 1);
    setState();
  }
  function setState() {
    if (state === 'paused') return;
    const out = cursors.filter((c) => c.state !== 'orbit');
    state = !out.length ? 'idle' : out.some((c) => c.state === 'work') ? 'constructing' : out.every((c) => c.state === 'return') ? 'returning' : 'deploying';
    root.dataset.swarmState = state;
  }

  // ---------------------------------------------------------------- cursor lifecycle
  function toDoc(c) { if (c.space !== 'doc') { c.x += sx(); c.y += sy(); c.space = 'doc'; } }
  function next(c) {
    const j = c.queue.shift();
    if (!j) { const u = c.job && c.job.unit; c.job = null; goHome(c); if (u) unitDone(u); return; }
    c.job = j;
    toDoc(c);
    c.state = 'travel';
    c.from = [c.x, c.y];
    c.t0 = Math.max(clock, c.releaseAt || 0);
    c.releaseAt = 0;
    const off = liveOffset(j);
    const to = [j.pts[0][0] + off[0], j.pts[0][1] + off[1]];
    const dist = Math.hypot(to[0] - c.x, to[1] - c.y);
    c.tdur = j.quick ? clamp(dist / 4.5, 70, 200) : clamp(dist / (isMobile() ? 2 : 1.7), 140, isMobile() ? 420 : 620);
    c.waitUntil = c.t0 + c.tdur + j.wait;
    c.bend = j.quick ? 6 : (Math.random() < 0.5 ? -1 : 1) * clamp(dist * 0.22, 10, 110);
    c.trail = [];
  }
  function goHome(c) {
    if (c.state === 'orbit') return;
    toDoc(c);
    c.state = 'return'; c.job = null;
    c.from = [c.x, c.y]; c.t0 = clock;
    const [hx, hy] = orbitPos(c, clock + 600);
    c.tdur = clamp(Math.hypot(hx + sx() - c.x, hy + sy() - c.y) / 1.4, 280, isMobile() ? 600 : 900);
    c.bend = (Math.random() < 0.5 ? -1 : 1) * clamp(c.tdur * 0.08, 8, 60);
  }
  function liveOffset(j) {
    if (!j.live) return [0, 0];
    const r = j.live.el.getBoundingClientRect();
    return [r.left + sx() - j.live.base.x, r.top + sy() - j.live.base.y];
  }
  const bez = (a, b, bend, t) => {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    const cx = mx - (dy / L) * bend, cy = my + (dx / L) * bend;
    const u = 1 - t;
    return [u * u * a[0] + 2 * u * t * cx + t * t * b[0], u * u * a[1] + 2 * u * t * cy + t * t * b[1]];
  };
  function along(pts, t) {
    if (pts.length === 1) return pts[0];
    let total = 0; const seg = [];
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); total += l; }
    let d = t * total;
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i] || i === seg.length - 1) { const k = seg[i] ? clamp(d / seg[i], 0, 1) : 1; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]; }
      d -= seg[i];
    }
    return pts[pts.length - 1];
  }
  function pulseAt(p, color) { pulses.push({ x: p[0], y: p[1], color, born: clock }); }

  function step(c, dt) {
    const px = c.x;
    if (c.state === 'orbit') {
      const [ox, oy] = orbitPos(c, clock);
      c.x = ox; c.y = oy;
    } else if (c.state === 'travel') {
      const j = c.job, off = liveOffset(j);
      const to = [j.pts[0][0] + off[0], j.pts[0][1] + off[1]];
      const t = clamp((clock - c.t0) / c.tdur, 0, 1);
      if (clock < c.t0) return;
      [c.x, c.y] = bez(c.from, to, c.bend, easeIO(t));
      if (t >= 1 && clock >= c.waitUntil) {
        c.state = 'work'; c.t0 = clock;
        if (j.onStart) try { j.onStart(); } catch (e) { fail(e); }
        if (j.guide) guides.push({ pts: j.pts, color: c.color, prog: 0, born: clock, fadeAt: Infinity, dash: j.guide === 'dash', live: j.live, owner: c });
        c.g = j.guide ? guides[guides.length - 1] : null;
      }
    } else if (c.state === 'work') {
      const j = c.job, off = liveOffset(j);
      const t = clamp((clock - c.t0) / j.dur, 0, 1);
      const p = along(j.pts, easeS(t));
      c.x = p[0] + off[0]; c.y = p[1] + off[1];
      if (j.onFrame) try { j.onFrame(t, c); } catch (e) { fail(e); }
      if (c.g) c.g.prog = easeS(t);
      if (t >= 1) {
        if (c.g) { c.g.fadeAt = clock + (degraded ? 120 : 380); c.g = null; }
        if (j.pulse && !degraded) pulseAt([p[0], p[1]], c.color);
        if (j.onEnd) j.onEnd();
        next(c);
      }
    } else if (c.state === 'return') {
      const t = clamp((clock - c.t0) / c.tdur, 0, 1);
      const [hx, hy] = orbitPos(c, clock);
      const p = bez(c.from, [hx + sx(), hy + sy()], c.bend, easeIO(t));
      c.x = p[0]; c.y = p[1];
      if (t >= 1) { c.state = 'orbit'; c.space = 'view'; c.x = hx; c.y = hy; c.trail = []; setState(); }
    }
    c.vx = c.vx * 0.8 + ((c.x - px) / Math.max(dt, 1)) * 0.2;
    if (!degraded && c.state !== 'orbit') { c.trail.push([c.x, c.y]); if (c.trail.length > 9) c.trail.shift(); }
  }

  // ---------------------------------------------------------------- render loop
  let tick = 0, raf = 0, last = 0, running = false, lastInput = performance.now(), fullClear = true, frameCost = 0, slowFrames = 0;
  let degradedHard = false;
  function frame(now) {
    raf = 0;
    const dt = Math.min(50, now - (last || now));
    last = now;
    clock += dt;
    const busy = cursors.some((c) => c.state !== 'orbit') || guides.length || pulses.length || timers.length;
    // idle: paint at ~30fps and only repaint the formation's box
    if (!busy && !fullClear && (++tick & 1)) { schedule(); return; }
    for (let i = timers.length - 1; i >= 0; i--) if (timers[i].at <= clock) { const t = timers[i]; timers.splice(i, 1); try { t.fn(); } catch (e) { fail(e); } }
    cursors.forEach((c) => step(c, dt));
    home.alpha += (home.targetAlpha - home.alpha) * 0.12;
    draw(busy);
    // adapt on slow devices
    const cost = performance.now() - now;
    frameCost = frameCost * 0.95 + cost * 0.05;
    if (busy && dt > 30) { if (++slowFrames > 45 && !degraded) { degraded = true; } } else slowFrames = Math.max(0, slowFrames - 1);
    if (!busy && now - lastInput > CONFIG.idleStopMs) { running = false; return; }   // freeze the orbit when nobody is around
    schedule();
  }
  function schedule() { if (running && !raf && !document.hidden) raf = requestAnimationFrame(frame); }
  function wake() { lastInput = performance.now(); if (!running) { running = true; last = 0; } schedule(); }

  function draw(busy) {
    const ox = sx(), oy = sy();
    if (busy || fullClear) { ctx.clearRect(0, 0, cw, ch); fullClear = busy; }
    else { const R = (CONFIG.rings.radius[2] + 18) * home.scale; ctx.clearRect(home.x - R - 4, home.y - R - 4, R * 2 + 8, R * 2 + 8); }
    // guides
    for (let i = guides.length - 1; i >= 0; i--) {
      const g = guides[i];
      let a = 1;
      if (clock > g.fadeAt) { a = 1 - (clock - g.fadeAt) / 420; if (a <= 0) { guides.splice(i, 1); continue; } }
      const off = g.live ? liveOffset({ live: g.live }) : [0, 0];
      ctx.save();
      ctx.globalAlpha = (g.plain ? 1 : 0.62) * a * (g.prog > 0 || g.plain ? 1 : 0);
      ctx.strokeStyle = g.color; ctx.lineWidth = 1.25; ctx.lineCap = 'round';
      if (g.dash) ctx.setLineDash([3, 4]);
      ctx.beginPath();
      const p = g.pts;
      let total = 0; for (let k = 1; k < p.length; k++) total += Math.hypot(p[k][0] - p[k - 1][0], p[k][1] - p[k - 1][1]);
      let left = total * g.prog;
      ctx.moveTo(p[0][0] + off[0] - ox, p[0][1] + off[1] - oy);
      for (let k = 1; k < p.length && left > 0; k++) {
        const l = Math.hypot(p[k][0] - p[k - 1][0], p[k][1] - p[k - 1][1]);
        const f = Math.min(1, left / (l || 1));
        ctx.lineTo(p[k - 1][0] + (p[k][0] - p[k - 1][0]) * f + off[0] - ox, p[k - 1][1] + (p[k][1] - p[k - 1][1]) * f + off[1] - oy);
        left -= l;
      }
      ctx.stroke();
      ctx.restore();
    }
    // placement pulses
    for (let i = pulses.length - 1; i >= 0; i--) {
      const q = pulses[i], t = (clock - q.born) / 520;
      if (t >= 1) { pulses.splice(i, 1); continue; }
      ctx.save(); ctx.globalAlpha = 0.55 * (1 - t); ctx.strokeStyle = q.color; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(q.x - ox, q.y - oy, 2 + t * 9, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    }
    // trails and cursors
    for (const c of cursors) {
      const vx = c.space === 'doc' ? c.x - ox : c.x, vy = c.space === 'doc' ? c.y - oy : c.y;
      const homeA = c.state === 'orbit' ? home.alpha : 1;
      if (c.trail.length > 2) {
        ctx.save(); ctx.strokeStyle = c.color; ctx.lineWidth = 1; ctx.lineCap = 'round';
        for (let k = 1; k < c.trail.length; k++) {
          ctx.globalAlpha = (k / c.trail.length) * 0.22;
          ctx.beginPath(); ctx.moveTo(c.trail[k - 1][0] - ox, c.trail[k - 1][1] - oy); ctx.lineTo(c.trail[k][0] - ox, c.trail[k][1] - oy); ctx.stroke();
        }
        ctx.restore();
      }
      if (vx < -20 || vy < -20 || vx > cw + 20 || vy > ch + 20) continue;
      const s = sprite(c.color);
      const lean = clamp(c.vx * 0.12, -0.3, 0.3);
      ctx.save();
      ctx.globalAlpha = homeA;
      ctx.translate(vx, vy);
      ctx.rotate(c.tilt + lean);
      const k = c.size * (c.state === 'orbit' ? home.scale * 0.95 : 1) / s.k;
      ctx.scale(k, k);
      ctx.drawImage(s.img, -1.5 * s.k, -1.5 * s.k);
      ctx.restore();
    }
  }

  // ---------------------------------------------------------------- hero and page intros
  // The page header starts empty (hidden by CSS under html.sw-intro before first paint) and the swarm builds it
  // from scratch: it writes every line of text, draws every button and card, sketches the wireframe and frames the
  // real screen. Return visitors get the same build, faster. If the swarm is late or fails, everything is shown.
  const HERO_TEXT = 'h1, .lead, .build__label, .build__note-text, .build__idea > p:not(.build__note-text), .build__caption, .crumbs, .status, .site-index li';
  const HERO_BOX = '.btn, .build__idea, .build__frame';
  function heroDone() { root.classList.add('sw-hero-done'); after(600, () => root.classList.remove('sw-intro')); }
  async function intro() {
    const hero = document.querySelector('main > .hero, main > .page-hero');
    if (!hero || !root.classList.contains('sw-intro')) { root.classList.remove('sw-intro'); return; }
    root.classList.add('sw-live');                         // cancels the CSS failsafe: the swarm has arrived
    if (performance.now() > 3300 || hero.getBoundingClientRect().bottom < 0) { heroDone(); return; }
    try { if (document.fonts && document.fonts.ready) await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]); } catch (e) { /* ignore */ }
    let quick = false;
    try { quick = !!localStorage.getItem('lx-sw-seen'); localStorage.setItem('lx-sw-seen', '1'); } catch (e) { /* storage blocked */ }
    const u = { section: hero, kind: 'intro', els: new Set(), tempo: quick ? 0.62 : 1, noHide: false, state: 'pending', data: {}, onDone: heroDone };
    const f = 1;                                          // waits below are scaled by tempo through W()
    const Wt = (ms) => ms * u.tempo * timeScale();
    const tracks = [];
    const write = (el, speed, wait, o = {}) => (el ? writeJobs(u, el, speed, { wait: Wt(wait), ...o }) : []);
    const box = (el, wait, order = 'a', o = {}) => {
      if (!el) return [];
      const r = docRect(el);
      const d = Wt(o.d || clamp(380 + (r.w + r.h) * 0.3, 450, 900));
      return [job(rectPts(r, order), d, { wait: Wt(wait), onStart: order === 'a' || order === 'full' ? () => { el.classList.add('sw-c'); u.els.add(el); reveal(el, d, 900); } : null })];
    };
    const isHome = hero.classList.contains('hero');
    if (isHome) {
      const q = (sel) => hero.querySelector(sel);
      const h1 = q('h1'), lead = q('.lead');
      tracks.push(write(h1, 1.15, 0));
      tracks.push(write(lead, 3.1, 650, { guide: null }));
      [...hero.querySelectorAll('.hero__meta .btn')].forEach((b, i) => tracks.push(box(b, 1050 + i * 160, 'full', { d: 520 })));
      // the timeline rule that links the three stages, drawn left to right
      const line = q('.build__line');
      if (line && line.offsetWidth) {
        const r = docRect(line), d = Wt(1500);
        tracks.push([job([[r.x, r.y], [r.x + r.w, r.y]], d, { wait: Wt(520), guide: null, onStart: () => { line.style.setProperty('--sw-d', d + 'ms'); line.classList.add('sw-lgo', 'sw-m'); u.els.add(line); reveal(line, d, 900); } })]);
      }
      tracks.push([...hero.querySelectorAll('.build__label')].flatMap((l, i) => write(l, 1.2, i ? 0 : 640, { guide: null })));
      // The idea: card drawn, then its words written
      const idea = q('.build__idea');
      tracks.push([...box(idea, 720), ...write(q('.build__note-text'), 1.7, 0), ...write(q('.build__idea > p:not(.build__note-text)'), 2.8, 0, { guide: null })]);
      tracks.push(box(idea, 780, 'b'));
      // Designed: frame drawn, phone outlined, wireframe drawn piece by piece
      const wireFrame = q('.build__frame--wire'), wirePhone = q('.build__frame--wire .phone');
      tracks.push([...box(wireFrame, 950), ...(wirePhone ? [job(rectPts(docRect(wirePhone), 'full'), Wt(650), {})] : [])]);
      tracks.push(box(wireFrame, 1010, 'b'));
      const wires = [...hero.querySelectorAll('.wire > i, .wire .w-row i')];
      const groups = isMobile() ? 2 : 4, per = Math.ceil(wires.length / groups);
      for (let g = 0; g < groups; g++) {
        tracks.push(wires.slice(g * per, g * per + per).map((w, i) => {
          const r = docRect(w), d = Wt(clamp(150 + r.w * 0.9, 190, 420));
          return job([[r.x, r.y + r.h / 2], [r.x + r.w, r.y + r.h / 2]], d, { wait: i === 0 ? Wt(1650 + g * 90) : 30, guide: null, pulse: false, onStart: () => { w.style.setProperty('--sw-d', d + 'ms'); w.classList.add('sw-wgo'); } });
        }));
      }
      // Built: frame drawn, then the real screen rises into the phone
      const realFrame = q('.build__frame--real'), phoneEl = q('.build__frame--real .phone');
      const screenJob = phoneEl ? (() => { const r = docRect(phoneEl), d = Wt(900); return [job([[r.x, r.y + r.h], [r.x + r.w, r.y + r.h], [r.x + r.w, r.y + 6]], d, { onStart: () => { phoneEl.classList.add('sw-m', 'sw-m--up'); u.els.add(phoneEl); reveal(phoneEl, d, 700); } })]; })() : [];
      tracks.push([...box(realFrame, 1250), ...screenJob]);
      tracks.push(box(realFrame, 1310, 'b'));
      tracks.push(write(q('.build__caption'), 3.4, 2300, { guide: null }));
    } else {
      tracks.push(write(hero.querySelector('.crumbs'), 2.2, 0, { guide: null }));
      tracks.push(write(hero.querySelector('h1'), 1.25, 120));
      const texts = [...hero.querySelectorAll('.lead, .status, .site-index li')];
      texts.forEach((t, i) => tracks.push(write(t, t.matches('.lead') ? 3.1 : 1.6, 560 + i * 120, { guide: null })));
      [...hero.querySelectorAll('.btn')].forEach((b, i) => tracks.push(box(b, 950 + i * 150, 'full', { d: 520 })));
      [...hero.querySelectorAll('.page-hero__grid img')].forEach((im, i) => {
        const r = docRect(im), d = Wt(700);
        tracks.push([job(rectPts(r, 'a'), d, { wait: Wt(200 + i * 100), onStart: () => { im.classList.add('sw-m'); u.els.add(im); reveal(im, d, 600); } })]);
      });
    }
    u.plan = () => tracks.filter((t) => t.length);
    units.push(u);
    startIntro(u);
  }
  function startIntro(u) {
    let tracks = u.plan();
    u.state = 'building'; active.push(u);
    const free = cursors.filter((c) => c.state === 'orbit' || c.state === 'return');   // the opening uses the whole swarm
    if (!free.length) return finish(u);
    if (tracks.length > free.length) {
      const merged = Array.from({ length: free.length }, () => []);
      tracks.forEach((t, i) => merged[i % free.length].push(...t));
      tracks = merged.filter((t) => t.length);
    }
    u.cursors = [];
    tracks.forEach((t, i) => {
      const c = free[i]; u.cursors.push(c);
      c.queue = t.map((j) => ({ ...j, unit: u })); c.releaseAt = clock + i * (isMobile() ? 30 : 40); next(c);
    });
    setState(); wake();
  }

  // ---------------------------------------------------------------- flagship: process rail
  function processRail() {
    const phases = [...document.querySelectorAll('.phase')];
    if (!phases.length) return;
    const host = phases[0].parentElement;
    host.classList.add('sw-rail');
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = H();
      phases.forEach((p) => {
        const r = p.getBoundingClientRect();
        const prog = clamp((vh * 0.85 - r.top) / (r.height * 0.9), 0, 1);
        p.style.setProperty('--sw-rail', prog.toFixed(3));
      });
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
    cleanup.push(() => { host.classList.remove('sw-rail'); phases.forEach((p) => p.style.removeProperty('--sw-rail')); });
  }

  // ---------------------------------------------------------------- wiring
  const cleanup = [];
  // Section detection: unit tops are cached in document coordinates (measured on start, resize, load and every
  // couple of seconds), so scrolling only compares numbers. IntersectionObserver is not used because Chrome treats
  // a fully clipped target as never intersecting.
  let measuredAt = 0, checkQueued = false;
  function measure() {
    measuredAt = performance.now();
    units.forEach((u) => { if (u.state === 'pending') { const r = (u.anchor || u.section).getBoundingClientRect(); u.top = r.top + sy(); u.visible = r.height > 0 || r.width > 0; } });
  }
  function check() {
    checkQueued = false;
    if (performance.now() - measuredAt > 2000) measure();
    const atEnd = sy() + H() >= document.documentElement.scrollHeight - 4;
    const line = sy() + H() * (atEnd ? 1.05 : 1.0);
    units.filter((u) => u.state === 'pending' && u.visible && u.top < line).sort((a, b) => a.top - b.top).forEach(start);
  }
  const queueCheck = () => { if (!checkQueued) { checkQueued = true; requestAnimationFrame(check); } };
  function onScroll() {
    const now = performance.now(), y = sy();
    const v = (y - lastScrollY) / Math.max(1, now - lastScrollT);
    velocity = velocity * 0.6 + v * 0.4;
    lastScrollY = y; lastScrollT = now;
    // the footer's last line sits under the formation at the very bottom: step back there
    atBottom = y + H() >= document.documentElement.scrollHeight - 90;
    if (state !== 'paused') home.targetAlpha = atBottom ? 0.25 : IDLE_ALPHA;
    queueCheck();
    wake();
  }
  function onPointer(e) {
    lastInput = performance.now();
    const d = Math.hypot(e.clientX - home.x, e.clientY - home.y);
    const near = d < 120 * home.scale + 40;
    const want = state === 'paused' ? 0.3 : near ? 0.15 : atBottom ? 0.25 : IDLE_ALPHA;
    if (want !== home.targetAlpha) home.targetAlpha = want;
    if (!running || want !== home.alpha) wake();
  }
  let formTimer = 0;
  function onFocusIn(e) {
    const t = e.target;
    // keyboard users always see what they focus: finish any unit that contains it
    units.forEach((u) => { if (u.state !== 'done' && within(u, t)) finish(u); });
    if (t.closest && t.closest('form, [data-stepper]')) {
      clearTimeout(formTimer);
      if (state !== 'paused') { active.slice().forEach(finish); cursors.forEach(goHome); state = 'paused'; root.dataset.swarmState = state; home.targetAlpha = 0.3; wake(); }
    }
  }
  function onFocusOut() {
    clearTimeout(formTimer);
    formTimer = setTimeout(() => {
      const a = document.activeElement;
      if (state === 'paused' && !(a && a.closest && a.closest('form, [data-stepper]'))) { state = 'idle'; setState(); home.targetAlpha = atBottom ? 0.25 : IDLE_ALPHA; wake(); }
    }, 1200);
  }
  function onVisibility() { if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = 0; } else { last = 0; wake(); } }
  function onMenu() {
    const open = root.classList.contains('menu-open');
    canvas.style.visibility = open ? 'hidden' : '';
  }
  let resizeT = 0;
  function onResize() { clearTimeout(resizeT); resizeT = setTimeout(() => { resize(); measure(); queueCheck(); wake(); }, 120); }

  function fail(e) {
    // Never leave content hidden: if anything goes wrong, show everything and stand down.
    try { finishAll(); } catch (x) { /* ignore */ }
    root.classList.remove('sw-on', 'sw-intro');
    if (window.console) console.warn('[Lynexa swarm] disabled:', e && e.message);
    destroy();
  }

  function init() {
    measureSafe();
    resize();
    makeCursors();
    cursors.forEach((c) => { const [x, y] = orbitPos(c, 0); c.x = x; c.y = y; c.space = 'view'; });
    root.classList.add('sw-on');

    if (mode !== 'none') {
      // Units below the fold are hidden now and built when they scroll in. Anything already on screen is left alone.
      document.querySelectorAll('main > section, main > .cta-band').forEach(collect);
      const fold = H() * 0.98;
      units.forEach((u) => {
        const el = u.anchor || u.section;
        const top = el.getBoundingClientRect().top;
        if (top > fold && el.getBoundingClientRect().height > 0) {
          // owned media no longer needs the generic fade-in
          scope(u).forEach((el) => { if (!el) return; if (el.matches('[data-reveal]')) el.removeAttribute('data-reveal'); el.querySelectorAll('[data-reveal]').forEach((m) => m.removeAttribute('data-reveal')); });
          prime(u);
        } else u.state = 'done';
      });
      measure();
      check();
      // cta band closes the page: let the builders gather around the primary action
      processRail();
      intro();
    } else root.classList.remove('sw-intro');

    const on = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); cleanup.push(() => t.removeEventListener(ev, fn, o)); };
    on(window, 'scroll', onScroll, { passive: true });
    on(window, 'resize', onResize);
    on(document, 'pointermove', onPointer, { passive: true });
    on(document, 'keydown', () => wake());
    on(document, 'focusin', onFocusIn);
    on(document, 'focusout', onFocusOut);
    on(document, 'visibilitychange', onVisibility);
    on(window, 'beforeprint', finishAll);
    on(window, 'load', () => { measure(); queueCheck(); });
    on(window, 'hashchange', finishAll);
    on(window, 'pagehide', () => { if (raf) cancelAnimationFrame(raf); raf = 0; running = false; });
    on(window, 'pageshow', (e) => { if (e.persisted) { finishAll(); wake(); } });
    on(document, 'click', (e) => { if (e.target.closest && e.target.closest('[data-cat], a[href^="#"]')) finishAll(); }, true);
    const mo = new MutationObserver(onMenu);
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    cleanup.push(() => mo.disconnect());
    running = true;
    wake();
  }

  function destroy() {
    try { finishAll(); } catch (e) { /* ignore */ }
    if (raf) cancelAnimationFrame(raf);
    running = false;
    cleanup.splice(0).forEach((f) => f());
    canvas.remove();
    root.classList.remove('sw-on', 'sw-intro');
    delete root.dataset.swarmState;
    window.LynexaSwarm = null;
  }

  window.LynexaSwarm = { destroy, finishAll, config: CONFIG, debug: () => units.map((u) => ({ kind: u.kind, state: u.state, anchor: (u.anchor || u.section).tagName + '.' + (u.anchor || u.section).className })), get state() { return state; }, get cursors() { return cursors.length; } };
  try { init(); } catch (e) { fail(e); }
})();
