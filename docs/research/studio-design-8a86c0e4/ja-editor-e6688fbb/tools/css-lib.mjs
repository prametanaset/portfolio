// Shared CSS surgery for the studio.design clone: split a stylesheet into top-level blocks and
// rewrite selectors so every rule only applies inside `.sd-root`, recursing through nested
// at-rules (@media, @supports, @container) instead of treating their preludes as selectors.

export function splitBlocks(css) {
  const out = [];
  let depth = 0, start = 0;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { out.push(css.slice(start, i + 1)); start = i + 1; }
    }
  }
  const tail = css.slice(start).trim();
  if (tail) out.push(tail); // statements without a block, e.g. a stray @charset
  return out;
}

const splitSelectorList = (sel) => {
  const parts = []; let depth = 0, cur = '';
  for (const ch of sel) {
    if (ch === '(' || ch === '[') depth++;
    else if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
  }
  parts.push(cur);
  return parts;
};

/** `.box` → `.sd-root .box`; `html`/`body` → `html:has(.sd-root)`; `:root`/`:host` untouched. */
export function scopeSelector(sel, scope = '.sd-root') {
  return splitSelectorList(sel.replace(/\/\*[\s\S]*?\*\//g, ''))
    .map((raw) => {
      const s = raw.trim();
      if (!s) return '';
      if (/^(html|body)\b/.test(s)) return s.replace(/^(html|body)/, (m) => `${m}:has(${scope})`);
      if (/^(:root|:host)/.test(s)) return s;
      return `${scope} ${s}`;
    })
    .filter(Boolean)
    .join(', ');
}

const NESTED_AT_RULE = /^@(media|supports|container|layer|scope)\b/;

/**
 * Rewrite one block. `keep(selector, block)` decides whether a plain rule survives;
 * at-rules survive when at least one descendant rule does.
 */
export function transformBlock(block, keep, scope = '.sd-root') {
  const t = block.trim();
  if (!t) return null;
  const brace = t.indexOf('{');
  if (brace === -1) return null;
  const prelude = t.slice(0, brace).trim();

  if (NESTED_AT_RULE.test(prelude)) {
    const body = t.slice(brace + 1, t.lastIndexOf('}'));
    const inner = splitBlocks(body)
      .map((b) => transformBlock(b, keep, scope))
      .filter(Boolean);
    return inner.length ? `${prelude} {\n${inner.join('\n')}\n}` : null;
  }
  if (prelude.startsWith('@')) return null; // @font-face, @charset, @import: handled by the caller
  if (!keep(prelude, t)) return null;
  return `${scopeSelector(prelude, scope)} ${t.slice(brace)}`;
}
