# FeaturedCreatorsSection Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .sd-236` (`div.box.sd-236`) · DOM order 8 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/FeaturedCreatorsSection.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/` → `featured-creators-1440.png` + `-1440-b.png` (scrolled viewport tiles, section is 1012 px tall) · `featured-creators-768.png` + `-768-b.png` · `featured-creators-390.png` + `-390-b.png` · carousel positions `featured-creators-1440-pos2.png` (one step later), `featured-creators-1440-mid-step.png` (450 ms into a 1000 ms step) and `featured-creators-1440-paused.png` (play-toggle in the `play_arrow` state). All at dpr 1, so the fixed `#header` pill overlays each tile — crop it when diffing.
- **Interaction model:** mixed (time-driven + click + hover) — a 4500 ms autoplay carousel with prev / play-toggle / next buttons and a hover zoom on the cards. **No scroll-driven state: the 21 `appear` targets are visually inert (see States & Behaviors).**
- **Client component:** yes — needs an interval timer, `is-playing` state and DOM-order rotation state. No IntersectionObserver, no mouseenter/mouseleave handler.
- **Root rect @1440:** x 0, y 7936.109, w 1440, h 1012.063 · **@768:** 0, 8876.813, 768, 1005.984 · **@390:** 0, 9205.844, 390, 947.586
- **Sub-components:** the carousel (`sd-carousel.box.sd-244` + its 7 slides + `.sd-255` controls) is worth its own file, e.g. `FeaturedCreatorsCarousel.tsx`; the header block `.sd-237` and the three gradient overlays `.sd-266` / `.sd-268` / `.sd-270` stay in the wrapper.
- **Non-DOM content:** none — no canvas, no WebGL, no Lottie, no video, no iframe. Every glyph is ligature text.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs sd-236..270 'sd-244__content*' 'list-1*' --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/featured-creators.css` → 71 rules / 18069 bytes including the 1280 / 768 / 480 / 360 blocks. **Tokens: `sd-236..270`, `sd-244__content*`, `list-1*`.** Verified against `page.html`: the full class set inside `main > .sd-236` is `sd-236 sd-237 sd-238 sd-239 sd-240 sd-241 sd-242 sd-243 sd-244 sd-255 … sd-270`, `sd-244__content`, `sd-244__content__sd-1 … __sd-9`, `list-1`, `list-1__item`, `list-1__item__sd-1`, plus base classes `box text img icon material-icons sd-carousel__slide sd-carousel__controls sd-carousel__template` and theme classes `theme-b6b0338f theme-57a9da79 theme-a3931427`. `sd-245`–`sd-254` do not exist in this page. **`list-1*` is NOT in `app/studio-base.css` — it must be sliced or the tag pills lose their type scale and padding.** The base and theme classes are already in `app/studio-base.css` (lines 890–899 `sd-carousel`, 916/946/948/1007/1026/1044/1045 the themes) — **keep the `theme-*` classes in the markup**: `.sd-root .text.theme-XXXX` (0,3,0) beats `.sd-root .sd-NN` (0,2,0), so at ≤768 `theme-a3931427`'s `0.875rem` wins over `.sd-242 { font-size: 12px }` and the measured body copy is 14px, not 12px.

## DOM Structure
```
div.box.sd-236                                  section, flex column, align center, bg #ffffff, padding 96px 0
  div.box.sd-237                                header row, 1392 wide, margin 0 24px, padding 24px 0 96px, border-top 1px #e0e0e0, z-index 1
    h2.box.sd-238                               flex:1 row, gap 24, justify space-between
      span.text.sd-239.theme-b6b0338f           "Featured Creators" (eyebrow, fixed width 212)
      span.text.sd-240.theme-57a9da79           headline, flex:1, one literal <br>
    div.box.sd-241 > p.text.sd-242.theme-a3931427   448-wide copy column, no <br>
  div.box.sd-243                                carousel stage, width 100%, column, align center, position relative
    sd-carousel.box.sd-244                      TRACK — flex row, width 100vw, justify center, overflow hidden, padding 0 0 80px
      div.sd-carousel__slide.box.sd-244__content x7   direct children, width 380px, padding 0 24px, will-change transform
        a.box.sd-244__content__sd-1[.appear]          whole-card link, target _blank, radius 2px, height 100%, column, gap 16
          div.box.sd-244__content__sd-2                 image box, column, gap 16, overflow hidden
            img.img.sd-244__content__sd-3                 cover, width 100%, z-index -1   (+ noscript > img fallback, not rendered)
            div.box.sd-244__content__sd-4                 ABSOLUTE inset 0, z-index 1, 135deg gradient transparent 74% → rgba(0,0,0,.498) 100%
            div.box.sd-244__content__sd-5                 ABSOLUTE bottom 12 right 8, z-index 1, width 112, overflow hidden
              img.img.sd-244__content__sd-6                 maker logo SVG, width 100%, aspect-ratio 435/198
          div.box.sd-244__content__sd-7[.appear]        caption column, flex:1, gap 8, justify space-between
            h4.text.sd-244__content__sd-8                 article title
            div.box.sd-244__content__sd-9 > ul.box.list-1 > li.box.list-1__item > p.text.list-1__item__sd-1   one "#tag" pill
      div.box.sd-255.sd-carousel__controls        ABSOLUTE inset auto 0 0 0, z-index 3, height 24, padding-left 24
        div.box.sd-256                              row, justify center, gap 16
          button.box.sd-257[slot=prev]   > span.icon.sd-258.material-icons "keyboard_arrow_left"
          button.box.sd-259[slot=play-toggle] > div.box.sd-260[slot=pause] > span.icon.sd-261 "pause"
                                              AND div.box.sd-262[slot=play]  > span.icon.sd-263 "play_arrow"
          button.box.sd-264[slot=next]   > span.icon.sd-265.material-icons "keyboard_arrow_right"
      template.sd-carousel__template              the 5 authored slides (not rendered)
    div.box.sd-266 > div.box.sd-267             ABSOLUTE right edge fade, width 120, 90deg #f7f7f700 → #f7f7f7
    div.box.sd-268 > div.box.sd-269             ABSOLUTE left edge fade, width 120, 270deg #f7f7f700 → #f7f7f7
  div.box.sd-270                                ABSOLUTE bottom half, height 50%, z-index -1, 0deg #f7f7f7 → #ffffff
```
In `page.html` the slides live inside the `<template>` and `.sd-255` is the FIRST child of `<sd-carousel>`; the runtime clones the template into the light DOM ahead of the controls. `.sd-255` is `position: absolute`, so the order is irrelevant. `.sd-266` carries the origin's own `left: NaNpx` (ignored by the parser; `right: 0` positions it) — drop that declaration.

## Computed Styles (from getComputedStyle @1440 dpr 1, exact; full dump + rects in `featured-creators.1440.json`, `Sn` = its styleTable key)
- display: flex · flexDirection: column · alignItems: center · justifyContent: flex-start · position: relative · width: 1440px · height: 1012.06px · maxWidth: 100% · padding: 96px 0px · margin: 0px · backgroundColor: rgb(255, 255, 255) · transitionDuration: 0.3s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1) — **element:** `.sd-236` (S1) rect [0,0,1440,1012.06]
- width: 1392px · maxWidth: calc(100% - 48px) · margin: 0 24px · padding: 24px 0px 96px · borderTop: 1px solid rgb(224, 224, 224) (other sides 0) · flexDirection: row · justifyContent: space-between · alignItems: flex-start · gap: 24px · zIndex: 1 — **element:** `.sd-237` (S2) rect [24,96,1392,211]
- flexBasis: 0% (flex:1) · flexDirection: row · justifyContent: space-between · gap: 24px — **element:** `.sd-238` (S3) `<h2>` rect [24,121,920,90]; fontFamily on every `.text` is `Inter, "Noto Sans JP"`
- fontSize: 12.96px (theme 0.81rem) · fontWeight: 500 · lineHeight: 14.256px · letterSpacing: -0.5184px · color: rgb(34, 34, 34) · width: 212px · overflowX: hidden — **element:** `.sd-239` (S4) rect [24,121,212,14.25]
- fontSize: 36px (theme 2.25rem) · fontWeight: 600 · lineHeight: 45px · letterSpacing: normal · color: rgb(34, 34, 34) · fontFeatureSettings: "palt" · flexBasis: 0% · overflowX: hidden — **element:** `.sd-240` (S5) rect [260,121,684,90]
- width: 448px · flexDirection: row · alignItems: center · gap: 0px (`.sd-241`, S7, rect [968,121,448,76.78]) · child fontSize: 16px · fontWeight: 400 · lineHeight: 25.6px · color: rgb(112, 112, 112) · fontFeatureSettings: "palt" — **element:** `.sd-242` (S8) rect [968,121,448,76.78]
- display: flex · flexDirection: row · flexWrap: nowrap · justifyContent: center · alignItems: stretch · width: 1440px (declared `100vw`) · maxWidth: 1440px · padding: 0px 0px 80px · overflow: hidden · transitionTimingFunction: cubic-bezier(0, 0, 0.99, 0.98) — **element:** `.sd-244` (S10, the `<sd-carousel>`) rect [0,307,1440,609.06]
- width: 380px · height: 529.06px · padding: 0px 24px · flexDirection: column · alignItems: flex-end · overflow: hidden · position: relative · outlineOffset: -4px · willChange: transform · transitionProperty: transform · transitionTimingFunction: cubic-bezier(0.25, 0.1, 0.1, 1) (no duration at rest — the runtime writes `transition-duration: 1000ms` inline only during a step) — **element:** `.sd-244__content` (S11), 7 nodes at x −610, −230, 150, 530, 910, 1290, 1670
- width: 332px · height: 529.06px · flexDirection: column · justifyContent: center · rowGap: 16px · borderRadius: 2px · overflow: hidden · cursor: pointer · transitionDuration: 0.6s · transitionDelay: 0.6s (from `.appear`; 0.3s / 0s once the class is dropped) — **element:** `.sd-244__content__sd-1` (S12)
- width: 332px · height: 442.66px · flexDirection: column · justifyContent: center · rowGap: 16px · overflow: hidden · `.sd-244__content__sd-3` (S14) — width: 332px · height: 442.66px · objectFit: fill · zIndex: −1 · overflowX: clip · transitionDuration: 0.6s — **element:** `.sd-244__content__sd-2` (S13)
- position: absolute · inset: 0 · zIndex: 1 · backgroundImage: linear-gradient(135deg, rgba(0, 0, 0, 0) 74%, rgba(0, 0, 0, 0.498) 100%) — **element:** `.sd-244__content__sd-4` (S15)
- position: absolute · top: 379.688px · right: 8px · bottom: 12px · left: 212px · width: 112px · height: 50.98px · zIndex: 1 · overflowX: hidden · borderRadius: 0px · gap: 8px · `.sd-244__content__sd-6` (S17) — width: 112px · aspectRatio: auto 435 / 198 · objectFit: fill — **element:** `.sd-244__content__sd-5` (S16)
- flexBasis: 0% (flex:1) · flexDirection: column · justifyContent: space-between · rowGap: 8px · width: 332px · height: 70.40px (`.sd-244__content__sd-7`, S18) · title fontSize: 16px · fontWeight: 600 · lineHeight: 24px · color: rgb(34, 34, 34) · fontFeatureSettings: "palt" — **element:** `.sd-244__content__sd-8` (S19)
- justifyContent: flex-end · alignItems: flex-end · gap: 16px (`.sd-244__content__sd-9`, S20, rect [x,822,332,14.4]) · `.list-1` (S21) flexBasis 0%, alignItems flex-end, justifyContent center · `.list-1__item` (S22) padding 0px, gap 8px, border 0px solid rgba(224,224,224,0) · label fontSize: 12px · fontWeight: 500 · lineHeight: 14.4px · color: rgb(112, 112, 112) — **element:** `.list-1__item__sd-1` (S23)
- position: absolute · inset: 585.06px 0px 0px 0px (declared `bottom:0; left:0; right:0; top:auto`) · zIndex: 3 · width: 1440px · height: 24px · paddingLeft: 24px · flexDirection: column · justifyContent: space-between · alignItems: center · columnGap: 24px · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0.05, 1). Fully visible, no opacity override. `.sd-256` (S30) width 1416, row, justifyContent **center**, columnGap 16 — **element:** `.sd-255` (S29) rect [0,892,1440,24]
- width: 56px · height: 24px · padding: 4px 20px (`.sd-259` has padding 0 and puts it on `.sd-260` / `.sd-262`) · border: 1px solid rgb(34, 34, 34) · borderRadius: 500px · backgroundColor: rgb(247, 247, 247) · cursor: pointer — **element:** `.sd-257` / `.sd-259` / `.sd-264` (S31/S33) at x 632 / 704 / 776, y 892
- fontFamily: "Material Icons" · fontSize: 14px · width/height: 14px · lineHeight: 14px · color: rgb(34, 34, 34); `.sd-263` is rgb(247, 247, 247) on `.sd-262`'s rgb(34, 34, 34) background. `.sd-260` (S34) display flex and `.sd-262` (S35) display none while playing, via `.sd-root sd-carousel[is-playing] [slot="play"] { display:none !important }` in `app/studio-base.css:895` — **element:** `.sd-258` / `.sd-261` / `.sd-263` / `.sd-265` (S32/S36)
- position: absolute · width: 120px · height: 609.06px · zIndex: 1 · `.sd-266` (S37) left 1320 with child `.sd-267` (S38) backgroundImage linear-gradient(90deg, rgba(247,247,247,0) 0%, rgb(247,247,247) 100%) · `.sd-268` (S39) right 1320 with child `.sd-269` (S40) linear-gradient(270deg, …) — **element:** the two edge fades, both `mix-blend-mode: normal`
- position: absolute · top: 506.03px · width: 1440px · height: 506.03px (50%) · zIndex: −1 · backgroundImage: linear-gradient(0deg, rgb(247, 247, 247) 0%, rgb(255, 255, 255) 100%) — **element:** `.sd-270` (S41), the bottom hand-off to `.sd-271`'s `#f7f7f7`

## States & Behaviors
### Autoplay step (time-driven, the core behavior)
- **Trigger:** `setInterval` every **4500 ms** while `<sd-carousel>` carries `is-playing`; also fired by a click on `.sd-264` (next) or `.sd-257` (prev).
- **State A (rest):** every `.sd-carousel__slide` has `transform: none`, `transition-duration: 0s`, no `data-animating*` attribute. Slide x @1440 = −610, −230, 150, 530, 910, 1290, 1670.
- **State B (stepping):** the runtime stamps `data-animatingNext` (or `data-animatingPrev`) on **all 7 slides** and writes `transition-duration: 1000ms` inline. `.sd-root [data-animatingNext].sd-244__content { transform: translateX(-100%) }` then moves every slide left by exactly one slide width (380 px @1440); the Prev rule is `translateX(100%)`.
- **State C (settle):** the attribute and the inline duration are removed (`transition-duration` back to `0s`), the transform snaps to `none`, and the light DOM rotates one position — head node dropped and a fresh clone appended for Next, tail dropped and a clone prepended for Prev — with no visible jump.
- **Transition:** `transform` / 1000 ms / `cubic-bezier(0.25, 0.1, 0.1, 1)` / delay 0. **This easing differs from `.sd-20`'s `cubic-bezier(0.58, 0.21, 0.41, 0.96)`.**
- **Evidence:** 50 ms polling across 11 s (`featured-creators.states.json` → `carouselRuntime.nextSample`). Steps start at t 1801 / 6301 / 10801 ms and settle at 2802 / 7301 ms — 4499 ms between settles. Sampled transforms −5.09 → −114.9 → −299.8 → −379.9 → snap to 0; DOM order rotated `感受性|安く|家族|LA発|デザイン|感受性|安く` → `安く|家族|LA発|デザイン|感受性|安く|家族`. `carouselRuntime.prevSample` shows the mirrored +1.62 → +379.76 with `data-animatingPrev` on all 7.
- **Slide count:** 5 authored items render as **7 nodes** (`data-max-length="7"`): a rotated view of the 5 uniques, so 2 of them appear twice per frame.
- **Implementation approach:** re-implement locally (see Shared components). Rotate an offset into the 5-item array, render 7 nodes as `items[(offset + i) % 5]`, and drive the step with `data-animatingNext` / `data-animatingPrev` on every slide plus an inline `transition-duration: 1000ms`, so the sliced CSS supplies the translate and easing.
### Hover does NOT stop autoplay
- **Trigger:** none — `<sd-carousel class="box sd-244">` has no `data-hover-stop` (live attribute list: `class`, `data-type`, `data-animate-duration`, `data-interval-duration`, `data-autoplay`, `data-max-length`, `data-sd-carousel-runtime-id`, plus runtime-added `aria-live="off"`, `is-playing`, `data-inited-carousel`).
- **Evidence:** the pointer parked on the centre card (720, 420 @1440; `elementFromPoint` = `box sd-244__content__sd-4`) for 11 000 ms with the section fully in view — the carousel advanced **2 steps**, DOM order `デザイ|感受性|安く、|家族と|LA発|デザイ|感受性` → `安く、|家族と|LA発|デザイ|感受性|安く、|家族と`. Repeated over `.sd-237` and over a card `<h4>`: 2 steps each time. **Do not pass `hoverStop` here.**
### Play-toggle click (`.sd-259`)
- **State A:** `is-playing` present · `aria-label="Stop automatic slide show"` · `.sd-260` display flex (`pause` glyph) · `.sd-262` display none.
- **State B:** `is-playing` removed · `aria-label="Play automatic slide show"` · `.sd-260` display none · `.sd-262` display flex, background rgb(34, 34, 34), glyph rgb(247, 247, 247). Verified: DOM order byte-identical across 7000 ms while paused.
- Toggling is purely adding/removing `is-playing` on `<sd-carousel>`; `app/studio-base.css:895` does the glyph swap. Keep the `slot="pause"` / `slot="play"` attributes and the `data-playing-label` / `data-paused-label` pair.
### Prev / next click
- From the paused state: `.sd-257` took `デザイ|感受性|安く、|家族と|LA発|デザイ|感受性` → `LA発|デザイ|感受性|安く、|家族と|LA発|デザイ`, and `.sd-264` took it straight back. Clicking either does **not** resume autoplay (`is-playing` stayed absent).
### Hover / focus states
- **`.sd-257` / `.sd-259` / `.sd-264`:** backgroundColor rgb(247, 247, 247) → rgb(34, 34, 34); child glyph (`.sd-258` / `.sd-261` / `.sd-263` / `.sd-265`) color rgb(34, 34, 34) → rgb(247, 247, 247); transition 0.3s cubic-bezier(0.4, 0.4, 0, 1).
- **`.sd-244__content__sd-3` (via `.sd-244__content__sd-1:hover`):** scale none → 1.05 (measured img rect 332×442.664 → 348.600×464.797), transition 600 ms cubic-bezier(0.4, 0.4, 0, 1) from `.sd-244__content__sd-3 { transition-duration: 600ms }`.
- **`.sd-244__content__sd-1:hover`** also declares `opacity: 1; --ha: 1` — no visible change. **`.sd-244__content:focus-visible`:** `outline: 2px solid black`, `outline-offset: -4px`.
- **Evidence:** `__cloneSnap.rules('main > .sd-236')` → 15 hits (all in `featured-creators.states.json` → `hoverRules`), each re-measured live with `getComputedStyle` (`hoverMeasured`). No other property changed on hover.
### Reveal (`appear`)
- **N/A — verified inert.** The 21 targets are 7 `.sd-carousel__slide[data-appear-manual]` (revealed by the carousel runtime), 7 `a.sd-244__content__sd-1.appear` and 7 `div.sd-244__content__sd-7.appear`. The only `.appear` declarations for these classes are `.sd-244__content__sd-1.appear { transition-delay: 600ms; transition-duration: 600ms; transition-timing-function: cubic-bezier(0.4,0.4,0,1) }` and, inside `@media (max-width: 768px)`, `.sd-244__content__sd-7.appear { transition-delay: 600ms }` — **no opacity, translate, scale or rotate anywhere**. Live check with the class present and after the runtime dropped it: `opacity: 1`, `translate: none`, `scale: none` in both cases. **Do not use the shared `Appear` wrapper here**; render the `appear` class literally on the 14 nodes if you want the timing parity, or omit it — it changes no painted pixel.
### Scroll — no scroll-driven state; nothing sticky or fixed inside the section.

## Per-State Content
The 5 authored slides, in `page.html` template order. Card link `.sd-244__content__sd-1` is `target="_blank"`. Covers are `.../s-1800x2400_v-frms_webp_<id>_small.webp` (intrinsic 450×600), logos `.../s-435x198_<id>.svg` (intrinsic 435×198).
| # | card href | cover id | maker logo id (alt) | tag |
|---|---|---|---|---|
| 1 | `https://studio.design/ja/interview/randysdonuts` | `763a3d0a-a1bb-4777-9374-bb8cfded6c18` | `92b31fb9-259d-479c-8982-de52d3dc4389` (`株式会社アイティプラス`) | `#中小企業` |
| 2 | `https://studio.design/ja/interview/baigie` | `aa92a579-a13d-42a8-b1a1-80728c51e38e` | `e2cbe5d4-5552-4a42-82d4-6d203601ad00` (`株式会社ベイジ`) | `#制作会社` |
| 3 | `https://studio.design/ja/interview/cockdoodoodoo` | `b79c8f44-1526-4a9f-a085-3b98cda1fcf2` | `93410cb5-a5a4-463a-a351-6aa6c4321fd2` (`クックドゥードゥードゥー`) | `#フリーランス` |
| 4 | `https://studio.design/ja/interview/maruigroup` | `9439ed80-0673-4ea0-8d70-bb5896116af0` | `7289a2af-6478-4af0-9946-d338f53889aa` (`株式会社マルイユナイト`) | `#エンタープライズ` |
| 5 | `https://studio.design/ja/blog/wosh-design` | `fc249913-5eed-41d5-84f4-2b148a64ec2f` | `8f40e704-c2b9-4ce3-9ef6-242bd31d5071` (`株式会社WOSH design`) | `#制作会社` |
## Assets
Directory: `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/`.
- Covers `s-1800x2400_v-frms_webp_<id>_small.webp` — verified via `img.currentSrc` as the resolution the origin loads at 1440, 768 and 390. Rendered 332×442.664 @1440 · 296×395 @768 · 276×368 @390, `object-fit: fill`, `z-index: -1`, no radius of their own (the 2px radius is on the `<a>` with `overflow: hidden`).
- Logos `s-435x198_<id>.svg` — rendered `width: 112px` / 50.977 tall @1440, `120px` @768, `100px` @390 (aspect-ratio 435/198).
- **Present (9 of 10):** covers `aa92a579`, `b79c8f44`, `9439ed80`, `fc249913`; logos `92b31fb9`, `e2cbe5d4`, `93410cb5`, `7289a2af`, `8f40e704`.
- **MISSING (1)** — url→path map in `extract/featured-creators.assets.json` for the orchestrator to fetch: cover `s-1800x2400_v-frms_webp_763a3d0a-a1bb-4777-9374-bb8cfded6c18_small.webp` (slide 1, ランディーズ・ドーナツ).
- Icons: `MaterialIcon` from `components/sites/studio-design-8a86c0e4/shared/icons.tsx` for `keyboard_arrow_left`, `pause`, `play_arrow`, `keyboard_arrow_right`. No Material Symbols and no inline SVG in this section.
- Layered composition inside each card: `img` (z −1) ← `.sd-244__content__sd-4` 135° dark gradient (z 1, inset 0) ← `.sd-244__content__sd-5` logo (z 1, bottom 12 / right 8). Over the whole track: `.sd-268` left fade and `.sd-266` right fade (z 1, 120 px), `.sd-255` controls (z 3), and behind everything `.sd-270` (z −1) fading the section's bottom half to `#f7f7f7`.
- Drop the inline `data:image/svg+xml` placeholder in `src` and the `<noscript>` fallbacks; point `src` at the local `_small.webp`.
## Text Content (verbatim)
Byte-checked with a codepoint script: no U+2028, U+2029, U+00A0, U+200B or U+FEFF anywhere. The dash in slide 3 is U+2500 ×2 (`──`), the quotes are U+201C / U+201D, and the space in slide 5's title is a plain U+0020.
- `span.text.sd-239.theme-b6b0338f`: `Featured Creators`
- `span.text.sd-240.theme-57a9da79`, one literal `<br>`: `創造の裏側を語る、` `<br>` `クリエイターたちのストーリー。`
- `p.text.sd-242.theme-a3931427`, no `<br>`: `日々の制作で培われた思考や工夫、プロジェクトを進めるうえでのこだわりを紹介。リアルなプロセスに触れることで、次の制作につながる学びや発見が生まれます。`
- `h4.text.sd-244__content__sd-8` ×5: `LA発「ランディーズ・ドーナツ」日本上陸を支えたサイト制作の舞台裏` · `デザインの本質は“映え”にあらず。枌谷力が見据えるWebデザインの行き先` · `感受性が導く、空想と現実のあわいへ──大橋絵里奈が描く“没入”のデザイン` · `安く、早く、で終わらせない。丸井グループのDXが向き合う内製化の“本質”とは` · `家族と仲間と猫と。 広がる景色、花開くデザイン`
- `p.text.list-1__item__sd-1` ×5: `#中小企業` · `#制作会社` · `#フリーランス` · `#エンタープライズ` · `#制作会社`
- `img.sd-244__content__sd-3` alt ×5 = `「<title>」のカバー画像` with the h4 title inserted verbatim.
- `img.sd-244__content__sd-6` alt ×5: `株式会社アイティプラス` · `株式会社ベイジ` · `クックドゥードゥードゥー` · `株式会社マルイユナイト` · `株式会社WOSH design`
- `button.sd-257` `aria-label="Prev Slide"` · `button.sd-264` `aria-label="Next Slide"` · `button.sd-259` `aria-label` toggles between `Stop automatic slide show` and `Play automatic slide show`, and also carries `data-playing-label="Stop automatic slide show"` / `data-paused-label="Play automatic slide show"`.
- Control glyph text: `keyboard_arrow_left`, `pause`, `play_arrow`, `keyboard_arrow_right` (all `aria-hidden="true"`).
- `<sd-carousel>` also carries `aria-live="off"` (added by the runtime).
## Responsive Behavior
- **Desktop (1440):** header is 2-up (`h2` 920 + copy 448), eyebrow 12.96px, headline 36px/45px in 684px (2 lines), copy 16px/25.6px in 448px (3 lines). Track spans the full 1440 (`width: 100vw`), 7 slides × 380 centred → first slide at x −610, so 3 full cards (x 150 / 530 / 910) plus two clipped halves. Card 332 wide, cover 332×442.664, title 16px/24px, tag 12px/14.4px with `.list-1__item` padding 0. Edge fades 120 px. Controls centred at x 632 / 704 / 776, y 892. Section height 1012.063.
- **Tablet (768):** `@media (max-width: 1280px)` sets `.sd-237 { flex-wrap: wrap }`, `.sd-238 { flex-direction: column }`, `.sd-241 { margin: 40px 0 0 }`, `.sd-244__content__sd-5 { width: 120px }`. `@media (max-width: 768px)` then sets `.sd-237 { padding: 24px 0 64px }`, `.sd-241 { width: 100%; margin: 0 }`, `.sd-242 { font-size: 12px }` (overridden to 14px/22.4px by `theme-a3931427`'s 0.875rem), `.sd-244 { width: 100%; padding: 0 0 56px }`, `.sd-244__content { width: 320px; padding: 0 12px }`, `.sd-244__content__sd-1 { flex: none; height: auto }`, `.sd-244__content__sd-8 { font-size: 0.81rem }` → 12.96px/19.44px, and `.sd-256 { width: auto }`. Headline stays 36px/45px. Track [0, 382, 768, 528]; 7 × 320 centred → first slide x −736. Edge fades 80 px. Controls at x 284 / 356 / 428, y 886. Section height 1005.984.
- **Mobile (390):** adds `@media (max-width: 480px)` — `.sd-236 { padding: 64px 0 }`, `.sd-237 { gap: 24px; padding: 24px 0 48px }`, `.sd-238 { gap: 24px }`, `.sd-244__content { width: 300px }`, `.sd-244__content__sd-5 { width: 100px }`, `.sd-244__content__sd-8 { font-size: 14px }` → 14px/21px (this *raises* it back above the 768 value), `.sd-244__content__sd-9 { gap: 4px }`, `.list-1__item { padding: 5px 12px }`, `.list-1__item__sd-1 { font-size: 11px }`, `.sd-266` / `.sd-268 { width: 30px }` with `.sd-267` / `.sd-269 { filter: blur(15px) }`, and `.sd-255 { justify-content: center; width: auto }`. Eyebrow 12px/13.2px (theme 0.75rem), headline 28px/35px (theme 1.75rem), copy 14px/22.4px. Track [0, 370, 390, 513]; 7 × 300 centred → first slide x −855, one full card at x 45. Controls at x 95 / 167 / 239, y 860. Section height 947.586.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`. `(max-width: 360px)` only re-asserts `display: flex` on `.sd-255` / `.sd-266` / `.sd-268` / `.sd-270` — no layout change.
## Shared components
- `MaterialIcon` from `components/sites/studio-design-8a86c0e4/shared/icons.tsx` — required for the four control glyphs (`class="icon … material-icons"`, font-family `"Material Icons"`, 14px).
- `Appear` from `shared/appear.tsx` — **not** required (see States & Behaviors).
- `SdCarousel` from `shared/carousel.tsx` — **does not match the origin.** Five concrete divergences: (1) it wraps the slides in an extra `<div class="box trackClassName">`, but the origin's slides are direct flex children of `<sd-carousel class="box sd-244">`, which is itself the `justify-content: center` track — the extra div would break the centring and the fixed 380/320/300 px slide widths; (2) it rotates an inline `style.order` and writes **no** `transform`, so the step is an instant reorder with zero motion — the origin translates every slide by `translateX(-100%)` for 1000 ms; (3) it renders exactly `slides.length` nodes, the origin renders `data-max-length` = 7 nodes from 5 uniques; (4) it never emits `data-animatingNext` / `data-animatingPrev`, which are the hooks the sliced CSS keys off; (5) its play-toggle is a `hidden` internal button and it exposes no prev/next — the origin's controls are the visible `.sd-255` bar and the glyph swap is driven by `is-playing` on the `<sd-carousel>` element via `app/studio-base.css:895`. The builder must not edit the shared file: implement `FeaturedCreatorsCarousel.tsx` locally against `featured-creators.states.json` → `carouselRuntime`. The already-merged `NextCreationCarousel.tsx` is the closest working model — the deltas are 5 uniques instead of 6, 1000 ms instead of 600 ms, 4500 ms instead of 3000 ms, easing `cubic-bezier(0.25, 0.1, 0.1, 1)`, centred controls, and **no hover-stop**.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/featured-creators.1440.json` (117 nodes, 41 style buckets, rootRect [0, 7936, 1440, 1012])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/featured-creators.768.json` (117 nodes, rootRect [0, 8877, 768, 1006])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/featured-creators.390.json` (117 nodes, rootRect [0, 9206, 390, 948])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/featured-creators.states.json` (carousel runtime model with 50 ms next/prev transform sampling, hover-stop probe, play-toggle and prev/next results, 15 pseudo-class rules, measured hover deltas, per-viewport geometry)

## QA Exclusions
The carousel autoplays every 4500 ms, so its band can never match frame-for-frame. Mask, relative to the section top:
- **@1440:** `x 0, y 307, w 1440, h 609` (the `.sd-244` track including the 80 px control gutter). The header block `y 0–307` diffs normally.
- **@768:** `x 0, y 382, w 768, h 528`.
- **@390:** `x 0, y 370, w 390, h 513`.
To diff the carousel deterministically instead, click `.sd-259` first (removes `is-playing`), wait 1200 ms and compare against `featured-creators-1440-paused.png`. `max-percent: 1.5` for the unmasked remainder.
