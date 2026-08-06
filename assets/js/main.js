/* CardAlive — single-screen landing (vanilla, no deps) */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* The waitlist CTA is a plain link to a Google Form now — no reveal, no submit
     handler, no form backend. This file is just the particle backdrop. */

  /* subtle particle field */
  var canvas = document.getElementById('particles');
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var parts = [], W = 0, H = 0;

    function resize() {
      W = canvas.width = Math.floor(window.innerWidth * dpr);
      H = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      var n = Math.min(60, Math.floor(window.innerWidth / 26));
      parts = [];
      for (var i = 0; i < n; i++) {
        parts.push({
          x: Math.random() * W, y: Math.random() * H,
          r: (Math.random() * 1.5 + 0.4) * dpr,
          vy: (Math.random() * 0.22 + 0.04) * dpr,
          vx: (Math.random() - 0.5) * 0.1 * dpr,
          a: Math.random() * 0.5 + 0.12,
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
        ctx.fillStyle = p.gold ? 'rgba(232,195,122,' + p.a + ')' : 'rgba(55,224,255,' + p.a + ')';
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(tick);
  }
})();
