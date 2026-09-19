/* Pierre Thalamy - site behaviour. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');

  /* Theme toggle: explicit choice stored, otherwise follow the system. */
  var STORAGE_KEY = 'theme';
  function storedTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function currentTheme() {
    return root.getAttribute('data-theme') || storedTheme() || systemTheme();
  }
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#101214' : '#fbfaf8');
  }
  var stored = storedTheme();
  if (stored === 'dark' || stored === 'light') applyTheme(stored);

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* private mode, ignore */ }
    });
  });

  /* Header border once the page is scrolled. */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Reveal-on-scroll, disabled for reduced motion. */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* YouTube facade: load the player only when asked, at the requested timestamp. */
  function loadVideo(container, start) {
    var id = container.getAttribute('data-video');
    if (!id) return;
    var src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    if (start) src += '&start=' + start;
    var frame = document.createElement('iframe');
    frame.src = src;
    frame.title = container.getAttribute('data-title') || 'Video';
    frame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    frame.setAttribute('allowfullscreen', '');
    frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    container.innerHTML = '';
    container.appendChild(frame);
  }
  document.querySelectorAll('.video[data-video]').forEach(function (container) {
    var facade = container.querySelector('.video-facade');
    if (facade) facade.addEventListener('click', function () { loadVideo(container, 0); });
    var chapters = document.querySelector('[data-chapters-for="' + container.id + '"]');
    if (chapters) {
      chapters.addEventListener('click', function (ev) {
        var link = ev.target.closest('a[data-start]');
        if (!link) return;
        ev.preventDefault();
        loadVideo(container, parseInt(link.getAttribute('data-start'), 10) || 0);
        container.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      });
    }
  });

  /* Copy BibTeX buttons. */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-copy'));
      if (!target || !navigator.clipboard) return;
      navigator.clipboard.writeText(target.textContent.trim()).then(function () {
        var label = btn.querySelector('span') || btn;
        var old = label.textContent;
        label.textContent = btn.getAttribute('data-copied') || 'Copied';
        setTimeout(function () { label.textContent = old; }, 1600);
      });
    });
  });

  /* Print button on the CV page. */
  document.querySelectorAll('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function () { window.print(); });
  });

  /* Footer year. */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
