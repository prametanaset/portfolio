# HeroDesignEditor Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .sd-3` (`div.box.sd-3`) · DOM order 2 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/HeroDesignEditor.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/hero-1440.png` (viewport slice y 0–900), `hero-1440-slice2.png` (slice at scrollY 400 → page y 400–1300), `hero-768.png`, `hero-390.png`
- **Interaction model:** static — plus one one-shot `appear` reveal on load (verified; see States & Behaviors)
- **Client component:** yes — only because the 3 `appear` targets need the shared IntersectionObserver `Appear` wrapper. There is no other state, no handler, no timer.
- **Root rect @1440:** x 0, y 0, w 1440, h 1300.49 · **@768:** 0, 0, 768, 849.97 · **@390:** 0, 0, 390, 642.23
- **Sub-components:** none. **Non-DOM content:** none — no canvas, no WebGL, no Lottie, no video, no iframe.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs sd-3 sd-4 sd-5 sd-6 sd-7 sd-8 sd-9 sd-10 sd-11 sd-12 --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/hero.css` — class prefixes **`sd-3` `sd-4` `sd-5` `sd-6` `sd-7` `sd-8` `sd-9` `sd-10` `sd-11` `sd-12`** (verified against `page.html`: those 10 are the complete set inside `main > .sd-3`; the next sibling starts at `sd-13`). Yields 22 rules / 3911 bytes including the 768 / 480 / 360 blocks. Keep the origin class names verbatim.

## DOM Structure
```
div.box.sd-3                                   section, position relative (base .box rule), bg #f7f7f7
  div.box.sd-4                                 column, padding-top 152px, margin 0 24px, gap 56px
    div.box.sd-5                               copy column, width 920, gap 24px, justify-content center
      h1.box.sd-6.appear                       column, gap 24px, width 742
        span.text.sd-7                         "Design Editor" (eyebrow)
        span.text.sd-8                         headline, 60px/1.1
      p.text.sd-9.appear                       3 lines separated by 2 literal <br>
    div.box.sd-10                              image frame, width 100%, margin-bottom -60px
      img.img.sd-11.appear                     single <img>, aspect-ratio 3568/2223, radius 8px
      noscript > img.img.sd-11                 no-JS fallback (`_small.webp`), not rendered
  div.box.sd-12                                ABSOLUTE overlay, bottom 0, height 400, z-index 1, white top-fade gradient
```
Only one image, no layered composition. `.sd-12` sits above `.sd-10` (z-index 1 vs the base `.img { z-index: 0 }`) and fades the bottom 400px of the artwork into white so the next section (`.sd-13`, bg #fff) joins seamlessly.

## Computed Styles (exact, from getComputedStyle @1440)
### `.sd-3` (S1 in `hero.1440.json`)
- display: flex · flexDirection: column · position: relative · alignItems: center · alignContent: center · justifyContent: flex-start
- width: 1440px · height: 1300.49px · maxWidth: 100% · padding: 0px · backgroundColor: rgb(247, 247, 247) (`var(--s-color-56baa902)` = `#f7f7f7`)
- transitionProperty: all (+ the 24 `--g-*` gradient customs) · transitionDuration: 0.3s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1)
### `.sd-4` (S2) rect [24,0,1392,1300.49]
- width: 1392px (declared `width:1920px`) · maxWidth: calc(100% - 48px) · marginLeft/marginRight: 24px
- paddingTop: 152px · rowGap/columnGap: 56px · flexDirection: column · alignItems: center · justifyContent: flex-start
### `.sd-5` (S3) rect [260,152,920,285.586]
- width: 920px · maxWidth: 100% · rowGap/columnGap: 24px · justifyContent: center · alignItems: center
### `.sd-6` (S4, the `<h1>`) rect [349,152,742,180]
- width: 742px · height: 180px · flexDirection: column · rowGap: 24px · alignItems: center
### `.sd-7` (S5, eyebrow) rect [661,152,118.234,24]
- fontFamily: Inter, "Noto Sans JP" (`var(--s-font-5489e031)`) · fontSize: 20px (declared 1.25rem) · fontWeight: 500
- lineHeight: 24px (1.2) · letterSpacing: -0.8px (-0.04em) · textAlign: left · color: rgb(85, 85, 85) (`--s-color-36ba82f0` = `#555555ff`)
### `.sd-8` (S6, headline) rect [349,200,742,132]
- fontSize: 60px · fontWeight: 600 · lineHeight: 66px (1.1) · letterSpacing: normal · textAlign: center · justifyContent: center
- color: rgb(34, 34, 34) (`--s-color-99a91143` = `#222222ff`) · fontFeatureSettings: "palt" · width: 742px · writingMode: horizontal-tb
### `.sd-9` (S7, body copy) rect [430,356,580.688,81.586]
- fontSize: 17px · fontWeight: 400 · lineHeight: 27.2px (1.60) · textAlign: center · color: rgb(85, 85, 85) · fontFeatureSettings: "palt"
- the two `<br>` children (S8) are display: block, boxSizing: content-box, position: static
### `.sd-10` (S9, image frame) rect [24,494,1392,866.906]
- width: 1392px (declared 100%) · height: 866.906px · marginBottom: -60px · rowGap/columnGap: 56px · flexDirection: column · alignItems: center
### `.sd-11` (S10, the `<img>`) rect [24,494,1392,866.906]
- width: 1392px (declared 100%) · height: auto · aspectRatio: auto 3568 / 2223 · borderRadius: 8px on all four corners
- overflowX/overflowY: clip · objectFit: fill · justifyContent: center
### `.sd-12` (S11, fade overlay) rect [0,900.492,1440,400]
- position: absolute · top: 900.492px · inset: 900.492px 0px 0px (declared `bottom:0; left:0; right:0; top:auto`) · height: 400px · width: 1440px · zIndex: 1
- backgroundImage: linear-gradient(0deg, rgb(255, 255, 255), rgba(255, 255, 255, 0.95) 29%, rgba(255, 255, 255, 0))
- flexDirection: column · alignItems: center · no content

## States & Behaviors
### `appear` reveal (3 targets, one-shot on load)
- **Trigger:** Studio's IntersectionObserver runtime. It stamps `data-appear=""` + `data-inited-appear=""` on `h1.sd-6`, `p.sd-9`, `img.sd-11` and then **removes the `appear` class** when they enter the viewport. Post-reveal DOM: `class="box sd-6"` / `"text sd-9"` / `"img sd-11"`. Fires once at load because the section is already in view at scrollY 0.
- **State A (before):** opacity: 0; translate: 0px 16px
- **State B (after):** opacity: 1; translate: none
- **Transition:** opacity + translate / 800ms / cubic-bezier(0.2, 1, 1, 1) / transition-delay 400ms (`.sd-6`, `.sd-9`) and 500ms (`.sd-11`), all declared on the `.appear` rules in the slice.
- **Evidence:** `transitionstart`/`transitionend` capture — `start box sd-6 appear visibility 0.8s 0.4s cubic-bezier(0.2,1,1,1)` @t 599, `start img sd-11 appear 0.8s 0.5s` @t 699, `end box sd-6 opacity elapsedTime 800ms` @t 2132, `end img sd-11 opacity elapsedTime 800ms` @t 2232 → the image lands 90ms after the text. Fine-grained polling shows opacity 0 → 0.095 → 0.50 → 0.999 → 1 with translate 16px → 0. Full event list in `extract/hero.states.json` → `appearReveal`.
- **Implementation approach:** `Appear` from `components/sites/studio-design-8a86c0e4/shared/appear.tsx` on the three nodes; keep the origin `appear` class so the sliced `.sd-6.appear` / `.sd-9.appear` / `.sd-11.appear` rules supply opacity, translate, duration, delay and easing.
### Scroll
- No scroll-driven state. Snapshot of `.sd-3` + all descendants (page-coordinate rect, opacity, translate, transform, backgroundImage, position) at scrollY 0 vs 200, 650 and 1300 with 600ms settle: **0 changed nodes** at every step. `.sd-12` is `position: absolute`, not fixed or sticky — it scrolls with the section.
### Hover / focus states
- N/A — verified three ways: `__cloneSnap.rules('main > .sd-3')` returned `{hits: [], total: 0}` (no `:hover`/`:focus`/`:active` rule matches any node); hovering `img`, `h1`, `p` and `.sd-12` for 700ms each changed 0 properties; `__cloneSnap.animations('main > .sd-3')` returned `{count: 0}`.
### Interactive elements
- None. `querySelectorAll('a, button, [role], sd-toggle, video, canvas, [data-toggle-trigger], [data-sd-carousel-runtime-id]')` inside `main > .sd-3` returned `[]` — **the hero has no CTA, no link, no toggle, no carousel and no video.**
### Fixed-header interaction
- `#header` (fixed, top 32, height 64) floats over the top 96px of this section and is a different component. The hero does not offset itself; it reserves the space with `.sd-4 { padding-top: 152px }` (136px at ≤480), so the band above the eyebrow is plain `#f7f7f7`. Render `.sd-3` at page y 0 with no top margin.

## Per-State Content
N/A — single state.

## Assets
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-3568x2223_v-frms_webp_c52ed059-0e43-4dc5-9f76-93f0d8aa2bb6_regular.webp` (65530 bytes, intrinsic 1800×1121) — the hero artwork, a single `<img class="img sd-11">`, rendered 1392×866.906 @1440 · 720×448.195 @768 · 342×212.609 @390, objectFit: fill, borderRadius 8px, `alt=""`, `fetchpriority="high"`, no `srcset`/`sizes`/`loading`.
  - Origin markup ships an inline SVG placeholder in `src` plus `data-sd-img-src=".../…c52ed059….jpg"`; the runtime swaps in the `_regular.webp` above. The clone points `src` straight at the local `_regular.webp` and drops the placeholder and the `<noscript>` fallback (`…_small.webp`).
- Icons: none.
- Layered composition: none — one image only. `.sd-12` is a CSS gradient `<div>`, not an asset.
- MISSING: none.

## Text Content (verbatim)
- `span.text.sd-7` (`h1 > span:nth-of-type(1)`): `Design Editor`
- `span.text.sd-8` (`h1 > span:nth-of-type(2)`): `あらゆる表現を可能にする次世代のデザインエディタ`
- `p.text.sd-9`, exactly three text nodes split by two literal `<br>`:
  `Studioのデザインエディタは、ノーコードで0から自由にデザインすることが可能。` `<br>` `ピクセル単位の微調整から、ダイナミックなアニメーションまで。 ` `<br>` `もうコードを書く必要も、テンプレートに縛られる必要もありません。`
  The second line ends with a trailing ASCII space before its `<br>` in `page.html` — keep it.
- `img.sd-11`: `alt=""` (decorative). No aria-label, no title, no href, no button label anywhere in the section.

## Responsive Behavior
- **Desktop (1440):** `.sd-4` padding-top 152, gap 56, margin 0 24 → 1392 wide. Copy column 920 wide, gap 24. Eyebrow 20px/24px, headline 60px/66px in a 742px box (2 lines), body 17px/27.2px (3 lines, 580.688 wide). Image 1392×866.906 at y 494, margin-bottom -60. Fade overlay 400px tall at y 900.492 with the 29% stop. Section height 1300.49.
- **Tablet (768):** same layout, smaller type — `@media (max-width: 768px)` in `css/main.css`: `.sd-7 { font-size:1rem }` → 16px/19.2px; `.sd-8 { font-size:3.25rem; width:632px }` → 52px/57.2px, box 632×114.391 (2 lines); `.sd-9 { font-size:0.94rem }` → 15.04px/24.064px, 513.742 wide; `.sd-12 { height:200px; background:linear-gradient(0deg,#ffffffff,rgba(255,255,255,0.95) 21%,#ffffff00) }` → overlay at y 649.969. `.sd-4` keeps padding-top 152 and gap 56, width 720. Image 720×448.195 at y 462. Section height 849.97.
- **Mobile (390):** adds `@media (max-width: 480px)`: `.sd-4 { gap:48px; padding:136px 0 0 }`, `.sd-10 { gap:48px }`, `.sd-7 { font-size:0.88rem }` → 14.08px/16.896px, `.sd-8 { font-size:2rem; width:394px }` → 32px/35.2px capped by `max-width:100%` to 342 wide × 105.586 (3 lines), `.sd-9 { font-size:0.88rem }` → 14.08px/22.528px, 342 wide × 135.141 (6 lines), `.sd-12 { height:48px; background:linear-gradient(0deg,#ffffffff,rgba(255,255,255,0.95) 11%,#ffffff00) }` → overlay at y 594.227. Image 342×212.609 at y 490. Section height 642.23. Body copy still centered, still 2 `<br>`; the lines wrap further.
- **≤360:** `@media (max-width: 360px)` changes only `.sd-12 { height:64px }` — the overlay grows back from 48 to 64. Not measured at a captured viewport; it is the single rule in that block for this section.
- **Breakpoints used:** `(max-width: 768px)`, `(max-width: 480px)`, `(max-width: 360px)`. `(max-width: 1280px)` contains no rule for these prefixes. All four are the only width media queries in `css/main.css`; full rule text in `extract/hero.states.json` → `breakpointRules`.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/hero.1440.json` (12 nodes, 11 style buckets)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/hero.768.json` (12 nodes)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/hero.390.json` (12 nodes)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/hero.states.json` (rules 0 hits, animations 0, hover diff, scroll diff, appear transition-event log, breakpoint rules, image resolution chain, header reservation, plus 13 pre-reveal/settled node measurements in `nodes` + `styleTable`)

## QA Exclusions
none — no video, canvas, counter or autoplaying element in this section. Diff the full section band (0,0,1440,1300 @1440 · 0,0,768,850 @768 · 0,0,390,642 @390) at the default 1.5 percent, after waiting for the `appear` reveal to settle (2.3s from load) so opacity is 1 and translate is `none` on `.sd-6`, `.sd-9` and `.sd-11`.
