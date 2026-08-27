/* Kavo Private Limited — site behaviour.
   Three jobs: the mobile nav, scroll reveals, and the depth gauge. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------- mobile nav */
  var toggle = document.querySelector('.navtoggle');
  var nav = document.getElementById('sitenav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------- header hairline on scroll */
  var hdr = document.querySelector('.hdr');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------- scroll reveals */
  var risers = document.querySelectorAll('.rise, .step');

  if (!('IntersectionObserver' in window) || reduced) {
    risers.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    risers.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------------------------------------------------------- depth gauge
     Each capability band declares the depth it works at. As a band comes into
     view the gauge marker travels to that depth and the matching tick lights.
     Gauge positions are read from data-pos (0 = surface end of the ramp). */
  var gauge = document.querySelector('.gauge');

  if (gauge && 'IntersectionObserver' in window) {
    var dot = gauge.querySelector('.gauge__dot');
    var ticks = Array.prototype.slice.call(gauge.querySelectorAll('.gauge__tick'));
    var bands = Array.prototype.slice.call(document.querySelectorAll('.dband'));

    var setDepth = function (band) {
      var pos = band.getAttribute('data-pos') || '0';
      var key = band.getAttribute('data-tick');

      if (dot) dot.style.top = pos + '%';
      bands.forEach(function (b) { b.classList.toggle('is-on', b === band); });
      ticks.forEach(function (t) { t.classList.toggle('is-on', t.getAttribute('data-tick') === key); });
    };

    if (bands.length) {
      setDepth(bands[0]);

      var tracker = new IntersectionObserver(function (entries) {
        // Pick the entry closest to the top third of the viewport.
        var best = null;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        });
        if (best) setDepth(best.target);
      }, { rootMargin: '-24% 0px -46% 0px', threshold: [0.1, 0.5, 0.9] });

      bands.forEach(function (b) { tracker.observe(b); });
    }
  }

  /* ---------------------------------------------------------- contact form
     No backend is wired up. Hand the enquiry to the visitor's mail client so
     nothing is silently dropped, and say plainly what happened. */
  var form = document.querySelector('form[data-mailto]');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var lines = [];
      form.querySelectorAll('input[name], select[name], textarea[name]').forEach(function (el) {
        var label = form.querySelector('label[for="' + el.id + '"]');
        lines.push((label ? label.textContent.trim() : el.name) + ': ' + (data.get(el.name) || '—'));
      });

      var subject = 'Enquiry from kavo.mv — ' + (data.get('company') || data.get('name') || 'website');
      var href = 'mailto:' + form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = href;

      var status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'Your email app should now be open with this enquiry ready to send. ' +
          'If nothing opened, write to info@kavo.mv directly.';
      }
    });
  }
})();
