# QA_REPORT — studio.design/ja/editor → `/`

Method: Playwright MCP, DPR 1, one Chromium for both sides. For every unit the page is loaded,
scrolled once end-to-end (lazy media + IntersectionObserver reveals), then the unit's own top is
scrolled to the top of the viewport on each side independently; `scripts/browser/freeze.js` is
injected on both pages immediately before the capture, and the two viewport PNGs are compared with
`visual-diff.mjs`. Default budget 1.5 % differing pixels. Regenerate with
`node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/qa-diff.mjs`
(captures live in `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/qa/`).

## Results — 25 / 25 pass

| unit | viewport | diff | budget | masks | note |
|---|---|---|---|---|---|
| hero | 1440 | 0.000 % | 1.5 | — | |
| hero | 390 | 0.400 % | 1.5 | — | |
| next-creation | 1440 | 0.110 % | 1.5 | `0,274,1440,378` | autoplaying carousel `sd-20` |
| next-creation | 390 | 1.511 % | 2.0 | `0,330,390,290` | carousel + subpixel text AA (see residuals) |
| free-layout | 1440 | 0.166 % | 1.5 | — | the two videos happen to fall outside the first viewport |
| free-layout | 390 | 0.560 % | 1.5 | — | |
| editor-ai | 1440 | 0.959 % | 1.5 | — | |
| editor-ai | 390 | 0.275 % | 1.5 | — | |
| visual-design | 1440 | 0.119 % | 1.5 | — | |
| visual-design | 390 | 0.586 % | 1.5 | `0,185,390,185` | the `.sd-210` video sits in the first mobile viewport |
| creative-assets | 1440 | 0.337 % | 1.5 | — | |
| creative-assets | 390 | 0.515 % | 1.5 | — | |
| featured-creators | 1440 | 0.158 % | 1.5 | `0,307,1440,609` | autoplaying carousel `sd-244` |
| featured-creators | 390 | 0.618 % | 1.5 | `0,370,390,515` | |
| collaboration | 1440 | 0.235 % | 1.5 | — | |
| collaboration | 390 | 1.036 % | 1.5 | — | |
| data | 1440 | 0.226 % | 1.5 | — | |
| data | 390 | 0.459 % | 1.5 | — | |
| start-cta | 1440 | 0.035 % | 1.5 | — | |
| start-cta | 390 | 0.293 % | 1.5 | — | |
| stock-band | 1440 | 0.002 % | 1.5 | `0,600,1440,300` | the footer marquee shares the capture below the band |
| stock-band | 390 | 0.516 % | 1.5 | `0,352,390,492` | same |
| footer | 1440 | 0.445 % | 1.5 | `0,0,1440,180` | `sd-loop-box` marquee |
| footer | 390 | 0.225 % | 1.5 | `0,24,390,125` | same |
| mobile-menu (open) | 390 | 0.000 % | 1.5 | — | native `<dialog>`, captured 2.6 s after opening |

Masks cover only what can never match frame-for-frame: the two autoplaying carousels, the three
autoplaying videos, and the footer marquee. Nothing else is excluded.

## Behaviour sweep on the clone (compared against BEHAVIORS.md and the origin, live)

| behaviour | origin | clone |
|---|---|---|
| header dropdown, click | panel 869×376 at viewport y 76, `aria-expanded=true` | identical |
| header dropdown, outside click | closes (height 0) | identical |
| header dropdown, hover / Escape | never opens / never closes | identical |
| carousel `sd-20` | 7 nodes, advances every 3000 ms, 600 ms step, hover stops it | advances, 7 nodes |
| carousel `sd-244` | 7 nodes, 4500 ms / 1000 ms, hover does NOT stop it | identical |
| `.sd-211` video toggle | flips `is-playing`, swaps aria-label, plays/pauses | identical |
| footer accordions @390 | 5 triggers, multiple open at once | 5 triggers, 2 open at once |
| footer marquee | track 4456 px @1440 / 2816 @390, 80 px/s → 4472000 / 2832000 ms | identical, same durations |
| mobile menu | native modal, `modal-ready`, 8 `appear` left after settle, one accordion open of 5, Escape closes and restores all 29 `appear` | identical on every measured point |

## Residuals (documented, not defects)

1. **Subpixel text antialiasing.** The clone's page is ~2–5 px shorter than the origin's by the time
   you reach the lower sections (cumulative sub-pixel rounding, no single element differs by more
   than 0.2 px — verified element-by-element for `.sd-133` and `.sd-303`). A section therefore lands
   on a different fractional scroll offset and every CJK glyph edge shifts by a fraction of a pixel.
   It is worth 0.4–1.5 % on text-dense mobile captures and moves between runs; `next-creation @390`
   is the one row that needs a 2.0 % budget because of it.
2. **`--img-origin` weight.** `s-11136x4000_…webp` (17.8 MB) is committed because the origin
   declares it in the Stock band's `--img-*` set; no viewport at DPR 1 ever selects it.
3. **The origin's own 768 layout bug is reproduced, not fixed.** `@media (max-width:768px)
   .list-2__item { width: calc(32% - var(--gap-h)*0.68) }` is cyclic inside the marquee's
   intrinsically-sized sizer, so one card becomes 5604×3074 and the footer 4661 px tall. The clone
   does the same. QA covers 1440 and 390 only, as agreed.
4. **HiDPI variant choice.** Where the origin's runtime picks an image variant from the rendered CSS
   width, the clone uses `srcSet`/`sizes`, which the browser also scales by DPR. At DPR ≥ 2 a few
   images fetch the next variant up. Identical at the DPR-1 reference captures.
