(() => {
  'use strict';

  if (!window.gsap || !window.ScrollTrigger) return;

  const doc = document;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  let refreshFrame = 0;
  doc.addEventListener('contentvisibilityautostatechange', (event) => {
    if (event.skipped || refreshFrame) return;
    refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      refreshFrame = 0;
    });
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = entry.target.hasAttribute('data-stagger') ? Number(entry.target.dataset.staggerIndex || 0) * .08 : 0;
      gsap.fromTo(entry.target, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: .8, delay, ease: 'power3.out', clearProps: 'transform,opacity' });
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .05 });

  doc.querySelectorAll('[data-reveal], [data-stagger]').forEach((element, index) => {
    if (element.hasAttribute('data-stagger')) element.dataset.staggerIndex = String(index % 4);
    revealObserver.observe(element);
  });

  gsap.utils.toArray('[data-project]').forEach((card) => {
    const image = card.querySelector('.project-card__visual > img:first-child');
    if (!image) return;
    gsap.fromTo(image, { yPercent: -4, scale: 1.05 }, {
      yPercent: 4,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: .6 }
    });
  });

  const methodRail = doc.querySelector('.method-rail__progress');
  if (methodRail) {
    gsap.to(methodRail, {
      height: '100%',
      ease: 'none',
      scrollTrigger: { trigger: '.method-phases', start: 'top center', end: 'bottom center', scrub: true }
    });
  }

  const railDots = [...doc.querySelectorAll('.method-rail span')];
  doc.querySelectorAll('[data-phase]').forEach((phase, index) => {
    ScrollTrigger.create({
      trigger: phase,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => railDots[index]?.classList.toggle('is-active', self.isActive)
    });
  });

  const zenglySteps = [...doc.querySelectorAll('[data-zengly-step]')];
  const zenglyDevices = [...doc.querySelectorAll('[data-device]')];
  zenglySteps.forEach((step, index) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 55%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (!self.isActive) return;
        zenglySteps.forEach((item) => item.classList.remove('is-active'));
        step.classList.add('is-active');
        gsap.to(zenglyDevices, { y: (deviceIndex) => (deviceIndex === index ? -18 : 5), duration: .7, ease: 'power3.out' });
      }
    });
  });

  if (doc.querySelector('.zengly-story')) {
    gsap.matchMedia().add('(min-width: 1024px)', () => {
      gsap.from('.device--left', { xPercent: 34, rotate: -2, scale: .7, opacity: .25, ease: 'none', scrollTrigger: { trigger: '.zengly-story', start: 'top 80%', end: 'top 20%', scrub: .7 } });
      gsap.from('.device--right', { xPercent: -34, rotate: 2, scale: .7, opacity: .25, ease: 'none', scrollTrigger: { trigger: '.zengly-story', start: 'top 80%', end: 'top 20%', scrub: .7 } });
      gsap.from('.device--center', { y: 110, scale: .86, opacity: .4, ease: 'none', scrollTrigger: { trigger: '.zengly-story', start: 'top 88%', end: 'top 25%', scrub: .7 } });
    });
  }

  const parallaxImage = doc.querySelector('.image-parallax img');
  if (parallaxImage) {
    gsap.to(parallaxImage, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: parallaxImage.parentElement, start: 'top bottom', end: 'bottom top', scrub: .8 } });
  }

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.counter || 0);
      const value = { current: 0 };
      gsap.to(value, { current: target, duration: 1.2, ease: 'power2.out', onUpdate: () => { counter.textContent = String(Math.round(value.current)); } });
      observer.unobserve(counter);
    });
  }, { threshold: .2 });
  doc.querySelectorAll('[data-counter]').forEach((counter) => counterObserver.observe(counter));

})();
