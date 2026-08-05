/* CardAlive landing — interactions (vanilla, no deps) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- nav: solid on scroll ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- pointer tilt on [data-tilt] ---------- */
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      el.addEventListener('mousemove', function (ev) {
        var r = el.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width - 0.5;
        var py = (ev.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'rotateY(' + (px * 10) + 'deg) rotateX(' + (-py * 10) + 'deg) translateZ(6px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- waitlist submit (Web3Forms) ---------- */
  var form = document.getElementById('waitlist-form');
  var msg = document.getElementById('wl-msg');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setMsg(text, kind) {
    if (!msg) return;
    msg.textContent = text;
    msg.className = 'wl-form__msg' + (kind ? ' is-' + kind : '');
  }

  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var email = (form.email.value || '').trim();
      if (!emailRe.test(email)) {
        setMsg('Enter a valid email address.', 'error');
        form.email.focus();
        return;
      }

      var key = form.access_key.value;
      var btn = form.querySelector('button[type="submit"]');
      var label = form.querySelector('.wl-form__btn-label');
      var oldLabel = label ? label.textContent : '';

      // Not yet configured: guide instead of silently failing.
      if (!key || key === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        setMsg('Waitlist not wired yet — add your Web3Forms access key. (' + email + ')', 'error');
        return;
      }

      if (btn) btn.disabled = true;
      if (label) label.textContent = 'Joining…';
      setMsg('', '');

      var data = new FormData(form);
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json && json.success) {
            form.reset();
            setMsg('You’re on the list. Welcome to CardAlive. ◆', 'ok');
            if (label) label.textContent = 'Joined ✓';
          } else {
            setMsg((json && json.message) || 'Something went wrong. Try again.', 'error');
            if (btn) btn.disabled = false;
            if (label) label.textContent = oldLabel;
          }
        })
        .catch(function () {
          setMsg('Network error. Check your connection and try again.', 'error');
          if (btn) btn.disabled = false;
          if (label) label.textContent = oldLabel;
        });
    });
  }

  /* ---------- lightweight particle field ---------- */
  var canvas = document.getElementById('particles');
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var parts = [];
    var W = 0, H = 0;

    function resize() {
      W = canvas.width = Math.floor(window.innerWidth * dpr);
      H = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      var target = Math.min(70, Math.floor(window.innerWidth / 22));
      parts = [];
      for (var i = 0; i < target; i++) {
        parts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: (Math.random() * 1.6 + 0.4) * dpr,
          vy: (Math.random() * 0.25 + 0.05) * dpr,
          vx: (Math.random() - 0.5) * 0.12 * dpr,
          a: Math.random() * 0.5 + 0.15,
          gold: Math.random() < 0.25
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy; p.x += p.vx;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? 'rgba(232,195,122,' + p.a + ')'
          : 'rgba(55,224,255,' + p.a + ')';
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(tick);
  }
})();
