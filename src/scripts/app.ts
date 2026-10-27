import { initTracking } from './track.ts';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(pointer: fine)').matches;

/* ---------- reveal on scroll (opacity/translate, word masks, line drawing) */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal], [data-words], .draw');
  const done = (el: Element) => el.classList.add(el.classList.contains('draw') ? 'is-drawn' : 'is-in');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(done);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        done(e.target);
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -7% 0px', threshold: 0 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- scroll-scrubbed drawing for the process section */
function initProcess() {
  const sec = document.querySelector<HTMLElement>('[data-process]');
  if (!sec) return;
  const ill = sec.querySelector<SVGElement>('.process-ill');
  const shapes = ill ? Array.from(ill.querySelectorAll<SVGElement>('[pathLength]')) : [];
  const steps = Array.from(sec.querySelectorAll<HTMLElement>('.step'));
  const bar = sec.querySelector<HTMLElement>('.progress-line');
  if (reduce) {
    steps.forEach((s) => s.classList.add('is-active'));
    return;
  }
  shapes.forEach((s) => (s.style.strokeDasharray = '1'));
  let raf = 0;
  const update = () => {
    raf = 0;
    const r = sec.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height - vh * 0.25)));
    const n = shapes.length;
    shapes.forEach((s, i) => {
      const local = Math.min(1, Math.max(0, p * 1.25 * n - i) / 6);
      s.style.strokeDashoffset = String(1 - local);
    });
    const active = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999));
    steps.forEach((s, i) => s.classList.toggle('is-active', i <= active));
    bar?.style.setProperty('--p', p.toFixed(3));
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

/* ---------- magnetic buttons */
function initMagnetic() {
  if (!fine || reduce) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
}

/* ---------- parallax + marquee speed from scroll velocity */
function initScrollFx() {
  if (reduce) return;
  const par = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const marquees = Array.from(document.querySelectorAll<HTMLElement>('.marquee-track'));
  let lastY = window.scrollY;
  let vel = 0;
  let raf = 0;
  const loop = () => {
    const y = window.scrollY;
    vel += (y - lastY - vel) * 0.2;
    lastY = y;
    for (const el of par) {
      const k = parseFloat(el.dataset.parallax || '0.1');
      el.style.transform = `translate3d(0, ${(y * k).toFixed(1)}px, 0)`;
    }
    for (const m of marquees) {
      const anim = m.getAnimations()[0];
      if (anim) anim.playbackRate = 1 + Math.min(5, Math.abs(vel) * 0.12);
    }
    raf = Math.abs(vel) > 0.05 ? requestAnimationFrame(loop) : 0;
  };
  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
}

/* ---------- custom cursor (desktop) */
function initCursor() {
  if (!fine || reduce) return;
  const c = document.createElement('div');
  c.className = 'cursor';
  c.setAttribute('aria-hidden', 'true');
  document.body.appendChild(c);
  let x = -100, y = -100, tx = -100, ty = -100;
  let raf = 0;
  const loop = () => {
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;
    c.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
  };
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX;
    ty = e.clientY;
    c.classList.add('is-on');
    const t = e.target as Element;
    c.classList.toggle('is-link', !!t.closest('a, button, summary, [role=tab], label'));
    c.style.opacity = t.closest('input, textarea, select, .finder-list') ? '0' : '';
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  document.addEventListener('pointerleave', () => c.classList.remove('is-on'));
}

/* ---------- smooth scrolling (desktop only) */
async function initLenis() {
  if (!fine || reduce) return;
  const { default: Lenis } = await import('lenis');
  const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -90 } as any, prevent: (node: Element) => !!node.closest?.('.finder-list, dialog, .mobile-menu') });
  window.__lenis = lenis as any;
  const raf = (t: number) => {
    lenis.raf(t);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/* ---------- WhatsApp bubble */
function initWaBubble() {
  const bubble = document.getElementById('wa-bubble');
  if (!bubble) return;
  let seen = false;
  try {
    seen = sessionStorage.getItem('td-wa-bubble') === '1';
  } catch {}
  if (seen) return;
  const hide = () => {
    bubble.classList.remove('is-shown');
    try {
      sessionStorage.setItem('td-wa-bubble', '1');
    } catch {}
  };
  window.setTimeout(() => {
    bubble.classList.add('is-shown');
    window.setTimeout(hide, 12000);
  }, 6000);
  bubble.querySelector('[data-wa-dismiss]')?.addEventListener('click', hide);
}

initReveal();
initProcess();
initMagnetic();
initScrollFx();
initCursor();
initWaBubble();
initTracking();
initLenis();
window.__tdReady = true;
