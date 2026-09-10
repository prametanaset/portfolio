# NextCreationSection Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .sd-13` (`div.box.sd-13`) · DOM order 3 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/NextCreationSection.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/next-creation-1440.png`, `next-creation-768.png`, `next-creation-390.png`, plus carousel positions `next-creation-1440-pos2.png` (2 steps later), `next-creation-1440-mid-step.png` (280 ms into a 600 ms step) and `next-creation-1440-paused.png` (play-toggle in the paused/`play_arrow` state)
- **Interaction model:** mixed (time-driven + click + hover) — a 3000 ms autoplay carousel with prev / play-toggle / next buttons and hover states on slides and controls. **No scroll-driven state, no reveal animation.**
- **Client component:** yes — needs an interval timer, `is-playing` state, DOM-order rotation state and mouseenter/mouseleave handlers.
- **Root rect @1440:** x 0, y 1300.49, w 1440, h 747.297 · **@768:** 0, 850, 768, 743.695 · **@390:** 0, 642, 390, 680.547
- **Sub-components:** the carousel (`sd-carousel.box.sd-20` + its 7 slides + `.sd-35` controls) is worth its own file, e.g. `NextCreationCarousel.tsx`; the static copy block `.sd-14` stays in the wrapper.
- **Non-DOM content:** none — no canvas, no WebGL, no Lottie, no video, no iframe. Every glyph is ligature text.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs sd-13..44 'sd-20__content*' --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/next-creation.css` → 73 rules / 12813 bytes including the 1280 / 768 / 480 blocks. **Tokens: `sd-13..44` and `sd-20__content*`.** Verified complete: the full class set inside `main > .sd-13` is `sd-13 sd-14 sd-15 sd-16 sd-17 sd-18 sd-19 sd-20 sd-35 sd-36 sd-37 sd-38 sd-39 sd-40 sd-41 sd-42 sd-43 sd-44 sd-20__content sd-20__content__sd-1 … sd-20__content__sd-13` plus base classes `box text img icon material-icons material-symbols-outlined sd-carousel__slide sd-carousel__controls sd-carousel__template` and theme classes `theme-b6b0338f theme-57a9da79 theme-a3931427`. `sd-21`–`sd-34` do not exist in this page. The base and theme classes are already in `app/studio-base.css` (lines 890–899 for `sd-carousel`, 916/946/948/1007/1026/1044/1045 for the themes) — **do not drop the `theme-*` classes from the markup**: `.sd-root .text.theme-XXXX` is specificity 0,3,0 and beats `.sd-root .sd-NN` (0,2,0) for `font-size`/`line-height`.

## DOM Structure
```
div.box.sd-13                                    section, flex column, bg #ffffff, padding 96px 0, gap 64px, margin-bottom -1px
  div.box.sd-14                                  header row, 1392 wide, margin 0 24px, padding-bottom 24px, justify space-between
    h2.box.sd-15                                 flex:1 row, gap 24px, justify space-between
      span.text.sd-16.theme-b6b0338f             "Next Creation" (eyebrow, fixed width 212)
      span.text.sd-17.theme-57a9da79             headline, flex:1, one literal <br>
    div.box.sd-18 > p.text.sd-19.theme-a3931427  448-wide copy column (gap 8px) holding 2 lines split by one literal <br>
  sd-carousel.box.sd-20                          TRACK — flex row, 1392 wide, margin 0 24px, padding 0 26px 45px 0, overflow visible
    div.sd-carousel__slide.box.sd-20__content x7   direct children, width 39.16%, padding-right 26px, will-change transform
      a.box.sd-20__content__sd-1                     cover link, target _blank, radius 4px, overflow hidden
        img.img.sd-20__content__sd-2                   cover image, width 100%   (+ noscript > img fallback, not rendered)
      div.box.sd-20__content__sd-3                   caption row, flex-wrap wrap, gap 12px
        a.box.sd-20__content__sd-4                     URL link, flex:1, padding 8px 0, gap 4px
          p.text.sd-20__content__sd-5.theme-b6b0338f     the URL string
          div.box.sd-20__content__sd-6                   16x16 overflow-hidden arrow window, justify flex-end, holding
            span.icon.sd-20__content__sd-7 + __sd-8        two "arrow_forward" material-symbols-outlined (aria-hidden / role=img aria-label 新規タブで開く)
        div.box.sd-20__content__sd-9                   "Made by" cluster, justify space-between, gap 8px
          p.text.sd-20__content__sd-10.theme-b6b0338f    "Made by"
          a.box.sd-20__content__sd-11                    maker chip, 1px solid #eaeaea, radius 4px, overflow hidden, holding EITHER
            img.img.sd-20__content__sd-12                  maker logo (4 of 6 slides) — width 104px @1440, 72px @768/@390
            p.text.sd-20__content__sd-13                   OR maker name text (2 of 6 slides), padding 4px 8px
    div.box.sd-35.sd-carousel__controls            ABSOLUTE overlay, inset auto 0 0 0, z-index 3, padding-top 24px, height 50
      button.box.sd-36[slot=prev] > span.icon.sd-37.material-icons "keyboard_arrow_left"
      button.box.sd-38[slot=play-toggle] > div.box.sd-39[slot=pause] > span.icon.sd-40 "pause" AND div.box.sd-41[slot=play] > span.icon.sd-42 "play_arrow"
      button.box.sd-43[slot=next] > span.icon.sd-44.material-icons "keyboard_arrow_right"
  template.sd-carousel__template                 the 6 authored slides (not rendered)
```
In `page.html` the slides live inside the `<template>` and `.sd-35` is the FIRST child of `<sd-carousel>`; in the live DOM the runtime clones the template into the light DOM ahead of the controls. Because `.sd-35` is `position: absolute` the order is irrelevant.

## Computed Styles (exact, from getComputedStyle @1440 — full dump + rects in `next-creation.1440.json`; `Sn` = its styleTable key)
- display: flex · flexDirection: column · alignItems: center · justifyContent: flex-start · position: relative · width: 1440px · height: 747.297px · padding: 96px 0px · margin: 0px 0px -1px · rowGap/columnGap: 64px · backgroundColor: rgb(255, 255, 255) · transitionDuration: 0.3s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1) — **element:** `.sd-13` (S1) rect [0,0,1440,747.297]
- width: 1392px · maxWidth: calc(100% - 48px) · margin: 0 24px · paddingBottom: 24px · flexDirection: row · justifyContent: space-between · alignItems: flex-start · gap: 24px · border: 0px solid rgb(224, 224, 224) — **element:** `.sd-14` (S2) rect [24,96,1392,114]
- flexBasis: 0% (flex:1) · flexDirection: row · justifyContent: space-between · gap: 24px — **element:** `.sd-15` (S3) `<h2>` rect [24,96,920,90]
- fontFamily: Inter, "Noto Sans JP" · fontSize: 12.96px (theme 0.81rem) · fontWeight: 500 · lineHeight: 14.256px · letterSpacing: -0.5184px · color: rgb(85, 85, 85) · width: 212px · overflow: hidden — **element:** `.sd-16` (S4) rect [24,96,212,14.25]
- fontSize: 36px (theme 2.25rem) · fontWeight: 600 · lineHeight: 45px · letterSpacing: normal · color: rgb(34, 34, 34) · fontFeatureSettings: "palt" · flexBasis: 0% · overflow: hidden — **element:** `.sd-17` (S5) rect [260,96,684,90]
- width: 448px · flexDirection: column · rowGap: 8px — **element:** `.sd-18` (S7) rect [968,96,448,76.781]
- fontSize: 16px · fontWeight: 400 · lineHeight: 25.6px · color: rgb(85, 85, 85) · fontFeatureSettings: "palt" — **element:** `.sd-19` (S8) rect [968,96,448,76.781]
- display: flex · flexDirection: row · flexWrap: nowrap · width: 1392px · maxWidth: calc(100% - 48px) · margin: 0 24px · padding: 0px 26px 45px 0px · overflow: visible · alignItems: flex-start · justifyContent: flex-start · transitionTimingFunction: cubic-bezier(0, 0, 0.99, 0.98) — **element:** `.sd-20` (S10, the `<sd-carousel>`) rect [24,274,1392,377.297]
- width: 534.922px · maxWidth: 39.16% (declared `calc(39.16% - (var(--gap-h) * 0.61))`) · height: 100% · paddingRight: 26px · flexDirection: column · rowGap: 12px · outlineOffset: -4px · willChange: transform · transitionProperty: transform · transitionDuration: 0.6s · transitionTimingFunction: cubic-bezier(0.58, 0.21, 0.41, 0.96). Height is 323.055px on the 3 slides whose caption row fits one line, 332.227/332.297px on the 3 that wrap. — **element:** `.sd-20__content` (S11/S21/S27) rect [24,274,534.922,332.297]
- borderRadius: 4px · overflow: hidden · cursor: pointer · justifyContent/alignItems: center · `.sd-20__content__sd-2` (S13) — width: 508.922px · height: 279.055px · objectFit: fill · borderRadius: 0 · overflow: clip — **element:** `.sd-20__content__sd-1` (S12) rect [24,274,508.922,279.055]
- width: 508.922px · height 32px one-line / 41.172px wrapped · flexWrap: wrap · gap: 12px · alignItems: center · `.sd-20__content__sd-4` (S15) — flexBasis: 0% · padding: 8px 0px · gap: 4px · alignItems: flex-start · cursor: pointer — **element:** `.sd-20__content__sd-3` (S14/S22)
- fontSize: 12.96px · fontWeight: 500 · lineHeight: 14.256px · letterSpacing: -0.5184px · color: rgb(112, 112, 112) · `.sd-20__content__sd-6` (S17) — width: 16px · height: 16px · overflow: hidden · justifyContent: flex-end — **element:** `.sd-20__content__sd-5` (S16)
- color: rgb(34, 34, 34) · fontSize: 16px · rotate: -45deg · translate: 0px 16px (parked below the window) · `.sd-20__content__sd-8` — color: rgb(112, 112, 112) · fontSize: 16px · rotate: -45deg · translate: none (the visible arrow) — **element:** `.sd-20__content__sd-7`
- justifyContent: space-between · gap: 8px · `.sd-20__content__sd-11` (S20/S26) — border: 1px solid rgb(234, 234, 234) · borderRadius: 4px · overflow: hidden · gap: 8px · cursor: pointer — **element:** `.sd-20__content__sd-9` (S18/S25)
- width: 104px · height: auto · objectFit: fill · `.sd-20__content__sd-13` — color: rgb(112, 112, 112) · flex: 1 · padding: 4px 8px · textAlign: left — **element:** `.sd-20__content__sd-12`
- position: absolute · inset: 327.297px 0px 0px (declared `bottom:0; left:0; right:0; top:auto`) · zIndex: 3 · height: 50px · paddingTop: 24px · justifyContent: flex-end · alignItems: flex-end · columnGap: 16px · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0.05, 1). **Fully visible** — no opacity or visibility override: three white pills at x 1210 / 1284 / 1358, y 625, 19.703px below the tallest slide's caption row. — **element:** `.sd-35` (S38, controls bar) rect [24,601.297,1392,50]
- width: 58px · height: 26px · padding: 4px 20px (`.sd-38` has padding 0 and puts it on `.sd-39`/`.sd-41`) · border: 1px solid rgb(34, 34, 34) · borderRadius: 24px · backgroundColor: rgb(255, 255, 255) · cursor: pointer — **element:** `.sd-36` / `.sd-38` / `.sd-43` (S39/S41)
- fontFamily: "Material Icons" · fontSize: 16px · width/height: 16px · color: rgb(34, 34, 34); `.sd-42` is rgb(247, 247, 247) on `.sd-41`'s rgb(34, 34, 34) background. `.sd-39` (S42) display: flex and `.sd-41` (S43) display: none while playing, via `.sd-root sd-carousel[is-playing] [slot="play"] { display:none !important }`. — **element:** `.sd-37` / `.sd-40` / `.sd-42` / `.sd-44` (S40/S44)

## States & Behaviors
### Autoplay step (time-driven, the core behavior)
- **Trigger:** `setInterval` every **3000 ms** while `<sd-carousel>` carries `is-playing`; also fired by a click on `.sd-43` (next) or `.sd-36` (prev).
- **State A (rest):** every `.sd-carousel__slide` has `transform: none`, `transition-duration: 0s`, no `data-animating*` attribute. Slide x @1440 = 24, 559, 1094, 1629, 2164, 2699, 3234.
- **State B (stepping):** the runtime stamps `data-animatingNext` (or `data-animatingPrev`) on **all 7 slides** and writes `transition-duration: 0.6s` inline. The sliced rule `.sd-root [data-animatingNext].sd-20__content { transform: translateX(-100%) }` then moves every slide left by exactly one slide width (534.922 px @1440).
- **State C (settle):** on completion the light DOM rotates one position — the head node is dropped and a fresh clone of the new head is appended — the attribute is removed and `transition-duration` returns to `0s`, which snaps the transform back to `none` with no visible jump.
- **Transition:** `transform` / 600 ms / `cubic-bezier(0.58, 0.21, 0.41, 0.96)` / delay 0.
- **Evidence:** 100 ms polling across 7 s (`next-creation.states.json` → `carouselRuntime.step`). Start frame `matrix(1, 0, 0, 1, 0, 0)` at t 808 ms with all 7 `slideAttr` = `data-animatingnext`; sampled transforms −46.6618 → −139.263 → −304.167 → −452.38 → −515.476 → −534.922; DOM order rotated from `[portport, toyota, coalition, huuuu, ryden, ibaraki, portport]` to `[toyota, coalition, huuuu, ryden, ibaraki, portport, toyota]`. Steps land at t ≈ 800 and t ≈ 3800.
- **Slide count:** 6 authored items render as **7 nodes** (`data-max-length="7"`): a rotated view of the 6 uniques plus one trailing duplicate of the current head.
- **Implementation approach:** re-implement locally (see the SdCarousel note below). Rotate an offset into the 6-item array, render `[...rot, rot[0]]`, and drive the step with a `data-animatingNext` / `data-animatingPrev` attribute on every slide so the sliced CSS supplies the translate, duration and easing.
### Hover-stop
- **Trigger:** pointer entering anywhere in `<sd-carousel>` (`data-hover-stop`).
- **Evidence:** hovering slide 2's `<img>` for 7000 ms (> 2 intervals) left the DOM-order string byte-identical; the interval restarts on mouseleave. `is-playing` stays on — hover-stop suspends the timer, it does not toggle the play state.
### Play-toggle click (`.sd-38`)
- **State A:** `is-playing` present · `aria-label="Stop automatic slide show"` · `.sd-39` display flex (`pause` glyph) · `.sd-41` display none.
- **State B:** `is-playing` removed · `aria-label="Play automatic slide show"` · `.sd-39` display none · `.sd-41` display flex, background rgb(34, 34, 34), glyph rgb(247, 247, 247). Verified: no advance during 4000 ms while paused.
- Toggling is done purely by adding/removing `is-playing` on `<sd-carousel>`; `app/studio-base.css:895` does the glyph swap. Keep the `slot="pause"` / `slot="play"` attributes.
### Prev / next click
- `.sd-43` advances one position (`data-animatingNext`, head → tail); `.sd-36` reverses it (`data-animatingPrev` → `transform: translateX(100%)`). Verified: one next then one prev returned the DOM order to its original string. Clicking either does **not** resume autoplay when paused.
### Hover / focus states
- **`.sd-36` / `.sd-38` / `.sd-43`:** background rgb(255, 255, 255) → rgb(34, 34, 34); child glyph rgb(34, 34, 34) → rgb(247, 247, 247); transition 0.3s cubic-bezier(0.4, 0.4, 0, 1).
- **`.sd-20__content__sd-2` (via `.sd-20__content__sd-1:hover`):** filter none → brightness(0.9), scale 1 → 1.03, transition 500 ms cubic-bezier(0.07, 0.83, 0.41, 1.04).
- **`.sd-20__content__sd-4:hover`:** `.sd-20__content__sd-5` color rgb(112,112,112) → rgb(34,34,34); `.sd-20__content__sd-7` translate `0px 16px` → `16px 0px`; `.sd-20__content__sd-8` translate `none` → `16px -16px` — the two −45° arrows swap diagonally inside the 16×16 `overflow:hidden` window at 0.3s cubic-bezier(0.4, 0.4, 0, 1).
- **`.sd-20__content__sd-11:hover`:** `.sd-20__content__sd-12` scale → 1.05; `.sd-20__content__sd-13` color → rgb(34, 34, 34).
- **`.sd-20__content:focus-visible`:** `outline: 2px solid black` with `outline-offset: -4px`.
- **Evidence:** `__cloneSnap.rules('main > .sd-13')` → 22 hits (all listed in `next-creation.states.json` → `hoverRules`), each re-measured live with `getComputedStyle`.
### Reveal (`appear`)
- **N/A — verified.** The 7 `[data-appear-manual]` nodes are exactly the 7 `.sd-carousel__slide` nodes; none carries an `appear` class, computed `opacity: 1`, `translate: none`, `transition-property: transform`. No element in `main > .sd-13` has `appear` in `page.html`. **Do not use the shared `Appear` wrapper here.**
### Scroll
- No scroll-driven state. Nothing sticky or fixed; `.sd-35` is `position: absolute` inside `.sd-20` and scrolls with the section.

## Per-State Content
The 6 authored slides, in `page.html` template order. `sd-1`/`sd-4`/`sd-11` are all `target="_blank"`. Every cover image is `.../s-2160x1185_v-frms_webp_<id>_small.webp` and every logo `.../s-848x320_v-fs_webp_<id>_small.webp`.
| # | cover href = URL label | cover image id | cover alt | maker href | maker chip |
|---|---|---|---|---|---|
| 1 | `https://www.ryden.co.jp/` | `517b4553-7517-43e4-af28-4665974f4952` | `「ブランディングとデザインをつなげる \| 株式会社ライデン」のカバー画像` | `https://www.ryden.co.jp/` | logo `6b04161c-f78f-4182-a719-99c86befbadc`, alt `株式会社ライデン` |
| 2 | `https://hlt.pref.ibaraki.jp/` | `07257143-79e6-498b-b446-068ca6b688a9` | `「タイムトリップしよう、常陸国ロングトレイルで。｜茨城県のサイト」のカバー画像` | `https://www.re-d.jp/` | logo `e7f74aca-074d-4b9b-861a-f4157a59f054`, alt `株式会社アールイーデザイン` |
| 3 | `https://portport.jp/` | `ca321b68-f854-4fd0-9d93-2d9b1c7c2ad4` | `「PortPort Inc.」のカバー画像` | `https://shhh.jp/` | text `.sd-20__content__sd-13` = `株式会社Shhh` |
| 4 | `https://design.toyota-finance.co.jp/` | `0e5e06a9-3388-4e6d-9397-41803ecdd8c6` | `「TOYOTA FINANCE Design」のカバー画像` | `https://www.details.co.jp/` | logo `e62d5284-53c7-4c98-982c-636d5acf45d1`, alt `株式会社スタジオディテイルズ` |
| 5 | `https://recruit.coalition-group.jp/` | `8021dda9-ac8c-4b79-b6be-e929eeceb7d9` | `「Coalition Group Recruit Site」のカバー画像` | `https://www.funtech.inc/ja` | logo `ad6a68bc-bc19-4baa-9ffb-93a5f6574964`, alt `FunTech株式会社` |
| 6 | `https://huuuu.jp/` | `4c43e256-3dce-4e23-aa02-21c4f5631a23` | `「Huuuu｜編集の力で、今に風穴を」のカバー画像` | `https://eat-play-sleep.org/` | text `.sd-20__content__sd-13` = `株式会社Eat, Play, Sleep` |

## Assets
Directory: `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/`. All are `_small.webp` (the resolution the origin runtime actually loads at 1440, 768 and 390 — verified via `img.currentSrc`), intrinsic 600×329 for covers and 600×226 for logos.
- Covers render 508.92×279.055 @1440 · 307.12×168.40 @768 · 300.90×164.99 @390, `object-fit: fill`, `border-radius: 0` (the 4px radius is on the parent `<a>` with `overflow: hidden`).
- Logos render at `width: 104px` @1440 and `width: 72px` @768/@390, height auto.
- **Present:** `s-2160x1185_v-frms_webp_0e5e06a9-…_small.webp`, `…_8021dda9-…_small.webp`, `…_4c43e256-…_small.webp`.
- **MISSING (7)** — full url→path map in `extract/next-creation.assets.json` for the orchestrator to fetch: covers `517b4553`, `07257143`, `ca321b68`; logos `6b04161c`, `e7f74aca`, `e62d5284`, `ad6a68bc`.
- Icons: `MaterialIcon` from `components/sites/studio-design-8a86c0e4/shared/icons.tsx` for `keyboard_arrow_left`, `pause`, `play_arrow`, `keyboard_arrow_right`; `MaterialSymbol` for the two `arrow_forward` glyphs. **This section is the counter-example to `BEHAVIORS.md`'s "no page glyph uses Material Icons"** — the four control glyphs are `class="icon … material-icons"`, not Material Symbols.
- Layered composition: `.sd-35` (z-index 3) floats over the bottom 45px reserved by `.sd-20`'s `padding-bottom`.
- Drop the inline SVG placeholder in `src` and the `<noscript>` fallbacks; point `src` at the local `_small.webp`.

## Text Content (verbatim)
- `span.text.sd-16.theme-b6b0338f`: `Next Creation`
- `span.text.sd-17.theme-57a9da79`, one literal `<br>`: `細部まで思い通りに仕上げる、` `<br>` `新たな制作体験。`
- `p.text.sd-19.theme-a3931427`, one literal `<br>`: `レイアウトからフォント、アニメーションまで。` `<br>` `クリエイターが求める自由度と直感性を兼ね備えた、デザインエディタ。`
- `p.text.sd-20__content__sd-10`: `Made by` (all 7 slides)
- `p.text.sd-20__content__sd-5`: the slide's URL, verbatim including the trailing slash (see the table above).
- `button.sd-36` `aria-label="Prev Slide"` · `button.sd-43` `aria-label="Next Slide"` · `button.sd-38` `aria-label` toggles between `Stop automatic slide show` and `Play automatic slide show`, and also carries `data-playing-label="Stop automatic slide show"` / `data-paused-label="Play automatic slide show"`.
- `span.sd-20__content__sd-7` `aria-hidden="true"`, text `arrow_forward` · `span.sd-20__content__sd-8` `role="img"` `aria-label="新規タブで開く"`, text `arrow_forward`.
- Control glyph text: `keyboard_arrow_left`, `pause`, `play_arrow`, `keyboard_arrow_right` (all `aria-hidden="true"`).
- `<sd-carousel>` also carries `aria-live="off"` (added by the runtime).

## Responsive Behavior
- **Desktop (1440):** header row is 2-up (`h2` 920 + copy 448). Eyebrow 12.96px, headline 36px/45px in 684px (2 lines), copy 16px/25.6px in 448px (2 lines). Track 1392 wide, padding-right 26, slide step 534.922 (39.16% of the 1366px content box) → 2 full slides + 61% of the third. Caption row single-line on 3 of the 6 slides. Controls right-aligned, gap 16, at x 1210/1284/1358 y 601–651. Section height 747.297.
- **Tablet (768):** `@media (max-width: 1280px)` in `css/main.css` flips `.sd-14` to `flex-wrap: wrap`, `.sd-15` to `flex-direction: column`, `.sd-18` to `margin-top: 40px`, and turns every caption row `.sd-20__content__sd-3` into a right-aligned `flex-direction: column; gap: 4px` with `.sd-20__content__sd-4 { width: 100% }`. `@media (max-width: 768px)` then sets `.sd-14 { padding: 0 }`, `.sd-18 { width: 100%; margin: 0 }`, `.sd-20__content { width: calc(48% - (var(--gap-h) * 0.52)) }` → 333.117 px step (2 full slides + 8%), and `.sd-20__content__sd-12 { width: 72px }`. Headline stays 36px/45px (the theme rule wins over `.sd-19 { font-size: 12px }`, so body copy is 14px/22.4px). Track [24, 357.02, 720, 290.65]; controls still `flex-end`, gap 16, at y 597.66. Section height 743.695.
- **Mobile (390):** adds `@media (max-width: 480px)` — `.sd-13 { gap: 32px; padding: 64px 0 }`, `.sd-17 { font-size: 1.56rem }` (overridden to 28px/35px by `theme-57a9da79`'s 1.75rem), `.sd-20 { justify-content: center; gap: 0; padding: 0 0 45px }` (the 26px right padding is dropped), `.sd-20__content { padding: 0 12px; width: calc(95% - (var(--gap-h) * 0.05)) }` → 324.898 px step, and `.sd-35 { justify-content: center; gap: 12px }`. Because the 7-node flex line (2274.3px) is centred in the 342px track it overhangs 966.15px on each side, so the visually centred card is node index 3 at x 32.6 and its neighbours show as 20.6px slivers on the left and 32.5px on the right. Eyebrow 12px, copy 14px/22.4px. Controls centred at y 566.77–616.77. Section height 680.547.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`. `(max-width: 360px)` contains no rule for any class in this section.

## Shared components
- `MaterialIcon` and `MaterialSymbol` from `components/sites/studio-design-8a86c0e4/shared/icons.tsx` — required.
- `Appear` from `shared/appear.tsx` — **not** required (see States & Behaviors).
- `SdCarousel` from `shared/carousel.tsx` — **does not match the origin.** Five concrete divergences: (1) it wraps the slides in an extra `<div class="box trackClassName">`, but the origin's slides are direct flex children of `<sd-carousel class="box sd-20">`, which is itself the track — the extra div would break `.sd-20`'s `flex-direction: row` / percentage slide widths; (2) it rotates an inline `style.order` and writes **no** `transform`, so the step is an instant reorder with zero motion — the origin translates every slide by `translateX(-100%)` for 600 ms; (3) it renders exactly `slides.length` nodes, the origin renders `data-max-length` = 7 nodes from 6 uniques (rotated view + trailing duplicate of the head); (4) it never emits `data-animatingNext` / `data-animatingPrev`, which are the hooks the sliced CSS keys off; (5) its play-toggle is a `hidden` internal button, and it exposes no prev/next — the origin's controls are the visible `.sd-35` bar and the glyph swap is driven by `is-playing` on the `<sd-carousel>` element via `app/studio-base.css:895`. The builder must not edit the shared file: implement `NextCreationCarousel.tsx` locally against the model in `next-creation.states.json` → `carouselRuntime`.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/next-creation.1440.json` (90 nodes, 44 style buckets, rootRect [0,1300,1440,747])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/next-creation.768.json` (90 nodes, rootRect [0,850,768,744])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/next-creation.390.json` (90 nodes, rootRect [0,642,390,681])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/next-creation.states.json` (carousel runtime model + 7-second transform/DOM-order sampling, 22 pseudo-class rules, measured hover/paused/prev/next states, per-viewport geometry, CSS variables, theme-class cascade note)

## QA Exclusions
The carousel autoplays, so its band can never match frame-for-frame. Mask, relative to the section top:
- **@1440:** `x 0, y 274, w 1440, h 378` (the `.sd-20` track including the 45px control gutter). The header block `y 0–210` diffs normally.
- **@768:** `x 0, y 357, w 768, h 291`.
- **@390:** `x 0, y 330, w 390, h 288`.
To diff the carousel deterministically instead, click `.sd-38` first (removes `is-playing`), wait 700 ms and compare against `next-creation-1440-paused.png`. `max-percent: 1.5` for the unmasked remainder.
