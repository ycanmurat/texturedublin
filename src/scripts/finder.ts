import { track } from './track.ts';

interface AreaRow {
  n: string; s: string; p: string; h: string; z: number; zn: string; mv: string; see: string; pr: string[];
}

const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/['’]/g, '');

document.querySelectorAll<HTMLElement>('[data-finder]').forEach((root) => {
  const input = root.querySelector<HTMLInputElement>('input')!;
  const list = root.querySelector<HTMLUListElement>('.finder-list')!;
  const out = root.querySelector<HTMLElement>('.finder-result')!;
  const { areas, labels } = JSON.parse(root.querySelector('[data-finder-data]')!.textContent!) as { areas: AreaRow[]; labels: Record<string, string> & { names: string[] } };
  const index = areas.map((a) => ({ a, k: norm(a.s + ' ' + a.p.replace(/Dublin /g, 'D').replace(/ /g, '')) }));
  let matches: AreaRow[] = [];
  let active = -1;

  const close = () => {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  };

  const render = () => {
    list.innerHTML = '';
    matches.forEach((a, i) => {
      const li = document.createElement('li');
      li.id = `finder-opt-${i}`;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(i === active));
      li.innerHTML = `<span></span><small></small>`;
      li.firstElementChild!.textContent = a.n;
      li.lastElementChild!.textContent = `${a.p} · ${labels.zone} ${a.z}`;
      li.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        choose(a);
      });
      list.appendChild(li);
    });
    if (!matches.length && input.value.trim()) {
      const li = document.createElement('li');
      li.textContent = labels.none;
      list.appendChild(li);
    }
    list.hidden = !input.value.trim();
    input.setAttribute('aria-expanded', String(!list.hidden));
    if (active >= 0) input.setAttribute('aria-activedescendant', `finder-opt-${active}`);
  };

  const choose = (a: AreaRow) => {
    input.value = a.n;
    close();
    out.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'finder-card';
    const h = document.createElement('h3');
    h.textContent = a.n;
    const meta = document.createElement('p');
    meta.className = 'small';
    meta.style.color = '#bdb2a3';
    meta.textContent = `${a.p} · ${labels.zone} ${a.z} — ${a.zn} · ${labels.min} ${a.mv}`;
    const dl = document.createElement('dl');
    dl.className = 'facts';
    for (const [i, price] of a.pr.entries()) {
      const name = labels.names[i];
      const d = document.createElement('div');
      const dt = document.createElement('dt');
      dt.textContent = name;
      const dd = document.createElement('dd');
      dd.textContent = price;
      d.append(dt, dd);
      dl.appendChild(d);
    }
    const link = document.createElement('a');
    link.className = 'btn btn--ink';
    link.style.justifySelf = 'start';
    link.href = a.h;
    link.textContent = `${a.see} →`;
    card.append(h, meta, dl, link);
    out.appendChild(card);
    track('area_search', { area: a.n, zone: a.z });
  };

  input.addEventListener('input', () => {
    const q = norm(input.value.trim()).replace(/^dublin\s*/, 'd');
    active = -1;
    matches = q ? index.filter((x) => x.k.includes(q) || x.k.includes(q.replace(/\s/g, ''))).slice(0, 8).map((x) => x.a) : [];
    render();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!matches.length) return;
      active = (active + (e.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length;
      render();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const a = matches[active >= 0 ? active : 0];
      if (a) choose(a);
    } else if (e.key === 'Escape') close();
  });
  input.addEventListener('blur', () => setTimeout(close, 120));
});
