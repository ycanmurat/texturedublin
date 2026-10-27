import { track } from './track.ts';

type Pair = [number, number];
interface Data {
  wa: string;
  zones: Record<string, { m: number; min: number }>;
  areas: Array<[string, string, number]>;
  p: Record<string, Record<string, Pair>>;
  t: Record<string, any>;
}

const nf = new Intl.NumberFormat('en-IE', { maximumFractionDigits: 0 });
const eur = (n: number) => `€${nf.format(n)}`;
const round = (n: number) => (n < 1000 ? Math.round(n / 5) * 5 : n < 10000 ? Math.round(n / 10) * 10 : Math.round(n / 50) * 50);

document.querySelectorAll<HTMLElement>('[data-estimator]').forEach((root) => {
  const d = JSON.parse(root.querySelector('[data-est-data]')!.textContent!) as Data;
  const t = d.t;
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
  const areaSel = root.querySelector<HTMLSelectElement>('[data-area]')!;
  const totalEl = root.querySelector<HTMLElement>('[data-total]')!;
  const send = root.querySelector<HTMLAnchorElement>('[data-est-send]')!;
  let tab = root.dataset.start || 'wardrobes';
  const qty: Record<string, number> = { bed: 1, wardrobe2: 0, wardrobeLarge: 0, drawers: 0, desk: 0, dining: 0 };
  let interacted = false;

  const val = (name: string) => (root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value ?? '0');
  const num = (id: string) => parseFloat((root.querySelector<HTMLInputElement>(`#${id}`)?.value) ?? '0');
  const labelOf = (name: string) => root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.nextElementSibling?.textContent ?? '';

  function zone() {
    const a = d.areas.find((x) => x[0] === areaSel.value);
    return { z: d.zones[String(a ? a[2] : 2)], name: a ? a[1] : '' };
  }

  function compute(): { lo: number; hi: number; vatInc: boolean; summary: string[] } {
    const { z } = zone();
    const m = z.m;
    const P = d.p;
    if (tab === 'wardrobes') {
      const w = num('w-width');
      const base = P.wardrobes[val('w-doors')];
      const fin = [1, 1.12, 1.22][+val('w-fin')];
      const prem = val('w-int') === '1' ? 1.14 : 1;
      return { lo: w * base[0] * fin * prem * m, hi: w * base[1] * fin * prem * m, vatInc: true, summary: [`${t.services.wardrobes}: ${w.toFixed(1)} m`, `${t.doors}: ${labelOf('w-doors')}`, `${t.interior}: ${labelOf('w-int')}`, `${t.finish}: ${labelOf('w-fin')}`] };
    }
    if (tab === 'kitchens') {
      const size = ['compact', 'family', 'island'][+val('k-size')];
      const base = P.kitchens[size];
      const top = [[0, 0], [1200, 2600], [2200, 5200]][+val('k-top')];
      return { lo: (base[0] + top[0]) * m, hi: (base[1] + top[1]) * m, vatInc: true, summary: [`${t.services.kitchens}: ${labelOf('k-size')}`, `${t.worktop}: ${labelOf('k-top')}`] };
    }
    if (tab === 'builtins') {
      const i = +val('b-type');
      const key = ['alcovePair', 'media', 'bookcase', 'office', 'understairs'][i];
      const w = num('b-width');
      const fin = [0.92, 1, 1.12][+val('b-fin')];
      const base = P.builtins[key];
      const k = key === 'bookcase' ? w : 1;
      return { lo: base[0] * k * fin * m, hi: base[1] * k * fin * m, vatInc: true, summary: [`${t.services.builtins}: ${labelOf('b-type')}${key === 'bookcase' ? ` (${w.toFixed(1)} m)` : ''}`, `${t.finish}: ${labelOf('b-fin')}`] };
    }
    if (tab === 'assembly') {
      let lo = 0, hi = 0;
      const lines: string[] = [];
      for (const [k, n] of Object.entries(qty)) {
        if (!n) continue;
        lo += P.assembly[k][0] * n;
        hi += P.assembly[k][1] * n;
        lines.push(`${t.assemblyItems[k]} × ${n}`);
      }
      lo = Math.max(lo, z.min);
      hi = Math.max(hi, z.min);
      return { lo, hi, vatInc: true, summary: [`${t.services.assembly}:`, ...lines] };
    }
    const i = +val('s-type');
    const key = ['panel', 'painted', 'letters', 'lightbox', 'halo'][i];
    const w = num('s-width');
    const scale = Math.pow(Math.max(1, w / 3), 0.85);
    const base = P.signs[key];
    let lo = base[0] * scale, hi = base[1] * scale;
    if (val('s-inst') === '1') {
      lo += P.signs.install[0];
      hi += P.signs.install[1];
      if (key === 'lightbox' || key === 'halo') {
        lo += P.signs.electrical[0];
        hi += P.signs.electrical[1];
      }
    }
    return { lo: lo * m, hi: hi * m, vatInc: false, summary: [`${t.services.signs}: ${labelOf('s-type')}, ${w.toFixed(1)} m`, `${t.install}: ${labelOf('s-inst')}`] };
  }

  function update() {
    root.querySelectorAll<HTMLOutputElement>('[data-out]').forEach((o) => {
      const v = num(o.dataset.out!);
      o.textContent = `${v % 1 ? v.toFixed(1) : v} ${t.metres}`;
    });
    const bw = root.querySelector<HTMLElement>('[data-only="b-width"]');
    if (bw) bw.hidden = val('b-type') !== '2';
    const r = compute();
    const lo = round(r.lo), hi = round(Math.max(r.hi, r.lo));
    totalEl.innerHTML = '';
    totalEl.append(`${eur(lo)} – ${eur(hi)}`);
    const small = document.createElement('small');
    small.textContent = r.vatInc ? t.incVat : t.exVat;
    totalEl.appendChild(small);
    const { name } = zone();
    const msg = [t.msg, ...r.summary, name ? `${t.area}: ${name}` : '', `${t.estimateWord}: ${eur(lo)} – ${eur(hi)} (${r.vatInc ? t.incVat : t.exVat})`].filter(Boolean).join('\n');
    send.href = `https://wa.me/${d.wa}?text=${encodeURIComponent(msg)}`;
    send.dataset.service = tab;
    send.dataset.area = areaSel.value;
  }

  function select(k: string) {
    tab = k;
    tabs.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === k)));
    panels.forEach((p) => (p.hidden = p.dataset.panel !== k));
    update();
  }

  tabs.forEach((b) => b.addEventListener('click', () => select(b.dataset.tab!)));
  root.addEventListener('input', () => {
    update();
    if (!interacted) {
      interacted = true;
      track('estimate_start', { service: tab });
    }
  });
  root.querySelectorAll<HTMLElement>('[data-step]').forEach((s) => {
    const k = s.dataset.step!;
    s.addEventListener('click', (e) => {
      const b = (e.target as Element).closest('button');
      if (!b) return;
      qty[k] = Math.max(0, Math.min(20, qty[k] + parseInt(b.dataset.d!)));
      s.querySelector('output')!.textContent = String(qty[k]);
      update();
    });
  });
  select(tab);
});
