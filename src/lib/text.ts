export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** "Fitted wardrobes, *made to measure*" -> escaped HTML with <em> */
export const rich = (s: string) => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');

/** split a heading into masked words for the reveal animation (keeps *em* groups) */
export function words(s: string, start = 0) {
  let i = start;
  let out = '';
  for (const part of s.split(/(\*[^*]+\*)/g).filter(Boolean)) {
    const em = part.length > 2 && part.startsWith('*') && part.endsWith('*');
    const txt = em ? part.slice(1, -1) : part;
    let seg = '';
    for (const w of txt.split(/(\s+)/)) {
      if (!w) continue;
      if (/^\s+$/.test(w)) {
        seg += ' ';
        continue;
      }
      seg += `<span class="w"><span style="--wi:${i++}">${esc(w)}</span></span>`;
    }
    out += em ? `<em>${seg}</em>` : seg;
  }
  return out;
}

export const plain = (s: string) => s.replace(/\*/g, '');
