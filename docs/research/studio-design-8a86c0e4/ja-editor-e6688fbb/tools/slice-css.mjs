#!/usr/bin/env node
// Slice the origin stylesheet by class token, scoped under .sd-root.
// Tokens: `sd-45` exact class · `sd-45..78` inclusive numeric range · `symbol-1*` prefix wildcard.
// usage: node slice-css.mjs sd-45..78 --out components/sites/.../free-layout.css
import fs from 'node:fs';
import path from 'node:path';
import { splitBlocks, transformBlock } from './css-lib.mjs';

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const out = outIdx === -1 ? null : args[outIdx + 1];
const tokens = (outIdx === -1 ? args : args.slice(0, outIdx)).filter(Boolean);
if (!tokens.length) { console.error('need at least one class token'); process.exit(1); }

const here = path.dirname(new URL(import.meta.url).pathname);
const css = fs.readFileSync(path.join(here, '../css/main.css'), 'utf8');

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const expand = (token) => {
  const range = token.match(/^(.*?)(\d+)\.\.(?:\1)?(\d+)$/);
  if (range) {
    const [, stem, from, to] = range;
    const lo = Math.min(+from, +to), hi = Math.max(+from, +to);
    return Array.from({ length: hi - lo + 1 }, (_, i) => `\\.${esc(stem)}${lo + i}(?![\\w-])`);
  }
  if (token.endsWith('*')) return [`\\.${esc(token.slice(0, -1))}[\\w-]*(?![\\w-])`];
  return [`\\.${esc(token)}(?![\\w-])`];
};
const re = new RegExp(tokens.flatMap(expand).join('|'));

const kept = [];
for (const block of splitBlocks(css)) {
  const transformed = transformBlock(block, (sel) => re.test(sel));
  if (transformed) kept.push(transformed);
}

const result = `/* Sliced from the origin stylesheet (studio.design/ja/editor) for: ${tokens.join(', ')} */\n` + kept.join('\n') + '\n';
if (out) { fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, result); }
console.log(JSON.stringify({ tokens: tokens.length, rules: kept.length, bytes: result.length, out: out || '(stdout)' }));
if (!out) process.stdout.write(result);
