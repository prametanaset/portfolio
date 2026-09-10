#!/usr/bin/env node
// Slice the origin stylesheet by class prefix, scoped under .sd-root.
// usage: node slice-css.mjs sd-45 sd-46 --out ../../../../../components/sites/.../free-layout.css
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const out = outIdx === -1 ? null : args[outIdx + 1];
const prefixes = (outIdx === -1 ? args : args.slice(0, outIdx)).filter(Boolean);
if (!prefixes.length) { console.error('need at least one class prefix'); process.exit(1); }

const CSS = path.join(path.dirname(new URL(import.meta.url).pathname), '../css/main.css');
const css = fs.readFileSync(CSS, 'utf8');

// split top-level rules and @media blocks
const chunks = [];
let depth = 0, start = 0;
for (let i = 0; i < css.length; i++) {
  const ch = css[i];
  if (ch === '{') depth++;
  else if (ch === '}') { depth--; if (depth === 0) { chunks.push(css.slice(start, i + 1)); start = i + 1; } }
}

const re = new RegExp(prefixes.map(p => `\\.${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`).join('|'));
const splitTop = (sel) => {
  const parts = []; let d = 0, cur = '';
  for (const ch of sel) {
    if (ch === '(' || ch === '[') d++;
    else if (ch === ')' || ch === ']') d--;
    if (ch === ',' && d === 0) { parts.push(cur); cur = ''; } else cur += ch;
  }
  parts.push(cur);
  return parts;
};
const scope = (sel) => splitTop(sel).map(s => {
  s = s.trim();
  if (!s) return s;
  if (/^(html|body)\b/.test(s)) return s.replace(/^(html|body)/, m => `${m}:has(.sd-root)`);
  return `.sd-root ${s}`;
}).join(',\n');

const kept = [];
for (const chunk of chunks) {
  const t = chunk.trim();
  if (!t) continue;
  if (t.startsWith('@media') || t.startsWith('@supports') || t.startsWith('@container')) {
    const head = t.slice(0, t.indexOf('{') + 1);
    const body = t.slice(t.indexOf('{') + 1, t.lastIndexOf('}'));
    const inner = [];
    let d = 0, s0 = 0;
    for (let i = 0; i < body.length; i++) {
      if (body[i] === '{') d++;
      else if (body[i] === '}') { d--; if (d === 0) { inner.push(body.slice(s0, i + 1)); s0 = i + 1; } }
    }
    const innerKept = inner.filter(r => re.test(r.slice(0, r.indexOf('{'))));
    if (innerKept.length) {
      kept.push(head + '\n' + innerKept.map(r => {
        const i = r.indexOf('{');
        return scope(r.slice(0, i)) + ' ' + r.slice(i);
      }).join('\n') + '\n}');
    }
    continue;
  }
  if (t.startsWith('@')) continue;
  const i = t.indexOf('{');
  const sel = t.slice(0, i);
  if (!re.test(sel)) continue;
  kept.push(scope(sel) + ' ' + t.slice(i));
}

const result = `/* Sliced from the origin stylesheet (studio.design/ja/editor) for: ${prefixes.join(', ')} */\n` + kept.join('\n') + '\n';
if (out) { fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, result); }
console.log(JSON.stringify({ prefixes: prefixes.length, rules: kept.length, bytes: result.length, out: out || '(stdout)' }));
if (!out) process.stdout.write(result);
