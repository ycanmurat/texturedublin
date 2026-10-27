const header = document.getElementById('site-header');
const burger = document.querySelector<HTMLButtonElement>('.burger');
const menu = document.getElementById('mobile-menu');
let lastY = window.scrollY;
let ticking = false;
let open = false;

function onScroll() {
  ticking = false;
  if (!header) return;
  const y = window.scrollY;
  header.classList.toggle('is-solid', y > 24);
  if (!open) {
    if (y > 360 && y > lastY + 6) header.classList.add('is-hidden');
    else if (y < lastY - 6 || y < 360) header.classList.remove('is-hidden');
  }
  lastY = y;
}
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true },
);
onScroll();

function setMenu(state: boolean) {
  if (!menu || !burger) return;
  open = state;
  burger.setAttribute('aria-expanded', String(state));
  menu.toggleAttribute('data-open', state);
  menu.setAttribute('aria-hidden', String(!state));
  document.body.classList.toggle('menu-open', state);
  header?.classList.remove('is-hidden');
  menu.inert = !state;
  if (state) {
    window.__lenis?.stop();
    setTimeout(() => menu.querySelector<HTMLElement>('a')?.focus({ preventScroll: true }), 350);
  } else {
    window.__lenis?.start();
    burger.focus({ preventScroll: true });
  }
}
if (menu) menu.inert = true;

window.matchMedia('(min-width: 1100px)').addEventListener('change', (event) => {
  if (event.matches && open) setMenu(false);
});

burger?.addEventListener('click', () => setMenu(!open));
menu?.addEventListener('click', (e) => {
  if ((e.target as Element).closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (open && e.key === 'Tab' && menu && burger) {
    const items = [burger, ...menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  if (e.key !== 'Escape') return;
  if (open) setMenu(false);
  const active = document.activeElement as HTMLElement | null;
  if (active?.closest('[data-mega]')) active.blur();
});

// keep the mega menu open briefly when the pointer leaves (forgiving hover)
document.querySelectorAll<HTMLElement>('[data-mega]').forEach((item) => {
  let t: number | undefined;
  item.addEventListener('pointerenter', () => {
    clearTimeout(t);
    item.setAttribute('data-open', '');
  });
  item.addEventListener('pointerleave', () => {
    t = window.setTimeout(() => item.removeAttribute('data-open'), 160);
  });
});
