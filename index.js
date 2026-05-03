// Mark body so fade-up animations only apply when JS is confirmed running
document.body.classList.add('js-ready');

// ── Scroll shadow on navbar ───────────────────────────────────
window.addEventListener('scroll', function () {
  var nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile hamburger toggle ───────────────────────────────────
var toggle = document.getElementById('navToggle');
var links  = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
  });
  links.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () { links.classList.remove('open'); });
  });
}

// ── Scroll-triggered fade-up animations ──────────────────────
function initFadeUp() {
  var els = document.querySelectorAll('.fade-up:not(.visible)');
  if (!els.length) return;

  // Fallback: show everything if IntersectionObserver not supported
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () { entry.target.classList.add('visible'); }, i * 70);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { obs.observe(el); });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFadeUp);
} else {
  initFadeUp();
}
