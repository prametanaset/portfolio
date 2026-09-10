# CreativeAssetsSection Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .sd-216` (`div.box.sd-216`) · DOM order 7 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/CreativeAssetsSection.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/` → `creative-assets-1440.png` (whole section fits one 1440×900 tile) + `-1440-b.png` (bottom-aligned tile, black run-out to the next section) · `creative-assets-768.png` + `-768-b.png` · `creative-assets-390.png` + `-390-b.png` + `-390-c.png` · `creative-assets-1440-hover-cta.png` (`a.sd-229` hovered 900 ms, transition settled). All are scrolled viewport tiles at dpr 1, so the fixed `#header` pill overlays each one — crop it out when diffing.
- **Interaction model:** mixed(scroll + hover) — 2 IntersectionObserver `appear` reveals and one `:hover` on the single link. No click behaviour, no toggle, no carousel, no video, no sticky, no timer.
- **Client component:** yes (the two `appear` reveals need an IntersectionObserver; the hover is pure CSS)
- **Root rect @1440:** x 0, y 7159.95, w 1440, h 821.67 · **@768:** 0, 7523.94, 768, 1483.84 · **@390:** 0, 8293.70, 390, 912.14
- **Sub-components:** `Appear` ×2 from `shared/appear.tsx`; `MaterialSymbol` ×1 from `shared/icons.tsx`. 20 nodes — one file, no split.
- **Non-DOM content:** none. No video, no canvas, no Lottie, no iframe.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs sd-216..235 --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/creative-assets.css` — token **`sd-216..235`** only (47 rules, 8291 bytes), no wildcard needed. Verified against `page.html`: the live class set inside the section is exactly `box`, `text`, `img`, `icon`, `material-symbols-outlined`, `appear`, `theme-b6b0338f`, `theme-57a9da79`, `theme-a3931427` and `sd-217`…`sd-235` (root `sd-216`). Everything outside the `sd-NN` range is already in `app/studio-base.css`. Keep origin class names verbatim.

## DOM Structure
```
div.box.sd-216                                section, bg #000000ff, padding 96px 0, column, align center, gap 40
  div.box.sd-217                              header band, margin 0 24px, w 1920 / max-width calc(100% - 48px), row, justify space-between, gap 24
    h2.box.sd-218                             flex:1, row, justify space-between, gap 24
      span.text.sd-219.theme-b6b0338f         eyebrow "Creative Assets", w 212, overflow hidden
      span.text.sd-220.theme-57a9da79         headline, flex:1, contains one <br>
    div.box.sd-221                            w 448, padding-right 40, column, gap 8
      p.text.sd-222.theme-a3931427            body copy, no <br>
  div.box.sd-223                              card row, margin 0 24px, w 1920 / max-width calc(100% - 48px), row + wrap, gap 12
    div.box.sd-224.appear                     Studio.Stock card, flex:1, row, gap 12
      h3.box.sd-225                           w 100%, row, gap 12
        img.img.sd-226 + <noscript>           radius 4, aspect-ratio 1380/1000, overflow hidden
      div.box.sd-227                          ABSOLUTE inset 0, padding 24, row + wrap, justify space-between, align flex-end, gap 16
        p.text.sd-228                         two lines via one <br>
        a.box.sd-229[href target=_blank]      CTA pill, w 306, bg #f7f7f7, radius 4, 1px border, padding 11 12 11 24
          p.text.sd-230                       label, flex:1, overflow hidden
          div.box.sd-231                      24×24 icon mask, overflow hidden, justify flex-end, gap 4, padding-right 2
            span.icon.sd-232.material-symbols-outlined[aria-hidden]   "arrow_forward", rotate −45deg, translate 0 25px
            span.icon.sd-233.material-symbols-outlined[aria-label role=img] "arrow_forward", rotate −45deg
    h3.box.sd-234.appear                      Unsplash card, flex:1, row, gap 12
      img.img.sd-235 + <noscript>             radius 4, aspect-ratio 1380/1000, height 100%, overflow hidden
```
The two `<noscript>` blocks are inert with JS enabled — do not render them. `.sd-231` is 24 px wide while its content is 20+4+20 px, so `.sd-232` is clipped out to the left at rest and only `.sd-233` shows.

## Computed Styles (from getComputedStyle @1440 dpr 1, exact; rects are `[page-x, section-relative-y, w, h]`)
### `.sd-216` (S1) — rect [0, 0, 1440, 821.67]
- display: flex
- flexDirection: column
- alignItems: center
- alignContent: center
- justifyContent: flex-start
- flexWrap: nowrap
- rowGap: 40px
- columnGap: 40px
- width: 1440px
- maxWidth: 100%
- height: 821.672px
- padding: 96px 0px
- margin: 0px
- position: relative
- backgroundColor: rgb(0, 0, 0) (declared `#000000ff`)
- transitionDuration: 0.3s
- transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1)
- `.sd-216 > *` sets `--gap-h: 0px; --gap-v: 40px`
### `.sd-217` [24, 96, 1392, 90] / `.sd-218` [24, 96, 920, 90] / `.sd-221` [968, 96, 448, 76.78]
- sd-217: width 1920px → 1392px via maxWidth calc(100% - 48px) · margin: 0px 24px · rowGap/columnGap: 24px · justifyContent: space-between · alignItems: flex-start · borderWidth 0px, borderColor rgb(51, 51, 51) (nothing painted)
- sd-218: flex: 1 1 0% · flexDirection: row · justifyContent: space-between · gap: 24px · padding: 0px
- sd-221: width: 448px · paddingRight: 40px · flexDirection: column · alignItems: flex-start · rowGap: 8px
### Text — `.sd-219` (theme-b6b0338f) [24, 96, 212, 14.25] · `.sd-220` (theme-57a9da79) [260, 96, 684, 90] · `.sd-222` (theme-a3931427) [968, 96, 408, 76.78] · `.sd-228` [48, 658.48, 166.59, 43.19] · `.sd-230` [409, 669.27, 232, 16.8]
- fontFamily: `Inter, "Noto Sans JP"` on all five (`--s-font-5489e031`)
- fontSize: 12.96px / 36px / 16px / 18px / 14px · lineHeight: 14.256px / 45px / 25.6px / 21.6px / 16.8px · fontWeight: 500 / 600 / 400 / 500 / 500
- letterSpacing: -0.5184px on sd-219, normal on the other four · fontFeatureSettings: `"palt"` on sd-220, sd-222, sd-228, sd-230; normal on sd-219
- color: rgb(247, 247, 247) on sd-219, sd-220, sd-228 (`--s-color-56baa902 #f7f7f7`) · rgb(172, 172, 172) on sd-222 (`--s-color-80b83c36 #acacacff`) · rgb(34, 34, 34) on sd-230 (`--s-color-99a91143 #222222ff`)
- textAlign: left everywhere · alignItems: center · sd-219, sd-220 and sd-230 also carry overflow: hidden
- **A `theme-*` rule DOES beat an `.sd-NN` rule here:** the theme selectors are `.text.theme-XXXX` (0,2,0) against `.sd-222` (0,1,0). `.sd-222` declares `font-size:16px` base and `font-size:12px` inside `@media (max-width: 768px)`; `.text.theme-a3931427` declares `1rem` base and `0.875rem` at ≤768 and ≤480. Measured computed font-size is 16px @1440, **14px @768 and 14px @390** — the theme wins, the 12px rule is dead on the origin too. `app/studio-base.css:948/1007/1045` reproduces this at (0,3,0) vs the slice's (0,2,0), same winner: do not "fix" it.
### Cards `.sd-223` [24, 226, 1392, 499.67] · `.sd-224` and `.sd-234` [24 / 726, 226, 690, 499.67] · `.sd-225` [24, 226, 690, 499.67]
- sd-223: width 1920px → 1392px via maxWidth calc(100% - 48px) · margin: 0px 24px · flexWrap: wrap · rowGap/columnGap: 12px · alignItems: stretch · `> *` sets `--gap-h: 12px; --gap-v: 12px`
- sd-224 / sd-234: flex: 1 1 0% · flexDirection: row · gap: 12px · padding: 0px · backgroundColor: rgba(0, 0, 0, 0) · minWidth: auto
- sd-225: width 100% · flexDirection: row · gap: 12px
### Images `.sd-226` [24, 226, 690, 499.67] and `.sd-235` [726, 226, 690, 499.67]
- width: 100% (sd-235 also height: 100%) · aspectRatio: auto 1380 / 1000 · objectFit: fill · borderRadius: 4px · overflow: hidden · flex: 0 0 auto · maxWidth: 100%
- **Neither uses the `image` / `image__bg-container` custom-property machinery.** No element in the section has a `background-image` and no `::before`/`::after` in the section has `content` — verified by enumerating every descendant. The dark vignette over both pictures is baked into the source files.
### Overlay `.sd-227` [24, 226, 690, 499.67] and CTA `.sd-229` [384, 653.67, 306, 48]
- sd-227: position: absolute · inset: 0px · padding: 24px · flexWrap: wrap · justifyContent: space-between · alignItems: flex-end · rowGap/columnGap: 16px · backgroundColor: rgba(0, 0, 0, 0) · minWidth: 0px
- sd-229: width: 306px · height: 48px · padding: 11px 12px 11px 24px · border: 1px solid rgb(247, 247, 247) · borderRadius: 4px · backgroundColor: rgb(247, 247, 247) · justifyContent: space-between · alignItems: center · columnGap: 12px · cursor: pointer
- `.sd-231` [653, 665.67, 24, 24]: width 24px · height 24px · paddingRight: 2px · justifyContent: flex-end · columnGap: 4px · overflow: hidden
- `.sd-232` [626.86, 688.53, 28.28, 28.28] and `.sd-233` [650.86, 663.53, 28.28, 28.28]: fontFamily `"Material Symbols Outlined"` · fontSize 20px · lineHeight 20px · width/height 20px (the 28.28 rect is the rotated bounding box) · fontVariationSettings `"FILL" 0, "wght" 400` · fontFeatureSettings `"liga"` · color rgb(34, 34, 34) · rotate: -45deg on both · translate: **0px 25px on sd-232**, none on sd-233 · transformOrigin: 10px 10px

## States & Behaviors
### Reveal `appear` ×2 — `.sd-224` and `.sd-234`
- **Trigger:** IntersectionObserver, **threshold 0, no negative rootMargin**. Stepped-scroll probe (25 px steps, viewport 1440×900) fired at scrollY 6525 with the element top at viewport y 876.95 of 900 — 4.61 % of the 499.67 px element visible, i.e. the instant its top crosses the viewport bottom.
- **State A:** opacity: 0; translate: 0px 16px; transition-delay: 0.4s; transition-duration: 0.8s; transition-timing-function: cubic-bezier(0.2, 1, 1, 1). **State B:** opacity: 1; translate: none; back to the base 0.3s cubic-bezier(0.4, 0.4, 0, 1). Mid-flight sample: opacity 0.405461, translate 0px 9.51262px.
- Both elements reveal on the same rule with the same 400 ms delay / 800 ms duration — there is **no stagger** between the two cards.
- **Evidence:** rules `.sd-root .sd-224.appear` / `.sd-root .sd-234.appear` in the slice; after a full-page scroll `querySelectorAll('.appear,[data-appear-manual],.appear-active')` inside the section returned 0/0/0 and `[data-inited-appear]` returned exactly 2. The runtime removes the `appear` class, keeps the empty `data-appear` + `data-inited-appear` attributes and writes an inline `transition: 0.8s cubic-bezier(0.2, 1, 1, 1) 0.4s, --g-angle, …` — reveal is once-only.
- **Implementation approach:** `Appear` from `shared/appear.tsx`, `as="div"` for `.sd-224` and `as="h3"` for `.sd-234`, `rootMargin="0px"` (override the component default `0px 0px -10% 0px`), `threshold={0}`, `activeClass={false}`, `once` default.
### Hover `a.sd-229` — the only hover in the section
- **Trigger:** CSS `:hover` on `a.sd-229`, pointer only. Measured with `page.hover` + 900 ms settle at 1440×900.
- **State A → State B:** `.sd-229` backgroundColor rgb(247, 247, 247) → **rgba(34, 34, 34, 0.65)** (border stays rgb(247,247,247) 1px) · `.sd-230` color rgb(34, 34, 34) → rgb(247, 247, 247) · `.sd-231` color rgb(51, 51, 51) → rgb(247, 247, 247) · `.sd-232` color rgb(34,34,34) → rgb(247,247,247) and translate `0px 25px` → **`24px`** (rect [626.86, 548.48] → [650.86, 523.48] at that scroll position) · `.sd-233` color rgb(34,34,34) → rgb(247,247,247) and translate `none` → **`24px -24px`** (rect [650.86, 523.48] → [674.86, 499.48]). `rotate: -45deg` is restated in the hover rules and never changes. Net effect inside the 24×24 `overflow: hidden` mask: the resting arrow exits up-right while the hidden arrow slides in from below-left to take its place.
- **Transition:** the inherited base `all 0.3s cubic-bezier(0.4, 0.4, 0, 1)` on all five nodes (transition-duration 0.3s, transition-delay 0s). No per-element override.
- **Evidence:** `__cloneSnap.rules('main > .sd-216')` → **8 hits, all `.sd-229:hover*`** (`extract/creative-assets.states.json` → `cssRuleHits`); live before/after in `states.hoverCta`; screenshot `creative-assets-1440-hover-cta.png`.
- **Implementation approach:** CSS only — the sliced `.sd-root .sd-229:hover …` rules do all of it; add no React state.
### Hover / focus states elsewhere
N/A — verified: the 8 `rules()` hits are all `.sd-229:hover*`; no `:focus`, no `:active`, no `@keyframes`. Pointer parked over the Studio.Stock card (300,300), the Unsplash image (1000,300) and the heading band (200,60) for 700 ms each produced a byte-identical snapshot of opacity / translate / filter / transform / scale / border-radius / background-color / color on `.sd-226`, `.sd-235`, `.sd-224`, `.sd-234`, `.sd-228`, `.sd-227`, `.sd-218` — **the "hover on whatever links out to Unsplash" hypothesis is refuted; the Unsplash card is not a link and has no hover.** `__cloneSnap.animations('main > .sd-216')` → `{count: 0}`.
### Section edges (page-level assembly)
Butt joins on both sides, no margin, no border, no negative offset, no overlap: `main > .sd-133` bottom = `.sd-216` top = **7159.95** and `.sd-216` bottom = `main > .sd-236` top = **7981.62** @1440 (7523.94 / 9007.78 @768; 8293.70 / 9205.84 @390). Both neighbours are `rgb(255, 255, 255)`; `main` is transparent and `body` is `rgb(247, 247, 247)`. The black is `.sd-216`'s own `background-color` plus its `96px 0px` padding (`64px 0px` ≤480), so the first content row starts 96 px below the white/black seam and the last row ends 96 px above the black/white seam. Nothing bleeds past the element box.

## Per-State Content
N/A — single state.

## Assets
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1380x1000_v-fms_webp_53907708-1354-4a2c-a2a2-3148a83aacbc_middle.webp` — `img.sd-226`, alt "Studio Stock", intrinsic 1200×869, object-fit fill, rendered 690×499.67 @1440 and 720×521.40 @768.
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1380x1000_v-fms_webp_84a9bfbf-876e-4ccc-93ff-df84b35b5de2_middle.webp` — `img.sd-235`, alt "Unsplash", intrinsic 1200×869, object-fit fill, rendered 690×499.67 @1440 and 720×521.40 @768.
- Icons: `MaterialSymbol name="arrow_forward"` from `components/sites/studio-design-8a86c0e4/shared/icons.tsx` for `.sd-232` (it hard-codes `aria-hidden="true"`, which matches the origin). `.sd-233` must be a plain `<span className="icon material-symbols-outlined sd-233" aria-label="新規タブで開く" role="img">arrow_forward</span>` — `MaterialSymbol` cannot express `aria-label` + `role`. Both are 20×20 ligature text in "Material Symbols Outlined".
- Layered composition: `div.sd-227` is an absolute inset-0 overlay on top of `img.sd-226` inside `div.sd-224` (which is `position: relative`, `overflow: visible`) — it holds the caption bottom-left and the CTA bottom-right, and it is what intercepts pointer events over that card. `.sd-234` has no overlay. No z-index anywhere in the section (all 0/auto).
- MISSING: the two `_small.webp` variants the runtime serves at ≤480 — listed in `extract/creative-assets.assets.json` (`s-1380x1000_v-fms_webp_53907708-…_small.webp` and `s-1380x1000_v-fms_webp_84a9bfbf-…_small.webp`, intrinsic 600×434 each). The `_middle` files are on disk and in `assets.manifest.json`; a single-`src` clone using `_middle` at every width is visually identical at dpr 1.

## Text Content (verbatim)
- `span.sd-219`: `Creative Assets`
- `span.sd-220`: `Studio内で使える、<br>多彩なクリエイティブアセット。`
- `p.sd-222`: `新しく登場したStudio.Stockをはじめ、Unsplashや手持ちの素材も使用可能。多彩なビジュアルをStudio上で自由に取り込めます。` (no `<br>`)
- `p.sd-228`: `クリエイターのための<br>次世代フォトストック`
- `p.sd-230`: `Studio.Stockをみる`
- `span.sd-232`: `arrow_forward` (`aria-hidden="true"`) · `span.sd-233`: `arrow_forward` (`aria-label="新規タブで開く"`, `role="img"`)
- `a.sd-229`: `href="https://stock.studio.design/"`, `target="_blank"`, **no `rel` attribute on the origin** (`a.rel` reads `""`) — reproduce it verbatim, do not add `rel="noopener"`. It is the only link in the section.
- `img.sd-226` alt: `Studio Stock` · `img.sd-235` alt: `Unsplash`
- Byte-check: every text node in the section was scanned against `page.html` for U+2028, U+2029, U+00A0, U+200B, U+200E, U+200F, U+FEFF, U+3000 and U+2060 — **zero hits**. All punctuation is the full-width `、` and `。`; `Studio.Stock` uses an ASCII full stop.

## Responsive Behavior
- **Desktop (1440):** one row of two equal `flex: 1 1 0%` cards, 690 px each with a 12 px gap inside a 1392 px `.sd-223`. Header band is a single row: eyebrow 212 px + headline 684 px inside `h2.sd-218` (920 px), then the 448 px paragraph column right-aligned by `justify-content: space-between`. Section padding 96px 0, section gap 40. Section height 821.67.
- **Tablet (768):** `@media (max-width: 1280px)` wraps `.sd-217` (`flex-wrap: wrap`, `--gap-v: 24px`) and turns `.sd-218` into a column, and gives `.sd-221` `margin: 40px 0px 0px`; `@media (max-width: 768px)` then resets `.sd-221` to `flex: none; margin: 0px; width: 100%` and stacks the cards — `.sd-223 { flex-direction: column; flex-wrap: nowrap }` with `.sd-224`/`.sd-234` at `width: 100%`. Measured: eyebrow 212×14.25 at y 96, headline 464.98×90 at y 134.25, paragraph 680×44.80 at y 248.25 (font-size 14px, from the theme, not the dead `.sd-222 { font-size: 12px }`), cards 720×521.40 at y 333.05 and 866.45. Images still resolve to `_middle.webp`. Section height 1483.84.
- **Mobile (390):** `@media (max-width: 480px)` sets `.sd-216 { padding: 64px 0px }`, `.sd-217`/`.sd-218` gap 24, `.sd-223` gap 16, turns the overlay into a column (`.sd-227 { flex-direction: column; align-items: flex-start; justify-content: space-between; padding: 16px }`) and makes the CTA full width (`.sd-229 { flex: none; width: 100%; padding: 10px 8px 9px 20px }` → measured 310×45). Theme sizes drop: eyebrow 12px / letter-spacing −0.48px, headline 28px / line-height 35px. Measured: header 342×233.39 at y 64, cards 342×247.38 at y 337.39 and 600.77, CTA at y 523.77. Images resolve to `_small.webp` (intrinsic 600×434). Section height 912.14.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)` — all present in the slice. **`(max-width: 360px)` contains no rule for this section**, so 360 renders exactly like 390.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/creative-assets.1440.json` · `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/creative-assets.768.json` · `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/creative-assets.390.json` — 20 nodes / 19 style buckets each, `next: null`
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/creative-assets.states.json` — section edges at all three widths, the 8 CSSOM pseudo-class hits, the appear threshold probe and before/mid/after, the CTA hover before/after, the three negative hover probes, the theme-vs-`.sd-NN` cascade finding, image variant resolution, the full 40-property style dump per element at 1440/768/390, plus the @1440 nodes + styleTable
- Missing-asset list: `creative-assets.assets.json` in the same directory — the two `_small.webp` variants

## QA Exclusions
none — the section is fully static once revealed: no video, no canvas, no autoplaying carousel, no live counter, no third-party embed, and `getAnimations()` over the whole subtree returns 0. Diff it with the pointer parked outside the section (the `.sd-229` hover changes 5 nodes over 300 ms) and after the two `appear` reveals have settled. The fixed `#header` pill overlaps the top of every screenshot tile — crop rows 0…96 @1440, 0…80 @768 and 0…64 @390 rather than excluding a rect inside the section.
