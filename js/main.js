(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader ---------- */
  const loader = $('#loader');
  const finishLoad = () => {
    loader.classList.add('is-done');
    // trigger hero reveals once loader is gone
    $$('.hero .reveal').forEach(el => el.classList.add('is-in'));
  };
  if (document.readyState === 'complete') setTimeout(finishLoad, 200);
  else window.addEventListener('load', () => setTimeout(finishLoad, 300));
  setTimeout(finishLoad, 2500); // safety net

  /* ---------- Nav ---------- */
  const nav = $('#nav');
  const navLinks = $('#navLinks');
  const navToggle = $('#navToggle');
  const fab = $('.fab');

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    fab.classList.toggle('is-visible', y > window.innerHeight * 0.6);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('a', navLinks).forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$('.reveal:not(.hero .reveal)');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Counters ---------- */
  const counters = $$('[data-count]');
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const dur = 1400; const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(ease(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  } else counters.forEach(runCounter);

  /* ---------- Hero parallax (mouse) ---------- */
  const beams = $$('.beam');
  const heroBeams = $('#heroBeams');
  if (heroBeams && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    let raf = null;
    window.addEventListener('mousemove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        beams.forEach((b, i) => {
          const depth = (i + 1) * 8;
          b.style.translate = `${x * depth}px ${y * depth}px`;
        });
        raf = null;
      });
    }, { passive: true });
  }

  /* ---------- Card spotlight ---------- */
  $$('.card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });

  /* ---------- Form success ---------- */
  if (new URLSearchParams(location.search).get('submitted') === 'true') {
    const ok = $('#quoteSuccess');
    if (ok) { ok.hidden = false; ok.scrollIntoView({ block: 'center' }); }
    history.replaceState(null, '', location.pathname + '#contact');
  }

  /* ---------- Year ---------- */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
