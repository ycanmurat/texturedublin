import { lead } from './track.ts';

document.querySelectorAll<HTMLFormElement>('[data-quote]').forEach((form) => {
  const L = JSON.parse(form.querySelector('[data-q-labels]')!.textContent!) as Record<string, string>;
  const err = form.querySelector<HTMLElement>('[data-q-error]')!;
  const mail = form.querySelector<HTMLAnchorElement>('[data-q-mail]');

  const message = () => {
    const f = new FormData(form);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    const rows = [
      L.intro,
      '',
      get('service') && `${L.service}: ${get('service')}`,
      get('area') && `${L.area}: ${get('area')}`,
      get('size') && `${L.size}: ${get('size')}`,
      get('when') && `${L.when}: ${get('when')}`,
      get('details') && `${L.details}: ${get('details')}`,
      get('name') && `${L.name}: ${get('name')}`,
    ];
    return rows.filter((r) => r !== '' && r !== false && r !== undefined).join('\n');
  };

  const syncMail = () => {
    if (mail) mail.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(L.intro)}&body=${encodeURIComponent(message())}`;
  };
  form.addEventListener('input', syncMail);
  syncMail();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = (form.elements.namedItem('service') as HTMLSelectElement).value;
    if (!service) {
      err.hidden = false;
      (form.elements.namedItem('service') as HTMLSelectElement).focus();
      return;
    }
    err.hidden = true;
    const url = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(message())}`;
    lead('quote_form', null, { service, placement: 'quote-form' });
    const w = window.open(url, '_blank', 'noopener');
    if (!w) window.location.href = url;
  });
});
