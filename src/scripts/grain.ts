/**
 * Hero motion graphic: animated wood-grain lines. The pointer becomes a knot
 * in the timber — lines flow around it, just like grain around a real knot.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll<HTMLCanvasElement>('canvas[data-grain]').forEach((canvas) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const host = canvas.parentElement!;
  let w = 0, h = 0;
  let lines: Array<{ y: number; ph: number; a: number; hi: boolean }> = [];
  let t = Math.random() * 10;
  let running = false;
  let raf = 0;
  const m = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: false, k: 0 };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    const gap = w < 700 ? 28 : 22;
    const n = Math.ceil(h / gap) + 4;
    lines = Array.from({ length: n }, (_, i) => ({ y: (i - 2) * gap, ph: i * 0.27, a: 11 + 6 * Math.sin(i * 0.8), hi: i % 7 === 3 }));
    if (!running) draw();
  }

  function draw() {
    ctx!.clearRect(0, 0, w, h);
    m.x += (m.tx - m.x) * 0.09;
    m.y += (m.ty - m.y) * 0.09;
    m.k += ((m.on ? 1 : 0) - m.k) * 0.06;
    const R = Math.min(240, Math.max(140, w * 0.2));
    const step = w < 700 ? 16 : 11;
    for (const L of lines) {
      ctx!.beginPath();
      for (let x = -20; x <= w + 20; x += step) {
        const k = x / 560;
        let y = L.y + L.a * Math.sin(k * Math.PI * 2 + L.ph + t * 0.22) + L.a * 0.25 * Math.sin(k * Math.PI * 4.4 + L.ph * 1.6 - t * 0.16);
        if (m.k > 0.01) {
          const dx = (x - m.x) / 1.7;
          const dy = y - m.y;
          const d = Math.hypot(dx, dy);
          if (d < R) {
            const f = 1 - d / R;
            y += Math.sign(dy || 1) * f * f * R * 0.34 * m.k;
          }
        }
        if (x === -20) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = L.hi ? 'rgba(201,146,90,0.42)' : 'rgba(201,146,90,0.16)';
      ctx!.lineWidth = L.hi ? 1.3 : 1;
      ctx!.stroke();
    }
    if (m.k > 0.02) {
      for (let r = 1; r <= 3; r++) {
        ctx!.beginPath();
        ctx!.ellipse(m.x, m.y, r * 17, r * 7.5, 0, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(201,146,90,${(0.34 - r * 0.08) * m.k})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    }
    t += 0.016;
    if (running) raf = requestAnimationFrame(draw);
  }

  function start() {
    if (running || reduce) return;
    running = true;
    raf = requestAnimationFrame(draw);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  host.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    m.tx = e.clientX - r.left;
    m.ty = e.clientY - r.top;
    if (!m.on) {
      m.x = m.tx;
      m.y = m.ty;
    }
    m.on = true;
  }, { passive: true });
  host.addEventListener('pointerleave', () => (m.on = false));
  resize();
});
