(() => {
  'use strict';

  const doc = document;
  const body = doc.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateLagosTime = () => {
    const clock = doc.getElementById('lagos-clock');
    const footerClock = doc.getElementById('footer-clock');
    const time = new Intl.DateTimeFormat('en-NG', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date());
    if (clock) clock.textContent = `GMT+1 / LAGOS / ${time}`;
    if (footerClock) footerClock.textContent = `GMT+1 / ${time}`;
  };

  updateLagosTime();
  window.setInterval(updateLagosTime, 1000);

  const header = doc.querySelector('[data-header]');
  let headerTicking = false;
  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
    headerTicking = false;
  };
  updateHeader();
  window.addEventListener('scroll', () => {
    if (!headerTicking) {
      window.requestAnimationFrame(updateHeader);
      headerTicking = true;
    }
  }, { passive: true });

  const menuButton = doc.querySelector('.menu-button');
  const mobileMenu = doc.getElementById('mobile-menu');
  const setMenu = (open) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenu.classList.toggle('is-open', open);
    body.classList.toggle('menu-open', open);
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  doc.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  let activeScrollFrame = 0;
  const cancelActiveScroll = () => {
    if (!activeScrollFrame) return;
    window.cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = 0;
  };
  ['wheel', 'touchstart', 'pointerdown'].forEach((type) => {
    window.addEventListener(type, cancelActiveScroll, { passive: true });
  });
  window.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancelActiveScroll();
  });

  const easeInOutCubic = (progress) => progress < .5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

  const scrollToTarget = (target) => {
    cancelActiveScroll();
    const headerOffset = (header?.offsetHeight || 0) + 24;
    const start = window.scrollY;
    const destination = Math.max(0, start + target.getBoundingClientRect().top - headerOffset);
    const distance = destination - start;
    if (reduceMotion || Math.abs(distance) < 2) {
      window.scrollTo(0, destination);
      return;
    }
    const duration = Math.min(1400, Math.max(850, Math.abs(distance) * .12));
    const startedAt = window.performance.now();
    const animateScroll = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      window.scrollTo(0, start + distance * easeInOutCubic(progress));
      if (progress < 1) activeScrollFrame = window.requestAnimationFrame(animateScroll);
      else activeScrollFrame = 0;
    };
    activeScrollFrame = window.requestAnimationFrame(animateScroll);
  };

  doc.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = doc.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      const hash = link.getAttribute('href');
      if (window.location.hash !== hash) window.history.pushState(null, '', hash);
      scrollToTarget(target);
    });
  });

  if (window.location.hash) {
    const positionHashOnLoad = () => {
      const target = doc.querySelector(window.location.hash);
      if (!target) return;
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
      });
    };
    if (doc.readyState === 'complete') positionHashOnLoad();
    else window.addEventListener('load', positionHashOnLoad, { once: true });
  }

  doc.querySelectorAll('a[href*=".html"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reduceMotion) return;
      event.preventDefault();
      body.classList.add('is-page-leaving');
      window.setTimeout(() => { window.location.href = link.href; }, 380);
    });
  });
  window.addEventListener('pageshow', () => body.classList.remove('is-page-leaving'));

  doc.querySelectorAll('[data-choice-group]').forEach((group) => {
    const multiple = group.hasAttribute('data-multiple');
    const buttons = [...group.querySelectorAll('button')];
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const willSelect = button.getAttribute('aria-pressed') !== 'true';
        if (!multiple) buttons.forEach((item) => item.setAttribute('aria-pressed', 'false'));
        button.setAttribute('aria-pressed', String(willSelect));
      });
    });
  });

  const plannerButtons = [...doc.querySelectorAll('.planner-module')];
  const plannerDuration = doc.getElementById('est-duration');
  const plannerCompression = doc.getElementById('est-compression');
  const plannerSequential = doc.getElementById('seq-weeks');
  const plannerBar = doc.getElementById('planner-bar-fill');
  const updatePlanner = () => {
    const active = plannerButtons.filter((button) => button.classList.contains('is-active'));
    const values = active.map((button) => Number(button.dataset.weeks || 0));
    const sequential = values.reduce((sum, value) => sum + value, 0);
    const largest = values.length ? Math.max(...values) : 0;
    const parallel = sequential ? Math.round((largest + .25 * (sequential - largest) + .5) * 10) / 10 : 0;
    const compression = sequential ? Math.max(0, Math.round(((sequential - parallel) / sequential) * 100)) : 0;
    if (plannerDuration) plannerDuration.textContent = String(parallel);
    if (plannerCompression) plannerCompression.textContent = `${compression}%`;
    if (plannerSequential) plannerSequential.textContent = String(sequential);
    if (plannerBar) plannerBar.style.width = sequential ? `${Math.min(100, (parallel / sequential) * 100)}%` : '0%';
  };
  plannerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('is-active');
      button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
      updatePlanner();
    });
  });
  updatePlanner();

  const contactForm = doc.getElementById('contact-form');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const formData = new FormData(contactForm);
    const selectedGroups = [...contactForm.querySelectorAll('[data-choice-group]')].map((group) =>
      [...group.querySelectorAll('[aria-pressed="true"]')].map((button) => button.textContent.trim()).join(', ')
    );
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const launch = String(formData.get('launch_time') || '').trim();
    const subject = encodeURIComponent(`Project enquiry from ${name}${company ? ` — ${company}` : ''}`);
    const bodyCopy = encodeURIComponent([
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'Not provided'}`,
      `Project type: ${selectedGroups[0] || 'Not selected'}`,
      `Budget: ${selectedGroups[1] || 'Not selected'}`,
      `Launch target: ${launch || 'Not provided'}`,
      '',
      message
    ].join('\n'));
    const status = doc.getElementById('form-status');
    if (status) status.textContent = 'Opening your email client…';
    window.location.href = `mailto:hello@lynexa.co?subject=${subject}&body=${bodyCopy}`;
  });

  doc.querySelectorAll('.faq details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      doc.querySelectorAll('.faq details[open]').forEach((other) => {
        if (other !== detail) other.open = false;
      });
    });
  });

  const setupPointerDetails = () => {
    if (!window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches || reduceMotion) return;
    const cursor = doc.querySelector('.cursor');
    if (!cursor) return;
    let cursorFrame = 0;
    window.addEventListener('pointermove', (event) => {
      if (cursorFrame) return;
      cursorFrame = window.requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
        cursorFrame = 0;
      });
    }, { passive: true });
    doc.querySelectorAll('a, button, summary, input, textarea').forEach((item) => {
      item.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      item.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
    doc.querySelectorAll('[data-magnetic]').forEach((item) => {
      item.addEventListener('pointermove', (event) => {
        const bounds = item.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * .18;
        const y = (event.clientY - bounds.top - bounds.height / 2) * .18;
        item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      item.addEventListener('pointerleave', () => {
        item.style.transform = '';
      });
    });
  };
  setupPointerDetails();

  doc.querySelectorAll('.zengly-copy article').forEach((item, index) => item.classList.toggle('is-active', index === 0));

  const zenglySection = doc.getElementById('zengly');
  if (zenglySection) {
    const warmZenglyMedia = () => {
      zenglySection.querySelectorAll('img[loading="lazy"]').forEach((image) => {
        image.loading = 'eager';
        if (!image.decode) return;
        if (image.complete) image.decode().catch(() => {});
        else image.addEventListener('load', () => image.decode().catch(() => {}), { once: true });
      });
    };
    if ('IntersectionObserver' in window) {
      const mediaObserver = new IntersectionObserver((entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        warmZenglyMedia();
        observer.disconnect();
      }, { rootMargin: '2600px 0px', threshold: 0 });
      mediaObserver.observe(zenglySection);
    } else warmZenglyMedia();
  }

  if (!reduceMotion) {
    let motionRequested = false;
    const loadMotion = () => {
      if (motionRequested) return;
      motionRequested = true;
      const gsapScript = doc.createElement('script');
      gsapScript.src = 'assets/vendor/gsap.min.js';
      gsapScript.onload = () => {
        const triggerScript = doc.createElement('script');
        triggerScript.src = 'assets/vendor/ScrollTrigger.min.js';
        triggerScript.onload = () => {
          const motionScript = doc.createElement('script');
          motionScript.src = 'motion.js?v=34';
          doc.body.appendChild(motionScript);
        };
        doc.body.appendChild(triggerScript);
      };
      doc.body.appendChild(gsapScript);
    };
    const scheduleMotion = () => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(loadMotion, { timeout: 800 });
      else window.setTimeout(loadMotion, 120);
    };
    if (doc.readyState === 'complete') scheduleMotion();
    else window.addEventListener('load', scheduleMotion, { once: true });
  }
})();
