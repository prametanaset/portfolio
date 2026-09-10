# StartCtaSection Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .symbol-2` (`div.box.symbol-2`) · DOM order 11 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/StartCtaSection.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/` → `start-cta-1440.png` (scrollY 11526, whole section fits one 1440×900 tile) · `start-cta-768.png` (12187) · `start-cta-390.png` (13491) · hover states `start-cta-1440-hover-primary.png`, `start-cta-1440-hover-secondary.png`, `start-cta-768-hover-primary.png`. All are scrolled viewport tiles at dpr 1, so the fixed `#header` pill overlays the top 96 px of each tile (64 px at 390) — crop that band when diffing.
- **Interaction model:** hover-driven — two CSS `:hover` states, one per link. No scroll behaviour, no reveal, no toggle, no click state, no timer, no carousel, no video, no sticky.
- **Client component:** no. Everything is declarative CSS; the component can be a server component.
- **Root rect @1440:** x 0, y 11526.66, w 1440, h 679.52 · **@768:** 0, 12187.40, 768, 560.46 · **@390:** 0, 13491.00, 390, 533.49
- **Sub-components:** `MaterialSymbol` ×3 from `components/sites/studio-design-8a86c0e4/shared/icons.tsx`. 20 nodes, one flat file — no split. `Appear`, `SdToggle`, `SdCarousel`, `SdVideo` are **not** needed.
- **Non-DOM content:** none. No video, no canvas, no Lottie, no iframe, no `<noscript>`.
- **REVEAL VERDICT — refuted:** `querySelectorAll('.appear,[data-appear-manual],.appear-active,[data-appear],[data-inited-appear]')` inside the section returned **0** at 1440, 768 and 390. The only `data-*` attribute in the whole section is the empty `data-scope-v2-843c7d5ff10f65506d615a34b2d9ac95` on the root. `__cloneSnap.animations('main > .symbol-2')` returned `{count: 0}`; no `@keyframes` exist on the page. No element carries an inline `style` attribute.
- **TOGGLE VERDICT — refuted:** 0 hits for `[data-toggle-trigger],[data-toggle-content],sd-toggle,button,[aria-expanded]`.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs 'symbol-2*' --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/start-cta.css` — token **`symbol-2*`** only (39 rules, 7337 bytes; the prefix-wildcard form the header also needed, because these are `symbol-2__sd-N` classes, not `sd-NN`). Verified by a live class census at all three widths (`extract/start-cta.states.json` → `classCensus`): the complete rendered class set is `box`, `text`, `img`, `icon`, `richText`, `material-symbols-outlined`, `theme-57a9da79`, `symbol-2` and `symbol-2__sd-1`…`symbol-2__sd-17`. Every non-`symbol-2*` class is already in `app/studio-base.css` (`.richText` at line 210, `.text.theme-57a9da79` at 946/1044). Custom properties the slice references — `--s-color-06b63738` `rgb(255,255,255)`, `--s-color-99a91143` `#222222ff`, `--s-color-f0be55c6` `#707070ff`, `--s-color-56baa902` `#f7f7f7`, `--s-font-5489e031` `Inter,'Noto Sans JP'` — are all defined in `app/studio-base.css` (lines 43 and 909). Keep origin class names verbatim.

## DOM Structure
```
div.box.symbol-2                                  section, bg #fff, padding 160px 0, row, centred, overflow hidden
  div.box.symbol-2__sd-1                          column, align center, gap 32, margin 0 24px, w 1920 / max-width calc(100% - 48px)
    div.box.symbol-2__sd-2                        72×72 badge, bg #222222ff, radius 6px, centred
      img.img.symbol-2__sd-3                      Studio mark SVG, height 25, width auto
    div.box.symbol-2__sd-4                        column, align center, gap 24
      h2.text.symbol-2__sd-5.theme-57a9da79       headline, flex:1, text-align center, overflow hidden
      div.richText.symbol-2__sd-6                 body copy block, text-align center
        p                                         line 1 (own <p>, margin 0)
        p                                         line 2 (own <p>, margin 0)
    div.box.symbol-2__sd-7                        column, align center, gap 18
      a.box.symbol-2__sd-8[href target=_blank]    primary pill, w 448, bg #222222ff, 1px #222222ff, radius 4, padding 18 16 18 32
        p.text.symbol-2__sd-9                     label, flex:1, overflow hidden
        div.box.symbol-2__sd-10                   24×24 mask, overflow hidden, justify flex-end, gap 4, padding-right 2
          span.icon.symbol-2__sd-11[aria-hidden]  "arrow_forward", rotate −45deg, translate 0 25px
          span.icon.symbol-2__sd-12[aria-label role=img] "arrow_forward", rotate −45deg
      a.box.symbol-2__sd-13[href target=_blank]   secondary text link, border-bottom 1px #222222, padding 4, gap 8
        p.text.symbol-2__sd-14                    label, flex:1, overflow hidden
        div.box.symbol-2__sd-15                   14×14 mask, rotate −45deg, overflow hidden, justify flex-end, gap 0
          span.icon.symbol-2__sd-16[aria-hidden]  "arrow_forward"
          span.icon.symbol-2__sd-17[aria-hidden]  "arrow_forward"
```
`.symbol-2__sd-6` is Studio's rich-text container: the two lines are two sibling `<p>` elements with `margin: 0`, **not** one `<p>` with a `<br>`. The origin also ships `.richText.symbol-2__sd-6 strong { color:#222222; font-weight:500 }` (and a 13px override at ≤768/≤480), but no `<strong>` exists in this section's markup, so that rule paints nothing — keep it in the slice, do not emit a `<strong>`.

## Computed Styles (from getComputedStyle @1440 dpr 1, exact; rects are `[page-x, section-relative-y, w, h]`)
### `.symbol-2` (S1) — rect [0, 0, 1440, 680]
- display: flex · flexDirection: row · flexWrap: nowrap · justifyContent: center · alignItems: center · alignContent: center
- width: 1440px · height: 679.523px · maxWidth: 100% · padding: 160px 0px · margin: 0px · position: relative
- backgroundColor: rgb(255, 255, 255) · overflow: hidden hidden · border: 0px solid transparent on all four sides
- transitionDuration: 0.3s
- transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1)
- transitionDelay: 0s
- outline: rgb(0, 0, 0) none 3px
### `.symbol-2__sd-1` (S2) — rect [24, 160, 1392, 360]
- width: 1392px (declared 1920px, maxWidth calc(100% - 48px)) · height: 359.523px · margin: 0px 24px · rowGap: 32px · columnGap: 32px · flexDirection: column · alignItems: center · backgroundColor: rgba(0, 0, 0, 0) · borderRadius: 0px · `> *` sets `--gap-h: 0px; --gap-v: 32px`
### `.symbol-2__sd-2` (S3) [684, 160, 72, 72] and `.symbol-2__sd-3` (S4) [699, 184, 42.30, 25]
- sd-2: width: 72px · height: 72px · borderRadius: 6px · backgroundColor: rgb(34, 34, 34) · flexDirection: column · justifyContent: center · alignItems: center · padding: 0px
- sd-3: height: 25px · width: 42.3047px (auto from aspectRatio `auto 44 / 26`) · maxWidth: 100% · overflow: clip · objectFit: fill
### `.symbol-2__sd-4` (S5) [482, 264, 475.07, 120.13]
- rowGap: 24px · columnGap: 24px · flexDirection: column · justifyContent: center · alignItems: center · padding: 0px
### `.symbol-2__sd-5` (S6, theme-57a9da79) [482, 264, 475.07, 45]
- fontFamily: Inter, "Noto Sans JP" · fontSize: 36px · lineHeight: 45px · fontWeight: 600 · letterSpacing: normal · fontFeatureSettings: "palt" · color: rgb(34, 34, 34) · textAlign: center · flexBasis: 0% (flex:1) · overflow: hidden · opacity: 1
- **No `theme-*` / `.sd-NN` collision:** `.symbol-2__sd-5` declares only colour, flex, height, opacity, overflow, text-align, width and justify-content; `.text.theme-57a9da79` (specificity 0,2,0) supplies **all** typography. They never set the same property, so neither "beats" the other. Effective sizes: 2.25rem = 36px base, 1.75rem = 28px at ≤480 (`app/studio-base.css` 946 / 1044).
### `.symbol-2__sd-6` (S7) [507, 333, 426.25, 51.13] and its two `<p>` (S8, each 426.25×25.5625)
- fontFamily: Inter, "Noto Sans JP" · fontSize: 15.04px (0.94rem) · lineHeight: 25.568px (1.7) · fontWeight: 400 · letterSpacing: normal · fontFeatureSettings: "palt" · color: rgb(112, 112, 112) · textAlign: center · display: block · width: auto
- the `<p>` children are `display: block`, `position: static`, `margin: 0px`, `minHeight: 15.04px`
### `.symbol-2__sd-7` (S9) [496, 416, 448, 103.40]
- rowGap: 18px · columnGap: 18px · flexDirection: column · justifyContent: center · alignItems: center · padding: 0px
### `.symbol-2__sd-8` (S10, primary CTA) [496, 416, 448, 62]
- width: 448px · height: 62px · padding: 18px 16px 18px 32px · border: 1px solid rgb(34, 34, 34) (all four) · borderRadius: 4px · backgroundColor: rgb(34, 34, 34) · justifyContent: space-between · alignItems: center · rowGap/columnGap: 24px · cursor: pointer · flexDirection: row
### `.symbol-2__sd-9` (S11) [529, 439, 350, 16.89]
- fontSize: 14.08px (0.88rem) · lineHeight: 16.896px (1.20) · fontWeight: 500 · letterSpacing: -0.2816px (-0.02em) · color: rgb(247, 247, 247) · textAlign: left · flexBasis: 0% · overflow: hidden
### `.symbol-2__sd-10` (S12) [903, 435, 24, 24] · `.symbol-2__sd-11` (S13) [877, 458, 28.28, 28.28] · `.symbol-2__sd-12` (S14) [901, 433, 28.28, 28.28]
- sd-10: width: 24px · height: 24px · paddingRight: 2px · justifyContent: flex-end · alignItems: center · columnGap: 4px · overflow: hidden
- sd-11 / sd-12: fontFamily "Material Symbols Outlined" · fontSize: 20px · lineHeight: 20px · width/height 20px (the 28.28 rect is the rotated bounding box) · fontVariationSettings `"FILL" 0, "wght" 400` · fontFeatureSettings `"liga"` · color: rgb(247, 247, 247) · rotate: -45deg on both · translate: **0px 25px on sd-11**, none on sd-12 · transformOrigin: 10px 10px
- `.symbol-2__sd-10` is 24px wide while its content is 20+4+20 px, so sd-11 is clipped out to the left at rest and only sd-12 shows.
### `.symbol-2__sd-13` (S15, secondary link) [617, 496, 206.41, 23.40]
- width: auto · padding: 4px · borderBottom: 1px solid rgb(34, 34, 34) (left/right/top 0px) · borderRadius: 0px · backgroundColor: rgba(0, 0, 0, 0) · display: flex · justifyContent: space-between · alignItems: center · rowGap/columnGap: 8px · cursor: pointer
### `.symbol-2__sd-14` (S16) [621, 500, 176.41, 14.40] · `.symbol-2__sd-15` (S17) [802, 497, 14, 14] · `.symbol-2__sd-16` / `.symbol-2__sd-17` (S18) [792, 507] / [802, 497], 20×20 rotated boxes
- sd-14: fontSize: 12px (0.75rem) · lineHeight: 14.4px · fontWeight: 500 · letterSpacing: -0.24px · color: rgb(34, 34, 34) · textAlign: left · flexBasis: 0% · overflow: hidden
- sd-15: width: 14px · height: 14px · rotate: -45deg · justifyContent: flex-end · gap: 0px · padding: 0px · overflow: hidden
- sd-16 / sd-17: fontFamily "Material Symbols Outlined" · fontSize: 14px · lineHeight: 14px · width/height 14px · color: rgb(34, 34, 34) · fontVariationSettings `"FILL" 0, "wght" 400` · no rotate of their own (the 14×14 parent carries it) · transformOrigin: 7px 7px

## States & Behaviors
### Hover A — `a.symbol-2__sd-8` (primary pill)
- **Trigger:** CSS `:hover`, pointer only. Measured with `page.mouse.move` to the pill centre and a 900 ms settle, after a 2600 ms settle on the baseline.
- **A → B (re-measured live at 1440, 768 and 390 — identical at all three):** `.symbol-2__sd-8` backgroundColor rgb(34, 34, 34) → **rgba(0, 0, 0, 0)** (the 1px rgb(34,34,34) border stays, so the filled pill becomes an outline) · `.symbol-2__sd-9` color rgb(247, 247, 247) → rgb(34, 34, 34) · `.symbol-2__sd-11` color rgb(247,247,247) → rgb(34,34,34) and translate `0px 25px` → **`24px`** (rect [877, 11985] → [901, 11960]) · `.symbol-2__sd-12` color rgb(247,247,247) → rgb(34,34,34) and translate `none` → **`24px -24px`** (rect [901, 11960] → [925, 11936]). `rotate: -45deg` is restated in both hover rules and never changes; opacity stays 1; `.symbol-2__sd-10` does not change.
- Net effect inside the 24×24 mask: the resting arrow exits up-right while the hidden arrow rises from below-left into its place.
- **Transition:** the inherited base `all 0.3s cubic-bezier(0.4, 0.4, 0, 1)`, delay 0s, on all four nodes. No per-element override anywhere in the section.
- **Evidence:** `__cloneSnap.rules('main > .symbol-2')` → 13 hits, all `:hover` (`extract/start-cta.states.json` → `cssRuleHits`); live before/after in `hoverPrimary`; screenshots `start-cta-1440-hover-primary.png`, `start-cta-768-hover-primary.png`.
### Hover B — `a.symbol-2__sd-13` (secondary text link)
- **Trigger:** CSS `:hover`, pointer only, same measurement protocol.
- **A → B:** the only changing element is `.symbol-2__sd-17`: marginRight `0px` → **`-14px`** and maxWidth `100%` → **`calc(100% + 14px)`**. Because `.symbol-2__sd-15` is a 14×14 `overflow: hidden` box rotated −45deg with `justify-content: flex-end`, that negative margin slides both glyphs 14 px along the rotated axis: `.symbol-2__sd-16` rect [792, 12034] → [802, 12024] and `.symbol-2__sd-17` rect [802, 12024] → [812, 12014]. sd-16 becomes the visible arrow and sd-17 leaves the mask.
- **`.symbol-2__sd-13:hover` itself declares only `opacity: 1` (already 1) and `--ha: 1` — the link box has no visual hover change.** Colour, border-bottom, padding and background are all unchanged.
- **This hover is visually a no-op.** sd-16 and sd-17 are the same 14px glyph in the same colour, and the shift moves sd-16 into exactly the rect sd-17 vacates ([802, 12024, 20, 20] in both states), so the painted result is unchanged: `start-cta-1440-hover-secondary.png` is **byte-identical (md5 8a126d326bf80cd99a4ce134658fdc44) to `start-cta-1440.png`**. Reproduce the CSS anyway — the DOM state differs and the origin ships the rules — but do not expect a visual diff, and do not add motion that the origin does not have.
- **Transition:** inherited base 0.3s cubic-bezier(0.4, 0.4, 0, 1), delay 0s. Identical at 768 and 390 (re-measured).
- **Evidence:** `extract/start-cta.states.json` → `hoverSecondary`; screenshot `start-cta-1440-hover-secondary.png`.
### Focus / active / click / scroll
**N/A — none exist.** All 13 CSSOM pseudo-class hits are `:hover`; there is no `:focus`, `:focus-visible` or `:active` rule anywhere in `css/main.css` for these classes, and both links are plain navigations (no click handler, no `data-*` state). Nothing in the section responds to scroll: it has no `appear` target, no `position: sticky`, no IntersectionObserver attribute.
### Section edges (page-level assembly)
Butt joins on both sides, no margin, no border, no negative offset, no overlap. `main > .sd-303` (DataSection, bg `rgb(247,247,247)`) bottom = `.symbol-2` top = **11526.66**; `.symbol-2` bottom = `main > .sd-331` (StockBandSection) top = **12206.18** @1440 · 12187.40 / 12747.86 @768 · 13491.00 / 14024.49 @390. The white of this section is its own `background: var(--s-color-06b63738)` and its `160px 0px` padding (104 ≤768, 80 ≤480) is what separates the badge from the grey seam above; the StockBandSection below is also `rgb(255,255,255)`, so the two whites merge into one continuous field and only the dark card marks the boundary.

## Per-State Content
N/A — single state; the two hover states change no text.

## Assets
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-44x26_3430d13a-42ae-4e12-9d99-3075f619b6b3.svg` — `img.symbol-2__sd-3`, alt `Studio`, intrinsic 44×26, `width="44" height="26"`, rendered 42.30×25 @1440 and @768, 33.84×20 @390. Present in `assets.manifest.json` and on disk.
- Icons: `MaterialSymbol name="arrow_forward"` for `.symbol-2__sd-11`, `.symbol-2__sd-16` and `.symbol-2__sd-17` (the component hard-codes `aria-hidden="true"`, which matches all three). `.symbol-2__sd-12` must be a plain `<span className="icon material-symbols-outlined symbol-2__sd-12" aria-label="新規タブで開く" role="img">arrow_forward</span>` — `MaterialSymbol` cannot express `aria-label` + `role`.
- No video, no background-image, **no `image` / `image__bg-container` custom-property machinery and no `--g-*` gradient** — the only `background` values in the section are the two solid colours above.
- Layered composition: none. No `position: absolute`, no `z-index` (all auto/0) anywhere in the section; the only clipping is the two `overflow: hidden` icon masks.
- MISSING: nothing. No `extract/start-cta.assets.json` is emitted — every asset this section needs is already on disk.

## Text Content (verbatim)
Byte-checked against the live DOM: no U+00A0, U+2028, U+2029, U+200B, U+200E, U+200F, U+FEFF, U+3000, U+2060 and no character in U+2000–U+20FF (`extract/start-cta.states.json` → `codepointAudit`). The full-width punctuation is U+3001 `、` and U+3002 `。`, both CJK-block.
- `h2.symbol-2__sd-5`: `さあ、今すぐStudioを始めよう。`
- `div.richText.symbol-2__sd-6` → first `<p>`: `AI搭載の軽快なデザインエディタと美しいプリセットで、` · second `<p>`: `理想のサイトを最速でカタチに。これが、Web制作ツールの新基準。` (two `<p>` siblings, **no `<br>`**)
- `p.symbol-2__sd-9`: `今すぐ無料で始める` · `a.symbol-2__sd-8`: `href="https://app.studio.design/ja/signup"`, `target="_blank"`, **no `rel` attribute on the origin** — reproduce verbatim, do not add `rel="noopener"`.
- `p.symbol-2__sd-14`: `法人向け製品資料をダウンロード` · `a.symbol-2__sd-13`: `href="/ja/business/download"`, `target="_blank"`, no `rel`.
- `span.symbol-2__sd-11`: `arrow_forward` (`aria-hidden="true"`) · `span.symbol-2__sd-12`: `arrow_forward` (`aria-label="新規タブで開く"`, `role="img"`) · `span.symbol-2__sd-16` and `span.symbol-2__sd-17`: `arrow_forward` (both `aria-hidden="true"`, **neither carries an aria-label**)
- `img.symbol-2__sd-3` alt: `Studio`. No title, no placeholder, no other aria attribute. These two `<a>` are the only links in the section.

## Responsive Behavior
- **Desktop (1440):** one centred column 1392 px wide inside 160 px vertical padding. Badge 72×72 → gap 32 → headline 36/45 (475.07 px wide, one line) + copy 15.04/25.568 (426.25 px, two lines) with a 24 px gap → gap 32 → 448 px pill + 18 px gap + the 206.41 px text link. Section height 679.52.
- **Tablet (768):** `@media (max-width: 1280px)` (`css/main.css` 4218–4220) only restates `.symbol-2__sd-13 { display: flex }` and its gap vars — a no-op. `@media (max-width: 768px)` (4637–4642) sets `.symbol-2 { padding: 104px 0px }` and `.symbol-2__sd-6 { font-size: 0.81rem }` → 12.96px / lineHeight 22.032px, so the copy block shrinks to 367.31×44.06 and the section to 560.46. Everything else — badge 72, headline 36/45 at 475.07, pill 448×62, gaps 32/24/18 — is unchanged. Content column is 720 px (`calc(100% - 48px)`).
- **Mobile (390):** `@media (max-width: 480px)` (5075–5089) sets `.symbol-2 { padding: 80px 0px }`, `.symbol-2__sd-1 { gap: 24px }`, `.symbol-2__sd-2 { flex: none; height: 64px; width: 64px }`, `.symbol-2__sd-3 { flex: none; height: 20px }` (→ 33.84 px wide), `.symbol-2__sd-4 { gap: 16px }`, `.symbol-2__sd-5 { width: 260px }`, `.symbol-2__sd-6 { width: auto }`, `.symbol-2__sd-7 { gap: 24px }` and `.symbol-2__sd-13 { gap: 6px; margin: 0px }`. The headline also drops to 28px / lineHeight 35px via `.text.theme-57a9da79 { font-size: 1.75rem }` (`app/studio-base.css` 1044) and wraps to two lines (260×70). Copy stays 12.96/22.032 but spans the full 342 px column, so line 2 wraps to two lines (342×44.06). Pill is 342×62 with padding unchanged at 18 16 18 32. Section height 533.49.
- **≤360:** `@media (max-width: 360px)` (5491–5496) sets `.symbol-2__sd-8 { padding: 18px 16px 18px 24px }` and `.symbol-2__sd-13:hover > * { --gap-h: 6px }`. Not exercised at 390 — listed so the builder keeps the rule in the slice.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`, `(max-width: 360px)` — the only width media queries in `css/main.css` that touch `symbol-2*`. Layout is otherwise fluid (%/flex only).

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/start-cta.1440.json` (20 nodes, 18 style buckets)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/start-cta.768.json` (20 nodes) · `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/start-cta.390.json` (20 nodes, 19 style buckets — the two `<p>` split into two buckets because line 2 wraps)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/start-cta.states.json` — geometry and butt-join edges at all three widths, the 13 CSSOM pseudo-class hits, live before/after for both hover states at 1440 plus the 768 and 390 re-measurements, reveal/toggle/animation refutations, class census, inline-style and `data-*` inventory, codepoint audit, verbatim texts, and the 1440 `styleTable`/`nodes` mirrored from `start-cta.1440.json`.

## QA Exclusions
**none.** No video, no canvas, no carousel, no autoplay, no live counter, no third-party embed, no reveal — the section is pixel-static from first paint. Diff at the default 1.5 percent after scrolling it into view; no settle delay is required beyond layout. One capture caveat, not an exclusion: the reference tiles were taken by scrolling a 900 px (844 px at 390) viewport, so the fixed `#header` pill overlays the top of each tile — crop that band, not a section rect.
